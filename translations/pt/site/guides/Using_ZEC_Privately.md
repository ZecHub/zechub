<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Usando ZEC, de forma privada

#### Blindado (Privado) vs. Transparente

Atualmente, existem dois tipos de endereços e transações no Zcash: blindados e transparentes. A diferença entre ZEC blindado e transparente é muito simples. O ZEC blindado mantém seu dinheiro e suas transações privados, enquanto o ZEC transparente funciona como o Bitcoin, de forma completamente transparente. Isso significa que alguém pode ver seu saldo e todas as suas transações se souber seu endereço.

Quando as pessoas começam a usar ZEC pela primeira vez, talvez não percebam qual tipo de endereço estão usando. Isso acontece porque nem todas as exchanges oferecem suporte a ZEC blindado e/ou saques de ZEC blindado.

Então, por exemplo, se alguém usa a Coinbase e compra ZEC, estará comprando ZEC transparente e só poderá sacar esse ZEC para um endereço transparente em uma carteira. Carteiras como [ZODL](https://zodl.com/) podem blindar fundos enviados para um endereço transparente para resolver isso, mas nem todo mundo sabe disso. Em termos simples, muitas pessoas usam ZEC da forma que sua exchange ou carteira principal lhes permite.

#### Garantindo que seu ZEC esteja blindado

Recomendamos que todos façam a autocustódia de seu ZEC. Ou seja, movam seu ZEC de uma exchange para uma carteira. A melhor forma de saber se você está usando ZEC blindado, também conhecido como privado, é observando o endereço onde o saldo está. Se o endereço começar com `z` ou `u1`, então seu saldo está blindado. Se o endereço começar com `t`, então o saldo é transparente.

Em geral, há dois caminhos para obter ZEC blindado.

De uma exchange que oferece suporte a saques **blindados**:

  1. Compre ZEC em uma exchange
  2. Inicie o processo de saque na exchange
  3. Abra sua carteira de ZEC blindado e verifique se o endereço de recebimento começa com `u1` ou `z`
  4. Execute o saque da sua exchange

De uma exchange que oferece suporte a saques **transparentes**:


  1. Compre ZEC em uma exchange
  2. Inicie o processo de saque na exchange
  3. Abra sua carteira de ZEC com blindagem automática e use o endereço transparente de recebimento
  4. Execute o saque da sua exchange
  5. Aguarde dez confirmações e, em seguida, blinde o ZEC do seu endereço transparente para um endereço blindado


Aqui está um tutorial sobre como sacar ZEC de uma exchange. Observe que este é um saque blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Compre e saque ZEC para uma carteira blindada pela Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Aqui está um tutorial sobre como blindar seu ZEC de um endereço transparente para um endereço blindado.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Blinde seu ZEC de um endereço transparente para um endereço blindado"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Aqui está um tutorial sobre como comprar ZEC na Coinbase e enviar para a Zashi.

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

Depois de garantir que seu ZEC esteja em uma carteira blindada que ofereça suporte a endereços blindados, você pode decidir se deseja transacionar com esse ZEC. Transacionar com ZEC é super fácil. Você pode enviar ZEC para endereços blindados ou transparentes, dependendo da preferência da pessoa. Como em qualquer transação monetária, há pequenas chances de as pessoas vazarem dados. O ZEC é o melhor no combate ao vazamento de dados, mas isso não significa que você deva usá-lo de forma descuidada. Aqui estão algumas coisas que você vai querer evitar ao transacionar com ZEC.

- Divulgar seu endereço blindado
- Usar um endereço blindado como passagem para t-addresses (também conhecido como "mixing")
- Realizar, e divulgar que realiza, um grande número de transações de blindado para transparente
- Informar regularmente às pessoas onde você gasta ZEC blindado


Essencialmente, a melhor coisa a fazer com seu ZEC é mantê-lo em uma carteira blindada, transacionar entre endereços blindados e ter cuidado com a forma como você usa ZEC em público (por exemplo, em uma cafeteria). Garantir privacidade envolve um nível de responsabilidade.

#### Recursos

[Transações Zcash](https://zechub.wiki/using-zcash/transactions)
