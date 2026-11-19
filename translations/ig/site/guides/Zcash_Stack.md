<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Zcash Stack: Otu e si agba Sava E-akpa Ego Dị Mkpa n’elu Kubernetes ma ọ bụ Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) bụ ngwa mbugharị mmemme mepere emepe sitere n’aka otu ndị mepụtara zec.rocks. Ọ na-achịkọta full node Zcash, sava e-akpa ego dị mkpa na mgbakwunye nhọrọ (Zaino, ihe nchọgharị block, sava ọrụ nzuzo Tor, onye na-achọta DNS, zecd, proxy gRPC-web maka e-akpa ego ihe nchọgharị) dị ka chaatị Helm maka Kubernetes na faịlụ Compose Docker. Sava zec.rocks lightwalletd niile na-agba site na chaatị a. [Zcash Community Grants](https://zcashcommunitygrants.org/) na-akwado ọrụ a n’ego.

Peeji a na-achịkọta ihe ngwa a na-ebunye, ihe dị gị mkpa tupu ịwụnye ya, na ntọala ndị kacha mkpa. Ọ na-agbaso ụdị chaatị **0.4.9** (e wepụtara ya na Nọvemba 13, 2026). [chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) na [ndetu ọmụmụ](https://github.com/zecrocks/zcash-stack/tree/main/docs) nke ọrụ ahụ bụ ebe ntụaka; gụọ ha tupu ịgba ihe ọ bụla na mmepụta.

## Nchịkọta ngwa ngwa

- **Ụzọ abụọ e si amalite.** Chaatị Helm maka Kubernetes (k3s na ngwaike NVMe nke gị bụ ebumnuche bụ isi; GKE Standard na Autopilot na-arụkwa ọrụ) na faịlụ Compose Docker maka otu igwe. Ọmụmụ a na-atụ aro Docker ma ọ bụrụ na ị bụ onye ọhụrụ n’ịgba sava, yana Kubernetes ma ọ bụrụ na ị na-arụ nnukwu otu sava.
- **Otu chain node na sava e-akpa ego dị mkpa.** Nhazi a na-atụ aro bụ Zebra + lightwalletd. Zakura nwere ike dochie Zebra dịka backend, Zaino nwekwara ike dochie lightwalletd ma ọ bụ soro ya rụọ ọrụ.
- **Kwadebe ihe dị ka 600 GiB nke ohere diski.** Ọnọdụ chain nke Zebra dị ihe dị ka 260 GiB na Juun 2026, ọ na-arịkwa elu; cache e-akpa ego dị mkpa na-agbakwunye ihe dị ka 17 GiB. Mmekọrịta zuru ezu na-ewe ụbọchị, ya mere chaatị ahụ nwere ike weghachite site na snapshot e bipụtara.
- **Chaatị ahụ na-akpọ ụdị onyonyo a kapịrị ọnụ.** Na 0.4.9, nke ahụ bụ Zebra 7.0.0 (na-agbaso NU7), lightwalletd v0.6.1, Zakura 1.8.6 na Zaino 0.8.0. Melite chaatị ahụ tupu mmelite netwọkụ na tupu mwepụta Zakura eruo elu ngọngọ njedebe nkwado ya.
- **Debanye sava gị.** Ndị na-arụ sava ọha nwere ike itinye sava ha na ihe nlele [hosh.zec.rocks](https://hosh.zec.rocks/zec) ka e-akpa ego na ndị ọrụ wee hụ ma ọ na-arụ ọrụ.

## Ihe a na-ebunye

Akụkụ ọ bụla bụ mgba ọkụ n’ime [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) nke chaatị ahụ. Naanị lightwalletd na-arụ ọrụ na ndabara, ọ chọkwara chain node, ya mere faịlụ ihe atụ na-agbanyekwa Zebra.

| Akụkụ | Onyonyo dị na chaatị 0.4.9 | Ndabara | Ihe ọ na-eme |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | agbanyụghị (agbanye ya na ihe atụ) | Full node; na-enyocha chain ma na-enye RPC akụkụ ndị ọzọ niile |
| Zakura | `zakuracore/zakura:1.8.6` | agbanyụghị | Alaka Zebra; backend nwere ike dochie lightwalletd ma ọ bụ Zaino kama Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | agbanwuru | Sava e-akpa ego dị mkpa (gRPC) maka e-akpa ego ekwentị na kọmputa |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | agbanyụghị | Onye na-edepụta Rust nke na-ejekwa ozi e-akpa ego dị mkpa |
| Ihe nchọgharị block | `emersonian/zcash-explorer:v0.0.6` | agbanyụghị | Ihe nchọgharị weebụ na-agụ JSON-RPC nke node (Zaino enweghị ike inye ya ọrụ: ọ na-enye gRPC naanị) |
| Tor | `osminogin/tor-simple:0.4.9.16` | agbanyụghị | Na-ebipụta lightwalletd ma ọ bụ Zaino dịka ọrụ `.onion` |
| Onye na-achọta DNS | `zfnd/dnsseeder:v1.8.0` | agbanyụghị | Na-enyere node ọhụrụ aka ịchọta ndị otu |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | agbanyụghị | Sava e-akpa ego na-ebute nke e chebere echebe ụzọ (lee [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | agbanyụghị | Na-eme ka e-akpa ego ihe nchọgharị nwee ike ịgwa lightwalletd okwu, ebe ihe nchọgharị enweghị ike iru ya site na raw gRPC |
| E-akpa ego WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | agbanyụghị | E-akpa ego ihe nchọgharị; ọ chọrọ proxy gRPC-web n’otu host |

Ihe abụọ gbasara ụdị. Zaino dị n’elu bụ [0.10.1](https://github.com/zingolabs/zaino/releases) ebe chaatị ahụ ka na-ebunye onyonyo 0.8.0, ya mere lelee `values.yaml` tupu ịdabere n’omume ọhụrụ nke Zaino. Ọzọkwa, node Zakura na-akwụsị na Mainnet n’elu njedebe nkwado nke mwepụta nke ọ bụla: maka 1.8.6, nke ahụ bụ block 3,643,309, ihe dị ka Disemba 5, 2026; ụdị x86-64 kemgbe 1.8.0 na-ajụ ịmalite na CPU na-enweghị BMI2 na ADX. Peeji [Zakura Node](/zcash-tech/zakura-node) na-akọwa ha abụọ.

## Kubernetes: tupu ịwụnye

Chaatị ahụ na-arụ ọrụ na ihe atọ ị na-ahazi otu ugboro maka cluster nke ọ bụla.

1. **Onye na-ahụ maka ingress.** Chaatị ahụ na-emepụta Kubernetes `Ingress` ọkọlọtọ ma na-ahọrọ klaasị `nginx` na ndabara; a na-atụ aro ingress-nginx n’ihi na ọ na-ejikwa gRPC otu ụzọ na k3s na GKE. Na k3s, wụnye k3s site na `--disable traefik` ma ọ bụ debe Traefik ma tọọ `ingress.className: traefik` tinyere `ingress.backendProtocol: GRPC` (chaatị ahụ ga-emepụta Traefik `IngressRoute`, n’ihi na Ingress nkịtị site na Traefik na-eweghachite HTTP 500 na gRPC). Na GKE, klaasị ingress `gce` e tinyere n’ime ya enweghị ike iziga gRPC na lightwalletd ma ọ bụ Zaino.
2. **cert-manager na ClusterIssuer** maka asambodo Let's Encrypt na-akpaghị aka (`examples/cluster-issuer.yaml`; buru ụzọ nwalee ya na issuer nnwale). Na GKE Autopilot, wụnye cert-manager na `--set global.leaderElection.namespace=cert-manager`, ma ọ bụ imepụta issuer ga-ada na njehie x509 “unknown authority”. Ị nwere ike ịhapụ cert-manager ma tụọ `<service>.ingress.tls.secretName` aka na asambodo nke gị.
3. **StorageClass.** `local-path` dị mma na k3s nwere NVMe. Na GKE, nye Zebra klaasị IOPS e doziri tupu oge eruo (repo ahụ nwere ihe atụ Hyperdisk) ma buru ụzọ bulie oke diski mpaghara: ọrụ GKE ọhụrụ na-enye naanị 500 GB nke SSD na 500 GB nke Hyperdisk maka mpaghara ọ bụla, ma chain node chọrọ 300 ruo 500 GB, ya mere olu ahụ ga-arapara na `Pending` tinyere `QUOTA_EXCEEDED`. A pụghị ịgbanwe `storageClassName` n’ime StatefulSet dị adị ma e mepụtaghị olu ahụ ọzọ.

Mgbe ahụ tụọ ndekọ DNS maka aha host ọ bụla aka na adreesị IP mpụga nke onye na-ahụ maka ingress. Ọ bụrụ na i nwebeghị DNS, tinye aha [sslip.io](https://sslip.io) dịka `203-0-113-7.sslip.io` n’akụkụ aha host gị n’ezie: ọ na-edozigharị gaa na IP dị n’ime aha ahụ, ya mere a na-ewepụta asambodo ozugbo. Debe aha host nke gị dị ka aha bụ isi maka sava ga-adịgide.

## Kubernetes: ịwụnye

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

Ihe atụ [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) na-agbanye Zebra, jikọta lightwalletd na ya, nye lightwalletd cache 40 GiB na ingress TLS, ma debe RPC nke node n’ime cluster. Gbanwee aha njirimara na paswọọdụ RPC nnọchi tupu ịwụnye. Ihe atụ ndị ọzọ na-ekpuchi testnet, GKE, GKE Autopilot nwere nnweta dị elu, ọrụ nzuzo Tor na mmalite sslip.io.

Iji kwalite, gbaa `helm repo update`, jiri ngwa mgbakwunye helm-diff hụ mgbanwe tupu i mee ya (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), wee `helm upgrade` jiri otu arụmụka ndị ahụ. Ọ bụrụ na ị na-abịa site na chaatị 0.0.x, buru ụzọ gụọ [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): 0.1.0 jiri Ingress ọkọlọtọ na cert-manager dochie nhazi Traefik ochie, ma hazigharịa ọnọdụ values.

## Ogo akụrụngwa

| | Mgbe ọ kwụsiri ike | Mmekọrịta mbụ | Diski |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | CPU, IOPS na ebe nchekwa na-arụsi ọrụ ike | ~260 GiB (Juun 2026) ma na-abawanye; ndabara chaatị bụ 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | na-ewu cache ya block site na block | ~17 GiB; ndabara chaatị bụ 40 GiB |

Stack ahụ dum na-arịọ ihe dị ka 1.5 vCPU na ebe nchekwa 4.5 GiB. Maka otu igwe, chaatị ahụ na-atụ aro 8 vCPU, RAM 32 GiB na ihe dị ka 1 TB nke NVMe (na GKE, `n2-standard-8` nwere olu Hyperdisk ma ọ bụ pd-ssd nke 500 GiB). Arịrịọ ndabara ahụ ezurula ihe kacha nta GKE Autopilot chọrọ, ewepụtabeghịkwa oke CPU ka mmekọrịta wee nwee ike iji ike karị nwa oge.

## Ntọala ndị bara uru ịma

**Iweghachi snapshot.** Tọọ `<chain>.initSnapshot.enabled: true` (tinyere `initSnapshot.url`, `gs://` ma ọ bụ `https://`) ka i si na snapshot e bipụtara malite kama imekọrịta site na genesis. Iweghachi ahụ na-akara ọganihu ya, na-amalite nbudata kwụsịrị ọzọ n’ụzọ dị ọcha, ọ dịghịkwa mgbe ọ na-ehichapụ olu dị mma sitere na nwụnye gara aga. Snapshot bụ ụzọ e si belata ntụkwasị obi a chọrọ: a ka na-enyocha block ndị na-eso ya, snapshot ọjọọ apụta n’ụdị block ndị na-adaghị nyocha. Ọmụmụ ahụ na-ekwu na mmekọrịta malite na mmalite na-ewe ihe dị ka ụbọchị 10, ebe ịmalite site na snapshot na-ewe ihe dị ka awa 10.

**Scaling na enweghị nkwụsị ọrụ.** lightwalletd na Zaino bụ cache dị mfe n’ihu node, ya mere gbaa `replicas: 2` maka mmelite na-aga n’ihu n’enweghị nkwụsị ọrụ (a na-agbakwunye PodDisruptionBudget na-akpaghị aka ma ọnụ ọgụgụ oyiri karịrị 1). Emebere chain node ka e ghara ịmụba ha iji buru ibu ọrụ: oyiri ọ bụla bụ full node ọzọ nwere olu nke ya na mmekọrịta nke ya, ya mere gbaa otu, ma ọ bụ abụọ maka nkwado ndabere.

**Ndị otu na-abata.** Na ndabara, Zebra na-eme naanị njikọ na-apụ apụ. `zebra.p2pPublic.enabled: true` na-anabata ndị otu na-abata n’ọdụ ụgbọ mmiri 8233 (18233 na testnet) ma na-akpọsa adreesị gị; họrọ `externalAddrFrom: hostIP` na igwe nkịtị na k3s, `nodeExternalIP` n’igwe ojii ebe IP nke node n’onwe ya bụ nke nzuzo, ma ọ bụ `loadBalancer` nwere IP static e debere na GKE Autopilot.

**TLS na gRPC.** TLS na-akwụsị na ingress, HTTP/2 nkịtị ana-agba n’ime cluster, ya mere ọtụtụ aha host nwere ike ịtụ aka n’otu lightwalletd. Debe `path: /` yana `pathType: Prefix`, n’ihi na ụzọ usoro gRPC chọrọ ya. Ọ bụrụ na asambodo mbụ ada n’ihi ntụgharị HTTPS, jiri issuer nnwale wepụta ya ma ọ bụ tọọ `ingress.tls.sslRedirect: "false"` nwa oge.

**Ọrụ nzuzo Tor.** Ọ bara uru ma cluster gị enweghị IP ọha ma ọ bụ ngalaba:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Jiri `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` gụọ adreesị ahụ ma nwalee ya site na onye ahịa Tor dị n’ime igwe na [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**N’oge mmelite netwọkụ.** Zebra nwere ike machibido ndị otu ka nọ n’ụdị ochie ma kwụsị, na-edekọ na mmelite chain akwụsịla. Ndepụta machibido ya dị n’ebe nchekwa, ya mere `kubectl delete pod zebra-0` na-ehichapụ ya; pod ahụ na-alọghachi jiri otu data chain ahụ n’enweghị mmekọrịta ọzọ.

## Docker Compose

Maka otu igwe, mepụta clone nke repo ma malite faịlụ ndabara site na folda `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` na-agba Zebra, lightwalletd na [Watchtower](https://containrrr.dev/watchtower/) na x86; `compose.arm.yaml` na-eme otu ihe ahụ na igwe ARM. Watchtower na-ebudata onyonyo ọhụrụ na-akpaghị aka, faịlụ ndabara ahụ na-ejikwa mkpado `zfnd/zebra:latest`, ya mere node na-agbaso mwepụta ọhụrụ nke Zebra n’enweghị nkwalite aka. `compose.zaino.yaml` na-eji Zaino dochie lightwalletd, mana ọ na-akpọ onyonyo obodo ochie a kapịrị ọnụ (`emersonian/zcash-zaino:0.1.2-zr4`), ya mere lelee ya tupu i jiri ya. Faịlụ ndị ọzọ na-agbakwunye ihu TLS Caddy, proxy VPS na ọwara autossh maka node nọ n’ụlọ.

Tọọ `LIGHTWALLETD_DONATION_ADDRESS` n’ime faịlụ `.env` ka ọ bụrụ adreesị jikọtara ọnụ nke gị, iji bipụta ya dịka adreesị onyinye sava ahụ. Ịgba `./download-snapshot.sh` site na folda `docker/` tupu `docker compose up` mbụ ga-ebudata snapshot chain kama ịmekọrịta site na mmalite.

## Ijikọ na ileba anya

Klas nke abụọ n’ọmụmụ ahụ na-akọwa otú e si eme ka sava ahụ ruo ndị ọzọ: IP ọha kwụ ọtọ, izochi IP ụlọ gị n’azụ ọwara SSH gaa na VPS ma ọ bụ Tailscale Funnel, ma ọ bụ sava Tor naanị. Nwalee ya site n’ịtụ e-akpa ego aka na ya (na ZODL, Advanced Settings; lee [Ịgbanwe sava dị n’e-akpa ego gị](/zcash-tech/lightwallet-nodes)) ma ọ bụ jiri onye ahịa gRPC kpọọ `GetLightdInfo`.

Maka ileba anya, klas nke atọ depụtara iwu Docker ndị a na-eji aka ma na-atụ aro idebanye sava ọha na [hosh](https://hosh.zec.rocks/zec), ihe nlele oge ọrụ zec.rocks. Idenye aha bụ arịrịọ mgbanwe na-agbakwunye aha host na ọdụ ụgbọ mmiri gị na ndepụta sava hosh. A na-enweta enyemaka maka nzọụkwụ ọ bụla na ọgbakọ ọmụmụ [zec.rocks](https://workshops.zec.rocks).

## Mmejọ ndị a na-ahụkarị

**Ịwụnye lightwalletd na-enweghị chain node.** lightwalletd na-agụ site na Zebra (ma ọ bụ Zakura). Gbanwee otu ka ọ rụọ ọrụ, ma ọ bụ jiri faịlụ ihe atụ na-eme ya malite.

**Ịhapụ nzere RPC ihe atụ.** Ihe atụ ndị ahụ nwere nzere nnọchi. RPC na-anọ n’ime cluster, ma ka gbanwee ha.

**Ịgba chain node na oke diski ndabara nke GKE.** Olu ahụ agaghị ejikọta. Buru ụzọ bulie oke mpaghara tupu ịwụnye.

**Ịmụba Zebra maka ibu ọrụ.** Oyiri Zebra ọ bụla bụ mmekọrịta zuru ezu ọzọ. Kama nke ahụ, mụbaa lightwalletd ma ọ bụ Zaino.

**Idebe chaatị ochie n’oge mmelite netwọkụ.** Node bu ụzọ karịa mmelite na-akwụsị iso Mainnet ma mmelite ahụ gasịa (Zebra chọrọ 7.0.0 ma ọ bụ nke ka ọhụrụ kemgbe NU7). Gbaa `helm repo update` ma kwalite chaatị ahụ tupu elu mmalite ọrụ na elu njedebe nkwado nke Zakura.

## Peeji ndị metụtara ya

- [ZcashNode e-akpa ego dị mkpa](/zcash-tech/lightwallet-nodes): ihe sava e-akpa ego dị mkpa pụrụ ịhụ na ihe ọ na-apụghị ịhụ, na sava ọha.
- [ZebraFull Node](/zcash-tech/zebra-full-node): onye nyocha stack a na-agba.
- [ZakuraNode](/zcash-tech/zakura-node): alaka Zebra ọzọ chaatị ahụ nwere ike ịgba.
- [Zaino](/zcash-tech/zaino): onye na-edepụta Rust.
- [zecd](/zcash-tech/zecd): sava e-akpa ego chaatị ahụ nwere ike itinye.
- [ZcashRPC na ndebanye Node](/guides/zcash-node-rpc-and-indexing): RPC Zebra, Zallet na ndị na-edepụta data.
- [Otu e si agba Zebra na Akash Network](/guides/akash-network-zebra): ụzọ ọzọ e si kwado node.

## Ihe enyemaka

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repo, mwepụta na ihe atụ)
- [Zcash StackREADME chaatị Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Ndetu ọmụmụ: Mekọrịta, Jikọọ, Lelee](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [DockerREADME](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Ndepụta Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (ihe nlele sava ọha)

**Emelitere ikpeazụ:** Nọvemba 2026 (chaatị 0.4.9)
