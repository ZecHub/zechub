<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Boletín [Newsletter]

ZecWeekly es un boletín que se publica cada domingo por la mañana. Incluye todas las noticias que ocurrieron durante la semana en el ecosistema Zcash. Las noticias son seleccionadas semanalmente por miembros de la comunidad y todos los enlaces relevantes se añaden al boletín. Suscríbete al boletín [aquí](https://zechub.substack.com/).

## Contribuir

Las contribuciones al boletín funcionan mejor cuando una persona colaboradora prepara la edición para la semana correcta, sigue el hilo actual de recompensa o coordinación y envía la solicitud de incorporación de cambios después de que los enlaces semanales estén listos. No envíes una edición futura antes de que ZecHub haya publicado o confirmado la fecha de esa edición. Las solicitudes de incorporación de cambios tempranas suelen omitir actualizaciones de finales de semana, entrar en conflicto con una persona curadora asignada o usar la fecha límite incorrecta.

### 1. Confirmar la edición actual

Antes de empezar a escribir:

- Revisa [ZEC Bounties](https://bounties.zechub.wiki/) para consultar la tarea actual del boletín.
- Espera a que se te asigne.
- Las ediciones del boletín se encuentran en la banda XS de la [política de cantidades de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts). La cifra ZEC de la recompensa activa es la cantidad, no ningún encabezado anterior de las guías de contribución.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Bifurcar el repositorio

Si eres nuevo en GitHub, utiliza este flujo de trabajo:

1. Abre el repositorio [ZecHub](https://github.com/ZecHub/zechub).
2. Haz clic en **Fork** y crea una bifurcación en tu cuenta de GitHub.
3. En tu bifurcación, crea una nueva rama para la edición. Un nombre de rama claro es útil, como `digest-may-30-2026`.
4. Asegúrate de que tu solicitud de incorporación de cambios tenga como repositorio base `ZecHub/zechub` y como rama base `main`.

Si utilizas la línea de comandos, el mismo flujo de trabajo se ve así:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Reemplaza `YOUR-USERNAME` con tu propio nombre de usuario de GitHub. La URL anterior es un marcador de posición y no se resolverá tal como está escrita.

### 3. Crear el archivo del boletín

Usa la [plantilla del boletín](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como punto de partida. Las ediciones del boletín pertenecen a la carpeta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Al crear el archivo:

- Respeta el formato de nombre de archivo solicitado por la incidencia o utilizado por las ediciones aceptadas recientemente.
- Mantén el mismo orden de secciones que la plantilla, salvo que la tarea solicite un formato diferente.
- Añade enlaces únicamente de la semana relevante.
- Escribe una descripción breve y clara para cada enlace, de modo que las personas lectoras entiendan por qué es importante.
- Traduce o resume en inglés las fuentes que no estén en inglés cuando sea necesario.
- Revisa cada enlace antes de abrir la solicitud de incorporación de cambios.

### 4. Recopilar enlaces en el momento adecuado

ZecWeekly normalmente cubre la actividad del ecosistema Zcash de la semana actual y se publica cerca del final de la semana. El momento más seguro es:

- Empieza a recopilar enlaces después de que se publique la incidencia o tarea actual del boletín.
- Mantén un borrador mientras la semana siga activa.
- Envía la solicitud de incorporación de cambios cerca de la fecha de entrega solicitada, después de haber revisado las actualizaciones de finales de semana.
- No envíes el boletín de una semana futura antes de que exista la tarea para esa fecha o antes de que ZecHub confirme que debes prepararlo.

Si una incidencia indica que debes enviar antes de una fecha específica, sigue esa fecha. Si existe un conflicto entre esta página y una incidencia actual, sigue la incidencia actual.

### 5. Abrir la solicitud de incorporación de cambios

Cuando el archivo de tu boletín esté listo:

1. Confirma tus cambios en tu bifurcación.
2. Abre una solicitud de incorporación de cambios en `ZecHub/zechub` en la rama `main`.
3. Usa un título que coincida con la edición, como `Zcash Ecosystem Digest | May 30th`.
4. Enlaza la incidencia en el cuerpo de la solicitud de incorporación de cambios para que las personas revisoras puedan conectar el trabajo con la tarea.

Ejemplo de cuerpo de solicitud de incorporación de cambios:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Después de abrir la solicitud de incorporación de cambios, presta atención a los comentarios de revisión. Si ZecHub solicita modificaciones, actualiza la misma rama en lugar de abrir una segunda solicitud de incorporación de cambios para la misma edición.

### Ejemplos reales

Usa estas solicitudes de incorporación de cambios fusionadas del boletín como ejemplos de envíos aceptados:

- [Zcash Resumen del ecosistema | 11 de abril](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Resumen del ecosistema | 28 de marzo](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Resumen del ecosistema | 14 de febrero](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Al comparar tu trabajo con un ejemplo, céntrate en la ubicación del archivo, el formato del título, el orden de las secciones, las descripciones de los enlaces y si la solicitud de incorporación de cambios se vincula con la tarea correcta.

### Errores comunes que debes evitar

- Abrir una solicitud de incorporación de cambios antes de que se confirme la fecha de la edición o la tarea.
- Trabajar en una incidencia que ya tiene una solicitud de incorporación de cambios vinculada.
- Enviar la solicitud de incorporación de cambios a tu propia bifurcación en lugar de a `ZecHub/zechub`.
- Usar un nombre de archivo incorrecto o colocar el archivo fuera de la carpeta `newsletter`.
- Copiar una edición anterior sin actualizar cada fecha, enlace y descripción.
- Añadir enlaces de la semana incorrecta.
- Dejar enlaces rotos, enlaces duplicados o texto de marcador de posición de la plantilla.
- Abrir una nueva solicitud de incorporación de cambios después de los comentarios de revisión en lugar de actualizar la rama original.

### Lista de verificación final

Antes de solicitar revisión, confirma que:

- La fecha de la incidencia o tarea coincide con tu archivo del boletín.
- Ninguna otra solicitud de incorporación de cambios abierta ya cubre la misma incidencia o edición.
- El archivo está en la carpeta `newsletter`.
- Las secciones de la plantilla están completas.
- Cada enlace funciona y tiene una descripción útil.
- El cuerpo de la solicitud de incorporación de cambios enlaza la incidencia correcta.
- Estás disponible para realizar modificaciones si las personas revisoras solicitan cambios.

## Ediciones anteriores

[ZecWeekly Archivo](https://zechub.substack.com/p/archive)
