<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Graphene OS

## TL;DR

- **GrapheneOS** es un sistema operativo móvil sin ánimo de lucro y de código abierto, centrado en la privacidad [privacy] y la seguridad, con compatibilidad total con las aplicaciones [apps] cotidianas de Android
- Puntos fuertes principales: sandbox de aplicaciones reforzado, código seguro para la memoria y mitigaciones de exploits, arranque verificado respaldado por hardware, permisos granulares y protección del puerto USB-C cuando el dispositivo está bloqueado
- La instalación se realiza mediante el instalador oficial de **WebUSB** (recomendado para la mayoría de usuarios) o mediante el **proceso de línea de comandos** para usuarios técnicos
- Para un usuario de Zcash, es una base sólida para la autocustodia móvil: combínalo con una billetera blindada mantenida y prácticas estándar de OPSEC

GrapheneOS es un proyecto sin ánimo de lucro y de código abierto dedicado a mejorar la privacidad y la seguridad en dispositivos móviles, manteniendo la compatibilidad con aplicaciones de Android. Este sistema operativo [Operating system] pone un gran énfasis en el avance de las tecnologías de privacidad y seguridad, con especial atención al fortalecimiento del sandboxing, las mitigaciones de exploits y el perfeccionamiento del modelo de permisos. Nació en 2014 bajo el nombre de **CopperheadOS** y desde entonces ha evolucionado hasta convertirse en un formidable guardián de tu privacidad y seguridad digitales.

El objetivo principal de GrapheneOS es reforzar los límites de seguridad, como el sandbox de aplicaciones, sin afectar negativamente a la experiencia del usuario. 

GrapheneOS puede incorporar diversos controles para funciones específicas, como permisos de red, permisos de sensores o restricciones cuando el dispositivo está bloqueado (que abarcan aspectos como periféricos USB, acceso a la cámara y accesos rápidos). Además, las funciones de privacidad y seguridad más complejas orientadas al usuario se diseñan cuidadosamente para mantener una experiencia fácil de usar, cada una con sus propias mejoras en la interfaz de usuario.

## **Funciones de GrapheneOS**

**Refuerzo de seguridad** GrapheneOS incluye amplias mejoras de seguridad, como lenguajes de programación seguros para la memoria y funciones de seguridad basadas en compiladores para reducir vulnerabilidades comunes.

**Sandboxing** Refuerza el sandboxing de aplicaciones para aislarlas entre sí, limitando posibles vectores de ataque.

**Arranque verificado** GrapheneOS utiliza claves respaldadas por hardware y un proceso de arranque verificable para garantizar la integridad del sistema operativo.

**Permisos mejorados** Proporciona un mayor control sobre los permisos de las aplicaciones, permitiendo a los usuarios ajustar y gestionar qué datos pueden acceder las aplicaciones.

**Panel de privacidad** Los usuarios pueden supervisar y controlar el comportamiento de las aplicaciones mediante un panel de privacidad, lo que proporciona transparencia sobre el uso de los datos.

**Actualizaciones de seguridad integradas** GrapheneOS ofrece actualizaciones de seguridad oportunas, garantizando que los usuarios cuenten con la protección más reciente contra vulnerabilidades.

**Cifrado sólido** Emplea cifrado de disco completo de forma predeterminada, protegiendo los datos almacenados en el dispositivo.

**Seguridad mejorada del navegador** El navegador predeterminado está configurado para una seguridad mejorada, incluida la protección contra el rastreo.

**Aplicaciones preinstaladas mínimas** GrapheneOS incluye un número mínimo de aplicaciones preinstaladas, reduciendo los posibles riesgos para la seguridad y la privacidad.

**Protección contra puertos USB hostiles** Ofrece protección contra el acceso no autorizado al dispositivo mediante puertos USB cuando el dispositivo está bloqueado.

**Protecciones antimalware** GrapheneOS incluye funciones para detectar y prevenir malware conocido.

**Centrado en la privacidad** El SO está diseñado con un fuerte énfasis en la privacidad del usuario, minimizando la recopilación y exposición de datos.

**Código abierto** Es un proyecto de código abierto, lo que permite transparencia y contribuciones de la comunidad para mejorar la seguridad.

**Políticas de seguridad personalizables** Los usuarios pueden personalizar diversas políticas de seguridad según sus preferencias.

**Compatibilidad** GrapheneOS se esfuerza por mantener la compatibilidad con las aplicaciones de Android, de modo que los usuarios puedan seguir utilizando sus aplicaciones favoritas mientras se benefician de funciones mejoradas de seguridad y privacidad.

## **Instalación de GrapheneOS**

Como se indica en la sección de buenas prácticas, se recomienda utilizar la guía oficial de instalación recomendada. Existen dos métodos para instalar GrapheneOS: utilizar el instalador basado en [WebUSB](https://grapheneos.org/install/web) o utilizar la [guía de instalación mediante línea de comandos](https://grapheneos.org/install/cli)

**Instalación basada en Web USB** Para instalar GrapheneOS mediante el método de instalador web, normalmente necesitarás los siguientes materiales y recursos:

- 2 GB de memoria libre y 32 GB de espacio de almacenamiento libre.
- Cable USB (A o C)
- Sistema operativo compatible: Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 y 23.04), ChromeOS, GrapheneOS, Google Android (Pixel OS de fábrica)
- Navegadores compatibles: Chromium (no compatible con Ubuntu), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, navegador Brave.

