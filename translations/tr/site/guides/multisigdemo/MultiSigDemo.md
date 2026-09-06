# MultiSig Demosu

> **Tarihsel. Bu kılavuz artık çalışmıyor.**
>
> Aşağıdaki her adım, 18 Temmuz 2026'da otomatik Destek Sonu durmasına ulaşan zcashd'ye bağlıdır. Bu sayfayla birlikte sunulan yedi betik, onu `zcash-cli` aracılığıyla çalıştırır; dolayısıyla bugün hiçbirisi çalışan bir düğüme erişemez.
>
> Bu betikler mekanik olarak taşınamaz. Bunlar, zcashd'nin durmadan önce kullanımdan kaldırdığı ham işlem ve cüzdan RPC'leri (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey) üzerine kuruludur; Zallet bunların yerine ham işlem hex'i yerine PCZT'ler üzerinde çalışan yeni yöntemler kullanır ve birçok zcashd yöntemi henüz taşınmamış halde hâlâ beta sürümündedir.
>
> Zcash üzerinde bugün çok taraflı saklama için, şeffaf multisig ile doğrudan bir karşılaştırma içeren [FROST & Eşik Saklama](/zcash-tech/frost-threshold-custody) sayfasına ve [Ywallet FROST demosuna](/guides/frostdemo/ywallet-frost-demo) bakın. Mevcut bir düğümü zcashd'den taşımak için [Zebra ve Zallet'e geçiş kılavuzuna](/guides/migration-guide-zcashd-to-zebrad-zallet) bakın.
>
> Bu sayfa, şeffaf multisig iş akışının tarihsel kaydı olarak tutulmaktadır.

Bu demo, 18 Temmuz 2026'da duran ve artık çalışmayan zcashd'yi gerektirir. Aşağıdaki hiçbir şey canlı zincire karşı tamamlanamaz.

## Gerekli kişilerden açık anahtarları toplayın

* https://github.com/iancoleman/bip39
* zcashd kullanıyorsanız bir UA oluşturabilir ve şeffaf alıcınızı da kullanabilirsiniz. Ardından açık anahtarınızı çıkarmak için `getPubkey.sh` kullanın.


## 2x Multisig (3'ten 2) t3 adresi oluşturun

multisig adresinizi ve redeem script'inizi oluşturmak için createMultiSig.sh çalıştırın. Gereken şey 3 açık anahtardır

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # değişiklik adresi için 2. t3. 

#### NOT: bu örnekte pubk1,pubk4 aynı kişidir, pubk2,pubk5 aynı kişidir ve bu şekilde devam eder ...

#### NOT2: pubkey'lerinizin SIRASI önemlidir! Buna dikkat edin!!!!


## t3 adresini fonlayın

Adresi fonlamak için herhangi bir cüzdan/faucet kullanın

## MultiSig işlemi oluşturun

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

burada,

```
        txid: yeni t3'ünüze para gönderen işlemin işlem kimliği
   voutIndex: en yüksek değere sahip olan vout içindeki çıktının indeksi
scriptPubKey: P2SH kilitleme betiği, HASH160 ve EQUAL işlem kodlarıyla çevrelenmiş başka bir kilitleme betiğinin hash'ini (Script Hash) içerir. Bu hex biçimindedir ve getrawtransaction rpc aracılığıyla bulunur; scriptPubKey'i arayın
redeemScript: t3'ümüzü oluştururken çıktı olarak alınan redeemScript'in hex değeri. Bu, t3'ten harcama yapmak isteyen herkes için gereklidir.
   oldAmount: Yukarıdaki txid'den yeni t3'ünüze gönderilen miktar
       tAddy: Fon göndermek istediğiniz adres
      amount: tAddy'ye gönderilecek ZEC miktarı
 changeTaddy: Değişiklik adresi (yeni bir redeemScript ile yeni t3!)

```

`./txDetails.sh txid`   => gerekli bilgileri bulmanıza yardımcı olacaktır

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** bu, imzalama için gereklidir! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX'i imzalayın

signMultiSigTX.sh dosyasını açın ve pk1,pk2, ... değişkenlerine özel anahtarlarınızı ekleyin.
 

*** Bunları terminalinize yazmanızı tavsiye etmem. ***


Tüm özel anahtarlarınıza erişiminiz varsa zaman kazanmak için hepsini aynı anda kullanabilirsiniz,
ancak çoğu gerçek dünya örneğinde imzalama dünyanın farklı yerlerindeki kişiler aracılığıyla yapılacaktır; bu nedenle gerekli katılımcıların her biri imzalamalı,
ardından diğerlerinin imzalama işlemini tamamlamak için kullanacağı güncellenmiş raxTX "hex" çıktısını geri göndermelidir.

İlk tx'i oluşturan kişi, özel anahtarıyla imzalayacak ve diğer katılımcılar tarafından imzalanması gereken güncellenmiş rawTX hex'ini gönderecektir.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Bu tx'i imzalamak için üç özel anahtardan en az ikisinin imzalaması gerekir. Verdiğiniz açık anahtar zcashd'den bir T-adresi kullanılarak dışa aktarıldıysa, T adresinizin özel anahtarını şu şekilde alabilirsiniz: 


`zcash-cli dumpprivkey "t-addr"`

Bu komut zcashd ile durdu ve bugün hiçbir şey döndürmüyor; burada yalnızca demonun anahtarlarını nasıl aldığını göstermek için kaydedilmiştir.


Bu demo için, gerekli özel anahtarları hızlıca ayırmak üzere iancoleman'ın bip39'unu kullandım.


## İmzalanmış TX'i yayınlayın

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Kaynaklar

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
