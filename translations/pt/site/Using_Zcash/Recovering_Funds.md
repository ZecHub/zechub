<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Recuperação de fundos de carteiras Zcash

**Por que guardar seu material de recuperação?**

Sementes, chaves de gastos, chaves de visualização e arquivos de carteira não são intercambiáveis. Uma frase semente pode derivar chaves para muitas carteiras, mas não substitui toda chave legada ou todo arquivo de carteira. Uma chave de visualização pode revelar atividade blindada, mas não pode autorizar um gasto.

A recuperação depende de ter a autoridade de gasto correta e um caminho atualmente compatível para o pool que contém os fundos. Mantenha o material de recuperação privado e nunca compartilhe sementes, chaves de gastos ou arquivos de carteira com ninguém em quem você não confie.

# Segurança e responsabilidade

É fundamental que os usuários entendam os riscos envolvidos ao lidar com chaves privadas e mantenham essas chaves protegidas contra acesso não autorizado. A segurança dos fundos depende da responsabilidade do usuário em proteger suas chaves privadas.

## Fundos blindados legados: Sprout, Sapling e Orchard

Os ZEC blindados mais antigos podem precisar ser migrados como parte da recuperação. A rota depende de qual pool blindado contém os fundos atualmente.

> **O NU7 foi ativado na Mainnet em 6 de novembro de 2026 (UTC), no bloco 3.543.405.** Ele proíbe transações da versão 4 ([ZIP 2003](https://zips.z.cash/zip-2003)), e os fundos Sprout só podem ser gastos em transações da versão 4, então o caminho de migração para fora do pool Sprout legado não funciona mais.
>
> **O Sprout agora está congelado no gelo.** As ferramentas existentes não conseguem mais mover fundos Sprout para o Sapling, para endereços transparentes ou para qualquer outro destino. O ZIP 2003 não queima os fundos Sprout e deixa aberta a possibilidade de um método de recuperação futuro, mas nenhum está planejado no momento. Se você tem chaves Sprout, mantenha-as em segurança.

## A resposta em uma página

| Seus fundos estão em | Rota de migração | O que fazer |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Se você tiver `wallet.dat` ou uma chave de gastos Sprout avulsa, tente primeiro o caminho de recuperação atual do Argos. Se o Argos não for adequado, use a rota legada com sidecar no guia de campo completo. Os fundos Sprout precisam chegar primeiro ao Sapling e depois seguir para o Ironwood. Desde a ativação do NU7 (bloco 3.543.405), os fundos Sprout não podem ser movidos na Mainnet; veja a nota acima. |
| **Sapling** | **Sapling → Ironwood** | Nenhum ambiente de recuperação Sprout é necessário. Use uma carteira atual que consiga tanto recuperar ou gastar sua conta Sapling específica quanto construir transações Ironwood. O suporte a Ironwood por si só não comprova suporte à recuperação de Sapling legado. |
| **Orchard** | **Orchard → Ironwood** | Orchard é somente de saída. Use o fluxo integrado de migração de Orchard para Ironwood de uma carteira atual compatível. Veja [Fundos recuperados e o pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Fluxo de decisão em cinco perguntas

1. **É Sprout?** Uma frase semente sozinha indica um caminho de recuperação de uma era posterior, de Sapling/Orchard, e não Sprout. Um endereço `zc...`, ou uma carteira restaurada que mostra saldo Sprout, indica Sprout.
2. **Que material de recuperação você tem?** Procure `wallet.dat`, o computador antigo ou o datadir, um backup do `z_exportwallet` ou uma chave de gastos Sprout exportada. Um endereço `zc...` sozinho não basta.
3. **Argos ou o sidecar legado?** Se você tiver `wallet.dat` ou uma chave de gastos Sprout avulsa e quiser simplesmente retirar os fundos, tente primeiro [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Use a rota legada com sidecar no guia de campo completo se o Argos não conseguir lidar com o material ou se você quiser toda a pilha de recuperação sob seu próprio controle.
4. **Você já tem um datadir do zcashd sincronizado e não podado?** Isso só importa para a rota legada com sidecar. Copie os dados de nó existentes somente após um desligamento limpo; caso contrário, o guia de campo cobre as opções de snapshot/do zero.
5. **Onde os fundos vão parar?** **Ironwood.** Sprout passa primeiro pelo Sapling porque não existe uma única transação direta de Sprout para Ironwood. Não pare no Sapling.

### Guia de campo completo de migração do pool ZEC

Para a referência completa de migração, incluindo rotas de recuperação detalhadas, comandos, taxas, requisitos de hardware, considerações de privacidade, solução de problemas e notas sobre as fontes, leia o guia completo.

**Versão 1.1 · Atualizada em 18 de setembro de 2026**

[Leia o guia de campo completo de migração do pool ZEC no ZecHub](/research/zec-pool-migration/view)

> **Antes de começar:** primeiro determine **o que você está recuperando e qual material de recuperação ainda tem**. A semente de uma carteira atual ou uma chave de gastos não Sprout compatível pode precisar apenas de uma restauração normal. Materiais mais antigos — como uma semente Zecwallet Lite, um `wallet.dat` legado ou uma chave de gastos Sapling ou Sprout avulsa — podem precisar de um caminho de recuperação dedicado.
>
> Se você acha que os fundos estão no **Sprout**, confirme que ainda tem autoridade de gasto antes de dedicar tempo à recuperação. Um endereço `zc...` ou material de visualização sozinho não basta para mover os fundos.
>
> **O YWallet não oferece mais suporte ao Zcash depois do Ironwood.** Use o **Zkool** para restaurações comuns fora do Sprout a partir de sementes e chaves compatíveis. Use o **Argos** para recuperação de Zecwallet Lite, arquivos de carteira legados e chaves de gastos Sapling/Sprout avulsas. Para o Sprout, o Argos é a primeira rota a tentar; o guia de campo completo cobre a alternativa legada com sidecar.
>
> Use a tabela abaixo com base **no que você realmente tem**, e não na ferramenta de recuperação que você lembra de ter usado.

| Você tem | Comece aqui |
| --- | --- |
| Uma frase semente ou uma **chave de gastos não Sprout** compatível de uma carteira atual ou mantida recentemente, incluindo material antigo YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Apenas uma chave de visualização** | O Zkool pode importar chaves de visualização compatíveis para acesso somente leitura, mas uma chave de visualização não pode autorizar gastos de recuperação. Encontre a semente ou a chave de gastos correspondente. |
| Uma semente **Zecwallet Lite** de 24 palavras | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Um Zecwallet Lite ou zcashd `wallet.dat`, ou uma chave de gastos Sapling / Sprout avulsa | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Em 18 de setembro de 2026, a v1.3.0 é a versão atual e preferida; use a v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout. |
| Material Sprout que o Argos não consegue processar, ou uma recuperação em que você quer os componentes legados sob seu próprio controle | Use a rota legada com sidecar no [guia de campo completo](/research/zec-pool-migration/view). |
| Nenhuma semente ou chave de gastos funcional, mas um dispositivo bloqueado, uma senha esquecida ou um disco com falha | [Recuperação profissional](#professional-recovery-when-you-do-not-have-the-seed). Nunca envie uma semente ou chave de gastos funcional para alguém que entre em contato com você sem ter sido solicitado. |

## Recuperação de fundos com o Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) é o sucessor Zcash mantido do YWallet, do mesmo desenvolvedor. Ele suporta caminhos de recuperação transparentes e blindados modernos, incluindo chaves Sapling legadas, mas **não o Sprout**.

Duas situações são abordadas aqui:

1. **Restaurar uma conta** a partir de uma frase semente, chave privada ou chave de visualização
2. **Varrer fundos** de uma carteira que sempre suportou apenas endereços transparentes

### 1) Restaurando uma conta

1. Instale o Zkool a partir da [página de lançamentos](https://github.com/hhanh00/zkool2/releases) e abra-o
2. Na **Account Manager** (a página principal), toque no botão **+** para chegar à tela **New Account**
3. Digite um **Account Name** para identificar esta conta
4. Ative **Restore Account?**. Isso exibe os campos de chave e de altura de nascimento
5. Cole sua chave em **Key (Seed Phrase, Private Key, or Viewing Key)**. O Zkool aceita frases semente, chaves secretas Sapling, chaves estendidas transparentes e chaves de visualização compatíveis. Uma chave de visualização é somente leitura e não pode autorizar um gasto.
6. Informe uma **Birth Height** para uma conta antiga. O Zkool não verifica blocos anteriores a essa altura, então escolha uma altura anterior à primeira atividade da carteira se não tiver certeza. Uma altura de nascimento definida tarde demais pode fazer com que transações reais pareçam estar faltando.

![Tela Nova conta do Zkool com Restaurar conta e Opções avançadas ativadas](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Salve a conta e depois sincronize-a

### Restaurando uma semente de outra carteira

Se a semente veio de uma carteira que segue o ZIP 316 — incluindo ZODL (antes Zashi), Zingo ou zcashd — ative **Advanced Options** e habilite **Use Internal Change** antes de salvar.

O ZIP 316 usa um endereço interno/de troco separado. Restaurar uma dessas contas sem **Use Internal Change** pode fazer com que saídas de troco pareçam estar faltando, mesmo que os fundos ainda existam.

Mais dois campos ficam em **Advanced Options**:

- **Extra Passphrase (optional)**, somente se a carteira original usava uma
- **Account Index**, se a carteira original tinha várias contas em uma única semente. Os fundos podem estar em um índice diferente

> **Esses dois só aparecem quando há uma frase semente válida no campo Key.** Com o campo vazio, ou contendo uma chave privada ou de visualização, o Zkool mostra apenas **Use Internal Change** e **H/W Ledger**. Cole a semente primeiro e depois abra Advanced Options.

### 2) Varrendo fundos de uma carteira somente transparente

Se a carteira ou conta antiga tinha **apenas ZEC transparente**, restaure a conta primeiro, encontre todos os endereços transparentes usados e depois mova os fundos para um destino blindado atual que você controla. Não presuma que uma marca de carteira antiga sempre foi somente transparente; alguns produtos adicionaram suporte blindado em versões posteriores.

1. Restaure a conta seguindo os passos acima
2. Abra a conta e vá para a página **Receive Funds**
3. Toque na lupa da barra superior (**Find other transparent addresses**). Carteiras que alternam endereços, como Ledger e Exodus, geram muitos endereços transparentes a partir de uma única semente, e isso encontra os que têm fundos
4. **Depois, redefina e sincronize a conta.** Os endereços recém-encontrados só mostram seus saldos na próxima verificação, então pular este passo faz parecer que a varredura não encontrou nada
5. Vá para a página **Send**. Ao lado do saldo, você encontrará três botões de ícone. Eles não têm rótulos de texto, então passe o mouse sobre eles ou mantenha-os pressionados para ver seus nomes:
   - **Shield One** (escudo contornado) move um endereço transparente por vez
   - **Shield All** (escudo preenchido) move tudo de todos os endereços transparentes de uma só vez
   - **Unshield All** (cadeado aberto) faz o caminho inverso, para um endereço transparente

> **Shield One é a opção mais privada.** Blindar vários endereços em uma única transação os vincula publicamente como pertencentes à mesma pessoa. O próprio Zkool avisa sobre isso antes de executar Shield All.

6. Revise a transação e envie-a

Unshield All é útil ao sacar para uma corretora que só aceita endereços transparentes. Os botões de blindagem só aparecem se a conta tiver um endereço blindado, e Unshield All só aparece se ela tiver um transparente.

## Recuperação de Zecwallet Lite e de carteiras legadas com o Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) não é mais mantido e seu repositório está arquivado. Sua derivação de semente difere do esquema usado pelas carteiras atuais, então importar a mesma frase em uma carteira moderna pode deixar de encontrar fundos mantidos nos endereços derivados adicionais do Zecwallet Lite. [Argos](https://argos.sovright.com), desenvolvido por Sovright, é um ambiente de recuperação para desktop criado para este e outros casos de recuperação legada.

O Argos lê sementes e arquivos de carteira Zecwallet Lite, zcashd `wallet.dat`, chaves de gastos estendidas Sapling avulsas e material de gasto Sprout. Para o Sprout, uma semente Zecwallet Lite sozinha não basta, porque essas chaves foram geradas separadamente. O Argos é uma ferramenta de recuperação, não uma carteira para o dia a dia: inspecione o material de origem localmente, faça a verificação e depois varra os fundos para uma carteira mantida que você controla.

Least Authority [auditou](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) a ferramenta. A recuperação em si é gratuita. Uma doação opcional para Sovright pode aparecer durante a varredura.

> **Nunca digite uma semente em um site.** O site do Argos serve apenas para o download e o [guia do usuário](https://argos.sovright.com/guide.html). As chaves ficam no app de desktop assinado. A validação é feita localmente contra o checksum BIP-39. O campo da semente é limpo assim que a verificação começa. Qualquer pessoa que mande mensagem pedindo essa semente "para ajudar a recuperar seus fundos" está aplicando um golpe em você.

### Antes de abrir o Argos

1. Baixe o app de desktop no [site oficial do Argos](https://argos.sovright.com) ou na [página de lançamentos no GitHub](https://github.com/sovright/argos/releases). Verifique checksums ou assinaturas quando forem publicados.
2. Use a versão atual do Argos. Em 18 de setembro de 2026, a **v1.3.0** é a versão atual e preferida. Use a **v1.2.0 ou posterior para recuperação de `wallet.dat` e Sprout**. Builds anteriores à 1.1.0 ainda conseguem fazer a verificação, mas constroem varreduras pré-Ironwood que a rede rejeita; atualize e tente novamente.
3. Trabalhe em uma máquina de sua confiança. Prefira criptografia de disco completo. Não compartilhe a tela enquanto uma semente, senha ou chave de gastos estiver visível.
4. Tenha pronto um Unified Address de destino de uma carteira mantida que você controla, como [ZODL](https://zodl.com/). Confirme o endereço nessa carteira antes de colá-lo no Argos.

### Recuperação pela semente

1. Abra o Argos e escolha **I have my 24-word seed phrase**. Uma recuperação pela semente não precisa de arquivo de carteira.
2. Cole a frase e clique em **Validate seed**. Se ele indicar que a semente é válida, continue.
3. Informe a **altura de bloco de nascimento**, ou a estimativa mais próxima de quando a carteira foi criada. Uma altura anterior é mais lenta, porém mais segura do que chutar uma altura tarde demais.
4. Nos controles de servidor, use a predefinição de servidor atual ou insira URLs do lightwalletd. URLs separadas por vírgula são testadas em ordem. Exemplos públicos:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Cole o Unified Address de destino.
6. Clique em **start scan**. Isso pode levar de minutos a dias, dependendo da altura de nascimento. Você pode fechar e reabrir o mesmo ambiente; a verificação é retomada.
7. Quando a verificação terminar, revise os saldos, a estimativa de taxa e o destino, e então clique em **sweep**.

Transmitir uma varredura é irreversível. Guarde o arquivo de carteira original até que todos os pools relevantes tenham sido varridos e a carteira de destino mostre os fundos esperados. Concluída a recuperação, aposente os segredos legados em vez de continuar usando-os para novas atividades.

### Arquivos de carteira e chaves avulsas

Na tela de boas-vindas, **I have a wallet file** abrange um arquivo Zecwallet Lite, um zcashd `wallet.dat` ou chaves de gastos estendidas Sapling avulsas. A recuperação de chaves de gastos Sprout avulsas é feita pelo caminho de recuperação/CLI Sprout do Argos.

O Argos lê arquivos de carteira sem modificá-los. Se a carteira estiver criptografada, digite a senha quando solicitado; ela é usada na memória e não é gravada em disco. Revise as contagens de chaves transparentes, Sapling e Sprout antes de iniciar uma verificação.

Chaves de visualização não são aceitas para uma varredura, porque não podem autorizar gastos.

### Notes Sprout

Uma semente Zecwallet Lite não deriva chaves Sprout. Essas chaves foram geradas separadamente. Recupere o Sprout a partir de um zcashd `wallet.dat` ou de uma chave de gastos avulsa na CLI.

Se o arquivo já tiver dados de note gastáveis e uma testemunha em cache, o Argos pode oferecer **Sweep Sprout funds** sem verificar a chain. Caso contrário, ele pode executar uma verificação retomável de blocos completos pela rede P2P. Essa verificação é grande e lenta. O checkpoint que ela grava permite gastos, então proteja-o como a carteira original.

O valor em Sprout só pode chegar ao Sapling. Depois que os fundos no Sapling estiverem confirmados e gastáveis, mova-os para o **Ironwood** com uma carteira atual que suporte a conta Sapling recuperada. Não pare no Sapling.

## Fundos recuperados e o pool Ironwood

Desde que a atualização Ironwood (NU6.3) foi ativada em 28 de julho de 2026, o pool Orchard é somente para gastos. Nenhum valor novo pode entrar nele, e o valor existente sai pela catraca para o Ironwood.

Se seus fundos recuperados estiverem no Orchard, mova-os para o Ironwood usando o **fluxo de migração integrado de uma carteira atual**. O Orchard é somente de saída após o NU6.3.

O Zkool 6.37.0 é a versão atual em 12 de novembro de 2026 e oferece suporte ao Ironwood. Use a versão 6.35.0 ou posterior: versões anteriores não conhecem a altura de ativação do Mainnet do NU7 (bloco 3.543.405), então criam transações segundo as regras anteriores ao NU7 ([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388)). Seu design de migração é focado em privacidade, mas isso não é o mesmo que alegar conformidade com o ZIP 318. Outras carteiras atuais podem usar migração em etapas no estilo do ZIP 318. Siga a tela de migração atual e as notas de versão da carteira instalada, em vez de inventar um valor ou cronograma manual.

Uma migração em etapas pode usar várias transações, então a taxa total pode ser maior que a de uma transferência única.

> **Os valores de migração são públicos.** Quando o valor atravessa a catraca, o montante e a altura do bloco ficam visíveis na chain, embora o remetente e o destinatário continuem blindados. Use a política de migração privada/em etapas integrada da carteira quando a privacidade importar, e use privacidade em nível de rede, como o Tor ou outra camada de privacidade confiável, quando apropriado. A privacidade de rede pode ocultar o vínculo com seu IP; ela não oculta o montante público da travessia.

## Recuperação profunda com o ZExCavator

O [ZExCavator](https://github.com/zingolabs/zexcavator) é um projeto de recuperação Zingo Labs **em desenvolvimento**, atualmente focado em arquivos de carteira Zecwallet Lite e na migração de formatos de carteira. Seu README atualmente orienta os usuários que querem recuperar fundos a usar a opção de exportação **Zingolib** enquanto o suporte mais completo ao ZeWIF ainda está sendo desenvolvido.

Trate-o como uma ferramenta avançada/para casos extremos, e não como o caminho de recuperação padrão. Para sementes Zecwallet Lite comuns, arquivos de carteira, zcashd `wallet.dat` e chaves de gastos avulsas compatíveis, tente primeiro o Argos. Verifique qualquer coisa recuperada pelo ZExCavator em uma carteira mantida antes de confiar nela.

## Recuperação profissional quando você não tem a semente

Se a semente ou a chave se perdeu, uma restauração por conta própria não pode começar. Algumas pessoas nessa situação recorrem a uma empresa de recuperação profissional em casos de senhas esquecidas, falhas de hardware ou discos ilegíveis.

Esse caminho não é o mesmo que restaurar uma semente que você ainda tem. Não entregue uma semente funcional a ninguém que se ofereça para "recuperá-la" para você. A versão golpista desse serviço é comum.

[Unciphered](https://unciphered.com) é uma empresa que faz esse trabalho internamente e já foi destaque em veículos como a Wired. Trata-se de um serviço geral de recuperação de cripto, não de uma ferramenta específica para Zcash, e ela cobra pelo trabalho. O ZecHub não endossa nenhuma empresa de recuperação. Se você seguir esse caminho, confirme você mesmo o domínio oficial e presuma que qualquer pessoa que mande DM para você primeiro é golpista.

Se você ainda tem uma semente ou chave de gastos funcional, comece por um caminho de recuperação por conta própria, como o Zkool ou o Argos, na sua própria máquina.

## O YWallet não é mais mantido

O YWallet foi por muito tempo a ferramenta de recuperação recomendada nesta página, e muitos guias antigos ainda apontam para ele.

Seu desenvolvedor agora afirma que o YWallet não oferece mais suporte ao Zcash desde a atualização Ironwood e direciona os usuários do Zcash para o **Zkool**, o sucessor mantido. Preserve o material antigo de semente/chave YWallet, mas não inicie uma nova migração Zcash no YWallet.

Se você já tem material de recuperação Zcash do YWallet, restaure-o no Zkool usando o caminho de semente/chave compatível descrito acima.

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) - quais carteiras são mantidas e sua preparação para o Ironwood, incluindo o Argos
- [Ironwood](/zcash-tech/ironwood) - o que a atualização mudou e por que os fundos migram
- [Memorandos](/using-zcash/memos) - como funcionam os memorandos criptografados
- [Chaves de visualização](/zcash-tech/viewing-keys) - acesso somente leitura sem poder de gasto
- [Nós lightwallet](/zcash-tech/lightwallet-nodes) - endpoints lightwalletd públicos que o Argos pode usar
- [Guia do usuário do Argos](https://argos.sovright.com/guide.html) - passo a passo oficial de Sovright
- [Naomi Brockwell sobre ferramentas de recuperação](https://x.com/naomibrockwell/status/2079146521405333526) - passo a passo do Argos e uma observação sobre recuperação profissional
