<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Som Github Repo ne IPFS 

## Nnianimu

Wɔ saa akwankyerɛ yi mu no yɛsua sɛdeɛ yɛbɛbɔ git cloneable URL ama wo Github akoraeɛ a wɔde IPFS CID som. Eyi ho wɔ mfaso sɛ wobɛhwɛ ahu sɛ nneɛma a ɛwɔ mu no wɔ hɔ a asasesin a ɛwɔ ɔmantam, censorship resistance ne sɛ perisistent backup of valuable information mfa ho!

Hyɛ no nsow: Data a wɔde akɔ IPFS no wɔ hɔ ma *wɔn nyinaa* network dwumadiefoɔ. Ebia wobɛpɛ sɛ wode w’ankasa/nsɛm a ɛho hia sie wɔ wo mpɔtam hɔ.


## Fa IPFS Kubo no hyɛ mu

Di instɔlehyɛn akwankyerɛ a wɔde ama no akyi [ha](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Wɔ saa nhwɛsoɔ yi mu no yɛde Linux di dwuma, OS nkyerɛaseɛ foforɔ wɔ hɔ. 

Hwɛ sɛ instɔlehyɛn ahorow no atumi de "ipfs --version" adi dwuma. 


## Clone Adekorabea 

Sɛ wopɛ sɛ wohyɛ aseɛ a, paw Git akoraeɛ a wopɛ sɛ wo host & clone no:

Run Ahyɛde: "git clone." https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Afei, sɛnea ɛbɛyɛ a ɛbɛyɛ krado sɛ wɔbɛfa IPFS so ayɛ no clone.

cd zechub na ɛyɛ
git update-server-nsɛm a ɛfa ho


Yi Git nneɛma no mu:

mv nneɛma/pack/*.pack .
git yiyi-nneɛma < *.pack
rm -f *.pack nneɛma/pack/* .

Wei a wobɛyɛ no bɛma IPFS atumi deduplicate nneɛma sɛ wo update Git repository no akyiri yi a.


## Fa ka IPFS ho 

Sɛ woyɛ saa wie a, saa adekorabea no ayɛ krado sɛ wɔbɛsom. Nea aka ara ne sɛ wode bɛka IPFS ho:

$ pwd

/kode/myrepo na ɛwɔ hɔ

$ ipfs de -r ka ho.

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID a efi mu ba ne: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Adenim! Seesei wɔde wo repository no akɔ network no so.


## Clone denam IPFS so 

Afei ɛsɛ sɛ wotumi gye github akoraeɛ no denam:

git clone a wɔde yɛ nneɛma http://ipfs.io/ipfs/"yourCID"

Sɛnea ɛbɛyɛ a wobɛtumi ahwehwɛ & agye denam wo mpɔtam hɔ IPFS node no so. 

Hyɛ no nsow a etwa to: Repo folda a ɛwɔ IPFS so no nnya nsɛm foforo wɔ github akorae ankasa no nkyɛn. Wɔkamfo kyerɛ sɛ wobɛsan de folda no akɔ so bere ne bere mu. 
