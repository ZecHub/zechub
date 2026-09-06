# Demonstração de FROST com Ywallet

> **Ywallet já não recebe manutenção.** O seu programador confirmou que não será atualizado para Ironwood (NU6.3), pelo que já não consegue acompanhar a cadeia e os passos abaixo não podem ser concluídos na mainnet. Esta página é mantida como referência. Zkool, do mesmo programador, é o sucessor com manutenção ativa e suporta multisig FROST.

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


## Compilar binários FROST

[Link do Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Utilize o repositório acima e siga as instruções de compilação: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Os binários estarão na pasta target.

## Criar UA FROST

`./generateFROST_UA.sh`



## Importar UFVK para o Ywallet

Contas -> Clique em + e cole o ufvk do passo acima

## Criar uma transação com o Ywallet

Cole qualquer UA e envie uma tx. Guarde o ficheiro.

## Iniciar o procedimento de assinatura FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

a primeira entrada é a localização da tx bruta do passo acima
a segunda entrada é a localização e o nome da tx assinada que pretende transmitir
Esta é a parte em que indica ao FROST qual a transação que pretende que todos assinem

## Iniciar o Coordenador

`./runCoordinator.sh`

Isto coordena a assinatura de cada participante e cria uma assinatura de grupo

## Fazer com que cada Participante assine esta transação

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizar a Transação assinada

Na janela do coordenador, copie a assinatura de grupo apresentada e cole-a na janela de assinatura FROST.
Isto concluirá a assinatura FROST e produzirá 'mysingedtx'


## Transmitir a sua Transação com o Ywallet

Clique em 'Mais' no canto inferior direito do Ywallet e encontre 'Transmitir'. Encontre 'mysignedtx' e clique em ok.

Se tudo funcionar, receberá um ID de transação :)
