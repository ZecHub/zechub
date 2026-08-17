<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zallet Hızlı Referans Rehberi

## Kısaca

- Zallet, Rust ile yazılmış bir tam düğüm Zcash cüzdanıdır. Eskiden `zcashd` içinde bulunan cüzdanın yerini alır.
- `zcashd`, 18 Temmuz 2026'da Destek Sonu duruşuna ulaştı ve artık çalışmıyor. Artık düğüm tarafını Zebra, cüzdan tarafını ise Zallet yönetiyor.
- Zallet'i, daha önce `zcash-cli` kullandığınız gibi, komut satırından `zallet rpc <command>` ile kullanırsınız.
- Komut adından sonraki her argüman geçerli JSON olmalıdır; bu da string değerlerin çift tırnaklarını koruduğu anlamına gelir.
- Zallet hâlâ alfa aşamasındadır. Komutlar sürümler arasında değişebilir ve her `zcashd` RPC'si henüz aktarılmış değildir.

## Temel Açıklama

Zallet, işlevlerini `zcashd` cüzdanının kullandığı arayüz tarzı olan JSON-RPC üzerinden sunar. Cüzdanın yapmasını istediğiniz her şey — bakiye kontrol etmek, bir hesap oluşturmak, shielded ödeme göndermek — `zallet rpc` komutuna verdiğiniz bir komuttur.

Eski `zcash-cli` alışkanlığından farklı olan ve ilk hataların çoğunu açıklayan iki nokta vardır. Birincisi, argümanlar düz metin yerine geçerli JSON olmalıdır; bu yüzden bir string argüman, kabuk tırnaklarının içinde kendi tırnak işaretlerini de taşımalıdır. İkincisi, kullanılabilir komut kümesi çalıştırdığınız alfa sürümüne bağlıdır; bu nedenle ikili dosyanızın içine yerleşik olan liste, bu sayfa da dahil olmak üzere herhangi bir yazılı sayfadan daha güvenilirdir.

Kullanılabilir tüm RPC'leri listelemek için:

```bash
zallet rpc help
```

Belirli bir RPC için ayrıntılı yardım almak için:

```bash
zallet rpc help '"<command>"'
```

> **Önemli:** Metot adından sonraki her argüman **geçerli JSON olmalıdır**.  
> String değerler `"value"` olarak yazılmalıdır (çift tırnaklar dahil).

## Yaygın Hatalar

- **String argümanlardaki iç tırnakları atlamak.** `zallet rpc validateaddress u1abc...` başarısız olur, çünkü adresin JSON olarak gelmesi gerekir. `'"u1abc..."'` şeklinde yazılması gerekir.
- **Burada her `zcashd` RPC'sinin bulunduğunu varsaymak.** Aktarma süreci hâlâ devam ediyor. Bazı metotlar birebir aynı davranır, bazıları farklı kullanım gerektirir ve bazıları hiç taşınmayacaktır.
- **Bu sayfayı, ikili dosyanızdan daha yetkili kabul etmek.** Zallet alfa aşamasındadır ve hızla değişmektedir. Buradaki bir komut çalışmıyorsa, bir şeyin bozuk olduğunu varsaymadan önce `zallet rpc help` ile kontrol edin.
- **Zallet'in bir düğüm olmasını beklemek.** O, ikilinin cüzdan yarısıdır. Düğümü Zebra çalıştırır ve Zallet onunla iletişim kurar.

## RPC Komutları

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parametre   | Tür    | Gerekli | Açıklama                 |
|-------------|--------|---------|--------------------------|
| hexstring   | string | evet    | İşlem hex dizgesi        |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parametre   | Tür    | Gerekli | Açıklama        |
|-------------|--------|---------|-----------------|
| hexstring   | string | evet    | Betik hex'i     |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parametre | Tür    | Gerekli | Varsayılan | Açıklama                             |
|-----------|--------|---------|------------|--------------------------------------|
| txid      | string | evet    |            | İşlem kimliği                        |
| verbose   | number | hayır   | 0          | `0` = hex, sıfır dışı = JSON nesnesi |
| blockhash | string | hayır   |            | Aramayı bu blokla sınırla            |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Parametre yok.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Parametre yok.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Parametre yok.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Parametre yok. OpenRPC şemasını döndürür.

---

### stop

```bash
zallet rpc stop
```

