<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Usando o ZEC de forma privada

#### Blindado (privado) vs. transparente

Atualmente, existem dois tipos de endereços e de transações no Zcash: blindados e transparentes. A diferença entre o ZEC blindado e o transparente é muito simples. O ZEC blindado mantém o seu dinheiro e as suas transações privados, enquanto o ZEC transparente funciona como o Bitcoin, de forma completamente transparente. Isso significa que alguém pode ver o seu saldo e todas as suas transações se souber o seu endereço.

Quando as pessoas começam a usar o ZEC, talvez não percebam qual tipo de endereço estão usando. Isso acontece porque nem todas as corretoras oferecem suporte a ZEC blindado e/ou a saques de ZEC blindados. 

Assim, por exemplo, se alguém usa a Coinbase e compra ZEC, estará comprando ZEC transparente e só poderá sacar esse ZEC para um endereço transparente em uma carteira. Carteiras como [Zodl](https://zodl.com/) podem blindar fundos enviados para um endereço transparente para resolver isso, mas nem todo mundo sabe disso. Muitas pessoas, em resumo, usam o ZEC da forma que a corretora ou a carteira principal delas permite.

#### Garantindo que o seu ZEC esteja blindado

Recomendamos que todos mantenham a autocustódia do seu ZEC. Ou seja, transfira o seu ZEC de uma corretora para uma carteira. A melhor forma de saber se você está usando ZEC blindado, ou seja, privado, é olhar o endereço em que o saldo está. Se o endereço começar com "z" ou "u1", o seu saldo está blindado. Se o endereço começar com "t", o saldo está transparente.

Em geral, existem dois caminhos para chegar ao ZEC blindado.

A partir de uma corretora que oferece suporte a saques **blindados**:

  1. Compre ZEC em uma corretora
  2. Inicie o processo de saque na corretora
  3. Abra a sua carteira de ZEC blindada e verifique se o endereço de recebimento começa com "u1" ou "z"
  4. Execute o saque na sua corretora

A partir de uma corretora que oferece suporte a saques **transparentes**:


  1. Compre ZEC em uma corretora
  2. Inicie o processo de saque na corretora
  3. Abra a sua carteira de ZEC com blindagem automática e use o endereço de recebimento transparente
  4. Execute o saque na sua corretora
  5. Aguarde dez confirmações e, em seguida, blinde o ZEC do seu endereço transparente para o endereço blindado


Aqui está um tutorial de como sacar ZEC de uma corretora. Observe que este é um saque blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Compre e saque ZEC para uma carteira blindada a partir da Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Aqui está um tutorial de como blindar o seu ZEC de um endereço transparente para um endereço blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Blinde o seu ZEC de um endereço transparente para um blindado"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Aqui está um tutorial de como comprar ZEC na Coinbase e enviar para a Zodl.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: compre Zcash e blinde instantaneamente"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transações

Depois de garantir que o seu ZEC está em uma carteira blindada que oferece suporte a endereços blindados, você pode decidir se quer fazer transações com esse ZEC. Fazer transações com ZEC é superfácil. Você pode enviar ZEC para endereços blindados ou transparentes, dependendo da preferência da pessoa. Como em qualquer transação monetária, existe uma pequena chance de as pessoas vazarem dados. O ZEC é o melhor no combate ao vazamento de dados, mas isso não significa que você deva usá-lo sem cuidado. Aqui estão algumas coisas que você deve evitar ao fazer transações com ZEC.

- Divulgar o seu endereço blindado
- Usar um endereço blindado como intermediário para t-addresses (também conhecido como "mixing")
- Realizar, e divulgar que realiza, um grande número de transações de blindado para transparente
- Informar regularmente às pessoas onde você gasta ZEC blindado


Basicamente, o melhor a fazer com o seu ZEC é mantê-lo em uma carteira blindada, fazer transações entre endereços blindados e ter cuidado com a forma como você usa o ZEC em público (por exemplo, em uma cafeteria). Garantir a privacidade exige um certo nível de responsabilidade. 

#### Recursos

[Transações Zcash](https://zechub.wiki/using-zcash/transactions)
