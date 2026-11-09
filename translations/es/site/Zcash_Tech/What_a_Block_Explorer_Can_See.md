<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Lo que un explorador de bloques [block explorer] puede ver en Zcash

## TL;DR

- En Bitcoin, un explorador de bloques muestra todo: remitente, receptor y cantidad [amount].
- En Zcash, eso solo es cierto para la actividad transparente [transparent] (t-address).
- Un explorador puede ver dinero entrar y salir del pool [pool] blindado [shielded], pero no lo que ocurre dentro de él.
- Las transacciones [transactions] completamente blindadas (z a z) no revelan remitente, receptor ni cantidad.
- Cualquier cifra pública de «tasa de blindaje» es un mínimo, porque la actividad totalmente privada es invisible desde fuera.

---

## Dos tipos de direcciones [addresses]

Zcash tiene dos tipos de direcciones.

Una **dirección transparente** empieza con `t` y funciona como una dirección de Bitcoin. Los saldos y pagos [payments] son públicos.

Una **dirección blindada** empieza con `z` y está protegida por pruebas [proofs] zero-knowledge. La red puede confirmar que un pago blindado es válido sin revelar el remitente, el receptor ni la cantidad.

Como hay dos tipos, el valor puede moverse de cuatro formas: de transparente a transparente (t a t), de transparente a blindado (t a z, llamado blindaje), de blindado a transparente (z a t, llamado desblindaje), y de blindado a blindado (z a z, totalmente privado).

## Lo que puede ver un explorador

Un explorador público como [ZecBlock](https://zecblock.com/) puede leer claramente:

- Cualquier pago totalmente transparente (t a t), de principio a fin.
- Dinero que entra en el pool blindado (el lado transparente y la cantidad).
- Dinero que sale del pool blindado (el lado transparente y la cantidad).
- El total de ZEC mantenido en cada pool blindado, que es público para que la red pueda demostrar que no se crearon monedas de la nada.

En resumen, los bordes del pool blindado son visibles. Puedes observar cómo el valor entra y sale.

## Lo que no puede ver un explorador

Un explorador público no puede leer:

- Transacciones totalmente blindadas (z a z). El remitente, el receptor y la cantidad permanecen ocultos.
- El remitente o receptor detrás de cualquier pago blindado.
- El saldo de una dirección blindada individual.
- Lo que ocurre con los fondos una vez que están dentro del pool.

Consulta los datos sin procesar y los campos de remitente y receptor blindados aparecen vacíos. El explorador no oculta esto por elección. Nunca estuvo en la cadena pública de forma legible. La información está cifrada, y solo alguien con las claves de visualización [viewing key] correctas puede leerla.

## Por qué importa

**Tu privacidad [privacy] proviene de la criptografía, no de confiar en una empresa.** Un proveedor de datos no puede mirar dentro de una transacción blindada aunque quiera hacerlo.

**Las cifras públicas de tasa de blindaje subestiman la privacidad.** Los investigadores solo pueden medir lo que cruza el límite público, por lo que la cantidad real de actividad privada es al menos la que informan, y normalmente mayor.

**Un pool blindado más grande protege a todos.** Cuantas más personas usen direcciones blindadas, mayor será el grupo en el que se oculta cada pago privado. Usar una dirección blindada ayuda a protegerte a ti y a todos los demás en el pool.

## Ponlo en práctica

- Usa una billetera [wallet] que utilice direcciones blindadas de forma predeterminada, como [ZODL](https://zodl.com) o [Zingo!](https://www.zingolabs.org/).
- Cuando recibas ZEC en una dirección transparente, muévelo a una dirección blindada antes de gastarlo.
- Paga a direcciones blindadas cuando puedas. Cada pago transparente es totalmente público; uno blindado no lo es.

## Recursos

- [Zcash: recomendaciones de privacidad y seguridad](https://z.cash/support/security/privacy-security-recommendations/)
- [Un ecosistema blindado (Electric Coin Company)](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Cómo funciona la tecnología de Zcash](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## Páginas relacionadas

- [Conceptos básicos de Zcash](/start-here/what-is-zec-and-zcash)
- [Billeteras](/using-zcash/wallets)
- [Pools blindados](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*Si deseas añadir o sugerir ediciones a esta página wiki, dirígete al repositorio de [ZecHub GitHub](https://github.com/ZecHub/zechub) y envía una pull request.*
