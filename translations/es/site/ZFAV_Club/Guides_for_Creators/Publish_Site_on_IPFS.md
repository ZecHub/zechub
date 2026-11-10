<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Publicar un sitio en IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Introducción a IPFS

IPFS (Sistema de Archivos Interplanetario [InterPlanetary File System]) es un protocolo y una red peer-to-peer diseñados para crear un método descentralizado [decentralised] de almacenar y compartir archivos.

A diferencia del modelo tradicional cliente-servidor de Internet, IPFS permite a los usuarios compartir archivos directamente entre sí, en lugar de depender de un servidor centralizado para almacenar y distribuir contenido.

Los archivos en IPFS se identifican mediante *direccionamiento por contenido [content-addressing]*, lo que significa que a cada archivo se le asigna un hash único o IDENTIFICADOR DE CONTENIDO (CID) según su contenido, y este hash se utiliza para recuperar el archivo de la red.

Cuando un usuario añade un archivo a IPFS, el archivo se divide en pequeñas partes llamadas bloques [blocks], y a cada bloque se le asigna un CID. Estos bloques se almacenan posteriormente en diferentes nodos [nodes] de la red, de modo que el archivo puede recuperarse fácilmente de múltiples fuentes.

Esto garantiza redundancia y tolerancia a fallos, a la vez que dificulta que un solo nodo se convierta en un punto único de fallo o control.

**Lee: [Una introducción a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Crear tu sitio

Para este ejemplo, estamos creando un sitio web sencillo.

[Sitio de ejemplo](https://squirrel.surf/)

**Paso 1:** Si no estás familiarizado con el diseño web, escribe el contenido principal de tu sitio web, incluido el título, el cuerpo principal del texto, enlaces a otras páginas/sitios y pies de página.

**Paso 2:** Utiliza una [plantilla HTML!](https://nicepage.com/html-templates). Pega el texto que has escrito según corresponda. También puedes crear opcionalmente una hoja de estilos .CSS para tu sitio web.

**Paso 3:** Guarda tu directorio. Todas las páginas .html e imágenes deben estar en la misma carpeta.

## Configurar un nodo [node]

Descarga e instala IPFS desde el [sitio web oficial](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inicializar IPFS:

Si utilizas la aplicación de escritorio, no tendrás que inicializarlo.

Utilizando una terminal o símbolo del sistema, ejecuta el comando: ipfs init

### **Añadir la carpeta del sitio a IPFS**:

Selecciona la carpeta con los archivos de tu sitio web y navega hasta la opción Añadir carpeta.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Si utilizas la terminal, ejecuta el comando: ipfs add -r folder_name para añadir toda la carpeta recursivamente a IPFS.

### Fijar el sitio en IPFS:

Una vez que los archivos de tu sitio web se hayan añadido a IPFS, debes **fijarlos** para garantizar que permanezcan disponibles en la red.

–

Si utilizas la terminal, ejecuta el comando: Si utilizas la terminal, ejecuta el comando: ipfs pin add **hash**

**hash** = CID de la carpeta que añadiste en el paso anterior.

Como alternativa, también puedes fijar directorios utilizando servicios como [Pinata](https://pinata.cloud/) o [Dolpin](https://dolpin.io/)

¡Ahorra mucho tiempo!

–

### Acceder a tu sitio web en IPFS:

Tu sitio web ahora está publicado en IPFS y se puede acceder a él utilizando el hash de la carpeta. Para acceder a tu sitio web, puedes visitar https://ipfs.io/ipfs/**hash**

**hash** = CID de la carpeta.

En nuestro caso, el CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

El Sistema de Nombres Interplanetario (IPNS) te permite actualizar los CID de IPFS asociados a tu sitio web y seguir sirviendo un enlace estático. Se proporciona como una clave.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


En el menú de configuración de la carpeta de tu sitio en la aplicación de escritorio IPFS, selecciona Publicar en IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Clave: «k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n»

También se puede utilizar para ver nuestro sitio mediante una puerta de enlace: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Enlace DNS

El sitio se ha creado; ahora necesitamos una forma de dirigir una URL al contenido.

Si ya posees una dirección web, puedes añadir un nuevo registro utilizando el registro TXT _dnslink(tu dominio). Dependiendo del proveedor, puede completarse automáticamente.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Tardará un tiempo en propagarse por la red antes de que puedas verlo.

*¡Felicidades! Ahora tienes un sitio web resistente a la censura.*

____

**Recursos**

[Documentación de IPFS](https://docs.ipfs.tech/)

[Documentación de IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentación de enlaces DNS](https://dnslink.io/#introduction)
