<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra 풀 노드

## 요약

- Zebra(`zebrad`)는 Zcash Foundation에서 유지 관리하는 Rust로 작성된 Zcash 풀 노드입니다.
- 블록과 트랜잭션을 검증하고, 체인 상태를 유지하며, P2P 네트워크를 통해 다른 노드와 통신합니다.
- Zebra와 zcashd는 같은 프로토콜을 구현했으며 상호 운용할 수 있었습니다. zcashd가 종료된 이후 Zebra가 합의 역할을 맡고 있습니다.
- 실행 방법은 두 가지입니다: `zfnd/zebra` Docker 이미지 사용 또는 소스에서 빌드.
- 권장 하드웨어는 CPU 코어 4개, RAM 16GB, 디스크 300GB입니다. 최소 사양은 코어 2개와 RAM 4GB이며, 디스크는 동일하게 300GB가 필요합니다.

## 핵심 설명

Zebra는 Rust로 완전히 작성된 최초의 Zcash 노드입니다. Zcash P2P 네트워크에서 트랜잭션을 검증하고 브로드캐스트하며 블록체인 상태를 유지합니다. 두 번째 독립 구현체가 존재함으로써 네트워크 인프라는 어느 하나의 코드베이스에 덜 의존하게 됩니다.

### Zebra 및 zcashd

원래의 Zcash 노드인 zcashd는 Electric Coin Company가 Bitcoin의 코드베이스를 바탕으로 개발했습니다. Zebra는 보안과 효율성에 중점을 두고 메모리 안전 언어인 Rust로 처음부터 작성되었습니다.

두 구현체는 동일한 프로토콜을 따르므로 통신하고 상호 운용할 수 있었습니다. zcashd는 2026년 7월 18일 지원 종료에 도달해 더 이상 시작되지 않으며, 현재 사용 중인 노드 구현체는 Zebra와 Zakura입니다. 더 넓은 맥락은 [풀 노드](/zcash-tech/full-nodes)를 참조하세요.

## Zebra 실행하기

Docker 이미지를 사용하거나 Zebra를 수동으로 빌드할 수 있습니다. 시스템 요구 사항 섹션을 참조하세요.

### Docker 사용

최신 릴리스를 실행하고 체인의 최신 상태까지 동기화하려면 다음 명령을 실행하세요.

```

docker run zfnd/zebra:latest

```

