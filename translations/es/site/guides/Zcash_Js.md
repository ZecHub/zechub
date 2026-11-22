# Guía del desarrollador [Developer Guide] de Zcash JS

**zcash.js** (`@zcashlabs/zcash.js`) es un SDK [SDK] experimental de TypeScript/JavaScript lanzado por Zcash Labs el 26 de octubre de 2026. Permite a los desarrolladores [developers] crear billeteras [wallets], clientes ligeros [light clients], paneles [dashboards] y aplicaciones que interactúan con la red [network] Zcash desde Node.js y el navegador.

> **Estado [Status]**: Experimental (v0.1.1). Actualmente, las billeteras Node persistentes requieren Linux + `flock`. El envío y la recepción completos en navegadores activos, así como la migración histórica de la base de datos de billeteras, aún no están totalmente cualificados. Consulte siempre la documentación oficial antes de usarlo en producción.

## Lo que proporciona el SDK

- `createPublicClient` — consultas JSON-RPC sin estado y observación de transacciones [transactions]
- `createLightClient` — consultas y flujos de lightwallet (gRPC nativo en Node, gRPC-Web en el navegador)
- `createWalletClient` — cuentas locales, escaneo, propuestas, firma, envío y recuperación de pagos [payments] registrados
- Importes exactos de `bigint`, validación de red, herramientas de visualización/direcciones [addresses] y utilidades PCZT
- Motor de billetera base incluido, workers y activos locales de pruebas Sapling (no se requiere una instalación independiente de Rust)

## Instalación

Use **Node.js 22.23.4** (la versión fijada por el paquete).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Prefiera TypeScript con ESM (`"type": "module"` en `package.json`).
- Las aplicaciones de navegador funcionan mediante un empaquetador ESM moderno. El empaquetador emitirá activos WASM, worker y de pruebas de carga diferida; estos deben implementarse junto con su aplicación.

## Primera consulta de la red (sin billetera)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Omitir la opción `network` establece por defecto mainnet (proporcione un endpoint coincidente).
- También hay disponible un `createPublicClient` para uso exclusivo de JSON-RPC.

## Abrir una billetera

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Opciones de almacenamiento

| Entorno     | Opción de almacenamiento                              |
|-------------|-------------------------------------------------------|
| Node (duradero) | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Navegador   | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Desechable  | `{ kind: 'memory' }`                                |

**Valores predeterminados importantes** (a partir de v0.1.1):

- El gasto y el cambio son solo de Ironwood de forma predeterminada
- Regla de tarifa [fee]: ZIP-317
- Confirmaciones: 3 de confianza / 3 sin confianza
- Llame siempre a `wallet.sync()` antes de proponer un pago

## Flujo de trabajo de billetera de alto nivel

1. Cree o importe una cuenta mnemónica y adjunte un firmante
2. Llame a `wallet.sync()`
3. Solicite una dirección de recepción (prefiera Unified / Ironwood)
4. Cree una propuesta → revísela → llame a `wallet.send()`
5. Espere la confirmación o use operaciones registradas para la recuperación después de un reinicio

La aplicación es propietaria de los bytes mnemónicos. Bórrelos de la memoria cuando ya no sean necesarios. Presente siempre una interfaz de aprobación clara que muestre cada destinatario, importe, tarifa, pool y vencimiento.

Consulte el recorrido oficial de [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) para ver un ejemplo completo y funcional.

## Notas sobre la plataforma y limitaciones actuales

| Capacidad             | Node                              | Navegador                        |
|-----------------------|-----------------------------------|----------------------------------|
| Paquete               | Node 22.23.4 + ESM                | Empaquetador ESM moderno + WebAssembly |
| Consultas ligeras     | gRPC nativo                       | gRPC-Web + CORS                  |
| Almacenamiento duradero | Linux + `flock` únicamente        | OPFS (contexto seguro)          |
| Almacenamiento desechable | memoria                        | memoria                          |

Limitaciones adicionales:

- El almacenamiento persistente de Node actualmente es solo para Linux
- Aún no hay una bóveda de secretos administrada, servicio de pruebas remoto ni integración con firmantes de hardware
- El almacenamiento **no** se anuncia como cifrado [encrypted] en reposo
- No abra el mismo almacenamiento de billetera desde varios procesos o pestañas del navegador simultáneamente
- Cierre siempre la billetera correctamente con `await wallet.close()`

## Próximos pasos

- Instalación oficial y primera solicitud: [Instalación](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Abrir y configurar una billetera: [Abrir una billetera](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Flujo de trabajo completo: [Recorrido de Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Referencia de la API: [Referencia de la API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Límites de la plataforma: [Configuración de Node y navegador](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Recursos oficiales

- Libro para desarrolladores: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repositorio de GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Paquete npm: `@zcashlabs/zcash.js`


---

*Esta guía se basa en `@zcashlabs/zcash.js@0.1.1` (octubre de 2026). El SDK está en desarrollo activo; consulte siempre la documentación oficial para conocer la API y las limitaciones más recientes.*
