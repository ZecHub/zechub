<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Servir el repositorio [Repo] de GitHub con IPFS

## Introducción [Introduction]

En esta guía [guide] aprenderemos a crear una URL clonable con git para tu repositorio GitHub servido mediante un CID de IPFS. 

¡Esto resulta útil para garantizar la disponibilidad del contenido independientemente de la región geográfica, la resistencia a la censura y como copia de seguridad persistente de información valiosa!

Nota [Note]: Los datos cargados en IPFS están disponibles para todos los usuarios de la red. Puede que desees cifrar [encrypt] localmente los datos personales o sensibles.

## Instalar IPFS Kubo

Sigue las instrucciones de instalación proporcionadas [aquí](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

En este ejemplo usamos Linux; hay disponibles otras versiones de sistemas operativos.

Comprueba que la instalación se realizó correctamente usando   ipfs –version

## Clonar el repositorio

Para comenzar, selecciona un repositorio de Git que quieras alojar y clónalo:

Ejecuta el comando: «git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Ahora, prepáralo para que pueda clonarse mediante IPFS.

cd zechub git update-server-info

Desempaqueta los objetos de Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Hacer esto permitirá que IPFS deduplique los objetos si actualizas el repositorio de Git más adelante.

## Añadir a IPFS

Una vez hecho esto, ese repositorio estará listo para ser servido. Solo queda añadirlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

El CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

¡Excelente! Ahora tu repositorio está cargado en la red.

## Clonar usando IPFS

Ahora deberías poder recuperar el repositorio GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

Como alternativa, puedes buscar y recuperar usando tu nodo local de IPFS.

Nota final: La carpeta del repositorio en IPFS no recibe actualizaciones junto con el repositorio real de github. Se recomienda volver a cargar la carpeta a intervalos regulares.
