<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Publicar un sitio en IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## Introducción a IPFS

IPFS (InterPlanetary File System) es un protocolo y una red peer-to-peer diseñados para crear un método descentralizado de almacenar y compartir archivos.

A diferencia del modelo cliente-servidor tradicional de internet, IPFS permite a los usuarios compartir archivos directamente entre sí, en lugar de depender de un servidor centralizado para almacenar y distribuir contenido.

Los archivos en IPFS se direccionan mediante *direccionamiento por contenido*, lo que significa que a cada archivo se le asigna un hash único o IDENTIFICADOR DE CONTENIDO (CID) basado en su contenido, y este hash se utiliza para recuperar el archivo de la red.

Cuando un usuario agrega un archivo a IPFS, el archivo se divide en pequeñas piezas llamadas bloques, y a cada bloque se le asigna un CID. Luego, estos bloques se almacenan en diferentes nodos de la red, de modo que el archivo pueda recuperarse fácilmente desde múltiples fuentes.

Esto garantiza redundancia y tolerancia a fallos, al tiempo que dificulta que un solo nodo se convierta en un punto único de fallo o control.

**Lee: [Una introducción a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Crear tu sitio

Para este ejemplo estamos creando un sitio web simple.

[Sitio de ejemplo](https://squirrel.surf/)

**Paso 1:** Si no estás familiarizado con el diseño web, escribe el contenido principal de tu sitio web, incluyendo el título, el cuerpo principal del texto, con enlaces a otras páginas/sitios y pies de página.

**Paso 2:** Usa una [plantilla HTML](https://nicepage.com/html-templates)! Pega el texto que has escrito donde corresponda. También es opcional crear una hoja de estilos .CSS para tu sitio web.

**Paso 3:** Guarda tu directorio. Todas las páginas .html + imágenes deben estar en la misma carpeta.

## Configurar un nodo

Descarga e instala IPFS desde el [sitio web oficial](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inicializar IPFS:

Si estás usando la aplicación de escritorio, no tendrás que inicializarlo.

Usando una terminal o símbolo del sistema, ejecuta el comando: ipfs init

### **Agregar la carpeta del sitio a IPFS**:

Selecciona la carpeta con los archivos de tu sitio web y navega hasta la opción Add Folder.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Si usas la terminal, ejecuta el comando: ipfs add -r folder_name para agregar toda la carpeta de forma recursiva a IPFS.

### Fijar el sitio en IPFS:

Una vez que los archivos de tu sitio web se hayan agregado a IPFS, necesitas **fijarlos** para garantizar que permanezcan disponibles en la red.

–

Si usas la terminal, ejecuta el comando: Si usas la terminal, ejecuta el comando: ipfs pin add **hash**

**hash** = CID de la carpeta que agregaste en el paso anterior.

Como alternativa, también puedes fijar directorios usando servicios como [Pinata](https://pinata.cloud/) o [Dolpin](https://dolpin.io/)

¡Ahorra mucho tiempo!

–

### Accede a tu sitio web en IPFS:

Tu sitio web ya está publicado en IPFS y se puede acceder a él usando el hash de la carpeta. Para acceder a tu sitio web, puedes visitar https://ipfs.io/ipfs/**hash**

**hash** = CID de la carpeta.

En nuestro caso el CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) te permite actualizar los CID de IPFS asociados con tu sitio web y seguir sirviendo un enlace estático. Se proporciona como una clave.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


En el menú de configuración de la carpeta de tu sitio en la aplicación de escritorio de IPFS, selecciona Publish to IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Clave: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

También se puede usar para ver nuestro sitio a través de una puerta de enlace: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Enlace DNS

El sitio ha sido creado, ahora necesitamos una manera de apuntar una URL al contenido.

Si ya posees una dirección web, puedes agregar un nuevo registro usando el registro TXT _dnslink(your domain). Dependiendo del proveedor, puede que se complete automáticamente.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Tomará tiempo propagarse por la red antes de que puedas verlo.

*¡Felicidades! Ahora tienes un sitio web resistente a la censura.*

____

**Recursos**

[Documentación de IPFS](https://docs.ipfs.tech/)

[Documentación de IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentación de DNS link](https://dnslink.io/#introduction)
