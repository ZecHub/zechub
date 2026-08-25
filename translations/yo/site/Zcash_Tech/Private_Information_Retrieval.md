# Gbígba Ìsọfúnni Àdáni padà

## TL;DR

- Àtúnṣe ìsọfúnni àdáni, tàbí PIR, jẹ́ kí èlò kan mú ohunkan wá láti inú ibi-ìpamọ̀ àwọn oníṣẹ láìjẹ́ pé olùtọ́jú náà mọ èyí tí a béèrè fún.
- Zcash nílò èyí nítorí pé àpò ìpamọ́ kan kò lè béèrè lọ́wọ́ àwọn oníṣẹ̀ tí ìdánwò wọn jẹ ti òun láì fi ara rẹ̀ hàn.
- Loni awọn apamọwọ gba lati ayelujara ati ki o àyẹwò data siwaju sii ju ti won nilo, eyi ni a pataki idi isọdọkan jẹ lọra
- PIR yoo jẹ ki apamọwọ kan mu data tirẹ nikan ni ikọkọ, yiyọ idena naa lakoko ti o n tọju asiri alainibajẹ.
- O jẹ agbegbe iwadii ti nṣiṣe lọwọ fun Zcash, o lagbara ninu imọran, ati ṣiṣe ni iṣe si awọn apamọwọ gidi.

<br/>

## Ta ni èyí wà fún?

- Ẹnikẹni ti o ba ṣe iyalẹnu bi apamọwọ ikọkọ kan ṣe le wa awọn owó tirẹ laisi didasilẹ eyi ti wọn jẹ.
- Awọn tuntun ti o tẹsiwaju lati ri PIR mẹnuba lẹgbẹẹ iṣẹ iṣiro Zcash.
- Àwọn olùkà tí ó fẹ́ kókó náà lákọ̀ọ́kọ́ àti ẹ̀rọ ìkọ̀wé ní abẹ́ rẹ̀ lẹ́yìn èyí.

<br/>

## Ìṣòro tí PIR yanjú fún Zcash

Zcash fi ẹni tí ìnáwó náà jẹ́ fún pamọ̀. Ìdáàbòbò yìí dá ìbéèrè kan tó ń dààmú sílẹ̀: bí nẹ́tàwọ̀n kò bá lè rí àwọn ìnájà ti ó wà lọ́dọ̀ rẹ, báwo ni àpòòwé tìrẹ ṣe máa wá wọn?

Today the answer is blunt. A wallet cannot ask a server which transactions are mine, because that question would reveal exactly what Zcash is trying to hide. So instead the wallet downloads a large amount of data and tests each item locally to see what belongs to it. It works, and it preserves privacy, but it is slow and heavy. This scanning is one of the main reasons wallet syncing can feel sluggish.

Ohun ti o dara julọ ni ọna fun apamọwọ lati beere olupin kan fun gangan data tirẹ, ati gba rẹ, laisi olupin naa kọ ẹkọ ohun ti a beere. Iyẹn jẹ deede kini gbigba alaye ikọkọ pese.

<br/>

## Kí ni PIR?

Ìwífún ìsọ̀rọ̀ àdáni jẹ́ ọ̀nà ìdánimọ̀ tí ó ń jé kí oníṣe ka àkọsílẹ̀ kan láti inú ibi-ìpamọ́ àwọn ohun èlò alágbàtà láìfi hàn sí olùrànlọ́wọ́ náà èyí tó kà.

fojú inú wo ilé ìkàwé kan níbi tí o ti lè rí ìwé tóo fẹ́ gbà, ṣùgbọ́n olùtọ̀nà ọ̀hún kò mọ èyí tí wọ́n fún ẹ. ìwọ ni yóò gba ohun náà, àti pé àwọn nǹkan rẹ ò ní jẹ àjèjì sí ẹnikẹ́ni. PIR jẹ́ èrò orí ìṣirò nípa irú ìmọ̀ràn bẹ́ẹ̀, a sì lò ó lórí báńkì èyíkéyìí.

