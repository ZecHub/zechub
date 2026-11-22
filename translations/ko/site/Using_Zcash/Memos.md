<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# 메모

## 한눈에 보기

* 메모는 거래정보 보호 주소로 보내는 결제에 첨부하는 짧은 노트입니다. 메모는 암호화되므로 블록체인을 살펴보는 사람은 읽을 수 없습니다.
* 메모 필드에는 최대 512바이트의 텍스트를 담을 수 있습니다.
* 메모를 사용해 결제를 보낸 사람과 결제 목적을 알리거나 비공개 메시지를 보낼 수 있습니다.
* 투명 주소로 보내는 결제에는 메모를 첨부할 수 없습니다.
* [결제 요청 링크](/using-zcash/payment-request-uris)를 사용하면 메모가 자동으로 입력되어 상점에서 주문마다 태그를 붙일 수 있습니다.

## 핵심 설명

### 암호화된 메모 보내기

Z2Z(거래정보 보호 주소 간) 거래를 보낼 때 거래에 메모(메시지)를 포함할 수 있습니다. 이 메모는 여러 용도로 사용할 수 있습니다.

### 거래 서명하기

메모는 주로 결제에 서명하는 데 사용됩니다. 거래정보 보호 거래에서는 데이터가 암호화되므로 누가 ZEC를 보냈는지, ZEC의 목적이 무엇이었는지 알 수 없습니다. 사용자는 메모 필드에 자신의 이름이나 가명을 적어 상대방에게 거래를 보낸 사람이 누구인지 알릴 수 있습니다. 거래의 목적을 설명할 수도 있습니다.

### 메시지 보내기

암호화된 메모의 또 다른 사용 사례는 z-addr을 사용하는 사람에게 메시지를 보내는 것입니다. [친구에게 보내는 알림](https://twitter.com/iansagstette/status/1542142468505870336)부터 [최대한 비공개로 유지해야 하는 민감한 메시지](https://twitter.com/InsideZcash/status/1545800146352578560)까지 어떤 내용이든 담을 수 있습니다.

### 블록체인에 남긴 사랑의 메모

Zcash 블록체인의 초기 블록 중 하나에 연인에게 사랑의 메모를 보낸 사람이 있었습니다. 한 사람은 연인이 Zcash 메모를 통해 파일을 보냈다는 사실을 알게 되었습니다. 그 파일은 멀리 떨어져 지내는 연인이 함께 가기로 이야기했던 해외 특별 행사 입장권이었습니다. 메모는 사랑의 편지였습니다.

## 시각적 비유

거래정보 보호 결제를 돈이 든 봉인된 봉투라고 생각해 보세요. 메모는 돈과 함께 접어 넣은 쪽지입니다.

블록체인은 우체국입니다. 봉투를 운반하고 도착한 사실을 기록하지만, 봉투를 열지는 않습니다. 봉투를 여는 사람이 쪽지를 읽습니다. 투명 결제는 엽서와 같아서 쪽지를 접어 넣을 봉투가 없습니다.

## 자세히 알아보기

### 메모에 담을 수 있는 내용

메모 필드의 크기는 항상 정확히 512바이트입니다. 텍스트 메모가 더 짧으면 암호화하기 전에 0바이트를 채워 넣으므로 온체인에서 모든 메모의 크기가 동일하게 보입니다.

대부분의 메모는 일반 UTF-8 텍스트입니다. [ZIP 302](https://zips.z.cash/zip-0302)에서는 다른 종류의 데이터에 사용할 수 있도록 `0xF5` 이상의 바이트로 시작하는 메모도 예약하고 있으며, `0xF6` 뒤에 0이 오는 메모는 “”메모 없음””을 의미합니다.

거래의 각 거래정보 보호 출력에는 각자의 메모가 포함되므로, 여러 사람에게 결제하는 하나의 거래에 각 사람을 위한 서로 다른 노트를 넣을 수 있습니다.

### 고급

> **역사적 기록입니다. 아래 데모는 더 이상 설명된 방식으로 작동하지 않습니다.**
>
> 아래 데모는 zcashd을 사용하며, [수신 스크립트](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)는 `zcash-cli`을 통해 메모를 읽습니다. zcashd은 2026년 7월 18일 자동 지원 종료로 중단되었으므로, 이 스크립트는 실행 중인 노드에 연결할 수 없으며 다른 환경으로 이식되지도 않았습니다.
>
> 명령줄에서 거래정보 보호 메모를 읽는 기능은 여전히 Zallet에서 작동합니다. `zallet rpc z_listunspent`은 수신된 각 거래정보 보호 노트를 반환하며, 각 노트에는 스크립트가 읽는 것과 동일한 `memoStr` 필드가 포함됩니다. 명령어는 [Zallet 빠른 참조 안내서](/using-zcash/zallet-quick-reference-guide)를, 노드를 zcashd에서 이전하는 방법은 [Zebra 및 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)으로의 마이그레이션 안내서를 참조하세요. Zallet은 아직 베타 버전입니다.
>
> 이 섹션은 Magic-Wormhole 데모의 역사적 기록으로 보존되어 있습니다.

Magic-Wormhole CLI와 zcashd를 사용해 Zcash 거래정보 보호 메모를 보내고, 한 컴퓨터에서 다른 컴퓨터로 파일을 안전하게 전송하는 방법을 소개합니다!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Zcash을 사용한 암호화 파일 전송 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 관련 페이지

- [결제 요청 URI](/using-zcash/payment-request-uris): 메모를 `zcash:` 링크나 QR 코드에 넣습니다.
- [거래](/using-zcash/transactions): 거래정보 보호 및 투명 거래 유형입니다.
- [거래정보 보호 구역](/using-zcash/shielded-pools): 메모를 담는 거래정보 보호 노트가 보관되는 곳입니다.
- [지갑](/using-zcash/wallets): 메모를 지원하는 지갑을 찾으려면 Shielded Memo 필터를 사용하세요.
- [Zallet 빠른 참조 안내서](/using-zcash/zallet-quick-reference-guide): 명령줄에서 수신한 메모를 읽습니다.
- [Zcash 크리에이터 도구](/using-zcash/creators-and-tips): 팁과 함께 메시지를 보내는 팁 도구입니다.

### 자료

[암호화된 메모 필드](https://electriccoin.co/blog/encrypted-memo-field/)

**마지막 업데이트:** 2026년 10월
