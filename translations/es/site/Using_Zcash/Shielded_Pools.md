<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Pools de valor Zcash

## TL;DR

- Actualmente, Zcash tiene **5 pools de valor [value pools]**: Sprout (heredado), Sapling, Orchard (solo para gasto), Ironwood y Transparente.
- **Ironwood** es el pool blindado [shielded] principal actual, activo desde la actualización NU6.3 del 28 de julio de 2026.
- **Orchard** ahora es **solo para gasto**: no puede entrar nuevo valor y los fondos existentes migran hacia Ironwood.
- **Sapling** (direcciones z que comienzan con `zs`) sigue siendo ampliamente compatible y continúa protegiendo una cantidad significativa de ZEC blindado.
- Las direcciones **transparentes** (t...) no proporcionan privacidad de transacción y funcionan de forma similar a Bitcoin.
- **Sprout** es un pool blindado heredado que se ha retirado del uso activo.
- La migración de Orchard a Ironwood está **en curso** y es auditada públicamente por el turnstile.
- Para contar con las garantías de privacidad más sólidas, los usuarios deben seguir prefiriendo las transacciones **de blindado a blindado (z → z)** siempre que sea posible.


<br/>

## Comprender los pools de valor de Zcash

Zcash separa los fondos en sistemas contables distintos conocidos como pools de valor. Cada pool tiene sus propias reglas criptográficas y propiedades de privacidad, mientras que el protocolo rastrea el valor total que se mueve entre ellos.

Actualmente, la red contiene cinco pools de valor principales:

- Transparente — Público y totalmente visible on-chain.
- Sapling — El primer pool blindado moderno ampliamente adoptado, aún activo.
- Orchard — El anterior pool blindado principal, ahora solo para gasto.
- Ironwood — El pool blindado principal actual, introducido por NU6.3.
- Sprout — El pool blindado original lanzado con Zcash en 2016.
  


A medida que Zcash evoluciona, pueden introducirse nuevos pools blindados para mejorar la seguridad, la privacidad, la usabilidad y la auditabilidad, manteniendo la compatibilidad con los fondos existentes.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig. 1: Un gráfico que muestra los tres pools blindados (Sprout, Sapling y Orchard) hasta el 29 de octubre de 2025, antes de que se activara Ironwood

<br/>

## Los pools blindados


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood es el pool blindado principal actual. Se activó el 28 de julio de 2026 en el bloque 3.428.143 como parte de la actualización de red NU6.3, y es donde ahora reside el nuevo valor blindado.

Existe porque se detectó una vulnerabilidad en el sistema de pruebas de Orchard en mayo de 2026. No hay evidencia de que se haya explotado nunca, pero el fallo implicaba que el suministro blindado no podía demostrarse como sólido únicamente mediante las pruebas. En vez de aplicar un parche, la red creó un pool nuevo con un circuito corregido y trasladó el valor a través de un turnstile que cuenta públicamente cada moneda. Esa contabilidad es lo que restaura la garantía de que el suministro blindado está completamente respaldado.

Ironwood reutiliza el modelo Action de Orchard y las pruebas Halo 2, por lo que se comporta de la misma manera en el día a día. Hay dos novedades: las transacciones usan el formato v6, y las notas de Ironwood son **recuperables cuánticamente** bajo [ZIP 2005](https://zips.z.cash/zip-2005), lo que significa que el registro on-chain de una moneda sigue siendo recuperable si una futura computadora cuántica rompe la criptografía actual. Esta es una vía de recuperación, no resistencia cuántica, y no se aplica a pools antiguos.

No necesitas una dirección nueva. Las direcciones unificadas agrupan varios receptores y las billeteras eligen el pool adecuado por ti.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig. 2: Un gráfico que muestra el pool Orchard hasta el 29 de octubre de 2025, antes de que se activara Ironwood

<br/>

El pool blindado Orchard se activó el 31 de mayo de 2022 como parte de la actualización de red NU5. Orchard introdujo un nuevo protocolo blindado que eliminó la necesidad de una configuración confiable y se convirtió en el pool blindado principal utilizado por las direcciones unificadas (UA).

Orchard mejoró significativamente la usabilidad, la eficiencia y la privacidad al reducir la filtración de metadatos de transacciones e introducir un modelo de transacción más flexible basado en Actions en lugar de entradas y salidas blindadas tradicionales.

Desde que se activó la actualización Ironwood el 28 de julio de 2026, **Orchard es solo para gasto**. No puede entrar nuevo valor en el pool. Los fondos que ya se mantienen allí aún pueden gastarse y están migrando hacia Ironwood a través del turnstile. Las billeteras se encargan de ello por ti, aunque la mayoría te da cierto control sobre el ritmo. Cada salida de Orchard muestra su importe en la blockchain, por lo que la forma en que una billetera divide y programa la migración importa para la privacidad.

Si tienes fondos de Orchard, consulta [Ironwood](/zcash-tech/ironwood) para saber qué significa la migración en la práctica.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig. 3: Un gráfico que muestra el pool Sapling hasta el 29 de octubre de 2025, antes de que se activara Ironwood

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) fue una actualización del protocolo Zcash introducida el 28 de octubre de 2018. Representa una mejora importante respecto a la versión anterior conocida como Sprout, que tenía algunas limitaciones en términos de privacidad, eficiencia y usabilidad. 

