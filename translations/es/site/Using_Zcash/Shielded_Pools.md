<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Pools de Valor de Zcash 

## TL;DR

- Zcash actualmente tiene **4 pools de valor**: Sprout (heredado), Sapling, Orchard y Transparent.
- **Orchard** es el pool blindado principal actual utilizado por las Unified Addresses (u1...).
- **Sapling** (direcciones z que comienzan con `zs`) sigue siendo ampliamente compatible y continúa protegiendo una cantidad significativa de ZEC blindado.
- Las direcciones **Transparent** (t...) no proporcionan privacidad en las transacciones y funcionan de forma similar a Bitcoin.
- **Sprout** es un pool blindado heredado que ha sido retirado del uso activo.
- Se ha propuesto un futuro pool blindado conocido como **Ironwood** para reforzar la confianza en la integridad del suministro de ZEC blindado, preservando al mismo tiempo la privacidad.
- Para las garantías de privacidad más sólidas, los usuarios deben seguir prefiriendo las transacciones **de blindado a blindado (z → z)** siempre que sea posible.


<br/>

## Comprender los pools de valor de Zcash

Zcash separa los fondos en sistemas de contabilidad distintos conocidos como pools de valor. Cada pool tiene sus propias reglas criptográficas y propiedades de privacidad, mientras el protocolo rastrea el valor total que se mueve entre ellos.

Hoy en día, la red contiene cuatro pools de valor principales:

- Transparent — Público y completamente visible en la cadena.
- Sapling — El primer pool blindado moderno ampliamente adoptado.
- Orchard — El pool blindado principal actual introducido con las Unified Addresses.
- Sprout — El pool blindado original lanzado con Zcash en 2016.
  


A medida que Zcash evoluciona, pueden introducirse nuevos pools blindados para mejorar la seguridad, la privacidad, la usabilidad y la auditabilidad, manteniendo al mismo tiempo la compatibilidad con los fondos existentes.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Fig. 1: Un gráfico que muestra los 4 pools actuales en octubre de 2025

<br/>

## Los pools blindados 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Fig. 2: Un gráfico que muestra el pool Orchard en octubre de 2025

<br/>

El Pool Blindado Orchard se activó el 31 de mayo de 2022 como parte de la actualización de red NU5. Orchard introdujo un nuevo protocolo blindado que eliminó la necesidad de una trusted setup y se convirtió en el pool blindado principal utilizado por las Unified Addresses (UA).

Orchard mejoró significativamente la usabilidad, la eficiencia y la privacidad al reducir la filtración de metadatos de las transacciones e introducir un modelo de transacción más flexible basado en Actions en lugar de las entradas y salidas blindadas tradicionales.

Hoy en día, Orchard sigue siendo el pool blindado principal de Zcash. Sin embargo, la comunidad está evaluando una futura migración a un nuevo pool blindado llamado Ironwood, que proporcionaría garantías adicionales sobre la integridad del suministro de ZEC blindado, preservando al mismo tiempo las garantías de privacidad de Zcash.

Las [billeteras blindadas de Zcash](/site/Using_Zcash/Wallets) ahora son compatibles con Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Fig. 3: Un gráfico que muestra el pool Sapling en octubre de 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) fue una actualización del protocolo Zcash introducida el 28 de octubre de 2018. Es una mejora importante con respecto a la versión anterior conocida como Sprout, que tenía algunas limitaciones en términos de privacidad, eficiencia y usabilidad. 

Algunas de las mejoras incluyen un rendimiento mejorado para las direcciones blindadas, Viewing Key mejoradas para permitir a los usuarios ver las transacciones entrantes y salientes sin exponer las claves privadas del usuario, y claves independientes de Zero Knowledge para billeteras de hardware durante la firma de transacciones. 

Zcash Sapling permite a los usuarios realizar transacciones privadas en solo unos segundos en comparación con el mayor tiempo que tomaba en la serie Sprout. 

El blindaje de transacciones mejora la privacidad, haciendo imposible que terceros vinculen transacciones y determinen la cantidad de ZEC que se está transfiriendo. Sapling también mejora la usabilidad al reducir los requisitos computacionales para generar transacciones privadas, haciéndolas más accesibles para los usuarios.

Las direcciones de las billeteras Sapling comienzan con "zs" y esto puede observarse en todas las billeteras blindadas de Zcash compatibles (YWallet, Zingo Wallet, Nighthawk, etc.) que tienen direcciones Sapling integradas. Zcash Sapling representa un desarrollo significativo en tecnología en lo que respecta a la privacidad y la eficiencia de las transacciones, lo que convierte a Zcash en una criptomoneda práctica y eficaz para los usuarios que valoran la privacidad y la seguridad.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Fig. 4: Un gráfico que muestra el pool Sprout en octubre de 2025

Sprout fue el primer protocolo abierto y sin permisos de privacidad Zero Knowledge jamás lanzado. Fue lanzado el 28 de octubre de 2016.

Las direcciones Sprout se identifican por sus dos primeras letras, que siempre son "zc". Se le dio el nombre "Sprout" con el propósito principal de enfatizar que el software era una blockchain joven, en crecimiento, con gran potencial para desarrollarse y abierta al desarrollo. 

Sprout se utilizó como una herramienta temprana para la [minería slow start de Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), lo que dio lugar a la distribución de ZEC y recompensas de bloque para los mineros. 

