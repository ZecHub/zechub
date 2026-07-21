<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Guía de Raspberry Pi 4 para ejecutar Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Ejecutar el software de nodo Zebra en una Raspberry Pi 4 te permite participar en la red de Zcash como un nodo independiente y compatible con el consenso. Esta guía te mostrará los pasos para configurar y ejecutar Zebra en tu Raspberry Pi 4.

## Requisitos previos

1. Raspberry Pi 4 (se recomiendan 2 GB de RAM o más).

2. Tarjeta MicroSD (se recomiendan 16 GB o más) con Raspberry Pi OS (Raspbian) instalado.

3. Conexión a internet estable.

4. Teclado, ratón y monitor (para la configuración inicial).

5. Cliente SSH (opcional, para acceso remoto).

## Instalación

1. __Actualiza tu sistema__
   Abre una terminal o conéctate por SSH a tu Raspberry Pi y asegúrate de que tu sistema esté actualizado ejecutando:

   __sudo apt update__

   __sudo apt upgrade__

2. __Instala las dependencias__
   Necesitarás instalar algunas dependencias necesarias para compilar y ejecutar Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Clona el repositorio de Zebra__
   Abre una terminal y clona el repositorio de Zebra en tu Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Compila Zebra__
   Para compilar Zebra, usa los siguientes comandos:

   __cargo build --release__

   Este proceso puede tardar algo de tiempo. Asegúrate de que tu Raspberry Pi esté adecuadamente refrigerada, ya que la compilación puede generar calor.

5. __Configuración__
   Crea un archivo de configuración para Zebra. Puedes usar la configuración predeterminada como punto de partida:

   __cp zcash.conf.example zcash.conf__

   Edita el archivo zcash.conf para personalizar la configuración de tu nodo. Puedes especificar la red, habilitar la minería, configurar conexiones con pares y más.

6. __Inicia Zebra__
   Ahora puedes iniciar Zebra con tu configuración personalizada:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Este comando iniciará el nodo Zebra y comenzará a sincronizarse con la cadena de bloques de Zcash.

7. __Supervisión__
   Puedes supervisar el progreso y el estado de tu nodo Zebra abriendo un navegador web y navegando a __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="logotipo de zebra" width="200" height="200"/>

## Solución de problemas

Si encuentras algún problema al compilar o ejecutar Zebra, consulta la [documentación de Zebra](https://doc.zebra.zfnd.org/docs/intro.html) para obtener consejos de solución de problemas e información adicional.

Asegúrate de mantener tu Raspberry Pi fresca, ya que ejecutar un nodo puede generar calor. Quizás quieras usar una solución de refrigeración, como un ventilador o un disipador térmico.

## Conclusión

Siguiendo esta guía, deberías haber configurado y ejecutado Zebra correctamente en tu Raspberry Pi 4. Ahora estás contribuyendo a la red de Zcash como un nodo independiente, ayudando a proteger la privacidad de las transacciones de Zcash.
