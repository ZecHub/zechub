# Demonstração de MultiSig

Esta demonstração requer `zcashd` 

## Reunir chaves públicas dos indivíduos necessários

* https://github.com/iancoleman/bip39
* Se estiver a usar `zcashd`, também pode criar uma UA e usar o seu recetor transparente. Depois use `getPubkey.sh` para extrair a sua chave pública.


## Criar endereços t3 MultiSig 2x (2 de 3)

execute `createMultiSig.sh` para gerar o seu endereço multisig e redeem script. O que é necessário são 3 chaves públicas

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
        txid: um ID de transação da transação que enviou fundos para o seu novo t3
   voutIndex: o índice da saída em vout que tem o maior valor
scriptPubKey: O script de bloqueio P2SH contém o hash de outro script de bloqueio (Script Hash), rodeado pelos opcodes HASH160 e EQUAL. Isto está em hex, e é encontrado via rpc getrawtransaction, procure scriptPubKey
redeemScript: O valor hex do redeemScript que foi produzido ao criar o nosso t3. Isto é necessário para todas as pessoas que queiram gastar a partir do t3.
   oldAmount: Montante enviado para o seu novo t3 a partir do txid acima
       tAddy: O endereço para o qual pretende enviar os fundos
      amount: O montante de ZEC a enviar para tAddy
 changeTaddy: Endereço de troco (novo t3 com um novo redeemScript!)

```

`./txDetails.sh txid`   => ajudará a encontrar as informações necessárias

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** isto é necessário para assinar! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Assinar a TX MultiSig

Abra `signMultiSigTX.sh` e adicione as suas chaves privadas nas variáveis pk1,pk2, ...
 

*** Eu não recomendaria escrever estas no seu terminal. ***


Se tiver acesso a todas as suas chaves privadas, pode usá-las todas de uma vez para poupar tempo,
mas na maioria dos exemplos do mundo real, a assinatura será feita por pessoas em diferentes partes do mundo, por isso cada um dos participantes necessários terá de assinar,
depois enviar de volta a saída "hex" atualizada de raxTX que os outros usarão para assinar e completar o procedimento de assinatura.

Quem criar a primeira tx, irá assinar com a sua chave privada e enviar o hex rawTX atualizado que precisa de ser assinado pelos outros participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para assinar esta tx, pelo menos 2 das três chaves privadas precisam de assiná-la. Se a chave pública que forneceu foi exportada usando um T-address de `zcashd`, pode obter a chave privada do seu endereço T com: 


`zcash-cli dumpprivkey "t-addr"`


Para esta demonstração, usei o bip39 de iancoleman para isolar rapidamente as chaves privadas necessárias.


## Transmitir a TX assinada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fontes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
