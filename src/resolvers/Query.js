const fetch = require("node-fetch");
const { apiKey } = process.env;
// const weiToEth = string =>
//   parseFloat(string) * (0.000000000000000001).toString();

const url = require("url");
const ApiEndpoint = "https://api.etherscan.io/api";

const apiConstructor = (module, action, params) => {
  const myURL = new URL(`${ApiEndpoint}?apikey=${apiKey}`);

  myURL.searchParams.append("module", module);
  myURL.searchParams.append("action", action);

  Object.keys(params).map((key, index) => {
    myURL.searchParams.append(key, params[key]);
  });
  return myURL.href;
};

const Query = {
  ////////////////////////
  //      accounts      //
  ////////////////////////

  address(parent, args, ctx, info) {
    //https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken
    // amount of ETH for a single address.
    const { account } = args;

    const params = {
      address: account,
      tag: "latest"
    };

    const queryString = apiConstructor("account", "balance", params);
    const apiCall = fetch(queryString).then(res =>
      res.json().then(data => data.result)
    );

    return apiCall;
  },

  addresses(parent, args, ctx, info) {
    //https://api.etherscan.io/api?module=account&action=balancemulti&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67&tag=latest&apikey=YourApiKeyToken
    const { accounts } = args;
    const params = {
      address: accounts,
      tag: "latest"
    };
    const queryString = apiConstructor("account", "balancemulti", params);

    const apiCall = fetch(queryString).then(res =>
      res.json().then(data => data.result)
    );

    return apiCall;
  },

  normalTxByAddress(parent, args, ctx, info) {
    //`http://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=${startblock}&endblock=${endblock}&sort=${order}&apikey=${apiKey}`
    //[Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results
    // (Returns up to a maximum of the last 10000 transactions only)
    const { account, startblock, endblock, order } = args;

    !startblock ? (startblock = "0") : startblock;
    !endblock ? (endblock = "999999999") : endblock;
    !order ? (order = "asc") : order;

    const params = {
      address: account,
      startblock: startblock,
      endblock: endblock,
      sort: order
    };
    const queryString = apiConstructor("account", "txlist", params);

    const apiCall = fetch(queryString).then(res =>
      res.json().then(data => data.result)
    );

    return apiCall;
  },

  internalTxByAddress(parent, args, ctx, info) {
    const { account, startblock, endblock, order } = args;

    !startblock ? (startblock = "0") : startblock;
    !endblock ? (endblock = "999999999") : endblock;
    !order ? (order = "asc") : order;

    const apiCall = fetch(
      `http://api.etherscan.io/api?module=account&action=txlistinternal&address=${account}&startblock=${startblock}&endblock=${endblock}&sort=${order}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));

    return apiCall;
  },
  internalTxByHash(parent, args, ctx, info) {
    const { hash } = args;

    const apiCall = fetch(
      `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${hash}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));

    return apiCall;
  },

  ERC20TransferEventsByAddress(parent, args, ctx, info) {
    let { account, startblock, endblock, order } = args;

    !startblock ? (startblock = "0") : startblock;
    !endblock ? (endblock = "999999999") : endblock;
    !order ? (order = "asc") : order;

    const apiCall = fetch(
      `http://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=${startblock}&endblock=${endblock}&sort=${order}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  blocksMinedByAddress(parent, args, ctx, info) {
    const { account } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=account&action=getminedblocks&address=${account}&blocktype=blocks&apikey=YourApiKeyToken${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  ////////////////////////
  //      Contracts     //
  ////////////////////////
  getContractABI(parent, args, ctx, info) {
    const { contract } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contract}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  getContractSourceCode(parent, args, ctx, info) {
    const { contract } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contract}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  ////////////////////////
  //    Transactions    //
  ////////////////////////
  checkContractExecutionStatus(parent, args, ctx, info) {
    const { txhash } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  checkTransactionReceiptStatus(parent, args, ctx, info) {
    const { txhash } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txhash}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  ////////////////////////
  //       Blocks       //
  ////////////////////////
  getBlockAndUncleRewardsByBlockNo(parent, args, ctx, info) {
    //Returns  Block And Uncle Rewards by BlockNo
    const { blockNo } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNo}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  ////////////////////////
  //    Event Logs      //
  ////////////////////////

  // NOT WORKING
  // [Beta] The Event Log API was designed to provide an alternative to the native eth_getLogs. Below are the list of supported filter parameters:
  // fromBlock, toBlock, address
  // topic0, topic1, topic2, topic3 (32 Bytes per topic)
  // topic0_1_opr (and|or between topic0 & topic1), topic1_2_opr (and|or between topic1 & topic2), topic2_3_opr (and|or between topic2 & topic3), topic0_2_opr (and|or between topic0 & topic2), topic0_3_opr (and|or between topic0 & topic3), topic1_3_opr (and|or between topic1 & topic3)
  // * fromBlock and toBlock accepts the blocknumber (integer, NOT hex) or 'latest' (earliest & pending is NOT supported yet)
  // * Topic Operator (opr) choices are either 'and' or 'or' and are restricted to the above choices only
  // * fromBlock and toBlock parameters are required
  // * Either the address and/or topic(X) parameters are required, when multiple topic(X) parameters are used the topicX_X_opr (and|or operator) is also required
  // * For performance & security considerations, only the first 1000 results are return. So please narrow down the filter parameters

  ////////////////////////
  // GETH/Paritx Proxy  //
  ////////////////////////

  eth_BlockNumber(parent, args, ctx, info) {
    //Returns the number of most recent block
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apiKey}`
    ).then(res => res.json().then(data => data));
    return apiCall;
  },
  eth_getBlockByNumber(parent, args, ctx, info) {
    //Returns information about a block by block number.
    const { blockNo } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNo}&boolean=true&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },

  eth_getUncleByBlockNumberAndIndex(parent, args, ctx, info) {
    //Returns information about a uncle by block number.
    const { blockNo } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=${blockNo}&index=0x0&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getBlockTransactionCountByNumber(parent, args, ctx, info) {
    // Returns the number of transactions in a block from a block matching the given block number
    const { blockNo } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNo}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getTransactionByHash(parent, args, ctx, info) {
    // Returns the information about a transaction requested by transaction hash
    const { hash } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getTransactionByBlockNumberAndIndex(parent, args, ctx, info) {
    // Returns information about a transaction by block number and transaction index position
    const { blockNo } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${blockNo}&index=0x0&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getTransactionCount(parent, args, ctx, info) {
    // Returns the number of transactions sent from an address
    const { account } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${account}&tag=latest&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  // Not Supported Now
  // eth_sendRawTransaction(parent, args, ctx, info) {
  //   //Creates new message call transaction or a contract creation for signed transactions
  //   const { hex } = args;
  //   const apiCall = fetch(
  //     `https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${hex}&apikey=YourApiKeyToken${apiKey}`
  //   ).then(res => res.json().then(data => data));
  //   return apiCall;
  // },
  eth_getTransactionReceipt(parent, args, ctx, info) {
    // Returns the receipt of a transaction by transaction hash
    const { txHash } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_call(parent, args, ctx, info) {
    //Executes a new message call immediately without creating a transaction on the block chain
    const { address, data } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_call&to=${address}&data=${data}&tag=latest&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getCode(parent, args, ctx, info) {
    //Returns code at a given address
    const { address } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=${address}&tag=latest&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_getStorageAt(parent, args, ctx, info) {
    // Returns the value from a storage position at a given address. (**experimental)
    const { address } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getStorageAt&address=${address}&position=0x0&tag=latest&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  eth_gasPrice(parent, args, ctx, info) {
    // Returns the current price per gas in wei.
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  // Not supported now
  // eth_estimateGas(parent, args, ctx, info) {
  //   // Makes a call or transaction, which won't be added to the blockchain and returns the used gas, which can be used for estimating the used gas
  //   const { address, value, gasPrice, gas } = args;
  //   const apiCall = fetch(
  //     `  # https://api.etherscan.io/api?module=proxy&action=eth_estimateGas&to=${address}&value=${value}&gasPrice=${gasPrice}&gas=${gas}&apikey=${apikey}`
  //   ).then(res => res.json().then(data => data.result));
  //   return apiCall;
  // }

  ////////////////////////
  //     Tokens         //
  ////////////////////////

  getERC20TokenSupplyByContract(parent, args, ctx, info) {
    //Returns ERC20-Token TotalSupply by ContractAddress
    const { address } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${address}&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },

  getERC20TokenBalanceByContract(parent, args, ctx, info) {
    //Returns ERC20-Token Account Balance for TokenContractAddress
    const { contract, address } = args;
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contract}&address=${address}&tag=latest&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  ////////////////////////
  //      Stats         //
  ////////////////////////
  getTotalSupplyOfEther(parent, args, ctx, info) {
    // Get total supply of ether
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  },
  getEtherLastPrice(parent, args, ctx, info) {
    // Get ETHER LastPrice Price
    const apiCall = fetch(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`
    ).then(res => res.json().then(data => data.result));
    return apiCall;
  }
};

export { Query as default };
