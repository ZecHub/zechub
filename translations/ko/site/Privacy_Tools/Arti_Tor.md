![Tor 로고](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **아르티: Rust로 작성된 차세대 Tor 클라이언트**
![아르티 로고](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**아르티**(Arti)는 **Tor 프로젝트**가 **Rust** 프로그래밍 언어를 사용하여 개발한 차세대 **Tor** 클라이언트입니다. 아르티는 모듈식, 내장 가능하고, 제품 출시 준비가 되어 있으며, **Tor 익명성 프로토콜**을 보다 안전하고 효율적으로 구현합니다. **아르티 1.4.0 버전**에서는 다음과 같은 주요 업데이트가 도입되었습니다:

- 상호작용을 향상시키기 위한 **새로운 RPC 인터페이스**
- **릴레이 지원**을 위한 준비 작업
- **서비스 측 온리온 서비스 DoS 방어력** 개선

이 릴리스는 Tor 사용자 및 개발자를 위한 보안, 성능, 모듈성 향상을 위해 Tor 프로젝트가 계속 노력하고 있음을 보여줍니다.

---

## **아르티 클라이언트 설치**

다음 단계에 따라 시스템에서 **아르티**(Arti)를 SOCKS 프록시로 설치 및 실행할 수 있습니다.

---

### **단계 1: Rust 개발 환경 설정**

아르티를 소스 코드로 빌드하기 전에는 최신 안정 버전의 **Rust**가 설치되어 있어야 합니다.

#### Rust 설치 방법:

1. 공식 [Rust 웹사이트](https://www.rust-lang.org/)에 방문합니다.
2. 사용 중인 운영체제에 맞는 설치 지침을 따릅니다.
3. 설치를 확인하기 위해 다음 명령어를 실행합니다:
   
   ```sh
   rustc --version
   ```

이 명령은 시스템에 최신 안정 버전의 Rust가 설치되었음을 확인합니다.

#### **Windows 사용자 참고 사항**:
- Windows에서는 [**Rustup**](https://rustup.rs/)을 통해 Rust를 설치할 수 있습니다. 이는 도구체인 설치 프로그램입니다. 또한, 호환되는 빌드 환경이 설정되어 있어야 합니다 (Windows에서는 **Visual Studio Build Tools**가 필요할 수 있습니다).

---

### **단계 2: 아르티 저장소 클론**

아르티 클라이언트의 최신 버전을 얻기 위해서는 [**GitLab**](https://gitlab.torproject.org/tpo/core/arti)에서 저장소를 클론해야 합니다.

#### 단계:
1. 터미널(Windows에서는 명령 프롬프트, PowerShell 또는 Git Bash)을 열어주세요.
2. 다음 명령어를 실행하여 저장소를 클론합니다:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. 새로 생성된 *arti* 디렉터리로 이동합니다:
   
   ```sh
   cd arti
   ```

이 명령은 아르티의 소스 코드를 로컬 컴퓨터에 다운로드합니다.

---

### **단계 3: 아르티 바이너리 빌드**

저장소를 클론한 후에는 **Cargo**, Rust의 패키지 관리자 및 빌드 도구를 사용하여 아르티를 빌드해야 합니다.

#### 아르티 빌드 방법:
1. 터미널에서 다음 명령어를 실행합니다:
   ```sh
   cargo build --release
   ```

이 명령은 아르티 코드를 컴파일하고 제품 환경에 최적화합니다(*--release* 플래그). 생성된 바이너리는 *target/release* 디렉터리에 있습니다.

#### 빌드된 바이너리 위치:
- 빌드 후, 아르티 바이너리는 다음 경로에 위치합니다:  
  ```sh
  target/release/arti
  ```

터미널에서 이 바이너리를 직접 실행할 수 있습니다.

---

### **단계 4: 아르티 SOCKS 프록시 실행**

아르티를 SOCKS 프록시(인터넷 트래픽을 Tor 네트워크로 라우팅)로 사용하려면 프록시를 시작해야 합니다.

#### SOCKS 프록시 시작 방법:
1. 다음 명령어를 실행합니다:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

이 명령은 **SOCKS5 프록시**로 아르티를 **포트 9150**(Tor의 SOCKS 트래픽에 사용되는 기본 포트)에서 실행합니다.

---

### **단계 5: 애플리케이션을 아르티 사용하도록 구성**

아르티가 SOCKS 프록시로 실행되면, 애플리케이션을 Tor 네트워크를 통해 라우팅하는 방식으로 설정해야 합니다.

#### 단계:
1. 애플리케이션 설정(예: 웹 브라우저, 터미널 앱)에서 **프록시 설정**을 찾습니다.
2. **SOCKS5 프록시**를 *localhost:9150*으로 설정합니다.

이렇게 하면 모든 애플리케이션 트래픽이 아르티를 중개자로 사용하여 Tor 네트워크를 통해 라우팅됩니다.

---

## **아르티와 Tor 네트워크의 통합**

아르티가 Tor 네트워크와 어떻게 작동하는지 보여주는 간단한 다이어그램입니다:

```plaintext
[애플리케이션] --(SOCKS5)--> [아르티 SOCKS 프록시] --(Tor 프로토콜)--> [Tor 네트워크]
```

- **애플리케이션**은 **SOCKS5** 프로토콜을 사용하여 **아르티 SOCKS 프록시**에 연결합니다.
- 아르티는 그 후 **Tor 네트워크**와 통신하며, 트래픽이 네트워크를 통해 전달될 때 익명화되도록 보장합니다.

---

## **GitLab 저장소 및 기여**

**아르티**(Arti) 개발에 기여하고 싶다면, 코드를 확인하고 GitLab을 통해 기여할 수 있습니다.

- **저장소 링크**: [아르티 GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)
- **저장소 클론**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **포크 및 기여**:
1. GitLab에서 저장소를 **포크**(GitLab 계정이 필요합니다).
2. 포크한 저장소를 로컬 환경에 연결합니다:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   여기서 *_name_*은 GitLab 사용자 이름으로 대체해야 합니다.

3. **변경사항을 포크로 푸시**합니다:
   ```sh
   git push _name_ main
   ```

4. **GitLab에서 Merge Request(MR) 생성**:
   GitLab 포크의 Merge Request 섹션으로 이동하세요:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request 지침**:
- 검토 중에는 **커밋을 리베이스 및 스퀴즈하지 마세요**.
- 필요한 경우, *fixup!* 또는 *squash!*를 사용하여 자동 스퀴즈합니다.
- 검토 주기 동안은 **새로운 커밋 추가**를 목표로 하세요.

---

### **추가 참고 사항**:

- **사전 빌드된 바이너리**: 현재까지 **아르티**(Arti)는 공식적으로 제공되는 사전 빌드된 바이너리를 제공하지 않습니다. 위에 설명한 대로 소스 코드에서 클라이언트를 빌드해야 합니다.
- **Rust 지식**: 아르티에 기여할 경우, 코드베이스가 여전히 발전 중이며, 새 기능 추가 시 변경 또는 리팩토링이 있을 수 있음을 주의하세요.

---

프로젝트에 기여하고 싶다면, 코드를 확인하고 저장소를 포크하여 Merge Request를 제출해 보세요. 더 많은 정보, 업데이트 및 문제 해결 방법은 [아르티 GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)에서 확인할 수 있습니다.

**아르티**(Arti)와 함께 즐거운 경험을 하시고, 행복한 해킹이 되세요!
