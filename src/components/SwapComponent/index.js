/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-return-await */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import {
  AcyCard,
  AcyIcon,
  AcyPeriodTime,
  AcyTabs,
  AcyCuarrencyCard,
  AcyConnectWalletBig,
  AcyModal,
  AcyInput,
  AcyCoinItem,
  AcyLineChart,
  AcyConfirm,
  AcyApprove,
  AcyButton,
  AcyDescriptions,
} from '@/components/Acy';


import {Input} from 'antd';
import { connect } from 'umi';
import styles from './styles.less';
import { sortAddress } from '@/utils/utils';

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useState, useEffect, useCallback } from 'react';

import {
  ACYSwapErrorStatus,
  approve,
  calculateGasMargin,
  checkTokenIsApproved,
  computeTradePriceBreakdown,
  getAllowance,
  getContract,
  getRouterContract,
  getUserTokenBalance,
  getUserTokenBalanceRaw,
  INITIAL_ALLOWED_SLIPPAGE,
  isZero,
  ROUTER_ADDRESS,
  supportedTokens,
} from '@/acy-dex-swap/utils/index';

import {
  swapGetEstimated,
  swap,
} from '@/acy-dex-swap/components/SwapComponent';

import ERC20ABI from '@/abis/ERC20.json';
import WETHABI from '@/abis/WETH.json';

import {
  Token,
  TokenAmount,
  Pair,
  TradeType,
  Route,
  Trade,
  Fetcher,
  Percent,
  Router,
  WETH,
  ETHER,
  CurrencyAmount,
  InsufficientReservesError,
  FACTORY_ADDRESS,
} from '@uniswap/sdk';

import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';

const { AcyTabPane } = AcyTabs;
import { Row, Col, Button,Icon  } from 'antd';
import { Alert } from 'antd';

