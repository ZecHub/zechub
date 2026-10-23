# 인덱서 벤치마크: Zaino vs Ztreamer

Zaino와 Ztreamer는 Zcash 라이트월렛이 동기화에 사용하는 API인 lightwallet gRPC 프로토콜을 제공하는 두 인덱서입니다. 이 페이지에서는 두 인덱서가 같은 응답을 반환하는지, 인덱스를 구축하는 데 얼마나 걸리는지, 그리고 월렛에 서비스를 얼마나 빠르게 제공하는지를 독립적이고 재현 가능한 방식으로 비교한 결과를 요약합니다.

## 요약

* 두 인덱서 모두 올바른 체인 데이터를 반환합니다. Zebra와 대조할 수 있었던 모든 응답이 일치했으므로, 월렛은 어느 쪽이든 사용할 수 있습니다.
* 확인된 차이는 관례와 예외 상황에 관한 것입니다. 오류 코드, 한 해시의 바이트 순서, 중복 주소를 계산하는 방식, 그리고 일부 JSON-RPC 응답 형식이 이에 해당합니다.
* Ztreamer는 동일한 CPU에서 인덱스를 약 6배 더 빠르게 구축합니다. Zaino는 인덱스를 구축하는 동안 요청을 Zebra로 전달하여 6초 후부터 응답을 시작합니다.
* Ztreamer는 측정된 모든 시나리오에서 더 빠르게 제공합니다. 전체 월렛 다운로드에서는 초당 블록 수가 13~17배 더 많습니다.
* Zaino의 지연 시간 대부분은 누락된 소켓 설정 하나(`TCP_NODELAY`)에서 비롯되며, 이로 인해 많은 요청에 약 40ms가 추가됩니다. 한 줄로 수정할 수 있습니다.

## 비교 대상

| 빌드 | 백엔드 노드 | 이유 |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` 백엔드) | 최신 안정 Zaino 릴리스 |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` 백엔드) | Ztreamer가 자체 공개 비교에서 측정한 버전 |
| Ztreamer v0.1.0 | 내장된 Zakura 노드 | 최신 Ztreamer 태그 |
| Ztreamer master | 내장된 Zakura 1.5.1 | Ztreamer의 설치 안내가 빌드하는 대상 |

두 인덱서는 서로 다른 설계를 사용합니다.

* **Zaino**는 [Zebra](Zebra_Full_Node.md) 풀 노드 옆에서 별도 프로세스로 실행되며, Zebra의 상태를 읽고 자체 인덱스를 유지합니다. 이는 [Z3 스택](Z3_Stack.md)에 포함된 인덱서입니다. [Zaino](Zaino.md)를 참조하세요.
* **Ztreamer**는 동일한 프로세스에 [Zakura](Zakura_Node.md) 노드(Zebra 포크)를 내장하고 컴팩트 블록 인덱스를 유지합니다.

## 측정 방법

* **모두에게 동일한 데이터.** 모든 빌드는 높이 4,382,897에서 고정된 동일한 Zcash Foundation 테스트넷 스냅샷에서 시작했으므로, 모두 정확히 같은 체인을 인덱싱했습니다.
* **누구나 재현할 수 있습니다.** 모든 작업은 무료 GitHub 호스팅 러너에서 실행됩니다. 저장소를 포크하고 워크플로 하나를 실행하면 됩니다.
* **빌드당 세 번 실행**, 매번 빈 인덱스에서 시작했습니다. 서버와 부하 생성기는 별도의 CPU 코어에서 실행되었습니다.
* **호환성:** lightwallet 프로토콜의 gRPC 메서드 20개(테스트 케이스 274개)를 모두 빌드 간 바이트 단위로 비교하고 Zebra의 JSON-RPC와 대조했습니다. Zaino가 제공하는 JSON-RPC 메서드 28개도 확인했습니다.
* **성능:** 인덱스 구축 시간과 리소스, 요청별 지연 시간, 블록 범위 처리량, 동시 클라이언트 1~128개, 그리고 Sapling 활성화부터 최신 블록까지의 전체 월렛 다운로드를 측정했습니다.

