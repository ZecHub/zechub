# MultiSig Demosu

Bu demo `zcashd` gerektirir

## Gerekli kişilerden açık anahtarları toplayın

* https://github.com/iancoleman/bip39
* Eğer `zcashd` kullanıyorsanız, bir UA oluşturabilir ve transparent alıcınızı da kullanabilirsiniz. Ardından açık anahtarınızı çıkarmak için `getPubkey.sh` kullanın.


## 2x Multisig (3 üzerinden 2) t3 adresi oluşturun

Multisig adresinizi ve redeem script'inizi oluşturmak için createMultiSig.sh çalıştırın. Gerekli olan şey 3 açık anahtardır

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1. t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # değişiklik adresi için 2. t3. 

#### NOT: bu örnekte pubk1,pubk4 aynı kişidir, pubk2,pubk5 aynı kişidir ve bu şekilde devam eder ...

#### NOT2: açık anahtarlarınızın SIRASI önemlidir! Buna dikkat edin!!!!


## t3 adresini fonlayın

Adresi fonlamak için herhangi bir cüzdan/faucet kullanın

## MultiSig işlemi oluşturun

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

burada,

```
        txid: yeni t3'ünüze para gönderen işlemin işlem kimliği
   voutIndex: en büyük değere sahip olan vout çıktısının indeksi
scriptPubKey: P2SH kilitleme script'i, HASH160 ve EQUAL opcode'larıyla çevrili başka bir kilitleme script'inin hash'ini (Script Hash) içerir. Bu hex biçimindedir ve getrawtransaction rpc ile bulunur; scriptPubKey alanına bakın
redeemScript: t3'ümüzü oluştururken çıktı olarak verilen redeemScript'in hex değeri. Bu, t3'ten harcama yapmak isteyen herkes için gereklidir.
   oldAmount: yukarıdaki txid'den yeni t3'ünüze gönderilen miktar
       tAddy: fon göndermek istediğiniz adres
      amount: tAddy'ye gönderilecek ZEC miktarı
 changeTaddy: değişiklik adresi (yeni bir redeemScript ile yeni t3!)

```

`./txDetails.sh txid`   => gerekli bilgileri bulmanıza yardımcı olur

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** bu imzalama için gereklidir! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX'i imzalayın

signMultiSigTX.sh dosyasını açın ve özel anahtarlarınızı pk1,pk2, ... değişkenlerine ekleyin.
 

*** Bunları terminalinize yazmanızı tavsiye etmem. ***


Tüm özel anahtarlarınıza erişiminiz varsa, zamandan tasarruf etmek için hepsini aynı anda kullanabilirsiniz,
ancak gerçek dünyadaki örneklerin çoğunda imzalama dünyanın dört bir yanındaki kişiler tarafından yapılacağından, gerekli katılımcıların her birinin imzalaması,
ardından imzalama prosedürünü tamamlamak için diğerlerinin kullanacağı güncellenmiş raxTX "hex" çıktısını geri göndermesi gerekecektir.

İlk işlemi oluşturan kişi, özel anahtarıyla imzalayacak ve diğer katılımcılar tarafından imzalanması gereken güncellenmiş rawTX hex çıktısını gönderecektir.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Bu işlemi imzalamak için, üç özel anahtardan en az 2'sinin bunu imzalaması gerekir. Verdiğiniz açık anahtar `zcashd` içinden bir T-adresi kullanılarak dışa aktarıldıysa, T adresinizin özel anahtarını şu şekilde alabilirsiniz: 


`zcash-cli dumpprivkey "t-addr"`


Bu demo için, gerekli özel anahtarları hızlıca ayırmak amacıyla iancoleman'ın bip39 aracını kullandım.


## İmzalanmış TX'i yayınlayın

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Kaynaklar

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
