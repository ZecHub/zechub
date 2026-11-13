# Zcash Descripción general de financiación [Funding] y gobernanza [Governance]

El modelo de financiación on-chain de Zcash, la mecánica de recompensas de bloque y las funciones de las principales organizaciones

## 1. Cómo funcionan las recompensas de bloque de Zcash

Zcash es una criptomoneda de prueba de trabajo [Proof-of-Work]. Cada bloque minado distribuye su **subsidio de bloque** (los ZEC recién creados) más las tarifas de transacción según un conjunto fijo de reglas de protocolo establecido por las actualizaciones de red.

- **Modelo actual (NU6.1 / desde el 24 de noviembre de 2025)**  
  La distribución es:

| Destinatario                    | Porcentaje | Qué financia / estado                                      |
|--------------------------------|------------|-------------------------------------------------------------|
| Mineros                         | 80%        | Recompensa directa de bloque para los mineros               |
| Zcash Community Grants (ZCG)   | 8%         | Subvenciones comunitarias (continúa hasta ~2028)            |
| Fondo controlado por los poseedores de monedas (Coinholder-Controlled Fund)     | 12%        | Financiado inicialmente con el antiguo lockbox; los poseedores de monedas votan las subvenciones ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Fondo histórico de desarrollo anterior a NU6 (2020-noviembre de 2024)**  
  El 20% de cada subsidio de bloque iba directamente a organizaciones de desarrollo:

  - 7% -> Electric Coin Company (ECC) / Proyecto Bootstrap  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Este «fondo de desarrollo» del 20% fue sustituido por el modelo de 8% para ZCG + 12% para Lockbox mediante [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, noviembre de 2024). De noviembre de 2024 a noviembre de 2025, el 12% se acumuló en el Lockbox del Fondo de Desarrollo Diferido (Deferred Dev Fund Lockbox), sin forma de gastarlo.

