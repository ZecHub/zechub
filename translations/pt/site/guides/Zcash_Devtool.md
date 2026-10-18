# O Devtool Zcash

[O que é o zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

O Devtool Zcash é uma plataforma para desenvolver em Zcash. É criado por desenvolvedores, para desenvolvedores, para testes e desenvolvimento de novas funcionalidades de Zcash; e não deve ser considerado pronto para produção. A API de linha de comandos exposta por esta ferramenta pode e irá mudar a qualquer momento e sem aviso prévio. NÃO comprometa fundos significativos na gestão da wallet incorporada de zcash-devtool.

### Tutorial em vídeo do Devtool Zcash:
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

Para um guia passo a passo sobre como começar a utilizar estas ferramentas, consulte [este tutorial](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Documenta um guia completo sobre como configurar e utilizar as ferramentas do zcash devtool. Destina-se a servir de guia para a configuração e para adicionar a sua própria funcionalidade à ferramenta.

## Início rápido

Os comandos abaixo foram verificados com zcash-devtool `main` (commit `5a26ee8`, agosto de 2026). A ferramenta muda sem aviso prévio, por isso execute `--help` em qualquer comando se algo aqui já não corresponder.

### Instalação

Não existem binários pré-compilados. Instale [Rust](https://rustup.rs) e, em seguida, compile a partir do código-fonte:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Os exemplos abaixo chamam o binário compilado, `target/release/zcash-devtool`. `cargo run --release -- ...` funciona da mesma forma.

### Criar uma wallet de testnet

Comece na testnet. As moedas da testnet (TAZ) não têm valor.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` é o diretório da wallet. É colocado depois de `wallet` e antes do subcomando.
- `-i` é um ficheiro de identidade [age](https://age-encryption.org). A frase mnemónica da wallet é encriptada para ele, e o ficheiro é criado se não existir. Guarde-o: `send`, `shield` e outros comandos de gasto precisam dele para desencriptar a seed.
- `-n` é a rede: `test` ou `main`.
- `-s` seleciona o servidor de light wallet. O predefinido, `zecrocks`, liga-se ao servidor zec.rocks para a rede escolhida.
- Para restaurar uma wallet existente, utilize `restore-mnemonic` em vez de `init`. Será pedida a frase.

`balance` apresenta cada pool separadamente, incluindo Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Execute `zcash-devtool wallet -w ./my-wallet list-addresses` para ver o endereço unificado da wallet e envie-lhe fundos de testnet a partir de uma [faucet](https://zechub.wiki/using-zcash/faucets).

Para a mainnet, passe `-n main` a `init`. Utilize apenas montantes que possa perder.

### Enviar e proteger

Os montantes estão em zatoshis (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` mostra a transação que um `send` criaria, sem a enviar. `list-tx` e `list-unspent` mostram o histórico e as notas da wallet.

Qualquer comando que comunica com um servidor também aceita `--connection tor`, que encaminha a ligação através do cliente Tor incorporado.

### Inspecionar endereços, chaves e transações

`inspect` descodifica dados de Zcash offline: endereços, chaves e transações em bruto. Adicione `--lookup` para obter mais informações da chain, como uma transação pelo seu ID.

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

As notas Ironwood são enviadas para o mesmo recetor Orchard num endereço unificado, pelo que os endereços não mudaram com NU6.3.

### Criar transações por etapas com PCZTs

Uma PCZT (transação Zcash parcialmente criada) divide a criação de uma transação em etapas separadas: criar, provar, assinar e enviar. Cada etapa pode ser executada numa máquina diferente, por exemplo com um assinador de hardware como Keystone. Cada comando `pczt` lê a PCZT de um ficheiro ou da entrada padrão e escreve-a num ficheiro (`--output`) ou na saída padrão, pelo que as etapas podem ser encadeadas:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` lista as outras etapas, incluindo `inspect`, `redact`, `combine`, `extract` e `shield`.

### Mover fundos de Orchard para Ironwood

Desde NU6.3, os fundos Orchard só podem ser movidos para os endereços da própria wallet. Os comandos `migration` movem-nos para Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` pré-visualiza as divisões das notas e o calendário de transferência, sem alterar nada.
- `commit` cria e pré-assina as primeiras transações de preparação. Adicione `--external` para as deixar sem assinatura para um assinador externo, como Keystone.
- `status` mostra o progresso da migração e a próxima etapa.
- `advance` prova a próxima transação cuja âncora está pronta.

Os comandos de migração ainda estão a ser desenvolvidos. `advance` para na primeira transação que está pronta para transmissão, porque a transmissão ainda não está implementada na ferramenta. Para utilização quotidiana, mova os fundos com uma wallet que suporte Ironwood. Consulte [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools).


**Avisos de segurança:**
NÃO UTILIZE ISTO EM PRODUÇÃO!!!
A aplicação não foi escrita tendo a segurança em mente. Contudo, possui recursos como a encriptação das frases seed mnemónicas, que devem torná-la viável para experimentação em pequena escala, por sua conta e risco.

### Avançado (tutorial librustzcash )


[veja o vídeo aqui](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
