<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn ìwé ìrántí

#### Fifiranṣẹ Àwọn Àkọsílẹ̀ Tí a Ṣàwárí

Nigbati o ba n firanṣẹ Z2Z (awọn aabo-si-awọn abojuto) iṣowo, o ni anfani lati ṣafikun akọsilẹ (ifiranṣẹ) ninu iṣowo naa. A le lo akọsilẹ yii fun ọpọlọpọ awọn ohun oriṣiriṣi.

#### Títẹ̀lé Àwọn Àdéhùn

Memos are primarily used for singing payments. Since shielded transactions encrypt your data, you're not able to see who sent you ZEC, and what the ZEC might've been for. Users can use the memo field to sign their name or pseudonym to let their counterpart know who the transaction was from. They can also describe what the transaction was for.

#### Bí Wọ́n Ṣe Ń Fi Ìsọfúnni Ránṣẹ́

Ọran lilo miiran fun akọsilẹ ti a fi pamọ ni lati firanṣẹ ifiranṣẹ si ẹnikan pẹlu adirẹsi z. Awọn ifọrọranṣẹ wọnyi le jẹ nipa ohunkohun, boya o jẹ [ṣe iranti si ọrẹ kan](https://twitter.com/iansagstette/status/1542142468505870336), tabi [ìsọfúnni tó ṣe kókó tó yẹ kó jẹ́ àṣírí tó bá ṣeé ṣe](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Àwọn Àkọsílẹ̀ Ìfẹ́ Lórí Àpótí Ìdánwò

There was a person who sent their partner a love note in one of the first blocks in the Zcash blockchain. Someone found that their partner had sent them a file via a Zcash memo. This file was a ticket to a special event, overseas, that she and her distant lover had been talking about attending together. The memo was a love note.

#### Àgbàṣe

> **Ìtàn. Àfihàn yìí kò ṣiṣẹ́ mọ́ bí a ti kọ ọ́.**
>
> Àfihàn tó wà nísàlẹ̀ yìí ń lo zcashd, [ìwé-àfọwọ́kọ gbígbà](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) rẹ̀ sì ń ka àwọn memo nípasẹ̀ `zcash-cli`. zcashd dé ìdádúró aládàáṣe ti Òpin Àtìlẹ́yìn (End-of-Support) ní 18 July 2026, nítorí náà ìwé-àfọwọ́kọ yẹn kò lè dé node tó ń ṣiṣẹ́, a kò sì tíì gbé e lọ sí ètò tuntun.
>
> Kíka àwọn memo tí a dáàbò bò láti ìlà àṣẹ ṣì ń ṣiṣẹ́ lórí Zallet: `zallet rpc z_listunspent` ń dá gbogbo note tí a dáàbò bò tí a gbà padà pẹ̀lú pápá `memoStr` kan náà tí ìwé-àfọwọ́kọ náà ń kà. Wo [Ìtọ́sọ́nà Ìtọ́kasí Kíákíá ti Zallet](/using-zcash/zallet-quick-reference-guide) fún àṣẹ náà, àti [ìtọ́sọ́nà ìṣípòpadà sí Zebra àti Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) láti gbé node kúrò lórí zcashd. Zallet ṣì wà ní ìpele beta.
>
> A pa abala yìí mọ́ gẹ́gẹ́ bí àkọsílẹ̀ ìtàn ti àfihàn Magic-Wormhole.

Eyi ni bi o ṣe le lo Zcash Shielded Memos pẹlu Magic-Wormhole CLI ati zcashd lati fi awọn faili ranṣẹ lailewu lati kọmputa kan si ekeji!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### Àwọn ohun àmúṣọrọ̀

[Awọn ti paroko Memo Field](https://electriccoin.co/blog/encrypted-memo-field/)


