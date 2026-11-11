<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Recuperação de fundos de carteiras Zcash

**Por que guardar seu material de recuperação?**

As seeds, as chaves de gastos, as chaves de visualização e os arquivos de carteira não são intercambiáveis. Uma frase semente pode derivar chaves de carteira para muitas carteiras, mas não substitui todas as chaves ou arquivos de carteira antigos. Uma chave de visualização pode revelar atividade blindada, mas não pode autorizar um gasto.

A recuperação depende de ter a autoridade de gastos correta e um caminho atualmente compatível com o pool que detém os fundos. Mantenha o material de recuperação privado e nunca compartilhe seeds, chaves de gastos ou arquivos de carteira com alguém em quem você não confie.

# Segurança e responsabilidade

É crucial que os usuários compreendam os riscos envolvidos ao lidar com chaves privadas e mantenham essas chaves protegidas contra acesso não autorizado. A segurança dos fundos depende da responsabilidade do usuário em proteger suas chaves privadas.

## Fundos blindados antigos: Sprout, Sapling e Orchard

Os ZEC blindados mais antigos podem precisar ser migrados como parte da recuperação. O caminho depende de qual pool blindado detém atualmente os fundos.

> **NU7 está planejado para 5 de novembro de 2026.** Assim que for ativado, o atual caminho de migração para sair do pool Sprout antigo deixará de funcionar.
>
> Se você ainda tiver ZEC no pool Sprout, migre-o antes da atualização. Após a ativação, as ferramentas existentes não poderão mais mover fundos Sprout para Sapling, endereços transparentes ou qualquer outro destino.
>
> Se você estiver vendo esta página **depois que NU7** for ativado, **Sprout ficará congelado no gelo** até que um futuro método de recuperação se torne disponível, algo que não está atualmente planejado.

## A resposta em uma página

