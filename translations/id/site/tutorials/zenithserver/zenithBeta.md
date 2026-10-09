# Zenith 0.10 Beta

Kamu akan membutuhkan zebrad yang sedang berjalan dengan RPC yang diaktifkan

# Instal NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Tambahkan hal berikut ke ~/.config/nix/nix.conf atau /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Instal Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Jalankan Zenith


`zenithgui`

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process following all your specified rules and terminology.

`zenithserver`

