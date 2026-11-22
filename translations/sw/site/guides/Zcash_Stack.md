<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zcash Stack: Endesha Seva ya Pochi Nyepesi kwenye Kubernetes au Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) ni kifurushi huria cha usanidi kutoka kwa timu iliyo nyuma ya zec.rocks. Kinaweka pamoja full node ya Zcash, seva ya pochi nyepesi na nyongeza za hiari (Zaino, kivinjari cha block, huduma fiche ya Tor, DNS seeder, zecd, proksi ya gRPC-web kwa pochi za kivinjari) kama chati ya Helm ya Kubernetes na kama faili za Compose za Docker. Seva zote za zec.rocks lightwalletd huendeshwa kutoka kwenye chati hii. Mradi unafadhiliwa na [Zcash Community Grants](https://zcashcommunitygrants.org/).

Ukurasa huu unatoa muhtasari wa kile ambacho kifurushi huweka, unachohitaji kabla ya kukisakinisha, na mipangilio iliyo muhimu zaidi. Unafuata toleo la chati **0.4.9** (lililotolewa Novemba 13, 2026). [README ya chati](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) na [maelezo ya warsha](https://github.com/zecrocks/zcash-stack/tree/main/docs) ya mradi ndiyo marejeo; yasome kabla ya kuendesha chochote katika mazingira ya uzalishaji.

## Kwa kifupi

- **Njia mbili za kuanza.** Chati ya Helm ya Kubernetes (k3s kwenye maunzi yako mwenyewe ya NVMe ndiyo lengo kuu; GKE Standard na Autopilot pia zinafanya kazi) na faili za Compose za Docker kwa mashine moja. Warsha inapendekeza Docker ikiwa wewe ni mgeni katika kuendesha seva na Kubernetes ikiwa tayari unaendesha makundi ya seva.
- **Node moja ya mnyororo pamoja na seva ya pochi nyepesi.** Mpangilio unaopendekezwa ni Zebra + lightwalletd. Zakura inaweza kuchukua nafasi ya Zebra kama mfumo wa nyuma, na Zaino inaweza kuchukua nafasi ya lightwalletd au kuendeshwa sambamba nayo.
- **Panga takriban GiB 600 za nafasi ya diski.** Hali ya mnyororo ya Zebra ilikuwa takriban GiB 260 mwezi Juni 2026 na inaendelea kukua; akiba ya pochi nyepesi huongeza takriban GiB 17. Usawazishaji kamili huchukua siku, kwa hiyo chati inaweza kurejesha kutoka kwenye nakala rudufu iliyochapishwa.
- **Chati hubandika matoleo ya picha.** Katika 0.4.9 hayo ni Zebra 7.0.0 (hufuata NU7), lightwalletd v0.6.1, Zakura 1.8.6 na Zaino 0.8.0. Sasisha chati kabla ya maboresho ya mtandao na kabla toleo la Zakura halijafikia urefu wake wa mwisho wa usaidizi.
- **Sajili seva yako.** Waendeshaji wa seva za umma wanaweza kuongeza seva yao kwenye kifuatiliaji cha [hosh.zec.rocks](https://hosh.zec.rocks/zec) ili pochi na watumiaji waone ikiwa inafanya kazi.

## Kinachowekwa

Kila kipengele kina swichi kwenye [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) ya chati. lightwalletd pekee ndiyo inayowashwa kwa chaguomsingi, na inahitaji node ya mnyororo, kwa hiyo faili za mfano huwasha Zebra pia.

| Kipengele | Picha kwenye chati 0.4.9 | Chaguomsingi | Kazi yake |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | imezimwa (imewashwa kwenye mifano) | Full node; huthibitisha mnyororo na kutoa RPC kwa vipengele vingine vyote |
| Zakura | `zakuracore/zakura:1.8.6` | imezimwa | Fork ya Zebra; mfumo mbadala wa nyuma wa lightwalletd au Zaino badala ya Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | imewashwa | Seva ya pochi nyepesi (gRPC) kwa pochi za simu na kompyuta |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | imezimwa | Kielezo cha Rust ambacho pia huhudumia pochi nyepesi |
| Kivinjari cha block | `emersonian/zcash-explorer:v0.0.6` | kimezimwa | Kivinjari cha wavuti kinachosoma JSON-RPC ya node (Zaino haiwezi kukiendesha: hutoa gRPC pekee) |
| Tor | `osminogin/tor-simple:0.4.9.16` | kimezimwa | Huchapisha lightwalletd au Zaino kama huduma ya `.onion` |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | imezimwa | Husaidia node mpya kupata rika |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | imezimwa | Seva ya pochi inayotanguliza faragha (tazama [zecd](/zcash-tech/zecd)) |
| Proksi ya gRPC-web | `envoyproxy/envoy:v1.40.2` | imezimwa | Huwezesha pochi za kivinjari kuwasiliana na lightwalletd, ambayo vivinjari haviwezi kuifikia kupitia gRPC ghafi |
| Pochi ya WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | imezimwa | Pochi ya kivinjari; inahitaji proksi ya gRPC-web iwashwe kwenye seva pangishi hiyo hiyo |

Maelezo mawili kuhusu matoleo. Toleo la juu la Zaino ni [0.10.1](https://github.com/zingolabs/zaino/releases) huku chati ikiendelea kusambaza picha ya 0.8.0, kwa hiyo angalia `values.yaml` kabla ya kutegemea tabia mpya zaidi ya Zaino. Pia, node za Zakura husimama kwenye Mainnet zinapofikia urefu wa mwisho wa usaidizi wa kila toleo: kwa 1.8.6 huo ni block 3,643,309, karibu Desemba 5, 2026, na matoleo ya x86-64 tangu 1.8.0 hukataa kuanza kwenye CPU zisizo na BMI2 na ADX. Ukurasa wa [Zakura Node](/zcash-tech/zakura-node) unashughulikia yote mawili.

## Kubernetes: kabla ya kusakinisha

Chati huwekwa dhidi ya vitu vitatu unavyosanidi mara moja kwa kila kundi.

1. **Kidhibiti cha ingress.** Chati huunda Kubernetes `Ingress` ya kawaida na hutumia darasa la `nginx` kwa chaguomsingi; ingress-nginx inapendekezwa kwa sababu hushughulikia gRPC kwa namna ileile kwenye k3s na GKE. Kwenye k3s, sakinisha k3s kwa `--disable traefik` au acha Traefik na uweke `ingress.className: traefik` pamoja na `ingress.backendProtocol: GRPC` (kisha chati hutoa Traefik `IngressRoute`, kwa sababu Ingress ya kawaida kupitia Traefik hurudisha HTTP 500 kwa gRPC). Kwenye GKE, darasa la ingress la `gce` lililojengewa ndani haliwezi kuelekeza gRPC kwenda lightwalletd au Zaino.
2. **cert-manager na ClusterIssuer** kwa ajili ya vyeti vya Let's Encrypt vya kiotomatiki (`examples/cluster-issuer.yaml`; jaribu kwanza kwa kutumia mtoaji wa staging). Kwenye GKE Autopilot, sakinisha cert-manager kwa `--set global.leaderElection.namespace=cert-manager`, la sivyo uundaji wa mtoaji hushindwa kwa kosa la x509 la "unknown authority". Unaweza kuruka cert-manager na kuelekeza `<service>.ingress.tls.secretName` kwenye cheti chako mwenyewe badala yake.
3. **StorageClass.** `local-path` inafaa kwenye k3s yenye NVMe. Kwenye GKE, ipatie Zebra darasa la IOPS lililotengewa mapema (repo ina mfano wa Hyperdisk) na uongeze kwanza kiwango cha juu cha diski cha eneo: miradi mipya ya GKE huruhusiwa GB 500 pekee za SSD na GB 500 za Hyperdisk kwa kila eneo, na node ya mnyororo huhitaji GB 300 hadi 500, kwa hiyo ujazo hubaki kwenye `Pending` ukiwa na `QUOTA_EXCEEDED`. `storageClassName` haiwezi kubadilishwa kwenye StatefulSet iliyopo bila kuunda upya ujazo.

Kisha elekeza rekodi ya DNS ya kila jina la seva pangishi kwenye IP ya nje ya kidhibiti cha ingress. Ikiwa bado huna DNS, orodhesha jina la [sslip.io](https://sslip.io) kama `203-0-113-7.sslip.io` pamoja na jina lako halisi la seva pangishi: hutatua hadi IP iliyojumuishwa, kwa hiyo cheti hutolewa mara moja. Hifadhi jina lako mwenyewe la seva pangishi kama jina kuu kwa seva za kudumu.

## Kubernetes: kusakinisha

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

Mfano wa [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) huwasha Zebra, huunganisha lightwalletd nayo, huipa lightwalletd akiba ya GiB 40 na ingress ya TLS, na huweka RPC ya node ndani ya kundi. Badilisha jina la mtumiaji na nenosiri la RPC la mfano kabla ya kusakinisha. Mifano mingine inajumuisha testnet, GKE, GKE Autopilot yenye upatikanaji wa juu, huduma fiche ya Tor na usanidi wa kuanzia wa sslip.io.

Ili kusasisha, endesha `helm repo update`, hakiki mabadiliko kwa programu-jalizi ya helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), kisha `helm upgrade` kwa hoja zilezile. Ikiwa unasasisha kutoka kwenye chati ya 0.0.x, soma [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) kwanza: 0.1.0 ilibadilisha usanidi wa zamani wa Traefik na kuweka Ingress ya kawaida na cert-manager, na mpangilio wa thamani ulibadilika.

## Mahitaji ya rasilimali

| | Hali ya kawaida | Usawazishaji wa awali | Diski |
|:--|:--|:--|:--|
| Zebra | takriban vCPU 0.1, GiB 1.6 | Hutumia CPU, IOPS na kumbukumbu nyingi | takriban GiB 260 (Juni 2026) na inaongezeka; chati huweka GiB 500 kwa chaguomsingi |
| lightwalletd | takriban vCPU 0.15, MiB 165 | Huunda akiba yake block baada ya block | takriban GiB 17; chati huweka GiB 40 kwa chaguomsingi |

Mfumo mzima huomba takriban vCPU 1.5 na GiB 4.5 za kumbukumbu. Kwa mashine moja, chati inapendekeza vCPU 8, GiB 32 za RAM na takriban TB 1 ya NVMe (kwenye GKE, `n2-standard-8` yenye ujazo wa Hyperdisk au pd-ssd wa GiB 500). Mahitaji chaguomsingi tayari yanakidhi viwango vya chini vya GKE Autopilot, na mipaka ya CPU haijawekwa ili usawazishaji uweze kutumia rasilimali za ziada.

## Mipangilio muhimu

**Kurejesha kutoka kwenye snapshot.** Weka `<chain>.initSnapshot.enabled: true` (kwa kutumia `initSnapshot.url`, `gs://` au `https://`) ili kuanza kutoka kwenye snapshot iliyochapishwa badala ya kusawazisha kuanzia mwanzo wa mnyororo. Mchakato wa urejeshaji hurekodi hatua yake, hurudia upakuaji uliokatizwa kwa usafi na haufuti kamwe ujazo salama kutoka kwenye usakinishaji wa awali. Snapshot ni njia ya mkato ya kuamini: block zinazofuata bado huthibitishwa, na snapshot mbovu huonekana kupitia block zinazoshindwa kuthibitishwa. Warsha inakadiria usawazishaji kuanzia mwanzo kuchukua takriban siku 10 na kuanza kutoka kwenye snapshot kuchukua takriban saa 10.

**Kupanuwa uwezo na kutopata muda wa kusimama.** lightwalletd na Zaino ni akiba ndogo mbele ya node, kwa hiyo endesha `replicas: 2` ili kusasisha hatua kwa hatua bila muda wa kusimama (PodDisruptionBudget huongezwa kiotomatiki nakala zinapozidi 1). Node za mnyororo hazikusudiwi kushughulikia mzigo mkubwa: kila nakala ni full node nyingine yenye ujazo wake na usawazishaji wake, kwa hiyo endesha moja au mbili kwa ajili ya uhimilivu.

**Rika zinazoingia.** Kwa chaguomsingi Zebra huanzisha miunganisho inayotoka pekee. `zebra.p2pPublic.enabled: true` hukubali miunganisho ya rika inayoingia kwenye port 8233 (18233 kwenye testnet) na kutangaza anwani yako; chagua `externalAddrFrom: hostIP` kwenye seva halisi na k3s, `nodeExternalIP` kwenye mifumo ya wingu ambako IP ya node yenyewe ni ya faragha, au `loadBalancer` yenye IP tuli iliyohifadhiwa kwenye GKE Autopilot.

**TLS na gRPC.** TLS huishia kwenye ingress na HTTP/2 ya kawaida huendeshwa ndani ya kundi, kwa hiyo majina kadhaa ya seva pangishi yanaweza kuelekezwa kwenye lightwalletd moja. Hifadhi `path: /` pamoja na `pathType: Prefix`, kwa sababu njia za mbinu za gRPC zinaihitaji. Ikiwa cheti cha kwanza kitashindwa kwa sababu ya uelekezaji upya wa HTTPS, kitolee kwa mtoaji wa staging au weka `ingress.tls.sslRedirect: "false"` kwa muda.

**Huduma fiche ya Tor.** Hufaa wakati kundi lako halina IP ya umma au kikoa:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Pata anwani kwa `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` na uijaribu kupitia kiteja cha Tor cha ndani kwa [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Wakati wa maboresho ya mtandao.** Zebra inaweza kupiga marufuku rika zinazoendelea kutumia matoleo ya zamani na kusimama, huku ikirekodi kuwa masasisho ya mnyororo yamesimama. Orodha yake ya marufuku huhifadhiwa kwenye kumbukumbu, kwa hiyo `kubectl delete pod zebra-0` huifuta; podi hurudi ikiwa na data ileile ya mnyororo bila kusawazisha upya.

## Docker Compose

Kwa mashine moja, nakili repo na uanzishe faili chaguomsingi kutoka kwenye folda ya `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` huendesha Zebra, lightwalletd na [Watchtower](https://containrrr.dev/watchtower/) kwenye x86; `compose.arm.yaml` hufanya vivyo hivyo kwenye seva pangishi za ARM. Watchtower hupakua picha mpya kiotomatiki, na faili chaguomsingi hutumia lebo ya `zfnd/zebra:latest`, kwa hiyo node hufuata matoleo mapya ya Zebra bila masasisho ya mkono. `compose.zaino.yaml` hubadilisha lightwalletd na kuweka Zaino, lakini hubandika picha ya zamani ya jumuiya (`emersonian/zcash-zaino:0.1.2-zr4`), kwa hiyo ichunguze kabla ya kuitumia. Faili nyingine huongeza sehemu ya mbele ya Caddy TLS, proksi ya VPS na handaki la autossh kwa node zilizo nyumbani.

Weka `LIGHTWALLETD_DONATION_ADDRESS` kwenye faili ya `.env` iwe anwani yako iliyounganishwa ili ichapishwe kama anwani ya michango ya seva. Kuendesha `./download-snapshot.sh` kutoka kwenye folda ya `docker/` kabla ya `docker compose up` ya kwanza hupakua snapshot ya mnyororo badala ya kusawazisha kuanzia mwanzo.

## Kuunganisha na kufuatilia

Darasa la pili la warsha linaeleza jinsi ya kuweka seva wazi: IP tuli ya umma, kuficha IP ya nyumbani nyuma ya handaki la SSH kuelekea VPS au Tailscale Funnel, au seva ya Tor pekee. Jaribu matokeo kwa kuelekeza pochi kwenye seva hiyo (kwenye ZODL, Mipangilio ya Kina; tazama [Kubadilisha seva kwenye pochi yako](/zcash-tech/lightwallet-nodes)) au kwa kuita `GetLightdInfo` kwa kiteja cha gRPC.

Kwa ufuatiliaji, darasa la tatu linaorodhesha amri za Docker za mkono na linapendekeza kusajili seva ya umma kwenye [hosh](https://hosh.zec.rocks/zec), kifuatiliaji cha muda wa huduma cha zec.rocks. Usajili ni ombi la kuvuta linaloongeza jina la seva pangishi na port yake kwenye orodha ya seva za hosh. Usaidizi kuhusu hatua yoyote unapatikana kwenye jukwaa la warsha la [zec.rocks](https://workshops.zec.rocks).

## Makosa ya kawaida

**Kusakinisha lightwalletd bila node ya mnyororo.** lightwalletd husoma kutoka Zebra (au Zakura). Washa moja, au anza na faili ya mfano ambayo tayari huiwasha.

**Kuacha vitambulisho vya mfano vya RPC bila kubadilisha.** Mifano ina thamani za kishikilia nafasi. RPC hubaki ndani ya kundi, lakini zibadilishe hata hivyo.

**Kuendesha node ya mnyororo kwa kiwango chaguomsingi cha diski cha GKE.** Ujazo hufeli kufungamanishwa. Ongeza kiwango cha juu cha eneo kabla ya kusakinisha.

**Kupanua Zebra ili kushughulikia mzigo.** Kila nakala ya Zebra huongeza usawazishaji mwingine kamili. Panua lightwalletd au Zaino badala yake.

**Kubandika chati ya zamani wakati wa uboreshaji wa mtandao.** Node iliyotolewa kabla ya uboreshaji huacha kufuata Mainnet baada ya uboreshaji huo (Zebra inahitaji 7.0.0 au matoleo mapya zaidi tangu NU7). Endesha `helm repo update` na usasishe chati kabla ya urefu wa uanzishaji na urefu wa mwisho wa usaidizi wa Zakura.

## Kurasa zinazohusiana

- [Zcash Node za Lightwallet](/zcash-tech/lightwallet-nodes): kile ambacho seva ya pochi nyepesi inaweza kuona na isichoweza kuona, na seva za umma.
- [Zebra Full Node](/zcash-tech/zebra-full-node): kihalalishaji kinachoendeshwa na mfumo huu.
- [Zakura Node](/zcash-tech/zakura-node): fork ya Zebra ambayo chati inaweza kuendesha.
- [Zaino](/zcash-tech/zaino): kielezo cha Rust.
- [zecd](/zcash-tech/zecd): seva ya pochi ambayo chati inaweza kuongeza.
- [Zcash RPC ya Node na Uwekaji wa Kielezo](/guides/zcash-node-rpc-and-indexing): RPC ya Zebra, Zallet na viwekaji vya kielezo.
- [Jinsi ya kuendesha Zebra kwenye Mtandao wa Akash](/guides/akash-network-zebra): njia nyingine ya kupangisha node.

## Rasilimali

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repo, matoleo na mifano)
- [Zcash Stack README ya chati ya Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Maelezo ya warsha: Sawazisha, Unganisha, Fuatilia](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Uorodheshaji wa Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (kifuatiliaji cha seva za umma)

**Ilisasishwa mwisho:** Novemba 2026 (chati 0.4.9)
