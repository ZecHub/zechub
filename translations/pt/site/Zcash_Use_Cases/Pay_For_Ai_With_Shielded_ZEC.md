# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Pague por serviços de IA com privacidade usando ZEC blindado

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Iniciante - 10 min
</span>


## Resumo

- **NanoGPT** aceita ZEC blindado diretamente, sem conta e sem e-mail
- A recarga mínima é de **US$ 0,10**, então você pode testar com uns trocados
- O crédito cai em cerca de **30 segundos**, na primeira confirmação
- Para serviços que não aceitam ZEC, use **CrossPay** para gastar ZEC blindado e fazer o pagamento chegar em USDC
- O que fica registrado na chain depende de **em qual pool está o seu ZEC**, e a tela nunca mostra isso

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Para quem é este guia?

- Qualquer pessoa que não quer uma assinatura de IA vinculada ao próprio nome
- Desenvolvedores que pagam por inferência sem cartão corporativo
- Pessoas em países onde pagamentos com cartão para serviços de IA falham
- Qualquer pessoa que prefere não informar um e-mail para testar um modelo

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O problema

Pagar por IA normalmente exige um cartão, um e-mail e uma conta. Isso vincula cada prompt que você escreve à sua identidade civil, e o processador de pagamentos também vê tudo.

As criptomoedas deveriam resolver isso, mas a maioria dos guias está desatualizada. Os serviços mudam o que aceitam, e um tutorial escrito há um ano vai levar você por um caminho que não funciona mais.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Por que Zcash?

Um pagamento blindado oculta o remetente, o destinatário e o valor. O serviço recebe o pagamento, e ninguém que observa a chain descobre quem pagou nem quanto.

Isso só vale se você pagar **a partir de** fundos blindados. Esta página explica com precisão quando isso vale e quando não vale.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> O que você precisa

- ZEC em um saldo **blindado**
- Uma carteira que consiga enviar para um endereço unificado. Este tutorial usa a **Noir Wallet**, uma extensão de navegador, para que todo o fluxo fique em uma única janela. Zkool e Zodl funcionam da mesma forma
- Cerca de US$ 1 para acompanhar o passo a passo

> **Vindo de uma corretora?** A maioria das corretoras, incluindo Binance, só permite sacar ZEC para endereços **transparentes**, e elas não aceitam um endereço `u1...` como destino. Primeiro saque para o seu próprio endereço transparente, blinde os fundos na sua carteira e depois pague a partir do saldo blindado.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Rota 1: pague o NanoGPT diretamente

