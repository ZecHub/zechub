<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Recuperação de Fundos da Wallet Zcash

**Porque deve guardar a sua chave privada?**

As chaves privadas são o segredo da segurança dos seus ativos digitais. Mantê-las seguras e nunca as partilhar com terceiros é essencial.

> Neste contexto, uma **Seed Phrase** pode ser vista como o equivalente a uma chave privada.

Ao manter o controlo sobre as suas chaves privadas, o processo de recuperação é sempre possível. Existem 2 tipos de chaves privadas Zcash (transparentes e blindadas), que pode importar facilmente para a sua wallet, quer utilizando a função Sweep Funds quer importando-as como uma nova conta. Ao manter o controlo sobre as suas chaves privadas, mantém o controlo total sobre os seus ativos, garantindo propriedade, segurança e tranquilidade.

# Segurança e Responsabilidade

É crucial que os utilizadores compreendam os riscos envolvidos ao lidar com chaves privadas e que mantenham essas chaves protegidas contra acessos não autorizados. A segurança dos fundos depende da responsabilidade do utilizador em proteger as suas chaves privadas.

> **Antes de começar:** os guias de recuperação costumavam apontar para Ywallet. O seu programador confirmou que não será atualizado para a atualização de rede Ironwood (NU6.3), pelo que já não consegue acompanhar a cadeia. Utilize o **Zkool**, que é do mesmo programador e é o sucessor mantido. Veja [Ywallet já não é mantido](#ywallet-is-no-longer-maintained) no final desta página.

## Recuperação de Fundos com Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) é o sucessor do Ywallet, do mesmo programador, e suporta recuperação tanto transparente como blindada.

Aqui são abrangidas duas situações:

1. **Restaurar uma conta** a partir de uma seed phrase, chave privada ou viewing key
2. **Transferir fundos** de uma wallet que apenas suportava endereços transparentes

### 1) Restaurar uma Conta

1. Instale o Zkool a partir da [página de versões](https://github.com/hhanh00/zkool2/releases) e abra-o
2. No **Account Manager** (a página principal), toque no botão **+** para aceder ao ecrã **New Account**
3. Introduza um **Account Name** para identificar esta conta
4. Ative **Restore Account?**. Isto revela os campos de chave e birth height
5. Cole a sua chave em **Key (Seed Phrase, Private Key, or Viewing Key)**. O Zkool aceita uma seed phrase, uma chave secreta Sapling, uma chave estendida transparente ou uma viewing key
6. Introduza uma **Birth Height** se souber aproximadamente quando a wallet foi usada pela primeira vez. Isto indica ao Zkool onde começar a análise, o que poupa muito tempo

![Ecrã New Account do Zkool com Restore Account e Advanced Options ambos ativados](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Sem birth height?** Deixe em branco e confirme o aviso. O Zkool fará a análise desde o início da cadeia, o que é mais lento, mas não falhará nada. Se os seus fundos forem anteriores à atualização Sapling de outubro de 2018, deixe em branco em vez de adivinhar uma altura posterior, ou a análise poderá ignorar completamente as suas transações.

7. Guarde a conta e depois sincronize-a

### Restaurar uma seed de outra wallet

Se a seed veio de outra wallet e o saldo parecer incorreto após a sincronização, a derivação do endereço de troco costuma ser a razão.

Ative o interruptor **Advanced Options**, mais abaixo no mesmo ecrã New Account, e ative **Use Internal Change** antes de guardar.

Nem todas as wallets derivam os endereços de troco da mesma forma. Restaurar uma seed ZODL no Zkool sem esta definição pode mostrar um saldo sem as suas notas de troco, o que parece fundos perdidos, mas não é. A dica do Zkool para este interruptor ainda se refere a Zashi, que é o nome antigo de ZODL.

Existem mais dois campos em **Advanced Options**:

- **Extra Passphrase (optional)**, apenas se a wallet original usava uma
- **Account Index**, se a wallet original tinha várias contas na mesma seed. Os fundos podem estar sob um índice diferente

> **Estes dois só aparecem quando existe uma seed phrase válida no campo Key.** Com o campo vazio, ou contendo uma chave privada ou viewing key, o Zkool mostra apenas **Use Internal Change** e **H/W Ledger**. Cole primeiro a seed e depois abra Advanced Options.

### 2) Transferir Fundos de uma Wallet Apenas Transparente

Se os seus fundos estiverem numa wallet que nunca suportou endereços blindados (Trust, Coinomi, Guarda e semelhantes), restaure primeiro a conta e depois mova os fundos para a pool blindada.

1. Restaure a conta utilizando os passos acima
2. Abra a conta e vá para a página **Receive Funds**
3. Toque na lupa na barra superior (**Find other transparent addresses**). Wallets que rodam endereços, como Ledger e Exodus, geram muitos endereços transparentes a partir de uma seed, e isto encontra os que têm fundos
4. **Faça Reset e sincronize a conta depois.** Os endereços recém-encontrados só recolhem os seus saldos na análise seguinte, por isso ignorar este passo faz parecer que a transferência não encontrou nada
5. Vá para a página **Send**. Perto do saldo encontrará três botões com ícones. Não têm rótulos de texto, por isso passe o cursor por cima ou pressione longamente para ver os nomes:
   - **Shield One** (escudo contornado) move um endereço transparente de cada vez
   - **Shield All** (escudo sólido) move tudo de todos os endereços transparentes de uma só vez
   - **Unshield All** (cadeado aberto) faz o contrário, para um endereço transparente

> **Shield One é a opção mais privada.** Blindar vários endereços numa única transação liga-os publicamente como pertencendo à mesma pessoa. O próprio Zkool avisa sobre isto antes de executar Shield All.

6. Reveja a transação e envie-a

Unshield All é útil ao levantar para uma exchange que só aceita endereços transparentes. Os botões de blindagem só aparecem se a conta tiver um endereço blindado, e Unshield All só aparece se tiver um transparente.

## Fundos recuperados e a pool Ironwood

Desde que a atualização Ironwood (NU6.3) foi ativada em 28 de julho de 2026, a pool Orchard é apenas de gasto. Nenhum novo valor pode entrar nela, e o valor existente sai através do turnstile para Ironwood.

Se os seus fundos recuperados estiverem em Orchard, terão de migrar antes de se comportarem normalmente. Abra o menu da conta e escolha **Note Migration**. A opção só aparece quando há realmente algo para migrar.

O ecrã tem o título **Orchard to Ironwood Migration** e funciona em duas fases. Primeiro divide notas não padronizadas em denominações padrão, depois move essas notas uma de cada vez. **Migration Speed** é um controlo deslizante de Ultra Fast a Slow que define o atraso aleatório entre passos. **Start Migration** executa o processo faseado em segundo plano, e pode fechar a página e retomar mais tarde. **One Shot** faz tudo numa única passagem.

Cada passo é a sua própria transação, por isso cada um paga uma taxa.

> **Os montantes de migração são públicos.** Quando o valor atravessa o turnstile, o montante e a altura do bloco ficam visíveis on-chain, mesmo que remetente e destinatário permaneçam blindados. Montantes distintivos podem identificá-lo, por isso prefira a migração faseada a uma velocidade mais lenta em vez de one shot, e considere encaminhar primeiro a sua ligação através de Tor ou de uma VPN para que o seu endereço IP não fique associado ao montante que moveu.

## Recuperação Profunda com ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) é uma ferramenta de recuperação da Zingo Labs para casos em que uma restauração normal não funciona, como um ficheiro de wallet danificado ou parcial.

> A sua última atualização é anterior às atualizações de rede recentes, por isso trate-o como último recurso e verifique quaisquer chaves recuperadas numa wallet mantida antes de confiar no resultado.

## Ywallet já não é mantido

Ywallet foi durante muito tempo a ferramenta de recuperação recomendada nesta página, e muitos guias antigos ainda apontam para ele.

O seu programador confirmou que não será atualizado para Ironwood. Uma wallet que não suporta as regras de consenso atuais não consegue construir transações válidas, pelo que já não pode ser usada para mover fundos recuperados. **Zkool**, do mesmo programador, é o sucessor mantido e é o que esta página utiliza agora.

Se já tiver fundos no Ywallet, restaure a mesma seed phrase no Zkool utilizando os passos acima.

## Páginas relacionadas

- [Wallets](/using-zcash/wallets) - que wallets são mantidas e a sua prontidão para Ironwood
- [Ironwood](/zcash-tech/ironwood) - o que a atualização mudou e porque é que os fundos migram
- [Memos](/using-zcash/memos) - como funcionam os memos encriptados
- [Viewing Keys](/zcash-tech/viewing-keys) - acesso apenas de leitura sem capacidade de gastar
