# Zenith 0.10 Bẹta

You will need a running zebrad with RPC's enabled

# Fi NIX sori ẹrọ

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Fi ohun tí ó tẹ̀lé yìí kún ~/.config/nix/niX.conf tàbí /etc/niXX.conF:

`experimental-features = nix-command flakes`


# Fi Zenith sori ẹrọ

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Ṣiṣẹ Zenith


`zenithgui`

or

`zenithserver`

