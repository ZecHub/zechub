# Zero to Zero Knowledge: Entornos de Ejecución de Confianza [Trusted Execution Environments] (TEEs)

**Serie:** Zero to Zero Knowledge

Zero to Zero Knowledge ¡Vuelve con un nuevo tema!  
Esta semana exploramos los **Entornos de Ejecución de Confianza (TEEs)**: cómo se utilizan en monedas de privacidad [privacy] y otras aplicaciones de blockchain [blockchain].

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs y blockchains: Propiedades complementarias

Las blockchains y los TEEs tienen fortalezas muy complementarias:

- Las **blockchains** garantizan la disponibilidad, la persistencia del estado y permiten la verificación pública de todo el estado, pero tienen una capacidad de cálculo limitada.  
- Los **TEEs** pueden realizar tareas computacionales intensivas de forma privada, pero carecen de persistencia de estado nativa.

Juntos pueden crear potentes sistemas que preservan la privacidad.

---

## Secret Network: Privacidad impulsada por TEE

**Secret Network** aprovecha la tecnología TEE (específicamente Intel SGX) para realizar cálculos sobre entradas, salidas y estado cifrados [encrypted].

Cada nodo validador [validator node] ejecuta chips Intel SGX. Las capas de consenso [consensus] y cálculo se combinan:

- Las transacciones se procesan dentro de enclaves seguros.  
- Los datos solo se descifran **dentro del TEE**.

Esto es diferente de Zcash, que utiliza **pruebas zero-knowledge [zero-knowledge proofs]** para la privacidad. En Zcash, las transacciones blindadas [shielded transactions] se transmiten y validan públicamente sin revelar datos adicionales a la red. Los activos blindados [Shielded Assets] de Zcash siguen el mismo principio.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Para obtener una explicación detallada de cómo se implementan los TEEs en Secret Network, lee este excelente artículo de @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Cómo Secret Network protege las claves y el estado

- La **semilla de cifrado de consenso** de la red se almacena dentro del TEE de cada validador.  
- Los contratos utilizan claves de cifrado únicas e imposibles de falsificar.  
- Los contratos secretos se ejecutan en el módulo de cálculo del SDK de Cosmos, pero admiten entradas, salidas y estado cifrados.

---

## Atestación remota [Remote Attestation]

La **atestación remota** es el proceso de demostrar que un enclave se ejecuta en un entorno de hardware seguro genuino.

Permite que una parte remota verifique:
- Que se está ejecutando la aplicación correcta  
- Que la aplicación no ha sido manipulada  
- Que se está ejecutando de forma segura dentro de un enclave Intel SGX

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Los enclaves también contienen claves privadas de firma y atestación a las que no se puede acceder desde el exterior.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Sellado de datos [Data Sealing]

Dado que los enclaves no tienen estado, a veces los datos deben almacenarse fuera, en memoria no confiable.  

El **sellado de datos** cifra los datos dentro del enclave utilizando una clave derivada de la CPU. El bloque cifrado solo puede descifrarse en el **mismo sistema**.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** también utiliza TEEs mediante su ParaTime confidencial (por ejemplo, Sapphire y Cipher).

Los datos cifrados entran en el TEE junto con el contrato inteligente [smart contract]. Se descifran, procesan y vuelven a cifrarse antes de salir del enclave.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs en redes Proof-of-Stake

Muchas blockchains Proof-of-Stake (incluidas Secret y Oasis) utilizan **Tendermint** como su marco de consenso.

Para los validadores de PoS:
- Las claves deben gestionarse de forma segura y nunca exponerse en texto sin cifrar [plaintext].  
- Los validadores deben permanecer en línea (se aplican penalizaciones por inactividad).  
- Firmar mensajes contradictorios puede llevar al slashing.

Los **TEEs** son ideales para generar y utilizar de forma segura las claves de los validadores.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash e investigación sobre Proof-of-Stake

Zcash está investigando activamente una migración a Proof-of-Stake.

- Lee la investigación: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Mira este segmento de una llamada comunitaria de Zcash Foundation que explica diferentes diseños de PoS y sus implicaciones para la privacidad:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Hilo original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Esta página fue recopilada a partir del hilo original de Zero to Zero Knowledge para la wiki de ZecHub.*
