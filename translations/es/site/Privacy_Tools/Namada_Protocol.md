[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocolo Namada

![Namada Logo](/content-images/logo-2067e2533d.webp)


## ¿Qué es Namada?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Explicación de Zcash: alianza estratégica entre Namada y Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

El protocolo Namada funciona como una plataforma de capa 1 basada en consenso [consensus] de prueba de participación, diseñada para proporcionar privacidad [privacy] intercadena independiente de los activos. Mediante el protocolo de comunicación entre blockchains (IBC), Namada se integra sin problemas con cadenas de finalidad rápida, lo que permite una interoperabilidad fluida. Además, Namada establece un puente [bridge] bidireccional sin confianza con Ethereum, facilitando una comunicación segura y fiable entre las dos redes.

Namada prioriza la privacidad mediante la implementación de una iteración mejorada del circuito Pool Blindado Multi-Activo [Multi-Asset Shielded Pool] (MASP). Esta versión mejorada permite que todo tipo de activos, incluidos tanto tokens fungibles como no fungibles, utilicen un conjunto blindado [shielded] compartido, exactamente igual que el de Zcash. Como resultado, la transferencia de activos compatibles en Namada se vuelve difícil de identificar debido al alto nivel de privacidad implicado. Asimismo, la última actualización del circuito Pool Blindado Multi-Activo permite recompensas del conjunto blindado, una característica o incentivo innovador que asigna recursos para promover la privacidad como un bien público.

## Puente de Ethereum + compatible con IBC

La integración del puente de Ethereum en Namada elimina la necesidad de un protocolo independiente, ya que se convierte en una parte integral del ecosistema de Namada. Los validadores de Namada tienen la responsabilidad de operar el puente junto con el protocolo principal de Namada. Estos validadores también actúan como retransmisores al transferir activos a Namada, lo que hace innecesaria la participación de actores adicionales. Por otro lado, al transferir activos a Ethereum, intervienen partes externas —conocidas como retransmisores—, aunque no tienen responsabilidad alguna en la validación o protección del puente.

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

El protocolo Namada también puede conectarse sin problemas con cualquier cadena de finalidad rápida que admita el protocolo de comunicación entre blockchains (IBC). En lo que respecta a la interoperabilidad con Ethereum, Namada implementa un puente de Ethereum especializado y seguro que funciona sin confianza. Este puente está cuidadosamente diseñado para priorizar la seguridad mediante la aplicación de controles de flujo para todas las conexiones del puente y el tratamiento de cualquier transferencia defectuosa de Ethereum como una infracción grave que puede dar lugar a penalizaciones de recorte.

## Recompensas del conjunto blindado

En la última actualización del protocolo [Namada](https://namada.net/blog/what-is-namada), se incentiva a los usuarios que poseen activos blindados a participar activamente en el conjunto blindado compartido. Esto es posible mediante la integración del circuito MASP actualizado, que ahora incluye el innovador circuito Convert. Al aprovechar esta nueva función, Namada anima a los usuarios a contribuir al conjunto blindado compartido manteniendo activos blindados.

En Namada, el conjunto blindado se considera un bien público no exclusivo y no rival. Esto significa que, a medida que más personas utilizan transferencias blindadas, el nivel de garantías de privacidad mejora para cada participante. El protocolo reconoce la importancia de la adopción y participación colectivas para mejorar la privacidad de todos los usuarios. Por lo tanto, al incentivar a los usuarios a mantener activos blindados y contribuir al conjunto blindado compartido, Namada fomenta un ecosistema de privacidad más sólido y robusto.

## Transacción de activos blindados

El MASP ([Multi-Asset Shielded Pool](https://docs.namada.net/users/shielded-accounts)) amplía el circuito Sapling de Zcash para admitir transferencias blindadas de activos nativos y no nativos. Compartir un pool no significa que la privacidad sea independiente del uso de un activo. La documentación de Namada explica que los activos del mismo tipo comparten un conjunto de anonimato, y que los patrones públicos de blindaje y desblindaje aún pueden revelar el origen de un activo.

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

Por ejemplo, si solo una cuenta blinda BTC y luego lo retira a la misma cuenta, esos puntos públicos de entrada y salida pueden vincularse aunque los fondos se hayan movido de forma privada dentro del MASP. Cuando más cuentas blindan BTC, un retiro posterior podría pertenecer a cualquiera de esas cuentas. Lo que importa es la participación y el patrón de transacciones; el tamaño del pool compartido por sí solo no garantiza la misma privacidad para todos los activos.

## Menos tarifas y transacciones rápidas

Namada combina dos elementos clave para ofrecer una rápida velocidad de transacción y finalidad: generación rápida de pruebas y consenso moderno tolerante a fallos bizantinos (BFT). Estas dos características permiten a Namada alcanzar una tasa de procesamiento de transacciones comparable a Visa, una conocida red de pagos reconocida por sus capacidades de alto rendimiento. La generación rápida de pruebas se refiere a la producción eficiente de pruebas criptográficas que validan la corrección e integridad de las transacciones en la blockchain. Al emplear técnicas y optimizaciones avanzadas, el protocolo Namada minimiza la sobrecarga computacional necesaria para generar estas pruebas, lo que da como resultado una verificación y confirmación rápidas de las transacciones.

Además, Namada utiliza algoritmos modernos de consenso BFT, que garantizan la integridad y el acuerdo de las transacciones en toda la red. Estos mecanismos de consenso permiten a Namada alcanzar un consenso sobre el orden y la validez de las transacciones, proporcionando una sólida garantía de finalidad. Con la finalidad, las transacciones se consideran irreversibles, lo que reduce el riesgo de doble gasto o reversión de transacciones. Namada sigue un enfoque similar al de Anoma, otro protocolo conocido por sus soluciones de escalabilidad. Namada adopta instancias fractales, que permiten la creación de cadenas anidadas dentro de la blockchain principal. Esta estructura fractal permite la escalabilidad horizontal al distribuir la carga entre múltiples instancias, mejorando la capacidad y el rendimiento generales de la red.

## Alianza estratégica entre Namada y Zcash

Según una publicación reciente que puede encontrarse en [el blog del protocolo Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), el equipo detrás del protocolo Namada se complace en presentar una propuesta y solicitud de comentarios (RFC) para una alianza estratégica entre los activos, cadenas y comunidades de Namada y Zcash.

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

La alianza propuesta abarca tres elementos principales. En primer lugar, se creará un pool de subvenciones para proporcionar financiación a proyectos que aporten ventajas tanto a Zcash como a Namada. En segundo lugar, se asignará un airdrop de tokens NAM a los titulares de ZEC. Por último, existe un plan para establecer un puente con confianza minimizada que conecte Zcash y Namada. Una vez implementado, este puente permitirá a los titulares de ZEC, denominados Zolders, utilizar sus ZEC en Namada. Además, los Zolders tendrán la oportunidad de acceder a los ecosistemas más amplios de Cosmos y Ethereum a través de Namada. Puedes obtener más información sobre la alianza estratégica en [el foro comunitario de Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Enlaces de referencia

- [Vídeo oficial del protocolo Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Sitio web oficial del protocolo Namada](https://namada.net/)
- [Blog de Namada](https://namada.net/blog)
- [Documentación de Namada](https://docs.namada.net/)
