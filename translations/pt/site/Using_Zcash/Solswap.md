# **Como fazer conversão para ZEC na Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Já tem ZEC na Solana (por exemplo, de um token que paga aos detentores em ZEC)? Não faça a conversão. Mova esse token para uma carteira Zcash blindada com [Tem ZEC na Solana? Mova-o para o Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **ZEC nativo ou um token ZEC?**

"ZEC" na Phantom pode se referir a dois ativos diferentes, então saiba pelo que você está pagando.

- O **botão de conversão integrado da Phantom** oferece a você uma representação em token de ZEC na Solana (ou em outra rede compatível com a Phantom). Não é ZEC nativo. Ele permanece no seu endereço da Phantom, não tem funcionalidade blindada do Zcash e uma carteira Zcash não consegue vê-lo nem blindá-lo.
- O ZEC **nativo** existe apenas na blockchain do Zcash e é enviado para um endereço Zcash. Para recebê-lo, você precisa de um serviço que solicite seu endereço Zcash, como uma conversão dentro da [ZODL](https://zodl.com), uma das opções na página [DEX](/dex), ou solswap.org seguido de um saque para sua carteira Zcash (Passo 8).

### Verifique antes de pagar

- **Rede:** o ZEC que você recebe deve estar na rede **Zcash**. Se indicar Solana, Ethereum ou Base, é um token.
- **Ativo:** o ZEC nativo não tem contrato de token nem endereço de mint. Se o seu ZEC apresentar um, é um token. Há também muitos tokens "ZEC" semelhantes na Solana, então não se guie apenas pelo nome. O token OmniBridge na Solana é `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; continua sendo um token, não ZEC nativo.
- **Endereço:** o ZEC nativo é enviado para um endereço Zcash, que começa com `t1`, `u1` ou `zs`. Se o ZEC estiver sendo enviado para o seu endereço da Phantom, você está recebendo um token.

---

##  **Passo 1: Abra a interface de conversão**
Abra o **aplicativo Phantom** e acesse a **[solswap.org](https://solswap.org/)** pelo navegador da Phantom. Digite o endereço manualmente. O site funciona com NEAR Intents e pode enviar ZEC para um endereço Zcash.

O próprio botão **Swap** da Phantom também lista ZEC, mas oferece o token descrito acima, e não ZEC nativo.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Passo 2: Selecione redes e tokens para depósito**  
- Escolha sua **rede de origem** (por exemplo, *Ethereum* ou *Solana*) e depois faça o depósito para conversão.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Selecione um token base como **SOL, USDT ou USDC**.  
- Escolha ZEC como seu **token de destino**.  
- Certifique-se de que o Zcash está disponível pela interface de conversão.  



![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **Passo 3: Insira o valor e revise a cotação**
- Insira o valor que deseja converter.
- Use o valor a receber exibido em **solswap.org**. Essa cotação é a aplicável nesta rota.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passo 4: Verifique gas e taxas**
- Mantenha uma quantidade suficiente do token de gas da chain de origem na Phantom para aprovar o depósito (*SOL* na Solana, *ETH* na Ethereum).
- Leia a linha de taxas na cotação da solswap antes de confirmar. O Swap integrado da Phantom usa sua própria tabela de taxas (historicamente, uma taxa da Phantom de 0,85%, além do gas da rede e de uma taxa de bridge). Esses valores não se aplicam a um depósito em solswap.org.

---

##  **Passo 5: Ajuste as configurações (opcional)**
Em solswap.org, revise a tolerância ao deslizamento e o mínimo cotado a receber nessa tela antes de fazer o depósito.

Se você estiver, em vez disso, na página **Swap** da própria Phantom, está na rota de tokens do início desta página. Feche-a e abra `solswap.org` no navegador da Phantom.

---

##  **Passo 6: Confirme a conversão**
- Revise todos os detalhes da conversão em solswap.org.
- Confirme o depósito na Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passo 7: Monitore o status**
- Acompanhe o depósito na atividade da solswap.org até que seja exibido como **Concluído**.
- O ID da transação da Solana ou da chain de origem está nessa linha de atividade e no explorador da chain dessa rede.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passo 8: Saque ZEC nativo para sua carteira Zcash**
Após a conversão, seu ZEC aparece no saldo da sua **Conta** da solswap.org. Ele ainda não está na blockchain do Zcash, nem na Phantom.

1. Abra uma carteira Zcash que o [diretório](/wallets) indique como **Ironwood: Pronta**. Copie um `u1` que sua carteira identifique como blindado. Um `t1` também funciona, mas esse depósito é público até que você o blinde.
2. Em solswap.org, vá em **Conta** e toque em **Sacar**. Escolha **ZEC**, defina a rede como **Zcash**, cole o endereço e verifique o primeiro e o último caractere antes de confirmar.
3. Se **Valor recebido** e **Taxa** permanecerem em "–" e o botão não fizer nada, o saldo não foi perdido. Ele está em NEAR Intents sob sua chave da Phantom. Conclua em [near.com](https://near.com): faça login com a mesma carteira Phantom, abra **Mover ativos antigos**, toque em **Sacar** na linha ZEC (não em **Mover**), defina a rede como **Zcash** e cole o mesmo `u1`. A Phantom solicitará que você **Assine a mensagem**. Confirme apenas se a solicitação vier de `near.com` e a mensagem mencionar `"verifying_contract": "intents.near"`. As telas completas para essa alternativa estão em [Tem ZEC na Solana? Transfira-o para o Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **Próximos passos**
Assim que o ZEC nativo estiver na sua carteira Zcash, mantenha-o blindado com [Use ZEC de forma privada](/guides/using-zec-privately).

Um token ZEC comprado com o botão Swap da Phantom não pode ser blindado pela Phantom. Esse token é o ativo OmniBridge na Solana. Transfira-o com [Tem ZEC na Solana? Transfira-o para o Zcash blindado](/using-zcash/solana-zec-to-shielded).
