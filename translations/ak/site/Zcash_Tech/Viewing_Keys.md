<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nneɛma a Wɔde Hwɛ

Address a wɔabɔ ho ban ma wɔn a wɔde di dwuma no tumi di nkitaho bere a wɔda nsɛm kakraa bi adi sɛnea wobetumi wɔ Zcash blockchain no so. Dɛn na ɛba bere a ɛsɛ sɛ woda nsɛm a ɛho hia a ɛfa Zcash asɛm a wɔabɔ ho ban ho adi kyerɛ ɔfã pɔtee bi? Address biara a wɔabɔ ho ban no wɔ safe a wɔde hwɛ ade. Wɔde safe a wɔde hwɛ ade bae wɔ [ZIP 310](https://zips.z.cash/zip-0310) na wɔde kaa protocol no ho wɔ Sapling network upgrade no mu. Hwɛ safoa yɛ Zcash fã titiriw efisɛ ɛma wɔn a wɔde di dwuma no tumi paw da nsɛm a ɛfa nnwuma ho adi.

### Dɛn nti na wode safe a wɔde hwɛ nneɛma di dwuma?

Dɛn nti na obi a ɔde di dwuma bɛpɛ sɛ ɔyɛ eyi da? Efi Electric Coin Co. blog a ɛfa asɛm no ho...

*- Exchange bi pɛ sɛ ohu bere a adetɔfo bi de ZEC kɔ address a wɔabɔ ho ban so, bere a wɔde **spend authority** nsafe no sie wɔ hardware a ahobammɔ wom so. Nsesa no betumi ayɛ safoa a wɔde hwɛ ade a ɛba na ɛde ahyɛ **detection** node a ɛwɔ Intanɛt so, bere a sika a wɔsɛe no safe no da so ara wɔ nhyehyɛe a ahobammɔ wom kɛse no so.*

*- Ɛsɛ sɛ ɔhwɛfoɔ de wɔn Zcash a wɔwɔ no ma akontabufoɔ a wɔhunu. Ɔhwɛfoɔ no bɛtumi ayɛ safe a ɛdi mũ a wɔde bɛhwɛ wɔn address a wɔabɔ ho ban no mu biara na ɔde saa safe no akyɛ wɔn akontabuofoɔ. Akontaabufoɔ no bɛtumi ahwɛ sɛ saa address ahodoɔ no akari pɛ na wahwɛ dwumadie a atwam a wɔde kɔ saa address ahodoɔ no so na wɔfiri hɔ baeɛ no mu.* 

*- Ebia ɛho behia sɛ exchange bi yɛ due diligence checks wɔ customer bi a ɔde sika fi address a wɔabɔ ho ban so de sika to hɔ no so. Exchange no betumi abisa adetɔfo viewing key no ama wɔn address a wɔabɔ ho ban no na wɔde adi dwuma de ahwɛ adetɔfo a wɔabɔ ho ban no ayɔnkofa dwumadi no mu sɛ nhwehwɛmu a ɛfata a wɔama anya nkɔso yi fã.*

### Sɛnea wubehu wo safe a wode hwɛ nneɛma

#### zcashd

* Fa *./zcash-cli listaaddresses* kyerɛw address ahorow a wonim nyinaa.

* Afei fa ahyɛde a edidi so yi ma ma UA anaa Sapling shielded address ahorow

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet na ɔkyerɛwee

* Wɔ atifi nifa so paw "Backup", Authenticate wo fon, afei kɛkɛ copy wo viewing key a ɛbɛda adi.

### Sɛnea wode wo viewing key bedi dwuma

#### zcashd

* Fa nea edidi so yi di dwuma wɔ vkey anaa ukey biara ho: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* Wɔ atifi nifa so no, paw "Account", klik "+" so wɔ ase nifa so na fa ka ho na fa wo hwɛ safoa no ka ho na fa wo 'read-only' akontaabu no ka ho.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com na ɛwɔ hɔ

* Fa wo browser no kyerɛ [ha](https://zcashblockexplorer.com/vk) na twɛn nea ebefi mu aba! hyɛ no nsow: saa aba yi mprempren wɔ zcashblockexplorer node no so na ɛnam so de wo ho to saa info yi so ne zcashblockexplorer.com wuranom

### Akadeɛ

Bere a ɛyɛ mfiridwuma kɛse no, wɔkamfo kyerɛ sɛ wode safe a wɔde hwɛ nneɛma nni dwuma sɛnea ɛho hia.

Hwɛ nkyerɛkyerɛ yi a ɛfa hwɛ a wobɛhwɛ safe ho. Nneɛma a ɛfa asɛm no ho a wɔahyehyɛ wɔ ase ha sɛ wopɛ sɛ wode wo ho hyɛ mu kɔ akyiri a:

- [ECC, Nkyerɛkyerɛmu a Wɔde Hwɛ Nneɛma a Wɔde Hwɛ Nneɛma Mu](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nneɛma a Wɔda no Adi ne Nneɛma a Wɔde Hwɛ Nneɛma a Wɔpaw](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310)
