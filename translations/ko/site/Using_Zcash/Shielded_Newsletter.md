<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 거래정보 보호 뉴스레터

> 마크다운 노트(note)를 Zcash 메모(memo)로 거래정보 보호 주소(address) 목록에 전송합니다. Zallet를 사용합니다. 수신자 목록과 노트는 투명 주소에 노출되지 않습니다.

거래정보 보호 뉴스레터는 거래정보 보호 방식의 거래(shielded transaction) 시리즈입니다. 각 출력은 수신자의 통합 주소(Unified Address)로 아주 적은 금액을 보내고, 노트의 다음 부분을 메모 필드에 담습니다. Zallet가 이러한 거래를 구성하고 전송합니다. Zebra와 Zaino는 체인 데이터만 제공합니다.

스크립트는 [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter)에 있습니다. 초기 Zallet용으로 작성되었으며, 현재 릴리스에서 그대로 실행해도 안전하지 않습니다. 이 페이지에서는 업데이트된 절차를 설명합니다. 2026년 10월 7일 기준으로 Zallet `v0.1.0-beta.3` 및 Zallet 책을 참고해 확인했습니다.

## 필요한 항목

- Zebra를 완전히 동기화하고 RPC를 로컬호스트에 바인딩합니다.
- Zaino를 해당 Zebra 노드와 동기화합니다.
- RPC가 로컬호스트에 바인딩된 Zallet `v0.1.0-beta.3` 이상의 지갑 빌드. 책에는 `z_sendmany`가 구현된 것으로 나와 있습니다. 숫자로 된 수수료는 거부됩니다. `fee`을 전달하는 경우 `null`여야 합니다. Zallet는 항상 ZIP 317 수수료를 사용하기 때문입니다.
- 거래정보 보호 자금을 사용할 수 있는 통합 주소를 보유한 자금이 충전된 계정.
- 수신자의 통합 주소. 투명 주소에 메모를 지정하면 오류가 발생합니다.

자금이 충전된 주소나 쿠키를 위키 또는 커밋할 스크립트에 넣지 마세요. 현재 `txBuilderFromFile.sh`에는 통합 주소가 하드코딩되어 있습니다. 로컬에서 주소를 바꾸고 커밋하지 마세요.

## Zallet 구성

실행 중인 Zallet로 설정 파일을 생성한 다음, Zebra 및 Zaino을 가리키도록 설정합니다. 이전 튜토리얼의 예제에서는 `as_of_version = "0.0.0"`와 개인 홈 경로를 사용합니다. 해당 파일은 템플릿이 아니라 특정 시점의 스냅샷으로 취급하세요.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help`에는 `z_sendmany`, `z_getoperationstatus`, `z_getoperationresult`가 있어야 합니다. RPC는 `127.0.0.1`에만 바인딩하세요.

## 수신자 목록

한 줄에 통합 주소 하나씩 입력하고, 따옴표와 빈 줄은 넣지 마세요. 스크립트는 `daoAddresses.md`을 읽습니다. 이전 리드미에는 `daoAddress.md`라고 나와 있습니다. 해당 파일은 저장소에 없으며, 파일 이름도 서로 일치하지 않습니다.

```text
u1...
u1...
```

## 메모 하나 보내기

`z_sendmany`는 비동기식입니다. 작업 ID를 반환합니다. 상태가 `success`이 되거나 오류가 발생할 때까지 `z_getoperationstatus`을 폴링하세요. 스크립트처럼 5초 동안 고정으로 대기하면 빌드에 더 오래 걸리는 경우 결과를 놓칩니다. `z_getoperationresult`는 작업을 소비하므로 상태가 종료 상태가 될 때까지 호출하지 마세요.

수수료는 생략합니다. Zallet가 ZIP 317을 계산합니다. 숫자를 전달하지 마세요.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

메모 필드는 원시 16진수이며, 최대 512바이트입니다. `ascii2hex`은 ASCII만 인코딩합니다. ASCII가 아닌 문자가 하나라도 포함된 노트는 실패합니다. UTF-8은 `xxd` 또는 `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'`로 처리하세요.

프라이버시 정책의 기본값은 `FullPrivacy`입니다. 거래정보 보호 수신자에게는 이 기본값이 적절합니다. `AllowFullyTransparent`을 전달하지 마세요.

## 스크립트 결함

2026년 10월 8일 기준으로 저장소에 다음 결함이 있습니다. 수정될 때까지 `shieldNewsletter.sh`을 실행하지 마세요.

- `[[ bytesInFile -lt 512 ]]`에 `$`가 빠져 있습니다. 단일 메모 분기가 실행되지 않습니다.
- 청크 루프는 16진수로 저장한 다음 `hex2ascii`가 이를 디코딩하고, 이어서 `txBuilderFromFile.sh`가 다시 인코딩합니다. 마지막 청크는 이후 줄이 512바이트를 초과하지 않으면 플러시되지 않습니다. 긴 줄은 분할되지 않습니다. 줄 전체가 전송되므로 메모가 512바이트를 초과할 수 있습니다.
- `txBuilderFromFile.sh`는 설정 경로를 지정하지 않고 `./zallet rpc`을 호출하며, 현재 디렉터리에 바이너리가 있다고 가정합니다. `zallet -c <config> rpc`을 사용하세요.
- `toCurl.sh`는 쿠키를 사용해 8232 포트에서 Zebra에 연결하고, `getinfo`과 `sendmany`를 호출합니다. Zallet은 `sendmany`를 제공하지 않습니다. 채굴 대기 루프도 `$` 없이 `[[ chainHeight -gt temp ]]`를 사용하므로 대기하지 않습니다.
- `z_gettotalbalance 0 true`은 추가 위치 인수로 전달됩니다. 해당 호출을 사용하기 전에 실행할 바이너리에서 `rpc help z_gettotalbalance`을 확인하세요.
- 각 청크는 모든 수신자에게 `0.0001` ZEC을 전송합니다. 여기에 ZIP 317 수수료가 추가됩니다. 주소가 많을 때 긴 노트를 보내면 먼지 수준의 금액보다 더 많은 비용이 듭니다.

## 수정 후

수정된 실행기는 다음을 수행해야 합니다.

1. 노트를 바이트로 읽고 줄이 아니라 512바이트 경계에서 분할합니다.
2. 각 청크를 한 번만 16진수로 인코딩합니다.
3. 자금이 충전된 UA와 수신자 배열을 사용해 `zallet -c <config> rpc z_sendmany`를 호출하고, 수수료 인수는 전달하지 않습니다.
4. 해당 작업 ID에 대해 `z_getoperationstatus`를 폴링합니다.
5. `success` 후에만 txid를 기록합니다.

이전 튜토리얼 페이지는 [Shielded Newsletter scripts](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md)에 남아 있습니다. 절차에는 이 페이지를 사용하세요.
