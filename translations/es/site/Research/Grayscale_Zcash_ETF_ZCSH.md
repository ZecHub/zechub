# El ETF de Grayscale Zcash (ZCSH)

**Zcash no lanzó un ETF. Grayscale sí**, al convertir un fondo que ha
gestionado desde 2017. Zcash es un protocolo — no tiene empresa, tesorería ni junta
que pudiera emitir un fondo. Grayscale es un gestor de activos independiente que compra
ZEC en el mercado abierto como cualquier otra persona.

Esta distinción es lo que más se malinterpreta sobre ZCSH, y es donde
comienza esta página. El 25 de agosto de 2026 el fondo comenzó a cotizar en NYSE Arca como
*el ETF de Zcash*, el primer producto cotizado en bolsa estadounidense al contado de
Zcash, y ahora es uno de los mayores poseedores individuales de ZEC existentes.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## El mismo fondo, tres etapas

| Cuándo | Qué cambió |
| --- | --- |
| Octubre de 2017 | Se lanza como una colocación privada, solo para inversores acreditados |
| Octubre de 2021 | Las acciones cotizan en OTCQX bajo el ticker ZCSH, negociándose con descuento respecto al NAV |
| 25 de agosto de 2026 | Se convierte en un ETP reembolsable en NYSE Arca y elimina "Trust" del nombre |

El paso de 2026 no es cosmético. Un trust cotizado OTC no tiene un mecanismo de
reembolso, por lo que sus acciones pueden desviarse hacia una prima o descuento frente al valor
de los activos que las respaldan, a veces de manera considerable — que es exactamente lo que
ocurrió entre 2021 y 2026. Un producto cotizado en bolsa con creación y
reembolso operativos tiene una vía de arbitraje que mantiene el precio de las acciones
vinculado al valor liquidativo. Cambiar de uno al otro cambia cómo se
comporta el instrumento como valor.

## Quién hace qué

| Función | Parte |
| --- | --- |
| Patrocinador | Grayscale Investments Sponsors, LLC |
| Fiduciario | CSC Delaware Trust Company |
| Administrador y agente de transferencias | El Bank of New York Mellon |
| Bróker principal | Coinbase, Inc. — obtiene ZEC para el trust |
| Participantes autorizados | Jane Street, Virtu — crean y reembolsan acciones |
| Agente de marketing | Foreside Fund Services |
| **Custodio** | **Coinbase Custody Trust Company, LLC** — el único lugar donde existe ZEC real |

Ninguna de estas partes por sí sola es el fondo. La estructura es el acuerdo
entre ellas, que es lo que establece el diagrama anterior. Varios de estos roles
faltaban o estaban tergiversados en la cobertura de prensa al momento de la cotización; la lista aquí
sigue la declaración de registro Form S-3 de Grayscale ante EDGAR.

## Cómo se crean y reembolsan las acciones

Solo los Participantes Autorizados — brókeres-dealers registrados con un acuerdo con
el Patrocinador — pueden crear o reembolsar acciones, y solo en bloques de 10.000,
denominados Cestas. Un inversor común nunca utiliza esta infraestructura; compra
y vende acciones existentes en la bolsa como cualquier otro valor cotizado.

Actualmente, el mecanismo es **en efectivo**, no en especie. Un Participante Autorizado
deposita efectivo en una cuenta de efectivo o recibe efectivo de ella, y un proveedor externo
de liquidez es quien realmente obtiene o se deshace de los ZEC. La
declaración de registro también describe un proceso en especie, en el que un
Participante Autorizado depositaría ZEC directamente en el Trust o recibiría
ZEC de él — pero declara claramente que "no se ha obtenido la aprobación regulatoria
para operaciones en especie", y es posible que nunca se obtenga.

Por tanto, bajo el proceso en efectivo, ZEC cambia de manos entre el proveedor de liquidez
y el mercado, nunca entre el inversor y el Trust. Nadie en la ruta minorista toca una
dirección de Zcash.

## La comisión se paga en ZEC

La comisión del patrocinador es de **2,5 % anual**, al momento de la cotización. Se devenga diariamente como
un porcentaje del valor liquidativo y es, en palabras de la presentación, "pagadera en ZEC
al Patrocinador diariamente a vencimiento."

