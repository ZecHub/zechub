# Zenith 0.10 Beta

RPC’leri etkinleştirilmiş çalışan bir zebrad gerekir

# NIX’i yükleyin

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Aşağıdakileri ~/.config/nix/nix.conf veya /etc/nix/nix.conf dosyasına ekleyin:

`experimental-features = nix-command flakes`


# Zenith’ü yükleyin

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith’i çalıştırın


`zenithgui`

veya

`zenithserver`
