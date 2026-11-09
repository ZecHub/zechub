<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Votación blindada [Shielded] de tenedores de monedas

> En agosto de 2026, Zcash realizó una encuesta de tenedores de monedas en la que las papeletas permanecieron cifradas y solo se revelaron los totales finales, mediante un protocolo de votación blindada creado por Valar Group.

Lo que aprenderás: cómo un voto puede ponderarse según la cantidad de ZEC que poseas, mantenerse privado y aun así contabilizarse correctamente, sin que nadie descubra cómo votaste ni cuánto posees.

La votación blindada de tenedores de monedas permite a los titulares de Zcash votar sobre cuestiones del ecosistema utilizando sus ZEC blindados. Nadie sabe qué votó cada persona ni cuánto ZEC posee, pero cualquiera puede auditar que los totales sean correctos. Funciona en una red [chain] de votación dedicada creada por Valar Group, separada de la red principal de Zcash, por lo que tus fondos reales nunca se mueven. Para saber cómo Zcash toma decisiones de forma más amplia, consulta la descripción general de [Zcash Financiamiento y Gobernanza](../zcash-community/zcash-governance). Esta página trata únicamente sobre el protocolo criptográfico de votación.

¿Eres nuevo en Zcash? Empieza con [Qué es ZEC y Zcash](../start-here/what-is-zec-and-zcash), [Pools blindados](../using-zcash/shielded-pools) y [zk-SNARKs](../zcash-tech/zk-snarks); luego vuelve aquí.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Por qué la votación privada es difícil

Una buena votación de tenedores de monedas busca cuatro cosas a la vez, y las formas obvias de conseguirlas entran en conflicto entre sí.

1. Ponderación por participación, de modo que poseer más ZEC tenga más peso.
2. Privacidad de la elección, para que nadie sepa cómo votaste.
3. Privacidad del saldo, para que nadie sepa cuánto ZEC posees.
4. Un recuento correcto y auditable que cualquiera pueda verificar.

Para ponderar por participación, parece necesario conocer el saldo de todos. Para contar las papeletas, parece necesario abrirlas. Hacer cualquiera de las dos cosas de manera ingenua filtra precisamente la información privada que un [pool blindado](../using-zcash/shielded-pools) existe para proteger, y las votaciones de monedas anteriores filtraron información de saldos por esta razón. La votación blindada resuelve esta tensión con las mismas herramientas que impulsan los pagos blindados: [pruebas zero-knowledge](../zcash-tech/zk-snarks), anuladores y cifrado.

## La intuición: una urna que se cuenta sola

> Un turnstile permite contar lo que pasa por la bóveda de un banco sin mirar dentro. Una urna blindada va un paso más allá: suma votos sellados sin abrirlos jamás.

Imagina una urna con tres capacidades inusuales. Puede añadir un sobre sellado a un total acumulado sin abrirlo. Un grupo de funcionarios, sin que ninguno posea la clave, revela más tarde solo los totales finales. Y, antes de que puedas depositar un sobre, demuestras discretamente que poseías ZEC en un momento pasado fijo y que aún no habías votado, sin mostrar cuáles monedas son tuyas. Todo lo que sigue explica cómo se construye realmente esa urna.

## Elegibilidad y la instantánea

Una ronda de votación fija una altura de instantánea, un único bloque de la red principal de Zcash, y tu peso es tu saldo blindado disponible en el pool [Ironwood](../zcash-tech/ironwood) en ese bloque. La regla es sencilla: un Ironwood ZEC en la instantánea equivale a un voto. Para la encuesta de alcance de NU7, la instantánea fue el bloque 3.459.350 de la red principal, aproximadamente el 24 de agosto de 2026 a las 19:00 UTC, con la votación abierta hasta el 14 de septiembre de 2026 a las 19:00 UTC. El ZEC transparente se gestiona por separado mediante el método anterior, no mediante este protocolo.

1. Tus fondos nunca se mueven ni quedan bloqueados. La elegibilidad se fija en la instantánea, por lo que puedes gastar o mover ZEC inmediatamente después sin afectar tu voto.
2. No hay un paso de registro. Una altura de instantánea es todo lo necesario, lo que mantiene el proceso ligero y evita revelar quién tiene intención de votar.