La consecuencia es estructural y no incidental. La comisión sale de los
ZEC del fondo, por lo que la cantidad de ZEC que respalda cada acción disminuye un poco cada
día. Una acción no es una cantidad fija de ZEC mantenida indefinidamente; es un derecho
sobre una cantidad que disminuye lentamente. Cualquiera que compare una exposición a largo plazo a ZCSH con
simplemente mantener ZEC debe incluirlo en la comparación.

Como contexto, el 2,5 % es aproximadamente diez veces la comisión de un ETF típico de bitcoin al contado.
Grayscale ha dicho que los ingresos iniciales de la comisión del patrocinador se destinarán
nuevamente al desarrollo del ecosistema de Zcash.

## Lo que realmente posee un accionista

Una acción es exposición al precio de ZEC. No es ZEC.

Un accionista no puede enviar una transacción blindada, no puede adjuntar una nota, no puede
mantener una dirección unificada y no puede ejercer la autocustodia. Ninguna de las propiedades que
distinguen a Zcash de otros activos está disponible a través del envoltorio — el
envoltorio transmite el precio y nada más. Para un inversor cuyo objetivo es la exposición
dentro de una cuenta de corretaje o de jubilación, ese es exactamente el objetivo. Para
cualquier persona cuyo interés en Zcash sea la privacidad, el ETF no es un sustituto de
una wallet, y los dos no son realmente alternativas entre sí.

## El ZEC se mantiene a la vista

Hay una ironía adicional en la estructura, y es lo más contundente de
esta página. Coinbase Custody mantiene los ZEC del Trust en direcciones
**transparentes**, no blindadas. Las tenencias del fondo son visibles en la cadena,
rastreables hasta el custodio y observables en tiempo real por cualquiera que quiera
mirar. Nada en este fondo utiliza una dirección blindada.

No se trata de una omisión. La infraestructura de fondos regulados se construye en torno a la auditoría
y la certificación, y un saldo blindado es precisamente algo que un auditor no puede
verificar de manera independiente. El propio soporte de Coinbase refleja la misma asimetría:
recibirá ZEC enviados desde una dirección blindada, pero no envía ZEC a
una.

Por tanto, el mayor poseedor institucional de un activo de privacidad lo mantiene en la única
forma que no tiene privacidad. Este punto se basa en reportajes y no en las
presentaciones — el S-3 describe la custodia de las claves privadas del Trust, pero no
caracteriza los tipos de direcciones — y se expone aquí con esa salvedad.

## Cuánto ZEC está involucrado

Al momento de la cotización, el 25 de agosto de 2026, el fondo mantenía aproximadamente **387.000 ZEC**, con
alrededor de **313 millones de dólares** bajo gestión.

Para una perspectiva más amplia: al 30 de septiembre de 2025, la presentación indica que el Trust mantenía
aproximadamente el **2,4 % de los ZEC en circulación**. Ambas cifras varían — la primera con el
precio de ZEC y con las creaciones y reembolsos, la segunda a medida que la comisión se paga
con las tenencias — así que obtenga una cifra actual de la presentación más reciente o
de la divulgación diaria del propio fondo, en lugar de esta página.

## Fuentes

Todas primarias, todas en EDGAR bajo CIK 1720265 salvo que se indique lo contrario.

- [Grayscale Zcash Trust (ZEC) — índice de presentaciones de EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Declaración de registro Form S-3, noviembre de 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — las funciones de las entidades, la mecánica de creación y reembolso, la comisión del Patrocinador y el porcentaje de ZEC en circulación
- [Formulario 10-K para el año finalizado el 31 de diciembre de 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [El ETF de Zcash comienza a cotizar en NYSE Arca, 25 de agosto de 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Página del fondo de Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — fechas de inicio y divulgación actual
- [La primera ETF de moneda de privacidad: dentro de la presentación de Grayscale de Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — fuente secundaria; la única encontrada que afirma que los ZEC del Trust se mantienen en direcciones transparentes

Las cifras corresponden a las fechas indicadas y variarán. Verificado el 30 de septiembre de 2026.
Solo para uso educativo, no constituye asesoramiento de inversión.
