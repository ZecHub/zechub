# Demonstração de FROST no Ywallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Demonstração de Transação FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compilar binários FROST

[Link do Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Use o repositório acima e siga as instruções de compilação: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Os binários ficarão na pasta target.

## Criar UA FROST

`./generateFROST_UA.sh`



## Importar UFVK no Ywallet

Accounts -> Clique em + e cole o ufvk da etapa acima

## Criar uma transação com Ywallet

Cole qualquer UA e envie uma tx. Salve o arquivo.

## Iniciar o procedimento de assinatura FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

a primeira entrada é o local da raw tx da etapa acima
a segunda entrada é o local e o nome da tx assinada que você deseja transmitir
Esta é a parte em que você informa ao FROST qual transação deseja que todos assinem

## Iniciar o Coordinator

`./runCoordinator.sh`

Isto coordena a assinatura de cada participante e cria uma assinatura de grupo

## Fazer cada Participant assinar esta transação

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizar a transação assinada

Na janela do coordinator, copie a assinatura de grupo exibida e cole-a na janela de assinatura FROST.
Isso concluirá a assinatura FROST e produzirá 'mysingedtx'


## Transmitir sua transação com Ywallet

Clique em 'More' no canto inferior direito do Ywallet e encontre 'Broadcast'. Encontre 'mysignedtx' e clique em ok.

Se tudo funcionar, você receberá um ID de transação :)
