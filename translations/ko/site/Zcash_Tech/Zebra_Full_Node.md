<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra 풀 노드

## 요약

- Zebra(`zebrad`)는 Rust로 작성되고 Zcash Foundation가 유지 관리하는 Zcash 풀 노드입니다.
- 블록과 거래를 검증하고, 체인 상태를 유지하며, 피어 투 피어 네트워크를 통해 다른 노드와 통신합니다.
- Zebra와 zcashd는 동일한 프로토콜을 구현했으며 서로 연동할 수 있었습니다. zcashd이 종료된 이후에는 Zebra가 합의 역할을 담당합니다.
- 실행 방법은 2가지입니다. `zfnd/zebra` Docker 이미지를 사용하거나 소스 코드에서 빌드할 수 있습니다.
- 권장 하드웨어 사양은 CPU 코어 4개, RAM 16 GB, 디스크 300 GB입니다. 최소 사양은 CPU 코어 2개, RAM 4 GB이며, 디스크는 동일하게 300 GB가 필요합니다.

## 핵심 설명

Zebra는 Rust로만 작성된 최초의 Zcash 노드입니다. Zcash 피어 투 피어 네트워크에 연결되어 거래를 검증하고 브로드캐스트하며 블록체인 상태를 유지합니다. 독립된 구현이 하나 더 있으면 네트워크 인프라가 단일 코드베이스에 덜 의존하게 됩니다.

### Zebra와 zcashd

최초의 Zcash 노드인 zcashd는 Bitcoin 코드베이스를 바탕으로 Electric Coin Company가 개발했습니다. Zebra는 보안과 효율성에 중점을 두고 메모리 안전 언어인 Rust로 처음부터 새로 작성되었습니다.

두 구현은 동일한 프로토콜을 따르므로 서로 통신하고 연동할 수 있었습니다. zcashd는 2026년 7월 18일 지원 종료와 함께 작동이 중단되었으며 더 이상 시작되지 않습니다. 이에 따라 현재 사용되는 노드 구현은 Zebra와 Zakura입니다. 전체적인 내용은 [풀 노드](/zcash-tech/full-nodes)를 참조하세요.

## Zebra 실행하기

Zebra는 Docker 이미지를 사용하거나 직접 빌드하여 실행할 수 있습니다. 시스템 요구 사항 섹션을 참조하세요.

### Docker 사용법

최신 릴리스를 실행하고 체인의 최신 상태까지 동기화하려면 다음 명령어를 실행하세요.

```

docker run zfnd/zebra:latest

```

