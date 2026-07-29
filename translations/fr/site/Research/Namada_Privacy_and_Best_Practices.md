---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

![Logo de Namada](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Meilleures pratiques de confidentialité sur Namada

> Des conseils pratiques et concrets pour atteindre une confidentialité maximale sur Namada — et comprendre précisément où s'arrêtent ses protections.

**La confidentialité est un droit fondamental.** Namada a été conçu dès l'origine pour la protéger grâce à une cryptographie avancée à connaissance nulle. Ce guide rassemble les pratiques les plus efficaces utilisées par les utilisateurs et développeurs soucieux de leur confidentialité.

---

## Comment Namada protège votre confidentialité

Namada est une blockchain souveraine, axée sur la confidentialité, qui dissimule les adresses de portefeuille, les montants des transactions et les soldes à l'aide de **preuves à connaissance nulle (zk-SNARKs)**.

### Fonctionnalités clés de confidentialité

- **Transactions blindées** - Masquent complètement l'expéditeur, le destinataire et les montants.
- **Multi-Asset Shielded Pool (MASP)** - Transferts privés, swaps et ponts inter-chaînes pour n'importe quel actif.
- **Confidentialité inter-chaînes** - Ponts blindés via IBC (prise en charge d'Ethereum et de Solana bientôt disponible).
- **Récompenses de rendement blindées** - Gagnez des tokens NAM simplement en blindant vos transactions.
- **Frais faibles** - Une forte confidentialité sans sacrifier la facilité d'utilisation.

---

## Limitations importantes

Même la confidentialité on-chain la plus solide peut être compromise par le comportement de l'utilisateur ou des facteurs off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada ne protège PAS contre :**

- Une connexion sans VPN ni Tor (votre adresse IP est exposée)
- La réutilisation répétée d'adresses blindées
- L'exécution de transactions transparentes (non blindées)
- Le fait de lier votre adresse Namada à vos réseaux sociaux ou à votre identité réelle
- L'utilisation d'exchanges centralisés avec KYC pour les dépôts ou les retraits

</div>

---

## Meilleures pratiques pour une confidentialité maximale

### 1. Principes généraux
- Utilisez par défaut des **transactions blindées** pour chaque action.
- Ne réutilisez jamais des adresses blindées pour des usages différents.
- Évitez de mélanger activité blindée et activité transparente dans la même session.

### 2. Faire transiter des actifs par pont
- Utilisez une adresse transparente dédiée **uniquement** aux ponts entrants.
- Blindez immédiatement les actifs après leur arrivée par pont.
- Limitez autant que possible les sorties d'actifs hors de Namada par pont.

### 3. MASP (Multi-Asset Shielded Pool)
- Conservez tous les actifs dans le MASP par défaut.
- Considérez votre solde MASP comme votre portefeuille privé principal.

### 4. Clés de visualisation
- Partagez les clés de visualisation **uniquement** avec des parties en qui vous avez une confiance totale.
- Ne publiez jamais et ne diffusez jamais publiquement de clés de visualisation.

### 5. Hygiène des transactions
- Variez aléatoirement les horaires et les montants de vos transactions.
- Regroupez plusieurs transactions lorsque c'est possible.
- Évitez d'envoyer des montants ronds ou facilement identifiables.

### 6. Sécurité opérationnelle
- Utilisez toujours un **VPN** (idéalement Tor) lorsque vous interagissez avec des portefeuilles ou des dApps.
- Ne partagez jamais de captures d'écran contenant des adresses ou des soldes.
- Utilisez des portefeuilles séparés pour différentes activités (trading, dons, usage personnel).

---

## Checklist de confidentialité étendue

1. **Blindez toujours d'abord** - déplacez les actifs dans le MASP avant d'effectuer des transactions.
2. **Faites tourner les adresses blindées** régulièrement selon les cas d'usage.
3. **Retirez directement vers des adresses blindées** depuis les exchanges lorsque c'est possible.
4. **Faites varier le moment des transactions** afin de casser les schémas identifiables.
5. **Utilisez des portefeuilles matériels** pour les avoirs les plus importants.
6. **Gardez les logiciels à jour** - utilisez toujours le dernier client Namada.
7. **Sécurisez votre appareil** avec un chiffrement robuste et des gestionnaires de mots de passe.
8. **Soyez extrêmement prudent** face aux fuites de métadonnées dans les discussions ou les journaux publics.

---

## Contribuer

Vous avez d'autres meilleures pratiques ou des retours à partager ?  
[Rejoignez la discussion sur Discord](https://discord.gg/srC76aE6)

---
*Dernière mise à jour : mars 2026*
