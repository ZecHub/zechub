# Raspberry Pi 4에서 풀 노드 실행하기 (Zebra + Zallet)

*원래의 zcashd 기반 가이드에서 이전되었습니다. zcashd는 2026년 7월 18일에 자동 End-of-Support 중단에 도달했으므로, 이 가이드는 이제 **Zebra**(Zcash Foundation이 유지 관리하는 현재 풀 노드)와 **Zallet**(zcashd의 내장 지갑을 대체하기 위해 만들어진 지갑)을 사용합니다.*

## 배울 내용
- 헤드리스 사용을 위해 Raspberry Pi 4에 Ubuntu Server 22.04+ (64-bit)를 플래시하고 구성하는 방법
- Docker 또는 사전 빌드된 바이너리를 통해 Zebra를 설치하고 실행하는 방법
- 지갑 암호화 설정을 포함해 Zallet을 설치, 구성, 초기화하는 방법
- 기존 zcashd config/wallet을 선택적으로 Zallet으로 마이그레이션하는 방법

## 이전 가이드에서 달라진 점
이 가이드의 이전 버전은 Pi 4에서 **zcashd**를 네이티브로 컴파일하는 과정을 다뤘습니다. Pi 4에는 병렬(`-j$(nproc)`) 빌드를 할 만큼 메모리가 충분하지 않기 때문에, 단일 스레드 컴파일에 3~4시간이 걸렸습니다. 이제 Zebra와 Zallet은 모두 **공식 사전 빌드 ARM64 바이너리와 Docker 이미지**를 제공하므로, 대부분의 경우 Pi 자체에서 소스로부터 무언가를 컴파일할 필요가 აღარ 없습니다.

## 사전 준비물
- Raspberry Pi 4 (RAM 4 GB 이상 권장)
- OS용 microSD 카드 (32 GB+)
- USB 3.0를 지원하는 외장 SSD/HDD — **Zebra는 캐시된 Mainnet 데이터에 대략 300 GB가 필요**하며 시간이 지날수록 더 증가하므로, microSD 카드만으로 실행하려고 하지 마세요
- microSD 카드 슬롯이 있는 컴퓨터 (OS 이미지를 플래시하기 위해)
- 유선 Ethernet 연결 또는 Wi-Fi
- SSH를 통한 커맨드라인 사용에 대한 기본적인 익숙함

## 1단계: Ubuntu Server 22.04+ (64-bit) 플래시
Zebra와 Zallet의 사전 빌드 바이너리 및 Docker 이미지는 **glibc 2.34+**를 요구하며, 이는 **Ubuntu Server 22.04 이상 (64-bit/aarch64)**을 의미합니다.

1. 메인 컴퓨터에 Raspberry Pi Imager를 설치합니다.
2. microSD 카드를 삽입합니다.
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**(또는 그 이상)를 선택합니다.
4. Imager의 고급 옵션(톱니바퀴 아이콘)을 사용해 헤드리스 첫 부팅을 위해 호스트명, SSH 활성화, 필요시 Wi-Fi 자격 증명을 미리 구성합니다.
5. 이미지를 기록한 뒤 카드를 삽입하고 Pi의 전원을 켭니다.
6. SSH로 접속합니다: `ssh <username>@<pi-hostname-or-ip>`

## 2단계: 외부 저장소 연결 및 마운트
1. 외장 SSD/HDD를 USB 3.0으로 연결합니다.
2. 장치를 식별합니다: `lsblk`
3. (새 장치라면) 포맷하고 `/mnt/zcash-data` 같은 위치에 마운트하며, 재부팅 시 자동 마운트되도록 표준 `mkfs`/`fstab` 설정을 사용합니다.

## 3단계: 시스템 업데이트
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## 4단계: Zebra 설치 및 실행
### 옵션 A — Docker (권장)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
진행 상황 확인: `docker logs -f zebra`

### 옵션 B — cargo binstall을 통한 사전 빌드 바이너리
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
이 방법은 사전 빌드된 `aarch64` 바이너리를 설치하므로 컴파일이 필요 없습니다.

**동기화 시간에 대해:** 어느 정도 시간이 걸릴 것으로 예상하세요 — 흔히 인용되는 초기 동기화 수치(대략 2시간)는 Pi 4의 CPU보다 더 강력한 기준 하드웨어에서 나온 것이므로, 실제 Pi 4 하드웨어에서의 동기화 시간은 이보다 더 오래 걸릴 가능성이 높습니다.

## 5단계: Zallet 설치
Zallet은 현재 **alpha** 상태입니다 — 호환성이 깨지는 변경이 있을 수 있으며, 아직 상당한 자금을 위한 프로덕션 수준의 보관 수단으로 취급하지 마세요.

