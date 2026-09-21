<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zcash Recuperação de fundos de wallet

**Porquê guardar o seu material de recuperação?**

As seeds, as chaves de gasto, as chaves de visualização e os ficheiros de wallet não são intercambiáveis. Uma frase seed pode derivar chaves de wallet para muitas wallets, mas não substitui todas as chaves ou ficheiros de wallet antigos. Uma chave de visualização pode revelar atividade blindada, mas não pode autorizar um gasto.

A recuperação depende de ter a autoridade de gasto correta e um caminho atualmente suportado para o pool que detém os fundos. Mantenha o material de recuperação privado e nunca partilhe seeds, chaves de gasto ou ficheiros de wallet com alguém em quem não confie.

# Segurança e responsabilidade

É crucial que os utilizadores compreendam os riscos envolvidos ao lidar com chaves privadas e mantenham estas chaves protegidas contra acesso não autorizado. A segurança dos fundos depende da responsabilidade do utilizador em salvaguardar as suas chaves privadas.

## Fundos blindados antigos: Sprout, Sapling e Orchard

Os ZEC blindados mais antigos podem ter de ser migrados como parte da recuperação. O percurso depende de qual pool blindado detém atualmente os fundos.

> **NU7 está planeado para 5 de novembro de 2026.** Assim que for ativado, o atual caminho de migração para sair do pool Sprout antigo deixará de funcionar.
>
> Se ainda tiver ZEC no pool Sprout, migre-o antes da atualização. Após a ativação, as ferramentas existentes deixarão de conseguir mover fundos Sprout para Sapling, endereços transparentes ou qualquer outro destino.
>
> Se estiver a ver esta página **depois de NU7** ter sido ativado, **Sprout fica congelado no gelo** até que um futuro método de recuperação se torne disponível, algo que não está atualmente planeado.

## A resposta numa página

