<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Twerɛ Wɛbsaet bi wɔ IPFS so 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## IPFS ho nnianim asɛm 

IPFS (InterPlanetary File System) yɛ peer-to-peer protocol ne network a wɔayɛ sɛ wɔde bɛyɛ ɔkwan a wɔfa so de fael sie na wɔkyɛ. 

Nea ɛnte sɛ intanɛt so atetesɛm client-server model no, IPFS ma wɔn a wɔde di dwuma no kwan ma wɔkyɛ fael ahorow no ne wɔn ho wɔn ho tẽẽ, sen sɛ wɔde wɔn ho bɛto centralized server so de asie na wɔakyekyɛ nneɛma. 

Wɔde *content-addressing* na ɛyɛ fael ahorow a ɛwɔ IPFS mu no address, a ɛkyerɛ sɛ wɔma fael biara hash soronko anaa CONTENT IDENTIFIER (CID) a egyina ne nsɛm so, na wɔde saa hash yi di dwuma de gye fael no fi ntwamutam no mu.

Sɛ obi de fael bi ka IPFS ho a, wɔkyekyɛ fael no mu nketenkete a wɔfrɛ no blocks, na wɔma block biara CID. Afei wɔde saa blocks yi sie wɔ node ahorow so wɔ network no mu, sɛnea ɛbɛyɛ a ɛnyɛ den sɛ wobetumi agye fael no afi mmeae pii. 

Eyi hwɛ hu sɛ redundancy ne fault-tolerance bere a ɛsan nso ma ɛyɛ den ma node biako biara sɛ ɛbɛyɛ beae biako a edi huammɔ anaasɛ ɛhyɛ so. 

Kenkan [IPFS ho Nnianim Nsɛm](https://blog.infura.io/post/an-introduction-to-ipfs)



## Wo Wɛbsaet no a wobɛbɔ 

Saa nhwɛsoɔ yi nti yɛreyɛ wɛbsaet a ɛnyɛ den. 

[Nhwɛso Site](https://squirrel.surf)


**Anamɔn 1:** Sɛ wunnim wɛb nhyehyɛe a kyerɛw wo wɛbsaet no mu nsɛm titiriw a Title, Main Body of text ka ho, a links kɔ nkratafa/site & footers afoforo ka ho.

**Anamɔn 2:** Fa [HTML nsusuiɛ!](https://nicepage.com/html-templates) Fa nsɛm a woakyerɛw no hyɛ mu sɛnea ɛfata. Optional sɛ wobɛsan nso ayɛ .CSS stylesheet ama wo wɛbsaet no. 

**Step 3:** Save your directory. Ɛsɛ sɛ .html nkratafa + mfonini nyinaa wɔ Folda koro mu. 



## Node bi a wɔde besi hɔ

Twe na fa IPFS fi [Official website](https://docs.ipfs.tech/install/ipfs-desktop/).



### Hyɛ IPFS ase: 

Sɛ wode Desktop Application no redi dwuma a ɛho renhia sɛ wohyɛ aseɛ. 

Sɛ wode Terminal anaa ahyɛde a ɛkyerɛw di dwuma a, Run ahyɛde: <mark>ipfs ahyɛ aseɛ </mark>. 



**Fa Site Folder ka IPFS ho**: 

Paw folda a wo wɛbsaet fael ahorow wom no na kɔ Add Folder option no so.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Sɛ wode Terminal redi dwuma a, Run ahyɛde: <mark>ipfs fa -r "folda_din" ka ho.</mark> sɛ wode folda no nyinaa bɛka IPFS ho mpɛn pii.


### Pin Site a ɛwɔ IPFS so: 

Sɛ wɔde wo wɛbsaet fael ahorow no ka IPFS ho wie a, ɛsɛ sɛ wo **pin** de hwɛ sɛ ɛbɛkɔ so ayɛ nea ɛwɔ ntwamutam no so.

--

Sɛ wode Terminal redi dwuma a, Run ahyɛde: Sɛ wode Terminal redi dwuma a, Run ahyɛde: <mark>ipfs pin fa "hash" ka ho.</mark> 

"hash" = CID a ɛwɔ folda a wode kaa ho wɔ anammɔn a atwam no mu.


Sɛnea ɛbɛyɛ a, wo nso wotumi de nnwuma te sɛ [Pinata](https://pinata.cloud) anaasɛ [Dolpin](https://dolpin.io)

Ɛmma bere pii nsɛe! 

--

### Kɔ wo wɛbsaet no so wɔ IPFS so: 

Seesei wɔatintim wo wɛbsaet no wɔ IPFS so na wobɛtumi de hash a ɛwɔ folda no mu akɔ so. Sɛ wopɛ sɛ wokɔ wo wɛbsaet no so a, wubetumi akɔ hɔ https://ipfs.io/ipfs/"hash" 

"hash" = CID a ɛwɔ folda no mu.

Wɔ yɛn fam no CID = "QmW2UEfap1vrRRvS5H9aware8qmsx4WsvXBk3GPGVVfWx3r3".


## IPNS 

Interplanetary Naming System (IPNS) ma wo kwan ma wo update IPFS CID's a ɛbata wo wɛbsaet no ho na ɛda so ara som static link. Wɔde ama sɛ safe. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Wɔ nhyehyeɛ menu ma wo sait foldre wɔ IPFS desktop application paw Publish to IPNS. 

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Safoa: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n".

Wobetumi nso de ahwɛ yɛn wɛbsaet no denam apon bi so: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Nkitahodi 
 
Wɔayɛ sait no, seesei yehia ɔkwan a yɛbɛfa so akyerɛ URL bi akɔ emu nsɛm no so. 

Sɛ wowɔ wɛb address dedaw a wobɛtumi de kyerɛwtohɔ foforo aka ho denam TXT kyerɛwtohɔ "_dnslink(wo domain)" no so. Ɛgyina provider so no ebia auto populate. 

![](https://i.ibb.co/MgRxBHj/example.png)

Ɛbɛgye bere ansa na woatumi atrɛw denam network no so ansa na woatumi ahwɛ. 

Yɛma wo akwaaba! Woahyehyɛ wɛbsaet a ɛko tia censorship. 


**Akadeɛ**

[IPFS Nwoma a Wɔakyerɛw](https://docs.ipfs.tech)

[IPNS Nwoma a Wɔakyerɛw](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Docs](https://dnslink.io/#introduction)
