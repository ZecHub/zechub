# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Pagar por Serviços de IA de Forma Privada com ZEC Shielded

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Iniciante - 10 min
</span>


## TL;DR

- A **NanoGPT** aceita ZEC shielded diretamente, sem conta nem email
- O carregamento mínimo é de **$0.10**, por isso pode testar com trocos
- O crédito entra em cerca de **30 segundos**, na primeira confirmação
- Para serviços que não aceitam ZEC, use **CrossPay** para gastar ZEC shielded e fazer com que lhes seja pago em USDC
- O que acaba on-chain depende de **em que pool está o seu ZEC**, e o ecrã nunca o indica

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A quem se destina?

- Qualquer pessoa que não queira uma subscrição de IA associada ao seu nome
- Developers que pagam por inferência sem um cartão corporativo
- Pessoas em países onde os pagamentos por cartão para serviços de IA falham
- Quem preferir não entregar um email só para experimentar um modelo

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O Problema

Pagar por IA normalmente implica um cartão, um email e uma conta. Isso liga todos os prompts que escreve à sua identidade legal, e o processador de pagamentos também o vê.

As criptomoedas deviam resolver isto, mas a maior parte dos guias está desatualizada. Os serviços mudam o que aceitam, e um tutorial escrito há um ano vai levá-lo por um caminho que já não funciona.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Porquê Zcash?

Um pagamento shielded oculta o remetente, o destinatário e o montante. O serviço é pago, e ninguém a observar a chain aprende quem pagou ou quanto pagou.

Isto só se mantém se pagar **a partir de** fundos shielded. Esta página é específica quanto a quando isso se aplica e quando não se aplica.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que Precisa

- ZEC num saldo **shielded**
- Uma wallet que consiga enviar para um Unified Address. Este tutorial usa a **Noir Wallet**, uma extensão de browser, para que todo o processo fique numa só janela. Zkool e Zodl funcionam da mesma forma
- Cerca de $1 para acompanhar

> **Vem de uma exchange?** A maioria das exchanges, incluindo a Binance, só permite levantar ZEC para endereços **transparent**, e não aceita um endereço `u1...` como destino. Levante primeiro para o seu próprio endereço transparent, faça shield na sua wallet e depois pague a partir do saldo shielded.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Rota 1: Pagar diretamente à NanoGPT

