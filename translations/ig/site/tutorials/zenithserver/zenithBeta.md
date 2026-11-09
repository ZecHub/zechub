# Zenith 0.10 Beta

Ị ga-achọ zebrad na-arụ ọrụ nke nwere RPC arụnyere

# Wụnye NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Tinye ihe ndị a na ~/.config/nix/nix.conf ma ọ bụ /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Wụnye Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Gbaa Zenith


`zenithgui`

ma ọ bụ

`zenithserver`
