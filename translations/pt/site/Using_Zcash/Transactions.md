<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Transações

ZEC é um ativo digital amplamente utilizado para pagamentos, oferecendo fortes recursos de privacidade que o tornam adequado para várias transações, como pagar amigos, fazer compras ou doar. Para maximizar a privacidade e a segurança, é essencial entender como os diferentes tipos de transações funcionam dentro do Zcash.

## Transações Blindadas

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explicado: Transações Blindadas do Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

As transações blindadas ocorrem quando você move ZEC para sua carteira blindada. O endereço da sua carteira blindada começa com U ou Z. Ao enviar transações blindadas, você está garantindo que você e as pessoas com quem transaciona mantenham um nível de privacidade que não é possível em outras redes de pagamento P2P. Enviar uma transação blindada é muito fácil, você só precisa garantir duas coisas. A primeira é que você está usando o tipo certo de carteira. A maneira mais fácil de garantir que você está usando o tipo certo de carteira é baixando uma [carteira](https://zechub.wiki/wallets). A segunda coisa importante é mover ZEC para uma carteira blindada. Ao sacar ZEC de uma exchange, você precisa saber se a exchange oferece suporte a saques blindados ou transparentes. Se oferecer suporte a saques blindados, você pode simplesmente sacar ZEC para o seu endereço blindado. Se a exchange oferecer suporte apenas a saques transparentes, então você precisa usar YWallet e fazer o autoshield do seu ZEC assim que ele for recebido. Usar apenas transações blindadas para enviar e receber fundos é a melhor maneira de manter a privacidade e reduzir o risco de vazamento de dados

## Transações Transparentes

As transações transparentes funcionam de forma semelhante, mas não têm proteções de privacidade, tornando os detalhes da transação publicamente visíveis na blockchain. As transações transparentes devem ser evitadas quando a privacidade for uma prioridade. Observação: carteiras transparentes podem encontrar problemas devido ao ZIP-317, que exige taxas proporcionais à complexidade da transação. As taxas padrão podem levar à rejeição ou a atrasos, tornando a personalização das taxas crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Aprenda sobre carteiras blindadas 🛡️Zcash!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Gerenciando Taxas para Transações Transparentes

Orientação ZIP-317: A estrutura de taxas aumenta de acordo com a complexidade da transação, exigindo ajustes além da taxa padrão de 0.00001 ZEC.
Exemplo de Cálculo: Uma transação simples com uma única nota pode exigir uma taxa de 0.0001 ZEC, aumentando em aproximadamente 0.00005 ZEC por nota adicional.

Editando Taxas em Carteiras

Trust Wallet: Acesse as configurações avançadas tocando no ícone de engrenagem ao criar uma transação. Ajuste cuidadosamente os campos Miner Tip Gwei e Max Fee Gwei para evitar falha na transação. A Trust Wallet cobra apenas taxas de rede.
Coinomi Wallet: Oferece três opções dinâmicas de taxa — Low, Normal, High — com base nas condições da rede. Para ajustes manuais, selecione Custom nas moedas compatíveis ou use Change Fee no canto superior direito. Os usuários podem definir taxas por byte ou por kilobyte, impactando os tempos de confirmação. Recomenda-se usar as opções dinâmicas em caso de dúvida.

Esta versão incorpora orientações sobre gerenciamento de taxas, opções de taxa dinâmica e configurações de personalização no Trust Wallet e no Coinomi, fornecendo aos usuários detalhes abrangentes de controle de taxas.

#### Recursos

[ZIPS](https://zips.z.cash/)

#### Observação

Observe que a maneira mais segura de usar ZEC é usar apenas transações blindadas. Algumas carteiras estão em processo de implementação de [endereços unificados](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) que permitem que usuários e exchanges combinem endereços transparentes e blindados. 

## Conversor de ZEC para ZAT
