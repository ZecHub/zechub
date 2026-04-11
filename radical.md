## 🌱 Also Available on Radicle (P2P)

This project is mirrored on **Radicle** — a sovereign, peer-to-peer code collaboration network built on Git. No central servers, no single point of failure.

### Our Repositories

| Project       | Description                                      | Repository ID (RID)                          | Web Explorer |
|---------------|--------------------------------------------------|----------------------------------------------|--------------|
| **zechub**    | A decentralized education hub for Zcash          | `rad:zad2NSrsw3NYdkvx1sTn6EYAqRHc`         | [View on Radicle](https://app.radicle.xyz/nodes/iris.radicle.xyz/rad:zad2NSrsw3NYdkvx1sTn6EYAqRHc) |
| **zechub-wiki** | Educational wiki for Zcash and privacy         | `rad:z2cawajJ9dAqR35UhHQvSxuFNA6SL`         | [View on Radicle](https://app.radicle.xyz/nodes/iris.radicle.xyz/rad:z2cawajJ9dAqR35UhHQvSxuFNA6SL) |
| **namada**    | Namada governance and network metrics dashboard | `rad:z4Wg7andG6uee1EAyWEhCuivji41V`         | [View on Radicle](https://app.radicle.xyz/nodes/iris.radicle.xyz/rad:z4Wg7andG6uee1EAyWEhCuivji41V) |

### How to Support These Repos

Help make these projects more available and resilient on the Radicle network by **seeding** them:

```bash
# Install Radicle (if you haven't already)
curl -sSLf https://radicle.xyz/install | sh

# Seed a specific repo (replace with any RID above)
rad seed rad:zad2NSrsw3NYdkvx1sTn6EYAqRHc     # zechub
rad seed rad:z2cawajJ9dAqR35UhHQvSxuFNA6SL    # zechub-wiki
rad seed rad:z4Wg7andG6uee1EAyWEhCuivji41V    # namada
```

### Clone the repos

```
rad clone rad:z2cawajJ9dAqR35UhHQvSxuFNA6SL --timeout 10m     # zechub-wiki
rad clone rad:zad2NSrsw3NYdkvx1sTn6EYAqRHc --timeout 10m      # zechub
rad clone rad:z4Wg7andG6uee1EAyWEhCuivji41V --timeout 10m     # namada
```

### Connecting to Public Seed Nodes

```
# Core Radicle seed (great for general network discovery)
rad node connect z6MksmpU5b1dS7oaqF2bHXhQi1DWy2hB7Mh9CuN7y1DN6QSz@seed.radicle.xyz:8776

# Rosa (highly recommended for ZecHub repos)
rad node connect z6Mkmqogy2qEM2ummccUthFEaaHvyYmYBYh3dbe9W4ebScxo@rosa.radicle.xyz:8776

# Iris (alternative community seed)
rad node connect z6MkrLMMsiPWUcNPHcRajuMi9mDfYckSoJyPwwnknocNYPm7@iris.radicle.xyz:8776

```

### Troubleshooting

```
# Make sure your Radicle node is running
rad node start

# Check node status and connected peers
rad node status

# check your current version
rad --version

# update if a newer version is available      
rad self-update

```
