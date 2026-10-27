# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Entrar com o Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermediário - 7 min</span>

## TL;DR

- Entre provando que você controla um endereço do Zcash, em vez de usar uma senha
- Dois modelos estão em uso: **assinar um desafio** ou **enviar um pagamento blindado com um código no memorando**
- Como os endereços blindados ocultam o saldo e o histórico, provar o controle não expõe suas finanças
- Esse padrão ainda está em fase inicial. Ainda não existe um padrão ratificado, e as implementações não são interoperáveis

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é?

- Desenvolvedores que querem login sem senha sem coletar dados pessoais
- Usuários que preferem não fornecer um endereço de e-mail a todos os sites
- Qualquer pessoa que queira entrar sem vincular seu histórico financeiro a uma conta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

A maioria das opções de login revela alguma coisa:

- **Senhas e e-mail** criam uma conta vinculada à sua identidade, e ambos acabam em bancos de dados de violações de segurança
- **Login social** informa ao provedor de identidade todos os lugares onde você entra e quando
- **Login com carteira em chains transparentes** é pior do que parece. Conectar uma carteira pode dar ao site acesso ao seu saldo completo e ao histórico de transações, permanentemente

Normalmente, você está escolhendo entre conveniência e exposição.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Por que o Zcash?

O Zcash separa *provar o controle* de *revelar as finanças*:

- **Endereços blindados** mantêm privados os saldos e o histórico de transações, por isso provar que você possui um não diz nada sobre o que você possui
- **Memorandos criptografados** podem transportar um código de login de uso único de forma privada dentro de uma transação
- **Chaves de visualização** permitem divulgação seletiva, para que um app possa receber acesso de leitura exatamente ao que precisa e nada mais

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Como funciona

Surgiram duas abordagens. Ambas terminam com o app tendo um identificador estável para você e sem senha.

### Abordagem 1: Assinar um desafio

1. O app gera um desafio aleatório de uso único
2. Sua carteira assina esse desafio com a chave associada ao seu endereço
3. O app verifica a assinatura e faz seu login

Nada é transmitido, portanto não há taxa nem espera por um bloco. A especificação relevante é a [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que ainda é um rascunho, portanto o suporte de carteiras para assinatura de mensagens varia.

### Abordagem 2: Prová-lo com um pagamento blindado

1. O app gera um código de uso único e mostra uma solicitação de pagamento
2. Você envia uma pequena transação blindada com esse código no memorando
3. O app monitora o memorando, associa o código e faz seu login

Isso funciona com carteiras que já suportam memorandos hoje, que são a maioria. A contrapartida é que custa uma taxa de rede e você espera pela confirmação.

### Manter o endereço privado

Um app não precisa armazenar seu endereço para reconhecer você. Algumas implementações fazem o hash dele junto com um valor específico do aplicativo, para que cada site veja um identificador diferente, mas estável, para o mesmo usuário. Isso impede que os sites comparem informações para vincular suas contas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Contrapartidas

Vale a pena entender isso antes de criar algo com base nele ou depender dele.

| | Desafio assinado | Pagamento blindado |
|---|---|---|
| Custo | Gratuito | Taxa de rede por login |
| Velocidade | Instantâneo | Aguarda confirmação |
| Suporte das carteiras | Limitado, ZIP 304 é um rascunho | Amplo, só precisa de memorandos |
| Deixa registro na chain | Não | Sim, existe uma transação |

Limitações compartilhadas:

- **Sem recuperação de conta por padrão.** Perder a chave significa perder a conta, a menos que o app crie uma forma de recuperação
- **A reutilização de endereços pode vincular você.** Usar o mesmo endereço em muitos sites recria o problema de rastreamento, por isso os identificadores específicos do aplicativo são importantes
- **Sem padrão ratificado.** Cada projeto tem seu próprio esquema, portanto um login criado para um não funciona com outro
- **Não é anonimato por si só.** Oculta suas finanças do app, mas o app ainda pode traçar seu perfil com base no que você faz depois de entrar

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Reutilizar um código de desafio. Cada código deve ser de uso único e expirar rapidamente, ou um código capturado poderá ser reproduzido
- Pedir aos usuários que enviem um valor significativo para entrar. O pagamento é uma prova, portanto o valor deve ser trivial
- Armazenar o endereço bruto quando um identificador específico do aplicativo faria o mesmo trabalho
- Presumir que a assinatura de mensagens funciona em todos os lugares. Verifique as carteiras que seus usuários realmente têm
- Tratar um memorando como segredo depois do ocorrido. Ele prova que o remetente agiu, não é uma senha

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projetos que exploram isso

Estes foram criados para a categoria **Zcash Login** do [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). São experimentos, não produtos finalizados, e mostram como a mesma ideia pode ser construída de formas diferentes.

- **ZecAuth** - um protocolo de conexão de carteira para o Zcash, no espírito do que o WalletConnect faz em outros ecossistemas. O app mostra um código QR ou um link `zecauth://` com um desafio, juntamente com as capacidades que está pedindo, como entrar, solicitações de pagamento ou acesso de visualização. Sem transação, sem taxa, sem interação com a chain. Inclui uma especificação escrita do protocolo juntamente com o código
- **ZShield** - transforma um endereço blindado em um DID W3C e uma identidade OpenID Connect. O navegador gera um par de chaves, o servidor emite um nonce por meio de uma interface no estilo ZIP 304, a carteira o assina e o servidor retorna um JWT. Como o resultado é compatível com OIDC, os apps existentes podem consumi-lo sem integração personalizada
- **ZecPass** - prova a posse por meio de um memorando assinado e foi projetado para que o app nunca saiba o endereço do usuário. Deriva um hash no escopo do aplicativo para usar como identificador estável, mantém os desafios de uso único e com prazo determinado, e inclui um botão React pronto para uso com uma biblioteca de verificação em Node
- **Portal** - login enviando uma transação blindada com um código de uso único no memorando, funcionando na mainnet. O mesmo fluxo é reutilizado para desbloquear conteúdo pago e enviar ou receber dinheiro por um link
- **ZcashMe** - usa um pagamento blindado como prova de identidade e se concentra na lacuna entre desktop e celular, para que entrar em um laptop não exija uma extensão do navegador
- **ZBooks** - uma ferramenta de contabilidade e pagamentos que trata entrar com o Zcash como um primitivo de autenticação reutilizável e lê dados do tesouro por meio de uma Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memorandos](/using-zcash/memos) - como funcionam os memorandos criptografados e como um código de login viaja dentro de um deles
- [Chaves de visualização](/zcash-tech/viewing-keys) - conceder acesso somente de leitura sem entregar poder de gasto
- [Manter registros com ZEC blindado](/zcash-use-cases/keeping-records-with-shielded-zec) - a mesma ideia de divulgação seletiva, aplicada à contabilidade
- [Enviar dinheiro sem vincular a identidade](/zcash-use-cases/send-money-without-linking-identity) - por que a reutilização de endereços compromete a privacidade

<br/>
