# Zcash Testnet

## ¿Qué Es la Testnet de Zcash?

La **Testnet de Zcash** es una blockchain paralela a la red principal [main network] (Mainnet) real de Zcash que replica el protocolo, las reglas y la lógica de transacciones [transactions] exactos, pero con dos diferencias clave:

1. **Las monedas no tienen valor monetario real**: se llaman **TAZ**, no ZEC, y se utilizan únicamente para pruebas.  
2. **Las actualizaciones de red [network upgrades], las herramientas [tools] y el software se prueban primero aquí** antes de implementarse en la blockchain real de Zcash.  

En otras palabras, la Testnet es como un **sandbox o entorno experimental** donde desarrolladores, auditores y creadores pueden probar ideas sin arriesgar dinero real.


## ¿Por Qué Existe la Testnet?

La Testnet es crucial para el desarrollo de blockchain porque **las blockchains reales como Zcash son inmutables**: una vez que las transacciones se confirman en la red principal, no pueden deshacerse. La Testnet ofrece una **réplica segura** para experimentar, probar y depurar funcionalidades antes de implementarlas en Mainnet.

### Usos de la Testnet

#### 1. Desarrollo e Integración de Software

Los desarrolladores que crean billeteras [wallets], exchanges, software de minado [mining] o herramientas de privacidad [privacy] pueden probarlos de forma segura en la Testnet. Las capacidades incluyen:

- Enviar y recibir transacciones  
- Minar nuevos bloques [blocks] con monedas TAZ sin valor  
- Crear interfaces de usuario y API  
- Probar funcionalidades de privacidad de las transacciones (transparente [transparent] frente a blindado [shielded])  

**Ejemplo:**  
Herramientas como [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) utilizan la Testnet para generar transacciones y probar las funcionalidades de activos blindados de Zcash.  

**Escenario real:**  
Un desarrollador de billeteras puede conectar el software a un endpoint RPC de Testnet y simular el ciclo de vida completo: crear direcciones [addresses], enviar transacciones blindadas y validar saldos antes de entrar en funcionamiento en Mainnet.

#### 2. Prueba de Actualizaciones de Red

Zcash actualiza periódicamente su protocolo central (p. ej., NU6.1, NU6.2 y Ironwood). La Testnet activa las nuevas actualizaciones **antes que Mainnet**, lo que permite a los desarrolladores y a la comunidad identificar y corregir errores.

**Ejemplo:**  
Una nueva regla de consenso [consensus] o tipo de transacción se implementa primero en la Testnet. Tras realizar pruebas exitosas, se activa en Mainnet a una altura de bloque predeterminada.

#### 3. Prueba de Implementaciones de Nodos

