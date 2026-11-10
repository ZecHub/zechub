# Zenith 0.10 Beta

Àle be wò nàtsɔ zebrad si le dudu me kple RPCs si woɖe mɔ na

# Ɖo NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Tsɔ nu si gbɔna kpe ɖe ~/.config/nix/nix.conf alo /etc/nix/nix.conf ŋu:

`experimental-features = nix-command flakes`


# Ɖo Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Ƒu Zenith


`zenithgui`

alo

`zenithserver`
