<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Os endereços shielded permitem-lhe transacionar revelando o mínimo possível na blockchain da Zcash. Então, o que acontece quando *precisa* de mostrar a uma parte específica o que detém, ou o que enviou? Cada endereço shielded tem uma viewing key que concede acesso de leitura sem conceder a capacidade de gastar. As viewing keys foram introduzidas na [ZIP 310](https://zips.z.cash/zip-0310) e adicionadas ao protocolo na atualização de rede Sapling.

Uma viewing key é a ferramenta para divulgação seletiva: escolhe quem vê o quê, e nunca entrega autoridade de gasto para o fazer.

## Porque usar uma viewing key?

O texto da Electric Coin Company sobre o tema apresenta as situações que surgem com mais frequência, e continuam a ser as mais comuns hoje:

- **Uma exchange a monitorizar depósitos.** A exchange carrega uma incoming viewing key num nó de deteção exposto à internet para poder detetar depósitos de clientes para um endereço shielded, enquanto a spending key permanece em hardware que nunca toca na rede.
- **Um custodiante a comprovar as suas reservas.** O custodiante entrega a um auditor uma full viewing key para cada endereço shielded. O auditor pode verificar esses saldos e rever atividade passada de e para esses endereços, e não pode fazer mais nada.
- **Due diligence sobre uma contraparte.** Quando uma exchange precisa de rever o histórico shielded de um cliente como parte de due diligence reforçada, pode pedir a viewing key em vez dos fundos.

## O que uma viewing key revela e o que não revela

Existe mais do que um tipo de chave, e a diferença determina quanto revela.

| Chave | Prefixo | Concede |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Vê transações recebidas **e** enviadas para todas as pools da conta |
| Unified incoming viewing key (UIVK) | `uivk…` | Vê apenas transações recebidas, para todas as pools da conta |
| Sapling extended full viewing key | `zxviews…` | Vê atividade Sapling recebida e enviada para os endereços da chave |

Nenhuma destas pode gastar. Todas são permanentes no que importa: uma chave que entregou não pode ser revogada, apenas ultrapassada, movendo fundos para uma conta cujas chaves a outra parte não detenha.

Vale a pena conhecer duas armadilhas de divulgação antes de partilhar seja o que for.

**Incoming não significa restrito.** Uma unified incoming viewing key aplica-se à conta inteira, não ao único endereço sobre o qual lhe perguntaram. Exportar uma UIVK para um único endereço Sapling continua a conceder visibilidade de entradas em todas as pools dessa conta, por isso revela mais do que o endereço que nomeia. O [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) afirma isto explicitamente.

**Um endereço publicado já expõe a sua incoming viewing key a um adversário futuro.** A [ZIP 326](https://zips.z.cash/zip-0326) observa que um adversário com um computador quântico poderia recuperar a incoming viewing key de um endereço diversificado publicado, algo viável de uma forma que recuperar a nullifier key não é. Publicar um endereço não é o mesmo que publicar uma viewing key hoje, mas as duas coisas ficam mais próximas num horizonte temporal suficientemente longo.

## Viewing keys após Ironwood

A NU6.3 introduziu a pool shielded Ironwood e tornou a pool Orchard apenas de gasto, pelo que os fundos migram de uma para a outra ao longo do tempo. Veja [Ironwood](/zcash-tech/ironwood) e [The turnstile](/zcash-tech/the-turnstile) para a atualização em si.

**Uma viewing key emitida antes de Ironwood continua a funcionar após a migração.** A ZIP 326 especifica que um receiver, e a respetiva incoming viewing key, está associado ao *protocolo* Orchard e não a uma pool: a mesma incoming viewing key faz trial-decrypt tanto de note ciphertexts da pool Orchard como da pool Ironwood. O Zallet implementa-o dessa forma, descrevendo as notas Ironwood como tendo a forma de Orchard e sendo sujeitas a trial-decrypt com as Orchard viewing keys da conta sob o domínio de note-encryption Ironwood.

Três consequências para qualquer pessoa que detenha ou emita uma chave:

1. **Os saldos movem-se entre pools, e quem vê a chave vê isso acontecer.** A [ZIP 318](https://zips.z.cash/zip-0318) especifica a migração como uma série de pequenas transações Orchard-para-Ironwood deliberadamente uniformes, difundidas num calendário aleatorizado, cada uma gastando uma nota Orchard e produzindo uma saída Ironwood de uma denominação canónica. Um auditor a observar com uma viewing key vê as reservas passarem de uma pool para a outra em etapas ao longo de semanas, não num único movimento. Uma wallet pode reconstruir o seu próprio progresso de migração a partir dos dados da chain usando as suas viewing keys.
2. **Cada etapa da migração revela o valor que move.** Isso é inerente a atravessar um turnstile, e é o que torna a migração auditável. Dividir o saldo em denominações canónicas significa que nenhuma transação isolada revela o saldo total da pool Orchard.
3. **As contas criadas após Ironwood podem derivar as suas chaves de forma diferente.** A [ZIP 2005](https://zips.z.cash/zip-2005) adiciona um sinalizador `use_qsk` para chaves recuperáveis por computação quântica, e altera a forma como as chaves incoming, outgoing e diversifier são derivadas, pelo que chaves `use_qsk = true` são genuinamente chaves diferentes. A ZIP 326 exige que o sinalizador seja uniforme em toda a conta e proíbe gerar chaves `use_qsk = true` antes de a NU6.3 ser ativada na Mainnet. Portanto, uma chave exportada de uma conta que existia antes de Ironwood é uma chave `use_qsk = false`, e continua correta para essa conta. Não assuma que uma chave exportada de uma conta descreve outra.

## Exportar uma viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) é a wallet de nó completo que substituiu a wallet dentro de zcashd. A exportação e importação de viewing keys chegaram na **v0.1.0-beta.2 (28 de julho de 2026)**, por isso verifique primeiro a sua versão; compilações anteriores não têm estes métodos. Todos os argumentos após o nome do método têm de ser JSON válido, o que significa que os valores de texto mantêm as suas próprias aspas duplas. O [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) cobre o estilo geral dos comandos.

Liste o que a wallet contém:

```bash
zallet rpc listaddresses
```

Exporte a unified full viewing key da conta passando um unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporte antes a unified incoming viewing key da conta, usando o argumento opcional `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passar um endereço Sapling devolve a Sapling extended full viewing key dessa conta (`zxviews…`), correspondendo ao antigo comportamento do zcashd. Dois limites documentados: endereços Sprout são rejeitados, e uma Sapling extended full viewing key não pode ser exportada de uma conta que tenha sido ela própria importada como apenas de visualização, porque a wallet não a consegue reconstruir. A forma `ivk` funciona em contas importadas como apenas de visualização.

### Wallets que exportam viewing keys a partir da sua própria interface

A página [Wallets](/using-zcash/wallets) acompanha o suporte para viewing keys e a prontidão para Ironwood de cada wallet. No momento da redação, as wallets que listam tanto suporte para viewing keys como **Ironwood: Ready** incluem ZODL, Zingo!, Zkool, Cake, Zallet, Zecd e Nozy. Verifique essa página em vez desta antes de depender de qualquer wallet específica, porque a prontidão muda.

## Importar uma viewing key como conta watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) é a opção mais flexível aqui, porque aceita chaves unified assim como as antigas. O seu README documenta contas apenas de visualização criadas a partir de uma **unified viewing key** ou de uma **Sapling extended viewing key**, juntamente com chaves shielded extended antigas exportadas do zcashd. Adicione uma nova conta, escolha a via apenas de visualização e cole a chave `uview…` ou `zxviews…`; a conta sincroniza então e apresenta saldos e histórico sem autoridade de gasto.

O suporte ao protocolo Ironwood e a migração Orchard-para-Ironwood chegaram ao Zkool 6.24.0 (20 de julho de 2026), e a 6.26.1 (2 de agosto de 2026) corrigiu a deteção de transações Ironwood na mempool. Execute a versão 6.26.1 ou posterior.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

O segundo argumento é a política de rescan: `"whenkeyisnew"` (a predefinição), `"yes"` ou `"no"`. O terceiro é a altura do bloco a partir da qual fazer rescan. O Zallet importa a chave como uma conta apenas de visualização e acompanha transações recebidas e enviadas para os seus endereços sem autoridade de gasto.

**O Zallet importa apenas Sapling extended full viewing keys.** Não importa uma unified full viewing key `uview…`, apesar de conseguir exportar uma. Para conceder acesso de leitura a uma conta unified inteira, exporte a UFVK do Zallet e importe-a para uma wallet que aceite chaves unified, como a Zkool.

## O que mudou, e o que deve deixar de procurar

Se seguiu uma versão mais antiga desta página, ou uma tradução dela, três caminhos já não funcionam.

- **`zcash-cli z_exportviewingkey` e `z_importviewingkey`.** O zcashd chegou ao fim do suporte em 18 de julho de 2026 e já não executa. Os métodos com os mesmos nomes no Zallet são a substituição; veja o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **O guia passo a passo do Ywallet.** A página Wallets marca o Ywallet como **Ironwood: Not Ready**, por isso não é a wallet para a qual se deve apontar as pessoas no caso de viewing keys da era Ironwood. O Zkool, do mesmo programador, aceita a mesma gama de chaves e está marcado como Ready.
- **zcashblockexplorer.com/vk.** O serviço devolve HTTP 503 com um certificado inválido, e foi abandonado em vez de ser substituído. Colar uma viewing key num website entrega todo o seu histórico de transações a quem operar esse website, o que sempre foi a mais fraca das três opções da página antiga. Importe antes a chave para uma wallet que execute.

## Recursos

Use viewing keys apenas quando necessário, e prefira a chave mais restrita que responda à pergunta que está a ser feita.

- [ZIP 326: Consequences for Wallets da NU6.3](https://zips.z.cash/zip-0326) — como as viewing keys se comportam entre as pools Orchard e Ironwood
- [ZIP 229: Formato de Transação Versão 6](https://zips.z.cash/zip-0229) — define as pools Orchard e Ironwood
- [Registo de alterações do Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — que lançamento adicionou que método RPC
- [README do Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — tipos de conta e de chave suportados
- [ECC, Explicação das Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgação Seletiva e Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Apresentação em Vídeo sobre Viewing Key da Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
