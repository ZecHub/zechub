<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 실드된 뉴스레터

> Zallet를 사용하여 실드된 주소 목록에 Zcash 메모로 마크다운 메모를 전송합니다. 수신자 목록과 메모는 투명 주소에 남지 않습니다.

실드된 뉴스레터는 일련의 실드된 트랜잭션입니다. 각 출력은 수신자 Unified Address에 소액을 지급하고 메모 필드에 메모의 다음 조각을 담습니다. Zallet가 해당 트랜잭션을 생성하고 전송합니다. Zebra 및 Zaino는 체인 데이터만 제공합니다.

스크립트는 [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter)에 있습니다. 초기 Zallet용으로 작성되었으며, 현재 릴리스에서 그대로 실행하는 것은 안전하지 않습니다. 이 페이지는 업데이트된 절차입니다. 2026년 10월 7일 기준 Zallet `v0.1.0-beta.3` 및 Zallet 책을 기준으로 확인했습니다.

## 필요한 항목

- RPC가 localhost에 바인딩된, 완전히 동기화된 Zebra.
- 해당 Zebra 노드와 동기화된 Zaino.
- RPC가 localhost에 바인딩된 지갑 빌드의 Zallet `v0.1.0-beta.3` 이상. 책에는 `z_sendmany`가 구현된 것으로 나와 있습니다. 숫자 수수료는 거부됩니다. `fee`를 전달한다면 `null`여야 합니다. Zallet는 항상 ZIP 317 수수료를 사용하기 때문입니다.
- Unified Address가 실드된 자금을 사용할 수 있는, 자금이 충전된 계정.
- 수신자 Unified Address. 투명 주소에 메모를 넣으면 오류가 발생합니다.

자금이 충전된 주소나 쿠키를 위키 또는 커밋된 스크립트에 넣지 마세요. 현재 `txBuilderFromFile.sh`에는 Unified Address가 하드코딩되어 있습니다. 로컬에서 교체하고 커밋하지 마세요.

## Zallet 구성

실행 중인 Zallet로 설정을 생성한 다음, Zebra 및 Zaino를 가리키도록 지정하세요. 이전 튜토리얼의 예제는 `as_of_version = "0.0.0"`와 개인 홈 경로를 사용합니다. 해당 파일은 템플릿이 아니라 스냅샷으로 취급하세요.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help`에는 `z_sendmany`, `z_getoperationstatus` 및 `z_getoperationresult`가 나열되어야 합니다. RPC는 `127.0.0.1`에만 바인딩하세요.

## 수신자 목록

한 줄에 하나의 Unified Address를 넣고, 따옴표와 빈 줄은 사용하지 마세요. 스크립트는 `daoAddresses.md`를 읽습니다. 이전 readme에는 `daoAddress.md`라고 되어 있습니다. 그 파일은 저장소에 없으며 이름도 일치하지 않습니다.

```text
u1...
u1...
```

## 메모 하나 전송

`z_sendmany`는 비동기식입니다. 작업 ID를 반환합니다. 상태가 `success` 또는 오류가 될 때까지 `z_getoperationstatus`를 폴링하세요. 스크립트가 하는 방식인 고정 5초 대기는 빌드에 더 오래 걸릴 때 결과를 잃게 합니다. `z_getoperationresult`는 작업을 소비하므로 상태가 최종 상태가 되기 전에는 호출하지 마세요.

수수료는 생략합니다. Zallet가 ZIP 317을 계산합니다. 숫자를 전달하지 마세요.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

메모 필드는 최대 512바이트의 원시 hex입니다. `ascii2hex`는 ASCII만 인코딩합니다. ASCII가 아닌 문자가 하나라도 포함된 메모는 실패합니다. UTF-8은 `xxd` 또는 `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'`가 처리합니다.

프라이버시 정책의 기본값은 `FullPrivacy`입니다. 이는 실드된 수신자에 적합한 기본값입니다. `AllowFullyTransparent`를 전달하지 마세요.

## 스크립트 결함

이는 2026년 10월 8일 기준 트리에 존재합니다. 수정되기 전까지 `shieldNewsletter.sh`를 실행하지 마세요.

- `[[ bytesInFile -lt 512 ]]`에 `$`가 없습니다. 단일 메모 분기가 절대 실행되지 않습니다.
- 청크 루프는 hex를 저장한 다음 `hex2ascii`가 이를 디코드하고, `txBuilderFromFile.sh`가 다시 인코드합니다. 이후 줄이 512를 초과하지 않는 한 마지막 청크는 플러시되지 않습니다. 긴 줄은 분할되지 않습니다. 통째로 전송되어 512바이트 메모 한도를 초과할 수 있습니다.
- `txBuilderFromFile.sh`는 설정 경로 없이 `./zallet rpc`를 호출하며, 바이너리가 현재 디렉터리에 있다고 가정합니다. `zallet -c <config> rpc`를 사용하세요.
- `toCurl.sh`는 쿠키를 사용해 포트 8232에서 Zebra와 통신하고 `getinfo` 및 `sendmany`를 호출합니다. Zallet는 `sendmany`를 제공하지 않습니다. 채굴 대기 루프도 `$` 없이 `[[ chainHeight -gt temp ]]`를 사용하므로 대기하지 않습니다.
- `z_gettotalbalance 0 true`가 추가 위치 인수로 전달됩니다. 해당 호출을 사용하기 전에 실행할 바이너리에서 `rpc help z_gettotalbalance`를 확인하세요.
- 각 청크는 모든 수신자에게 `0.0001` ZEC를 전송합니다. ZIP 317 수수료는 별도입니다. 많은 주소에 긴 메모를 전송하면 더스트 금액보다 더 많이 지출됩니다.

## 수정 후

수정된 실행기는 다음을 수행해야 합니다.

1. 메모를 바이트로 읽고 줄이 아닌 512바이트 경계에서 분할합니다.
2. 각 청크를 한 번만 hex 인코딩합니다.
3. 자금이 충전된 UA, 수신자 배열 및 수수료 인수 없이 `zallet -c <config> rpc z_sendmany`를 호출합니다.
4. 해당 작업 ID에 대해 `z_getoperationstatus`를 폴링합니다.
5. `success` 이후에만 txid를 기록합니다.

이전 튜토리얼 페이지는 [실드된 뉴스레터 스크립트](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md)에 그대로 있습니다. 절차에는 이 페이지를 사용하세요.
