<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Stack: Ɖo Light Wallet Server ɖe Kubernetes alo Docker dzi

[Zcash Stack](https://github.com/zecrocks/zcash-stack) nye deployment kit si le open-source, si ƒo xlã timu si wòwɔ zec.rocks. Etsɔ Zcash ɣaɣla dzesi ŋɔŋlɔ blibo, alo alo ɖɔɖuɖuŋlɔ dzesi ƒe server kple nu bubu si wòate ŋu atsɔ akpe ɖe eŋu (Zaino, gaɖoɖowo ƒuƒoƒe ƒe explorer, Tor ƒe ɣaɣla ƒe dɔwɔƒe, DNS seeder, zecd, gRPC-web proxy na browser gakotokuwo) abe Helm chart na Kubernetes ene, eye abe Docker Compose faɛlwo hã ene. zec.rocks lightwalletd serverwo katã zã chart sia. [Zcash Community Grants](https://zcashcommunitygrants.org/)e ƒe kpekpeɖeŋu na dɔa.

Afi sia na nyatakaka tso nu si kit la ɖo ɖa, nu si wòhiã hafi nàde eme, kple ɖoɖo siwo le vevie wu. Eŋlɔ ɖe chart version **0.4.9** (wotsɔ do go November 13, 2026) dzi. Dɔa ƒe [chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) kple [workshop notes](https://github.com/zecrocks/zcash-stack/tree/main/docs)e nye nu siwo wòle be nàsrɔ̃; xlẽ wo hafi nàwɔ nu sia nu le production me.

## TL;DR

- **Mɔ eve siwo dzi wòate ŋu azu.** Helm chart na Kubernetes (k3s le wò ŋutɔ ƒe NVMe hardware dzi nye taɖodzinu; GKE Standard kple Autopilot hã wɔa dɔ) kple Docker Compose faɛlwo na machine ɖeka. Workshop la ɖo ŋu be Docker ne wòele serverwo zã geɖe o, eye Kubernetes ne wòele fleetwo zã xoxo.
- **ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔ ɖeka kple alo alo ɖɔɖuɖuŋlɔ dzesi ƒe server ɖeka.** ɖoɖo si wogblɔ be nàzãe nye Zebra + lightwalletd. Zakura ate ŋu axɔ Zebra teƒe abe backend ene, eye Zaino ate ŋu axɔ lightwalletd teƒe alo anɔ egbɔ.
- **Wòle be nàɖo ɖase 600 GiB ƒe disk.** Zebra ƒe ɖoɖonu ƒe state nye ~260 GiB le June 2026 eye etsi yina; alo alo ɖɔɖuɖuŋlɔ dzesi ƒe cache la tsɔ ~17 GiB kpe ɖe eŋu. Full sync la ɖea ŋkeke geɖe, eye chart la ate ŋu atsɔ snapshot si wodo go xoxo agbugbɔ ɖo ɖa.
- **Chart la ɖo image versionwo ɖe ɖoɖo me.** Le 0.4.9 me, enye Zebra 7.0.0 (esi kpɔa NU7 yome), lightwalletd v0.6.1, Zakura 1.8.6 kple Zaino 0.8.0. Trɔ chart la hafi network upgradewo kple hafi Zakura ƒe release ɖo end-of-support height.
- **Ŋlɔ wò server.** Public operatorwo ate ŋu atsɔ wò server akpe ɖe [hosh.zec.rocks](https://hosh.zec.rocks/zec) monitor ŋu, ale be gakotokuwo kple zãlaŋutsuwo ate ŋu akpɔ be ele dɔ wɔm alo mele dɔ wɔm o.

## Nu siwo wodea ɖo ɖa

Nu sia nu nye switch le chart la ƒe [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) me. lightwalletd ko wòle ɖe ɖoɖo me, eye ehia ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔ, eya ta example faɛlwo ɖoa Zebra hã.

| Component | Image le chart 0.4.9 me | Default | Nu si wòwɔna |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | off (on le examplewo me) | ɣaɣla dzesi ŋɔŋlɔ blibo; etsɔ ɖoɖonu la kpɔa eye etsɔ RPC na nu bubuwo katã |
| Zakura | `zakuracore/zakura:1.8.6` | off | Zebra ƒe fork; backend si ate ŋu axɔ lightwalletd alo Zaino teƒe le Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | on | Alo alo ɖɔɖuɖuŋlɔ dzesi ƒe server (gRPC) na mobile kple desktop gakotokuwo |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | off | Rust indexer si hã na alo alo ɖɔɖuɖuŋlɔ dzesi gakotokuwo |
| Gaɖoɖowo ƒuƒoƒe ƒe explorer | `emersonian/zcash-explorer:v0.0.6` | off | Web explorer si xlẽ ɣaɣla dzesi ŋɔŋlɔ ƒe JSON-RPC (Zaino mate ŋu akpɔe o: gRPC ko wòna) |
| Tor | `osminogin/tor-simple:0.4.9.16` | off | Eɖoa lightwalletd alo Zaino abe `.onion` service ene |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | off | Ekpe ɖe ɣaɣla dzesi ŋɔŋlɔ yeye ŋu be woakpɔ peerwo |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | off | Gakotoku ƒe server si ɖo ɣaɣla ŋgɔ (kpɔ [zecd](/zcash-tech/zecd)) |
| gRPC-web proxy | `envoyproxy/envoy:v1.40.2` | off | Ena browser gakotokuwo ate ŋu agblɔ nu na lightwalletd, esi browserwo mate ŋu ɖo ɖe raw gRPC dzi o |
| WebZjs gakotoku | `ghcr.io/zecrocks/webzjs-wallet` | off | Browser gakotoku; gRPC-web proxy la ele be wòanɔ host ma dzi |

Version ƒe nyatakaka eve. Zaino upstream la le [0.10.1](https://github.com/zingolabs/zaino/releases), gake chart la le 0.8.0 image la tsɔna, eya ta kpɔ `values.yaml` hafi nàxɔ se na Zaino ƒe nɔnɔme yeye. Eye Zakura ɣaɣla dzesi ŋɔŋlɔwo ɖena dɔ le Mainnet le release ɖesiaɖe ƒe end-of-support height; na 1.8.6 la enye gaɖoɖowo ƒuƒoƒe 3,643,309, le December 5, 2026 ƒe ŋgɔ, eye x86-64 buildwo siwo tso 1.8.0 va yi dzi wɔa start o le CPU siwo mele BMI2 kple ADX o. [Zakura Node](/zcash-tech/zakura-node) ƒe axa la kpe ɖe nu eve siawo ŋu.

## Kubernetes: hafi nàde eme

Chart la ɖea dɔ le nu etɔ̃ siwo wòɖoa ɖe ɖoɖo me zi ɖeka le cluster ɖesiaɖe.

1. **Ingress controller.** Chart la wɔa Kubernetes `Ingress` si sɔ kple se eye edoa `nginx` class la ɖe ɖoɖo me; wogblɔ be nàzã ingress-nginx elabena ewɔa gRPC abe ale sia ene le k3s kple GKE. Le k3s dzi, zã k3s kple `--disable traefik` alo ɖe Traefik ɖe asi eye ɖo `ingress.className: traefik` kple `ingress.backendProtocol: GRPC` ɖe ɖoɖo me (chart la azã Traefik `IngressRoute`, elabena plain Ingress to Traefik la na HTTP 500 le gRPC dzi). Le GKE dzi, `gce` ingress class si wodo ɖe eme la mate ŋu aɖe gRPC ɖo ɖe lightwalletd alo Zaino o.
2. **cert-manager kple ClusterIssuer** na Let's Encrypt certificatewo siwo wòdzea ɖoɖo me (`examples/cluster-issuer.yaml`; te ŋu zã staging issuer la gbã). Le GKE Autopilot dzi, ɖo cert-manager kple `--set global.leaderElection.namespace=cert-manager`, alo issuer creation la awu le x509 "unknown authority" ŋutinya me. Àte ŋu aɖe cert-manager le eme eye nàɖo `<service>.ingress.tls.secretName` ɖe wò ŋutɔ ƒe certificate dzi.
3. **StorageClass.** `local-path` nyo le k3s kple NVMe dzi. Le GKE dzi, na Zebra provisioned-IOPS class (repo la tsɔ Hyperdisk example vɛ), eye ɖo regional disk quota la ɖe dzi gbã: GKE project yeyewo le 500 GB SSD kple 500 GB Hyperdisk ko sia region ɖe sia ɖe, eye ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔ la hia 300 yi 500 GB, eya ta volume la anɔ `Pending` me kple `QUOTA_EXCEEDED`. Ɖeɖe matia o `storageClassName` le StatefulSet si wòwɔ xoxo ŋu, ne meɖe volume la wɔ ga o.

Emegbe ɖo DNS record na hostname ɖesiaɖe ɖe ingress controller ƒe external IP dzi. Ne DNS mele asiwò o, tsɔ [sslip.io](https://sslip.io) ŋkɔ abe `203-0-113-7.sslip.io` ene ɖo le wò hostname ƒe ŋgɔ: eɖe IP si woɖo ɖe eme la dzi, eya ta woda certificate enumake. Zã wò ŋutɔ ƒe hostname abe ŋkɔ gbãtɔ ene na server siwo anɔ edzi tegbee.

## Kubernetes: install

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) example la ɖoa Zebra, tsɔa lightwalletd kpea ɖe eŋu, na lightwalletd 40 GiB cache kple TLS ingress, eye ɖoa node la ƒe RPC ɖe cluster la me. Trɔ RPC username kple password siwo wotsɔ ɖo teƒe ɖe example me hafi nàinstall. Example bubuwo ɖoa testnet, GKE, GKE Autopilot kple high availability, Tor ƒe ɣaɣla ƒe dɔwɔƒe kple sslip.io bootstrap.

Ne wòle be nàupgrade, zã `helm repo update`, kpɔ trɔtrɔ la kple helm-diff plugin (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), eye emegbe `helm upgrade` kple argument mawo ke. Ne èle 0.0.x chart tso me, xlẽ [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) gbã: 0.1.0 trɔ Traefik setup xoxoa ɖe standard Ingress kple cert-manager nu, eye values layout la trɔ.

## Ɖoɖo ɖe nu ƒe ɖɔɖɔ

| | Nɔnɔme si le ɖoɖo me | Sync gbãtɔ | Disk |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | CPU, IOPS kple memory hia geɖe | ~260 GiB (June 2026) eye etsina yina; chart ƒe default 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | Ewɔa cache la gaɖoɖowo ƒuƒoƒe ɖe gaɖoɖe | ~17 GiB; chart ƒe default 40 GiB |

Stack blibo la bia vCPU 1.5 kple memory 4.5 GiB. Na machine ɖeka chart la ɖo ŋu be nàzã 8 vCPU, RAM 32 GiB kple NVMe ƒe ɖase 1 TB (le GKE dzi, `n2-standard-8` kple 500 GiB Hyperdisk alo pd-ssd volume). Default requests la meɖe GKE Autopilot ƒe minimums dzi xoxo, eye wogblẽ CPU limits ɖe eme be sync la ate ŋu atso dzi.

## Ɖoɖo siwo wòle be nànya

**Snapshot restore.** ɖo `<chain>.initSnapshot.enabled: true` (kple `initSnapshot.url`, `gs://` alo `https://`) be nàte ŋu astɔ snapshot si wodo go xoxo dzɔ le genesis teƒe. Restore la ɖoa progress ƒe dzesi, egbugbɔ download si wowu le eme la wɔa ɖe ɖoɖo me, eye meɖea volume si le dɔ wɔm nyuie tso install xoxoa me kpɔna o. Snapshot la nye mɔ si na wò ɖoa trust: gaɖoɖowo siwo le eƒe megbe la dzi kpɔa validation, eye snapshot gbegblẽ la ɖea eɖokui fia abe gaɖoɖowo siwo meɖe validation dzi o ene. Workshop la gblɔ be sync si wòwɔ tso gɔmedzedze la dzea ŋkeke 10, eye snapshot kple start dzea gaƒoƒo 10.

**Nu ƒe dziyiyi kple downtime mele o.** lightwalletd kple Zaino nye cache siwo le node la ŋgɔ, eya ta zã `replicas: 2` na rolling update si meɖea downtime o (PodDisruptionBudget dzea ɖoɖo me ne replicas la wu 1). Ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔwo menye nu si wozãna na load o: replica ɖesiaɖe nye ɣaɣla dzesi ŋɔŋlɔ blibo bubu kple volume kple sync si nye eya tɔ, eya ta zã ɖeka, alo eve na redundancy.

**Peer siwo tso go ɖe eme.** Le ɖoɖo me, Zebra zɔa outbound connections ko. `zebra.p2pPublic.enabled: true` xɔa inbound peers le port 8233 dzi (18233 le testnet dzi) eye etɔa wò address; tia `externalAddrFrom: hostIP` le bare metal kple k3s, `nodeExternalIP` le cloud afi node la ƒe IP le private, alo `loadBalancer` kple static IP si wòɖo ɖe GKE Autopilot.

**TLS kple gRPC.** TLS wɔa eƒe enu le ingress, eye plain HTTP/2 zɔa le cluster la me, eya ta hostname geɖe ate ŋu akpɔ lightwalletd ɖeka. Zã `path: /` kple `pathType: Prefix`, elabena gRPC method pathwo hiae. Ne certificate gbãtɔ la mewɔ dɔ o le HTTPS redirect ta la, da e kple staging issuer alo ɖo `ingress.tls.sslRedirect: "false"` ɖe temporary.

**Tor ƒe ɣaɣla ƒe dɔwɔƒe.** Etea ŋu nàzãe ne wò cluster la me public IP alo domain o:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Xlẽ address la kple `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` eye te ŋu kpe eŋu le local Tor client kple [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Le network upgradewo ƒe ŋgɔ kple megbe.** Zebra ate ŋu abu peer siwo le version xoxowo dzi, eye ana dɔa natsi, eye wòalɔ nu be chain updatewo natsi. Eƒe ban list la le memory me, eya ta `kubectl delete pod zebra-0` ɖea eŋu; pod la gbugbɔ va le ɖoɖonu data ma ke dzi, sync yeye mehiã o.

## Docker Compose

Na machine ɖeka, clone repo la eye ɖe default faɛl la dzi tso `docker/` folder la me:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` ɖoa Zebra, lightwalletd kple [Watchtower](https://containrrr.dev/watchtower/) le x86 dzi; `compose.arm.yaml` wɔa nu ma ke le ARM hostwo dzi. Watchtower xɔa image yeyewo le automatic me, eye default faɛl la zãa `zfnd/zebra:latest` tag la, eya ta node la kpɔa Zebra release yeyewo yome zi geɖe, upgrade si wòwɔ ŋutɔ mehiã o. `compose.zaino.yaml` trɔa lightwalletd ɖe Zaino nu, gake egblẽa community image xoxo (`emersonian/zcash-zaino:0.1.2-zr4`) ɖe ɖoɖo me, eya ta kpɔe hafi nàzãe. Faɛl bubuwo tsɔa Caddy TLS front end, VPS proxy kple autossh tunnel na node siwo le aƒeme kpe ɖe eŋu.

Ɖo `LIGHTWALLETD_DONATION_ADDRESS` le `.env` faɛl la me ɖe wò ŋutɔ ƒe unified address dzi, be wòatsɔe aɖo ɖe server la ƒe donation address ene. Zã `./download-snapshot.sh` tso `docker/` folder la me hafi `docker compose up` gbãtɔ; eɖea chain snapshot ɖo ɖa le scratch sync teƒe.

## Kpeɖeŋu kple ŋkuɖoɖo

Workshop la ƒe class evelia ɖea mɔ si wòazã be nàɖe server la ɖe go: public static IP, ɣaɣla wò home IP le SSH tunnel si zɔ yi VPS alo Tailscale Funnel me, alo Tor-only server. Te nu si wòwɔ la kpɔ kple gakotoku si nàɖo ɖe eŋu (le ZODL, Advanced Settings; kpɔ [Gakotoku me server trɔtrɔ](/zcash-tech/lightwallet-nodes)) alo ɖo nu na `GetLightdInfo` kple gRPC client.

Na monitoring, class etɔ̃lia la ɖea Docker si wòwɔ ŋutɔ ƒe commands kple ɖo ŋu be nàŋlɔ public server kple [hosh](https://hosh.zec.rocks/zec), esi nye zec.rocks uptime monitor. Registration nye pull request si tsɔa wò hostname kple port kpe ɖe hosh ƒe server list ŋu. Wòate ŋu axɔ kpeɖeŋu na nyawo katã le [zec.rocks workshops forum](https://workshops.zec.rocks).

## Nɔnɔme gbegblẽ siwo dzɔa zi geɖe

**lightwalletd install le ɖoɖo me le ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔ mele o.** lightwalletd xɔa nu tso Zebra (alo Zakura). Ɖo ɖeka ɖe ɖoɖo me, alo zã example faɛl si wɔe.

**Gblẽ example RPC credentials ɖe ɖoɖo me.** Examplewo tsɔ placeholderwo vɛ. RPC nɔa cluster la me, gake trɔ wo hã.

**Ɖo ɖoɖonu ƒe ɣaɣla dzesi ŋɔŋlɔ ɖe GKE ƒe default disk quota dzi.** Volume la mele bind wɔm o. Ɖo regional quota la ɖe dzi hafi nàinstall.

**Nu ƒe dziyiyi Zebra na load.** Zebra ƒe replica ɖesiaɖe nye sync bubu blibo. Ɖe nu ƒe dziyiyi lightwalletd alo Zaino me.

**Ɖo chart xoxo ɖe ɖoɖo me to network upgrade me.** Node si va upgrade ŋgɔ la meɖoa Mainnet yome o le eƒe megbe (Zebra hia 7.0.0 alo esi wò wu tso NU7 va yi). Zã `helm repo update` eye upgrade chart la hafi activation heightwo kple Zakura ƒe end-of-support heightwo.

## Axawo siwo kpe ɖe eŋu

- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes): nu si alo alo ɖɔɖuɖuŋlɔ dzesi ƒe server ate ŋu akpɔ eye mate ŋu akpɔ, kple public serverwo.
- [Zebra Full Node](/zcash-tech/zebra-full-node): validator si stack sia zã.
- [Zakura Node](/zcash-tech/zakura-node): Zebra ƒe fork si chart la ate ŋu azã.
- [Zaino](/zcash-tech/zaino): Rust indexer.
- [zecd](/zcash-tech/zecd): gakotoku ƒe server si chart la ate ŋu atsɔ akpe ɖe eŋu.
- [Zcash Node RPC and Indexing](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet kple indexerwo.
- [Mɔ si wòato azã Zebra le Akash Network](/guides/akash-network-zebra): mɔ bubu si nàzã atsɔ aɖo node.

## Nyatakakadzesiwo

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repository, releasewo kple examplewo)
- [Zcash Stack Helm chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Workshop notes: Ɖo sync, Kpe, Ɖo ŋku](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub listing](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (public server monitor)

**Wotrɔ va yi:** November 2026 (chart 0.4.9)
