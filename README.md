# EtherscanQL

## A graphQL wrapper for the popular [Etherscan.io REST API.](https://etherscan.io/apis "Etherscan.io REST API")

_This implementation uses a single public API key and is limited to 5 req/s_

**Please append '/staging' to the server URL of the playground or the connection will fail**

Once you make it to the graphQL playground and the server is connected you can explore the self-documenting API to start crafting your queries!

To connect to this endpoint with Apollo Client so you can serve some ethereum information on your front end head over to :
[https://www.apollographql.com/docs/tutorial/client.html](https://www.apollographql.com/docs/tutorial/client.html "https://www.apollographql.com/docs/tutorial/client.html")

and connect to: `https://z81urwmpq2.execute-api.us-west-2.amazonaws.com/staging/`

### Accounts:

- Get Ether Balance for a single Address (returned in wei; \* 0.000000000000000001 to return ETHER) 👍
- Get Ether Balance for multiple Addresses in a single call👍
- Get a list of 'Normal' Transactions By Address👍
- Get a list of 'Internal' Transactions by Address👍
- Get "Internal Transactions" by Transaction Hash👍
- Get a list of "ERC20 - Token Transfer Events" by Address👍
- Get list of Blocks Mined by Address👍

### Contracts:

- Get Contract ABI for Verified Contract Source Codes👍
- Get Contract Source Code for Verified Contract Source Code👍

### Transactions:

- [BETA] Check Contract Execution Status (if there was an error during contract execution) 👍
- [BETA] Check Transaction Receipt Status (Only applicable for Post Byzantium fork transactions) 👍

### Blocks:

- [BETA] Get Block And Uncle Rewards by BlockNo 👍

### Event Logs:

- [Beta] The Event Log API was designed to provide an alternative to the native eth_getLogs. 🛠️

### GETH/Parity proxy:

* eth_blockNumber👍

 _=> Returns the number of most recent block_

* eth_getBlockByNumber👍

 _=> Returns information about a block by block number._

* eth_getUncleByBlockNumberAndIndex👍

 _=> Returns information about a uncle by block number._

* eth_getBlockTransactionCountByNumber👍

 _=> Returns the number of transactions in a block from a block matching the given block number_

* eth_getTransactionByHash👍

 _=> Returns the information about a transaction requested by transaction hash_

* eth_getTransactionByBlockNumberAndIndex👍

 _=> Returns information about a transaction by block number and transaction index position_

* eth_getTransactionCount👍

 _=> Returns the number of transactions sent from an address_

* eth_sendRawTransaction 🛠️

 _=> Creates new message call transaction or a contract creation for signed transactions_

* eth_getTransactionReceipt👍

 _=> Returns the receipt of a transaction by transaction hash_

* eth_call👍

 _=> Executes a new message call immediately without creating a transaction on the block chain_

* eth_getCode👍

 _=> Returns code at a given address_

* eth_getStorageAt (\*\*experimental)👍

 _=> Returns the value from a storage position at a given address._

* eth_gasPrice👍

 _=> Returns the current price per gas in wei._

* eth_estimateGas🛠️

 _=> Makes a call or transaction, which won't be added to the blockchain and returns the used gas, which can be used for estimating the used gas_

### Tokens:

- Get ERC20-Token TotalSupply by ContractAddress 👍
- Get ERC20-Token Account Balance for TokenContractAddress 👍

### Stats:

- Get Total Supply of Ether (returned in wei; \* 0.000000000000000001 to return ETHER)👍

- Get ETHER LastPrice Price👍

## Sample Query

Get a list of 'Normal' Transactions By Address

- [Optional Parameters] startblock: starting blockNo to retrieve results
- endblock: ending blockNo to retrieve results
  _(Returns up to a maximum of the last 10000 transactions only)_

```
query {
  normalTxByAddress(
    account: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
    startblock: "47884"
    endblock: "915000"
  ) {
    blockNumber
    gas
    hash
  }
}
```

![normal TX by address](/normalTXexample.jpg "normal TX by address")



## Next Steps

### Build a proper front end with React and Apollo Client to consume this API

- I would like to explore more with NextJS to play with server-side-rendering in React.

- I also want to write more plain CSS (no bootstrap/frameworks) with Flexbox and Grid

### Continue expanding the capabilities of graphQL

- Caching results and creating a database store (looking at you Redis) 

- Offer support for WebSockets for real-time data and as a way to use pub/sub patterns to possibility reduce the amout of calls on the system.

- Eventually I would like to try and tackle of creating a graphQL API for infura to offer more direct and comprehensive API to interact with the ethereum and IPFS ecosytem.
