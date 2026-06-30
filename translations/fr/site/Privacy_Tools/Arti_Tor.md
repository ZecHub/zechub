![Logo de Tor](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti : le client Tor de nouvelle génération en Rust**
![Logo d’Atri](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** est l’initiative du Tor Project visant à construire un client **Tor** de nouvelle génération en utilisant le langage de programmation **Rust**. Arti est conçu pour être modulaire, intégrable et prêt pour la production, en offrant une implémentation plus sûre et plus efficace des protocoles d’anonymat **Tor**. Avec **Arti version 1.4.0**, plusieurs mises à jour importantes ont été introduites :

- Une **nouvelle interface RPC** pour une interaction améliorée.
- Un travail préparatoire pour la **prise en charge des relais**.
- Des améliorations de la **résistance aux attaques par déni de service des services onion côté service**.

Cette version poursuit les efforts du Tor Project pour offrir une meilleure sécurité, de meilleures performances et davantage de modularité aux utilisateurs et développeurs de Tor.


---


## **Installation du client Arti**

Suivez ces étapes pour installer et exécuter **Arti** comme proxy SOCKS sur votre système.

---

### **Étape 1 : Configurer un environnement de développement Rust**

Avant de pouvoir compiler Arti à partir du code source, vous devez disposer de la dernière version stable de **Rust** installée.

#### Pour installer Rust :

1. Visitez le [site officiel de Rust](https://www.rust-lang.org/).
2. Suivez les instructions d’installation pour votre système d’exploitation.
3. Vérifiez l’installation en exécutant :
   
   ```sh
   rustc --version
   ```

Cela confirmera que la dernière version stable de Rust est installée sur votre système.

#### **Remarque pour les utilisateurs de Windows** :
- Rust peut être installé sur Windows via [**Rustup**](https://rustup.rs/), un installateur de toolchain. Assurez-vous également d’avoir configuré un environnement de compilation compatible (vous pouvez avoir besoin de **Visual Studio Build Tools** sous Windows).
  
---

### **Étape 2 : Cloner le dépôt Arti**

Pour obtenir la dernière version du client Arti, vous devrez cloner le dépôt depuis [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Étapes :
1. Ouvrez votre terminal (Invite de commandes, PowerShell ou Git Bash sous Windows).
2. Exécutez la commande suivante pour cloner le dépôt :
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Accédez au répertoire *arti* nouvellement créé :
   
   ```sh
   cd arti
   ```

Cela téléchargera le code source d’Arti sur votre machine locale.

---

### **Étape 3 : Compiler le binaire Arti**

Une fois le dépôt cloné, vous devez compiler Arti en utilisant **Cargo**, qui est le gestionnaire de paquets et l’outil de compilation de Rust.

#### Pour compiler Arti :
1. Dans le terminal, exécutez la commande suivante :
   ```sh
   cargo build --release
   ```

Cette commande compile le code d’Arti et l’optimise pour la production (le drapeau *--release*). Le binaire sera créé dans le répertoire *target/release*.

#### Emplacement du binaire compilé :
- Après compilation, le binaire Arti se trouvera à l’emplacement suivant :  
  ```sh
  target/release/arti
  ```

Vous pouvez exécuter ce binaire directement depuis le terminal.

---

### **Étape 4 : Exécuter le proxy SOCKS Arti**

Pour utiliser Arti comme proxy SOCKS (qui fera passer votre trafic internet par le réseau Tor), vous devez démarrer le proxy.

#### Pour démarrer le proxy SOCKS :
1. Exécutez la commande suivante :
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Cette commande démarre Arti comme **proxy SOCKS5** sur le **port 9150**, qui est le port par défaut utilisé par Tor pour le trafic SOCKS.

---

### **Étape 5 : Configurer les applications pour utiliser Arti**

Une fois qu’Arti fonctionne comme proxy SOCKS, vous devez configurer vos applications pour l’utiliser afin d’acheminer le trafic via le réseau Tor.

#### Étapes :
1. Dans les paramètres de votre application (par exemple, navigateur web, application terminal), recherchez les **paramètres de proxy**.
2. Définissez le **proxy SOCKS5** sur *localhost:9150*.

Cela fera passer tout le trafic de vos applications par le **réseau Tor** en utilisant Arti comme intermédiaire.

---

## **Intégration d’Arti avec le réseau Tor**

Voici un schéma simplifié pour illustrer comment Arti fonctionne en conjonction avec le réseau Tor :


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- L’**Application** se connecte au **proxy SOCKS Arti** en utilisant le protocole **SOCKS5**.
- Arti communique ensuite avec le **réseau Tor**, en veillant à ce que votre trafic soit anonymisé lorsqu’il traverse le réseau.

---

## **Dépôt GitLab et contribution**

Si vous souhaitez contribuer au développement d’**Arti**, vous pouvez explorer le code et contribuer via **GitLab**.

- **Lien du dépôt** : [Dépôt GitLab d’Arti](https://gitlab.torproject.org/tpo/core/arti)
- **Cloner le dépôt** :
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork et contribution** :
1. **Forkez** le dépôt sur GitLab (un compte GitLab est requis).
2. Reliez votre dépôt forké à votre configuration locale :
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Remplacez *_name_* par votre nom d’utilisateur GitLab.

3. **Poussez les modifications** vers votre fork :
   ```sh
   git push _name_ main
   ```

4. **Créez une Merge Request (MR)** sur GitLab :
   Accédez à la section Merge Request dans votre fork GitLab :
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Consignes pour les Merge Requests** :
- **Ne rebasez pas et ne fusionnez pas les commits en un seul pendant la revue**.
- Si nécessaire, utilisez *fixup!* ou *squash!* pour la fusion automatique des commits.
- Cherchez à **ajouter de nouveaux commits** plutôt qu’à les fusionner pendant le cycle de revue.

---

### **Notes supplémentaires** :

- **Binaires précompilés** : À l’heure actuelle, **Arti** ne fournit pas de binaires précompilés officiels. Vous devez compiler le client à partir du code source comme décrit ci-dessus.
- **Connaissance de Rust** : Si vous contribuez à Arti, notez que la base de code est encore en évolution et qu’il peut y avoir des changements ou du refactoring à mesure que de nouvelles fonctionnalités sont ajoutées.

---



Si vous souhaitez contribuer au projet, n’hésitez pas à consulter le code, à forker le dépôt et à soumettre une Merge Request. Pour plus d’informations, de mises à jour et de dépannage, reportez-vous au [dépôt GitLab d’Arti](https://gitlab.torproject.org/tpo/core/arti). 

Profitez de votre expérience avec **Arti** et bon hacking !

---
