# Zcash 네트워크 업그레이드 

여러 해 동안 Zcash는 프로토콜에 중요한 변경 사항과 개선사항을 도입해 왔으며, 오늘 우리는 이러한 모든 업그레이드를 살펴보겠습니다:

[OverWinter:](https://bitzecbzc.github.io/blog/overwinter/index.html) 블록 347500에서 활성화되어 2018년 6월 26일에 채굴되었습니다. OverWinter는 초기 출시 이후 Zcash의 첫 번째 네트워크 업그레이드였습니다. OverWinter의 주요 목표는 미래의 네트워크 업그레이드를 위해 프로토콜을 강화하는 것이었습니다. OverWinter의 핵심은 네트워크 업그레이드에 대한 재생 보호, 버전 관리, 투명한 거래 성능 향상, 거래 만료라는 새로운 기능입니다.

[Sapling:](https://coinbureau.com/analysis/zcash-sapling-upgrade/) 블록 419200에서 활성화되어 2018년 10월 29일에 채굴되었습니다. 이는 Zcash 네트워크의 두 번째 주요 업그레이드로, 보호된 거래를 위한 zk-SNARKs 효율성을 향상시키는 데 초점을 맞추고 있습니다. Sapling 출시 시점에 zk-SNARKs에 대해 여러 가지 도전 과제가 있었는데, 업그레이드 가능성 문제부터 구현 복잡성까지 신뢰 설정 요구사항이 포함되었습니다. 다행히도 Sapling은 zk-SNARK 증명 생성의 효율성을 향상시켜 오늘날 우리가 누리고 있는 암호화폐의 잠재적 채택을 넓혔습니다. Sapling에 대한 또 다른 주목할 만한 설정은 (공개 매개변수 생성 의식)이었는데, 이는 Zcash 팀이 개선하고자 했던 부분이기도 합니다.

[Zcash Blossom:](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/) 블록 653600에서 활성화되어 2019년 12월 11일에 채굴되었습니다. 이 중요한 네트워크 업그레이드는 블록 시간을 반으로 줄여 약 75초로 단축함으로써 확장성과 사용자 경험을 개선하도록 설계되었습니다. 결과? 거래 확인이 더 빨라졌고, 네트워크 처리량은 두 배 증가했으며, 거래 수수료는 저렴했습니다. Blossom 업그레이드는 Zcash 네트워크가 보안과 신뢰성에 대한 우리의 고준위 기준을 유지하면서도 네트워크 용량을 늘릴 수 있는 실용적인 공학 결정을 내릴 수 있음을 즉시 보여줍니다.

[HeartWood:](https://electriccoin.co/blog/introducing-heartwood/) 블록 903000에서 활성화되어 2020년 7월 16일에 채굴되었습니다. Heartwood의 유일한 목적은 보호된 Coinbase를 통해 광부들이 보호 주소로 보상금을 받을 수 있도록 하여 제3자 통합과 개인정보 보호를 강화하는 것입니다. 또한, Heartwood는 향상된 네트워크 분산 및 상호 운용성으로 뒷받침되고 있습니다. Heartwood 업그레이드는 또한 Flyclient를 통합하여 가벼운 클라이언트가 거래를 효율적으로 검증할 수 있도록 하여 확장성과 제3자 통합을 개선했습니다. ZIP 213로 알려진 보호된 Coinbase에 대해 언급할 가치가 있는 점도 있습니다. 이는 Zcash 합의 규칙을 수정하여 Coinbase 자금이 보호된 Sapling 주소로 채굴될 수 있도록 하려는 목적이었습니다. Sapling 업그레이드 전에는 보호된 Coinbase가 실행 불가능했습니다. 왜냐하면 보호 거래는 생성에 많은 메모리 및 CPU 자원을 요구했기 때문입니다.

[Canopy:](https://youtu.be/R8O1SZMfESM?si=qoBL1dBp4E_af-eM) 블록 1046400에서 활성화되어 2020년 11월 18일에 채굴되었습니다. 이 업그레이드는 Electric Coin Co (ECC)와 Zcash Foundation 모두의 후원을 받았습니다. Canopy는 창립자 보상금의 종료를 표시하며, 새로운 자금 지원 메커니즘인 Zcash 개발 기금이 도입되었고, 새로운 거버넌스 모델은 Zcash 생태계에 대한 지속적인 자금 지원을 지원했습니다. Canopy에 대해 다음 4년 동안 새로운 개발 기금이 설립될 예정입니다. 채굴 보상의 80%는 광부들에게 돌아가고, 나머지 20%는 새롭게 설립된 주요 장학금 기금(8%), Electric Coin Co (7%) 및 Zcash Foundation (5%) 사이로 분배됩니다. 'Canopy'라는 이름은 Zcash의 사명인 개인 정보 보호와 분산화 원칙을 지키면서도 지속 가능하고 번영하는 생태계를 창출하려는 의지를 반영합니다.

[NU5:](https://electriccoin.co/blog/nu5-proposed-features/) 블록 1687104에서 활성화되어 2022년 5월 31일에 채굴되었습니다. Zcash 네트워크 업그레이드 5는 2016년 창설 이후 암호화폐의 중요한 마일스톤을 표시하는 것으로 주목할 만합니다. Zcash의 여섯 번째 주요 업그레이드인 NU5는 Orchard 보호 프로토콜, 통합된 주소 및 Halo 증명 시스템을 특징으로 합니다. Zcash NU5 업그레이드는 신뢰 설정을 제거하고 프로토콜의 기초 암호학적 보안을 개선하기 위해 구축된 zk-SNARK 기술 스택의 지속적인 진화입니다. NU5는 ECC와 Zcash Foundation의 후원을 받고 있습니다.

[NU6:](https://zips.z.cash/zip-0253) NU6는 새로운 Zcash 개발 기금(Hybrid Deferred Dev Fund가 비직접 자금 지원 모델로 전환)을 구현하고, 이후 미래 분산형 장학금 자금을 위해 일정 부분의 발행량이 예약된 락박스를 설정할 것입니다. 이러한 자금의 배분은 향후 Zcash 커뮤니티가 결정하는 메커니즘에 의해 완전히 관리될 것입니다. NU6의 목적은 블록 보조금을 줄이고, 락박스 메커니즘을 통해 분산형 자금 지원 모델을 구축하여 투명성을 강화하고 개인정보 보호를 강화하는 것입니다.

---

**Protected terms (keep in English):** `zcashd`
