<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key Na-apụ Apụ (Outgoing Viewing Keys, OVKs)

Viewing key na-apụ apụ (OVK) bụ uru byte 32 a na-eji naanị zoo ciphertext *na-apụ apụ* nke mmepụta nke e chebere echebe. Ọ na-eme ka otu nwere ike weghachite plaintext note ezitere (Adreesị akpa ego onye nnata, uru, na memo) n’enweghị ike imefu ego ma ọ bụ hụ note na-abata.

Onye nnata na-eji viewing key nke ya na-abata wezobe note na-abata mgbe niile. Nhọrọ OVK anaghị agbanwe ihe onye nnata na-ahụ. Enweghị usoro nzuzo a na-ahụkarị maka OVK raw; ọ bụ naanị byte 32.

## Na nkenke

- OVK na-achịkwa naanị onye nwere ike weghachite plaintext na-apụ apụ nke Kwụọ ụhwọ nke e chebere echebe.
- E-akpa ego na-ahọrọ n’etiti iwu atọ: **Onye zitere** (weghachite nkịtị site na UFVK nke akaụntụ), **Nke omenala** (weghachite site na key ị nyere), ma ọ bụ **Tụfuo** (ọ dịghị onye nwere ike weghachite plaintext na-apụ apụ site na chain).
- Ọbụna ma ejiri Tụfuo ma ọ bụ OVK omenala, onye ji UFVK ka na-ahụ note ndị e mefuru wee nwee ike gbakọọ ego net hapụrụ akaụntụ ahụ.
- Nanị ụzọ a pụrụ ịdabere na ya iji mee ka ego ghara ịpụta ìhè nye UFVK akọwapụtara bụ ịhụ na note ndị ahụ abụghị nke akaụntụ ahụ (akaụntụ dị iche ma ọ bụ e-akpa ego dị iche).
- Iwu atọ ahụ adịlarị na `zcash_client_backend`; ihe fọrọ nke nta ka ọ bụrụ e-akpa ego niile taa na-eji naanị iwu Onye zitere nke ndabara.

---

## Iwu atọ ahụ

E-akpa ego ndị e wuru n’elu `zcash_client_backend` na-ahọrọ `OvkPolicy` mgbe ha na-ewu Azụmahia:

| Iwu | Ciphertext na-apụ apụ | Onye nwere ike weghachite plaintext na-apụ apụ ma emechaa |
|--------|----------------------|----------------------------------------------|
| **Onye zitere** (ndabara) | Eji OVK nkịtị nke akaụntụ zoo ya | Unified Full Viewing Key nke akaụntụ na-eziga |
| **Nke omenala** | Eji key ị nyere zoo ya | Onye ọ bụla ji key e nyere |
| **Tụfuo** | A naghị eji OVK (`ovk = ⊥`) | Ọ dịghị onye (ọbụnadị onye zitere ya) |

