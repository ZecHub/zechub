<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 채굴 및 스테이킹 프라이버시

채굴자 보상 지급 주소와 파이널라이저는 동일한 것이 아닙니다. 체인은 둘을 연결하지 않습니다.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">채굴자</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">투명한 보상 지급</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase는 Zcash 주소로 지급합니다. t-address 이력은 공개됩니다.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">파이널라이저</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 키</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">ed25519 키입니다. 투표에 서명합니다. Zcash 주소가 아닙니다.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">본드</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">보호된 스테이크</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">스테이킹 풀에 있습니다. 대상 파이널라이저를 지정합니다.</p>
  </div>
</div>

## 중요한 순서

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 채굴</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 보호</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 본드</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">보호 단계를 건너뛰면 비공개 단계는 절대 일어나지 않습니다. 본드는 투명한 코인베이스를 지우지 않습니다.</p>
</div>

## 공개되는 것

| 항목 | 공개 여부 | 이유 |
|---|---|---|
| 채굴자 t-address 및 코인베이스 이력 | 예 | 일반적인 투명 출력 |
| 파이널라이저 키 및 zfinv1 | 예, 명단에 등록되면 | 투표를 검증하려면 그래야 합니다 |
| 투표권 및 보상 은행 | 예 | 스테이킹 분포를 감사할 수 있도록 파이널라이저 키에 대해 공개됨 |
| 어떤 투명 주소가 본드에 자금을 댔는지 | 아니요, 보호 후에는 | 본드는 보호된 노트를 사용합니다 |
| 채굴자와 파이널라이저 사이의 연결 | 체인상에는 없음 | 프로토콜은 이를 기록하지 않습니다 |

스테이킹된 금액은 의도적으로 공개됩니다. 설계상 총 스테이킹 금액과 파이널라이저 간 분포를 공개적으로 검증할 수 있어야 합니다. 양자화(10의 거듭제곱)와 고정된 스테이킹 기간은 이러한 감사를 가능하게 하면서도 개별적인 시점이나 패턴 정보가 유출되는 양을 제한합니다. 스테이킹되지 않은 Orchard 잔액은 비공개로 유지되며, 스테이킹은 의도적인 공개입니다.

## 자신에게 스테이킹하거나, 다른 사람에게 스테이킹하기

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">자신의 파이널라이저에 본드하기</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">가장 간단한 방식입니다. 운영자 역할과 본드를 모두 유지합니다. 관찰자는 여전히 체인 데이터만으로 t-address와 zfinv1이 동일 인물의 것임을 증명할 수 없습니다.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">다른 구성원에게 본드하기</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">투표권은 그들의 키 아래에 표시됩니다. 그들은 활성 파이널라이저 수수료 10%를 얻습니다. 본드에 누적되는 90%는 당신이 유지합니다. 이렇게 하면 투명한 보상을 받는 채굴자가 파이널라이저를 운영하는 동일 인물이라는 명백한 추측이 깨집니다.</p>
  </div>
</div>

그룹은 서로 다른 지급 주소로 채굴하고, 구성원 간에 실딩 및 결속할 수 있습니다. 이로 인해 체인 데이터만으로 “이 채굴자가 이 파이널라이저다”라고 주장하기가 훨씬 어려워집니다. 이는 파이널라이저가 누구인지는 숨기지 않으며, 채굴도 숨기지 않습니다.

## 이것으로 할 수 없는 것

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">숨겨지지 않는 것</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>파이널라이저가 누구인지</li>
    <li>각자가 가진 투표권의 양</li>
    <li>투명한 채굴 이력</li>
    <li>오프체인에서 직접 만든 연결: 하나의 IP, 하나의 보상 지급 패턴, 하나의 운영자</li>
  </ul>
</div>

대상 zfinv1은 스테이킹 작업 안에 포함됩니다. 여기서 프라이버시는 대상 키를 숨기는 것이 아니라 자금의 출처에 관한 것입니다.

## 요약

채굴하세요. 보호하세요. 그다음 본드하세요. 직접 연결하지 않는 한 채굴자 주소와 파이널라이저 키는 서로 관련 없이 유지됩니다.
