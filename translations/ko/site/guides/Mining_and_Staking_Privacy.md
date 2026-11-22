<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# 채굴과 스테이킹 프라이버시

채굴자 보상 지급 주소와 파이널라이저는 같은 것이 아닙니다. 체인은 둘을 연결하지 않습니다.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">채굴자</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">투명한 보상 지급</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase는 Zcash 주소로 지급합니다. t-address 기록은 공개됩니다.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">파이널라이저</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 키</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">ed25519 키입니다. 투표에 서명합니다. Zcash 주소가 아닙니다.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">위임 지분</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">거래정보 보호 스테이크</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">스테이킹 풀에 들어갑니다. 대상 파이널라이저를 지정합니다.</p>
  </div>
</div>

## 중요한 순서

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 채굴</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 거래정보 보호</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 위임 지분</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">거래정보 보호 단계를 건너뛰면 프라이버시를 보호하는 단계가 이루어지지 않습니다. 위임 지분을 설정해도 투명한 코인베이스 거래가 지워지지는 않습니다.</p>
</div>

## 공개되는 정보

| 항목 | 공개 여부 | 이유 |
|---|---|---|
| 채굴자 t-address 및 코인베이스 기록 | 예 | 일반 투명 출력 |
| 파이널라이저 키 및 zfinv1 | 등록 목록에 올라간 후 공개 | 투표 검증에 필요합니다 |
| 투표 권한 및 보상 은행 | 예 | 스테이크 분배를 감사할 수 있도록 파이널라이저 키에 연결해 공개합니다 |
| 위임 지분에 자금을 댄 투명 주소 | 거래정보 보호 처리 후에는 비공개 | 위임 지분은 거래정보 보호 노트를 사용합니다 |
| 채굴자와 파이널라이저의 연결 | 온체인에 기록되지 않음 | 프로토콜 어디에도 둘의 연결 정보가 기록되지 않습니다 |

스테이킹한 금액은 의도적으로 공개됩니다. 설계상 스테이킹 총액과 파이널라이저별 분배를 공개적으로 확인할 수 있어야 합니다. 양자화(10의 거듭제곱)와 고정 스테이킹 기간은 감사를 가능하게 하면서 개인별 시점이나 패턴 정보의 유출을 제한합니다. 스테이킹하지 않은 Orchard 잔액은 비공개로 유지됩니다. 스테이킹은 의도적으로 정보를 공개하는 행위입니다.

## 본인 또는 다른 사람에게 위임 지분 설정하기

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">본인의 파이널라이저에 위임 지분 설정</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">가장 간단한 방법입니다. 운영자 역할과 위임 지분을 직접 유지합니다. 관찰자는 체인 데이터만으로 t-address와 zfinv1이 한 사람의 것임을 증명할 수 없습니다.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">다른 구성원에게 위임 지분 설정</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">투표 권한은 해당 구성원의 키에 표시됩니다. 해당 구성원은 활성 파이널라이저 수수료 10%를 얻습니다. 위임 지분에서 발생하는 90%는 본인이 유지합니다. 이렇게 하면 투명한 보상을 받는 채굴자와 파이널라이저를 운영하는 사람이 같다는 뻔한 추측을 깨뜨릴 수 있습니다.</p>
  </div>
</div>

그룹은 각자 다른 보상 지급 주소로 채굴한 다음 거래정보 보호 처리를 하고, 구성원 간에 위임 지분을 설정할 수 있습니다. 그러면 체인 데이터만으로 “이 채굴자가 이 파이널라이저다”라고 주장하기가 훨씬 어려워집니다. 하지만 파이널라이저가 누구인지는 숨겨지지 않으며, 채굴 내역도 숨겨지지 않습니다.

## 이 기능으로 할 수 없는 것

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">숨겨지지 않는 정보</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>파이널라이저가 누구인지</li>
    <li>각 파이널라이저의 투표 권한이 얼마나 되는지</li>
    <li>투명한 채굴 기록</li>
    <li>오프체인에서 만든 연결 정보: 하나의 IP, 하나의 보상 지급 패턴, 하나의 운영자</li>
  </ul>
</div>

대상 zfinv1은 스테이킹 작업에 포함됩니다. 여기서 프라이버시란 자금의 출처를 보호하는 것이지, 목적지 키를 숨기는 것이 아닙니다.

## 요약

채굴한 다음 거래정보 보호 처리를 하고, 그 후 위임 지분을 설정하세요. 직접 연결하지 않는 한 채굴자 주소와 파이널라이저 키는 서로 연관되지 않습니다.
