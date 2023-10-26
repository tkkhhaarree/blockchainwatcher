const Web3 = require("web3");
const wss_endpoint =
   "wss://wider-proud-mound.matic-testnet.discover.quiknode.pro/edeff6f8810a13f4bd51217fd0ddd18ac7f934f0/";

const web3 = new Web3(new Web3.providers.WebsocketProvider(wss_endpoint));

const wallet = web3.eth.accounts.wallet.create(5, "hello world");

console.log(wallet);

const sub = web3.eth.subscribe("newBlockHeaders", (err, res) => {
   const { number } = res;
   console.log("current block number: ", number);
   web3.eth.getBlock(number).then((blockresult) => {
      blockresult.transactions.forEach(async (address) => {
         let t = await web3.eth.getTransaction(address);
         if (t.from == "0x9BC9Be2D29420EcF8EA3336Ac5187B27A5B572c7") {
            console.log(t);
         }
      });
   });
});
