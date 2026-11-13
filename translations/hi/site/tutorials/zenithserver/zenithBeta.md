# Zenith 0.10 बीटा

आपको RPC सक्षम के साथ चालू zebrad की आवश्यकता होगी

# NIX का इंस्टॉलेशन

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


निम्नलिखित को ~/.config/nix/nix.conf या /etc/nix/nix.conf में जोड़ें:

`experimental-features = nix-command flakes`


# Zenith का इंस्टॉलेशन

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith चलाना


`zenithgui`

या

`zenithserver`
