# O Zcash Devtool

[O que é o zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

O Zcash Devtool é uma plataforma para experimentar e desenvolver com o Zcash. Ele é criado por desenvolvedores, para desenvolvedores, para testes e desenvolvimento de novas funcionalidades do Zcash, e não deve ser considerado pronto para produção. A API de linha de comando que essa ferramenta expõe pode mudar e vai mudar a qualquer momento, sem aviso prévio. NÃO coloque quantias significativas na carteira embutida do zcash-devtool.

### Tutorial em vídeo do Zcash Devtool:
Kris Nuttycombe (@nuttycom) apresentou essa ferramenta durante a ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Para um guia passo a passo de como começar a usar essas ferramentas, veja [este passo a passo](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Ele documenta um passo a passo completo de como configurar e usar as ferramentas do zcash devtool. A intenção é servir como guia para você configurar tudo e adicionar suas próprias funcionalidades à ferramenta.

## Início rápido

Os comandos abaixo foram verificados com o zcash-devtool `main` (commit `5a26ee8`, ago 2026). A ferramenta muda sem aviso, então execute `--help` em qualquer comando se algo aqui não corresponder mais.

### Instalação

Não há binários pré-compilados. Instale o [Rust](https://rustup.rs) e depois compile a partir do código-fonte:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Os exemplos abaixo chamam o binário compilado, `target/release/zcash-devtool`. O `cargo run --release -- ...` funciona da mesma forma.

### Crie uma carteira de testnet

Comece na testnet. As moedas de testnet (TAZ) não têm valor.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` é o diretório da carteira. Ele vem depois de `wallet` e antes do subcomando.
- `-i` é um arquivo de identidade [age](https://age-encryption.org). A frase mnemônica da carteira é criptografada para ele, e o arquivo é criado se não existir. Guarde-o: `send`, `shield` e outros comandos de gasto precisam dele para descriptografar a semente.
- `-n` é a rede: `test` ou `main`.
- `-s` escolhe o servidor de carteira leve. O padrão, `zecrocks`, conecta ao servidor zec.rocks da rede escolhida.
- Para restaurar uma carteira existente, use `restore-mnemonic` no lugar de `init`. Ele solicita a frase.

`balance` lista cada pool separadamente, incluindo Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Execute `zcash-devtool wallet -w ./my-wallet list-addresses` para ver o endereço unificado da carteira e envie fundos de testnet para ele a partir de um [faucet](https://zechub.wiki/using-zcash/faucets).

Para a mainnet, passe `-n main` para `init`. Use apenas quantias que você pode se dar ao luxo de perder.

### Enviar e blindar

Os valores são em zatoshis (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` mostra a transação que um `send` construiria, sem enviá-la. `list-tx` e `list-unspent` mostram o histórico e as notes da carteira.

Qualquer comando que se comunica com um servidor também aceita `--connection tor`, que roteia a conexão pelo cliente Tor embutido.

### Inspecione endereços, chaves e transações

`inspect` decodifica dados do Zcash offline: endereços, chaves e transações brutas. Adicione `--lookup` para buscar mais informações na chain, como uma transação pelo seu ID.

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

As notes Ironwood são enviadas para o mesmo receptor Orchard em um endereço unificado, então os endereços não mudaram com o NU6.3.

### Construa transações em etapas com PCZTs

Uma PCZT (transação Zcash parcialmente criada) divide a construção de uma transação em etapas separadas: criar, provar, assinar e enviar. Cada etapa pode ser executada em uma máquina diferente, por exemplo com um assinador de hardware como o Keystone. Cada comando `pczt` lê a PCZT de um arquivo ou da stdin e a grava em um arquivo (`--output`) ou na stdout, então as etapas podem ser encadeadas com pipe:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` lista as outras etapas, incluindo `inspect`, `redact`, `combine`, `extract` e `shield`.

### Mova fundos de Orchard para Ironwood

Desde o NU6.3, os fundos Orchard só podem ser movidos para os próprios endereços da carteira. Os comandos `migration` os movem para Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` mostra uma prévia das divisões de notes e do cronograma de transferências, sem alterar nada.
- `commit` constrói e pré-assina as primeiras transações de preparação. Adicione `--external` para deixá-las sem assinatura para um assinador externo como o Keystone.
- `status` mostra o progresso da migração e a próxima etapa.
- `advance` gera a prova da próxima transação cuja âncora está pronta.

Os comandos de migração ainda estão em desenvolvimento. `advance` para na primeira transação que está pronta para transmissão, porque a transmissão ainda não foi implementada na ferramenta. Para o uso diário, mova os fundos com uma carteira que suporte Ironwood. Veja [Pools blindadas](https://zechub.wiki/using-zcash/shielded-pools).


**Avisos de segurança:**
NÃO USE ISTO EM PRODUÇÃO!!!
O app não foi escrito com foco em segurança. No entanto, ele tem recursos como a criptografia das frases semente mnemônicas, que devem torná-lo viável para experimentos em pequena escala, por sua conta e risco.

### Avançado (tutorial do librustzcash)


[veja o vídeo aqui](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
