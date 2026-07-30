<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Subɔ Github Repo kple IPFS 

## Kpɔkplɔyiɖeme

Le mɔfiame sia me la míesrɔ̃ alesi woawɔ git cloneable URL na wò Github nudzraɖoƒe si wosubɔ to IPFS CID zazã me. Esia ɖea vi be woakpɔ egbɔ be nyatakakawo li eɖanye anyigba ƒe nuto ka mee wole o, tsitretsitsi ɖe mɔxexeɖedɔléle nu ŋu eye abe nyatakaka veviwo ƒe dzraɖoƒe si nɔa anyi ɖaa ene!

De dzesii: Nyatakaka siwo woda ɖe IPFS dzi la li na *katã* network zãlawo. Àdi be yeatsɔ ame ŋutɔ ƒe nyatakaka/nya veviwo aɣla le mia gbɔ.


## De IPFS Kubo ɖe wò kɔmpiuta dzi

Wɔ ɖe ɖoɖo ƒe mɔfiame siwo wona dzi [le afisia](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Le kpɔɖeŋu sia me la míezãa Linux, OS ƒe tɔtrɔ bubuwo li. 

Kpɔe ɖa be ɖoɖowɔɖiwo kpɔ dzidzedze to "ipfs --version" zazã me. 


## Clone Nudzraɖoƒe 

Be nàdze egɔme la, tia Git nudzraɖoƒe si nèdi be yeaxɔ & awɔ eƒe nɔnɔmetata:

Du Sedede: "git clone." https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Fifia, be woadzrae ɖo be woawɔ eƒe nɔnɔmetata to IPFS dzi.

cd zechub ƒe nya
git update-server-nyatakakawo


Ðe Git ƒe nuwo ɖa:

mv nuwo/pack/*.pack .
git unpack-nuawo < *.pack
rm -f *.pack nuwo/pack/* .

Esia wɔwɔ ana IPFS naɖe nuwo ɖa ne èwɔ Git ƒe nudzraɖoƒea yeyee emegbe.


## Tsɔe kpe ɖe IPFS ŋu 

Ne èwɔe vɔ ko la, nudzraɖoƒe ma sɔ gbe be woasubɔe. Nusi susɔ be nàwɔ koe nye be nàtsɔe akpe ɖe IPFS ŋu:

$ pwd

/kɔda/myrepo

$ ipfs tsɔ -r kpee.

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

CID si do tso eme: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Si nya nu! Fifia wotsɔ wò nudzraɖoƒea da ɖe network la dzi.


## Kloe to IPFS zazã me 

Ele be nàte ŋu axɔ github nudzraɖoƒea azɔ to:

git ƒe nɔnɔmetata http://ipfs.io/ipfs/"yourCID"

Alo àte ŋu adi & axɔe to wò IPFS node si le mia gbɔ zazã me. 

De dzesii Mamlɛtɔ: Repo agbalẽdzraɖoƒe si le IPFS dzi mexɔa yeyewo kpe ɖe github nudzraɖoƒe ŋutɔŋutɔ ŋu o. Wokafui be nàgbugbɔ akɔ agbalẽdzraɖoƒea ɖe edzi le ɣeyiɣi aɖewo me. 
