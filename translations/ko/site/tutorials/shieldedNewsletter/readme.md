# 거래정보 보호 뉴스레터


## 설정

 * Zebrad 노드가 실행 중이며 완전히 동기화되었고, RPC가 활성화되어 쿠키를 사용하도록 설정됨
 * zainod 완전히 동기화됨
 * Zallet RPC가 실행되도록 설정됨


### Zallet 시작하기

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

설정된 zallet.toml 파일 사용

toml 예시:

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

올바른 zebrad RPC 포트(8232)를 수정하고 zebrad 쿠키의 사용자 이름과 비밀번호를 포함합니다


`__cookie__:yourpasswordhere`


### RPC 테스트

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

다음과 같이 출력되어야 합니다

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
참고: 스크립트를 실행하는 폴더에 zallet 실행 파일의 사본이 있는지 확인하세요

### 스크립트 실행

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

daoAddress.md를 업데이트하여 사용할 UA를 지정합니다

txBuilderFromFile.sh를 열고 “from” 변수를 zallet 지갑에 있는 잔액이 있는 UA로 업데이트합니다

그런 다음,

`./shieldNewsletter.sh yourNewsletterHere.md`
