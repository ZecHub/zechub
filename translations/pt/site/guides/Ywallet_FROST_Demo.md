# Demonstração do Ywallet FROST

> **O Ywallet não é mais mantido.** Seu desenvolvedor confirmou que ele não será atualizado para Ironwood (NU6.3), portanto ele não consegue mais acompanhar a chain e as etapas abaixo não podem ser concluídas na mainnet. Esta página é mantida como referência. Zkool, do mesmo desenvolvedor, é o sucessor mantido e oferece suporte a multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Demonstração de transação FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compilar os executáveis FROST

[Link do GitHub](https://github.com/ZcashFoundation/frost-zcash-demo)

Use o repositório acima e siga as instruções de compilação: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Os executáveis estarão na pasta target.

## Criar UA FROST

`./generateFROST_UA.sh`



## Importar UFVK para o Ywallet

Contas -> Clique em + e cole o ufvk da etapa acima

## Criar uma transação com o Ywallet

Cole qualquer UA e envie uma transação. Salve o arquivo.

## Iniciar o procedimento de assinatura FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

A primeira entrada é o local da transação bruta da etapa acima  
A segunda entrada é o local e o nome da transação assinada que você deseja transmitir  
Esta é a parte em que você informa ao FROST qual transação quer que todos assinem

## Iniciar o coordenador

`./runCoordinator.sh`

Isso coordena a assinatura de cada participante e cria uma assinatura de grupo

## Fazer cada participante assinar esta transação

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizar a transação assinada

Na janela do coordenador, copie a assinatura de grupo exibida e cole-a na janela de assinatura FROST.  
Isso concluirá a assinatura FROST e produzirá 'mysingedtx'


## Transmitir sua transação com o Ywallet

Clique em 'Mais' no canto inferior direito do Ywallet e encontre 'Transmitir'. Encontre 'mysignedtx' e clique em OK.

Se tudo funcionar, você receberá um ID de transação :)
