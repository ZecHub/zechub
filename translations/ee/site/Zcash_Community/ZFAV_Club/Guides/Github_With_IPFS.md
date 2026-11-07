<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɖe GitHub Repo kple IPFS 

## Gɔmedzedze

Le mɔfia sia me la, míesrɔ ale si nàwɔ Git URL si woate ŋu aklɔn na wò GitHub repository, eye woɖea eƒe dɔ kple IPFS CID. Esia le vevie be nuawo nɔ anyi togbɔ be nèli le afi kae le xexeame o, be woate ŋu akpe ɖe asi me, eye wòazu heheɖoƒe si me nyatakaka xɔasiwo nɔ ɣeyiɣi didi!

Didienu: Nyatakaka si wòde ɖe IPFS dzi la, network ƒe zazã katã ate ŋu akpɔe. Àte ŋu adi be nàwɔ ɣaɣlaŋlɔŋlɔ [encryption] na wò nyatakaka siwo nye wò tɔ alo siwo xɔ asi le teƒe si dzi.


## Ɖo IPFS Kubo

Dze installation ƒe mɔfia si woɖo [afi](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) la yome.

Le kpɔɖeŋu sia me la, míezã Linux, OS ƒe version bubuwo hã li. 

Kpɔ be installation la dzi nyuie to "ipfs --version" zazã me. 


## Klɔn Repository 

Be nàdze egɔme la, tia Git repository si nèdi be nàhost, eye nàklɔne:

Wɔ command sia: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Azɔ la, na wòanɔ dzadzra be woaklɔne to IPFS dzi.

cd zechub
git update-server-info


Ʋu Git ƒe objectwo:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Esia wɔwɔ ana IPFS nate ŋu awɔ objectwo ƒe deduplication ne nàtrɔ Git repository la emegbe.


## Kpe ɖe IPFS ŋu 

Ne nèwu esia wɔwɔ vɔ la, repository ma dzadzra be woaɖe eƒe dɔ. Nu si susɔ koe nye be nàkpe ɖe IPFS ŋu:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID si wòkpɔe: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Enyo ŋutɔ! Azɔ wò repository la yia ɖe network la dzi.


## Klɔn kple IPFS 

Azɔ la, ele be nàte ŋu axɔ github repository la kple:

git clone http://ipfs.io/ipfs/"yourCID"

Ke boŋ la, àte ŋu adi eye nàxɔe kple wòƒe IPFS ɣaɣla dzesi ŋɔŋlɔ. 

Didienu mamlɛtɔ: Repo ƒe folder si le IPFS dzi la mexɔa updatewo ɖo kple github repository si le nyateƒe me o. Woɖe eƒe susu be nàde folder la ɖe dzi ake le ɣeyiɣiwo ƒe dome.
