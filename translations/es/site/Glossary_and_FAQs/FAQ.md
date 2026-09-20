# Preguntas frecuentes

Una lista de las preguntas más comunes sobre Zcash. Para solucionar problemas con el cliente Zcash, consulta la [guía oficial de solución de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegación rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Qué es Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Cómo puedo adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Diferencias con otras criptomonedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Gobernanza del protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Dónde está mi transacción?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">¿Es Zcash realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Conceptos erróneos comunes</a>
</div>

---

## ¿Qué es Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash es una moneda digital con transacciones rápidas, confidenciales y de bajas comisiones. La privacidad es la característica central de Zcash. Fue pionera en el uso de pruebas de conocimiento cero para cifrar todas las transacciones.

Hay varias wallets disponibles para pagos instantáneos, móviles, seguros y privados: [Wallets](/using-zcash/wallets)

</div>

## ¿Cómo puedo adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Puedes comprar ZEC en [exchanges con custodia](/using-zcash/custodial-exchanges), [DEX](/dex) o [plataformas centralizadas de intercambio](/using-zcash/centralizedswaps).

También puedes comprar Zcash entre pares o adquirirlo mediante minería.

</div>

## ¿Cuál es la diferencia entre Zcash y otras criptomonedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash es fundamentalmente más privado que Bitcoin o Ethereum. Ofrece tiempos de bloque rápidos (75 segundos), bajas comisiones y actualizaciones regulares.

Los usuarios pueden elegir entre transacciones **Transparentes** o **Blindadas**. Para más información, consulta [Un ecosistema blindado](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## ¿Cómo se gobierna el protocolo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

El protocolo se gobierna mediante el proceso de **Propuesta de mejora de Zcash (ZIP)**. Cualquiera puede presentar un borrador de ZIP. Los borradores son debatidos por la comunidad y aceptados o rechazados por los editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Las decisiones se incorporan a la especificación y se ratifican en la cadena cuando la red las adopta.

</div>

## ¿Dónde está mi transacción?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Primero lee [nuestra guía de exploradores de bloques](/guides/blockchain-explorers). Luego consulta el explorador de bloques [Zcash](https://zcashblockexplorer.com).

Las transacciones expiran después de aproximadamente 25 minutos (20 bloques) y los fondos se devuelven automáticamente.

**Motivos comunes por los que una transacción podría no aparecer:**

- Pérdida de conectividad
- Comisión de transacción demasiado baja
- Sobrecarga de la red
- Demasiadas entradas transparentes (tamaño demasiado grande)

**Consejos para lograrlo:**

- Usa una conexión estable
- Paga la comisión estándar (o una mayor para prioridad)
- Espera e inténtalo de nuevo más tarde
- Usa menos entradas para mantener la transacción pequeña

</div>

## ¿Es Zcash realmente privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sí.** Zcash cifra los datos del remitente, el monto y el destinatario en las transacciones blindadas.

Zcash **no**:

- Cifra las transacciones multifirma (integración de FROST pendiente)
- Protege contra correlaciones con transacciones transparentes
- Oculta direcciones IP

Lectura adicional: [Un ecosistema blindado](https://electriccoin.co/blog/shielded-ecosystem)

</div>

## Algunos conceptos erróneos comunes

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Concepto erróneo</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Respuesta correcta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Es Zcash una moneda centralizada?</td>
      <td className="py-4 px-5 text-foreground">No. Un acuerdo de marca registrada impide que la Zcash Foundation o ECC actúen en contra del consenso de la comunidad. La gobernanza es demostrablemente descentralizada (consulta el [informe de Messari](https://messari.io/report/decentralizing-zcash)). Las encuestas comunitarias, ZecHub y el A/V Club de Zcash Foundation permiten una participación amplia.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Tiene Zcash una puerta trasera?</td>
      <td className="py-4 px-5 text-foreground">No. Ni Zcash ni ningún software criptográfico que hayamos creado contiene una puerta trasera, ni la contendrá jamás.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">¿Está Zcash controlado por una corporación?</td>
      <td className="py-4 px-5 text-foreground">Incorrecto. Aunque colaboramos con empresas en investigación, Zcash mantiene su compromiso con la descentralización. Varias organizaciones autónomas trabajan juntas por la autocustodia y los derechos de privacidad.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tiene privacidad limitada en comparación con otras monedas de privacidad</td>
      <td className="py-4 px-5 text-foreground">No. La privacidad al estilo Monero/Grin se basa en señuelos (que pueden ser derrotados). Zcash cifra todos los datos de las transacciones blindadas, por lo que cada transacción del pool es indistinguible. Consulta [¿No es lo suficientemente privado?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última actualización:** marzo de 2026
**¿Quieres contribuir?** [Edita esta página en GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
