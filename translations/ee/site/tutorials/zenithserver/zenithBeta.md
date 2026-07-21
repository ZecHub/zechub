# Zenith 0.10 Beta ƒe xexlẽme

Àhiã zebrad si le du dzi si me RPC ƒe dɔwɔwɔ le

# De NIX ɖe wò kɔmpiuta dzi

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Tsɔ nusiwo gbɔna kpe ɖe ~/.config/nix/nix.conf alo /etc/nix/nix.conf ŋu:

`experimental-features = nix-command flakes`


# De Zenith wò kɔmpiuta dzi

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Du Zenith ƒe du


`zenithgui`

or

`zenithserver`