O [NanoGPT](https://nano-gpt.com/) oferece mais de 200 modelos, incluindo GPT, Claude, Gemini e modelos de imagem, e aceita ZEC nativamente.

### Passo 1: abra o site. Não há cadastro

Acesse nano-gpt.com e comece a usar. Toda sessão é anônima por padrão, e o próprio app avisa: *"Você já está usando o NanoGPT de forma privada."* Não há conta para criar nem e-mail para informar.

### Passo 2: salve um token de login primeiro

Antes de colocar dinheiro, abra **Settings** e crie um token de login, depois guarde-o em um lugar seguro.

> **Este passo protege o seu dinheiro.** Um saldo anônimo fica armazenado nos dados locais do seu navegador. Se você limpar os cookies sem ter salvo um token, o saldo desaparece, sem nenhuma conta para recuperá-lo. Faça isso antes de depositar, não depois.

### Passo 3: adicione saldo

Abra **Balance**, escolha **Custom** e informe um valor. O mínimo é **US$ 0,10** e o máximo é US$ 5.000. O NanoGPT mostra o que o valor compra: cerca de 12 prompts do GPT 5.5 ou 18 imagens por US$ 1.

![Tela de adicionar saldo do NanoGPT mostrando o valor personalizado e o mínimo de dez centavos](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Passo 4: escolha Zcash

Selecione **Digital currencies** e depois **Zcash** na grade.

Você verá um QR code, um endereço de pagamento e um **valor mínimo de transferência** em ZEC para o valor escolhido. Esse valor é cotado no momento em que a página carrega.

![Tela de depósito Zcash do NanoGPT com o QR code, o endereço unificado e o valor mínimo de transferência](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Passo 5: envie a partir da sua carteira

Copie o endereço para a sua carteira, informe o valor e envie. A taxa da rede é de cerca de **0,00015 ZEC**.

> **Envie um pouco acima do mínimo.** A cotação é calculada quando a página carrega, e o preço do ZEC oscila antes que a sua transação seja confirmada. Nos testes, enviar exatamente o mínimo resultou em **US$ 0,99** em vez de US$ 1,00. Enviar um pouco a mais resultou em US$ 1,17 para o mesmo valor nominal de US$ 1, porque o NanoGPT credita o que você realmente envia.

![Tela de envio da Noir Wallet com o endereço do NanoGPT colado e a taxa de rede exibida](/content-images/noir-send-6380a5f4ef.webp)

### Passo 6: aguarde cerca de 30 segundos

A sua carteira vai mostrar a transação como pendente e depois em confirmação. O NanoGPT credita o saldo na **primeira confirmação**, então você não precisa esperar as três.

![Confirmação da carteira mostrando o valor enviado e o hash da transação](/content-images/noir-sent-2d476e94b9.webp)

O saldo aparece e você pode usá-lo imediatamente.

![Página de saldo do NanoGPT mostrando o valor creditado e o histórico de depósitos](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Rota 2: serviços que não aceitam ZEC

A maioria dos serviços de IA não aceita ZEC. **Venice.ai** e **OpenRouter** aceitam USDC no lugar, e o OpenRouter permite escolher em qual chain o checkout é liquidado.

Para esses serviços, use **CrossPay** na [Zodl](/zcash-organizations/zodl). Você gasta ZEC blindado e o destinatário recebe no ativo que pediu, com roteamento pela NEAR Intents, sem corretora centralizada e sem KYC.

1. Obtenha o endereço de pagamento do serviço e o ativo e a chain que ele espera, por exemplo USDC na Base
2. Abra a Zodl e escolha **CrossPay**
3. Informe esse endereço, escolha o ativo que o serviço quer e informe o valor
4. Envie a partir do seu saldo blindado

O seu ZEC sai blindado. O serviço vê um pagamento comum em USDC chegando e nunca descobre que ele começou como ZEC.

> A etapa da conversão é visível na chain de destino, então o pagamento em USDC em si é tão público quanto qualquer outro pagamento em USDC. O que permanece privado é o lado do Zcash e a ligação entre os dois.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> O que é revelado em cada etapa

Esta é a parte que a maioria dos guias pula.

| O que acontece | O que o serviço descobre | O que vai para a chain |
|---|---|---|
| Navegar e enviar prompts | Nada. Sem conta, sem e-mail | Nada |
| Um endereço de depósito é gerado | Nada | Nada |
| Você paga **a partir do Sapling** | O endereço de depósito que você usou | Nada. De blindado para blindado |
| Você paga **a partir do Ironwood** | O mesmo | **O valor e a altura do bloco** |
| Você paga **a partir de um endereço transparente** | O mesmo | O valor e o seu t-address |
| Qualquer um dos casos acima | O seu IP, a menos que você use Tor ou uma VPN | Não se aplica |

### Por que o pool importa

O endereço de depósito do NanoGPT é um endereço unificado. Decodificar um endereço gerado em agosto de 2026 mostra exatamente dois receptores: **Sapling** e **Orchard**.

Desde que o upgrade [Ironwood](/zcash-tech/ironwood) foi ativado em 28 de julho de 2026, o Orchard só permite gastos e nenhum valor novo pode entrar nele. Isso deixa o **Sapling como o único receptor em que um pagamento pode de fato chegar**.

Então, se o seu ZEC já estiver no Sapling, o pagamento vai de Sapling para Sapling e nada sobre ele é público. Mas se você migrou para o Ironwood, pagar move valor entre pools, e [a catraca](/zcash-tech/the-turnstile) publica o valor e a altura, mesmo que o remetente e o destinatário continuem ocultos.

As telas são idênticas nos dois casos. Manter um pequeno saldo no Sapling para pagamentos é a solução mais simples.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erros comuns a evitar

- Depositar antes de salvar um token de login e depois limpar os cookies
- Enviar exatamente o valor mínimo de transferência e ficar um centavo abaixo
- Tentar sacar diretamente de uma corretora para um endereço `u1...`
- Presumir que o pagamento é privado sem verificar de qual pool você gastou
- Pagar por uma conexão comum quando o objetivo era justamente não ser identificado

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Você consegue:

- Usar modelos de IA de ponta sem conta, e-mail ou cartão
- Pagar com ZEC blindado e saber exatamente o que isso oculta e o que não oculta
- Acessar serviços que nunca ouviram falar de Zcash, por meio de CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionados

- [Ironwood](/zcash-tech/ironwood) - por que o pool em que estão os seus fundos mudou
- [A catraca](/zcash-tech/the-turnstile) - o que se torna público quando valor atravessa pools
- [Carteiras](/using-zcash/wallets) - quais carteiras recebem manutenção
- [ZODL](/zcash-organizations/zodl) - a carteira por trás de CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progresso

**Passo 1 de 1**

Você pagou por um serviço de IA com ZEC blindado e sabe o que isso revelou.

<br/>

## Próximo passo

- [Envie dinheiro sem vincular sua identidade](/zcash-use-cases/send-money-without-linking-identity)

<br/>
