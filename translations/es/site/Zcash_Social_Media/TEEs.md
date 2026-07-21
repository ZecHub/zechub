# De cero a conocimiento cero: Entornos de Ejecución Confiables (TEEs)

**Serie:** De cero a conocimiento cero

¡De cero a conocimiento cero está de vuelta con un nuevo tema!  
Esta semana exploramos los **Entornos de Ejecución Confiables (TEEs)** - cómo se utilizan en las monedas de privacidad y otras aplicaciones de blockchain.

![Introducción a los Entornos de Ejecución Confiables](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs y blockchains: propiedades complementarias

Las blockchains y los TEEs tienen fortalezas muy complementarias:

- **Las blockchains** garantizan disponibilidad, persistencia del estado y permiten la verificación pública de todo el estado - pero tienen una capacidad de cómputo limitada.  
- **Los TEEs** pueden realizar tareas computacionales intensivas de forma privada - pero carecen de persistencia de estado nativa.

Juntos pueden crear potentes sistemas que preservan la privacidad.

---

## Secret Network: privacidad impulsada por TEE

**Secret Network** aprovecha la tecnología TEE (específicamente Intel SGX) para realizar cómputo sobre entradas, salidas y estado cifrados.

Cada nodo validador ejecuta chips Intel SGX. Las capas de consenso y cómputo están combinadas:

- Las transacciones se procesan dentro de enclaves seguros.  
- Los datos solo se descifran **dentro del TEE**.

Esto es diferente de Zcash, que usa **pruebas de conocimiento cero** para la privacidad. En Zcash, las transacciones blindadas se difunden y validan públicamente sin que se revele ningún dato adicional a la red. Los Shielded Assets de Zcash siguen el mismo principio.

![Diagrama TEE de Secret Network](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Para una explicación detallada de cómo se implementan los TEEs en Secret Network, lee este excelente artículo de @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Cómo Secret Network protege las claves y el estado

- La **semilla de cifrado de consenso** de la red se almacena dentro del TEE de cada validador.  
- Los contratos usan claves de cifrado únicas e imposibles de falsificar.  
- Los contratos secretos se ejecutan en el módulo de cómputo de Cosmos SDK, pero admiten entradas/salidas y estado cifrados.

---

## Atestación remota

La **Atestación remota** es el proceso de demostrar que un enclave se está ejecutando en un entorno de hardware seguro genuino.

Permite a una parte remota verificar:
- Que la aplicación correcta se está ejecutando  
- Que la aplicación no ha sido manipulada  
- Que se está ejecutando de forma segura dentro de un enclave Intel SGX

![Explicación de la atestación remota](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Los enclaves también contienen claves privadas de firma y atestación a las que no se puede acceder desde el exterior.

![Protección de claves del enclave](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Sellado de datos

Dado que los enclaves no tienen estado, a veces los datos deben almacenarse fuera, en memoria no confiable.  

El **Sellado de datos** cifra los datos dentro del enclave usando una clave derivada de la CPU. El bloque cifrado solo puede desellarse en el **mismo sistema**.

![Diagrama de sellado de datos](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** también usa TEEs a través de su ParaTime confidencial (por ejemplo, Sapphire y Cipher).

Los datos cifrados entran en el TEE junto con el contrato inteligente. Se descifran, se procesan y se vuelven a cifrar antes de salir del enclave.

![Flujo TEE de Oasis Network](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs en redes Proof-of-Stake

Muchas blockchains Proof-of-Stake (incluyendo Secret y Oasis) usan **Tendermint** como su marco de consenso.

Para los validadores PoS:
- Las claves deben gestionarse de forma segura y nunca exponerse en texto plano.  
- Los validadores deben permanecer en línea (se aplican penalizaciones por inactividad).  
- Firmar mensajes en conflicto puede llevar a slashing.

Los **TEEs** son ideales para generar y usar de forma segura las claves de los validadores.

![Seguridad de Tendermint y PoS](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash y la investigación sobre Proof-of-Stake

Zcash está investigando activamente una migración a Proof-of-Stake.

- Lee la investigación: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Mira este segmento de una Community Call de Zcash Foundation que explica diferentes diseños de PoS y sus implicaciones para la privacidad:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="Diseños de PoS"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Esta página fue compilada a partir del hilo original de De cero a conocimiento cero para la wiki de ZecHub.*
