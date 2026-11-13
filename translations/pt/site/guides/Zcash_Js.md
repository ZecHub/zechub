# Guia do desenvolvedor Zcash JS

**zcash.js** (`@zcashlabs/zcash.js`) é um SDK experimental de TypeScript/JavaScript lançado pela Zcash Labs em 26 de outubro de 2026. Ele permite que desenvolvedores criem carteiras, light clients, painéis e aplicativos que interagem com a rede Zcash a partir de Node.js e do navegador.

> **Status**: Experimental (v0.1.1). Atualmente, carteiras persistentes em nó exigem Linux + `flock`. O envio/recebimento completo em navegador ao vivo e a migração histórica do banco de dados da carteira ainda não estão totalmente qualificados. Sempre consulte a documentação oficial antes do uso em produção.

## O que o SDK oferece

- `createPublicClient` — consultas JSON-RPC sem estado e observação de transações
- `createLightClient` — consultas e fluxos de lightwallet (gRPC nativo em nó, gRPC-Web no navegador)
- `createWalletClient` — contas locais, escaneamento, propostas, assinatura, envio e recuperação de pagamentos registrados
- Valores exatos de `bigint`, validação de rede, ferramentas de visualização/endereço e utilitários de PCZT
- Mecanismo básico de carteira incluído, workers e ativos locais de prova Sapling (não é necessária uma instalação separada de Rust)

## Instalação

Use o **Node.js 22.23.4** (a versão fixada pelo pacote).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Prefira TypeScript com ESM (`"type": "module"` em `package.json`).
- Aplicativos de navegador funcionam por meio de um bundler ESM moderno. O bundler emitirá ativos WASM, worker e de prova sob demanda — eles devem ser implantados com seu aplicativo.

## Primeira consulta à chain (sem carteira)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Omitir a opção `network` usa mainnet como padrão (forneça um endpoint correspondente).
- Um `createPublicClient` também está disponível para uso exclusivo de JSON-RPC.

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
| Nó (durável)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Navegador         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Descartável      | `{ kind: 'memory' }`                                |

**Padrões importantes** (a partir da v0.1.1):

- Gastos e troco são somente Ironwood por padrão
- Regra de taxa: ZIP-317
- Confirmações: 3 confiáveis / 3 não confiáveis
- Sempre chame `wallet.sync()` antes de propor um pagamento

## Fluxo de trabalho de alto nível da carteira

1. Crie ou importe uma conta mnemônica e conecte um assinante
2. Chame `wallet.sync()`
3. Solicite um endereço de recebimento (prefira Unified / Ironwood)
4. Crie uma proposta → revise-a → chame `wallet.send()`
5. Aguarde a confirmação ou use operações registradas para recuperação após uma reinicialização

O aplicativo é responsável pelos bytes mnemônicos. Limpe-os da memória quando não forem mais necessários. Sempre apresente uma interface de aprovação clara que mostre cada destinatário, valor, taxa, pool e expiração.

Veja o guia oficial de [Wallet](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) para um exemplo completo e funcional.

## Observações sobre plataformas e limitações atuais

| Capacidade            | Nó                              | Navegador                          |
|-----------------------|-----------------------------------|----------------------------------|
| Pacote               | Nó 22.23.4 + ESM                | Bundler ESM moderno + WebAssembly |
| Consultas leves         | gRPC nativo                       | gRPC-Web + CORS                  |
| Armazenamento durável       | Somente Linux + `flock`              | OPFS (contexto seguro)            |
| Armazenamento descartável    | memória                            | memória                           |

Limitações adicionais:

- O armazenamento persistente em nó é atualmente somente Linux
- Ainda não há cofre de segredos gerenciado, serviço remoto de prova ou integração com assinante de hardware
- O armazenamento **não** é anunciado como criptografado em repouso
- Não abra o mesmo armazenamento de carteira em vários processos ou abas do navegador simultaneamente
- Sempre feche a carteira corretamente com `await wallet.close()`

## Próximos passos

- Instalação oficial e primeira solicitação: [Instalação](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Abrindo e configurando uma carteira: [Abrir uma carteira](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Fluxo de trabalho completo: [Guia da carteira](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- Referência da API: [Referência da API](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Limites de plataforma: [Configuração de nó e navegador](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Recursos oficiais

- Livro para desenvolvedores: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- Repositório GitHub: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- Pacote npm: `@zcashlabs/zcash.js`


---

*Este guia é baseado em `@zcashlabs/zcash.js@0.1.1` (outubro de 2026). O SDK está em desenvolvimento ativo — sempre prefira a documentação oficial para conhecer a API e as limitações mais recentes.*
