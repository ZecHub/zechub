<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Na-eje ozi Github Repo na IPFS 

## Okwu Mmalite

N'ime ntuziaka a, anyị na-amụta otu esi emepụta git cloneable URL maka ebe nchekwa Github gị nke ejiri IPFS CID rụọ ọrụ. Nke a bara uru iji hụ na ọdịnaya dị n'agbanyeghị mpaghara mpaghara, nkwụsị nkwụsị na dịka nkwado ndabere nke ozi bara uru!

Rịba ama: Data ebugote na IPFS dị maka * ndị ọrụ netwọk niile. Ị nwere ike ịchọrọ izochi data nkeonwe / ihe nzuzo.


## Wụnye IPFS Kubo

Soro ntuziaka ntinye nyere [ebe a](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

N'ihe atụ a, anyị na-eji Linux, nsụgharị OS ndị ọzọ dị. 

Lelee nrụnye gara nke ọma site na iji "ipfs --version" 


## Ebe nchekwa clone 

Iji malite, họrọ ebe nchekwa Git ịchọrọ ịnabata & mepụta ya:

Gbaa Iwu: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Ugbu a, iji nweta ya njikere ka cloned site IPFS.

cd zechub
git update-server-info


Kpọghe ihe Git:

mv ihe / mkpọ / * mkpọ .
git unpack-objects < *. pack
rm -f *.pack ihe/pack/*

Ime nke a ga-ekwe ka IPFS wepụ ihe ndị ahụ ma ọ bụrụ na ị melite ebe nchekwa Git mgbe e mesịrị.


## Tinye na IPFS 

Ozugbo i mere nke ahụ, ebe nchekwa ahụ dị njikere ka a na-eje ozi. Ihe niile fọdụrụ ime bụ ịgbakwunye ya na IPFS:

$ pwd

/code/myrepo

$ ipfs gbakwunye -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Ihe si na CID pụta: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ọmarịcha! Ugbu a, a na-ebugote ebe nchekwa gị na netwọkụ.


## Klọọ iji IPFS 

Ị ga-enwe ike iweghachite ebe nchekwa github site na iji:

git mmepụta oyiri http://ipfs.io/ipfs/"yourCID"

N'aka nke ọzọ ị nwere ike ịchọ & weghachite site na iji mpaghara IPFS gị. 

Nkọwa ikpeazụ: nchekwa nchekwa na IPFS anaghị enweta mmelite n'akụkụ ezigbo ụlọ nkwakọba ihe github. A na-atụ aro ka ị weghachite nchekwa ahụ mgbe niile. 