| Os seus fundos estão em | Caminho de migração | O que fazer |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Se você tiver `wallet.dat` ou uma chave de gastos Sprout independente, experimente primeiro o atual caminho de recuperação do Argos. Se Argos não for adequado, use o caminho sidecar antigo no guia de campo completo. Sprout deve chegar primeiro a Sapling e depois seguir para Ironwood. Este caminho é sensível ao tempo devido ao NU7. |
| **Sapling** | **Sapling → Ironwood** | Não é necessário um ambiente de recuperação Sprout. Use uma carteira atual que consiga recuperar ou gastar sua conta Sapling específica e construir transações Ironwood. O suporte a Ironwood, por si só, não comprova suporte à recuperação do Sapling antigo. |
| **Orchard** | **Orchard → Ironwood** | Orchard é apenas de saída. Use o fluxo de migração integrado de Orchard para Ironwood de uma carteira atual compatível. Consulte [Fundos recuperados e o pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Fluxo de decisão com cinco perguntas

1. **É Sprout?** Uma frase semente, por si só, aponta para um caminho de recuperação posterior, da era Sapling/Orchard, não para Sprout. Um endereço `zc...`, ou uma carteira restaurada que informe um saldo Sprout, aponta para Sprout.
2. **Que material de recuperação você tem?** Procure `wallet.dat`, o computador antigo ou datadir, um backup `z_exportwallet` ou uma chave de gastos Sprout exportada. Um endereço `zc...`, por si só, não é suficiente.
3. **Argos ou o sidecar antigo?** Se você tiver `wallet.dat` ou uma chave de gastos Sprout independente e simplesmente quiser retirar os fundos, experimente primeiro [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Use o caminho sidecar antigo no guia de campo completo se Argos não conseguir processar o material ou se você quiser manter toda a pilha de recuperação sob seu próprio controle.
4. **Você já tem um datadir zcashd sincronizado e não podado?** Isso só importa para o caminho sidecar antigo. Copie dados de nós existentes apenas após um encerramento limpo; caso contrário, o guia de campo aborda as opções de snapshot/do zero.
5. **Onde os fundos acabam?** **Ironwood.** Sprout passa primeiro por Sapling porque não existe uma única transação direta de Sprout para Ironwood. Não pare em Sapling.

### Guia de campo completo para migração do pool ZEC

Para a referência completa de migração, incluindo caminhos de recuperação detalhados, comandos, taxas, requisitos de hardware, considerações de privacidade, solução de problemas e notas sobre as fontes, leia o guia completo.

**Versão 1.1 · Atualizado em 18 de setembro de 2026**

[Leia o Guia de campo completo para migração do pool ZEC em ZecHub](/research/zec-pool-migration/view)

> **Antes de começar:** determine primeiro **o que você está recuperando e qual material de recuperação ainda tem**. Uma frase semente de uma carteira atual ou uma chave de gastos não-Sprout compatível pode precisar apenas de uma restauração normal. Material antigo — como uma seed Zecwallet Lite, uma `wallet.dat` antiga ou uma chave de gastos Sapling ou Sprout independente — pode precisar de um caminho de recuperação dedicado.
>
> Se você acha que os fundos estão em **Sprout**, confirme que ainda tem autoridade de gastos antes de dedicar tempo à recuperação. Um endereço `zc...` ou apenas material de visualização não basta para mover os fundos.
>
> **YWallet não oferece mais suporte ao Zcash após Ironwood.** Use **Zkool** para restaurações normais não-Sprout a partir de seeds e chaves compatíveis. Use **Argos** para recuperação de Zecwallet Lite, arquivos de carteira antigos e chaves de gastos Sapling/Sprout independentes. Para Sprout, Argos é o primeiro caminho a experimentar; o guia de campo completo aborda a alternativa sidecar antiga.
>
> Use a tabela abaixo com base **no que você realmente tem**, e não na ferramenta de recuperação que se lembra de ter usado.

| Você tem | Comece aqui |
| --- | --- |
| A seed phrase ou uma **chave de gastos não-Sprout** compatível de uma carteira atual ou mantida recentemente, incluindo material antigo do YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| Apenas uma **chave de visualização** | Zkool pode importar chaves de visualização compatíveis para acesso somente leitura, mas uma chave de visualização não pode autorizar gastos de recuperação. Encontre a seed ou chave de gastos correspondente. |
| Uma seed **Zecwallet Lite** de 24 palavras | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Uma `wallet.dat` do Zecwallet Lite ou zcashd, ou uma chave de gastos Sapling / Sprout independente | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Em 18 de setembro de 2026, a v1.3.0 é a versão atual e preferida; use a v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout. |
| Material Sprout que Argos não consegue processar, ou uma recuperação em que você quer manter os componentes antigos sob seu próprio controle | Use o caminho sidecar antigo no [guia completo](/research/zec-pool-migration/view). |
| Nenhuma seed ou chave de gastos funcional, mas um dispositivo bloqueado, senha esquecida ou disco com falha | [Recuperação profissional](#professional-recovery-when-you-do-not-have-the-seed). Nunca envie uma seed ou chave de gastos funcional para alguém que entre em contato com você sem solicitação. |

## Recuperação de fundos com Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) é o sucessor mantido do YWallet para Zcash, do mesmo desenvolvedor. Ele oferece suporte a caminhos de recuperação transparentes e blindados modernos, incluindo chaves Sapling antigas, mas **não Sprout**.

Duas situações são abordadas aqui:

1. **Restaurar uma conta** a partir de uma frase semente, chave privada ou chave de visualização
2. **Varrer fundos** de uma carteira que sempre ofereceu suporte apenas a endereços transparentes

### 1) Restaurar uma conta

1. Instale Zkool a partir da [página de lançamentos](https://github.com/hhanh00/zkool2/releases) e abra-o
2. No **Gerenciador de contas** (a página principal), toque no botão **+** para chegar à tela **Nova conta**
3. Insira um **Nome da conta** para identificar esta conta
4. Ative **Restaurar conta?**. Isso revela os campos de chave e altura de nascimento
5. Cole sua chave em **Chave (frase semente, chave privada ou Viewing Key)**. Zkool aceita frases semente, chaves secretas Sapling, chaves estendidas transparentes e chaves de visualização compatíveis. Uma chave de visualização é somente leitura e não pode autorizar um gasto.
6. Insira uma **Altura de nascimento** para uma conta antiga. Zkool não analisa blocos anteriores a essa altura, portanto escolha uma altura anterior à primeira atividade da carteira se não tiver certeza. Uma altura de nascimento definida tarde demais pode fazer parecer que transações reais estão ausentes.

![Tela New Account do Zkool com Restore Account e Advanced Options ativados](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Salve a conta e depois sincronize-a

### Restaurar uma seed de uma carteira diferente

Se a seed veio de uma carteira que segue ZIP 316 — incluindo ZODL (anteriormente Zashi), Zingo ou zcashd — ative **Opções avançadas** e habilite **Usar alteração interna** antes de salvar.

ZIP 316 usa um endereço interno/de alteração separado. Restaurar uma dessas contas sem **Usar alteração interna** pode fazer parecer que as saídas de alteração estão ausentes, embora os fundos ainda existam.

Há mais dois campos em **Opções avançadas**:

- **Frase secreta extra (opcional)**, apenas se a carteira original usava uma
- **Índice da conta**, se a carteira original mantinha várias contas em uma seed. Os fundos podem estar em um índice diferente

> **Esses dois só aparecem quando há uma frase semente válida no campo Chave.** Com o campo vazio, ou contendo uma chave privada ou de visualização, Zkool mostra apenas **Usar alteração interna** e **H/W Ledger**. Cole primeiro a seed e depois abra as Opções avançadas.

### 2) Varrer fundos de uma carteira somente transparente

Se a carteira ou conta antiga mantinha apenas **ZEC transparentes**, restaure primeiro a conta, encontre cada endereço transparente usado e depois mova os fundos para um destino blindado atual que você controla. Não presuma que uma marca de carteira antiga sempre foi somente transparente; alguns produtos adicionaram suporte blindado em versões posteriores.

1. Restaure a conta usando as etapas acima
2. Abra a conta e vá para a página **Receber fundos**
3. Toque na lupa na barra superior (**Encontrar outros endereços transparentes**). Carteiras que alternam endereços, como Ledger e Exodus, geram muitos endereços transparentes a partir de uma seed, e isso encontra os que detêm fundos
4. **Redefina e sincronize a conta depois.** Os endereços recém-encontrados só recebem seus saldos na próxima análise, portanto ignorar isso faz parecer que a varredura não encontrou nada
5. Vá para a página **Enviar**. Ao lado do saldo, você encontrará três botões de ícone. Eles não têm rótulos de texto, portanto passe o cursor ou mantenha pressionado para ver seus nomes:
   - **Blindar um** (escudo contornado) move um endereço transparente de cada vez
   - **Blindar todos** (escudo preenchido) move tudo de todos os endereços transparentes de uma vez
   - **Desblindar todos** (cadeado aberto) faz o inverso, para um endereço transparente

> **Blindar um é a opção mais privada.** Blindar vários endereços em uma única transação os vincula publicamente como pertencentes à mesma pessoa. O próprio Zkool avisa sobre isso antes de executar Blindar todos.

6. Revise a transação e envie-a

Desblindar todos é útil ao sacar para uma corretora que aceita apenas endereços transparentes. Os botões de blindagem só aparecem se a conta tiver um endereço blindado, e Desblindar todos só aparece se ela tiver um transparente.

## Recuperação de Zecwallet Lite e carteiras antigas com Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) não é mais mantida e seu repositório está arquivado. A derivação de sua seed difere da estrutura usada pelas carteiras atuais, portanto importar a mesma frase em uma carteira moderna pode não encontrar fundos mantidos nos endereços derivados adicionais da Zecwallet Lite. [Argos](https://argos.sovright.com), da Sovright, é um espaço de trabalho de recuperação para desktop criado para este e outros casos de recuperação antigos.

Argos lê seeds e arquivos de carteira Zecwallet Lite, `wallet.dat` do zcashd, chaves de gastos estendidas Sapling independentes e material de gastos Sprout. Para Sprout, uma seed Zecwallet Lite por si só não é suficiente, porque essas chaves foram geradas separadamente. Argos é uma ferramenta de recuperação, não uma carteira para uso diário: inspecione o material de origem localmente, analise e depois varra os fundos para uma carteira mantida que você controla.

Least Authority [auditou](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) a ferramenta. A recuperação em si é gratuita. Uma doação opcional para a Sovright pode aparecer durante a varredura.

> **Nunca digite uma seed em um site.** O site do Argos serve apenas para baixar o aplicativo e consultar o [guia do usuário](https://argos.sovright.com/guide.html). As chaves permanecem no aplicativo desktop assinado. A validação é local em relação à soma de verificação BIP-39. O campo da seed é limpo assim que a análise começa. Qualquer pessoa que enviar uma mensagem pedindo essa seed "para ajudar a recuperar seus fundos" está tentando enganar você.

### Antes de abrir Argos

1. Baixe o aplicativo desktop pelo [site oficial do Argos](https://argos.sovright.com) ou pela [página de lançamentos do GitHub](https://github.com/sovright/argos/releases). Verifique somas de verificação ou assinaturas quando forem publicadas.
2. Use a versão atual do Argos. Em 18 de setembro de 2026, a **v1.3.0** é a versão atual e preferida. Use a **v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout**. Compilações anteriores à 1.1.0 ainda podem analisar, mas constroem varreduras pré-Ironwood que a rede rejeita; atualize e tente novamente.
3. Trabalhe em uma máquina em que você confie. Prefira criptografia de disco completo. Não compartilhe a tela enquanto uma seed, frase secreta ou chave de gastos estiver visível.
4. Tenha pronto um destino Unified Address de uma carteira mantida que você controla, como [ZODL](https://zodl.com/). Confirme o endereço nessa carteira antes de colá-lo no Argos.

### Recuperação de seed

1. Abra Argos e escolha **Tenho minha frase semente de 24 palavras**. Uma recuperação de seed não precisa de um arquivo de carteira.
2. Cole a frase e clique em **Validar seed**. Se indicar que a seed é válida, continue.
3. Insira uma **altura do bloco de aniversário**, ou a estimativa mais próxima de quando a carteira foi criada. Uma altura anterior é mais lenta, mas mais segura do que estimar tarde demais.
4. Nos controles do servidor, use a predefinição do servidor atual ou insira URLs lightwalletd. URLs separados por vírgulas são testados na ordem indicada. Exemplos públicos:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Cole o destino Unified Address.
6. Clique em **iniciar análise**. Isso pode levar minutos ou dias, dependendo da altura de aniversário. Você pode sair e reabrir o mesmo espaço de trabalho; a análise será retomada.
7. Quando a análise terminar, revise os saldos, a estimativa da taxa e o destino, depois clique em **varrer**.

Transmitir uma varredura é irreversível. Guarde o arquivo de carteira original até que todos os pools relevantes tenham sido varridos e a carteira de destino mostre os fundos esperados. Quando a recuperação estiver concluída, deixe de usar os segredos antigos em vez de continuar a usá-los para novas atividades.

### Arquivos de carteira e chaves independentes

Na tela de boas-vindas, **Tenho um arquivo de carteira** abrange um arquivo Zecwallet Lite, um zcashd `wallet.dat` ou chaves de gastos estendidas Sapling independentes. A recuperação de chaves de gastos Sprout independentes é tratada pelo caminho de recuperação Sprout/CLI do Argos.

Argos lê arquivos de carteira sem modificá-los. Se a carteira estiver criptografada, digite a senha quando solicitado; ela é usada na memória e não é gravada no disco. Verifique as contagens de chaves transparentes, Sapling e Sprout antes de iniciar uma varredura.

As chaves de visualização não são aceitas para uma varredura porque não podem autorizar gastos.

### Notes do Sprout

Uma semente do Zecwallet Lite não deriva chaves Sprout. Essas chaves foram geradas separadamente. Recupere Sprout a partir de um zcashd `wallet.dat` ou de uma chave de gastos independente na CLI.

Se o arquivo já tiver dados de notes que podem ser gastas e uma testemunha em cache, Argos pode oferecer **Varrer fundos Sprout** sem uma varredura da chain. Caso contrário, pode executar uma varredura completa de blocos que pode ser retomada pela rede P2P. Essa varredura é grande e lenta. O ponto de verificação que grava permite gastos, por isso proteja-o como a carteira original.

O valor Sprout só pode chegar ao Sapling. Depois que os fundos Sapling estiverem confirmados e puderem ser gastos, mova-os para **Ironwood** com uma carteira atual que suporte a conta Sapling recuperada. Não pare no Sapling.

## Fundos recuperados e o pool Ironwood

Desde que a atualização Ironwood (NU6.3) foi ativada em 28 de julho de 2026, o pool Orchard é apenas para gastos. Nenhum valor novo pode entrar nele, e o valor existente sai pela catraca para Ironwood.

Se seus fundos recuperados estiverem em Orchard, mova-os para Ironwood usando o **fluxo de migração integrado da carteira atual**. Orchard é apenas de saída após NU6.3.

Zkool 6.30.0 é atual em 18 de setembro de 2026 e suporta Ironwood. Seu design de migração é focado na privacidade, mas não equivale a alegar conformidade com ZIP 318. Outras carteiras atuais podem usar migração faseada no estilo ZIP 318. Siga a tela de migração atual e as notas de lançamento da carteira instalada, em vez de inventar manualmente um valor ou cronograma.

Uma migração faseada pode usar várias transações, portanto a taxa total pode ser maior do que a de uma transferência única.

> **Os valores de migração são públicos.** Quando o valor atravessa a catraca, o valor e a altura do bloco ficam visíveis on-chain, embora o remetente e o destinatário permaneçam blindados. Use a política de migração privada/faseada integrada da carteira quando a privacidade for importante e use privacidade no nível da rede, como Tor ou outra camada de privacidade confiável, quando apropriado. A privacidade de rede pode ocultar seu vínculo de IP; ela não oculta o valor público da passagem.

## Recuperação profunda com ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) é um projeto de recuperação da Zingo Labs **em desenvolvimento** atualmente focado em arquivos de carteira do Zecwallet Lite e migração de formatos de carteira. Seu README atualmente direciona usuários que procuram recuperação de fundos para a opção de exportação **Zingolib**, enquanto um suporte ZeWIF mais completo continua em desenvolvimento.

Trate-o como uma ferramenta avançada/para casos extremos, em vez do caminho de recuperação padrão. Para sementes comuns do Zecwallet Lite, arquivos de carteira, zcashd `wallet.dat` e chaves de gastos independentes compatíveis, tente Argos primeiro. Verifique tudo o que recuperar com ZExCavator em uma carteira mantida antes de depender dele.

## Recuperação profissional quando você não tem a semente

Se a semente ou a chave foi perdida, uma restauração auto-hospedada não pode começar. Algumas pessoas nessa situação usam uma empresa de recuperação profissional para senhas esquecidas, falhas de hardware ou discos ilegíveis.

Esse caminho não é o mesmo que restaurar uma semente que você ainda possui. Não entregue uma semente funcional a alguém que se ofereça para "recuperá-la" para você. A versão fraudulenta desse serviço é comum.

[Unciphered](https://unciphered.com) é uma empresa que realiza esse trabalho internamente e foi mencionada em publicações como a Wired. É um serviço geral de recuperação de criptomoedas, não uma ferramenta específica do Zcash, e cobra pelo trabalho. ZecHub não recomenda nenhuma empresa de recuperação. Se seguir esse caminho, confirme você mesmo o domínio oficial e presuma que qualquer pessoa que envie uma DM primeiro é um golpista.

Se você ainda possui uma semente ou chave de gastos funcional, comece por um caminho de recuperação auto-hospedado, como Zkool ou Argos, na sua própria máquina.

## YWallet não recebe mais manutenção

YWallet foi durante muito tempo a ferramenta de recuperação recomendada nesta página, e muitos guias mais antigos ainda apontam para ela.

Seu desenvolvedor agora afirma que YWallet não suporta mais o Zcash desde a atualização Ironwood e direciona usuários do Zcash para **Zkool**, o sucessor mantido. Preserve material antigo de semente/chave do YWallet, mas não inicie uma nova migração do Zcash no YWallet.

Se você já possui material de recuperação do Zcash do YWallet, restaure-o no Zkool usando o caminho de semente/chave compatível acima.

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) - quais carteiras recebem manutenção e seu preparo para Ironwood, incluindo Argos
- [Ironwood](/zcash-tech/ironwood) - o que a atualização alterou e por que os fundos migram
- [Memorandos](/using-zcash/memos) - como funcionam os memorandos criptografados
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso somente de leitura sem poder de gastos
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - endpoints públicos lightwalletd que Argos pode usar
- [Guia do usuário do Argos](https://argos.sovright.com/guide.html) - guia oficial da Sovright
- [Naomi Brockwell sobre ferramentas de recuperação](https://x.com/naomibrockwell/status/2079146521405333526) - guia do Argos e uma nota sobre recuperação profissional
