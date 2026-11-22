# Zenith 0.10 Beta

شما به یک zebrad در حال اجرا با RPCهای فعال نیاز خواهید داشت

# نصب NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


موارد زیر را به ~/.config/nix/nix.conf یا /etc/nix/nix.conf اضافه کنید:

`experimental-features = nix-command flakes`


# نصب Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# اجرای Zenith


`zenithgui`

یا

`zenithserver`
