<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Adwuma a wɔyɛe no

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash boa ma wɔde dwumadie ahodoɔ mmienu di dwuma: **shielded**, a ɛhwɛ sɛ nkontabuo no bɛyɛ kokoam na ɛnnyɛ obiara dea ne **transparent**, deɛ ɔtwerɛ wɔn din wɔ baguam.
- Adesamma a wɔabɔ wɔn ho ban fi ase ne: `u` or `z`. Adesamma a wɔn ho tew no fi ase wɔ: `t` Na ne suban te sɛ Bitcoin address.
- W'ankasa na wobɛpaw wɔ tua biara ho. Ahofadi yɛ ade a Zcash de ma wo, ɛnyɛ biribi a obi foforo si w'ananmu gyina so.
- Withdrawing from an exchange is the most common place people lose privacy. If the exchange only supports transparent withdrawals, shield the funds yourself once they arrive.
- Akwantu no di so [ZIP code 317](https://zips.z.cash/zip-0317) Wallets a w'akyekyere wɔn dedaw no betumi ahu sɛ wɔretwe wɔn ho.

## Adwuma a wɔhwɛ so bɔ ho ban

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma no yɛ FullScreen
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Trataeɛ a emu da hɔ

Transparent transactions yɛ adwuma tesɛ saa nanso wɔnni ahobanbɔ ho ban, na ɛma transaction details da adi wɔ blockchain no so. Ɛsɛ sɛ wotwe wo ho fi transparent transactions ho bere a privacy yɛ ade titiriw bi ma obi biara. Hyɛ no nso: Transparent wallets betumi ahyia nsɛnnennen esiane ZIP-317 nti, ɛhwehwɛ akatua a ɛne nsesaeԑ mu dennen di dwuma. Default fees bɛtumi ama wagyae anaa akyere aba, enti ɛho hia paa sɛ wobɛyɛ fee customization.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma no yɛ FullScreen
    loading="lazy"
  />
</div>

## Ɔkwan a Ɛnteɛ A Wobɛtumi Asusuw Ho

Akwan a wɔfa so yɛ adwuma no te sɛ nkrataa. Posɔfoma na ɔde ma, nanso obiara a ɔhwɛ mu bere tenten betumi akenkan asɛm no ahu onii a ɔsomaa ne nea ogyee.

Akwan a wɔfa so yɛ adwuma no bi ne sɛ, wɔde krataa hyɛ envelope mu. Postal Service di adanseɛ sɛ nokware nkrataa na ɛfaa kwan ankasa, obiara ntumi mfa faako anaa ɔnsoma saa krataa koro yi mprenu mma obi bio. Nea ɛwɔ envelopu no mu nyinaa tra nea ɔde kɔma onipa no hɔ ma ɔno nso nsa ka.

Ade a ɛho hia ne sɛ Zcash ma wo kwan sɛ wobɛpaw nea wode bɛsoma, ka biara mu.

## Akwankyerɛ a wɔfa so de di dwuma ma nnwuma no mu da hɔ.

ZIP-317 Akwankyerɛ: Akatua no gyinabea yɛ adwuma wɔ akwan a emu yɛ den mu, na ɛho hia sɛ wɔyɛ nsakrae ahorow kɔ akyiri sen nea ɛgyina hɔ ma 0.00001 ZEC.
Nhwɛsoɔ a wɔgyina so bu akontaa: Akwantuo baako pɛ no bɛtumi ama woatua sika 0.0001 ZEC, na ɛka biara bɛyɛ sɛ 0,00005 ZEC.

Editing Fees wɔ Wallets mu

Trust Wallet: Twe kɔ akyiri ntwenee so denam gear icon no a wobɛbɔ transaction. Sesa Miner Tip Gwei ne Max Fee Gwei nsase yie na woantumi annya tranzaction ho mfasoɔ. Trust wallet gye network fees nko ara.
Coinomi Wallet: Ɛma akwan mmiɛnsa a wobɛtumi afa so atoto wo ka no. Sɛ wopɛ sɛ woyɛ nsakrae wɔ biribi mu, na w'atwe bi nso aa, twe Custom to supported coins or use Change Fee in the top-right corner. Wobetumi de sika biara ato byte anaa kilobyte ho ma ayɛ adwuma ama confirmation times. Wopɛsɛ wode dynamic options di dwuma sε wonhu nea ɛsɛsɛ wosesa ansaana woretua ne nyinaa.

## Mfomso a Wɔtaa Di

- **Assuming that any wallet listing ZEC can send it privately.** A number of multi-coin wallets support the transparent side of Zcash only. Check the wallet's supported pools before you rely on it for privacy. The [Wallets](https://zechub.wiki/using-zcash/wallets) kratafa a ɛka eyi ho ma akwan biara.
- **Withdrawing to a transparent address and leaving the funds there.** Wode wo sika no bɛto baabi na obiara ahu, ne nea wobɛyɛ wɔ saa adrɛs yi so biara nso yɛ daa. Sɛ wonya de ba hɔ pɛ a fa nneɛma sie ho.
- ** Yɛde ahobanbɔ yɛ biribi a wo de di dwuma prɛko.** Akwantu biara gyina ne ankasa so. Sɛ wode nneɛma to ban nnɛ a, ɛnkyerɛ sɛ wotuaa sika no wɔ ɔkwan foforo so na w'atumi ayi afi hɔ nnawɔtwe a etwaam no mu.
- **Fa adrɛs a w'atumi ahu mu yɛ adwuma wɔ biribiara ho.** Esiane sɛ dwumadi biara a wobɛyɛ no da adi bere nyinaa nti, address baako pɛ a wobɛsan de ayɛ adwuma no bɛboa ama woayɛ nhyehyɛe afa nneɛma bi so.
- **Sending with an outdated default fee.** Wallets a wɔnfa ZIP 317 nyɛ adwuma no betumi de tete kabea baako pɛ, na ebetumi ama asesae bi asi hɔ.

## Hyɛ no nsow:

Yɛsrɛ wo hyɛ no nsow sɛ ɔkwan a eye sen biara wɔ ZEC ho ne sε wode dwumadie bi bεto ban. Wͻn de [unified addresses] di dwuma wͻ nkotoku binom mu, na εwכ nsεm so nnidisoɔ pii wom ma obiara tumi fa emu nnoama nyinaa to nsa frɛ amannefoɔ foforɔ ama wɔn adi kan afa akwan horow yi so ayɛ adwuma.](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) a ɛma wɔn a wɔde di dwuma ne sikakorabea no tumi ka adrɛs ahorow a ani tua na wɔabɔ ho ban bom.

## Nneɛma a wɔde bɔ afɔre

[ZIPs] no ho asεm.](https://zips.z.cash/)

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Nkrataa nkekaho](/using-zcash/wallets)  wallets a' wɔgye shielded sending tom, na no yɛ transparent nko ara.
- [Nsuo a wɔabɔ ho ban](/using-zcash/shielded-pools)  Sapling ne Orchard, mmura a wo sika no te mu wɔ hɔ
- [Nsɛm a wode bɛto dwa](/using-zcash/memos)  nkrataa a w'akyekyere no ntumi nkɔ so wɔ dwumadie bi mu.
- [Yԑde Adansedie a' yԑbԑtumi de adi dwuma yie](/using-zcash/transparent-exchange-addresses)  TEX addresses ne deɛn nti na exchange di dwuma no
- [Asomdwoe a w'atumi de wo nsa aka no](/using-zcash/custodial-exchanges)  deεn na exchange boa ma wכtwe ban a εbεto ho no mu.

## ZEC kɔ ZAT kasasin no
