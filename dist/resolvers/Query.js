"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fetch = require("node-fetch");
const { apiKey } = process.env;
const URL = require("url").URL;
const ApiEndpoint = "https://api.etherscan.io/api";

const apiConstructor = (module, action, params) => {
  const myURL = new URL(`${ApiEndpoint}?apikey=${apiKey}`);

  myURL.searchParams.append("module", module);
  myURL.searchParams.append("action", action);

  if (!params) {
    return myURL.href;
  }
  Object.keys(params).map((key, index) => {
    myURL.searchParams.append(key, params[key]);
  });
  return myURL.href;
};

const apiTrigger = async queryString => {
  const call = await fetch(queryString).then(res => res.json().then(data => data.result));
  return call;
};

const defaultParams = (startblock, endblock, order) => {
  !startblock ? startblock = "0" : startblock;
  !endblock ? endblock = "999999999" : endblock;
  !order ? order = "asc" : order;

  return;
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
    const apiCall = apiTrigger(queryString);

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

    const apiCall = apiTrigger(queryString);

    return apiCall;
  },

  normalTxByAddress(parent, args, ctx, info) {
    //`http://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=${startblock}&endblock=${endblock}&sort=${order}&apikey=${apiKey}`
    //[Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results
    // (Returns up to a maximum of the last 10000 transactions only)
    let { account, startblock, endblock, order } = args;

    defaultParams(startblock, endblock, order);

    const params = {
      address: account,
      startblock: startblock,
      endblock: endblock,
      sort: order
    };
    const queryString = apiConstructor("account", "txlist", params);

    const apiCall = apiTrigger(queryString);

    return apiCall;
  },

  internalTxByAddress(parent, args, ctx, info) {
    // Get a list of 'Internal' Transactions by Address
    // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results
    // http://api.etherscan.io/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=2702578&sort=asc&apikey=YourApiKeyToken
    let { account, startblock, endblock, order } = args;

    defaultParams(startblock, endblock, order);

    const params = {
      address: account,
      startblock: startblock,
      endblock: endblock,
      sort: order
    };

    const queryString = apiConstructor("account", "txlistinternal", params);

    const apiCall = apiTrigger(queryString);

    return apiCall;
  },

  internalTxByHash(parent, args, ctx, info) {
    // Get "Internal Transactions" by Transaction Hash
    // https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170&apikey=YourApiKeyToken
    const { hash } = args;
    const params = {
      txhash: hash
    };
    const queryString = apiConstructor("account", "txlistinternal", params);

    const apiCall = apiTrigger(queryString);

    return apiCall;
  },

  ERC20TransferEventsByAddress(parent, args, ctx, info) {
    // Get a list of "ERC20 - Token Transfer Events" by Address
    // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results
    // http://api.etherscan.io/api?module=account&action=tokentx&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken

    let { account, startblock, endblock, order } = args;

    defaultParams(startblock, endblock, order);

    const params = {
      address: account,
      startblock: startblock,
      endblock: endblock,
      sort: order
    };
    const queryString = apiConstructor("account", "tokentx", params);

    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  blocksMinedByAddress(parent, args, ctx, info) {
    // Get list of Blocks Mined by Address
    //  https://api.etherscan.io/api?module=account&action=getminedblocks&address=0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b&blocktype=blocks&apikey=YourApiKeyToken
    const { account } = args;
    const params = {
      address: account,
      blocktype: "blocks"
    };
    const queryString = apiConstructor("account", "getminedblocks", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  ////////////////////////
  //      Contracts     //
  ////////////////////////
  getContractABI(parent, args, ctx, info) {
    // Get Contract ABI for Verified Contract Source Codes
    // https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
    const { contract } = args;
    const params = {
      address: contract
    };
    const queryString = apiConstructor("contract", "getabi", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  getContractSourceCode(parent, args, ctx, info) {
    // Get Contract Source Code for Verified Contract Source Codes
    // https://api.etherscan.io/api?module=contract&action=getsourcecode&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken

    const { contract } = args;
    const params = {
      address: contract
    };
    const queryString = apiConstructor("contract", "getsourcecode", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  ////////////////////////
  //    Transactions    //
  ////////////////////////
  checkContractExecutionStatus(parent, args, ctx, info) {
    // [BETA] Check Contract Execution Status (if there was an error during contract execution)
    // Note: isError":"0" = Pass , isError":"1" = Error during Contract Execution
    // https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a&apikey=YourApiKeyToken
    const { txhash } = args;
    const params = {
      txhash: txhash
    };
    const queryString = apiConstructor("transaction", "getstatus", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  checkTransactionReceiptStatus(parent, args, ctx, info) {
    // [BETA] Check Transaction Receipt Status (Only applicable for Post Byzantium fork transactions)
    // Note: status: 0 = Fail, 1 = Pass. Will return null/empty value for pre-byzantium fork
    // https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76&apikey=YourApiKeyToken
    const { txhash } = args;

    const params = {
      txhash: txhash
    };
    const queryString = apiConstructor("transaction", "gettxreceiptstatus", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  ////////////////////////
  //       Blocks       //
  ////////////////////////
  getBlockAndUncleRewardsByBlockNo(parent, args, ctx, info) {
    // [BETA] Get Block And Uncle Rewards by BlockNo
    // https://api.etherscan.io/api?module=block&action=getblockreward&blockno=2165403&apikey=YourApiKeyToken

    const { blockNo } = args;
    const params = {
      blockno: blockNo
    };
    const queryString = apiConstructor("block", "getblockreward", params);
    const apiCall = apiTrigger(queryString);
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
    // Returns the number of most recent block
    // https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken
    const queryString = apiConstructor("proxy", "eth_blockNumber");
    // this function needs to return 'data' and not data.result so no apiTrigger
    const apiCall = fetch(queryString).then(res => res.json().then(data => data));
    return apiCall;

    // const apiCall = fetch(
    //   `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apiKey}`
    // ).then(res => res.json().then(data => data));
    // return apiCall;
  },

  eth_getBlockByNumber(parent, args, ctx, info) {
    // Returns information about a block by block number.
    // https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true&apikey=YourApiKeyToken
    const { blockNo } = args;
    const params = {
      tag: blockNo,
      boolean: "true"
    };

    const queryString = apiConstructor("proxy", "eth_getBlockByNumber", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getUncleByBlockNumberAndIndex(parent, args, ctx, info) {
    // Returns information about a uncle by block number.
    // https://api.etherscan.io/api?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=0x210A9B&index=0x0&apikey=YourApiKeyToken
    const { blockNo } = args;
    const params = {
      tag: blockNo,
      index: "0x0"
    };
    const queryString = apiConstructor("proxy", "eth_getUncleByBlockNumberAndIndex", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getBlockTransactionCountByNumber(parent, args, ctx, info) {
    // Returns the number of transactions in a block from a block matching the given block number
    // https://api.etherscan.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=0x10FB78&apikey=YourApiKeyToken
    const { blockNo } = args;
    const params = {
      tag: blockNo
    };
    const queryString = apiConstructor("proxy", "eth_getBlockTransactionCountByNumber", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getTransactionByHash(parent, args, ctx, info) {
    // Returns the information about a transaction requested by transaction hash
    // https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1&apikey=YourApiKeyToken

    const { hash } = args;

    const params = {
      txhash: hash
    };
    const queryString = apiConstructor("proxy", "eth_getTransactionByHash", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getTransactionByBlockNumberAndIndex(parent, args, ctx, info) {
    // Returns information about a transaction by block number and transaction index position
    // https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=0x10d4f&index=0x0&apikey=YourApiKeyToken
    const { blockNo } = args;
    const params = {
      tag: blockNo,
      index: "0x0"
    };
    const queryString = apiConstructor("proxy", "eth_getTransactionByBlockNumberAndIndex", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getTransactionCount(parent, args, ctx, info) {
    // Returns the number of transactions sent from an address
    // https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=0x2910543af39aba0cd09dbb2d50200b3e800a63d2&tag=latest&apikey=YourApiKeyToken

    const { account } = args;

    const params = {
      address: account,
      tag: "latest"
    };
    const queryString = apiConstructor("proxy", "eth_getTransactionCount&address", params);
    const apiCall = apiTrigger(queryString);
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
    // https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1&apikey=YourApiKeyToken
    const { txHash } = args;
    const params = {
      txhash: txHash
    };
    const queryString = apiConstructor("proxy", "eth_getTransactionReceipt", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_call(parent, args, ctx, info) {
    // Executes a new message call immediately without creating a transaction on the block chain
    // https://api.etherscan.io/api?module=proxy&action=eth_call&to=0xAEEF46DB4855E25702F8237E8f403FddcaF931C0&data=0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724&tag=latest&apikey=YourApiKeyToken

    const { address, data } = args;

    const params = {
      to: address,
      data: data,
      tag: "latest"
    };
    const queryString = apiConstructor("proxy", "eth_call", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getCode(parent, args, ctx, info) {
    // Returns code at a given address
    // https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c&tag=latest&apikey=YourApiKeyToken

    const { address } = args;

    const params = {
      address: address,
      tag: "latest"
    };
    const queryString = apiConstructor("proxy", "eth_getCode", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_getStorageAt(parent, args, ctx, info) {
    // Returns the value from a storage position at a given address.
    // https://api.etherscan.io/api?module=proxy&action=eth_getStorageAt&address=0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd&position=0x0&tag=latest&apikey=YourApiKeyToken
    const { address } = args;
    const params = {
      address: address,
      position: "0x0",
      tag: "latest"
    };
    const queryString = apiConstructor("proxy", "eth_getStorageAt", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  eth_gasPrice(parent, args, ctx, info) {
    // Returns the current price per gas in wei.
    // https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=YourApiKeyToken
    const queryString = apiConstructor("proxy", "eth_gasPrice");
    const apiCall = apiTrigger(queryString);
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
    // Get ERC20-Token TotalSupply by ContractAddress
    // https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&apikey=YourApiKeyToken
    const { address } = args;
    const params = {
      contractaddress: address
    };
    const queryString = apiConstructor("stats", "tokensupply", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  getERC20TokenBalanceByContract(parent, args, ctx, info) {
    // Get ERC20-Token Account Balance for TokenContractAddress
    // https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken
    const { contract, address } = args;

    const params = {
      contractaddress: contract,
      address: address,
      tag: "latest"
    };
    const queryString = apiConstructor("account", "tokenbalance", params);
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  ////////////////////////
  //      Stats         //
  ////////////////////////
  getTotalSupplyOfEther(parent, args, ctx, info) {
    // Get Total Supply of Ether
    // https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=YourApiKeyToken
    // (Result returned in Wei, to get value in Ether divide resultAbove/1000000000000000000)
    const queryString = apiConstructor("stats", "ethsupply");
    const apiCall = apiTrigger(queryString);
    return apiCall;
  },

  getEtherLastPrice(parent, args, ctx, info) {
    // Get ETHER LastPrice Price
    // https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken
    const queryString = apiConstructor("stats", "ethprice");
    const apiCall = apiTrigger(queryString);
    return apiCall;
  }
};

exports.default = Query;