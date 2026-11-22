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

IPFS almacena el contenido como bloques identificados mediante CID. Al añadir un archivo, este se almacena en tu nodo; no se copia automáticamente a otros nodos. Mantén en línea una copia accesible, o configura un anclaje remoto (remote pinning), para que otros lectores puedan recuperarlo. Consulta [persistencia de IPFS](https://docs.ipfs.tech/concepts/persistence/).

**Lee: [Una introducción a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Crear tu sitio

Para este ejemplo, estamos creando un sitio web sencillo.

[Sitio de ejemplo](https://squirrel.surf/)

**Paso 1:** Si no estás familiarizado con el diseño web, escribe el contenido principal de tu sitio web, incluido el título, el cuerpo principal del texto, enlaces a otras páginas/sitios y pies de página.

**Paso 2:** Utiliza una [plantilla HTML!](https://nicepage.com/html-templates). Pega el texto que has escrito según corresponda. También puedes crear opcionalmente una hoja de estilos .CSS para tu sitio web.

**Paso 3:** Coloca tu página de inicio en `index.html` en la raíz de la carpeta del sitio. Incluye sus imágenes y su CSS, usando rutas relativas como `style.css` para que también funcionen bajo una URL de gateway IPFS.

## Configurar un nodo [node]

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gestiona el nodo [node] por ti. Mantenlo en ejecución mientras compartes tu sitio.

Para la [vía de línea de comandos](https://docs.ipfs.tech/how-to/command-line-quick-start/), inicializa un nuevo repositorio una sola vez:

```sh
ipfs init
```

Luego inicia el nodo y deja esta terminal abierta:

```sh
ipfs daemon
```

Ejecuta los comandos restantes en una segunda terminal. No inicies un segundo daemon si IPFS Desktop ya gestiona este repositorio.

### **Añadir la carpeta del sitio a IPFS**:

En IPFS Desktop, selecciona la carpeta con los archivos de tu sitio web usando la opción Add Folder (Añadir carpeta).

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Para la ruta por CLI, ejecuta esto desde el directorio principal de la carpeta de tu sitio:

```sh
ipfs add -r folder_name
```

Reemplaza `folder_name` por el nombre de tu carpeta (pon entre comillas los nombres que contengan espacios). Guarda el CID de la última línea `added ... folder_name`: identifica todo el directorio, no solo `index.html`.

### Fijar el sitio en IPFS:

El comando `ipfs add` de la CLI fija (pin) localmente el contenido importado de forma predeterminada. Comprueba el pin de la carpeta con:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Reemplaza `YOUR_FOLDER_CID` con el CID del paso anterior; la salida debería decir `recursive`. Fijar [pinning] protege la copia de este nodo frente a la recolección de basura [garbage collection], pero no mantiene en línea un ordenador apagado. Para mantener la disponibilidad mientras tu nodo está desconectado, configura un [pinning remoto](https://docs.ipfs.tech/how-to/work-with-pinning-services/) y confirma que el servicio remoto ha terminado de fijar el contenido.

### Acceder a tu sitio web en IPFS:

Primero, comprueba tu sitio a través de la puerta de enlace (gateway) local en `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (usa el puerto de la puerta de enlace que indique tu daemon si es diferente). La barra final permite que los enlaces relativos se resuelvan dentro del directorio.

Una pasarela pública (public gateway) como `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` puede servirlo una vez que logre recuperar el contenido desde un nodo accesible. Que la vista previa local funcione no demuestra que el contenido esté disponible públicamente.

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

Para `example.com`, añade este registro DNS, reemplazando `YOUR_FOLDER_CID` con el CID de tu directorio:

| Tipo | Nombre | Valor |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Algunos proveedores de DNS añaden la zona automáticamente; en ese caso, introduce solo `_dnslink`. Si usas el nombre IPNS indicado arriba, el valor puede ser `dnslink=/ipns/YOUR_IPNS_NAME`. Consulta [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Después de la propagación de DNS, prueba `https://ipfs.io/ipns/example.com/`. Para servir el sitio directamente en `https://example.com/` también se necesita un gateway compatible con DNSLink y una configuración HTTPS; el registro TXT por sí solo no los configura. Sigue la [guía de dominio personalizado (custom-domain guide)](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*¡Felicidades! Ahora tienes un sitio web resistente a la censura.*

____

**Recursos**

[Documentación de IPFS](https://docs.ipfs.tech/)

[Documentación de IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentación de enlaces DNS](https://dnslink.io/#introduction)
