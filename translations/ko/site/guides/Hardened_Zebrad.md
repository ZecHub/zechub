# 강화된 Zebra 풀 노드

- 전용 비특권 사용자와 커널 수준의 systemd 샌드박싱을 사용합니다(Docker과 동일한 격리 방식).
- RPC는 localhost에서만 사용할 수 있으며 보안 쿠키 인증을 사용합니다(기본값이자 권장 설정).

---

## 필수 조건

- Ubuntu 기반 배포판
- Rust 도구 체인 설치(`rustup` + `cargo`)
- 디스크 여유 공간 최소 300 GB(`/var` 파티션)

---

## 최초 설정(일반 사용자로 실행)

### 1. 시스템 업데이트 및 빌드 종속성 설치

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust 업데이트 및 최신 zebrad 설치(7.0.0 이상)

NU7이 메인넷 블록 3,543,405에서 활성화되었습니다. [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) 이상만 해당 높이 이후의 체인을 따라가므로, 6.x 이하 버전의 `zebrad`은 이전 규칙에 머물러 있습니다. 이를 빌드하려면 Rust 1.91 이상이 필요하며, `rustup update`에서 설치합니다. Zebra 6.x에서 기존 노드를 업그레이드하는 경우 먼저 `/var/lib/zebrad/state/v28`을 백업하세요. Zebra 7은 처음 시작할 때 데이터베이스를 새 v29 형식으로 변환하며, 이후에는 6.x에서 이를 읽을 수 없습니다.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## 전용 비특권 zebra 사용자 만들기

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```

## 보안 데이터 디렉터리 만들기

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc`에는 RPC 인증 쿠키가 저장됩니다. 아래 서비스는 이 두 디렉터리에만 쓸 수 있으며, 둘 중 하나라도 없으면 systemd가 서비스 시작을 거부합니다.

## 보안 구성 파일 만들기(/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"
# Peer cache. The default, ~/.cache/zebra, isn't writable by this service
cache_dir = "/var/lib/zebrad"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # the default, shown to be explicit
# Without this line the cookie goes to ~/.cache/zebra, which this service can't write to,
# and zebrad stops at startup with "Zebra must be able to write the auth cookie to the disk"
cookie_dir = "/var/lib/zebrad-rpc"
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## 강화된 systemd 서비스 만들기

```
sudo tee /etc/systemd/system/zebrad.service > /dev/null <<EOF
[Unit]
Description=Zebra Zcash Full Node (zebrad)
After=network.target

[Service]
Type=simple
User=zebra
Group=zebra
ExecStart=/usr/local/bin/zebrad --config /etc/zebrad/zebrad.toml start

UMask=0027

# Kernel-level sandboxing (makes native zebrad as isolated as Docker)
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
NoNewPrivileges=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
MemoryDenyWriteExecute=yes
ReadWritePaths=/var/lib/zebrad /var/lib/zebrad-rpc

LimitNOFILE=65535
Restart=on-failure
RestartSec=5s
EOF

sudo systemctl daemon-reload
```

Zebra은 시작할 때마다 새 쿠키를 생성합니다. 쿠키는 `zebra` 사용자만 읽을 수 있으며(모드 600), 서비스가 중지되면 삭제됩니다. 아래와 같이 `sudo`로 읽으세요. 쿠키 모드를 변경하는 `ExecStartPost=` 줄은 추가하지 마세요. 해당 명령은 zebrad이 쿠키를 기록하기 전에 실행될 수 있으며, `ExecStartPost=` 명령이 실패하면 서비스가 중지됩니다.

## 일상적인 사용 - 단일 명령 워크플로

| 작업                    | 명령                                         | 참고 |
|-------------------------|----------------------------------------------|-------|
| **시작**                | `sudo systemctl start zebrad`                                         | 명령 하나 |
| **중지**                | `sudo systemctl stop zebrad`                                        | 명령 하나 |
| **상태**                | `sudo systemctl status zebrad`                                      | 실행 여부 표시 |
| **실시간 로그**          | `journalctl -u zebrad -f -o short-precise`                                         | `screen -r`을 대체 |
| **RPC 쿠키 가져오기**    | `sudo cat /var/lib/zebrad-rpc/.cookie`                                     | 실행 중일 때만 |

**편의 별칭**(`~/.bashrc` 또는 `~/.zshrc`에 추가):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
