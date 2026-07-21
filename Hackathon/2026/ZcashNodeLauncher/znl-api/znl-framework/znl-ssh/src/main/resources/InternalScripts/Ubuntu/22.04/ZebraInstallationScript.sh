
set -e


sudo apt update
sudo apt install -y ca-certificates curl gnupg


sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --batch --yes --dearmor -o /etc/apt/keyrings/docker.gpg




echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


sudo systemctl enable --now docker



sudo ufw allow 8233/tcp




mkdir -p /opt/znl/zebra-data
mkdir -p /opt/znl/zebra-config


chmod -R a+rw /opt/znl



cat << 'EOF' | tee /opt/znl/zebra-config/zebrad.toml
# ==================== Zebra Configuration ====================

[network]
# Network type: "Mainnet" or "Testnet"
network = "Mainnet"

# Listen address for P2P connections
listen_addr = "0.0.0.0"


[state]
# Path to the blockchain state directory (should match your volume mount)
cache_dir = "/home/zebra/.cache/zebra"


[rpc]
# RPC server listen address
listen_addr = "0.0.0.0:8232"

# Disable cookie authentication (since you are using environment variable)
enable_cookie_auth = false


[health]
# Health check endpoint (recommended)
listen_addr = "0.0.0.0:8080"
# Minimum number of connected peers to be considered "ready"
min_connected_peers = 1
# Maximum blocks behind tip to be considered "ready"
ready_max_blocks_behind = 3


[tracing]
# Disable colored logs in Docker (recommended)
use_color = false


# ==================== Optional Sections ====================

# [metrics]
# endpoint_addr = "0.0.0.0:9999"

# [mining]
# miner_address = "t1YourTransparentAddressHere"

EOF


docker create \
  --name znl-zebra-node \
  -v /opt/znl/zebra-data:/home/zebra/.cache/zebra:Z \
  -v /opt/znl/zebra-config/zebrad.toml:/home/zebra/.config/zebrad.toml:ro \
  -p 8080:8080 \
  -p 8233:8233 \
  -p 8232:8232 \
  -e ZEBRA_RPC__LISTEN_ADDR="0.0.0.0:8232" \
  -e ZEBRA_RPC__ENABLE_COOKIE_AUTH=false \
  zfnd/zebra:latest \
  2>&1 | grep -v "Emulate Docker CLI using podman" || true









