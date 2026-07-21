<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Trasmissioni comunitarie con VDO.Ninja e OBS Studio

Questo breve tutorial è stato creato durante il [DWeb Camp 2023](https://dwebcamp.org/) da un gruppo di fellow e volontari. L'obiettivo di questo esercizio è sfruttare l'uso di dispositivi smartphone connessi a una rete MESH offline per la registrazione e lo streaming video collaborativi.

Usiamo due software open source, [OBS Studio (Open Broadcaster software)](https://obsproject.com/) e [VDO.Ninja](https://vdo.ninja/). Questi software possono essere scaricati ed eseguiti localmente sul tuo computer.

## OBS Studio (Open Boardcaster software)

OBS Studio è un software gratuito e open source per la registrazione e lo streaming dal vivo, disponibile per più sistemi operativi. Il software è stato rilasciato per la prima volta nel 2012 e gode di un seguito piuttosto ampio nella community degli streamer di videogiochi e dei creator di contenuti video indipendenti.

Le interfacce utente di OBS Studio possono sembrare piuttosto scoraggianti per chi le usa per la prima volta. OBS Studio è diviso in due finestre, "Preview" e "Broadcast". La finestra di anteprima mostra i video disponibili (varie telecamere come webcam, Iriun Webcam, OBS Virtual Camera, sorgenti video e browser) chiamati "Scene", mentre "Broadcast" mostra lo streaming dal vivo.

Per fare streaming da una sorgente di telecamera remota di VDO.ninja in OBS Studio, inizi aggiungendo una nuova "Browser Source" con "Sources > Add > Browser". Nella nuova finestra, puoi fornire l'URL della sorgente da VDO.Ninja e selezionare "Make source visible".

Ora puoi iniziare a trasmettere gli stream remoti.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) è un'applicazione web gratuita e open source che ti permette di trasformare i tuoi dispositivi mobili in una telecamera per lo streaming dal vivo. Il software può essere scaricato e distribuito sul tuo computer locale, oppure puoi usare direttamente la [versione online su https://vdo.ninja](https://vdo.ninja/).

L'interfaccia di VOD.Ninja è semplice: apri semplicemente VDO.Ninja nel browser web dei tuoi dispositivi mobili e seleziona "Add your camera to OBS". A quel punto selezionerai la tua telecamera e il tuo dispositivo audio dall'elenco dei dispositivi e farai clic su "Start". Otterrai quindi un link "view" che puoi aggiungere a OBS Studio.

## Dirigere una community call con VDO.Ninja

Inizia andando su [VDO.ninja](http://VDO.ninja) con il tuo browser web su un desktop/laptop.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Per creare una nuova stanza e dirigere il livestream della tua community call, fai clic su Create a Room.

La schermata successiva ti chiederà le informazioni di base per configurare la tua stanza.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Una volta creata una stanza, il regista ha a disposizione molte opzioni di controllo nella schermata seguente.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Quando le persone entrano nella tua stanza, tu, il regista, vedrai apparire tutte le opzioni e i controlli della sorgente insieme al loro video e audio.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## FAQ

- Che tipi di schede grafiche video sono necessari per OBS Studio?

Puoi usare un personal computer con una buona scheda grafica e molta memoria, oppure in alternativa puoi usare un encoder hardware come il [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS permette di fare traduzione e sottotitolazione in tempo reale?

Ci sono alcuni plugin contribuiti dalla community che sembrano fornire una funzionalità del genere. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Puoi sviluppare i tuoi plugin per OBS Studio?

Sì, OBS supporta lo scripting in lua e python. Anche JavaScript per overlay e webview.

- Usiamo dissolvenze al nero in tempo reale o transizioni?

Sta a te, il produttore!

- C'è latenza quando si fa streaming?

Dipende per lo più dalla destinazione verso cui stai trasmettendo. Ad esempio, YouTube potrebbe avere un ritardo di un minuto o più a causa dell'elaborazione video effettuata sui loro server prima della trasmissione.

- L'audio si interrompe usando OBS su una macchina lenta e mentre si fa green-screening

Usa un encoder hardware oppure usa stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) oppure [RiverSide.FM](http://riverside.fm/)

## Crediti

- Ryan
- Ajay
- Arky

## Risorse

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: la community dei media e degli eventi digitali
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
