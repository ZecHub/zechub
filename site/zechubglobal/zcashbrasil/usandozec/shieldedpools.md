# Zcash Pools

Olharemos para as quatro pools de valor na Zcash, conhecidas como Sprout, Sapling, Orchard e Transparent. Esta página wiki também cobrirá as melhorias na tecnologia e algumas práticas recomendadas para transferências entre pools.

---

## Pools Blindadas

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


A série Sprout foi o primeiro protocolo de privacidade usando Zero Knowledge lançado na ZCash, conhecido também como Zcash 1.0 ou "Zcash Common". 

Foi lançado em 28 de outubro de 2016, sendo a primeira versão da Zcash que usa tecnologia ZKP, um pilar crucial na criptografia da Zcash


Os endereços da Sprout são identificados por suas duas primeiras letras, que é sempre "zc" e foi nomeado "Sprout" com o objetivo principal de enfatizar que o software era jovem, sendo uma nova blockchain com grande potencial de crescimento e aberta para desenvolvimento. 

A série Sprout foi usada como uma ferramenta inicial para [Zcash Slow Start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) que trouxe a distribuição de recompensas ZEC para os fundaores e mineradores.

À medida que o ecossistema Zcash continua a se expandir com o aumento do número de transações blindadas, observou-se que a Pool Sprout tornou-se limitado e menos eficiente quando se trata da privacidade do usuário, escalabilidade e processamento de transações. Isso levou à modificação da rede e o nascimento da atualização Sapling.

----

### Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Sapling](https://z.cash/upgrade/sapling) é uma atualização no protocolo Zcash que foi introduzido em 28 de outubro de 2018. É uma grande melhoria em relação à versão anterior, no qual falamos acima, que tinha algumas limitações em termos de privacidade, eficiência e usabilidade.

Algumas das atualizações incluem desempenho aprimorado para Endereços Blindados, Chaves de Visualização aprimoradas para permitir que os usuários visualizem transações de entrada e saída sem expor as chaves privadas do usuário e Chaves Zero Knowledge independentes para carteira de hardware durante a assinatura da transação.

Sapling usa um novo sistema de Zero Knowledge Proof chamado **zk-SNARKs** (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge), que permite transações privadas muito mais rápidas e eficientes na blockchain Zcash. A Sapling também permite que os usuários realizem transações privadas em apenas alguns segundos em comparação com a duração mais longa que levava na Sprout.

Sapling também faz uso de recursos de blindagem de transação para aumentar a privacidade, tornando difícil para terceiros vincular as transações Zcash e determinar a quantidade de ZEC sendo transferida pelos usuários. Além disso, essa atualização melhora a usabilidade reduzindo os requisitos computacionais para gerar transações privadas, tornando-o mais acessível aos usuários.

Os endereços das carteiras Sapling sempre começam com "zs" e isso pode ser observado em todas as carteiras que o suportam (Y-Wallet, Zingo, Zashi etc.). A Sapling representa um desenvolvimento significativo na tecnologia Zcash quando se trata de privacidade e eficiência das transações Zcash, o que o torna uma criptomoeda mais prática e eficaz para usuários que valorizam privacidade e segurança.

---

### Orchard

Orchard é uma nova tecnologia de alta preservação de privacidade que está sendo desenvolvida para a Zcash Cryptocurrency Network. A Orchard Shielded Pool foi lançado em 31 de maio de 2022. 

Os endereços Orchard às vezes são chamados de Endereço Unificado (UA) e o Orchard Shielded Pool serve como um aprimoramento significativo para as pools blindadas existentes e forma um conjunto de anonimato separado das pools blindadas Sprout e Sapling , que ajuda a aumentar a privacidade e o anonimato do usuário, permitindo que os usuários enviem e recebam ZEC anonimamente na rede Zcash.

As transações dentro da Orchard aumentarão o tamanho do conjunto de anonimato mais rapidamente do que as transações feitas com a Sapling, devido à natureza de ocultação das ações da Orchard. 

A atualização da Orchard ajudou a trazer mais melhorias para a rede Zcash, incluindo transações mais rápidas e eficientes, maior privacidade e anonimato, segurança aprimorada e maior flexibilidade para os desenvolvedores, permitindo-os criar aplicativos descentralizados na Zcash Blockchain.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

As carteiras blidnadas agora estão integrando as Pools Orchard em sua opção de Fund Pool. Um bom exemplo pode ser encontrado no aplicativo Zingo Wallet.

---

## Transparente

A pool transparente é uma transação não blindada e publica na blockchain Zcash. O endereço transparente das carteiras geralmente começam com a letra "t" e a privacidade é muito baixa nesse tipo de transação. 

As transações transparentes na Zcash são semelhantes às transações do Bitcoin, que suportam transações de assinatura múltipla e fazem uso de endereços públicos padrão que podem ser enviados e recebidos por qualquer pessoa na rede.

![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Essas transações são usadas principalmente por exchanges centralizadas para garantir alta transparência e confirmação de rede ao enviar e receber ZEC entre usuários.

Também é importante observar que, embora os endereços blindados forneçam alta privacidade durante as transações, eles também exigem mais recursos computacionais para processar as transações. Portanto, alguns usuários podem adotar endereços transparentes para transações que não exigem o mesmo nível de privacidade.

---

# Métodos Recomendados nas Transferências de Pools

Quando se trata de considerar alto nível de privacidade durante a transação na rede Zcash, é recomendável seguir as práticas abaixo:


![20230420-051415-0000](https://user-images.githubusercontent.com/81990132/233535812-ccb41fdd-a552-4930-b136-b65dc12e0d0d.png)

![20230420-091225-0000](https://user-images.githubusercontent.com/81990132/233535882-1b3aa4e5-5022-48cf-b311-96aa8b8328ce.png)


![20230420-091701-0000](https://user-images.githubusercontent.com/81990132/233535945-09a8ce02-d4d4-4c73-99fa-14b438963a45.png)


![20230420-091346-0000](https://user-images.githubusercontent.com/81990132/233536122-6429d010-1ffa-424a-83d6-6e94eb8252e8.png)





















