import {ethers} from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import _ from "lodash";
import Token from "@/acy-dex-futures/abis/Token.json";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector, UserRejectedRequestError as UserRejectedRequestErrorInjected} from "@web3-react/injected-connector";

export const MARKET = 'Market';
export const LIMIT = 'Limit';
export const LONG = 'Long';
export const SHORT = 'Short';
export const USD_DECIMALS = 30;
export const BASIS_POINTS_DIVISOR = 10000;
export const MARGIN_FEE_BASIS_POINTS = 10;
export const LIQUIDATION_FEE = expandDecimals(5, USD_DECIMALS)
export const FUNDING_RATE_PRECISION = 1000000;
export const MAX_LEVERAGE = 100 * 10000;
export const POSITIONS = 'Positions';
export const ACTIONS = 'Actions';
export const ORDERS = 'Orders';
const USDG_ADDRESS = '0x45096e7aA921f27590f8F19e457794EB09678141';

const { AddressZero } = ethers.constants


export const GLP_COOLDOWN_DURATION = 15 * 60
export const SECONDS_PER_YEAR = 31536000
export const GLP_DECIMALS = 18
export const USDG_DECIMALS = 18
export const PLACEHOLDER_ACCOUNT = ethers.Wallet.createRandom().address
export const ARBITRUM = 42161
export const PRECISION = expandDecimals(1, 30)
export const TAX_BASIS_POINTS = 50
export const MINT_BURN_FEE_BASIS_POINTS = 20
export const DEFAULT_MAX_USDG_AMOUNT = expandDecimals(200 * 1000 * 1000, 18)

const supportedChainIds = [ARBITRUM];
const injectedConnector = new InjectedConnector({
  supportedChainIds
});

export function adjustForDecimals(amount, divDecimals, mulDecimals) {
  return amount
    .mul(expandDecimals(1, mulDecimals))
    .div(expandDecimals(1, divDecimals));
}

export const formatKeyAmount = (
  map,
  key,
  tokenDecimals,
  displayDecimals,
  useCommas
) => {
  if (!map || !map[key]) {
    return "...";
  }

  return formatAmount(map[key], tokenDecimals, displayDecimals, useCommas);
};

export function approveTokens({
  setIsApproving,
  library,
  tokenAddress,
  spender,
  chainId,
  onApproveSubmitted,
  getTokenInfo,
  infoTokens,
  pendingTxns,
  setPendingTxns,
  includeMessage
}) {
  setIsApproving(true);
  const contract = new ethers.Contract(
    tokenAddress,
    Token.abi,
    library.getSigner()
  );
  contract
    .approve(spender, ethers.constants.MaxUint256)
    .then(async res => {
      // const txUrl = getExplorerUrl(chainId) + "tx/" + res.hash;
      // helperToast.success(
      //   <div>
      //     Approval submitted!{" "}
      //     <a href={txUrl} target="_blank" rel="noopener noreferrer">
      //       View status.
      //     </a>
      //     <br />
      //   </div>
      // );
      if (onApproveSubmitted) {
        onApproveSubmitted();
      }
      if (getTokenInfo && infoTokens && pendingTxns && setPendingTxns) {
        const token = getTokenInfo(infoTokens, tokenAddress);
        const pendingTxn = {
          hash: res.hash,
          message: includeMessage ? `${token.symbol} Approved!` : false
        };
        setPendingTxns([...pendingTxns, pendingTxn]);
      }
    })
    .catch(e => {
      console.error(e);
      // let failMsg;
      // if (
      //   [
      //     "not enough funds for gas",
      //     "failed to execute call with revert code InsufficientGasFunds"
      //   ].includes(e.data?.message)
      // ) {
      //   failMsg = (
      //     <div>
      //       There is not enough ETH in your account on Arbitrum to send this
      //       transaction.
      //       <br />
      //       <br />
      //       <a
      //         href={"https://arbitrum.io/bridge-tutorial/"}
      //         target="_blank"
      //         rel="noopener noreferrer"
      //       >
      //         Bridge ETH to Arbitrum
      //       </a>
      //     </div>
      //   );
      // } else if (e.message?.includes("User denied transaction signature")) {
      //   failMsg = "Approval was cancelled.";
      // } else {
      //   failMsg = "Approval failed.";
      // }
      // helperToast.error(failMsg);
    })
    .finally(() => {
      setIsApproving(false);
    });
}

export function getTargetUsdgAmount(token, usdgSupply, totalTokenWeights) {
  if (!token || !token.weight || !usdgSupply) {
    return;
  }

  if (usdgSupply.eq(0)) {
    return bigNumberify(0);
  }

  return token.weight.mul(usdgSupply).div(totalTokenWeights);
}

