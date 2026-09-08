# MultiSig 데모

> **역사적 자료입니다. 이 안내는 더 이상 실행되지 않습니다.**
>
> 아래의 모든 단계는 2026년 7월 18일 자동 지원 종료와 함께 중단된 zcashd에 의존하므로, 오늘날 실행 중인 노드에 연결할 수 없습니다.
>
> 이 스크립트들은 기계적으로 이식할 수 없습니다. 중단 전에 zcashd가 사용 중단한 원시 트랜잭션 및 지갑 RPC(`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`)를 기반으로 구축되었기 때문입니다. Zallet은 이를 원시 트랜잭션 16진수가 아닌 PCZT에서 작동하는 새 메서드로 대체하며, 아직 베타 단계이고 많은 zcashd 메서드가 아직 이식되지 않았습니다.
>
> 오늘날 Zcash에서 다자간 보관을 하려면, 투명한 multisig와의 직접 비교를 포함한 [FROST 및 임계값 보관](/zcash-tech/frost-threshold-custody)과 [Ywallet FROST 데모](/guides/ywallet-frost-demo)를 참조하세요. 기존 노드를 zcashd에서 이전하려면 [Zebra 및 Zallet 이전 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.
>
> 이 페이지는 투명 multisig 워크플로의 역사적 기록으로 보존됩니다.

이 데모는 2026년 7월 18일 중단되어 더 이상 실행되지 않는 zcashd가 필요합니다. 아래 내용은 어느 것도 라이브 체인에서 완료할 수 없습니다.

## 필요한 참여자로부터 공개 키 수집하기

* https://github.com/iancoleman/bip39
* zcashd를 사용하는 경우 UA를 생성하고 투명 수신기도 사용할 수 있습니다. 그런 다음 `getPubkey.sh`를 사용해 공개 키를 추출하세요.


## 2x Multisig(3개 중 2개) t3 주소 생성하기

createMultiSig.sh를 실행하여 multisig 주소와 redeem script를 생성하세요. 필요한 것은 공개 키 3개입니다.

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 첫 번째 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 거스름돈 주소용 두 번째 t3. 

#### 참고: 이 예시에서 pubk1,pubk4는 같은 사람이고, pubk2,pubk5도 같은 사람이며, 이하 동일합니다 ...

#### 참고2: pubkey의 순서가 중요합니다! 반드시 주의하세요!!!!


## t3 주소에 자금 입금하기

어떤 지갑/수도꼭지든 사용하여 주소에 자금을 입금하세요.

## MultiSig 트랜잭션 생성하기

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

각 항목의 의미는 다음과 같습니다.

```
        txid: 새 t3로 돈을 보낸 트랜잭션의 트랜잭션 ID
   voutIndex: 가장 큰 값을 가진 vout 내 출력의 인덱스
scriptPubKey: P2SH 잠금 스크립트에는 HASH160 및 EQUAL opcode로 둘러싸인 다른 잠금 스크립트(Script Hash)의 해시가 포함됩니다. 이는 16진수이며 getrawtransaction rpc를 통해 찾을 수 있습니다. scriptPubKey를 찾으세요.
redeemScript: t3를 생성할 때 출력된 redeemScript의 16진수 값입니다. t3에서 지출하려는 모든 사람에게 필요합니다.
   oldAmount: 위 txid에서 새 t3로 보낸 금액
       tAddy: 자금을 보낼 주소
      amount: tAddy로 보낼 ZEC 금액
 changeTaddy: 거스름돈 주소(새 redeemScript가 있는 새 t3!)

```

`./txDetails.sh txid`   => 필요한 정보를 찾는 데 도움이 됩니다

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX 서명하기

signMultiSigTX.sh를 열고 pk1,pk2, ... 변수에 개인 키를 추가하세요.
 

*** 이를 터미널에 입력하는 것은 권장하지 않습니다. ***


모든 개인 키에 접근할 수 있다면 시간을 절약하기 위해 한 번에 모두 사용할 수 있습니다.
하지만 실제 상황의 대부분에서는 전 세계에 있는 사람들이 서명하게 되므로, 필요한 각 참여자가 서명한 뒤
다른 이들이 서명을 완료하는 데 사용할 업데이트된 raxTX "hex" 출력을 다시 보내야 합니다.

첫 번째 tx를 생성한 사람은 자신의 개인 키로 서명하고, 다른 참여자들이 서명해야 하는 업데이트된 rawTX hex를 전송합니다.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

이 tx에 서명하려면 세 개의 개인 키 중 최소 두 개가 서명해야 합니다. 제공한 공개 키가 zcashd의 T-address를 사용하여 내보내진 것이라면, 다음으로 T 주소의 개인 키를 얻을 수 있습니다. 


`zcash-cli dumpprivkey "t-addr"`

이 명령은 zcashd와 함께 중단되었으며 오늘날 아무것도 반환하지 않습니다. 이 데모가 키를 얻은 방법을 보여주기 위한 기록으로만 남겨둡니다.


이 데모에서는 필요한 개인 키를 빠르게 분리하기 위해 iancoleman의 bip39를 사용했습니다.


## 서명된 TX 브로드캐스트하기

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 출처

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
