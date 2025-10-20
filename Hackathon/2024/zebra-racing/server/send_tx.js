const { parentPort, workerData } = require('worker_threads');
const ZingoLib = require('./zingolib-wrapper/zingolib');

// Extract raceId and transactionDetails from workerData
const { tmpQueue } = workerData;
const client = new ZingoLib("https://zec.rocks:443", "main");

async function sendTx(tmpQueue) {
    return new Promise((resolve, reject) => {
        client.sendTransaction(tmpQueue)
            .then((txid)=>{
            console.log(txid);
            resolve(txid);
        }).catch(e => {
            reject(e);
        });
    });
}

// Execute the transaction logic in the worker thread
sendTx(tmpQueue)
  .then((txid) => {
    parentPort.postMessage({ success: true, txid });
  })
  .catch((error) => {
    parentPort.postMessage({ success: false, error: error.message });
  });
