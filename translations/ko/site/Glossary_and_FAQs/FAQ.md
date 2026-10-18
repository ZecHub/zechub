# 자주 묻는 질문

Zcash에 관한 가장 일반적인 질문 목록입니다. Zcash 클라이언트 문제 해결은 [공식 문제 해결 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)를 참조하세요.

### 빠른 탐색

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash란 무엇인가요?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash를 어떻게 얻을 수 있나요?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">다른 암호화폐와의 차이점은?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">프로토콜 거버넌스?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">내 거래는 어디에 있나요?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash는 정말 프라이빗한가요?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">일반적인 오해</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd가 작동을 멈췄나요?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">내 지갑을 Zallet로 옮기려면?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood란 무엇인가요?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">어떤 풀 노드를 실행해야 하나요?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">용어를 찾아보려면?</a>
</div>

---

## Zcash란 무엇인가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash는 빠르고 기밀성이 보장되는 거래와 낮은 수수료를 제공하는 디지털 통화입니다. 프라이버시는 Zcash의 핵심 기능입니다. 모든 거래를 암호화하기 위해 영지식 증명을 사용하는 방식을 선도했습니다.

즉각적이고 모바일 환경에서 안전하며 프라이빗한 결제를 위한 여러 지갑을 이용할 수 있습니다: [지갑](/using-zcash/wallets)

</div>

## Zcash를 어떻게 얻을 수 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZEC는 [수탁형 거래소](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) 또는 [중앙화된 스왑 플랫폼](/using-zcash/centralized-swaps)에서 구매할 수 있습니다.

또한 Zcash를 개인 간 거래로 구매하거나 채굴하여 얻을 수 있습니다.

</div>

## Zcash와 다른 암호화폐의 차이점은 무엇인가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash는 Bitcoin이나 Ethereum보다 근본적으로 더 프라이빗합니다. 빠른 블록 시간(75초), 낮은 수수료 및 정기적인 업그레이드를 제공합니다.

