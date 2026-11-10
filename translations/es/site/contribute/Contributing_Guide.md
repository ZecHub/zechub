<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Contribuir a ZecHub

ZecHub ayuda a las personas a aprender sobre Zcash. Si estás leyendo esta página, ¡nos emociona mucho que estés considerando contribuir! Cualquier contribución que hagas se reflejará en [zechub.wiki](https://www.zechub.wiki/) y otras redes sociales [social media] de ZecHub.

### Nuevos colaboradores

Para obtener una visión general de ZecHub, lee el [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Primeros pasos

ZecHub utiliza GitHub para gestionar las contribuciones de la comunidad. Si eres nuevo en GitHub, ¡no te preocupes! Vamos a explicar cómo puedes participar como colaborador de la comunidad de ZecHub. Pagamos propinas en ZEC blindados [shielded] por contribuciones aceptadas. Los importes de las recompensas no son fijos en ZEC; consulta [Cómo se establecen las recompensas](#how-rewards-are-set). En esta guía obtendrás una visión general del flujo de trabajo de contribución, desde abrir una incidencia hasta crear una solicitud de extracción [pull request] (PR), revisarla y fusionar la PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Únete a la conversación

Primero, únete a la conversación en nuestros [enlaces comunitarios](https://zechub.wiki/zcash-community/community-links).

### Guías de estilo

Cualquier contribución a ZecHub debe seguir la [ZecHub guía de estilo style guide](https://zechub.wiki/contribute/style-guide). Esto incluye wikis, documentación y contenido de redes sociales.

### Formas de contribuir

ZecHub es un proyecto impulsado por la comunidad que busca proporcionar apoyo y recursos para usuarios y desarrolladores [developers] de Zcash. Hay muchas formas de participar en ZecHub, entre ellas escribir para nuestro boletín semanal [weekly newsletter], contribuir a nuestra base de conocimientos o ayudar con proyectos de desarrollo.

Estos son los tipos de contribución que ZecHub acepta actualmente:

### Cómo se establecen las recompensas

Las propinas se pagan en ZEC blindados. Los números de ZEC que antes aparecían en los encabezados de abajo eran referencias históricas con una tasa de ZEC/USD anterior. No los consideres tasas actuales.

Cómo se elige un importe:

1. Haz coincidir el trabajo con un intervalo en USD de la [política de importes de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Elige un objetivo dentro de ese intervalo, no automáticamente el máximo.
3. Convierte a un precio público al contado de ZEC/USD e introduce ZEC en la recompensa:

```
zec_to_enter = usd_target / zec_usd_spot
```

Redondea a 4 decimales. El archivo de políticas es la única fuente de referencia. Si esta página y ese archivo no coinciden, prevalece la política.

El trabajo remunerado aparece en [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Tres estados que no son iguales:

1. **Fusionada**: la PR se acepta en el repositorio.
2. **Recompensa aprobada**: un patrocinador o la DAO acuerda que se debe una recompensa y cuál será su importe.
3. **Pagada**: ZEC llega a tu dirección unificada [Unified Address] blindada.

Una contribución fusionada no aprueba por sí sola una recompensa. Una recompensa aprobada no es un pago completado.

#### Trabajo de desarrollo

Cualquier trabajo de desarrollo aprobado que ayude a construir el ecosistema de Zcash. Esto puede incluir nuestra wiki, nuevas billeteras [wallets] o cualquier aplicación que se te ocurra.

#### Zcash Tutoriales (vídeo)

Aquí tienes un tutorial de ejemplo:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Crea y comparte tutoriales sobre aplicaciones de Zcash y recibe recompensas. Envía una PR a zechub/tutorials o manda el vídeo al canal #video-content de Discord. Si el vídeo cumple nuestros criterios, lo publicaremos y te daremos una propina.

#### ZecHub Wiki - nueva página wiki publicada

Nuestro sitio wiki proporciona materiales educativos sobre Zcash en un formato sencillo y fácil de digerir. Zcash es una tecnología muy avanzada con una comunidad dinámica, por lo que aún hay más documentación que debemos crear. Nuestro objetivo es elaborar documentación sobre:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Estas son áreas bastante amplias, por lo que hay mucho material con el que trabajar. Si quieres inspiración, consulta nuestro actual [sitio wiki-docs](https://zechub.wiki/) y descubre qué falta. Cuando determines sobre qué quieres escribir, comienza a realizar tus cambios y aprende cómo enviar una PR al repositorio de ZecHub. Toda nuestra documentación se crea y mantiene en este repositorio. Sigue la [ZecHub guía de estilo](https://zechub.wiki/contribute/style-guide) al escribir una página wiki, y utiliza una página existente de la misma sección como referencia estructural. Después de enviar una PR, escribe a @dismad, @squirrel o @vito en la sección #zechub de Discord, y revisarán tu PR y la fusionarán si está lista para añadirse al sitio. Si se fusiona, añadirán el documento al sitio web de ZecHub. Si el documento no está listo, te sugerirán cambios en la PR.

#### ZecHub Wiki - página wiki traducida

El objetivo de ZecHub es proporcionar un centro educativo de código abierto al que cualquiera en la comunidad de Zcash pueda contribuir. Uno de los mayores éxitos del centro es ver a miembros de la comunidad traducir los materiales de ZecHub a su idioma local.

Nota [Note]: El límite de tasa global de traducción de páginas de ZecHub es de 10 páginas por semana.

Las páginas de idiomas seleccionados bajo `translations/<locale>/site/` se rastrean frente a su fuente en inglés mediante un manifiesto hash de origen. Consulta [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) para la detección de desactualización, el flujo de trabajo de sincronización y la validación de términos protegidos.

#### ZecHub Wiki - edición de un documento existente

A veces nuestra información en los documentos no es del todo precisa. No pasa nada. ¡Por eso los hacemos de código abierto! Si encuentras algo que necesita un cambio en un wiki-doc, ve al pie del documento, que enlaza a su página de GitHub, y sugiere un cambio mediante una PR.

#### ZecHub Wiki - enlace roto corregido

Si encuentras un enlace roto o algo importante mal escrito, ve al pie del documento, que enlaza a su página de GitHub, y sugiere el cambio mediante una PR.

#### Boletín - nueva edición

Producimos el boletín semanal del ecosistema. ¡Esta es una forma muy sencilla de participar! El boletín se publica todos los viernes o sábados. Si quieres escribir un boletín, escribe a @squirrel en la sección #zecweekly de Discord para avisarle.

Después de hacerlo, puedes ir a la [sección de boletines de este repositorio](/newsletter/newsletterbasics.md) y enviar una solicitud de extracción para crear una nueva edición del boletín. Sigue el formato utilizado en esta [plantilla](/newsletter/newslettertemplate.md).

Después de hacer esto, @squirrel o (en Discord) verá que tu nueva edición del boletín está disponible, la revisará y luego la fusionará con el repositorio. Después de fusionarla, tomará el contenido y lo publicará mediante Substack.

#### Boletín - traducción

Actualmente tenemos ediciones en español, portugués y ruso. Las versiones traducidas se publican en sus redes sociales, y hacemos todo lo posible por amplificarlas a través de las redes sociales de ZecHub.

Si quieres traducir el boletín a tu idioma local, indícanos desde qué canal lo compartirías y en qué idioma publicarías el boletín, para que podamos coordinar su lanzamiento.

#### Pódcast - episodio publicado en las redes sociales de ZecHub

¿Tienes una idea para un programa de noticias, pódcast, charla de Twitter u otro contenido de vídeo/audio? Cuéntanoslo en #video-content de Discord y hablaremos.

Las recompensas para este tipo de contenido son un poco mayores, por lo que habría que presentar una propuesta a la DAO de ZecHub antes de aprobar el gasto.

#### Publicaciones creativas en redes sociales

Queremos contenido nuevo y atractivo para nuestras redes sociales. Se aceptan vídeos cortos, GIF, memes y otras publicaciones creativas cuando coinciden con la [ZecHub guía de estilo](https://zechub.wiki/contribute/style-guide). El importe de la recompensa sigue la [política de importes de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).

También puedes diseñar miniaturas para nuestro boletín y pódcast. Si tienes talento para el diseño, escríbenos en #design de Discord.

#### ¿Otras ideas? ¡Cuéntanoslas!

¿Tienes otra sugerencia? Cuéntanosla en #general de Discord. Podemos hablar sobre ella y ver si la DAO de ZecHub la apoyará.

### Para terminar

No dudes en comenzar a contribuir a uno de los protocolos más respetados de la industria. Esta es una excelente forma de participar en Zcash. Si tienes alguna pregunta sobre cómo contribuir, háznoslo saber en [Discord](#join-the-conversation).

¡Gracias!
