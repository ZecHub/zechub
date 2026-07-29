<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 지갑 동기화

## TL;DR

* 보호된 Zcash 트랜잭션은 세부 정보를 숨기기 때문에, 서버는 Bitcoin이나 Ethereum 같은 투명 코인에서처럼 단순히 지갑 잔액을 조회할 수 없습니다.
* 라이트 지갑은 특수 서버(lightwalletd)에서 작은 “compact blocks”를 다운로드하고, 자신의 개인 키로 관련 데이터를 직접 복호화합니다.
* 이 블록들을 복호화하고 처리하는 데는 시간이 걸리므로, 지갑은 더 빠른 동기화 방식을 사용해 사용자가 더 빨리 자금을 이용할 수 있도록 합니다.
* 대표적인 접근 방식: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), 그리고 제안된 DAGSync.
* 이러한 방법들은 일반적으로 더 빠른 동기화를 위해 추가 메모리나 처리 성능을 사용하는 절충안을 택합니다.

## 핵심 설명

### Zcash 동기화는 어떻게 작동하나요

Zcash는 영지식 증명을 사용해 승인되지 않은 제3자로부터 트랜잭션 세부 정보를 보호합니다. 이러한 프라이버시 때문에 라이트 지갑의 동기화는 더 어려워집니다. 라이트 지갑은 전체 블록체인을 로컬에 저장하지 않고, 대신 필요한 정보를 서버에 의존하기 때문입니다. Bitcoin이나 Ethereum에서는 서버가 블록체인을 인덱싱해 계정 데이터를 빠르게 반환할 수 있습니다. 하지만 Zcash에서는 서버가 트랜잭션 세부 정보를 볼 수 없습니다. 그렇다면 라이트 지갑은 전체 블록체인을 직접 다운로드하고 복호화하지 않고도 어떻게 잔액과 기록을 동기화할 수 있을까요?

Zcash는 여러 접근 방식을 결합해 이 문제를 해결합니다. Zcash에는 전체 노드에서 데이터를 필터링하고 트랜잭션 식별에 필요한 정보만 유지하는 특수 서버인 lightwalletd가 있습니다. 이 데이터는 compact blocks라고 하며, 원래 블록보다 훨씬 작습니다. 라이트 지갑은 먼저 lightwalletd 서버에서 이 compact blocks를 다운로드한 뒤, 자신의 개인 키로 이를 복호화합니다.

이 compact blocks조차 복호화하고 처리하는 데 상당한 시간이 걸릴 수 있으며, 특히 블록당 트랜잭션 수가 많을수록 더 그렇습니다. 그래서 지갑은 동기화를 가속하고 가능한 한 빨리 자금을 사용할 수 있도록 다양한 방법을 사용합니다.

## 시각적 비유

블록체인을 잠긴 상자로 가득 찬 거대한 우편실이라고 생각해 보세요. 투명 코인에서는 우편실 직원이 라벨을 읽고 어떤 상자가 당신 것인지 즉시 알려줄 수 있습니다. 하지만 Zcash에서는 라벨이 가려져 있으므로, 당신의 지갑이 직접 열쇠를 들고 조용히 상자들을 확인해 자신이 열 수 있는 상자를 찾아야 합니다. 아래의 동기화 방식들은 그 상자들을 더 빨리 확인하기 위한 서로 다른 전략입니다.

## 심층 분석

### Warp Sync

Warp sync는 각 compact block을 하나씩 복호화하고 처리하는 중간 단계를 건너뛰고, 최종 결과로 바로 도달하는 YWallet 기능입니다.

이를 위해 각 단계를 실제로 거치지 않고도 최종 결과를 계산할 수 있도록 수학과 암호학을 사용합니다.

Warp sync는 초당 수천 개의 블록을 처리할 수 있어, 일반적인 동기화 방식보다 훨씬 빠릅니다. 이는 YWallet 사용자가 자신의 계정에 수십만 건의 트랜잭션과 수신 note가 있더라도 빠르고 부드러운 성능을 누릴 수 있음을 의미합니다.

이 단계 생략 기법 외에도, YWallet는 여러 블록을 동시에 처리하여 사용 가능한 하드웨어에 작업 부하를 분산함으로써 과정을 더욱 빠르게 만듭니다.

