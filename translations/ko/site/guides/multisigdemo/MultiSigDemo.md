# 멀티시그 데모

> **역사적 자료입니다. 이 안내는 더 이상 실행되지 않습니다.**
>
> 아래의 모든 단계는 2026년 7월 18일 자동 지원 종료로 중단된 zcashd에 의존합니다. 이 페이지와 함께 제공된 7개의 스크립트는 `zcash-cli`를 통해 이를 구동하므로, 오늘날 실행 중인 노드에는 어느 것도 연결할 수 없습니다.
>
> 이 스크립트들은 기계적으로 이식할 수 없습니다. 이는 zcashd가 중단 전에 폐기한 원시 트랜잭션 및 지갑 RPC(`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`)를 기반으로 만들어졌습니다. Zallet은 원시 트랜잭션 hex 대신 PCZT에서 작동하는 새 메서드로 이를 대체하며, 아직 베타 상태이고 많은 zcashd 메서드가 아직 이식되지 않았습니다.
>
> 오늘날 Zcash에서 다자간 수탁을 위해서는 투명 멀티시그와의 직접 비교를 포함한 [FROST 및 임계값 수탁](/zcash-tech/frost-threshold-custody)과 [Ywallet FROST 데모](/guides/frostdemo/ywallet-frost-demo)를 참조하세요. 기존 노드를 zcashd에서 이전하려면 [Zebra 및 Zallet로의 이전 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.
>
> 이 페이지는 투명 멀티시그 워크플로의 역사적 기록으로 보존됩니다.

이 데모에는 2026년 7월 18일에 중단되어 더 이상 실행되지 않는 zcashd가 필요합니다. 아래 내용은 어느 것도 라이브 체인에서 완료할 수 없습니다.

## 필요한 참여자의 공개 키 수집

* https://github.com/iancoleman/bip39
* zcashd를 사용하는 경우 UA를 생성하고 투명 수신자를 사용할 수도 있습니다. 그런 다음 `getPubkey.sh`를 사용하여 공개 키를 추출하세요.


## 2x 멀티시그(3개 중 2개) t3 주소 생성

createMultiSig.sh를 실행하여 멀티시그 주소와 리딤 스크립트를 생성합니다. 필요한 것은 공개 키 3개입니다.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 첫 번째 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 잔돈 주소용 두 번째 t3. 

#### 참고: 이 예시에서 pubk1,pubk4는 같은 사람이고, pubk2,pubk5도 같은 사람이며, 이런 식으로 계속됩니다 ...

#### 참고2: 공개 키의 순서가 중요합니다! 반드시 주의하세요!!!!


## t3 주소에 자금 입금

어떤 지갑/수도꼭지든 사용하여 주소에 자금을 입금하세요

## 멀티시그 트랜잭션 생성

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

각 항목의 의미는 다음과 같습니다.

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => 필요한 정보를 찾는 데 도움이 됩니다

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## 멀티시그 TX 서명

signMultiSigTX.sh를 열고 pk1,pk2, ... 변수에 개인 키를 추가하세요.
 

*** 이를 터미널에 입력하는 것은 권장하지 않습니다. ***


모든 개인 키에 접근할 수 있다면 시간을 절약하기 위해 한 번에 모두 사용할 수 있습니다.
하지만 대부분의 실제 사례에서는 전 세계의 사람들이 서명을 수행하므로 필요한 각 참여자는 서명한 뒤,
다른 사람들이 서명을 완료하는 데 사용할 업데이트된 raxTX "hex" 출력을 다시 보내야 합니다.

첫 번째 tx를 생성한 사람은 자신의 개인 키로 서명하고, 다른 참여자들이 서명해야 하는 업데이트된 rawTX hex를 전송합니다.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

이 tx에 서명하려면 세 개의 개인 키 중 최소 두 개가 서명해야 합니다. 제공한 공개 키가 zcashd의 T-주소를 사용하여 내보내진 경우, 다음으로 T 주소의 개인 키를 얻을 수 있습니다. 


`zcash-cli dumpprivkey "t-addr"`

이 명령은 zcashd와 함께 중단되었으며 현재는 아무것도 반환하지 않습니다. 여기에는 데모가 키를 얻은 방법을 보여주기 위한 기록으로만 남아 있습니다.


이 데모에서는 필요한 개인 키를 빠르게 분리하기 위해 iancoleman의 bip39를 사용했습니다.


## 서명된 TX 브로드캐스트

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 출처

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