El nodo mantenido de Zcash es **Zebra** (el nodo basado en Rust mantenido por Zcash Foundation) y la billetera mantenida es [Zallet](https://github.com/zcash/zallet). `zcashd`, la implementación original del nodo, alcanzó su detención automática de fin de soporte el 18 de julio de 2026 y ya no recibe mantenimiento; consulta la guía de migración de [zcashd a Zebra y Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). La Testnet permite probar nodos en condiciones reales sin riesgo financiero.

Los desarrolladores de nodos pueden:

- Validar la propagación de bloques  
- Probar interfaces RPC  
- Observar el comportamiento de los nodos bajo carga  
- Probar las interacciones del software de minado  

#### 4. Aprendizaje y Educación

Los principiantes pueden aprender funcionalidades de Zcash como el minado, la creación de transacciones blindadas y el uso de direcciones unificadas.  
Los tutoriales y la documentación de la comunidad proporcionan acceso a **faucets, exploradores y guías de Testnet**.


## Casos de Uso Reales de la Testnet

### 1. Pruebas de Desarrollador (Billetera / Aplicación)

- Conectarse a la Testnet de Zcash  
- Solicitar TAZ a un faucet  
- Enviar transacciones blindadas  
- Verificar la privacidad y la estabilidad de la interfaz de usuario  

No se pierde ningún ZEC real, incluso si se producen errores.

### 2. Pruebas de Integración de Exchanges

- Ejecutar un nodo de Testnet  
- Utilizar endpoints JSON-RPC de Zebrad para procesar transacciones  
- Probar la lógica automatizada de depósitos/retiros  

Garantiza código de producción seguro y evita pérdidas financieras.

### 3. Pruebas de Configuración de Minado

- Utilizar plantillas de minado  
- Probar la validación de bloques  
- Observar las recompensas de minado (solo TAZ)  
- Ajustar el rendimiento del minado  

Evita tiempos de inactividad o pérdidas de ganancias al pasar a Mainnet.

### 4. Investigación Académica / de Protocolo

Los investigadores pueden probar innovaciones como la **verificación sin estado**, la **optimización de pruebas zero-knowledge** u otros experimentos de protocolo mediante la Testnet.  
Los usuarios avanzados también pueden ejecutar **Testnets personalizadas o entornos regtest** para experimentos especializados.


## Diferencias Clave Entre Mainnet y Testnet

| Funcionalidad               | Mainnet           | Testnet                  |
|-----------------------------|-----------------|--------------------------|
| Valor de las monedas        | ZEC real         | TAZ (sin valor monetario)  |
| Riesgo                      | Riesgo financiero | Seguro para pruebas         |
| Actualizaciones de protocolo| Producción       | Activación temprana         |
| Recompensas de minado       | Emisión real     | Solo recompensa de prueba   |
| Utilidad de la red          | Transacciones activas| Pruebas y desarrollo  |

## Ideas Erróneas Comunes

- **Las monedas de Testnet valen algo** -> Falso, los TAZ tienen valor cero.  
- **Importa perder monedas de Testnet** -> Falso, no se pierde ningún valor real.  
- **La Testnet y Mainnet son idénticas** -> Falso, la Testnet se reinicia con frecuencia y no está protegida económicamente como Mainnet.

---

## ¿Qué Es TAZ?

**TAZ** es la versión de Testnet de las monedas de Zcash:  

- No es dinero real; no puede intercambiarse por ZEC ni moneda fiat  
- Se utiliza para pruebas, desarrollo y aprendizaje  
- Sigue todas las reglas de Zcash: puede enviarse, minarse y utilizarse en direcciones blindadas  

**Ejemplo:**  
Un desarrollador puede enviar 100 TAZ desde una dirección de Testnet a otra para probar una función de billetera sin arriesgar ZEC reales.  

Considera TAZ como **«dinero de juego» para la Testnet de Zcash**.


## ¿Qué Son los Faucets?

Un **faucet** es un servicio que entrega monedas TAZ gratuitas para realizar pruebas:

- Normalmente son sitios web o API  
- Los usuarios proporcionan una dirección de Testnet; el faucet envía una pequeña cantidad de TAZ  
- Evita la necesidad de minar TAZ manualmente  

**Ejemplo:**  
1. Visita un faucet de Testnet (p. ej., [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Introduce tu dirección de Testnet  
3. Solicita TAZ  
4. Recibe TAZ al instante para comenzar las pruebas  

**Por qué importa:**  
- Pruebas seguras sin arriesgar ZEC  
- Accesibilidad para principiantes y desarrolladores  
- Creación rápida de prototipos para billeteras, exchanges y aplicaciones



## Billeteras de Zkool y Zingo!

### Zkool

- Billetera multicuenta para usuarios avanzados de Zcash  
- Admite frases semilla [seed phrases], claves de visualización [viewing keys] y direcciones transparentes y blindadas  
- Puede conectarse a Mainnet, Testnet o Regtest mediante nodos completos o servidores lightwallet

### Zingo!

- Billetera móvil centrada en la privacidad y la simplicidad  
- Admite direcciones blindadas y unificadas  
- Actualizada para admitir protocolos de Testnet (incluida la Testnet de NU6)

## Habilitar la Testnet en las Billeteras

### Billetera Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Consejos:**  
- La billetera puede reiniciarse al cambiar de red  
- Las cuentas de ZEC de Mainnet no se ven afectadas  
- Utiliza un servidor lightwallet de Testnet si se te solicita

### Billetera Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Una vez habilitada, las billeteras pueden enviar y recibir TAZ, probar transacciones blindadas y experimentar de forma segura.


## Después de Habilitar la Testnet

- Las transacciones se comportan como en Mainnet, pero con **TAZ sin valor**  
- Se pueden probar transacciones blindadas, múltiples direcciones y funcionalidades de privacidad  
- Los desarrolladores pueden depurar y probar funcionalidades sin arriesgar ZEC reales


## Resumen Rápido

- La **Testnet de Zcash** es un entorno sandbox seguro para crear, probar y experimentar  
- Casos de uso: pruebas de desarrollador, pruebas de nodos, integración de exchanges, investigación y educación  
- Se utilizan monedas **TAZ** en lugar de ZEC y no tienen valor real  
- La Testnet es esencial antes de implementar funcionalidades en Mainnet
