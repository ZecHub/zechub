<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## Resumen

* Pepper Sync es el motor de sincronización [synchronization engine] introducido en Zingo! 2.0, la billetera [wallet] de código abierto Zcash creada por Zingo Labs.
* Utiliza sincronización no lineal en lugar de escanear la red [chain] en grandes fragmentos secuenciales, por lo que tu saldo y transacciones [transactions] aparecen mucho antes.
* El progreso se guarda continuamente. Si se pierde la conexión o se cierra la aplicación, la sincronización se reanuda donde se detuvo en vez de reiniciarse.
* Puedes gastar antes de que termine la sincronización.
* Las transacciones blindadas [shielded] permanecen privadas [private] durante todo el proceso.

## Explicación principal

Zingo 2.0 es la versión más reciente de la billetera Zingo!, una billetera ligera y de código abierto creada para la comunidad de Zcash. La estrella de esta versión es Pepper Sync, una actualización importante que replantea por completo cómo se conectan las billeteras con la blockchain.

En el pasado, la sincronización podía sentirse dolorosamente lenta, propensa a errores y exigente en recursos, y a veces obligaba a los usuarios a reiniciar desde cero. Pepper Sync cambia todo eso. Hace que la sincronización sea más rápida, fluida, confiable y menos exigente para tu dispositivo, a la vez que preserva por completo la privacidad [privacy] de las transacciones blindadas.

Tanto si eres un usuario completamente nuevo que prueba Zcash por primera vez como si eres un miembro veterano de la comunidad que gestiona varias billeteras blindadas, Pepper Sync hace que la experiencia sea mucho más práctica y agradable.

### Características principales de Pepper Sync

Pepper Sync introduce varias mejoras:

- Sincronización mucho más rápida - Tu billetera está lista en minutos, no en horas.
- Actualizaciones inteligentes - Los datos se procesan en fragmentos más pequeños, evitando reescaneos completos.
- Resistente a interrupciones - Si se pierde la conexión, la sincronización se reanuda donde se quedó.
- Ligero y eficiente - Optimizado para teléfonos, portátiles y otros dispositivos menos potentes.
- Información más clara - Las actualizaciones de progreso en tiempo real reducen la confusión.
- Conserva la privacidad - Las transacciones blindadas permanecen privadas durante todo el proceso.

### Qué ha mejorado respecto a antes

Las versiones anteriores de Zingo solían frustrar a los usuarios con largos tiempos de sincronización, gestión de errores poco clara y un uso intensivo de recursos. Pepper Sync corrige estos problemas habituales:

| Característica            | Versiones anteriores de Zingo                | Zingo 2.0 con Pepper Sync                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Velocidad de sincronización         | Más lenta, especialmente en la primera configuración      | Sincronización inicial y continua mucho más rápida         |
| Gestión de errores     | Bloqueos ocasionales y fallos poco claros | Mayor estabilidad con recuperación automática   |
| Experiencia de usuario    | La sincronización parecía «opaca» para los recién llegados        | Transparente, con estados y actualizaciones más claros |
| Rendimiento del dispositivo | Alto uso de CPU/memoria                  | Optimizado para un uso fluido de recursos            |

En resumen: la sincronización ahora es más rápida, confiable y fácil de entender.

## Visual / Analogía

Piensa en la sincronización de una billetera antigua como leer en voz alta un libro muy largo desde la primera página antes de poder decir nada sobre él. Si te detienes a mitad de camino, comienzas de nuevo desde la primera página. Pepper Sync lee el mismo libro, pero conserva un marcador, lee primero los capítulos que te importan y te permite hablar sobre la historia antes de terminar la última página.

El marcador es la parte importante. Todas las versiones anteriores trataban una sincronización interrumpida como trabajo desperdiciado; Pepper Sync la trata como una pausa.

### Guías visuales

