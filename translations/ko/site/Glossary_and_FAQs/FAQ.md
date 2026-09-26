# 자주 묻는 질문

Zcash에 관한 가장 흔한 질문 목록입니다. Zcash 클라이언트 문제 해결은 [공식 문제 해결 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)를 참조하세요.

### 빠른 탐색

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash란 무엇인가요?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash는 어떻게 구할 수 있나요?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">다른 암호화폐와의 차이점은?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">프로토콜 거버넌스?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">내 거래는 어디에 있나요?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash는 정말 비공개인가요?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">흔한 오해</a>
</div>

---

## Zcash란 무엇인가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash는 빠르고 기밀성이 보장되는 거래와 낮은 수수료를 제공하는 디지털 화폐입니다. 개인정보 보호는 Zcash의 핵심 기능입니다. 모든 거래를 암호화하기 위해 영지식 증명을 최초로 사용했습니다.

즉시 사용 가능하고, 모바일 환경에서 안전하며 비공개로 결제할 수 있는 여러 지갑이 제공됩니다: [지갑](/using-zcash/wallets)

</div>

## Zcash는 어떻게 구할 수 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZEC는 [수탁형 거래소](/using-zcash/custodial-exchanges), [DEX](/dex) 또는 [중앙화 스왑 플랫폼](/using-zcash/centralizedswaps)에서 구매할 수 있습니다.

또한 Zcash를 개인 간 거래로 구매하거나 채굴을 통해 획득할 수 있습니다.

</div>

## Zcash와 다른 암호화폐의 차이점은 무엇인가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash는 Bitcoin이나 Ethereum보다 근본적으로 더 비공개적입니다. 빠른 블록 시간(75초), 낮은 수수료 및 정기적인 업그레이드를 제공합니다.

사용자는 **투명** 또는 **차폐형** 거래 중에서 선택할 수 있습니다. 자세한 내용은 [차폐형 생태계](https://electriccoin.co/blog/shielded-ecosystem)를 참조하세요.

</div>

## Zcash 프로토콜은 어떻게 거버넌스가 이루어지나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

이 프로토콜은 **Zcash 개선 제안(ZIP)** 절차에 따라 관리됩니다. 누구나 ZIP 초안을 제출할 수 있습니다. 초안은 커뮤니티에서 토론되며 ZIP 편집자가 승인하거나 거부합니다:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

결정 사항은 명세에 기록되며, 네트워크가 이를 채택하면 온체인에서 비준됩니다.

</div>

## 내 거래는 어디에 있나요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

먼저 [블록 탐색기 가이드](/guides/blockchain-explorers)를 읽어보세요. 그런 다음 [Zcash 블록 탐색기](https://zcashblockexplorer.com)를 확인하세요.

거래는 약 25분(20블록) 후 만료되며, 자금은 자동으로 반환됩니다.

**거래가 표시되지 않을 수 있는 일반적인 이유:**

- 연결 끊김
- 거래 수수료가 너무 낮음
- 네트워크 과부하
- 투명 입력이 너무 많음(크기가 너무 큼)

**성공을 위한 팁:**

- 안정적인 연결 사용
- 표준 수수료 지불(우선 처리를 위해서는 더 높은 수수료)
- 기다린 뒤 나중에 다시 시도
- 거래 크기를 작게 유지하기 위해 입력 수 줄이기

</div>

## Zcash는 정말 비공개인가요?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**네.** Zcash는 차폐형 거래의 발신자, 금액 및 수신자 데이터를 암호화합니다.

Zcash는 다음을 **하지 않습니다**:

- 다중 서명 거래 암호화(FROST 통합 대기 중)
- 투명 거래와의 상관관계로부터 보호
- IP 주소 숨기기

추가 읽을거리: [차폐형 생태계](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## 몇 가지 흔한 오해

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
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 중앙화된 코인인가요?</td>
      <td className="py-4 px-5 text-foreground">아니요. 상표권 계약은 Zcash Foundation 또는 ECC가 커뮤니티 합의에 반하는 행동을 하지 못하도록 합니다. 거버넌스는 탈중앙화되어 있음이 입증되었습니다([Messari 보고서](https://messari.io/report/decentralizing-zcash) 참조). 커뮤니티 투표, ZecHub 및 Zcash Foundation A/V Club은 모두 폭넓은 참여를 가능하게 합니다.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash에 백도어가 있나요?</td>
      <td className="py-4 px-5 text-foreground">아니요. Zcash 또는 우리가 구축한 어떤 암호화 소프트웨어에도 백도어는 없으며, 앞으로도 없을 것입니다.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 기업에 의해 통제되나요?</td>
      <td className="py-4 px-5 text-foreground">그렇지 않습니다. 연구를 위해 기업들과 협력하기는 하지만, Zcash는 탈중앙화에 계속 전념하고 있습니다. 여러 자율 조직이 자기 수탁과 프라이버시 권리를 위해 함께 노력합니다.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash는 다른 프라이버시 코인에 비해 개인정보 보호 기능이 제한적입니다</td>
      <td className="py-4 px-5 text-foreground">아니요. Monero/Grin 방식의 프라이버시는 디코이에 의존하며(무력화될 수 있음), Zcash는 모든 차폐형 거래 데이터를 암호화하므로 풀 내의 모든 거래를 구별할 수 없습니다. [프라이버시가 충분하지 않나요?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)를 참조하세요.</td>
    </tr>
  </tbody>
</table>

</div>

---

**마지막 업데이트:** 2026년 3월
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
