<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Conhecimento zero vs. sistemas baseados em iscas

"A criptomoeda expõe todas as suas atividades de gasto ao público, pois é como um Twitter para a sua conta bancária, e isso é um grande problema que deve ser resolvido adotando privacidade on-chain." - Ian Miers na [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certos projetos cripto ganharam reconhecimento por suas abordagens centradas em privacidade. O Zcash é renomado por empregar provas de conhecimento zero (ZK) para proteger os valores e endereços das transações. Monero se destaca por utilizar ofuscação do remetente baseada em iscas em combinação com outros esquemas criptográficos para alcançar a privacidade do usuário na blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Entendendo provas ZK e sistemas baseados em iscas

As provas de conhecimento zero são sistemas criptográficos que permitem que uma parte (o provador) demonstre à outra parte (o verificador) a validade de uma afirmação sem revelar *qualquer informação subjacente sobre a própria afirmação*. No contexto do Zcash, as provas ZK são empregadas para verificar a validade de uma transação sem divulgar detalhes da transação, como o REMETENTE, o DESTINATÁRIO ou o VALOR da transação. 

**Isso garante que a privacidade do usuário seja preservada, já que a transação permanece confidencial enquanto ainda é validada. Essa tecnologia foi projetada para assegurar a confidencialidade das transações financeiras na rede Zcash.**

Em sistemas baseados em iscas, como o [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), múltiplas transações são combinadas, tornando desafiador rastrear a origem e o destino reais dos fundos. O algoritmo introduz entradas e saídas de isca nas transações, também empregando criptografia dos endereços usados como entradas e utilizando provas de intervalo para validar que o valor transferido pode ser gasto. 

Essa abordagem ofusca o rastro da transação. O uso de entradas de isca torna desafiador para qualquer pessoa que analise a blockchain identificar o remetente real, o destinatário real ou o valor da transação. 

**Nota importante**: Esse método de transação com preservação de privacidade on-chain ainda revela explicitamente as entradas (criptografadas) de todas as transações dos usuários. Metadados como o *FLUXO DE TRANSAÇÕES* entre diferentes usuários na rede ainda podem ser coletados. Se um adversário participar ativamente da geração de transações na rede, isso efetivamente desanonimiza as entradas de isca de outros usuários. 


## Vantagens de ZK sobre sistemas baseados em iscas

Tanto Zcash quanto Monero são criptomoedas focadas em privacidade, mas alcançam privacidade de maneiras diferentes. 

Aqui estão algumas vantagens das provas de conhecimento zero (ZK) do Zcash sobre o sistema de iscas da Monero:

1) **Divulgação seletiva**: Com o conjunto de funcionalidades ZK do Zcash, os usuários têm a opção de revelar detalhes da transação a partes específicas [Leia o blog da ECC sobre divulgação seletiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). No Zcash, os conteúdos criptografados das transações blindadas permitem que indivíduos revelem seletivamente dados de uma transferência específica. Além disso, uma chave de visualização pode ser fornecida para divulgar todas as transações associadas a um endereço blindado específico. Esse recurso permite conformidade regulatória e auditabilidade sem comprometer a privacidade geral da rede. 

Embora o algoritmo de isca da Monero (assinatura em anel) ajude a fornecer privacidade, ele não oferece divulgação *seletiva* da mesma forma.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Visibilidade opcional**: O Zcash permite que os usuários escolham entre transações transparentes (não privadas) e blindadas (privadas). Isso significa que o Zcash oferece aos usuários a flexibilidade de manter suas informações financeiras privadas (blindadas) ou torná-las transparentes e publicamente disponíveis, de forma semelhante à maioria das outras blockchains, como explicado no [site oficial do Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Essa privacidade por adesão permite maior flexibilidade e casos de uso relevantes para negócios/organizações, pois algumas transações podem exigir menos privacidade para escrutínio público, enquanto outras se beneficiam de maior privacidade.


3) **Conjunto de anonimato**: O [conjunto de anonimato](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) dos pools blindados de conhecimento zero compreende todas as transações que já ocorreram. Isso é significativamente maior do que a maioria das outras técnicas on-chain para tornar as transações não vinculáveis. Observação: isso se aplica apenas a transações dentro do mesmo pool blindado.

O uso de iscas realmente aumenta o conjunto de anonimato. No entanto, essa abordagem depende inteiramente do número de usuários *reais* na rede. 

4) **Sem configuração confiável**: A configuração do Sprout e do Sapling do Zcash utilizou uma computação multipartidária conhecida como "cerimônia de configuração confiável". A atualização recente NU5 não exigiu qualquer confiança na integridade da configuração do circuito de conhecimento zero. [Leia o blog da ECC sobre a NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacidade de dados**: A [tecnologia zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) usada nos pools blindados do Zcash permite uma segurança significativamente reforçada para os usuários. A redução do vazamento de metadados on-chain significa que os usuários estão protegidos contra adversários, como potenciais hackers ou organismos estatais opressivos.

Há vários casos em que bugs foram identificados no algoritmo de seleção de iscas da Monero. Esses bugs tinham o potencial de revelar os gastos dos usuários, de acordo com uma reportagem da [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero).


Em resumo, o que realmente mais importa é reduzir ou eliminar o vazamento de informações e dados dos usuários, como explicado por Zooko na [sessão AMA ao vivo da Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Links de referência***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
