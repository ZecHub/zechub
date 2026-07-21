# Zenith 0.10 Beta

Utahitaji mbio zebrad na RPC ya kuwezeshwa

# Sakinisha NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Ongeza yafuatayo kwa ~/.config/nix/niX.conf au /etc/nixx/niXX.conF:

`experimental-features = nix-command flakes`


# Sakinisha Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Run Zenith


`zenithgui`

or

`zenithserver`