[Warp Sync](https://ywallet.app/warp/)에서 더 읽어보세요

### Spend-before-sync

Spend-before-sync는 Zcash Mobile Wallet SDK V2의 새로운 기능으로, 사용자가 전체 지갑 동기화를 기다리지 않고도 지갑을 열자마자 즉시 자금을 사용할 수 있게 해줍니다. 이 기능은 지갑의 사용 가능한 잔액을 더 빠르게 발견하게 하여 사용자 경험을 개선합니다.

Spend-before-sync는 lightwalletd 서버의 블록을 비선형 순서로 처리하는 compact-blocks 동기화 알고리즘을 사용해 작동합니다. 이는 하나의 블록이 완전히 처리될 때까지 기다렸다가 다음 블록으로 넘어가는 대신, 지갑이 약간 더 많은 메모리와 처리 성능을 사용해 블록체인의 여러 구간을 스캔할 수 있음을 의미합니다. 보통은 서로 다른 범위를 스캔하면서, 오래된 블록이 다운로드되고 처리되는 동안 더 새로운 트랜잭션을 찾습니다. 최근의 미사용 note가 발견되면 즉시 사용할 수 있게 됩니다.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet 팀이 개발한 Blaze sync는 가장 높고 최신의 블록부터 시작해 뒤로 거슬러 내려가며 블록체인을 스캔하는 라이트 지갑용 동기화 알고리즘입니다.

이를 통해 지갑은 수신된 note보다 먼저 사용된 note를 찾을 수 있으며, 동시에 이전에 미사용이었던 note를 전체 동기화 과정이 끝날 때까지 기다리지 않고도 사용할 수 있게 합니다.

그뿐만 아니라, 블록 다운로드, trial decryption 수행, witness 업데이트 등 동기화의 구성 요소들을 서로 분리해 병렬로 처리하는 Out-of-Order Sync를 사용합니다. 이는 더 많은 메모리와 CPU 자원을 필요로 하지만 동기화 속도를 5배 높입니다.

### DAGSync

DAGSync는 동기화 속도를 높여 Zcash 보호 지갑의 사용자 경험을 개선하는 것을 목표로 하는 제안된 동기화 알고리즘입니다.

이 알고리즘은 Zcash 지갑 내 note, witness, nullifier 사이의 의존 관계를 표현하기 위해 [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/)를 사용합니다.

DAG는 노드와 엣지로 구성된 데이터 구조이며, 각 엣지는 두 노드 간의 관계를 나타내는 방향을 가집니다. DAG에는 사이클이 없으므로, 어떤 노드에서 시작해 엣지를 따라가 다시 같은 노드로 돌아오는 방법이 없습니다.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## 실질적인 의미

흥미롭게도, 이러한 모든 메커니즘은 Zcash Security가 [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) 게시물에서 제기한 문제와, 그것이 프라이빗 결제 시스템과 어떤 관계가 있는지에 대한 질문에 답하려는 목적을 갖고 있습니다. 일부는 한 걸음 더 나아가, 특정 주소에만 해당하는 데이터를 제외한 모든 메모 데이터를 서버에서 다운로드하기도 하며, 이는 약간의 추가 자원을 대가로 프라이버시를 높여줍니다.

또한 Zcash Foundation은 라이트 지갑의 성능을 개선하기 위한 다른 대안들도 검토해 왔습니다. 그 예가 바로 [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/)이며, 재단은 이것이 “최근 Zcash 지갑 사용자들에게 영향을 준 성능 문제에 대한 잠재적 해결책을 제공할 수 있는지 판단하기 위해” 연구해 온 구조입니다.

## 흔한 실수

**lightwalletd 서버가 당신의 잔액을 알고 있다고 가정하는 것.** 서버는 compact blocks만 전달할 뿐이며, 당신의 지갑이 자신의 키로 이를 로컬에서 복호화하고 해석합니다.

**동기화를 너무 일찍 중단하는 것.** 일부 방법은 전체 동기화가 끝나기 전에 최근에 사용 가능한 자금을 먼저 보여주지만, 더 오래된 기록과 note는 아직 처리 중일 수 있습니다.

**Zcash 동기화를 투명 체인 동기화와 직접 비교하는 것.** 더 느린 경로는 결함이 아니라 프라이버시를 보존하는 대가일 수 있습니다 — 지갑이 공개 코인 서버라면 당신의 계정을 공개적으로 읽어서 처리했을 작업을 직접 수행하고 있는 것입니다.


## 관련 페이지

- [Lightwallet 노드](/zcash-tech/lightwallet-nodes) — 라이트 지갑이 의존하는 lightwalletd 인프라입니다.
- [Viewing Key](/zcash-tech/viewing-keys) — 지갑이 자신의 note를 감지하고 복호화하는 데 사용하는 키입니다.
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash 지갑 동기화에 대한 또 다른 접근 방식입니다.
- [FROST](/zcash-tech/frost) — 보호된 ZEC를 위한 분산 서명 권한입니다.
