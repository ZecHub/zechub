# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Login com o Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermediário - 7 min</span>

## Resumo

- Faça login provando que você controla um endereço Zcash, em vez de usar uma senha
- Dois modelos estão em uso: **assinar um desafio** ou **enviar um pagamento blindado com um código no memorando**
- Como os endereços blindados ocultam saldo e histórico, provar o controle não expõe suas finanças
- O padrão ainda está no início. Não existe nenhum padrão ratificado, e as implementações não são interoperáveis

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é este guia?

- Desenvolvedores que querem login sem senha e sem coletar dados pessoais
- Usuários que preferem não entregar um endereço de e-mail a cada site
- Qualquer pessoa que queira fazer login sem vincular seu histórico financeiro a uma conta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

A maioria das opções de login vaza alguma coisa:

- **Senhas e e-mail** criam uma conta vinculada à sua identidade, e ambos acabam em vazamentos de dados
- **Login social** informa ao provedor de identidade cada lugar em que você faz login e quando
- **Login com carteira em chains transparentes** é pior do que parece. Conectar uma carteira pode entregar ao site todo o seu saldo e histórico de transações, permanentemente

Normalmente, você precisa escolher entre conveniência e exposição.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Por que o Zcash?

O Zcash separa *provar o controle* de *revelar as finanças*:

- **Endereços blindados** mantêm saldos e histórico de transações privados, então provar que você possui um não diz nada sobre o que você possui
- **Memorandos criptografados** podem carregar um código de login de uso único de forma privada dentro de uma transação
- **Chaves de visualização** permitem a divulgação seletiva, então um app pode receber acesso de leitura exatamente ao que precisa e nada mais

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Como funciona

Surgiram duas abordagens. Em ambas, o app termina com um identificador estável para você e nenhuma senha.

### Abordagem 1: assinar um desafio

1. O app gera um desafio aleatório de uso único
2. Sua carteira assina esse desafio com a chave por trás do seu endereço
3. O app verifica a assinatura e faz o seu login

Nada é transmitido, então não há taxa nem espera por um bloco. A especificação relevante é a [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que ainda é um rascunho, por isso o suporte das carteiras à assinatura de mensagens varia.

### Abordagem 2: provar com um pagamento blindado

1. O app gera um código de uso único e mostra uma solicitação de pagamento
2. Você envia uma pequena transação blindada com esse código no memorando
3. O app monitora o memorando, confere o código e faz o seu login

Isso funciona com carteiras que já suportam memorandos hoje, ou seja, a maioria delas. A desvantagem é que custa uma taxa de rede e você precisa esperar a confirmação.

### Mantendo o endereço privado

Um app não precisa armazenar o seu endereço para reconhecer você. Algumas implementações geram um hash dele junto com um valor específico do aplicativo, de modo que cada site vê um identificador diferente e estável para o mesmo usuário. Isso impede que os sites cruzem informações para vincular suas contas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Prós e contras

Vale a pena entender antes de construir algo com base nisso ou de depender disso.

| | Desafio assinado | Pagamento blindado |
|---|---|---|
| Custo | Gratuito | Taxa de rede por login |
| Velocidade | Instantâneo | Espera a confirmação |
| Suporte das carteiras | Limitado, a ZIP 304 é um rascunho | Amplo, só precisa de memorandos |
| Deixa registro na chain | Não | Sim, existe uma transação |

Limitações em comum:

- **Sem recuperação de conta por padrão.** Perder a chave significa perder a conta, a menos que o app crie um caminho de recuperação
- **Reutilizar o endereço pode vincular você.** Usar o mesmo endereço em muitos sites recria o problema de rastreamento, e é por isso que identificadores específicos por app são importantes
- **Nenhum padrão ratificado.** Cada projeto tem seu próprio esquema, então um login criado para um não funciona com outro
- **Não garante anonimato por si só.** Ele oculta suas finanças do app, mas o app ainda pode traçar o perfil do que você faz depois de entrar

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Reutilizar um código de desafio. Cada código deve ser de uso único e expirar rapidamente, ou um código capturado pode ser reutilizado
- Pedir que os usuários enviem um valor significativo para fazer login. O pagamento é uma prova, então o valor deve ser irrisório
- Armazenar o endereço bruto quando um identificador específico do aplicativo faria o mesmo trabalho
- Presumir que a assinatura de mensagens funciona em todo lugar. Verifique as carteiras que seus usuários realmente têm
- Tratar um memorando como segredo depois do fato. Ele prova que o remetente agiu, não é uma senha

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projetos que exploram isso

Estes projetos foram criados para a trilha **Zcash Login** do [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). São experimentos, e não produtos acabados, e mostram como a mesma ideia pode ser construída de formas muito diferentes.

- **ZecAuth** - um protocolo de conexão de carteiras para o Zcash, no espírito do que o WalletConnect faz em outros ecossistemas. O app mostra um QR code ou um link `zecauth://` que carrega um desafio e as permissões que está solicitando, como login, solicitações de pagamento ou acesso de visualização. Sem transação, sem taxa, sem interação com a chain. Ele inclui uma especificação escrita do protocolo junto com o código
- **ZShield** - transforma um endereço blindado em um DID do W3C e em uma identidade OpenID Connect. O navegador gera um par de chaves, o servidor emite um nonce por meio de uma interface no estilo da ZIP 304, a carteira o assina e o servidor retorna um JWT. Como o resultado é compatível com OIDC, apps existentes podem usá-lo sem integração personalizada
- **ZecPass** - prova a titularidade por meio de um memorando assinado e foi construído para que o app nunca fique sabendo o endereço do usuário. Ele deriva um hash vinculado ao aplicativo para usar como identificador estável, mantém os desafios de uso único e com prazo de validade, e inclui um botão React pronto para usar com uma biblioteca de verificação em Node
- **Portal** - login por meio do envio de uma transação blindada com um código de uso único no memorando, funcionando na mainnet. O mesmo fluxo é reutilizado para desbloquear conteúdo pago e para enviar ou receber dinheiro a partir de um link
- **ZcashMe** - usa um pagamento blindado como prova de identidade e foca na lacuna entre desktop e celular, para que fazer login em um notebook não exija uma extensão de navegador
- **ZBooks** - uma ferramenta de contabilidade e pagamentos que trata o login com o Zcash como um recurso de autenticação reutilizável, e não como o produto em si, e lê os dados do tesouro por meio de uma Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memorandos](/using-zcash/memos) - como funcionam os memorandos criptografados e como um código de login viaja dentro de um deles
- [Chaves de visualização](/zcash-tech/viewing-keys) - como conceder acesso somente leitura sem entregar o poder de gastar
- [Mantendo registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - a mesma ideia de divulgação seletiva, aplicada à contabilidade
- [Envie dinheiro sem vincular sua identidade](/zcash-use-cases/send-money-without-linking-identity) - por que reutilizar endereços prejudica a privacidade

<br/>
