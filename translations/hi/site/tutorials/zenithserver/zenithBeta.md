# Zenith 0.10 बीटा

आपको RPC's enabled के साथ एक चल रहा zebrad चाहिए होगा

# NIX इंस्टॉल करें

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


निम्नलिखित को ~/.config/nix/nix.conf या /etc/nix/nix.conf में जोड़ें:

`experimental-features = nix-command flakes`


# Zenith इंस्टॉल करें

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith चलाएँ


`zenithgui`

या

`zenithserver`