Algunas de las mejoras incluyen un rendimiento mejorado para las direcciones blindadas, claves de visualización mejoradas para permitir a los usuarios ver las transacciones entrantes y salientes sin exponer las claves privadas de los usuarios, y claves Zero Knowledge independientes para hardware wallet durante la firma de transacciones. 

Zcash Sapling permite a los usuarios realizar transacciones privadas en solo unos segundos, en comparación con el mayor tiempo que requería la serie Sprout. 

El blindaje de transacciones mejora la privacidad, haciendo imposible que terceros vinculen transacciones y determinen la cantidad de ZEC que se transfiere. Sapling también mejora la usabilidad al reducir los requisitos computacionales para generar transacciones privadas, haciéndolas más accesibles para los usuarios.

Las direcciones de billetera Sapling comienzan con «zs», y esto puede observarse en todas las billeteras blindadas Zcash compatibles (Zkool, billetera Zingo, Nighthawk, etc.), que tienen direcciones Sapling integradas. Zcash Sapling representa un avance significativo en tecnología en cuanto a la privacidad y eficiencia de las transacciones, lo que convierte a Zcash en una criptomoneda práctica y efectiva para los usuarios que valoran la privacidad y la seguridad.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig. 4: Un gráfico que muestra el pool Sprout hasta el 29 de octubre de 2025, antes de que se activara Ironwood

Sprout fue el primer protocolo de privacidad Zero Knowledge abierto y sin permisos jamás lanzado. Se lanzó el 28 de octubre de 2016.

Las direcciones Sprout se identifican por sus dos primeras letras, que siempre son «zc». Recibió el nombre «Sprout» con el objetivo principal de enfatizar que el software era una blockchain joven, en desarrollo, con gran potencial para crecer y abierta al desarrollo. 

Sprout se utilizó como una herramienta temprana para el minado de inicio lento [Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), que permitió la distribución de ZEC y recompensas de bloque para los mineros. 

A medida que el ecosistema Zcash continuó expandiéndose con un número creciente de transacciones blindadas, se observó que la serie Zcash Sprout se volvió limitada y menos eficiente en cuanto a privacidad del usuario, escalabilidad y procesamiento de transacciones. Esto llevó a la modificación de la red y a la actualización Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparente</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig. 5: Un gráfico que muestra el pool Transparente hasta el 29 de octubre de 2025, antes de que se activara Ironwood

<br/>

El pool Transparente de Zcash no está blindado ni es privado. Las direcciones de billetera transparentes de Zcash comienzan con la letra «t»; la privacidad es muy baja al usar este tipo de dirección para transacciones.

Las transacciones transparentes en Zcash son similares a las transacciones de Bitcoin, admiten transacciones multifirma y utilizan direcciones públicas estándar.

Las direcciones transparentes de Zcash son utilizadas principalmente por exchanges centralizados para garantizar una alta transparencia y confirmación de red al enviar y recibir ZEC entre usuarios.

También es importante señalar que, aunque las direcciones blindadas de Zcash proporcionan una alta privacidad durante las transacciones, también requieren más recursos computacionales para procesarlas. Por lo tanto, algunos usuarios pueden adoptar direcciones transparentes para transacciones que no requieren el mismo nivel de privacidad.

<br/>

## Práctica recomendada para transferencias entre pools

Al considerar un alto nivel de privacidad durante una transacción en la red Zcash, se recomienda seguir las prácticas siguientes;

Las transacciones entre billeteras «z a z» en la blockchain Zcash son mayormente blindadas y a veces se denominan transacciones privadas debido al alto nivel de privacidad que generan. Esta suele ser la mejor y más recomendada forma de enviar y recibir $ZEC cuando se requiere privacidad. 

