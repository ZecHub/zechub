# Zcash Devtool

[zcash-devtool란 무엇인가요?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool은 Zcash를 해킹하기 위한 플랫폼입니다. 새로운 Zcash 기능의 테스트 및 개발을 위해 개발자가 개발자를 위해 구축한 도구이며, 프로덕션 환경에서 사용할 준비가 된 것으로 간주해서는 안 됩니다. 이 도구가 제공하는 명령줄 API는 언제든지 경고 없이 변경될 수 있으며 실제로 변경될 것입니다. zcash-devtool 내장 지갑 관리에 상당한 자금을 맡기지 마십시오.

### Zcash Devtool 동영상 튜토리얼:
Kris Nuttycombe(@nuttycom)가 ZconVI에서 이 도구를 소개했습니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

이 도구를 시작하는 방법에 대한 단계별 가이드는 [이 안내서](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)를 참조하세요. 이 문서는 zcash devtool 도구를 설정하고 사용하는 전체 과정을 다룹니다. 설정 방법과 도구에 자체 기능을 추가하는 방법을 안내하기 위한 것입니다.

## 빠른 시작

아래 명령어는 zcash-devtool `main`(커밋 `5a26ee8`, 2026년 8월)를 기준으로 확인되었습니다. 이 도구는 예고 없이 변경되므로, 여기에 있는 내용이 더 이상 일치하지 않을 경우 어떤 명령어에든 `--help`을 실행하세요.

### 설치

사전 빌드된 바이너리는 없습니다. [Rust](https://rustup.rs)을 설치한 다음 소스에서 빌드하세요:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

아래 예제에서는 빌드된 바이너리인 `target/release/zcash-devtool`를 호출합니다. `cargo run --release -- ...`도 동일하게 작동합니다.

### testnet 지갑 생성

testnet에서 시작하세요. Testnet 코인(TAZ)에는 가치가 없습니다.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w`는 지갑 디렉터리입니다. `wallet` 뒤와 하위 명령어 앞에 위치합니다.
- `-i`는 [age](https://age-encryption.org) 신원 파일입니다. 지갑의 니모닉 문구는 이 파일로 암호화되며, 파일이 없으면 생성됩니다. 보관하세요. `send`, `shield` 및 기타 지출 명령어는 시드를 복호화하기 위해 이 파일이 필요합니다.
- `-n`는 네트워크입니다: `test` 또는 `main`.
- `-s`는 라이트 지갑 서버를 선택합니다. 기본값인 `zecrocks`은 선택한 네트워크의 zec.rocks 서버에 연결됩니다.
- 기존 지갑을 복원하려면 `init` 대신 `restore-mnemonic`을 사용하세요. 문구를 입력하라는 메시지가 표시됩니다.

`balance`은 Ironwood을 포함해 각 풀을 별도로 나열합니다:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

`zcash-devtool wallet -w ./my-wallet list-addresses`을 실행하여 지갑의 통합 주소를 확인하고, [faucet](https://zechub.wiki/using-zcash/faucets)에서 testnet 자금을 보내세요.

mainnet의 경우 `init`에 `-n main`을 전달하세요. 잃어도 감당할 수 있는 금액만 사용하세요.

### 전송 및 shield

금액은 zatoshi 단위입니다(1 ZEC = 100,000,000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`은 전송하지 않고 `send`가 생성할 트랜잭션을 보여 줍니다. `list-tx` 및 `list-unspent`은 지갑의 기록과 노트를 보여 줍니다.

서버와 통신하는 모든 명령어는 연결을 내장 Tor 클라이언트를 통해 라우팅하는 `--connection tor`도 허용합니다.

### 주소, 키 및 트랜잭션 검사

`inspect`은 주소, 키, 원시 트랜잭션 등 Zcash 데이터를 오프라인에서 디코딩합니다. 트랜잭션 ID를 통한 조회 등 체인에서 더 많은 정보를 가져오려면 `--lookup`을 추가하세요.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood 노트는 통합 주소의 동일한 Orchard 수신자로 전송되므로, NU6.3에서도 주소는 변경되지 않았습니다.

### PCZT로 단계별 트랜잭션 구축

PCZT(부분 생성된 Zcash 트랜잭션)는 트랜잭션 구축을 생성, 증명, 서명, 전송의 개별 단계로 나눕니다. 각 단계는 Keystone 같은 하드웨어 서명자를 사용하는 경우처럼 서로 다른 장치에서 실행할 수 있습니다. 각 `pczt` 명령어는 파일 또는 stdin에서 PCZT를 읽고 파일(`--output`) 또는 stdout에 기록하므로 단계를 파이프로 연결할 수 있습니다:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`은 `inspect`, `redact`, `combine`, `extract` 및 `shield`을 포함한 다른 단계를 나열합니다.

### Orchard에서 Ironwood로 자금 이동

NU6.3부터 Orchard 자금은 지갑 자체 주소로만 이동할 수 있습니다. `migration` 명령어는 이를 Ironwood로 이동합니다:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan`은 노트 분할과 전송 일정을 미리 보여 주며 아무것도 변경하지 않습니다.
- `commit`는 첫 번째 준비 트랜잭션을 구축하고 사전 서명합니다. `--external`을 추가하면 Keystone 같은 외부 서명자를 위해 서명되지 않은 상태로 남겨 둘 수 있습니다.
- `status`은 마이그레이션 진행 상황과 다음 단계를 보여 줍니다.
- `advance`은 앵커가 준비된 다음 트랜잭션을 증명합니다.

마이그레이션 명령어는 아직 개발 중입니다. `advance`은 도구에서 아직 브로드캐스팅이 구현되지 않았으므로 브로드캐스트할 준비가 된 첫 번째 트랜잭션에서 멈춥니다. 일상적인 사용에서는 Ironwood를 지원하는 지갑으로 자금을 이동하세요. [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools)를 참조하세요.


**보안 경고:**
프로덕션 환경에서 사용하지 마십시오!!!
이 앱은 보안을 염두에 두고 작성되지 않았습니다. 다만 니모닉 시드 문구 암호화 같은 기능이 있어, 위험을 감수한다면 소규모 실험에는 사용할 수 있습니다.

### 고급(librustzcash 튜토리얼 )


[여기에서 동영상 보기](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