Onye nrụpụta dị mfe na-emepụta iwu `Custom` site n’otu uru byte 32 ka OVK mpụga na nke ime bụrụ otu key ahụ.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Lee akwụkwọ [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) na [ZIP 310](https://zips.z.cash/zip-0310).

## Ihe iwu ọ bụla bara uru maka ya

**Onye zitere** bụ omume e-akpa ego nkịtị. Mgbe a gwupụtara Azụmahia ahụ, onye ọ bụla ji UFVK nke akaụntụ nwere ike wezobe ciphertext na-apụ apụ wee weghachite Adreesị akpa ego ndị nnata, ego, na memo.

**Nke omenala** na-enye gị ohere inye onye nke atọ (onye nyocha, onye nhazi Kwụọ ụhwọ, usoro risiti, ma ọ bụ ngwaọrụ dị iche) ikike iwezobe Kwụọ ụhwọ ndị a kapịrị ọnụ na-apụ apụ n’enyeghị ha viewing key zuru ezu. Ị nwekwara ike iji key ephemeral nke ị ga-atụfu mgbe Azụmahia gasịrị, ma ọ bụ jiri key dị iche iche maka ndị mmekọ dị iche iche ka otu key ghara ịhụ Kwụọ ụhwọ niile na-apụ apụ.

**Tụfuo** pụtara na e-akpa ego na-eziga enweghị ike weghachite plaintext na-apụ apụ site na chain. Nke a bara uru mgbe ịchọrọ ibelata ihe a pụrụ iweghachite ma ọ bụrụ na UFVK emechaa daba n’aka ndị ọzọ, ma ọ bụ mgbe ị kpachaara anya achọghị ndekọ on-chain nke OVK akaụntụ nwere ike imeghe.

## Ihe onye ji UFVK ka na-ahụ

Ọbụna mgbe ejiri Tụfuo ma ọ bụ OVK omenala, onye ji UFVK nke akaụntụ ka nwere ike:

- Chọpụta note nke akaụntụ ahụ e mefuru (site na nullifier).
- Mara uru note ntinye ndị ahụ.
- Weghachite note mgbanwe ọ bụla (eji viewing key na-abata nke ime zoo ha, ọ bụghị OVK).
- Ya mere, gbakọọ ego net hapụrụ akaụntụ ahụ.

Ihe anaghị apụta ìhè bụ Adreesị akpa ego ndị nnata nke ọ bụla, nkewa ego ahụ, na memo. Akwụkwọ `WalletWrite` na-adọ aka ná ntị na data gbasara Azụmahia e kere n’okpuru Tụfuo (ma ọ bụ OVK omenala na-enweghị usoro) enweghị ike iweghachite site na data chain ma ọ bụrụ na ndekọ mpaghara efuo.

## Idebe ego pụọ n’aka UFVK akọwapụtara

`OvkPolicy` na-achịkwa naanị iweghachite plaintext na-apụ apụ. Ọ naghị ezobe mmefu ma ọ bụ ego net n’aka UFVK nke akaụntụ n’onwe ya.

Nanị ụzọ a pụrụ ịdabere na ya iji mee ka ego ghara ịpụta ìhè nye UFVK akọwapụtara bụ ịhụ na note ndị bu ego ahụ abụghị nke akaụntụ UFVK ahụ na-achịkwa:

1. **Akaụntụ ZIP-32 dị iche** (otu seed) — Mepụta index akaụntụ ọhụrụ, bugharịa ego n’ime ya, ma ghara ibupụ UFVK akaụntụ ahụ. UFVK akaụntụ mbụ na-ahụ naanị mbufe banye n’akaụntụ ọhụrụ ahụ.
2. **E-akpa ego dị iche kpamkpam** (seed dị iche) — Tinye ego n’e-akpa ego ọhụrụ, si na ya mefuo ego, ma tụfuo seed ma ọ bụ UFVK. E-akpa ego mbụ na-edekọ naanị mbufe itinye ego.
3. **E-akpa ego ephemeral eji otu ugboro** — Otu ihe ahụ dị n’elu, mana were e-akpa ego mmefu dị ka nke a pụrụ ịtụfu.

UFVK bụ maka akaụntụ ọ bụla. Note ndị na-adịbeghị n’akaụntụ ahụ anaghị apụta na ngụkọta ego ya ma ọ bụ ngụkọta ego na-apụ.

## Otu e-akpa ego si eji iwu ndị a taa

Ihe fọrọ nke nta ka ọ bụrụ e-akpa ego mmepụta niile na-eji naanị iwu **Onye zitere** nke ndabara, ya mere enwere ike weghachite akụkọ ihe mere eme zuru ezu na-apụ apụ site na UFVK. Iwu abụọ nke ọzọ dị n’ọba akwụkwọ mana a naghị ekpughe ha na interface onye ọrụ ọtụtụ mgbe.

Nhọrọ ndị nwere ike ịdị n’ọdịnihu gụnyere:

- Akara maka Azụmahia ọ bụla nke na-enye onye ọrụ ohere ịhọrọ Nke omenala ma ọ bụ Tụfuo maka otu Kwụọ ụhwọ.
- Ọnọdụ Tụfuo na-adịgide adịgide (iweghachi seed ga-egosi naanị ego net na-apụ).
- OVK omenala maka Mpughe ahọpụtara nke Kwụọ ụhwọ ọ bụla (nke dị fechaa karịa Mpughe Kwụọ ụhwọ zuru ezu [ZIP 311](https://zips.z.cash/zip-0311)).
- Ịga n’ihu iji nkewa akaụntụ ma ọ bụ e-akpa ego maka ikewapụ siri ike karị.

## Akụrụngwa

- [ZIP 310: Njirimara Nchekwa nke Viewing Keys Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Adreesị Akpa Ego Dị N’otu na Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Omume Kachasị Mma maka Mmejuputa E-akpa Ego](https://zips.z.cash/zip-0315)
- [OvkPolicy na zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Peeji ndị metụtara ya

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Mpughe Kwụọ ụhwọ](/zcash-tech/payment-disclosures)
- [Adreesị Akpa Ego Dị N’otu](/zcash-tech/unified-addresses)
- [Ihe Block Explorer Pụrụ Ịhụ](/zcash-tech/what-a-block-explorer-can-see)
