<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

Zcash Shielded Assets (ZSA)는 Zcash 프로토콜에 대한 개선 제안으로, Zcash 체인에서 커스텀 자산의 생성, 이전 및 소각을 가능하게 할 것으로 예상됩니다.

이 기능이 Ethereum 블록체인에서 사용되는 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 토큰 표준과 유사하다면, ZSA는 Zcash에 해당하는 기능입니다.

Zcash Shielded Assets는 Zcash 블록체인에서 커스텀 토큰의 생성을 가능하게 하여, [ZEC](https://wiki.zechub.xyz/using-zec-privately) 외에도 Zcash 블록체인 상에서 보호된 거래의 익명성과 프라이버시를 누릴 수 있는 토큰이 생성될 수 있도록 합니다.

ZSA의 주요 잠재적 용도 중 하나는 Zcash 프로토콜을 통해 안정화폐(stablecoin)를 발행하는 것입니다. 안정화폐는 미국 달러나 유럽 통화와 같은 법정 화폐에 가치를 고정시킨 암호화폐입니다. 현재 가장 널리 사용되는 안정화폐 중 일부는 [USDC](https://www.circle.com/en/usdc) 및 [Dai](https://docs.makerdao.com/)와 같은 ERC-20 토큰입니다.

ZSA의 또 다른 잠재적 용도는 거버넌스 토큰의 발행에 있습니다. 예를 들어, 이 위키를 출판하는 ZecHub은 분산형 자율 조직(Decentralized Autonomous Organization, DAO)이며, 구성원들에게 제안 및 거버넌스 결정을 표결할 수 있는 ZSA를 생성하고 발행할 수 있습니다.

ZSA는 [QEDIT](https://qed-it.com/)에 의해 개발되고 있으며, [Zcash Foundation](https://wiki.zechub.xyz/zcash-foundation)에서 주도하는 대규모 보조금 프로그램을 통해 [Electric Coin Company](https://wiki.zechub.xyz/electric-coin-company)와 협력하여 진행되고 있습니다. 이 프로젝트는 여전히 활발하게 개발 중이므로, 업데이트 내용은 Zcash 포럼의 [이 스레드](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)에 게시됩니다. QEDIT의 [ZSA 보조금 신청서](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/)는 Zcash Foundation의 보조금 웹사이트에서 확인할 수 있습니다.


### Zebra 상의 ZSA 데모


[![영상 썸네일](https://i.ytimg.com/vi/1MZMGC9ViyA/hqdefault.jpg?)](https://youtu.be/1MZMGC9ViyA)


**자신이 직접 데모를 실행해 보세요!**

zcash-tx-tool 저장소를 클론하세요:
[https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)


___

## Zcash 개선 제안 (ZIPs)

[ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets의 이전 및 소각
[ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets의 발행
[ZIP 230](https://zips.z.cash/zip-0230): 버전 6 거래 형식


## ZSA 보조금 제안

Shielded Assets (ZSA/UDA)에 대한 ZSA 제안은 [QEDIT](https://qed-it.com/) 팀이 Zcash 블록체인 상에서 일반적인 Shielded 자산을 구축하기 위해 제시했습니다. 이는 일반적으로 사용자 정의 자산(User Defined Asset, UDA) 또는 Zcash Shielded Assets (ZSA)라고 불립니다.

이 제안에 따라 [QEDIT](https://qed-it.com/) 팀은 Zcash 생태계에 DeFi를 도입하고, 동시에 풀 조사에서 커뮤니티가 대답한 질문에 대해, 팀이 물어보았으며: [일반적인 Shielded 자산(ZSA/UDA)은 현재 가장 요청되는 기능입니다](https://twitter.com/BenarrochDaniel/status/1428327864034791429)라는 답변을 바탕으로, 기존 DeFi 생태계 내에서 최고의 프라이버시 기술 사용이 가능하게 될 계획입니다.

이러한 제안은 [Zcash 개선 제안 (ZIP)](https://zips.z.cash/zip-0000) 명세에 기술적으로 준수하며, ZIP 226 및 ZIP 227에서 정의되어 있습니다.

1. [ZIP 226](https://qed-it.github.io/zips/zip-0226): Zcash Shielded Assets의 이전 및 소각
2. [ZIP 227](https://qed-it.github.io/zips/zip-0227): Zcash Shielded Assets의 발행
