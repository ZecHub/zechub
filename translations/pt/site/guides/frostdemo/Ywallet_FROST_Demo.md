# Demonstração de FROST do Ywallet

> **Ywallet deixou de ter manutenção.** O seu programador confirmou que não será atualizado para Ironwood (NU6.3), pelo que já não consegue acompanhar a cadeia e os passos abaixo não podem ser concluídos na mainnet. Esta página é mantida para referência. Zkool, do mesmo programador, é o sucessor com manutenção e suporta multisig FROST.

## Compilar binários FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Use o repositório acima e siga as instruções de compilação: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Os binários estarão na pasta target.


## Criar UA FROST

`./generateFROST_UA.sh`



## Importar UFVK para o Ywallet

Contas -> Clique em + e cole o ufvk do passo acima

## Criar uma transação com o Ywallet

Cole qualquer UA e envie uma transação. Guarde o ficheiro.

## Iniciar o procedimento de assinatura FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

a primeira entrada é a localização da transação bruta do passo acima
a segunda entrada é a localização e o nome da transação assinada que pretende transmitir
Esta é a parte em que informa o FROST sobre qual a transação que pretende que todos assinem

## Iniciar o Coordenador

`./runCoordinator.sh`

Isto coordena a assinatura de cada participante e cria uma assinatura de grupo

## Fazer com que cada Participante assine esta transação

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finalizar a Transação assinada

Na janela do coordenador, copie a assinatura de grupo apresentada e cole-a na janela de assinatura FROST.
Isto concluirá a assinatura FROST e produzirá 'mysingedtx'


## Transmitir a sua Transação com o Ywallet

Clique em 'Mais' no canto inferior direito do Ywallet e encontre 'Transmitir'. Encontre 'mysignedtx' e clique em ok.

Se tudo funcionar, receberá um ID de transação :)
