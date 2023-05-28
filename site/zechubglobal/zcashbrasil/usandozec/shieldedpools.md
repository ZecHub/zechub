# Zcash Pools

Olharemos para os quatro pools de valor na Zcash, que incluem os pools Sprout, Sapling, Orchard e Transparent. Esta página wiki também cobrirá as melhorias na tecnologia e algumas práticas recomendadas de transferência de pool.


## pools blindadas

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


A série Sprout foi o primeiro protocolo de privacidade Zero Knowledge privacy protocol lançado na ZCash e às vezes é chamado de ZCash 1.0 ou "ZCash comum". Foi lançado em 28 de outubro de 2016 e foi a primeira versão da ZCash que usa tecnologia zero-knowledge proof, que é um recurso importante do ZCash Cryptography.


Os endereços do Sprout são identificados por suas duas primeiras letras, que é sempre "zc" e foi nomeado "Sprout" com o objetivo principal de enfatizar que o software era jovem, brotando blockchain com grande potencial de crescimento e aberto para desenvolvimento. A série Sprout foi usada como uma ferramenta inicial para [ZCash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) que trouxe a distribuição de recompensas ZEC e Block para mineradores .

À medida que o ecossistema ZCash continua a se expandir com o aumento do número de transações blindadas, observou-se que a ZCash Sprout Series tornou-se limitado e menos eficiente quando se trata de privacidade do usuário, escalabilidade e processamento de transações. Isso levou à modificação da rede e atualização do Sapling.


### ZCash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[ZCash Sapling](https://z.cash/upgrade/sapling) é uma atualização para o protocolo da criptomoeda Zcash que foi introduzido em 28 de outubro de 2018. É uma grande melhoria em relação à versão anterior do protocolo ZCash conhecido como Sprout Series que tinha algumas limitações em termos de privacidade, eficiência e usabilidade.

Algumas das atualizações incluem desempenho aprimorado para endereços blindados, chaves de visualização aprimoradas para permitir que os usuários visualizem transações de entrada e saída sem expor as chaves privadas do usuário e chaves Zero Knowledge independentes para carteira de hardware durante a assinatura da transação.

O ZSapling usa um novo sistema de Zero Knowledge proof chamado zk-SNARKs (argumentos de conhecimento sucintos e não interativos de conhecimento zero), que permite transações privadas muito mais rápidas e eficientes na blockchain ZCash. a ZCash Sapling também permite que os usuários realizem transações privadas em apenas alguns segundos em comparação com a duração mais longa que levava no Sprout Series.

A ZCash Sapling também faz uso de recursos de blindagem de transação para aumentar a privacidade, tornando difícil para terceiros vincular as transações da ZCash e determinar a quantidade de ZEC sendo transferida pelos usuários. Além disso, o ZSapling melhora a usabilidade reduzindo os requisitos computacionais para gerar transações privadas, tornando-o mais acessível aos usuários.

O endereço da carteira ZSapling sempre começa com "zs" e isso pode ser observado em todas as carteiras blindadas ZCash suportadas (Y-Wallet, Zingo Wallet etc.) que possuem endereços ZSapling integrados. A Zcash Sapling representa um desenvolvimento significativo na tecnologia ZCash quando se trata de privacidade e eficiência das transações Zcash, o que o torna uma criptomoeda mais prática e eficaz para usuários que valorizam privacidade e segurança.

### Orchad
Orchard é uma nova tecnologia de alta preservação de privacidade que está sendo desenvolvida para a Zcash Cryptocurrency Network. O Orchard Shielded Pool foi lançado em 31 de maio de 2022. O endereço do Orchard às vezes é chamado de Endereço Unificado (UA) e o Orchard Shielded Pool serve como um aprimoramento significativo para as Pools blindados existentes e forma um conjunto de anonimato separado do Sprout e Sapling Shielded Pools, que ajuda a aumentar a privacidade e o anonimato do usuário, permitindo que os usuários enviem e recebam ZEC anonimamente na rede ZCash.

As transações dentro da Orchard aumentarão o tamanho do conjunto de anonimato mais rapidamente do que as transações feitas com o Sapling, devido à natureza de ocultação de aridade das ações do Orchard. A atualização do Orchard ajudará a trazer mais melhorias para a rede Zcash, incluindo transações mais rápidas e eficientes, maior privacidade e anonimato, segurança aprimorada e maior flexibilidade para os desenvolvedores criarem aplicativos descentralizados na ZCash Blockchain.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

As carteiras ZCash Shielded agora estão integrando Orchard Pools em sua opção de Fund Pool. Um bom exemplo pode ser encontrado no aplicativo Zingo Wallet.


## Transparent Pool

A ZCash Transparent é uma transação não protegida e não privada na ZCash Blockchain. O endereço transparente da carteira na ZCash geralmente começa com a letra "t" e a privacidade é muito baixa nesse tipo de transação. As transações transparentes na Zcash são semelhantes às transações do Bitcoin, que suportam transações de assinatura múltipla e fazem uso de endereços públicos padrão que podem ser enviados e recebidos por qualquer pessoa na rede.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

A ZCash Transparent é usado principalmente por exchanges centralizadas para garantir alta transparência e confirmação de rede ao enviar e receber ZEC entre usuários. Também é importante observar que, embora os endereços ZCash Blindados forneçam alta privacidade durante as transações, eles também exigem mais recursos computacionais para processar as transações. Portanto, alguns usuários podem adotar endereços transparentes para transações que não exigem o mesmo nível de privacidade.

---
###

# Práticas recomendadas na transferência de pool
Quando se trata de considerar alto nível de privacidade durante a transação na Rede ZCash, é recomendável seguir as práticas abaixo;


![20230420-051415-0000](https://user-images.githubusercontent.com/81990132/233535812-ccb41fdd-a552-4930-b136-b65dc12e0d0d.png)

![20230420-091225-0000](https://user-images.githubusercontent.com/81990132/233535882-1b3aa4e5-5022-48cf-b311-96aa8b8328ce.png)


![20230420-091701-0000](https://user-images.githubusercontent.com/81990132/233535945-09a8ce02-d4d4-4c73-99fa-14b438963a45.png)


![20230420-091346-0000](https://user-images.githubusercontent.com/81990132/233536122-6429d010-1ffa-424a-83d6-6e94eb8252e8.png)





