The concept has been studied in cryptography for decades. It was first introduced in 1995 by Chor, Goldreich, Kushilevitz, and Sudan, who described the multiple server approach, and the first single server version followed in 1997 from Kushilevitz and Ostrovsky. It is not something Zcash invented, it is an established field that Zcash is now applying to a real and stubborn problem.

<br/>

## Bí PIR ṣe ń ṣiṣẹ́, ní ìpele àkọ́kọ́

Ọ̀nà méjì ló wà láti kọ́ PIR, ìyàtọ̀ sì ṣe pàtàkì.

Àkọ́kọ́ máa ń lo ọ̀pọ̀lọpọ̀ àwọn servers. Olùgbérè náà rán gbogbo àwọn server lọ láti ṣe ìwádìí, tí yóò sì pa ìdáhùn wọn pọ̀ ní àdúgbò. Kò sí sérver kan ṣoṣo tó rí ohun tí wọ́n béèrè fún yìí mọ́. Èyí jẹ́ òótọ́ o, ṣùgbọ́n ó dá lórí wípé àwọn sérvérì kò bá ara wọn lòdì-kejì, èyí ti ó ṣòro lati ṣèlérí nínú ayé gidi.

Nibi, onibara nlo ohun elo pataki ti a pe ni homomorphic encryption. Eyi jẹ itọsọna to wulo julọ fun awọn imuse gidi nitori ko nilo ọpọlọpọ awọn olupin ti kii ṣe collude .

<br/>

## Ọna náà: ìdìkọ̀ọ́pọ̀ homomorphic encryption

Homomorphic encryption je iru ifasilẹ ti o jẹ ki olupin kan ṣe iṣiro lori data lakoko ti o wa ni titẹ sii. Olupese naa nmu idahun itọkasi to tọ laisi ri awọn iye ipilẹ.

Eyi ni ero ti o wa lẹhin PIR olupin-ọkan kan ṣe ọna yii. Onibara fẹ nkan nọmba mẹta lati inu atokọ kan. O kọ ibeere kan eyiti, ni ipa, jẹ bẹẹni ti a fi pamọ fun ipo kẹta ati pe ko si ohun elo fun gbogbo awọn ipo miiran. Si olupin naa, ìbéèrè yi nikan ni ariwo alainiye, ko le sọ eyi ti ipo mu bẹẹni.

The server then combines its database with this encrypted query using the special properties of homomorphic encryption, multiplying each stored item by the matching encrypted yes or no and adding the results together. What comes out is a single encrypted package that contains exactly the item the client wanted, and nothing reveals which one it was. The client decrypts that package and reads its item. The server has answered the question without ever knowing the question.

Ẹ̀dà tó lágbára jù, tí a pè ní PIR symmetric, fi ìdánilójú kejì kún un: oníbàárà mọ ohun tó béèrè fún nìkan ni kò sì mọ nǹkankan nípa àwọn àkọsílẹ̀ mìíràn nínú ibi ìpamọ́. Èyí dáàbò bo ibùdó-ìpèsè náà àti onítọ̀hún pàápàá.

<br/>

## Àyẹ̀wò tó jinlẹ̀ fún àwọn òǹkàwé tí wọ́n mọ̀ nípa ẹ̀rọ kòmpútà.

Modern single-server schemes are built on lattice cryptography, most commonly the learning with errors assumption. The client's query is a vector of ciphertexts, an encryption of one at the target index and zero elsewhere, and the encryption is additively homomorphic, so the server can add ciphertexts and multiply them by plaintext database entries without decrypting.

Olùgbéejáde náà máa ń ṣe ìwádìí nípa ibi-ìpamọ́ bí matrix, ó sì fi àdìpọ̀ àwọn ohun tí a ti kọ sínú ìwé yìí síbi tó yẹ. Nítorí pé ìbéèrè kò yàtọ̀ sí ariwo àìròtójúṣe, olúgbéeṣé kì í rí ìmọ̀ kankan lórí àmì ọ̀rọ̀ inú rẹ̀.

