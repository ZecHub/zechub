# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Pague por serviços de IA de forma privada com ZEC blindado

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Iniciante - 10 min
</span>


## TL;DR

- A **NanoGPT** aceita ZEC blindado diretamente, sem conta nem email
- A recarga mínima é de **$0.10**, então você pode testá-la com pouco dinheiro
- O crédito entra em cerca de **30 segundos**, na primeira confirmação
- Para serviços que não aceitam ZEC, use **CrossPay** para gastar ZEC blindado e fazer com que sejam pagos em USDC
- O que acaba on-chain depende de **em qual pool está seu ZEC**, e a tela nunca informa isso

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é?

- Qualquer pessoa que não queira uma assinatura de IA vinculada ao seu nome
- Desenvolvedores que pagam por inferência sem um cartão corporativo
- Pessoas em países onde pagamentos com cartão para serviços de IA falham
- Quem preferir não fornecer um email só para experimentar um modelo

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

Pagar por IA normalmente envolve um cartão, um email e uma conta. Isso vincula cada prompt que você escreve à sua identidade legal, e o processador de pagamentos também vê isso.

As criptomoedas deveriam resolver isso, mas a maioria dos guias está desatualizada. Os serviços mudam o que aceitam, e um tutorial escrito há um ano levará você por um caminho que já não funciona.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Por que Zcash?

Um pagamento blindado oculta o remetente, o destinatário e o valor. O serviço é pago, e ninguém observando a chain descobre quem pagou ou quanto pagou.

Isso só se mantém se você pagar **a partir de** fundos blindados. Esta página especifica quando isso se aplica e quando não se aplica.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que você precisa

- ZEC em um saldo **blindado**
- Uma carteira que possa enviar para um endereço unificado. Este tutorial usa a **Noir Wallet**, uma extensão de navegador, para que todo o processo fique em uma única janela. Zkool e Zodl funcionam da mesma forma
- Cerca de $1 para acompanhar

> **Vem de uma corretora?** A maioria das corretoras, incluindo a Binance, só permite sacar ZEC para endereços **transparentes**, e não aceita um endereço `u1...` como destino. Saque primeiro para seu próprio endereço transparente, faça a blindagem na sua carteira e depois pague a partir do saldo blindado.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Rota 1: Pague diretamente à NanoGPT

