# Zcash 개발 도구

[zcash-devtool란 무엇인가요?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash 개발 도구는 Zcash를 개발하기 위한 플랫폼입니다. 개발자가 개발자를 위해 만들었으며, 새로운 Zcash 기능을 테스트하고 개발하는 데 사용됩니다. 프로덕션 환경에서 사용할 준비가 된 도구로 간주해서는 안 됩니다. 이 도구가 제공하는 명령줄 API는 언제든지 예고 없이 변경될 수 있습니다. zcash-devtool 내장 지갑에 상당한 자금을 넣지 마세요.

### Zcash 개발 도구 동영상 튜토리얼:
Kris Nuttycombe(@nuttycom)가 ZconVI에서 이 도구를 소개했습니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: Kris Nuttycombe와 함께하는 Zcash 개발 멀티툴 - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

이 도구를 시작하는 방법을 단계별로 안내하는 가이드는 [이 안내서](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)를 참조하세요. 이 안내서에서는 zcash 개발 도구를 설정하고 사용하는 전체 과정을 설명합니다. 도구를 설정하고 직접 기능을 추가하는 방법을 안내하기 위한 것입니다.

## 빠른 시작

아래 명령은 zcash-devtool `main`(커밋 `5a26ee8`, 2026년 8월 기준)에서 확인했습니다. 도구는 예고 없이 변경될 수 있으므로, 아래 내용과 맞지 않는 부분이 있으면 어떤 명령이든 `--help`을 실행하세요.

### 설치

미리 빌드된 바이너리는 없습니다. [Rust](https://rustup.rs)를 설치한 다음 소스에서 빌드하세요.

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

아래 예시에서는 빌드된 바이너리 `target/release/zcash-devtool`를 호출합니다. `cargo run --release -- ...`도 같은 방식으로 작동합니다.

### 테스트넷 지갑 만들기

테스트넷에서 시작하세요. 테스트넷 코인(TAZ)은 가치가 없습니다.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w`는 지갑 디렉터리입니다. `wallet` 뒤, 하위 명령 앞에 입력합니다.
- `-i`은 [age](https://age-encryption.org) ID 파일입니다. 지갑의 니모닉 문구는 이 파일에 암호화되어 저장되며, 파일이 없으면 새로 만들어집니다. 이 파일을 보관하세요. `send`, `shield` 및 기타 자금 지출 명령은 seed를 복호화할 때 이 파일이 필요합니다.
- `-n`는 네트워크입니다. `test` 또는 `main`를 지정할 수 있습니다.
- `-s`는 라이트 지갑 서버를 선택합니다. 기본값인 `zecrocks`은 선택한 네트워크의 zec.rocks 서버에 연결합니다.
- 기존 지갑을 복원하려면 `init` 대신 `restore-mnemonic`을 사용하세요. 구문을 입력하라는 메시지가 표시됩니다.

`balance`은 Ironwood을 포함해 각 풀을 따로 표시합니다.

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

`zcash-devtool wallet -w ./my-wallet list-addresses`을 실행해 지갑의 통합 주소를 확인한 다음, [파우셋](https://zechub.wiki/using-zcash/faucets)에서 테스트넷 자금을 보내세요.

메인넷에서는 `init`에 `-n main`을 전달하세요. 잃어도 감당할 수 있는 금액만 사용하세요.

### 보내기 및 거래정보 보호

금액 단위는 자토시입니다(1 ZEC = 100,000,000 자토시).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose`은 `send`이 만들 거래를 전송하지 않고 보여 줍니다. `list-tx`와 `list-unspent`은 지갑의 내역과 노트를 보여 줍니다.

서버와 통신하는 모든 명령에는 `--connection tor`도 사용할 수 있습니다. 이 옵션을 사용하면 연결이 내장 Tor 클라이언트를 통해 라우팅됩니다.

### 주소, 키 및 거래 살펴보기

`inspect`은 Zcash 데이터를 오프라인으로 디코딩합니다. 여기에는 주소, 키, 원시 거래가 포함됩니다. `--lookup`을 추가하면 체인에서 거래 ID로 거래를 조회하는 등 더 많은 정보를 가져옵니다.

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

Ironwood 노트는 통합 주소에서 동일한 Orchard 수신자에게 전송되므로, NU6.3에서도 주소는 바뀌지 않았습니다.

### PCZT로 단계별 거래 만들기

PCZT(부분적으로 생성된 Zcash 거래)는 거래 생성 과정을 생성, 증명, 서명, 전송 단계로 나눕니다. 예를 들어 Keystone 같은 하드웨어 서명기를 사용해 각 단계를 서로 다른 컴퓨터에서 실행할 수 있습니다. 각 `pczt` 명령은 파일 또는 표준 입력에서 PCZT을 읽고 파일(`--output`)이나 표준 출력에 기록하므로, 단계를 파이프로 연결할 수 있습니다.

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help`에는 `inspect`, `redact`, `combine`, `extract`, `shield`을 포함한 다른 단계가 나열되어 있습니다.

### Orchard에서 Ironwood으로 자금 옮기기

NU6.3부터 Orchard 자금은 지갑 자체 주소로만 옮길 수 있습니다. `migration` 명령을 사용하면 자금을 Ironwood으로 옮길 수 있습니다.

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan`은 노트 분할과 이전 일정을 미리 보여 주며, 아무것도 변경하지 않습니다.
- `commit`은 첫 번째 준비 거래를 만들고 사전 서명합니다. Keystone 같은 외부 서명기를 사용하려면 `--external`을 추가해 서명되지 않은 상태로 두세요.
- `status`은 이전 진행 상황과 다음 단계를 보여 줍니다.
- `advance`은 앵커를 사용할 준비가 된 다음 거래를 증명합니다.

이전 명령은 아직 개발 중입니다. `advance`은 브로드캐스트할 준비가 된 첫 번째 거래에서 멈춥니다. 도구에서 아직 브로드캐스트 기능을 구현하지 않았기 때문입니다. 일상적인 사용을 위해서는 Ironwood을 지원하는 지갑으로 자금을 옮기세요. [거래정보 보호 구역](https://zechub.wiki/using-zcash/shielded-pools)을 참조하세요.


**보안 경고:**
프로덕션 환경에서는 절대 사용하지 마세요!!!
이 앱은 보안을 염두에 두고 작성되지 않았습니다. 하지만 니모닉 seed phrase를 암호화하는 등 소규모 실험을 수행할 수 있도록 돕는 기능이 있으며, 이는 사용자의 책임하에 사용할 수 있습니다.

### 고급(librustzcash 튜토리얼)


[여기에서 동영상을 시청하세요](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
