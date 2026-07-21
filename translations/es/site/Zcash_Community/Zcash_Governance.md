# Resumen de financiación y gobernanza de Zcash

El modelo de financiación on-chain de Zcash, la mecánica de las recompensas por bloque y los roles de las principales organizaciones

## 1. Cómo funcionan las recompensas por bloque de Zcash

Zcash es una criptomoneda de Proof-of-Work. Cada bloque minado distribuye su **subsidio de bloque** (los ZEC recién creados) más las comisiones de transacción según una regla de protocolo fija establecida por las actualizaciones de red.

- **Modelo actual (post-NU6 / desde noviembre de 2024 en adelante)**  
  A fecha de abril de 2026, la distribución es:

| Destinatario                    | Porcentaje | Qué financia / estado                                        |
|---------------------------------|------------|---------------------------------------------------------------|
| Mineros                         | 80%        | Recompensa directa por bloque para los mineros               |
| Zcash Community Grants (ZCG)    | 8%         | Subvenciones comunitarias (continúa hasta ~2028)             |
| Lockbox (controlado por el protocolo) | 12%   | Los fondos se acumulan; aún no hay mecanismo de gasto; se requiere una futura votación de la comunidad |

- **Fondo histórico de desarrollo pre-NU6 (2020-nov 2024)**  
  El 20% de cada subsidio de bloque iba directamente a organizaciones de desarrollo:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Este "fondo de desarrollo" del 20% fue sustituido por el modelo de 8% para ZCG + 12% para lockbox mediante [ZIP 1015](https://zips.z.cash/zip-1015).

### Evolución propuesta: ZIP 1016 - Modelo de financiación comunitaria y de poseedores de monedas
ZIP 1016 (propuesto en febrero de 2025, estado: Proposed) introduce un modelo de financiación más descentralizado. Haría lo siguiente:
- Mantener la asignación del 8% para ZCG.
- Convertir el 12% del lockbox en un "Coinholder-Controlled Fund" (financiado con los fondos existentes del lockbox + el subsidio continuo del 12% por bloque).
- Activar este modelo hasta el tercer halving (aproximadamente 3 años).
- Dar poder a los poseedores de ZEC para votar trimestralmente sobre subvenciones mediante un proceso definido por la comunidad (mayoría simple, quórum mínimo de 420,000 ZEC).
- Exigir a las Key-Holder Organizations (actualmente incluyendo ZF y Shielded Labs, con Bootstrap/ECC mencionados en contextos de subvenciones) administrar los desembolsos mediante multisig, sujetos a acuerdos legales y a las decisiones de los poseedores de monedas.
- Mantener todos los requisitos de ZIP 1015 sobre el uso del lockbox (financiación de subvenciones del ecosistema).

Esta propuesta busca pasar de un control por organizaciones a una gobernanza directa por parte de los poseedores de monedas para la asignación del 12%. No modifica el proceso ZIP ni las reglas de marca registrada.

## 2. Las organizaciones principales y sus fuentes de financiación

**Electric Coin Company (ECC) / Bootstrap Project**  
- Creadores originales de Zcash (2016).  
- Históricamente recibió ~7% del fondo de desarrollo hasta noviembre de 2024.  
- En enero de 2026, el equipo principal de ingeniería y producto dimitió de Bootstrap/ECC debido a disputas de gobernanza y formó el Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap ya no recibe financiación directa del protocolo y ya no emplea al equipo principal de desarrollo. Depende de donaciones, patrocinios y su propia tesorería.  
- Mantiene importancia histórica, pero ya no es la organización activa de desarrollo del protocolo.  
-> Ver perfil completo: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formado en enero de 2026 por los desarrolladores originales del protocolo Zcash (el equipo principal de ingeniería y producto de ECC) después de dejar Bootstrap/ECC.  
- Recaudó más de $25 millones en financiación semilla de grandes inversores, incluidos a16z Crypto y Coinbase Ventures.  
- El equipo, compuesto por los inventores y desarrolladores originales del protocolo Zcash, continúa el desarrollo central del protocolo, las contribuciones a ZIP y las herramientas centradas en la privacidad, incluida la cartera móvil Zodl (renombrada desde Zashi).  
- Sin financiación directa on-chain del protocolo; opera como un laboratorio independiente respaldado por capital riesgo centrado en avanzar la infraestructura de privacidad de Zcash.  
-> Ver perfil completo: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Sitio oficial: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organización sin ánimo de lucro independiente 501(c)(3) centrada en infraestructura, software de nodos, investigación y salud del ecosistema.  
- Históricamente recibió el 5% del fondo de desarrollo.  
- Ya no recibe financiación directa del protocolo post-NU6. Depende de donaciones y subvenciones.  
- Posee la marca registrada de Zcash (donada por ECC en 2019) y desempeña un papel central en la gobernanza.  
- Gestiona el Zcash Community Advisory Panel (ZCAP) y ayuda a facilitar consultas comunitarias.  
- Actúa como Key-Holder Organization bajo la propuesta ZIP 1016.  
-> Ver perfil completo: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Sitio oficial: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- El programa Zcash Community Grants financia equipos y proyectos independientes para llevar a cabo desarrollo importante y continuo, así como otros trabajos para el bien público del ecosistema Zcash.  
- Las subvenciones son decididas por un comité elegido por la comunidad.  
- Sigue recibiendo el 8% completo de las recompensas por bloque (post-NU6), administrado a través de la Financial Privacy Foundation.  
- Las subvenciones se otorgan mediante un proceso transparente de solicitud y votación abierto a la comunidad.  
-> Ver perfil completo: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Sitio oficial: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Una organización sin ánimo de lucro constituida en las Islas Caimán.  
- Recibe directamente del protocolo la asignación del 8% del subsidio por bloque (según ZIP 1015) y gestiona toda la administración legal, financiera y operativa del programa Zcash Community Grants.  
- Proporciona la estructura paraguas y el apoyo administrativo para las operaciones de ZCG, incluidos desembolsos, contratos y cumplimiento normativo.  
- ZCG opera como una entidad autónoma elegida por la comunidad bajo el paraguas de FPF.  
-> Ver perfil completo: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Sitio oficial: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organización independiente de apoyo a Zcash, financiada por donaciones y con sede en Suiza.  
- La primera organización del ecosistema Zcash que nunca ha recibido financiación directa ni indirecta del Development Fund ni de las recompensas por bloque.  
- Se centra en iniciativas que benefician a los poseedores de ZEC y prioriza la voz de los poseedores para definir la dirección de Zcash.  
- Actúa como Key-Holder Organization bajo la propuesta ZIP 1016 para la administración del Coinholder-Controlled Fund.  
- Contribuye al desarrollo del protocolo, al proceso ZIP y a la gobernanza (representación de editores ZIP).  
-> Ver perfil completo: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Sitio oficial: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Gobernanza - Cómo se toman las decisiones

La gobernanza de Zcash es una mezcla de "reglas de protocolo on-chain" y "consenso social off-chain":

1. **Proceso ZIP (Zcash Improvement Proposals)**  
   - Cualquiera puede presentar un ZIP.  
   - Debate público en foros, Discord, GitHub.  
   - Los editores ZIP (actualmente Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe a título individual, Arya de ZF y representantes de Shielded Labs) revisan y deciden su aceptación.  
   - Los ZIP aceptados se incluyen en la siguiente actualización de red.

2. **Acuerdo de marca registrada (2019-2024)**  
   - ECC donó la marca registrada de Zcash a ZF en 2019.  
   - El acuerdo originalmente requería consentimiento mutuo tanto de ECC como de ZF para cualquier actualización de red que creara un nuevo protocolo de consenso.  
   - En abril de 2024 ECC anunció su intención de rescindirlo; el aviso formal de rescisión se emitió en agosto de 2024.  
   - A partir de 2025, ZF es el único custodio de la marca registrada de Zcash y ha adoptado una nueva política de marca permisiva que refleja la descentralización del ecosistema. La marca ya no funciona como mecanismo de veto de gobernanza.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Grupo voluntario de expertos del ecosistema.  
   - Se utiliza para consultas comunitarias no vinculantes sobre decisiones importantes.

4. **Ratificación on-chain**  
   - Una vez desplegada una actualización de red, la mayoría del hash rate de la red debe adoptarla (sin riesgo de hard fork si se alcanza consenso).

5. **Dirección futura - El Lockbox y ZIP 1016**  
   - Los fondos del lockbox del 12% se están acumulando en el protocolo.  
   - ZIP 1016 propone convertir esto en un Coinholder-Controlled Fund con votación trimestral de poseedores de monedas y administración multisig por parte de las Key-Holder Organizations (actualmente se mencionan ZF y Shielded Labs).

## 4. Tabla de referencia rápida - Evolución de la financiación

| Período          | Mineros | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notas                                      |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov 2024  | 80%    | 7%            | 5%   | 8%   | -       | Fondo de desarrollo clásico                |
| nov 2024 - ahora | 80%    | 0%            | 0%   | 8%   | 12%     | Modelo NU6 + extensión de ZCG              |
| Propuesto (ZIP 1016) | 80% | 0%         | 0%   | 8%   | 12% (Coinholder-Controlled) | Hasta el 3er halving; votación de poseedores de monedas |

## 5. Recursos relacionados

- Explicación oficial de la financiación -> [sección de financiación de z.cash/network](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (cambio de financiación en NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modelo propuesto para poseedores de monedas) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portal de Zcash Community Grants -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (o el sitio actual de FPF)

## 6. Panel del Lockbox

El panel de ZecHub muestra la cantidad actual de ZEC en el Lockbox y el fondo de Coinholders [aquí](https://zechub.wiki/dashboard?tab=lockbox).
