# How to run Zcashd on Akash Network 

## Tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/SVekeNU6_-g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Initial Setup 

```markdown
- Install Keplr Wallet https://keplr.app
- Fund Wallet (minimum 5 AKT) | https://osmosis.zone 
- Navigate to https://akash.network 
```

### Setup Deployment

```markdown
- Click 'Deploy Now'
- On the Left Menu select 'Deplyments'
- Top right corner click Deploy - Select 'Ubuntu'
- Use the builder to enter deployment specs
- Set path for node to /mnt/data
```

#### Recommended Hardware: 

```markdown
4 CPU cores
8 GB RAM
300 GB Persistent* Storage - be sure to check the box. By default it displays ephemeral storage.
```


### Install Dependencies & zcashd 

```bash
apt-get update && apt-get install apt-transport-https wget gnupg2
wget -qO - https://apt.z.cash/zcash.asc | gpg --import
gpg --export B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE | apt-key add -
echo "deb [arch=amd64] https://apt.z.cash/ buster main" | tee /etc/apt/sources.list.d/zcash.list
apt-get update && apt-get install zcash
mkdir -p ~/.zcash
cd /mnt/data
mkdir ./zcash
vi ~/.zcash/zcash.conf
addnode=mainnet.z.cash
datadir=/mnt/data/.zcash
[ESC] + wq + Enter
```

### 4. Start Zcashd & Sync

`zcashd`

Estimated time for full sync 3 Days, then start experimenting! 
