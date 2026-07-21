# Demonstração do FROST no Ywallet

## Compilar os bins do FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Use o repositório acima e siga as instruções de compilação: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Os bins ficarão na pasta target.


## Criar FROST UA

`./generateFROST_UA.sh`



## Importar UFVK para o Ywallet

Accounts -> Clique em + e cole o ufvk da etapa acima

## Criar uma transação com o Ywallet

Cole qualquer UA e envie uma tx. Salve o arquivo.

## Iniciar o procedimento de assinatura FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

a primeira entrada é o local da tx bruta da etapa acima
a segunda entrada é o local e o nome da tx assinada que você quer transmitir
Esta é a parte em que você informa ao FROST qual transação deseja que todos assinem

## Iniciar o Coordinator

`./runCoordinator.sh`

Isto coordena a assinatura de cada participante e cria uma assinatura de grupo

## Fazer cada Participant assinar esta transação

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finalizar a transação assinada

Na janela do coordinator, copie a assinatura de grupo que é exibida e cole-a na janela de assinatura FROST.
Isto concluirá a assinatura FROST e gerará `mysingedtx`


## Transmitir sua transação com o Ywallet

Clique em 'More' no canto inferior direito do Ywallet e encontre 'Broadcast'. Encontre `mysignedtx` e clique em ok.

Se tudo funcionar, você receberá um ID de transação :)
