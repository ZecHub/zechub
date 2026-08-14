---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pools de valor de Zcash 

## TL;DR

- Zcash tiene actualmente **5 pools de valor**: Sprout (heredado), Sapling, Orchard (solo gasto), Ironwood y Transparent.
- **Ironwood** es el pool blindado principal actual, activo desde la actualización NU6.3 el 28 de julio de 2026.
- **Orchard** ahora es **solo gasto**: ningún valor nuevo puede entrar en él, y los fondos existentes migran hacia Ironwood.
- **Sapling** (z-addresses que comienzan con `zs`) sigue siendo ampliamente compatible y continúa protegiendo una cantidad significativa de ZEC blindado.
- Las direcciones **Transparent** (t...) no ofrecen privacidad de transacción y funcionan de forma similar a Bitcoin.
- **Sprout** es un pool blindado heredado que ha sido retirado del uso activo.
- La migración de Orchard a Ironwood está **en curso** y es auditada públicamente por el turnstile.
- Para las garantías de privacidad más sólidas, los usuarios deben seguir prefiriendo las transacciones **de blindado a blindado (z → z)** siempre que sea posible.


<br/>

## Entendiendo los pools de valor de Zcash

Zcash separa los fondos en sistemas de contabilidad distintos conocidos como pools de valor. Cada pool tiene sus propias reglas criptográficas y propiedades de privacidad, mientras que el protocolo rastrea el valor total que se mueve entre ellos.

Hoy, la red contiene cinco pools de valor principales:

- Transparent — Público y completamente visible on-chain.
- Sapling — El primer pool blindado moderno ampliamente adoptado, aún activo.
- Orchard — El anterior pool blindado principal, ahora solo gasto.
- Ironwood — El pool blindado principal actual, introducido por NU6.3.
- Sprout — El pool blindado original lanzado con Zcash en 2016.
  


A medida que Zcash evoluciona, pueden introducirse nuevos pools blindados para mejorar la seguridad, la privacidad, la usabilidad y la auditabilidad, manteniendo al mismo tiempo la compatibilidad con los fondos existentes.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig. 1: Un gráfico que muestra los 4 pools actuales a octubre de 2025

<br/>

## Los pools blindados 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood es el pool blindado principal actual. Se activó el 28 de julio de 2026 en el bloque 3,428,143 como parte de la actualización de red NU6.3, y es donde ahora reside el nuevo valor blindado.

Existe porque se encontró una vulnerabilidad en el sistema de pruebas de Orchard en mayo de 2026. No hay evidencia de que se haya explotado alguna vez, pero la falla significaba que no se podía demostrar que el suministro blindado fuera sólido solo con las pruebas. En lugar de parchearlo en el mismo lugar, la red creó un pool nuevo con un circuito corregido y movió el valor a través de un turnstile que cuenta públicamente cada moneda. Esa contabilidad es lo que restablece la garantía de que el suministro blindado está totalmente respaldado.

Ironwood reutiliza el modelo Action de Orchard y las pruebas Halo 2, por lo que se comporta igual en el día a día. Hay dos cosas nuevas: las transacciones usan el formato v6, y las notas de Ironwood son **recuperables cuánticamente** bajo [ZIP 2005](https://zips.z.cash/zip-2005), lo que significa que el registro on-chain de una moneda sigue siendo recuperable si una futura computadora cuántica rompe la criptografía actual. Eso es una vía de recuperación, no resistencia cuántica, y no se aplica a pools más antiguos.

No necesitas una dirección nueva. Las Unified Address agrupan varios receptores, y las wallets eligen el pool correcto por ti.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig. 2: Un gráfico que muestra el pool Orchard a octubre de 2025

<br/>

El pool blindado Orchard se activó el 31 de mayo de 2022 como parte de la actualización de red NU5. Orchard introdujo un nuevo protocolo blindado que eliminó la necesidad de una trusted setup y se convirtió en el pool blindado principal utilizado por las Unified Addresses (UA).

Orchard mejoró significativamente la usabilidad, la eficiencia y la privacidad al reducir la filtración de metadatos de transacción e introducir un modelo de transacción más flexible basado en Actions en lugar de entradas y salidas blindadas tradicionales.

Desde que la actualización Ironwood se activó el 28 de julio de 2026, **Orchard es solo gasto**. Ningún valor nuevo puede entrar en el pool. Los fondos que ya estaban allí aún pueden gastarse y están migrando hacia Ironwood a través del turnstile. Las wallets gestionan esto por ti, aunque la mayoría te da cierto control sobre el ritmo.

Si tienes fondos en Orchard, consulta [Ironwood](/zcash-tech/ironwood) para entender qué significa la migración en la práctica.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig. 3: Un gráfico que muestra el pool Sapling a octubre de 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) fue una actualización del protocolo Zcash introducida el 28 de octubre de 2018. Es una mejora importante con respecto a la versión anterior conocida como Sprout, que tenía algunas limitaciones en términos de privacidad, eficiencia y usabilidad. 

