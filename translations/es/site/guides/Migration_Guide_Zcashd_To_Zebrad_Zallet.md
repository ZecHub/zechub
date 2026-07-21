# Guía de migración: de zcashd a Zebrad/Zallet

El ecosistema de Zcash está evolucionando. El nodo completo tradicional Zcashd, mantenido por *Electric Coin Company (ECC)* / *Zodl*, está siendo reemplazado gradualmente por Zebra y Zallet.

- Zebra es una implementación moderna en Rust del protocolo Zcash desarrollada por la Zcash Foundation
- Zallet es una billetera ligera creada para interactuar sin problemas con nodos Zebra desarrollados por Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Esta guía te acompaña en la migración de **Zcashd** a **Zebrad** y **Zallet**, incluyendo la configuración, la importación de la billetera y la resolución de problemas comunes de migración.

---

## El proyecto Zcash ha anunciado formalmente que zcashd quedará obsoleto en 2025.

**Estado de obsolescencia y lo que significa**

- El proyecto Zcash ha anunciado formalmente que zcashd quedará obsoleto en 2025.
- Los nodos completos se están migrando a Zebrad, una implementación en Rust, mientras que Zallet está destinado a suceder al componente de billetera de zcashd. 
- En respuesta, el proyecto Zebra sigue un hito de "Zcashd Deprecation" para garantizar compatibilidad, migración de RPC y soporte del ecosistema.
- Para muchos métodos RPC, Zebrad/Zallet buscarán ser reemplazos directos (emulando o igualando el comportamiento). Otros cambiarán o podrían no ser compatibles.

**Por qué migrar, más allá de la obsolescencia**

Incluso dejando de lado la obsolescencia, hay razones de peso para migrar:
- Seguridad y robustez: la seguridad de memoria de Rust y sus herramientas modernas reducen los riesgos de vulnerabilidades.
- Rendimiento y eficiencia: Zebrad está diseñado para el paralelismo, un uso más eficiente de los recursos y una sincronización más rápida.
- Arquitectura modular: separar la lógica del nodo (Zebrad) de la interfaz de la billetera (Zallet) ofrece límites más claros y mejores rutas de actualización.
- Compatibilidad futura del ecosistema: las herramientas, mejoras y el resto del ecosistema de Zcash apuntarán cada vez más a Zebrad/Zallet.
- Tranquilidad: evita quedarte ejecutando un componente obsoleto y sin soporte.

### Ahora veamos la guía de migración

**1. Haz una copia de seguridad de todo**
* Haz una copia de seguridad de tu wallet.dat (o de cualquier otro archivo de billetera / almacén de claves) de tu nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Guarda tu zcash.conf y cualquier configuración personalizada.
* Exporta una copia de cualquier script RPC o automatización que uses.
* Verifica que tus copias de seguridad sean válidas (por ejemplo, en otro entorno, intenta abrirlas o inspeccionarlas).
* Revisa de qué métodos JSON-RPC dependes actualmente.
* Compáralos con la tabla de compatibilidad prevista mantenida en el [sitio de soporte de Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Prepárate para cambios o métodos faltantes (algunos podrían requerir soluciones alternativas o adaptaciones).

**2. Requisitos del sistema y espacio en disco**
* Asegúrate de tener suficiente espacio en disco (la cadena de Zcash es grande). Al menos 10 GB de espacio libre en disco.
* Asegúrate de que tu máquina tenga red estable, CPU y RAM suficientes.
* Una conexión a internet 
* Si planeas compilar desde el código fuente, ten Rust y Cargo instalados.

**3. Instalar / configurar Zebrad**
Puedes descargar un binario precompilado o compilar desde el código fuente.
* La Zcash Foundation publica versiones y binarios de Zebra. Por ejemplo, puedes usar un script de instalación o descargar el binario adecuado para tu sistema operativo.

* Ten en cuenta que en las versiones recientes de Zebra, [el endpoint RPC ya no está habilitado por defecto en Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Opción A: instalar mediante binario precompilado**  
En **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Esto instala la última versión estable de zebrad.

**Opción B: compilar desde el código fuente**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Después de compilar, mueve el binario a tu path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configuración e inicio**  
Genera una configuración predeterminada:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Edita **zebrad.toml** según tus preferencias (dirección de escucha, puertos, directorio de estado, caché).

**Inicia el nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

El nodo comenzará a sincronizar desde el génesis; espera varias horas (o más) según el hardware y la red.

**5. Instalar / configurar Zallet (billetera)**

Zallet está diseñado para reemplazar la parte de billetera de zcashd.

Consulta la página de GitHub / lanzamientos de Zallet para obtener binarios.

**O compila desde el código fuente:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Inicia la GUI o CLI (según lo que proporcione tu instalación).
* Configúralo para conectarse a tu nodo local de Zebrad mediante el endpoint RPC o API.

**6. Importar tu billetera zcashd en Zallet**  
Mediante volcado de clave privada

En zcashd, exporta tus claves privadas:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* En Zallet, elige Importar claves o una opción similar.
* Indícale **zcashd_keys.txt**. 
* Zallet debería analizar e importar direcciones ZEC y las claves asociadas.

**Mediante frase semilla** (si aplica)

* Si tu billetera admite copia de seguridad con semilla, usa Restaurar desde frase semilla en Zallet.
* Esto solo funciona si tu billetera zcashd se derivó de una semilla (o si tienes conversión de semilla).

**Reescaneo y sincronización de la billetera**

* Una vez importadas las claves, Zallet activará un reescaneo de la cadena a través de Zebrad.
* Deja algo de tiempo para que Zallet reconstruya tu saldo y tu historial de transacciones.

**7. Verifica saldos y sincronización**

Una vez importado, Zallet se conectará a tu nodo Zebrad y volverá a escanear la blockchain.
Cuando se complete la sincronización, tus saldos y transacciones deberían aparecer exactamente igual que antes.

Puedes verificar el estado de sincronización de tu nodo ejecutando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

O revisar los registros.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Resolución de problemas**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problema</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Posible causa</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solución</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad no inicia</td>
        <td className="px-6 py-4">Puerto en uso o mala configuración</td>
        <td className="px-6 py-4">Revisa **zebrad.toml** y usa un puerto libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronización lenta</td>
        <td className="px-6 py-4">Congestión de red</td>
        <td className="px-6 py-4">Asegura una conexión a internet estable, reinicia Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Faltan transacciones en la billetera</td>
        <td className="px-6 py-4">Importación parcial de claves</td>
        <td className="px-6 py-4">Vuelve a importar las claves o reescanea en Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet no puede conectarse al nodo</td>
        <td className="px-6 py-4">El nodo no está en ejecución o el endpoint es incorrecto</td>
        <td className="px-6 py-4">Inicia Zebrad y verifica el puerto RPC correcto</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet se bloquea</td>
        <td className="px-6 py-4">Versión desactualizada</td>
        <td className="px-6 py-4">Actualiza a la última versión desde GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusión**

Migrar de zcashd a Zebrad y Zallet te brinda una experiencia Zcash más rápida, segura y moderna.
Con la seguridad basada en Rust, el diseño modular y mejores herramientas, esta configuración garantiza que tu nodo y tu billetera estén preparados para el futuro a medida que el ecosistema de Zcash sigue evolucionando.

Consejo: mantén las claves de tu billetera fuera de línea y haz copias de seguridad periódicas de tus datos de Zallet.
Visita [zebra.zfnd.org](https://zebra.zfnd.org) y [zallet.zfnd.org](https://zallet.zfnd.org) para obtener actualizaciones y soporte de la comunidad.
