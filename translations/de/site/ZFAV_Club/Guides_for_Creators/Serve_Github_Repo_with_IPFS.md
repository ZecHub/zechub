<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# GitHub-Repo mit IPFS bereitstellen

## Einführung

In diesem Leitfaden lernen wir, wie man eine per Git klonbare URL für ein GitHub-Repository erstellt, das über einen IPFS-CID bereitgestellt wird. 

Das ist nützlich, um die Verfügbarkeit von Inhalten unabhängig von der geografischen Region sicherzustellen, Zensurresistenz zu erreichen und ein dauerhaftes Backup wertvoller Informationen zu haben!

Hinweis: In IPFS hochgeladene Daten sind für alle Nutzer des Netzwerks verfügbar. Es kann sinnvoll sein, persönliche/sensible Daten lokal zu verschlüsseln.

## IPFS Kubo installieren

Folge den Installationsanweisungen [hier](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In diesem Beispiel verwenden wir Linux, andere Betriebssystemversionen sind verfügbar.

Prüfe mit   ipfs –version, ob die Installation erfolgreich war

## Repository klonen

Wähle zunächst ein Git-Repository aus, das du hosten möchtest, und klone es:

Befehl ausführen: “git clone https://github.com/zechub/zechub”

![/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Nun bereiten wir es darauf vor, über IPFS geklont werden zu können.

cd zechub git update-server-info

Git-Objekte entpacken:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Dadurch kann IPFS Objekte deduplizieren, falls du das Git-Repository später aktualisierst.

## Zu IPFS hinzufügen

Sobald du das erledigt hast, ist das Repository bereit, bereitgestellt zu werden. Jetzt musst du es nur noch zu IPFS hinzufügen:

$ pwd

/code/myrepo

$ ipfs add -r 

![/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

Der resultierende CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Großartig! Jetzt ist dein Repository ins Netzwerk hochgeladen.

## Mit IPFS klonen

Du solltest das GitHub-Repository jetzt abrufen können mit:

git clone http://ipfs.io/ipfs/yourCID

Alternativ kannst du auch über deinen lokalen IPFS-Knoten suchen und es abrufen.

Abschließender Hinweis: Der Repo-Ordner auf IPFS erhält keine Aktualisierungen zusammen mit dem eigentlichen GitHub-Repository. Es wird empfohlen, den Ordner in regelmäßigen Abständen erneut hochzuladen.