const MyComponent = props => {
  const { dispatch } = props;
  // 选择货币的弹窗
  const [visible, setVisible] = useState(null);

  // 选择货币前置和后置
  const [before, setBefore] = useState(true);

  // 交易对前置货币
  const [token0, setToken0] = useState(null);
  // 交易对后置货币
  const [token1, setToken1] = useState(null);

  // 交易对前置货币余额
  const [token0Balance, setToken0Balance] = useState('0');
  // 交易对后置货币余额
  const [token1Balance, setToken1Balance] = useState('0');

  // 交易对前置货币兑换量
  const [token0Amount, setToken0Amount] = useState();
  // 交易对后置货币兑换量
  const [token1Amount, setToken1Amount] = useState();

  const [token0BalanceShow, setToken0BalanceShow] = useState(false);
  const [token1BalanceShow, setToken1BalanceShow] = useState(false);

  let [slippageTolerance, setSlippageTolerance] = useState(INITIAL_ALLOWED_SLIPPAGE / 100);

  // when exactIn is true, it means the firt line
  // when exactIn is false, it means the second line
  let [exactIn, setExactIn] = useState(true);

  let [needApprove, setNeedApprove] = useState(false);
  let [approveAmount, setApproveAmount] = useState("0");
  let [approveButtonStatus,setApproveButtonStatus]=useState(true);

  // Breakdown shows the estimated information for swap

  // let [estimatedStatus,setEstimatedStatus]=useState();
  let [swapBreakdown, setSwapBreakdown] = useState();
  let [swapButtonState, setSwapButtonState] = useState(true);
  let [swapButtonContent, setSwapButtonContent] = useState("Connect to Wallet");
  let [swapStatus, setSwapStatus] = useState();


  let[pair,setPair]=useState();
  let[route,setRoute]=useState();
  let[trade,setTrade]=useState();
  let[slippageAdjustedAmount,setSlippageAdjustedAmount]=useState();
  let[minAmountOut,setMinAmountOut]=useState();
  let[maxAmountIn,setMaxAmountIn]=useState();
  let[wethContract,setWethContract]=useState();
  let[wrappedAmount,setWrappedAmount]=useState();


  const individualFieldPlaceholder = "Enter amount";
  const dependentFieldPlaceholder = "Estimated value";
  const slippageTolerancePlaceholder = "please input a number from 1.00 to 100.00";

  const {account, chainId, library, activate} = useWeb3React();


  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 80001],
  });

  // setSwapButtonContent
  // 监听钱包的连接
  useEffect(() => {
    // activate(injected);
  }, []);


  // token1Amount is changed according to token0Amount
  let t0Changed = useCallback(async () => {
    if (!token0 || !token1) return;
    if (!exactIn) return;
    await swapGetEstimated(
      {
        ...token0,
        amount: token0Amount,
      },
      {
        ...token1,
        amount: token1Amount,
      },
      slippageTolerance * 100,
      exactIn,
      chainId,
      library,
      account,
      setToken0Amount,
      setToken1Amount,
      setNeedApprove,
      setApproveAmount,
      setApproveButtonStatus,
      setSwapBreakdown,
      setSwapButtonState,
      setSwapButtonContent,
      setSwapStatus,
      setPair,
      setRoute,
      setTrade,
      setSlippageAdjustedAmount,
      setMinAmountOut,
      setMaxAmountIn,
      setWethContract,
      setWrappedAmount
    );
  }, [token0, token1, token0Amount, token1Amount, slippageTolerance, exactIn, chainId, library, account]);
  // token0Amount is changed according to token1Amount
  let t1Changed = useCallback(async () => {
    if (!token0 || !token1) return;
    if (exactIn) return;
    await swapGetEstimated(
      {
        ...token0,
        amount: token0Amount,
      },
      {
        ...token1,
        amount: token1Amount,
      },
      slippageTolerance * 100,
      exactIn,
      chainId,
      library,
      account,
      setToken0Amount,
      setToken1Amount,
      setNeedApprove,
      setApproveAmount,
      setApproveButtonStatus,
      setSwapBreakdown,
      setSwapButtonState,
      setSwapButtonContent,
      setSwapStatus,
      setPair,
      setRoute,
      setTrade,
      setSlippageAdjustedAmount,
      setMinAmountOut,
      setMaxAmountIn,
      setWethContract,
      setWrappedAmount
    );
  }, [token0, token1, token0Amount, token1Amount, slippageTolerance, exactIn, chainId, library, account]);
  useEffect(() => {
    t0Changed();
  }, [token0, token1, token0Amount, token1Amount, slippageTolerance, exactIn, chainId, library, account]);
  useEffect(() => {
    t1Changed();
  }, [token0, token1, token0Amount, token1Amount, slippageTolerance, exactIn, chainId, library, account]);

  useEffect(() => {
    if (account == undefined) {
      setSwapButtonState(true);
      setSwapButtonContent("Connect to Wallet");
    } else {
      setSwapButtonState(false);
      setSwapButtonContent("choose tokens and amount");
    }
  }, [account]);

  const onClickCoin = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };

  const ConnectWallet = () => {
    activate(injected);
  };

  return (
    <div className={styles.sc}>
      <AcyCuarrencyCard
        icon="eth"
        title={`Balance: ${token0Balance}`}
        coin={(token0 && token0.symbol) || 'Select'}
        yuan="566.228"
        dollar={`${token0Balance}`}
        token={token0Amount}
        onChoseToken={() => {
          onClickCoin();
          setBefore(true);
        }}
        onChangeToken={e => {
          setToken0Amount(e);
          setExactIn(true);
        }}
      />

      <div className={styles.arrow}>
        <Icon style={{fontSize:'16px'}} type="arrow-down" />
      </div>

      <AcyCuarrencyCard
        icon="eth"
        title={`Balance: ${token1Balance}`}
        coin={(token1 && token1.symbol) || 'Select'}
        yuan="566.228"
        dollar={`${token1Balance}`}
        token={token1Amount}
        onChoseToken={() => {
          onClickCoin();
          setBefore(false);
        }}
        onChangeToken={e => {
          // setToken1ApproxAmount(e);
          setToken1Amount(e);
          setExactIn(false);
        }}
      />

      {/*<AcyDescriptions>*/}
      {/*  {swapStatus && <AcyDescriptions.Item>swap status: </AcyDescriptions.Item>}*/}
      {/*  {swapStatus && <AcyDescriptions.Item>{swapStatus}</AcyDescriptions.Item>}*/}
      {/*</AcyDescriptions>*/}

      <AcyDescriptions>
        {swapBreakdown && <AcyDescriptions.Item>swap breakdown</AcyDescriptions.Item>}
        {swapBreakdown &&
          swapBreakdown.map(info => <AcyDescriptions.Item>{info}</AcyDescriptions.Item>)}
      </AcyDescriptions>

      {needApprove == true && (
        <div>
          <AcyButton
            onClick={async() => {
              let state = await approve(token0.address, approveAmount, library, account);
              if (state == true) {
                setSwapButtonState(true);
                setSwapButtonContent("SWAP");
                setApproveButtonStatus(false);
              }
            }}
            disabled={!approveButtonStatus}
          >
            approve
          </AcyButton>{' '}
        </div>
      )}

      {
        <AcyButton
        style={{marginTop:'25px'}}
          disabled={!swapButtonState}
          onClick={() => {
            if (account == undefined) {
              activate(injected);
            } else {
              swap(
                {
                  ...token0,
                  amount: token0Amount,
                },
                {
                  ...token1,
                  amount: token1Amount,
                },
                slippageTolerance * 100,
                exactIn,
                chainId,
                library,
                account,
                pair,
                route,
                trade,
                slippageAdjustedAmount,
                minAmountOut,
                maxAmountIn,
                wethContract,
                wrappedAmount,
                setSwapStatus
              );
            }
          }}
        >
          {swapButtonContent}
        </AcyButton>
      }

      <AcyDescriptions>
        { swapStatus && <AcyDescriptions.Item>swapStatus: </AcyDescriptions.Item>}
        { swapStatus && <AcyDescriptions.Item> {swapStatus}</AcyDescriptions.Item>}
      </AcyDescriptions>

      <AcyModal onCancel={onCancel} width={400} visible={visible}>
        <div className={styles.title}>
         Select a token
        </div>
        <div className={styles.search}>
          <Input
          size="large"
          style={{
              backgroundColor: "#373739",
              borderRadius:'40px'
          }}
            placeholder="Enter the token symbol or address"
          />
        </div>

        <div className={styles.coinList}>
          <AcyTabs>
            <AcyTabPane tab="All" key="1">
              {supportedTokens.map((token, index) => (
                <AcyCoinItem
                token={token}
                  key={index}
                  onClick={async () => {
                    onCancel();
                    if (before) {
                      if (account == undefined) {
                        alert("please connect to your account");
                      } else {
                        setToken0(token);
                        setToken0Balance(
                          await getUserTokenBalance(
                            token,
                            chainId,
                            account,
                            library
                          )
                        );
                        setToken0BalanceShow(true);
                      }
                    } else {
                      if (account == undefined) {
                        alert('please connect to your account');
                      }  else {
                        setToken1(token);
                        setToken1Balance(
                          await getUserTokenBalance(
                            token,
                            chainId,
                            account,
                            library
                          )
                        );
                        setToken1BalanceShow(true);
                      }
                    }
                  }}
                />
                // <Dropdown.Item
                //   key={index}
                //   onClick={async () => {
                //     setToken0(token);
                //     setToken0Balance(await getUserTokenBalance(token, chainId, account, library));
                //   }}
                // >
                //   {token.symbol}
                // </Dropdown.Item>
              ))}
            </AcyTabPane>
            <AcyTabPane tab="Favorite" key="2" />

          </AcyTabs>
        </div>
      </AcyModal>
    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  account:global.account,
  loading: loading.global,
}))(MyComponent);