export function getFeeBasisPoints(
  token,
  usdgDelta,
  feeBasisPoints,
  taxBasisPoints,
  increment,
  usdgSupply,
  totalTokenWeights
) {
  if (!token || !token.usdgAmount || !usdgSupply || !totalTokenWeights) {
    return 0;
  }

  feeBasisPoints = bigNumberify(feeBasisPoints);
  taxBasisPoints = bigNumberify(taxBasisPoints);

  const initialAmount = token.usdgAmount;
  let nextAmount = initialAmount.add(usdgDelta);
  if (!increment) {
    nextAmount = usdgDelta.gt(initialAmount)
      ? bigNumberify(0)
      : initialAmount.sub(usdgDelta);
  }

  const targetAmount = getTargetUsdgAmount(
    token,
    usdgSupply,
    totalTokenWeights
  );
  if (!targetAmount || targetAmount.eq(0)) {
    return feeBasisPoints.toNumber();
  }

  const initialDiff = initialAmount.gt(targetAmount)
    ? initialAmount.sub(targetAmount)
    : targetAmount.sub(initialAmount);
  const nextDiff = nextAmount.gt(targetAmount)
    ? nextAmount.sub(targetAmount)
    : targetAmount.sub(nextAmount);

  if (nextDiff.lt(initialDiff)) {
    const rebateBps = taxBasisPoints.mul(initialDiff).div(targetAmount);
    return rebateBps.gt(feeBasisPoints)
      ? 0
      : feeBasisPoints.sub(rebateBps).toNumber();
  }

  let averageDiff = initialDiff.add(nextDiff).div(2);
  if (averageDiff.gt(targetAmount)) {
    averageDiff = targetAmount;
  }
  const taxBps = taxBasisPoints.mul(averageDiff).div(targetAmount);
  return feeBasisPoints.add(taxBps).toNumber();
}

export function getBuyGlpToAmount(
  fromAmount,
  swapTokenAddress,
  infoTokens,
  glpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0), feeBasisPoints: 0 };
  if (
    !fromAmount ||
    !swapTokenAddress ||
    !infoTokens ||
    !glpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  const swapToken = getTokenInfo(infoTokens, swapTokenAddress);
  if (!swapToken || !swapToken.minPrice) {
    return defaultValue;
  }

  let glpAmount = fromAmount.mul(swapToken.minPrice).div(glpPrice);
  glpAmount = adjustForDecimals(glpAmount, swapToken.decimals, USDG_DECIMALS);

  let usdgAmount = fromAmount.mul(swapToken.minPrice).div(PRECISION);
  usdgAmount = adjustForDecimals(usdgAmount, swapToken.decimals, USDG_DECIMALS);
  const feeBasisPoints = getFeeBasisPoints(
    swapToken,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    true,
    usdgSupply,
    totalTokenWeights
  );

  glpAmount = glpAmount
    .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
    .div(BASIS_POINTS_DIVISOR);

  return { amount: glpAmount, feeBasisPoints };
}

export function getSellGlpFromAmount(
  toAmount,
  swapTokenAddress,
  infoTokens,
  glpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0), feeBasisPoints: 0 };
  if (
    !toAmount ||
    !swapTokenAddress ||
    !infoTokens ||
    !glpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  const swapToken = getTokenInfo(infoTokens, swapTokenAddress);
  if (!swapToken || !swapToken.maxPrice) {
    return defaultValue;
  }

  let glpAmount = toAmount.mul(swapToken.maxPrice).div(glpPrice);
  glpAmount = adjustForDecimals(glpAmount, swapToken.decimals, USDG_DECIMALS);

  let usdgAmount = toAmount.mul(swapToken.maxPrice).div(PRECISION);
  usdgAmount = adjustForDecimals(usdgAmount, swapToken.decimals, USDG_DECIMALS);
  const feeBasisPoints = getFeeBasisPoints(
    swapToken,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    false,
    usdgSupply,
    totalTokenWeights
  );

  glpAmount = glpAmount
    .mul(BASIS_POINTS_DIVISOR)
    .div(BASIS_POINTS_DIVISOR - feeBasisPoints);

  return { amount: glpAmount, feeBasisPoints };
}

export function getBuyGlpFromAmount(
  toAmount,
  fromTokenAddress,
  infoTokens,
  glpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0) };
  if (
    !toAmount ||
    !fromTokenAddress ||
    !infoTokens ||
    !glpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  const fromToken = getTokenInfo(infoTokens, fromTokenAddress);
  if (!fromToken || !fromToken.minPrice) {
    return defaultValue;
  }

  let fromAmount = toAmount.mul(glpPrice).div(fromToken.minPrice);
  fromAmount = adjustForDecimals(fromAmount, GLP_DECIMALS, fromToken.decimals);

  const usdgAmount = toAmount.mul(glpPrice).div(PRECISION);
  const feeBasisPoints = getFeeBasisPoints(
    fromToken,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    true,
    usdgSupply,
    totalTokenWeights
  );

  fromAmount = fromAmount
    .mul(BASIS_POINTS_DIVISOR)
    .div(BASIS_POINTS_DIVISOR - feeBasisPoints);

  return { amount: fromAmount, feeBasisPoints };
}

export function getSellGlpToAmount(
  toAmount,
  fromTokenAddress,
  infoTokens,
  glpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0) };
  if (
    !toAmount ||
    !fromTokenAddress ||
    !infoTokens ||
    !glpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  const fromToken = getTokenInfo(infoTokens, fromTokenAddress);
  if (!fromToken || !fromToken.maxPrice) {
    return defaultValue;
  }

  let fromAmount = toAmount.mul(glpPrice).div(fromToken.maxPrice);
  fromAmount = adjustForDecimals(fromAmount, GLP_DECIMALS, fromToken.decimals);

  const usdgAmount = toAmount.mul(glpPrice).div(PRECISION);
  const feeBasisPoints = getFeeBasisPoints(
    fromToken,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    false,
    usdgSupply,
    totalTokenWeights
  );

  fromAmount = fromAmount
    .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
    .div(BASIS_POINTS_DIVISOR);

  return { amount: fromAmount, feeBasisPoints };
}

export function getInjectedConnector() {
  return injectedConnector;
}

