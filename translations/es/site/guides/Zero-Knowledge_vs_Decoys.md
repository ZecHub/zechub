<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sistemas Zero Knowledge frente a sistemas basados en señuelos

«Las criptomonedas exponen todas tus actividades de gasto al público, ya que son como un Twitter para tu cuenta bancaria, y este es un gran problema que debe resolverse adoptando privacidad on-chain». - Ian Miers en [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Ciertos proyectos de criptomonedas han obtenido reconocimiento por sus enfoques centrados en la privacidad. Zcash es reconocido por emplear pruebas de Zero Knowledge (ZK) para proteger los importes y las direcciones de las transacciones. Monero destaca por utilizar una ofuscación del remitente basada en señuelos junto con otros esquemas de cifrado para lograr la privacidad de los usuarios en la blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Comprensión de las pruebas ZK y los sistemas basados en señuelos

Las pruebas de Zero Knowledge son sistemas criptográficos que permiten a una parte (el demostrador) demostrar a otra parte (el verificador) la validez de una afirmación sin revelar *ninguna información subyacente sobre la afirmación misma*. En el contexto de Zcash, las pruebas ZK se emplean para verificar la validez de una transacción sin divulgar detalles de la transacción como el REMITENTE, el RECEPTOR o el IMPORTE de la transacción. 

**Esto garantiza que se preserve la privacidad del usuario, ya que la transacción permanece confidencial mientras sigue siendo validada. Esta tecnología está diseñada para garantizar la confidencialidad de las transacciones financieras en la red Zcash.**

En los sistemas basados en señuelos como [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), se combinan múltiples transacciones, lo que dificulta rastrear el origen y destino reales de los fondos. El algoritmo introduce entradas y salidas señuelo en las transacciones, empleando también el cifrado de las direcciones utilizadas como entradas y usando pruebas de rango para validar que el importe transferido se puede gastar. 

Este enfoque ofusca el rastro de las transacciones. El uso de entradas señuelo dificulta que cualquiera que analice la blockchain identifique al remitente, receptor o importe de transacción reales. 

**Nota importante**: Este método de transacción que preserva la privacidad on-chain sigue revelando explícitamente las entradas (cifradas) de todas las transacciones de los usuarios. Aún se pueden recopilar metadatos como el *FLUJO DE TRANSACCIONES* entre diferentes usuarios de la red. Si un adversario participa activamente en la generación de transacciones en la red, desanonimiza efectivamente las entradas señuelo de otros usuarios. 


## Ventajas de ZK frente a los sistemas basados en señuelos

Tanto Zcash como Monero son criptomonedas centradas en la privacidad, pero logran la privacidad de formas diferentes. 

Estas son algunas ventajas de las pruebas zero-knowledge (ZK) de Zcash sobre el sistema de señuelos de Monero:

1) **Divulgación selectiva**: Con el conjunto de funcionalidades ZK de Zcash, los usuarios tienen la opción de revelar detalles de transacciones a partes específicas [Lee el ECC blog sobre divulgación selectiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). En Zcash, los contenidos cifrados de las transacciones blindadas permiten a las personas revelar selectivamente datos de una transferencia concreta. Además, se puede proporcionar una clave de visualización para divulgar todas las transacciones asociadas con una dirección blindada específica. Esta funcionalidad permite el cumplimiento normativo y la auditabilidad sin comprometer la privacidad general de la red. 

Aunque el algoritmo de señuelos de Monero (firma de anillo) ayuda a proporcionar privacidad, no ofrece divulgación *selectiva* de la misma manera.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Visibilidad opcional**: Zcash permite a los usuarios elegir entre transacciones transparentes (no privadas) y blindadas (privadas). Esto implica que Zcash ofrece a los usuarios la flexibilidad de mantener privada su información financiera (blindada) o hacerla transparente y públicamente disponible, de forma similar a la mayoría de las demás blockchains, como se explica en el sitio web oficial de [Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Esta privacidad opcional permite una mayor flexibilidad y casos de uso relevantes para negocios u organizaciones, ya que algunas transacciones pueden requerir menos privacidad para el escrutinio público, mientras que otras se benefician de una privacidad mejorada.


3) **Conjunto de anonimato**: El [conjunto de anonimato](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) de los pools blindados zero-knowledge comprende todas las transacciones que *alguna vez* han ocurrido. Esto es significativamente mayor que la mayoría de las demás técnicas on-chain para lograr la invinculabilidad de las transacciones. Nota: Esto solo se aplica a las transacciones dentro del mismo pool blindado.

El uso de señuelos aumenta el conjunto de anonimato. Sin embargo, este enfoque depende completamente del número de usuarios *reales* de la red. 

4) **Sin configuración confiable**: La configuración de Zcash de Sprout y Sapling utilizó un cálculo multipartito conocido como la «ceremonia de configuración confiable». La reciente actualización de NU5 no requirió confianza alguna en la integridad de la configuración del circuito zero-knowledge. [Lee el ECC blog sobre NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacidad de datos**: La tecnología [zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) utilizada en los pools blindados de Zcash permite una seguridad significativamente mejorada para los usuarios. La reducción de la fuga de metadatos on-chain significa que los usuarios están protegidos de adversarios como posibles hackers u organismos estatales opresivos. 

Hay varios casos en los que se han identificado errores en el algoritmo de selección de señuelos de Monero. Estos errores podrían revelar los gastos de los usuarios, según un informe de [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


En resumen, lo que realmente importa más es reducir o eliminar la filtración de información y datos de los usuarios, como explicó Zooko en la sesión AMA en directo de [Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9). 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Enlaces de referencia***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
