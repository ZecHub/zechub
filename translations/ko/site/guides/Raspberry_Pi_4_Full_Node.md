# Raspberry Pi 4에서 풀 노드 실행하기 (Zebra + Zallet)

*기존 zcashd 기반 가이드를 개정했습니다. zcashd은 2026년 7월 18일 자동 지원 종료로 작동이 중단되었으므로, 이제 이 가이드에서는 **Zebra**(현재 풀 노드이며 Zcash Foundation에서 유지 관리)와 **Zallet**(zcashd에 내장된 지갑을 대체하도록 제작된 지갑)을 사용합니다.*

## 배우게 될 내용
- 헤드리스 환경에서 Raspberry Pi 4에 Ubuntu Server 22.04 이상(64비트)을 플래시하고 구성하는 방법
- Docker 또는 사전 빌드된 바이너리를 사용해 Zebra을 설치하고 실행하는 방법
- 지갑 암호화 설정을 포함해 Zallet을 설치하고 구성 및 초기화하는 방법
- 기존 zcashd 설정/지갑을 Zallet로 선택적으로 마이그레이션하는 방법

## 이전 가이드에서 달라진 점
이 가이드의 이전 버전에서는 Pi 4에서 **zcashd**을 직접 컴파일하는 방법을 다뤘습니다. Pi 4에는 병렬(`-j$(nproc)`) 빌드에 필요한 메모리가 부족해 단일 스레드 컴파일에 3~4시간이 걸렸습니다. 이제 Zebra와 Zallet 모두 **공식 사전 빌드 ARM64 바이너리와 Docker 이미지**를 제공하므로, 대부분의 경우 Pi에서 직접 소스 코드를 컴파일할 필요가 없습니다.

## 준비물
- Raspberry Pi 4(권장 RAM 4 GB 이상)
- OS용 microSD 카드(32 GB 이상)
- USB 3.0을 지원하는 외장 SSD/HDD — **Zebra에는 캐시된 Mainnet 데이터에 약 300 GB가 필요**하며 시간이 지나면서 용량이 늘어나므로 microSD 카드만으로 실행하지 마세요
- OS 이미지를 플래시할 수 있는 microSD 카드 슬롯이 있는 컴퓨터
- 유선 Ethernet 연결 또는 Wi-Fi
- SSH를 통해 명령줄을 기본적으로 다룰 수 있는 능력

## 1단계: Ubuntu Server 22.04 이상(64비트) 플래시하기
Zebra 및 Zallet의 사전 빌드 바이너리와 Docker 이미지는 **glibc 2.34 이상**이 필요합니다. 따라서 **Ubuntu Server 22.04 이상(64비트/aarch64)**을 사용해야 합니다.

1. 주 컴퓨터에 Raspberry Pi Imager를 설치합니다.
2. microSD 카드를 삽입합니다.
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**(또는 그 이상 버전)을 선택합니다.
4. Imager의 고급 옵션(톱니바퀴 아이콘)을 사용해 호스트 이름을 미리 설정하고, SSH를 활성화하며, 필요한 경우 헤드리스 최초 부팅을 위해 Wi-Fi 자격 증명을 설정합니다.
5. 이미지를 기록하고 카드를 삽입한 뒤 Pi의 전원을 켭니다.
6. SSH로 접속합니다: `ssh <username>@<pi-hostname-or-ip>`

## 2단계: 외장 저장 장치 연결 및 마운트
1. USB 3.0을 통해 외장 SSD/HDD를 연결합니다.
2. 장치를 확인합니다: `lsblk`
3. 새 장치라면 포맷한 다음, 예를 들어 `/mnt/zcash-data`에 마운트합니다. 표준 `mkfs`/`fstab` 설정을 사용하면 재부팅 후 자동으로 마운트됩니다.

## 3단계: 시스템 업데이트
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## 4단계: Zebra 설치 및 실행
### 옵션 A — Docker(권장)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
진행 상황을 확인합니다: `docker logs -f zebra`

### 옵션 B — cargo binstall을 통한 사전 빌드 바이너리
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
이렇게 하면 사전 빌드된 `aarch64` 바이너리가 설치되므로 컴파일할 필요가 없습니다.

**동기화 시간:** 시간이 꽤 걸릴 수 있습니다. 흔히 인용되는 최초 동기화 시간(약 2시간)은 Pi 4의 CPU보다 성능이 높은 기준 하드웨어에서 측정한 것이므로, 실제 Pi 4 하드웨어에서는 동기화 시간이 더 오래 걸릴 가능성이 큽니다.

