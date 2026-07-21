# Zenith 0.10 Beta

Вам знадобиться запущений `zebrad` з увімкненими RPC

# Встановлення NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Додайте таке до ~/.config/nix/nix.conf або /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Встановлення Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Запуск Zenith


`zenithgui`

або

`zenithserver`