export const getInjectedHandler = activate => {
  const fn = async () => {
    activate(getInjectedConnector(), e => {
      const chainId =
        localStorage.getItem("SELECTED_NETWORK") || ARBITRUM;

      if (e.message.includes("No Ethereum provider")) {
        return;
      }
      if (e instanceof UserRejectedRequestErrorInjected) {
        return;
      }
      if (e instanceof UnsupportedChainIdError) {
        return;
      }
      console.log(e.toString());
    });
  };
  return fn;
};

export const getTokenInfo = (infoTokens, tokenAddress, replaceNative, nativeTokenAddress) => {
  if (replaceNative && tokenAddress === nativeTokenAddress) {
    return infoTokens[AddressZero]
  }
  return infoTokens[tokenAddress]
}

export function getDeltaStr({ delta, deltaPercentage, hasProfit }) {
  let deltaStr
  let deltaPercentageStr

  if (delta.gt(0)) {
    deltaStr = hasProfit ? "+" : "-"
    deltaPercentageStr = hasProfit ? "+" : "-"
  } else {
    deltaStr = "";
    deltaPercentageStr = "";
  }
  deltaStr += `$${formatAmount(delta, USD_DECIMALS, 2, true)}`
  deltaPercentageStr += `${formatAmount(deltaPercentage, 2, 2)}%`

  return { deltaStr, deltaPercentageStr }
}

export function getPositionKey(collateralTokenAddress, indexTokenAddress, isLong, nativeTokenAddress) {
  const tokenAddress0 = collateralTokenAddress === AddressZero ? nativeTokenAddress : collateralTokenAddress
  const tokenAddress1 = indexTokenAddress === AddressZero ? nativeTokenAddress : indexTokenAddress
  return tokenAddress0 + ":" + tokenAddress1 + ":" + isLong
}

export function getInfoTokens(tokens, tokenBalances, whitelistedTokens, vaultTokenInfo, fundingRateInfo, vaultPropsLength) {

  if (!vaultPropsLength) {
    vaultPropsLength = 12
  }
  const fundingRatePropsLength = 2
  const infoTokens = {}

  for (let i = 0; i < tokens.length; i++) {
    const token = JSON.parse(JSON.stringify(tokens[i]))
    if (tokenBalances) {
      token.balance = tokenBalances[i]
    }
    if (token.address === USDG_ADDRESS) {
      token.minPrice = expandDecimals(1, USD_DECIMALS)
      token.maxPrice = expandDecimals(1, USD_DECIMALS)
    }
    infoTokens[token.address] = token
  }

  for (let i = 0; i < whitelistedTokens.length; i++) {
    const token = JSON.parse(JSON.stringify(whitelistedTokens[i]))
    if (vaultTokenInfo) {
      token.poolAmount = vaultTokenInfo[i * vaultPropsLength]
      token.reservedAmount = vaultTokenInfo[i * vaultPropsLength + 1]
      token.availableAmount = token.poolAmount.sub(token.reservedAmount)
      token.usdgAmount = vaultTokenInfo[i * vaultPropsLength + 2]
      token.redemptionAmount = vaultTokenInfo[i * vaultPropsLength + 3]
      token.weight = vaultTokenInfo[i * vaultPropsLength + 4]
      token.bufferAmount = vaultTokenInfo[i * vaultPropsLength + 5]
      token.maxUsdgAmount = vaultTokenInfo[i * vaultPropsLength + 6]
      token.minPrice = vaultTokenInfo[i * vaultPropsLength + 7]
      token.maxPrice = vaultTokenInfo[i * vaultPropsLength + 8]
      token.guaranteedUsd = vaultTokenInfo[i * vaultPropsLength + 9]

      token.availableUsd = token.isStable
        ? token.poolAmount.mul(token.minPrice).div(expandDecimals(1, token.decimals))
        : token.availableAmount.mul(token.minPrice).div(expandDecimals(1, token.decimals))

      token.managedUsd = token.availableUsd.add(token.guaranteedUsd)
      token.managedAmount = token.managedUsd.mul(expandDecimals(1, token.decimals)).div(token.minPrice)
    }

    if (fundingRateInfo) {
      token.fundingRate = fundingRateInfo[i * fundingRatePropsLength];
      token.cumulativeFundingRate = fundingRateInfo[i * fundingRatePropsLength + 1];
    }

    if (infoTokens[token.address]) {
      token.balance = infoTokens[token.address].balance
    }

    infoTokens[token.address] = token
  }

  return infoTokens
}

export function getProvider(library, chainId) {
  let provider;
  if (library) {
    return library.getSigner()
  }
  const ARBITRUM_RPC_PROVIDERS = ["https://rpc.ankr.com/arbitrum"]
  provider = _.sample(ARBITRUM_RPC_PROVIDERS)
  return new ethers.providers.JsonRpcProvider(provider)
}

export const fetcher = (library, contractInfo, additionalArgs) => (...args) => {
  // eslint-disable-next-line
  const [id, chainId, arg0, arg1, ...params] = args;
  const provider = getProvider(library, chainId);
  const method = ethers.utils.isHexString(arg0) ? arg1 : arg0;

  function onError(e) {
    console.error(contractInfo.contractName, method, e)
  }

  if (ethers.utils.isHexString(arg0)) {
    const address = arg0
    const contract = new ethers.Contract(address, contractInfo.abi, provider)

    try {
      if (additionalArgs) {
        console.log('FETCHER FUNCTION CALLED WITH METHOD  --> ', method);
        console.log('printing additional args', params, additionalArgs);
        console.log('printing provider', contract);
        return contract[method](...params.concat(additionalArgs)).catch(onError)
      }
      return contract[method](...params).catch(onError)
    } catch (e) {
      console.log('error', e);
      onError(e)
    }
  }
  if (!library) {
    return
  }
  return library[method](arg1,...params).catch(onError);;
}


