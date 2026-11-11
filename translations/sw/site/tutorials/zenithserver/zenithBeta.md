# Zenith 0.10 Beta

Utahitaji zebrad inayoendeshwa huku RPC zikiwa zimewezeshwa

# Sakinisha NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Ongeza yafuatayo kwenye ~/.config/nix/nix.conf au /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Sakinisha Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Endesha Zenith


`zenithgui`

au

`zenithserver`
