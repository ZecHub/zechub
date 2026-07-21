# 자주 묻는 질문

Zcash에 대한 가장 흔한 질문 목록입니다. Zcash 클라이언트 문제 해결은 [공식 문제 해결 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)를 참조하십시오.

### 빠른 이동
[Zcash란 무엇인가요?](#what-is-zcash) | [Zcash를 어떻게 구입할 수 있나요?](#acquire) | [다른 암호화폐와의 차이점은 무엇인가요?](#difference) | [프로토콜 거버넌스는 어떻게 이루어지나요?](#governance) | [내 트랜잭션은 어디에 있나요?](#transaction) | [Zcash는 정말 프라이버시를 보장하나요?](#privacy) | [일반적인 오해](#misconceptions)

---

## Zcash란 무엇인가요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash는 빠른 속도, 기밀성 있는 트랜잭션 및 낮은 수수료를 제공하는 디지털 통화입니다. 프라이버시가 Zcash의 핵심 특징입니다. 모든 트랜잭션을 암호화하기 위해 제로 지식 증명(zero-knowledge proofs) 사용을 선도했습니다.

즉시, 모바일, 보안 및 개인 정보 보호된 결제를 위한 여러 지갑이 제공됩니다: [모바일 지갑](https://z.cash/wallets/)
</div>

## Zcash를 어떻게 구입할 수 있나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
암호화폐 [거래소](https://z.cash/exchanges)에서 ZEC을 구매할 수 있습니다.  
또한 P2P 방식으로 Zcash를 구매하거나 채굴하여 얻을 수도 있습니다.
</div>

## Zcash와 다른 암호화폐의 차이점은 무엇인가요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash는 비트코인이나 이더리움보다 근본적으로 더 많은 프라이버시를 제공합니다. 빠른 블록 시간(75초), 낮은 수수료, 정기적인 업그레이드가 특징입니다.

사용자는 **투명**(Transparent) 또는 **보호됨**(Shielded) 트랜잭션 중 선택할 수 있습니다. 더 자세한 정보는 [보호된 생태계](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)를 참조하십시오.
</div>

## Zcash 프로토콜은 어떻게 거버넌스 되나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
프로토콜은 **Zcash 개선 제안**(Zcash Improvement Proposal, ZIP) 과정을 통해 관리됩니다. 누구든지 ZIP 초안을 제출할 수 있습니다. 초안들은 커뮤니티에 의해 토론되고 ZIP 편집자들이 승인하거나 거부합니다:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

결정 사항은 명세서에 기록되고 네트워크가 채택할 때 체인상으로 승인됩니다.
</div>

## 내 트랜잭션은 어디에 있나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
먼저 [블록 탐색기 가이드](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)를 읽어보세요. 그 후 [Zcash 블록 탐색기](https://zcashblockexplorer.com)에서 확인해 보세요.

트랜잭션은 약 25분(20블록) 후에 만료되며 자동으로 자금이 되돌려집니다.

**트랜잭션이 나타나지 않을 수 있는 일반적인 이유:**
- 연결 손실
- 트랜잭션 수수료가 낮음
- 네트워크 과부하
- 투명 입력이 너무 많음(크기가 너무 큼)

**성공을 위한 팁:**
- 안정된 연결 사용
- 표준 수수료 지불 (우선순위를 위해 더 높은 수수료 지불)
- 나중에 다시 시도
- 트랜잭션 크기를 작게 유지하기 위해 입력 수 줄이기
</div>

## Zcash는 정말 프라이버시를 보장하나요?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**네.** Zcash는 보호된 트랜잭션에 대해 송신자, 금액 및 수신자 데이터를 암호화합니다.

Zcash는 **아니요:**
- 다중 서명 트랜잭션을 암호화 (FROST 통합 예정)
- 투명 트랜잭션과의 상관관계를 보호
- IP 주소 숨기기

추가 정보: [보호된 생태계](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## 일반적인 오해

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">오해</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정답</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash는 중앙화된 암호폐인가요?</td>
        <td className="py-5 px-6 text-foreground">아니요. 상표권 계약은 Zcash Foundation 또는 ECC가 커뮤니티 합의에 반대하는 행동을 하지 않도록 방지합니다. 거버넌스는 입증된 분산형 구조입니다(참고: [Messari 보고서](https://messari.io/report/decentralizing-zcash)). 커뮤니티 투표, ZecHub 및 Zcash Foundation A/V Club은 광범위한 참여를 가능하게 합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash에 백도어가 있나요?</td>
        <td className="py-5 px-6 text-foreground">아니요. Zcash 또는 우리가 구축한 암호화 소프트웨어에는 백도어가 없으며 앞으로도 존재하지 않을 것입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash는 회사에 의해 통제되고 있나요?</td>
        <td className="py-5 px-6 text-foreground">틀렸습니다. 연구를 위해 기업과 협력하지만 Zcash는 분산형 구조에 대한 약속을 지키고 있습니다. 여러 자율적인 조직이 공동으로 소유권 및 프라이버시 권리에 대해 노력하고 있습니다.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash는 다른 프라이버시 암호폐와 비교해 프라이버시가 제한되어 있나요?</td>
        <td className="py-5 px-6 text-foreground">아니요. Monero/Grin 스타일의 프라이버시는 데코이(decoy)에 의존합니다(이 방법은 무력화될 수 있습니다). Zcash는 모든 보호된 트랜잭션 데이터를 암호화하여 풗수에서 모든 트랜잭션이 구분되지 않도록 합니다. [충분히 프라이버시가 없나요?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)를 참조하십시오.</td>
      </tr>
    </tbody>
  </table>
</div>

---

**마지막 업데이트:** 2026년 3월  
**기여하고 싶으신가요?** [GitHub에서 이 페이지 편집하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
