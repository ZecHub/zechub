![Tor logo](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: Rust ile Yeni Nesil Tor İstemcisi**
![Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti**, Tor Project'in **Rust** programlama dilini kullanarak yeni nesil bir **Tor** istemcisi oluşturma girişimidir. Arti; modüler, gömülebilir ve üretime hazır olacak şekilde tasarlanmıştır ve **Tor** anonimlik protokollerinin daha güvenli ve verimli bir uygulamasını sunar. **Arti sürüm 1.4.0** ile birlikte birkaç önemli güncelleme sunulmuştur:

- Geliştirilmiş etkileşim için **yeni bir RPC arayüzü**.
- **Röle desteği** için hazırlık çalışmaları.
- **Hizmet tarafındaki onion service hizmet engelleme saldırılarına karşı dayanıklılıkta** iyileştirmeler.

Bu sürüm, Tor Project'in Tor kullanıcıları ve geliştiricileri için daha iyi güvenlik, performans ve modülerlik sunma çabalarını sürdürmektedir.


---


## **Arti İstemcisinin Kurulumu**

Sisteminizde **Arti**'yi bir SOCKS proxy olarak kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

---

### **Adım 1: Bir Rust Geliştirme Ortamı Kurun**

Arti'yi kaynak koddan derleyebilmeniz için önce **Rust**'ın en güncel kararlı sürümünün kurulu olması gerekir.

#### Rust'ı Kurmak İçin:

1. Resmî [Rust web sitesini](https://www.rust-lang.org/) ziyaret edin.
2. İşletim sisteminize uygun kurulum talimatlarını izleyin.
3. Kurulumu şu komutu çalıştırarak doğrulayın:
   
   ```sh
   rustc --version
   ```

Bu, sisteminizde Rust'ın en güncel kararlı sürümünün kurulu olduğunu doğrulayacaktır.

#### **Windows Kullanıcıları İçin Not**:
- Rust, Windows'ta bir araç zinciri yükleyicisi olan [**Rustup**](https://rustup.rs/) aracılığıyla kurulabilir. Uyumlu bir derleme ortamı da kurduğunuzdan emin olun (Windows'ta **Visual Studio Build Tools** gerekebilir).
  
---

### **Adım 2: Arti Deposunu Klonlayın**

Arti istemcisinin en güncel sürümünü edinmek için depoyu [**GitLab**](https://gitlab.torproject.org/tpo/core/arti) üzerinden klonlamanız gerekir.

#### Adımlar:
1. Terminalinizi açın (Windows'ta Command Prompt, PowerShell veya Git Bash).
2. Depoyu klonlamak için aşağıdaki komutu çalıştırın:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yeni oluşturulan *arti* dizinine gidin:
   
   ```sh
   cd arti
   ```

Bu işlem, Arti'nin kaynak kodunu yerel makinenize indirecektir.

---

### **Adım 3: Arti İkili Dosyasını Derleyin**

Depoyu klonladıktan sonra, Rust'ın paket yöneticisi ve derleme aracı olan **Cargo** kullanarak Arti'yi derlemeniz gerekir.

#### Arti'yi Derlemek İçin:
1. Terminalde aşağıdaki komutu çalıştırın:
   ```sh
   cargo build --release
   ```

Bu komut Arti kodunu derler ve üretim için optimize eder (*--release* bayrağı). İkili dosya *target/release* dizininde oluşturulacaktır.

#### Derlenmiş İkili Dosyanın Konumu:
- Derleme tamamlandıktan sonra Arti ikili dosyası şu konumda bulunacaktır:  
  ```sh
  target/release/arti
  ```

Bu ikili dosyayı doğrudan terminalden çalıştırabilirsiniz.

---

### **Adım 4: Arti SOCKS Proxy'sini Çalıştırın**

Arti'yi bir SOCKS proxy olarak kullanmak için (internet trafiğinizi Tor ağı üzerinden yönlendirecektir), proxy'yi başlatmanız gerekir.

#### SOCKS Proxy'sini Başlatmak İçin:
1. Aşağıdaki komutu çalıştırın:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Bu komut, Arti'yi **9150 portunda** bir **SOCKS5 proxy** olarak başlatır; bu, Tor'un SOCKS trafiği için kullandığı varsayılan porttur.

---

### **Adım 5: Uygulamaları Arti'yi Kullanacak Şekilde Yapılandırın**

Arti bir SOCKS proxy olarak çalışmaya başladıktan sonra, uygulamalarınızı trafiği Tor ağı üzerinden yönlendirmek için onu kullanacak şekilde yapılandırmanız gerekir.

#### Adımlar:
1. Uygulamanızın ayarlarında (ör. web tarayıcısı, terminal uygulaması) **proxy ayarlarını** bulun.
2. **SOCKS5 proxy** ayarını *localhost:9150* olarak belirleyin.

Bu işlem, uygulamalarınızdan gelen tüm trafiği Arti'yi aracı olarak kullanarak **Tor ağı** üzerinden yönlendirecektir.

---

## **Arti'nin Tor Ağı ile Entegrasyonu**

Aşağıda, Arti'nin Tor ağıyla birlikte nasıl çalıştığını göstermek için basitleştirilmiş bir şema yer almaktadır:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application**, **SOCKS5** protokolünü kullanarak **Arti SOCKS Proxy**'ye bağlanır.
- Arti daha sonra **Tor ağı** ile iletişim kurar ve trafiğinizin ağ üzerinden geçerken anonimleştirilmesini sağlar.

---

## **GitLab Deposu ve Katkıda Bulunma**

**Arti**'nin geliştirilmesine katkıda bulunmak istiyorsanız, kodu inceleyebilir ve **GitLab** üzerinden katkı sağlayabilirsiniz.

- **Depo Bağlantısı**: [Arti GitLab Deposu](https://gitlab.torproject.org/tpo/core/arti)
- **Depoyu Klonlayın**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork'lama ve Katkıda Bulunma**:
1. GitLab üzerinde depoyu **fork**'layın (GitLab hesabı gerektirir).
2. Fork'ladığınız depoyu yerel kurulumunuza bağlayın:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   *_name_* kısmını GitLab kullanıcı adınızla değiştirin.

3. Değişiklikleri fork'unuza **push** edin:
   ```sh
   git push _name_ main
   ```

4. GitLab üzerinde bir **Merge Request (MR)** oluşturun:
   GitLab fork'unuzdaki Merge Request bölümüne gidin:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request Yönergeleri**:
- **İnceleme sırasında commit'leri rebase edip squash yapmayın**.
- Gerekirse otomatik squash için *fixup!* veya *squash!* kullanın.
- İnceleme döngüsü boyunca squash yapmak yerine **yeni commit'ler eklemeyi** hedefleyin.

---

### **Ek Notlar**:

- **Önceden Derlenmiş İkili Dosyalar**: Şu anda **Arti** resmî olarak önceden derlenmiş ikili dosyalar sunmamaktadır. Yukarıda açıklandığı gibi istemciyi kaynak koddan derlemeniz gerekir.
- **Rust Bilgisi**: Arti'ye katkıda bulunuyorsanız, kod tabanının hâlâ gelişmekte olduğunu ve yeni özellikler eklendikçe değişiklikler veya yeniden düzenlemeler olabileceğini unutmayın.

---



Projeye katkıda bulunmakla ilgileniyorsanız, kodu incelemekten, depoyu fork'lamaktan ve bir Merge Request göndermekten çekinmeyin. Daha fazla bilgi, güncellemeler ve sorun giderme için [Arti GitLab Deposu](https://gitlab.torproject.org/tpo/core/arti) sayfasına başvurun. 

**Arti** ile deneyiminizin keyfini çıkarın ve iyi hack'lemeler!

---
