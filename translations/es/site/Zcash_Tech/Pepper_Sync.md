<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## Resumen rápido

* Pepper Sync es el motor de sincronización introducido en Zingo! 2.0, la billetera de Zcash de código abierto creada por Zingo Labs.
* Usa sincronización no lineal en lugar de escanear la cadena en grandes bloques secuenciales, por lo que tu saldo y tus transacciones aparecen mucho antes.
* El progreso se guarda de forma continua. Si la conexión se cae o la aplicación se cierra, la sincronización se reanuda desde donde se detuvo en lugar de empezar de nuevo.
* Puedes gastar antes de que la sincronización haya terminado.
* Las transacciones blindadas permanecen privadas durante todo el proceso.

## Explicación principal

Zingo 2.0 es la versión más reciente de la billetera Zingo!, una billetera ligera y de código abierto creada para la comunidad de Zcash. La estrella de esta versión es Pepper Sync, una mejora importante que replantea por completo cómo las billeteras se conectan con la blockchain.

En el pasado, la sincronización podía sentirse dolorosamente lenta, propensa a errores y exigente en recursos, obligando a veces a los usuarios a empezar desde cero. Pepper Sync cambia todo eso. Hace que la sincronización sea más rápida, fluida, confiable y menos demandante para tu dispositivo, mientras preserva por completo la privacidad de las transacciones blindadas.

Tanto si eres un usuario completamente nuevo que prueba Zcash por primera vez, como si eres un miembro veterano de la comunidad que gestiona múltiples billeteras blindadas, Pepper Sync hace que la experiencia sea mucho más práctica y agradable.

### Funciones principales de Pepper Sync

Pepper Sync introduce varias mejoras:

- Sincronización Mucho Más Rápida - Tu billetera está lista en minutos, no en horas.
- Actualizaciones Inteligentes - Los datos se procesan en fragmentos más pequeños, evitando reescaneos completos.
- Resistente a Interrupciones - Si tu conexión se cae, la sincronización se reanuda donde la dejó.
- Ligero y Eficiente - Optimizado para teléfonos, portátiles y otros dispositivos de menor potencia.
- Retroalimentación Más Clara - Las actualizaciones de progreso en tiempo real reducen la confusión.
- Preserva la Privacidad - Las transacciones blindadas permanecen privadas durante todo el proceso.

### Qué ha mejorado frente a antes

Las versiones anteriores de Zingo a menudo frustraban a los usuarios con largos tiempos de sincronización, manejo poco claro de errores y un uso intensivo de recursos. Pepper Sync soluciona estos problemas comunes:

| Feature            | Previous Zingo Versions                | Zingo 2.0 with Pepper Sync                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Velocidad de Sincronización | Más lenta, especialmente en la configuración inicial | Sincronización inicial y continua mucho más rápida |
| Manejo de Errores     | Bloqueos ocasionales y fallos poco claros | Mayor estabilidad con recuperación automática   |
| Experiencia de Usuario    | La sincronización se sentía "opaca" para los recién llegados        | Transparente, con estado y actualizaciones más claras |
| Rendimiento del Dispositivo | Alto uso de CPU/memoria                  | Optimizado para un uso fluido de recursos            |

En resumen: la sincronización ahora es más rápida, más confiable y más fácil de entender.

## Visual / Analogía

Piensa en la sincronización de una billetera antigua como leer un libro muy largo desde la primera página, en voz alta, antes de que se te permita decir algo sobre él. Si te detienes a mitad, vuelves a empezar desde la primera página. Pepper Sync lee el mismo libro, pero conserva un marcador, lee primero los capítulos que te importan y te permite hablar de la historia antes de haber terminado la última página.

El marcador es la parte importante. Cada versión anterior trataba una sincronización interrumpida como trabajo perdido; Pepper Sync la trata como una pausa.

### Guías visuales

- Flujo Detallado - Muestra el proceso completo. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Flujo Simplificado - Vista rápida para usuarios cotidianos. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Análisis en profundidad

### Cómo funciona Pepper Sync (vista simple)

En lugar de volver a escanear la blockchain en bloques enormes y torpes, Pepper Sync trabaja en pasos pequeños y manejables, guardando siempre tu lugar a medida que avanza.

1. Conectar - La billetera se comunica con la red.
2. Obtener Bloques - Los datos se descargan de forma incremental.
3. Verificar - Las transacciones se validan.
4. Manejar Notas Blindadas - La privacidad se preserva en todo momento.
5. Actualizar Saldos - La billetera se actualiza de forma segura.
6. Guardar Progreso - Se detiene y se reanuda sin problemas.
7. Finalizar - La billetera está lista para realizar transacciones.

## Implicaciones prácticas

### ¿Quién se beneficia de Pepper Sync?