Algunas de las mejoras incluyen un mejor rendimiento para las direcciones blindadas, Viewing Keys mejoradas para permitir a los usuarios ver transacciones entrantes y salientes sin exponer las claves privadas del usuario, y claves independientes de Zero Knowledge para hardware wallet durante la firma de transacciones. 

Zcash Sapling permite a los usuarios realizar transacciones privadas en solo unos segundos en comparación con el mayor tiempo que tomaba en la serie Sprout. 

El blindaje de transacciones mejora la privacidad, haciendo imposible que terceros vinculen transacciones y determinen la cantidad de ZEC que se está transfiriendo. Sapling también mejora la usabilidad al reducir los requisitos computacionales para generar transacciones privadas, haciéndolas más accesibles para los usuarios.

Las direcciones de wallet Sapling comienzan con "zs" y esto puede observarse en todas las wallets blindadas de Zcash compatibles (YWallet, Zingo Wallet, Nighthawk, etc.) que tienen direcciones Sapling integradas. Zcash Sapling representa un avance significativo en tecnología en lo que respecta a la privacidad y la eficiencia de las transacciones, lo que convierte a Zcash en una criptomoneda práctica y eficaz para usuarios que valoran la privacidad y la seguridad.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig. 4: Un gráfico que muestra el pool Sprout a octubre de 2025

Sprout fue el primer protocolo de privacidad Zero Knowledge abierto y sin permisos que se lanzó. Fue lanzado el 28 de octubre de 2016.

Las direcciones Sprout se identifican por sus dos primeras letras, que siempre son "zc". Se le dio el nombre "Sprout" con el propósito principal de enfatizar que el software era joven, una blockchain en crecimiento con gran potencial para desarrollarse y abierta al desarrollo. 

Sprout se utilizó como una herramienta temprana para la [minería slow start de Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), lo que dio lugar a la distribución de ZEC y recompensas de bloque para los mineros. 

A medida que el ecosistema de Zcash continuó expandiéndose con un número creciente de transacciones blindadas, se observó que la serie Zcash Sprout se volvió limitada y menos eficiente en lo que respecta a la privacidad del usuario, la escalabilidad de las transacciones y el procesamiento. Esto llevó a la modificación de la red y a la actualización Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig. 5: Un gráfico que muestra el pool Transparent a octubre de 2025

<br/>

El pool Transparent de Zcash no está blindado y no es privado. Las direcciones de wallet Transparent en Zcash comienzan con la letra "t"; la privacidad es muy baja al usar este tipo de dirección para transacciones.

Las transacciones Transparent en Zcash son similares a las transacciones de Bitcoin, que admiten transacciones multifirma y hacen uso de direcciones públicas estándar.

Las direcciones Transparent de Zcash son utilizadas principalmente por exchanges centralizados para garantizar una alta transparencia y confirmación de red al enviar y recibir ZEC entre usuarios.

También es importante señalar que, aunque las direcciones blindadas de Zcash proporcionan alta privacidad durante las transacciones, también requieren más recursos computacionales para procesarlas. Por lo tanto, algunos usuarios pueden adoptar direcciones Transparent para transacciones que no requieren el mismo nivel de privacidad.

<br/>

## Práctica recomendada para transferencias entre pools

Cuando se trata de considerar un alto nivel de privacidad durante una transacción en la red Zcash, se recomienda seguir las prácticas a continuación;

Las transacciones que ocurren entre wallets de "z a z" en la blockchain de Zcash están mayormente blindadas y a veces se las llama transacciones privadas debido al alto nivel de privacidad generado. Esta suele ser la mejor y más recomendada forma de enviar y recibir $ZEC cuando se requiere privacidad. 

---

