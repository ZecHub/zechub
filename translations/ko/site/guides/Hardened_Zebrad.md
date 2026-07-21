# 강화된 Zebra 전체 노드

- 전용 비특권 사용자 + 커널 수준 systemd 샌드박스를 사용합니다 (Docker와 동일한 격리).  
- RPC는 보안 쿠키 인증을 통해 로컬 호스트만 사용됩니다(기본값 및 권장됨).  


---

## 사전 조건

- Ubuntu 기반 배포판
- 설치된 Rust 도구체 (`rustup` + `cargo`)
- 최소 300 GB의 자유 디스크 공간 (`/var` 파티션)


---

## 일회성 설정 (일반 사용자로 실행)

### 1. 시스템 업데이트 및 빌드 의존성 설치

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust 업데이트 및 최신 zebrad 설치 (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## 전용 비특권 zebra 사용자 생성

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## 보안 데이터 디렉토리 생성

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## 보안 구성 파일 생성 (/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# 로컬 호스트만 RPC 활성화 (인터넷에 노출하지 마세요!)
listen_addr = "127.0.0.1:8232"

# 쿠키 인증 
enable_cookie_auth = true     # ← 명시적으로 언급하려면 주석을 제거하세요
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## 강화된 systemd 서비스 생성

```
sudo tee /etc/systemd/system/zebrad.service > /dev/null <<EOF
[Unit]
Description=Zebra Zcash 전체 노드 (zebrad)
After=network.target

[Service]
Type=simple
User=zebra
Group=zebra
ExecStart=/usr/local/bin/zebrad --config /etc/zebrad/zebrad.toml start

UMask=0027
ExecStartPost=/bin/chmod 750 /var/lib/zebrad-rpc
ExecStartPost=/bin/chmod 640 /var/lib/zebrad-rpc/.cookie

# 커널 수준 샌드박스 (네이티브 zebrad를 Docker만큼 격리)
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

## 일일 사용 - 단일 명령어 작업 흐름

| 작업                  | 명령                                      | 참고 사항 |
|-------------------------|----------------------------------------------|-------|
| **시작**               | `sudo systemctl start zebrad`                | 하나의 명령 |
| **중지**                | `sudo systemctl stop zebrad`                 | 하나의 명령 |
| **상태 확인**           | `sudo systemctl status zebrad`               | 실행 중인지 표시 |
| **라이브 로그**         | `journalctl -u zebrad -f -o short-precise`  | `screen -r` 대체 |
| **RPC 쿠키 가져오기**   | `sudo cat /var/lib/zebrad/.cookie`           | 실행 중일 때만 가능 |

**편의용 별칭**( `~/.bashrc` 또는 `~/.zshrc`에 추가):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
