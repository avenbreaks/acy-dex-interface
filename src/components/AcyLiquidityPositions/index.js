/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { connect } from 'umi';
import { useWeb3React } from '@web3-react/core';
import { Table, Pagination, Input, Button } from 'antd';
import {
  getTokenContract,
  getUserTokenBalanceRaw,
  getTokenTotalSupply,
  approveTokenWithSpender,
} from '@/acy-dex-swap/utils/index';

import { Icon } from "antd";
import supportedTokens from '@/constants/TokenList';
import { Fetcher, Percent, Token, TokenAmount, Pair } from '@acyswap/sdk';
import AcyRemoveLiquidityModal from '@/components/AcyRemoveLiquidityModal';
import { isMobile } from 'react-device-detect';
import styles from './styles.less';

function getLogoURIWithSymbol(symbol) {
  for (let j = 0; j < supportedTokens.length; j++) {
    if (symbol === supportedTokens[j].symbol) {
      return supportedTokens[j].logoURI;
    }
  }
  return 'https://storageapi.fleek.co/chwizdo-team-bucket/token image/ethereum-eth-logo.svg';
}

// table pool column search component
const SearchField = ({setKeyword, showSearch, setShowSearch}) => {
  const inputRef = useRef();

  let renderComponent;
  if (showSearch) {
    renderComponent = <div style={{ display: "flex", alignItems: "center", backgroundColor: "#191b20", margin: "0 -16px 0 0", borderRadius: "4px"}}>
    <input
      ref={inputRef}
      style={{ display: showSearch ? "block" : "none", width: "100%", backgroundColor: "transparent", border: 0, outline: 0, paddingLeft: "0.4rem" }}
      onKeyPress={e => { if (e.key === "Enter") setKeyword(e.target.value); inputRef.current.value=e.target.value }}
    />
    <Icon type="close"
      className={styles.hoverToWhite}
      style={{justifyContent: "end", marginRight: "0.2rem", fontSize: "0.7rem"}}
      onClick={ () => {
      setKeyword("");
      inputRef.current.value = "";
      setShowSearch(false);
    }} />
    </div>;
  } else {
    renderComponent = <>
      pool
      <Icon
        type="search"
        className={styles.hoverToWhite}
        style={{ backgroundColor: "transparent", color: "white", marginLeft: "1rem" }}
        onClick={() => {setShowSearch(true); console.log(showSearch) } }
      />
    </>;
  }
  return renderComponent;
}

