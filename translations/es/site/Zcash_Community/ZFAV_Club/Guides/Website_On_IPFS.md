<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Publicar un sitio web en IPFS 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Introducción a IPFS 

IPFS (InterPlanetary File System) es un protocolo y una red peer-to-peer diseñados para crear un método descentralizado de almacenar y compartir archivos. 

A diferencia del modelo tradicional cliente-servidor de internet, IPFS permite que los usuarios compartan archivos directamente entre sí, en lugar de depender de un servidor centralizado para almacenar y distribuir contenido. 

Los archivos en IPFS se direccionan mediante *content-addressing*, lo que significa que a cada archivo se le asigna un hash único o IDENTIFICADOR DE CONTENIDO (CID) según su contenido, y este hash se utiliza para recuperar el archivo de la red.

Cuando un usuario añade un archivo a IPFS, el archivo se divide en pequeñas partes llamadas bloques, y a cada bloque se le asigna un CID. Luego, estos bloques se almacenan en diferentes nodos de la red, para que el archivo pueda recuperarse fácilmente desde múltiples fuentes. 

Esto garantiza redundancia y tolerancia a fallos, al mismo tiempo que dificulta que un solo nodo se convierta en un punto único de fallo o control. 

Lee [Una introducción a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Creación de tu sitio 

Para este ejemplo vamos a crear un sitio web simple. 

[Sitio de ejemplo](https://squirrel.surf)


**Paso 1:** Si no estás familiarizado con el diseño web, escribe el contenido principal de tu sitio web, incluyendo el título, el cuerpo principal del texto, con enlaces a otras páginas/sitios y pies de página.

**Paso 2:** Usa una [plantilla HTML](https://nicepage.com/html-templates) Pega el texto que has escrito según corresponda. También es opcional crear una hoja de estilos .CSS para tu sitio web. 

**Paso 3:** Guarda tu directorio. Todas las páginas .html + imágenes deben estar en la misma carpeta. 



## Configuración de un nodo

Descarga e instala IPFS desde el [sitio web oficial](https://docs.ipfs.tech/install/ipfs-desktop/).



### Inicializar IPFS: 

Si estás usando la aplicación de escritorio, no tendrás que inicializarlo. 

Usando una terminal o símbolo del sistema, ejecuta el comando: <mark>ipfs init </mark>. 



**Añadir la carpeta del sitio a IPFS**: 

Selecciona la carpeta con los archivos de tu sitio web y navega hasta la opción Add Folder.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Si usas la terminal, ejecuta el comando: <mark>ipfs add -r "folder_name"</mark> para añadir toda la carpeta de forma recursiva a IPFS.


### Fijar el sitio en IPFS: 

Una vez que los archivos de tu sitio web se hayan añadido a IPFS, necesitas **pin**arlos para asegurar que sigan disponibles en la red.

--

Si usas la terminal, ejecuta el comando: Si usas la terminal, ejecuta el comando: <mark>ipfs pin add "hash"</mark> 

"hash" = CID de la carpeta que añadiste en el paso anterior.


Como alternativa, también puedes fijar directorios usando servicios como [Pinata](https://pinata.cloud) o [Dolpin](https://dolpin.io)

¡Ahorra mucho tiempo! 

--

### Accede a tu sitio web en IPFS: 

Tu sitio web ahora está publicado en IPFS y puede accederse usando el hash de la carpeta. Para acceder a tu sitio web, puedes visitar https://ipfs.io/ipfs/"hash" 

"hash" = CID de la carpeta.

En nuestro caso el CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) te permite actualizar los CID de IPFS asociados con tu sitio web y seguir sirviendo un enlace estático. Se proporciona como una clave. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

En el menú de configuración de la carpeta de tu sitio en la aplicación de escritorio de IPFS, selecciona Publish to IPNS.  

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Clave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

También puede usarse para ver nuestro sitio mediante una gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link 
 
El sitio ha sido creado, ahora necesitamos una forma de apuntar una URL al contenido. 

Si ya posees una dirección web, puedes añadir un nuevo registro usando el registro TXT "_dnslink(your domain)". Dependiendo del proveedor, puede que se complete automáticamente. 

![](https://i.ibb.co/MgRxBHj/example.png)

Tomará tiempo propagarse por la red antes de que puedas verlo. 

¡Felicidades! Has configurado un sitio web resistente a la censura. 


**Recursos**

[Documentación de IPFS](https://docs.ipfs.tech)

[Documentación de IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentación de DNS link](https://dnslink.io/#introduction)
