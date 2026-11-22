# Así habló Zakura en Akash (Regtest)

Ejecuta la pila **Thus Spoke Zakura v0.4.1** en Akash: Zakura Regtest, lightwalletd y el **panel / API HTTP** de la billetera. Las monedas de prueba no tienen valor. No envíes ZEC de la red principal aquí.

Plantilla: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Proyecto upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) etiqueta **v0.4.1**

### Imágenes

| Servicio | Imagen |
| --- | --- |
| Panel + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (incluido en el lanzador 0.4.1) |

### Autoinicialización

Al iniciarse por primera vez, el contenedor `app` ejecuta `ths-server init` en su volumen persistente y, luego, `ths-server serve`. Serve vuelve a intentarlo hasta que Zakura JSON-RPC y lightwalletd estén disponibles. No se ejecuta `ths` en el proveedor; el SDL es el entorno de ejecución.

### Cómo Akash publica los puertos

Los puertos SDL `port` / `as` son puertos del **contenedor**. La aplicación escucha en **8080** (`THS_LISTEN`); lightwalletd en **9067**; RPC de Zakura en **18232** y P2P en **18233**. Dentro del despliegue, los servicios ya usan esos puertos (`http://zakura:18232`, `http://lightwalletd:9067`).

**No** son los puertos de la IP pública del proveedor.

**Predeterminado (esta plantilla):** sin IP dedicada.

| Servicio | Puerto de escucha del contenedor | SDL `as` | Cómo aparece en el lease |
| --- | --- | --- | --- |
| `app` (panel + API HTTP) | 8080 | 80 (HTTP) | Nombre de host de ingreso, a menudo en 80/443 — **abre este URI en un navegador** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| RPC de `zakura` | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| P2P de `zakura` | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Cuando el lease esté listo, **Leases → URIs** es la fuente de información definitiva. Abre el URI **`app`** para el panel (la misma interfaz de usuario que `ths` abre localmente). Configura los clientes ligeros para que usen el URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). No escribas `:8080`, `:80` ni `:9067` en la IP del proveedor, salvo que un lease con IP dedicada haya hecho públicos esos puertos.

Las **IP dedicadas** (`endpoints` / `kind: ip`) son un extra de pago y **no** están incluidas en esta plantilla. Pueden asignar una IP pública fija y, en ocasiones, el puerto `as`. Déjalas desactivadas a menos que las necesites.

### Qué sitio usar (pagos)

El SDL es el mismo. Las dos interfaces web de Akash difieren en **cómo se paga**.

| Sitio | Pagos | Billetera |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Pago web tradicional (tarjeta / medios de pago fiat que ofrece Console) | Cuenta de Console |
| [air.akash.network](https://air.akash.network) | Pagos nativos en la red Akash (AKT / ACT) | **Keplr** |

Usa **Air** si quieres pagar con Keplr on-chain. Usa **Console** si prefieres un proceso de pago web convencional.

### Despliegue

**Pagos web (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Pagos nativos de Akash con Keplr (Air)**

[Abrir esta plantilla en Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Crea el despliegue a partir de la plantilla, acepta una oferta, espera hasta que los registros de `app` muestren que `ths-server serve` sigue activo y, luego, abre el **URI `app`** del panel.

### Relacionado

- [Zakura en Akash](/guides/akash-network-zakura) — Nodo validador de la red principal o de prueba
- [Zebra en Akash](/guides/akash-network-zebra)
- Libro: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
