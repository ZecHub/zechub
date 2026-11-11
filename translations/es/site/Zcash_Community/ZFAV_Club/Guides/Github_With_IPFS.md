<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Servir el repositorio de GitHub con IPFS 

## Introducción

En esta guía aprenderemos a crear una URL clonable con git para tu repositorio de GitHub alojado mediante un CID de IPFS. ¡Esto es útil para garantizar la disponibilidad del contenido independientemente de la región geográfica, la resistencia a la censura [censorship resistance] y como una copia de seguridad persistente de información valiosa!

Nota: Los datos subidos a IPFS están disponibles para *todos* los usuarios de la red. Quizás quieras cifrar [encrypt] localmente los datos personales o confidenciales.


## Instalar IPFS Kubo

Sigue las instrucciones de instalación proporcionadas [aquí](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

En este ejemplo usamos Linux; hay disponibles otras versiones de sistemas operativos. 

Comprueba que la instalación se realizó correctamente usando «ipfs --version»


## Clonar el repositorio 

Para empezar, selecciona un repositorio Git que quieras alojar y clónalo:

Ejecuta el comando: «git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Ahora, prepáralo para que pueda clonarse mediante IPFS.

cd zechub
git update-server-info


Desempaqueta los objetos de Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Esto permitirá que IPFS deduplique los objetos si actualizas el repositorio Git más adelante.


## Añadir a IPFS 

Una vez que hayas hecho eso, el repositorio estará listo para ser alojado. Lo único que queda por hacer es añadirlo a IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

El CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

¡Excelente! Ahora tu repositorio está subido a la red.


## Clonar usando IPFS 

Ahora deberías poder recuperar el repositorio de github usando:

git clone http://ipfs.io/ipfs/"yourCID"

Como alternativa, puedes buscarlo y recuperarlo usando tu nodo IPFS local. 

Nota final: La carpeta del repositorio en IPFS no recibe actualizaciones junto con el repositorio real de github. Se recomienda volver a subir la carpeta a intervalos regulares.
