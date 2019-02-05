# EtherscanQL

## A graphQL wrapper for the popular [Etherscan.io REST API.](https://etherscan.io/apis "Etherscan.io REST API")

_This implementation uses a single public API key and is limited to 5 req/s_

**Please append '/staging' to the server URL of the playground or the connection will fail**

Once you make it to the graphQL playground and the server is connected you can explore the self-documenting API to start crafting your queries!

To connect to this endpoint with Apollo Client so you can serve some ethereum information on your front end head over to :
[https://www.apollographql.com/docs/tutorial/client.html](https://www.apollographql.com/docs/tutorial/client.html "https://www.apollographql.com/docs/tutorial/client.html")

and connect to: `https://z81urwmpq2.execute-api.us-west-2.amazonaws.com/staging/`

### Accounts:

-   Get Ether Balance for a single Address (returned in wei; \* 0.000000000000000001 to return ETHER) 👍
-   Get Ether Balance for multiple Addresses in a single call👍
-   Get a list of 'Normal' Transactions By Address👍
-   Get a list of 'Internal' Transactions by Address👍
-   Get "Internal Transactions" by Transaction Hash👍
-   Get a list of "ERC20 - Token Transfer Events" by Address👍
-   Get list of Blocks Mined by Address👍

### Contracts:

-   Get Contract ABI for Verified Contract Source Codes👍
-   Get Contract Source Code for Verified Contract Source Code👍

### Transactions:

-   [BETA] Check Contract Execution Status (if there was an error during contract execution) 👍
-   [BETA] Check Transaction Receipt Status (Only applicable for Post Byzantium fork transactions) 👍

### Blocks:

-   [BETA] Get Block And Uncle Rewards by BlockNo 👍

### Event Logs:

-   [Beta] The Event Log API was designed to provide an alternative to the native eth_getLogs. 🛠️

### GETH/Parity proxy:

-   eth_blockNumber👍
-   Returns the number of most recent block

*   eth_getBlockByNumber👍
*   Returns information about a block by block number.

*   eth_getUncleByBlockNumberAndIndex👍
*   Returns information about a uncle by block number.

*   eth_getBlockTransactionCountByNumber👍
*   Returns the number of transactions in a block from a block matching the given block number

*   eth_getTransactionByHash👍
*   Returns the information about a transaction requested by transaction hash

*   eth_getTransactionByBlockNumberAndIndex👍
*   Returns information about a transaction by block number and transaction index position

*   eth_getTransactionCount👍
*   Returns the number of transactions sent from an address

*   eth_sendRawTransaction 🛠️
*   Creates new message call transaction or a contract creation for signed transactions

*   eth_getTransactionReceipt👍
*   Returns the receipt of a transaction by transaction hash

*   eth_call👍
*   Executes a new message call immediately without creating a transaction on the block chain

*   eth_getCode👍
*   Returns code at a given address

*   eth_getStorageAt (\*\*experimental)👍
*   Returns the value from a storage position at a given address.

*   eth_gasPrice👍
*   Returns the current price per gas in wei.

*   eth_estimateGas🛠️
*   Makes a call or transaction, which won't be added to the blockchain and returns the used gas, which can be used for estimating the used gas

### Tokens:

-   Get ERC20-Token TotalSupply by ContractAddress 👍
-   Get ERC20-Token Account Balance for TokenContractAddress 👍

### Stats:

-   Get Total Supply of Ether (returned in wei; \* 0.000000000000000001 to return ETHER)👍

-   Get ETHER LastPrice Price👍

## Sample Query

Get a list of 'Normal' Transactions By Address

-   [Optional Parameters] startblock: starting blockNo to retrieve results
-   endblock: ending blockNo to retrieve results
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