## Demostrar tu saldo sin revelarlo

Cuando votas, tu billetera [wallet] produce una prueba zero-knowledge de que, en la instantánea, controlabas algún ZEC blindado sin gastar. Establece un saldo válido y su tamaño para el mecanismo privado de recuento, pero no revela notas ni produce una transacción en la red principal de Zcash.

Esa prueba acuña un crédito de votación en la red de votación igual a tu saldo de la instantánea, propiedad de una nueva clave de votación que tu billetera genera solo para esta ronda. Como la clave es nueva y no está conectada a tus direcciones de Zcash, nada en la red de votación puede rastrearse hasta tus notas reales. Tu identidad on-chain y tu papeleta son invinculables por diseño.

## Prevenir la doble votación de forma privada

Para impedir que alguien vote dos veces con las mismas monedas, el sistema debe confirmar que las notas detrás de tu saldo no se habían gastado en la instantánea. En la red principal, esto se hace revelando el anulador de una nota, su marcador único de gasto, que los nodos completos comprueban para detectar reutilizaciones. Pero revelar aquí tu anulador vincularía directamente tu papeleta con tus notas.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Por ello, el protocolo demuestra lo contrario de forma privada. Construye una lista de cada anulador ya utilizado en la instantánea, y tu billetera demuestra en zero knowledge que el anulador de tu nota no está en esa lista, mostrando que la nota no se había gastado sin revelar cuál es.

Queda un problema. Obtener del servidor la porción necesaria de esa lista revelaría tu anulador al servidor, y la lista completa es grande, aproximadamente 2 GB para datos de la era de Orchard y mucho mayor a medida que Zcash crece. [Recuperación Privada de Información](../zcash-tech/private-information-retrieval) (PIR) resuelve ambos problemas: tu billetera obtiene exactamente los datos que necesita mientras oculta criptográficamente cuáles solicitó. El resultado se comprueba frente a un resumen publicado de la lista de anuladores, por lo que un servidor deshonesto no puede falsificar un resultado falso.

## Emitir una papeleta cifrada

Para cada pregunta, tu billetera realiza tres cosas.

1. Cifra el peso de tu voto para el comité de recuento mediante cifrado homomórfico, un tipo de cifrado cuyos textos cifrados pueden sumarse sin descifrarse. Esto es lo que permite a la urna totalizar votos que no puede leer.
2. Divide tu voto en 16 participaciones separadas, de modo que incluso un comité totalmente confabulado tendría dificultades para reconstruir cuánto votó cada persona.
3. Envía esas participaciones en momentos aleatorizados a través de varios servidores, para que un observador no pueda saber por cuándo llegan que pertenecen al mismo votante.

Cada participación lleva su propia prueba zero-knowledge de que es una parte legítima de una papeleta válida, por lo que nadie puede añadir votos sin respaldo. Las participaciones verificadas se suman homomórficamente al total acumulado cifrado de la respuesta que elegiste.

## Contar sin abrir ninguna papeleta

El recuento lo realiza una autoridad electoral distribuida: al menos 10 validadores de la red de votación, ninguno de los cuales puede descifrar nada por sí solo. Al inicio de una ronda, ejecutan conjuntamente una ceremonia de generación de claves que produce una clave de cifrado cuya clave de descifrado correspondiente se divide entre todos ellos y nunca se ensambla en un único lugar.

> Ningún funcionario individual posee la clave. La urna solo se abre cuando dos tercios de ellos usan sus claves juntos, e incluso entonces revela únicamente los totales.

Cuando la ronda se cierra, los totales cifrados ya existen gracias a la suma homomórfica anterior. Cada validador publica un descifrado parcial junto con una prueba de que descifró correctamente. Cuando al menos dos tercios han contribuido, sus partes se combinan en el recuento final en texto claro para cada pregunta, y nunca se descifra nada más. Entonces, cualquier nodo completo puede comprobar la prueba combinada de corrección, de modo que el público puede verificar el recuento sin confiar en los validadores.

