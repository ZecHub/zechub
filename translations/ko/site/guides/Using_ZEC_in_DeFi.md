<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_in_DeFi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="편집 페이지"/>
</a>

# Zcash을 DeFi에서 사용하는 방법

## Near Intents 

Zcash과 NEAR Intents가 통합되어, 사용자가 수수료 없이 Zcash(ZEC)를 비트코인, 솔라나, NEAR 및 XRP와 같은 다른 주요 알트코인으로 교환할 수 있게 되었습니다. 이 통합은 NEAR 프로토콜이 자율적이고 검증 가능한 AI 봇의 인프라를 구축하려는 노력의 일부이며, Zcash에도 AI 기반 결제 철도를 가능하게 해주는 혜택을 제공합니다. 이제 Zcash 사용자는 [Near Intents](https://app.near-intents.org)를 통해 개인정보 보호를 유지하면서 스마트 계약 및 더 넓은 [DeFi 애플리케이션](https://nym.com/blog/what-is-defi)에 접근할 수 있게 되었습니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/mKVvXY4yjjA"
    title="Zcash x NEAR Intents를 통한 크로스체인 스왑"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Maya 프로토콜 

Maya 프로토콜은 분산화, 유동성 및 거래 비밀성을 강화하기 위해 Zcash를 통합했습니다. 이 통합을 통해 Zcash 사용자는 개인정보 보호를 유지하면서도 분산형 스왑의 혜택을 받을 수 있으며, 더 많은 유연성과 유동성을 얻게 됩니다. 자세히 알아보기: [https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex에서 이더리움을 Zcash로 스왑하는 방법"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


**참고**: 이미 보유한 ETH를 "Release" 탭에서 투명 주소를 입력하여 비공개 저장소로 전환할 수 있는 기능도 제공됩니다. 이후 모바일/데스크탑 지갑의 'Autoshield' 기능을 사용할 수 있습니다. 이 애플리케이션의 개인정보 보호를 유지하기 위해 ZEC > ETH 및 ETH > ZEC 간의 스왑은 권장되지 않습니다.

---

## Zcash DeFi 주변 혁신 

**레이어 1 솔루션**

현재 Zcash 생태계 내에서 레이어 1을 사용하여 DeFi 애플리케이션을 실행할 수 있는 옵션들이 탐색되고 있습니다. 이는 대부분의 계약 작업을 오프체인으로 수행하고, 그 작업의 검증은 체인 상에서 수행하는 방식으로 가능할 수 있습니다. JP 모건과 기업 블록체인에서 이러한 버전을 공동 개발한 바 있습니다. NU5 업그레이트 이후에는 TZE 메커니즘을 통해 Zcash에 이와 같은 확장 기능을 추가할 수 있는 방법이 존재합니다.

**zkEVM**

이 기술은 EVM 호환 가상 머신을 사용하여 Zcash에 네이티브 프로그래밍 가능성을 제공하며, 제로 지식 증명 계산을 지원합니다. 이는 더 다양한 개발자 커뮤니티를 통해 Zcash의 성장과 개인정보 보호 애플리케이션 및 토큰 생태계의 발전을 촉진할 수 있습니다. 다른 기존 L2 프라이버시 솔루션과 비교해도 비슷한 수준의 성능을 제공할 것입니다.

ECC는 PoS(Proof-of-Stake)와 Cosmos Interblockchain Communication Protocol에 대한 연구를 이어가고 있으며, 이더리움이 PoS로 전환하는 과정에서 발생할 수 있는 문제점들도 함께 검토하고 있습니다. 

**ZSA/UDA**

Zcash Shielded Assets / User Defined Assets는 전문 팀의 도움을 받아 개발되고 있으며, NU5 프로토콜 업그레이트 이후에는 성공에 더 가까워졌습니다. 이러한 자산들 간의 신뢰할 수 있는 비공개 크로스체인 브리지 메커니즘을 통해 상호 운용성을 가능하게 하는 작업이 현재 진행 중입니다. 아래 링크는 Zcon3에서 이 주제에 대한 발표를 다루고 있습니다.

### 자료:

[Zcon3 Private Cross-Chain Transfers](https://youtu.be/vCvMk2-CJN8)

[Zcon3 QEDIT Presentation on Defi](https://youtu.be/EGjcYhovty0) / [Drawing Board](https://miro.com/app/board/uXjVOhuveHo=/)

[Ian Miers on ZSA's & Stablecoins](https://www.youtube.com/watch?v=hJMWE3zLIcs)

[Proof-of-Stake Research](https://electriccoin.co/blog/proof-of-stake-research-overview-1/)

__

Zcash가 다른 스마트 계약 플랫폼에 비해 갖는 확실한 우위점은 네이티브로 프라이버시를 보장하는 레이어 1입니다. 이는 어떤 레이어 2 애플리케이션을 사용하더라도 정보 유출의 가능성 자체를 완전히 제거합니다. 이는 정보에 대한 접근 권한을 훨씬 쉽게 할 수 있는 근본적으로 더 간단하고 안전한 애플리케이션 레이어를 가능하게 합니다.
