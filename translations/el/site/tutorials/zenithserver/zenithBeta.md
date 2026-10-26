# Zenith 0.10 Beta

Θα χρειαστείς ένα zebrad σε λειτουργία με ενεργοποιημένα RPC

# Εγκατάσταση του NIX

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


Πρόσθεσε τα ακόλουθα στο ~/.config/nix/nix.conf ή στο /etc/nix/nix.conf:

`experimental-features = nix-command flakes`


# Εγκατάσταση του Zenith

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Εκτέλεση του Zenith


`zenithgui`

ή

`zenithserver`
