<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletín ZecWeekly

ZecWeekly es un boletín que se publica todos los domingos por la mañana. Incluye todas las noticias que ocurrieron durante la semana en el ecosistema Zcash. Las noticias son seleccionadas semanalmente por miembros de la comunidad y se añaden todos los enlaces relevantes al boletín. Suscríbete al boletín [aquí](https://zechub.substack.com/).

## Contribuir

Las contribuciones al boletín funcionan mejor cuando una persona colaboradora prepara la edición de la semana correcta, sigue el hilo actual de recompensa o coordinación y envía la pull request después de que los enlaces semanales estén listos. No envíes una edición futura antes de que ZecHub haya publicado o confirmado la fecha de esa edición. Las pull requests anticipadas suelen omitir actualizaciones de finales de semana, entrar en conflicto con una persona curadora asignada o utilizar la fecha límite incorrecta.

### 1. Confirma la edición actual

Antes de empezar a escribir:

- Consulta [ZEC Bounties ](https://bounties.zechub.wiki/) para ver la tarea actual del boletín.
- Espera a que se te asigne

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Haz un fork del repositorio

Si eres nuevo en GitHub, utiliza este flujo de trabajo:

1. Abre el [repositorio de ZecHub](https://github.com/ZecHub/zechub).
2. Haz clic en **Fork** y crea un fork en tu cuenta de GitHub.
3. En tu fork, crea una rama nueva para la edición. Un nombre de rama claro es útil, como `digest-may-30-2026`.
4. Asegúrate de que tu pull request tenga como repositorio base `ZecHub/zechub` y como rama base `main`.

Si utilizas la línea de comandos, el mismo flujo de trabajo se ve así:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Sustituye `YOUR-USERNAME` por tu propio nombre de usuario de GitHub. La URL anterior es un marcador de posición y no se resolverá tal como está escrita.

### 3. Crea el archivo del boletín

Usa la [plantilla del boletín](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como punto de partida. Las ediciones del boletín deben ubicarse en la carpeta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Al crear el archivo:

- Respeta el formato de nombre de archivo solicitado por el issue o utilizado por ediciones aceptadas recientes.
- Mantén el mismo orden de secciones que la plantilla, a menos que la tarea solicite un formato diferente.
- Añade enlaces únicamente de la semana relevante.
- Escribe una descripción breve y clara para cada enlace, para que las personas lectoras entiendan por qué es importante.
- Traduce o resume al inglés las fuentes que no estén en inglés cuando sea necesario.
- Revisa cada enlace antes de abrir la pull request.

### 4. Recopila enlaces en el momento adecuado

ZecWeekly normalmente cubre la actividad del ecosistema Zcash de la semana actual y se publica cerca del final de la semana. El momento más seguro es:

- Empieza a recopilar enlaces después de que se publique el issue o tarea del boletín actual.
- Mantén un borrador mientras la semana siga activa.
- Envía la pull request cerca de la fecha de entrega solicitada, después de comprobar si hay actualizaciones de finales de semana.
- No envíes el boletín de una semana futura antes de que exista la tarea para esa fecha o antes de que ZecHub confirme que debes prepararlo.

Si un issue indica que debes enviarlo en una fecha específica, sigue esa fecha. Si existe un conflicto entre esta página y un issue actual, sigue el issue actual.

### 5. Abre la pull request

Cuando tu archivo del boletín esté listo:

1. Haz commit de tus cambios en tu fork.
2. Abre una pull request hacia `ZecHub/zechub` en la rama `main`.
3. Usa un título que corresponda a la edición, como `Zcash Ecosystem Digest | May 30th`.
4. Enlaza el issue en el cuerpo de la pull request para que las personas revisoras puedan conectar el trabajo con la tarea.

Ejemplo de cuerpo de pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Después de abrir la pull request, estate atento a los comentarios de revisión. Si ZecHub solicita cambios, actualiza la misma rama en lugar de abrir una segunda pull request para la misma edición.

### Ejemplos reales

Usa estas pull requests de boletines ya fusionadas como ejemplos de envíos aceptados:

- [Resumen del ecosistema Zcash | 11 de abril](https://github.com/ZecHub/zechub/pull/1551)
- [Resumen del ecosistema Zcash | 28 de marzo](https://github.com/ZecHub/zechub/pull/1544)
- [Resumen del ecosistema Zcash | 14 de febrero](https://github.com/ZecHub/zechub/pull/1474)


![Ejemplo de pull request de boletín ZecWeekly fusionada](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Al comparar tu trabajo con un ejemplo, céntrate en la ubicación del archivo, el formato del título, el orden de las secciones, las descripciones de los enlaces y en si la pull request se conecta con la tarea correcta.

### Errores comunes que debes evitar

- Abrir una pull request antes de que se confirme la fecha de la edición o la tarea.
- Trabajar en un issue que ya tiene una pull request enlazada.
- Enviar la pull request a tu propio fork en lugar de a `ZecHub/zechub`.
- Usar un nombre de archivo incorrecto o colocar el archivo fuera de la carpeta `newsletter`.
- Copiar una edición antigua sin actualizar cada fecha, enlace y descripción.
- Añadir enlaces de la semana incorrecta.
- Dejar enlaces rotos, enlaces duplicados o texto de marcador de posición de la plantilla.
- Abrir una nueva pull request después de comentarios de revisión, en lugar de actualizar la rama original.

### Lista de verificación final

Antes de solicitar una revisión, confirma que:

- La fecha del issue o de la tarea coincide con tu archivo del boletín.
- Ninguna otra pull request abierta ya cubre el mismo issue o edición.
- El archivo está en la carpeta `newsletter`.
- Las secciones de la plantilla están completas.
- Cada enlace funciona y tiene una descripción útil.
- El cuerpo de la pull request enlaza el issue correcto.
- Estás disponible para realizar cambios si las personas revisoras los solicitan.

## Ediciones anteriores

[Archivo de ZecWeekly](https://zechub.substack.com/p/archive)