전체 안내는 [Docker 문서](https://zebra.zfnd.org/user/docker.html)를 참조하세요.

### Zebra 빌드하기

Zebra를 빌드하려면 Rust, libclang, C++ 컴파일러가 필요합니다.

- 최신 안정 버전의 Rust이 설치되어 있는지 확인하세요. Zebra는 해당 버전으로만 테스트됩니다.
- 필요한 빌드 종속 항목은 다음과 같습니다.
  - libclang(libclang-dev 또는 llvm-dev라고도 함)
  - clang 또는 다른 C++ 컴파일러(예: 모든 플랫폼의 g++ 또는 macOS의 Xcode)
  - Protocol Buffers v3.12.0(2020년 5월 16일 릴리스)에서 도입된 *--experimental_allow_proto3_optional* 플래그를 지원하는 protoc(Protocol Buffers 컴파일러)

### 설치 및 시작

glibc 2.34 이상을 사용하는 x86_64 또는 aarch64 Linux(Ubuntu 22.04 이상, Debian 12 이상, RHEL 9 이상, Amazon Linux 2023)에서는 빌드 종속 항목 설치를 생략하고 서명된 사전 빌드 바이너리를 설치할 수 있습니다.

```
cargo binstall zebrad
```

동일한 바이너리는 모든 GitHub 릴리스에 `zebrad-<version>-<target>.tar.gz`로 첨부되며, 각각 SHA-256 체크섬, Sigstore 빌드 출처 증명 및 Cosign 서명이 포함됩니다. 이전 플랫폼에서는 Docker 이미지를 사용하거나 소스에서 빌드하세요.

소스에서 빌드하려면 코드를 가져와 릴리스 바이너리를 빌드하세요.

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

다음 명령어로 노드를 시작하세요.

```
target/release/zebrad start
```

설치 안내: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## 선택적 구성 및 기능

### 구성 파일 초기화하기

  - 다음 명령어를 사용하여 구성 파일을 생성하세요.

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - 생성된 *zebrad.toml* 파일은 Linux의 기본 설정 디렉터리에 저장됩니다. 다른 운영 체제의 기본 위치는 문서를 참조하세요.

### 진행률 표시줄 구성하기

  - *zebrad.toml* 파일에서 *tracing.progress_bar*를 구성하면 진행률 표시줄을 사용해 터미널에 주요 지표를 표시할 수 있습니다. 참고: 진행률 표시줄의 예상값이 지나치게 커질 수 있는 알려진 문제가 있습니다.

### 채굴 구성하기

  - Zebra에서 *MINER_ADDRESS*와 포트 매핑을 Docker에 지정하면 채굴을 구성할 수 있습니다. 자세한 내용은 [채굴 지원 문서](https://zebra.zfnd.org/user/mining-docker.html)를 참조하세요.

### 사용자 지정 빌드 기능

  - Prometheus 메트릭, Sentry 모니터링, 실험적 Elasticsearch 지원 등을 위한 추가 Cargo 기능을 사용하여 Zebra의 기능을 확장할 수 있습니다.

  - 설치 중 `--features` 플래그의 매개변수로 여러 기능을 나열하면 함께 사용할 수 있습니다.

  - 성능 최적화를 위해 일부 디버깅 및 모니터링 기능은 릴리스 빌드에서 비활성화됩니다. 실험적 기능과 개발자 기능 전체 목록은 [API 문서](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)를 참조하세요.

## 시스템 요구 사항 및 네트워크 구성

### 권장 사양

- CPU: CPU 코어 4개
- RAM: 16 GB
- 디스크 공간: 바이너리 컴파일 및 캐시된 체인 상태 저장에 사용할 수 있는 디스크 공간 300 GB
- 네트워크: 월 최소 업로드 및 다운로드 용량이 300 GB인 100 Mbps 네트워크 연결

### 최소 사양

- CPU: CPU 코어 2개
- RAM: 4 GB
- 디스크 공간: 사용 가능한 디스크 공간 300 GB

Zebra의 테스트 스위트는 컴퓨터 사양에 따라 완료까지 1시간 이상 걸릴 수 있습니다. 성능이 낮은 시스템에서도 Zebra를 컴파일하고 실행할 수 있습니다. 정확한 성능 한계는 테스트를 통해 확인되지 않았습니다.

### 디스크 요구 사항

- Zebra는 캐시된 Mainnet 데이터에 약 300 GB, 캐시된 Testnet 데이터에 10 GB를 사용합니다. 디스크 사용량은 시간이 지나면서 증가할 것으로 예상됩니다.
- 데이터베이스는 주기적으로 정리되며, 종료하거나 다시 시작할 때도 정리됩니다. 변경 사항은 데이터베이스 거래를 사용해 커밋됩니다. 강제 종료나 패닉으로 인해 완료되지 않은 변경 사항은 다음에 Zebra가 시작될 때 롤백됩니다.

### 네트워크 요구 사항 및 포트

- Zebra는 인바운드 및 아웃바운드 연결에 다음 TCP 포트를 사용합니다.
  - Mainnet의 경우 8233
  - Testnet의 경우 18233
- Zebra에서 특정 listen_addr를 설정하면 해당 주소가 인바운드 연결용으로 광고됩니다. 동기화에는 아웃바운드 연결이 필요하며 인바운드 연결은 선택 사항입니다.
- 운영 체제 DNS 확인자(일반적으로 포트 53)를 통해 Zcash DNS 시드 서버에 접근할 수 있어야 합니다.
- Zebra는 모든 포트에서 아웃바운드 연결을 만들 수 있습니다. zcashd는 다른 네트워크에 대한 DDoS 공격에 악용되는 것을 방지하기 위해 기본 포트를 사용하는 피어를 우선합니다.

### 일반적인 Mainnet 네트워크 사용량

- 초기 동기화: 최초 동기화를 위해 300 GB를 다운로드해야 하며, 이 용량은 앞으로 늘어날 것으로 예상됩니다.
- 지속적인 업데이트: 사용자의 거래 크기와 피어의 요청에 따라 하루에 10 MB에서 10 GB까지 업로드 및 다운로드합니다.
- Zebra는 내부 데이터베이스 버전이 변경될 때마다 초기 동기화를 시작하므로 버전 업그레이드 중에 체인 전체를 다운로드해야 할 수도 있습니다.
- 왕복 지연 시간이 2초 이하인 피어를 우선합니다. 지연 시간이 이 임계값을 초과하면 Zebra 저장소에 이슈를 등록하세요.

## 흔히 하는 실수

- 현재 기준으로 디스크 용량을 정하는 것. 캐시된 Mainnet 상태는 이미 300 GB에 가까우며 계속 증가합니다.
- `zebrad`에서 지갑 RPC를 사용할 수 있을 것으로 예상하는 것. 키와 잔액은 별도 프로그램인 [Zallet](https://github.com/zcash/zallet)에 저장됩니다.
- `zebrad`만 실행하고 라이트 지갑이 연결되기를 기대하는 것. 이 연결 방식에는 lightwalletd 또는 [Zaino](/zcash-tech/zaino) 같은 인덱서가 필요합니다.
- 예상치 못한 재동기화를 오류로 여기는 것. 데이터베이스 버전이 변경되면 설계상 재동기화가 시작됩니다.

## 관련 페이지

- [풀 노드](/zcash-tech/full-nodes) - 풀 노드의 역할과 사용 가능한 구현
- [Zakura 노드](/zcash-tech/zakura-node) - Zebra를 포크하여 동기화 속도를 높이고 가지치기를 지원하는 노드
- [Zaino](/zcash-tech/zaino) - 라이트 지갑에 서비스를 제공하는 Rust 인덱서
- [라이트월렛 노드](/zcash-tech/lightwallet-nodes) - 라이트 지갑이 조회하는 서버
- [Zcash 채굴 안내](/using-zcash/zcash-mining-guide) - 자체 노드를 사용한 채굴

## 더 알아보기

- [The Zebra Book](https://zebra.zfnd.org)
- [Zebra의 GitHub](https://github.com/ZcashFoundation/zebra/)
- [시스템 요구 사항](https://zebra.zfnd.org/user/requirements.html)
