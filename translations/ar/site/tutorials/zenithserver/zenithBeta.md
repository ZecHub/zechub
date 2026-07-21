# Zenith 0.10 Beta

ستحتاج إلى `zebrad` قيد التشغيل مع تفعيل RPC

# تثبيت NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


أضف ما يلي إلى ~/.config/nix/nix.conf أو /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# تثبيت Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# تشغيل Zenith


`zenithgui`

أو

`zenithserver`
