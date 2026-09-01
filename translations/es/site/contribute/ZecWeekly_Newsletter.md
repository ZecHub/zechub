<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletín ZecWeekly

ZecWeekly es un boletín que se envía cada domingo por la mañana. Incluye todas las noticias que ocurrieron durante la semana en el ecosistema de Zcash. Las noticias son seleccionadas semanalmente por miembros de la comunidad y todos los enlaces relevantes se agregan al boletín. Suscríbete al boletín [aquí](https://zechub.substack.com/).

## Contribuir

Las contribuciones al boletín funcionan mejor cuando un colaborador prepara la edición de la semana correcta, sigue el hilo actual de recompensa o coordinación y envía el pull request una vez que los enlaces semanales están listos. Por favor, no envíes una edición futura antes de que ZecHub haya publicado o confirmado la fecha de esa edición. Los pull requests enviados con demasiada anticipación suelen omitir actualizaciones de última hora de la semana, entrar en conflicto con un curador asignado o usar la fecha límite incorrecta.

### 1. Confirmar la edición actual

Antes de empezar a escribir:

- Revisa [ZEC Bounties ](https://bounties.zechub.wiki/) para ver la tarea actual del boletín.
- Espera a que te asignen la tarea

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Hacer un fork del repositorio

Si eres nuevo en GitHub, usa este flujo de trabajo:

1. Abre el [repositorio de ZecHub](https://github.com/ZecHub/zechub).
2. Haz clic en **Fork** y crea un fork en tu cuenta de GitHub.
3. En tu fork, crea una nueva rama para la edición. Un nombre de rama claro es útil, como `digest-may-30-2026`.
4. Asegúrate de que tu pull request tenga como repositorio base `ZecHub/zechub` y como rama base `main`.

Si usas la línea de comandos, el mismo flujo de trabajo se ve así:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Reemplaza `YOUR-USERNAME` con tu propio nombre de usuario de GitHub. La URL de arriba es un marcador de posición y no se resolverá tal como está escrita.

### 3. Crear el archivo del boletín

Usa la [plantilla del boletín](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como punto de partida. Las ediciones del boletín pertenecen a la carpeta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Al crear el archivo:

- Sigue el formato de nombre de archivo solicitado por el issue o usado por las ediciones aceptadas recientes.
- Mantén el mismo orden de secciones que la plantilla, a menos que la tarea pida un formato diferente.
- Agrega enlaces solo de la semana correspondiente.
- Escribe una descripción breve y clara para cada enlace para que los lectores entiendan por qué es importante.
- Traduce o resume en inglés las fuentes que no estén en inglés cuando sea necesario.
- Verifica cada enlace antes de abrir el pull request.

### 4. Recopilar enlaces en el momento adecuado

ZecWeekly normalmente cubre la actividad del ecosistema de Zcash de la semana actual y se publica cerca del final de la semana. El momento más seguro es:

- Empezar a recopilar enlaces después de que se publique la edición actual del boletín o la tarea.
- Mantener un borrador mientras la semana siga en curso.
- Enviar el pull request cerca de la fecha de entrega solicitada, después de haber revisado las actualizaciones de última hora de la semana.
- No enviar el boletín de una semana futura antes de que exista la tarea para esa fecha o antes de que ZecHub confirme que debes prepararlo.

Si un issue dice que debes enviarlo antes de una fecha específica, sigue esa fecha. Si hay un conflicto entre esta página y un issue actual, sigue el issue actual.

### 5. Abrir el pull request

Cuando tu archivo del boletín esté listo:

1. Haz commit de tus cambios en tu fork.
2. Abre un pull request hacia `ZecHub/zechub` en la rama `main`.
3. Usa un título que coincida con la edición, como `Zcash Ecosystem Digest | May 30th`.
4. Enlaza el issue en el cuerpo del pull request para que los revisores puedan conectar el trabajo con la tarea.

Ejemplo de cuerpo del pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Después de abrir el pull request, presta atención a los comentarios de revisión. Si ZecHub pide cambios, actualiza la misma rama en lugar de abrir un segundo pull request para la misma edición.

### Ejemplos reales

Usa estos pull requests fusionados del boletín como ejemplos de envíos aceptados:

- [Zcash Ecosystem Digest | 11 de abril](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 de marzo](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 de febrero](https://github.com/ZecHub/zechub/pull/1474)


![Ejemplo de pull request fusionado del boletín ZecWeekly](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Al comparar tu trabajo con un ejemplo, concéntrate en la ubicación del archivo, el formato del título, el orden de las secciones, las descripciones de los enlaces y en si el pull request se conecta correctamente con la tarea correspondiente.

### Errores comunes que debes evitar

- Abrir un pull request antes de que se confirme la fecha de la edición o la tarea.
- Trabajar en un issue que ya tiene un pull request enlazado.
- Enviar el pull request a tu propio fork en lugar de a `ZecHub/zechub`.
- Usar el nombre de archivo incorrecto o colocar el archivo fuera de la carpeta `newsletter`.
- Copiar una edición antigua sin actualizar todas las fechas, enlaces y descripciones.
- Agregar enlaces de la semana equivocada.
- Dejar enlaces rotos, enlaces duplicados o texto de marcador de posición de la plantilla.
- Abrir un nuevo pull request después de comentarios de revisión en lugar de actualizar la rama original.

### Lista de verificación final

Antes de solicitar revisión, confirma que:

- La fecha del issue o de la tarea coincide con tu archivo del boletín.
- Ningún otro pull request abierto ya está cubriendo el mismo issue o edición.
- El archivo está en la carpeta `newsletter`.
- Las secciones de la plantilla están completas.
- Todos los enlaces funcionan y tienen una descripción útil.
- El cuerpo del pull request enlaza el issue correcto.
- Estás disponible para hacer cambios si los revisores los solicitan.

## Ediciones anteriores

[Archivo de ZecWeekly](https://zechub.substack.com/p/archive)
