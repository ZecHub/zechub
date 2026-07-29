<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# GitHub-Repository mit IPFS bereitstellen

## Einführung

In diesem Leitfaden lernen wir, wie man eine per Git klonbare URL für dein GitHub-Repository erstellt, das über eine IPFS-CID bereitgestellt wird. Dies ist nützlich, um die Verfügbarkeit von Inhalten unabhängig von der geografischen Region sicherzustellen, Zensurresistenz zu erreichen und ein dauerhaftes Backup wertvoller Informationen zu haben!

Hinweis: Daten, die auf IPFS hochgeladen werden, sind für *alle* Nutzer des Netzwerks verfügbar. Möglicherweise möchtest du persönliche/sensible Daten lokal verschlüsseln.


## IPFS Kubo installieren

Folge den Installationsanweisungen [hier](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In diesem Beispiel verwenden wir Linux, andere OS-Versionen sind verfügbar. 

Prüfe, ob die Installation erfolgreich war, mit "ipfs --version" 


## Repository klonen 

Wähle zunächst ein Git-Repository aus, das du hosten möchtest, und klone es:

Befehl ausführen: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Jetzt musst du es vorbereiten, damit es über IPFS geklont werden kann.

cd zechub
git update-server-info


Git-Objekte entpacken:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Dadurch kann IPFS Objekte deduplizieren, wenn du das Git-Repository später aktualisierst.


## Zu IPFS hinzufügen 

Sobald du das erledigt hast, ist das Repository bereit, bereitgestellt zu werden. Jetzt musst du es nur noch zu IPFS hinzufügen:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Die resultierende CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ausgezeichnet! Jetzt ist dein Repository in das Netzwerk hochgeladen.


## Mit IPFS klonen 

Du solltest jetzt in der Lage sein, das GitHub-Repository abzurufen mit:

git clone http://ipfs.io/ipfs/"yourCID"

Alternativ kannst du es auch über deinen lokalen IPFS-Knoten suchen und abrufen. 

Abschließender Hinweis: Der Repo-Ordner auf IPFS erhält keine Updates zusammen mit dem eigentlichen GitHub-Repository. Es wird empfohlen, den Ordner in regelmäßigen Abständen erneut hochzuladen.
