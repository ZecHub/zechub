const chakram = require('chakram'), expect = chakram.expect;

describe('warp', async function () {
    var id_account;

    it("should allow creating new accounts", async function () {
        const account = await chakram.post('http://localhost:8000/new_account', {
            coin: 0,
            name: 'zecpages',
            key: 'zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz'
        })

        expect(account).to.have.status(200)
        id_account = account.body
        await chakram.post(`http://localhost:8000/set_active?coin=0&id_account=${id_account}`)
    })

    it("should give you the backup info", async function () {
        const backup = await chakram.get('http://localhost:8000/backup')

        expect(backup.body).to.deep.equal({
            "fvk": "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz",
            "seed": null,
            "sk": null
        })
    })

    it("should give you the latest block height", async function () {
        const heights = await chakram.get('http://localhost:8000/latest_height')

        expect(heights.body.latest > 1000000)
    })

    it("should not have balance because we didn't sync", async function () {
        const balance = await chakram.get('http://localhost:8000/balance')

        expect(balance.body).to.equals(0)
    })

    it("should not have a tx history because we didn't sync", async function () {
        const tx_history = await chakram.get('http://localhost:8000/tx_history')

        expect(tx_history.body.length).to.equals(0)
    })

    it("should sync", async function () {
        this.timeout(120000)
        await chakram.post('http://localhost:8000/sync?offset=0')
    })

    it("should rewind and resync", async function () {
        this.timeout(120000)
        await chakram.post('http://localhost:8000/rewind?height=419200')
        await chakram.post('http://localhost:8000/sync?offset=0')
        const balance = await chakram.get('http://localhost:8000/balance')
        expect(balance.body).to.not.equals(0)
    })

    it("should rewind to a past block", async function () {
        this.timeout(120000)
        await chakram.post('http://localhost:8000/rewind?height=1000000')
        const balance = await chakram.get('http://localhost:8000/balance')
        expect(balance.body).to.equals(364779600) // that's the balance at this block
    })

    it("can skip blocks", async function () {
        await chakram.post('http://localhost:8000/rewind?height=1000000')
        await chakram.post('http://localhost:8000/mark_synced')
        const balance = await chakram.get('http://localhost:8000/balance')
        expect(balance.body).to.equals(364779600) // that's the balance at this block
    })

    it("should create and parse payment uri", async function () {
        const p = {
            address: "zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn",
            amount: 100000,
            memo: "Hello"
        }
        const p_uri = await chakram.post('http://localhost:8000/make_payment_uri', p)
        expect(p_uri.body).to.equals('zcash:zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn?amount=0.001&memo=SGVsbG8')

        const payment = await chakram.get('http://localhost:8000/parse_payment_uri?uri=zcash%3Azs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn%3Famount%3D0.001%26memo%3DSGVsbG8')
        expect(payment.body).to.deep.equal(p)
    })

    it("should create offline payment requests", async function () {
        this.timeout(120000)
        await chakram.post('http://localhost:8000/rewind?height=1600000')
        await chakram.post('http://localhost:8000/sync?offset=10') // sync to compute note witnesses
        const payment_request = {
            recipients: [{
                address: "zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn",
                amount: 100000,
                memo: "Hello",
                reply_to: false,
                subject: "hello",
                max_amount_per_note: 0
            }],
            confirmations: 10
        }

        const unsigned_tx = await chakram.post('http://localhost:8000/create_offline_tx', payment_request)
        expect(unsigned_tx.body.outputs).to.deep.equal( // we cannot check the other fields because they change from run to run
            [
                {
                    "addr": "zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn",
                    "amount": 100000,
                    "memo": "f09f9ba14d53470a0a68656c6c6f0a48656c6c6f",
                    "ovk": "459121112ebe923d49af689b5aa2f67cccd62af3656549992e62aa373768ffef"
                }
            ]
        )
    })

    it("should give you the tx_history", async function () {
        const txs = await chakram.get('http://localhost:8000/tx_history')
        expect(txs.body.length).to.not.equals(0)
    })

    // cannot test signing without a secret key
    // need to setup a dummy account
})
