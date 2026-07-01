# Protocolo de Atestação ZAP1

ZAP1 é um protocolo de atestação open-source para Zcash. Ele grava eventos estruturados de ciclo de vida em uma árvore de Merkle BLAKE2b e ancora a raiz da árvore on-chain por meio de memos blindados Orchard. As provas são verificáveis publicamente. Os dados dos eventos permanecem privados.

## Como funciona

Os operadores registram tipos de evento (implantações, pagamentos, transferências etc.) e os submetem a uma instância ZAP1. Cada evento produz um hash de folha usando BLAKE2b-256 com separação de domínio. As folhas se acumulam em uma árvore de Merkle. Quando um limite é atingido, a raiz da árvore é codificada como um memo ZAP1:09 e ancorada ao Zcash em uma transação blindada.

Qualquer pessoa com um hash de folha pode verificar o caminho completo da folha até a raiz e a âncora on-chain, sem precisar confiar no operador.

## Propriedades principais

- **Ag­nóstico à aplicação**: qualquer operador de Zcash pode definir seus próprios tipos de evento e strings de personalização
- **Preserva a privacidade**: os payloads dos eventos são transformados em hash antes da ancoragem. Apenas os hashes vão on-chain.
- **Verificável de forma independente**: a verificação precisa apenas do pacote de prova e de acesso à cadeia. Nenhuma confiança no operador é necessária.
- **Compatível com ZIP 302**: o ZAP1 está convergindo para um partType ZIP 302 para o payload de atestação

## O que existe

- Implementação de referência (Rust, licenciada sob MIT)
- SDK de verificação no crates.io (Rust + 83KB WASM)
- SDK JavaScript no npm
- Decodificador universal de memos (identifica ZAP1, ZIP 302 TVLV, texto, binário e memos vazios)
- Kit de conformidade com 29 verificações de API e 14 verificações de protocolo
- Design de assinatura por limiar FROST 2-de-3 para transmissão de âncoras multipartes
- Rascunho de ZIP PR #1243 em revisão
- 4 âncoras na mainnet com 14 folhas até março de 2026

## Arquitetura

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Cada operador executa sua própria instância ZAP1 com suas próprias chaves, árvore de Merkle e âncoras. Não há estado compartilhado entre operadores.

## Onde saber mais

- Código-fonte: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK de verificação: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Decodificador de memos: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Especificação do protocolo: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Rascunho de ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API ao vivo: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guia do operador: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
