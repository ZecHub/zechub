# **Conversão de SOL/USDC -> ZEC usando Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Converta Solana em Zcash, com a etapa cross-chain roteada por NEAR Intents.*  

---

###  Introdução  
[**encrypt.trade**](https://encrypt.trade/zec) é um app Solana operado pela JMD Labs Inc. Ele permite converter **SOL ou USDC** na Solana em **Zcash (ZEC)**. Seus tokens são primeiro encapsulados em versões criptografadas para que os valores fiquem ocultos na Solana e, em seguida, convertidos em ZEC por meio de NEAR Intents.

A conversão é privada em alguns aspectos, mas não em todos. A própria [documentação](https://docs.encifher.io/docs) do app diz que sua interação com a chain não é anônima: as pessoas podem ver que sua carteira usou o app, mas não quanto você movimentou. O ZEC também chega a um endereço transparente, portanto permanece visível na chain do Zcash até você blindá-lo.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  O que saber antes de converter  
- **Lado da Solana.** O encapsulamento oculta valores, mas o endereço da sua carteira e seu uso do app são públicos. As [melhores práticas](https://docs.encifher.io/docs/best-practices) alertam que um simples encapsulamento, conversão e desencapsulamento torna sua transação vinculável.
- **Criptografia.** Os saldos criptografados são processados off-chain dentro de um enclave de hardware (TEE). O [artigo](https://eprint.iacr.org/2026/1504) dos desenvolvedores afirma que isso depende da integridade do TEE, de um gerenciamento honesto de chaves por limite e da raiz de atestação da cloud, não apenas da criptografia.
- **Etapa cross-chain.** A conversão em ZEC é roteada por NEAR Intents, onde solvers independentes executam a ordem.
- **Lado do Zcash.** NEAR Intents lista ZEC como compatível apenas com [endereços transparentes](https://docs.near-intents.org/resources/chain-support), e o campo ZEC no encrypt.trade aceitava apenas endereços transparentes (t1 ou t3) quando este guia foi verificado em setembro de 2026. Um endereço transparente mostra publicamente seu saldo e as transferências recebidas até você blindá-lo.
- **Verificação.** O app verifica as carteiras conectadas em bancos de dados como TRM e Chainalysis, e sua [página de conformidade](https://docs.encifher.io/docs/compliance) informa que registros criptografados podem ser analisados se houver uma causa legal legítima. NEAR Intents também realiza sua própria [verificação](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passo 1: Conecte sua carteira Solana  
Visite [encrypt.trade](https://encrypt.trade/zec) com o **Chrome ou Firefox** e ligue a sua wallet **Phantom**, **Solflare** ou **Slope**. Certifique-se de que a sua wallet contém SOL suficiente para as taxas de gas e os tokens que pretende negociar. Depois de ligada, está pronto para envolver os seus ativos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passo 2: Encapsule seus tokens  
Navegue até a seção **Wrap**. Escolha **SOL** ou **USDC**, insira o valor e confirme. O app bloqueia seus ativos e emite **versões criptografadas (eSOL ou eUSDC)**. Encapsular um valor diferente daquele que você converte dificulta vincular os dois pelo valor, mas não oculta que sua carteira usou o app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passo 3: Prepare sua carteira ZODL  
Baixe a [**ZODL**](https://zodl.com), a carteira Zcash mantida pela ZODL. Na tela Receber, copie seu **Endereço transparente do Zcash** (ele começa com t1). No momento, encrypt.trade não aceita endereços blindados ou unificados para ZEC. Guarde sua frase semente com segurança antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passo 4: Converta  
De volta ao **encrypt.trade**, acesse **Swap**. Selecione **eSOL/eUSDC -> ZEC**, cole seu endereço transparente da ZODL, revise os detalhes e confirme.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** faz o roteamento cross-chain e envia o **ZEC** para sua carteira ZODL. Isso pode levar alguns minutos. NEAR Intents sugere reservar até 15 minutos para conversões cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passo 5: Blinde seu ZEC  
Assim que o ZEC chegar, use a opção **Shield** da ZODL para movê-lo para o [pool blindado](/using-zcash/shielded-pools). Até então, ele fica em um endereço transparente, onde qualquer pessoa pode ver o saldo. Blindar protege o que você fizer em seguida, mas a transferência recebida e a transação de blindagem permanecem visíveis na chain. Sempre verifique os links, evite reutilizar endereços e teste primeiro com valores pequenos.  

---

###  Quem está envolvido e onde obter ajuda  
- **encrypt.trade** é o app, operado pela JMD Labs Inc. Sua [política de privacidade](https://encrypt.trade/privacy) informa que ele coleta dados técnicos como IP, navegador e detalhes do dispositivo, envia o endereço da sua carteira, o histórico recente e os saldos a provedores de conformidade antes de uma conversão, e pode manter registros e resultados de verificações AML por até cinco anos. Seus [termos](https://encrypt.trade/terms) proíbem o uso de VPN ou proxy para ocultar sua localização. Suporte: help@encifher.io ou o grupo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) vinculado no app.
- **NEAR Intents** roteia a etapa cross-chain e entrega o ZEC. Consulte seus [termos da API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a política de privacidade em near.com/privacy, acompanhe conversões no [Explorador do NEAR Intents](https://explorer.near-intents.org) e peça ajuda no [Telegram do NEAR Intents](https://t.me/near_intents).

Os termos e os endereços compatíveis podem mudar, portanto verifique as versões atuais antes de uma grande conversão. Para saber mais sobre o cenário mais amplo, consulte [Corretoras não custodiantes](/using-zcash/non-custodial-exchanges).

---

Ao combinar **Solana**, **Zcash** e **NEAR Intents**, **encrypt.trade** oferece uma rota rápida de SOL ou USDC para ZEC. Ele oculta valores na Solana, mas não é privado de ponta a ponta, portanto blinde seu ZEC assim que ele chegar.
