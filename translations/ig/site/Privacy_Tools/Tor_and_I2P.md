<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ihe Mere Nzuzo Ji Dị Mkpa

Na oge dijitalụ, ichebe nzuzo gị](https://www.privacyguides.org/en/) has become increasingly vital. While some may view privacy as a lost cause, it is not. Your privacy is at stake and should be a concern. Privacy holds significant value as it relates to power, and ensuring that power is wielded responsibly is crucial.

## Tor & I2P Teknụzụ

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) is a proxy tool that ustilizes the Tor network to establish connections for applications. Torbot achieves this by routing their traffic through Tor, thus enhancing [privacy and anonymity](https://www.torproject.org/) maka ngwa ndị a.

## I2P Network

Netwọk I2P, nke a makwaara dị ka [Invisible Internet Project](https://geti2p.net/en/about/intro), is a fully encrypted peer-to-peer overlay network. It ensures that the contents, source, and destination of messages are hidden from observers. In other words, nobody can see the origin or destination of the traffic or the actual contents of the messages being transmitted. The encryption used in I2P ensures a high level of privacy and anonymity for its users.

## Tor na I2P na-ekerịta ihe ndị yiri ya mana ha nwekwara ọdịiche dị mkpa. 

Both Tor and I2P are decentralized and anonymous peer-to-peer networks, but I2P provides higher levels of security compared to Tor. However, I2P is primarily designed for accessing services like email, chat, and torrenting within its network and cannot be used to access the regular internet. On the other hand, Tor allows users to access the deep web, just like I2P, but it also functions as a regular browser for accessing websites on the surface web.

*Nkọwa: Maka ozi ndị ọzọ gbasara myirịta na ọdịiche nke Tor & I2P gaa [ebe a](https://geti2p.net/en/comparison/tor)*

## Ijikọta Tor na Ywallet na Smartphone

Orbot is a no-cost virtual private network (VPN) designed for smartphones that directs traffic from all applications on your device through the Tor network.

Soro ntuziaka ndị a n'okpuru iji jikọọ Tor na Zcash Wallet *(Ywallet) *:

1.  Budata ma wụnye *Orbot* site na ụlọ ahịa ngwa.

2.  Mgbe insatllation, ozi ekele ga-apụta. Gaa n'ihu na *Orbot* home page ma pịa *'Tor Enabled Apps'.* 

3. Nke a ga-eme ka ibe dị na ihuenyo na-egosi ngwa Tor-dakọtara. Chọọ maka *Ywallet* App ma jide n'aka na ahọrọ ya.

4. Arịrịọ njikọ maka ịtọlite VPN ga-apụta, nke ga-ekwe ka *Orbot* nyochaa okporo ụzọ netwọk. * Orbot* ga-amalite ozugbo a kwadoro ikike a. 

5. Lelee ogwe ọrụ ma ọ bụ Orbot homepage iji nyochaa na Tor na-agba ọsọ, a kwadoro nke a mgbe ị hụrụ 'Ejikọtara na netwọk Tor'.

* N'ihi na video nkuzi wacth [ebe a](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Mara: Ọ bụrụ na netwọkụ mkpanaka gị gbochiri Tor, ị nwere ike iji Bridge Server dị ka ụzọ ọzọ iji jikọọ.*


## Otu esi edozi obere akpa Zcash na Torbot na PC / Desktọpụ

## Nkwado Tor na Zcash?

* Enwere ike ibudata ihe nchọgharị Tor site na ebe nrụọrụ weebụ gọọmentị, ị nwere ike ịnweta njikọ ahụ [ebe a](https://www.torproject.org/download/).

 Ụzọ kachasị adaba maka ịwụnye Tor bụ site na Tor Browser Bundle. Ọ bụrụ na ịchọrọ nrụnye na-enweghị isi, ị nwere ike ịhọrọ ịwụnye daemon Tor iche. 

*Note: By default, Tor Browser bundle esxposes a SOCKS listtener on tcp/9150 and Tor daemon exposes the SOCKS listener on tcp/9050.*

* Rịba ama nrụnye [ntụziaka](https://support.torproject.org/apt/) akọwapụtara maka sistemụ arụmọrụ gị dị ka enyere site na Tor Project.

## Wụnye obere akpa Zcashd

Zcashd is the official linux-based full-node wallet which is updated and maintained by core developers from the Electric coin Co. It is intended for users who may want to mine and validate zcash transactions, as well as sending and receing Zcash.

* Enwere ike ịchọta ebe nrụọrụ weebụ gọọmentị iji budata obere akpa Zcashd [ebe a]](https://electriccoin.co/zcashd/) 

* Wụnye obere akpa: Njikọ na vidiyo nkuzi [ebe a]](https://www.youtube.com/watch?v=hTKL0jPu7X0) nke ndị mmepe obere akpa Zcash nyere.

##  Gbaa Zcashd n'elu Tor 

* Iji hazie Zcashd iji jiri proxy Tor SOCKS, ị nwere ike ịgbakwunye arụmụka akara iwu -proxy na iwu daemon.

 Dị ka ihe atụ:

  $ zcashd - proxy=127.0.0.1:9050
      
N'aka nke ọzọ, gbakwunye ahịrị na-esonụ na faịlụ zcash.conf:

  proxy=127.0.0.1:9050

Maka mgbanwe nhazi ka ọ rụọ ọrụ, a na-atụ aro ka ịmalitegharịa zcashd.

Note that this assumes that the Tor daemon is being used. In case the Tor Browser Bundle is being used, replace 9050 with 9150.

Tụkwasị na nke ahụ, ị nwere ike ịgbakwunye akara iwu -listenonion iji mee ka daemon mepụta adreesị .onion nke a ga-enweta ọnụ gị.
