<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Shielded Newsletter

> Zallet kullanarak, korumalı adreslerden oluşan bir listeye Zcash notları olarak bir markdown notu gönderin. Alıcı listesi ve not, şeffaf adreslerden uzak kalır.

Korumalı bülten, bir dizi korumalı işlemden oluşur. Her çıktı, alıcı bir Unified Address'ye küçük bir tutar öder ve notun sonraki parçasını not alanında taşır. Zallet bu işlemleri oluşturur ve gönderir. Zebra ve Zaino yalnızca zincir verisi sağlar.

Betikler [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter) içinde bulunur. Erken bir Zallet için yazılmışlardır ve mevcut sürümde oldukları gibi çalıştırılmaları güvenli değildir. Bu sayfa güncellenmiş prosedürdür. 7 Ekim 2026 itibarıyla Zallet `v0.1.0-beta.3` ve Zallet kitabına göre kontrol edilmiştir.

## İhtiyacınız olanlar

- RPC'si localhost'a bağlanmış, tamamen senkronize Zebra.
- Bu Zebra düğümüne karşı senkronize edilmiş Zaino.
- RPC'si localhost'a bağlanmış, cüzdan derlemesi olan Zallet `v0.1.0-beta.3` veya daha yenisi. Kitap, `z_sendmany` öğesini uygulanmış olarak listeler. Sayısal ücret reddedilir: `fee` geçirirseniz, `null` olmalıdır; çünkü Zallet her zaman ZIP 317 ücretini kullanır.
- Unified Address korumalı fonları harcayabilen, fonlanmış bir hesap.
- Alıcı Unified Address'leri. Şeffaf bir adresteki not hatadır.

Fonlanmış bir adresi veya bir çerezi wikiye ya da commit edilmiş bir betiğe koymayın. Mevcut `txBuilderFromFile.sh` içinde sabit kodlanmış bir Unified Address vardır. Yerel olarak değiştirin ve commit etmeyin.

## Zallet Yapılandırması

Çalıştırdığınız Zallet ile bir yapılandırma oluşturun, ardından onu Zebra ve Zaino'ye yönlendirin. Eski eğitimdeki örnek, `as_of_version = "0.0.0"` ve kişisel bir ana dizin yolu kullanır. Bu dosyayı şablon olarak değil, anlık görüntü olarak ele alın.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help`, `z_sendmany`, `z_getoperationstatus` ve `z_getoperationresult` öğelerini listelemelidir. RPC'yi yalnızca `127.0.0.1`'ye bağlayın.

## Alıcı listesi

Satır başına bir Unified Address, tırnaksız ve boş satırsız. Betik `daoAddresses.md` dosyasını okur. Eski readme, `daoAddress.md` der. Bu dosya depoda yoktur ve adlar eşleşmez.

```text
u1...
u1...
```

## Bir not gönderme

`z_sendmany` eşzamansızdır. Bir işlem kimliği döndürür. Durum `success` veya hata olana kadar `z_getoperationstatus`'yi sorgulayın. Betiğin yaptığı sabit 5 saniyelik bekleme, derleme daha uzun sürdüğünde sonucu kaybeder. `z_getoperationresult` işlemi tüketir; bu nedenle durum sonlanana kadar çağırmayın.

Ücret belirtilmez. Zallet, ZIP 317'yi hesaplar. Sayı geçirmeyin.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Not alanı ham hex'tir ve en fazla 512 bayttır. `ascii2hex` yalnızca ASCII kodlar. ASCII olmayan herhangi bir karakter içeren bir not başarısız olur. `xxd` veya `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` UTF-8'i işler.

Gizlilik politikası varsayılan olarak `FullPrivacy`'dür. Bu, korumalı bir alıcı için doğru varsayılandır. `AllowFullyTransparent` geçirmeyin.

## Betik kusurları

Bunlar 8 Ekim 2026 itibarıyla ağaçta bulunmaktadır. Düzeltilene kadar `shieldNewsletter.sh` çalıştırmayın.

- `[[ bytesInFile -lt 512 ]]` içinde `$` eksik. Tek not dalı hiçbir zaman çalışmaz.
- Parça döngüsü hex depolar, ardından `hex2ascii` bunu çözer, sonra `txBuilderFromFile.sh` yeniden kodlar. Daha sonraki bir satır 512'yi aşmadıkça son parça gönderilmez. Uzun bir satır bölünmez. Tamamı gönderilir ve 512 baytlık notu aşabilir.
- `txBuilderFromFile.sh`, yapılandırma yolu olmadan `./zallet rpc` çağrısı yapar ve ikili dosyanın mevcut dizinde olmasını bekler. `zallet -c <config> rpc` kullanın.
- `toCurl.sh`, 8232 numaralı bağlantı noktasında bir çerezle Zebra ile konuşur ve `getinfo` ile `sendmany` çağrısı yapar. Zallet, `sendmany` sağlamaz. Blok çıkarma bekleme döngüsü de `$` olmadan `[[ chainHeight -gt temp ]]` kullanır; dolayısıyla beklemez.
- `z_gettotalbalance 0 true` ek konumsal bağımsız değişkenler olarak geçirilir. Bu çağrıyı kullanmadan önce çalıştırdığınız ikili dosyada `rpc help z_gettotalbalance`'yi kontrol edin.
- Her parça, her alıcıya `0.0001` ZEC gönderir. ZIP 317 ücreti buna eklenir. Çok sayıda adrese gönderilen uzun bir not, toz tutarlarından daha fazlasını harcar.

## Bir düzeltmeden sonra

Düzeltilmiş bir çalıştırıcı şunları yapmalıdır:

1. Notu bayt olarak okumalı ve satırlara göre değil, 512 baytlık sınırlarda bölmelidir.
2. Her parçayı bir kez hex olarak kodlamalıdır.
3. Fonlanmış UA, alıcı dizisi ve ücret bağımsız değişkeni olmadan `zallet -c <config> rpc z_sendmany` çağrısı yapmalıdır.
4. Bu işlem kimliği için `z_getoperationstatus`'yi sorgulamalıdır.
5. txid'yi yalnızca `success` sonrasında kaydetmelidir.

Eski eğitim sayfası [Shielded Newsletter betikleri](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md) adresinde kalır. Prosedür için bu sayfayı kullanın.
