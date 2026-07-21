<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Zebra 노드 소개

Zebra: Rust로 구축된 Zcash 노드 인프라 혁신

Zebra는 처음으로 Rust로 완전히 구현된 Zcash 노드이며, 이는 뛰어난 성과입니다. Zcash 피어 투 피어 네트워크에 원활하게 통합되어 있으며, Zebra는 네트워크의 안정성을 강화하는 중요한 도구로 작동합니다. 거래 검증 및 방송, 그리고 Zcash 블록체인 상태를 철저히 유지하는 핵심 기능을 통해 Zebra는 더 분산된 네트워크 인프라에 기여합니다.

## Zcashd 노드 구현 대비 장점

원래의 Zcash 노드, zcashd와 비교하면, zcashd는 Bitcoin의 기본 코드베이스에서 유래하며 Electric Coin Company가 개발한 것으로, 우리의 구현은 독립적인 존재입니다. 보안과 효율성을 중심으로 처음부터 개발된 Zebra는 메모리 안전 언어인 Rust의 힘을 활용합니다.

그들의 서로 다른 기원에도 불구하고, zcashd와 Zebra 모두 동일한 프로토콜을 따르며, 이는 그들 사이에 원활한 의사소통과 호환성을 가능하게 합니다. 이러한 혁신은 Zcash 생태계를 확장하는 동시에 블록체인 노드 개발의 새로운 표준을 설정합니다.

## Zebra 런처 사용법

우리의 Docker 이미지로 Zebra를 실행하거나 수동으로 빌드할 수 있습니다. 시스템 요구 사항 섹션을 참조하십시오.

### Docker 사용:

최신 릴리스를 쉽게 실행하고 최신 버전과 동기화하려면 다음 명령어를 실행하십시오:

```

docker run zfnd/zebra:latest

```

