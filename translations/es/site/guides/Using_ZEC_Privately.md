<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Usar ZEC de forma privada

#### Blindado (Privado) vs. Transparente

Actualmente, existen dos tipos de direcciones y transacciones en Zcash: blindadas y transparentes. La diferencia entre ZEC blindado y transparente es muy simple. El ZEC blindado mantiene tu dinero y tus transacciones en privado, mientras que el ZEC transparente funciona como Bitcoin, completamente transparente. Esto significa que alguien puede ver tu saldo y todas tus transacciones si conoce tu dirección.

Cuando las personas empiezan a usar ZEC por primera vez, puede que no se den cuenta de qué tipo de dirección están usando. Esto se debe a que no todos los exchanges admiten ZEC blindado y/o retiros de ZEC blindado. 

Así que, por ejemplo, si alguien usa Coinbase y compra ZEC, compraría ZEC transparente y solo podría retirar ese ZEC a una dirección transparente en una wallet. Wallets como [ZODL](https://zodl.com/) pueden blindar fondos enviados a una dirección transparente para resolver esto, pero no todo el mundo lo sabe. Mucha gente, en pocas palabras, usa ZEC de la forma que su exchange o wallet principal se lo permite.

#### Asegúrate de que tu ZEC esté blindado

Recomendamos que todo el mundo tenga autocustodia de su ZEC. Es decir, mueve tu ZEC de un exchange a una wallet. La mejor forma de saber si estás usando ZEC blindado, es decir, privado, es mirando la dirección en la que está el saldo. Si la dirección comienza con una "z" o "u1", entonces tu saldo está blindado. Si la dirección comienza con una "t", entonces el saldo es transparente.

En general, hay dos caminos para llegar al ZEC blindado.

Desde un exchange que admite retiros **blindados**:

  1. Compra ZEC en un exchange
  2. Inicia el proceso de retiro en el exchange
  3. Abre tu wallet de ZEC blindado y asegúrate de que la dirección de recepción comience con una "u1" o "z"
  4. Ejecuta el retiro desde tu exchange

Desde un exchange que admite retiros **transparentes**:


  1. Compra ZEC en un exchange
  2. Inicia el proceso de retiro en el exchange
  3. Abre tu wallet de ZEC con blindaje automático y usa la dirección de recepción transparente
  4. Ejecuta el retiro desde tu exchange
  5. Espera diez confirmaciones y luego blinda el ZEC desde tu dirección transparente hacia una dirección blindada


Aquí tienes un tutorial sobre cómo retirar ZEC desde un exchange. Ten en cuenta que este es un retiro blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Comprar y retirar ZEC a una wallet blindada desde Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Aquí tienes un tutorial sobre cómo blindar tu ZEC desde una dirección transparente a una dirección blindada.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Blinda tu ZEC desde una dirección transparente a una dirección blindada"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Aquí tienes un tutorial sobre cómo comprar ZEC en Coinbase y enviarlo a Zashi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Compra Zcash y blinda al instante"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transacciones

Después de asegurarte de que tu ZEC está en una wallet blindada que admite direcciones blindadas, ahora puedes decidir si deseas realizar transacciones con ese ZEC. Hacer transacciones con ZEC es muy fácil. Puedes enviar ZEC tanto a direcciones blindadas como transparentes, según la preferencia de la otra persona. Como ocurre con cualquier transacción monetaria, hay pequeñas probabilidades de que las personas filtren datos. ZEC es lo mejor que existe para combatir la filtración de datos, pero eso no significa que debas usarlo sin cuidado. Aquí tienes algunas cosas que querrás evitar al hacer transacciones con ZEC.

- Divulgar tu dirección blindada
- Usar una dirección blindada como paso intermedio para t-addresses (es decir, "mixing")
- Realizar, y divulgar que realizas, un alto número de transacciones de blindado a transparente
- Informar regularmente a la gente dónde gastas ZEC blindado


Esencialmente, lo mejor que puedes hacer con tu ZEC es mantenerlo en una wallet blindada, realizar transacciones entre direcciones blindadas y tener cuidado con cómo usas ZEC en público (por ejemplo, en una cafetería). Garantizar la privacidad conlleva un nivel de responsabilidad. 

#### Recursos

[Transacciones de Zcash](https://zechub.wiki/using-zcash/transactions)
