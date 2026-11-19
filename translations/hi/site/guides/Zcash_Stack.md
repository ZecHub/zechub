<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zcash Stack: Kubernetes या Docker पर लाइट वॉलेट सर्वर चलाना

[Zcash Stack](https://github.com/zecrocks/zcash-stack), zec.rocks के पीछे की टीम की ओर से ओपन-सोर्स डिप्लॉयमेंट किट है। इसमें Zcash फुल नोड, एक लाइट वॉलेट सर्वर और वैकल्पिक अतिरिक्त सेवाएँ (Zaino, एक ब्लॉक एक्सप्लोरर, Tor हिडन सर्विस, DNS सीडर, zecd, ब्राउज़र वॉलेट के लिए gRPC-web प्रॉक्सी) शामिल हैं। इन्हें Kubernetes के लिए Helm चार्ट और Docker Compose फ़ाइलों के रूप में पैकेज किया गया है। zec.rocks lightwalletd सर्वर इसी चार्ट से चलते हैं। इस प्रोजेक्ट को [Zcash Community Grants](https://zcashcommunitygrants.org/) से फ़ंडिंग मिलती है।

यह पृष्ठ बताता है कि किट क्या डिप्लॉय करती है, इसे इंस्टॉल करने से पहले आपको किन चीज़ों की ज़रूरत होगी और कौन-सी सेटिंग सबसे अहम हैं। यह चार्ट संस्करण **0.4.9** (13 नवंबर, 2026 को जारी) के अनुसार है। प्रोडक्शन में कुछ भी चलाने से पहले प्रोजेक्ट की [चार्ट README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) और [वर्कशॉप नोट्स](https://github.com/zecrocks/zcash-stack/tree/main/docs) पढ़ें।

## संक्षेप में

- **शुरू करने के 2 तरीके।** Kubernetes के लिए Helm चार्ट (अपने NVMe हार्डवेयर पर k3s इसका मुख्य लक्ष्य है; GKE Standard और Autopilot भी काम करते हैं) और एक मशीन के लिए Docker Compose फ़ाइलें। वर्कशॉप में सर्वर चलाने की शुरुआत कर रहे लोगों के लिए Docker और पहले से सर्वर फ़्लीट चलाने वालों के लिए Kubernetes की सलाह दी गई है।
- **एक चेन नोड और एक लाइट वॉलेट सर्वर।** सुझाया गया सेटअप Zebra + lightwalletd है। बैकएंड के रूप में Zakura, Zebra की जगह ले सकता है, और Zaino, lightwalletd की जगह ले सकता है या उसके साथ चल सकता है।
- **लगभग 600 GiB डिस्क की योजना रखें।** जून 2026 में Zebra की चेन स्थिति लगभग 260 GiB थी और बढ़ रही है; लाइट वॉलेट कैश में लगभग 17 GiB और जुड़ते हैं। पूरा सिंक होने में कई दिन लगते हैं, इसलिए चार्ट प्रकाशित स्नैपशॉट से बहाल कर सकता है।
- **चार्ट इमेज संस्करण तय करता है।** 0.4.9 में ये हैं: Zebra 7.0.0 (NU7 का अनुसरण करता है), lightwalletd v0.6.1, Zakura 1.8.6 और Zaino 0.8.0। नेटवर्क अपग्रेड से पहले और Zakura रिलीज़ अपनी सपोर्ट अवधि की ऊँचाई तक पहुँचने से पहले चार्ट अपडेट करें।
- **अपना सर्वर रजिस्टर करें।** सार्वजनिक ऑपरेटर अपना सर्वर [hosh.zec.rocks](https://hosh.zec.rocks/zec) मॉनिटर में जोड़ सकते हैं, ताकि वॉलेट और उपयोगकर्ता देख सकें कि वह चालू है या नहीं।

## क्या डिप्लॉय होता है

हर घटक चार्ट के [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) में एक स्विच है। डिफ़ॉल्ट रूप से सिर्फ़ lightwalletd चालू होता है और उसे चेन नोड चाहिए, इसलिए उदाहरण फ़ाइलें Zebra को भी चालू करती हैं।

| घटक | चार्ट 0.4.9 में इमेज | डिफ़ॉल्ट | इसका काम |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | बंद (उदाहरणों में चालू) | फुल नोड; चेन को वैलिडेट करता है और बाकी सभी सेवाओं को RPC देता है |
| Zakura | `zakuracore/zakura:1.8.6` | बंद | Zebra फ़ोर्क; lightwalletd या Zaino के लिए Zebra की जगह सीधे इस्तेमाल होने वाला बैकएंड |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | चालू | मोबाइल और डेस्कटॉप वॉलेट के लिए लाइट वॉलेट सर्वर (gRPC) |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | बंद | Rust इंडेक्सर, जो लाइट वॉलेट को भी सेवा देता है |
| ब्लॉक एक्सप्लोरर | `emersonian/zcash-explorer:v0.0.6` | बंद | नोड का JSON-RPC पढ़ने वाला वेब एक्सप्लोरर (Zaino इसका बैकएंड नहीं बन सकता: यह केवल gRPC देता है) |
| Tor | `osminogin/tor-simple:0.4.9.16` | बंद | lightwalletd या Zaino को `.onion` सर्विस के रूप में प्रकाशित करता है |
| DNS सीडर | `zfnd/dnsseeder:v1.8.0` | बंद | नए नोड को पीयर खोजने में मदद करता है |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | बंद | शील्डेड को प्राथमिकता देने वाला वॉलेट सर्वर (देखें [zecd](/zcash-tech/zecd)) |
| gRPC-web प्रॉक्सी | `envoyproxy/envoy:v1.40.2` | बंद | ब्राउज़र वॉलेट को lightwalletd से बात करने देता है, जिसे ब्राउज़र सीधे gRPC के ज़रिए नहीं पहुँच सकते |
| WebZjs वॉलेट | `ghcr.io/zecrocks/webzjs-wallet` | बंद | ब्राउज़र वॉलेट; इसी होस्ट पर gRPC-web प्रॉक्सी चालू होना ज़रूरी है |

संस्करण से जुड़ी 2 बातें। Zaino का अपस्ट्रीम संस्करण [0.10.1](https://github.com/zingolabs/zaino/releases) है, जबकि चार्ट में अब भी 0.8.0 इमेज आती है। इसलिए नए Zaino व्यवहार पर निर्भर होने से पहले `values.yaml` देखें। और Zakura नोड Mainnet पर हर रिलीज़ के लिए तय की गई सपोर्ट-अंत ऊँचाई पर रुक जाते हैं: संस्करण 1.8.6 के लिए यह ब्लॉक 3,643,309 है, जो लगभग 5 दिसंबर, 2026 को आएगा। 1.8.0 से x86-64 बिल्ड उन CPU पर शुरू होने से इनकार करते हैं जिनमें BMI2 और ADX नहीं हैं। [Zakura नोड](/zcash-tech/zakura-node) पृष्ठ पर दोनों बातें दी गई हैं।

## Kubernetes: इंस्टॉल करने से पहले

चार्ट तीन ऐसी चीज़ों पर डिप्लॉय होता है जिन्हें हर क्लस्टर के लिए एक बार सेट अप करना होता है।

1. **एक इनग्रे‌स कंट्रोलर।** चार्ट मानक Kubernetes `Ingress` बनाता है और डिफ़ॉल्ट रूप से `nginx` क्लास इस्तेमाल करता है। ingress-nginx की सलाह दी जाती है, क्योंकि यह k3s और GKE पर gRPC को एक ही तरह से संभालता है। k3s पर, `--disable traefik` के साथ k3s इंस्टॉल करें या Traefik को चालू रखें और `ingress.className: traefik` तथा `ingress.backendProtocol: GRPC` सेट करें (इसके बाद चार्ट Traefik `IngressRoute` बनाता है, क्योंकि Traefik के ज़रिए साधारण Ingress पर gRPC के लिए HTTP 500 मिलता है)। GKE पर, बिल्ट-इन `gce` इनग्रे‌स क्लास lightwalletd या Zaino तक gRPC रूट नहीं कर सकती।
2. **cert-manager और एक ClusterIssuer**, ताकि Let's Encrypt सर्टिफ़िकेट अपने-आप जारी हो सकें (`examples/cluster-issuer.yaml`; पहले staging issuer से जाँचें)। GKE Autopilot पर, cert-manager को `--set global.leaderElection.namespace=cert-manager` के साथ इंस्टॉल करें; वरना issuer बनाते समय x509 “”unknown authority”” त्रुटि आती है। cert-manager छोड़कर `<service>.ingress.tls.secretName` को अपने सर्टिफ़िकेट पर भी सेट कर सकते हैं।
3. **एक StorageClass।** NVMe वाले k3s पर `local-path` ठीक है। GKE पर Zebra को एक प्रावधानित-IOPS क्लास दें (रिपॉज़िटरी में Hyperdisk का उदाहरण है) और पहले क्षेत्रीय डिस्क कोटा बढ़ाएँ: नए GKE प्रोजेक्ट में हर क्षेत्र के लिए केवल 500 GB SSD और 500 GB Hyperdisk की अनुमति होती है, जबकि चेन नोड को 300 से 500 GB चाहिए। वरना वॉल्यूम `Pending` में `QUOTA_EXCEEDED` के साथ अटका रहेगा। पहले से मौजूद StatefulSet के लिए `storageClassName` बदलने पर वॉल्यूम फिर से बनाना पड़ता है।

इसके बाद हर होस्टनेम के लिए DNS रिकॉर्ड को इनग्रे‌स कंट्रोलर के बाहरी IP पर सेट करें। अगर आपके पास अभी DNS नहीं है, तो अपने असली होस्टनेम के साथ [sslip.io](https://sslip.io) नाम, जैसे `203-0-113-7.sslip.io`, जोड़ें: यह नाम में मौजूद IP पर रिज़ॉल्व होता है, इसलिए सर्टिफ़िकेट तुरंत जारी किया जा सकता है। स्थायी सर्वर के लिए अपने होस्टनेम को प्राथमिक रखें।

## Kubernetes: इंस्टॉल करना

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) उदाहरण Zebra चालू करता है, lightwalletd को उससे जोड़ता है, lightwalletd के लिए 40 GiB कैश और TLS इनग्रे‌स सेट करता है, और नोड का RPC क्लस्टर के भीतर ही रखता है। इंस्टॉल करने से पहले उदाहरण में दिए RPC उपयोगकर्ता नाम और पासवर्ड बदलें। अन्य उदाहरणों में testnet, GKE, उच्च उपलब्धता वाला GKE Autopilot, Tor हिडन सर्विस और sslip.io बूटस्ट्रैप शामिल हैं।

अपग्रेड करने के लिए `helm repo update` चलाएँ, helm-diff प्लगइन से बदलाव का पूर्वावलोकन करें (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), फिर उन्हीं आर्ग्युमेंट के साथ `helm upgrade` चलाएँ। अगर आप 0.0.x चार्ट से आ रहे हैं, तो पहले [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) पढ़ें: 0.1.0 में पुराना Traefik सेटअप हटाकर मानक Ingress और cert-manager इस्तेमाल किए गए और values का लेआउट बदला गया।

## आकार का अनुमान

| | सामान्य स्थिति | शुरुआती सिंक | डिस्क |
|:--|:--|:--|:--|
| Zebra | लगभग 0.1 vCPU, 1.6 GiB | CPU, IOPS और मेमोरी का भारी इस्तेमाल | लगभग 260 GiB (जून 2026) और बढ़ रहा है; चार्ट का डिफ़ॉल्ट 500 GiB |
| lightwalletd | लगभग 0.15 vCPU, 165 MiB | ब्लॉक दर ब्लॉक कैश बनाता है | लगभग 17 GiB; चार्ट का डिफ़ॉल्ट 40 GiB |

पूरे स्टैक के लिए लगभग 1.5 vCPU और 4.5 GiB मेमोरी चाहिए। एक मशीन के लिए चार्ट 8 vCPU, 32 GiB RAM और लगभग 1 TB NVMe सुझाता है (GKE पर 500 GiB Hyperdisk या pd-ssd वॉल्यूम वाला `n2-standard-8`)। डिफ़ॉल्ट अनुरोध GKE Autopilot की न्यूनतम ज़रूरतें पूरी करते हैं और CPU सीमाएँ तय नहीं की गई हैं, ताकि सिंक के दौरान अतिरिक्त CPU इस्तेमाल हो सके।

## काम की सेटिंग

**स्नैपशॉट से बहाली।** शुरुआत में जेनिसिस से सिंक करने के बजाय प्रकाशित स्नैपशॉट से शुरू करने के लिए `<chain>.initSnapshot.enabled: true` सेट करें (साथ में `initSnapshot.url`, `gs://` या `https://`)। बहाली अपनी प्रगति दर्ज करती है, बीच में रुका डाउनलोड साफ़-सुथरे ढंग से दोबारा करती है और पहले से इंस्टॉल किए गए किसी ठीक वॉल्यूम को कभी मिटाती नहीं है। स्नैपशॉट भरोसे का एक शॉर्टकट है: उसके बाद के ब्लॉक अब भी वैलिडेट होते हैं और खराब स्नैपशॉट के कारण ब्लॉक वैलिडेशन में विफल होते दिखेंगे। वर्कशॉप के अनुसार शुरुआत से सिंक में लगभग 10 दिन और स्नैपशॉट से शुरू करने में लगभग 10 घंटे लगते हैं।

**स्केलिंग और बिना रुकावट के अपडेट।** lightwalletd और Zaino नोड के सामने पतले कैश हैं, इसलिए बिना रुकावट रोलिंग अपडेट के लिए `replicas: 2` चलाएँ (रेप्लिका की संख्या 1 से अधिक होने पर PodDisruptionBudget अपने-आप जुड़ जाता है)। चेन नोड लोड बाँटने के लिए नहीं हैं: हर रेप्लिका अपने वॉल्यूम और सिंक के साथ एक अतिरिक्त फुल नोड होती है। इसलिए एक चलाएँ या अतिरिक्त भरोसे के लिए 2।

**आने वाले पीयर।** डिफ़ॉल्ट रूप से Zebra केवल बाहर की ओर कनेक्शन बनाता है। `zebra.p2pPublic.enabled: true` पोर्ट 8233 पर (testnet पर 18233) आने वाले पीयर स्वीकार करता है और आपका एड्रेस बताता है। बेयर मेटल और k3s पर `externalAddrFrom: hostIP` चुनें, ऐसे क्लाउड पर जहाँ नोड का अपना IP निजी हो `nodeExternalIP` चुनें, या GKE Autopilot पर आरक्षित स्थिर IP के साथ `loadBalancer` चुनें।

**TLS और gRPC।** TLS इनग्रे‌स पर समाप्त होता है और क्लस्टर के भीतर साधारण HTTP/2 चलता है, इसलिए कई होस्टनेम एक lightwalletd पर जा सकते हैं। `pathType: Prefix` के साथ `path: /` रखें, क्योंकि gRPC मेथड पाथ को इसकी ज़रूरत होती है। अगर HTTPS रीडायरेक्ट के कारण पहला सर्टिफ़िकेट जारी नहीं होता, तो staging issuer से जारी करें या कुछ समय के लिए `ingress.tls.sslRedirect: "false"` सेट करें।

**Tor हिडन सर्विस।** जब आपके क्लस्टर के पास सार्वजनिक IP या डोमेन न हो, तब यह काम आती है:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

एड्रेस पढ़ने के लिए `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` इस्तेमाल करें और स्थानीय Tor क्लाइंट से [zecping](https://github.com/zecrocks/zecping) के ज़रिए जाँचें: `./zecping -socks localhost:9150 -addr <address>.onion:443`।

**नेटवर्क अपग्रेड के आसपास।** पुराने संस्करणों पर चल रहे पीयर को Zebra प्रतिबंधित कर सकता है और “”chain updates have stalled”” लॉग संदेश के साथ रुक सकता है। इसकी प्रतिबंध सूची मेमोरी में रहती है, इसलिए `kubectl delete pod zebra-0` उसे साफ़ करता है; पॉड उसी चेन डेटा के साथ फिर शुरू होता है और दोबारा सिंक नहीं करता।

## Docker Compose

एक मशीन के लिए रिपॉज़िटरी क्लोन करें और `docker/` फ़ोल्डर से डिफ़ॉल्ट फ़ाइल शुरू करें:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`, x86 पर Zebra, lightwalletd और [Watchtower](https://containrrr.dev/watchtower/) चलाता है; `compose.arm.yaml` ARM होस्ट पर यही काम करता है। Watchtower नई इमेज अपने-आप डाउनलोड करता है और डिफ़ॉल्ट फ़ाइल `zfnd/zebra:latest` टैग इस्तेमाल करती है, इसलिए नोड बिना मैन्युअल अपग्रेड के नई Zebra रिलीज़ का अनुसरण करता है। `compose.zaino.yaml` में lightwalletd की जगह Zaino आता है, लेकिन इसमें समुदाय की पुरानी इमेज (`emersonian/zcash-zaino:0.1.2-zr4`) तय है, इसलिए इस्तेमाल करने से पहले उसे जाँचें। अन्य फ़ाइलें Caddy TLS फ्रंट एंड, VPS प्रॉक्सी और घर पर मौजूद नोड के लिए autossh टनल जोड़ती हैं।

सर्वर के डोनेशन एड्रेस के रूप में अपना यूनिफ़ाइड एड्रेस प्रकाशित करने के लिए `.env` फ़ाइल में `LIGHTWALLETD_DONATION_ADDRESS` सेट करें। पहले `docker compose up` से पहले `docker/` फ़ोल्डर से `./download-snapshot.sh` चलाने पर शुरुआत से सिंक करने के बजाय चेन स्नैपशॉट डाउनलोड होता है।

## कनेक्ट करना और मॉनिटर करना

वर्कशॉप की दूसरी क्लास में सर्वर को बाहर से उपलब्ध कराने के तरीके बताए गए हैं: सार्वजनिक स्थिर IP, SSH टनल से VPS या Tailscale Funnel तक जोड़कर घर का IP छिपाना, या केवल Tor वाला सर्वर। वॉलेट को सर्वर पर सेट करके नतीजा जाँचें (ZODL में Advanced Settings; देखें [अपने वॉलेट में सर्वर बदलना](/zcash-tech/lightwallet-nodes)) या gRPC क्लाइंट से `GetLightdInfo` कॉल करें।

मॉनिटरिंग के लिए तीसरी क्लास मैन्युअल Docker कमांड बताती है और सार्वजनिक सर्वर को [hosh](https://hosh.zec.rocks/zec), zec.rocks अपटाइम मॉनिटर, में रजिस्टर करने का सुझाव देती है। रजिस्ट्रेशन के लिए पुल रिक्वेस्ट भेजकर अपना होस्टनेम और पोर्ट hosh की सर्वर सूची में जोड़ें। किसी भी चरण में मदद के लिए [zec.rocks वर्कशॉप फ़ोरम](https://workshops.zec.rocks) उपलब्ध है।

## आम गलतियाँ

**चेन नोड के बिना lightwalletd इंस्टॉल करना।** lightwalletd, Zebra (या Zakura) से पढ़ता है। इनमें से एक चालू करें या ऐसी उदाहरण फ़ाइल से शुरू करें जिसमें यह चालू हो।

**उदाहरण वाले RPC क्रेडेंशियल वैसे ही छोड़ देना।** उदाहरणों में असली क्रेडेंशियल की जगह डमी मान हैं। RPC क्लस्टर के भीतर रहता है, फिर भी इन्हें बदलें।

**GKE की डिफ़ॉल्ट डिस्क सीमा पर चेन नोड चलाना।** वॉल्यूम कभी बाइंड नहीं होगा। इंस्टॉल करने से पहले क्षेत्रीय कोटा बढ़ाएँ।

**लोड के लिए Zebra की रेप्लिका बढ़ाना।** हर Zebra रेप्लिका एक अतिरिक्त पूरा सिंक है। इसके बजाय lightwalletd या Zaino को स्केल करें।

**नेटवर्क अपग्रेड के दौरान पुराना चार्ट इस्तेमाल करते रहना।** अपग्रेड से पहले का नोड उसके बाद Mainnet का अनुसरण करना बंद कर देता है (NU7 के बाद से Zebra को 7.0.0 या बाद का संस्करण चाहिए)। `helm repo update` चलाएँ और सक्रियण ऊँचाई तथा Zakura की सपोर्ट-अंत ऊँचाई से पहले चार्ट अपग्रेड करें।

## संबंधित पृष्ठ

- [Zcash लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes): लाइट वॉलेट सर्वर क्या देख सकता है और क्या नहीं, और सार्वजनिक सर्वर।
- [Zebra फुल नोड](/zcash-tech/zebra-full-node): इस स्टैक में चलने वाला वैलिडेटर।
- [Zakura नोड](/zcash-tech/zakura-node): चार्ट जिस Zebra फ़ोर्क को चला सकता है।
- [Zaino](/zcash-tech/zaino): Rust इंडेक्सर।
- [zecd](/zcash-tech/zecd): वह वॉलेट सर्वर जिसे चार्ट जोड़ सकता है।
- [Zcash नोड RPC और इंडेक्सिंग](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet और इंडेक्सर।
- [Zebra को Akash नेटवर्क](/guides/akash-network-zebra) पर चलाने का तरीका: नोड होस्ट करने का एक और तरीका।

## संसाधन

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (रिपॉज़िटरी, रिलीज़ और उदाहरण)
- [Zcash Stack Helm चार्ट README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [वर्कशॉप नोट्स: सिंक, कनेक्ट, मॉनिटर](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub लिस्टिंग](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (सार्वजनिक सर्वर मॉनिटर)

**आख़िरी बार अपडेट किया गया:** नवंबर 2026 (चार्ट 0.4.9)
