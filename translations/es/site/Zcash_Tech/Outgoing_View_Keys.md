<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Claves de visualización salientes [Outgoing Viewing Keys] (OVKs)

Una clave de visualización saliente (OVK) es un valor de 32 bytes que se utiliza únicamente para cifrar el texto cifrado *saliente* de una salida blindada [shielded output]. Permite a una parte recuperar el texto sin formato de la nota que se envió (dirección del destinatario, valor y memo) sin tener la capacidad de gastar fondos ni ver notas entrantes.

El destinatario siempre descifra la nota entrante con su propia clave de visualización entrante. La elección de la OVK no cambia lo que ve el destinatario. No existe una codificación estándar para una OVK sin procesar; simplemente son 32 bytes.

## En resumen

- Una OVK controla únicamente quién puede recuperar el texto sin formato saliente de un pago blindado [shielded payment].
- Las billeteras eligen entre tres políticas: **Remitente** (recuperación normal con la UFVK de la cuenta), **Personalizada** (recuperación con una clave que proporcionas) o **Descartar** (nadie puede recuperar el texto sin formato saliente desde la red).
- Incluso con Descartar o una OVK personalizada, un titular de UFVK todavía ve qué notas se gastaron y puede calcular el importe neto que salió de la cuenta.
- La única forma fiable de mantener un importe invisible para una UFVK concreta es garantizar que las notas nunca pertenecieron a esa cuenta (cuenta separada o billetera separada).
- Las tres políticas ya existen en `zcash_client_backend`; casi todas las billeteras actuales usan únicamente la política predeterminada de Remitente.

---

## Las tres políticas

Las billeteras creadas sobre `zcash_client_backend` seleccionan una `OvkPolicy` cuando construyen una transacción:

| Política | Textos cifrados salientes | Quién puede recuperar posteriormente el texto sin formato saliente |
|--------|----------------------|----------------------------------------------|
| **Remitente** (predeterminada) | Cifrados con la OVK normal de la cuenta | La Unified Full Viewing Key de la cuenta remitente |
| **Personalizada** | Cifrados con la(s) clave(s) que proporcionas | Quien posea la(s) clave(s) proporcionada(s) |
| **Descartar** | No se utiliza ninguna OVK (`ovk = ⊥`) | Nadie (ni siquiera el remitente) |

Un constructor práctico crea una política `Custom` a partir de un único valor de 32 bytes para que tanto la OVK externa como la interna sean la misma clave.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Consulta la documentación de [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) y [ZIP 310](https://zips.z.cash/zip-0310).

## Para qué sirve cada política

**Remitente** es el comportamiento habitual de una billetera. Después de que la transacción sea minada, cualquier persona que posea la UFVK de la cuenta puede descifrar los textos cifrados salientes y recuperar las direcciones de los destinatarios, los importes y los memos.

**Personalizada** te permite dar a un tercero (auditor, procesador de pagos, sistema de recibos o dispositivo separado) la capacidad de descifrar pagos salientes específicos sin darle la clave de visualización completa. También puedes usar una clave efímera que descartas después de la transacción, o usar claves diferentes para distintas contrapartes para que ninguna clave individual vea todos los pagos salientes.

**Descartar** significa que la billetera remitente no puede recuperar el texto sin formato saliente desde la red. Esto es útil cuando deseas minimizar lo que se puede recuperar si la UFVK se ve comprometida posteriormente, o cuando deliberadamente no deseas un registro on-chain que la OVK de la cuenta pueda abrir.

## Lo que todavía ve un titular de UFVK

Incluso cuando se usa Descartar o una OVK personalizada, un titular de la UFVK de la cuenta todavía puede:

- Detectar cuáles de las notas de la cuenta se gastaron (mediante anuladores).
- Conocer los valores de esas notas de entrada.
- Recuperar cualquier nota de cambio (están cifradas con la clave de visualización entrante interna, no con una OVK).
- Por lo tanto, calcular el importe neto que salió de la cuenta.

Lo que no es visible son las direcciones individuales de los destinatarios, la división del importe y los memos. La documentación de `WalletWrite` advierte que los datos sobre transacciones creadas con Descartar (o una OVK personalizada aleatoria) no se pueden recuperar a partir de datos de la red si se pierde el registro local.

## Mantener importes fuera de una UFVK concreta

`OvkPolicy` solo controla la recuperación del texto sin formato saliente. No oculta los gastos ni los importes netos de la propia UFVK de la cuenta.

La única forma fiable de evitar que un importe sea visible para una UFVK concreta es garantizar que las notas que llevaban ese importe nunca pertenecieron a la cuenta que controla esa UFVK:

1. **Cuentas ZIP-32 separadas** (misma semilla) — Crea un nuevo índice de cuenta, mueve fondos a ella y nunca exportes la UFVK de esa cuenta. La UFVK de la cuenta original solo ve la transferencia hacia la nueva cuenta.
2. **Billetera completamente separada** (semilla diferente) — Financia una billetera nueva, gasta desde ella y descarta la semilla o la UFVK. La billetera original solo registra la transferencia de financiación.
3. **Billeteras efímeras de un solo uso** — Igual que lo anterior, pero trata la billetera de gasto como desechable.

Una UFVK es por cuenta. Las notas que nunca estuvieron en esa cuenta nunca aparecen en su saldo ni en sus totales de salida.

## Cómo usan las billeteras las políticas hoy

Casi todas las billeteras de producción usan únicamente la política predeterminada de **Remitente**, por lo que el historial saliente completo se puede recuperar desde la UFVK. Las otras dos políticas existen en la biblioteca, pero rara vez se exponen en las interfaces de usuario.

Las posibles opciones futuras incluyen:

- Una opción por transacción que permita al usuario elegir Personalizada o Descartar para un único pago.
- Un modo permanente de Descartar (la restauración de la semilla mostraría entonces solo salidas netas).
- OVKs personalizadas para la divulgación selectiva de pagos individuales (más ligera que una divulgación de pago [ZIP 311](https://zips.z.cash/zip-0311) completa).
- El uso continuado de separación de cuentas o billeteras para un aislamiento más fuerte.

## Recursos

- [ZIP 310: Propiedades de seguridad de las claves de visualización Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Direcciones unificadas y claves de visualización unificadas](https://zips.z.cash/zip-0316)
- [ZIP 315: Mejores prácticas para implementaciones de billeteras](https://zips.z.cash/zip-0315)
- [OvkPolicy en zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Páginas relacionadas

- [Claves de visualización](/zcash-tech/viewing-keys)
- [Divulgaciones de pago](/zcash-tech/payment-disclosures)
- [Direcciones unificadas](/zcash-tech/unified-addresses)
- [Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see)
