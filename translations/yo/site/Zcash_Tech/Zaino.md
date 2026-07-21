# Àkọsílẹ̀ Zaino

Zaino jẹ indexer, ti a ṣe ni Rust nipasẹ ẹgbẹ Zingo, ti o ni ifọkansi lati rọpo lightwalletd ati lati tẹsiwaju iṣẹ akanṣe imukuro zcashd.

Zaino offers essential features for both light clients, such as wallets and applications that do not require the full blockchain history, and full clients or wallets. It also supports block explorers, granting access to both the finalized blockchain and the non-finalized best chain and mempool managed by a Zebra or Zcashd full validator.

## Kí nìdí tá a fi ní Íńtánẹ́ẹ̀tì tuntun?

The main reason is getting ready for the future. Zcashd and lightwalletd were built in 2016 forked from bitcoind code, using C plus. The platform and code used to build both services is starting to get old, difficult to scalate, maintain and to build modern features on.

Rust jẹ ede igbalode, ti o lagbara ati ailewu ti o fun laaye Zcash lati ṣetan fun idagbasoke ọjọ iwaju, ni pipe awọn oludagbasoke tuntun lati kọ ọpọlọpọ iṣẹ ṣiṣe tuntun lori ati ni ayika ilolupo eda abemi Zcash.

Still, Zaino aims to be backwards compatible where possible, Providing APIs and interfaces that help to reduce friction in adoption and ensure that the broader Zcash ecosystem can benefit from Zainos enhancements without significant rewrites or learning curves.

Also, Zaino will allow to separate light client functionality from the full node, via RPC access and a complete client library, allowing developers to integrate Zaino and access chain data directly from their light client application, keeping the sensitive data from Zebra node insulated and secure.

## Diẹ ninu awọn aworan ti o fihan bi Zaino ṣe n ṣiṣẹ

### Àwòrán inú ilé Zaino
[Àwòrán inú ilé Zaino]](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Àdàkọ:Zaino Live Service Architecture (← àwọn ìjápọ̀ _ àtúnṣe)
[Iṣẹ́-ọ̀nà Iṣẹ-iṣẹ́ Agbegbe Zebra]](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Ẹ̀rọ-ìmọ̀ Ọ̀nà Zaino
[Àwòrán-ìmúra ètò Zaino](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Ibo ni mo ti lè rí ìsọfúnni síwájú sí i?
O le ka siwaju sii nipa Zaino Indexer ni osise [Zcash Awujọ Forum asọye](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) tàbí nínú ojúewé [Github] rẹ̀](https://github.com/zingolabs/zaino)