- Flujo detallado - Muestra el proceso completo. ![Detailed Flow](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Flujo simplificado - Vista rápida para usuarios cotidianos. ![Simplified Flow](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Análisis detallado

### Cómo funciona Pepper Sync (vista sencilla)

En lugar de volver a escanear la blockchain en fragmentos enormes y engorrosos, Pepper Sync funciona mediante pasos pequeños y manejables, guardando siempre tu posición a medida que avanza.

1. Conectar - La billetera se comunica con la red.
2. Obtener bloques - Los datos se descargan de forma incremental.
3. Verificar - Las transacciones se validan.
4. Gestionar notas blindadas - La privacidad se conserva en todo momento.
5. Actualizar saldos - La billetera se actualiza de forma segura.
6. Guardar progreso - Se detiene y reanuda sin problemas.
7. Finalizar - La billetera está lista para realizar transacciones.

## Implicaciones prácticas

### ¿Quién se beneficia de Pepper Sync?

- Usuarios nuevos - Pueden configurar billeteras rápidamente sin desanimarse por las demoras.
- Usuarios diarios - La sincronización confiable hace que los pagos blindados sean prácticos para el uso cotidiano.
- Desarrolladores y probadores - Los tiempos de sincronización más cortos significan ciclos de prueba más rápidos.
- Dispositivos móviles y ligeros - Zingo ahora funciona eficientemente incluso en hardware con recursos limitados.

### Por qué es importante para Zcash

Zcash se basa en transacciones blindadas, una de las herramientas de privacidad más potentes de las criptomonedas. Pero la privacidad solo es útil si es accesible.

Pepper Sync ayuda mediante:

- Reducir las barreras de entrada - Los usuarios nuevos pueden comenzar rápidamente.
- Facilitar el uso cotidiano - Las direcciones blindadas son más fáciles de confiar.
- Fomentar el crecimiento del ecosistema - Una mejor experiencia de billetera impulsa una mayor adopción, aplicaciones y servicios.

Al mejorar la experiencia de la billetera, Pepper Sync fortalece todo el ecosistema de Zcash.

### Primeros pasos: incorporación con Zingo 2.0

1. Descargar la billetera - Obtén la versión correcta desde la página de lanzamientos de [Zingo GitHub](https://github.com/zingolabs/zingolib)
2. Configurar tu billetera - Crea una nueva o restaura una a partir de una frase semilla. [Zingo 2.0 con Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Dejar que Pepper Sync se ejecute - Observa los indicadores de progreso mientras se actualiza tu billetera. [Ejecutar Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Comenzar a usar Zcash - Envía y recibe ZEC blindados en cuanto termine la sincronización.
5. No preocuparte por las interrupciones - Si la aplicación se cierra o se pierde la conexión, Pepper Sync se reanuda automáticamente.

## Errores comunes

**Tratar a Pepper Sync como una billetera por derecho propio**. Pepper Sync es el motor de sincronización dentro de la billetera Zingo!, no una aplicación independiente. Instalas Zingo; Pepper Sync es lo que funciona internamente.

**Suponer que una sincronización más rápida implica una privacidad más débil**. La velocidad proviene de cómo se obtienen, ordenan y almacenan en caché los datos de los bloques, no de revelar más información. Las transacciones blindadas permanecen privadas en todo momento.

**Suponer que debes estar completamente sincronizado antes de poder gastar**. Gastar antes de que termine la sincronización es una de las características principales de Pepper Sync, por lo que no tienes que esperar a que la billetera alcance la punta de la red.

## Preguntas frecuentes

**P: ¿Tengo que volver a escanear cada vez que abro la billetera?**

R: No. Pepper Sync guarda el progreso, por lo que solo actualizas desde el último punto.

**P: ¿Qué ocurre si se desconecta mi internet?**

R: La sincronización se pausa y continúa más tarde sin reiniciarse.

**P: ¿Está segura mi privacidad mientras se sincroniza?**

R: Sí. Las transacciones blindadas permanecen completamente privadas.

**P: ¿Cuánto tarda la primera sincronización?**

R: Por lo general, minutos en lugar de horas, según tu dispositivo e internet.

**P: ¿Puedo usar la billetera antes de que termine la sincronización?**

R: Sí. Pepper Sync permite gastar antes de que se complete la sincronización, por lo que no necesitas esperar a que la billetera alcance la punta de la red.

## Conclusión

Con Zingo 2.0 Pepper Sync, la sincronización ya no es el mayor punto de frustración de las billeteras blindadas. Ahora es rápida, estable y fácil de usar, lo que reduce la barrera para los recién llegados y hace que el uso cotidiano sea mucho más práctico.

Para los usuarios, significa menos espera y más privacidad. Para los desarrolladores, significa una base más sólida sobre la que construir. Para el ecosistema de Zcash, es otro paso hacia hacer que las transacciones blindadas sean accesibles para todos.

Zingo 2.0 con Pepper Sync no es solo una actualización; es un salto adelante para las criptomonedas privadas y utilizables.

## Páginas relacionadas

- [Zcash Sincronización de billeteras](/zcash-tech/zcash-wallet-syncing) — cómo funciona la sincronización de billeteras en todo el ecosistema de Zcash.
- [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) — la infraestructura con la que se sincroniza una billetera ligera como Zingo.
- [Zaino](/zcash-tech/zaino) — el indexador desarrollado por el equipo de Zingo.
- [Billeteras](/wallets) — el directorio completo de billeteras de Zcash y sus características.

## Aprendizaje adicional

- [Zingo! Repositorio de GitHub](https://github.com/zingolabs/zingolib)
- [Zcash Foro de la comunidad](https://forum.zcashcommunity.com/)
- Anuncios oficiales - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
