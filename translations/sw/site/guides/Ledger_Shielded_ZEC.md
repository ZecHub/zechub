# Ledger Mwongozo wa Mtumiaji wa Faragha [Shielded] wa ZEC

Tarehe 23 Septemba 2026, Ledger iliongeza usaidizi wa asili wa faragha kwa ZEC kwenye Wallet Desktop ya Ledger. Akaunti moja ya Zcash sasa inashikilia salio la uwazi [transparent] na salio la faragha katika bwawa [pool] la Zcash la Ironwood. Funguo zako za faragha hubaki kwenye Ledger yako, na kila muamala [transaction] hukaguliwa na kutiwa sahihi kwenye kifaa.

**Kwa desktop pekee.** Tangazo la Ledger linasema kuwa ZEC ya faragha “inapatikana kwenye Wallet Desktop ya Ledger pekee. Usaidizi wa simu haupatikani kwa sasa, lakini unakuja hivi karibuni.” Programu ya desktop inaonyesha taarifa hiyohiyo. Ilikaguliwa tarehe 15 Oktoba 2026.

## Maandalizi

- Kifaa cha Ledger kinachoendesha programu ya Zcash: Nano S Plus, Nano X, Stax au Flex. Programu ya sasa ya Zcash haijaundwa kwa ajili ya Nano S ya asili.
- Wallet Desktop ya Ledger 4.21 au toleo la baadaye, iliyopakuliwa kutoka [ledger.com](https://www.ledger.com) pekee. Mwongozo huu ulitumia toleo la 4.24.0.
- Programu ya hivi karibuni ya Zcash kwenye Ledger yako (3.9.4 wakati mwongozo huu ulipoandikwa).
- Kiasi kidogo cha ZEC kwa ajili ya majaribio. Kila hatua hapa chini ilifanywa kwenye mainnet kwa 0.001 ZEC. Kila muamala hugharimu ada [fee] ndogo ya mtandao (0.00015 ZEC katika jaribio letu).
- Kirai chako cha kurejesha cha maneno 24 kibaki kwenye karatasi. Kamwe usikiandike kwenye kompyuta wala kukishiriki.

## Mwongozo wa Hatua kwa Hatua (Wallet Desktop ya Ledger)

**1. Sakinisha au sasisha programu ya Zcash**
- Fungua Wallet ya Ledger, unganisha na ufungue Ledger yako, kisha ufungue **My Ledger**. Ruhusu muunganisho kwenye kifaa.
- Tafuta **Zcash** katika katalogi ya programu, kisha ubofye **Install**, au **Update** ikiwa tayari imesakinishwa.
- Fungua programu ya Zcash kwenye Ledger yako. Skrini inasoma “Programu ya Zcash iko tayari”. Sogeza kulia hadi **App info** ili kukagua toleo.

**2. Ongeza akaunti ya Zcash**
- Katika Wallet ya Ledger, chagua **Add account**. Katika **Select asset**, tafuta Zcash na uchague **Zcash (ZEC)**, si tokeni [token] iliyofungwa kama Binance-Peg Zcash Token.
- Programu ya Zcash ikiwa imefunguliwa kwenye Ledger yako, Wallet ya Ledger hupata akaunti yako. Iweke alama chini ya **Select the accounts you want to add** na ubofye **Confirm**.
- Ukurasa wa akaunti unaonyesha **Available balance**, **Transparent balance** na **Private balance**, pamoja na kitufe cha **Enable shielded**.

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Washa salio la faragha**
- Bofya **Enable shielded**. Dirisha la **Enable Zcash private balance** lina hatua nne: Birthday, UFVK, Device na Confirmation.
- **Birthday:** kwa akaunti mpya, weka urefu wa birthday katika tarehe ya leo. Weka alama kwenye “This account received shielded ZEC in the past” ikiwa tu unajua kuwa ilipokea, kwa sababu kuchanganua kuanzia block [block] 0 kunaweza kuchukua muda mrefu.
- **UFVK na Device:** Wallet ya Ledger inaomba Ledger yako ihamishe Unified Full Viewing Key (UFVK) yako. Soma skrini kwenye kifaa na uidhibitishe. Ukiona “Device connection lost”, hakikisha programu ya Zcash imefunguliwa, idhinisha haraka na ubofye **Retry**.
- Unapoona **UFVK successfully imported**, bofya **Start sync**. Usawazishaji unapokamilika, kitufe hubadilika kuwa **Update balance** chenye muda wa “Last sync”.
- Ufunguo wa kutazama [viewing key] hubaki kwenye kompyuta yako. Unaweza kupata fedha zako za faragha lakini hauwezi kuzitumia.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Pokea ZEC na uthibitishe anwani zote mbili kwenye Ledger yako**
- Bofya **Receive** na uchague akaunti yako ya Zcash. Wallet ya Ledger inaonyesha **Address for Zcash 1** (ya uwazi, inaanza na t1) na **Private address for Zcash 1** (inaanza na u1). Anwani za awali hubaki halali.
- Ledger yako inaonyesha “Verify Zcash addresses”, **Private address** katika kurasa mbili, kisha **Public Address**. Linganisha kila herufi na skrini kabla ya kushiriki anwani yoyote, kisha thibitisha kwenye kifaa.
- Pendelea anwani ya faragha; tumia ile ya uwazi tu wakati mtumaji hawezi kutumia kitu kingine.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Hamisha ZEC ya uwazi hadi salio lako la faragha**
- Bofya **Send**. Chini ya **Self transfer**, chagua **Send to private balance**.
- Ingiza kiasi au tumia 25%, 50%, 75% au **Max**. Kagua ada ya mtandao, kisha ubofye **Review**.
- Kwenye Ledger yako, pitia: “Review transaction to send ZEC”, “Transfer from public to private address”, kiasi, anwani ya pato katika kurasa mbili, ada na urefu wa muda wa kuisha. Kagua kuwa anwani ya pato inalingana na anwani yako ya faragha kutoka hatua ya 4, kisha bonyeza vitufe vyote viwili kwenye **Sign transaction**.
- Wallet ya Ledger inaonyesha **Transaction sent**. Katika maelezo ya muamala, aina inaonyesha **Private (Ironwood)**.
- Wallet ya Ledger inaeleza kuwa uhamisho wa binafsi huunganisha fedha zako za faragha na anwani yako ya uwazi. Kupokea moja kwa moja kwenye anwani yako ya faragha huzifanya zibaki bila kuunganishwa.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Baada ya muamala kuthibitishwa, salio la uwazi hupungua na salio la faragha huongezeka. Fedha mpya za faragha huonekana kama “maturing” hadi zipate uthibitisho wa kutosha kutumiwa.

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Tuma ZEC kutoka kwenye salio lako la faragha**
- Salio la faragha linapoweza kutumiwa, bofya **Send** na uweke **Transfer from** kuwa **Private balance**.
- Bandika anwani ya mpokeaji na uingize kiasi. Unaweza kuongeza **Memo (optional)** iliyosimbwa fiche [encryption] ya hadi baiti 512, ambayo mpokeaji pekee anaweza kusoma.
- Kagua mpokeaji, kiasi na ada kwenye Ledger yako, kisha bonyeza vitufe vyote viwili kwenye **Sign transaction**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Mambo ya Kujua

- ZEC ya faragha kwenye Ledger ni ya desktop pekee kwa sasa (ilikaguliwa tarehe 15 Oktoba 2026).
- Salio la faragha la Wallet ya Ledger hutumia bwawa la Ironwood.
- Ledger inasema unaweza kushiriki ufikiaji wa kusoma pekee wa historia yako ya miamala na mshauri wa kodi. Mtu yeyote aliye na ufunguo wako wa kutazama anaweza kuona historia yako ya faragha, kwa hiyo ushiriki kwa makusudi pekee.
- Skrini za kifaa katika mwongozo huu zilinaswa kwa kutumia emulator ya Speculos ya Ledger (Nano S Plus) inayotumia programu ya Zcash 3.9.4, iliyounganishwa na Wallet Desktop ya Ledger 4.24.0 kwenye mainnet ya Zcash. Ledger halisi huendesha programu hiyohiyo na huonyesha skrini zilezile.

## Usaidizi Zaidi

- [Jipya katika Wallet ya Ledger: Usaidizi wa Asili wa Zcash wa Faragha](https://www.ledger.com/blog-native-shielded-zcash-support) (tangazo la Ledger)
- [Kituo cha Usaidizi cha Ledger](https://support.ledger.com)
- [Ukurasa wa pochi wa ZecHub](/using-zcash/wallets)
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) na [Funguo za Kutazama](/zcash-tech/viewing-keys) kwenye ZecHub
- Chaguo jingine la hardware wallet: [Keystone Mwongozo wa Mtumiaji wa Zashi](/guides/keystone-zashi)
