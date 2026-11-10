# Zenith 0.10 ベータ

RPC が有効な状態で実行中の zebrad が必要です

# NIX をインストール

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


以下を ~/.config/nix/nix.conf または /etc/nix/nix.conf に追加してください。

`experimental-features = nix-command flakes`


# Zenith をインストール

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith を実行


`zenithgui`

または

`zenithserver`
