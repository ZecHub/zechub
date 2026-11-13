<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bipụta Weebụsaịtị na IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Mmalite banyere IPFS 

IPFS (InterPlanetary File System) bụ protocol na netwọkụ peer-to-peer e mere iji wulite usoro decentralized nke ịchekwa na ikekọrịta faịlụ. 

N'adịghị ka usoro client-server ọdịnala nke ịntanetị, IPFS na-enye ndị ọrụ ohere ịkekọrịta faịlụ ozugbo n'etiti onwe ha, kama ịdabere na sava etiti iji chekwaa ma kesaa ọdịnaya. 

A na-eji *ịkpọ aha dabere n’ọdịnaya [content-addressing]* achọpụta faịlụ dị na IPFS, nke pụtara na a na-enye faịlụ ọ bụla hash pụrụ iche ma ọ bụ NJIRIMARA ỌDỊNAYA (CID) dabere n’ọdịnaya ya, a na-ejikwa hash a weghachite faịlụ ahụ n’ime netwọkụ.

IPFS na-echekwa ọdịnaya dịka blocks a na-amata site na CIDs. Itinye faịlụ na-echekwa ya na node gị; ọ naghị eji aka ya depụta ya gaa na nodes ndị ọzọ. Debe otu mbipụta a na-enweta n’ịntanetị, ma ọ bụ hazie ntụtụ n’ebe dị anya (remote pinning), ka ndị ọzọ na-agụ ya nwee ike weghachite ya. Lee [IPFS ịdịgide (persistence)](https://docs.ipfs.tech/concepts/persistence/).

Gụọ [Mmalite banyere IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Ịmepụta Saịtị Gị 

Maka ihe atụ a, anyị na-emepụta weebụsaịtị dị mfe. 

[Saịtị Ihe Nlereanya](https://squirrel.surf)


**Nzọụkwụ 1:** Ọ bụrụ na ị maghị nke ọma maka imewe weebụ, dee ọdịnaya bụ isi maka weebụsaịtị gị, tinyere Aha, Akụkụ ederede bụ isi, njikọ gaa na ibe/saịtị ndị ọzọ na footer.

**Nzọụkwụ 2:** Jiri [template HTML!](https://nicepage.com/html-templates). Tapawa ederede ị dere n’ebe kwesịrị ekwesị. Ị nwekwara ike ịmepụta stylesheet .CSS maka weebụsaịtị gị. 

**Nzọụkwụ 3:** Tinye ibe mbụ (homepage) gị n'ime `index.html` na mgbọrọgwụ (root) folda saịtị ahụ. Tinyekwa onyonyo ya na CSS ya. Jiri ụzọ mmekọ (relative paths) dị ka `style.css` ka ha rụọkwa ọrụ n'okpuru URL gateway IPFS.

## Ịtọlite Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) na-elekọta node ahụ maka gị. Biko hapụ ya ka ọ na-arụ ọrụ mgbe ị na-ekesa saịtị gị.

Maka [ụzọ command-line (command-line route)](https://docs.ipfs.tech/how-to/command-line-quick-start/), malite repository ọhụrụ otu ugboro:

```sh
ipfs init
```

Mgbe ahụ, malite node ahụ ma hapụ terminal a ka ọ nọrọ na-emeghe:

```sh
ipfs daemon
```

Gbaa iwu ndị fọdụrụ na terminal nke abụọ. Ebidola daemon nke abụọ ma ọ bụrụ na IPFS Desktop na-elekọta repository a ugbu a.

**Tinye Folder Saịtị na IPFS**: 

Na IPFS Desktop, họrọ folda nwere faịlụ weebụsaịtị gị site n'iji nhọrọ Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Maka ụzọ CLI (command-line interface, ihe ntanetị nke ị na-eji ederede enye iwu), gbaa nke a site na ndekọ nne (parent directory) nke folda saịtị gị:

```sh
ipfs add -r folder_name
```

Dochie `folder_name` na aha folda gị (tinye aha nwere oghere n'ime akara ngụkọ). Chekwaa CID dị n'ahịrị `added ... folder_name` ikpeazụ: ọ na-amata ndekọ (directory) ahụ dum, ọ bụghị naanị `index.html`.

### Tinye Pin na Saịtị na IPFS: 

CLI `ipfs add` command na-ama pin (ịkpachi) ọdịnaya ndị a bubatara n'ime kọmputa gị na ndabara. Lelee pin nke folder ahụ site na:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Dochie `YOUR_FOLDER_CID` na CID sitere na nzọụkwụ gara aga; ihe ga-apụta kwesịrị ịsị `recursive`. Ịpịn (pinning) na-echebe mbipụta node a ka a ghara ihichapụ ya site na nhicha ebe nchekwa (garbage collection), mana ọ naghị eme ka kọmputa gbanyụrụ agbanyụ nọrọ n'ịntanetị. Ka ọ dịrị mgbe node gị anọghị n'ịntanetị, hazie [ịpịn n'ebe dị anya](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ma gbaa mbọ hụ na ọrụ ahụ dị n'ebe dị anya emechaala ịpịn.

### Nweta weebụsaịtị gị na IPFS: 

Buru ụzọ lelee saịtị gị site na ọnụ ụzọ mpaghara (local gateway) dị na `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (jiri port nke ọnụ ụzọ ahụ daemon gị bipụtara ma ọ bụrụ na ọ dị iche). Akara slash dị na njedebe na-eme ka njikọ ndị metụtara (relative links) dozie n'ime ndekọ ahụ.

Ọnụ ụzọ ọha (public gateway) dịka `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` nwere ike inye ya ozugbo ọ nwere ike iweta ọdịnaya ahụ site na node a na-enweta. Nlele mbụ na mpaghara gị (local preview) gara nke ọma egosighị na ọ dị maka ọha.

N’ọnọdụ anyị, CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) na-enye gị ohere imelite CID IPFS ndị jikọtara na weebụsaịtị gị, ma ka na-enye njikọ kwụụrụ onwe ya. A na-enye ya dịka igodo. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

N’ime menu settings maka foldre saịtị gị na ngwa IPFS desktọpụ, họrọ Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Igodo: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

A pụkwara iji ya lee saịtị anyị site na gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Njikọ DNS 
 
E mepụtala saịtị ahụ; ugbu a, anyị chọrọ ụzọ iji tụọ URL gaa n’ọdịnaya ahụ. 

Maka `example.com`, tinye ndekọ DNS (DNS record) a, were CID nke ndekọ faịlụ (directory) gị dochie `YOUR_FOLDER_CID`:

| Ụdị | Aha | Uru |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Ụfọdụ ndị na-enye ọrụ DNS (DNS providers) na-agbakwunye zone ahụ n'onwe ha; tinye naanị `_dnslink` n'ebe ahụ. Ọ bụrụ na ị na-eji aha IPNS dị n'elu, uru ahụ nwekwara ike ịbụ `dnslink=/ipns/YOUR_IPNS_NAME`. Lee [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Mgbe DNS gbasasịrị (DNS propagation), nwalee `https://ipfs.io/ipns/example.com/`. Iji jee ozi saịtị ahụ ozugbo na `https://example.com/` chọkwara gateway nwere ike DNSLink na nhazi HTTPS; naanị ndekọ TXT anaghị ahazi ihe ndị ahụ. Soro [ntụziaka custom-domain](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Ekele! Ịtọlitela weebụsaịtị na-eguzogide censorship. 


**Akụrụngwa**

[Dokumenteshọn IPFS](https://docs.ipfs.tech)

[Dokumenteshọn IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Docs njikọ DNS](https://dnslink.io/#introduction)
