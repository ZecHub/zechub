# Zenith 0.10 Beta

Vous aurez besoin d’un `zebrad` en cours d’exécution avec les RPC activés

# Installer NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Ajoutez ce qui suit à ~/.config/nix/nix.conf ou /etc/nix/nix.conf :

`experimental-features = nix-command flakes`


# Installer Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Exécuter Zenith


`zenithgui`

ou

`zenithserver`
