# Guia do desenvolvedor Zcash JS

**zcash.js** (`@zcashlabs/zcash.js`) é um SDK experimental de TypeScript/JavaScript lançado pela Zcash Labs em 26 de outubro de 2026. Ele permite que desenvolvedores criem carteiras, light clients, painéis e aplicativos que interagem com a rede Zcash a partir do Node.js e do navegador.

> **Status**: Experimental (v0.1.1). Carteiras persistentes no Node atualmente exigem Linux + `flock`. O envio/recebimento completo no navegador em tempo real e a migração do banco de dados histórico da carteira ainda não estão totalmente validados. Sempre consulte a documentação oficial antes de usar em produção.

## O que o SDK oferece

- `createPublicClient` — consultas JSON-RPC sem estado e observação de transações
- `createLightClient` — consultas e streams de lightwallet (gRPC nativo no Node, gRPC-Web no navegador)
- `createWalletClient` — contas locais, varredura, propostas, assinatura, envio e recuperação de pagamentos registrados
- Valores exatos de `bigint`, validação de rede, ferramentas de visualização/endereço e utilitários de PCZT
- Mecanismo de carteira básico incluído, workers e recursos locais de prova Sapling (não é necessária uma instalação separada de Rust)

## Instalação

Use o **Node.js 22.23.4** (a versão fixada pelo pacote).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Prefira TypeScript com ESM (`"type": "module"` em `package.json`).
- Aplicativos de navegador funcionam por meio de um bundler ESM moderno. O bundler vai gerar recursos de WASM, worker e prova com carregamento sob demanda, e eles precisam ser implantados junto com o seu aplicativo.

## Primeira consulta à chain (sem carteira)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Se você omitir a opção `network`, o padrão será a mainnet (forneça um endpoint correspondente).
- Também há um `createPublicClient` disponível para uso apenas com JSON-RPC.

## Abrindo uma carteira

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Opções de armazenamento

| Ambiente     | Opção de armazenamento                                      |
|-----------------|-----------------------------------------------------|
| Node (durável)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Navegador         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Descartável      | `{ kind: 'memory' }`                                |

**Padrões importantes** (a partir da v0.1.1):

- Por padrão, gastos e troco usam apenas Ironwood
- Regra de taxa: ZIP-317
- Confirmações: 3 confiáveis / 3 não confiáveis
- Sempre chame `wallet.sync()` antes de propor um pagamento

## Fluxo geral da carteira

1. Crie ou importe uma conta com mnemônico e anexe um assinante
2. Chame `wallet.sync()`
3. Solicite um endereço de recebimento (prefira Unified / Ironwood)
4. Crie uma proposta → revise-a → chame `wallet.send()`
5. Aguarde a confirmação ou use as operações registradas para recuperação após uma reinicialização

O aplicativo é dono dos bytes do mnemônico. Apague-os da memória quando não forem mais necessários. Sempre apresente uma interface de aprovação clara, que mostre cada destinatário, valor, taxa, pool e prazo de expiração.

Veja o [passo a passo oficial da carteira](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) para um exemplo completo e funcional.

## Observações sobre plataformas e limitações atuais

| Recurso            | Node                              | Navegador                          |
|-----------------------|-----------------------------------|----------------------------------|
| Pacote               | Node 22.23.4 + ESM                | Bundler ESM moderno + WebAssembly |
| Consultas leves         | gRPC nativo                       | gRPC-Web + CORS                  |
| Armazenamento durável       | Somente Linux + `flock`              | OPFS (contexto seguro)            |
| Armazenamento descartável    | memória                            | memória                           |

Limitações adicionais:

- O armazenamento persistente no Node atualmente funciona apenas com Linux
- Ainda não há cofre de segredos gerenciado, serviço de prova remoto nem integração com assinantes de hardware
- O armazenamento **não** é anunciado como criptografado em repouso
- Não abra o mesmo armazenamento de carteira a partir de vários processos ou abas do navegador ao mesmo tempo
- Sempre feche a carteira corretamente com `await wallet.close()`

## Próximos passos

- Instalação oficial e primeira requisição: [Instalação](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Abrir e configurar uma carteira: [Abrir uma carteira](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Fluxo completo: [Passo a passo da carteira](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Referência da API: [Referência da API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Limites das plataformas: [Configuração do Node e do navegador](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Recursos oficiais

- Livro do desenvolvedor: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repositório GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Pacote npm: `@zcashlabs/zcash.js`


---

*Este guia é baseado em `@zcashlabs/zcash.js@0.1.1` (out 2026). O SDK está em desenvolvimento ativo, então sempre prefira a documentação oficial para conhecer a API e as limitações mais recentes.*
