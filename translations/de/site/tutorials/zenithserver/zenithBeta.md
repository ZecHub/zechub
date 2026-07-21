# Zenith 0.10 Beta

Du benötigst ein laufendes zebrad mit aktivierten RPCs

# NIX installieren

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Füge Folgendes zu ~/.config/nix/nix.conf oder /etc/nix/nix.conf hinzu:

`experimental-features = nix-command flakes`


# Zenith installieren

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith ausführen


`zenithgui`

oder

`zenithserver`
