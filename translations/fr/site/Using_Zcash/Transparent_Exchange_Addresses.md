# Que sont les adresses TEX de Zcash ?

Les adresses TEX de Zcash représentent un type unique d’adresse de réception. Acronyme de « Transparent Exchange », il s’agit d’un encodage **Unique**, de type Unified (bech32m), d’une seule adresse Transparente p2pkh.

Leur seul objectif est d’indiquer à un portefeuille compatible d’effectuer une transaction transparente uniquement (T -> T).

La logique est la suivante : lors de la détection d’une adresse TEX, un portefeuille compatible la décode afin d’obtenir le récepteur Transparent qu’elle contient. Le portefeuille envoie ensuite les fonds requis pour la tx depuis le pool Shielded vers une adresse Transparente distincte, éphémère et contrôlée par l’utilisateur (Z -> T). Il envoie ensuite ces fonds vers le récepteur Transparent décodé de l’adresse TEX (T -> T).

La proposition technique pour les adresses TEX est décrite dans le [ZIP 320](https://zips.z.cash/zip-0320) de Zcash, qui définit un type d’adresse exclusivement destiné à recevoir des fonds depuis des adresses Transparentes.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Bien que les adresses TEX ne soient pas largement adoptées, les utilisateurs de Zcash pourraient être amenés à les utiliser à terme.

## Quand ai-je besoin d’une adresse TEX

### Vous avez **besoin** d’une adresse TEX lorsque vous envoyez des fonds vers une adresse Transparente à l’aide d’un portefeuille qui ne prend pas en charge l’envoi direct vers une adresse Transparente.
Certains portefeuilles ne permettent tout simplement pas d’envoyer directement vers une adresse Transparente et **le destinataire peut ne pas fournir d’équivalent TEX**. Ainsi, la **conversion** d’une adresse Transparente en adresse TEX peut parfois être nécessaire. Cela peut être réalisé manuellement en exécutant l’implémentation de référence décrite dans zip-320. Une instance hébergée d’un **convertisseur Transparent-vers-TEX** est disponible [ICI](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### Vous avez besoin d’une adresse TEX lorsque vous envoyez des fonds à une plateforme d’échange centralisée qui **EXIGE que ces fonds proviennent d’une source Transparente**.
Actuellement, [Binance](https://www.binance.com/) est la seule plateforme d’échange centralisée à utiliser des adresses TEX (et elles constituent la principale raison de la création de TEX).
Les adresses TEX indiquent à un portefeuille compatible que tous les fonds envoyés à cette adresse doivent être transparents et excluent toute valeur shielded d’un envoi vers cette adresse.
Si une plateforme d’échange comme Binance rejette la valeur envoyée, elle dispose des moyens nécessaires pour renvoyer cette valeur à l’adresse d’où elle provient. Cela aide également des entités comme Binance à se conformer aux lois et réglementations imposées par les gouvernements ou d’autres autorités.


## Quels portefeuilles prennent en charge les adresses TEX ?

Vous pouvez consulter la liste la plus à jour sur notre page [portefeuilles](https://zechub.wiki/wallets). Utilisez le **filtre d’adresse TEX**.
