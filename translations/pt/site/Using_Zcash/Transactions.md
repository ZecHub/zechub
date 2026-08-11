<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Transações

ZEC é um ativo digital amplamente utilizado para pagamentos, oferecendo fortes funcionalidades de privacidade que o tornam adequado para várias transações, como pagar a amigos, fazer compras ou doar. Para maximizar a privacidade e a segurança, é essencial compreender como funcionam os diferentes tipos de transações dentro da Zcash.

## TL;DR

- A Zcash suporta dois tipos de transação: **shielded**, que mantém os detalhes privados, e **transparent**, que os regista publicamente.
- Os endereços shielded começam por `u` ou `z`. Os endereços transparent começam por `t` e comportam-se de forma muito semelhante a um endereço Bitcoin.
- A escolha é sua em cada pagamento. A privacidade é uma opção que a Zcash lhe dá, não uma definição que outra pessoa decide por si.
- Levantar fundos de uma exchange é o contexto mais comum em que as pessoas perdem privacidade. Se a exchange só suportar levantamentos transparent, proteja os fundos você mesmo assim que chegarem.
- As comissões seguem a [ZIP 317](https://zips.z.cash/zip-0317) e aumentam com o tamanho da transação. As wallets que ainda enviam a antiga comissão fixa podem ver as suas transações atrasadas.

## Transações Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

As transações shielded ocorrem quando move ZEC para a sua wallet shielded. O endereço da sua wallet shielded começa com U ou Z. Ao enviar transações shielded, está a garantir que você, e as pessoas com quem transaciona, mantêm um nível de privacidade que não é possível noutras redes de pagamentos P2P. Enviar uma transação shielded é muito fácil, só tem de garantir duas coisas. A primeira é que está a usar o tipo de wallet certo. A forma mais fácil de garantir que está a usar o tipo certo de wallet é descarregar uma [wallet](https://zechub.wiki/wallets). A segunda coisa importante é mover ZEC para uma wallet shielded. Ao levantar ZEC de uma exchange, precisa de saber se a exchange suporta levantamentos shielded ou transparent. Se suportar levantamentos shielded, pode simplesmente levantar ZEC para o seu endereço shielded. Se a exchange só suportar levantamentos transparent, então precisa de usar a YWallet e fazer autoshield ao seu ZEC assim que o receber. Usar apenas transações shielded para enviar e receber fundos é a melhor forma de manter a privacidade e reduzir o risco de fuga de dados

## Transações Transparent

As transações transparent funcionam de forma semelhante, mas não têm proteções de privacidade, tornando os detalhes da transação publicamente visíveis na blockchain. As transações transparent devem ser evitadas quando a privacidade é uma prioridade. Nota: As wallets transparent podem ter problemas devido à ZIP-317, que exige comissões proporcionais à complexidade da transação. As comissões predefinidas podem levar à rejeição ou a atrasos, tornando a personalização das comissões crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Uma Forma Simples de Imaginar Isto

Uma transação transparent é um postal. O carteiro entrega-o, mas qualquer pessoa que lhe mexa pelo caminho pode ler a mensagem, ver quem a enviou e ver quem a recebe.

Uma transação shielded é um envelope selado. O serviço postal continua a confirmar que uma carta real com portes reais passou pelo sistema, e ninguém pode falsificar uma nem enviar a mesma carta duas vezes. O que o envelope contém fica entre remetente e destinatário.

A parte importante é que a Zcash lhe permite decidir qual enviar, pagamento a pagamento.

## Gestão de Comissões para Transações Transparent

Orientação da ZIP-317: A estrutura de comissões escala com a complexidade da transação, exigindo ajustes para além da comissão padrão de 0.00001 ZEC.
Exemplo de cálculo: Uma transação simples com uma única nota pode exigir uma comissão de 0.0001 ZEC, aumentando em cerca de 0.00005 ZEC por cada nota adicional.

Editar Comissões nas Wallets

Trust Wallet: Aceda às definições avançadas tocando no ícone de engrenagem enquanto cria uma transação. Ajuste cuidadosamente os campos Miner Tip Gwei e Max Fee Gwei para evitar a falha da transação. A Trust Wallet cobra apenas comissões de rede.
Coinomi Wallet: Oferece três opções de comissões dinâmicas — Low, Normal, High — com base nas condições da rede. Para ajustes manuais, selecione Custom nas moedas suportadas ou use Change Fee no canto superior direito. Os utilizadores podem definir comissões por byte ou por kilobyte, afetando os tempos de confirmação. Recomenda-se usar as opções dinâmicas em caso de dúvida.

## Erros Comuns

- **Assumir que qualquer wallet que liste ZEC o pode enviar de forma privada.** Várias wallets multi-moeda suportam apenas o lado transparent da Zcash. Verifique os pools suportados pela wallet antes de confiar nela para privacidade. A página [Wallets](https://zechub.wiki/using-zcash/wallets) lista isso para cada opção.
- **Levantar para um endereço transparent e deixar lá os fundos.** O próprio levantamento é público, e qualquer movimento posterior a partir desse endereço também permanece público. Proteja os fundos assim que chegarem.
- **Tratar a privacidade como algo que se ativa uma vez.** Cada transação é uma escolha separada. Enviar shielded hoje não desfaz um pagamento transparent que fez na semana passada.
- **Reutilizar um endereço transparent para tudo.** Como a atividade transparent é permanentemente visível, um único endereço reutilizado vai, gradualmente, ligar pagamentos que não tinham motivo para estar ligados.
- **Enviar com uma comissão predefinida desatualizada.** As wallets que ainda não adotaram a ZIP 317 podem continuar a enviar a antiga comissão fixa, o que pode deixar uma transação pendente sem confirmação.

## Nota

Tenha em atenção que a forma mais segura de usar ZEC é utilizar apenas transações shielded. Algumas wallets estão em processo de implementação de [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) que permitem aos utilizadores e às exchanges combinar endereços transparent e shielded.

## Recursos

[ZIPS](https://zips.z.cash/)

## Páginas Relacionadas

- [Wallets](/using-zcash/wallets) — que wallets suportam envio shielded e quais são apenas transparent
- [Pools Shielded](/using-zcash/shielded-pools) — Sapling e Orchard, os pools onde vivem os seus fundos shielded
- [Memos](/using-zcash/memos) — mensagens encriptadas que podem acompanhar uma transação shielded
- [Endereços Transparent de Exchange](/using-zcash/transparent-exchange-addresses) — endereços TEX e porque as exchanges os utilizam
- [Exchanges Custodiais](/using-zcash/custodial-exchanges) — quais as exchanges que suportam levantamentos shielded

## Conversor de ZEC para ZAT
