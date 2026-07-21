# Zenith 0.10 测试版

你需要一个正在运行且已启用 RPC 的 zebrad

# 安装 NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


将以下内容添加到 ~/.config/nix/nix.conf 或 /etc/nix/nix.conf：

`experimental-features = nix-command flakes`


# 安装 Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# 运行 Zenith


`zenithgui`

或

`zenithserver`
