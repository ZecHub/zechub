<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zallet Hızlı Başvuru Rehberi

## Kısaca

- Zallet, Rust dilinde yazılmış tam düğüm Zcash cüzdanıdır. Eskiden zcashd içinde bulunan cüzdanın yerini alır.
- zcashd, 18 Temmuz 2026'da destek sonu nedeniyle durdu ve artık çalışmıyor. Düğüm tarafını artık Zebra, cüzdan tarafını ise Zallet yönetiyor.
- Zallet uygulamasını, daha önce `zcash-cli` kullandığınıza benzer şekilde, komut satırında `zallet rpc <command>` ile çalıştırırsınız.
- Komut adından sonraki her bağımsız değişken geçerli JSON olmalıdır; yani metin değerlerinde çift tırnaklar korunmalıdır.
- Zallet beta aşamasındadır. Komutlar sürümler arasında değişebilir ve henüz tüm zcashd RPC'leri taşınmış değildir.

## Temel Açıklama

Zallet işlevlerini, zcashd cüzdanının kullandığı arayüz tarzının aynısı olan JSON-RPC üzerinden sunar. Cüzdanın yapmasını istediğiniz her şey — bakiyeyi kontrol etmek, bir hesap oluşturmak, korumalı bir ödeme göndermek — `zallet rpc` uygulamasına ilettiğiniz bir komuttur.

Eski `zcash-cli` alışkanlığından farklı olan ve ilk başlarda yapılan hataların çoğuna yol açan iki şey vardır. İlk olarak, bağımsız değişkenler düz metin değil, geçerli JSON olmalıdır; bu nedenle metin bağımsız değişkeninin kendi tırnak işaretleri kabuk tırnaklarının içinde yer alır. İkinci olarak, kullanılabilir komutlar hangi beta sürümünü çalıştırdığınıza bağlıdır; bu nedenle ikili dosyanızda yerleşik olan liste, bu sayfa da dahil olmak üzere yazılı tüm sayfalardan daha güvenilirdir.

Kullanılabilir tüm RPC'leri listelemek için:

```bash
zallet rpc help
```

Belirli bir RPC hakkında ayrıntılı yardım almak için:

```bash
zallet rpc help '"<command>"'
```

> **Önemli:** Yöntem adından sonraki her bağımsız değişken **geçerli JSON olmalıdır**.  
> Metin değerleri `"value"` biçiminde yazılmalıdır (çift tırnaklar dahil).

## Sık Yapılan Hatalar

- **Dize bağımsız değişkenlerindeki iç tırnakları kaldırmak.** `zallet rpc validateaddress u1abc...` başarısız olur, çünkü adresin JSON olarak ulaşması gerekir. `'"u1abc..."'` şeklinde yazılmalıdır.
- **Burada her  RPC'nin mevcut olduğunu varsaymak.** Taşıma çalışmaları hâlâ devam ediyor. Bazı yöntemler aynı şekilde çalışır, bazıları farklı kullanım gerektirir ve bazıları hiç taşınmayacaktır.
- **Bu sayfanın ikili dosyanızdan daha yetkili olduğunu düşünmek.** Zallet beta aşamasındadır ve hızla değişmektedir. Buradaki bir komut çalışmadığında, bir şeylerin bozuk olduğunu varsaymadan önce `zallet rpc help` kontrol edin.
- **Zallet öğesinin bir düğüm olduğunu düşünmek.** Bu, ikilinin cüzdan tarafıdır. Zebra düğümü çalıştırır ve Zallet ona bağlanır.

## RPC Komutları

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parametre   | Tür    | Gerekli | Açıklama                    |
|-------------|--------|---------|-----------------------------|
| hexstring   | metin  | evet    | İşlemin onaltılık dizesi    |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parametre   | Tür   | Gerekli | Açıklama             |
|-------------|-------|---------|----------------------|
| hexstring   | metin | evet    | Betik onaltılık dizesi |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parametre | Tür   | Gerekli | Varsayılan | Açıklama                              |
|-----------|-------|---------|------------|---------------------------------------|
| txid      | metin | evet    |            | İşlem kimliği                         |
| verbose   | sayı  | hayır   | 0          | `0` = hex, sıfır dışı = JSON nesnesi |
| blockhash | metin | hayır   |            | Aramayı bu blokla sınırlandırır       |

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

