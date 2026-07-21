<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Conhecimento Zero vs Sistemas baseados em Iscas

"A criptomoeda expõe todas as suas atividades de gasto ao público, pois é como um Twitter para a sua conta bancária, e isso é um grande problema que deve ser resolvido adotando privacidade on chain." - Ian Miers na [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certos projetos cripto ganharam reconhecimento por suas abordagens centradas em privacidade. Zcash é renomada por empregar Provas de Conhecimento Zero (ZK) para proteger os valores e endereços das transações. Monero se destaca por utilizar ofuscação do remetente baseada em iscas em combinação com outros esquemas de criptografia para alcançar privacidade do usuário na blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Entendendo Provas ZK e Sistemas baseados em Iscas

As Provas de Conhecimento Zero são sistemas criptográficos que permitem que uma parte (o provador) demonstre a outra parte (o verificador) a validade de uma afirmação sem revelar *qualquer informação subjacente sobre a própria afirmação*. No contexto da Zcash, as provas ZK são empregadas para verificar a validade de uma transação sem divulgar detalhes da transação, como o REMETENTE, o DESTINATÁRIO ou o VALOR da transação. 

**Isso garante que a privacidade do usuário seja preservada, já que a transação permanece confidencial enquanto ainda é validada. Essa tecnologia foi projetada para assegurar a confidencialidade das transações financeiras na rede Zcash.**

Em sistemas baseados em iscas, como o [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), múltiplas transações são combinadas, tornando desafiador ou difícil rastrear a origem e o destino reais dos fundos. O algoritmo introduz entradas e saídas de isca nas transações, também empregando criptografia dos endereços usados como entradas e utilizando provas de intervalo para validar que o valor transferido pode ser gasto. 

Essa abordagem ofusca o rastro da transação. O uso de entradas de isca torna desafiador para qualquer pessoa que analise a blockchain identificar o remetente real, o destinatário real ou o valor da transação. 

**Nota Importante**: Esse método de transação com preservação de privacidade on-chain ainda revela explicitamente as entradas (criptografadas) de todas as transações dos usuários. Metadados como o *FLUXO DE TRANSAÇÕES* entre diferentes usuários na rede ainda podem ser coletados. Se um adversário participar ativamente da geração de transações na rede, isso efetivamente desanonimiza as entradas de isca de outros usuários. 


## Vantagens de ZK sobre Sistemas baseados em Iscas

Tanto Zcash quanto Monero são criptomoedas focadas em privacidade, mas alcançam privacidade de maneiras diferentes. 

Aqui estão algumas vantagens das provas de conhecimento zero (ZK) da Zcash sobre o sistema de iscas da Monero:

1) **Divulgação Seletiva**: Com o conjunto de funcionalidades ZK da Zcash, os usuários têm a opção de revelar detalhes da transação a partes específicas [Leia o blog da ECC sobre Divulgação Seletiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Na Zcash, os conteúdos criptografados das transações shielded permitem que indivíduos revelem seletivamente dados de uma transferência específica. Além disso, uma Viewing Key pode ser fornecida para divulgar todas as transações associadas a um endereço shielded específico. Esse recurso permite conformidade regulatória e auditabilidade sem comprometer a privacidade geral da rede. 

Embora o algoritmo de isca da Monero (assinatura em anel) ajude a fornecer privacidade, ele não oferece divulgação *seletiva* da mesma forma.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Visibilidade Opcional**: A Zcash permite que os usuários escolham entre transações transparentes (não privadas) e shielded (privadas). Isso significa que a Zcash oferece aos usuários a flexibilidade de manter suas informações financeiras privadas (shielded) ou torná-las transparentes e publicamente disponíveis, de forma semelhante à maioria das outras blockchains, como explicado no [site oficial da Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Essa privacidade por adesão permite maior flexibilidade e casos de uso relevantes para negócios/organizações, pois algumas transações podem exigir menos privacidade para escrutínio público, enquanto outras se beneficiam de maior privacidade.


3) **Conjunto de Anonimato**: O [conjunto de anonimato](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) dos pools shielded de conhecimento zero compreende todas as transações que já ocorreram. Isso é significativamente maior do que a maioria das outras técnicas on-chain para alcançar não vinculação de transações. Observação: isso se aplica apenas a transações dentro do mesmo pool shielded.

O uso de iscas realmente aumenta o conjunto de anonimato. No entanto, essa abordagem depende inteiramente do número de usuários *reais* na rede. 

4) **Sem Configuração Confiável**: A configuração do Sprout e do Sapling da Zcash utilizou uma computação multipartidária conhecida como "cerimônia de trusted setup". A atualização recente NU5 não exigiu qualquer confiança na integridade da configuração do circuito de conhecimento zero. [Leia o blog da ECC sobre a NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacidade de Dados**: A [tecnologia zk-SNARK](https://wiki.zechub.xyz/zcash-technology) usada nos pools shielded da Zcash permite segurança significativamente aprimorada para os usuários. A redução do vazamento de metadados on-chain significa que os usuários estão protegidos contra adversários como hackers em potencial ou órgãos estatais opressores. 

Há vários casos em que bugs foram identificados no algoritmo de seleção de iscas da Monero. Esses bugs tinham o potencial de revelar os gastos dos usuários, de acordo com uma reportagem da [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Em resumo, o que realmente mais importa é reduzir ou eliminar o vazamento de informações e dados dos usuários, como explicado por Zooko na [sessão AMA ao vivo da Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Links de Referência***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
