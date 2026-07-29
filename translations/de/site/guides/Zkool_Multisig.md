# Zkool Multisig-Anleitung

Diese Anleitung bietet eine Schritt-für-Schritt-Einführung dazu, wie man Multisig-Transaktionen mit Zkool durchführt. Sie umfasst das Erstellen von Konten, das Senden oder Empfangen von Geldern sowie das Einrichten der verteilten Schlüsselgenerierung (DKG) für Multisig. Für jeden wichtigen Schritt sind Screenshots enthalten.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool-Demo | Der Nachfolger von Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Ein Konto erstellen


1. Öffne die **Zkool-App** und gehe zu **Neues Konto**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Gib einen **Kontonamen** ein (z. B. Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Aktiviere bei Bedarf optional **Use Internal Change** oder **Restore Account**.


5. Nach dem Erstellen erscheint das Konto in deiner **Kontoliste**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Gelder empfangen

Jedes Konto erzeugt mehrere Adresstypen:

**Unified Address**

**Orchard only Address**

**Sapling Address**
  
**Transparent Address**


Wähle den Typ aus, den du verwenden möchtest, und teile ihn, um Gelder zu empfangen.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Gelder senden

1. Gehe zum Abschnitt **Empfänger**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Gib die **Empfängeradresse** ein.  

4. Gib den **Betrag** und optional ein **Memo** an.  

5. Prüfe die Transaktionsdetails und **bestätige**.  


Sobald der Vorgang abgeschlossen ist, wird der Kontostand in deiner Kontoliste aktualisiert.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Multisig-Transaktionen durchführen: Einrichten der verteilten Schlüsselgenerierung (Multisig)

Multisig in Zkool verwendet **Distributed Key Generation (DKG)**, um sicherzustellen, dass mehrere Teilnehmer ein gemeinsames Konto kontrollieren.



### Schritt 1: DKG starten
Wähle einen **Namen** für die gemeinsame Wallet (z. B. Anabelle).

Lege die **Anzahl der Teilnehmer** fest.
  
Wähle deine **Teilnehmer-ID**.
  
Definiere die **Anzahl der erforderlichen Unterzeichner (Schwellenwert)**.
    
Wähle das **Finanzierungskonto** aus.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Schritt 2: Teilnehmeradressen hinzufügen
- Gib die **Unified Address** jedes Teilnehmers ein (empfohlen).


**Hinweis:** Wenn du eine Orchard only- oder Sapling only-Adresse verwendest, ist das Multisig nur auf diesen Pool beschränkt (Orchard oder Sapling).  
Das bedeutet, dass die gemeinsame Wallet keine Gelder aus anderen Pools empfangen kann.  
Für maximale Kompatibilität und Flexibilität solltest du immer **Unified Addresses** verwenden.  


### Schritt 3: DKG-Runden durchführen
Warte, bis alle Teilnehmer die Pakete für **Runde 1** und **Runde 2** ausgetauscht haben.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Schritt 4: Gemeinsame Adresse finalisieren
Sobald der Vorgang abgeschlossen ist, wird eine **gemeinsame Adresse** erzeugt.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Fazit

Mit Zkool kannst du: Konten erstellen, Gelder senden und empfangen sowie eine **Multisig-Wallet** mithilfe von Distributed Key Generation einrichten. Das sorgt für **erhöhte Sicherheit** sowie **gemeinsame und private Verwaltung von Geldern**.