- Nuevos Usuarios - Pueden configurar billeteras rápidamente sin desanimarse por las demoras.
- Usuarios Diarios - Una sincronización confiable hace que los pagos blindados sean prácticos para el uso cotidiano.
- Desarrolladores y Testers - Tiempos de sincronización más cortos significan ciclos de prueba más rápidos.
- Dispositivos Móviles y Ligeros - Zingo ahora funciona de manera eficiente incluso en hardware con recursos limitados.

### Por qué importa para Zcash

Zcash está construido en torno a las transacciones blindadas, una de las herramientas de privacidad más potentes en las criptomonedas. Pero la privacidad solo es útil si es accesible.

Pepper Sync ayuda al:

- Reducir las barreras de entrada - Los nuevos usuarios pueden comenzar rápidamente.
- Favorecer la usabilidad cotidiana - Las direcciones blindadas se vuelven más fáciles de confiar.
- Fomentar el crecimiento del ecosistema - Una mejor experiencia de billetera impulsa una mayor adopción, aplicaciones y servicios.

Al mejorar la experiencia de la billetera, Pepper Sync fortalece todo el ecosistema de Zcash.

### Primeros pasos: incorporación con Zingo 2.0

1. Descarga la Billetera - Obtén la versión correcta en la [página de lanzamientos de Zingo en GitHub](https://github.com/zingolabs/zingolib)
2. Configura Tu Billetera - Crea una nueva o restáurala desde una frase semilla existente. [Zingo 2.0 with Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Deja que Pepper Sync se Ejecute - Observa los indicadores de progreso mientras tu billetera se actualiza. [Pepper Sync Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. Empieza a Usar Zcash - Envía y recibe ZEC blindado en cuanto se complete la sincronización.
5. No Te Preocupes por las Interrupciones - Si la aplicación se cierra o la conexión se cae, Pepper Sync se reanuda automáticamente.

## Errores comunes

**Tratar Pepper Sync como si fuera una billetera por derecho propio**. Pepper Sync es el motor de sincronización dentro de la billetera Zingo!, no una aplicación separada. Instalas Zingo; Pepper Sync es lo que funciona por debajo.

**Asumir que una sincronización más rápida significa una privacidad más débil**. La velocidad proviene de cómo se obtienen, ordenan y almacenan en caché los datos de los bloques, no de revelar más información. Las transacciones blindadas permanecen privadas en todo momento.

**Asumir que debes estar completamente sincronizado antes de poder gastar**. Gastar antes de que se complete la sincronización es una de las funciones principales de Pepper Sync, así que no tienes que esperar a que la billetera alcance la punta de la cadena.

## Preguntas frecuentes

**P: ¿Tengo que volver a escanear cada vez que abro la billetera?**

R: No. Pepper Sync guarda el progreso, así que solo actualizas desde el último punto.

**P: ¿Qué ocurre si se desconecta mi internet?**

R: La sincronización se pausa y continúa más tarde sin reiniciarse.

**P: ¿Mi privacidad está segura durante la sincronización?**

R: Sí. Las transacciones blindadas permanecen totalmente privadas.

**P: ¿Cuánto tarda la primera sincronización?**

R: Normalmente minutos en lugar de horas, dependiendo de tu dispositivo y de tu conexión a internet.

**P: ¿Puedo usar la billetera antes de que termine la sincronización?**

R: Sí. Pepper Sync permite gastar antes de que la sincronización se haya completado, así que no necesitas esperar a que la billetera alcance la punta de la cadena.

## Conclusión

Con Zingo 2.0 Pepper Sync, la sincronización ya no es el mayor punto de dolor de las billeteras blindadas. Ahora es rápida, estable y fácil de usar, reduciendo la barrera para los recién llegados y haciendo que el uso cotidiano sea mucho más práctico.

Para los usuarios, significa menos espera y más privacidad. Para los desarrolladores, significa una base más sólida sobre la que construir. Para el ecosistema de Zcash, es otro paso hacia hacer que las transacciones blindadas sean accesibles para todos.

Zingo 2.0 con Pepper Sync no es solo una mejora; es un gran salto adelante para una criptomoneda privada y utilizable.

## Páginas relacionadas

- [Sincronización de billeteras de Zcash](/zcash-tech/zcash-wallet-syncing) — cómo funciona la sincronización de billeteras en todo el ecosistema de Zcash.
- [Nodos Lightwallet](/zcash-tech/lightwallet-nodes) — la infraestructura con la que se sincroniza una billetera ligera como Zingo.
- [Zaino](/zcash-tech/zaino) — el indexador desarrollado por el equipo de Zingo.
- [Billeteras](/wallets) — el directorio completo de billeteras de Zcash y sus funciones.

## Para seguir aprendiendo

- [Repositorio de GitHub de Zingo!](https://github.com/zingolabs/zingolib)
- [Foro de la Comunidad de Zcash](https://forum.zcashcommunity.com/)
- Anuncios Oficiales - [Twitter de Zingo Labs](https://twitter.com/ZingoLabs)

___
___
