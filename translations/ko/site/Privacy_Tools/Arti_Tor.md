![Tor logo](/content-images/_unavailable.svg)

# **Arti: Rust로 만들어진 차세대 Tor 클라이언트**
![Atri Logo](/content-images/_unavailable.svg)

**Arti**는 **Rust** 프로그래밍 언어를 사용해 차세대 **Tor** 클라이언트를 구축하려는 Tor Project의 이니셔티브입니다. Arti는 모듈식이며, 내장 가능하고, 프로덕션 환경에 적합하도록 설계되었으며, **Tor** 익명성 프로토콜을 더 안전하고 효율적으로 구현합니다. **Arti 버전 1.4.0**에서는 여러 중요한 업데이트가 도입되었습니다:

- 향상된 상호작용을 위한 **새 RPC 인터페이스**.
- **릴레이 지원**을 위한 사전 작업.
- **서비스 측 onion service 서비스 거부 공격 저항성** 개선.

이번 릴리스는 Tor 사용자와 개발자에게 더 나은 보안, 성능, 모듈성을 제공하려는 Tor Project의 노력을 이어갑니다.


---


## **Arti 클라이언트 설치**

다음 단계를 따라 시스템에 **Arti**를 설치하고 SOCKS 프록시로 실행하세요.

---

### **1단계: Rust 개발 환경 설정**

소스에서 Arti를 빌드하기 전에 최신 안정 버전의 **Rust**가 설치되어 있어야 합니다.

#### Rust 설치 방법:

1. 공식 [Rust 웹사이트](https://www.rust-lang.org/)를 방문하세요.
2. 운영체제에 맞는 설치 지침을 따르세요.
3. 다음 명령을 실행해 설치를 확인하세요:
   
   ```sh
   rustc --version
   ```

이렇게 하면 시스템에 최신 안정 버전의 Rust가 설치되었는지 확인할 수 있습니다.

#### **Windows 사용자 참고**:
- Rust는 툴체인 설치 도구인 [**Rustup**](https://rustup.rs/)을 통해 Windows에 설치할 수 있습니다. 호환되는 빌드 환경도 함께 설정되어 있는지 확인하세요(Windows에서는 **Visual Studio Build Tools**가 필요할 수 있습니다).
  
---

### **2단계: Arti 저장소 복제**

최신 버전의 Arti 클라이언트를 받으려면 [**GitLab**](https://gitlab.torproject.org/tpo/core/arti)에서 저장소를 복제해야 합니다.

#### 단계:
1. 터미널을 여세요(Windows에서는 Command Prompt, PowerShell 또는 Git Bash).
2. 다음 명령을 실행해 저장소를 복제하세요:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. 새로 생성된 *arti* 디렉터리로 이동하세요:
   
   ```sh
   cd arti
   ```

이렇게 하면 Arti의 소스 코드가 로컬 머신으로 내려받아집니다.

---

### **3단계: Arti 바이너리 빌드**

저장소를 복제한 후에는 Rust의 패키지 관리자이자 빌드 도구인 **Cargo**를 사용해 Arti를 빌드해야 합니다.

#### Arti 빌드 방법:
1. 터미널에서 다음 명령을 실행하세요:
   ```sh
   cargo build --release
   ```

이 명령은 Arti 코드를 컴파일하고 프로덕션용으로 최적화합니다(*--release* 플래그). 바이너리는 *target/release* 디렉터리에 생성됩니다.

#### 컴파일된 바이너리 위치:
- 빌드 후 Arti 바이너리는 다음 위치에 생성됩니다:  
  ```sh
  target/release/arti
  ```

이 바이너리는 터미널에서 직접 실행할 수 있습니다.

---

### **4단계: Arti SOCKS 프록시 실행**

Arti를 SOCKS 프록시로 사용하려면(인터넷 트래픽을 Tor 네트워크를 통해 라우팅함) 프록시를 시작해야 합니다.

#### SOCKS 프록시 시작 방법:
1. 다음 명령을 실행하세요:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

이 명령은 Arti를 **포트 9150**에서 동작하는 **SOCKS5 프록시**로 시작합니다. 이 포트는 Tor가 SOCKS 트래픽에 기본으로 사용하는 포트입니다.

---

### **5단계: 애플리케이션이 Arti를 사용하도록 설정**

Arti가 SOCKS 프록시로 실행되면, 애플리케이션이 Tor 네트워크를 통해 트래픽을 라우팅하도록 설정해야 합니다.

#### 단계:
1. 애플리케이션 설정(예: 웹 브라우저, 터미널 애플리케이션)에서 **프록시 설정**을 찾으세요.
2. **SOCKS5 프록시**를 *localhost:9150*으로 설정하세요.

이렇게 하면 애플리케이션의 모든 트래픽이 Arti를 중개자로 사용하여 **Tor 네트워크**를 통해 라우팅됩니다.

---

## **Arti와 Tor 네트워크의 통합**

다음은 Arti가 Tor 네트워크와 함께 어떻게 작동하는지 보여주는 단순화된 다이어그램입니다:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application**은 **SOCKS5** 프로토콜을 사용해 **Arti SOCKS Proxy**에 연결합니다.
- 그러면 Arti가 **Tor 네트워크**와 통신하여, 트래픽이 네트워크를 통과하는 동안 익명성이 보장되도록 합니다.

---

## **GitLab 저장소 및 기여**

**Arti** 개발에 기여하고 싶다면, 코드를 살펴보고 **GitLab**을 통해 기여할 수 있습니다.

- **저장소 링크**: [Arti GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)
- **저장소 복제**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **포크 및 기여 방법**:
1. GitLab에서 저장소를 **포크**하세요(GitLab 계정 필요).
2. 포크한 저장소를 로컬 환경에 연결하세요:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   *_name_*은 GitLab 사용자명으로 바꾸세요.

3. 변경 사항을 포크한 저장소에 **푸시**하세요:
   ```sh
   git push _name_ main
   ```

4. GitLab에서 **Merge Request (MR)**를 생성하세요:
   GitLab 포크의 Merge Request 섹션으로 이동하세요:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request 가이드라인**:
- 검토 중에는 **커밋을 rebase하거나 squash하지 마세요**.
- 필요하다면 자동 스쿼시용으로 *fixup!* 또는 *squash!*를 사용하세요.
- 검토 주기 동안에는 squash하기보다 **새 커밋을 추가하는 것**을 목표로 하세요.

---

### **추가 참고 사항**:

- **사전 빌드된 바이너리**: 현재 **Arti**는 공식 사전 빌드 바이너리를 제공하지 않습니다. 위에 설명한 대로 반드시 소스에서 클라이언트를 빌드해야 합니다.
- **Rust 지식**: Arti에 기여하는 경우, 코드베이스는 아직 계속 발전 중이며 새로운 기능이 추가되면서 변경이나 리팩터링이 발생할 수 있다는 점에 유의하세요.

---



프로젝트에 기여하고 싶다면, 자유롭게 코드를 확인하고, 저장소를 포크하고, Merge Request를 제출해 보세요. 더 많은 정보, 업데이트, 문제 해결 방법은 [Arti GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)에서 확인할 수 있습니다. 

**Arti**와 함께하는 경험을 즐기시고, 즐거운 해킹 되세요!

---
