![Tor logo](/content-images/_unavailable.svg)

# **Arti: El cliente Tor de próxima generación en Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** es la iniciativa del Proyecto Tor para crear un cliente **Tor** de próxima generación utilizando el lenguaje de programación **Rust**. Arti está diseñado para ser modular, integrable y listo para producción, proporcionando una implementación más segura y eficiente de los protocolos de anonimato de **Tor**. Con **Arti versión 1.4.0**, se han introducido varias actualizaciones importantes:

- Una **nueva interfaz RPC** para una interacción mejorada.
- Trabajo preparatorio para el **soporte de relay**.
- Mejoras en la **resistencia a denegaciones de servicio de onion services del lado del servicio**.

Esta versión continúa los esfuerzos del Proyecto Tor para ofrecer mayor seguridad, rendimiento y modularidad a los usuarios y desarrolladores de Tor.


---


## **Instalación del cliente Arti**

Sigue estos pasos para instalar y ejecutar **Arti** como un proxy SOCKS en tu sistema.

---

### **Paso 1: Configura un entorno de desarrollo de Rust**

Antes de poder compilar Arti desde el código fuente, necesitas tener instalada la última versión estable de **Rust**.

#### Para instalar Rust:

1. Visita el sitio web oficial de [Rust](https://www.rust-lang.org/).
2. Sigue las instrucciones de instalación para tu sistema operativo.
3. Verifica la instalación ejecutando:
   
   ```sh
   rustc --version
   ```

Esto confirmará que tienes instalada en tu sistema la última versión estable de Rust.

#### **Nota [Note] para usuarios de Windows**:
- Rust puede instalarse en Windows mediante [**rustup**](https://rustup.rs/), un instalador de cadena de herramientas [toolchain installer]. Asegúrate de haber configurado también un entorno de compilación compatible (podrías necesitar **Visual Studio Build Tools** en Windows).
  
---

### **Paso 2: Clona el repositorio de Arti**

Para obtener la versión más reciente del cliente Arti, deberás clonar el repositorio desde [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Pasos:
1. Abre tu terminal (Símbolo del sistema, PowerShell o Git Bash en Windows).
2. Ejecuta el siguiente comando para clonar el repositorio:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Navega al directorio *arti* recién creado:
   
   ```sh
   cd arti
   ```

Esto descargará el código fuente de Arti en tu máquina local.

---

### **Paso 3: Compila el binario de Arti**

Una vez que hayas clonado el repositorio, debes compilar Arti usando **Cargo**, que es el gestor de paquetes y herramienta de compilación de Rust.

#### Para compilar Arti:
1. En la terminal, ejecuta el siguiente comando:
   ```sh
   cargo build --release
   ```

Este comando compila el código de Arti y lo optimiza para producción (la opción *--release*). El binario se creará en el directorio *target/release*.

#### Ubicación del binario compilado:
- Después de compilarlo, el binario de Arti se ubicará en:  
  ```sh
  target/release/arti
  ```

Puedes ejecutar este binario directamente desde la terminal.

---

### **Paso 4: Ejecuta el proxy SOCKS de Arti**

Para usar Arti como un proxy SOCKS (que enruta tu tráfico de internet a través de la red Tor), debes iniciar el proxy.

#### Para iniciar el proxy SOCKS:
1. Ejecuta el siguiente comando:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Este comando inicia Arti como un **proxy SOCKS5** en el **puerto 9150**, que es el puerto predeterminado utilizado por Tor para el tráfico SOCKS.

---

### **Paso 5: Configura las aplicaciones para usar Arti**

Una vez que Arti se esté ejecutando como proxy SOCKS, debes configurar tus aplicaciones para que lo utilicen al enrutar tráfico a través de la red Tor.

#### Pasos:
1. En la configuración de tu aplicación (por ejemplo, navegador web o aplicación de terminal), busca la **configuración del proxy [proxy settings]**.
2. Configura el **proxy SOCKS5** como *localhost:9150*.

Esto enrutará todo el tráfico de tus aplicaciones a través de la **red Tor** utilizando Arti como intermediario.

---

## **Integración de Arti con la red Tor**

Aquí tienes un diagrama simplificado para ilustrar cómo funciona Arti junto con la red Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- La **Aplicación** se conecta al **proxy SOCKS de Arti** utilizando el protocolo **SOCKS5**.
- Arti se comunica entonces con la **red Tor**, asegurando que tu tráfico se anonimice al pasar por la red.

---

## **Repositorio de GitLab y contribución**

Si te interesa contribuir al desarrollo de **Arti**, puedes explorar el código y contribuir mediante **GitLab**.

- **Enlace del repositorio**: [Repositorio de Arti en GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Clona el repositorio**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Bifurcación y contribución**:
1. **Haz un fork** del repositorio en GitLab (requiere una cuenta de GitLab).
2. Vincula tu repositorio bifurcado con tu configuración local:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Sustituye *_name_* por tu nombre de usuario de GitLab.

3. **Envía los cambios** a tu fork:
   ```sh
   git push _name_ main
   ```

4. **Crea una solicitud de fusión (MR)** en GitLab:
   Navega a la sección de solicitudes de fusión en tu fork de GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Directrices para solicitudes de fusión**:
- **No rebasees ni aplastes commits durante la revisión**.
- Si es necesario, utiliza *fixup!* o *squash!* para aplastar commits automáticamente.
- Procura **añadir nuevos commits** en lugar de aplastarlos durante el ciclo de revisión.

---

### **Notas adicionales**:

- **Binarios precompilados**: Por el momento, **Arti** no proporciona binarios precompilados oficiales. Debes compilar el cliente desde el código fuente como se describe anteriormente.
- **Conocimiento de Rust**: Si contribuyes a Arti, ten en cuenta que la base de código sigue evolucionando y puede haber cambios o refactorizaciones a medida que se añadan nuevas funciones.

---



Si te interesa contribuir al proyecto, no dudes en revisar el código, bifurcar el repositorio y enviar una solicitud de fusión. Para obtener más información, actualizaciones y resolución de problemas, consulta el [Repositorio de Arti en GitLab](https://gitlab.torproject.org/tpo/core/arti). 

¡Disfruta tu experiencia con **Arti** y feliz hacking!

---
