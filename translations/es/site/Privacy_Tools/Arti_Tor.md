![Logotipo de Tor](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: El cliente Tor de nueva generación en Rust**
![Logotipo de Atri](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** es la iniciativa del Tor Project para crear un cliente **Tor** de nueva generación utilizando el lenguaje de programación **Rust**. Arti está diseñado para ser modular, integrable y listo para producción, ofreciendo una implementación más segura y eficiente de los protocolos de anonimato de **Tor**. Con **Arti versión 1.4.0**, se han introducido varias actualizaciones significativas:

- Una **nueva interfaz RPC** para una interacción mejorada.
- Trabajo preparatorio para el **soporte de relay**.
- Mejoras en la **resistencia del servicio onion del lado del servicio frente a ataques de denegación de servicio**.

Esta versión continúa los esfuerzos del Tor Project por ofrecer mejor seguridad, rendimiento y modularidad para los usuarios y desarrolladores de Tor.


---


## **Instalación del cliente Arti**

Sigue estos pasos para instalar y ejecutar **Arti** como un proxy SOCKS en tu sistema.

---

### **Paso 1: Configurar un entorno de desarrollo Rust**

Antes de poder compilar Arti desde el código fuente, necesitas tener instalada la última versión estable de **Rust**.

#### Para instalar Rust:

1. Visita el [sitio web oficial de Rust](https://www.rust-lang.org/).
2. Sigue las instrucciones de instalación para tu sistema operativo.
3. Verifica la instalación ejecutando:
   
   ```sh
   rustc --version
   ```

Esto confirmará que tienes instalada en tu sistema la última versión estable de Rust.

#### **Nota para usuarios de Windows**:
- Rust puede instalarse en Windows mediante [**Rustup**](https://rustup.rs/), una herramienta de instalación del toolchain. Asegúrate también de haber configurado un entorno de compilación compatible (puede que necesites **Visual Studio Build Tools** en Windows).
  
---

### **Paso 2: Clonar el repositorio de Arti**

Para obtener la última versión del cliente Arti, necesitarás clonar el repositorio desde [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

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

### **Paso 3: Compilar el binario de Arti**

Una vez que hayas clonado el repositorio, necesitas compilar Arti usando **Cargo**, que es el gestor de paquetes y herramienta de compilación de Rust.

#### Para compilar Arti:
1. En la terminal, ejecuta el siguiente comando:
   ```sh
   cargo build --release
   ```

Este comando compila el código de Arti y lo optimiza para producción (la bandera *--release*). El binario se creará en el directorio *target/release*.

#### Ubicación del binario compilado:
- Después de compilar, el binario de Arti estará ubicado en:  
  ```sh
  target/release/arti
  ```

Puedes ejecutar este binario directamente desde la terminal.

---

### **Paso 4: Ejecutar el proxy SOCKS de Arti**

Para usar Arti como proxy SOCKS (que dirigirá tu tráfico de internet a través de la red Tor), necesitas iniciar el proxy.

#### Para iniciar el proxy SOCKS:
1. Ejecuta el siguiente comando:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Este comando inicia Arti como un **proxy SOCKS5** en el **puerto 9150**, que es el puerto predeterminado que usa Tor para el tráfico SOCKS.

---

### **Paso 5: Configurar las aplicaciones para usar Arti**

Una vez que Arti esté ejecutándose como proxy SOCKS, necesitas configurar tus aplicaciones para que lo usen al enrutar el tráfico a través de la red Tor.

#### Pasos:
1. En la configuración de tu aplicación (por ejemplo, navegador web, aplicación de terminal), busca la **configuración de proxy**.
2. Establece el **proxy SOCKS5** en *localhost:9150*.

Esto dirigirá todo el tráfico de tus aplicaciones a través de la **red Tor** usando Arti como intermediario.

---

## **Integración de Arti con la red Tor**

Aquí tienes un diagrama simplificado para ilustrar cómo funciona Arti en conjunto con la red Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- La **Aplicación** se conecta al **proxy SOCKS de Arti** usando el protocolo **SOCKS5**.
- Luego, Arti se comunica con la **red Tor**, asegurando que tu tráfico quede anonimizado mientras pasa por la red.

---

## **Repositorio de GitLab y contribución**

Si te interesa contribuir al desarrollo de **Arti**, puedes explorar el código y contribuir a través de **GitLab**.

- **Enlace al repositorio**: [Repositorio de Arti en GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Clonar el repositorio**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Hacer un fork y contribuir**:
1. **Haz un fork** del repositorio en GitLab (requiere una cuenta de GitLab).
2. Vincula tu repositorio bifurcado con tu configuración local:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Sustituye *_name_* por tu nombre de usuario de GitLab.

3. **Haz push de los cambios** a tu fork:
   ```sh
   git push _name_ main
   ```

4. **Crea una Merge Request (MR)** en GitLab:
   Navega a la sección de Merge Request en tu fork de GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Directrices para Merge Request**:
- **No hagas rebase ni squash de commits durante la revisión**.
- Si es necesario, usa *fixup!* o *squash!* para hacer auto-squashing de commits.
- Procura **agregar nuevos commits** en lugar de hacer squash durante el ciclo de revisión.

---

### **Notas adicionales**:

- **Binarios precompilados**: Por ahora, **Arti** no proporciona binarios oficiales precompilados. Debes compilar el cliente desde el código fuente como se describe arriba.
- **Conocimientos de Rust**: Si estás contribuyendo a Arti, ten en cuenta que la base de código sigue evolucionando y puede haber cambios o refactorizaciones a medida que se añaden nuevas funciones.

---



Si te interesa contribuir al proyecto, no dudes en revisar el código, hacer un fork del repositorio y enviar una Merge Request. Para más información, actualizaciones y resolución de problemas, consulta el [Repositorio de Arti en GitLab](https://gitlab.torproject.org/tpo/core/arti). 

¡Disfruta tu experiencia con **Arti** y feliz hacking!

---
