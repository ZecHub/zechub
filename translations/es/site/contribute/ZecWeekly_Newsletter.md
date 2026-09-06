<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletín ZecWeekly

ZecWeekly es un boletín que se envía todos los domingos por la mañana. Incluye todas las noticias que ocurrieron durante la semana en el ecosistema Zcash. Las noticias son seleccionadas semanalmente por miembros de la comunidad y todos los enlaces relevantes se añaden al boletín. Suscríbete al boletín [aquí](https://zechub.substack.com/).

## Contribuir

Las contribuciones al boletín funcionan mejor cuando una persona prepara la edición correspondiente a la semana correcta, sigue el hilo actual de recompensas o coordinación y envía la solicitud de extracción después de que los enlaces semanales estén listos. No envíes una edición futura antes de que ZecHub haya publicado o confirmado la fecha de esa edición. Las solicitudes de extracción anticipadas a menudo omiten actualizaciones de finales de semana, entran en conflicto con un curador asignado o utilizan la fecha límite incorrecta.

### 1. Confirma la edición actual

Antes de empezar a escribir:

- Consulta [ZEC Bounties ](https://bounties.zechub.wiki/) para ver la tarea actual del boletín.
- Espera a que te asignen

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Haz un fork del repositorio

Si eres nuevo en GitHub, utiliza este flujo de trabajo:

1. Abre el [repositorio de ZecHub](https://github.com/ZecHub/zechub).
2. Haz clic en **Fork** y crea un fork en tu cuenta de GitHub.
3. En tu fork, crea una nueva rama para la edición. Un nombre de rama claro es útil, como `digest-may-30-2026`.
4. Asegúrate de que tu solicitud de extracción tenga como repositorio base `ZecHub/zechub` y como rama base `main`.

Si utilizas la línea de comandos, el mismo flujo de trabajo se ve así:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Sustituye `YOUR-USERNAME` por tu propio nombre de usuario de GitHub. La URL anterior es un marcador de posición y no se resolverá tal como está escrita.

### 3. Crea el archivo del boletín

Utiliza la [plantilla del boletín](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como punto de partida. Las ediciones del boletín pertenecen a la carpeta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Al crear el archivo:

- Respeta el formato de nombre de archivo solicitado por la incidencia o utilizado por ediciones aceptadas recientemente.
- Mantén el mismo orden de secciones que la plantilla, salvo que la tarea solicite un formato diferente.
- Añade enlaces únicamente de la semana relevante.
- Escribe una descripción breve y clara para cada enlace para que los lectores entiendan por qué es importante.
- Traduce o resume en inglés las fuentes que no estén en inglés cuando sea necesario.
- Revisa cada enlace antes de abrir la solicitud de extracción.

### 4. Recopila enlaces en el momento adecuado

ZecWeekly normalmente cubre la actividad del ecosistema Zcash de la semana actual y se publica cerca del final de la semana. El momento más seguro es:

- Empieza a recopilar enlaces después de que se publique la incidencia o tarea actual del boletín.
- Mantén un borrador mientras la semana siga activa.
- Envía la solicitud de extracción cerca de la fecha de entrega solicitada, después de revisar las actualizaciones de finales de semana.
- No envíes el boletín de una semana futura antes de que exista la tarea para esa fecha o antes de que ZecHub confirme que debes prepararlo.

Si una incidencia indica que debes enviar antes de una fecha específica, sigue esa fecha. Si hay un conflicto entre esta página y una incidencia actual, sigue la incidencia actual.

### 5. Abre la solicitud de extracción

Cuando tu archivo del boletín esté listo:

1. Confirma tus cambios en tu fork.
2. Abre una solicitud de extracción en `ZecHub/zechub` sobre la rama `main`.
3. Usa un título que coincida con la edición, como `Zcash Ecosystem Digest | May 30th`.
4. Enlaza la incidencia en el cuerpo de la solicitud de extracción para que los revisores puedan conectar el trabajo con la tarea.

Ejemplo de cuerpo de solicitud de extracción:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Después de abrir la solicitud de extracción, presta atención a los comentarios de revisión. Si ZecHub solicita cambios, actualiza la misma rama en lugar de abrir una segunda solicitud de extracción para la misma edición.

### Ejemplos reales

Utiliza estas solicitudes de extracción de boletines fusionadas como ejemplos de envíos aceptados:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Al comparar tu trabajo con un ejemplo, concéntrate en la ubicación del archivo, el formato del título, el orden de las secciones, las descripciones de los enlaces y si la solicitud de extracción se conecta con la tarea correcta.

### Errores comunes que debes evitar

- Abrir una solicitud de extracción antes de que se confirme la fecha de la edición o la tarea.
- Trabajar en una incidencia que ya tiene una solicitud de extracción vinculada.
- Enviar la solicitud de extracción a tu propio fork en lugar de a `ZecHub/zechub`.
- Usar un nombre de archivo incorrecto o colocar el archivo fuera de la carpeta `newsletter`.
- Copiar una edición antigua sin actualizar todas las fechas, enlaces y descripciones.
- Añadir enlaces de la semana incorrecta.
- Dejar enlaces rotos, enlaces duplicados o texto de marcador de posición de la plantilla.
- Abrir una nueva solicitud de extracción después de recibir comentarios de revisión en lugar de actualizar la rama original.

### Lista de verificación final

Antes de solicitar la revisión, confirma lo siguiente:

- La fecha de la incidencia o tarea coincide con tu archivo del boletín.
- Ninguna otra solicitud de extracción abierta cubre ya la misma incidencia o edición.
- El archivo está en la carpeta `newsletter`.
- Las secciones de la plantilla están completas.
- Todos los enlaces funcionan y tienen una descripción útil.
- El cuerpo de la solicitud de extracción enlaza la incidencia correcta.
- Estás disponible para realizar cambios si los revisores los solicitan.

## Ediciones anteriores

[Archivo de ZecWeekly](https://zechub.substack.com/p/archive)