더 상세한 지침 및 자세한 정보는 우리의 [Docker 문서](https://zebra.zfnd.org/user/docker.html)를 참조하십시오.

### Zebra 빌드:

Zebra 빌드에는 Rust, libclang, C++ 컴파일러가 필요합니다.

- 최신 안정 버전의 Rust가 설치되어 있어야 하며, Zebra는 이를 전적으로 테스트합니다.
- 필요한 빌드 의존성은 다음과 같습니다:
  - libclang (또는 libclang-dev 또는 llvm-dev로 알려짐)
  - clang 또는 다른 C++ 컴파일러 (모든 플랫폼에 g++ 또는 macOS의 Xcode)
  - Protocol Buffers 컴파일러인 protoc, *--experimental_allow_proto3_optional* 플래그가 포함된 것으로, 이는 Protocol Buffers v3.12.0에서 도입되었으며 2020년 5월 16일에 출시되었습니다.



### Arch의 의존성:

의존성이 충족되면 다음 명령어로 Zebra를 빌드하고 설치하십시오:

```

cargo install --locked zebrad

```

다음 명령어로 Zebra를 실행하십시오:

```
zebrad start

```


## 선택적 구성 및 기능:


### - 구성 파일 초기화:

  - 다음 명령어를 사용하여 구성 파일을 생성하십시오:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - 생성된 *zebrad.toml*은 Linux의 기본 선호도 디렉토리에 배치됩니다. 다른 OS의 기본 위치는 문서를 참조하십시오.



### - 진행 표시줄 구성:

  - *tracing.progress_bar*를 *zebrad.toml*에서 구성하여 터미널에서 중요한 메트릭을 진행 표시줄로 표시할 수 있습니다. 참고: 알려진 문제로 인해 진행 표시줄 추정치가 매우 크게 될 수 있습니다.



### - 채굴 구성:

  - Docker에서 *MINER_ADDRESS*와 포트 매핑을 지정하여 Zebra를 채굴에 맞게 설정할 수 있습니다. 자세한 내용은 우리의 [채굴 지원 문서](https://zebra.zfnd.org/user/mining-docker.html)를 참조하십시오.


### - 커스텀 빌드 기능:

  - Prometheus 메트릭, Sentry 모니터링, 실험적인 Elasticsearch 지원 등 추가 Cargo 기능으로 Zebra의 기능을 확장할 수 있습니다.

  - 여러 기능은 설치 시 `--features` 플래그의 매개변수로 나열하여 결합할 수 있습니다.


### 참고: 일부 디버깅 및 모니터링 기능은 성능 최적화를 위해 릴리스 빌드에서 비활성화되어 있습니다.

실험적이고 개발자용 기능의 전체 목록은 우리의 [API 문서](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)를 참조하십시오.
 

# Zebra 시스템 요구 사항 및 네트워크 구성

최적의 성능과 신뢰성을 보장하기 위해, Rust로 완전히 구축된 혁신적인 Zcash 노드인 zebrad를 컴파일하고 실행하는 데 다음 시스템 요구 사항을 권장합니다:

### 시스템 요구 사항:
- CPU: 4개의 CPU 코어
- RAM: 16 GB
- 디스크 공간: 이진 파일 컴파일 및 캐시된 체인 상태 저장에 300 GB의 가용 디스크 공간
- 네트워크: 월간 최소 300 GB 업로드 및 다운로드가 가능한 100 Mbps 네트워크 연결


Zebra 테스트 스위트는 기계 사양에 따라 1시간 이상 소요될 수 있음을 주의하십시오. 느린 시스템은 Zebra를 컴파일하고 실행할 수 있지만, 정확한 성능 경계는 테스트를 통해 아직 확립되지 않았습니다.


### 디스크 요구 사항:
- Zebra는 Mainnet 데이터에 약 300 GB, Testnet 데이터에 10 GB의 캐시 공간을 사용합니다. 시간이 지남에 따라 디스크 사용량이 증가할 수 있습니다.
- 데이터베이스는 정기적으로 청소되며, 특히 종료 또는 재시작 시 데이터 무결성을 보장합니다. 강제 종료나 패닉으로 인한 변경사항은 Zebra를 다시 시작하면 롤백됩니다.


### 네트워크 요구 사항 및 포트:
- Zebra는 다음 TCP 포트를 사용하여 입출력 연결을 수행합니다:
  - Mainnet: 8233
  - Testnet: 18233
- 특정 listen_addr로 Zebra를 구성하면 이 주소가 입력 연결에 대한 광고 주소로 설정됩니다. 출력 연결은 동기화에 필수적이지만, 입력 연결은 선택적입니다.
- OS DNS 리졸버(일반적으로 포트 53)를 통해 Zcash DNS 시드러의 액세스가 필요합니다.
- Zebra는 모든 포트에서 출력 연결을 설정할 수 있지만, zcashd는 다른 네트워크에 대한 DDoS 공격을 줄이기 위해 기본 포트에 있는 피어를 선호합니다.


### 일반적인 Mainnet 네트워크 사용량:
- 초기 동기화: 최초 동기화에는 300 GB의 다운로드가 필요하며, 이후 다운로드는 증가할 것으로 예상됩니다.
- 지속적인 업데이트: 사용자 거래 크기와 피어 요청에 따라 하루에 10 MB에서 10 GB 사이의 업로드 및 다운로드를 기대해야 합니다.
- Zebra는 내부 데이터베이스 버전 변경 시마다 초기 동기화를 시작하며, 버전 업그레이드 중에는 전체 체인 다운로드가 필요할 수 있습니다.
- 2초 이하의 라운트립 지연 시간을 가진 피어가 선호됩니다. 지연 시간이 이 임계값을 초과하는 경우 지원 티켓을 제출하여 도움을 요청하십시오.


이러한 권장 사항 및 구성에 따라 Zcash 네트워크 내에서 Zebra의 효율성과 효과성을 극대화할 수 있습니다. 문제가 발생하거나 추가적인 도움이 필요한 경우, 지원팀은 언제든지 지도를 제공해 드릴 준비가 되어 있습니다.


Zebra 노드 설치 가이드 링크는 다음과 같습니다:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
