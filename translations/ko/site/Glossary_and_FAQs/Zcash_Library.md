# Zcash 라이브러리

Zcash와 관련된 핵심 용어, 개념, 리소스를 종합적으로 정리한 용어집입니다.

### 빠른 탐색
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">액션</td>
        <td className="py-5 px-6 text-foreground">Orchard 프로토콜은 각 Spend와 Output마다 개별 증명을 여러 개 생성하는 대신, 이를 하나의 Action으로 병합합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">주소</td>
        <td className="py-5 px-6 text-foreground">Zcash에는 Shielded (Z/zaddr) 주소와 Transparent (T/taddr) 주소가 있습니다. Unified Address (UA)는 NU5 업그레이드 이후 Z와 T를 대체하기 위해 단계적으로 도입되고 있습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Arborist Call</td>
        <td className="py-5 px-6 text-foreground">Zcash 프로토콜 및 연구 개발 업데이트를 다루는 격주 통화입니다. Zcash 커뮤니티 포럼과 Discord에서 진행됩니다. [회의 노트](https://github.com/ZcashCommunityGrants/arboretum-notes) / [포럼 공지](https://forum.zcashcommunity.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">자동 Shielding</td>
        <td className="py-5 px-6 text-foreground">사용자(보다 정확히는 그들의 지갑)가 자금을 transparent 주소에서 최신 shielded ZEC 풀로 자동 이동할 수 있게 합니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## B

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">벤치마킹</td>
        <td className="py-5 px-6 text-foreground">채굴자는 Zcash 채굴에 사용되는 다양한 하드웨어의 효율성에 대한 지표를 제출할 수 있습니다. [여기에서 보기](https://zcashbenchmarks.info)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">블록</td>
        <td className="py-5 px-6 text-foreground">블록은 Zcash 블록체인 상의 기록으로, 네트워크에서 전송된 거래 집합을 담고 있습니다. 평균적으로 약 75초마다 새로운 블록이 블록체인에 추가됩니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">블록 탐색기</td>
        <td className="py-5 px-6 text-foreground">블록체인 상의 모든 거래를 과거와 현재를 포함해 볼 수 있는 온라인 도구입니다. [Zcash 블록 탐색기](https://zcashexplorer.app/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">블로그</td>
        <td className="py-5 px-6 text-foreground">[ZODL 블로그 (구 Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation 블로그](https://zfnd.org/blog/) / [ZecHub 블로그](https://zechub.wiki/zechub-dao)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Blossom</td>
        <td className="py-5 px-6 text-foreground">Zcash의 3번째 주요 네트워크 업그레이드입니다. [추가 정보](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom)</td>
      </tr>
    </tbody>
  </table>
</div>

## C

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Canopy</td>
        <td className="py-5 px-6 text-foreground">Zcash의 5번째 주요 네트워크 업그레이드입니다. [추가 정보](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">커밋먼트 스킴</td>
        <td className="py-5 px-6 text-foreground">커미터가 짧은 문자열로 다항식에 커밋할 수 있게 하며, 검증자는 이를 사용해 커밋된 다항식의 주장된 평가값을 확인할 수 있습니다. Zcash 프로토콜에서 통신 비용을 줄이는 데 유용합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">커뮤니티</td>
        <td className="py-5 px-6 text-foreground">[공식 Zcash 커뮤니티 포럼](https://forum.zcashcommunity.com) / [Zcash 커뮤니티 Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Cypherpunk Zero</td>
        <td className="py-5 px-6 text-foreground">ECC, 일러스트레이터 Stranger Wolf, Mighty Jaxx, 그리고 일부 생태계 파트너 간의 창작 유니버스이자 협업 프로젝트입니다. [Cypherpunk Zero 사이트](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea 컬렉션](https://opensea.io/collection/cypherpunk-zero)</td>
      </tr>
    </tbody>
  </table>
</div>

## D

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">DeFi</td>
        <td className="py-5 px-6 text-foreground">ZEC를 DeFi와 통합하는 프로젝트: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / 
[ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/)
</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Deshielding</td>
        <td className="py-5 px-6 text-foreground">zaddr(Shielded 주소)에서 taddr(Transparent 주소)로 전송되는 거래를 의미합니다. 거래의 출처는 보이지 않지만, 자금은 공개적으로 보이는 가치 풀로 들어갑니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">개발자 리소스</td>
        <td className="py-5 px-6 text-foreground">[개발자 리소스](https://www.zcashcommunity.com/developers/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">문서</td>
        <td className="py-5 px-6 text-foreground">[공식 문서](https://zcash.readthedocs.io/en/latest/)</td>
      </tr>
    </tbody>
  </table>
</div>

## E

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ECC</td>
        <td className="py-5 px-6 text-foreground">이전에는 Zcash Company로 알려졌던, Zcash 프로토콜을 개발하는 Electric Coin Company 팀입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ECDSA</td>
        <td className="py-5 px-6 text-foreground">타원곡선 디지털 서명 알고리즘은 암호학적으로 안전한 디지털 서명 방식입니다. ECDSA 서명/검증 알고리즘은 타원곡선 점 곱셈에 의존합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">교육</td>
        <td className="py-5 px-6 text-foreground">Zcash를 설명하는 학습 중심 영상은 [여기](https://www.zcashcommunity.com/zcash-education/)에서 볼 수 있습니다</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">암호화된 메모</td>
        <td className="py-5 px-6 text-foreground">Shielded 주소로 전송되는 거래에 추가되는 필드로, 결제 수신자가 볼 수 있습니다. 암호화된 메모는 발신자와 수신자만 볼 수 있습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Equihash</td>
        <td className="py-5 px-6 text-foreground">Zcash에서 사용되는 메모리 중심의 작업증명 채굴 알고리즘입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">이벤트</td>
        <td className="py-5 px-6 text-foreground">Zcash 관련 이벤트 일정은 [Luma](https://luma.com/zcash)와 [Zcash Foundation](https://zfnd.org/zf-events/)에서 볼 수 있습니다</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">거래소</td>
        <td className="py-5 px-6 text-foreground">[Zcash를 지원하는 거래소 목록](https://z.cash/exchanges/)</td>
      </tr>
    </tbody>
  </table>
</div>

## F

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Fiat-Shamir</td>
        <td className="py-5 px-6 text-foreground">상호작용형 지식 증명을 바탕으로 디지털 서명을 만드는 기법입니다. 이를 통해 어떤 사실(예: 비밀에 대한 지식)을 기초 정보 공개 없이 공개적으로 증명할 수 있습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">창립자 보상</td>
        <td className="py-5 px-6 text-foreground">창립자 보상은 전체 블록 보상의 20%를 차지하며, 각 블록의 가치에서 차감되어 프로토콜 개발과 성장을 촉진하기 위해 투명하게 분배됩니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Free2Z</td>
        <td className="py-5 px-6 text-foreground">Zcash로 구동되는 익명 콘텐츠 및 비공개 기부 도구 [Free2Z](https://free2z.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">FROST</td>
        <td className="py-5 px-6 text-foreground">유연한 라운드 최적화 Schnorr 임계값 서명 방식입니다. [연구 논문](https://eprint.iacr.org/2020/852)</td>
      </tr>
    </tbody>
  </table>
</div>

## G

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">거버넌스</td>
        <td className="py-5 px-6 text-foreground">ZIP 프로세스에서 나온 결정은 Zcash 명세와 네트워크를 실행하는 소프트웨어에 반영됩니다. 이러한 변경 사항은 네트워크 대다수가 업그레이드를 채택하고 합의가 깨지지 않을 때 온체인에서 비준됩니다. [전체 프로토콜 역사](https://zfnd.org/protocol-governance/)</td>
      </tr>
    </tbody>
  </table>
</div>

## H

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Halo</td>
        <td className="py-5 px-6 text-foreground">신뢰 설정 없이 회로 업그레이드를 가능하게 하여, Zcash shielded 프로토콜이 미래의 개선과 확장을 더 민첩하게 수용할 수 있게 합니다. [기술 설명](https://z.cash/learn/what-is-halo-for-zcash/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">HD 지갑</td>
        <td className="py-5 px-6 text-foreground">계층적 결정형 지갑은 하나의 시드에서 일련의 키 쌍을 생성하여 편의성과 관리 용이성뿐 아니라 높은 수준의 보안을 제공합니다.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Heartwood</td>
        <td className="py-5 px-6 text-foreground">Zcash의 4번째 주요 네트워크 업그레이드입니다. [추가 정보](https://z.cash/upgrade/heartwood/)</td>
      </tr>
    </tbody>
  </table>
</div>

## I

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">인덱스</td>
        <td className="py-5 px-6 text-foreground">CoinDesk의 ZCX 인덱스는 Zcash의 실시간 USD 환산 현물 가격을 나타냅니다. [가격 지수](https://www.coindesk.com/indices/zcx/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">통합</td>
        <td className="py-5 px-6 text-foreground">여러 서드파티 제공업체를 통해 Zcash 결제를 받을 수 있습니다. [결제 처리업체](https://z.cash/zcash-for-business/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">상호작용형 증명 시스템</td>
        <td className="py-5 px-6 text-foreground">계산을 두 당사자, 즉 증명자(Prover)와 검증자(Verifier) 사이의 메시지 교환으로 모델링하는 추상 기계입니다.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">투자</td>
        <td className="py-5 px-6 text-foreground">Zcash에 노출되기를 원하는 기관 투자자나 패밀리 오피스를 위한 다양한 금융 옵션이 उपलब्ध합니다. [전체 목록](https://z.cash/investors/)</td>
      </tr>
    </tbody>
  </table>
</div>

## J

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">JubJub</td>
        <td className="py-5 px-6 text-foreground">zk-SNARK 회로에서 효율적으로 구현될 수 있도록 설계된 타원곡선입니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## K

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Keystone 지갑</td>
        <td className="py-5 px-6 text-foreground">기본적으로 Zcash(Orchard shielded) 지원이 내장된 에어갭 하드웨어 지갑으로, 콜드 서명을 위해 ZODL과 호환됩니다. [Keystone](https://keyst.one)</td>
      </tr>
    </tbody>
  </table>
</div>

## L

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">레이어 1</td>
        <td className="py-5 px-6 text-foreground">기본 네트워크와 그 기반 인프라를 가리킵니다. 레이어 1 블록체인은 다른 네트워크의 도움 없이 거래를 검증하고 최종 확정할 수 있습니다. Zcash는 L1 블록체인입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">librustzcash</td>
        <td className="py-5 px-6 text-foreground">Zcash 작업에 필요한 모든 크레이트와 의존성을 포함하는 Rust 워크스페이스입니다. [저장소](https://github.com/zcash/librustzcash)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">lightwalletd</td>
        <td className="py-5 px-6 text-foreground">라이트 클라이언트에 블록체인 정보를 제공하는 상태 비저장 서버입니다. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html)</td>
      </tr>
    </tbody>
  </table>
</div>

## M

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">지표</td>
        <td className="py-5 px-6 text-foreground">네트워크 지표는 [여기](https://tokenterminal.com/explorer/projects/zcash/metrics/all)에서 확인할 수 있습니다</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">메타데이터</td>
        <td className="py-5 px-6 text-foreground">사용자의 Zcash 거래와 함께 생성되는 데이터입니다. 여기에는 블록 높이, 거래 버전, 만료 높이 등이 포함될 수 있습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">모바일 SDK</td>
        <td className="py-5 px-6 text-foreground">Android를 Zcash에 연결하는 경량 SDK로, 서드파티 Android 앱이 shielded 거래를 송수신할 수 있게 합니다. [Github](https://github.com/zcash/zcash-android-wallet-sdk)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">채굴</td>
        <td className="py-5 px-6 text-foreground">Zcash 네트워크의 노드들이 각 블록마다 자동 조정되는 난이도를 바탕으로 복잡한 수학 계산을 수행해 해답을 찾기 위해 경쟁하는 과정입니다. [가이드](https://z.cash/mining-zcash/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">멀티시그니처</td>
        <td className="py-5 px-6 text-foreground">자금을 사용하기 위해 여러 개의 개인 키 서명이 필요한 주소입니다. 현재 멀티시그 기능은 transparent 주소에서만 지원됩니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## N

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Nighthawk</td>
        <td className="py-5 px-6 text-foreground">Zcash용 모바일 지갑 - [웹사이트](https://nighthawkwallet.com)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU5</td>
        <td className="py-5 px-6 text-foreground">Orchard shielded 풀과 Unified Address를 도입한 Zcash의 6번째 주요 네트워크 업그레이드입니다. [추가 정보](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU6</td>
        <td className="py-5 px-6 text-foreground">Zcash Community Grants 프로그램과 Shielded Labs에 자금을 지원하기 위해 블록 보조금을 조정한 Zcash의 7번째 주요 네트워크 업그레이드입니다. 2024년 말에 활성화되었습니다. [추가 정보](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU7</td>
        <td className="py-5 px-6 text-foreground">예정된 Zcash의 8번째 주요 네트워크 업그레이드입니다. 2026년에는 ZODL을 통한 커뮤니티 정서 조사가 진행 중입니다. 추가적인 shielded 풀 개선과 거버넌스 업데이트가 포함될 것으로 예상됩니다. [포럼 토론](https://forum.zcashcommunity.com/t/nu7-sentiment-polling-questions-for-community-review-coinholder-voting-via-zodl/55713)</td>
      </tr>
    </tbody>
  </table>
</div>

## O

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Orchard Shielded Pool</td>
        <td className="py-5 px-6 text-foreground">Zcash의 세 번째 shielded 풀로, zk-SNARK 기술 스택의 지속적인 진화를 보여줍니다. [전체 내용](https://electriccoin.co/blog/explaining-halo-2/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Overwinter</td>
        <td className="py-5 px-6 text-foreground">Zcash의 1번째 네트워크 업그레이드입니다. [추가 정보](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter)</td>
      </tr>
    </tbody>
  </table>
</div>

## P

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">결제</td>
        <td className="py-5 px-6 text-foreground">여러 가지 결제 제공업체를 통해 일상적인 구매에 Zcash를 사용할 수 있습니다. [결제 앱](https://z.cash/pay-with-zcash/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">피어투피어 네트워크</td>
        <td className="py-5 px-6 text-foreground">P2P 네트워크는 탈중앙화 개념에 기반합니다. 블록체인 기술의 기초 아키텍처입니다.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">팟캐스트</td>
        <td className="py-5 px-6 text-foreground">[Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [스페인어 Zcast](https://www.youtube.com/@ZcastEsp)</td>
      </tr>
    </tbody>
  </table>
</div>

## Q

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">QR 코드</td>
        <td className="py-5 px-6 text-foreground">쉽게 스캔할 수 있도록 Zcash 주소를 인코딩하는 데 사용되는 기계 판독 코드입니다. 현대적인 Zcash 지갑에서는 보통 Unified Address (UA)를 QR 코드로 공유합니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## R

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
<table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">복구 구문</td>
        <td className="py-5 px-6 text-foreground">지갑을 백업하고 복원하는 데 사용되는 12개 또는 24개의 문자와 숫자 시퀀스입니다. Zcash에서는 이 구문이 spending key와 Viewing Key를 재생성하므로, 자금 복구와 보안에 매우 중요합니다.</td>
      </tr>
       </tbody>
  </table>
</div>

## S

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sapling</td>
        <td className="py-5 px-6 text-foreground">Shielded 거래의 효율성을 크게 개선하고 모바일 채택의 길을 연 주요 네트워크 업그레이드입니다. 블록 419200에서 활성화되었습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">선택적 공개</td>
        <td className="py-5 px-6 text-foreground">Shielded 주소의 소유자가 Viewing Key 또는 결제 공개 정보를 제3자와 선택적으로 공유하면서도, 그 외 모든 사람에게는 데이터를 비공개로 유지할 수 있게 합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Shielded 주소</td>
        <td className="py-5 px-6 text-foreground">zaddr라고도 합니다. z로 시작합니다. zk-SNARKs를 사용해 발신자, 수신자, 금액, 메모를 숨깁니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Shielded 거래</td>
        <td className="py-5 px-6 text-foreground">Shielded 주소 간에만 이루어지는 거래입니다. 블록체인 상에서 완전히 비공개입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sol/s</td>
        <td className="py-5 px-6 text-foreground">초당 솔루션 수 - Equihash 채굴 성능을 측정합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Spending Key</td>
        <td className="py-5 px-6 text-foreground">Shielded 주소에서 자금을 사용하는 것을 가능하게 하는 개인 키입니다(잔액과 거래 내역 조회도 가능).</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sprout</td>
        <td className="py-5 px-6 text-foreground">Zcash의 원래 Shielded 프로토콜 버전입니다(2016년 출시).</td>
      </tr>
    </tbody>
  </table>
</div>

## T

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">TAZ</td>
        <td className="py-5 px-6 text-foreground">테스트넷 Zcash(가치가 없는 테스트 통화)입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">테스트넷</td>
        <td className="py-5 px-6 text-foreground">메인넷 전에 업그레이드와 기능을 테스트하기 위한 별도의 블록체인입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">거래</td>
        <td className="py-5 px-6 text-foreground">사용자 간의 결제로, 네트워크에 제출되고 결국 블록에서 확인됩니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">거래 만료</td>
        <td className="py-5 px-6 text-foreground">거래는 확인되지 않으면 약 25분(20블록) 후 만료되며, 자금은 자동으로 반환됩니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">거래 수수료</td>
        <td className="py-5 px-6 text-foreground">기본 수수료는 0.0001 ZEC입니다. 더 높은 수수료가 우선권을 가지며, 매우 낮은 수수료는 지연이나 만료를 초래할 수 있습니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transparent 주소</td>
        <td className="py-5 px-6 text-foreground">taddr라고도 합니다. t로 시작합니다. 완전히 공개됩니다(비트코인과 유사).</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transparent 거래</td>
        <td className="py-5 px-6 text-foreground">Transparent 주소 간에만 이루어지는 거래로, 모든 것이 공개적으로 보입니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## U

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Unified Address</td>
        <td className="py-5 px-6 text-foreground">하나의 문자열로 transparent 결제와 shielded 결제를 모두 처리할 수 있는 현대적 주소 형식입니다(NU5에서 도입됨).</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">업그레이드 활성화</td>
        <td className="py-5 px-6 text-foreground">네트워크 업그레이드(예: NU5, NU6)가 자동으로 활성화되는 특정 블록 높이입니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## V

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Viewing Key</td>
        <td className="py-5 px-6 text-foreground">자금을 사용할 수는 없지만, Shielded 주소의 잔액과 거래 내역을 볼 수 있게 해주는 개인 키입니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## W

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">지갑</td>
        <td className="py-5 px-6 text-foreground">개인 키를 저장하고 ZEC를 송수신할 수 있게 해주는 소프트웨어 또는 하드웨어입니다. 현재 사용 중인 지갑에는 ZODL (iOS/Android), Zingo! (모바일/데스크톱), Nighthawk (Android), YWallet, Zallet (출시 예정), Keystone (하드웨어)가 포함됩니다. 전체 목록은 [Zcash 생태계 지갑](https://z.cash/ecosystem/?wallets=#tag-wallets)을 참고하세요</td>
      </tr>
    </tbody>
  </table>
</div>

## X

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">XZC</td>
        <td className="py-5 px-6 text-foreground">일부 레거시 거래소에서 사용되는 Zcash의 예전 티커 심볼입니다. 공식 티커는 ZEC입니다.</td>
      </tr>
    </tbody>
  </table>
</div>

## Y

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">YWallet</td>
        <td className="py-5 px-6 text-foreground">Orchard, Sapling, 그리고 transparent 주소를 지원하는 고성능 프라이버시 중심 Zcash 지갑입니다. 빠른 동기화 속도로 잘 알려져 있습니다. iOS와 Android에서 사용할 수 있습니다. [YWallet](https://ywallet.app)</td>
      </tr>
    </tbody>
  </table>
</div>

## Z

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">용어</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">정의</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash</td>
        <td className="py-5 px-6 text-foreground">zk-SNARKs를 사용하는 프라이버시 중심 암호화폐입니다. transparent(비트코인 스타일) 결제와 완전한 shielded 결제를 연결합니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash Foundation</td>
        <td className="py-5 px-6 text-foreground">Zcash 생태계를 지원하고, 개발 자금을 제공하며, 프라이버시를 증진하는 독립 비영리 단체입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash 네트워크</td>
        <td className="py-5 px-6 text-foreground">거래를 검증하고 블록체인을 유지하는 노드들의 피어투피어 네트워크입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZEC</td>
        <td className="py-5 px-6 text-foreground">Zcash의 공식 통화 코드입니다(일부 거래소는 아직도 XZC로 표시합니다).</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zerocash</td>
        <td className="py-5 px-6 text-foreground">Zcash가 기반하고 있는 학술 프로토콜(2014)입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zaino</td>
        <td className="py-5 px-6 text-foreground">Zcash Foundation이 구축한, lightwalletd를 대체하는 차세대 Zcash 인덱서입니다. 라이트 클라이언트가 더 빠르고 더 프라이빗하게 동기화할 수 있게 합니다. Zcash Z3 인프라 업그레이드의 일부입니다.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zallet</td>
        <td className="py-5 px-6 text-foreground">Electric Coin Co / ZODL 팀이 Zaino 기반으로 개발 중인 공식 Zcash 지갑입니다. Zallet Alpha는 2026년 기준 활발히 개발 중입니다. [포럼](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zebra</td>
        <td className="py-5 px-6 text-foreground">Zcash Foundation의 Rust 기반 풀 노드 구현체입니다(zcashd의 대안). 프로덕션 준비가 되어 있으며 활발히 유지보수되고 있습니다. [GitHub](https://github.com/ZcashFoundation/zebra)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZIP</td>
        <td className="py-5 px-6 text-foreground">Zcash Improvement Proposal - 프로토콜 변경을 제안하고 비준하는 데 사용되는 커뮤니티 거버넌스 프로세스입니다. [ZIP 저장소](https://github.com/zcash/zips)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZODL</td>
        <td className="py-5 px-6 text-foreground">Electric Coin Company의 소비자 제품군에 대한 리브랜딩된 이름으로, ZODL 지갑 앱(이전 명칭 ECC Wallet)과 코인 보유자 여론조사를 위한 ZODL 거버넌스 플랫폼을 포함합니다. [zodl.com](https://zodl.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">zk-SNARKs</td>
        <td className="py-5 px-6 text-foreground">Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcash shielded 거래를 가능하게 하는 암호 기술입니다. 어떤 진술(예: 유효한 지출)을 비밀 정보를 전혀 드러내지 않고 증명할 수 있게 합니다.</td>
      </tr>
    </tbody>
  </table>
</div>

---

**마지막 업데이트:** 2026년 5월  
**기여하고 싶으신가요?** [GitHub에서 이 페이지 수정하기](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
