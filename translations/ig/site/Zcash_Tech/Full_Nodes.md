<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nọmba zuru ezu

Full Node bụ sọftụwia nke na-agbazi nnomi zuru oke nke ngọngọ cryptocurrency ọ bụla na-enye ohere ịnweta atụmatụ protocol.

Ọ na-ejide ihe ndekọ zuru ezu nke azụmahịa ọ bụla nke mere kemgbe mmalite ma nwee ike nyochaa izi ezi nke azụmahịa ọhụrụ na ngọngọ ndị agbakwunyere na blockchain.

## Zcashd

Zcashd bụ ugbu a bụ isi mmejuputa Full Node nke Zcash na-eji eme ihe, nke ụlọ ọrụ Electric Coin Company mepụtara ma debe ya.

Zcashd exposes a set of API's via its RPC interface. These API's provide functions that allow external applications to interact with the node.

[Lightwalletd](https://github.com/zcash/lightwalletd) bụ ihe atụ nke ngwa nke na-eji ọnụ zuru ezu iji mee ka ndị mmepe nwee ike ịmepụta ma debe obere akpa ego mkpuchi mkpuchi na-enweghị mkparịta ụka na Zcashd.

[Nchịkọta zuru ezu nke iwu RPC akwadoro](https://zcash.github.io/rpc/)

[Akwụkwọ Zcashd](https://zcash.github.io/zcash/)


### Malite otu Node (Linux)

- Wụnye Dependencies 

      sudo apt melite

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Klọọ ikpeazụ wepụtara, nlele, nhazi na iwulite:

      git mmepụta oyiri https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$ ((nproc)

- Sync Blockchain (nwere ike iwe ọtụtụ awa)

    Iji malite ogwe ọsọ:

      ./src/zcashd

- A na-echekwa igodo nzuzo na ~/.zcash/wallet.dat

[Nduzi maka Zcashd na Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra bụ mmejuputa iwu zuru oke maka Zcash Protocol nke Zcash Foundation mepụtara. 

A na-anwale ya ugbu a ma ọ ka bụ nnwale.

E nwere isi ihe abụọ dị na Zebra. Ihe ndị ahịa nke na-ahụ maka nyocha nke blockchain na ikpe ikpe nke azụmahịa. 

The second part is the zebra command line tool. This tool manages spending keys, addresses & communicates with the Client component in zebrad to provide basic wallet functionality.

A na-akpọ onye ọ bụla nwere mmasị ịnwale Zebra iji gwupụta ngọngọ ka ọ sonye na R & D nkesa discord. Ọzọkwa jide n'aka na ị gụọ akwụkwọ Zebra maka ntuziaka ntọala. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Akwụkwọ Zebra](https://zebra.zfnd.org) 

[Nkwekọrịta adịghị mma](https://discord.gg/uvEdHsrb)



## Ihe Ndị E Kwuru na Ya

Site n'ịgba ọsọ zuru oke ị na-enyere aka iwusi netwọk zcash ike site n'ikwado ya decentralization. 

Nke a na-enyere aka igbochi njikwa mmegide ma mee ka netwọk ahụ nwee ike iguzogide ụfọdụ ụdị nkwụsị.

DNS seeders expose a list of other reliable nodes via a built-in server. This allows transactions to propagate throughout the network. 

### Nkọwapụta Ntanetị

Ndị a bụ ihe atụ nke nyiwe nke na-enye ohere ịnweta data Zcash Network:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Otu oche](https://blockchair.com/zcash)

Ị nwekwara ike inye aka na mmepe nke netwọk site na-agba ọsọ ule ma ọ bụ na-atụ aro ọhụrụ ndozi & enye metrics. 



### Igwe na-egwu ala

Ndị na-egwupụta akụ na-achọ ọnụ zuru ezu iji nweta RPC niile metụtara igwupụta dị ka getblocktemplate & getmininginfo. 

Zcashd also enables mining to shielded coinbase. Miners and mining pools have the option to mine directly to accumulate shielded ZEC in a z-address by default. 

Gụọ [Ntuziaka Mgbapụta](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ma ọ bụ Jikọọ na Community Forum page maka [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Nzuzo nzuzo 

Running a full node allows you to independently verify all transactions and blocks on the Zcash network.

Na-agba ọsọ zuru ezu na-ezere ụfọdụ ihe ize ndụ nzuzo metụtara iji ọrụ ndị ọzọ iji nyochaa azụmahịa maka gị.

Iji ọnụ gị na-enyekwa ohere ijikọ na netwọk site na [Tor](https://zcash.github.io/zcash/user/tor.html).
Nke a nwere uru ọzọ nke ikwe ka ndị ọrụ ndị ọzọ jikọọ na nzuzo na adreesị node .onion gị.


Enyemaka ọ dị gị mkpa?

Gụọ [Ihe Ndị E Dere Iji Kwado Ya]](https://zcash.readthedocs.io/en/latest/)

Jikọọ anyị [Discord Sever]](https://discord.gg/zcash) maọbụ kpọtụrụ anyị na [twitter]](https://twitter.com/ZecHub)




---

**Protected terms (keep in English):** `Zaino` `Zallet`
