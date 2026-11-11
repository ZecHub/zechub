# Keystone Zashi Guía del usuario

Guía de Twitter:  => [Zashi x Keystone Integración de Hardware Wallet Twitter Guía](https://x.com/zashi_app/status/1869793574880973144) 

Esta integración marca una evolución significativa en la usabilidad de Zcash al habilitar el almacenamiento en frío de ZEC blindado [shielded]. La comunidad de Zcash ha sufrido contratiempos con otras plataformas de hardware wallet en el pasado, pero Keystone surgió como un socio colaborativo dispuesto a superar límites e innovar junto a Electric Coin Company. El equipo de Keystone recibió una subvención [grant] de ZCG para impulsar su parte del trabajo.

## Keystone X Zashi Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial de Keystone X Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparación
[Solicita y recibe tu Keystone 3 Pro o Keystone 3](https://keyst.one) 

Nivel de batería: Asegúrate de que tu dispositivo keystone tenga un nivel de batería superior al 20%.

Cable USB o tarjeta SD:

- Cable USB para la actualización de firmware (incluido).
- Tarjeta Micro SD (menos de 1 TB) para actualizaciones (se compra por separado).

Acceso al sitio web oficial de Keystone para la verificación y la actualización de firmware.

Configuración de la aplicación Zashi en tu dispositivo móvil.

## [Guía paso a paso (dispositivo Keystone)](https://keyst.one/get-started) 


**Elige tu idioma**
-Verificación del dispositivo (mediante QR): La verificación del dispositivo es crucial para detectar una posible contaminación durante el transporte, prevenir ataques a la cadena de suministro y garantizar la seguridad del firmware instalado.
  - Visita la página de verificación del dispositivo en el sitio web de Keystone.
  - Haz clic en Escanear código QR en el sitio web oficial.
  - Usa la cámara de tu Keystone para escanear el código QR que se muestra en el sitio web.
  - Aparecerá un código de verificación en la pantalla de tu Keystone.
  - Introduce este código en el sitio web para completar el proceso de verificación.

- **Actualización de firmware:**
  - Actualización mediante tarjeta MicroSD
    - Asegúrate de que tu billetera [wallet] Keystone tenga al menos un 20% de carga de batería.
    - Inserta la tarjeta SD en tu computadora y formatéala como FAT32.
    - Descarga la última versión del firmware Cypherpunk desde la página de actualización de firmware de [Keystone](https://keyst.one/firmware) y guarda el archivo keystone3.bin en la raíz de tu tarjeta MicroSD.
    - Coloca la tarjeta SD con el firmware en tu billetera Keystone.
    - Accede a la opción «Upgrade» en tu billetera Keystone y luego sigue las instrucciones en pantalla para iniciar el proceso de actualización.
  - **Actualización mediante cable USB**
    - Si tu versión de firmware es inferior a 1.0.4, deberás realizar la actualización inicial mediante una tarjeta MicroSD antes de poder continuar con las actualizaciones por USB.
    - Asegúrate de que tu billetera Keystone tenga al menos un 20% de carga de batería.
    - Toca «via USB» y usa el cable USB para conectar tu billetera Keystone a tu computadora. Toca [Approve] para conceder a tu billetera Keystone acceso por USB, ya que de otro modo podría permitir únicamente la carga.
    - Abre el navegador web de tu computadora y ve a la página de actualización de firmware de [Keystone](https://keyst.one/firmware)
    - En la página de actualización, haz clic en el botón «Install Update» y sigue las instrucciones proporcionadas para instalar el firmware más reciente.
- **Crear billetera:**
    - Contraseña segura: Elige un PIN o una contraseña robustos para proteger tu billetera.
    - Nombra tu billetera (opcional): De manera opcional, asigna un nombre a tu billetera para identificarla fácilmente u omite este paso.
    - Selecciona «Create New Wallet» si estás configurando una billetera por primera vez.
    - Tu dispositivo generará una frase semilla [seed phrase] de 24 palabras.
    - Anota esta frase semilla y guárdala de forma segura.
    - Confirma la frase semilla verificando las palabras en el orden correcto tal como se muestran en pantalla.
- **Conectar la billetera Zashi + Keystone:**
    - En el dispositivo Keystone: Toca … en la página principal.
    - Toca «Connect Software Wallet» y elige Zashi. Aparecerá el código QR para la conexión con Zashi.
    - En la aplicación Zashi: Toca el menú desplegable de zashi (parte superior izquierda de la pantalla).
    - Toca «Connect Hardware Wallet».
    - Toca «Ready to Scan».
    - Escanea el QR mostrado en el dispositivo Keystone.
    - En la aplicación Zashi: Confirma la cuenta de billetera Keystone tocando la cuenta mostrada.
    - Toca «Connect» en la parte inferior de la pantalla.


## Ayuda adicional

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Conectar la Hardware Wallet Keystone a Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Firmar una transacción saliente [transaction] con Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