export async function getGasLimit(contract, method, params = [], value, gasBuffer) {
  const defaultGasBuffer = 200000;
  const defaultValue = bigNumberify(0);

  if (!value) {
    value = defaultValue;
  }

  let gasLimit = await contract.estimateGas[method](...params, { value });

  if (!gasBuffer) {
    gasBuffer = defaultGasBuffer;
  }

  return gasLimit.add(gasBuffer);
}
export function bigNumberify(n){
    return BigNumber.from(n);
  }
  
  export const limitDecimals = (amount, maxDecimals) => {
    let amountStr = amount.toString()
    if (maxDecimals === undefined) {
      return amountStr
    }
    if (maxDecimals === 0) {
      return amountStr.split(".")[0]
    }
    const dotIndex = amountStr.indexOf(".")
    if (dotIndex !== -1) {
      let decimals = amountStr.length - dotIndex - 1
      if (decimals > maxDecimals) {
        amountStr = amountStr.substr(0, amountStr.length - (decimals - maxDecimals))
      }
    }
    return amountStr
  }
  export const padDecimals = (amount, minDecimals) => {
    let amountStr = amount.toString()
    const dotIndex = amountStr.indexOf(".")
    if (dotIndex !== -1) {
      const decimals = amountStr.length - dotIndex - 1
      if (decimals < minDecimals) {
        amountStr = amountStr.padEnd(amountStr.length + (minDecimals - decimals), "0")
      }
    } else {
      amountStr = amountStr + ".0000"
    }
    return amountStr
  }
  export const formatAmount = (amount, tokenDecimals, displayDecimals, useCommas, defaultValue) => {
    if (!defaultValue) {
      defaultValue = "..."
    }
    if (amount === undefined || amount.toString().length === 0) {
      return defaultValue
    }
    if (displayDecimals === undefined) {
      displayDecimals = 4
    }
    let amountStr = ethers.utils.formatUnits(amount, tokenDecimals)
    amountStr = limitDecimals(amountStr, displayDecimals)
    if (displayDecimals !== 0) {
      amountStr = padDecimals(amountStr, displayDecimals)
    }
    if (useCommas) {
      return numberWithCommas(amountStr)
    }
    return amountStr
  }
  
  export function numberWithCommas(x) {
    if (!x) { return "..." }
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  
  
  export function expandDecimals(n, decimals) {
    return bigNumberify(n).mul(bigNumberify(10).pow(decimals))
  }
  export function getLiquidationPriceFromDelta({ liquidationAmount, size, collateral, averagePrice, isLong }) {
    if (!size || size.eq(0)) { return }
  
    if (liquidationAmount.gt(collateral)) {
      const liquidationDelta = liquidationAmount.sub(collateral)
      const priceDelta = liquidationDelta.mul(averagePrice).div(size)
      return !isLong ? averagePrice.sub(priceDelta) : averagePrice.add(priceDelta)
    }
  
    const liquidationDelta = collateral.sub(liquidationAmount)
    const priceDelta = liquidationDelta.mul(averagePrice).div(size)
  
    return isLong ? averagePrice.sub(priceDelta) : averagePrice.add(priceDelta)
  }
  //fee of holding a position
  export function getPositionFee(size) {
    if (!size) {
      return bigNumberify(0);
    }
    let myBigNumber = BigNumber.from('0xfbedfa25a3259ab347f7400000');
    console.log(myBigNumber);
    console.log("finding bug here", size);
    const afterFeeUsd = size.mul(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS).div(BASIS_POINTS_DIVISOR)
    return size.sub(afterFeeUsd)
  }
  export const parseValue = (value, tokenDecimals) => {
    const pValue = parseFloat(value)
    if (isNaN(pValue)) {
      return undefined
    }
    value = limitDecimals(value, tokenDecimals)
    const amount = ethers.utils.parseUnits(value, tokenDecimals)
    return bigNumberify(amount)
  }
  //deposits only act on collateral
  function getNewPositionInfo ( position , collateralDelta, method, keepLeverage){
  
    if(!collateralDelta) return {};
  
    if(collateralDelta <=0 ) return {};
  
    if(method == 'Close'){
  
      const sizeDelta = collateralDelta;
  
      let newLiqPrice = getLiquidationPrice({
        isLong: position.isLong,
        size: position.size,
        sizeDelta,
        collateral: position.collateral,
        averagePrice: position.averagePrice,
        entryFundingRate: position.entryFundingRate,
        cumulativeFundingRate: position.cumulativeFundingRate,
        increaseCollateral: false
      });
  
    let newLeverage = getLeverage({
        size: position.size,
        sizeDelta,
        collateral: position.collateral,
        increaseCollateral: false,
        entryFundingRate: position.entryFundingRate,
        cumulativeFundingRate: position.cumulativeFundingRate,
        hasProfit: position.hasProfit,
        delta: position.delta,
        includeDelta: false
      });
  
      let newSize = position.size.sub(sizeDelta);
      let delta = sizeDelta.mul(position.collateral).div(position.size)
      let newCollateral = position.collateral.sub(delta);
      if(!keepLeverage){
  
        return { 
          'Size' : formatAmount(newSize,USD_DECIMALS,2,null,true),
          'Leverage' : formatAmount(newLeverage,4,2,null,true),
          'Liq. Price' : formatAmount(newLiqPrice,USD_DECIMALS,2,null,true)
        }
  
      }
      return { 
        'Size' : formatAmount(newSize,USD_DECIMALS,2,null,true),
        'Collateral' : formatAmount(newCollateral,USD_DECIMALS,2,null,true),
        'Liq. Price' : formatAmount(newLiqPrice,USD_DECIMALS,2,null,true)
      }
  
  
    }
  
    let newLiqPrice = getLiquidationPrice({
        isLong: position.isLong,
        size: position.size,
        collateral: position.collateral,
        averagePrice: position.averagePrice,
        entryFundingRate: position.entryFundingRate,
        cumulativeFundingRate: position.cumulativeFundingRate,
        collateralDelta,
        increaseCollateral: method == 'Deposit'
      });
  
      console.log("collateral delta : ", collateralDelta.toString());
      console.log("new liq price", newLiqPrice);
    let newLeverage = getLeverage({
        size: position.size,
        collateral: position.collateral,
        collateralDelta,
        increaseCollateral: method == 'Deposit',
        entryFundingRate: position.entryFundingRate,
        cumulativeFundingRate: position.cumulativeFundingRate,
        hasProfit: position.hasProfit,
        delta: position.delta,
        includeDelta: false
      });
  
      console.log("collateral delta : ", position.collateral.toString());
  
      let newCollateral = method == 'Deposit' ? position.collateral.add(collateralDelta) : position.collateral.sub(collateralDelta);
  
      return { 
        'Collateral' : formatAmount(newCollateral,USD_DECIMALS,2,null,true),
        'Leverage' : formatAmount(newLeverage,4,2,null,true),
        'Liq. Price' : formatAmount(newLiqPrice,USD_DECIMALS,2,null,true)
      }
        
  }
  
  
  // converts a current position into a new one according to the input ammount (USD)
  export function mapPositionData(position, mode, inputAmount, keepLeverage){
  
    switch(mode){
      case 'none' :
        return { 
              'Size' : formatAmount(position.size,USD_DECIMALS,2,null,true),
              'Collateral' : formatAmount(position.collateral,USD_DECIMALS,2,null,true),
              'Leverage' : formatAmount(position.leverage,4,2,null,true),
              'Mark Price' : formatAmount(position.markPrice,USD_DECIMALS,2,null,true),
              'Liq. Price' : formatAmount(position.liqPrice,USD_DECIMALS,2,null,true)
        }
      case 'Deposit':
        return getNewPositionInfo(position, inputAmount, 'Deposit');
      case 'Withdraw' :
        return getNewPositionInfo(position, inputAmount, 'Withdraw');
      case 'Close' :
        return getNewPositionInfo(position, inputAmount, 'Close', keepLeverage);
    }
  }
  
  export function getLiquidationPrice(data) {
    let { isLong, size, collateral, averagePrice, entryFundingRate, cumulativeFundingRate, sizeDelta, collateralDelta, increaseCollateral, increaseSize } = data
    if (!size || !collateral || !averagePrice) { return }
  
    let nextSize = size ? size : bigNumberify(0)
    let remainingCollateral = collateral
  
    if (sizeDelta) {
      if (increaseSize) {
        nextSize = size.add(sizeDelta)
      } else {
        if (sizeDelta.gte(size)) {
          return
        }
        nextSize = size.sub(sizeDelta)
      }
  
      const marginFee = getMarginFee(sizeDelta)
      remainingCollateral = remainingCollateral.sub(marginFee)
    }
  
    if (collateralDelta) {
      if (increaseCollateral) {
        remainingCollateral = remainingCollateral.add(collateralDelta)
      } else {
        if (collateralDelta.gte(remainingCollateral)) {
          return
        }
        remainingCollateral = remainingCollateral.sub(collateralDelta)
      }
    }
  
    let positionFee = getPositionFee(size).add(LIQUIDATION_FEE)
    if (entryFundingRate && cumulativeFundingRate) {
      const fundingFee = size.mul(cumulativeFundingRate.sub(entryFundingRate)).div(FUNDING_RATE_PRECISION)
      positionFee = positionFee.add(fundingFee)
    }
  
    const liquidationPriceForFees = getLiquidationPriceFromDelta({
      liquidationAmount: positionFee, size: nextSize, collateral: remainingCollateral, averagePrice, isLong
    })
  
    const liquidationPriceForMaxLeverage = getLiquidationPriceFromDelta({
      liquidationAmount: nextSize.mul(BASIS_POINTS_DIVISOR).div(MAX_LEVERAGE), size: nextSize, collateral: remainingCollateral, averagePrice, isLong
    })
  
    if (!liquidationPriceForFees) { return liquidationPriceForMaxLeverage }
    if (!liquidationPriceForMaxLeverage) { return liquidationPriceForFees }
  
    if (isLong) {
      // return the higher price
      return liquidationPriceForFees.gt(liquidationPriceForMaxLeverage) ? liquidationPriceForFees : liquidationPriceForMaxLeverage
    }
  
    // return the lower price
    return liquidationPriceForFees.lt(liquidationPriceForMaxLeverage) ? liquidationPriceForFees : liquidationPriceForMaxLeverage
  }
  
  export function getLeverage ({ size, sizeDelta, increaseSize, collateral, collateralDelta, increaseCollateral, entryFundingRate, cumulativeFundingRate, hasProfit, delta, includeDelta }) {
    if (!size && !sizeDelta) { return }
    if (!collateral && !collateralDelta) { return }
  
    let nextSize = size ? size : bigNumberify(0)
    if (sizeDelta) {
      if (increaseSize) {
        nextSize = size.add(sizeDelta)
      } else {
        if (sizeDelta.gte(size)) {
          return
        }
        nextSize = size.sub(sizeDelta)
      }
    }
  
    let remainingCollateral = collateral ? collateral : bigNumberify(0)
    if (collateralDelta) {
      if (increaseCollateral) {
        remainingCollateral = collateral.add(collateralDelta)
      } else {
        if (collateralDelta.gte(collateral)) {
          return
        }
        remainingCollateral = collateral.sub(collateralDelta)
      }
    }
  
    if (delta && includeDelta) {
      if (hasProfit) {
        remainingCollateral = remainingCollateral.add(delta)
      } else {
        if (delta.gt(remainingCollateral)) {
          return
        }
  
        remainingCollateral = remainingCollateral.sub(delta)
      }
    }
  
    if (remainingCollateral.eq(0)) { return }
  
    remainingCollateral = sizeDelta ? remainingCollateral.mul(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS).div(BASIS_POINTS_DIVISOR) : remainingCollateral
    if (entryFundingRate && cumulativeFundingRate) {
      const fundingFee = size.mul(cumulativeFundingRate.sub(entryFundingRate)).div(FUNDING_RATE_PRECISION)
      remainingCollateral = remainingCollateral.sub(fundingFee)
    }
  
    return nextSize.mul(BASIS_POINTS_DIVISOR).div(remainingCollateral)
  }
  
  export function getMarginFee(sizeDelta) {
    if (!sizeDelta) {
      return bigNumberify(0);
    }
    const afterFeeUsd = sizeDelta.mul(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS).div(BASIS_POINTS_DIVISOR)
    return sizeDelta.sub(afterFeeUsd)
  }
// ymj
  export function getNextFromAmount(
    chainId,
    toAmount,
    fromTokenAddress,
    toTokenAddress,
    infoTokens,
    toTokenPriceUsd,
    ratio,
    usdgSupply,
    totalTokenWeights
  ) {
    const defaultValue = { amount: bigNumberify(0) };
  
    if (!toAmount || !fromTokenAddress || !toTokenAddress || !infoTokens) {
      return defaultValue;
    }
  
    if (fromTokenAddress === toTokenAddress) {
      return { amount: toAmount };
    }
  
    const fromToken = getTokenInfo(infoTokens, fromTokenAddress);
    const toToken = getTokenInfo(infoTokens, toTokenAddress);
  
    if (!fromToken || !fromToken.minPrice || !toToken || !toToken.maxPrice) {
      return defaultValue;
    }
  
    const adjustDecimals = adjustForDecimalsFactory(
      fromToken.decimals - toToken.decimals
    );
  
    let fromAmountBasedOnRatio;
    if (ratio && !ratio.isZero()) {
      fromAmountBasedOnRatio = toAmount.mul(ratio).div(PRECISION);
    }
  
    if (toTokenAddress === USDG_ADDRESS) {
      const feeBasisPoints = getSwapFeeBasisPoints(fromToken.isStable);
  
      if (ratio && !ratio.isZero()) {
        return {
          amount: adjustDecimals(
            fromAmountBasedOnRatio
              .mul(BASIS_POINTS_DIVISOR + feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          )
        };
      }
      const fromAmount = toAmount.mul(PRECISION).div(fromToken.maxPrice);
      return {
        amount: adjustDecimals(
          fromAmount
            .mul(BASIS_POINTS_DIVISOR + feeBasisPoints)
            .div(BASIS_POINTS_DIVISOR)
        )
      };
    }
  
    if (fromTokenAddress === USDG_ADDRESS) {
      const redemptionValue = toToken.redemptionAmount
        .mul(toToken.maxPrice)
        .div(expandDecimals(1, toToken.decimals));
      if (redemptionValue.gt(THRESHOLD_REDEMPTION_VALUE)) {
        const feeBasisPoints = getSwapFeeBasisPoints(toToken.isStable);
  
        const fromAmount =
          ratio && !ratio.isZero()
            ? fromAmountBasedOnRatio
            : toAmount
              .mul(expandDecimals(1, toToken.decimals))
              .div(toToken.redemptionAmount);
  
        return {
          amount: adjustDecimals(
            fromAmount
              .mul(BASIS_POINTS_DIVISOR + feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          )
        };
      }
  
      const expectedAmount = toAmount.mul(toToken.maxPrice).div(PRECISION);
  
      const stableToken = getMostAbundantStableToken(chainId, infoTokens);
      if (!stableToken || stableToken.availableAmount.lt(expectedAmount)) {
        const feeBasisPoints = getSwapFeeBasisPoints(toToken.isStable);
  
        const fromAmount =
          ratio && !ratio.isZero()
            ? fromAmountBasedOnRatio
            : toAmount
              .mul(expandDecimals(1, toToken.decimals))
              .div(toToken.redemptionAmount);
  
        return {
          amount: adjustDecimals(
            fromAmount
              .mul(BASIS_POINTS_DIVISOR + feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          )
        };
      }
  
      const feeBasisPoints0 = getSwapFeeBasisPoints(true);
      const feeBasisPoints1 = getSwapFeeBasisPoints(false);
  
      if (ratio && !ratio.isZero()) {
        // apply fees twice usdg -> token1 -> token2
        const fromAmount = fromAmountBasedOnRatio
          .mul(BASIS_POINTS_DIVISOR + feeBasisPoints0 + feeBasisPoints1)
          .div(BASIS_POINTS_DIVISOR);
        return {
          amount: adjustDecimals(fromAmount),
          path: [USDG_ADDRESS, stableToken.address, toToken.address]
        };
      }
  
      // get fromAmount for stableToken => toToken
      let fromAmount = toAmount.mul(toToken.maxPrice).div(stableToken.minPrice);
  
      // apply stableToken => toToken fees
      fromAmount = fromAmount
        .mul(BASIS_POINTS_DIVISOR + feeBasisPoints1)
        .div(BASIS_POINTS_DIVISOR);
  
      // get fromAmount for USDG => stableToken
      fromAmount = fromAmount.mul(stableToken.maxPrice).div(PRECISION);
  
      // apply USDG => stableToken fees
      fromAmount = fromAmount
        .mul(BASIS_POINTS_DIVISOR + feeBasisPoints0)
        .div(BASIS_POINTS_DIVISOR);
  
      return {
        amount: adjustDecimals(fromAmount),
        path: [USDG_ADDRESS, stableToken.address, toToken.address]
      };
    }
  
    const fromAmount =
      ratio && !ratio.isZero()
        ? fromAmountBasedOnRatio
        : toAmount.mul(toToken.maxPrice).div(fromToken.minPrice);
  
    let usdgAmount = fromAmount.mul(fromToken.minPrice).div(PRECISION);
    usdgAmount = adjustForDecimals(usdgAmount, toToken.decimals, USDG_DECIMALS);
    const swapFeeBasisPoints =
      fromToken.isStable && toToken.isStable
        ? STABLE_SWAP_FEE_BASIS_POINTS
        : SWAP_FEE_BASIS_POINTS;
    const taxBasisPoints =
      fromToken.isStable && toToken.isStable
        ? STABLE_TAX_BASIS_POINTS
        : TAX_BASIS_POINTS;
    const feeBasisPoints0 = getFeeBasisPoints(
      fromToken,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      true,
      usdgSupply,
      totalTokenWeights
    );
    const feeBasisPoints1 = getFeeBasisPoints(
      toToken,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      false,
      usdgSupply,
      totalTokenWeights
    );
    const feeBasisPoints =
      feeBasisPoints0 > feeBasisPoints1 ? feeBasisPoints0 : feeBasisPoints1;
  
    return {
      amount: adjustDecimals(
        fromAmount
          .mul(BASIS_POINTS_DIVISOR)
          .div(BASIS_POINTS_DIVISOR - feeBasisPoints)
      ),
      feeBasisPoints
    };
  }
  
  export function getNextToAmount(
    chainId,
    fromAmount,
    fromTokenAddress,
    toTokenAddress,
    infoTokens,
    toTokenPriceUsd,
    ratio,
    usdgSupply,
    totalTokenWeights
  ) {
    const defaultValue = { amount: bigNumberify(0) };
    if (!fromAmount || !fromTokenAddress || !toTokenAddress || !infoTokens) {
      return defaultValue;
    }
  
    if (fromTokenAddress === toTokenAddress) {
      return { amount: fromAmount };
    }
  
    const fromToken = getTokenInfo(infoTokens, fromTokenAddress);
    const toToken = getTokenInfo(infoTokens, toTokenAddress);
  
    if (fromToken.isNative && toToken.isWrapped) {
      console.log("ymj test 1", fromAmount)
      return { amount: fromAmount };
    }
  
    if (fromToken.isWrapped && toToken.isNative) {
      console.log("ymj test 2")
      return { amount: fromAmount };
    }
  
    if (!fromToken || !fromToken.minPrice || !toToken || !toToken.maxPrice) {
      return defaultValue;
    }
  
    const adjustDecimals = adjustForDecimalsFactory(
      toToken.decimals - fromToken.decimals
    );
  
    let toAmountBasedOnRatio = bigNumberify(0);
    if (ratio && !ratio.isZero()) {
      toAmountBasedOnRatio = fromAmount.mul(PRECISION).div(ratio);
    }
  
    if (toTokenAddress === USDG_ADDRESS) {
      const feeBasisPoints = getSwapFeeBasisPoints(fromToken.isStable);
  
      if (ratio && !ratio.isZero()) {
        const toAmount = toAmountBasedOnRatio;
        console.log("ymj test")
        return {
          amount: adjustDecimals(
            toAmount
              .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          ),
          feeBasisPoints
        };
      }
  
      const toAmount = fromAmount.mul(fromToken.minPrice).div(PRECISION);
      console.log("ymj test", {
        amount: adjustDecimals(
          toAmount
            .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
            .div(BASIS_POINTS_DIVISOR)
        ),
        feeBasisPoints
      });
      return {
        amount: adjustDecimals(
          toAmount
            .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
            .div(BASIS_POINTS_DIVISOR)
        ),
        feeBasisPoints
      };
    }
  
    if (fromTokenAddress === USDG_ADDRESS) {
      const redemptionValue = toToken.redemptionAmount
        .mul(toTokenPriceUsd || toToken.maxPrice)
        .div(expandDecimals(1, toToken.decimals));
  
      if (redemptionValue.gt(THRESHOLD_REDEMPTION_VALUE)) {
        const feeBasisPoints = getSwapFeeBasisPoints(toToken.isStable);
  
        const toAmount =
          ratio && !ratio.isZero()
            ? toAmountBasedOnRatio
            : fromAmount
              .mul(toToken.redemptionAmount)
              .div(expandDecimals(1, toToken.decimals));
  
        return {
          amount: adjustDecimals(
            toAmount
              .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          ),
          feeBasisPoints
        };
      }
  
      const expectedAmount = fromAmount;
  
      const stableToken = getMostAbundantStableToken(chainId, infoTokens);
      if (!stableToken || stableToken.availableAmount.lt(expectedAmount)) {
        const toAmount =
          ratio && !ratio.isZero()
            ? toAmountBasedOnRatio
            : fromAmount
              .mul(toToken.redemptionAmount)
              .div(expandDecimals(1, toToken.decimals));
        const feeBasisPoints = getSwapFeeBasisPoints(toToken.isStable);
        return {
          amount: adjustDecimals(
            toAmount
              .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
              .div(BASIS_POINTS_DIVISOR)
          ),
          feeBasisPoints
        };
      }
  
      const feeBasisPoints0 = getSwapFeeBasisPoints(true);
      const feeBasisPoints1 = getSwapFeeBasisPoints(false);
  
      if (ratio && !ratio.isZero()) {
        const toAmount = toAmountBasedOnRatio
          .mul(BASIS_POINTS_DIVISOR - feeBasisPoints0 - feeBasisPoints1)
          .div(BASIS_POINTS_DIVISOR);
        return {
          amount: adjustDecimals(toAmount),
          path: [USDG_ADDRESS, stableToken.address, toToken.address],
          feeBasisPoints: feeBasisPoints0 + feeBasisPoints1
        };
      }
  
      // get toAmount for USDG => stableToken
      let toAmount = fromAmount.mul(PRECISION).div(stableToken.maxPrice);
      // apply USDG => stableToken fees
      toAmount = toAmount
        .mul(BASIS_POINTS_DIVISOR - feeBasisPoints0)
        .div(BASIS_POINTS_DIVISOR);
  
      // get toAmount for stableToken => toToken
      toAmount = toAmount
        .mul(stableToken.minPrice)
        .div(toTokenPriceUsd || toToken.maxPrice);
      // apply stableToken => toToken fees
      toAmount = toAmount
        .mul(BASIS_POINTS_DIVISOR - feeBasisPoints1)
        .div(BASIS_POINTS_DIVISOR);
  
      return {
        amount: adjustDecimals(toAmount),
        path: [USDG_ADDRESS, stableToken.address, toToken.address],
        feeBasisPoints: feeBasisPoints0 + feeBasisPoints1
      };
    }
  
    const toAmount =
      ratio && !ratio.isZero()
        ? toAmountBasedOnRatio
        : fromAmount
          .mul(fromToken.minPrice)
          .div(toTokenPriceUsd || toToken.maxPrice);
  
    let usdgAmount = fromAmount.mul(fromToken.minPrice).div(PRECISION);
    usdgAmount = adjustForDecimals(usdgAmount, fromToken.decimals, USDG_DECIMALS);
    const swapFeeBasisPoints =
      fromToken.isStable && toToken.isStable
        ? STABLE_SWAP_FEE_BASIS_POINTS
        : SWAP_FEE_BASIS_POINTS;
    const taxBasisPoints =
      fromToken.isStable && toToken.isStable
        ? STABLE_TAX_BASIS_POINTS
        : TAX_BASIS_POINTS;
    const feeBasisPoints0 = getFeeBasisPoints(
      fromToken,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      true,
      usdgSupply,
      totalTokenWeights
    );
    const feeBasisPoints1 = getFeeBasisPoints(
      toToken,
      usdgAmount,
      swapFeeBasisPoints,
      taxBasisPoints,
      false,
      usdgSupply,
      totalTokenWeights
    );
    const feeBasisPoints =
      feeBasisPoints0 > feeBasisPoints1 ? feeBasisPoints0 : feeBasisPoints1;
  
    return {
      amount: adjustDecimals(
        toAmount
          .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
          .div(BASIS_POINTS_DIVISOR)
      ),
      feeBasisPoints
    };
  }
  export function getUsd(
    amount,
    tokenAddress,
    max,
    infoTokens,
    orderOption,
    triggerPriceUsd
  ) {
    if (!amount) {
      return;
    }
    if (tokenAddress === USDG_ADDRESS) {
      return amount.mul(PRECISION).div(expandDecimals(1, 18));
    }
    const info = getTokenInfo(infoTokens, tokenAddress);
    const price = getTriggerPrice(
      tokenAddress,
      max,
      info,
      orderOption,
      triggerPriceUsd
    );
    if (!price) {
      return;
    }

    return amount.mul(price).div(expandDecimals(1, info.decimals));
  }
  function getTriggerPrice(
    tokenAddress,
    max,
    info,
    orderOption,
    triggerPriceUsd
  ) {
    // Limit/stop orders are executed with price specified by user
    if (orderOption && orderOption !== MARKET && triggerPriceUsd) {
      return triggerPriceUsd;
    }
  
    // Market orders are executed with current market price
    if (!info) {
      return;
    }
    if (max && !info.maxPrice) {
      return;
    }
    if (!max && !info.minPrice) {
      return;
    }
    return max ? info.maxPrice : info.minPrice;
  }
  export const formatAmountFree = (amount, tokenDecimals, displayDecimals) => {
    if (!amount) {
      return "...";
    }
    let amountStr = ethers.utils.formatUnits(amount, tokenDecimals);
    amountStr = limitDecimals(amountStr, displayDecimals);
    return trimZeroDecimals(amountStr);
  };
  export const trimZeroDecimals = amount => {
    if (parseFloat(amount) === parseInt(amount)) {
      return parseInt(amount).toString();
    }
    return amount;
  };