<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Contribuir a ZecHub

ZecHub ayuda a las personas a aprender sobre Zcash. Si estás leyendo esta página, ¡nos entusiasma mucho que estés considerando contribuir! Cualquier contribución que hagas se verá reflejada en [zechub.wiki](https://www.zechub.wiki/) y otras redes sociales de ZecHub.

### Nuevos colaboradores

Para obtener una visión general de ZecHub, lee el [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Primeros pasos

ZecHub utiliza GitHub para gestionar las contribuciones de la comunidad. Si eres nuevo en GitHub, ¡no te preocupes! Vamos a explicarte cómo puedes involucrarte como colaborador de la comunidad de ZecHub. Pagamos propinas en ZEC blindados por las contribuciones aceptadas. Los montos de recompensa no son fijos en ZEC — consulta [Cómo se establecen las recompensas](#how-rewards-are-set). En esta guía obtendrás una visión general del flujo de trabajo de contribución: desde abrir un issue y crear un pull request (PR), hasta revisar y fusionar el PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="Cómo contribuir a ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Únete a la conversación

Primero, únete a la conversación en nuestros [enlaces de la comunidad](https://zechub.wiki/zcash-community/community-links).

### Guías de estilo

Cualquier contribución a ZecHub debe seguir la guía de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide). Esto incluye wikis, documentación y contenido para redes sociales.

### Formas en las que puedes contribuir

ZecHub es un proyecto impulsado por la comunidad que busca proporcionar apoyo y recursos a los usuarios y desarrolladores de Zcash. Hay muchas maneras de involucrarte con ZecHub, como escribir para nuestro boletín semanal, contribuir a nuestra base de conocimientos o ayudar con proyectos de desarrollo.

Estos son los tipos de contribución que ZecHub acepta actualmente:

### Cómo se establecen las recompensas

Las propinas se pagan en ZEC blindados. Las cifras de ZEC que antes aparecían en los encabezados de abajo eran referencias históricas con una tasa de ZEC/USD anterior. No las trates como tasas actuales.

Cómo se elige un monto:

1. Relaciona el trabajo con un intervalo en USD de la [política de montos de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Elige un objetivo dentro de ese rango — no automáticamente el máximo.
3. Convierte según un precio spot público de ZEC/USD e introduce ZEC en la recompensa:

```
zec_to_enter = usd_target / zec_usd_spot
```

Redondea a 4 decimales. El archivo de política es la única fuente de verdad. Si esta página y ese archivo no coinciden, prevalece la política.

El trabajo remunerado aparece en [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="Explicación de ZecBounties | Gana ZEC contribuyendo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Tres estados que no son lo mismo:

1. **Fusionado** — el PR se acepta en el repositorio.
2. **Recompensa aprobada** — un patrocinador o la DAO acuerda que se debe una recompensa y de qué monto.
3. **Pagado** — ZEC llega a tu Unified Address blindado.

Una contribución fusionada no aprueba por sí sola una recompensa. Una recompensa aprobada no es un pago completado.

#### Trabajo de desarrollo

Cualquier trabajo de desarrollo aprobado que ayude a construir el ecosistema de Zcash. Esto puede incluir nuestro wiki, nuevas wallets o cualquier aplicación que se te ocurra.

#### Tutoriales de Zcash (video)

Aquí tienes un ejemplo de tutorial:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="Tutorial de instalación de WSL + compilación/transacción de Zcashd"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Crea y comparte tutoriales sobre aplicaciones de Zcash y recibe recompensas. Envía un PR a zechub/tutorials o manda el video al canal #video-content en Discord. Si el video cumple nuestros criterios, lo publicaremos y te daremos una propina.

#### Wiki de ZecHub - nueva página de wiki publicada

Nuestro sitio wiki ofrece materiales educativos de Zcash en un formato sencillo y fácil de asimilar. Zcash es una tecnología muy avanzada con una comunidad vibrante, por lo que aún hay más documentación que necesitamos crear. Nuestro objetivo es crear documentación sobre:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Estas son áreas bastante amplias, así que hay mucho sobre lo que trabajar. Si quieres algo de inspiración, consulta nuestro actual [sitio wiki-docs](https://zechub.wiki/) y mira qué falta. Una vez que determines sobre qué quieres escribir, comienza a realizar tus cambios y aprende cómo enviar un PR al repositorio de ZecHub. Todos nuestros documentos se crean y mantienen en este repositorio. Sigue la guía de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide) al escribir una página wiki y usa una página existente de la misma sección como referencia estructural. Después de enviar un PR, escribe a @dismad, @squirrel o @vito en la sección #zechub del discord, y revisarán tu PR y lo fusionarán si está listo para añadirse al sitio. Si se fusiona, añadirán el documento al sitio web de ZecHub. Si el documento no está listo, te sugerirán ediciones en el PR.

#### Wiki de ZecHub - página wiki traducida

El objetivo de ZecHub es proporcionar un centro educativo de código abierto al que cualquiera de la comunidad de Zcash pueda contribuir. Uno de los mayores éxitos del centro es ver a miembros de la comunidad traducir materiales de ZecHub a su idioma local.

Nota: el límite de traducción de páginas globales de ZecHub es de 10 páginas por semana.

Las páginas de idiomas seleccionadas en `translations/<locale>/site/` se rastrean frente a su fuente en inglés mediante un manifiesto de hash de origen. Consulta [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) para la detección de desactualización, el flujo de trabajo de sincronización y la validación de términos protegidos.

#### Wiki de ZecHub - edición de un documento existente

A veces la información de nuestros documentos no es del todo precisa. No pasa nada. ¡Por eso los hacemos de código abierto! Si encuentras algo que necesita un cambio en un wiki-doc, ve al pie de página del documento (que enlaza con su página de GitHub) y sugiere un cambio mediante un PR.

#### Wiki de ZecHub - enlace roto corregido

Si descubres que un enlace está roto o que algo importante está mal escrito, ve al pie de página del documento (que enlaza con su página de GitHub) y sugiere el cambio mediante un PR.

#### Boletín - nueva edición

Producimos el boletín semanal del ecosistema. ¡Esta es una forma muy sencilla de involucrarte! El boletín se publica cada viernes o sábado. Si quieres escribir un boletín, escribe a @squirrel en la sección #zecweekly de Discord para avisarle.

Después de hacerlo, puedes ir a la [sección del boletín de este repositorio](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md) y enviar un pull request para crear una nueva edición del boletín. Sigue el formato utilizado en esta [plantilla](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md).

Después de hacerlo, @squirrel o (en Discord) verá que tu nueva edición del boletín está disponible, la revisará y luego la fusionará con el repositorio. Después de que se haya fusionado, tomará el contenido y lo publicará a través de Substack.

#### Boletín - traducción

Actualmente tenemos ediciones en español, portugués y ruso. Las versiones traducidas se publican en sus redes sociales, y hacemos nuestro mejor esfuerzo para amplificarlas a través de las redes sociales de ZecHub.

Si quieres traducir el boletín a tu idioma local, dinos desde qué canal lo compartirías y en qué idioma publicarías el boletín, para que podamos coordinar su lanzamiento.

#### Podcast - episodio publicado en las redes sociales de ZecHub

¿Tienes una idea para un programa de noticias, podcast, charla de Twitter u otro contenido de video/audio? Cuéntanos en #video-content de Discord y hablaremos.

Las recompensas para este tipo de contenido son un poco mayores, por lo que sería necesario presentar una propuesta ante la DAO de ZecHub antes de aprobar el gasto.

#### Publicaciones creativas en redes sociales

Queremos contenido nuevo y atractivo para nuestras redes sociales. Se aceptan videos cortos, GIF, memes y otras publicaciones creativas cuando coinciden con la guía de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide). El monto de la recompensa sigue la [política de montos de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).

También puedes diseñar miniaturas para nuestro boletín y podcast. Si tienes talento para el diseño, escríbenos en #design en Discord.

#### ¿Otras ideas? ¡Cuéntanos!

¿Tienes otra sugerencia? Cuéntanos en #general de Discord. Podemos discutirla y ver si la DAO de ZecHub la apoyará.

### Para terminar

No dudes en empezar a contribuir a uno de los protocolos más respetados de la industria. Esta es una excelente manera de involucrarte con Zcash. Si tienes alguna pregunta sobre cómo contribuir, háznoslo saber en [Discord](#join-the-conversation).

¡Gracias!
