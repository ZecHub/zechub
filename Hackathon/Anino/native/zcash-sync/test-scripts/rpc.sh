curl -X POST -H 'Content-Type: application/json' -d '{"coin": 0, "name": "test", "key": "zxviews1qvq5u9dnqqqqpqyc3wd00lql5njzdqx3xk670z5ldjuqkxm3lcphkvcyvpg2kavcze2edwj4f27k0s62q48dqdlnxlnr7jhczv2d8c9y2hw4uxgqrx9sluja52jqjtlqqsl65hd6p9xrdhzh7spgd0s4zud9xtv7sqepahchq06ng6w5vm36l9zjg0n2upkdv4k4yd7mhfsdpu9lqra0mnyq0k8v8f23j8pqq0ekr4f4aa7gf538eudpwck0yw3l74s37z4hf2xkyfq8eswwx"}' http://localhost:8000/new_account
curl -X GET http://localhost:8000/accounts
curl -X POST 'http://localhost:8000/set_active?coin=0&id_account=1'
curl -X GET http://localhost:8000/backup
curl -X GET http://localhost:8000/latest_height
curl -X GET http://localhost:8000/balance
curl -X GET http://localhost:8000/tx_history
curl -X GET http://localhost:8000/new_diversified_address
curl -X POST 'http://localhost:8000/sync?offset=0'
curl -X POST 'http://localhost:8000/rewind?height=1800000'
# Sync to latest height - 20 to calculate the witnesses for later
curl -X POST 'http://localhost:8000/sync?offset=20'
curl -X POST http://localhost:8000/mark_synced
curl -X POST -H 'Content-Type: application/json' -d '{"address": "zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn", "amount": 100000, "memo": "Hello"}' http://localhost:8000/make_payment_uri
curl -X GET http://localhost:8000/parse_payment_uri?uri=zcash%3Azs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn%3Famount%3D0.001%26memo%3DSGVsbG8
curl -X POST -H 'Content-Type: application/json' -d '{"recipients": [{"address": "zs1hn7qwpjz6p5n24hjhks73y6vn0tpk3c2cfu8wzgtgl4j9ht8ycjgjr47c94scce3uahaje9jkxn", "amount": 100000, "memo": "Hello", "reply_to": false, "subject": "hello", "max_amount_per_note": 0}], "confirmations": 10}' http://localhost:8000/create_offline_tx

// offline signing and pay need an account with a secret key

curl -X POST -H 'Content-Type: application/json' -d '{"coin": 0, "name": "test", "key": "bleak regret excuse hold divide novel rain clutch once used another visual forward small tumble artefact jewel bundle kid wolf universe focus weekend melt"}' http://localhost:8000/new_account
curl -X POST 'http://localhost:8000/rewind?height=1800000'
curl -X POST 'http://localhost:8000/sync?offset=0'
curl 'http://localhost:8000/unified_address?t=0&s=0&o=1'
