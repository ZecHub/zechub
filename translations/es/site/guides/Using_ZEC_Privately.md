<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Uso de ZEC de forma privada

#### Blindado [Shielded] (Privado [Private]) frente a Transparente [Transparent]

Actualmente, existen dos tipos de direcciones [addresses] y transacciones [transactions] en Zcash: blindadas y transparentes. La diferencia entre ZEC blindados y transparentes es muy sencilla. ZEC blindado mantiene tu dinero y tus transacciones privadas, mientras que ZEC transparente funciona como Bitcoin, de forma completamente transparente. Esto significa que alguien puede ver tu saldo y todas tus transacciones si conoce tu dirección.

Cuando las personas empiezan a usar ZEC por primera vez, quizá no se den cuenta de qué tipo de dirección están usando. Esto se debe a que no todos los exchanges admiten ZEC blindado ni retiros de ZEC blindados. 

Por ejemplo, si alguien usa Coinbase y compra ZEC, compraría ZEC transparente y solo podría retirar ese ZEC a una dirección transparente en una billetera [wallet]. Billeteras como [Zodl](https://zodl.com/) pueden blindar los fondos enviados a una dirección transparente para resolver esto, pero no todo el mundo lo sabe. En pocas palabras, muchas personas usan ZEC de la manera que les permite su exchange o billetera principal.

#### Asegurarte de que tu ZEC esté blindado

Recomendamos que todas las personas mantengan la autocustodia de su ZEC. Es decir, mueve tu ZEC de un exchange a una billetera. La mejor forma de saber si estás usando ZEC blindado, es decir, privado, es observando la dirección donde se encuentra el saldo. Si la dirección empieza con una «z» o «u1», entonces tu saldo está blindado. Si la dirección empieza con una «t», entonces el saldo es transparente.

Por lo general, hay dos caminos para obtener ZEC blindado.

Desde un exchange que admite retiros **blindados**:

  1. Compra ZEC en un exchange
  2. Inicia el proceso de retiro en el exchange
  3. Abre tu billetera ZEC blindada y asegúrate de que la dirección de recepción empiece con una «u1» o «z»
  4. Realiza el retiro desde tu exchange

Desde un exchange que admite retiros **transparentes**:


  1. Compra ZEC en un exchange
  2. Inicia el proceso de retiro en el exchange
  3. Abre tu billetera ZEC con blindaje automático y usa la dirección de recepción transparente
  4. Realiza el retiro desde tu exchange
  5. Espera diez confirmaciones y luego blinda el ZEC desde tu dirección transparente a una dirección blindada


Aquí tienes un tutorial sobre cómo retirar ZEC de un exchange. Ten en cuenta que se trata de un retiro blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
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
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Aquí tienes un tutorial sobre cómo comprar ZEC en Coinbase y enviarlo a Zodl.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transacciones

Después de asegurarte de que tu ZEC esté en una billetera blindada que admita direcciones blindadas, ahora puedes decidir si deseas realizar transacciones con ese ZEC. Realizar transacciones con ZEC es muy fácil. Puedes enviar ZEC a direcciones blindadas o transparentes según la preferencia de la persona. Como sucede con cualquier transacción monetaria, hay pequeñas posibilidades de que las personas filtren datos. ZEC es lo mejor para combatir las filtraciones de datos, pero eso no significa que debas usarlo sin preocupaciones. Estas son algunas cosas que querrás evitar al realizar transacciones con ZEC.

- Revelar tu dirección blindada
- Usar una dirección blindada como puente para direcciones t (es decir, «mezcla»)
- Realizar, y revelar que realizas, un elevado número de transacciones de blindado a transparente
- Informar regularmente a las personas dónde gastas ZEC blindado


En esencia, lo mejor que puedes hacer con tu ZEC es mantenerlo en una billetera blindada, realizar transacciones entre direcciones blindadas y tener cuidado con cómo usas ZEC en público (por ejemplo, en una cafetería). Garantizar la privacidad implica un nivel de responsabilidad. 

#### Recursos

[Zcash transacciones](https://zechub.wiki/using-zcash/transactions)
