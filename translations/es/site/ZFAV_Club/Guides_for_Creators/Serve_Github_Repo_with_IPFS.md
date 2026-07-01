<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Servir repositorio de GitHub con IPFS

## Introducción

En esta guía aprenderemos cómo crear una URL clonable con git para tu repositorio de GitHub servido usando un CID de IPFS. 

Esto es útil para garantizar la disponibilidad del contenido independientemente de la región geográfica, la resistencia a la censura y como copia de seguridad persistente de información valiosa.

Nota: Los datos subidos a IPFS están disponibles para todos los usuarios de la red. Puede que quieras cifrar localmente los datos personales/sensibles.

## Instalar IPFS Kubo

Sigue las instrucciones de instalación proporcionadas [aquí](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

En este ejemplo usamos Linux, hay disponibles versiones para otros sistemas operativos.

Comprueba que la instalación se haya realizado correctamente usando   ipfs –version

## Clonar repositorio

Para empezar, selecciona un repositorio Git que quieras alojar y clónalo:

Ejecuta el comando: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Ahora, para dejarlo listo para que pueda clonarse mediante IPFS.

cd zechub git update-server-info

Desempaqueta los objetos de Git:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Hacer esto permitirá que IPFS deduplique objetos si actualizas el repositorio Git más adelante.

## Añadir a IPFS

Una vez que hayas hecho eso, ese repositorio estará listo para ser servido. Todo lo que queda por hacer es añadirlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

El CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

¡Excelente! Ahora tu repositorio está subido a la red.

## Clonar usando IPFS

Ahora deberías poder recuperar el repositorio de GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

Como alternativa, puedes buscarlo y recuperarlo usando tu nodo local de IPFS.

Nota final: La carpeta del repositorio en IPFS no recibe actualizaciones junto con el repositorio real de github. Se recomienda volver a subir la carpeta a intervalos regulares.