| Parametre | Tür   | Gerekli | Açıklama         |
|-----------|-------|---------|------------------|
| address   | metin | evet    | Şeffaf adres     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parametre | Tür   | Gerekli | Açıklama           |
|-----------|-------|---------|--------------------|
| address   | metin | evet    | Şeffaf adres       |
| signature | metin | evet    | Base64 imza        |
| message   | metin | evet    | Özgün mesaj        |

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

| Parametre  | Tür   | Gerekli | Açıklama                               |
|------------|-------|---------|----------------------------------------|
| passphrase | metin | evet    | Cüzdan parolası                        |
| timeout    | sayı  | evet    | Cüzdanın kilidinin açık kalacağı saniye |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parametre          | Tür   | Gerekli | Açıklama                  |
|--------------------|-------|---------|---------------------------|
| transparent_address | metin | evet   | Dönüştürülecek P2PKH adresi |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parametre | Tür   | Gerekli | Açıklama                                           |
|-----------|-------|---------|----------------------------------------------------|
| address   | metin | evet    | Harcama anahtarı dışa aktarılacak Sapling adresi |

> Cüzdanın kilidi açık olmalıdır. Yalnızca Sapling harcama anahtarını dışa aktarır.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parametre    | Tür   | Gerekli | Açıklama       |
|--------------|-------|---------|----------------|
| account_uuid | metin | evet    | Hesap UUID'si  |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parametre         | Tür             | Gerekli | Açıklama                                  |
|-------------------|-----------------|---------|-------------------------------------------|
| account           | metin / sayı    | evet    | Hesap UUID'si veya ZIP-32 hesap dizini |
| receiver_types    | metin dizisi    | hayır   | Dahil edilecek alıcı türleri              |
| diversifier_index | sayı            | hayır   | Belirli bir çeşitlendirici dizini         |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parametre | Tür          | Gerekli | Varsayılan | Açıklama                          |
|-----------|--------------|---------|------------|-----------------------------------|
| account   | metin / sayı | evet    |            | Hesap UUID'si veya ZIP-32 dizini |
| minconf   | sayı         | hayır   | 1          | Asgari onay sayısı                |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parametre | Tür  | Gerekli | Varsayılan | Açıklama             |
|-----------|------|---------|------------|----------------------|
| minconf   | sayı | hayır   | 1          | Asgari onay sayısı   |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parametre    | Tür   | Gerekli | Açıklama                                  |
|--------------|-------|---------|-------------------------------------------|
| account_name | metin | evet    | İnsan tarafından okunabilir ad            |
| seedfp       | metin | hayır   | Cüzdanda birden fazla seed varsa gereklidir |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parametre    | Tür  | Gerekli | Varsayılan | Açıklama                                  |
|--------------|------|---------|------------|-------------------------------------------|
| minconf      | sayı | hayır   | 1          | Asgari onay sayısı                        |
| as_of_height | sayı | hayır   |            | Bu yükseklik itibarıyla sorgula (`-1` = uç) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parametre   | Tür            | Gerekli | Açıklama                                  |
|-------------|----------------|---------|-------------------------------------------|
| operationid | metin dizisi   | hayır   | İşlem kimlikleri (tümü bittiyse belirtmeyin) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parametre   | Tür          | Gerekli | Açıklama                         |
|-------------|--------------|---------|----------------------------------|
| operationid | metin dizisi | hayır   | İşlem kimlikleri (tümü için belirtmeyin) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parametre         | Tür     | Gerekli | Varsayılan | Açıklama                    |
|-------------------|---------|---------|------------|-----------------------------|
| minconf           | sayı    | hayır   | 1          | Asgari onay sayısı          |
| include_watchonly | boolean | hayır   | false      | Salt görüntüleme bakiyelerini de dahil et |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parametre | Tür     | Gerekli | Varsayılan | Açıklama                          |
|-----------|---------|---------|------------|-----------------------------------|
| account   | metin   | evet    |            | Hesap UUID'si                    |
| hex_data  | metin   | evet    |            | Onaltılık biçimdeki açık anahtar veya itfa betiği (redeem script) |
| rescan    | boolean | hayır   | true       | İçe aktardıktan sonra yeniden tara |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parametre    | Tür   | Gerekli | Varsayılan | Açıklama                                 |
|--------------|-------|---------|------------|------------------------------------------|
| key          | metin | evet    |            | Sapling genişletilmiş harcama anahtarı     |
| rescan       | metin | hayır   | `"whenkeyisnew"`      | `"yes"`, `"no"` veya `"whenkeyisnew"` |
| start_height | sayı  | hayır   | 0          | Yeniden tarama başlangıç yüksekliği      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parametre         | Tür     | Gerekli | Varsayılan | Açıklama                           |
|-------------------|---------|---------|------------|------------------------------------|
| include_addresses | boolean | hayır   | true       | Her hesap için adresleri de döndür |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parametre | Tür   | Gerekli | Açıklama                       |
|-----------|-------|---------|--------------------------------|
| status    | metin | hayır   | Duruma göre filtrele (örn. `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parametre    | Tür   | Gerekli | Açıklama                       |
|--------------|-------|---------|--------------------------------|
| account_uuid | metin | hayır   | Tek bir hesapla sınırlandır    |
| start_height | sayı  | hayır   | Dahil olan alt sınır           |
| end_height   | sayı  | hayır   | Hariç olan üst sınır           |
| offset       | sayı  | hayır   | Bu kadar sonucu atla           |
| limit        | sayı  | hayır   | Döndürülecek azami sonuç sayısı |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parametre       | Tür   | Gerekli | Açıklama                  |
|-----------------|-------|---------|---------------------------|
| unified_address | metin | evet    | İncelenecek Birleşik Adres |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parametre         | Tür            | Gerekli | Varsayılan | Açıklama                     |
|-------------------|----------------|---------|------------|------------------------------|
| minconf           | sayı           | hayır   | 1          | Asgari onay sayısı           |
| maxconf           | sayı           | hayır   | ∞          | Azami onay sayısı            |
| include_watchonly | boolean        | hayır   | false      | Salt görüntüleme bakiyelerini de dahil et   |
| addresses         | metin dizisi   | hayır   |            | Bu adreslerle filtrele       |
| as_of_height      | sayı           | hayır   |            | Bu yükseklik itibarıyla sorgula |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parametre | Tür  | Gerekli | Açıklama                                                              |
|-----------|------|---------|-----------------------------------------------------------------------|
| accounts  | dizi | evet    | Nesne dizisi: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parametre      | Tür             | Gerekli | Varsayılan | Açıklama                                               |
|----------------|-----------------|---------|------------|--------------------------------------------------------|
| fromaddress    | metin           | evet    |            | Kaynak adres veya `"ANY_TADDR"`                               |
| amounts        | nesne dizisi    | evet    |            | Alıcılar (`address`, `amount`, isteğe bağlı `memo`) |
| minconf        | sayı            | hayır   |            | Asgari onay sayısı                                     |
| fee            | null            | hayır   |            | `null` olmalıdır (yalnızca ZIP-317)                 |
| privacy_policy | metin           | hayır   | `"FullPrivacy"`      | Gizlilik ilkesi metni                                  |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parametre      | Tür   | Gerekli | Açıklama                                      |
|----------------|-------|---------|-----------------------------------------------|
| fromaddress    | metin | evet    | Şeffaf adres veya hesap UUID'si              |
| toaddress      | metin | evet    | Korumalı hedef                                |
| fee            | null  | hayır   | `null` olmalıdır                              |
| limit          | sayı  | hayır   | Korumaya alınacak azami coinbase UTXO sayısı |
| memo           | metin | hayır   | Onaltılık kodlanmış memo                      |
| privacy_policy | metin | hayır   | `AllowRevealedSenders` veya `AllowLinkingAccountAddresses`                            |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parametre | Tür   | Gerekli | Açıklama      |
|-----------|-------|---------|---------------|
| txid      | metin | evet    | İşlem kimliği |

---

## İlgili Sayfalar

- [Taşıma Rehberi: zcashd'den Zebrad'e ve Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)'e — mevcut bir zcashd kurulumundan adım adım geçiş
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Zallet ile birlikte çalışan düğüm uygulaması
- [Tam Düğümler](/zcash-tech/full-nodes) — tam düğüm çalıştırmanın kapsamı ve neden isteyebileceğiniz
- [Cüzdanlar](/using-zcash/wallets) — tam düğüm ihtiyacınızdan fazlasıysa daha hafif cüzdan seçenekleri
- [İşlemler](/using-zcash/transactions) — korumalı ve şeffaf işlemlerin farkları
