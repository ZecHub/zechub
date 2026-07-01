# Zenith 0.10 Beta

Avrai bisogno di uno zebrad in esecuzione con gli RPC abilitati

# Installa NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Aggiungi quanto segue a ~/.config/nix/nix.conf o /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Installa Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Esegui Zenith


`zenithgui`

oppure

`zenithserver`
