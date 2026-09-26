# Demonstração MultiSig

> **Histórico. Este guia já não funciona.**
>
> Todos os passos abaixo dependem de zcashd, que atingiu a sua interrupção automática de fim de suporte em 18 de julho de 2026. Os sete scripts fornecidos juntamente com esta página utilizam-no através de `zcash-cli`, pelo que nenhum deles consegue alcançar um nó em funcionamento atualmente.
>
> Estes scripts não podem ser portados mecanicamente. Foram construídos sobre as RPCs de transações brutas e de wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que zcashd descontinuou antes da interrupção; Zallet substitui-as por novos métodos que operam em PCZTs em vez de hex de transações brutas, e ainda está em beta, com muitos métodos de zcashd ainda não portados.
>
> Para custódia multipartidária em Zcash atualmente, consulte [FROST & Custódia por Limiar](/zcash-tech/frost-threshold-custody), que inclui uma comparação direta com multisig transparente, e a [demonstração FROST do Ywallet](/guides/ywallet-frost-demo). Para migrar um nó existente de zcashd, consulte o [guia de migração para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página é mantida como um registo histórico do fluxo de trabalho de multisig transparente.

Esta demonstração requer zcashd, que foi interrompido em 18 de julho de 2026 e já não funciona. Nada abaixo pode ser concluído na cadeia em funcionamento.

## Recolher chaves públicas dos indivíduos necessários

* https://github.com/iancoleman/bip39
* Se utilizar zcashd, também pode criar um UA e utilizar o seu recetor transparente. Depois, utilize `getPubkey.sh` para extrair a sua chave pública.


## Criar endereços t3 MultiSig 2x (2 de 3)

execute createMultiSig.sh para gerar o seu endereço multisig e script de resgate. São necessárias 3 chaves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.º t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.º t3 para o endereço de troco. 

#### NOTA: neste exemplo pubk1,pubk4 são a mesma pessoa, pubk2,pubk5 são a mesma pessoa e assim por diante ...

#### NOTA2: a ORDEM das suas pubkeys é importante! Preste atenção a isto!!!!


## Financiar o endereço t3

Utilize qualquer wallet/faucet para financiar o endereço

## Criar transação MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

onde,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => irá ajudá-lo a encontrar as informações necessárias

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Assinar a transação MultiSig

Abra signMultiSigTX.sh e adicione as suas chaves privadas nas variáveis pk1,pk2, ...
 

*** Não recomendaria introduzi-las no seu terminal. ***


Se tiver acesso a todas as suas chaves privadas, pode utilizá-las todas de uma vez para poupar tempo,
mas, na maioria dos exemplos do mundo real, a assinatura será feita por pessoas em todo o mundo, pelo que cada um dos participantes necessários terá de assinar,
e depois enviar de volta a saída "hex" raxTX atualizada, que os outros utilizarão para assinar e concluir o procedimento de assinatura.

Quem criar a primeira tx irá assinar com a sua chave privada e enviar o hex rawTX atualizado que precisa de ser assinado pelos outros participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para assinar esta tx, pelo menos 2 das três chaves privadas têm de assiná-la. Se a chave pública que forneceu foi exportada através de um endereço T de zcashd, pode obter a chave privada do seu endereço T com: 


`zcash-cli dumpprivkey "t-addr"`

Este comando foi interrompido com zcashd e não devolve nada atualmente; é registado aqui apenas para mostrar como a demonstração obteve as suas chaves.


Para esta demonstração, utilizei o bip39 de iancoleman para isolar rapidamente as chaves privadas necessárias.


## Transmitir a TX assinada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fontes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
