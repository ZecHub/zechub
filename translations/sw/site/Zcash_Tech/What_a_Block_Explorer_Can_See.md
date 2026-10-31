<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Kile ambacho kichunguzi cha block [block explorer] kinaweza kuona kwenye Zcash

## Kwa ufupi

- Kwenye Bitcoin, kichunguzi cha block huonyesha kila kitu: mtumaji, mpokeaji na kiasi.
- Kwenye Zcash, hilo ni kweli tu kwa shughuli za uwazi [transparent] (t-address).
- Kichunguzi kinaweza kuona pesa ikiingia na kutoka kwenye bwawa la faragha [shielded pool], lakini si kinachotokea ndani yake.
- Miamala ya faragha kabisa [fully shielded] (z hadi z) haifichui mtumaji, mpokeaji wala kiasi.
- Takwimu yoyote ya umma ya “kiwango cha ulinzi” ni kiwango cha chini, kwa sababu shughuli za faragha kabisa hazionekani kutoka nje.

---

## Aina mbili za anwani

Zcash ina aina mbili za anwani [addresses].

**Anwani ya uwazi [transparent address]** huanza na `t` na hufanya kazi kama anwani ya Bitcoin. Salio na malipo [payments] ni ya umma.

**Anwani ya faragha [shielded address]** huanza na `z` na inalindwa na mathibitisho ya maarifa sifuri [zero-knowledge proofs]. Mtandao unaweza kuthibitisha kuwa malipo ya faragha ni halali bila kufichua mtumaji, mpokeaji au kiasi.

Kwa sababu kuna aina mbili, thamani inaweza kuhamishwa kwa njia nne: uwazi hadi uwazi (t hadi t), uwazi hadi faragha (t hadi z, huitwa shielding), faragha hadi uwazi (z hadi t, huitwa deshielding), na faragha hadi faragha (z hadi z, ya faragha kabisa).

## Kile ambacho kichunguzi kinaweza kuona

Kichunguzi cha umma kama vile [ZecBlock](https://zecblock.com/) kinaweza kusoma waziwazi:

- Malipo yoyote ya uwazi kabisa (t hadi t), kuanzia mwanzo hadi mwisho.
- Pesa inayoingia kwenye bwawa la faragha (upande wa uwazi na kiasi).
- Pesa inayotoka kwenye bwawa la faragha (upande wa uwazi na kiasi).
- Jumla ya ZEC inayoshikiliwa katika kila bwawa la faragha, ambayo ni ya umma ili mtandao uweze kuthibitisha kuwa hakuna sarafu zilizoundwa kutoka pasipo kitu.

Kwa ufupi, kingo za bwawa la faragha zinaonekana. Unaweza kutazama thamani ikivuka kuingia na kutoka.

## Kile ambacho kichunguzi hakiwezi kuona

Kichunguzi cha umma hakiwezi kusoma:

- Miamala ya faragha kabisa (z hadi z). Mtumaji, mpokeaji na kiasi hubaki siri.
- Mtumaji au mpokeaji aliye nyuma ya malipo yoyote ya faragha.
- Salio la anwani binafsi ya faragha.
- Kinachotokea kwa fedha pindi zinapokuwa ndani ya bwawa.

Uliza data ghafi na sehemu za mtumaji na mpokeaji wa faragha hurudi zikiwa tupu. Kichunguzi hakifichi hili kwa hiari. Halikuwa kamwe kwenye mnyororo [chain] wa umma katika muundo unaosomeka. Taarifa zimesimbwa fiche, na ni mtu mwenye ufunguo sahihi wa kutazama [viewing key] pekee anayeweza kuzisoma.

## Kwa nini hili ni muhimu

**Faragha yako [privacy] hutokana na kriptografia, si kwa kuamini kampuni.** Mtoa data hawezi kutazama ndani ya muamala wa faragha hata kama anataka.

**Nambari za umma za kiwango cha ulinzi hupunguza hesabu ya faragha.** Watafiti wanaweza kupima tu kinachovuka mpaka wa umma, kwa hiyo kiasi halisi cha shughuli za faragha ni angalau kile wanachoripoti, na kwa kawaida ni zaidi.

**Bwawa kubwa la faragha humlinda kila mtu.** Kadiri watu wengi wanavyotumia anwani za faragha, ndivyo umati ambamo malipo binafsi yanafichika unavyokuwa mkubwa zaidi. Kutumia anwani ya faragha husaidia kukulinda wewe na kila mtu mwingine katika bwawa.

## Tumia kwa vitendo

- Tumia pochi [wallet] inayotumia anwani za faragha kwa chaguo-msingi, kama vile [ZODL](https://zodl.com) au [Zingo!](https://www.zingolabs.org/).
- Unapopokea ZEC katika anwani ya uwazi, ihamishe hadi kwenye anwani ya faragha kabla ya kuitumia.
- Lipa kwa anwani za faragha pale unapoweza. Kila malipo ya uwazi ni ya umma kabisa; malipo ya faragha sivyo.

## Rasilimali

- [Zcash: mapendekezo ya faragha na usalama](https://z.cash/support/security/privacy-security-recommendations/)
- [Mfumo wa ikolojia wa faragha (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Jinsi teknolojia ya Zcash inavyofanya kazi](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Kurasa zinazohusiana

- [Misingi ya Zcash](/start-here/what-is-zec-and-zcash)
- [Pochi](/using-zcash/wallets)
- [Mabwawa ya Faragha](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Ikiwa ungependa kuongeza au kupendekeza marekebisho kwenye ukurasa huu wa wiki, tafadhali nenda kwenye repo ya [ZecHub GitHub](https://github.com/ZecHub/zechub) na utume pull request.*
