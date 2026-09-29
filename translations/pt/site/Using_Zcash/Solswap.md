# **Como trocar por ZEC na Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **ZEC nativo ou um token ZEC?**

"ZEC" na Phantom pode referir-se a dois ativos diferentes, por isso saiba qual está a pagar.

- O **botão Swap integrado da Phantom** dá-lhe uma representação em token de ZEC na Solana (ou noutra rede suportada pela Phantom). Não é ZEC nativo. Fica no seu endereço Phantom, não tem funcionalidade blindada de Zcash e uma wallet Zcash não consegue vê-lo nem blindá-lo.
- O ZEC **nativo** existe apenas na blockchain Zcash e é enviado para um endereço Zcash. Para o obter, precisa de um serviço que peça o seu endereço Zcash, como uma troca dentro de [ZODL](https://zodl.com), uma das opções na página [DEX](/dex), ou solswap.org seguido de um levantamento para a sua wallet Zcash (Passo 8).

### Verifique antes de pagar

- **Rede:** o ZEC que recebe deve estar na rede **Zcash**. Se disser Solana, Ethereum ou Base, é um token.
- **Ativo:** o ZEC nativo não tem contrato de token nem endereço de mint. Se o seu mostrar um, é um token. Também há muitos tokens "ZEC" parecidos na Solana, por isso não se guie apenas pelo nome.
- **Endereço:** o ZEC nativo vai para um endereço Zcash, que começa por `t1`, `u1` ou `zs`. Se o ZEC estiver a ser enviado para o seu endereço Phantom, está a receber um token.

---

##  **Passo 1: Abrir a interface de Swap**  
Abra a **app Phantom** e visite **[solswap.org](https://solswap.org/)** a partir do navegador Phantom. O site funciona em Near Intents e pode enviar ZEC para um endereço Zcash.  

O próprio botão **Swap** da Phantom também lista ZEC, mas obtém o token descrito acima, e não ZEC nativo.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Passo 2: Selecionar redes e tokens para depósito**  
- Escolha a sua **rede de origem** (por exemplo, *Ethereum* ou *Solana*) e depois deposite para trocar.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Selecione um token base como **SOL, USDT ou USDC**.  
- Escolha ZEC como o seu **token de destino**.  
- Certifique-se de que Zcash está disponível através da interface de troca.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Passo 3: Introduzir o montante e rever a cotação**  
- Introduza o montante que pretende trocar.  
- A Phantom apresentará um **montante estimado a receber** após as taxas.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passo 4: Verificar gas e taxas**  
- Para **trocas na mesma cadeia**, certifique-se de que tem token de gas nativo suficiente (*ETH para Ethereum, SOL para Solana*).  
- As **trocas entre cadeias** requerem gas tanto nas cadeias de origem como de destino.  
- Reveja a discriminação das taxas:  
  - Taxa da Phantom: **0,85%**  
  - Gas da rede  
  - Taxas do fornecedor de bridge (~**0,3%**)  
  
  
---

##  **Passo 5: Ajustar definições (opcional)**  
Toque em **Swap Settings** para:  
- Ajustar a **slippage** (predefinição de **0,3%**, ajustável até 30%).  
- Aumentar as **taxas de prioridade** em redes congestionadas.  

---

##  **Passo 6: Confirmar a troca**  
- Reveja todos os detalhes da troca.  
- Toque em **Swap Now** para iniciar a transação.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passo 7: Monitorizar o estado**  
- Acompanhe a sua troca no separador **Recent Activity**.  
- Para trocas entre cadeias, utilize o seu **ID da transação** com o **Li.Fi Scanner** para atualizações em tempo real. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passo 8: Levantar ZEC nativo para a sua wallet Zcash**  
Depois da troca, o seu ZEC aparece no saldo da **Account** do solswap.org. Ainda não está na rede Zcash, nem está na Phantom. Para o mover:  
- Abra uma wallet Zcash, como [ZODL](https://zodl.com), e copie o seu endereço de receção. O formulário de levantamento aceita um endereço transparente (`t1`) ou unificado (`u1`).  
- No solswap.org, vá a **Account** e toque em **Withdraw**.  
- Escolha **ZEC**, defina a rede como **Zcash**, cole o seu endereço e confirme-o cuidadosamente antes de confirmar.  

---

## **Próximos passos**  
Quando o ZEC nativo estiver na sua wallet Zcash, pode blindá-lo com [este guia](/guides/using-zec-privately).  

Um token ZEC comprado com o botão Swap da Phantom não pode ser blindado desta forma, porque não está na rede Zcash. Primeiro, teria de o trocar por ZEC nativo enviado para um endereço Zcash.