The historic obstacle has always been cost. Naively, the server must touch every entry in the database for each query, which is expensive in computation, and the ciphertexts are large, which is expensive in bandwidth. Recent research attacks this with preprocessing, schemes such as SimplePIR and FrodoPIR let the server prepare the database ahead of time and hand each client a small hint, pushing much of the work into an offline phase so that live queries become fast. A useful side benefit is that lattice-based constructions are also considered resistant to quantum attacks, which aligns with Zcash's wider move toward post-quantum privacy.

<br/>

## PIR ni Zcash

PIR jẹ apakan ti igbiyanju lati ṣe Zcash ni ikọkọ ati iyara lori iwọn.

The wallet scanning bottleneck described earlier is the target. Work at the Valar Group is developing private information retrieval techniques so that a wallet can fetch its own data from a server without the server learning which entries were requested. One concrete application is checking nullifiers privately. A nullifier is a unique marker published when a note is spent, which stops the same funds being spent twice. A wallet often needs to check whether a given nullifier has appeared yet, in other words whether a note is still unspent, and doing that through a server today can leak which note is being asked about. Private information retrieval lets the wallet ask that question without revealing which nullifier it cares about. This sits alongside other scaling work, including Project Tachyon and new node software, aimed at removing the performance limits that hold back private wallets today.

O ṣe pataki lati jẹ olóòótọ́ nípa ipele. Eyi ni iwadi ati imọ-ẹrọ ti nṣiṣe lọwọ, kii ṣe ẹya pari kan, fifunni. Erongba naa wa daradara ati itọsọna ti ṣeto, ṣugbọn ṣiṣe PIR munadoko to fun awọn apamọwọ lojoojumọ lori awọn ẹrọ lasan ni gangan apakan lile ti a ṣiṣẹ lori bayi.

<br/>

## Àwọn èrò òdì tó wọ́pọ̀ nípa àwọn èèyàn

- PIR pamọ ohun ti o beere, ko ṣe dandan lati farapamọ pe o kan si olupin naa rara, metadata ipele nẹtiwọki jẹ ibakcdun ọtọtọ
- PIR kìí ṣe àrà òdì sí Zcash, ó jẹ́ ohun èlò ìkọ̀wé tí wọ́n ń lò fún gbogbo ènìyàn ti Zcash fi n ṣòfin láti dáàbò bo ẹrù owó.
- Ṣiṣiṣẹpọ iyara lati PIR jẹ ibi-afẹde ti o wa ni ilọsiwaju, kii ṣe ẹya tẹlẹ ninu awọn apamọwọ
- Gbigba ohun gbogbo silẹ ati lilọ kiri ni agbegbe, ọna lọwọlọwọ jẹ ikọkọ ṣugbọn o lọra. PIR ṣe ifọkansi lati tọju asiri lakoko ti n yọkuro irẹlẹ naa

<br/>

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Ìṣètò Ọ̀rọ̀-ìpamọ́ Zcash Wallet](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - ìdí tí ìfọwọ́sowọ́pọ̀ fi ń ṣiṣẹ́ bó ṣe rí lónìí
- [Àwọn Ìkànnì Lightwallet Nodes](https://zechub.wiki/zcash-tech/lightwallet-nodes) - awọn ina onibara awoṣe PIR yoo mu dara si
- [àwọn zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - awọn miiran pataki cryptographic ọpa sile Zcash ìpamọ
- [Ààbò Lẹ́yìn Ìmúninímù-Ìwéko](https://zechub.wiki/zcash-tech/post-quantum-security) - ìdí tí àwọn ọ̀nà tó dá lórí lílo àgbá ṣe pàtàkì fún ọjọ́ iwájú
