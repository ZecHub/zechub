<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Guía del usuario de Keystone Zodl (antes Zashi)

> Mantén ZEC blindados en almacenamiento en frío: empareja un hardware wallet Keystone con la aplicación Zodl (antes Zashi, con nueva marca desde febrero de 2026) y firma las transacciones mediante códigos QR.

## En resumen

* Keystone 3 Pro (o Keystone 3) con el firmware Cypherpunk funciona como dispositivo de firma aislado de la red para Zodl, de modo que ZEC blindados pueden permanecer en almacenamiento en frío.
* Antes de empezar: batería por encima del 20 %, el cable USB (o una tarjeta MicroSD FAT32) para actualizar el firmware y la aplicación Zodl en tu teléfono.
* Verifica primero el dispositivo en el sitio web de Keystone. Así comprobarás que no fue manipulado durante el transporte.
* Crea la billetera en el dispositivo Keystone y anota fuera de línea la frase semilla de 24 palabras. Nunca se introduce en Zodl.
* Conéctala: en Keystone, toca «...» > Conectar billetera de software > Zodl; luego, en Zodl, toca Conectar hardware wallet y escanea el código QR.
* Zodl prepara cada transacción; apruébala y fírmala en la pantalla de Keystone, escaneando códigos QR en ambos sentidos.

## Explicación principal

Una hardware wallet mantiene tus claves de gasto en un dispositivo separado que nunca se conecta a internet. Keystone está aislado de la red: se comunica con tu teléfono solo mediante códigos QR, no por Bluetooth ni USB.

En esta configuración, Zodl es el lado de «observación». Se sincroniza con la red Zcash, muestra tu saldo blindado y prepara transacciones. Keystone guarda la frase semilla y firma. Un teléfono comprometido puede ver tu saldo, pero no puede mover fondos sin aprobación en Keystone.

Los pasos siguientes explican cómo preparar el dispositivo, verificarlo, actualizar el firmware, crear la billetera y conectarla a Zodl.

## Descripción general

Guía de Twitter:  => Guía de integración de hardware wallet [Zodl (antes Zashi) x Keystone Twitter](https://x.com/zashi_app/status/1869793574880973144) 

Esta integración representa una evolución importante en la facilidad de uso de Zcash, ya que permite el almacenamiento en frío de ZEC blindados. La comunidad de Zcash ha sufrido contratiempos con otras plataformas de hardware wallet en el pasado, pero Keystone se convirtió en un colaborador dispuesto a superar los límites e innovar junto con Electric Coin Company. El equipo de Keystone recibió una subvención ZCG para financiar su parte del trabajo.

## Tutorial de Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial de Keystone X Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparación
[Pide y recibe tu Keystone 3 Pro o Keystone 3](https://keyst.one) 

Nivel de batería: Asegúrate de que tu dispositivo Keystone tenga más del 20 % de batería.

Cable USB o tarjeta SD:

- Cable USB para actualizar el firmware (incluido).
- Tarjeta Micro SD (de menos de 1 TB) para actualizaciones (se compra por separado).

Acceso al sitio web oficial de Keystone para la verificación y la actualización del firmware.

Configura la aplicación Zodl en tu dispositivo móvil.

## Guía paso a paso de [(dispositivo Keystone)](https://keyst.one/get-started) 


**Elige tu idioma**

- **Verificación del dispositivo (mediante QR):** La verificación del dispositivo es fundamental para detectar posibles manipulaciones durante el transporte, prevenir ataques a la cadena de suministro y garantizar la seguridad del firmware instalado.
  - Visita la página de verificación del dispositivo en el sitio web de Keystone.
  - Haz clic en «Escanear código QR» en el sitio web oficial.
  - Usa la cámara de tu Keystone para escanear el código QR que aparece en el sitio web.
  - Aparecerá un código de verificación en la pantalla de tu Keystone.
  - Introduce este código en el sitio web para completar el proceso de verificación.

- **Actualización del firmware:**
  - Actualizar mediante tarjeta MicroSD
    - Asegúrate de que tu billetera Keystone tenga al menos un 20 % de batería.
    - Inserta la tarjeta SD en tu computadora y formatéala como FAT32.
    - Descarga la versión más reciente del firmware Cypherpunk desde la página de actualización del firmware de [Keystone](https://keyst.one/firmware) y guarda el archivo keystone3.bin en la raíz de la tarjeta MicroSD.
    - Inserta en tu billetera Keystone la tarjeta SD que contiene el firmware.
    - Abre la opción «Actualizar» en tu billetera Keystone y sigue las instrucciones en pantalla para iniciar el proceso de actualización.
  - **Actualizar mediante cable USB**
    - Si la versión de tu firmware es anterior a la 1.0.4, primero tendrás que realizar la actualización inicial con una tarjeta MicroSD para poder continuar con las actualizaciones por USB.
    - Asegúrate de que tu billetera Keystone tenga al menos un 20 % de batería.
    - Toca «mediante USB» y usa el cable USB para conectar tu billetera Keystone a la computadora. Toca [Aprobar] para conceder acceso USB a tu billetera Keystone; de lo contrario, quizá solo permita la carga.
    - Abre el navegador web de tu computadora y ve a la página de actualización del firmware de [Keystone](https://keyst.one/firmware)
    - En la página de actualización, haz clic en el botón «Instalar actualización» y sigue las instrucciones para instalar el firmware más reciente.
- **Crear una billetera:**
    - Contraseña segura: Elige un PIN o una contraseña segura para proteger tu billetera.
    - Ponle un nombre a tu billetera (opcional): Puedes asignarle un nombre para identificarla fácilmente o saltarte este paso.
    - Selecciona «Crear billetera nueva» si estás configurando una billetera por primera vez.
    - Tu dispositivo generará una frase semilla de 24 palabras.
    - Anota esta frase semilla y guárdala en un lugar seguro.
    - Confirma la frase semilla verificando que las palabras estén en el orden correcto, tal como aparecen en la pantalla.
- **Conectar Zodl + billetera Keystone:**
    - En el dispositivo Keystone: Toca … en la página principal.
    - Toca «Conectar billetera de software» y elige Zodl. Aparecerá el código QR para conectarla a Zodl.
    - En la aplicación Zodl: Toca el menú desplegable Zodl (en la esquina superior izquierda de la pantalla).
    - Toca «Conectar hardware wallet».
    - Toca «Listo para escanear».
    - Escanea el código QR que aparece en el dispositivo Keystone.
    - En la aplicación Zodl: Confirma la cuenta de la billetera Keystone tocando la cuenta que aparece.
    - Toca «Conectar» en la parte inferior de la pantalla.


## Ayuda adicional

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Conecta hardware wallet Keystone a Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Firma una transacción saliente con Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
