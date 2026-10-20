# Preguntas frecuentes

Una lista de las preguntas más comunes sobre Zcash. Para solucionar problemas con el cliente Zcash, consulta la [guía oficial de solución de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegación rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Qué es Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Cómo puedo adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Diferencia con otras criptomonedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Gobernanza del protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Dónde está mi transacción?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Es Zcash realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ideas erróneas comunes</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿zcashd dejó de funcionar?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Mover mi wallet a Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Qué es Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Qué nodo completo?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Buscar un término?</a>
</div>

---

## ¿Qué es Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash es una moneda digital con transacciones rápidas, confidenciales y de bajo costo. La privacidad es la característica central de Zcash. Fue pionero en el uso de pruebas de conocimiento cero para cifrar todas las transacciones.

Hay varias wallets disponibles para pagos instantáneos, móviles, seguros y privados: [Wallets](/using-zcash/wallets)

</div>

## ¿Cómo puedo adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Puedes comprar ZEC en [exchanges con custodia](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex) o [plataformas de intercambio centralizadas](/using-zcash/centralized-swaps).

También puedes comprar Zcash de persona a persona o adquirirlo mediante minería.

</div>

## ¿Cuál es la diferencia entre Zcash y otras criptomonedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash es fundamentalmente más privado que Bitcoin o Ethereum. Ofrece tiempos de bloque rápidos (75 segundos), bajas comisiones y actualizaciones periódicas.

Los usuarios pueden elegir entre transacciones **Transparent** o **Shielded**. Para más información, consulta [Un ecosistema Shielded](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## ¿Cómo se gobierna el protocolo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

El protocolo se gobierna mediante el proceso de **propuesta de mejora de Zcash (ZIP)**. Cualquiera puede enviar un borrador de ZIP. Los borradores se debaten en la comunidad y los editores de ZIP los aceptan o rechazan:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Las decisiones se incorporan a la especificación y se ratifican on-chain cuando la red las adopta.

</div>

## ¿Dónde está mi transacción?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Primero lee [nuestra guía sobre exploradores de bloques](/guides/blockchain-explorers). Luego consulta el explorador de bloques [Zcash](https://mainnet.zcashexplorer.app).

Las transacciones expiran después de aproximadamente 25 minutos (20 bloques) y los fondos se devuelven automáticamente.

**Motivos comunes por los que una transacción podría no aparecer:**

- Pérdida de conectividad
- Comisión de transacción demasiado baja
- Sobrecarga de la red
- Demasiadas entradas transparentes (tamaño demasiado grande)

**Consejos para lograrlo:**

- Usa una conexión estable
- Paga la comisión estándar (o una mayor para obtener prioridad)
- Espera y vuelve a intentarlo más tarde
- Usa menos entradas para mantener la transacción pequeña

</div>

## ¿Es Zcash realmente privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sí.** Zcash cifra los datos del remitente, el importe y el destinatario en las transacciones shielded.

Zcash **no**:

- Cifra transacciones multifirma (integración de FROST pendiente)
- Protege contra correlaciones con transacciones transparentes
- Oculta direcciones IP

Lectura adicional: [Un ecosistema Shielded](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd dejó de funcionar, ¿qué ejecuto ahora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd está retirado. La versión 6.20.0 se apagó automáticamente en el bloque 3417100 el 18 de julio de 2026, y nunca admitió Ironwood (NU6.3), por lo que no hay una versión posterior a la que actualizar.

Ejecuta la pila Z3 en su lugar. Tres programas dividen el trabajo que zcashd solía realizar por sí solo:

- **[Zebra](/zcash-tech/zebra-full-node)** valida la cadena
- **[Zaino](/zcash-tech/zaino)** la indexa y proporciona datos de wallet
- **[Zallet](/zcash-tech/zallet)** guarda tus fondos

[Zakura](/zcash-tech/zakura-node) es un nodo completo alternativo. También ejecuta zcashd sobre sí mismo, lo que ayuda si otro software aún espera la interfaz antigua.

Empieza con la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## ¿Cómo muevo mi wallet zcashd a Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migra una `wallet.dat` existente, por lo que conservas tus fondos y direcciones.

Primero haz una copia de seguridad de `wallet.dat` y luego sigue la [guía de migración](/guides/migration-guide-zcashd-to-zebrad-zallet). Conserva esa copia de seguridad hasta que hayas confirmado tu saldo en Zallet.

La referencia rápida [Zallet](/using-zcash/zallet-quick-reference-guide) cubre los comandos cotidianos una vez que hayas terminado la migración.

</div>

## ¿Qué es Ironwood y debo hacer algo?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood es la actualización de red NU6.3, activa en mainnet desde el bloque 3,428,143 el 28 de julio de 2026. Añade un pool shielded basado en un circuito corregido y sella el pool [Orchard](/using-zcash/shielded-pools) más antiguo, de modo que cualquiera puede verificar que no se falsificó ningún ZEC.

**Si tienes fondos shielded, puede que deban moverse.** El valor sale de Orchard únicamente a través de [el torniquete](/zcash-tech/the-turnstile), y las wallets gestionan el movimiento en distintos momentos y de diferentes maneras. Consulta a tu proveedor de wallet antes de mover nada manualmente.

Lee [Ironwood](/zcash-tech/ironwood) para saber qué cambió y por qué.

</div>

## ¿Qué nodo completo debería ejecutar?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** es el reemplazo directo de zcashd y el nodo que presupone la guía de migración. Elígelo salvo que tengas un motivo para no hacerlo.

**[Zakura](/zcash-tech/zakura-node)** es una segunda implementación orientada a la escala, con sincronización más rápida y poda de bloques nativa. Elígelo si necesitas esas características o si dependes de software que aún se comunica con zcashd.

Ambos validan la misma cadena, por lo que se trata de una elección operativa y no de consenso.

</div>

## ¿Dónde busco un término de una nota de lanzamiento?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulta la biblioteca [Zcash](/glossary-and-faqs/zcash-library). Abarca el software de nodo y wallet, los pools shielded y los números ZIP que aparecen con mayor frecuencia.

</div>

## Algunas ideas erróneas comunes

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Idea errónea</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Respuesta correcta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Es Zcash una moneda centralizada?</td>
      <td className="py-4 px-5 text-foreground">No. Un acuerdo de marca registrada impide que Zcash Foundation o ECC actúen en contra del consenso de la comunidad. La gobernanza está demostrablemente descentralizada (consulta el informe [Messari](https://messari.io/report/decentralizing-zcash)). Las encuestas comunitarias, ZecHub y el A/V Club de Zcash Foundation permiten una amplia participación.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Tiene Zcash una puerta trasera?</td>
      <td className="py-4 px-5 text-foreground">No. Ni Zcash ni ningún software criptográfico que hayamos creado contiene una puerta trasera, ni la contendrá jamás.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Está Zcash controlado por una corporación?</td>
      <td className="py-4 px-5 text-foreground">Incorrecto. Aunque colaboramos con empresas en investigación, Zcash sigue comprometido con la descentralización. Múltiples organizaciones autónomas trabajan juntas en favor de la autocustodia y los derechos de privacidad.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tiene una privacidad limitada en comparación con otras monedas de privacidad</td>
      <td className="py-4 px-5 text-foreground">No. La privacidad de estilo Monero/Grin se basa en señuelos (que pueden ser derrotados). Zcash cifra todos los datos de las transacciones shielded, por lo que cada transacción del pool es indistinguible. Consulta [¿No es suficientemente privado?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última actualización:** octubre de 2026
**¿Quieres contribuir?** [Edita esta página en GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
