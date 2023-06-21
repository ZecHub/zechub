# Fondos de valores de Zcash

Estaremos viendo los 4 [value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) en Zcash que incluyen los pools Sprout, Sapling, Orchard y Transparent. Esta página wiki también cubrirá las mejoras en la tecnología y algunas mejores prácticas de transferencia de pools.


## Pools Blindados

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


La serie Sprout fue el primer protocolo abierto de privacidad sin permisos Zero Knowledge lanzado en Zcash y es a veces llamado Zcash 1.0 u "Ordinary Zcash". Se lanzó el 28 de octubre de 2016 y fue la primera versión de Zcash que utilizó la tecnología de prueba de conocimiento cero, que es una característica importante de la criptografía de Zcash. 


Las direcciones Sprout se identifican por sus dos primeras letras, que siempre es "zc". Se llamó "Sprout" con el objetivo principal de destacar que se trataba de un blockchain joven y en ciernes con un gran potencial de crecimiento y abierto al desarrollo. 

La serie Sprout se utilizó como una herramienta temprana para [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) que trajo consigo la distribución de ZEC y recompensas en bloque para los mineros. 

A medida que el ecosistema Zcash continuaba expandiéndose con un número cada vez mayor de transacciones blindadas, se observó que Zcash Sprout Series se volvía limitada y menos eficiente en lo que respecta a la privacidad del usuario, la escalabilidad de las transacciones y el procesamiento. Esto llevó a la modificación de la red y a la actualización de Sapling. 


### Zcash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Zcash Sapling](https://z.cash/upgrade/sapling) es una actualización del protocolo Zcash introducida el 28 de octubre de 2018. Se trata de una mejora importante respecto a la versión anterior del conocido Sprout, que tenía algunas limitaciones en términos de privacidad, eficiencia y usabilidad. 

Algunas de las actualizaciones incluyen un mejor rendimiento para las direcciones blindadas, claves de visualización mejoradas para permitir a los usuarios ver las transacciones entrantes y salientes sin exponer las claves privadas del usuario y claves de conocimiento cero independientes para el monedero de hardware durante la firma de transacciones.

Zcash Sapling permite a los usuarios realizar transacciones privadas en sólo unos segundos, en comparación con el mayor tiempo que se tardaba en Sprout Series.

El blindaje de las transacciones mejora la privacidad, haciendo imposible que terceros vinculen las transacciones y determinen la cantidad de ZEC que se transfiere. Sapling también mejora la usabilidad al reducir los requisitos computacionales para generar transacciones privadas haciéndolo más accesible a los usuarios.

Las direcciones de la billetera de Sapling comienzan con "zs" y esto se puede observar en todas las Billeteras Blindadas Zcash compatibles (YWallet, Zingo Wallet Nighthawk, etc.) que tienen direcciones Sapling incorporadas. Zcash Sapling representa un desarrollo significativo en la tecnología cuando se trata de privacidad y eficiencia de las transacciones que hace a Zcash una criptomoneda práctica y eficaz para los usuarios que valoran la privacidad y seguridad.

### Orchard Pool

El Orchard Shielded Pool se puso en marcha el 31 de mayo de 2022. Las direcciones Orchard también se conocen como direcciones unificadas (UA). 

Dado que las direcciones unificadas combinan receptores de direcciones Orchard, Sapling y Transparent, se espera que la cantidad de fondos almacenados en el fondo blindado aumente significativamente. No hay forma de distinguir entre los fondos que se envían a fondos transparentes o blindados.

El fondo blindado de Orchard supone una mejora significativa de las reservas existentes. Forma un conjunto de anonimato independiente de Sprout y Sapling Shielded Pools, lo que contribuye a aumentar la privacidad y el anonimato de los usuarios.

Las transacciones dentro de Orchard aumentarán el tamaño del conjunto de anonimato más rápidamente que las transacciones realizadas con Sapling, debido a la naturaleza de ocultación de aridad de las "Acciones" de Orchard frente a las entradas y salidas de UTXO. 

La actualización de Orchard ayudará a aportar mejoras a la red Zcash, incluyendo transacciones más rápidas y eficientes, mayor anonimato, seguridad mejorada y mayor flexibilidad para que los desarrolladores construyan aplicaciones descentralizadas en la Blockchain de Zcash.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

Los monederos blindados de Zcash ya admiten Orchard en sus opciones de fondo común. Un buen ejemplo se puede encontrar en Zingo Wallet App. 


## Pool Transparente

El pool Transparente de Zcash es no blindado y no privado. La dirección de la billetera transparente en Zcash comienza con la letra "t", la privacidad se considera muy baja en este tipo de transacción. 

Las transacciones transparentes en Zcash son similares a las transacciones de Bitcoin que soporta transacciones multi-firma y hace uso de direcciones públicas estándar que pueden ser enviadas y recibidas por cualquiera en la red.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Las Zcash Transparentes se utilizan principalmente en los intercambios centralizados para garantizar una alta transparencia y la confirmación de la red al enviar y recibir ZEC entre los usuarios.

También es importante tener en cuenta que mientras que las direcciones Zcash Shielded proporcionan una alta privacidad durante las transacciones, también requieren más recursos computacionales para procesar las transacciones. Por lo tanto, algunos usuarios pueden adoptar direcciones transparentes para transacciones que no requieren el mismo nivel de privacidad.

---
### 

## Prácticas recomendadas para la transferencia de fondos

Cuando se trata de considerar un alto nivel de privacidad durante la transacción en la red Zcash, se recomienda seguir las siguientes prácticas;

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Las transacciones que ocurren entre carteras "z a z" en la blockchain de Zcash están en su mayoría blindadas y a veces se llama Transacción Privada debido al alto nivel de Privacidad generado. Esta suele ser la mejor y más recomendada forma de enviar y recibir $ZEC cuando se requiere privacidad.

---

![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

Cuando se envía ZEC de una "Dirección Z" a una "Dirección T", simplemente connota una forma de transacción de Deshielding. En este tipo de transacción, el nivel de privacidad no siempre es alto, ya que parte de la información será visible en la blockchain debido al efecto de enviar ZEC en una Dirección Transparente. La transacción Deshielding no siempre es recomendable cuando se requiere un alto nivel de privacidad.

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)

La transferencia de ZEC de una dirección transparente (dirección T) a una dirección Z se conoce simplemente como Blindaje. En este tipo de transacción, el nivel de privacidad no siempre es alto en comparación con el de una transacción z-z, pero también se recomienda cuando se requiere privacidad.

---

![20230420_091346_0000.png](https://user-images.githubusercontent.com/38798812/233546890-5580a7b9-e8c5-4e2c-a248-3f6338bbe0d1.png)

El envío de ZEC desde una dirección transparente (T-address) a otra dirección transparente (T-address) en la red Zcash (transacción T-T) es muy similar a la transacción Bitcoin y es por eso que las transacciones T-T en Zcash siempre se llaman transacciones públicas porque tanto los detalles de la transacción del remitente como del destinatario se hacen visibles al público, lo que hace que el nivel de privacidad sea muy bajo en este tipo de transacciones. 

La mayoría de los intercambios centralizados de criptomonedas hacen uso de la Dirección Transparente ("T-address") cuando se trata de realizar transacciones en el blockchain de Zcash, pero este tipo de transacción (T-T) no tendrá ninguna propiedad privada.

