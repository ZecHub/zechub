<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 메모

## 요약

* 메모는 보호 주소로 전송하는 결제에 첨부하는 짧은 메모입니다. 암호화되어 있으므로 블록체인을 지켜보는 사람은 읽을 수 없습니다.
* 메모 필드에는 최대 512바이트의 텍스트를 담을 수 있습니다.
* 사람들은 메모를 사용해 누가 결제를 보냈는지와 그 용도가 무엇인지 알리거나, 비공개 메시지를 보냅니다.
* 투명 주소로의 결제에는 메모를 포함할 수 없습니다.
* [결제 요청 링크](/using-zcash/payment-request-uris)는 상점이 각 주문에 태그를 지정할 수 있도록 메모를 자동으로 채워 줄 수 있습니다.

## 핵심 설명

### 암호화된 메모 보내기

Z2Z(보호 주소 간) 거래를 보낼 때 거래에 메모(메시지)를 포함할 수 있습니다. 이 메모는 여러 용도로 사용할 수 있습니다.

### 거래 서명

메모는 주로 결제에 서명하는 데 사용됩니다. 보호 거래는 데이터를 암호화하므로, 누가 ZEC를 보냈는지와 ZEC의 용도가 무엇이었는지 확인할 수 없습니다. 사용자는 상대방에게 거래의 발신자를 알리기 위해 메모 필드에 자신의 이름이나 가명을 서명으로 넣을 수 있습니다. 거래의 용도를 설명할 수도 있습니다.

### 메시지 보내기

암호화된 메모의 또 다른 사용 사례는 z-addr를 가진 사람에게 메시지를 보내는 것입니다. 이러한 메시지는 [친구에게 보내는 알림](https://twitter.com/iansagstette/status/1542142468505870336)부터 [최대한 비공개로 유지해야 하는 민감한 메시지](https://twitter.com/InsideZcash/status/1545800146352578560)까지 무엇에 관한 것이든 될 수 있습니다.

### 블록체인 위의 연애편지

Zcash 블록체인의 초기 블록 중 하나에서 연인에게 연애편지를 보낸 사람이 있었습니다. 누군가는 자신의 연인이 Zcash 메모를 통해 파일을 보낸 것을 발견했습니다. 이 파일은 그녀와 먼 곳에 있는 연인이 함께 참석하기로 이야기해 왔던 해외 특별 행사 티켓이었습니다. 그 메모는 연애편지였습니다.

## 시각화 / 비유

보호 결제를 돈이 들어 있는 봉인된 봉투라고 생각해 보세요. 메모는 돈과 함께 접어 넣은 쪽지입니다.

블록체인은 우체국입니다. 봉투를 전달하고 도착했다는 기록을 남기지만, 절대로 봉투를 열지 않습니다. 봉투를 여는 사람이 쪽지를 읽습니다. 투명 결제는 엽서이므로 쪽지를 접어 넣을 봉투가 없습니다.

## 심층 분석

### 메모에 들어갈 수 있는 내용

메모 필드는 항상 정확히 512바이트입니다. 더 짧은 텍스트 메모는 암호화 전에 0바이트로 채워지므로, 온체인에서는 모든 메모가 같은 크기로 보입니다.

대부분의 메모는 일반 UTF-8 텍스트입니다. [ZIP 302](https://zips.z.cash/zip-0302)는 `0xF5` 이상의 바이트로 시작하는 메모도 다른 종류의 데이터를 위해 예약하며, `0xF6` 뒤에 0이 이어지는 메모는 “메모 없음”을 의미합니다.

거래의 각 보호 출력에는 자체 메모가 포함되므로, 여러 사람에게 결제하는 하나의 거래에는 각 수신자마다 서로 다른 메모를 포함할 수 있습니다.

### 고급

> **역사적 내용입니다. 이 데모는 더 이상 작성된 그대로 실행되지 않습니다.**
>
> 아래 데모는 zcashd를 사용하며, 해당 [수신 스크립트](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)는 `zcash-cli`를 통해 메모를 읽습니다. zcashd는 2026년 7월 18일 자동 지원 종료에 도달했으므로, 해당 스크립트는 실행 중인 노드에 연결할 수 없으며 이식되지도 않았습니다.
>
> 명령줄에서 보호 메모를 읽는 기능은 Zallet에서 여전히 작동합니다. `zallet rpc z_listunspent`는 스크립트가 읽는 것과 동일한 `memoStr` 필드를 각 수신 보호 노트와 함께 반환합니다. 명령어는 [Zallet 빠른 참조 가이드](/using-zcash/zallet-quick-reference-guide)를 참고하고, 노드를 zcashd에서 이전하려면 [Zebra 및 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)로의 마이그레이션 가이드를 참고하세요. Zallet는 아직 베타 버전입니다.
>
> 이 섹션은 Magic-Wormhole 데모의 역사적 기록으로 보존됩니다.

다음은 Zcash Shielded Memos를 Magic-Wormhole CLI 및 zcashd와 함께 사용하여 한 컴퓨터에서 다른 컴퓨터로 파일을 안전하게 보내는 방법입니다!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 관련 페이지

- [결제 요청 URI](/using-zcash/payment-request-uris): `zcash:` 링크 또는 QR 코드에 메모를 넣습니다.
- [거래](/using-zcash/transactions): 보호 및 투명 거래 유형.
- [보호 풀](/using-zcash/shielded-pools): 메모를 담은 보호 노트가 있는 곳.
- [지갑](/using-zcash/wallets): 메모를 지원하는 지갑을 찾으려면 Shielded Memo 필터를 사용하세요.
- [Zallet 빠른 참조 가이드](/using-zcash/zallet-quick-reference-guide): 명령줄에서 수신한 메모를 읽습니다.
- [Zcash 크리에이터용 도구](/using-zcash/creators-and-tips): 팁과 함께 메시지를 보내는 팁 도구.

### 리소스

[암호화된 메모 필드](https://electriccoin.co/blog/encrypted-memo-field/)

**최종 업데이트:** 2026년 10월
