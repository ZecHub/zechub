<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Viewing Keys

Os endereços blindados permitem-lhe realizar transações revelando o mínimo possível na blockchain Zcash. Então, o que acontece quando *precisa* de mostrar a uma parte específica o que possui ou o que enviou? Cada endereço blindado tem uma viewing key que concede acesso de leitura sem conceder a capacidade de gastar. As viewing keys foram introduzidas na [ZIP 310](https://zips.z.cash/zip-0310) e adicionadas ao protocolo na atualização de rede Sapling.

Uma viewing key é a ferramenta para divulgação seletiva: escolhe quem vê o quê e nunca entrega autoridade para gastar para o fazer.

## Porquê usar uma viewing key?

Os textos da Electric Coin Company sobre o tema apresentam as situações que surgem mais frequentemente, e continuam a ser as mais comuns atualmente:

- **Uma exchange a monitorizar depósitos.** A exchange carrega uma incoming viewing key num nó de deteção ligado à internet, para poder identificar depósitos de clientes num endereço blindado, enquanto a spending key permanece em hardware que nunca contacta com a rede.
- **Um custodiante a comprovar os seus ativos.** O custodiante entrega a um auditor uma full viewing key para cada endereço blindado. O auditor pode verificar esses saldos e analisar a atividade passada de e para esses endereços, não podendo fazer mais nada.
- **Diligência devida sobre uma contraparte.** Quando uma exchange precisa de analisar o histórico blindado de um cliente como parte de uma diligência devida reforçada, pode pedir a viewing key em vez dos fundos.

## O que uma viewing key revela e o que não revela

Existe mais do que um tipo de chave, e a diferença determina quanto revela.

| Chave | Prefixo | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Vê transações recebidas **e** enviadas para cada pool na conta |
| Unified incoming viewing key (UIVK) | `uivk…` | Vê apenas transações recebidas, para cada pool na conta |
| Sapling extended full viewing key | `zxviews…` | Vê atividade Sapling recebida e enviada para os endereços da chave |

Nenhuma destas pode gastar. Todas são permanentes no que importa: uma chave que tenha partilhado não pode ser revogada, apenas ultrapassada, movendo fundos para uma conta cujas chaves a outra parte não possui.

Há duas armadilhas de divulgação que vale a pena conhecer antes de partilhar algo.

**Incoming não significa restrita.** Uma unified incoming viewing key abrange toda a conta, não apenas o endereço sobre o qual lhe perguntaram. Exportar uma UIVK para um único endereço Sapling continua a conceder visibilidade das entradas em todos os pools dessa conta, revelando assim mais do que o endereço que identifica. O [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) afirma isto explicitamente.

**Um endereço publicado já expõe a sua incoming viewing key a um adversário futuro.** A [ZIP 326](https://zips.z.cash/zip-0326) observa que um adversário com um computador quântico poderia recuperar a incoming viewing key a partir de um endereço diversificado publicado, algo viável de uma forma que recuperar a nullifier key não é. Publicar um endereço não é o mesmo que publicar uma viewing key hoje, mas ambos ficam mais próximos com um horizonte temporal suficientemente longo.

## Viewing keys após Ironwood

NU6.3 introduziu o pool blindado Ironwood e tornou o pool Orchard apenas para gastos, pelo que os fundos migram de um para o outro ao longo do tempo. Consulte [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile) para a própria atualização.

**Uma viewing key emitida antes de Ironwood continua a funcionar após a migração.** A ZIP 326 especifica que um receiver, e a respetiva incoming viewing key, está associado ao *protocolo* Orchard em vez de a um pool: a mesma incoming viewing key desencripta por tentativa tanto textos cifrados de notas do pool Orchard como do pool Ironwood. Zallet implementa-a dessa forma, descrevendo as notas Ironwood como tendo a forma de Orchard e sendo desencriptadas por tentativa com as viewing keys Orchard da conta sob o domínio de encriptação de notas Ironwood.

Três consequências para qualquer pessoa que detenha ou emita uma chave:

1. **Os saldos movem-se entre pools, e o observador vê isso acontecer.** A [ZIP 318](https://zips.z.cash/zip-0318) especifica a migração como uma série de pequenas transações Orchard-para-Ironwood deliberadamente uniformes, difundidas segundo um calendário aleatorizado, cada uma gastando uma nota Orchard e produzindo uma saída Ironwood de uma denominação canónica. Um auditor que observa com uma viewing key vê os ativos passarem de um pool para o outro em etapas ao longo de semanas, e não num único movimento. Uma wallet pode reconstruir o seu próprio progresso de migração a partir dos dados da cadeia usando as suas viewing keys.
2. **Cada etapa de migração revela o valor que move.** Isto é inerente à passagem por uma catraca e é o que torna a migração auditável. Dividir o saldo em denominações canónicas significa que nenhuma transação individual revela todo o saldo do pool Orchard.
3. **As contas criadas após Ironwood podem derivar as suas chaves de forma diferente.** A [ZIP 2005](https://zips.z.cash/zip-2005) adiciona uma flag `use_qsk` para chaves recuperáveis por computação quântica, e altera a forma como as chaves incoming, outgoing e diversifier são derivadas, pelo que as chaves com `use_qsk = true` são genuinamente chaves diferentes. A ZIP 326 exige que a flag seja uniforme em toda uma conta e proíbe a geração de chaves com `use_qsk = true` antes da ativação de NU6.3 na Mainnet. Portanto, uma chave exportada de uma conta que existia antes de Ironwood é uma chave `use_qsk = false` e continua correta para essa conta. Não presuma que uma chave exportada de uma conta descreve outra.

## Exportar uma viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) é a wallet de nó completo que substituiu a wallet dentro de zcashd. A exportação e importação de viewing keys chegou na **v0.1.0-beta.2 (28 de julho de 2026)**, por isso verifique primeiro a sua versão; versões anteriores não possuem estes métodos. Todos os argumentos após o nome do método têm de ser JSON válido, o que significa que os valores de string mantêm as suas próprias aspas duplas. O [Guia de Referência Rápida do Zallet](/using-zcash/zallet-quick-reference-guide) aborda o estilo geral dos comandos.

Liste o que a wallet possui:

```bash
zallet rpc listaddresses
```

Exporte a unified full viewing key da conta passando um unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Em vez disso, exporte a unified incoming viewing key da conta usando o argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passar um endereço Sapling devolve a Sapling extended full viewing key dessa conta (`zxviews…`), correspondendo ao comportamento anterior do zcashd. Dois limites documentados: os endereços Sprout são rejeitados e uma Sapling extended full viewing key não pode ser exportada de uma conta que tenha sido importada como apenas de visualização, porque a wallet não consegue reconstruí-la. A forma `ivk` funciona para contas importadas apenas de visualização.

### Wallets que exportam viewing keys através da sua própria interface

A página [Wallets](/using-zcash/wallets) acompanha o suporte a viewing keys e a preparação para Ironwood de cada wallet. À data de redação, as wallets que indicam suporte a viewing keys e **Ironwood: Ready** incluem ZODL, Zingo!, Zkool, Cake, Zallet, Zecd e Nozy. Consulte essa página em vez desta antes de depender de qualquer wallet individual, porque o estado de preparação muda.

## Importar uma viewing key como conta apenas de visualização

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) é aqui a opção mais flexível, porque aceita chaves unificadas e também chaves antigas. O seu README documenta contas apenas de visualização criadas a partir de uma **unified viewing key** ou de uma **Sapling extended viewing key**, juntamente com chaves extended blindadas antigas exportadas de zcashd. Adicione uma nova conta, escolha a opção apenas de visualização e cole a chave `uview…` ou `zxviews…`; a conta sincroniza então e apresenta saldos e histórico sem autoridade para gastar.

O suporte ao protocolo Ironwood e a migração Orchard-para-Ironwood chegaram ao Zkool 6.24.0 (20 de julho de 2026), e a versão 6.26.1 (2 de agosto de 2026) corrigiu a deteção de transações Ironwood na mempool. Use a versão 6.26.1 ou posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

O segundo argumento é a política de revarrimento: `"whenkeyisnew"` (a predefinição), `"yes"` ou `"no"`. O terceiro é a altura do bloco a partir da qual revarrer. Zallet importa a chave como uma conta apenas de visualização e acompanha transações recebidas e enviadas para os seus endereços sem autoridade para gastar.

**Zallet importa apenas Sapling extended full viewing keys.** Não importa uma unified full viewing key `uview…`, embora possa exportar uma. Para conceder acesso de leitura a uma conta unificada inteira, exporte a UFVK de Zallet e importe-a numa wallet que aceite chaves unificadas, como Zkool.

Para transformar uma chave importada num ficheiro de histórico completo de transações, com txids, taxas e memos, consulte [Exportar Histórico de Transações a partir de uma Viewing Key](/guides/viewing-key-transaction-export).

## O que mudou e o que deixar de procurar

Se seguiu uma versão mais antiga desta página, ou uma tradução dela, três caminhos já não funcionam.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** zcashd chegou à sua interrupção de fim de suporte em 18 de julho de 2026 e já não funciona. Os métodos com o mesmo nome de Zallet são a substituição; consulte o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **O guia passo a passo de Ywallet.** A página Wallets marca Ywallet como **Ironwood: Not Ready**, pelo que não é a wallet a recomendar para viewing keys da era Ironwood. Zkool, do mesmo programador, aceita a mesma gama de chaves e está marcada como Ready.
- **zcashblockexplorer.com/vk.** O serviço devolve HTTP 503 com um certificado inválido e foi abandonado em vez de substituído. Colar uma viewing key num website entrega todo o seu histórico de transações a quem gere esse website, o que sempre foi a mais fraca das três opções na página antiga. Em vez disso, importe a chave numa wallet que controla.

## Recursos

Use viewing keys quando necessário e prefira a chave mais restrita que responda à questão colocada.

- [ZIP 326: Consequências de NU6.3 para Wallets](https://zips.z.cash/zip-0326) — como as viewing keys se comportam nos pools Orchard e Ironwood
- [ZIP 229: Formato de Transação Versão 6](https://zips.z.cash/zip-0229) — define os pools Orchard e Ironwood
- [Registo de alterações do Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — qual versão adicionou cada método RPC
- [README do Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de conta e chave suportados
- [ECC, Explicação das Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgação Seletiva e Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Apresentação em Vídeo sobre Viewing Keys Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
