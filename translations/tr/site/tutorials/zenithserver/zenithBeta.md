# Zenith 0.10 Beta

RPC'leri etkinleştirilmiş çalışan bir zebrad'a ihtiyacınız olacak

# NIX Kurulumu

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Aşağıdakini ~/.config/nix/nix.conf veya /etc/nix/nix.conf dosyasına ekleyin:

`experimental-features = nix-command flakes`


# Zenith Kurulumu

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith'i Çalıştırın


`zenithgui`

veya

`zenithserver`
