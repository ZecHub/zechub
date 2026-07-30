# 제로에서 제로 지식: 투명한 거래 vs 암호화된 거래 및 통합 주소

**시리즈:** 제로에서 제로 지식

Zcash를 처음 배우는 경우, 두 가지 유형의 거래가 존재함을 알게 될 것입니다: **투명한**(Transparent) 거래와 **암호화된**(Shielded) 거래입니다.

오늘은 이 두 가지에 대해 배우고 #Zcash 생태계에서 새롭게 추가된 기능 중 하나인 **통합 주소**(Unified Addresses)를 다룹니다.

---

## 투명한 거래 vs 암호화된 거래

- **투명한 거래**는 **t-주소**(Base58 인코딩)를 사용합니다. 모든 정보가 공개적으로 보입니다. 비트코인과 같습니다.
- **암호화된 거래**는 **Sapling** 또는 **Orchard** 풀에 대한 주소 인코딩을 사용합니다. 제로 지식 증명을 통해 송금자, 수령자 및 금액을 숨깁니다.

**암호화된 거래**(Shielded Transaction)는 Sapling/Orchard 풀에 대한 주소 인코딩이 포함된 모든 거래를 의미합니다.

![투명한 vs 암호화된 소개](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**통합 주소**(Unified Addresses)는 **암호화된 또는 투명한 거래**를 하나의 주소로 통합하도록 설계되었습니다.

---

## Zcash의 주소 유형

현재 사용 중인 주소 유형은 총 3가지입니다:

1. **(T) 투명한**(Transparent) – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) 통합 주소**(Unified Address) – Bech32m  

각 유형의 문자 수(따라서 QR 코드 크기)는 증가합니다.

![주소 유형 비교](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR 코드 크기 비교](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## 통합 주소의 작동 방식

주소와 키는 바이트 시퀀스(**Raw Encoding**)로 인코딩됩니다.  
**수신자 인코딩**(Receiver Encoding)은 특정 프로토콜을 사용하여 자산을 전송하기 위해 필요한 모든 정보를 포함합니다.

통합 주소의 Raw Encoding은 수신자의 인코딩(타입코드, 길이, 주소) 조합입니다:

- UA: `0x03`  
- Sapling: `0x02`  
- 투명한: `0x01`  

**중요**: 모든 UA에는 **최소 하나의 암호화된 지불 주소**(Shielded Payment Address)가 포함되어야 합니다. (Canopy 업그레이드 이후 Sprout 주소는 더 이상 지원되지 않습니다.)

![UA 인코딩 구조](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

전체 사양: **[ZIP-316: 통합 주소](https://zips.z.cash/zip-0316)**

---

## 통합 주소의 이점

- **거래소에 더 쉬움** - 이제 암호화된 입금/출금을 더 안전하게 지원할 수 있습니다.
- **미래 대비 가능** - 새로운 암호화된 풀이 추가되더라도 지갑이 손상되지 않습니다.
- **기본적으로 암호화됨** - 모든 UA에는 최소 하나의 암호화 주소가 포함되어 있으므로, 언제든지 프라이버시를 활용할 수 있습니다.

이것은 이미 더 많은 ZEC가 암호화된 풀로 이동하는 데 도움을 주는 근본적인 변화입니다.

---

## Orchard 거래 및 액션

Orchard는 새로운 개념인 **액션**(Actions)을 도입했습니다:

- 모든 액션에 대해 **단일 앵커**(single anchor)를 사용하여 메타데이터 누출을 줄였습니다.
- (V4) 지출 + 출력 필드를 단일 값 약속으로 병합했습니다.
- 이는 Halo2 증명 시스템의 성능 최적화를 가능하게 합니다.

Daira가 앵커 위치에 대해 설명합니다(zcon3):

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

일부 경우(예: 풀 간 거래)에서는 외부 관찰자가 금액을 볼 수 있습니다. 그러나 `valueBalanceSapling`과 `valueBalanceOrchard`는 **동형 약속**(homomorphic commitments)을 사용하여 암호화된 풀의 총 ZEC를 증명하고, 위조를 방지합니다.

더 알아보기: [암호화된 풀에서의 위조에 대한 방어](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## 미래 개선 사항

ECC 팀은 `zcashd`에서 새로운 RPC 메서드(기존 `z_sendmany` 대체)를 구현하고 있으며, 사용자가 거래의 프라이버시 특성에 따라 제안된 거래를 미리보기 및 수락/거부할 수 있도록 해줄 것입니다.

---

## 추천

**YWallet**의 최신 버전을 시도해 보세요!  
송금하기 전 화면에서 "거래 계획"(Transaction Plan)을 표시하여 더 프라이버시 친화적인 선택을 도와줍니다.

거래 프라이버시에 대한 훌륭한 기사: https://medium.com/@hanh.huynh/

---

**ZecHub(@ZecHub)의 원본 트레드**  
https://x.com/ZecHub/status/1628498645627666432

---

*이 페이지는 ZecHub 위키를 위해 원본 Zero to Zero Knowledge 트레드에서 컴파일되었습니다.*