## 결과

### 인덱스 구축

세 번 실행한 결과의 중앙값:

| 빌드 | 인덱스 완료 | 첫 응답 | 디스크상 인덱스 크기 |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395초 | 6초 | 22.06 GiB |
| Zaino 0.9.0 | 1,211초 | 6초 | 22.06 GiB |
| Ztreamer v0.1.0 | 216초 | 210초 | 1.44 GiB |
| Ztreamer master | 159초 | 158초 | 1.44 GiB |

Zaino는 구축 중 요청을 Zebra로 전달하므로 거의 즉시 사용할 수 있습니다. Ztreamer는 인덱스가 완료될 때까지 아무것도 제공하지 않습니다. 동일한 CPU 모델에서 Zaino 0.10.1은 Ztreamer v0.1.0보다 6~6.5배 오래 걸렸고, CPU 시간은 7.5~8배 사용했습니다(Zebra 포함).

### 제공 성능

별도 표기가 없는 한 초당 블록 수이며, 세 번 실행한 결과의 중앙값:

| 시나리오 | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| 1,000개 블록 범위 | 11,414 | 179,486 |
| 전체 월렛 다운로드 (280,000 → 최신 블록) | 11,124 | 189,041 |
| 1,000개 블록 범위, 클라이언트 128개 | 110,093 | 229,527 |
| 단일 블록, 클라이언트 128개 (요청/초) | 6,843 | 11,044 |

클라이언트 128개에서는 두 서버 모두 CPU 코어 두 개로 제한되었기 때문에 격차가 약 2배로 줄어듭니다.

### 40ms 하한

Zaino에서는 12개 RPC 중 6개의 중앙값 지연 시간이 약 40ms이며, 모든 RPC의 99백분위수는 약 41ms입니다. 원인은 Zaino가 gRPC 리스너를 설정하는 방식입니다. `TCP_NODELAY` 소켓 옵션이 켜지지 않아 운영 체제가 작은 응답을 최대 40ms 동안 지연시킵니다.

Zaino 바이너리를 변경하지 않고 외부에서 이 옵션을 켜자 하한이 사라졌습니다. 예를 들어 `GetTreeState`는 40.3ms에서 0.75ms로 감소했습니다(Ztreamer: 0.63ms). 대량 블록 스트리밍은 변하지 않았으므로, 위의 처리량 격차는 실제입니다.

### 호환성 차이

* **Zaino 0.9.0**은 프로토콜에서 기본값이 차폐 데이터만이라고 명시한 `GetBlock`에 투명 데이터를 기본으로 포함합니다. 이는 0.10.1에서 수정되었습니다.
* **`GetSubtreeRoots`:** `completingBlockHash` 필드는 두 인덱서에서 서로 반대 바이트 순서를 사용합니다. 현재 월렛은 이 필드를 읽지 않습니다.
* **오류 코드:** Zaino는 잘못된 입력에 대해 `INTERNAL`를 반환하고, Ztreamer는 `INVALID_ARGUMENT` 또는 `NOT_FOUND`를 반환합니다.
* `GetTaddressBalanceStream`의 **중복 주소**는 두 번 계산되지만, Ztreamer master에서는 예외입니다.
* **JSON-RPC:** Zaino의 `getrawtransaction`는 상세도 0에서 Zebra 및 zcashd와 달리 16진수 문자열 대신 객체를 반환합니다.

## 제한 사항

* **테스트넷만 사용.** 테스트넷 블록은 메인넷보다 작으므로 절대적인 시간과 크기는 메인넷 수치가 아닙니다. 이 비교는 동일한 입력에서의 상대적 비교입니다.
* 여러 CPU 모델을 사용하는 **공유 CI 머신**을 사용했습니다. 전체 보고서는 주요 수치에 대해 동일 CPU 비교를 제공합니다.
* **측정하지 않은 항목:** 리오그, 실시간 체인 최신 블록 추적, 멤풀 부하 및 TLS.

## 더 알아보기

* 전체 보고서: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* 벤치마크 저장소: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* 원시 데이터: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
