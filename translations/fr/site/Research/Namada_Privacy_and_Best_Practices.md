---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Bonnes pratiques de confidentialité sur Namada

> Des conseils pratiques et concrets pour obtenir une confidentialité maximale sur Namada, et pour comprendre exactement où s'arrêtent ses protections.

**La confidentialité est un droit fondamental.** Namada a été conçu spécifiquement pour la protéger grâce à une cryptographie avancée à divulgation nulle de connaissance. Ce guide rassemble les pratiques les plus efficaces utilisées par les utilisateurs et les développeurs soucieux de leur confidentialité.

---

## Comment Namada protège votre confidentialité

Namada est une blockchain souveraine axée sur la confidentialité, qui masque les adresses de portefeuille, les montants des transactions et les soldes grâce aux **preuves à divulgation nulle de connaissance (zk-SNARKs)**.

### Principales fonctionnalités de confidentialité

- **Transactions protégées** : elles masquent entièrement l'expéditeur, le destinataire et les montants.
- **Pool protégé multi-actifs (MASP)** : transferts, échanges et ponts confidentiels pour n'importe quel actif.
- **Confidentialité inter-chaînes** : ponts protégés via IBC (prise en charge d'Ethereum et de Solana bientôt disponible).
- **Récompenses de rendement protégées** : gagnez des jetons NAM simplement en protégeant vos transactions.
- **Frais réduits** : une confidentialité solide sans sacrifier la facilité d'utilisation.

---

## Limites importantes

Même la confidentialité on-chain la plus solide peut être compromise par le comportement de l'utilisateur ou par des facteurs off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada ne vous protège PAS contre :**

- Une connexion sans VPN ni Tor (votre adresse IP est exposée)
- La réutilisation répétée d'adresses protégées
- La réalisation de transactions transparentes (non protégées)
- L'association de votre adresse Namada à vos réseaux sociaux ou à votre identité réelle
- L'utilisation d'exchanges centralisés avec KYC pour les dépôts ou les retraits

</div>

---

## Bonnes pratiques pour une confidentialité maximale

### 1. Principes généraux
- Utilisez par défaut des **transactions protégées** pour chaque action.
- Ne réutilisez jamais des adresses protégées à des fins différentes.
- Évitez de mélanger activité protégée et activité transparente au cours d'une même session.

### 2. Transfert d'actifs par pont
- Utilisez une adresse transparente dédiée **uniquement** aux transferts entrants par pont.
- Protégez vos actifs immédiatement après leur arrivée par pont.
- Limitez autant que possible les transferts sortants de Namada par pont.

### 3. MASP (pool protégé multi-actifs)
- Conservez par défaut tous vos actifs dans le MASP.
- Considérez votre solde MASP comme votre principal portefeuille confidentiel.

### 4. Clés pour lecture seule
- Partagez vos clés pour lecture seule **uniquement** avec des parties en qui vous avez entièrement confiance.
- Ne publiez ou ne diffusez jamais publiquement vos clés pour lecture seule.

### 5. Hygiène des transactions
- Variez aléatoirement le moment et les montants de vos transactions.
- Regroupez plusieurs transactions lorsque c'est possible.
- Évitez d'envoyer des montants ronds ou facilement identifiables.

### 6. Sécurité opérationnelle
- Utilisez toujours un **VPN** (idéalement Tor) lorsque vous interagissez avec des portefeuilles ou des dApps.
- Ne partagez jamais de captures d'écran contenant des adresses ou des soldes.
- Utilisez des portefeuilles distincts pour différentes activités (trading, dons, usage personnel).

---

## Liste de contrôle de confidentialité étendue

1. **Protégez toujours en premier** : transférez vos actifs dans MASP avant d'effectuer des transactions.
2. **Changez régulièrement d'adresses protégées** selon les différents cas d'utilisation.
3. **Retirez directement vers des adresses protégées** depuis les exchanges lorsque c'est possible.
4. **Variez le moment de vos transactions** pour briser les schémas identifiables.
5. **Utilisez des portefeuilles matériels** pour les avoirs plus importants.
6. **Maintenez vos logiciels à jour** : utilisez toujours la dernière version du client Namada.
7. **Sécurisez votre appareil** avec un chiffrement robuste et des gestionnaires de mots de passe.
8. **Soyez extrêmement prudent** quant aux fuites de métadonnées dans les discussions ou les journaux publics.

---

## Contribuer

Vous avez d'autres bonnes pratiques ou des commentaires ?  
[Rejoignez la discussion sur Discord](https://discord.gg/srC76aE6)

---
*Dernière mise à jour : mars 2026*
