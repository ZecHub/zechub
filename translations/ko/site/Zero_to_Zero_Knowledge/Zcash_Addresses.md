# Zero to Zero Knowledge: 투명 거래와 거래정보 보호 거래 및 통합 주소

**시리즈:** Zero to Zero Knowledge

Zcash에 대해 처음 배우신다면, 사용할 수 있는 거래 유형이 **투명**과 **거래정보 보호** 두 가지라는 것을 알게 되실 것입니다.  

오늘은 두 유형을 알아보고 #Zcash 생태계의 새로운 기능 중 하나인 **통합 주소**를 살펴보겠습니다.

---

## 투명 거래와 거래정보 보호 거래

- **투명 거래**는 **t-address**(Base58 인코딩)를 사용합니다. Bitcoin과 마찬가지로 모든 정보가 공개됩니다.  
- **거래정보 보호 거래**는 **Sapling** 또는 **Orchard** 풀에 맞게 인코딩된 주소를 사용합니다. 영지식 증명을 사용해 송신자, 수신자, 금액을 숨깁니다.

**거래정보 보호 거래**란 Sapling/Orchard 풀에 맞게 인코딩된 주소가 포함된 모든 거래를 말합니다.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**통합 주소(UA)**는 거래정보 보호 거래와 투명 거래를 하나의 주소로 **통합**하도록 설계되었습니다.

---

## Zcash의 주소 유형

사용되는 주소 유형은 3가지입니다.

1. **(T) 투명** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) 통합 주소** – Bech32m  

유형마다 문자 수가 늘어나므로 QR 코드 크기도 커집니다.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## 통합 주소의 작동 방식

주소와 키는 바이트 시퀀스로 인코딩됩니다(**원시 인코딩**).  
**수신자 인코딩**에는 특정 프로토콜을 사용해 자산을 전송하는 데 필요한 모든 정보가 포함됩니다.

통합 주소의 원시 인코딩은 수신자 인코딩(유형 코드, 길이, 주소)을 결합한 것입니다.

- UA: `0x03`  
- Sapling: `0x02`  
- 투명: `0x01`  

**중요:** 모든 UA에는 **거래정보 보호 결제 주소가 최소 1개** 포함되어야 합니다. (Sprout 주소는 Canopy 업그레이드 이후 지원되지 않습니다.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

전체 사양: **[ZIP-316: 통합 주소](https://zips.z.cash/zip-0316)**

---

## 통합 주소의 이점

- **거래소에서 더 쉽게 지원** - 이제 거래소에서 거래정보 보호 입금 및 출금을 더 안전하게 지원할 수 있습니다.  
- **미래에도 사용 가능** - 지갑을 손상시키지 않고 새로운 거래정보 보호 구역을 추가할 수 있습니다.  
- **기본적으로 거래정보 보호** - 모든 UA에는 거래정보 보호 주소가 최소 1개 포함되므로, 언제든 프라이버시를 보호할 수 있습니다.

이는 이미 더 많은 ZEC이 거래정보 보호 구역으로 이동하도록 돕고 있는 근본적인 변화입니다.

---

## Orchard 거래 및 작업

Orchard에서는 **작업**이라는 새로운 개념을 도입했습니다.

- 거래의 모든 작업에 **단일 앵커**를 사용해 메타데이터 노출을 줄입니다.  
- (V4) 지출과 출력을 하나의 커밋먼트 값으로 결합합니다.  
- 이를 통해 Halo2 증명 시스템의 성능을 최적화할 수 있습니다.

Daira가 앵커 위치를 설명합니다(zcon3).

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

## 잔액 및 프라이버시

경우에 따라(예: 풀 간 거래) 외부 관찰자에게 금액이 보일 수 있습니다. 그러나 `valueBalanceSapling`와 `valueBalanceOrchard`는 **동형 커밋먼트**를 사용해 거래정보 보호 구역 내 총 ZEC을 증명하고 위조를 방지합니다.

자세히 알아보기: [ZIP 209: 범위를 벗어난 체인 가치 풀 잔액 금지](https://zips.z.cash/zip-0209)

---

## 향후 개선 사항

ECC 팀은 `zcashd`에서 새로운 RPC 메서드를 개발하고 있습니다(`z_sendmany` 대체). 이를 통해 사용자는 제안된 거래의 프라이버시 특성을 바탕으로 거래를 미리 확인하고 수락하거나 거부할 수 있게 됩니다.

---

## 권장 사항

이 스레드에서는 원래 **YWallet**를 소개하며, 전송 버튼을 누르기 전에 거래 계획을 보여주었습니다. YWallet는 더 이상 유지 관리되지 않으며 Ironwood에 맞춰 업데이트되지 않으므로, 체인을 더 이상 따라갈 수 없습니다. 대신 [지갑](https://zechub.wiki/wallets) 페이지에서 유지 관리되는 지갑을 선택하고, 거래가 전송되기 전에 어떤 정보가 공개되는지 알려주는 지갑을 사용하시기 바랍니다.

거래 프라이버시에 관한 훌륭한 글: https://medium.com/@hanh.huynh/

---

**원본 스레드 작성자: ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 스레드를 바탕으로 작성되었습니다.*
