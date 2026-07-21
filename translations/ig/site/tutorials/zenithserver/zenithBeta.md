# Zenith 0.10 Beta

Ị ga-achọ zebrad na-agba ọsọ na RPC's enyere

# Wụnye NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Tinye ihe na-esonụ na ~/.config/nix / nix.conf ma ọ bụ /etc/Nix / Nix.Conf:

`experimental-features = nix-command flakes`


# Wụnye Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Na-agba ọsọ Zenith


`zenithgui`

or

`zenithserver`