전체 지침은 [Docker 문서](https://zebra.zfnd.org/user/docker.html)를 참조하세요.

### Zebra 빌드하기

Zebra를 빌드하려면 Rust, libclang 및 C++ 컴파일러가 필요합니다.

- Zebra는 최신 안정 Rust 버전에서만 테스트되므로, 해당 버전이 설치되어 있는지 확인하세요.
- 필요한 빌드 종속성은 다음과 같습니다.
  - libclang(libclang-dev 또는 llvm-dev라고도 함)
  - clang 또는 다른 C++ 컴파일러(모든 플랫폼의 g++ 또는 macOS의 Xcode 등)
  - Protocol Buffers v3.12.0(2020년 5월 16일 출시)에서 도입된 *--experimental_allow_proto3_optional* 플래그를 포함한 protoc(Protocol Buffers 컴파일러)

### 설치 및 시작

glibc 2.34 이상을 사용하는 x86_64 또는 aarch64 Linux(Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023)에서는 빌드 종속성을 건너뛰고 서명된 사전 빌드 바이너리를 설치할 수 있습니다.

```
cargo binstall zebrad
```

동일한 바이너리는 모든 GitHub 릴리스에 `zebrad-<version>-<target>.tar.gz`로 첨부되며, 각각 SHA-256 체크섬, Sigstore 빌드 출처 증명 및 Cosign 서명을 포함합니다. 이전 플랫폼에서는 Docker 이미지를 사용하거나 소스에서 빌드하세요.

소스에서 빌드하려면 코드를 가져와 릴리스 바이너리를 빌드하세요.

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

다음으로 노드를 시작합니다.

```
target/release/zebrad start
```

설치 가이드: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## 선택적 구성 및 기능

### 구성 파일 초기화

  - 다음 명령으로 구성 파일을 생성합니다.

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - 생성된 *zebrad.toml*은 Linux의 기본 환경설정 디렉터리에 배치됩니다. 다른 OS의 기본 위치는 문서를 참조하세요.

### 진행률 표시줄 구성

  - *zebrad.toml*에서 *tracing.progress_bar*를 구성하면 진행률 표시줄을 사용해 터미널에 주요 지표를 표시할 수 있습니다. 참고: 진행률 표시줄 추정치가 지나치게 커질 수 있는 알려진 문제가 있습니다.

### 채굴 구성

  - Zebra는 Docker에서 *MINER_ADDRESS* 및 포트 매핑을 지정하여 채굴용으로 구성할 수 있습니다. 자세한 내용은 [채굴 지원 문서](https://zebra.zfnd.org/user/mining-docker.html)에서 확인할 수 있습니다.

### 사용자 지정 빌드 기능

  - Prometheus 지표, Sentry 모니터링, 실험적 Elasticsearch 지원 등의 추가 Cargo 기능으로 Zebra의 기능을 확장할 수 있습니다.

  - 설치 중 `--features` 플래그의 매개변수로 여러 기능을 나열하여 조합할 수 있습니다.

  - 성능 최적화를 위해 일부 디버깅 및 모니터링 기능은 릴리스 빌드에서 비활성화됩니다. 실험적 기능 및 개발자 기능의 전체 목록은 [API 문서](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)를 참조하세요.

## 시스템 요구 사항 및 네트워크 구성

### 권장 사양

- CPU: CPU 코어 4개
- RAM: 16GB
- 디스크 공간: 바이너리 컴파일 및 캐시된 체인 상태 저장을 위한 300GB의 사용 가능한 디스크 공간
- 네트워크: 월별 최소 300GB 업로드 및 다운로드가 가능한 100Mbps 네트워크 연결

### 최소 사양

- CPU: CPU 코어 2개
- RAM: 4GB
- 디스크 공간: 300GB의 사용 가능한 디스크 공간

Zebra의 테스트 스위트는 시스템 사양에 따라 완료까지 한 시간 이상 걸릴 수 있습니다. 느린 시스템에서도 Zebra를 컴파일하고 실행할 수 있습니다. 정확한 성능 한계는 테스트를 통해 확립되지 않았습니다.

### 디스크 요구 사항

- Zebra는 캐시된 Mainnet 데이터에 약 300GB, 캐시된 Testnet 데이터에 10GB를 사용합니다. 디스크 사용량은 시간이 지남에 따라 증가할 것으로 예상하세요.
- 데이터베이스는 주기적으로, 그리고 종료 또는 재시작 시에도 정리됩니다. 변경 사항은 데이터베이스 트랜잭션을 사용해 커밋됩니다. 강제 종료 또는 패닉으로 인한 불완전한 변경 사항은 다음에 Zebra가 시작될 때 롤백됩니다.

### 네트워크 요구 사항 및 포트

- Zebra는 인바운드 및 아웃바운드 연결에 다음 TCP 포트를 사용합니다.
  - Mainnet: 8233
  - Testnet: 18233
- 특정 listen_addr로 Zebra를 구성하면 인바운드 연결을 위해 이 주소가 공지됩니다. 동기화에는 아웃바운드 연결이 필요하며, 인바운드 연결은 선택 사항입니다.
- OS DNS 리졸버(일반적으로 포트 53)를 통해 Zcash DNS 시더에 접근할 수 있어야 합니다.
- Zebra는 모든 포트에서 아웃바운드 연결을 만들 수 있습니다. zcashd는 다른 네트워크에 대한 DDoS 공격에 악용되는 것을 피하기 위해 기본 포트의 피어를 선호합니다.

### 일반적인 Mainnet 네트워크 사용량

- 초기 동기화: 초기 동기화에는 300GB 다운로드가 필요하며, 이 수치는 증가할 것으로 예상됩니다.
- 지속적인 업데이트: 사용자 트랜잭션 크기와 피어 요청에 따라 매일 10MB에서 10GB 범위의 업로드 및 다운로드가 발생합니다.
- Zebra는 내부 데이터베이스 버전이 변경될 때마다 초기 동기화를 시작하므로, 버전 업그레이드 중 전체 체인 다운로드가 발생할 수 있습니다.
- 왕복 지연 시간이 2초 이하인 피어가 선호됩니다. 지연 시간이 이 기준을 초과하면 Zebra 저장소에 티켓을 등록하세요.

## 흔한 실수

- 현재 시점만 기준으로 디스크 용량을 잡는 것. 캐시된 Mainnet 상태는 이미 300GB에 근접했으며 계속 증가합니다.
- `zebrad`에서 지갑 RPC를 기대하는 것. 키와 잔액은 별도 프로그램인 [Zallet](https://github.com/zcash/zallet)에 있습니다.
- `zebrad`만 실행하고 라이트 지갑이 연결되기를 기대하는 것. 이 경로에는 lightwalletd 또는 [Zaino](/zcash-tech/zaino) 중 하나의 인덱서가 필요합니다.
- 예기치 않은 재동기화를 오류로 여기는 것. 데이터베이스 버전 변경은 설계상 재동기화를 한 번 유발합니다.

## 관련 페이지

- [풀 노드](/zcash-tech/full-nodes) - 풀 노드의 역할과 존재하는 구현체
- [Zakura 노드](/zcash-tech/zakura-node) - Zebra에서 포크되어 더 빠른 동기화와 프루닝을 제공하는 노드
- [Zaino](/zcash-tech/zaino) - 라이트 지갑을 지원하는 Rust 인덱서
- [라이트월렛 노드](/zcash-tech/lightwallet-nodes) - 라이트 지갑이 질의하는 서버
- [Zcash 채굴 가이드](/using-zcash/zcash-mining-guide) - 자신의 노드에서 채굴하기

## 추가 학습

- [Zebra 책](https://zebra.zfnd.org)
- [Zebra의 GitHub](https://github.com/ZcashFoundation/zebra/)
- [시스템 요구 사항](https://zebra.zfnd.org/user/requirements.html)
