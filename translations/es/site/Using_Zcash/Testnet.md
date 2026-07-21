# Zcash Testnet

## ¿Qué es Zcash Testnet?

**Zcash Testnet** es una blockchain paralela a la red principal real de Zcash (Mainnet) que replica el protocolo, las reglas y la lógica de transacciones exactos, pero con dos diferencias clave:

1. **Las monedas no tienen valor monetario real**: se llaman **TAZ**, no ZEC, y se usan solo para pruebas.  
2. **Las actualizaciones de red, las herramientas y el software se prueban aquí primero** antes de desplegarse en la blockchain real de Zcash.  

En otras palabras, Testnet es como un **entorno aislado o experimental** donde desarrolladores, auditores y creadores pueden probar ideas sin arriesgar dinero real.


## ¿Por qué existe Testnet?

Testnet es crucial para el desarrollo blockchain porque **las blockchains reales como Zcash son inmutables**: una vez que las transacciones se confirman en la red principal, no se pueden deshacer. Testnet proporciona una **réplica segura** para experimentar, probar y depurar funcionalidades antes de desplegarlas en Mainnet.

### Usos de Testnet

#### 1. Desarrollo de software e integración

Los desarrolladores que crean billeteras, exchanges, software de minería o herramientas de privacidad pueden probarlos de forma segura en Testnet. Sus capacidades incluyen:

- Enviar y recibir transacciones  
- Minar nuevos bloques con monedas TAZ sin valor  
- Construir interfaces de usuario y APIs  
- Probar funciones de privacidad de las transacciones (transparentes vs blindadas)  

**Ejemplo:**  
Herramientas como [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) usan Testnet para generar transacciones y probar funcionalidades de activos blindados de Zcash.  

**Caso real:**  
Un desarrollador de billeteras puede conectar el software a un endpoint RPC de Testnet y simular el ciclo de vida completo: crear direcciones, enviar transacciones blindadas y validar saldos, antes de salir en producción en Mainnet.

#### 2. Pruebas de actualizaciones de red

Zcash actualiza su protocolo central periódicamente (por ejemplo, Nu5, Nu6). Testnet activa las nuevas actualizaciones **antes que Mainnet**, lo que permite a los desarrolladores y a la comunidad identificar y corregir errores.

**Ejemplo:**  
Una nueva regla de consenso o un nuevo tipo de transacción se implementa primero en Testnet. Tras una prueba exitosa, se activa en Mainnet a una altura de bloque predeterminada.

#### 3. Pruebas de implementaciones de nodos

Zcash admite múltiples implementaciones de software de nodos: `zcashd` y **Zebra** (nodo basado en Rust mantenido por la Zcash Foundation). Testnet permite probar nodos en condiciones reales sin riesgo financiero.  

Los desarrolladores de nodos pueden:

- Validar la propagación de bloques  
- Probar interfaces RPC  
- Observar el comportamiento del nodo bajo carga  
- Probar interacciones con software de minería  

#### 4. Aprendizaje y educación

Los principiantes pueden aprender funciones de Zcash como la minería, la creación de transacciones blindadas y el uso de Unified Addresses.  
Los tutoriales y la documentación de la comunidad ofrecen acceso a **faucets, exploradores y guías de Testnet**.


## Casos de uso reales de Testnet

### 1. Pruebas de desarrolladores (Wallet / App)

- Conectarse a Zcash Testnet  
- Solicitar TAZ a un faucet  
- Enviar transacciones blindadas  
- Verificar la privacidad y la estabilidad de la interfaz  

No se pierde ZEC real aunque ocurran errores.

### 2. Pruebas de integración con exchanges

- Ejecutar un nodo de Testnet  
- Usar endpoints JSON-RPC de Zebrad para procesar transacciones  
- Probar la lógica automatizada de depósito/retiro  

Garantiza código de producción seguro y evita pérdidas financieras.

### 3. Pruebas de configuración de minería

- Usar plantillas de minería  
- Probar la validación de bloques  
- Observar recompensas de minería (solo TAZ)  
- Ajustar el rendimiento de minería  

Evita tiempo de inactividad o pérdida de ingresos al pasar a Mainnet.

