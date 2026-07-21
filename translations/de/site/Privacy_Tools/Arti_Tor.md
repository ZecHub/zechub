![Tor-Logo](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: Der Tor-Client der nächsten Generation in Rust**
![Atri-Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** ist die Initiative des Tor Project zum Aufbau eines Tor-Clients der nächsten Generation mit der Programmiersprache **Rust**. Arti ist modular, einbettbar und produktionsreif konzipiert und bietet eine sicherere und effizientere Implementierung der **Tor**-Anonymitätsprotokolle. Mit **Arti Version 1.4.0** wurden mehrere bedeutende Aktualisierungen eingeführt:

- Eine **neue RPC-Schnittstelle** für eine verbesserte Interaktion.
- Vorbereitende Arbeiten für **Relay-Unterstützung**.
- Verbesserungen bei der **Widerstandsfähigkeit gegen Denial-of-Service bei Onion Services auf der Diensteseite**.

Diese Veröffentlichung setzt die Bemühungen des Tor Project fort, Tor-Nutzern und Entwicklern bessere Sicherheit, Leistung und Modularität zu bieten.


---


## **Installation des Arti-Clients**

Folge diesen Schritten, um **Arti** als SOCKS-Proxy auf deinem System zu installieren und auszuführen.

---

### **Schritt 1: Eine Rust-Entwicklungsumgebung einrichten**

Bevor du Arti aus dem Quellcode erstellen kannst, musst du die neueste stabile Version von **Rust** installiert haben.

#### So installierst du Rust:

1. Besuche die offizielle [Rust-Website](https://www.rust-lang.org/).
2. Folge den Installationsanweisungen für dein Betriebssystem.
3. Überprüfe die Installation, indem du Folgendes ausführst:
   
   ```sh
   rustc --version
   ```

Damit wird bestätigt, dass die neueste stabile Version von Rust auf deinem System installiert ist.

#### **Hinweis für Windows-Nutzer**:
- Rust kann unter Windows über [**Rustup**](https://rustup.rs/) installiert werden, ein Toolchain-Installer. Stelle sicher, dass du außerdem eine kompatible Build-Umgebung eingerichtet hast (unter Windows benötigst du möglicherweise **Visual Studio Build Tools**).
  
---

### **Schritt 2: Das Arti-Repository klonen**

Um die neueste Version des Arti-Clients zu erhalten, musst du das Repository von [**GitLab**](https://gitlab.torproject.org/tpo/core/arti) klonen.

#### Schritte:
1. Öffne dein Terminal (Eingabeaufforderung, PowerShell oder Git Bash unter Windows).
2. Führe den folgenden Befehl aus, um das Repository zu klonen:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Wechsle in das neu erstellte Verzeichnis *arti*:
   
   ```sh
   cd arti
   ```

Dadurch wird der Quellcode von Arti auf deinen lokalen Rechner heruntergeladen.

---

### **Schritt 3: Das Arti-Binary bauen**

Sobald du das Repository geklont hast, musst du Arti mit **Cargo** bauen, dem Paketmanager und Build-Werkzeug von Rust.

#### So baust du Arti:
1. Führe im Terminal den folgenden Befehl aus:
   ```sh
   cargo build --release
   ```

Dieser Befehl kompiliert den Arti-Code und optimiert ihn für den Produktiveinsatz (mit dem Flag *--release*). Das Binary wird im Verzeichnis *target/release* erstellt.

#### Speicherort des kompilierten Binary:
- Nach dem Build befindet sich das Arti-Binary hier:  
  ```sh
  target/release/arti
  ```

Du kannst dieses Binary direkt im Terminal ausführen.

---

### **Schritt 4: Den Arti-SOCKS-Proxy ausführen**

Um Arti als SOCKS-Proxy zu verwenden (der deinen Internetverkehr über das Tor-Netzwerk leitet), musst du den Proxy starten.

#### So startest du den SOCKS-Proxy:
1. Führe den folgenden Befehl aus:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Dieser Befehl startet Arti als **SOCKS5-Proxy** auf **Port 9150**, dem Standardport, den Tor für SOCKS-Datenverkehr verwendet.

---

### **Schritt 5: Anwendungen für die Nutzung von Arti konfigurieren**

Sobald Arti als SOCKS-Proxy läuft, musst du deine Anwendungen so konfigurieren, dass sie ihn für die Weiterleitung des Datenverkehrs über das Tor-Netzwerk verwenden.

#### Schritte:
1. Suche in den Einstellungen deiner Anwendung (z. B. Webbrowser, Terminal-Anwendung) nach den **Proxy-Einstellungen**.
2. Setze den **SOCKS5-Proxy** auf *localhost:9150*.

Dadurch wird der gesamte Datenverkehr deiner Anwendungen über das **Tor-Netzwerk** geleitet, wobei Arti als Vermittler dient.

---

## **Arti-Integration mit dem Tor-Netzwerk**

Hier ist ein vereinfachtes Diagramm, das veranschaulicht, wie Arti zusammen mit dem Tor-Netzwerk funktioniert:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Die **Application** verbindet sich über das **SOCKS5**-Protokoll mit dem **Arti SOCKS Proxy**.
- Arti kommuniziert anschließend mit dem **Tor-Netzwerk** und stellt sicher, dass dein Datenverkehr anonymisiert wird, während er durch das Netzwerk läuft.

---

## **GitLab-Repository und Mitwirkung**

Wenn du an der Entwicklung von **Arti** mitwirken möchtest, kannst du den Code ansehen und über **GitLab** beitragen.

- **Repository-Link**: [Arti-GitLab-Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Repository klonen**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forken und Mitwirken**:
1. **Forke** das Repository auf GitLab (erfordert ein GitLab-Konto).
2. Verbinde dein geforktes Repository mit deiner lokalen Einrichtung:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Ersetze *_name_* durch deinen GitLab-Benutzernamen.

3. **Übertrage Änderungen** in deinen Fork:
   ```sh
   git push _name_ main
   ```

4. **Erstelle einen Merge Request (MR)** auf GitLab:
   Navigiere zum Merge-Request-Bereich in deinem GitLab-Fork:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Richtlinien für Merge Requests**:
- **Führe während der Review kein Rebase und Squash von Commits durch**.
- Verwende bei Bedarf *fixup!* oder *squash!* für automatisch zusammengeführte Commits.
- Strebe an, **neue Commits hinzuzufügen**, statt sie während des Review-Zyklus zusammenzuführen.

---

### **Zusätzliche Hinweise**:

- **Vorgefertigte Binaries**: Stand jetzt stellt **Arti** keine offiziellen vorgefertigten Binaries bereit. Du musst den Client wie oben beschrieben aus dem Quellcode bauen.
- **Rust-Kenntnisse**: Wenn du zu Arti beiträgst, beachte, dass sich die Codebasis noch weiterentwickelt und es Änderungen oder Refaktorierungen geben kann, wenn neue Funktionen hinzugefügt werden.

---



Wenn du daran interessiert bist, zum Projekt beizutragen, schau dir gerne den Code an, fork das Repository und reiche einen Merge Request ein. Weitere Informationen, Aktualisierungen und Hilfe bei Problemen findest du im [Arti-GitLab-Repository](https://gitlab.torproject.org/tpo/core/arti). 

Viel Spaß mit **Arti** und frohes Hacken!

---
