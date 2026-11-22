<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 실전 가이드: Zcash 노드 RPC 및 블록체인 인덱싱

이 페이지는 실행 중인 Zcash 풀 노드에 JSON-RPC로 요청을 보내고, 라이트 지갑과 블록 탐색기가 조회할 수 있도록 인덱서를 연결하는 방법을 정리한 안내서입니다. **두 번째 설치 가이드는 아닙니다.**

`zcashd` 이후 스택(Zebra + Zallet, 선택 사항인 Zaino, 포트, 볼륨, 2단계 부팅)을 시작하는 방법은 [Z3 Stack](/zcash-tech/z3-stack) 페이지와 [Z3 저장소](https://github.com/ZcashFoundation/z3)를 참조하세요. 합의 노드에 대한 배경 정보는 [풀 노드](/zcash-tech/full-nodes)와 [Zebra 풀 노드](/zcash-tech/zebra-full-node)를 참조하세요.

`zcashd`은 2026년 7월 18일에 지원이 종료되었습니다. 새 운영 작업은 Zebra(또는 [Zakura](/zcash-tech/zakura-node))와 지갑/인덱서를 대상으로 해야 하며, `zcashd`를 대상으로 해서는 안 됩니다.

---

## 요약

* **JSON-RPC**는 운영자와 지갑이 체인 최고 블록, 피어, 그리고 (지갑 프로세스에서) 잔액을 노드에 요청하는 방식입니다. Z3에서는 Zebra이 노드 RPC를 제공하고, Zallet가 지갑 RPC를 제공합니다.
* **Regtest**는 RPC 호출 방법을 익히기에 적합합니다. Z3의 rpc-router는 `http://127.0.0.1:8181`에서 `zebra` / `zebra` 요청을 받아 노드 메서드는 Zebra로, 지갑 메서드는 Zallet로 전달합니다.
* **메인넷과 테스트넷**은 Zebra에서 쿠키 인증을 사용합니다. regtest의 사용자 이름/비밀번호를 공개 노드에 복사하지 마세요.
* **인덱싱**은 검증과 별개의 작업입니다. Zebra이 검증을 수행합니다. [Zaino](/zcash-tech/zaino)(Z3 `--profile indexer`)는 lightwalletd 호환 gRPC를 제공합니다. [Ztreamer](https://github.com/zcashlabs/ztreamer)은 Zakura 기반 인덱서이며, Z3에 포함된 서비스가 아닙니다.
* Zaino JSON-RPC와 Zebra의 선택적 인덱서 gRPC는 루프백 또는 신뢰할 수 있는 네트워크에서 사용해야 합니다. 인증 없이 공개 인터넷에 노출하지 마세요.

---

## 어떤 프로세스에 어떤 요청을 보내야 할까요?

| 필요한 기능 | 연결 대상 | Z3 메인넷 호스트 포트 | 참고 |
| --- | --- | --- | --- |
| 체인 최고 블록, 피어, `getblockchaininfo` | Zebra JSON-RPC | 8232 | 쿠키 인증 |
| 지갑 잔액, 주소, 전송 | Zallet RPC | 28232 | 별도 프로세스, 베타 소프트웨어 |
| 라이트 지갑용 압축 블록 | Zaino gRPC | 8137 | `--profile indexer`가 있을 때만 사용 가능, 평문 h2c |
| 블록 탐색기 / 파우셋 JSON-RPC 프록시 | Zaino JSON-RPC | 8237 | 신뢰할 수 있는 네트워크에서만 사용 |
| 동기화 없이 위의 모든 기능 연습 | Z3 regtest rpc-router | 8181 | 사용자 이름 `zebra` / 비밀번호 `zebra` |

포트 표와 Compose 프로젝트 이름은 [Z3 Stack](/zcash-tech/z3-stack)과 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)를 참조하세요.

---

## 먼저 regtest에서 연습하기

Z3 체크아웃 디렉터리에서 `./scripts/regtest-init.sh`와 `docker compose --env-file .env.regtest up -d`를 실행한 다음:

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

정상적인 `getblockchaininfo` 결과에는 `"blocks"`과 `"upgrades"` 맵이 포함됩니다. curl이 응답 없이 멈추면 라우터가 실행 중이 아닌 것입니다. `401`가 표시되면 라우터가 아니라 Zebra에 직접 연결한 것입니다(regtest에서 직접 Zebra를 사용할 때는 `29232`이며, 인증 정보를 변경하지 않았다면 라우터 자격 증명이 여전히 필요합니다).

활성화 블록 채굴을 포함한 전체 regtest 작업 흐름은 [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)를 참조하세요.

---

## 메인넷 / 테스트넷 JSON-RPC(쿠키 인증)

메인넷과 테스트넷에서는 Zallet와 선택 사항인 Zaino 서비스가 **공유 쿠키 볼륨**을 읽습니다. 이 쿠키는 부팅할 때 새로 생성되며 백업 대상으로 삼아서는 안 됩니다.

Zebra JSON-RPC를 공개 인터넷에 공개하지 마세요. Compose 네트워크(`zebra:8232`)에서 호출하거나, 루프백에 바인딩한 경우에만 호스트에서 호출하세요.

Zebra가 `/ready`일 때 일반적으로 운영자가 확인하는 항목:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo`은 채굴 RPC입니다. 단일 `zcashd` 프로세스만을 예상하던 풀은 템플릿용 Zebra(또는 Zakura)과 코인베이스에 사용하는 지갑이 필요합니다. [Zcash 채굴 풀](/using-zcash/zcash-mining-pools) 및 [마이그레이션 안내서](/guides/migration-guide-zcashd-to-zebrad-zallet)를 참조하세요.

---

## 인덱서 연결하기

검증과 인덱싱은 서로 다른 작업입니다.

### Zaino (Z3에 포함된 서비스)

Zaino는 Zebra를 읽고 lightwalletd 호환 gRPC API와 JSON-RPC 프록시를 제공합니다. Zallet에는 독립 실행형 Zaino 컨테이너가 **필요하지 않습니다**. Zaino 라이브러리를 내장하고 JSON-RPC를 통해 Zebra와 통신합니다. 외부 라이트 지갑, 블록 탐색기 또는 파우셋을 사용하려면 독립 실행형 Zaino를 시작하세요.

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

클라이언트가 Zaino를 사용하도록 설정하기 전에 Zebra가 동기화될 때까지 기다리세요. 높은 가져오기 동시성으로 따라잡기 작업을 하는 대량 인덱서는 Zebra의 검증기를 느리게 할 수 있습니다. 인덱서가 따라잡을 때까지 `fetch_concurrency`를 한 자릿수의 낮은 값으로 유지하세요.

regtest gRPC(평문, 포트 `28137`):

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

모든 네트워크에서 Zaino gRPC는 평문 h2c를 사용합니다. 호스트 외부에서 연결할 수 있도록 하려면 리버스 프록시에서 TLS를 종료하세요. 자세한 내용은 [Zaino](/zcash-tech/zaino)와 [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)를 참조하세요.

### 기타 인덱서(Z3에 포함되지 않음)

* **lightwalletd** — 이전 세대 압축 블록 서버입니다. 현재도 실제 환경에서 배포되어 있지만, 이 역할을 이어받는 경로는 Zaino입니다.
* **Ztreamer** — Zakura 기반 인덱서이자 `CompactTxStreamer` 구현체입니다. Z3 서비스가 아닙니다. [Ztreamer 저장소](https://github.com/zcashlabs/ztreamer)를 참조하세요.
* **Zinder** — Zcash Foundation의 인덱서(알파)입니다. 아카이브 Zebra 또는 Zakura 노드에서 데이터를 읽고 자체 `WalletQuery` gRPC API와 lightwalletd 호환 `CompactTxStreamer` 어댑터를 제공합니다. 빠른 시작 안내에서는 Z3 노드 옆에서 실행하지만 Z3 서비스는 아닙니다. [Zinder](/zcash-tech/zinder)을 참조하세요.
* **Zebra `rpc.indexer_listen_addr`** — Zebra 내부의 선택적 gRPC 리스너입니다. Z3에는 필요하지 않으며 호스트에 공개되지 않습니다.

---

## 자주 하는 실수

**Zebra에서 지갑 메서드를 호출하기.** `getwalletinfo` 및 전송 RPC는 합의 노드가 아니라 Zallet(또는 다른 지갑)에 속합니다.

**Zebra가 `/ready`가 되기 전에 Zallet를 시작하기.** Zallet가 계속 재시작됩니다. 메인넷/테스트넷에서는 `scripts/check-zebra-readiness.sh`를 사용하세요.

**regtest의 `zebra`/`zebra`를 메인넷에 복사하기.** 메인넷/테스트넷의 기본값이 쿠키 인증인 데는 이유가 있습니다.

**Zaino를 풀 노드로 취급하기.** 검증은 Zebra(또는 Zakura)가 수행합니다. 인덱싱은 Zaino이 수행합니다.

**Zaino JSON-RPC 또는 Zebra 인덱서 gRPC를 공개적으로 노출하기.** 이 엔드포인트는 루프백 또는 신뢰할 수 있는 사설 네트워크에서 사용해야 합니다.

**모든 라이트 지갑이 이미 Zaino를 지원한다고 가정하기.** 지갑의 현재 릴리스가 실제로 구현하는 프로토콜과 일치하는지 확인하세요.

---

## 관련 페이지

* [Z3 Stack](/zcash-tech/z3-stack) — 설치, 포트, 볼륨, 2단계 부팅
* [Zaino](/zcash-tech/zaino) — 인덱서 역할 및 운영자 참고 사항
* [풀 노드](/zcash-tech/full-nodes)
* [Zebra 풀 노드](/zcash-tech/zebra-full-node)
* [라이트월렛 노드](/zcash-tech/lightwallet-nodes)
* [Zcash Stack](/guides/zcash-stack) — Kubernetes 또는 Docker Compose에서 Zebra + lightwalletd(또는 Zaino)
* [마이그레이션 가이드: zcashd에서 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)로
* [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)

## 자료

* [Z3 저장소](https://github.com/ZcashFoundation/z3)
* [Z3 regtest 요리책(curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet 북](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/zcashlabs/ztreamer)

**마지막 업데이트:** 2026년 9월
