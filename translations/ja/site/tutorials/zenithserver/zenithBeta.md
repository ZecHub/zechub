# Zenith 0.10 ベータ版

動作中の zebrad が必要で、RPC が有効になっている必要があります。

# NIX のインストール

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


以下の内容を ~/.config/nix/nix.conf または /etc/nix/nix.conf に追加してください：

`experimental-features = nix-command flakes`


# Zenith のインストール

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith の実行


`zenithgui`

または

`zenithserver`
