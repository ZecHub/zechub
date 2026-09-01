# MultiSig Demo

> **Tarihsel. Bu rehber artık çalışmıyor.**
>
> Aşağıdaki her adım, 18 Temmuz 2026 tarihinde otomatik Destek Sonu duruşuna ulaşan zcashd'ye bağlıdır. Bu sayfayla birlikte sunulan yedi betik onu `zcash-cli` üzerinden yönlendirir, bu yüzden bugün hiçbirinin çalışan bir düğüme ulaşması mümkün değildir.
>
> Bu betikler mekanik olarak taşınamaz. Duruştan önce zcashd'nin kullanımdan kaldırdığı ham işlem ve cüzdan RPC'leri (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) üzerine kuruludurlar; Zallet bunların yerine ham işlem hex'i yerine PCZT'ler üzerinde çalışan yeni yöntemler koyar ve hâlâ beta aşamasındadır, ayrıca birçok zcashd yöntemi henüz taşınmamıştır.
>
> Günümüzde Zcash üzerinde çok taraflı saklama için [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) sayfasına bakın; bu sayfa şeffaf multisig ile doğrudan bir karşılaştırma ve çalışan [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo) içermektedir. Mevcut bir düğümü zcashd'den taşımak için [Zebra ve Zallet'e geçiş rehberi](/guides/migration-guide-zcashd-to-zebrad-zallet) sayfasına bakın.
>
> Bu sayfa, şeffaf multisig iş akışının tarihsel bir kaydı olarak tutulmaktadır.

Bu demo, 18 Temmuz 2026 tarihinde duran ve artık çalışmayan zcashd gerektirir. Aşağıdakilerin hiçbiri canlı zincirde tamamlanamaz.

## Gerekli kişilerden açık anahtarları toplayın

* https://github.com/iancoleman/bip39
* zcashd kullanıyorsanız bir UA oluşturabilir ve şeffaf alıcınızı da kullanabilirsiniz. Ardından açık anahtarınızı çıkarmak için `getPubkey.sh` kullanın.


## 2x Multisig (3 üzerinden 2) t3 adresleri oluşturun

multisig adresinizi ve redeem script'inizi oluşturmak için createMultiSig.sh çalıştırın. Gerekli olan şey 3 açık anahtardır

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # değişiklik adresi için 2. t3. 

#### NOT: bu örnekte pubk1,pubk4 aynı kişidir, pubk2,pubk5 aynı kişidir ve bu şekilde devam eder ...

#### NOT2: açık anahtarlarınızın SIRASI önemlidir! Buna dikkat edin!!!!


## t3 adresine fon gönderin

Adrese fon göndermek için herhangi bir cüzdan/faucet kullanın

## MultiSig işlemi oluşturun

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

burada,

```
        txid: yeni t3 adresinize para gönderen işlemin işlem kimliği
   voutIndex: en büyük değere sahip çıktının vout içindeki indeksi
scriptPubKey: P2SH kilitleme script'i, HASH160 ve EQUAL opcod'larıyla çevrelenmiş başka bir kilitleme script'inin hash'ini (Script Hash) içerir. Bu değer hex biçimindedir ve getrawtransaction rpc aracılığıyla bulunur; scriptPubKey alanını arayın
redeemScript: t3 oluşturulurken çıktı olarak verilen redeemScript'in hex değeri. t3'ten harcama yapmak isteyen herkesin buna ihtiyacı vardır.
   oldAmount: yukarıdaki txid'den yeni t3 adresinize gönderilen miktar
       tAddy: fon göndermek istediğiniz adres
      amount: tAddy adresine gönderilecek ZEC miktarı
 changeTaddy: değişiklik adresi (yeni bir redeemScript ile yeni t3!)

```

`./txDetails.sh txid`   => gerekli bilgileri bulmanıza yardımcı olur

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** bu, imzalama için gereklidir! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX'i imzalayın

signMultiSigTX.sh dosyasını açın ve özel anahtarlarınızı pk1,pk2, ... değişkenlerine ekleyin.
 

*** Bunları terminalinize yazmanızı tavsiye etmem. ***


Tüm özel anahtarlarınıza erişiminiz varsa zamandan tasarruf etmek için hepsini tek seferde kullanabilirsiniz,
ancak gerçek dünyadaki örneklerin çoğunda imzalama dünyanın farklı yerlerindeki kişiler tarafından yapılacaktır; bu yüzden gerekli katılımcıların her birinin imzalaması,
ardından imzalama prosedürünü tamamlamak için diğerlerinin kullanacağı güncellenmiş raxTX "hex" çıktısını geri göndermesi gerekir.

İlk işlemi oluşturan kişi, özel anahtarıyla imzalayacak ve diğer katılımcıların imzalaması gereken güncellenmiş rawTX hex'ini gönderecektir.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Bu işlemi imzalamak için üç özel anahtardan en az 2'sinin imza atması gerekir. Verdiğiniz açık anahtar zcashd'den bir T-adresi kullanılarak dışa aktarıldıysa, T adresinizin özel anahtarını şu komutla alabilirsiniz: 


`zcash-cli dumpprivkey "t-addr"`

Bu komut zcashd ile birlikte durdu ve bugün hiçbir şey döndürmüyor; burada yalnızca demonun anahtarlarını nasıl elde ettiğini göstermek için kaydedilmiştir.


Bu demo için gerekli özel anahtarları hızlıca izole etmek amacıyla iancoleman'ın bip39 aracını kullandım.


## İmzalanmış TX'i yayınlayın

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Kaynaklar

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
