# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Iniciar sessão com Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermédio - 7 min</span>

## TL;DR

- Inicie sessão provando que controla um endereço Zcash, em vez de usar uma palavra-passe
- Estão a ser usados dois modelos: **assinar um desafio**, ou **enviar um pagamento shielded com um código no memo**
- Como os endereços shielded ocultam o saldo e o histórico, provar o controlo não expõe as suas finanças
- Este padrão ainda está numa fase inicial. Ainda não existe um padrão ratificado, e as implementações não interoperam

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A quem se destina?

- Programadores que querem início de sessão sem palavra-passe sem recolher dados pessoais
- Utilizadores que preferem não fornecer um endereço de email a todos os sites
- Qualquer pessoa que queira iniciar sessão sem ligar o seu histórico financeiro a uma conta

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O Problema

A maioria das opções de início de sessão revela alguma coisa:

- **Palavras-passe e email** criam uma conta ligada à sua identidade, e ambos acabam em bases de dados de violações de segurança
- **Início de sessão social** diz ao fornecedor de identidade todos os locais onde inicia sessão e quando
- **Início de sessão com wallet em cadeias transparentes** é pior do que parece. Ligar uma wallet pode dar ao site acesso ao seu saldo completo e ao histórico de transações, permanentemente

Normalmente, está a escolher entre conveniência e exposição.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Porquê Zcash?

Zcash separa *provar o controlo* de *revelar as finanças*:

- **Endereços shielded** mantêm privados os saldos e o histórico de transações, por isso provar que possui um não diz nada sobre o que possui
- **Memos encriptados** podem transportar um código de início de sessão de utilização única de forma privada dentro de uma transação
- **Viewing keys** permitem divulgação seletiva, pelo que uma aplicação pode receber acesso de leitura exatamente ao que precisa e nada mais

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Como Funciona

Surgiram duas abordagens. Ambas terminam com a aplicação a ter um identificador estável para si e sem palavra-passe.

### Abordagem 1: Assinar um desafio

1. A aplicação gera um desafio aleatório de utilização única
2. A sua wallet assina esse desafio com a chave por detrás do seu endereço
3. A aplicação verifica a assinatura e inicia a sua sessão

Nada é difundido para a rede, por isso não há taxa nem espera por um bloco. A especificação relevante é a [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), que continua a ser um rascunho, pelo que o suporte de assinatura de mensagens nas wallets varia.

### Abordagem 2: Prová-lo com um pagamento shielded

1. A aplicação gera um código de utilização única e mostra um pedido de pagamento
2. Envia uma pequena transação shielded com esse código no memo
3. A aplicação observa o memo, faz a correspondência do código e inicia a sua sessão

Isto funciona com wallets que já suportam memos hoje, o que corresponde à maioria delas. A contrapartida é que tem um custo de taxa de rede e exige esperar pela confirmação.

### Manter o endereço privado

Uma aplicação não precisa de armazenar o seu endereço para o reconhecer. Algumas implementações fazem o hash do endereço em conjunto com um valor específico da aplicação, para que cada site veja um identificador diferente, mas estável, para o mesmo utilizador. Isso impede que os sites comparem informações para ligar as suas contas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromissos

Vale a pena compreender isto antes de criar algo com base neste modelo ou de depender dele.

| | Desafio assinado | Pagamento shielded |
|---|---|---|
| Custo | Gratuito | Taxa de rede por início de sessão |
| Velocidade | Instantâneo | Espera pela confirmação |
| Suporte das wallets | Limitado, ZIP 304 é um rascunho | Amplo, só precisa de memos |
| Deixa registo na chain | Não | Sim, existe uma transação |

Limitações partilhadas:

- **Sem recuperação de conta por defeito.** Perder a chave significa perder a conta, a menos que a aplicação tenha concebido um mecanismo de recuperação
- **A reutilização de endereços pode ligá-lo.** Usar o mesmo endereço em muitos sites recria o problema de rastreamento, razão pela qual os identificadores específicos da aplicação são importantes
- **Sem padrão ratificado.** Cada projeto tem o seu próprio esquema, por isso um início de sessão criado para um não funciona com outro
- **Não é anonimato por si só.** Oculta as suas finanças da aplicação, mas a aplicação continua a poder traçar o seu perfil com base no que faz depois de entrar

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros Comuns a Evitar

- Reutilizar um código de desafio. Cada código deve ser de utilização única e expirar rapidamente, ou um código capturado pode ser reutilizado
- Pedir aos utilizadores que enviem um montante significativo para iniciar sessão. O pagamento é uma prova, por isso o valor deve ser trivial
- Armazenar o endereço em bruto quando um identificador específico da aplicação faria o mesmo trabalho
- Assumir que a assinatura de mensagens funciona em todo o lado. Verifique as wallets que os seus utilizadores realmente têm
- Tratar um memo como secreto depois do facto. Ele prova que o remetente agiu, não é uma palavra-passe

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projetos a Explorar Isto

Estes foram criados para a categoria **Zcash Login** do [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). São experiências e não produtos acabados, e mostram como a mesma ideia pode ser construída de formas diferentes.

- **ZecAuth** - um protocolo de ligação de wallet para Zcash, no espírito do que o WalletConnect faz noutros ecossistemas. A aplicação mostra um código QR ou um link `zecauth://` com um desafio, juntamente com as capacidades que está a pedir, como iniciar sessão, pedidos de pagamento ou acesso de visualização. Sem transação, sem taxa, sem interação com a chain. Inclui uma especificação escrita do protocolo juntamente com o código
- **ZShield** - transforma um endereço shielded num DID W3C e numa identidade OpenID Connect. O navegador gera um par de chaves, o servidor emite um nonce através de uma interface ao estilo ZIP 304, a wallet assina-o e o servidor devolve um JWT. Como o resultado é compatível com OIDC, as aplicações existentes podem consumi-lo sem integração personalizada
- **ZecPass** - prova a posse através de um memo assinado e foi concebido para que a aplicação nunca aprenda sequer o endereço do utilizador. Deriva um hash com âmbito da aplicação para usar como identificador estável, mantém os desafios de utilização única e limitados no tempo, e inclui um botão React pronto a usar com uma biblioteca de verificação em Node
- **Portal** - início de sessão através do envio de uma transação shielded com um código de utilização única no memo, a funcionar na mainnet. O mesmo fluxo é reutilizado para desbloquear conteúdo pago e para enviar ou receber dinheiro a partir de um link
- **ZcashMe** - usa um pagamento shielded como prova de identidade e concentra-se na lacuna entre desktop e mobile, para que iniciar sessão num portátil não exija uma extensão do navegador
- **ZBooks** - uma ferramenta de contabilidade e pagamentos que trata o início de sessão com Zcash como um primitivo de autenticação reutilizável, e lê dados de tesouraria através de uma Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Páginas relacionadas

- [Memos](/using-zcash/memos) - como funcionam os memos encriptados e como um código de início de sessão viaja dentro de um deles
- [Viewing Keys](/zcash-tech/viewing-keys) - conceder acesso só de leitura sem entregar poder de gasto
- [Manter Registos Com ZEC Shielded](/zcash-use-cases/keeping-records-with-shielded-zec) - a mesma ideia de divulgação seletiva, aplicada à contabilidade
- [Enviar Dinheiro Sem Ligar a Identidade](/zcash-use-cases/send-money-without-linking-identity) - porque a reutilização de endereços compromete a privacidade

<br/>