A medida que el ecosistema de Zcash siguió expandiéndose con un número creciente de transacciones blindadas, se observó que la serie Zcash Sprout se volvió limitada y menos eficiente en lo que respecta a la privacidad del usuario, la escalabilidad de las transacciones y el procesamiento. Esto condujo a la modificación de la red y a la actualización Sapling. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Fig. 5: Un gráfico que muestra el pool Transparent en octubre de 2025

<br/>

El pool Transparent de Zcash no está blindado y no es privado. Las direcciones de billetera Transparent en Zcash comienzan con la letra "t"; la privacidad es muy baja al usar este tipo de dirección para transacciones.

Las transacciones Transparent en Zcash son similares a las transacciones de Bitcoin, que admiten transacciones multifirma y hacen uso de direcciones públicas estándar.

Las direcciones Transparent de Zcash son utilizadas principalmente por exchanges centralizados para garantizar una alta transparencia y confirmación de red al enviar y recibir ZEC entre usuarios.

También es importante señalar que, aunque las direcciones blindadas de Zcash proporcionan alta privacidad durante las transacciones, también requieren más recursos computacionales para procesarlas. Por lo tanto, algunos usuarios pueden adoptar direcciones Transparent para transacciones que no requieren el mismo nivel de privacidad.

<br/>

## Práctica recomendada para transferencias entre pools

Cuando se trata de considerar un alto nivel de privacidad durante una transacción en la red Zcash, se recomienda seguir las siguientes prácticas;

Las transacciones que ocurren entre billeteras "z a z" en la blockchain de Zcash están mayoritariamente blindadas y a veces se denominan transacciones privadas debido al alto nivel de privacidad generado. Esta suele ser la mejor y más recomendada forma de enviar y recibir $ZEC cuando se requiere privacidad. 

---

Cuando envías ZEC desde una "Z-address" a una "T-address", esto simplemente implica una forma de transacción de desblindaje. En este tipo de transacción, el nivel de privacidad no siempre es alto, ya que cierta información será visible en la blockchain debido al efecto de enviar ZEC a una dirección Transparent. La transacción de desblindaje no siempre se recomienda cuando se requiere una alta privacidad. 

---

Transferir ZEC desde una dirección Transparent (T-address) a una Z-address se conoce simplemente como blindaje. En este tipo de transacción, el nivel de privacidad no siempre es tan alto como el de una transacción z-z, pero también se recomienda cuando se requiere privacidad. 

---

Enviar ZEC desde una dirección Transparent (T-address) a otra dirección Transparent (T-address) en la red Zcash (transacción T-T) es muy similar a una transacción de Bitcoin, y por eso las transacciones T-T en Zcash siempre se denominan transacciones públicas, porque los detalles de la transacción tanto del remitente como del receptor se vuelven visibles para el público, lo que hace que el nivel de privacidad sea muy bajo en este tipo de transacción. 

La mayoría de los exchanges centralizados de criptomonedas utilizan direcciones Transparent ("T-address) cuando se trata de realizar transacciones en la blockchain de Zcash, pero este tipo de transacción (T-T) no tendrá ninguna propiedad privada.

<br/>

## El futuro: Pool Ironwood

La comunidad de Zcash está evaluando actualmente un pool blindado propuesto llamado Ironwood.

Ironwood está diseñado para abordar una vulnerabilidad descubierta recientemente y corregida en el sistema de pruebas de Orchard. Aunque no hay evidencia de que la vulnerabilidad haya sido explotada alguna vez, Ironwood proporcionaría una capa adicional de garantía al permitir una migración controlada desde Orchard hacia un pool blindado de nueva creación.

El objetivo no es reemplazar la privacidad de Zcash, sino reforzar la confianza en la integridad del suministro de ZEC blindado.

## Según la propuesta:

1. La nueva actividad blindada se trasladaría gradualmente a Ironwood.
2. Los fondos existentes en Orchard podrían migrarse de forma privada.
3. La contabilidad pública de turnstile proporcionaría pruebas más sólidas de que todos los fondos blindados siguen estando totalmente respaldados.
4. Los usuarios conservarían las mismas protecciones de privacidad que esperan de Zcash.

<br/>
Si se activa mediante futuras actualizaciones de red, Ironwood se convertiría en la próxima generación del ecosistema blindado de Zcash, preservando al mismo tiempo la compatibilidad con los fondos blindados existentes.

<br/>

## Errores comunes que se deben evitar

- **Enviar de t-address a t-address** — totalmente público, sin privacidad. Siempre blinda los fondos primero.
- **Confundir las direcciones Sapling y Orchard** — las direcciones Sapling comienzan con `zs`, las direcciones Orchard/Unified comienzan con `u1`
- **Dejar fondos en el pool Sprout** — Sprout está obsoleto; migra los fondos a Orchard
- **Suponer que t → z (blindaje) es completamente privado** — el acto de blindar en sí es visible en la cadena; el contenido no lo es

---

## Páginas relacionadas

- [Billeteras](/using-zcash/wallets) — Qué billeteras son compatibles con los pools Orchard y Sapling
- [Transacciones](/using-zcash/transactions) — Cómo enviar transacciones blindadas
- [Comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de usarlo en pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — La base criptográfica de los pools blindados
- [Qué son ZEC y Zcash](/start-here/what-is-zec-and-zcash) — Información de contexto sobre la privacidad de Zcash
