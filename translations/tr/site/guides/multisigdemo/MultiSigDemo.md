# MultiSig Demosu

> **Tarihsel. Bu kılavuz artık çalışmıyor.**
>
> Aşağıdaki her adım, 18 Temmuz 2026'da otomatik Destek Sonu durdurmasına ulaşan zcashd'e bağlıdır. Bu sayfayla birlikte sunulan yedi betik onu `zcash-cli` aracılığıyla çalıştırır; dolayısıyla bugün hiçbirisi çalışan bir düğüme erişemez.
>
> Bu betikler mekanik olarak taşınamaz. Durdurma öncesinde zcashd'in kullanımdan kaldırdığı ham işlem ve cüzdan RPC'leri (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) üzerine kuruludurlar; Zallet bunları ham işlem hex'i yerine PCZT'ler üzerinde çalışan yeni yöntemlerle değiştirir ve birçok zcashd yöntemi henüz taşınmamış olarak hâlâ beta aşamasındadır.
>
> Bugün Zcash üzerinde çok taraflı saklama için, şeffaf multisig ile doğrudan karşılaştırma içeren [FROST & Eşik Saklama](/zcash-tech/frost-threshold-custody) sayfasına ve çalışan [Ywallet FROST demosuna](/guides/frostdemo/ywallet-frost-demo) bakın. Mevcut bir düğümü zcashd'den taşımak için [Zebra ve Zallet'e geçiş kılavuzuna](/guides/migration-guide-zcashd-to-zebrad-zallet) bakın.
>
> Bu sayfa, şeffaf multisig iş akışının tarihsel kaydı olarak tutulmaktadır.

Bu demo, 18 Temmuz 2026'da duran ve artık çalışmayan zcashd gerektirir. Aşağıdakilerin hiçbiri canlı zincirde tamamlanamaz.

## Gerekli kişilerden genel anahtarları toplayın

* https://github.com/iancoleman/bip39
* zcashd kullanıyorsanız bir UA oluşturabilir ve şeffaf alıcınızı da kullanabilirsiniz. Ardından genel anahtarınızı çıkarmak için `getPubkey.sh` kullanın.


## 2x Multisig (3'ten 2) t3 adresi oluşturun

Multisig adresinizi ve redeem script'inizi oluşturmak için createMultiSig.sh çalıştırın. Gerekli olan 3 genel anahtardır

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # değişiklik adresi için 2. t3. 

#### NOT: bu örnekte pubk1,pubk4 aynı kişidir, pubk2,pubk5 aynı kişidir ve bu şekilde devam eder ...

#### NOT2: genel anahtarlarınızın SIRASI önemlidir! Buna dikkat edin!!!!


## t3 adresine fon gönderin

Adrese fon göndermek için herhangi bir cüzdan/faucet kullanın

## MultiSig işlemi oluşturun

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

burada,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => gerekli bilgileri bulmanıza yardımcı olur

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX'i imzalayın

signMultiSigTX.sh dosyasını açın ve pk1,pk2, ... değişkenlerine özel anahtarlarınızı ekleyin.
 

*** Bunları terminalinize yazmanızı önermem. ***


Tüm özel anahtarlarınıza erişiminiz varsa zaman kazanmak için hepsini aynı anda kullanabilirsiniz,
ancak çoğu gerçek dünya örneğinde imzalama dünyanın farklı yerlerindeki kişiler tarafından yapılacaktır; bu nedenle gerekli katılımcıların her biri imzalamalı,
ardından diğerlerinin imzalama işlemini tamamlamak için kullanacağı güncellenmiş raxTX "hex" çıktısını geri göndermelidir.

İlk tx'i oluşturan kişi, özel anahtarıyla imzalayacak ve diğer katılımcıların imzalaması gereken güncellenmiş rawTX hex'ini gönderecektir.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Bu tx'i imzalamak için üç özel anahtardan en az ikisinin imzalaması gerekir. Verdiğiniz genel anahtar zcashd'den bir T-adresi kullanılarak dışa aktarıldıysa, T adresinizin özel anahtarını şu komutla alabilirsiniz: 


`zcash-cli dumpprivkey "t-addr"`

Bu komut zcashd ile birlikte durdu ve bugün hiçbir şey döndürmüyor; burada yalnızca demonun anahtarlarını nasıl elde ettiğini göstermek için kaydedilmiştir.


Bu demo için gerekli özel anahtarları hızla ayırmak amacıyla iancoleman'ın bip39'unu kullandım.


## İmzalı TX'i yayınlayın

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Kaynaklar

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
