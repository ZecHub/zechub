# Zenith 0.10 Beta na ɛwɔ hɔ

Wobɛhia zebrad a ɛretu mmirika a RPC's ayɛ adwuma

# Fa NIX hyɛ mu

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Fa nea edidi so yi ka ~/.config/nix/nix.conf anaa /etc/nix/nix.conf ho:

`experimental-features = nix-command flakes`


# Fa Zenith hyɛ wo kɔmputa so

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Mmirikatu Zenith


`zenithgui`

or

`zenithserver`

