# Zero to Zero Knowledge: 투명 트랜잭션 vs 보호 트랜잭션 및 통합 주소

**시리즈:** Zero to Zero Knowledge

처음으로 Zcash에 대해 배우고 있다면, 이용 가능한 트랜잭션에는 **투명**과 **보호**의 두 가지 유형이 있다는 것을 알게 될 것입니다.  

오늘은 이를 알아보고 #Zcash 생태계의 새로운 기능 중 하나인 **통합 주소**를 다룹니다.

---

## 투명 트랜잭션 vs 보호 트랜잭션

- **투명 트랜잭션**은 **t-주소**(Base58 인코딩)를 사용합니다. Bitcoin처럼 모든 것이 공개적으로 보입니다.  
- **보호 트랜잭션**은 **Sapling** 또는 **Orchard** 풀에 맞게 인코딩된 주소를 사용합니다. 영지식 증명을 사용하여 송신자, 수신자 및 금액을 숨깁니다.

**보호 트랜잭션**은 Sapling/Orchard 풀에 맞게 인코딩된 주소를 포함하는 모든 트랜잭션을 의미합니다.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**통합 주소(UA)**는 보호 또는 투명 트랜잭션을 하나의 주소로 **통합**하도록 설계되었습니다.

---

## Zcash의 주소 유형

현재 세 가지 유형의 주소가 사용됩니다:

1. **(T) 투명** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

각 유형마다 문자 수(따라서 QR 코드 크기)가 증가합니다.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## 통합 주소의 작동 방식

주소와 키는 바이트 시퀀스(**원시 인코딩**)로 인코딩됩니다.  
**수신자 인코딩**에는 특정 프로토콜을 사용해 자산을 전송하는 데 필요한 모든 정보가 포함됩니다.

Unified Address의 원시 인코딩은 수신자의 인코딩(typecode, length, addr)을 조합한 것입니다:

- UA: `0x03`  
- Sapling: `0x02`  
- 투명: `0x01`  

**중요**: 모든 UA에는 **최소 하나의 보호 결제 주소**가 있어야 합니다. (Sprout 주소는 Canopy 업그레이드 이후 더 이상 지원되지 않습니다.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

전체 사양: **[ZIP-316: 통합 주소](https://zips.z.cash/zip-0316)**

---

## 통합 주소의 이점

- **거래소에 더 용이함** - 이제 보호 입금/출금을 더 안전하게 지원할 수 있습니다.  
- **미래 지향적** - 지갑을 망가뜨리지 않고 새로운 보호 풀을 추가할 수 있습니다.  
- **기본 보호 설정** - 모든 UA에는 최소 하나의 보호 주소가 포함되어 있으므로, 프라이버시를 항상 이용할 수 있습니다.

이는 더 많은 ZEC가 보호 풀로 이동하는 데 이미 도움이 되고 있는 근본적인 변화입니다.

---

## Orchard 트랜잭션 및 액션

Orchard는 **액션**이라는 새로운 개념을 도입했습니다:

- 트랜잭션의 모든 액션에 **단일 앵커**를 사용하여 메타데이터 유출을 줄입니다.  
- (V4) Spend + Output 필드를 단일 가치 커밋먼트로 병합합니다.  
- 이를 통해 Halo2 증명 시스템의 성능 최적화가 가능해집니다.

Daira가 앵커 위치를 설명합니다(zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## 가치 균형 및 프라이버시

일부 경우(예: 풀 간 트랜잭션)에는 외부 관찰자에게 금액이 보일 수 있습니다. 그러나 `valueBalanceSapling` 및 `valueBalanceOrchard`는 **동형 커밋먼트**를 사용하여 보호 풀 내 총 ZEC를 증명하고 위조를 방지합니다.

더 알아보기: [ZIP 209: 범위를 벗어난 체인 가치 풀 잔액 금지](https://zips.z.cash/zip-0209)

---

## 향후 개선 사항

ECC 팀은 `zcashd`(`z_sendmany` 대체)의 새로운 RPC 메서드를 개발 중이며, 이를 통해 사용자는 프라이버시 특성에 따라 제안된 트랜잭션을 미리 보고 수락/거부할 수 있습니다.

---

## 권장 사항

이 스레드는 원래 전송을 누르기 전에 표시되는 트랜잭션 계획을 위해 **YWallet**를 가리켰습니다. YWallet는 더 이상 유지 관리되지 않으며 Ironwood에 맞춰 업데이트되지 않을 것이므로, 더 이상 체인을 따라갈 수 없습니다. 대신 [Wallets](https://zechub.wiki/wallets) 페이지에서 유지 관리되는 지갑을 선택하고, 전송 전에 트랜잭션이 무엇을 공개하는지 알려주는 지갑을 우선하세요.

트랜잭션 프라이버시에 관한 훌륭한 글: https://medium.com/@hanh.huynh/

---

**원본 스레드 작성자: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드에서 편집되었습니다.*