### Modelo actual: ZIP 1016 - Modelo de financiación comunitaria y de titulares de monedas
ZIP 1016 (creado en febrero de 2025) se activó en la mainnet mediante [NU6.1](/zcash-tech/nu6-1) en el bloque 3.146.400 el 24 de noviembre de 2025 ([ZIP 255](https://zips.z.cash/zip-0255)). Este:
- Continúa la asignación del 8% a ZCG.
- Convirtió el 12% de Lockbox en un «Fondo Controlado por Titulares de Monedas» (financiado con los fondos existentes de Lockbox + el subsidio de bloque continuo del 12%).
- Se mantiene vigente hasta el tercer halving (el ZIP permite que esa fecha cambie si NU7 modifica la temporización de los bloques).
- Permite a los titulares de monedas de ZEC votar sobre subvenciones (mayoría simple, mínimo de 420.000 ZEC votados).
- Exige que las Organizaciones Titulares de Claves (que actualmente incluyen ZF y Shielded Labs, con Bootstrap/ECC referenciadas en contextos de subvenciones) administren los desembolsos mediante multifirma, sujetas a acuerdos legales y decisiones de los titulares de monedas.
- Mantiene todos los requisitos de ZIP 1015 sobre el uso de Lockbox (financiación de subvenciones para el ecosistema).

Este modelo pasa del control por organizaciones a la gobernanza directa de los titulares de monedas para la asignación del 12%. No altera el proceso de ZIP ni las reglas de marcas comerciales.

## 2. Las organizaciones principales y sus fuentes de financiación

**Electric Coin Company (ECC) / Proyecto Bootstrap**  
- Creadores originales de Zcash (2016).  
- Históricamente recibieron ~7% del fondo de desarrollo hasta noviembre de 2024.  
- En enero de 2026, el equipo principal de ingeniería y producto renunció a Bootstrap/ECC debido a disputas de gobernanza y formó Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap ya no recibe financiación directa del protocolo ni emplea al equipo principal de desarrollo. Depende de donaciones, patrocinios y su propia tesorería.  
- Tiene importancia histórica, pero ya no es la organización activa de desarrollo del protocolo.  
-> Consulte el perfil completo: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formado en enero de 2026 por los desarrolladores originales del protocolo de Zcash (el equipo principal de ingeniería y producto de ECC) después de dejar Bootstrap/ECC.  
- Recaudó más de 25 millones de dólares en financiación semilla de grandes inversores, incluidos a16z Crypto y Coinbase Ventures.  
- El equipo, compuesto por los inventores y desarrolladores originales del protocolo Zcash, continúa el desarrollo central del protocolo, las contribuciones a ZIP y las herramientas enfocadas en la privacidad, incluida la billetera móvil Zodl (renombrada desde Zashi).  
- No recibe financiación directa del protocolo on-chain; opera como un laboratorio independiente respaldado por capital de riesgo y centrado en impulsar la infraestructura de privacidad de Zcash.  
-> Consulte el perfil completo: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Sitio oficial: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organización sin ánimo de lucro independiente 501(c)(3) centrada en infraestructura, software de nodos, investigación y salud del ecosistema.  
- Históricamente recibió el 5% del fondo de desarrollo.  
- Ya no recibe financiación directa del protocolo después de NU6. Depende de donaciones y subvenciones.  
- Posee la marca comercial Zcash (donada por ECC en 2019) y desempeña un papel central en la gobernanza.  
- Gestiona el Panel Asesor Comunitario de Zcash (ZCAP) y ayuda a facilitar las encuestas comunitarias.  
- Actúa como Organización Titular de Claves según el ZIP 1016.  
-> Consulte el perfil completo: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Sitio oficial: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- El programa Zcash Community Grants financia equipos y proyectos independientes para realizar importantes desarrollos continuos y otros trabajos por el bien público del ecosistema de Zcash.  
- Las subvenciones son decididas por un comité elegido por la comunidad.  
- Continúa recibiendo el 8% completo de las recompensas de bloque (posterior a NU6), administrado a través de Financial Privacy Foundation.  
- Las subvenciones se otorgan mediante un proceso transparente de solicitud y votación abierto a la comunidad.  
-> Consulte el perfil completo: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Sitio oficial: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Una organización sin ánimo de lucro constituida en las Islas Caimán.  
- Recibe directamente del protocolo la asignación del 8% del subsidio de bloque (según ZIP 1015) y gestiona toda la administración legal, financiera y operativa del programa Zcash Community Grants.  
- Proporciona la estructura general y el apoyo administrativo para las operaciones de ZCG, incluidos los desembolsos, contratos y cumplimiento normativo.  
- ZCG opera como una entidad autónoma elegida por la comunidad bajo el paraguas de FPF.  
-> Consulte el perfil completo: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Sitio oficial: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organización independiente de apoyo a Zcash, financiada mediante donaciones y con sede en Suiza.  
- La primera organización del ecosistema de Zcash que nunca ha recibido financiación directa ni indirecta del Fondo de Desarrollo o de las recompensas de bloque.  
- Se centra en iniciativas que benefician a los titulares de ZEC y prioriza la voz de los titulares para definir la dirección de Zcash.  
- Actúa como Organización Titular de Claves según el ZIP 1016 para la administración del Fondo Controlado por Titulares de Monedas.  
- Contribuye al desarrollo del protocolo, al proceso de ZIP y a la gobernanza (representación como editor de ZIP).  
-> Consulte el perfil completo: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Sitio oficial: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Gobernanza - Cómo se toman las decisiones

La gobernanza de Zcash es una combinación de «reglas de protocolo on-chain» y «consenso social off-chain»:

1. **Proceso de ZIP (Propuestas de Mejora de Zcash)**  
   - Cualquiera puede presentar una ZIP.  
   - Debate público en foros, Discord, GitHub.  
   - Los editores actuales de ZIP son Jack Grigg, Daira-Emma Hopwood y Kris Nuttycombe (a título individual); Arya y Marek (Zcash Foundation); Mark Henderson y Sam H. Smith (Shielded Labs); Sean Bowe y Tal Derei (Project Tachyon); y Dev Ojha (Valar Group).
   - La aprobación de una ZIP no programa automáticamente su inclusión en la siguiente actualización de red. Las ZIPs de consenso requieren un plan de despliegue y una implementación, y sus reglas se activan a la altura de la actualización de red especificada.

2. **Acuerdo de marca comercial (2019-2024)**  
   - ECC donó la marca comercial Zcash a ZF en 2019.  
   - El acuerdo originalmente exigía el consentimiento mutuo de ECC y ZF para cualquier actualización de red que creara un nuevo protocolo de consenso.  
   - En abril de 2024, ECC anunció su intención de terminarlo; la notificación formal de terminación se emitió en agosto de 2024.  
   - Desde 2025, ZF es el único administrador de la marca comercial Zcash y ha adoptado una nueva política permisiva de marca comercial que refleja la descentralización del ecosistema. La marca comercial ya no funciona como un mecanismo de veto de gobernanza.

3. **Panel Asesor Comunitario de Zcash (ZCAP)**  
   - Grupo voluntario de expertos del ecosistema.  
   - Se utiliza para encuestas comunitarias no vinculantes sobre decisiones importantes.

4. **Ratificación on-chain**  
   - Las actualizaciones de red se activan a una altura de bloque predeterminada. Los nodos que ejecutan software compatible aplican las nuevas reglas de consenso a partir de esa altura. Los nodos que no se actualizan pueden seguir una rama de consenso anterior a la actualización, lo que podría provocar una división de la red (chain split).

5. **Lockbox y ZIP 1016**  
   - Los fondos del 12% de Lockbox se acumularon en el protocolo desde noviembre de 2024 hasta noviembre de 2025.  
   - NU6.1 los convirtió en el Fondo Controlado por Titulares de Monedas (Coinholder-Controlled Fund), con votación de titulares de monedas y administración multifirma por Organizaciones Titulares de Claves (actualmente se señalan ZF y Shielded Labs).

## 4. Tabla de referencia rápida - Evolución de la financiación

| Período           | Mineros | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notas                                      |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov. de 2024  | 80%    | 7%            | 5%   | 8%   | -       | Fondo de desarrollo clásico                |
| Nov. de 2024 - nov. de 2025 | 80% | 0%            | 0%   | 8%   | 12%     | Modelo NU6 + extensión de ZCG                  |
| Nov. de 2025 - ahora (ZIP 1016) | 80% | 0%   | 0%   | 8%   | 12% (Controlado por titulares de monedas) | NU6.1; hasta el tercer halving; votación de titulares de monedas |

## 5. Recursos relacionados

- Explicación oficial de financiación -> sección de financiación de la red de [z.cash](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (cambio de financiación de NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modelo de titulares de monedas, activo desde NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Propuestas de Mejora de Zcash -> [zips.z.cash](https://zips.z.cash)  
- Portal de Zcash Community Grants -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Panel de Lockbox

El panel de ZecHub muestra la cantidad actual de ZEC en el fondo Lockbox y de titulares de monedas [aquí](https://zechub.wiki/dashboard?tab=lockbox).
