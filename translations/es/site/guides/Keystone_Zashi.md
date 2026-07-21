# Guía del usuario de Keystone Zashi

Guía de Twitter:  => [Guía de Twitter sobre la integración de la billetera de hardware Zashi x Keystone](https://x.com/zashi_app/status/1869793574880973144) 

Esta integración marca una evolución significativa en la usabilidad de Zcash al permitir el almacenamiento en frío de ZEC blindados. La comunidad de Zcash ha enfrentado contratiempos con otras plataformas de billeteras de hardware en el pasado, pero Keystone surgió como un socio colaborativo dispuesto a superar límites e innovar junto con la Electric Coin Company. El equipo de Keystone recibió una subvención de ZCG para impulsar su parte del trabajo.

## Tutorial de Keystone X Zashi

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
[Ordena y recibe tu Keystone 3 Pro o Keystone 3](https://keyst.one) 

Nivel de batería: Asegúrate de que tu dispositivo Keystone tenga un nivel de batería superior al 20%.

Cable USB o tarjeta SD:

- Cable USB para actualización de firmware (incluido).
- Tarjeta Micro SD (de menos de 1 TB) para actualizaciones (se compra por separado).

Acceso al sitio web oficial de Keystone para la verificación y la actualización de firmware.

Configuración de la app Zashi en tu dispositivo móvil.

## [Guía paso a paso (dispositivo Keystone)](https://keyst.one/get-started) 


**Elige tu idioma**
-Verificación del dispositivo (mediante QR): La verificación del dispositivo es crucial para detectar una posible manipulación durante el transporte, prevenir ataques a la cadena de suministro y garantizar la seguridad del firmware instalado.
  - Visita la página de verificación del dispositivo en el sitio web de Keystone.
  - Haz clic en Escanear código QR en el sitio web oficial.
  - Usa la cámara de tu Keystone para escanear el código QR que aparece en el sitio web.
  - Aparecerá un código de verificación en la pantalla de tu Keystone.
  - Introduce este código en el sitio web para completar el proceso de verificación.

- **Actualización de firmware:**
  - Actualización mediante tarjeta MicroSD
    - Asegúrate de que tu billetera Keystone tenga al menos un 20% de carga de batería.
    - Inserta la tarjeta SD en tu ordenador y formatéala como FAT32.
    - Descarga la versión más reciente del firmware Cypherpunk desde la [página de actualización de firmware de Keystone](https://keyst.one/firmware) y guarda el archivo keystone3.bin en la raíz de tu tarjeta MicroSD.
    - Coloca la tarjeta SD con el firmware en tu billetera Keystone.
    - Accede a la opción "Upgrade" en tu billetera Keystone y luego sigue las instrucciones en pantalla para iniciar el proceso de actualización.
  - **Actualización mediante cable USB**
    - Si tu versión de firmware es inferior a 1.0.4, tendrás que realizar la actualización inicial usando una tarjeta MicroSD antes de poder continuar con las actualizaciones por USB.
    - Asegúrate de que tu billetera Keystone tenga al menos un 20% de carga de batería.
    - Toca via USB y usa el cable USB para conectar tu billetera Keystone a tu ordenador. Toca [Approve] para conceder a tu billetera Keystone acceso USB, ya que de lo contrario podría permitir solo la carga.
    - Abre el navegador web de tu ordenador y ve a la [página de actualización de firmware de Keystone](https://keyst.one/firmware)
    - En la página de actualización, haz clic en el botón Install Update y sigue las instrucciones proporcionadas para instalar el firmware más reciente.
- **Crear billetera:**
    - Contraseña segura: Elige un PIN o contraseña fuerte para proteger tu billetera.
    - Nombra tu billetera (opcional): Opcionalmente, dale un nombre a tu billetera para identificarla fácilmente o sáltate este paso.
    - Selecciona Create New Wallet si estás configurando una billetera por primera vez.
    - Tu dispositivo generará una frase semilla de 24 palabras.
    - Anota esta frase semilla y guárdala de forma segura.
    - Confirma la frase semilla verificando las palabras en el orden correcto tal como se muestran en la pantalla.
- **Conectar la billetera Zashi + Keystone:**
    - En el dispositivo Keystone: toca … en la página principal
    - Toca Connect Software Wallet y elige Zashi. Aparecerá el código QR para la conexión con Zashi.
    - En la app Zashi: toca el menú desplegable de zashi (parte superior izquierda de la pantalla)
    - Toca Connect Hardware Wallet
    - Toca Ready to Scan
    - Escanea el QR mostrado en el dispositivo Keystone
    - En la app Zashi: confirma la cuenta de la billetera Keystone tocando la cuenta mostrada
    - Toca Connect en la parte inferior de la pantalla


## Ayuda adicional

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Conectar la billetera de hardware Keystone a Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Firmar una transacción saliente con Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
