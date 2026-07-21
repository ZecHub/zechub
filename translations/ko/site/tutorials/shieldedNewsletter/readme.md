# Shielded 뉴스레터


## 설정

 * RPC가 켜져 있고 쿠키를 사용하도록 구성된 상태로 실행 중이며 완전히 동기화된 Zebrad 노드
 * 완전히 동기화된 Zainod
 * RPC를 실행하도록 설정된 Zallet


### Zallet 시작

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

구성된 zallet.toml 파일과 함께

예시 toml:

```markdown
[builder]

trusted_confirmations = 1

untrusted_confirmations = 1

[builder.limits]

[consensus]

network = "main"

[database]

[external]

[features]

as_of_version = "0.0.0"

[features.deprecated]

[features.experimental]

#
[indexer]


validator_address = "127.0.0.1:8232"

# Enable validator RPC cookie authentication.
validator_cookie_auth = true

# Path to the validator cookie file.
validator_cookie_path = "/home/zktails/.cache/zebra/.cookie"


db_path = "/home/zktails/.cache/zaino"

[keystore]

require_backup = false

[note_management]

[rpc]

bind = ["127.0.0.1:8237"]
```


### toCurl.sh

`chmod +x toCurl.sh`

올바른 zebrad RPC (8232) 포트로 수정하고 zebrad 쿠키의 사용자 이름과 비밀번호를 포함하세요


`__cookie__:yourpasswordhere`


### RPC 테스트

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

다음이 출력되어야 합니다

```bash
getrawtransaction
getwalletinfo
help
listaddresses
rpc.discover
stop
walletlock
walletpassphrase
z_getaddressforaccount
z_getnewaccount
z_getnotescount
z_getoperationresult
z_getoperationstatus
z_gettotalbalance
z_listaccounts
z_listoperationids
z_listunifiedreceivers
z_listunspent
z_recoveraccounts
z_sendmany
z_viewtransaction
```
참고: 스크립트를 실행하는 폴더에 zallet 실행 파일의 복사본이 있는지 확인하세요

### 스크립트 실행

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

사용하려는 UA로 daoAddress.md를 업데이트하세요

txBuilderFromFile.sh를 열고 "from" 변수를 zallet 지갑에 있는 자금이 들어 있는 UA로 업데이트하세요

그런 다음,

`./shieldNewsletter.sh yourNewsletterHere.md`