Parametre yok. (Yalnızca Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parametre | Tür    | Gerekli | Açıklama            |
|-----------|--------|---------|---------------------|
| address   | string | evet    | Transparent adres   |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parametre | Tür    | Gerekli | Açıklama            |
|-----------|--------|---------|---------------------|
| address   | string | evet    | Transparent adres   |
| signature | string | evet    | Base64 imza         |
| message   | string | evet    | Orijinal mesaj      |

---

### walletlock

```bash
zallet rpc walletlock
```

Parametre yok.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parametre  | Tür    | Gerekli | Açıklama                            |
|------------|--------|---------|-------------------------------------|
| passphrase | string | evet    | Cüzdan parolası                     |
| timeout    | number | evet    | Cüzdanın kilitsiz kalacağı saniye   |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parametre             | Tür    | Gerekli | Açıklama                  |
|-----------------------|--------|---------|---------------------------|
| transparent_address   | string | evet    | Dönüştürülecek P2PKH adresi |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parametre | Tür    | Gerekli | Açıklama                                     |
|-----------|--------|---------|----------------------------------------------|
| address   | string | evet    | Harcama anahtarı dışa aktarılacak Sapling adresi |

> Cüzdanın kilidi açık olmalıdır. Yalnızca Sapling harcama anahtarını dışa aktarır.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parametre    | Tür    | Gerekli | Açıklama      |
|--------------|--------|---------|---------------|
| account_uuid | string | evet    | Hesap UUID'si |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parametre         | Tür             | Gerekli | Açıklama                               |
|-------------------|-----------------|---------|----------------------------------------|
| account           | string / number | evet    | Hesap UUID'si veya ZIP-32 hesap indeksi |
| receiver_types    | string dizisi   | hayır   | Dahil edilecek alıcı türleri           |
| diversifier_index | number          | hayır   | Belirli diversifier indeksi            |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parametre | Tür             | Gerekli | Varsayılan | Açıklama                          |
|-----------|-----------------|---------|------------|-----------------------------------|
| account   | string / number | evet    |            | Hesap UUID'si veya ZIP-32 indeksi |
| minconf   | number          | hayır   | 1          | Minimum onay sayısı               |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parametre | Tür    | Gerekli | Varsayılan | Açıklama             |
|-----------|--------|---------|------------|----------------------|
| minconf   | number | hayır   | 1          | Minimum onay sayısı  |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parametre    | Tür    | Gerekli | Açıklama                             |
|--------------|--------|---------|--------------------------------------|
| account_name | string | evet    | İnsan tarafından okunabilir ad       |
| seedfp       | string | hayır   | Cüzdanda birden fazla seed varsa gerekir |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parametre    | Tür    | Gerekli | Varsayılan | Açıklama                               |
|--------------|--------|---------|------------|----------------------------------------|
| minconf      | number | hayır   | 1          | Minimum onay sayısı                    |
| as_of_height | number | hayır   |            | Bu yükseklik itibarıyla sorgula (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parametre   | Tür             | Gerekli | Açıklama                                  |
|-------------|-----------------|---------|-------------------------------------------|
| operationid | string dizisi   | hayır   | İşlem kimlikleri (tamamlananların tümü için boş bırakın) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parametre   | Tür             | Gerekli | Açıklama                           |
|-------------|-----------------|---------|------------------------------------|
| operationid | string dizisi   | hayır   | İşlem kimlikleri (tümü için boş bırakın) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parametre         | Tür     | Gerekli | Varsayılan | Açıklama                    |
|-------------------|---------|---------|------------|-----------------------------|
| minconf           | number  | hayır   | 1          | Minimum onay sayısı         |
| include_watchonly | boolean | hayır   | false      | Yalnızca izleme bakiyelerini dahil et |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parametre | Tür     | Gerekli | Varsayılan | Açıklama                           |
|-----------|---------|---------|------------|------------------------------------|
| account   | string  | evet    |            | Hesap UUID'si                      |
| hex_data  | string  | evet    |            | Hex açık anahtar veya redeem script |
| rescan    | boolean | hayır   | true       | İçe aktarmadan sonra yeniden tara  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parametre    | Tür    | Gerekli | Varsayılan     | Açıklama                               |
|--------------|--------|---------|----------------|----------------------------------------|
| key          | string | evet    |                | Sapling genişletilmiş harcama anahtarı |
| rescan       | string | hayır   | `"whenkeyisnew"` | `"yes"`, `"no"` veya `"whenkeyisnew"` |
| start_height | number | hayır   | 0              | Yeniden taramanın başlangıç yüksekliği |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parametre         | Tür     | Gerekli | Varsayılan | Açıklama                                 |
|-------------------|---------|---------|------------|------------------------------------------|
| include_addresses | boolean | hayır   | true       | Ayrıca her hesap için adresleri döndür   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parametre | Tür    | Gerekli | Açıklama                              |
|-----------|--------|---------|---------------------------------------|
| status    | string | hayır   | Duruma göre filtrele (örn. `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parametre    | Tür    | Gerekli | Açıklama                    |
|--------------|--------|---------|-----------------------------|
| account_uuid | string | hayır   | Tek bir hesapla sınırla     |
| start_height | number | hayır   | Dahil alt sınır             |
| end_height   | number | hayır   | Hariç üst sınır             |
| offset       | number | hayır   | Bu kadar sonucu atla        |
| limit        | number | hayır   | Döndürülecek azami sonuç    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parametre       | Tür    | Gerekli | Açıklama                        |
|-----------------|--------|---------|---------------------------------|
| unified_address | string | evet    | İncelenecek Unified Address     |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parametre         | Tür             | Gerekli | Varsayılan | Açıklama                        |
|-------------------|-----------------|---------|------------|---------------------------------|
| minconf           | number          | hayır   | 1          | Minimum onay sayısı             |
| maxconf           | number          | hayır   | ∞          | Maksimum onay sayısı            |
| include_watchonly | boolean         | hayır   | false      | Yalnızca izleme dahil et        |
| addresses         | string dizisi   | hayır   |            | Bu adreslerle filtrele          |
| as_of_height      | number          | hayır   |            | Bu yükseklik itibarıyla sorgula |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parametre | Tür   | Gerekli | Açıklama                                                                      |
|-----------|-------|---------|-------------------------------------------------------------------------------|
| accounts  | array | evet    | Nesne dizisi: `name`, `seedfp`, `zip32_account_index`, `birthday_height`     |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parametre      | Tür              | Gerekli | Varsayılan      | Açıklama                                      |
|----------------|------------------|---------|-----------------|-----------------------------------------------|
| fromaddress    | string           | evet    |                 | Kaynak adres veya `"ANY_TADDR"`               |
| amounts        | object dizisi    | evet    |                 | Alıcılar (`address`, `amount`, isteğe bağlı `memo`) |
| minconf        | number           | hayır   |                 | Minimum onay sayısı                           |
| fee            | null             | hayır   |                 | `null` olmalıdır (yalnızca ZIP-317)           |
| privacy_policy | string           | hayır   | `"FullPrivacy"` | Gizlilik politikası dizgesi                   |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parametre      | Tür    | Gerekli | Açıklama                                           |
|----------------|--------|---------|----------------------------------------------------|
| fromaddress    | string | evet    | Transparent adres veya hesap UUID'si               |
| toaddress      | string | evet    | Shielded hedef                                     |
| fee            | null   | hayır   | `null` olmalıdır                                   |
| limit          | number | hayır   | Shield edilecek en fazla coinbase UTXO sayısı      |
| memo           | string | hayır   | Hex kodlu not                                      |
| privacy_policy | string | hayır   | `AllowRevealedSenders` veya `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parametre | Tür    | Gerekli | Açıklama      |
|-----------|--------|---------|---------------|
| txid      | string | evet    | İşlem kimliği |

---

## İlgili Sayfalar

- [Geçiş Rehberi: Zcashd'den Zebrad ve Zallet'e](/guides/migration-guide-zcashd-to-zebrad-zallet) — mevcut bir zcashd kurulumundan adım adım geçiş
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Zallet'in birlikte çalıştığı düğüm uygulaması
- [Tam Düğümler](/zcash-tech/full-nodes) — tam düğüm çalıştırmanın ne gerektirdiği ve neden isteyebileceğiniz
- [Cüzdanlar](/using-zcash/wallets) — tam düğüm ihtiyacınızdan fazlaysa daha hafif cüzdan seçenekleri
- [İşlemler](/using-zcash/transactions) — shielded ve transparent işlemler arasındaki farklar