## Quién lo gestiona y qué no puede hacer

El diseño separa dos funciones para que ningún grupo tenga demasiado poder.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

La multifirma del coordinador es un grupo de 2 de 5 con representantes de Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) y Valar Group. Decide qué preguntas llegan a la red y certifica la clave de cifrado de cada ronda, pero no puede ver, alterar ni bloquear votos individuales. Cualquiera que no esté de acuerdo con las preguntas puede ejecutar su propia red de votación, ya que el software es abierto y sin permisos.

Los validadores son los al menos 10 nodos que poseen la clave de descifrado dividida y realizan el descifrado de umbral. No pueden descifrar papeletas individuales ni fabricar un recuento falso, porque cada descifrado incluye una prueba pública de corrección.

## Para qué sirve el quórum

Los organizadores establecen un umbral de participación: los resultados de la encuesta se tratan como representativos de los tenedores de monedas solo si al menos 1.000.000 ZEC participa en al menos una pregunta, incluidas las abstenciones. El quórum no decide ninguna pregunta ni se aplica por pregunta. Es una única comprobación sobre toda la encuesta, por lo que un resultado se toma en serio solo cuando participa una cantidad considerable de ZEC. Por debajo de ese nivel, el resultado no se considera una señal significativa.

## Contra qué no protege este protocolo

Ser claro sobre los límites es parte de entender el diseño.

1. Es una señal, no una decisión vinculante. Una encuesta de tenedores de monedas mide el sentimiento ponderado por participación y alimenta el proceso normal de Zcash[gobernanza](../zcash-community/zcash-governance), en lugar de sustituirlo.
2. Está ponderada por monedas, por lo que la influencia sigue las tenencias. Una menor fricción puede aumentar la participación, pero no cambia la concentración de ZEC.
3. La agenda la establece la multifirma del coordinador, que elige qué preguntas aparecen. No puede tocar los votos, y cualquiera puede ejecutar una red competidora, pero establecer la agenda sigue siendo un punto de influencia.
4. El recuento necesita validadores en línea. Generar el resultado requiere que cooperen al menos dos tercios de ellos, por lo que una interrupción grande o una negativa coordinada podría retrasar un resultado.
5. La privacidad del saldo ante una confabulación total es defensa en profundidad, no un teorema. Si todo el comité reconstruyera secretamente la clave, la división en participaciones y el envío temporizado son lo que protege tu saldo, y los diseñadores reconocen que son más débiles ante la confabulación. El análisis sofisticado de tráfico es un riesgo residual.
6. Tiene más componentes móviles que el diseño anterior. Los servidores PIR, los servidores de envío, una clave de votación nueva y las pruebas en varias etapas son lugares donde podrían aparecer errores o configuraciones incorrectas. El sistema es de código abierto y algunas partes han sido auditadas de forma independiente, lo que gestiona ese riesgo en vez de eliminarlo.

Lo que sí protege, de manera sólida y verificable, son las dos cosas más importantes: tu papeleta no puede vincularse con tu identidad y solo se revelan los totales finales.

## Glosario

| Término | Significado en lenguaje sencillo |
|---|---|
| Voting chain | Una blockchain separada, creada por Valar Group, que ejecuta la votación; tus notas de Zcash nunca se mueven a ella |
| Snapshot height | El bloque de la red principal cuyos saldos establecen el peso de voto (bloque 3.459.350 para la encuesta de NU7) |
| Nullifier | El marcador único de gasto de una nota; revelarlo vincularía una papeleta con una nota, por lo que la votación demuestra la no pertenencia en su lugar |
| Private Information Retrieval (PIR) | Obtener datos de un servidor mientras se oculta qué datos solicitaste |
| Homomorphic encryption | Cifrado cuyos textos cifrados pueden sumarse sin descifrarse |
| Coordinator multisig | El grupo de 2 de 5 que autoriza las preguntas y la clave de ronda, pero no puede ver ni modificar votos |
| Election authority | Los 10 o más validadores que poseen conjuntamente la clave de descifrado dividida y revelan solo el recuento final |
| Threshold decryption | Recuperar un resultado solo cuando cooperan suficientes poseedores de participaciones de clave, aquí dos tercios |
| Quorum | La participación mínima de 1.000.000 ZEC para que la encuesta se considere representativa |

