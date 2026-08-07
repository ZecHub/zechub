# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Iniciar sessão com Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermédio - 7 min</span>

## TL;DR

- Inicie sessão provando que controla um endereço Zcash, em vez de usar uma palavra-passe
- Estão a ser usados dois modelos: **assinar um desafio**, ou **enviar um pagamento shielded com um código no memo**
- Como os endereços shielded ocultam o saldo e o histórico, provar o controlo não expõe as suas finanças
- O padrão ainda está numa fase inicial. Ainda não existe um standard ratificado, e as implementações não interoperam

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é isto?

- Programadores que querem login sem palavra-passe sem recolher dados pessoais
- Utilizadores que preferem não dar um endereço de email a todos os sites
- Qualquer pessoa que queira iniciar sessão sem ligar o seu histórico financeiro a uma conta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O Problema

A maioria das opções de login revela alguma coisa:

- **Palavras-passe e email** criam uma conta associada à sua identidade, e ambos acabam em bases de dados de fugas de informação
- **Login social** diz ao fornecedor de identidade todos os sítios onde inicia sessão e quando
- **Login com wallet em chains transparentes** é pior do que parece. Ligar uma wallet pode dar ao site todo o seu saldo e histórico de transações, de forma permanente

Normalmente está a escolher entre conveniência e divulgação.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Porquê Zcash?

A Zcash separa *provar controlo* de *revelar finanças*:

- **Endereços shielded** mantêm os saldos e o histórico de transações privados, por isso provar que tem um não diz nada sobre o que possui
- **Memos encriptados** podem transportar privadamente um código de login de utilização única dentro de uma transação
- **Viewing Keys** permitem divulgação seletiva, para que uma app possa receber acesso de leitura exatamente ao que precisa e nada mais

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Como Funciona

Surgiram duas abordagens. Ambas terminam com a app a ter um identificador estável para si e sem palavra-passe.

### Abordagem 1: Assinar um desafio

1. A app gera um desafio aleatório de utilização única
2. A sua wallet assina esse desafio com a chave por trás do seu endereço
3. A app verifica a assinatura e inicia a sua sessão

Nada é transmitido para a rede, por isso não há taxa nem espera por um bloco. A especificação relevante é a [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que ainda é um draft, por isso o suporte para assinatura de mensagens nas wallets varia.

### Abordagem 2: Prová-lo com um pagamento shielded

1. A app gera um código de utilização única e mostra um pedido de pagamento
2. Envia uma pequena transação shielded com esse código no memo
3. A app monitoriza o memo, associa o código e inicia a sua sessão

Isto funciona com wallets que já suportam memos hoje, o que inclui a maioria delas. A contrapartida é que custa uma taxa de rede e é preciso esperar pela confirmação.

### Manter o endereço privado

Uma app não precisa de guardar o seu endereço para o reconhecer. Algumas implementações fazem hash dele em conjunto com um valor específico da aplicação, para que cada site veja um identificador diferente, mas estável, para o mesmo utilizador. Isso impede que os sites comparem notas entre si para ligar as suas contas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromissos

Vale a pena perceber isto antes de construir algo com base nesta ideia ou depender dela.

| | Desafio assinado | Pagamento shielded |
|---|---|---|
| Custo | Grátis | Taxa de rede por login |
| Velocidade | Instantânea | Espera pela confirmação |
| Suporte das wallets | Limitado, ZIP 304 é um draft | Alargado, só precisa de memos |
| Deixa um registo na chain | Não | Sim, existe uma transação |

Limitações partilhadas:

- **Sem recuperação de conta por defeito.** Perder a chave significa perder a conta, a menos que a app desenhe um caminho de recuperação
- **A reutilização de endereços pode associá-lo.** Usar o mesmo endereço em muitos sites recria o problema de rastreamento, razão pela qual os identificadores específicos da aplicação são importantes
- **Sem standard ratificado.** Cada projeto tem o seu próprio esquema, por isso um login criado para um não funciona com outro
- **Não é anonimato por si só.** Oculta as suas finanças da app, mas a app continua a poder criar um perfil do que faz depois de entrar

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros Comuns a Evitar

- Reutilizar um código de desafio. Cada código deve ser de utilização única e expirar rapidamente, ou um código capturado pode ser reutilizado
- Pedir aos utilizadores que enviem um montante relevante para iniciar sessão. O pagamento é uma prova, por isso o montante deve ser trivial
- Guardar o endereço bruto quando um identificador específico da aplicação faria o mesmo trabalho
- Assumir que a assinatura de mensagens funciona em todo o lado. Verifique as wallets que os seus utilizadores realmente têm
- Tratar um memo como secreto depois do facto. Prova que o remetente agiu, não é uma palavra-passe

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projetos a Explorar Isto

Estes foram criados para a track **Zcash Login** do [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). São experiências e não produtos concluídos, e mostram como a mesma ideia pode ser construída de formas muito diferentes.

- **ZecAuth** - um protocolo de ligação de wallet para Zcash, no espírito do que o WalletConnect faz noutros contextos. A app mostra um código QR ou uma ligação `zecauth://` que transporta um desafio juntamente com as capacidades que está a pedir, como iniciar sessão, pedidos de pagamento ou acesso de visualização. Sem transação, sem taxa, sem interação com a chain. Inclui uma especificação escrita do protocolo juntamente com o código
- **ZShield** - transforma um endereço shielded num DID W3C e numa identidade OpenID Connect. O browser gera um par de chaves, o servidor emite um nonce através de uma interface ao estilo ZIP 304, a wallet assina-o e o servidor devolve um JWT. Como o resultado é compatível com OIDC, as apps existentes podem consumi-lo sem integração à medida
- **ZecPass** - prova a propriedade através de um memo assinado, e foi construído para que a app nunca aprenda sequer o endereço do utilizador. Deriva um hash com âmbito de aplicação para usar como identificador estável, mantém os desafios de utilização única e com limite temporal, e inclui um botão React pronto a usar com uma biblioteca de verificação para Node
- **Portal** - login através do envio de uma transação shielded com um código de utilização única no memo, a funcionar em mainnet. O mesmo fluxo é reutilizado para desbloquear conteúdo pago e para enviar ou receber dinheiro a partir de uma ligação
- **ZcashMe** - usa um pagamento shielded como prova de identidade e foca-se na lacuna entre desktop e mobile, para que iniciar sessão num portátil não exija uma extensão de browser
- **ZBooks** - uma ferramenta de contabilidade e pagamentos que trata o login com Zcash como um primitivo de autenticação reutilizável e não como o próprio produto, e lê dados de tesouraria através de uma Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memos](/using-zcash/memos) - como funcionam os memos encriptados, e como um código de login viaja dentro de um deles
- [Viewing Keys](/zcash-tech/viewing-keys) - conceder acesso só de leitura sem entregar poder de gasto
- [Manter Registos Com ZEC Shielded](/zcash-use-cases/keeping-records-with-shielded-zec) - a mesma ideia de divulgação seletiva, aplicada à contabilidade
- [Enviar Dinheiro Sem Ligar a Identidade](/zcash-use-cases/send-money-without-linking-identity) - porque a reutilização de endereços compromete a privacidade

<br/>
