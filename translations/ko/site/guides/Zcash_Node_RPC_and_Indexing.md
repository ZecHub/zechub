<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 실전 가이드: Zcash 노드 RPC 및 블록체인 인덱싱

이 페이지는 실행 중인 Zcash 풀 노드와 JSON-RPC로 통신하고 라이트 월렛과 탐색기가 질의할 수 있는 인덱서를 연결하는 방법을 담은 레시피 모음입니다. 이는 두 번째 설치 가이드가 **아닙니다**.

`zcashd` 이후 스택(Zebra + Zallet, 선택 사항인 Zaino, 포트, 볼륨, 2단계 부팅)을 시작하는 방법은 [Z3 Stack](/zcash-tech/z3-stack) 페이지와 [Z3 저장소](https://github.com/ZcashFoundation/z3)를 참조하세요. 합의 노드에 관한 배경 정보는 [Full Nodes](/zcash-tech/full-nodes) 및 [Zebra Full Node](/zcash-tech/zebra-full-node)를 참조하세요.

`zcashd`는 2026년 7월 18일에 지원이 종료되었습니다. 새 운영 작업은 Zebra(또는 [Zakura](/zcash-tech/zakura-node))와 월렛/인덱서를 대상으로 해야 하며, `zcashd`를 대상으로 해서는 안 됩니다.

---

## 요약

* **JSON-RPC**는 운영자와 월렛이 노드에 체인 팁, 피어, 그리고 (월렛 프로세스에서) 잔액을 요청하는 방식입니다. Z3에서는 Zebra가 노드 RPC를 제공하고, Zallet가 월렛 RPC를 제공합니다.
* **Regtest**는 호출 방법을 익히기에 적합한 곳입니다. `http://127.0.0.1:8181`의 Z3 rpc-router는 `zebra` / `zebra`를 수락하고 노드 메서드는 Zebra로, 월렛 메서드는 Zallet로 전달합니다.
* **Mainnet 및 testnet**은 Zebra에서 쿠키 인증을 사용합니다. regtest 사용자 이름/비밀번호를 공개 노드에 복사하지 마세요.
* **인덱싱**은 검증과 별개의 작업입니다. Zebra가 검증합니다. [Zaino](/zcash-tech/zaino)(Z3 `--profile indexer`)는 lightwalletd 호환 gRPC를 제공합니다. [Ztreamer](https://github.com/distractedm1nd/ztreamer)는 Zakura 기반 인덱서이며, Z3에서 제공하는 구성 요소가 아닙니다.
* Zaino JSON-RPC 및 Zebra의 선택적 인덱서 gRPC는 루프백 또는 신뢰할 수 있는 네트워크용입니다. 인증 없이 공용 인터넷에 노출하지 마세요.

---

## 어떤 프로세스가 어떤 호출에 응답하는가

| 원하는 작업 | 연결 대상 | Z3 mainnet 호스트 포트 | 참고 |
| --- | --- | --- | --- |
| 체인 팁, 피어, `getblockchaininfo` | Zebra JSON-RPC | 8232 | 쿠키 인증 |
| 월렛 잔액, 주소, 전송 | Zallet RPC | 28232 | 별도 프로세스, 베타 소프트웨어 |
| 라이트 월렛용 컴팩트 블록 | Zaino gRPC | 8137 | `--profile indexer`에서만 제공, 평문 h2c |
| 탐색기 / 수도꼭지 JSON-RPC 프록시 | Zaino JSON-RPC | 8237 | 신뢰할 수 있는 네트워크에서만 사용 |
| 동기화 없이 위의 모든 작업 연습 | Z3 regtest rpc-router | 8181 | 사용자 이름 `zebra` / 비밀번호 `zebra` |

포트 매트릭스 및 Compose 프로젝트 이름: [Z3 Stack](/zcash-tech/z3-stack) 및 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## 먼저 regtest에서 연습하기

Z3 체크아웃에서 `./scripts/regtest-init.sh` 및 `docker compose --env-file .env.regtest up -d` 이후:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

정상적인 `getblockchaininfo` 결과에는 `"blocks"` 및 `"upgrades"` 맵이 포함됩니다. curl이 멈춘다면 라우터가 실행되지 않은 것이고, `401`가 표시된다면 라우터 대신 Zebra에 직접 연결한 것입니다(regtest에서 직접 Zebra는 `29232`이며, 변경하지 않았다면 여전히 라우터 자격 증명을 요구합니다).

활성화 블록 채굴을 포함한 전체 regtest 워크플로: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet / testnet JSON-RPC(쿠키 인증)

mainnet과 testnet에서 Zallet 및 선택적 Zaino 서비스는 **공유 쿠키 볼륨**을 읽습니다. 이 쿠키는 부팅 시 재생성되며 백업 대상이 아닙니다.

Zebra JSON-RPC를 공용 인터넷에 게시하지 **마세요**. Compose 네트워크(`zebra:8232`)에서 호출하거나, 루프백에 바인딩한 경우에만 호스트에서 호출하세요.

Zebra가 `/ready` 상태가 된 후 수행하는 일반적인 운영자 점검:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo`는 채굴 RPC입니다. 단일 `zcashd` 프로세스를 계속 예상하던 풀은 템플릿을 위해 Zebra(또는 Zakura)와 코인베이스에 사용할 월렛이 필요합니다. [Zcash Mining Pools](/using-zcash/zcash-mining-pools) 및 [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.

---

## 인덱서 연결하기

검증과 인덱싱은 서로 다른 작업입니다.

### Zaino(Z3에서 제공)

Zaino는 Zebra를 읽고 lightwalletd 호환 gRPC API와 JSON-RPC 프록시를 제공합니다. Zallet에는 독립형 Zaino 컨테이너가 필요하지 않습니다. Zaino 라이브러리를 내장하고 JSON-RPC를 통해 Zebra와 통신합니다. 외부 라이트 월렛, 탐색기 또는 수도꼭지를 원할 경우 독립형 Zaino를 시작하세요:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

클라이언트를 Zaino로 연결하기 전에 Zebra의 동기화가 완료될 때까지 기다리세요. 높은 가져오기 동시성으로 따라잡는 중인 대량 인덱서는 Zebra의 검증기를 느리게 할 수 있으므로, 인덱서가 따라잡을 때까지 `fetch_concurrency`를 낮은 한 자릿수로 유지하세요.

Regtest gRPC(평문, 포트 `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino gRPC는 모든 네트워크에서 평문 h2c입니다. 호스트 외부에서 연결되는 경우 리버스 프록시에서 TLS를 종료하세요. 자세한 내용: [Zaino](/zcash-tech/zaino) 및 [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### 기타 인덱서(Z3 제공 아님)

* **lightwalletd** — 이전 세대 컴팩트 블록 서버입니다. 여전히 현장에서 배포되어 있으며, 이 역할의 후속 경로는 Zaino입니다.
* **Ztreamer** — Zakura 기반 인덱서이자 `CompactTxStreamer` 구현체입니다. Z3 서비스가 아닙니다. [Ztreamer 저장소](https://github.com/distractedm1nd/ztreamer)를 참조하세요.
* **Zebra `rpc.indexer_listen_addr`** — Zebra 내부의 선택적 gRPC 리스너입니다. Z3는 이를 요구하지 않으며 호스트에 게시하지도 않습니다.

---

## 흔한 실수

**Zebra에서 월렛 메서드 호출하기.** `getwalletinfo` 및 전송 RPC는 합의 노드가 아닌 Zallet(또는 다른 월렛)에 속합니다.

**Zebra가 `/ready` 상태가 되기 전에 Zallet 시작하기.** Zallet가 재시작 루프에 빠집니다. mainnet/testnet에서는 `scripts/check-zebra-readiness.sh`를 사용하세요.

**regtest `zebra`/`zebra`를 mainnet에 복사하기.** 쿠키 인증에는 mainnet/testnet 기본값인 이유가 있습니다.

**Zaino를 풀 노드로 취급하기.** Zebra(또는 Zakura)가 검증합니다. Zaino가 인덱싱합니다.

**Zaino JSON-RPC 또는 Zebra 인덱서 gRPC를 공개적으로 노출하기.** 이러한 엔드포인트는 루프백 또는 신뢰할 수 있는 사설 네트워크용입니다.

**모든 라이트 월렛이 이미 Zaino를 지원한다고 가정하기.** 월렛의 현재 릴리스와 실제로 구현하는 프로토콜을 비교해 확인하세요.

---

## 관련 페이지

* [Z3 Stack](/zcash-tech/z3-stack) — 설치, 포트, 볼륨, 2단계 부팅
* [Zaino](/zcash-tech/zaino) — 인덱서 역할 및 운영자 참고 사항
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd에서 Zebrad/Zallet로](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib 및 Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## 리소스

* [Z3 저장소](https://github.com/ZcashFoundation/z3)
* [Z3 regtest 쿡북(curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**최종 업데이트:** 2026년 9월
