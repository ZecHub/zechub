<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Conocimiento Cero vs sistemas basados en señuelos

"Las criptomonedas exponen todas tus actividades de gasto al público, ya que son como un Twitter para tu cuenta bancaria, y este es un gran problema que debe resolverse adoptando privacidad en cadena." - Ian Miers en [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Ciertos proyectos cripto han ganado reconocimiento por sus enfoques centrados en la privacidad. Zcash es reconocido por emplear pruebas de conocimiento cero (ZK) para proteger los montos y las direcciones de las transacciones. Monero destaca por su uso de una ofuscación del remitente basada en señuelos en combinación con otros esquemas de cifrado para lograr la privacidad del usuario en la blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Comprender las pruebas ZK y los sistemas basados en señuelos

Las pruebas de conocimiento cero son sistemas criptográficos que permiten a una parte (el probador) demostrar a otra parte (el verificador) la validez de una afirmación sin revelar *ninguna información subyacente sobre la propia afirmación*. En el contexto de Zcash, las pruebas ZK se emplean para verificar la validez de una transacción sin divulgar detalles de la transacción como el REMITENTE, el RECEPTOR o el MONTO de la transacción. 

**Esto garantiza que la privacidad del usuario se preserve, ya que la transacción permanece confidencial mientras sigue siendo validada. Esta tecnología está diseñada para garantizar la confidencialidad de las transacciones financieras en la red Zcash.**

En los sistemas basados en señuelos, como [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), se combinan múltiples transacciones, lo que hace complicado o difícil rastrear la fuente y el destino reales de los fondos. El algoritmo introduce entradas y salidas señuelo en las transacciones, empleando también el cifrado de las direcciones utilizadas como entradas y usando pruebas de rango para validar que el monto transferido es gastable. 

Este enfoque ofusca el rastro de la transacción. El uso de entradas señuelo hace que sea difícil para cualquiera que analice la blockchain identificar al remitente real, al receptor real o el monto de la transacción. 

**Nota importante**: Este método de transacción con preservación de privacidad en cadena aún revela explícitamente las entradas (cifradas) de todas las transacciones de los usuarios. Aún puede recopilarse metadato como el *FLUJO DE TRANSACCIONES* entre diferentes usuarios de la red. Si un adversario participa activamente en la generación de transacciones en la red, en la práctica desanonimiza las entradas señuelo de otros usuarios. 


## Ventajas de ZK frente a los sistemas basados en señuelos

Tanto Zcash como Monero son criptomonedas centradas en la privacidad, pero logran esa privacidad de maneras diferentes. 

Estas son algunas ventajas de las pruebas de conocimiento cero (ZK) de Zcash frente al sistema de señuelos de Monero:

1) **Divulgación selectiva**: Con el conjunto de funciones ZK de Zcash, los usuarios tienen la opción de revelar los detalles de una transacción a partes específicas [Lee el blog de ECC sobre divulgación selectiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). En Zcash, el contenido cifrado de las transacciones blindadas permite a las personas revelar selectivamente datos de una transferencia en particular. Además, se puede proporcionar una Viewing Key para divulgar todas las transacciones asociadas con una dirección blindada específica. Esta función permite el cumplimiento normativo y la auditabilidad sin comprometer la privacidad general de la red. 

Aunque el algoritmo de señuelos de Monero (firma de anillo) ayuda a proporcionar privacidad, no ofrece divulgación *selectiva* de la misma manera.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Visibilidad opcional**: Zcash permite a los usuarios elegir entre transacciones transparentes (no privadas) y blindadas (privadas). Esto implica que Zcash ofrece a los usuarios la flexibilidad de mantener su información financiera privada (blindada) o hacerla transparente y públicamente disponible, de forma similar a la mayoría de las demás blockchains, como se explica en el [sitio web oficial de Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Esta privacidad opcional permite una mayor flexibilidad y casos de uso relevantes para empresas/organizaciones, ya que algunas transacciones pueden requerir menos privacidad para el escrutinio público, mientras que otras se benefician de una privacidad reforzada.


3) **Conjunto de anonimato**: El [conjunto de anonimato](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) de los pools blindados de conocimiento cero comprende todas las transacciones que han ocurrido *alguna vez*. Esto es significativamente mayor que la mayoría de las demás técnicas en cadena para lograr la no vinculación de transacciones. Nota: esto solo se aplica a las transacciones dentro del mismo pool blindado.

El uso de señuelos sí aumenta el conjunto de anonimato. Sin embargo, este enfoque depende por completo del número de usuarios *reales* en la red. 

4) **Sin trusted setup**: La configuración de Sprout y Sapling de Zcash utilizó un cómputo multipartito conocido como la "ceremonia de trusted setup". La reciente actualización NU5 no requirió ninguna confianza en la integridad de la configuración del circuito de conocimiento cero. [Lee el blog de ECC sobre NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacidad de los datos**: La [tecnología zk-SNARK](https://wiki.zechub.xyz/zcash-technology) utilizada en los pools blindados de Zcash permite una seguridad significativamente mejorada para los usuarios. La reducción de la filtración de metadatos en cadena significa que los usuarios están a salvo de adversarios como posibles hackers o aparatos estatales opresivos. 

Existen varios casos en los que se han identificado errores en el algoritmo de selección de señuelos de Monero. Estos errores tenían el potencial de revelar gastos de los usuarios, según un informe de [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


En resumen, lo que realmente importa más es reducir o eliminar la filtración de información y datos de los usuarios, como explicó Zooko en la [sesión en vivo AMA de Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Enlaces de referencia***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
