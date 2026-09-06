# Demonstração MultiSig

> **Histórico. Este guia já não funciona.**
>
> Todos os passos abaixo dependem do zcashd, que atingiu a sua paragem automática de fim de suporte em 18 de julho de 2026. Os sete scripts fornecidos juntamente com esta página utilizam-no através de `zcash-cli`, pelo que nenhum deles consegue atualmente alcançar um nó em funcionamento.
>
> Estes scripts não podem ser adaptados mecanicamente. Baseiam-se nas RPCs de transações brutas e de wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que o zcashd descontinuou antes da paragem; Zallet substitui-as por novos métodos que operam em PCZTs em vez de hexadecimal de transações brutas, e continua em beta, com muitos métodos do zcashd ainda não adaptados.
>
> Para custódia multipartidária em Zcash atualmente, consulte [FROST & Custódia por Limiar](/zcash-tech/frost-threshold-custody), que inclui uma comparação direta com multisig transparente, e a [demonstração FROST do Ywallet](/guides/frostdemo/ywallet-frost-demo). Para migrar um nó existente do zcashd, consulte o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página é mantida como registo histórico do fluxo de trabalho multisig transparente.

Esta demonstração requer zcashd, que parou em 18 de julho de 2026 e já não funciona. Nada abaixo pode ser concluído na cadeia ativa.

## Recolher chaves públicas dos indivíduos necessários

* https://github.com/iancoleman/bip39
* Se utilizar zcashd, também pode criar uma UA e usar o seu recetor transparente. Depois, use `getPubkey.sh` para extrair a sua chave pública.


## Criar endereços t3 Multisig 2x (2 de 3)

execute createMultiSig.sh para gerar o seu endereço multisig e script de resgate. São necessárias 3 chaves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.º t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.º t3 para o endereço de troco. 

#### NOTA: neste exemplo pubk1,pubk4 são a mesma pessoa, pubk2,pubk5 são a mesma pessoa e assim por diante ...

#### NOTA2: a ORDEM das suas pubkeys importa! Preste atenção a isto!!!!


## Financiar o endereço t3

Use qualquer wallet/faucet para financiar o endereço

## Criar transação MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

onde,

```
        txid: um ID de transação da transação que enviou dinheiro para o seu novo t3
   voutIndex: o índice da saída em vout que tem o maior valor
scriptPubKey: O script de bloqueio P2SH contém o hash de outro script de bloqueio (Script Hash), rodeado pelos opcodes HASH160 e EQUAL. Está em hexadecimal e é encontrado através da RPC getrawtransaction; procure scriptPubKey
redeemScript: O valor hexadecimal do redeemScript que foi apresentado ao criar o nosso t3. Isto é necessário para todas as pessoas que pretendam gastar do t3.
   oldAmount: Montante enviado para o seu novo t3 a partir do txid acima
       tAddy: O endereço para o qual pretende enviar fundos
      amount: O montante de ZEC a enviar para tAddy
 changeTaddy: Endereço de troco (novo t3 com um novo redeemScript!)

```

`./txDetails.sh txid`   => irá ajudá-lo a encontrar a informação necessária

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** isto é necessário para assinar! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Assinar TX MultiSig

Abra signMultiSigTX.sh e adicione as suas chaves privadas nas variáveis pk1,pk2, ....
 

*** Não recomendo que escreva estas no seu terminal. ***


Se tiver acesso a todas as suas chaves privadas, pode utilizá-las todas de uma vez para poupar tempo,
mas, na maioria dos exemplos do mundo real, a assinatura será feita por pessoas em todo o mundo, pelo que cada um dos participantes necessários terá de assinar,
e depois enviar de volta a saída atualizada em "hex" de raxTX, que os outros utilizarão para assinar e concluir o procedimento de assinatura.

Quem criar a primeira tx irá assinar com a sua chave privada e enviar o hexadecimal rawTX atualizado que precisa de ser assinado pelos outros participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para assinar esta tx, pelo menos 2 das três chaves privadas precisam de assiná-la. Se a chave pública que forneceu foi exportada através de um endereço T do zcashd, pode obter a chave privada do seu endereço T com: 


`zcash-cli dumpprivkey "t-addr"`

Este comando parou com o zcashd e não devolve nada atualmente; é registado aqui apenas para mostrar como a demonstração obteve as suas chaves.


Para esta demonstração, utilizei o bip39 de iancoleman para isolar rapidamente as chaves privadas necessárias.


## Difundir TX assinada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fontes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
