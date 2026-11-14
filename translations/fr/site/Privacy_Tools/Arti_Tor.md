![Tor logo](/content-images/_unavailable.svg)

# **Arti : le client Tor de nouvelle génération en Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** est l'initiative du projet Tor visant à créer un client **Tor** de nouvelle génération à l'aide du langage de programmation **Rust**. Arti est conçu pour être modulaire, intégrable et prêt pour la production, et offre une implémentation plus sûre et plus efficace des protocoles d'anonymat **Tor**. Avec **Arti version 1.4.0**, plusieurs mises à jour importantes ont été introduites :

- Une **nouvelle interface RPC** pour une interaction améliorée.
- Des travaux préparatoires pour la **prise en charge des relais**.
- Des améliorations de la **résistance aux attaques par déni de service côté service pour les services onion**.

Cette version poursuit les efforts du projet Tor pour offrir une meilleure sécurité, de meilleures performances et une plus grande modularité aux utilisateurs et aux développeurs de Tor.


---


## **Installation du client Arti**

Suivez ces étapes pour installer et exécuter **Arti** en tant que proxy SOCKS sur votre système.

---

### **Étape 1 : mettre en place un environnement de développement Rust**

Avant de pouvoir compiler Arti à partir des sources, vous devez avoir installé la dernière version stable de **Rust**.

#### Pour installer Rust :

1. Rendez-vous sur le [site officiel de Rust](https://www.rust-lang.org/).
2. Suivez les instructions d'installation correspondant à votre système d'exploitation.
3. Vérifiez l'installation en exécutant :
   
   ```sh
   rustc --version
   ```

Cela confirmera que la dernière version stable de Rust est installée sur votre système.

#### **Note pour les utilisateurs de Windows** :
- Rust peut être installé sur Windows via [**rustup**](https://rustup.rs/), un installateur de chaîne d'outils. Assurez-vous également d'avoir configuré un environnement de compilation compatible (vous aurez peut-être besoin des **Visual Studio Build Tools** sous Windows).
  
---

### **Étape 2 : cloner le dépôt Arti**

Pour obtenir la dernière version du client Arti, vous devez cloner le dépôt depuis [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Étapes :
1. Ouvrez votre terminal (invite de commandes, PowerShell ou Git Bash sous Windows).
2. Exécutez la commande suivante pour cloner le dépôt :
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Placez-vous dans le répertoire *arti* nouvellement créé :
   
   ```sh
   cd arti
   ```

Cela téléchargera le code source d'Arti sur votre machine locale.

---

### **Étape 3 : compiler le binaire Arti**

Une fois le dépôt cloné, vous devez compiler Arti à l'aide de **Cargo**, le gestionnaire de paquets et outil de compilation de Rust.

#### Pour compiler Arti :
1. Dans le terminal, exécutez la commande suivante :
   ```sh
   cargo build --release
   ```

Cette commande compile le code d'Arti et l'optimise pour la production (l'option *--release*). Le binaire sera créé dans le répertoire *target/release*.

#### Emplacement du binaire compilé :
- Après la compilation, le binaire Arti se trouvera à l'emplacement suivant :  
  ```sh
  target/release/arti
  ```

Vous pouvez exécuter ce binaire directement depuis le terminal.

---

### **Étape 4 : lancer le proxy SOCKS Arti**

Pour utiliser Arti comme proxy SOCKS (qui fera transiter votre trafic Internet par le réseau Tor), vous devez démarrer le proxy.

#### Pour démarrer le proxy SOCKS :
1. Exécutez la commande suivante :
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Cette commande démarre Arti en tant que **proxy SOCKS5** sur le **port 9150**, le port utilisé par défaut par Tor pour le trafic SOCKS.

---

### **Étape 5 : configurer les applications pour utiliser Arti**

Une fois Arti lancé en tant que proxy SOCKS, vous devez configurer vos applications pour qu'elles l'utilisent afin de faire transiter le trafic par le réseau Tor.

#### Étapes :
1. Dans les paramètres de votre application (p. ex. navigateur Web, application de terminal), recherchez les **paramètres de proxy**.
2. Définissez le **proxy SOCKS5** sur *localhost:9150*.

Tout le trafic de vos applications transitera alors par le **réseau Tor**, avec Arti comme intermédiaire.

---

## **Intégration d'Arti avec le réseau Tor**

Voici un schéma simplifié illustrant le fonctionnement d'Arti avec le réseau Tor :


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- L'**application** se connecte au **proxy SOCKS Arti** à l'aide du protocole **SOCKS5**.
- Arti communique ensuite avec le **réseau Tor**, ce qui garantit l'anonymisation de votre trafic lors de son passage par le réseau.

---

## **Dépôt GitLab et contribution**

Si vous souhaitez contribuer au développement d'**Arti**, vous pouvez explorer le code et contribuer via **GitLab**.

- **Lien du dépôt** : [Dépôt GitLab d'Arti](https://gitlab.torproject.org/tpo/core/arti)
- **Cloner le dépôt** :
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork et contribution** :
1. **Forkez** le dépôt sur GitLab (un compte GitLab est nécessaire).
2. Liez votre dépôt forké à votre configuration locale :
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Remplacez *_name_* par votre nom d'utilisateur GitLab.

3. **Poussez vos modifications** vers votre fork :
   ```sh
   git push _name_ main
   ```

4. **Créez une merge request (MR)** sur GitLab :
   Rendez-vous dans la section Merge Request de votre fork GitLab :
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Consignes pour les merge requests** :
- **Ne faites pas de rebase ni de squash des commits pendant la revue**.
- Si nécessaire, utilisez *fixup!* ou *squash!* pour le squash automatique des commits.
- Privilégiez l'**ajout de nouveaux commits** plutôt que le squash pendant le cycle de revue.

---

### **Notes complémentaires** :

- **Binaires précompilés** : à l'heure actuelle, **Arti** ne fournit pas de binaires précompilés officiels. Vous devez compiler le client à partir des sources comme décrit ci-dessus.
- **Connaissances en Rust** : si vous contribuez à Arti, notez que la base de code est encore en évolution et que des modifications ou des refactorisations peuvent survenir à mesure que de nouvelles fonctionnalités sont ajoutées.

---



Si vous souhaitez contribuer au projet, n'hésitez pas à consulter le code, à forker le dépôt et à soumettre une merge request. Pour plus d'informations, de mises à jour et d'aide au dépannage, consultez le [Dépôt GitLab d'Arti](https://gitlab.torproject.org/tpo/core/arti). 

Profitez bien d'**Arti** et bon hacking !

---
