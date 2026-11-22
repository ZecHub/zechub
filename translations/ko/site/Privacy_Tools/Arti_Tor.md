![Tor logo](/content-images/_unavailable.svg)

# **Arti: Rust의 차세대 Tor 클라이언트**
![Atri Logo](/content-images/_unavailable.svg)

**Arti**는 Tor 프로젝트에서 Rust 프로그래밍 언어를 사용해 차세대 **Tor** 클라이언트를 구축하기 위해 추진하는 프로젝트입니다. Arti는 모듈식으로 설계되어 다른 프로그램에 쉽게 포함할 수 있고 실제 운영 환경에 바로 사용할 수 있으며, **Tor** 익명성 프로토콜을 더욱 안전하고 효율적으로 구현합니다. **Arti 버전 1.4.0**에는 다음과 같은 주요 업데이트가 포함되었습니다.

- 상호작용을 개선하는 **새 RPC 인터페이스**
- **릴레이 지원**을 위한 준비 작업
- **서비스 측 양파 서비스의 서비스 거부 공격 저항성** 개선

이번 릴리스는 Tor 프로젝트가 Tor 사용자와 개발자에게 더 나은 보안, 성능, 모듈성을 제공하기 위해 이어 가는 노력의 일환입니다.


---


## **Arti 클라이언트 설치**

다음 단계에 따라 시스템에 **Arti**를 설치하고 SOCKS 프록시로 실행하세요.

---

### **1단계: Rust 개발 환경 설정**

소스 코드에서 Arti를 빌드하려면 먼저 최신 안정 버전의 **Rust**을 설치해야 합니다.

#### Rust 설치 방법:

1. 공식 [Rust 웹사이트](https://www.rust-lang.org/)를 방문하세요.
2. 사용 중인 운영체제에 맞는 설치 안내를 따르세요.
3. 다음 명령을 실행해 설치를 확인하세요:
   
   ```sh
   rustc --version
   ```

이 명령을 실행하면 시스템에 최신 안정 버전의 Rust이 설치되어 있는지 확인할 수 있습니다.

#### **Windows 사용자 참고 사항**:
- Rust은 도구 모음 설치 프로그램인 Windows의 [**rustup**](https://rustup.rs/)을 통해 설치할 수 있습니다. 호환되는 빌드 환경도 설정해야 합니다. Windows에서는 **Visual Studio Build Tools**가 필요할 수 있습니다.
  
---

### **2단계: Arti 저장소 복제**

최신 Arti 클라이언트를 받으려면 [**GitLab**](https://gitlab.torproject.org/tpo/core/arti)에서 저장소를 복제해야 합니다.

#### 단계:
1. 터미널을 여세요(명령 프롬프트, PowerShell 또는 Windows의 Git Bash).
2. 다음 명령을 실행해 저장소를 복제하세요:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. 새로 만들어진 *arti* 디렉터리로 이동하세요:
   
   ```sh
   cd arti
   ```

그러면 Arti 소스 코드가 로컬 컴퓨터로 다운로드됩니다.

---

### **3단계: Arti 바이너리 빌드**

저장소를 복제한 후에는 **Cargo**를 사용해 Arti를 빌드해야 합니다. Cargo는 Rust의 패키지 관리자이자 빌드 도구입니다.

#### Arti 빌드 방법:
1. 터미널에서 다음 명령을 실행하세요:
   ```sh
   cargo build --release
   ```

이 명령은 Arti 코드를 컴파일하고 실제 운영 환경에 맞게 최적화합니다(*--release* 플래그). 바이너리는 *target/release* 디렉터리에 생성됩니다.

#### 컴파일된 바이너리 위치:
- 빌드가 완료되면 Arti 바이너리는 다음 위치에 생성됩니다:  
  ```sh
  target/release/arti
  ```

이 바이너리는 터미널에서 바로 실행할 수 있습니다.

---

### **4단계: Arti SOCKS 프록시 실행**

Arti를 SOCKS 프록시로 사용해 인터넷 트래픽을 Tor 네트워크를 통해 전달하려면 프록시를 시작해야 합니다.

#### SOCKS 프록시 시작 방법:
1. 다음 명령을 실행하세요:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

이 명령은 **포트 9150**에서 Arti를 **SOCKS5 프록시**로 실행합니다. 이 포트는 Tor에서 SOCKS 트래픽에 사용하는 기본 포트입니다.

---

### **5단계: Arti를 사용하도록 애플리케이션 설정**

Arti가 SOCKS 프록시로 실행되면 애플리케이션에서 Tor 네트워크를 통해 트래픽을 전달하도록 설정해야 합니다.

#### 단계:
1. 애플리케이션 설정(예: 웹 브라우저 또는 터미널 애플리케이션)에서 **프록시 설정**을 찾으세요.
2. **SOCKS5 프록시**를 *localhost:9150*으로 설정하세요.

이렇게 하면 Arti를 중개자로 사용해 애플리케이션의 모든 트래픽을 **Tor 네트워크**를 통해 전달할 수 있습니다.

---

## **Arti와 Tor 네트워크의 통합**

다음은 Arti가 Tor 네트워크와 함께 작동하는 방식을 간략하게 보여 주는 다이어그램입니다:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **애플리케이션**은 **SOCKS5** 프로토콜을 사용해 **Arti SOCKS 프록시**에 연결합니다.
- 그러면 Arti가 **Tor 네트워크**와 통신해 트래픽이 네트워크를 통과하는 동안 익명성을 유지합니다.

---

## **GitLab 저장소 및 기여**

**Arti** 개발에 기여하고 싶다면 **GitLab**에서 코드를 살펴보고 기여할 수 있습니다.

- **저장소 링크**: [Arti GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)
- **저장소 복제**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **포크 및 기여**:
1. GitLab에서 저장소를 **포크**하세요(GitLab 계정이 필요합니다).
2. 포크한 저장소를 로컬 환경에 연결하세요:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   *_name_*을 GitLab 사용자 이름으로 바꾸세요.

3. 포크한 저장소에 **변경 사항을 푸시**하세요:
   ```sh
   git push _name_ main
   ```

4. GitLab에서 **병합 요청(MR)**을 생성하세요:
   GitLab 포크의 병합 요청 섹션으로 이동하세요:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **병합 요청 지침**:
- **검토 중에는 커밋을 리베이스하거나 스쿼시하지 마세요**.
- 필요한 경우 *fixup!* 또는 *squash!*를 사용해 커밋을 자동으로 스쿼시하세요.
- 검토 과정에서는 커밋을 스쿼시하는 대신 **새 커밋을 추가**하세요.

---

### **추가 참고 사항**:

- **사전 빌드 바이너리**: 현재 **Arti**는 공식 사전 빌드 바이너리를 제공하지 않습니다. 위에 설명한 대로 소스 코드에서 클라이언트를 빌드해야 합니다.
- **Rust 지식**: Arti에 기여하는 경우 코드베이스가 계속 발전 중이며, 새 기능이 추가되면서 변경이나 리팩터링이 이루어질 수 있다는 점에 유의하세요.

---



프로젝트에 기여하고 싶다면 코드를 살펴보고 저장소를 포크한 다음 병합 요청을 제출해 보세요. 자세한 정보와 업데이트, 문제 해결 방법은 [Arti GitLab 저장소](https://gitlab.torproject.org/tpo/core/arti)를 참조하세요.

**Arti**를 즐겁게 사용하시고, 즐거운 해킹이 되길 바랍니다!

---