const AcyLiquidityPositions = (props) => {
  // const [userLiquidityPools, setUserLiquidityPools] = useState([]); // list of pools that user has share
  const { account, chainId, library, activate } = useWeb3React();

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeLiquidityPosition, setRemoveLiquidityPosition] = useState(null);
  const [userLPHandlers, setUserLPHandlers] = useState([]);
  // const [userLPData, setUserLPData] = useState([]); // fetch a list of valid pool from backend
  const [userLPShares, setUserLPShares] = useState([]);
  const [readListPointer, setReadListPointer] = useState(0);  // last processed read position of "validPoolPairs"
  const displayCountIncrement = 5;
  const [selectedRow, setSelectedRow] = useState(null);

  // search component
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // table expanded row
  const [expandedRowKey, setExpandedRowKey] = useState([]);

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters
  //   }) => 
  //     // {
  //     //   setTableFilters([dataIndex, setSelectedKeys, selectedKeys, confirm, clearFilters])
  //     //   return (<></>)
  //     // },
  //     (
  //     <div style={{ padding: 8, backgroundColor: "grey", borderRadius: "3px" }}>
  //       {/* {setTableFilters([dataIndex, setSelectedKeys, selectedKeys, confirm, clearFilters])} */}
  //       {setTableFilters(() => setSelectedKeys)}
  //       <Input
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() =>
  //           handleSearch(selectedKeys, confirm, dataIndex)
  //         }
  //         style={{ width: 188, marginBottom: 8, display: "block" }}
  //       />
  //       <Button
  //         type="primary"
  //         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         icon="search"
  //         size="small"
  //         style={{ width: 90, marginRight: 8 }}
  //       >
  //         Search
  //       </Button>
  //       <Button
  //         onClick={() => handleReset(clearFilters)}
  //         size="small"
  //         style={{ width: 90, backgroundColor: "black" }}
  //       >
  //         Reset
  //       </Button>
  //     </div>
  //   ),
  //   filterDropdown: () => <> </>,
  //   filterIcon: (filtered) => (
  //     <Icon type="search" style={{ backgroundColor: "transparent", color: filtered ? "orange" : "white" }} onClick={() => {setShowSearch(!showSearch); console.log(showSearch) } } />
  //   ),
  //   onFilter: (value, record) => {
  //     console.log("onFilter");
  //     return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
  //   },
  // });
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  // };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  // };

  // table data definitions
  const columns = useMemo(() => [
    {
      title: '#',
      className: 'centerAlignTableHeader',
      key: 'index',
      render: (text, record, index) => (
        <div>
          {index + 1}
        </div>
      ),
      width: '3rem',
      visible: !isMobile
    },
    {
      title: <SearchField {...{showSearch, setShowSearch, setKeyword}} />,
      dataIndex: 'pool',
      // key can be omitted if dataIndex is given (specified in docs)
      // duplicate column keys will cause search filter problems.
      className: 'centerAlignTableHeader',
      // sort
      // sorter: (a, b) => a.pool.localeCompare(b.pool),
      // search
      // ...getColumnSearchProps("pool"),
      render: (text, record, index) => {
        const addressLength = record.poolAddress.length;

        const token0logo = getLogoURIWithSymbol(record.token0Symbol);
        const token1logo = getLogoURIWithSymbol(record.token1Symbol);

        return (
          <div className={styles.pool}>
            <img
              src={token0logo}
              alt={record.token0Symbol}
              style={{
                maxWidth: '24px',
                maxHeight: '24px',
                marginRight: '0.25rem',
                marginTop: '0.1rem',
              }}
            />
            <img
              src={token1logo}
              alt={record.token1Symbol}
              style={{
                maxWidth: '24px',
                maxHeight: '24px',
                marginRight: '0.5rem',
                marginTop: '0.1rem',
              }}
            />
            <div>
              <p className={styles.bigtitle} onClick={() => {
                setAddComponentPairs(record.token0, record.token1);
                setSelectedRow(index);
              }} >
                {record.pool}
              </p>
              <a target="_blank" href={`https://rinkeby.etherscan.io/address/${record.poolAddress}`} >
                <p className={styles.value}>
                  {`${record.poolAddress.slice(0, 5)}...${record.poolAddress.slice(
                    addressLength - 5,
                    addressLength
                  )}`}
                </p>
              </a>
            </div>
          </div>
        );
      },
      visible: true,
    },
    {
      title: 'My Liquidity',
      dataIndex: 'token0Amount',
      key: 'token0Amount',
      className: 'centerAlignTableHeader',
      render: (text, record, index) => (
        <div>
          <p>{record.token0Amount}</p>
          <p>{record.token1Amount}</p>
        </div>
      ),
      visible: !isMobile,
    },
    {
      title: 'Pool Share',
      dataIndex: 'share',
      className: 'centerAlignTableHeader',
      key: 'share',
      render: (text, record, index) => <div>{record.share}</div>,
      visible: true,
    },
    {
      title: 'Reserve',
      key: 'token0Reserve',
      dataIndex: 'token0Reserve',
      className: 'centerAlignTableHeader',
      render: (text, record, index) => (
        <div>
          <p>{record.token0Reserve}</p>
          <p>{record.token1Reserve}</p>
        </div>
      ),
      visible: !isMobile,
    },
    {
      title: 'Operation',
      key: 'poolAddress',
      className: 'centerAlignTableHeader',
      render: (text, record, index) => (
        <div>
          <button
            className={styles.removeLiquidityButton}
            type="button"
            onClick={() => {
              setIsModalVisible(true);
              setRemoveLiquidityPosition(record);
            }}
          >
            Remove
          </button>
        </div>
      ),
      visible: true,
    },
    // { title: "Expand", key: "expand",  visible: true},
  ]);

  // fetch lists of valid pool
  const getValidPoolList = () => {
    console.log("getting list on chain ", chainId);
    axios.get(
      // fetch valid pool list from remote
      // `https://api.acy.finance/api/pool?chainId=${chainId}`
      `http://localhost:3001/api/userpool?walletId=${account}`
    ).then( async res => {
      console.log(res);
      
      const tokens = supportedTokens;

      // construct pool list locally
      const pools = res.data.pools;
      const fetchTask = [];
      for (let pairAddr of pools) {
        const token0addr = supportedTokens.findIndex(item => item.address === pairAddr.token0);
        const token1addr = supportedTokens.findIndex(item => item.address === pairAddr.token1);

        const { address: token0Address, symbol: token0Symbol, decimals: token0Decimal } = tokens[token0addr];
        const { address: token1Address, symbol: token1Symbol, decimals: token1Decimal } = tokens[token1addr];
        const token0 = new Token(chainId, token0Address, token0Decimal, token0Symbol);
        const token1 = new Token(chainId, token1Address, token1Decimal, token1Symbol);

        // queue get pair task
        const pair = await Fetcher.fetchPairData(token0, token1, library);
        fetchTask.push(pair);
        console.log("adding task to array")
      }
      const pairs = await Promise.allSettled(fetchTask);
      console.log("fetched pairs", pairs);

      const LPHandlers = pairs.map(pair => pair.value);
      setUserLPHandlers(LPHandlers);
      console.log("userLPHandlers is updated");

    }).catch(e => console.log("error: ", e));
  }
  const userLPData = useMemo(() => {
    const userPools = [];
    for (let pair of userLPHandlers) {
      userPools.push({
        token0: pair.token0,
        token1: pair.token1,
        token0LogoURI: getLogoURIWithSymbol(pair.token0.symbol),
        token1LogoURI: getLogoURIWithSymbol(pair.token1.symbol),
        token0Symbol: pair.token0.symbol,
        token1Symbol: pair.token1.symbol,
        pool: `${pair.token0.symbol}/${pair.token1.symbol}`,
        poolAddress: `${pair.liquidityToken.address}`,
        token0Reserve: `${pair.reserve0.toExact(2)} ${pair.token0.symbol}`,
        token1Reserve: `${pair.reserve1.toExact(2)} ${pair.token1.symbol}`,
      });
    }
    console.log("userLPData is updated");
    setLoading(false);
    console.log("test elapsed time", new Date());
    return userPools;
  }, [userLPHandlers]);

  // search input component update
  useEffect(() => {
    let filtered = userLPData;
    if (keyword !== "" && filtered) {
      filtered = filtered.filter(item => item.pool.toLowerCase().includes(keyword.toLowerCase()));
    }
    setFilteredData(filtered);
  }, [userLPData, keyword]);

  // fetch user shares in above pools
  async function getUserPoolShare() {
    
    const fetchPoolShare = async (pair) => {
      console.log("poolToken,", pair.liquidityToken)
      let userPoolBalance = await getUserTokenBalanceRaw(pair.liquidityToken, account, library);
      if (userPoolBalance.isZero()) {
        console.log("zero balance, discard");
        return {};
      }

      userPoolBalance = new TokenAmount(pair.liquidityToken, userPoolBalance);

      const totalSupply = await getTokenTotalSupply(pair.liquidityToken, library, account);

      const token0Deposited = pair.getLiquidityValue(
        pair.token0,
        totalSupply,
        userPoolBalance,
        false
      );
      const token1Deposited = pair.getLiquidityValue(
        pair.token1,
        totalSupply,
        userPoolBalance,
        false
      );

      const poolTokenPercentage = new Percent(userPoolBalance.raw, totalSupply.raw).toFixed(4);
      
      const newData = {
          token0Amount: `${token0Deposited.toSignificant(4)} ${pair.token0.symbol}`,
          token1Amount: `${token1Deposited.toSignificant(4)} ${pair.token1.symbol}`,
          share: `${poolTokenPercentage}%`,
      };

      console.log("userLPShares is updated: ", newData);
      
      setUserLPShares(prev => ({...prev, [pair.liquidityToken.address]: newData}));
    }

    (async () =>{ for (let pair of userLPHandlers) fetchPoolShare(pair); })();

    // setUserLPShares([...userLPShares, ...userShares]);
    // lpHandlers.splice(0, userShares.length);
    // // setUserLPHandlers(lpHandlers);
    // console.log("done 5 updates");

    // if (lpHandlers.length)
      // await getUserPoolShare();

    // while (readIdx < userLiquidityPools.length) {

    //   const [token0Idx, token1Idx] = userLiquidityPools[readIdx];
    //   readIdx++;

    //   const { address: token0Address, symbol: token0Symbol, decimals: token0Decimal } = tokens[token0Idx];
    //   const { address: token1Address, symbol: token1Symbol, decimals: token1Decimal } = tokens[token1Idx];
    //   const token0 = new Token(chainId, token0Address, token0Decimal, token0Symbol);
    //   const token1 = new Token(chainId, token1Address, token1Decimal, token1Symbol);

    //   // almost impossible: quit if the two tokens are equivalent, i.e. have the same chainId and address
    //   if (token0.equals(token1)) continue;

    //   // queue get pair task
    //   const pair = await Fetcher.fetchPairData(token0, token1, library);
    //   console.log("fetched pair: ", pair);

    //   // check if user has share in this pool
    //   let userPoolBalance = await getUserTokenBalanceRaw(pair.liquidityToken, account, library);
    //   if (userPoolBalance.isZero()) {
    //     console.log("zero balance, discard");
    //     continue;
    //   }

    //   console.log(">> added pair");

    //   userPoolBalance = new TokenAmount(pair.liquidityToken, userPoolBalance);

    //   const totalSupply = await getTokenTotalSupply(pair.liquidityToken, library, account);

    //   const token0Deposited = pair.getLiquidityValue(
    //     pair.token0,
    //     totalSupply,
    //     userPoolBalance,
    //     false
    //   );
    //   const token1Deposited = pair.getLiquidityValue(
    //     pair.token1,
    //     totalSupply,
    //     userPoolBalance,
    //     false
    //   );

    //   const poolTokenPercentage = new Percent(userPoolBalance.raw, totalSupply.raw).toFixed(4);

    //   userNonZeroLiquidityPositions.push({
    //     token0: pair.token0,
    //     token1: pair.token1,
    //     token0LogoURI: getLogoURIWithSymbol(pair.token0.symbol),
    //     token1LogoURI: getLogoURIWithSymbol(pair.token1.symbol),
    //     token0Symbol: pair.token0.symbol,
    //     token1Symbol: pair.token1.symbol,
    //     pool: `${pair.token0.symbol}/${pair.token1.symbol}`,
    //     poolAddress: `${pair.liquidityToken.address}`,
    //     token0Amount: `${token0Deposited.toSignificant(4)} ${pair.token0.symbol}`,
    //     token1Amount: `${token1Deposited.toSignificant(4)} ${pair.token1.symbol}`,
    //     token0Reserve: `${pair.reserve0.toExact(2)} ${pair.token0.symbol}`,
    //     token1Reserve: `${pair.reserve1.toExact(2)} ${pair.token1.symbol}`,
    //     share: `${poolTokenPercentage}%`,
    //   });

    //   newPoolCount++;
    //   console.log(`validPoolPairs.length: ${userLiquidityPools.length}. break the loop? ${newPoolCount} <=> ${displayCountIncrement}`);
    //   if (newPoolCount == displayCountIncrement)
    //     break;
    // }

    // // write readpoolpointer to state
    // setReadListPointer(readIdx);

    ///////////////////////////////////////////

    // const validPairs = await Promise.allSettled(checkLiquidityPositionTasks);

    // console.log(validPairs)

    // // now we process the pairs
    // // eslint-disable-next-line no-restricted-syntax
    // const userNonZeroLiquidityPositions = [];
    // for (let pair of validPairs) {
    //   pair = pair.value;

    //   let userPoolBalance = await getUserTokenBalanceRaw(pair.liquidityToken, account, library);
    //   if (userPoolBalance.isZero()) continue;

    //   userPoolBalance = new TokenAmount(pair.liquidityToken, userPoolBalance);

    //   const totalSupply = await getTokenTotalSupply(pair.liquidityToken, library, account);

    //   const token0Deposited = pair.getLiquidityValue(
    //     pair.token0,
    //     totalSupply,
    //     userPoolBalance,
    //     false
    //   );
    //   const token1Deposited = pair.getLiquidityValue(
    //     pair.token1,
    //     totalSupply,
    //     userPoolBalance,
    //     false
    //   );

    //   const poolTokenPercentage = new Percent(userPoolBalance.raw, totalSupply.raw).toFixed(4);

    //   userNonZeroLiquidityPositions.push({
    //     token0: pair.token0,
    //     token1: pair.token1,
    //     token0LogoURI: getLogoURIWithSymbol(pair.token0.symbol),
    //     token1LogoURI: getLogoURIWithSymbol(pair.token1.symbol),
    //     token0Symbol: pair.token0.symbol,
    //     token1Symbol: pair.token1.symbol,
    //     pool: `${pair.token0.symbol}/${pair.token1.symbol}`,
    //     poolAddress: `${pair.liquidityToken.address}`,
    //     token0Amount: `${token0Deposited.toSignificant(4)} ${pair.token0.symbol}`,
    //     token1Amount: `${token1Deposited.toSignificant(4)} ${pair.token1.symbol}`,
    //     token0Reserve: `${pair.reserve0.toExact(2)} ${pair.token0.symbol}`,
    //     token1Reserve: `${pair.reserve1.toExact(2)} ${pair.token1.symbol}`,
    //     share: `${poolTokenPercentage}%`,
    //   });
    // }
    // console.log("test length2: ", userNonZeroLiquidityPositions.length);
    // console.log("nonZeroPositions: ", userNonZeroLiquidityPositions);

    // return userShares;

  }

  // auto scroll to newly loaded data
  useEffect(() => {
    if (filteredData.length) {
      document.querySelector(`#liquidityPositionTable > div > div >div.ant-table-body > table > tbody > tr:last-child`).scrollIntoView({ behavior: "smooth" });
      console.log(`scroll last row of table into view`);
    }
  }, [filteredData]);

  useEffect(async () => {
    setLoading(true);
    console.log("test elapsed time", new Date());
    await getValidPoolList();
  }, []);

  useEffect(
    async () => {
      if (!chainId || !library || !account || !userLPHandlers) return;
      console.log("getting user liquidity")
      await getUserPoolShare();
    },
    [chainId, library, account, userLPHandlers]
  );

  // link liquidity position table and add component together
  const { dispatch, liquidity } = props;
  const setAddComponentPairs = (token0, token1) => {
    dispatch({
      type: "liquidity/setAddTokens",
      payload: {
        token0: token0,
        token1: token1
      }
    });
    console.log("test done setAddTokens from table")
  }

  return (
    <div>
      {!(userLPData.length) && loading ? (
        <h2 style={{ textAlign: "center", color: "white" }}> <Icon type="loading" /> Loading...</h2>
      ) : (
        <>
          <Table
            id="liquidityPositionTable"
            style={{ textAlign: 'center' }}
            rowKey="poolAddress"
            rowClassName={(record, index) => index === selectedRow ? styles.rowHighlighted : styles.rowNormal}
            expandedRowKeys={expandedRowKey}
            onExpand={(expanded, record) => { expandedRowKey === record.poolAddress ? setExpandedRowKey([]) : setExpandedRowKey(record.poolAddress)}}
            dataSource={filteredData}
            columns={columns.filter(item => item.visible)}
            pagination={false}
            scroll={{ y: 300 }} // this height is override by global.less #root > .ant-table-body
            locale={{
              emptyText: (
                <span>
                  <h2>No positions available. </h2>
                </span>
              ),
            }}
            // expandable row
            expandRowByClick
            expandIconAsCell={false}
            expandIconColumnIndex={6}
            expandIcon={(props) => {
              if (props.expanded) {
                return <a style={{ color: 'white' }} onClick={e => {
                  props.onExpand(props.record, e);
                }}><Icon type="down" /></a>
              } else {
                return <a style={{ color: 'white' }} onClick={e => {
                  props.onExpand(props.record, e);
                }}><Icon type="right" /></a>
              }
            }}
            expandedRowRender={(record) => {
              const data = userLPShares[record.poolAddress];
              return (
                <div>
                  <p>poolAddress: {record.poolAddress}</p>
                  <p>Token0 amount: {data?.token0Amount || "loading..."}</p>
                  <p>Token1 amount: {data?.token1Amount || "loading..."}</p>
                  <p>Share: {data?.share || "loading..."}</p>
              </div>
              )
            }}
            footer={() => (
              <>
                {userLPData.length < userLPData.length && (
                  <div className={styles.tableSeeMoreWrapper}>
                    <a
                      className={styles.tableSeeMore}
                      onClick={() => {
                        getAllUserLiquidityPositions()
                      }}
                    >
                      {loading ? <><Icon type="loading" /> Loading... </> : " See More..."}
                    </a>
                  </div>
                )}
              </>
            )}
          />
          {/* <Pagination
              current={page}
              defaultPageSize={pageEntryCount}
              total={userLiquidityPositions.length}
              onChange={(newPage) => setPage(newPage)}
            /> */}
          <AcyRemoveLiquidityModal
            removeLiquidityPosition={removeLiquidityPosition}
            isModalVisible={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default connect(({ liquidity }) => ({
  liquidity
}))(AcyLiquidityPositions);