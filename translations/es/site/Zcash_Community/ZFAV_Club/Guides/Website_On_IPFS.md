<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Publicar un sitio web en IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Introducción a IPFS 

IPFS (InterPlanetary File System) es un protocolo y una red entre pares diseñados para crear un método descentralizado [decentralized] de almacenamiento y uso compartido de archivos. 

A diferencia del modelo tradicional cliente-servidor de internet, IPFS permite a los usuarios compartir archivos directamente entre sí, en lugar de depender de un servidor centralizado para almacenar y distribuir contenido. 

Los archivos en IPFS se direccionan mediante el *direccionamiento por contenido [content-addressing]*, lo que significa que a cada archivo se le asigna un hash único o IDENTIFICADOR DE CONTENIDO (CID) según su contenido, y este hash se utiliza para recuperar el archivo de la red.

IPFS almacena el contenido como bloques [blocks] identificados mediante CID. Al añadir un archivo, este se almacena en tu nodo [node]; no se copia automáticamente a otros nodos. Mantén en línea una copia accesible, o configura un anclaje remoto [remote pinning], para que otros lectores puedan recuperarlo. Consulta [persistencia de IPFS](https://docs.ipfs.tech/concepts/persistence/).

Lee [Una introducción a IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Creación de tu sitio 

Para este ejemplo, estamos creando un sitio web sencillo. 

[Sitio de ejemplo](https://squirrel.surf)


**Paso 1:** Si no estás familiarizado con el diseño web, escribe el contenido principal de tu sitio web, incluido el título, el cuerpo principal del texto, enlaces a otras páginas/sitios y pies de página.

**Paso 2:** Usa una [plantilla HTML!](https://nicepage.com/html-templates). Pega el texto que has escrito según corresponda. También puedes crear opcionalmente una hoja de estilos .CSS para tu sitio web. 

**Paso 3:** Coloca tu página de inicio en `index.html` en la raíz de la carpeta del sitio. Incluye sus imágenes y su CSS usando rutas relativas como `style.css`, para que también funcionen bajo una URL de gateway IPFS.

## Configuración de un nodo

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gestiona el nodo por ti. Mantenlo en ejecución mientras compartes tu sitio.

Para la [vía de línea de comandos](https://docs.ipfs.tech/how-to/command-line-quick-start/), inicializa un nuevo repositorio una sola vez:

```sh
ipfs init
```

Luego inicia el nodo y deja esta terminal abierta:

```sh
ipfs daemon
```

Ejecuta los comandos restantes en una segunda terminal. No inicies un segundo daemon si IPFS Desktop ya gestiona este repositorio.

**Añadir la carpeta del sitio a IPFS**: 

En IPFS Desktop, selecciona la carpeta con los archivos de tu sitio web usando la opción Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Para la ruta de la CLI, ejecuta esto desde el directorio principal de la carpeta de tu sitio:

```sh
ipfs add -r folder_name
```

Reemplaza `folder_name` por el nombre de tu carpeta (pon entre comillas los nombres que contengan espacios). Guarda el CID de la última línea `added ... folder_name`: identifica todo el directorio, no solo `index.html`.

### Fijar el sitio en IPFS: 

El comando `ipfs add` de la CLI fija [pin] localmente por defecto el contenido importado. Comprueba el pin de la carpeta con:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Sustituye `YOUR_FOLDER_CID` por el CID del paso anterior; la salida debería indicar `recursive`. El anclaje (pinning) protege la copia de este nodo frente a la recolección de basura (garbage collection), pero no mantiene en línea un ordenador apagado. Para mantener la disponibilidad mientras tu nodo está desconectado, configura un [anclaje remoto](https://docs.ipfs.tech/how-to/work-with-pinning-services/) y confirma que el servicio remoto ha terminado de anclar el contenido.

### Accede a tu sitio web en IPFS: 

Primero verifica tu sitio a través del gateway local en `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (usa el puerto del gateway que muestre tu daemon si es diferente). La barra final permite que los enlaces relativos se resuelvan dentro del directorio.

Una pasarela pública (public gateway) como `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` puede servirlo una vez que logre recuperar el contenido desde un nodo accesible. Una vista previa local exitosa no demuestra que esté disponible públicamente.

En nuestro caso, el CID = «QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3»


## IPNS 

Interplanetary Naming System (IPNS) te permite actualizar los CID de IPFS asociados con tu sitio web y seguir ofreciendo un enlace estático. Se proporciona como una clave. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

En el menú de configuración de la carpeta de tu sitio en la aplicación de escritorio de IPFS, selecciona Publicar en IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Clave: «k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n»

También se puede utilizar para ver nuestro sitio mediante una puerta de enlace: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Enlace DNS 
 
El sitio se ha creado; ahora necesitamos una forma de dirigir una URL al contenido. 

Para `example.com`, añade este registro DNS y reemplaza `YOUR_FOLDER_CID` por el CID de tu directorio:

| Tipo | Nombre | Valor |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Algunos proveedores de DNS añaden la zona automáticamente; en ese caso, introduce solo `_dnslink`. Si usas el nombre IPNS indicado arriba, el valor puede ser `dnslink=/ipns/YOUR_IPNS_NAME`. Consulta [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Tras la propagación del DNS, prueba `https://ipfs.io/ipns/example.com/`. Servir el sitio directamente en `https://example.com/` también requiere un gateway compatible con DNSLink y una configuración HTTPS; el registro TXT por sí solo no configura esos elementos. Sigue la [guía de dominio personalizado (custom-domain guide)](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

¡Felicidades! Has configurado un sitio web resistente a la censura. 


**Recursos**

[Documentación de IPFS](https://docs.ipfs.tech)

[Documentación de IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentación de enlaces DNS](https://dnslink.io/#introduction)
