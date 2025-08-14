# Zenith 0.10 Beta

You will need a running zebrad with RPC's enabled

# Install NIX

sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon

sudo chown -R <username> /nix'

. /home/<username>/.nix-profile/etc/profile.d/nix.sh


Add the following to ~/.config/nix/nix.conf or /etc/nix/nix.conf:

experimental-features = nix-command flakes


# Install Zenith

nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure


nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master



# Run Zenith


zenithgui

