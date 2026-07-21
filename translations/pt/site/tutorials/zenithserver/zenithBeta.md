# Zenith 0.10 Beta

Você precisará de um `zebrad` em execução com RPCs habilitados

# Instalar NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Adicione o seguinte a ~/.config/nix/nix.conf ou /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Instalar Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Executar Zenith


`zenithgui`

ou

`zenithserver`