[A NanoGPT](https://nano-gpt.com/) oferece mais de 200 modelos, incluindo GPT, Claude, Gemini e modelos de imagem, e aceita ZEC de forma nativa.

### Passo 1: Abra. Não há registo

Vá a nano-gpt.com e comece a usar. Cada sessão é anónima por defeito e a própria app diz isso: *"You are already using NanoGPT privately."* Não há conta para criar nem email para entregar.

### Passo 2: Guarde primeiro um token de início de sessão

Antes de colocar dinheiro, abra **Settings** e crie um token de início de sessão, depois guarde-o num local seguro.

> **Este passo protege o seu dinheiro.** Um saldo anónimo fica nos dados locais do seu browser. Se limpar os cookies sem um token guardado, o saldo desaparece, sem conta a partir da qual o possa recuperar. Faça isto antes de depositar, não depois.

### Passo 3: Adicione saldo

Abra **Balance**, escolha **Custom** e introduza um montante. O mínimo é **$0.10** e o máximo é $5,000. A NanoGPT diz-lhe o que isso compra, cerca de 12 prompts GPT 5.5 ou 18 imagens por $1.

![Ecrã de adicionar saldo da NanoGPT a mostrar o montante personalizado e o mínimo de dez cêntimos](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Passo 4: Escolha Zcash

Selecione **Digital currencies** e depois **Zcash** na grelha.

Receberá um código QR, um endereço de pagamento e um **mínimo de transferência** em ZEC para o montante que escolheu. Esse valor é calculado no momento em que a página é carregada.

![Ecrã de depósito em Zcash da NanoGPT com o código QR, Unified Address e mínimo de transferência](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Passo 5: Envie a partir da sua wallet

Copie o endereço para a sua wallet, introduza o montante e envie. A taxa de rede é cerca de **0.00015 ZEC**.

> **Envie um pouco acima do mínimo.** A cotação é definida quando a página é carregada e o ZEC varia antes de a sua transação confirmar. Enviar exatamente o mínimo resultou em **$0.99** em vez de $1.00 nos testes. Enviar um pouco acima resultou em $1.17 para o mesmo $1 nominal, porque a NanoGPT credita o que realmente envia.

![Ecrã de envio da Noir Wallet com o endereço da NanoGPT colado e a taxa de rede visível](/content-images/noir-send-6380a5f4ef.webp)

### Passo 6: Espere cerca de 30 segundos

A sua wallet mostrará a transação como pendente e depois em confirmação. A NanoGPT credita o saldo na **primeira confirmação**, por isso não precisa de esperar pelas três.

![Confirmação na wallet a mostrar o montante enviado e o hash da transação](/content-images/noir-sent-2d476e94b9.webp)

O saldo aparece e pode gastá-lo imediatamente.

![Página de saldo da NanoGPT a mostrar o montante creditado e o histórico de depósitos](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Rota 2: Serviços que não aceitam ZEC

A maior parte dos serviços de IA não aceita ZEC. A **Venice.ai** e a **OpenRouter** aceitam ambas USDC, e a OpenRouter permite-lhe escolher em que chain o checkout é liquidado.

Para esses casos, use **CrossPay** no [Zodl](/zcash-organizations/zodl). Gasta ZEC shielded e o destinatário é pago no ativo que pediu, encaminhado através de NEAR Intents sem uma exchange centralizada e sem KYC.

1. Obtenha o endereço de pagamento do serviço e o ativo e chain que ele espera, por exemplo USDC em Base
2. Abra o Zodl e escolha **CrossPay**
3. Introduza esse endereço, escolha o ativo que o serviço quer e introduza o montante
4. Envie a partir do seu saldo shielded

O seu ZEC sai shielded. O serviço vê chegar um pagamento normal em USDC e nunca fica a saber que começou como ZEC.

> A parte da swap é visível na chain de destino, por isso o próprio pagamento em USDC é tão público como qualquer outro pagamento em USDC. O que permanece privado é o lado Zcash e a ligação entre os dois.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O que é revelado em cada passo

Esta é a parte que a maioria dos guias ignora.

| O que acontece | O que o serviço fica a saber | O que fica on-chain |
|---|---|---|
| Navegação e prompts | Nada. Sem conta, sem email | Nada |
| É emitido um endereço de depósito | Nada | Nada |
| Paga **a partir de Sapling** | O endereço de depósito que usou | Nada. Shielded para shielded |
| Paga **a partir de Ironwood** | O mesmo | **O montante e a altura do bloco** |
| Paga **a partir de um endereço transparent** | O mesmo | O montante e o seu t-address |
| Qualquer uma das opções acima | O seu IP, a menos que use Tor ou uma VPN | Não aplicável |

### Porque é que a pool importa

O endereço de depósito da NanoGPT é um Unified Address. Ao descodificar um emitido em agosto de 2026, vê-se exatamente dois receivers: **Sapling** e **Orchard**.

Desde que a atualização [Ironwood](/zcash-tech/ironwood) foi ativada em 28 de julho de 2026, Orchard é apenas spend-only e já não pode entrar novo valor nela. Isso deixa **Sapling como o único receiver onde um pagamento pode realmente chegar**.

Portanto, se o seu ZEC já estiver em Sapling, o pagamento é de Sapling para Sapling e nada sobre ele é público. Mas se tiver migrado para Ironwood, pagar move valor através de uma fronteira entre pools, e [the turnstile](/zcash-tech/the-turnstile) publica o montante e a altura, apesar de remetente e destinatário permanecerem ocultos.

Os ecrãs parecem idênticos em ambos os casos. Manter um pequeno saldo Sapling para pagamentos é a solução mais simples.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros Comuns a Evitar

- Depositar antes de guardar um token de início de sessão e depois limpar os cookies
- Enviar exatamente o mínimo de transferência e ficar um cêntimo abaixo
- Tentar levantar diretamente de uma exchange para um endereço `u1...`
- Assumir que o pagamento é privado sem verificar de que pool gastou
- Pagar através de uma ligação normal quando o objetivo era precisamente não ser identificado

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Pode:

- Usar modelos de IA de ponta sem conta, email ou cartão
- Pagar em ZEC shielded e saber exatamente o que isso oculta e o que não oculta
- Chegar a serviços que nunca ouviram falar de Zcash, através de CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Ironwood](/zcash-tech/ironwood) - porque mudou a pool onde os seus fundos se encontram
- [The Turnstile](/zcash-tech/the-turnstile) - o que se torna público quando o valor atravessa pools
- [Wallets](/using-zcash/wallets) - que wallets são mantidas
- [ZODL](/zcash-organizations/zodl) - a wallet por trás do CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progresso

**Passo 1 de 1**

Pagou por um serviço de IA com ZEC shielded e sabe o que isso revelou.

<br/>

## Próximo Passo

- [Enviar Dinheiro Sem Ligar a Identidade](/zcash-use-cases/send-money-without-linking-identity)

<br/>
