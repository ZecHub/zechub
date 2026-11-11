# O Devtool do Zcash

[O que é o zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

O Devtool do Zcash é uma plataforma para desenvolver no Zcash. Ele é criado por desenvolvedores, para desenvolvedores, para testes e desenvolvimento de novas funcionalidades do Zcash; e não deve ser considerado pronto para produção. A API de linha de comando exposta por esta ferramenta pode e irá mudar a qualquer momento e sem aviso prévio. NÃO comprometa fundos significativos na gestão da carteira integrada do zcash-devtool.

### Tutorial em vídeo do Devtool do Zcash:
Kris Nuttycombe (@nuttycom) apresentou esta ferramenta durante a ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: a multiferramenta de desenvolvimento Zcash com Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Para obter um guia passo a passo sobre como começar a usar estas ferramentas, consulte [este tutorial](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Ele apresenta um guia completo sobre como configurar e usar as ferramentas do zcash-devtool. Destina-se a servir de guia para a configuração e para adicionar sua própria funcionalidade à ferramenta.

## Início rápido

Os comandos abaixo foram verificados com zcash-devtool `main` (commit `5a26ee8`, agosto de 2026). A ferramenta muda sem aviso prévio, então execute `--help` em qualquer comando se algo aqui já não corresponder.

### Instalação

Não há binários pré-compilados. Instale [Rust](https://rustup.rs) e, em seguida, compile a partir do código-fonte:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Os exemplos abaixo chamam o binário compilado, `target/release/zcash-devtool`. `cargo run --release -- ...` funciona da mesma forma.

### Criar uma carteira de testnet

Comece na testnet. As moedas da testnet (TAZ) não têm valor.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` é o diretório da carteira. Ele é colocado depois de `wallet` e antes do subcomando.
- `-i` é um arquivo de identidade [age](https://age-encryption.org). A frase semente da carteira é criptografada para ele, e o arquivo é criado se não existir. Guarde-o: `send`, `shield` e outros comandos de gasto precisam dele para descriptografar a seed.
- `-n` é a rede: `test` ou `main`.
- `-s` seleciona o servidor de carteira leve. O padrão, `zecrocks`, conecta-se ao servidor zec.rocks para a rede escolhida.
- Para restaurar uma carteira existente, use `restore-mnemonic` em vez de `init`. A frase será solicitada.

`balance` apresenta cada pool separadamente, incluindo Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Execute `zcash-devtool wallet -w ./my-wallet list-addresses` para ver o endereço unificado da carteira e envie fundos de testnet para ele a partir de uma [faucet](https://zechub.wiki/using-zcash/faucets).

Para a mainnet, passe `-n main` para `init`. Use apenas valores que você possa perder.

### Enviar e blindar

Os valores estão em zatoshis (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` mostra a transação que um `send` criaria, sem enviá-la. `list-tx` e `list-unspent` mostram o histórico e as notes da carteira.

Qualquer comando que se comunica com um servidor também aceita `--connection tor`, que encaminha a conexão pelo cliente Tor integrado.

### Inspecionar endereços, chaves e transações

`inspect` decodifica dados do Zcash offline: endereços, chaves e transações brutas. Adicione `--lookup` para obter mais informações da chain, como uma transação pelo seu ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

As notes Ironwood são enviadas para o mesmo receptor Orchard em um endereço unificado, então os endereços não mudaram com NU6.3.

### Criar transações por etapas com PCZTs

Uma PCZT (transação Zcash parcialmente criada) divide a criação de uma transação em etapas separadas: criar, provar, assinar e enviar. Cada etapa pode ser executada em uma máquina diferente, por exemplo, com um assinador de hardware como Keystone. Cada comando `pczt` lê a PCZT de um arquivo ou da entrada padrão e a grava em um arquivo (`--output`) ou na saída padrão, então as etapas podem ser encadeadas:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` lista as outras etapas, incluindo `inspect`, `redact`, `combine`, `extract` e `shield`.

### Mover fundos de Orchard para Ironwood

Desde NU6.3, os fundos Orchard só podem ser movidos para os endereços da própria carteira. Os comandos `migration` movem-nos para Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` visualiza as divisões das notes e o cronograma de transferência, sem alterar nada.
- `commit` cria e pré-assina as primeiras transações de preparação. Adicione `--external` para deixá-las sem assinatura para um assinador externo, como Keystone.
- `status` mostra o progresso da migração e a próxima etapa.
- `advance` prova a próxima transação cuja âncora está pronta.

Os comandos de migração ainda estão sendo desenvolvidos. `advance` para na primeira transação que está pronta para transmissão, porque a transmissão ainda não está implementada na ferramenta. Para uso diário, mova os fundos com uma carteira que suporte Ironwood. Consulte [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools).


**Avisos de segurança:**
NÃO USE ISTO EM PRODUÇÃO!!!
O aplicativo não foi escrito tendo a segurança em mente. No entanto, ele possui recursos como a criptografia das frases semente, que devem torná-lo viável para experimentação em pequena escala, por sua conta e risco.

### Avançado (tutorial do librustzcash)


[veja o vídeo aqui](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
