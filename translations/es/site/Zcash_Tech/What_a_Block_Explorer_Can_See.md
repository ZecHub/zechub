<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Qué puede ver un explorador de bloques en Zcash

## TL;DR

- En Bitcoin, un explorador de bloques muestra todo: remitente, receptor y cantidad.
- En Zcash, eso solo es cierto para la actividad transparente (t-address).
- Un explorador puede ver cómo el dinero entra y sale del pool blindado, pero no lo que ocurre dentro de él.
- Las transacciones completamente blindadas (z a z) no revelan remitente, ni receptor, ni cantidad.
- Cualquier cifra pública de "shield rate" es un mínimo, porque la actividad totalmente privada es invisible desde fuera.

---

## Dos tipos de direcciones

Zcash tiene dos tipos de direcciones.

Una **dirección transparente** empieza con `t` y funciona como una dirección de Bitcoin. Los saldos y los pagos son públicos.

Una **dirección blindada** empieza con `z` y está protegida por pruebas de conocimiento cero. La red puede confirmar que un pago blindado es válido sin revelar el remitente, el receptor ni la cantidad.

Debido a que hay dos tipos, el valor puede moverse de cuatro maneras: transparente a transparente (t a t), transparente a blindada (t a z, llamado shielding), blindada a transparente (z a t, llamado deshielding), y blindada a blindada (z a z, completamente privado).

## Lo que puede ver un explorador

Un explorador público como [Blockchair](https://blockchair.com/zcash) puede leer claramente:

- Cualquier pago completamente transparente (t a t), de extremo a extremo.
- Dinero que entra en el pool blindado (el lado transparente y la cantidad).
- Dinero que sale del pool blindado (el lado transparente y la cantidad).
- El total de ZEC mantenido en cada pool blindado, que es público para que la red pueda demostrar que no se crearon monedas de la nada.

En resumen, los bordes del pool blindado son visibles. Puedes ver cómo el valor entra y sale.

## Lo que un explorador no puede ver

Un explorador público no puede leer:

- Las transacciones completamente blindadas (z a z). El remitente, el receptor y la cantidad permanecen ocultos.
- El remitente o el receptor detrás de cualquier pago blindado.
- El saldo de una dirección blindada individual.
- Lo que ocurre con los fondos una vez que están dentro del pool.

Si consultas los datos sin procesar, los campos de remitente y receptor blindados aparecen vacíos. El explorador no está ocultando esto por elección. Nunca estuvo en la cadena pública en una forma legible. La información está cifrada, y solo alguien con la viewing key adecuada puede leerla.

## Por qué importa

**Tu privacidad proviene de la criptografía, no de confiar en una empresa.** Un proveedor de datos no puede mirar dentro de una transacción blindada aunque quiera hacerlo.

**Las cifras públicas de shield rate subestiman la privacidad.** Los investigadores solo pueden medir lo que cruza el límite público, así que la cantidad real de actividad privada es al menos la que informan, y por lo general es mayor.

**Un pool blindado más grande protege a todos.** Cuantas más personas usen direcciones blindadas, mayor será el grupo en el que se oculta cualquier pago privado individual. Usar una dirección blindada ayuda a protegerte a ti y a todos los demás en el pool.

## Ponlo en práctica

- Usa una wallet que utilice direcciones blindadas por defecto, como [ZODL](https://zodl.com) o [Ywallet](https://ywallet.app/).
- Cuando recibas ZEC en una dirección transparente, muévelo a una dirección blindada antes de gastarlo.
- Paga a direcciones blindadas cuando puedas. Cada pago transparente es completamente público; uno blindado no lo es.

## Recursos

- [Zcash: recomendaciones de privacidad y seguridad](https://z.cash/support/security/privacy-security-recommendations/)
- [Un ecosistema blindado (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Cómo funciona la tecnología de Zcash](https://z.cash/technology/)
- [Explorador de Zcash de Blockchair](https://blockchair.com/zcash)

## Páginas relacionadas

- [Conceptos básicos de Zcash](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Pools blindados](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Si quieres añadir o sugerir cambios en esta página del wiki, dirígete al [repositorio de GitHub de ZecHub](https://github.com/ZecHub/zechub) y envía un pull request.*