### 옵션 A — Docker (권장)
```bash
docker pull zodlinc/zallet:latest
```
이 이미지는 ARM64를 지원하며(Nix 기반 빌드를 통해), 셸이 없는 최소 파일시스템에서 실행됩니다 — 구성 및 데이터 경로는 `--datadir`와 볼륨 마운트를 통해 명시적으로 전달해야 합니다(6단계 참고).

### 옵션 B — 소스에서 빌드
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet의 crate들은 아직 alpha 단계 동안 crates.io에 게시되지 않았으므로, git 저장소에서 직접 설치하는 것이 지원되는 비-Docker 방식입니다.

## 6단계: Zallet 구성
선택한 datadir(예: `/mnt/zcash-data/zallet`)에 `zallet.toml`을 생성합니다:
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Zebra가 다른 호스트/포트에서 실행 중이라면 `validator_address`를 조정하고, `[indexer]` 아래의 `validator_cookie_auth`/`validator_user`/`validator_password`를 Zebra의 RPC 인증 설정에 맞게 구성하세요.

**zcashd에서 마이그레이션 중인가요?** 예전 `zcash.conf`가 아직 있다면:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## 7단계: 지갑 암호화 설정
Zallet은 모든 키 자료를 `age`/`rage`로 암호화합니다:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
이 명령은 공개 키와 자동 생성된 패스프레이즈를 출력합니다 — **패스프레이즈를 저장해 두세요. 이것 없이는 identity 파일을 복구할 수 없습니다.**

## 8단계: 지갑 초기화 및 시작
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
여러 개의 독립적인 지출 루트를 의도적으로 만들고 싶은 경우가 아니라면 **`generate-mnemonic`은 한 번만 실행하세요**.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## 9단계: 기존 zcashd 지갑 마이그레이션 (선택 사항)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
이 작업에는 `db_dump` 유틸리티가 필요합니다(Berkeley DB 6.2.23에 맞춰 빌드된 것) — 시스템 설치본 또는 로컬 소스 빌드된 zcashd에서 가져올 수 있습니다. 더 이상 zcashd를 설치해 두지 않았다면, 이것은 아직 Zallet 안에서 완전히 자체적으로 해결되지 않은 유일한 마이그레이션 단계입니다.

## 10단계: 모든 것이 작동하는지 확인
```bash
zallet -d /mnt/zcash-data/zallet help
```
지갑이 응답하는지 확인하고, Zebra의 동기화가 완료되면 잔액/주소가 예상과 일치하는지도 확인하세요.

## 문제 해결
- **ARM에서의 Zebra 빌드/런타임 문제:** 소스에서 빌드하는 경우 Rust ARM toolchain을 설치하세요 — Zebra 자체 문서에 따르면, ARM 하드웨어에서 x86_64 빌드 도구를 실행하면 눈에 띄게 더 느리게 동작합니다.
- **저장소가 가득 참:** Zebra의 약 300 GB 용량은 계속 증가합니다 — 여유 공간을 충분히 계획하세요.
- **Docker 권한 오류:** 사용자를 `docker` 그룹에 추가한 뒤 로그아웃/로그인하거나, 그동안은 `sudo`를 사용하세요.
- **Zallet 컨테이너에는 셸이 없음:** 공식 `zodlinc/zallet` 이미지는 설계상 from-scratch입니다 — 항상 `--datadir`를 명시적으로 전달하고 데이터 디렉터리를 볼륨으로 마운트하세요.

## 이전 zcashd 가이드와 비교한 하드웨어 참고 사항
Zebra와 Zallet은 일반적으로 설정 중 CPU 부담이 zcashd를 컴파일하던 때보다 더 가볍습니다. 사전 빌드 바이너리/컨테이너를 실행하기 때문입니다. 4 GB RAM은 합리적인 시작점이며, `htop`으로 모니터링하고 스와핑이 심하다면 8 GB Pi 4 모델도 고려하세요.

## 추가 리소스
- [Zebra Book](https://zebra.zfnd.org) — 공식 Zebra 문서
- [Zallet Book](https://zcash.github.io/wallet) — 공식 Zallet 문서
- [zcashd End-of-Support 공지](https://z.cash/support/zcashd-deprecation)

---

*이 가이드가 유용했다면 ZecHub 후원을 고려해 주세요: [현재 ZecHub donation shielded address를 zechub.wiki/donation에서 삽입 — 여기서는 아직 최신인지 확인할 수 없어 포함하지 않았습니다].*
