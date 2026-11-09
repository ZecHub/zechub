<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Ihe block explorer pụrụ ịhụ na Zcash

## Na nkenke

- Na Bitcoin, block explorer na-egosi ihe niile: onye zitere, onye natara, na ego ole.
- Na Zcash, nke a bụ naanị eziokwu maka ọrụ Oha [transparent] (t-address).
- Explorer nwere ike ịhụ ego na-abanye ma na-apụ na pool nke e chebere echebe [shielded], ma ọ pụghị ịhụ ihe na-eme n'ime ya.
- Azụmahia [transaction] e chebere echebe kpamkpam (z ruo z) anaghị ekpughe onye zitere, onye natara, ma ọ bụ ego ole.
- Ọnụọgụ ọ bụla ọha nke “shield rate” bụ opekempe, n'ihi na ọrụ nzuzo kpamkpam anaghị ahụ anya site n'èzí.

---

## Ụdị Adreesị akpa ego abụọ

Zcash nwere ụdị Adreesị akpa ego [address] abụọ.

**Adreesị akpa ego Oha** na-amalite na `t` ma na-arụ ọrụ dịka Adreesị akpa ego Bitcoin. Balans na Kwụọ ụhwọ [payment] bụ ihe ọha.

**Adreesị akpa ego nke e chebere echebe** na-amalite na `z` ma zero-knowledge proofs na-echebe ya. Netwọk ahụ nwere ike ikwenye na Kwụọ ụhwọ e chebere echebe dị irè n'ekpugheghị onye zitere, onye natara, ma ọ bụ ego ole.

N'ihi na e nwere ụdị abụọ, uru nwere ike ịgagharị n'ụzọ anọ: Oha ruo Oha (t ruo t), Oha ruo nke e chebere echebe (t ruo z, a na-akpọ shielding), nke e chebere echebe ruo Oha (z ruo t, a na-akpọ deshielding), na nke e chebere echebe ruo nke e chebere echebe (z ruo z, nke nzuzo kpamkpam).

## Ihe explorer pụrụ ịhụ

Explorer ọha dịka [ZecBlock](https://zecblock.com/) nwere ike ịgụ nke ọma:

- Kwụọ ụhwọ Oha kpamkpam ọ bụla (t ruo t), site na mmalite ruo na njedebe.
- Ego na-abanye na pool nke e chebere echebe (akụkụ Oha na ego ole).
- Ego na-apụ na pool nke e chebere echebe (akụkụ Oha na ego ole).
- Ngụkọta ZEC a na-edobe na pool nke e chebere echebe ọ bụla, nke bụ ihe ọha ka netwọk wee gosi na e keghị mkpụrụ ego site n'ihe efu.

Na nkenke, a na-ahụ akụkụ mpụta nke pool nke e chebere echebe. Ị nwere ike ile uru ka ọ na-abanye ma na-apụ.

## Ihe explorer na-enweghị ike ịhụ

Explorer ọha enweghị ike ịgụ:

- Azụmahia e chebere echebe kpamkpam (z ruo z). Onye zitere, onye natara, na ego ole na-anọgide zoro ezo.
- Onye zitere ma ọ bụ onye natara nọ n'azụ Kwụọ ụhwọ e chebere echebe ọ bụla.
- Balans nke otu Adreesị akpa ego nke e chebere echebe.
- Ihe na-eme ego ozugbo ha banyere n'ime pool.

Jụọ data raw, ubi onye zitere na onye natara e chebere echebe ga-alọghachi na-enweghị ihe ọ bụla. Explorer anaghị ezo nke a n'ihi nhọrọ ya. Ọ dịghị mgbe ọ dị na chain ọha n'ụdị a pụrụ ịgụ. E ji Nzobe ederede [encryption] chekwaa ozi ahụ, ọ bụ naanị onye nwere viewing key ziri ezi nwere ike ịgụ ya.

## Ihe mere o ji dị mkpa

**Nzuzo [privacy] gị sitere na cryptography, ọ bụghị n'ịtụkwasị ụlọ ọrụ obi.** Onye na-eweta data enweghị ike ileba n'ime Azụmahia e chebere echebe ọbụna ma ọ chọọ.

**Ọnụọgụ shield-rate ọha anaghị agụta Nzuzo niile.** Ndị nchọpụta nwere ike ịtụ naanị ihe na-agafe ókè ọha, yabụ oke ọrụ nzuzo n'ezie dịkarịa ala ihe ha na-akọ, ma na-adịkarị karịa.

**Pool nke e chebere echebe buru ibu na-echebe mmadụ niile.** Ka ọtụtụ mmadụ na-eji Adreesị akpa ego nke e chebere echebe, ka igwe mmadụ Kwụọ ụhwọ nzuzo nke otu onye na-ezo n'ime ya na-ebuwanye ibu. Iji Adreesị akpa ego nke e chebere echebe na-enyere ichebe gị na onye ọ bụla ọzọ nọ na pool.

## Tinye ya n'ọrụ

- Jiri e-akpa ego [wallet] nke na-eji Adreesị akpa ego nke e chebere echebe na ndabara, dịka [ZODL](https://zodl.com) ma ọ bụ [Zingo!](https://www.zingolabs.org/).
- Mgbe ị natara ZEC na Adreesị akpa ego Oha, bugharịa ya n'ime Adreesị akpa ego nke e chebere echebe tupu i jiri ya.
- Kwụọ Adreesị akpa ego nke e chebere echebe ebe ị nwere ike. Kwụọ ụhwọ Oha ọ bụla bụ nke ọha kpamkpam; nke e chebere echebe abụghị.

## Akụrụngwa

- [Zcash: ndụmọdụ Nzuzo na nchekwa](https://z.cash/support/security/privacy-security-recommendations/)
- [Ecosystem e chebere echebe (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Otu teknụzụ Zcash si arụ ọrụ](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Peeji ndị metụtara ya

- [Ihe ndabere Zcash](/start-here/what-is-zec-and-zcash)
- [E-akpa ego](/using-zcash/wallets)
- [Pool nke e chebere echebe](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Ọ bụrụ na ịchọrọ ịgbakwunye ma ọ bụ tụọ aro mgbanwe na peeji wiki a, biko gaa na [ZecHub GitHub repo](https://github.com/ZecHub/zechub) ma nyefee pull request.*
