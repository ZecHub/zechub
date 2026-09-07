# Guía de migración: de zcashd a Zebrad/Zallet

El nodo completo tradicional zcashd, mantenido por *Electric Coin Company (ECC)* / *Zodl*, ha sido reemplazado por Zebra y Zallet. zcashd llegó a su detención de fin de soporte el 18 de julio de 2026 y ya no se ejecuta.

- Zebra es una implementación moderna en Rust del protocolo Zcash desarrollada por Zcash Foundation
- Zallet es una wallet ligera diseñada para conectarse sin problemas con nodos Zebra desarrollada por Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagrama: zcashd se divide en zebrad para las funciones de nodo y Zallet para las funciones de wallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Esta guía te acompaña en la migración de **Zcashd** a **Zebrad** y **Zallet**, incluida la configuración, la importación de la wallet y la resolución de problemas comunes de migración.

---

## zcashd dejó de ejecutarse el 18 de julio de 2026

**Qué significa esto**

- zcashd llegó a su detención de fin de soporte el 18 de julio de 2026. No volverá a sincronizarse con la punta de la cadena y no puede enviar ni recibir fondos. Esto ya ha terminado, no está previsto para el futuro.
- Las dos funciones de zcashd ahora están divididas: **zebrad** es el nodo completo y **Zallet** es la wallet.
- Zallet está en **beta**. Pueden producirse cambios incompatibles entre versiones y algunos métodos JSON-RPC de zcashd aún no están implementados. Consulta la [matriz de estado de métodos](https://zcash.github.io/zallet/) antes de depender de una llamada específica.
- Si aún tienes fondos de **Sprout**, lee primero la advertencia del paso 6. Zallet no admite el pool de Sprout, y la forma habitual de mover esos fondos requería un zcashd en ejecución.

**Por qué migrar: más allá de la deprecación**

Incluso dejando de lado la deprecación, hay razones convincentes para migrar:
- Seguridad y solidez: la seguridad de memoria de Rust y las herramientas modernas reducen los riesgos de vulnerabilidades.
- Rendimiento y eficiencia: Zebrad está diseñado para el paralelismo, un uso más eficiente de recursos y una sincronización más rápida.
- Arquitectura modular: separar la lógica del nodo (Zebrad) de la interfaz de la wallet (Zallet) ofrece límites más claros y mejores vías de actualización.
- Compatibilidad futura con el ecosistema: las herramientas, mejoras y el resto del ecosistema de Zcash se orientarán cada vez más a Zebrad/Zallet.
- Tranquilidad: evita quedarte usando un componente obsoleto y sin soporte.

### Ahora profundicemos en la guía de migración

**1. Haz una copia de seguridad de todo**
* Haz una copia de seguridad de tu wallet.dat (o cualquier otro archivo de wallet / almacén de claves) de tu nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Guarda tu zcash.conf y cualquier configuración personalizada.
* Exporta una copia de cualquier script RPC o automatización que uses.
* Verifica que tus copias de seguridad sean válidas (por ejemplo, en otro entorno, intenta abrirlas o inspeccionarlas).
* Revisa de qué métodos JSON-RPC dependes actualmente.
* Compara con la tabla de compatibilidad prevista que se mantiene en el [sitio de soporte de Zcash](https://z.cash/support/zcashd-deprecation/) 
* Prepárate para cambios o métodos faltantes (algunos podrían requerir soluciones alternativas o adaptaciones).

**2. Requisitos del sistema y espacio en disco**
* El espacio en disco es el requisito que la gente suele subestimar. La cadena de Zcash superó los **270 GB** en agosto de 2026, así que reserva al menos **300 GB** de espacio libre, en un SSD si puedes.
* Asegúrate de que tu equipo tenga red, CPU y RAM estables.
* Una conexión a internet 
* Si planeas compilar desde el código fuente, ten instalados Rust y Cargo.

**3. Instalar / configurar Zebrad**
Puedes descargar un binario precompilado o compilar desde el código fuente.
* Zcash Foundation publica versiones y binarios para Zebra. Por ejemplo, podrías usar un script de instalación o descargar el binario adecuado para tu sistema operativo.

* Ten en cuenta que, en las versiones recientes de Zebra, [el endpoint RPC ya no está habilitado por defecto en Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opción A: instalar mediante binario precompilado**  
En **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Esto instala la versión estable más reciente de zebrad.

**Opción B: compilar desde el código fuente**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Después de compilar, mueve el binario a tu ruta:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migración 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuración e inicio**  
Genera una configuración predeterminada:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migración2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Edita **zebrad.toml** según tus preferencias (dirección de escucha, puertos, directorio de estado, caché).

**Inicia el nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagen](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

El nodo comenzará a sincronizarse desde el génesis; espera varias horas (o más), dependiendo del hardware y la red.

**5. Instalar / configurar Zallet (wallet)**

Zallet está diseñado para reemplazar la parte de wallet de zcashd.

Consulta la página de GitHub / versiones de Zallet para obtener binarios.

**O compila desde el código fuente:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagen](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Inicia la GUI o CLI (según lo que proporcione tu instalación).
* Configúrala para conectarse a tu nodo Zebrad local mediante un endpoint RPC o API.

**6. Importar tu wallet de zcashd en Zallet**

No necesitas un zcashd en ejecución para esto. Zallet lee directamente el archivo `wallet.dat`, lo cual es importante porque zcashd ya no puede iniciarse.

> **Conserva `wallet.dat`.** La migración informa de todo lo que no puede representar en una wallet de Zallet en vez de importarlo, y ese material de claves entonces existe únicamente en `wallet.dat`. No lo elimines después de migrar.

Ejecuta primero `zallet init-wallet-encryption`. Zallet cifra el material de claves con una identidad age, y esa identidad debe existir antes de importar cualquier clave.

Luego convierte tu configuración y tu wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` solo está presente en compilaciones con la función `zcashd-import`, y leer `wallet.dat` requiere la utilidad `db_dump` de Berkeley DB 6.2, la versión que usaba zcashd. Si tienes más de un archivo de wallet, ejecuta el comando una vez por archivo y añade `--allow-multiple-wallet-imports` en las ejecuciones posteriores; cada uno se convierte en su propio conjunto de cuentas. Tu `rpcuser` y `rpcpassword` no se transfieren, porque el JSON-RPC de Zallet usa autenticación mediante cookie por defecto; añade credenciales con `zallet add-rpc-user` si las necesitas.

**Qué se transfiere**

* Semillas mnemónicas y las claves derivadas de ellas, con las cuentas reconstruidas para coincidir con la wallet de zcashd
* Claves de gasto Sapling independientes importadas y claves transparentes
* Entradas transparentes de solo visualización que incluyen su clave pública o script de canje
* Fechas de nacimiento de las cuentas, para que el escaneo de la cadena comience a la altura correcta

**Qué no se transfiere.** Estos elementos se informan con recuentos en vez de importarse:

* **Claves de gasto y fondos de Sprout.** Zallet no admite el pool de Sprout. La vía documentada era mover los fondos de Sprout usando zcashd antes de retirarlo, y eso ya no es posible. Si esto te afecta, pregunta en el [Discord de I+D de Zcash](https://discord.gg/xpzPR53xtU) o en el [foro de la comunidad](https://forum.zcashcommunity.com/) antes de hacer cualquier otra cosa.
* Entradas de la libreta de direcciones
* Entradas de solo visualización almacenadas sin una clave pública o script de canje, y entradas con claves públicas sin comprimir
* Wallets Regtest

**Hacer copias de seguridad después.** Una mnemónica por sí sola no es una copia de seguridad completa, porque las claves importadas existen únicamente en la base de datos de la wallet. Conserva copias seguras de `wallet.db`, el archivo de identidad de cifrado age nombrado por la opción `keystore.encryption_identity` y tu frase mnemónica, y conserva el `wallet.dat` original. Ten en cuenta que `wallet.db` no está cifrado por sí mismo: contiene tu historial de transacciones y claves de visualización sin cifrar, así que guarda la copia de seguridad en un lugar seguro.

**Reescaneo y sincronización de la wallet**

* Una vez importadas las claves, Zallet activará un reescaneo de la cadena mediante Zebrad.
* Da tiempo a Zallet para reconstruir tu saldo e historial de transacciones.

**7. Verificar saldos y sincronización**

Una vez importada, Zallet se conectará a tu nodo Zebrad y volverá a escanear la blockchain.
Cuando se complete la sincronización, tus saldos y transacciones deberían aparecer exactamente como antes.

Puedes verificar el estado de sincronización de tu nodo ejecutando:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagen](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

O consulta los registros.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![imagen](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
        <td className="px-6 py-4">Zebrad no se inicia</td>
        <td className="px-6 py-4">Puerto en uso o mala configuración</td>
        <td className="px-6 py-4">Revisa **zebrad.toml** y usa un puerto libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronización lenta</td>
        <td className="px-6 py-4">Congestión de red</td>
        <td className="px-6 py-4">Asegúrate de tener internet estable, reinicia Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Faltan transacciones en la wallet</td>
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
        <td className="px-6 py-4">Compilación desactualizada</td>
        <td className="px-6 py-4">Actualiza a la versión más reciente de GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusión**

Migrar de zcashd a Zebrad y Zallet te ofrece una experiencia de Zcash más rápida, segura y moderna.
Con la seguridad basada en Rust, el diseño modular y mejores herramientas, esta configuración garantiza que tu nodo y wallet estén preparados para el futuro a medida que el ecosistema de Zcash continúa evolucionando.

Consejo: mantén las claves de tu wallet sin conexión y haz copias de seguridad de tus datos de Zallet periódicamente.
Visita [zebra.zfnd.org](https://zebra.zfnd.org) para Zebra, y [The Zallet Book](https://zcash.github.io/zallet/) o el [repositorio de Zallet](https://github.com/zcash/zallet) para Zallet. El capítulo [Migración desde zcashd](https://zcash.github.io/zallet/) de The Zallet Book es la referencia autorizada para el paso 6.
