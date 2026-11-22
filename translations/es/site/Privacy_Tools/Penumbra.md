# Penumbra 

Penumbra es una red [network] de capa 1 completamente blindada [fully shielded], de prueba de participación [proof-of-stake] y un exchange descentralizado [decentralized exchange] en el ecosistema Cosmos. Su pool blindado interchain puede contener activos de cadenas [chains] conectadas mediante IBC. Los usuarios pueden transferir, hacer staking, realizar swaps y proporcionar liquidez dentro de Penumbra sin publicar los saldos de sus cuentas individuales ni vincular esas acciones con su identidad. Esto no significa que todos los datos de la red o del DEX sean privados.

![image.png](/content-images/_unavailable.svg)

## Tecnología utilizada en Penumbra IBC 

Integración de IBC: El protocolo de Comunicación Inter-Blockchain (IBC) conecta Penumbra con otras cadenas habilitadas para IBC. Una transferencia IBC entrante blinda los fondos al ingresar a Penumbra; una transferencia saliente los desblinda al salir. La actividad en una cadena contraparte transparente [transparent] sigue siendo pública, incluida la dirección [address] de destino de un depósito entrante. El [límite de privacidad [privacy boundary] sigue el límite de IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Pruebas zero-knowledge [Zero-Knowledge Proofs] (ZKP): Penumbra utiliza pruebas zero-knowledge del lado del cliente para demostrar que las actualizaciones de estado cifrado [encrypted] son válidas sin publicar los datos privados de transacción [transaction] de un usuario. Las billeteras [Wallets] escanean y descifran localmente los datos que les son visibles; un nodo [node] público no puede simplemente devolver el saldo privado de un usuario.

![image.png](/content-images/_unavailable.svg)

Exchange descentralizado con privacidad: Penumbra incluye un DEX para intercambiar activos dentro de su pool blindado. Las salidas individuales de los swaps son privadas, mientras que los resultados de la ejecución por lotes y las posiciones de liquidez anónimas son públicos. Estas distinciones importan al describir qué oculta el exchange.

## Casos de uso

Transacciones seguras: Las transferencias dentro del pool blindado de Penumbra protegen al remitente, al receptor, la cantidad y el tipo de activo. Los usuarios pueden divulgar selectivamente su actividad a terceros autorizados. Compartir únicamente una dirección de recepción no expone los saldos de su propietario. Estas propiedades no se extienden a la actividad pública en otra cadena después de retirar los fondos.

Staking: El token nativo de staking de Penumbra es **UM**. Delegar UM a un validador devuelve tokens de delegación que representan participaciones en el pool de delegación de ese validador. El stake total en el pool de cada validador es público, mientras que las delegaciones individuales son anónimas. La desdelegación primero crea tokens de desvinculación específicos del validador, que permanecen expuestos al slashing hasta que finaliza el retraso de desvinculación. Consulta la guía oficial de [staking blindado](https://guide.penumbra.zone/overview/staking).

Swaps de tokens: Las intenciones de swap se agrupan por par de negociación y se ejecutan por lotes al final de cada bloque [block]. Esto elimina el ordenamiento dentro del bloque de las intenciones de swap como una herramienta para los traders; es un mecanismo específico, no una garantía de que no pueda existir ninguna forma de MEV. Los resultados por lotes se escriben en el estado público de la cadena, y los usuarios reclaman de forma privada su parte del resultado en el pool blindado. La guía de DEX de [](https://guide.penumbra.zone/overview/dex) describe la ejecución por lotes y el arbitraje automático del protocolo.

Creación de mercado: Los proveedores de liquidez crean posiciones anónimas de liquidez concentrada. La liquidez y las funciones de negociación de las posiciones son públicas, pero no están vinculadas con la identidad del proveedor.
