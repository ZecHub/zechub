<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Boletín ZecWeekly

ZecWeekly es un boletín que se publica cada viernes por la mañana. Incluye todas las noticias que ocurrieron durante la semana en el ecosistema de Zcash.

Las noticias son seleccionadas semanalmente por miembros de la comunidad y todos los enlaces relevantes se añaden al boletín.

Suscríbete al boletín [aquí](https://zechub.substack.com/).

## Contribuir

Las contribuciones al boletín funcionan mejor cuando una persona colaboradora prepara la edición para la semana correcta, sigue el hilo actual de recompensa o coordinación, y envía el pull request después de que los enlaces semanales estén listos. Por favor, no envíes una edición futura antes de que ZecHub haya publicado o confirmado la fecha de esa edición. Los pull requests enviados con antelación suelen omitir actualizaciones de última hora de la semana, entrar en conflicto con una persona curadora asignada o usar una fecha límite incorrecta.

### 1. Confirma la edición actual

Antes de empezar a escribir:

- Revisa los [issues de GitHub de ZecHub](https://github.com/ZecHub/zechub/issues) y [Dework](https://app.dework.xyz/zechub-2424) para encontrar la tarea actual del boletín.
- Usa la fecha del título del issue o de la descripción de la tarea como fuente de referencia.
- Abre el issue y comprueba si otra persona colaboradora ya ha comentado, ha sido asignada o ha abierto un pull request vinculado.
- Busca pull requests abiertos usando el número del issue y la fecha de la edición antes de empezar. Por ejemplo, busca `is:pr is:open "May 30th" repo:ZecHub/zechub`.
- Si la tarea no está clara, pregunta en el issue, en el Discord de ZecHub o enviando un mensaje a [ZecHub en Twitter](https://twitter.com/ZecHub) antes de preparar la edición completa.

![Issues abiertos de GitHub filtrados para las tareas actuales del boletín ZecWeekly](assets/zecweekly-current-task-search.png)

### 2. Haz un fork del repositorio

Si eres nuevo en GitHub, usa este flujo de trabajo:

1. Abre el [repositorio de ZecHub](https://github.com/ZecHub/zechub).
2. Haz clic en **Fork** y crea un fork en tu cuenta de GitHub.
3. En tu fork, crea una nueva rama para la edición. Un nombre de rama claro es útil, por ejemplo `digest-may-30-2026`.
4. Asegúrate de que tu pull request tenga como repositorio base `ZecHub/zechub` y como rama base `main`.

Si usas la línea de comandos, el mismo flujo de trabajo se ve así:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Crea el archivo del boletín

Usa la [plantilla del boletín](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como punto de partida. Las ediciones del boletín pertenecen a la carpeta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Al crear el archivo:

- Sigue el formato de nombre de archivo solicitado por el issue o usado por las ediciones aceptadas recientemente.
- Mantén el mismo orden de secciones que la plantilla, a menos que la tarea pida un formato diferente.
- Añade enlaces solo de la semana correspondiente.
- Escribe una descripción breve y clara para cada enlace, para que las personas lectoras entiendan por qué es importante.
- Traduce o resume en inglés las fuentes que no estén en inglés cuando sea necesario.
- Revisa cada enlace antes de abrir el pull request.

### 4. Reúne los enlaces en el momento adecuado

ZecWeekly normalmente cubre la actividad del ecosistema de Zcash de la semana actual y se publica cerca del final de la semana. El momento más seguro es:

- Empezar a recopilar enlaces después de que se publique el issue o la tarea del boletín actual.
- Mantener un borrador mientras la semana siga activa.
- Enviar el pull request cerca de la fecha de entrega solicitada, después de haber comprobado si hubo actualizaciones de última hora durante la semana.
- No envíes el boletín de una semana futura antes de que exista la tarea para esa fecha o antes de que ZecHub confirme que debes prepararlo.

Si un issue indica que debes enviarlo antes de una fecha específica, sigue esa fecha. Si hay un conflicto entre esta página y un issue actual, sigue el issue actual.

### 5. Abre el pull request

Cuando tu archivo del boletín esté listo:

1. Haz commit de tus cambios en tu fork.
2. Abre un pull request hacia `ZecHub/zechub` en la rama `main`.
3. Usa un título que coincida con la edición, como `Zcash Ecosystem Digest | May 30th`.
4. Vincula el issue en el cuerpo del pull request para que las personas revisoras puedan conectar el trabajo con la tarea.

Ejemplo de cuerpo de pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Después de abrir el pull request, presta atención a los comentarios de revisión. Si ZecHub solicita cambios, actualiza la misma rama en lugar de abrir un segundo pull request para la misma edición.

### Ejemplos reales

Usa estos pull requests del boletín ya fusionados como ejemplos de envíos aceptados:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![Ejemplo de pull request fusionado del boletín ZecWeekly](assets/zecweekly-example-pr.png)

Al comparar tu trabajo con un ejemplo, céntrate en la ubicación del archivo, el formato del título, el orden de las secciones, las descripciones de los enlaces y si el pull request vuelve a enlazar correctamente con la tarea adecuada.

### Errores comunes que debes evitar

- Abrir un pull request antes de que se confirme la fecha de la edición o la tarea.
- Trabajar en un issue que ya tiene un pull request vinculado.
- Enviar el pull request a tu propio fork en lugar de a `ZecHub/zechub`.
- Usar un nombre de archivo incorrecto o colocar el archivo fuera de la carpeta `newsletter`.
- Copiar una edición anterior sin actualizar cada fecha, enlace y descripción.
- Añadir enlaces de la semana equivocada.
- Dejar enlaces rotos, enlaces duplicados o texto de relleno de la plantilla.
- Abrir un nuevo pull request después de recibir comentarios de revisión en lugar de actualizar la rama original.

### Lista de comprobación final

Antes de solicitar revisión, confirma que:

- La fecha del issue o de la tarea coincide con tu archivo del boletín.
- No hay otro pull request abierto que ya cubra el mismo issue o edición.
- El archivo está en la carpeta `newsletter`.
- Las secciones de la plantilla están completas.
- Todos los enlaces funcionan y tienen una descripción útil.
- El cuerpo del pull request enlaza el issue correcto.
- Estás disponible para hacer cambios si las personas revisoras los solicitan.

## Ediciones anteriores

[Archivo de ZecWeekly](https://zechub.substack.com/p/archive)
