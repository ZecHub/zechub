<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bipute Weebụsaịtị na IPFS 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Okwu Mmalite nke IPFS 

IPFS (InterPlanetary File System) bụ protocol na netwọkụ peer-to-peer e mere iji mepụta usoro enweghị isi nke ịchekwa na ịkekọrịta faịlụ. 

N'adịghị ka ihe atụ ndị ahịa-server nke ịntanetị, IPFS na-enye ndị ọrụ ohere ịkekọrịta faịlụ ozugbo na ibe ha, kama ịdabere na ihe nkesa dị n'etiti iji chekwaa ma kesaa ọdịnaya. 

Files in IPFS are addressed using *content-addressing*, meaning each file is given a unique hash or CONTENT IDENTIFIER (CID) based on its content, and this hash is used to retrieve the file from the network.

When a user adds a file to IPFS, the file is broken up into small pieces called blocks, and each block is given a CID. These blocks are then stored on different nodes in the network, so that the file can be easily retrieved from multiple sources. 

This ensures redundancy and fault-tolerance while also making it difficult for any one node to become a single point of failure or control. 

Gụọ [Ntinye aka na IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Ịmepụta saịtị gị 

Maka ihe atụ a anyị na-ekebe weebụsaịtị dị mfe. 

[Ebe Nlereanya](https://squirrel.surf)


**Nzọụkwụ 1:** Ọ bụrụ na ị maghị maka imewe weebụ dee isi ọdịnaya maka ebe nrụọrụ weebụ gị gụnyere Aha, Isi Isi nke ederede, na njikọ ndị ọzọ / saịtị & ụkwụ.

**Nzọụkwụ 2:** Jiri a [HTML template!](https://nicepage.com/html-templates) Tinye ederede ị dere n'ụzọ kwekọrọ na ya. Nhọrọ iji mepụta .CSS stylesheet maka ebe nrụọrụ weebụ gị. 

**Nzọụkwụ 3:** Chekwaa ndekọ gị. All .html peeji nke + ihe oyiyi ga-abụ na otu nchekwa. 



## Ịtọlite Njikọ

Budata ma wụnye IPFS site na [Official website]](https://docs.ipfs.tech/install/ipfs-desktop/).



### Tinye IPFS: 

Ọ bụrụ na ị na-eji Ngwa Desktọpụ ị gaghị amalite. 

Iji Terminal ma ọ bụ ngwa ngwa iwu, Run command: <mark>ipfs init </mark>. 



** Tinye nchekwa saịtị na IPFS**: 

Họrọ nchekwa na faịlụ weebụsaịtị gị ma gaa na nhọrọ Tinye nchekwa.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Ọ bụrụ na ị na-eji Terminal, Run command: <mark>ipfs add -r "folder_name"</mark> ịgbakwunye nchekwa ahụ dum na IPFS.


### Ebe Pin na IPFS: 

Ozugbo agbakwunyere faịlụ weebụsaịtị gị na IPFS, ịkwesịrị ** pin ** ha iji hụ na ha ka dị na netwọkụ.

--

Ọ bụrụ na ị na-eji Terminal, Run command: <mark>ipfs pin tinye "hash"</mark> 

"hash" = CID nke nchekwa ị gbakwunyere na nzọụkwụ gara aga.


N'aka nke ọzọ, ị nwekwara ike itinye akwụkwọ ndekọ aha site na iji ọrụ dịka [Pinata](https://pinata.cloud) ma ọ bụ [Dolpin](https://dolpin.io)

Ọ na-azọpụta anyị oge! 

--

### Nweta ebe nrụọrụ weebụ gị na IPFS: 

Your website is now published on IPFS and can be accessed using the hash of the folder. To access your website, you can visit https://ipfs.io/ipfs/"hash" 

"hash" = CID nke nchekwa ahụ.

N'okwu anyị CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) allows you to update the IPFS CID's associated with your website and still serve a static link. It is provided as a key. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Na menu ntọala maka ebe nrụọrụ weebụ gị foldre na ngwa desktọọpụ IPFS họrọ Bipute na IPNS. 

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Key: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Enwekwara ike iji ya lelee saịtị anyị site na ọnụ ụzọ: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Njikọ DNS 
 
E mepụtara saịtị ahụ, ugbu a anyị chọrọ ụzọ iji tụọ URL na ọdịnaya. 

If you already own a web address you are able to add a new record using the TXT record "_dnslink(your domain)". Depending on provider it may auto populate. 

![](https://i.ibb.co/MgRxBHj/example.png)

Ọ ga-ewe oge iji gbasaa site na netwọk tupu ị nwee ike ile ya anya. 

Ekele! Ị melitela ebe nrụọrụ weebụ na-eguzogide ịnyocha. 


** Akụnụba **

[Ihe ndekọ IPFS](https://docs.ipfs.tech)

[Ihe ndekọ IPNS](https://docs.ipfs.tech/concepts/ipns/)

[DNS njikọ Docs](https://dnslink.io/#introduction)
