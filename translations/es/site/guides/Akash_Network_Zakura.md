# Cómo ejecutar Zakura en la red Akash

Guía paso a paso para ejecutar un nodo completo de **Zakura** Zcash con la plantilla [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura es un nodo Zcash compatible con el consenso (bifurcado de Zebra), con sincronización más rápida, poda nativa e inicio desde una instantánea. Esta plantilla fija **`zakuracore/zakura:1.8.1`** (con el resumen criptográfico fijado; no uses `:latest` ni `1.1.1`).

### Qué obtienes

- P2P de Mainnet: contenedor **8233**, publicado globalmente (consulta la asignación de puertos más abajo)
- Estado podado persistente (64 GiB de forma predeterminada), con inicio desde una instantánea de Valar al primer arranque
- Prometheus **9999** y estado de salud **8080** (internos, sin URI pública)
- JSON-RPC **8232** interno para lightwalletd alojado en el mismo lugar; LWD escucha en el contenedor **9067** y se publica globalmente

Indicadores de funciones en el SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. La autenticación con cookies está desactivada cuando lightwalletd está activado, porque lightwalletd no puede leer archivos de cookies.

### Qué sitio usar (pagos)

El SDL es el mismo. Las dos interfaces web de Akash difieren en **cómo pagas**.

| Sitio | Pagos | Billetera |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Pago web tradicional (tarjeta / medios de pago fiduciarios que ofrece Console) | Cuenta de Console |
| [air.akash.network](https://air.akash.network) | Pagos nativos en la red de Akash (AKT / ACT) | **Keplr** |

Usa **Air** si quieres pagar con Keplr on-chain. Usa **Console** si quieres un proceso de pago web convencional. No esperes liquidación nativa de Keplr en Console.

### Implementar

**Pagos web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Pagos nativos de Akash con Keplr (Air)**

[Abrir esta plantilla en Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Abre el enlace correspondiente de arriba (Console o Air).
2. En Air, conecta **Keplr** y confirma que tienes AKT/ACT para el depósito y el alquiler. En Console, completa el pago web que presenta la interfaz.
3. Carga `zcash-zakura/deploy.yaml` si aún no está rellenado.
4. Deposita, acepta una oferta y espera a que se active el alquiler.
5. Los registros deberían mostrar la descarga de la instantánea (en el primer arranque) y después `zakurad start`.
6. Abre **Alquileres → URI**. Usa el host:puerto asignado por el proveedor, no 8233 ni 9067 en la IP pública.

### Cómo Akash publica los puertos

Los puertos SDL `port` / `as` (8233, 9067, 8232) son puertos de **contenedor**. Zakura sigue escuchando en 8233; lightwalletd, en 9067; y RPC, en 8232, para el sidecar de LWD (`zakura:8232`).

**No** son los puertos de la IP pública del proveedor.

**Valor predeterminado (esta plantilla):** no hay una IP dedicada. Cada exposición TCP de `global: true` se asigna a un **puerto alto aleatorio** en un host compartido del proveedor. Console/Air los muestran como URI del alquiler, por ejemplo:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Los pares se conectan a la URI **8233** (`provider.example:31482`). Las billeteras compactas usan la URI **9067** (TLS desactivado, salvo que configures TLS por tu cuenta). Configura `ZAKURA_NETWORK__EXTERNAL_ADDR` con la URI P2P asignada, no con `:8233`.

Las exposiciones **internas** (RPC `8232`, métricas `9999`, estado de salud `8080`) permanecen en la red de implementación. No hay URI pública.

Las **IP dedicadas** (`endpoints` / `kind: ip`) son un extra de pago y **no** están incluidas en esta plantilla. Pueden fijar una IP pública y, a veces, el puerto `as`. Añádelo solo si necesitas un `host:8233` estable.

### Archivo completo frente a podado

De forma predeterminada está **podado** (instantánea de ~11 GiB, disco de 64 GiB). Para conservar todo el historial, configura `SNAPSHOT_KIND=archive`, aumenta el disco a 350 GiB o más y configura `ZAKURA_STATE__STORAGE_MODE=archive`.

### Relacionado

- [Zebra en Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (historial completo, sin instantánea)
- [Thus Spoke Zakura en Akash](/guides/thus-spoke-zakura-akash) — panel de Regtest + aplicación (v0.4.1)
- Zakura Código fuente: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Instantáneas: [zakura.com/snapshots/](https://zakura.com/snapshots/)