[A NanoGPT](https://nano-gpt.com/) oferece mais de 200 modelos, incluindo GPT, Claude, Gemini e modelos de imagem, e aceita ZEC de forma nativa.

### Passo 1: Abra. Não é necessário cadastro

Acesse nano-gpt.com e comece a usá-la. Cada sessão é anônima por padrão e o próprio app diz isso: *"You are already using NanoGPT privately."* Não há conta para criar nem email para fornecer.

### Passo 2: Salve primeiro um token de login

Antes de colocar dinheiro, abra **Settings** e crie um token de login, depois guarde-o em um local seguro.

> **Este passo protege seu dinheiro.** Um saldo anônimo fica nos dados locais do seu navegador. Se você limpar os cookies sem um token salvo, o saldo desaparece, sem uma conta da qual seja possível recuperá-lo. Faça isso antes de depositar, não depois.

### Passo 3: Adicione saldo

Abra **Balance**, escolha **Custom** e informe um valor. O mínimo é **$0.10** e o máximo é $5,000. A NanoGPT informa o que isso compra: cerca de 12 prompts GPT 5.5 ou 18 imagens por $1.

![Tela de adição de saldo da NanoGPT mostrando o valor personalizado e o mínimo de dez centavos](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Passo 4: Escolha Zcash

Selecione **Digital currencies** e depois **Zcash** na grade.

Você receberá um código QR, um endereço de pagamento e um **mínimo de transferência** em ZEC para o valor que escolheu. Esse valor é calculado no momento em que a página carrega.

![Tela de depósito em Zcash da NanoGPT com o código QR, Unified Address e mínimo de transferência](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Passo 5: Envie da sua carteira

Copie o endereço para sua carteira, informe o valor e envie. A taxa de rede é de cerca de **0.00015 ZEC**.

> **Envie um pouco acima do mínimo.** A cotação é definida quando a página carrega e o ZEC varia antes de sua transação ser confirmada. Enviar exatamente o mínimo resultou em **$0.99** em vez de $1.00 nos testes. Enviar um pouco acima resultou em $1.17 para o mesmo $1 nominal, porque a NanoGPT credita o que você realmente envia.

![Tela de envio da Noir Wallet com o endereço da NanoGPT colado e a taxa de rede visível](/content-images/noir-send-6380a5f4ef.webp)

### Passo 6: Espere cerca de 30 segundos

Sua carteira mostrará a transação como pendente e depois sendo confirmada. A NanoGPT credita o saldo na **primeira confirmação**, então você não precisa esperar pelas três.

![Confirmação na carteira mostrando o valor enviado e o hash da transação](/content-images/noir-sent-2d476e94b9.webp)

O saldo aparece e você pode gastá-lo imediatamente.

![Página de saldo da NanoGPT mostrando o valor creditado e o histórico de depósitos](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Rota 2: Serviços que não aceitam ZEC

A maioria dos serviços de IA não aceita ZEC. **Venice.ai** e **OpenRouter** aceitam USDC, e a OpenRouter permite que você escolha em qual chain o checkout é liquidado.

Para esses casos, use **CrossPay** no [Zodl](/zcash-organizations/zodl). Você gasta ZEC blindado e o destinatário é pago no ativo solicitado, encaminhado por NEAR Intents sem uma corretora centralizada e sem KYC.

1. Obtenha o endereço de pagamento do serviço, o ativo e a chain esperados por ele, por exemplo, USDC na Base
2. Abra o Zodl e escolha **CrossPay**
3. Informe esse endereço, escolha o ativo que o serviço quer e informe o valor
4. Envie do seu saldo blindado

Seu ZEC sai blindado. O serviço vê um pagamento comum em USDC chegando e nunca descobre que ele começou como ZEC.

> A parte da conversão é visível na chain de destino, então o próprio pagamento em USDC é tão público quanto qualquer outro pagamento em USDC. O que permanece privado é o lado do Zcash e a ligação entre os dois.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O que é revelado em cada passo

Esta é a parte que a maioria dos guias ignora.

| O que acontece | O que o serviço descobre | O que fica on-chain |
|---|---|---|
| Navegação e prompts | Nada. Sem conta, sem email | Nada |
| É emitido um endereço de depósito | Nada | Nada |
| Paga **a partir de Sapling** | O endereço de depósito que você usou | Nada. Blindado para blindado |
| Paga **a partir de Ironwood** | O mesmo | **O valor e a altura do bloco** |
| Paga **a partir de um endereço transparente** | O mesmo | O valor e seu t-address |
| Qualquer uma das opções acima | Seu IP, a menos que você use Tor ou uma VPN | Não se aplica |

### Por que o pool importa

O endereço de depósito da NanoGPT é um endereço unificado. Ao decodificar um emitido em agosto de 2026, você vê exatamente dois receivers: **Sapling** e **Orchard**.

Desde que a atualização [Ironwood](/zcash-tech/ironwood) foi ativada em 28 de julho de 2026, Orchard é apenas spend-only e nenhum novo valor pode entrar nele. Isso deixa **Sapling como o único receiver em que um pagamento pode realmente chegar**.

Portanto, se seu ZEC já estiver em Sapling, o pagamento é de Sapling para Sapling e nada sobre ele é público. Mas se você tiver migrado para Ironwood, pagar move valor através de uma fronteira entre pools, e [a catraca](/zcash-tech/the-turnstile) publica o valor e a altura, embora remetente e destinatário permaneçam ocultos.

As telas parecem idênticas nos dois casos. Manter um pequeno saldo em Sapling para pagamentos é a solução mais simples.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Depositar antes de salvar um token de login e depois limpar os cookies
- Enviar exatamente o mínimo de transferência e ficar um centavo abaixo
- Tentar sacar diretamente de uma corretora para um endereço `u1...`
- Presumir que o pagamento é privado sem verificar de qual pool você gastou
- Pagar por uma conexão comum quando o objetivo era não ser identificado

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Você pode:

- Usar modelos de IA de ponta sem conta, email ou cartão
- Pagar em ZEC blindado e saber exatamente o que isso oculta e o que não oculta
- Acessar serviços que nunca ouviram falar do Zcash, por meio do CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionados

- [Ironwood](/zcash-tech/ironwood) - por que o pool em que seus fundos estão mudou
- [A catraca](/zcash-tech/the-turnstile) - o que se torna público quando o valor atravessa pools
- [Carteiras](/using-zcash/wallets) - quais carteiras recebem manutenção
- [ZODL](/zcash-organizations/zodl) - a carteira por trás do CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progresso

**Passo 1 de 1**

Você pagou por um serviço de IA com ZEC blindado e sabe o que isso revelou.

<br/>

## Próximo passo

- [Envie dinheiro sem vincular sua identidade](/zcash-use-cases/send-money-without-linking-identity)

<br/>
