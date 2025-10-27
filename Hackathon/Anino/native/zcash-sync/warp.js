const warp = require('./dist/index.node')

warp.initCoin(0, "./zec.db", "https://mainnet.lightwalletd.com:9067")
// warp.newAccount(0, "test_account")
warp.warp(0)
console.log("Finished")
