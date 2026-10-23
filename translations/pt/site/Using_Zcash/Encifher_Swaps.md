# **Troca de SOL/USDC -> ZEC com Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Troque Solana por Zcash, com a etapa cross-chain encaminhada através de Near Intents.*  

---

###  Introdução  
[**encrypt.trade**](https://encrypt.trade/zec) é uma aplicação Solana operada pela JMD Labs Inc. Permite trocar **SOL ou USDC** na Solana por **Zcash (ZEC)**. Os seus tokens são primeiro envolvidos em versões encriptadas, para que os montantes fiquem ocultos na Solana, e depois trocados por ZEC através de Near Intents.

A troca é privada em alguns aspetos, mas não em todos. A própria documentação da aplicação, [docs](https://docs.encifher.io/docs), diz que a sua interação com a cadeia não é anónima: as pessoas podem ver que a sua wallet usou a aplicação, mas não quanto movimentou. O ZEC também chega a um endereço transparente, pelo que permanece visível na cadeia Zcash até o proteger.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  O Que Saber Antes de Trocar  
- **Lado da Solana.** O wrapping oculta montantes, mas o endereço da sua wallet e a utilização da aplicação são públicos. As suas [melhores práticas](https://docs.encifher.io/docs/best-practices) avisam que um simples wrap, swap e unwrap torna a sua transação associável.
- **Encriptação.** Os saldos encriptados são processados off-chain dentro de um enclave de hardware (TEE). O [artigo](https://eprint.iacr.org/2026/1504) dos desenvolvedores afirma que isto depende da integridade do TEE, de uma gestão honesta de chaves por limiar e da raiz de atestação da cloud, não apenas de criptografia.
- **Etapa cross-chain.** A troca para ZEC é encaminhada através de Near Intents, onde solvers independentes executam a ordem.
- **Lado Zcash.** Near Intents lista ZEC como suportado apenas para [endereços transparentes](https://docs.near-intents.org/resources/chain-support), e o campo ZEC no encrypt.trade apenas aceitava endereços transparentes (t1 ou t3) quando este guia foi verificado em setembro de 2026. Um endereço transparente mostra publicamente o seu saldo e as transferências recebidas até o proteger.
- **Verificação.** A aplicação verifica as wallets ligadas em bases de dados como TRM e Chainalysis, e a sua [página de conformidade](https://docs.encifher.io/docs/compliance) diz que os registos encriptados podem ser analisados se existir uma causa legal legítima. Near Intents também realiza a sua própria [verificação](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passo 1: Ligue a Sua Wallet Solana  
Visite [encrypt.trade](https://encrypt.trade/zec) com o **Chrome ou Firefox** e ligue a sua wallet **Phantom**, **Solflare** ou **Slope**. Certifique-se de que a sua wallet contém SOL suficiente para as taxas de gas e os tokens que pretende negociar. Depois de ligada, está pronto para envolver os seus ativos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passo 2: Envolva os Seus Tokens  
Navegue até à secção **Wrap**. Escolha **SOL** ou **USDC**, introduza o montante e confirme. A aplicação bloqueia os seus ativos e emite **versões encriptadas (eSOL ou eUSDC)**. Envolver um montante diferente daquele que troca torna mais difícil associar os dois pelo montante, mas não oculta que a sua wallet usou a aplicação.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passo 3: Prepare a Sua Wallet ZODL  
Descarregue [**ZODL**](https://zodl.com), a wallet Zcash mantida por ZODL. No ecrã Receber, copie o seu **Endereço Transparente Zcash** (começa por t1). Atualmente, encrypt.trade não aceita endereços protegidos ou unificados para ZEC. Guarde a sua frase-semente em segurança antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passo 4: Troque  
De volta ao **encrypt.trade**, vá a **Swap**. Selecione **eSOL/eUSDC -> ZEC**, cole o seu endereço transparente ZODL, reveja os detalhes e confirme.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** trata do encaminhamento cross-chain e envia o **ZEC** para a sua wallet ZODL. Pode demorar alguns minutos. Near Intents sugere reservar até 15 minutos para trocas cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passo 5: Proteja o Seu ZEC  
Assim que o ZEC chegar, use a opção **Shield** de ZODL para o mover para a [shielded pool](/using-zcash/shielded-pools). Até então, permanece num endereço transparente, onde qualquer pessoa pode ver o saldo. A proteção resguarda o que fizer a seguir, mas a transferência recebida e a transação de proteção continuam visíveis na cadeia. Verifique sempre as ligações, evite reutilizar endereços e teste primeiro com montantes pequenos.  

---

###  Quem Está Envolvido e Onde Obter Ajuda  
- **encrypt.trade** é a aplicação, operada pela JMD Labs Inc. A sua [política de privacidade](https://encrypt.trade/privacy) afirma que recolhe dados técnicos como IP, browser e detalhes do dispositivo, envia o endereço da sua wallet, o histórico recente e os saldos a fornecedores de conformidade antes de uma troca, e pode guardar registos e resultados de verificações AML por até cinco anos. Os seus [termos](https://encrypt.trade/terms) proíbem a utilização de uma VPN ou proxy para ocultar a sua localização. Suporte: help@encifher.io ou o grupo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) com ligação na aplicação.
- **Near Intents** encaminha a etapa cross-chain e entrega o ZEC. Consulte os seus [termos da API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a política de privacidade em near.com/privacy, acompanhe trocas no [Explorador Near Intents](https://explorer.near-intents.org) e peça ajuda no [Near Intents Telegram](https://t.me/near_intents).

Os termos e os endereços suportados podem mudar, por isso verifique as versões atuais antes de uma grande troca. Para mais informações sobre o panorama mais amplo, consulte [Exchanges Não-Custodiais](/using-zcash/non-custodial-exchanges).

---

Ao combinar **Solana**, **Zcash** e **Near Intents**, **encrypt.trade** oferece-lhe uma via rápida de SOL ou USDC para ZEC. Oculta os montantes na Solana, mas não é privada de ponta a ponta, por isso proteja o seu ZEC assim que chegar.
