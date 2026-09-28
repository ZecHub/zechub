# **Troca de SOL/USDC -> ZEC com Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Troque de Solana para Zcash, com a etapa cross-chain encaminhada através de Near Intents.*  

---

###  Introdução  
[**encrypt.trade**](https://encrypt.trade/zec) é uma aplicação Solana gerida pela JMD Labs Inc. Permite trocar **SOL ou USDC** na Solana por **Zcash (ZEC)**. Os seus tokens são primeiro encapsulados em versões encriptadas, para que os montantes fiquem ocultos na Solana, e depois trocados por ZEC através de Near Intents.

A troca é privada de algumas formas, mas não de todas. A própria documentação da aplicação, [docs](https://docs.encifher.io/docs), indica que a sua interação com a blockchain não é anónima: as pessoas podem ver que a sua wallet usou a aplicação, mas não o montante que movimentou. O ZEC também chega a um endereço transparente, pelo que permanece visível na blockchain Zcash até que o proteja.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  O Que Deve Saber Antes de Trocar  
- **Lado da Solana.** O encapsulamento oculta os montantes, mas o endereço da sua wallet e a respetiva utilização da aplicação são públicos. As [melhores práticas](https://docs.encifher.io/docs/best-practices) avisam que um simples encapsulamento, troca e desencapsulamento torna a sua transação associável.
- **Encriptação.** Os saldos encriptados são processados off-chain dentro de um enclave de hardware (TEE). O [documento](https://eprint.iacr.org/2026/1504) dos programadores afirma que isto depende da integridade do TEE, de uma gestão honesta de chaves de limiar e da raiz de atestação da cloud, e não apenas da criptografia.
- **Etapa cross-chain.** A troca para ZEC é encaminhada através de Near Intents, onde solucionadores independentes executam a ordem.
- **Lado de Zcash.** Near Intents lista ZEC como suportado apenas para [endereços transparentes](https://docs.near-intents.org/resources/chain-support), e o campo ZEC no encrypt.trade apenas aceitava endereços transparentes (t1 ou t3) quando este guia foi verificado em setembro de 2026. Um endereço transparente mostra publicamente o seu saldo e transferências recebidas até que o proteja.
- **Triagem.** A aplicação verifica as wallets que se ligam à mesma em bases de dados como TRM e Chainalysis, e a sua [página de conformidade](https://docs.encifher.io/docs/compliance) afirma que os registos encriptados podem ser revistos se houver motivo legal legítimo. Near Intents também realiza a sua própria [triagem](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passo 1: Ligue a Sua Wallet Solana  
Visite [encrypt.trade](https://encrypt.trade/zec) com o **Chrome ou Firefox** e ligue a sua wallet **Phantom**, **Solflare** ou **Slope**. Certifique-se de que a sua wallet contém SOL suficiente para as taxas de gas e os tokens que pretende negociar. Depois de ligada, está pronto para encapsular os seus ativos.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passo 2: Encapsule os Seus Tokens  
Navegue até à secção **Wrap**. Escolha **SOL** ou **USDC**, introduza o montante e confirme. A aplicação bloqueia os seus ativos e emite **versões encriptadas (eSOL ou eUSDC)**. Encapsular um montante diferente daquele que troca dificulta a associação dos dois pelo montante, mas não oculta que a sua wallet usou a aplicação.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passo 3: Prepare a Sua Wallet ZODL  
Descarregue [**ZODL**](https://zodl.com), a wallet Zcash mantida por ZODL. No ecrã Receber, copie o seu **Endereço Transparente Zcash** (começa por t1). Atualmente, o encrypt.trade não aceita endereços protegidos ou unificados para ZEC. Guarde a sua frase-semente em segurança antes de continuar.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passo 4: Troque  
De volta ao **encrypt.trade**, aceda a **Swap**. Selecione **eSOL/eUSDC -> ZEC**, cole o seu endereço transparente ZODL, reveja os detalhes e confirme.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** trata do encaminhamento cross-chain e envia o **ZEC** para a sua wallet ZODL. Pode demorar alguns minutos. Near Intents sugere permitir até 15 minutos para trocas cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passo 5: Proteja o Seu ZEC  
Quando o ZEC chegar, utilize a opção **Shield** de ZODL para o mover para a [pool protegida](/using-zcash/shielded-pools). Até lá, permanece num endereço transparente, onde qualquer pessoa pode ver o saldo. A proteção resguarda o que fizer a seguir, mas a transferência recebida e a transação de proteção continuam visíveis na blockchain. Verifique sempre as ligações, evite reutilizar endereços e teste primeiro com montantes pequenos.  

---

###  Quem Está Envolvido e Onde Obter Ajuda  
- **encrypt.trade** é a aplicação, gerida pela JMD Labs Inc. A sua [política de privacidade](https://encrypt.trade/privacy) afirma que recolhe dados técnicos, como IP, detalhes do navegador e do dispositivo, envia o endereço da sua wallet, histórico recente e saldos a fornecedores de conformidade antes de uma troca, e pode conservar registos e resultados de triagem AML durante até cinco anos. Os seus [termos](https://encrypt.trade/terms) proíbem a utilização de uma VPN ou proxy para ocultar a sua localização. Apoio: help@encifher.io ou o grupo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) ligado a partir da aplicação.
- **Near Intents** encaminha a etapa cross-chain e entrega o ZEC. Consulte os seus [termos da API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a política de privacidade em near.com/privacy, acompanhe as trocas no [Explorador Near Intents](https://explorer.near-intents.org) e peça ajuda no [Near Intents Telegram](https://t.me/near_intents).

Os termos e endereços suportados podem mudar, pelo que deve consultar as versões atuais antes de uma grande troca. Para mais informação sobre o contexto mais amplo, consulte [Exchanges Não-Custodiais](/using-zcash/non-custodial-exchanges).

---

Ao combinar **Solana**, **Zcash** e **Near Intents**, o **encrypt.trade** oferece-lhe uma via rápida de SOL ou USDC para ZEC. Oculta os montantes na Solana, mas não é privado de ponta a ponta, por isso proteja o seu ZEC assim que chegar.
