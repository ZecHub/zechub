# MultiSig 예제

이 예제는 zcashd가 필요합니다.

## 필요한 사람들의 공개 키를 수집하세요

* https://github.com/iancoleman/bip39
* zcashd를 사용하는 경우, UA를 생성하고 투명 수신 주소도 함께 사용할 수 있습니다. 그런 다음 `getPubkey.sh` 스크립트를 사용하여 공개 키를 추출할 수 있습니다.

## 2x MultiSig (3 중 2) t3 주소 생성

`createMultiSig.sh`를 실행하여 MultiSig 주소와 리딤 스크립트를 생성합니다. 필요한 것은 3개의 공개 키입니다.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 첫 번째 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 변경 주소용 두 번째 t3. 

#### 참고: 이 예제에서 pubk1, pubk4는 동일한 사람, pubk2, pubk5는 동일한 사람이며 계속 됩니다...

#### 참고 2: 공개 키의 순서가 중요합니다! 이에 주의하세요!!!!

## t3 주소 자금 입금

어떤 지갑이나 faucet을 사용하여 주소를 충전하세요.

## MultiSig 트랜잭션 생성

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

여기서,

```
        txid: 새로운 t3에 자금이 입금된 트랜잭션의 ID
   voutIndex: vout에서 가장 큰 값을 가진 출력물의 인덱스
scriptPubKey: P2SH 잠금 스크립트는 다른 잠금 스크립트(스크립트 해시)의 해시를 포함하며, HASH160과 EQUAL 오퍼레이터로 둘러싸여 있습니다. 이 값은 hex 형식이며, getrawtransaction RPC 명령어를 사용하여 scriptPubKey를 확인할 수 있습니다.
redeemScript: t3 생성 시 출력된 리딤 스크립트의 hex 값입니다. 이는 t3에서 자금을 인출하고자 하는 모든 사람에게 필요합니다.
   oldAmount: 위 txid로 부터 새로운 t3에 전송된 금액
       tAddy: 자금을 보내고자 하는 주소
      amount: tAddy로 보낼 ZEC의 양
 changeTaddy: 변경 주소 (새로운 리딤 스크립트를 가진 새로운 t3)

```

`./txDetails.sh txid`   => 필요한 정보를 찾는 데 도움이 됩니다

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** 서명에 필요합니다! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig 트랜잭션 서명

`signMultiSigTX.sh`를 열고 pk1, pk2, ... 변수에 개인 키를 추가하세요.
 

*** 터미널에 직접 입력하는 것을 추천하지 않습니다. ***


모든 개인 키에 접근할 수 있다면 시간을 절약하기 위해 모두 한 번에 사용할 수 있지만,
실제 상황에서는 전 세계의 사람들이 서명하게 되므로 필요한 참여자들이 각각 서명한 후, 업데이트된 raxTX "hex" 출력물을 다른 사람에게 보내고 그들은 이를 기반으로 서명하여 전체 서명 절차를 완료합니다.

첫 번째 트랜잭션을 생성한 사람은 자신의 개인 키로 서명하고 나머지 참여자들이 서명해야 하는 업데이트된 rawTX hex 값을 다른 사람에게 보냅니다.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

이 트랜잭션을 서명하려면 3개의 개인 키 중 최소 2개가 필요합니다. 만약 사용한 공개 키가 zcashd에서 T-주소로 내보내졌다면, 다음과 같이 T 주소의 개인 키를 얻을 수 있습니다: 


`zcash-cli dumpprivkey "t-addr"`


이 예제에서는 iancoleman의 bip39를 사용하여 필요한 개인 키를 빠르게 분리했습니다.

## 서명된 트랜잭션 방송

`./sendMultiSignedTX.sh signedTXfromLastStep`
