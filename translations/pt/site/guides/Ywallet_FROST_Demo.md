# Demonstração de Ywallet FROST

> **A Ywallet não recebe mais manutenção.** O desenvolvedor dela confirmou que ela não será atualizada para o Ironwood (NU6.3), então ela não consegue mais acompanhar a chain e os passos abaixo não podem ser concluídos na mainnet. Esta página é mantida como referência. A Zkool, do mesmo desenvolvedor, é a sucessora com manutenção ativa e suporta multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compile os binários do FROST

[GitHub link](https://github.com/ZcashFoundation/frost-zcash-demo)

Use o repositório acima e siga as instruções de compilação: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Os binários ficarão na pasta target.

## Crie um UA FROST

`./generateFROST_UA.sh`



## Importe a UFVK na Ywallet

Contas -> Clique em + e cole a ufvk do passo acima

## Crie uma transação com a Ywallet

Cole qualquer UA e envie uma transação. Salve o arquivo.

## Inicie o procedimento de assinatura FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

A primeira entrada é o local da transação bruta do passo acima
A segunda entrada é o local e o nome da transação assinada que você quer transmitir
Esta é a parte em que você informa ao FROST qual transação você quer que todos assinem

## Inicie o coordenador

`./runCoordinator.sh`

Isso coordena a assinatura de cada participante e cria uma assinatura de grupo

## Peça a cada participante que assine esta transação

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalize a transação assinada

Na janela do coordenador, copie a assinatura de grupo exibida e cole-a na janela de assinatura FROST.
Isso concluirá a assinatura FROST e gerará 'mysingedtx'


## Transmita sua transação com a Ywallet

Clique em 'More' no canto inferior direito da Ywallet e encontre 'Broadcast'. Encontre 'mysignedtx' e clique em ok.

Se tudo funcionar, você receberá um ID de transação :)
