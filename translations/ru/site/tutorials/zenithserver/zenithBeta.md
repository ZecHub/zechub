# Zenith 0.10 Beta

Вам потребуется запущенный `zebrad` с включёнными RPC

# Установка NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Добавьте следующее в ~/.config/nix/nix.conf или /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Установка Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Запуск Zenith


`zenithgui`

или

`zenithserver`