## 5단계: Zallet 설치
현재 Zallet은 **알파 단계**입니다. 호환성을 깨는 변경이 있을 수 있으므로, 아직 상당한 금액을 맡기는 데 사용할 프로덕션 준비가 완료된 커스터디 솔루션으로 취급하지 마세요.

### 옵션 A — Docker(권장)
```bash
docker pull zodlinc/zallet:latest
```
이 이미지는 ARM64를 지원하며(Nix 기반 빌드를 사용), 최소한의 셸 없는 파일 시스템에서 실행됩니다. 설정 및 데이터 경로는 `--datadir`과 볼륨 마운트를 통해 명시적으로 전달하세요(6단계 참조).

### 옵션 B — 소스에서 빌드
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
알파 단계에서는 아직 Zallet의 크레이트가 crates.io에 게시되지 않았으므로, git 저장소에서 직접 설치하는 방법이 지원되는 비Docker 방식입니다.

## 6단계: Zallet 구성
선택한 데이터 디렉터리(예: `/mnt/zcash-data/zallet`)에 `zallet.toml`을 만듭니다:
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
Zebra이 다른 호스트/포트에서 실행되는 경우 `validator_address`을 조정하고, Zebra RPC 인증 설정에 맞도록 `[indexer]` 아래에서 `validator_cookie_auth`/`validator_user`/`validator_password`을 구성합니다.

**zcashd에서 마이그레이션하시나요?** 기존 `zcash.conf`이 아직 있다면:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## 7단계: 지갑 암호화 설정
Zallet은 `age`/`rage`을 사용해 모든 키 자료를 암호화합니다:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
공개 키와 자동 생성된 암호 문구가 출력됩니다. **암호 문구를 저장하세요. 암호 문구가 없으면 ID 파일을 복구할 수 없습니다.**

## 8단계: 지갑 초기화 및 시작
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
여러 독립적인 지출 루트를 의도적으로 만들려는 경우가 아니라면 `generate-mnemonic`은 **한 번만** 실행하세요.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## 9단계: 기존 zcashd 지갑 마이그레이션(선택 사항)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
이 작업에는 Berkeley DB 6.2.23에 맞춰 빌드된 `db_dump` 유틸리티가 필요합니다. 시스템에 설치하거나 zcashd을 로컬에서 소스 빌드해 사용할 수 있습니다. zcashd이 더 이상 설치되어 있지 않다면, 이 단계는 아직 Zallet에서 완전히 독립적으로 수행할 수 없는 유일한 마이그레이션 단계입니다.

## 10단계: 모든 기능이 작동하는지 확인
```bash
zallet -d /mnt/zcash-data/zallet help
```
지갑이 응답하는지 확인하고, Zebra의 동기화가 완료되면 잔액/주소가 예상한 내용과 일치하는지 확인합니다.

## 문제 해결
- **ARM에서 Zebra 빌드/실행 문제:** 소스에서 빌드하는 경우 Rust ARM 도구 모음을 설치하세요. Zebra 자체 문서에 따르면 ARM 하드웨어에서 x86_64 빌드 도구를 실행하면 눈에 띄게 느려집니다.
- **저장 공간 부족:** Zebra의 용량은 약 300 GB이며 계속 늘어나므로 여유 공간을 확보해 두세요.
- **Docker 권한 오류:** 사용자를 `docker` 그룹에 추가한 뒤 로그아웃했다가 다시 로그인하거나, 그동안 `sudo`을 사용하세요.
- **Zallet 컨테이너에 셸이 없음:** 공식 `zodlinc/zallet` 이미지는 의도적으로 최소 구성으로 제작되었습니다. 항상 `--datadir`을 명시적으로 전달하고 데이터 디렉터리를 볼륨으로 마운트하세요.

## 이전 zcashd 가이드와 비교한 하드웨어 참고 사항
Zebra 및 Zallet은 사전 빌드된 바이너리/컨테이너를 실행하므로 zcashd을 컴파일할 때보다 설정 중 CPU 사용량이 대체로 적습니다. RAM 4 GB면 시작하기에 적당합니다. `htop`로 상태를 확인하고 스와핑이 심하게 발생한다면 8 GB Pi 4 모델을 고려하세요.

## 추가 자료
- [Zebra Book](https://zebra.zfnd.org) — 공식 Zebra 문서
- [Zallet Book](https://zcash.github.io/zallet/) — 공식 Zallet 문서
- [zcashd End-of-Support 공지](https://z.cash/support/zcashd-deprecation)

---

*이 가이드가 도움이 되었다면 ZecHub 후원을 고려해 주세요: [zecHub.wiki/donation에서 현재 ZecHub 기부용 거래정보 보호 주소를 삽입하세요. 아직 유효한 주소인지 확인할 수 없어 여기에는 포함하지 않았습니다.*