---

Cuando envías ZEC de una «dirección Z» a una «dirección T», simplemente implica una transacción de desblindaje. En este tipo de transacción, el nivel de privacidad no siempre es alto, ya que cierta información será visible en la blockchain debido al envío de ZEC a una dirección transparente. La transacción de desblindaje no siempre se recomienda cuando se requiere una alta privacidad. 

---

Transferir ZEC desde una dirección transparente (dirección T) a una dirección Z se conoce simplemente como blindaje. En este tipo de transacción, el nivel de privacidad no siempre es alto en comparación con una transacción z-z, pero también se recomienda cuando se requiere privacidad. 

---

Enviar ZEC desde una dirección transparente (dirección T) a otra dirección transparente (dirección T) en la red Zcash (transacción T-T) es muy similar a una transacción de Bitcoin, y por ello las transacciones T-T en Zcash siempre se denominan transacciones públicas, porque los detalles de las transacciones tanto del remitente como del receptor se vuelven visibles para el público, lo que hace que el nivel de privacidad sea muy bajo en dichas transacciones. 

La mayoría de los exchanges centralizados de criptomonedas utilizan direcciones transparentes («dirección T») para realizar transacciones en la blockchain Zcash, pero este tipo de transacción (T-T) no tendrá propiedades privadas.

<br/>

## La migración de Orchard a Ironwood

La migración está ocurriendo ahora. Orchard está cerrado a nuevos depósitos, y el valor que aún permanece allí se está trasladando a Ironwood, una transacción a la vez. Puedes observar los totales en [ironwood.live](https://ironwood.live/).

Lo que esto significa depende de dónde estén tus fondos:

1. **La nueva actividad blindada** entra automáticamente en Ironwood. No tienes que hacer nada.
2. **Los fondos existentes de Orchard** deben migrar. Las billeteras mantenidas lo hacen por ti, generalmente por etapas en lugar de hacerlo todo de una vez.
3. **Sapling no se ve afectado** y sigue aceptando fondos. Solo Orchard fue cerrado.
4. **El turnstile cuenta todo** lo que cruza entre pools, lo cual demuestra que no se creó ninguna moneda en el camino.

> **Una advertencia de privacidad que vale la pena conocer.** El turnstile publica el *importe* que cruza entre pools, junto con la altura del bloque. El remitente y el receptor permanecen ocultos como siempre, pero un importe distintivo puede vincularse contigo. Por eso las billeteras migran por etapas utilizando denominaciones estándar, en lugar de trasladar tu saldo en una sola suma reconocible. Deja que tu billetera marque el ritmo y considera usar Tor o una VPN para que tu IP no quede vinculada a los importes que mueves.

Consulta [Ironwood](/zcash-tech/ironwood) para la actualización en sí y [El Turnstile](/zcash-tech/the-turnstile) para saber cómo funciona la contabilidad.

<br/>

## Errores comunes que se deben evitar

- **Enviar de dirección t a dirección t** — Es totalmente público, sin privacidad. Siempre blinda los fondos primero.
- **Suponer que Orchard aún acepta fondos** — Es solo para gasto desde el 28 de julio de 2026. El valor puede salir, pero no puede entrar nada nuevo.
- **Confundir las direcciones Sapling y las direcciones unificadas** — Las direcciones Sapling comienzan con `zs`. Las direcciones unificadas comienzan con `u1` y agrupan varios receptores, por lo que el pool en el que termina tu pago depende de los receptores que contenga esa dirección.
- **Dejar fondos en el pool Sprout** — Sprout ha estado obsoleto durante años; retira esos fondos.
- **Esperar que una migración sea completamente invisible** — El importe que cruza el turnstile es público, aunque el remitente y el receptor no lo sean.
- **Suponer que t → z (blindaje) es completamente privado** — El acto de blindar es visible on-chain; el contenido no lo es.

---

## Páginas relacionadas

- [Ironwood](/zcash-tech/ironwood) — La actualización que creó el pool actual
- [El Turnstile](/zcash-tech/the-turnstile) — Cómo se audita el valor que se mueve entre pools
- [Billeteras](/using-zcash/wallets) — Qué billeteras se mantienen y están listas para Ironwood
- [Transacciones](/using-zcash/transactions) — Cómo enviar transacciones blindadas
- [Comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de usarlo en pools
- [zk-SNARKs](/zcash-tech/zk-snarks) — La base criptográfica de los pools blindados
- [Qué es ZEC y Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre la privacidad de Zcash
