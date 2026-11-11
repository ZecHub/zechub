# Guía de migración: De zcashd a Zebrad/Zallet

El nodo completo [full node] tradicional zcashd, mantenido por *Electric Coin Company (ECC)* / *Zodl*, ha sido sustituido por Zebra y Zallet. zcashd alcanzó su detención por final de soporte el 18 de julio de 2026 y ya no se ejecuta.

- Zebra es una implementación moderna en Rust del protocolo Zcash desarrollada por Zcash Foundation
- Zallet es una billetera [wallet] ligera diseñada para interactuar sin problemas con nodos Zebra desarrollados por Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Esta guía le acompaña durante la migración de **zcashd** a **Zebrad** y **Zallet**, incluida la configuración, la importación de la billetera y la solución de problemas comunes de migración.

---

## zcashd dejó de ejecutarse el 18 de julio de 2026

**Qué significa esto**

- zcashd alcanzó su detención por final de soporte el 18 de julio de 2026. No volverá a sincronizarse con la punta de la red [chain], y no puede enviar ni recibir fondos. Esto ya ha finalizado, no está previsto.
- Las dos funciones de zcashd ahora están separadas: **zebrad** es el nodo completo, y **Zallet** es la billetera.
- Zallet está en **beta**. Pueden producirse cambios incompatibles entre versiones, y algunos métodos JSON-RPC de zcashd aún no están implementados. Consulte la matriz de estado de métodos de [](https://zcash.github.io/zallet/) antes de depender de una llamada específica.
- Si aún posee fondos de **Sprout**, lea primero la advertencia del paso 6. Zallet no admite el pool Sprout, y la forma habitual de mover esos fondos requería un zcashd en ejecución.

**Por qué migrar: más allá de la descontinuación**

Incluso dejando de lado la descontinuación, existen razones convincentes para migrar:
- Seguridad y solidez: La seguridad de memoria y las herramientas [tooling] modernas de Rust reducen los riesgos de vulnerabilidades.
- Rendimiento y eficiencia: Zebrad está diseñado para el paralelismo, un uso más eficiente de recursos y una sincronización más rápida.
- Arquitectura modular: Separar la lógica del nodo (Zebrad) de la interfaz de usuario de la billetera (Zallet) ofrece límites más claros y mejores rutas de actualización.
- Compatibilidad futura con el ecosistema: Las herramientas, mejoras y el resto del ecosistema de Zcash se orientarán cada vez más a Zebrad/Zallet.
- Tranquilidad: Evite quedarse ejecutando un componente descontinuado y sin soporte.

### Ahora profundicemos en la guía de migración

**1. Haga una copia de seguridad de todo**
* Haga una copia de seguridad de su wallet.dat (o de cualquier otro archivo de billetera o almacén de claves) desde su nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Guarde su zcash.conf y cualquier configuración personalizada.
* Exporte una copia de los scripts RPC o automatizaciones que utilice.
* Verifique que sus copias de seguridad sean válidas (por ejemplo, intente abrirlas o inspeccionarlas en otro entorno).
* Revise de qué métodos JSON-RPC depende actualmente.
* Compare con la tabla de compatibilidad planificada mantenida en el sitio de soporte de [Zcash](https://z.cash/support/zcashd-deprecation/) 
* Prepárese para cambios o métodos faltantes (algunos pueden requerir soluciones alternativas o adaptaciones).

**2. Requisitos del sistema y espacio en disco**
* El espacio en disco es el requisito que la gente subestima. La cadena Zcash superó los **270 GB** en agosto de 2026, así que reserve al menos **300 GB** de espacio libre, en un SSD si puede.
* Asegúrese de que su equipo tenga una red, CPU y RAM estables.
* Una conexión a internet 
* Si planea compilar desde el código fuente, tenga Rust y Cargo instalados.

**3. Instale/configure Zebrad**
Puede descargar un binario precompilado o compilar desde el código fuente.
* Zcash Foundation publica versiones y binarios para Zebra. Por ejemplo, puede usar un script de instalación o descargar el binario adecuado para su sistema operativo.

* Tenga en cuenta que, en las versiones recientes de Zebra, [el endpoint RPC ya no está habilitado de forma predeterminada en Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opción A: Instalar mediante un binario precompilado**  
En **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Esto instala la versión estable más reciente de zebrad.

**Opción B: Compilar desde el código fuente**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Después de compilar, mueva el binario a su ruta:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuración e inicio**  
Genere una configuración predeterminada:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edite **zebrad.toml** según sus preferencias (dirección de escucha, puertos, directorio de estado, almacenamiento en caché).

**Inicie el nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

El nodo comenzará a sincronizarse desde el génesis; espere varias horas (o más), según el hardware y la red.

**5. Instale/configure Zallet (billetera)**

Zallet está diseñado para sustituir la parte de billetera de zcashd.

Consulte la página de Zallet GitHub / versiones para obtener binarios.

**O compile desde el código fuente:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Inicie la GUI o CLI (según lo que proporcione su instalación).
* Configúrela para conectarse a su nodo local Zebrad mediante un endpoint RPC o API.

**6. Importar su billetera zcashd a Zallet**

No necesita que zcashd esté en ejecución para esto. Zallet lee directamente el archivo `wallet.dat`, lo cual importa porque zcashd ya no puede iniciarse.

> **Conserve `wallet.dat`.** La migración informa de todo aquello que no puede representar en una billetera Zallet en lugar de importarlo, y ese material de claves existe entonces únicamente en `wallet.dat`. No lo elimine después de migrar.

Ejecute primero `zallet init-wallet-encryption`. Zallet cifra el material de claves para una identidad age, y esa identidad debe existir antes de importar cualquier clave.

Luego convierta su configuración y su billetera:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` solo está presente en compilaciones con la funcionalidad `zcashd-import`, y leer `wallet.dat` necesita la utilidad `db_dump` de Berkeley DB 6.2, la versión que utilizaba zcashd. Si tiene más de un archivo de billetera, ejecute el comando una vez por archivo y agregue `--allow-multiple-wallet-imports` en las ejecuciones posteriores; cada uno se convierte en su propio conjunto de cuentas. Sus `rpcuser` y `rpcpassword` no se transfieren, porque el JSON-RPC de Zallet usa autenticación mediante cookies de forma predeterminada; agregue credenciales con `zallet add-rpc-user` si las necesita.

**Qué se transfiere**

* Semillas mnemotécnicas y las claves derivadas de ellas, con las cuentas reconstruidas para coincidir con la billetera zcashd
* Claves de gasto [spending keys] Sapling importadas de forma independiente y claves transparentes [transparent keys]
* Entradas transparentes de solo visualización que incluyen su clave pública o script de canje
* Fechas de nacimiento de las cuentas, para que el escaneo de la red comience a la altura correcta

**Qué no se transfiere.** Estos elementos se informan con recuentos en lugar de importarse:

* **Claves de gasto Sprout y fondos.** Zallet no admite el pool Sprout. La ruta documentada consistía en mover los fondos Sprout usando zcashd antes de retirarlo, y eso ya no es posible. Si esto le afecta, pregunte en [Zcash I+D de Discord](https://discord.gg/xpzPR53xtU) o en el foro comunitario de [](https://forum.zcashcommunity.com/) antes de hacer cualquier otra cosa.
* Entradas de la libreta de direcciones
* Entradas de solo visualización almacenadas sin una clave pública o script de canje, y entradas con claves públicas sin comprimir
* Billeteras Regtest

**Hacer una copia de seguridad después.** Una mnemónica por sí sola no es una copia de seguridad completa, porque las claves importadas existen únicamente en la base de datos de la billetera. Conserve copias seguras de `wallet.db`, del archivo de identidad de cifrado age indicado por la opción `keystore.encryption_identity` y de su frase mnemónica, y conserve el `wallet.dat` original. Tenga en cuenta que `wallet.db` no está cifrado: contiene su historial de transacciones [transactions] y claves de visualización [viewing keys] sin cifrar, así que guarde la copia de seguridad en un lugar seguro.

**Reescaneo y sincronización de la billetera**

* Una vez importadas las claves, Zallet activará un reescaneo de la red mediante Zebrad.
* Permita algo de tiempo para que Zallet reconstruya su saldo e historial de transacciones.

**7. Verifique los saldos y la sincronización**

Una vez importado, Zallet se conectará a su nodo Zebrad y volverá a escanear la blockchain.
Cuando se complete la sincronización, sus saldos y transacciones deberían aparecer exactamente como antes.

Puede verificar el estado de sincronización de su nodo ejecutando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

O consulte los registros.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Solución de problemas**

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
        <td className="px-6 py-4">Zebrad no se inicia</td>
        <td className="px-6 py-4">Puerto en uso o configuración incorrecta</td>
        <td className="px-6 py-4">Revise **zebrad.toml** y use un puerto libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronización lenta</td>
        <td className="px-6 py-4">Congestión de red</td>
        <td className="px-6 py-4">Asegure una conexión a internet estable, reinicie Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">A la billetera le faltan transacciones</td>
        <td className="px-6 py-4">Importación parcial de claves</td>
        <td className="px-6 py-4">Vuelva a importar las claves o reescanee en Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet no puede conectarse al nodo</td>
        <td className="px-6 py-4">El nodo no está en ejecución o el endpoint es incorrecto</td>
        <td className="px-6 py-4">Inicie Zebrad y verifique el puerto RPC correcto</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet se bloquea</td>
        <td className="px-6 py-4">Compilación desactualizada</td>
        <td className="px-6 py-4">Actualice a la versión más reciente de GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusión**

Migrar de zcashd a Zebrad y Zallet le proporciona una experiencia Zcash más rápida, segura y moderna.
Con seguridad basada en Rust, diseño modular y mejores herramientas, esta configuración garantiza que su nodo y billetera estén preparados para el futuro a medida que el ecosistema Zcash siga evolucionando.

Consejo: Mantenga las claves de su billetera fuera de línea y haga copias de seguridad periódicas de sus datos Zallet.
Visite [zebra.zfnd.org](https://zebra.zfnd.org) para obtener Zebra, y [El libro de Zallet](https://zcash.github.io/zallet/) o el repositorio [Zallet](https://github.com/zcash/zallet) para Zallet. El capítulo [Migración desde zcashd](https://zcash.github.io/zallet/) de El libro de Zallet es la referencia autorizada para el paso 6.
