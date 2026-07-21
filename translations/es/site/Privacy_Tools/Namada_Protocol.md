[![Editar página](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Logo de Namada](https://i.ibb.co/BZcZHS1/logo.png)


## ¿Qué es Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Alianza estratégica Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol funciona como una plataforma de Capa 1 basada en consenso de prueba de participación, diseñada para proporcionar privacidad intercadena agnóstica a los activos. A través del protocolo Inter-Blockchain Communication (IBC), Namada se integra sin fricciones con cadenas de finalidad rápida, lo que permite una interoperabilidad fluida. Además, Namada establece un puente bidireccional sin confianza con Ethereum, facilitando una comunicación segura y confiable entre las dos redes.

Namada prioriza la privacidad mediante la implementación de una iteración mejorada del circuito Multi-Asset Shielded Pool (MASP). Esta versión mejorada permite que todo tipo de activos, incluidos tanto los tokens fungibles como los no fungibles, utilicen un conjunto blindado compartido exactamente igual al de Zcash. Como resultado, la acción de transferir activos compatibles en Namada se vuelve distintiva, ya que se hace difícil de identificar debido al alto nivel de privacidad involucrado. Además, la última actualización del circuito Multi Asset Shielded Pool habilita recompensas para el conjunto blindado, una función o incentivo innovador que asigna recursos para promover la privacidad como un bien público.

## Puente con Ethereum + compatible con IBC

La integración del puente de Ethereum en Namada elimina la necesidad de un protocolo independiente, ya que pasa a ser una parte integral del ecosistema de Namada. A los validadores dentro de Namada se les confía la ejecución del puente junto con el protocolo central de Namada. Estos validadores también actúan como retransmisores cuando se trata de transferir activos a Namada, por lo que la participación de actores adicionales no es necesaria. Por otro lado, al transferir activos a Ethereum, sí intervienen partes externas (conocidas como relayers), aunque no tienen responsabilidad en la validación o la seguridad del puente.

![Diagrama del puente de Ethereum](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol también tiene la capacidad de conectarse sin problemas con cualquier cadena de finalidad rápida que admita el protocolo Inter-Blockchain Communication (IBC). Cuando se trata de interoperar con Ethereum, Namada implementa un puente especializado y seguro con Ethereum que opera de manera trustless. Este puente está cuidadosamente diseñado para priorizar la seguridad mediante la aplicación de controles de flujo para todas las conexiones del puente y tratando cualquier transferencia defectuosa de Ethereum como una infracción grave que puede dar lugar a penalizaciones de slashing.

## Recompensas del conjunto blindado

En la última actualización de [Namada Protocol](https://blog.namada.net/what-is-namada/), se incentiva a los usuarios que poseen activos blindados a participar activamente en el conjunto blindado compartido. Esto es posible gracias a la integración del circuito MASP actualizado, que ahora incluye el innovador Convert Circuit. Al aprovechar esta nueva función, Namada anima a los usuarios a contribuir al conjunto blindado compartido manteniendo activos blindados.

En Namada, el conjunto blindado se considera un bien público no exclusivo y anti-rival. Esto significa que, a medida que más personas utilizan transferencias blindadas, mejora el nivel de garantías de privacidad para cada participante. El protocolo reconoce la importancia de la adopción y la participación colectivas para mejorar la privacidad de todos los usuarios. Por lo tanto, al incentivar a los usuarios a mantener activos blindados y contribuir al conjunto blindado compartido, Namada fomenta un ecosistema de privacidad más fuerte y robusto.

## Transacción de activos blindados

Cuando se trata de transferencias blindadas, ya sea que involucren un token no fungible (NFT) de Ethereum, ATOM o NAM, son indistinguibles entre sí. Esto significa que las funciones de preservación de la privacidad proporcionadas por el MASP (Modified Accumulator Sapling Protocol), una versión mejorada del circuito Sapling de Zcash, se aplican de manera uniforme a todo tipo de activos. El circuito MASP permite que todos los activos dentro del ecosistema de Namada compartan el mismo conjunto blindado. Este enfoque garantiza que las garantías de privacidad no se fragmenten entre activos individuales. Independientemente del volumen de transacciones asociado a un activo en particular, la protección de la privacidad se mantiene constante e independiente.

![Diagrama de transacción de activos blindados](https://i.ibb.co/7CDmWk6/image-1.png)

Al unificar el conjunto blindado entre diferentes activos, Namada garantiza que la privacidad se mantenga de manera uniforme, independientemente del tipo específico de activo involucrado en una transferencia blindada. Este enfoque promueve un marco de privacidad cohesivo dentro del protocolo y mejora la confidencialidad de las transacciones que involucran NFT de Ethereum, ATOM, NAM y otros activos compatibles. Namada también permite la transferencia privada de tokens fungibles y no fungibles utilizando novedosos zk-SNARKs, garantizando la confidencialidad de los tokens nativos y no nativos tal como se hace en Zcash.

## Menores comisiones y transacciones rápidas

Namada combina dos elementos clave para ofrecer alta velocidad de transacción y finalidad: generación rápida de pruebas y consenso moderno Byzantine Fault Tolerant (BFT). Estas dos características permiten a Namada alcanzar una tasa de procesamiento de transacciones comparable a la de Visa, una red de pagos bien conocida y reconocida por su alta capacidad de procesamiento. La generación rápida de pruebas se refiere a la producción eficiente de pruebas criptográficas que validan la corrección e integridad de las transacciones en la Blockchain. Al emplear técnicas avanzadas y optimizaciones, Namada Protocol minimiza la sobrecarga computacional necesaria para generar estas pruebas, lo que da como resultado una verificación y confirmación rápidas de las transacciones.

Además, Namada utiliza algoritmos modernos de consenso BFT, que garantizan la integridad y el acuerdo de las transacciones en toda la red. Estos mecanismos de consenso permiten a Namada alcanzar consenso sobre el orden y la validez de las transacciones, proporcionando una sólida garantía de finalidad. Con la finalidad, las transacciones se consideran irreversibles, lo que reduce el riesgo de doble gasto o reversión de transacciones. Namada sigue un enfoque similar al de Anoma, otro protocolo conocido por sus soluciones de escalabilidad. Namada adopta instancias fractales, que permiten la creación de cadenas anidadas dentro de la blockchain principal. Esta estructura fractal permite el escalado horizontal al distribuir la carga entre múltiples instancias, mejorando la capacidad y el rendimiento generales de la red.

## Alianza estratégica entre Namada y Zcash

Según una publicación reciente que puede encontrarse en el [blog de Namada Protocol](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), el equipo detrás de Namada Protocol se complace en presentar una propuesta y solicitud de comentarios (RFC) para una alianza estratégica entre los activos, cadenas y comunidades de Namada y Zcash.

![Diagrama de la alianza estratégica Namada-Zcash](https://i.ibb.co/FqsmkMb/image-2.png)

La alianza propuesta abarca tres elementos principales. En primer lugar, se creará un fondo de subvenciones para proporcionar financiación a proyectos que aporten ventajas tanto a Zcash como a Namada. En segundo lugar, se asignará un airdrop de tokens NAM a los poseedores de ZEC. Por último, existe un plan para establecer un puente con confianza minimizada que conecte Zcash y Namada. Una vez implementado, este puente permitirá a los poseedores de ZEC, denominados Zolders, utilizar sus ZEC en Namada. Además, los Zolders tendrán la oportunidad de acceder a los ecosistemas más amplios de Cosmos y Ethereum a través de Namada. Puedes obtener más información sobre la alianza estratégica en el [foro de la comunidad de Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Enlaces de referencia

- [Video oficial de Namada Protocol](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Sitio web oficial de Namada Protocol](https://namada.net/)
- [Blog de Namada](https://blog.namada.net/)
- [Documentación de Namada](https://docs.namada.net/)