사용자는 **투명한** 거래와 **차폐된** 거래 중에서 선택할 수 있습니다. 자세한 내용은 [차폐된 생태계](https://electriccoin.co/blog/shielded-ecosystem)를 참조하세요.

</div>

## Zcash 프로토콜은 어떻게 거버넌스되나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

프로토콜은 **Zcash 개선 제안(ZIP)** 프로세스를 통해 거버넌스됩니다. 누구나 ZIP 초안을 제출할 수 있습니다. 초안은 커뮤니티에서 토론되며 ZIP 편집자가 승인하거나 거부합니다.

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

결정 사항은 명세에 기록되며 네트워크가 이를 채택하면 온체인에서 비준됩니다.

</div>

## 내 거래는 어디에 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

먼저 [블록 탐색기 가이드](/guides/blockchain-explorers)를 읽으세요. 그런 다음 [Zcash 블록 탐색기](https://zcashblockexplorer.com)를 확인하세요.

거래는 약 25분(20블록) 후 만료되며 자금은 자동으로 반환됩니다.

**거래가 표시되지 않을 수 있는 일반적인 이유:**

- 연결 끊김
- 거래 수수료가 너무 낮음
- 네트워크 과부하
- 투명한 입력이 너무 많음(크기가 너무 큼)

**성공을 위한 팁:**

- 안정적인 연결을 사용하세요
- 표준 수수료를 지불하세요(우선 처리에는 더 높은 수수료)
- 기다렸다가 나중에 다시 시도하세요
- 거래 규모를 작게 유지하려면 입력 수를 줄이세요

</div>

## Zcash는 정말 프라이빗한가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**네.** Zcash는 차폐된 거래의 발신자, 금액 및 수신자 데이터를 암호화합니다.

Zcash는 다음을 **하지 않습니다**:

- 다중 서명 거래를 암호화하지 않음(FROST 통합 대기 중)
- 투명한 거래와의 상관관계 분석으로부터 보호하지 않음
- IP 주소를 숨기지 않음

추가 자료: [차폐된 생태계](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd가 작동을 멈췄습니다. 이제 무엇을 실행해야 하나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd는 지원 종료되었습니다. 버전 6.20.0은 2026년 7월 18일 블록 3417100에서 자체 종료되었으며, Ironwood(NU6.3)를 지원한 적도 없으므로 업그레이드할 이후 버전이 없습니다.

대신 Z3 스택을 실행하세요. 세 가지 프로그램이 zcashd가 혼자 수행하던 작업을 나누어 맡습니다.

- **[Zebra](/zcash-tech/zebra-full-node)**는 체인을 검증합니다
- **[Zaino](/zcash-tech/zaino)**는 이를 인덱싱하고 지갑 데이터를 제공합니다
- **[Zallet](/zcash-tech/zallet)**는 자금을 보관합니다

[Zakura](/zcash-tech/zakura-node)는 대체 풀 노드입니다. 또한 자체 위에서 zcashd를 실행하므로, 다른 소프트웨어가 여전히 이전 인터페이스를 기대하는 경우 도움이 됩니다.

[마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)부터 시작하세요.

</div>

## 내 zcashd 지갑을 Zallet로 어떻게 옮기나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet는 기존 `wallet.dat`를 마이그레이션하므로 자금과 주소를 유지할 수 있습니다.

먼저 `wallet.dat`를 백업한 다음 [마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)를 따르세요. Zallet에서 잔액을 확인할 때까지 해당 백업을 보관하세요.

이전이 완료된 후 일상적인 명령어는 [Zallet 빠른 참조](/using-zcash/zallet-quick-reference-guide)에서 다룹니다.

</div>

## Ironwood란 무엇이며, 제가 해야 할 일이 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood는 네트워크 업그레이드 NU6.3입니다. 2026년 7월 28일 블록 3,428,143 이후 메인넷에서 활성화되었으며, 수정된 회로를 기반으로 한 차폐된 풀을 추가하고 이전 [Orchard](/using-zcash/shielded-pools) 풀을 봉인합니다. 따라서 누구나 ZEC가 위조되지 않았음을 검증할 수 있습니다.

**차폐된 자금을 보유하고 있다면, 이를 옮겨야 할 수 있습니다.** 가치는 Orchard에서 [턴스타일](/zcash-tech/the-turnstile)을 통해서만 나갈 수 있으며, 지갑마다 이동을 처리하는 시점과 방식이 다릅니다. 직접 자금을 옮기기 전에 지갑 제공업체에 문의하세요.

변경 사항과 그 이유는 [Ironwood](/zcash-tech/ironwood)에서 읽어보세요.

</div>

## 어떤 풀 노드를 실행해야 하나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)**는 zcashd를 직접 대체하며 마이그레이션 가이드에서 가정하는 노드입니다. 다른 이유가 없다면 이를 선택하세요.

**[Zakura](/zcash-tech/zakura-node)**는 더 빠른 동기화와 네이티브 블록 가지치기를 제공하며 확장성을 목표로 하는 두 번째 구현입니다. 이러한 기능이 필요하거나 zcashd와 계속 통신하는 소프트웨어에 의존한다면 이를 선택하세요.

둘 다 동일한 체인을 검증하므로, 이는 합의에 관한 선택이 아니라 운영상의 선택입니다.

</div>

## 릴리스 노트의 용어는 어디에서 찾아볼 수 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash 라이브러리](/glossary-and-faqs/zcash-library)를 참조하세요. 노드 및 지갑 소프트웨어, 차폐된 풀, 그리고 가장 자주 등장하는 ZIP 번호를 다룹니다.

</div>

## 몇 가지 일반적인 오해

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">오해</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">정답</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 중앙집중화된 코인인가요?</td>
      <td className="py-4 px-5 text-foreground">아니요. 상표권 계약은 Zcash Foundation 또는 ECC가 커뮤니티 합의에 반하는 행동을 하지 못하도록 합니다. 거버넌스는 탈중앙화되어 있음이 입증되었습니다([Messari 보고서](https://messari.io/report/decentralizing-zcash) 참조). 커뮤니티 투표, ZecHub 및 Zcash Foundation A/V Club 모두 폭넓은 참여를 가능하게 합니다.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash에 백도어가 있나요?</td>
      <td className="py-4 px-5 text-foreground">아니요. Zcash나 당사가 구축한 어떤 암호화 소프트웨어에도 백도어는 없으며, 앞으로도 없을 것입니다.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 기업이 통제하나요?</td>
      <td className="py-4 px-5 text-foreground">사실이 아닙니다. 연구를 위해 기업과 협력하기는 하지만, Zcash는 탈중앙화에 계속 전념하고 있습니다. 여러 자율 조직이 자기 보관과 프라이버시 권리를 향해 함께 노력합니다.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 다른 프라이버시 코인에 비해 프라이버시가 제한적입니다</td>
      <td className="py-4 px-5 text-foreground">아니요. Monero/Grin 방식의 프라이버시는 미끼에 의존하며(무력화될 수 있음), Zcash는 모든 차폐된 거래 데이터를 암호화하여 풀 내 모든 거래를 구별할 수 없게 만듭니다. [충분히 프라이빗하지 않나요?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)를 참조하세요.</td>
    </tr>
  </tbody>
</table>

</div>

---

**최종 업데이트:** 2026년 10월
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
