# Zenith 0.10 Beta

Você precisará de um zebrad em execução com o RPC habilitado

# Instale o NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Adicione o seguinte a ~/.config/nix/nix.conf ou /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Instale o Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Execute o Zenith


`zenithgui`

ou

`zenithserver`
