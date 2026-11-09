# Guía del constructor para el hackatón de ZecHub

## En resumen

- Conoce por qué estás construyendo antes de escribir código; la utilidad supera a la complejidad
- Mantenlo simple; una idea pequeña bien ejecutada supera a una idea grande que queda sin terminar
- Aprende pronto la pila de infraestructura de Zcash; es la parte más empinada de la subida
- Si tu aplicación mueve fondos, debe funcionar en mainnet; constrúyela en testnet y luego demuéstrala en mainnet
- La documentación y una demostración clara pueden importar más que el producto en sí
- Ganar es una línea de salida; construye tu reputación y abre puertas en la comunidad

<br/>

## Para quién es esto

- Constructores primerizos que participan en un hackatón de ZecHub o Zcash
- Desarrolladores [developers] de otros ecosistemas que son nuevos en Zcash
- Cualquier persona que quiera convertir un proyecto de hackatón en algo duradero

<br/>

## Empieza por el porqué

Antes de abrir tu editor, conoce qué problema estás resolviendo y por qué le importaría a alguien. Una buena prueba es simple: si aquello que estás construyendo no existiera, ¿alguien lo echaría de menos? Construye algo que usarías tú mismo. La privacidad [privacy] es la razón por la que existe Zcash, así que comprende por qué la privacidad importa a las personas para quienes estás construyendo y deja que eso dé forma a todo el proyecto.

<br/>

## Aprende primero la pila

La sorpresa más común para los constructores de otras redes [chains] es la curva de aprendizaje de la infraestructura de Zcash, no la programación. Date tiempo para comprender cómo encajan las piezas antes de diseñar tu aplicación. Empieza con la pila central, a menudo llamada Z a la tercera: zebrad, un servidor ligero y una billetera [wallet]. Luego familiarízate con las herramientas de desarrollador:

1. Lee la página para desarrolladores en la wiki en [zechub.wiki/developers](https://zechub.wiki/developers); es la primera parada recomendada
2. Explora zingolib y zingo-cli, cuyas llamadas cubren la mayor parte de lo que un proyecto necesita en las distintas categorías
3. Examina librustzcash y la billetera de referencia ZODL para componentes básicos de nivel inferior
4. Para un proyecto de FROST, usa frostd de Zcash Foundation y frost-core de crates.io, y apóyate en la IA para obtener ayuda con las definiciones, aunque usar FROST de forma segura todavía requiere un esfuerzo y tiempo reales

<br/>

## Comprende qué significa mainnet

Varias categorías requieren que tu aplicación interactúe con la mainnet de Zcash. En la práctica, esto significa que tu proyecto, o alguien que lo usa, incluido un agente de IA, envía o recibe fondos reales en mainnet, o que construye y mejora las herramientas que lo hacen posible. Si tu aplicación realiza transacciones [transactions], debes demostrarlas en mainnet en tu envío.

Construye en testnet mientras desarrollas. La actividad en mainnet cuesta ZEC reales y solo se volverá más cara con el tiempo, así que testnet es el lugar recomendado para iterar. Cambia a mainnet para la prueba final. Ten un detalle en mente al diseñar tu flujo: cuando los fondos llegan a una dirección blindada [shielded address], tu billetera tiene que escanearlos y encontrarlos antes de que puedan gastarse, y ese escaneo toma un poco de tiempo. Incorpora esa breve espera a tu aplicación en lugar de asumir que los fondos entrantes están listos para usar de inmediato.

<br/>

## Mantenlo simple

Una idea simple y bien ejecutada ha superado muchas veces a una compleja. Los jueces han visto ganar un concepto básico frente a un proyecto técnicamente más ambicioso en el mismo evento, porque resolvía un problema real y era fácil de entender. Asume menos de lo que crees poder terminar. Pasar por alto detalles, definir un alcance demasiado grande y omitir la investigación son los errores que les cuestan premios a los constructores. Haz que tu proyecto sea fácil de entender y de ejecutar, desde el concepto central hasta el primer comando.

<br/>

## Gana los primeros 30 segundos

Los revisores se forman rápidamente una impresión fuerte, por lo que la presentación, el tema y los elementos visuales tienen un peso real, junto con lo novedosa que sea tu solución. La documentación y una demostración clara no son ideas secundarias. Comunicar tu idea a veces es más importante que la idea misma, porque si nadie entiende lo que construiste, no puede tener éxito. La evaluación suele equilibrar profundidad técnica, experiencia de usuario, originalidad y utilidad práctica, y una documentación sólida eleva todas ellas.

<br/>

## Observa las categorías más difíciles y con menos participantes

Si quieres una competencia menos concurrida, las categorías más difíciles suelen tener menos inscripciones simplemente porque menos personas las intentan. La categoría de Contabilidad es una buena opción para principiantes que quieren evitar el trabajo con transacciones on-chain. FROST es potente y poco utilizado, y constituye una base sólida para un proyecto. La comunidad no prescribe qué construir, así que construir sobre una herramienta capaz que el ecosistema ya tiene, en vez de empezar desde cero, es una decisión inteligente.

<br/>

## Después del hackatón

Ganar no es el final del camino. Ganar construye tu portafolio y reputación, abre puertas en la comunidad y puede conducir a financiación mediante propuestas.

1. Lleva un proyecto sólido más lejos como una propuesta para el DAO de ZecHub o Zcash Community Grants, con una hoja de ruta, hitos y una justificación presupuestaria
2. Mantente activo en la comunidad en el foro, Discord y X
3. Únete a las reuniones de I+D de Arborist, publica ideas y pide comentarios
4. Sigue construyendo aunque no ganes y mantente atento al próximo hackatón

<br/>

## Páginas relacionadas

- [Recursos para desarrolladores](https://zechub.wiki/developers) - la primera parada para los constructores de Zcash
- [Zebra Nodo completo](https://zechub.wiki/zcash-tech/zebra-full-node) - el nodo en la base de la pila
- [FROST](https://zechub.wiki/zcash-tech/frost) - firmas de umbral para proyectos avanzados

<br/>

<small>Esta guía se elaboró a partir de las perspectivas de los colaboradores principales de ZecHub squirrel, Dismad y Tron.</small>