Cuando envías ZEC de una "Z-address" a una "T-address", esto simplemente implica una forma de transacción de desblindaje. En este tipo de transacción, el nivel de privacidad no siempre es alto, ya que parte de la información será visible en la blockchain debido al efecto de enviar ZEC a una dirección Transparent. La transacción de desblindaje no siempre se recomienda cuando se requiere alta privacidad. 

---

Transferir ZEC desde una dirección Transparent (T-address) a una Z-address se conoce simplemente como blindaje. En este tipo de transacción, el nivel de privacidad no siempre es tan alto como el de una transacción z-z, pero también se recomienda cuando se requiere privacidad. 

---

Enviar ZEC desde una dirección Transparent (T-address) a otra dirección Transparent (T-address) en la red Zcash (transacción T-T) es muy similar a una transacción de Bitcoin, y por eso las transacciones T-T en Zcash siempre se llaman transacciones públicas, porque los detalles de la transacción tanto del remitente como del receptor se vuelven visibles para el público, lo que hace que el nivel de privacidad sea muy bajo en ese tipo de transacción. 

La mayoría de los exchanges centralizados de criptomonedas utilizan direcciones Transparent ("T-address) cuando realizan transacciones en la blockchain de Zcash, pero este tipo de transacción (T-T) no tendrá ninguna propiedad privada.

<br/>

## La migración de Orchard a Ironwood

La migración está ocurriendo ahora. Orchard está cerrado a nuevos depósitos, y el valor que aún permanece allí se está moviendo a Ironwood, una transacción a la vez. Puedes ver los totales en [ironwood.live](https://ironwood.live/).

Lo que esto significa depende de dónde estén tus fondos:

1. **La nueva actividad blindada** entra en Ironwood automáticamente. No hay nada que hacer.
2. **Los fondos existentes en Orchard** necesitan migrar. Las wallets mantenidas hacen esto por ti, normalmente por etapas en lugar de hacerlo todo de una vez.
3. **Sapling no se ve afectado** y sigue aceptando fondos. Solo Orchard fue cerrado.
4. **El turnstile cuenta todo** lo que cruza entre pools, y eso es lo que demuestra que no se inventó ninguna moneda en el proceso.

> **Una advertencia de privacidad que vale la pena conocer.** El turnstile publica la *cantidad* que cruza entre pools, junto con la altura del bloque. El remitente y el receptor permanecen ocultos como siempre, pero una cantidad distintiva puede vincularse contigo. Por eso las wallets migran por etapas usando denominaciones estándar en lugar de mover tu saldo en un único bloque reconocible. Deja que tu wallet marque su propio ritmo y considera usar Tor o una VPN para que tu IP no quede asociada a las cantidades que mueves.

Consulta [Ironwood](/zcash-tech/ironwood) para la actualización en sí, y [The Turnstile](/zcash-tech/the-turnstile) para entender cómo funciona la contabilidad.

<br/>

## Errores comunes que debes evitar

- **Enviar de t-address a t-address** — completamente público, sin privacidad. Siempre blinda los fondos primero.
- **Asumir que Orchard todavía acepta fondos** — es solo gasto desde el 28 de julio de 2026. El valor puede salir, pero no entra nada nuevo
- **Confundir Sapling y las Unified Address** — las direcciones Sapling comienzan con `zs`. Las Unified Address comienzan con `u1` y agrupan varios receptores, por lo que el pool en el que termina tu pago depende de qué receptores lleve esa dirección
- **Dejar fondos en el pool Sprout** — Sprout ha estado obsoleto durante años; mueve esos fondos fuera
- **Esperar que una migración sea completamente invisible** — la cantidad que cruza el turnstile es pública, aunque el remitente y el receptor no lo sean
- **Asumir que t → z (blindaje) es completamente privado** — el acto de blindar en sí es visible on-chain; el contenido no

---

## Páginas relacionadas

- [Ironwood](/zcash-tech/ironwood) — La actualización que creó el pool actual
- [The Turnstile](/zcash-tech/the-turnstile) — Cómo se audita el valor que se mueve entre pools
- [Wallets](/using-zcash/wallets) — Qué wallets se mantienen y están listas para Ironwood
- [Transacciones](/using-zcash/transactions) — Cómo enviar transacciones blindadas
- [Comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de usarlo en pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — La base criptográfica de los pools blindados
- [Qué son ZEC y Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre la privacidad de Zcash