| Os seus fundos estão em | Percurso de migração | O que fazer |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Se tiver `wallet.dat` ou uma chave de gasto Sprout autónoma, experimente primeiro o atual caminho de recuperação Argos. Se Argos não for adequado, utilize o percurso sidecar antigo no guia de campo completo. Sprout tem primeiro de chegar a Sapling e depois seguir para Ironwood. Este percurso é sensível ao tempo devido a NU7. |
| **Sapling** | **Sapling → Ironwood** | Não é necessário um ambiente de recuperação Sprout. Utilize uma wallet atual que consiga recuperar ou gastar a sua conta Sapling específica e construir transações Ironwood. O suporte a Ironwood, por si só, não comprova suporte à recuperação do Sapling antigo. |
| **Orchard** | **Orchard → Ironwood** | Orchard é apenas de saída. Utilize o fluxo de migração integrado de Orchard para Ironwood de uma wallet atual compatível. Consulte [Fundos recuperados e o pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Fluxo de decisão com cinco perguntas

1. **É Sprout?** Uma frase seed, por si só, aponta para um caminho de recuperação da era Sapling/Orchard posterior, não para Sprout. Um endereço `zc...`, ou uma wallet restaurada que reporte um saldo Sprout, aponta para Sprout.
2. **Que material de recuperação tem?** Procure `wallet.dat`, o computador antigo ou datadir, uma cópia de segurança `z_exportwallet`, ou uma chave de gasto Sprout exportada. Um endereço `zc...`, por si só, não é suficiente.
3. **Argos ou o sidecar antigo?** Se tiver `wallet.dat` ou uma chave de gasto Sprout autónoma e simplesmente quiser retirar os fundos, experimente primeiro [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Utilize o percurso sidecar antigo no guia de campo completo se Argos não conseguir processar o material ou se quiser ter a pilha de recuperação completa sob o seu próprio controlo.
4. **Já tem um datadir zcashd sincronizado e não podado?** Isto só importa para o percurso sidecar antigo. Copie dados de nó existentes apenas após um encerramento limpo; caso contrário, o guia de campo abrange as opções de snapshot/do zero.
5. **Onde acabam os fundos?** **Ironwood.** Sprout passa primeiro por Sapling porque não existe uma única transação direta de Sprout para Ironwood. Não pare em Sapling.

### Guia de campo completo para migração do pool ZEC

Para a referência completa de migração, incluindo percursos de recuperação detalhados, comandos, taxas, requisitos de hardware, considerações de privacidade, resolução de problemas e notas sobre as fontes, leia o guia completo.

**Versão 1.1 · Atualizado em 18 de setembro de 2026**

[Leia o Guia de campo completo para migração do pool ZEC em ZecHub](/research/zec-pool-migration/view)

> **Antes de começar:** determine primeiro **o que está a recuperar e que material de recuperação ainda tem**. Uma seed de wallet atual ou uma chave de gasto não-Sprout suportada pode apenas precisar de um restauro normal. Material antigo — como uma seed ZecWallet Lite, uma `wallet.dat` antiga ou uma chave de gasto Sapling ou Sprout autónoma — pode precisar de um caminho de recuperação dedicado.
>
> Se pensa que os fundos estão em **Sprout**, confirme que ainda tem autoridade de gasto antes de dedicar tempo à recuperação. Um endereço `zc...` ou apenas material de visualização não basta para mover os fundos.
>
> **YWallet já não suporta Zcash após Ironwood.** Utilize **Zkool** para restauros normais não-Sprout a partir de seeds e chaves suportadas. Utilize **Argos** para recuperação de ZecWallet Lite, ficheiros de wallet antigos e chaves de gasto Sapling/Sprout autónomas. Para Sprout, Argos é o primeiro percurso a experimentar; o guia de campo completo cobre a alternativa sidecar antiga.
>
> Utilize a tabela abaixo com base **no que realmente tem**, e não na ferramenta de recuperação que se lembra de ter usado.

| Tem | Comece aqui |
| --- | --- |
| Uma frase seed ou **chave de gasto não-Sprout** suportada de uma wallet atual ou recentemente mantida, incluindo material YWallet Zcash antigo | [Zkool](#fund-recovery-with-zkool) |
| Apenas uma **chave de visualização** | Zkool pode importar chaves de visualização suportadas para acesso só de leitura, mas uma chave de visualização não pode autorizar gastos de recuperação. Encontre a seed ou chave de gasto correspondente. |
| Uma seed **ZecWallet Lite** de 24 palavras | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Uma ZecWallet Lite ou zcashd `wallet.dat`, ou uma chave de gasto estendida Sapling autónoma / Sprout | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Em 18 de setembro de 2026, a v1.3.0 é a versão atual e preferida; utilize a v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout. |
| Material Sprout que Argos não consegue processar, ou uma recuperação em que pretende ter os componentes antigos sob o seu próprio controlo | Utilize o percurso sidecar antigo no [guia completo](/research/zec-pool-migration/view). |
| Nenhuma seed ou chave de gasto funcional, mas um dispositivo bloqueado, palavra-passe esquecida ou disco avariado | [Recuperação profissional](#professional-recovery-when-you-do-not-have-the-seed). Nunca envie uma seed ou chave de gasto funcional a alguém que o contacte sem solicitação. |

## Recuperação de fundos com Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) é o sucessor Zcash mantido de YWallet, do mesmo programador. Suporta percursos de recuperação transparentes e blindados modernos, incluindo chaves Sapling antigas, mas **não Sprout**.

São abordadas duas situações:

1. **Restaurar uma conta** a partir de uma frase seed, chave privada ou chave de visualização
2. **Varrer fundos** de uma wallet que apenas suportava endereços transparentes

### 1) Restaurar uma conta

1. Instale Zkool a partir da [página de lançamentos](https://github.com/hhanh00/zkool2/releases) e abra-a
2. No **Gestor de contas** (a página principal), toque no botão **+** para aceder ao ecrã **Nova conta**
3. Introduza um **Nome da conta** para identificar esta conta
4. Ative **Restaurar conta?**. Isto revela os campos de chave e altura de nascimento
5. Cole a sua chave em **Chave (frase seed, chave privada ou Viewing Key)**. Zkool aceita frases seed, chaves secretas Sapling, chaves estendidas transparentes e chaves de visualização suportadas. Uma chave de visualização é só de leitura e não pode autorizar um gasto.
6. Introduza uma **Altura de nascimento** para uma conta antiga. Zkool não analisa blocos anteriores a esta altura, pelo que deve escolher uma altura anterior à primeira atividade da wallet se não tiver a certeza. Uma altura de nascimento definida demasiado tarde pode fazer parecer que transações reais estão em falta.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Guarde a conta e sincronize-a

### Restaurar uma seed de uma wallet diferente

Se a seed veio de uma wallet que segue ZIP 316 — incluindo ZODL (anteriormente Zashi), Zingo ou zcashd — ative **Opções avançadas** e habilite **Usar alteração interna** antes de guardar.

ZIP 316 utiliza um endereço interno/de alteração separado. Restaurar uma destas contas sem **Usar alteração interna** pode fazer parecer que as saídas de alteração estão em falta, embora os fundos ainda existam.

Há mais dois campos em **Opções avançadas**:

- **Frase-passe extra (opcional)**, apenas se a wallet original utilizava uma
- **Índice da conta**, se a wallet original mantinha várias contas numa seed. Os fundos podem estar num índice diferente

> **Estes dois só aparecem quando existe uma frase seed válida no campo Chave.** Com o campo vazio, ou contendo uma chave privada ou de visualização, Zkool mostra apenas **Usar alteração interna** e **H/W Ledger**. Cole primeiro a seed e depois abra as Opções avançadas.

### 2) Varrer fundos de uma wallet apenas transparente

Se a wallet ou conta antiga detinha apenas **ZEC transparentes**, restaure primeiro a conta, encontre cada endereço transparente utilizado e depois mova os fundos para um destino blindado atual que controla. Não assuma que uma marca de wallet antiga foi sempre apenas transparente; alguns produtos adicionaram suporte blindado em versões posteriores.

1. Restaure a conta utilizando os passos acima
2. Abra a conta e vá à página **Receber fundos**
3. Toque na lupa na barra superior (**Encontrar outros endereços transparentes**). Wallets que alternam endereços, como Ledger e Exodus, geram muitos endereços transparentes a partir de uma seed, e isto encontra os que detêm fundos
4. **Reponha e sincronize a conta depois.** Os endereços recém-encontrados apenas obtêm os seus saldos na análise seguinte, por isso ignorar isto faz parecer que a varredura não encontrou nada
5. Vá à página **Enviar**. Junto ao saldo encontrará três botões com ícones. Não têm rótulos de texto, por isso passe o cursor ou faça pressão longa para ver os respetivos nomes:
   - **Blindar um** (escudo contornado) move um endereço transparente de cada vez
   - **Blindar todos** (escudo preenchido) move tudo de todos os endereços transparentes de uma vez
   - **Desblindar todos** (cadeado aberto) faz o inverso, para um endereço transparente

> **Blindar um é a escolha mais privada.** Blindar vários endereços numa única transação associa-os publicamente como pertencentes à mesma pessoa. O próprio Zkool avisa sobre isto antes de executar Blindar todos.

6. Reveja a transação e envie-a

Desblindar todos é útil para levantar fundos para uma exchange que apenas aceita endereços transparentes. Os botões de blindagem apenas aparecem se a conta tiver um endereço blindado, e Desblindar todos apenas se tiver um transparente.

## Recuperação de ZecWallet Lite e wallets antigas com Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) já não é mantida e o seu repositório está arquivado. A derivação da sua seed difere da estrutura utilizada pelas wallets atuais, pelo que importar a mesma frase para uma wallet moderna pode não detetar fundos detidos nos endereços derivados adicionais da ZecWallet Lite. [Argos](https://argos.sovright.com), de Sovright, é um espaço de trabalho de recuperação para desktop concebido para este e outros casos de recuperação antigos.

Argos lê seeds e ficheiros de wallet ZecWallet Lite, zcashd `wallet.dat`, chaves de gasto estendidas Sapling autónomas e material de gasto Sprout. Para Sprout, uma seed ZecWallet Lite por si só não é suficiente, porque essas chaves foram geradas separadamente. Argos é uma ferramenta de recuperação, não uma wallet para uso quotidiano: inspecione o material de origem localmente, analise e depois varra os fundos para uma wallet mantida que controla.

Least Authority [auditou](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) a ferramenta. A recuperação em si é gratuita. Durante a varredura, pode surgir uma doação opcional para Sovright.

> **Nunca introduza uma seed num website.** O site Argos é apenas para descarregar e consultar o [guia do utilizador](https://argos.sovright.com/guide.html). As chaves permanecem na aplicação desktop assinada. A validação é local em relação à soma de verificação BIP-39. O campo da seed é limpo assim que a análise começa. Qualquer pessoa que lhe envie uma mensagem a pedir essa seed "para ajudar a recuperar os seus fundos" está a tentar enganá-lo.

### Antes de abrir Argos

1. Descarregue a aplicação desktop a partir do [site oficial de Argos](https://argos.sovright.com) ou da [página de lançamentos do GitHub](https://github.com/sovright/argos/releases). Verifique somas de verificação ou assinaturas quando forem publicadas.
2. Utilize a versão atual de Argos. Em 18 de setembro de 2026, a **v1.3.0** é a versão atual e preferida. Utilize a **v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout**. Compilações anteriores à 1.1.0 ainda podem analisar, mas constroem varreduras pré-Ironwood que a rede rejeita; atualize e tente novamente.
3. Trabalhe numa máquina em que confie. Prefira encriptação completa do disco. Não partilhe o ecrã enquanto uma seed, frase-passe ou chave de gasto estiver visível.
4. Tenha pronto um destino Unified Address de uma wallet mantida que controla, como [ZODL](https://zodl.app/). Confirme o endereço nessa wallet antes de o colar em Argos.

### Recuperação de seed

1. Abra Argos e escolha **Tenho a minha frase seed de 24 palavras**. Uma recuperação de seed não precisa de um ficheiro de wallet.
2. Cole a frase e clique em **Validar seed**. Se indicar que a seed é válida, continue.
3. Introduza uma **altura do bloco de aniversário**, ou a estimativa mais próxima de quando a wallet foi criada. Uma altura anterior é mais lenta, mas mais segura do que estimar tarde demais.
4. Nos controlos do servidor, utilize a predefinição do servidor atual ou introduza URLs lightwalletd. URLs separados por vírgulas são experimentados pela ordem indicada. Exemplos públicos:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Cole o destino Unified Address.
6. Clique em **iniciar análise**. Isto pode demorar minutos ou dias, dependendo da altura de aniversário. Pode sair e reabrir o mesmo espaço de trabalho; a análise é retomada.
7. Quando a análise terminar, reveja os saldos, a estimativa da taxa e o destino, e depois clique em **varrer**.

A transmissão de uma varredura é irreversível. Guarde o ficheiro de wallet original até todos os pools relevantes terem sido varridos e a wallet de destino mostrar os fundos esperados. Quando a recuperação estiver concluída, retire os segredos antigos de uso, em vez de continuar a utilizá-los para novas atividades.

### Ficheiros de wallet e chaves autónomas

No ecrã de boas-vindas, **Tenho um ficheiro de wallet** abrange um ficheiro ZecWallet Lite, uma zcashd `wallet.dat` ou chaves de gasto estendidas Sapling autónomas. A recuperação de chaves de gasto Sprout autónomas é tratada pelo caminho/CLI de recuperação Sprout de Argos.

Argos lê ficheiros de wallet sem os modificar. Se a wallet estiver encriptada, introduza a frase-passe quando solicitado; é utilizada na memória e não é escrita no disco. Reveja as contagens de chaves transparentes, Sapling e Sprout antes de iniciar uma análise.

As chaves de visualização não são aceites para uma varredura porque não podem autorizar gastos.

### Notas sobre Sprout

Uma seed ZecWallet Lite não deriva chaves Sprout. Essas chaves foram geradas separadamente. Recupere Sprout a partir de uma zcashd `wallet.dat` ou de uma chave de gasto autónoma na CLI.

Se o ficheiro já tiver dados de notas gastáveis e uma testemunha em cache, Argos pode oferecer **Varrer fundos Sprout** sem uma análise da cadeia. Caso contrário, pode executar uma análise completa de blocos retomável através da rede P2P. Essa análise é grande e lenta. O ponto de controlo que grava permite gastar, por isso proteja-o como protegeria a wallet original.

O valor Sprout só pode chegar a Sapling. Depois de os fundos Sapling estarem confirmados e poderem ser gastos, mova-os para **Ironwood** com uma wallet atual que suporte a conta Sapling recuperada. Não pare em Sapling.

## Fundos recuperados e o pool Ironwood

Desde que a atualização Ironwood (NU6.3) foi ativada em 28 de julho de 2026, o pool Orchard é apenas de gasto. Nenhum valor novo pode entrar nele, e o valor existente sai através da catraca para Ironwood.

Se os seus fundos recuperados estiverem em Orchard, mova-os para Ironwood utilizando o **fluxo de migração integrado de uma wallet atual**. Orchard é apenas de saída após NU6.3.

Zkool 6.30.0 é atual em 18 de setembro de 2026 e suporta Ironwood. O seu design de migração é focado na privacidade, mas não equivale a alegar conformidade com ZIP 318. Outras wallets atuais podem usar migração faseada no estilo ZIP 318. Siga o ecrã de migração atual e as notas de lançamento da wallet instalada, em vez de inventar manualmente um montante ou calendário.

Uma migração faseada pode utilizar várias transações, pelo que a taxa total pode ser superior à de uma transferência única.

> **Os montantes de migração são públicos.** Quando o valor atravessa a catraca, o montante e a altura do bloco ficam visíveis na cadeia, embora o remetente e o destinatário permaneçam blindados. Utilize a política de migração privada/faseada integrada da wallet quando a privacidade for importante e utilize privacidade ao nível da rede, como Tor ou outra camada de privacidade fidedigna, quando apropriado. A privacidade de rede pode ocultar a ligação ao seu IP; não oculta o montante público da passagem.

## Recuperação profunda com ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) é um projeto de recuperação Zingo Labs **em desenvolvimento** atualmente focado em ficheiros de wallet ZecWallet Lite e migração de formatos de wallet. O seu README atualmente direciona os utilizadores que procuram recuperação de fundos para a opção de exportação **Zingolib**, enquanto um suporte ZeWIF mais completo continua em desenvolvimento.

Trate-o como uma ferramenta avançada/de casos limite, em vez do caminho de recuperação predefinido. Para seeds ZecWallet Lite normais, ficheiros de wallet, zcashd `wallet.dat` e chaves de gasto autónomas suportadas, experimente primeiro Argos. Verifique tudo o que recuperar com ZExCavator numa wallet mantida antes de confiar nisso.

## Recuperação profissional quando não tem a seed

Se a seed ou chave desapareceu, não é possível iniciar um restauro autoalojado. Algumas pessoas nessa situação utilizam uma empresa de recuperação profissional para palavras-passe esquecidas, falhas de hardware ou discos ilegíveis.

Esse caminho não é o mesmo que restaurar uma seed que ainda tem. Não entregue uma seed funcional a alguém que se ofereça para a "recuperar" por si. A versão fraudulenta deste serviço é comum.

[Unciphered](https://unciphered.com) é uma empresa que realiza este trabalho internamente e foi mencionada em publicações como a [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). É um serviço geral de recuperação de criptomoedas, não uma ferramenta específica de Zcash, e cobra pelo trabalho. ZecHub não recomenda nenhuma empresa de recuperação. Se seguir este caminho, confirme pessoalmente o domínio oficial e assuma que qualquer pessoa que lhe envie primeiro uma mensagem privada é um burlão.

Se ainda tiver uma seed ou chave de gasto funcional, comece antes por um caminho de recuperação autoalojado, como Zkool ou Argos, na sua própria máquina.

## YWallet já não é mantido

YWallet foi durante muito tempo a ferramenta de recuperação recomendada nesta página, e muitos guias mais antigos ainda apontam para ela.

O seu programador afirma agora que YWallet já não suporta Zcash desde a atualização Ironwood e direciona os utilizadores de Zcash para **Zkool**, o sucessor mantido. Preserve material de seed/chave YWallet antigo, mas não inicie uma nova migração Zcash em YWallet.

Se já tiver material de recuperação Zcash de YWallet, restaure-o em Zkool utilizando o caminho de seed/chave suportado acima.

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) - quais as wallets mantidas e a respetiva preparação para Ironwood, incluindo Argos
- [Ironwood](/zcash-tech/ironwood) - o que a atualização alterou e por que motivo os fundos migram
- [Memos](/using-zcash/memos) - como funcionam os memos encriptados
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso só de leitura sem poder de gasto
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - endpoints públicos lightwalletd que Argos pode utilizar
- [Guia do utilizador de Argos](https://argos.sovright.com/guide.html) - guia oficial de Sovright
- [Naomi Brockwell sobre ferramentas de recuperação](https://x.com/naomibrockwell/status/2079146521405333526) - guia Argos e uma nota sobre recuperação profissional
