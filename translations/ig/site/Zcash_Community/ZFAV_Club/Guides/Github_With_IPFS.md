<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jiri IPFS nye GitHub Repo

## Mmalite

N'ime nduzi a, anyị ga-amụta otu esi emepụta URL nke a pụrụ iji git clone maka ebe nchekwa [repository] GitHub gị, nke a na-enye site n'iji IPFS CID. Nke a bara uru iji hụ na ọdịnaya dị n'agbanyeghị mpaghara ala, iguzogide mmachibido, nakwa dị ka nkwado ndabere na-adịgide adịgide maka ozi bara uru!

Note: Data e tinyere na IPFS dịịrị *ndị ọrụ netwọk [network]* niile. Ị nwere ike ịchọ iji Nzobe ederede [encryption] zoo data nkeonwe/nwere mmetụta n'ógbè gị.


## Wụnye IPFS Kubo

Soro ntuziaka nrụnye e nyere [ebe a](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

N'ihe atụ a, anyị na-eji Linux, ụdị OS ndị ọzọ dịkwa.

Lelee na nrụnye gara nke ọma site n'iji "ipfs --version"


## Clone Ebe nchekwa

Iji malite, họrọ ebe nchekwa Git ịchọrọ ịnabata ma mee clone ya:

Gbaa Iwu: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Ugbu a, iji mee ka ọ dị njikere ka e mee clone ya site na IPFS.

cd zechub
git update-server-info


Kọwaa objects Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Ime nke a ga-ekwe ka IPFS wepụ ihe ndị oyiri ma ọ bụrụ na ị melite ebe nchekwa Git ma emechaa.


## Tinye na IPFS

Ozugbo i mechara nke ahụ, ebe nchekwa ahụ adịla njikere ka e nye ya. Ihe fọdụrụ bụ itinye ya na IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID sitere na ya: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Ọmarịcha! Ugbu a e tinyela ebe nchekwa gị na netwọk.


## Clone site na IPFS

Ị ga-enwe ike ugbu a iweghachite ebe nchekwa github site n'iji:

git clone http://ipfs.io/ipfs/"yourCID"

N'aka nke ọzọ, ị nwere ike ịchọ ma weghachite ya site n'iji node IPFS dị n'ógbè gị.

Note ikpeazụ: Folda repo dị na IPFS anaghị anata mmelite n'otu oge na ebe nchekwa github n'ezie. A na-atụ aro ka itinyeghachi folda ahụ n'oge oge.
