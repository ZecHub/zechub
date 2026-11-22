<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Conversão de SOL/USDC para ZEC usando o encrypt.trade

> Converta SOL ou USDC na Solana em ZEC, com a etapa cross-chain roteada pelo NEAR Intents.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## Resumo

* O [encrypt.trade](https://encrypt.trade/zec) encapsula SOL ou USDC em tokens criptografados (eSOL/eUSDC) e depois os converte em ZEC por meio do NEAR Intents.
* Os valores ficam ocultos na Solana, mas o endereço da sua carteira e o uso que ela faz do app são públicos.
* O ZEC é entregue apenas em um endereço transparente (t1/t3), então fica visível na chain do Zcash até você blindá-lo.
* Blinde o ZEC na sua carteira assim que ele chegar.
* Tanto o app quanto o NEAR Intents verificam as carteiras por motivos de conformidade.

---

## Explicação principal
O [**encrypt.trade**](https://encrypt.trade/zec) é um app da Solana administrado pela JMD Labs Inc. Ele permite converter **SOL ou USDC** na Solana em **Zcash (ZEC)**. Primeiro, seus tokens são encapsulados em versões criptografadas, para que os valores fiquem ocultos na Solana, e depois são convertidos em ZEC por meio do NEAR Intents.

A conversão é privada em alguns aspectos, mas não em todos. A própria [documentação](https://docs.encifher.io/docs) do app diz que sua interação com a chain não é anônima: as pessoas podem ver que sua carteira usou o app, mas não quanto você movimentou. O ZEC também chega a um endereço transparente, então continua visível na chain do Zcash até você blindá-lo.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  O que saber antes de fazer a conversão  
- **Lado da Solana.** O encapsulamento oculta os valores, mas o endereço da sua carteira e o uso que ela faz do app são públicos. As [boas práticas](https://docs.encifher.io/docs/best-practices) do app alertam que um simples encapsulamento, conversão e desencapsulamento torna sua transação rastreável.
- **Criptografia.** Os saldos criptografados são processados off-chain dentro de um enclave de hardware (TEE). O [artigo](https://eprint.iacr.org/2026/1504) dos desenvolvedores diz que isso depende da integridade do TEE, de um gerenciamento honesto de chaves por limiar e da raiz de atestação da nuvem, e não apenas da criptografia.
- **Etapa cross-chain.** A conversão para ZEC é roteada pelo NEAR Intents, onde solvers independentes executam a ordem.
- **Lado do Zcash.** O NEAR Intents lista o ZEC como suportado apenas para [endereços transparentes](https://docs.near-intents.org/resources/chain-support), e o campo de ZEC no encrypt.trade só aceitava endereços transparentes (t1 ou t3) quando este guia foi verificado em setembro de 2026. Um endereço transparente mostra publicamente seu saldo e as transferências recebidas até você blindar.
- **Verificação.** O app verifica as carteiras conectadas em bancos de dados como TRM e Chainalysis, e sua [página de conformidade](https://docs.encifher.io/docs/compliance) diz que os registros criptografados podem ser analisados se houver causa legal legítima. O NEAR Intents também faz sua própria [verificação](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passo 1: conecte sua carteira Solana  
Acesse o [encrypt.trade](https://encrypt.trade/zec) usando **Chrome ou Firefox** e conecte sua carteira **Phantom**, **Solflare** ou **Slope**. Certifique-se de que sua carteira tenha **SOL** suficiente para as taxas de gas e os tokens que você deseja negociar. Depois de conectar, você já pode encapsular seus ativos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passo 2: encapsule seus tokens  
Vá até a seção **Wrap**. Escolha **SOL** ou **USDC**, digite o valor e confirme. O app bloqueia seus ativos e emite **versões criptografadas (eSOL ou eUSDC)**. Encapsular um valor diferente do que você converte torna mais difícil relacionar as duas operações pelo valor, mas não oculta que sua carteira usou o app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passo 3: prepare sua carteira ZODL  
Baixe o [**ZODL**](https://zodl.com), a carteira de Zcash mantida pela ZODL. Na tela Receber, copie seu **endereço transparente Zcash** (ele começa com t1). No momento, o encrypt.trade não aceita endereços blindados nem unificados para ZEC. Guarde sua frase semente em local seguro antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passo 4: faça a conversão  
De volta ao **encrypt.trade**, vá até **Swap**. Selecione **eSOL/eUSDC -> ZEC**, cole seu endereço transparente ZODL, revise os detalhes e confirme.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


O **NEAR Intents** cuida do roteamento cross-chain e envia o **ZEC** para sua carteira ZODL. Isso pode levar alguns minutos. O NEAR Intents recomenda aguardar até 15 minutos nas conversões cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passo 5: blinde seu ZEC  
Quando o ZEC chegar, use a opção **Shield** do ZODL para movê-lo para o [pool blindado](/using-zcash/shielded-pools). Até lá, ele fica em um endereço transparente, onde qualquer pessoa pode ver o saldo. A blindagem protege o que você fizer em seguida, mas a transferência recebida e a transação de blindagem continuam visíveis na chain. Sempre verifique os links, evite reutilizar endereços e teste primeiro com valores pequenos.  

---

###  Quem está envolvido e onde obter ajuda  
- O **encrypt.trade** é o app, administrado pela JMD Labs Inc. Sua [política de privacidade](https://encrypt.trade/privacy) diz que ele coleta dados técnicos como IP, navegador e detalhes do dispositivo, envia o endereço da sua carteira, o histórico recente e os saldos para provedores de conformidade antes de uma conversão e pode manter registros e resultados de verificação AML por até cinco anos. Seus [termos](https://encrypt.trade/terms) proíbem o uso de VPN ou proxy para ocultar sua localização. Suporte: help@encifher.io ou o [grupo no Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) indicado no app.
- O **NEAR Intents** roteia a etapa cross-chain e entrega o ZEC. Consulte os [termos da API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a política de privacidade em near.com/privacy, acompanhe as conversões no [Explorer do NEAR Intents](https://explorer.near-intents.org) e peça ajuda no [NEAR Intents do Telegram](https://t.me/near_intents).

Os termos e os endereços suportados podem mudar, então verifique as versões atuais antes de uma conversão de valor alto. Para uma visão mais ampla, consulte [Corretoras não custodiantes](/using-zcash/non-custodial-exchanges).

---

Ao combinar **Solana**, **Zcash** e **NEAR Intents**, o **encrypt.trade** oferece um caminho rápido de SOL ou USDC para ZEC. Ele oculta os valores na Solana, mas não é privado de ponta a ponta, então blinde seu ZEC assim que ele chegar.
