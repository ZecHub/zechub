# Zenith 0.10 Beta

Necesitarás un `zebrad` en ejecución con los RPC habilitados

# Instalar NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Añade lo siguiente a ~/.config/nix/nix.conf o /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Instalar Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Ejecutar Zenith


`zenithgui`

o

`zenithserver`
