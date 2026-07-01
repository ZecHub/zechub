# Preguntas Frecuentes

Una lista de las preguntas más comunes sobre Zcash. Para solucionar problemas del cliente de Zcash, consulta la [guía oficial de solución de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegación rápida
[¿Qué es Zcash?](#what-is-zcash) | [¿Cómo adquirir Zcash?](#acquire) | [¿Diferencia con otras criptomonedas?](#difference) | [¿Gobernanza del protocolo?](#governance) | [¿Dónde está mi transacción?](#transaction) | [¿Zcash es realmente privado?](#privacy) | [Conceptos erróneos comunes](#misconceptions)

---

## ¿Qué es Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash es una moneda digital con transacciones rápidas, confidenciales y de bajas comisiones. La privacidad es la característica central de Zcash. Fue pionero en el uso de pruebas de conocimiento cero para cifrar todas las transacciones.  

Hay varias billeteras disponibles para pagos instantáneos, móviles, seguros y privados: [Billeteras móviles](https://z.cash/wallets/)
</div>

## ¿Cómo puedo adquirir Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Puedes comprar ZEC en [exchanges](https://z.cash/exchanges) de criptomonedas.  
También puedes comprar Zcash entre particulares o adquirirlo mediante minería.
</div>

## ¿Cuál es la diferencia entre Zcash y otras criptomonedas?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash es fundamentalmente más privado que Bitcoin o Ethereum. Ofrece tiempos de bloque rápidos (75 segundos), bajas comisiones y actualizaciones regulares.  

Los usuarios pueden elegir entre transacciones **Transparentes** o **Blindadas**. Para más información, consulta [Un ecosistema blindado](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## ¿Cómo se gobierna el protocolo de Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
El protocolo se gobierna mediante el proceso **Zcash Improvement Proposal (ZIP)**. Cualquiera puede presentar un borrador de ZIP. Los borradores son debatidos por la comunidad y aceptados o rechazados por los editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Las decisiones se incorporan a la especificación y se ratifican on-chain cuando la red las adopta.
</div>

## ¿Dónde está mi transacción?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Primero lee [nuestra guía sobre exploradores de bloques](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Luego revisa [Zcash Block Explorer](https://zcashblockexplorer.com).  

Las transacciones expiran después de aproximadamente 25 minutos (20 bloques) y los fondos se devuelven automáticamente.  

**Razones comunes por las que una transacción puede no aparecer:**
- Pérdida de conectividad
- Comisión de transacción demasiado baja
- Sobrecarga de la red
- Demasiadas entradas transparentes (tamaño demasiado grande)

**Consejos para tener éxito:**
- Usa una conexión estable
- Paga la comisión estándar (o una mayor para prioridad)
- Espera e inténtalo de nuevo más tarde
- Usa menos entradas para mantener la transacción pequeña
</div>

## ¿Zcash es realmente privado?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Sí.** Zcash cifra los datos del remitente, la cantidad y el destinatario en las transacciones blindadas.  

Zcash **no**:
- Cifra las transacciones multifirma (integración de FROST pendiente)
- Protege contra correlaciones con transacciones transparentes
- Oculta las direcciones IP

Lectura adicional: [Un ecosistema blindado](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Algunos conceptos erróneos comunes

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Concepto erróneo</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Respuesta correcta</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">¿Es Zcash una moneda centralizada?</td>
        <td className="py-5 px-6 text-foreground">No. Un acuerdo de marca impide que la Zcash Foundation o ECC actúen en contra del consenso de la comunidad. La gobernanza está demostrada como descentralizada (ver [informe de Messari](https://messari.io/report/decentralizing-zcash)). Las encuestas comunitarias, ZecHub y el A/V Club de Zcash Foundation permiten una amplia participación.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">¿Zcash tiene una puerta trasera?</td>
        <td className="py-5 px-6 text-foreground">No. Ni Zcash ni ningún software criptográfico que hayamos creado contiene una puerta trasera, y nunca la contendrá.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">¿Zcash está controlado por una corporación?</td>
        <td className="py-5 px-6 text-foreground">Incorrecto. Aunque colaboramos con empresas para la investigación, Zcash mantiene su compromiso con la descentralización. Varias organizaciones autónomas trabajan juntas en favor de la autocustodia y los derechos de privacidad.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash tiene una privacidad limitada en comparación con otras monedas de privacidad</td>
        <td className="py-5 px-6 text-foreground">No. La privacidad al estilo Monero/Grin se basa en señuelos (que pueden ser derrotados). Zcash cifra todos los datos de las transacciones blindadas, por lo que cada transacción del pool es indistinguible. Consulta [¿No es suficientemente privado?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Última actualización:** Marzo de 2026  
**¿Quieres contribuir?** [Edita esta página en GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