## Preguntas frecuentes

¿Mis monedas se mueven o quedan bloqueadas al votar? No. La elegibilidad se mide en el bloque de instantánea, por lo que tus ZEC permanecen donde están y disponibles para gastar. La votación produce pruebas en una red separada, no una transacción de Zcash.

¿Puede alguien saber cómo voté o cuánto poseo? No. Las papeletas están cifradas y solo se descifran los totales agregados. Tu voto es invinculable con tu identidad, y tu saldo se divide en 16 participaciones temporizadas para protegerlo incluso frente a un comité confabulado.

¿Qué impide que alguien vote dos veces o vote con monedas que no tiene? Cada papeleta incluye pruebas zero-knowledge de que está respaldada por un saldo real de la instantánea que no se ha gastado, y una prueba de no pertenencia basada en PIR muestra que la nota subyacente no se gastó ya, sin revelar cuál es.

¿Quién cuenta los votos? Un conjunto distribuido de al menos 10 validadores, ninguno de los cuales puede descifrar nada por sí solo. Dos tercios deben cooperar para revelar los totales, y cada descifrado incluye una prueba pública de corrección.

¿El resultado es vinculante? Es una señal de sentimiento de los tenedores de monedas ponderada por participación. Informa la gobernanza normal de Zcash en lugar de promulgar automáticamente un cambio.

¿Puedo ejecutar o auditar esto por mi cuenta? Sí. El software de la red de votación, los circuitos, el sistema PIR y un auditor de recuento son publicados por Valar Group para que cualquiera pueda inspeccionarlos y ejecutarlos.

## Pon a prueba tu comprensión

Si cada papeleta está cifrada y cada votante es anónimo, ¿cómo puede alguien estar seguro de que los totales publicados son correctos y de que nadie votó dos veces?

<details>
<summary>Respuesta</summary>

Tres pruebas hacen el trabajo. Cada papeleta incluye una prueba zero-knowledge de que está respaldada por un saldo real de la instantánea, por lo que no se cuentan votos sin respaldo. Una prueba de no pertenencia basada en PIR muestra que la nota detrás de ella no se había gastado, evitando la doble votación sin revelar la nota. Y, cuando los validadores descifran los totales, cada uno publica una prueba de corrección, por lo que cualquier nodo completo puede confirmar que los números finales se descifraron honestamente a partir de las papeletas cifradas.
</details>

## Recursos

- [NU7 Anuncio de la votación de tenedores de monedas (Valar Group y Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - la publicación del foro que delimita la encuesta, la altura de instantánea y el calendario
- [La red de votación de tenedores de monedas: diseño técnico](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - la descripción del protocolo en la que se basa esta página
- [Valar Group documentación de votación blindada](https://valargroup.gitbook.io/shielded-vote-docs) - la referencia mantenida para la red de votación
- [Valar Group código y auditorías de votación (GitHub)](https://github.com/valargroup/vote-sdk) - la implementación de código abierto y sus auditorías

## Páginas relacionadas

- [Recuperación Privada de Información](../zcash-tech/private-information-retrieval) - la técnica de prueba de no pertenencia detrás de la prevención privada de doble voto
- [Ironwood](../zcash-tech/ironwood) - el pool blindado cuyos saldos establecen el peso de voto
- [zk-SNARKs](../zcash-tech/zk-snarks) - el sistema de pruebas detrás de las pruebas de saldo y elegibilidad
- [Pools blindados](../using-zcash/shielded-pools) - qué es un saldo blindado y por qué permanece oculto
- [Zcash Descripción general de Financiamiento y Gobernanza](../zcash-community/zcash-governance) - cómo esta señal de sentimiento alimenta el proceso más amplio de toma de decisiones de Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - uno de los cinco miembros de la multifirma del coordinador
