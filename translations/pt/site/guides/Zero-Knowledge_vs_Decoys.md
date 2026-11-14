<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sistemas de conhecimento zero vs sistemas baseados em iscas

"As criptomoedas expõem todas as suas atividades de gastos ao público, pois é como um Twitter da sua conta bancária, e esse é um grande problema que precisa ser resolvido com a adoção da privacidade on-chain." - Ian Miers no [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certos projetos de criptomoedas ganharam reconhecimento por suas abordagens centradas na privacidade. O Zcash é conhecido por empregar provas de conhecimento zero (ZK) para proteger os valores e os endereços das transações. O Monero se destaca pelo uso de uma ofuscação do remetente baseada em iscas, combinada com outros esquemas de criptografia, para alcançar a privacidade do usuário na blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Entendendo as provas ZK e os sistemas baseados em iscas

As provas de conhecimento zero são sistemas criptográficos que permitem que uma parte (o provador) demonstre a outra parte (o verificador) a validade de uma afirmação sem revelar *nenhuma informação subjacente sobre a própria afirmação*. No contexto do Zcash, as provas ZK são usadas para verificar a validade de uma transação sem divulgar detalhes como o REMETENTE, o DESTINATÁRIO ou o VALOR da transação. 

**Isso garante que a privacidade do usuário seja preservada, já que a transação permanece confidencial enquanto ainda é validada. Essa tecnologia foi projetada para garantir a confidencialidade das transações financeiras na rede Zcash.**

Nos sistemas baseados em iscas, como o [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), várias transações são combinadas, o que torna desafiador ou difícil rastrear a origem e o destino reais dos fundos. O algoritmo introduz entradas e saídas falsas nas transações, além de empregar a criptografia dos endereços usados como entradas e usar Range proofs para validar que o valor transferido pode ser gasto. 

Essa abordagem ofusca o rastro das transações. O uso de entradas falsas torna desafiador para qualquer pessoa que analise a blockchain identificar o verdadeiro remetente, o destinatário ou o valor da transação. 

**Nota importante**: Esse método de transação com preservação da privacidade on-chain ainda revela explicitamente as entradas (criptografadas) de todas as transações dos usuários. Metadados como o *FLUXO DE TRANSAÇÕES* entre diferentes usuários da rede ainda podem ser coletados. Se um adversário participar ativamente da geração de transações na rede, ele efetivamente desanonimiza as entradas falsas de outros usuários. 


## Vantagens do ZK em relação aos sistemas baseados em iscas

Tanto o Zcash quanto o Monero são criptomoedas focadas em privacidade, mas alcançam a privacidade de maneiras diferentes. 

Aqui estão algumas vantagens das provas de conhecimento zero (ZK) do Zcash em relação ao sistema de iscas do Monero:

1) **Divulgação seletiva**: Com o conjunto de recursos ZK do Zcash, os usuários têm a opção de revelar detalhes das transações a partes específicas [Leia o blog do ECC sobre divulgação seletiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). No Zcash, o conteúdo criptografado das transações blindadas permite que as pessoas revelem seletivamente dados de uma transferência específica. Além disso, uma chave de visualização pode ser fornecida para divulgar todas as transações associadas a um endereço blindado específico. Esse recurso permite a conformidade regulatória e a auditabilidade sem comprometer a privacidade geral da rede. 

Embora o algoritmo de iscas do Monero (assinatura em anel) ajude a fornecer privacidade, ele não oferece divulgação *seletiva* da mesma forma.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Visibilidade opcional**: O Zcash permite que os usuários escolham entre transações transparentes (não privadas) e blindadas (privadas). Isso significa que o Zcash oferece aos usuários a flexibilidade de manter suas informações financeiras privadas (blindadas) ou torná-las transparentes e publicamente disponíveis, de forma semelhante à maioria das outras blockchains, como explicado no [site oficial do Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Essa privacidade opcional permite maior flexibilidade e casos de uso relevantes para empresas e organizações, já que algumas transações podem exigir menos privacidade para escrutínio público, enquanto outras se beneficiam de uma privacidade aprimorada.


3) **Conjunto de anonimato**: O [conjunto de anonimato](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) dos pools blindados de conhecimento zero abrange todas as transações que *já* ocorreram. Ele é significativamente maior do que o da maioria das outras técnicas on-chain para alcançar a não vinculação das transações. Observação: isso se aplica apenas a transações dentro do mesmo pool blindado.

O uso de iscas aumenta o conjunto de anonimato. No entanto, essa abordagem depende inteiramente do número de usuários *reais* na rede. 

4) **Sem configuração confiável**: As configurações Sprout e Sapling do Zcash utilizaram uma computação multipartidária conhecida como "cerimônia de configuração confiável". A recente atualização NU5 não exigiu nenhuma confiança na integridade da configuração do circuito de conhecimento zero. [Leia o blog do ECC sobre o NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacidade dos dados**: A [tecnologia zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) usada nos pools blindados do Zcash proporciona uma segurança significativamente maior para os usuários. A redução do vazamento de metadados on-chain significa que os usuários ficam protegidos de adversários, como possíveis hackers ou órgãos estatais opressores. 

Há vários casos em que foram identificados bugs no algoritmo de seleção de iscas do Monero. Esses bugs tinham o potencial de revelar os gastos dos usuários, de acordo com um relatório da [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Em resumo, o que realmente mais importa é reduzir ou eliminar o vazamento de informações e dados dos usuários, como explicou Zooko na [sessão ao vivo de AMA da Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


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