Consulta la guía de instalación mediante el siguiente enlace y sigue el proceso de instalación

[Guía del instalador webGrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Instalación mediante línea de comandos** La instalación mediante línea de comandos no se recomienda para usuarios sin conocimientos técnicos, y se requieren las siguientes herramientas y recursos para la instalación mediante línea de comandos:

- Debes disponer de al menos 2 GB de memoria libre y 32 GB de espacio de almacenamiento libre
- Cable USB (A o C)
- Sistema operativo compatible: Windows 10, Windows 11, macOS Big Sur (11), macOS Monterey (12), macOS Ventura (13), Arch Linux, Debian 10 (buster), Debian 11 (bullseye), Debian 12 (bookworm), Ubuntu 20.04 LTS, Ubuntu 22.04 LTS, Ubuntu 22.10, Ubuntu 23.04
- Instalador web desde Android, ChromeOS o GrapheneOS

Consulta la guía de instalación mediante el siguiente enlace y sigue el proceso de instalación 

[Instalación mediante línea de comandos](https://grapheneos.org/install/cli#prerequisites)

## **Buenas prácticas**

**Mantén el SO actualizado** Actualiza regularmente GrapheneOS para asegurarte de contar con los parches y mejoras de seguridad más recientes.

**Usa contraseñas seguras** Establece contraseñas seguras y únicas para el cifrado del dispositivo y los inicios de sesión de aplicaciones, a fin de impedir el acceso no autorizado.

**Permisos de aplicaciones** Revisa y gestiona cuidadosamente los permisos de las aplicaciones, concediendo únicamente lo necesario para el funcionamiento de cada aplicación.

**Copias de seguridad periódicas** Realiza copias de seguridad periódicas de tus datos en caso de pérdida del dispositivo o corrupción de datos.

**Cifra el almacenamiento** Si no está habilitado de forma predeterminada, cifra el almacenamiento de tu dispositivo para proteger tus datos si el dispositivo se pierde o es robado.

**Pantalla de bloqueo segura** Utiliza una pantalla de bloqueo segura, como un PIN, una contraseña o autenticación biométrica, para impedir el acceso no autorizado.

**Evita rootear tu dispositivo Android** Evita rootear o desbloquear el bootloader, ya que esto puede debilitar la seguridad del dispositivo.

**Verifica las fuentes de las aplicaciones** Verifica la autenticidad de las aplicaciones y sus fuentes para evitar instalar software malicioso.

**Instala un navegador centrado en la privacidad** Considera utilizar un navegador centrado en la privacidad como el navegador Brave, Firefox o Bromite para navegar de forma segura.

**Audita las aplicaciones regularmente** Revisa periódicamente y desinstala las aplicaciones que ya no utilizas o en las que no confías para reducir la superficie de ataque.

**Habilita la autenticación de dos factores (2FA)** Habilita 2FA para tus cuentas en línea a fin de añadir una capa adicional de seguridad.

**Evita las redes Wi-Fi públicas** Ten cuidado al conectarte a redes Wi-Fi públicas, ya que pueden ser menos seguras. Utiliza una VPN cuando sea necesario.

**Ten cuidado con los datos de ubicación** Limita el rastreo de ubicación para las aplicaciones y considera utilizar una herramienta de falsificación de ubicación si valoras la privacidad.

**Evita enlaces y archivos adjuntos desconocidos** Desconfía de enlaces no solicitados y archivos adjuntos de correo electrónico, ya que podrían ser intentos de phishing o malware.

**Revisa la configuración predeterminada** Revisa y ajusta cuidadosamente la configuración predeterminada para alinearla con tus preferencias de privacidad.

**Soporte de la comunidad** Participa en la comunidad y los foros de GrapheneOS para obtener consejos, actualizaciones y recomendaciones de seguridad. Puedes contactar al equipo y mantenerte al día haciendo clic [aquí](https://grapheneos.org/contact) para explorar más contactos.

**Utiliza el método oficial de instalación** GrapheneOS ofrece dos métodos de instalación compatibles oficialmente. Los usuarios pueden optar por el instalador basado en WebUSB, recomendado para la mayoría de las personas, o seguir la guía de instalación mediante línea de comandos, adaptada a usuarios con mayor inclinación técnica.

## **Conclusión**

En esencia, GrapheneOS consiste en ofrecer un sistema operativo móvil alternativo que prioriza la privacidad y la seguridad de sus usuarios, otorgándoles un mayor control sobre sus vidas digitales y ofreciendo compatibilidad con las aplicaciones de las que dependen. Es un proyecto que pretende establecer un estándar elevado de seguridad y privacidad para dispositivos móviles en una época en la que estas preocupaciones son fundamentales.

## Páginas relacionadas

- [Mensajeros seguros](Secure_Messengers.md) — comunicación privada en un dispositivo reforzado
- [Cifrado PGP](PGP_Encryption.md) — correo e intercambio de archivos cifrados
- [VPN y DVPN](VPN_and_DVPN.md) — privacidad a nivel de red en dispositivos móviles
- [Navegadores web](Web_Browsers.md) — elegir y reforzar un navegador móvil
