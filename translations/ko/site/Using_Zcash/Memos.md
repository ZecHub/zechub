<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 메모

#### 암호화된 메모 보내기

Z2Z(보호된 주소 간) 거래를 보낼 때, 거래에 메모(메시지)를 포함할 수 있습니다. 이 메모는 다양한 용도로 사용될 수 있습니다.

#### 거래 서명

메모는 주로 결제 서명에 사용됩니다. 보호된 거래는 데이터를 암호화하므로, 누가 ZEC을 보냈고 그 ZEC이 무엇을 위해 사용되었는지 확인할 수 없습니다. 사용자는 메모 필드에 이름이나 의사명을 서명하여 상대방에게 거래가 어디서 왔는지를 알릴 수 있습니다. 또한 거래의 목적에 대해 설명할 수도 있습니다.

#### 메시지 보내기

암호화된 메모의 또 다른 용도는 z-addr 주소를 가진 사람에게 메시지를 보낼 것입니다. 이 메시지는 어떤 것이라도 될 수 있으며, 친구에게 [기억 상 напоминание](https://twitter.com/iansagstette/status/1542142468505870336)이거나, 가능한 한 비밀로 유지해야 할 [민감한 메시지](https://twitter.com/InsideZcash/status/1545800146352578560)일 수 있습니다.

#### 블록체인 상의 사랑의 메모

처음 Zcash 블록체인에 기록된 블록 중 하나에서, 누군가 자신의 파트너에게 사랑의 메시지를 보냈습니다. 누군가 자신이 파트너로부터 Zcash 메모를 통해 파일을 받았다는 것을 발견했습니다. 이 파일은 해외에서 열리는 특별한 행사에 대한 티켓으로, 그녀와 먼 거리에 있는 연인들이 함께 참석하기로 약속했던 것이었습니다. 이 메모는 사랑의 메시지였습니다.

#### 고급

> **역사적 자료입니다. 이 데모는 더 이상 설명대로 실행되지 않습니다.**
>
> 아래 데모는 zcashd를 사용하며, 함께 제공되는 [수신 스크립트](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)는 `zcash-cli`를 통해 메모를 읽습니다. zcashd는 2026년 7월 18일 자동 지원 종료(End-of-Support) 중단에 도달했으므로 이 스크립트는 실행 중인 노드에 연결할 수 없으며, 이식되지도 않았습니다.
>
> 명령줄에서 보호된 메모를 읽는 기능은 Zallet에서 여전히 작동합니다. `zallet rpc z_listunspent`는 수신된 각 보호된 노트를 스크립트가 읽는 것과 동일한 `memoStr` 필드와 함께 반환합니다. 명령은 [Zallet 빠른 참조 가이드](/using-zcash/zallet-quick-reference-guide)를, 노드를 zcashd에서 옮기는 방법은 [Zebra 및 Zallet 마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참고하세요. Zallet은 아직 베타 단계입니다.
>
> 이 섹션은 Magic-Wormhole 데모의 역사적 기록으로 보존됩니다.

Magic-Wormhole CLI 및 zcashd를 사용하여 Zcash 보호된 메모를 통해 컴퓨터 간에 파일을 안전하게 전송하는 방법입니다:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Zcash를 사용한 암호화 파일 전송 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### 자료

[암호화된 메모 필드](https://electriccoin.co/blog/encrypted-memo-field/)