### 4. Investigación académica / del protocolo

Los investigadores pueden probar innovaciones como la **verificación sin estado**, la **optimización de pruebas de conocimiento cero** u otros experimentos de protocolo usando Testnet.  
Los usuarios avanzados también pueden ejecutar **Testnets personalizadas o entornos regtest** para experimentos especializados.


## Diferencias clave entre Mainnet y Testnet

| Característica        | Mainnet          | Testnet                  |
|-----------------------|------------------|--------------------------|
| Valor de las monedas  | ZEC real         | TAZ (sin valor monetario) |
| Riesgo                | Riesgo financiero | Seguro para pruebas      |
| Actualizaciones del protocolo | Producción       | Activación temprana      |
| Recompensas de minería | Emisión real     | Solo recompensa de prueba |
| Utilidad de la red    | Transacciones en vivo | Pruebas y desarrollo  |

## Ideas erróneas comunes

- **Las monedas de Testnet valen algo** -> Falso, TAZ tiene valor cero.  
- **Perder monedas de Testnet importa** -> Falso, no se pierde ningún valor real.  
- **Testnet y Mainnet son idénticas** -> Falso, Testnet se reinicia con frecuencia y no está asegurada económicamente como Mainnet.

---

## ¿Qué es TAZ?

**TAZ** es la versión de Testnet de las monedas de Zcash:  

- No es dinero real; no se puede intercambiar por ZEC ni por moneda fiat  
- Se usa para pruebas, desarrollo y aprendizaje  
- Sigue todas las reglas de Zcash: puede enviarse, minarse y usarse en direcciones blindadas  

**Ejemplo:**  
Un desarrollador puede enviar 100 TAZ desde una dirección de Testnet a otra para probar una función de una billetera sin arriesgar ZEC real.  

Piensa en TAZ como **"dinero de juguete" para Zcash Testnet**.


## ¿Qué son los faucets?

Un **faucet** es un servicio que entrega monedas TAZ gratis para pruebas:

- Normalmente son sitios web o APIs  
- Los usuarios proporcionan una dirección de Testnet; el faucet envía una pequeña cantidad de TAZ  
- Evita la necesidad de minar TAZ manualmente  

**Ejemplo:**  
1. Visita un faucet de Testnet (por ejemplo, [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/))  
2. Introduce tu dirección de Testnet  
3. Solicita TAZ  
4. Recibe TAZ al instante para comenzar a probar  

**Por qué importa:**  
- Pruebas seguras sin arriesgar ZEC  
- Accesibilidad para principiantes y desarrolladores  
- Prototipado rápido para billeteras, exchanges y apps



## Zkool y Zingo! Wallets

### Zkool

- Billetera multicuenta para usuarios avanzados de Zcash  
- Admite frases semilla, viewing keys, direcciones transparentes y blindadas  
- Puede conectarse a Mainnet, Testnet o Regtest mediante nodos completos o servidores lightwallet

### Zingo!

- Billetera móvil centrada en la privacidad y la simplicidad  
- Admite direcciones blindadas y unificadas  
- Actualizada para admitir protocolos de Testnet (incluido NU6 Testnet)

## Activación de Testnet en las billeteras

### Zkool Wallet

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
- Las cuentas ZEC de Mainnet no se ven afectadas  
- Usa un servidor lightwallet de Testnet si se te solicita

### Zingo! Wallet

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


Una vez activado, las billeteras pueden enviar y recibir TAZ, probar transacciones blindadas y experimentar de forma segura.


## Después de activar Testnet

- Las transacciones se comportan como en Mainnet pero con **TAZ sin valor**  
- Se pueden probar transacciones blindadas, múltiples direcciones y funciones de privacidad  
- Los desarrolladores pueden depurar y probar funciones sin arriesgar ZEC real


## Resumen rápido

- **Zcash Testnet** es un entorno sandbox seguro para construir, probar y experimentar  
- Casos de uso: pruebas de desarrolladores, pruebas de nodos, integración con exchanges, investigación y educación  
- Se usan **monedas TAZ** en lugar de ZEC y no tienen valor real  
- Testnet es esencial antes de desplegar funciones en vivo en Mainnet
