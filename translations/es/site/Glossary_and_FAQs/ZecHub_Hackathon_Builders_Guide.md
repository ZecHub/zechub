# Guía del constructor para hackatones de ZecHub

## TL;DR

- Ten claro por qué estás construyendo antes de escribir código; la utilidad supera a la complejidad
- Mantenlo simple: una idea pequeña bien ejecutada supera a una gran idea que queda sin terminar
- Aprende pronto la pila de infraestructura de Zcash; es la parte más empinada del ascenso
- Si tu app mueve fondos, debe funcionar en mainnet; constrúyela en testnet y luego demuéstrala en mainnet
- La documentación y una demo clara pueden importar más que el producto en sí
- Ganar es una línea de partida; construye tu reputación y te abre puertas en la comunidad

<br/>

## ¿Para quién es esto?

- Constructores principiantes que participan por primera vez en un hackatón de ZecHub o Zcash
- Desarrolladores de otros ecosistemas que son nuevos en Zcash
- Cualquiera que quiera convertir un proyecto de hackatón en algo duradero

<br/>

## Empieza por el porqué

Antes de abrir tu editor, ten claro qué problema estás resolviendo y por qué a alguien le importaría. Una buena prueba es simple: si eso que estás construyendo no existiera, ¿alguien lo echaría de menos? Construye algo que tú mismo usarías. La privacidad es la razón por la que existe Zcash, así que entiende por qué la privacidad importa a las personas para las que estás construyendo, y deja que eso dé forma a todo el proyecto.

<br/>

## Aprende primero la pila

La sorpresa más común para constructores que vienen de otras cadenas no es la programación, sino la curva de aprendizaje de la infraestructura de Zcash. Date tiempo para entender cómo encajan las piezas antes de diseñar tu app. Empieza con la pila principal, a menudo llamada Z al cubo: zebrad, un servidor ligero y una wallet. Luego familiarízate con las herramientas para desarrolladores:

1. Lee la página para desarrolladores en la wiki en [zechub.wiki/developers](https://zechub.wiki/developers), es la primera parada recomendada
2. Explora zingolib y zingo-cli, cuyas llamadas cubren la mayor parte de lo que necesita un proyecto en las distintas categorías
3. Mira librustzcash y la wallet de referencia ZODL para componentes de nivel más bajo
4. Para un proyecto FROST, usa frostd y frost-core de la Zcash Foundation desde crates.io, y apóyate en la IA para ayudarte con las definiciones, aunque usar FROST de forma segura sigue requiriendo esfuerzo y tiempo reales

<br/>

## Entiende qué significa mainnet

Varias categorías requieren que tu app interactúe con la mainnet de Zcash. En la práctica, esto significa que tu proyecto, o alguien que lo use, incluido un agente de IA, envía o recibe fondos reales en mainnet, o que construye y mejora las herramientas que hacen esto posible. Si tu app realiza transacciones, debes demostrarlas en mainnet en tu entrega.

Construye en testnet mientras desarrollas. La actividad en mainnet cuesta ZEC reales y solo se volverá más cara con el tiempo, así que testnet es el lugar recomendado para iterar. Cambia a mainnet para la prueba final. Ten presente un detalle al diseñar tu flujo: cuando los fondos llegan a una dirección blindada, tu wallet tiene que escanear y encontrarlos antes de que puedan gastarse, y ese escaneo lleva un poco de tiempo. Incorpora esa breve espera en tu app en lugar de asumir que los fondos entrantes estarán listos para usarse de inmediato.

<br/>

## Mantenlo simple

Una idea simple y bien ejecutada ha vencido muchas veces a una compleja. Los jueces han visto cómo un concepto básico ganaba frente a un proyecto técnicamente más ambicioso en el mismo evento, porque resolvía un problema real y era fácil de entender. Asume menos de lo que crees que puedes terminar. Pasar por alto detalles, abarcar demasiado y saltarse la investigación son errores que hacen perder premios a los constructores. Haz que tu proyecto sea fácil de entender y fácil de ejecutar, desde el concepto central hasta el primer comando.

<br/>

## Gana en los primeros 30 segundos

Los revisores se forman una impresión fuerte rápidamente, así que la presentación, el tema y los elementos visuales tienen un peso real, junto con lo novedosa que sea tu solución. La documentación y una demo clara no son algo secundario. Comunicar tu idea a veces es más importante que la idea en sí, porque si nadie entiende lo que construiste, no puede tener éxito. La evaluación suele equilibrar profundidad técnica, experiencia de usuario, originalidad y utilidad práctica, y una documentación sólida eleva todos esos aspectos.

<br/>

## Mira las categorías más difíciles y menos concurridas

Si quieres una competencia menos saturada, las categorías más difíciles suelen tener menos participantes simplemente porque menos personas se atreven a intentarlas. La categoría de Contabilidad es una buena opción para principiantes que quieren evitar el trabajo con transacciones on-chain. FROST es potente y poco utilizado, y constituye una base sólida para un proyecto. La comunidad no prescribe qué construir, así que apoyarte en una herramienta capaz que el ecosistema ya tiene, en lugar de empezar desde cero, es una decisión inteligente.

<br/>

## Después del hackatón

Ganar no es el final del camino. Ganar fortalece tu portafolio y tu reputación, abre puertas en la comunidad y puede llevar a financiación mediante propuestas.

1. Lleva un proyecto sólido más lejos como propuesta para la DAO de ZecHub o Zcash Community Grants, con una hoja de ruta, hitos y una justificación del presupuesto
2. Mantente activo en la comunidad en el foro, Discord y X
3. Únete a las reuniones de Arborist R and D, publica ideas y pide retroalimentación
4. Sigue construyendo incluso si no ganas, y estate atento al próximo hackatón

<br/>

## Páginas relacionadas

- [Recursos para desarrolladores](https://zechub.wiki/developers) - la primera parada para los constructores de Zcash
- [Nodo completo Zebra](https://zechub.wiki/zcash-tech/zebra-full-node) - el nodo en la base de la pila
- [FROST](https://zechub.wiki/zcash-tech/frost) - firmas umbral para proyectos avanzados

<br/>

<small>Esta guía fue moldeada por ideas de los contribuidores principales de ZecHub squirrel, Dismad y Tron.</small>
