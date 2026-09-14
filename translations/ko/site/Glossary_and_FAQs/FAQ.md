# 자주 묻는 질문

Zcash에 대해 가장 자주 묻는 질문들을 모았습니다. Zcash 클라이언트 문제 해결은 [공식 트러블슈팅 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)를 참고하세요.

### 빠른 탐색
[Zcash란?](#what-is-zcash) | [Zcash를 얻으려면?](#how-can-i-acquire-zcash) | [다른 암호화폐와의 차이점?](#what-is-the-difference-between-zcash-and-other-cryptocurrencies) | [프로토콜 거버넌스?](#how-is-the-zcash-protocol-governed) | [내 거래는 어디에?](#where-is-my-transaction) | [Zcash는 정말 비공개인가요?](#is-zcash-really-private) | [흔한 오해들](#a-few-common-misconceptions)

---

## Zcash란 무엇인가요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash는 빠르고 비밀이 보장되는 거래와 낮은 수수료를 제공하는 디지털 통화입니다. 프라이버시는 Zcash의 핵심 기능입니다. Zcash는 모든 거래를 암호화하기 위해 영지식 증명을 처음으로 도입한 선구자입니다.

즉각적이고 모바일에서 안전하며 비공개인 결제를 위한 여러 지갑을 사용할 수 있습니다: [모바일 지갑](https://z.cash/wallets/)
</div>

## Zcash는 어떻게 얻을 수 있나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
암호화폐 [거래소](https://z.cash/exchanges)에서 ZEC를 구매할 수 있습니다.
개인 간(P2P) 거래로 Zcash를 구매하거나 채굴로 얻을 수도 있습니다.
</div>

## Zcash와 다른 암호화폐의 차이점은 무엇인가요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash는 Bitcoin이나 Ethereum보다 근본적으로 더 비공개적입니다. 빠른 블록 시간(75초), 낮은 수수료, 정기적인 업그레이드를 제공합니다.

사용자는 **Transparent(투명)** 거래와 **Shielded(실드드)** 거래 중 선택할 수 있습니다. 자세한 내용은 [A Shielded Ecosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)을 참고하세요.
</div>

## Zcash 프로토콜은 어떻게 관리되나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
프로토콜은 **Zcash Improvement Proposal (ZIP)** 절차에 따라 관리됩니다. 누구나 ZIP 초안을 제출할 수 있습니다. 초안은 커뮤니티의 논의를 거쳐 ZIP 편집자들에 의해 채택되거나 기각됩니다:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

결정 사항은 명세(specification)에 기록되고, 네트워크가 이를 채택하면 온체인에서 비준됩니다.
</div>

## 내 거래는 어디에 있나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
먼저 [블록 익스플로러 가이드](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)를 읽어보세요. 그런 다음 [Zcash Block Explorer](https://zcashblockexplorer.com)에서 확인하세요.

거래는 약 25분(20 블록) 후에 만료되며 자금은 자동으로 반환됩니다.

**거래가 보이지 않는 일반적인 이유:**
- 연결 끊김
- 거래 수수료가 너무 낮음
- 네트워크 과부하
- 투명한 입력(input)이 너무 많음(크기 초과)

**성공을 위한 팁:**
- 안정적인 연결을 사용하세요
- 표준 수수료를 지불하세요(우선 처리를 원하면 더 높게)
- 기다렸다가 나중에 다시 시도하세요
- 입력 수를 줄여 거래 크기를 작게 유지하세요
</div>

## Zcash는 정말 비공개인가요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**네.** Zcash는 실드드 거래의 보내는 사람, 금액, 받는 사람 데이터를 암호화합니다.

Zcash가 **하지 못하는** 것:
- 멀티시그 거래 암호화(FROST 통합 대기 중)
- 투명한 거래와의 상관관계 방지
- IP 주소 숨김

더 읽어보기: [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## 몇 가지 흔한 오해

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">오해</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">올바른 답변</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash는 중앙화된 코인인가요?</td>
        <td className="py-5 px-6 text-foreground">아닙니다. 상표권 협약으로 Zcash Foundation이나 ECC가 커뮤니티 합의에 반해 행동하는 것이 막혀 있습니다. 거버넌스는 탈중앙화가 입증되었습니다([Messari 보고서](https://messari.io/report/decentralizing-zcash) 참고). 커뮤니티 투표, ZecHub, Zcash Foundation A/V Club 모두 폭넓은 참여를 가능하게 합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash에 백도어가 있나요?</td>
        <td className="py-5 px-6 text-foreground">없습니다. Zcash와 우리가 만든 모든 암호 소프트웨어에는 백도어가 없으며, 앞으로도 없을 것입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash가 기업에 의해 통제되나요?</td>
        <td className="py-5 px-6 text-foreground">사실이 아닙니다. 연구를 위해 기업들과 협력하고 있지만, Zcash는 탈중앙화에 계속 전념하고 있습니다. 여러 자율 조직이 자기수탁(self-custody)과 프라이버시 권리를 향해 함께 일하고 있습니다.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash는 다른 프라이버시 코인에 비해 프라이버시가 제한적이다</td>
        <td className="py-5 px-6 text-foreground">아닙니다. Monero/Grin 방식의 프라이버시는 디코이(미끼)에 의존하는데, 이는 무력화될 수 있습니다. Zcash는 모든 실드드 거래 데이터를 암호화해 풀 안의 모든 거래를 구분할 수 없게 만듭니다. [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)를 참고하세요.</td>
      </tr>
    </tbody>
  </table>
</div>

---

**마지막 업데이트:** 2026년 3월  
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
