# Protocolo de atestação ZAP1

O ZAP1 é um protocolo de atestação de código aberto para Zcash. Ele registra eventos estruturados de ciclo de vida em uma árvore Merkle BLAKE2b e ancora a raiz da árvore on-chain por meio de memorandos blindados do Orchard. As provas são verificáveis publicamente. Os dados dos eventos permanecem privados.

## Como funciona

Os operadores registram tipos de eventos (implantações, pagamentos, transferências etc.) e os enviam a uma instância do ZAP1. Cada evento produz um hash de folha usando BLAKE2b-256 com separação de domínio. As folhas se acumulam em uma árvore Merkle. Quando um limite é atingido, a raiz da árvore é codificada como um memorando ZAP1:09 e ancorada no Zcash em uma transação blindada.

Qualquer pessoa com um hash de folha pode verificar o caminho completo da folha até a raiz e até a âncora on-chain, sem precisar confiar no operador.

## Propriedades principais

- **Independente de aplicação**: qualquer operador do Zcash pode definir seus próprios tipos de eventos e strings de personalização
- **Preserva a privacidade**: os conteúdos dos eventos passam por hash antes da ancoragem. Somente os hashes vão on-chain.
- **Verificável de forma independente**: a verificação precisa apenas do pacote de provas e do acesso à chain. Não é necessário confiar no operador.
- **Compatível com o ZIP 302**: o ZAP1 está convergindo para um partType do ZIP 302 para o conteúdo da atestação

## O que existe

- Implementação de referência (Rust, licença MIT)
- SDK de verificação no crates.io (Rust + WASM de 83KB)
- SDK em JavaScript no npm
- Decodificador universal de memorandos (identifica memorandos ZAP1, ZIP 302 TVLV, de texto, binários e vazios)
- Kit de conformidade com 29 verificações de API e 14 verificações de protocolo
- Projeto de assinatura com limite 2 de 3 do FROST para transmissão de âncoras por múltiplas partes
- PR de rascunho #1243 do ZIP em revisão
- 4 âncoras na mainnet com 14 folhas em mar de 2026

## Arquitetura

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Cada operador executa sua própria instância do ZAP1 com suas próprias chaves, árvore Merkle e âncoras. Não há estado compartilhado entre os operadores.

## Onde saber mais

- Código-fonte: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK de verificação: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Decodificador de memorandos: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Especificação do protocolo: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Rascunho do ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API ao vivo: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guia do operador: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
