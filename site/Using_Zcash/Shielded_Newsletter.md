<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded Newsletter

> Send a markdown note to a list of shielded addresses as Zcash memos, using Zallet. The recipient list and the note stay off transparent addresses.

A shielded newsletter is a series of shielded transactions. Each output pays a tiny amount to a recipient Unified Address and carries the next slice of the note in the memo field. Zallet builds and sends those transactions. Zebra and Zaino only provide chain data.

The scripts live in [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). They were written for an early Zallet and are not safe to run as-is against the current release. This page is the updated procedure. Checked against Zallet `v0.1.0-beta.3` and the Zallet book as of 7 October 2026.

## What you need

- Zebra fully synced, with RPC bound to localhost.
- Zaino synced against that Zebra node.
- Zallet `v0.1.0-beta.3` or newer, wallet build, with its RPC bound to localhost. The book lists `z_sendmany` as implemented. A numeric fee is rejected: if you pass `fee`, it must be `null`, because Zallet always uses the ZIP 317 fee.
- A funded account whose Unified Address can spend shielded funds.
- Recipient Unified Addresses. A memo on a transparent address is an error.

Do not put a funded address or a cookie in the wiki or in a committed script. The current `txBuilderFromFile.sh` has a Unified Address hardcoded. Replace it locally and do not commit it.

## Configure Zallet

Generate a config with the Zallet that you are running, then point it at Zebra and Zaino. The sample in the old tutorial uses `as_of_version = "0.0.0"` and a personal home path. Treat that file as a snapshot, not a template.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` must list `z_sendmany`, `z_getoperationstatus`, and `z_getoperationresult`. Bind RPC to `127.0.0.1` only.

## Recipient list

One Unified Address per line, no quotes, no blank lines. The script reads `daoAddresses.md`. The old readme says `daoAddress.md`. That file is not in the repo, and the names do not match.

```text
u1...
u1...
```

## Send one memo

`z_sendmany` is asynchronous. It returns an operation id. Poll `z_getoperationstatus` until the status is `success` or an error. A fixed 5 second sleep, which is what the script does, loses the result when the build takes longer. `z_getoperationresult` consumes the operation, so do not call it until the status is terminal.

Fee is omitted. Zallet computes ZIP 317. Do not pass a number.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

The memo field is raw hex, 512 bytes maximum. `ascii2hex` encodes ASCII only. A note with any non-ASCII character fails. `xxd` or `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` handles UTF-8.

Privacy policy defaults to `FullPrivacy`. That is the right default for a shielded recipient. Do not pass `AllowFullyTransparent`.

## Script defects

These are in the tree as of 8 October 2026. Do not run `shieldNewsletter.sh` until they are fixed.

- `[[ bytesInFile -lt 512 ]]` is missing `$`. The single-memo branch never runs.
- The chunk loop stores hex, then `hex2ascii` decodes it, then `txBuilderFromFile.sh` encodes it again. The last chunk is not flushed unless a later line overflows 512. A long line is not split. It is sent whole and can exceed the 512-byte memo.
- `txBuilderFromFile.sh` calls `./zallet rpc` with no config path, and expects the binary in the current directory. Use `zallet -c <config> rpc`.
- `toCurl.sh` talks to Zebra on port 8232 with a cookie, and calls `getinfo` and `sendmany`. Zallet does not provide `sendmany`. The mine-wait loop also uses `[[ chainHeight -gt temp ]]` without `$`, so it does not wait.
- `z_gettotalbalance 0 true` is passed as extra positional arguments. Check `rpc help z_gettotalbalance` on the binary you run before using that call.
- Each chunk sends `0.0001` ZEC to every recipient. The ZIP 317 fee is on top. A long note to many addresses spends more than the dust amounts.

## After a fix

A corrected runner should:

1. Read the note as bytes and split on 512-byte boundaries, not on lines.
2. Hex-encode each chunk once.
3. Call `zallet -c <config> rpc z_sendmany` with the funded UA, the recipient array, and no fee argument.
4. Poll `z_getoperationstatus` for that operation id.
5. Record the txid only after `success`.

The old tutorial page remains at [Shielded Newsletter scripts](/tutorials/shieldednewsletter/readme). Use this page for the procedure.
