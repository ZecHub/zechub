# **Como trocar por ZEC na Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Já tem ZEC na Solana (por exemplo, de um token que paga aos detentores em ZEC)? Não o troque. Mova esse token para uma carteira Zcash protegida com [Tem ZEC na Solana? Mova-o para Zcash protegido](/using-zcash/solana-zec-to-shielded).

---

## **ZEC nativo ou um token ZEC?**

"ZEC" na Phantom pode referir-se a dois ativos diferentes, por isso saiba qual está a pagar.

- O **botão Swap integrado da Phantom** dá-lhe uma representação em token de ZEC na Solana (ou noutra rede suportada pela Phantom). Não é ZEC nativo. Fica no seu endereço Phantom, não tem funcionalidade blindada de Zcash e uma wallet Zcash não consegue vê-lo nem blindá-lo.
- O ZEC **nativo** existe apenas na blockchain Zcash e é enviado para um endereço Zcash. Para o obter, precisa de um serviço que peça o seu endereço Zcash, como uma troca dentro de [ZODL](https://zodl.com), uma das opções na página [DEX](/dex), ou solswap.org seguido de um levantamento para a sua wallet Zcash (Passo 8).

### Verifique antes de pagar

- **Rede:** o ZEC que recebe deve estar na rede **Zcash**. Se indicar Solana, Ethereum ou Base, é um token.
- **Ativo:** o ZEC nativo não tem contrato de token nem endereço de mint. Se o seu apresentar um, é um token. Há também muitos tokens "ZEC" semelhantes na Solana, por isso não se guie apenas pelo nome. O token OmniBridge na Solana é `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; continua a ser um token, não ZEC nativo.
- **Endereço:** o ZEC nativo é enviado para um endereço Zcash, que começa por `t1`, `u1` ou `zs`. Se o ZEC estiver a ser enviado para o seu endereço Phantom, está a receber um token.

---

##  **Passo 1: Abra a interface de Swap**
Abra a **aplicação Phantom** e aceda a **[solswap.org](https://solswap.org/)** através do navegador Phantom. Introduza o endereço manualmente. O site funciona em NEAR Intents e pode enviar ZEC para um endereço Zcash.

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

##  **Passo 3: Introduzir montante e rever cotação**
- Introduza o montante que pretende trocar.
- Utilize o montante a receber apresentado em **solswap.org**. Essa cotação é a aplicável nesta rota.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passo 4: Verificar Gas & Taxas**
- Mantenha uma quantidade suficiente do token de gas da cadeia de origem em Phantom para aprovar o depósito (*SOL* na Solana, *ETH* na Ethereum).
- Leia a linha de taxas na cotação do solswap antes de confirmar. O Swap integrado da Phantom utiliza a sua própria tabela de taxas (historicamente, uma taxa de Phantom de 0,85%, além do gas da rede e de uma taxa de bridge). Esses valores não se aplicam a um depósito em solswap.org.

---

##  **Passo 5: Ajustar definições (opcional)**
Em solswap.org, reveja a tolerância ao deslizamento e o mínimo cotado a receber nesse ecrã antes de depositar.

Se estiver, em alternativa, na página **Swap** do próprio Phantom, está na rota de tokens a partir do topo desta página. Feche-a e abra `solswap.org` no navegador do Phantom.

---

##  **Passo 6: Confirmar Swap**
- Reveja todos os detalhes do swap em solswap.org.
- Confirme o depósito em Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passo 7: Monitorizar o estado**
- Acompanhe o depósito na atividade do solswap.org até que seja apresentado como **Concluído**.
- O ID da transação da Solana ou da cadeia de origem encontra-se nessa linha de atividade e no explorador da cadeia dessa rede.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passo 8: Levante ZEC nativo para a sua wallet Zcash**
Após a troca, o seu ZEC aparece no saldo da sua **Conta** solswap.org. Ainda não está na rede Zcash, nem está em Phantom.

1. Abra uma wallet Zcash que o [diretório](/wallets) assinale como **Ironwood: Pronta**. Copie um `u1` que a sua wallet identifique como blindado. Um `t1` também funciona, mas esse depósito é público até o blindar.
2. Em solswap.org, vá a **Conta** e toque em **Levantar**. Escolha **ZEC**, defina a rede como **Zcash**, cole o endereço e verifique o primeiro e o último caráter antes de confirmar.
3. Se **Montante recebido** e **Taxa** permanecerem em "–" e o botão não fizer nada, o saldo não foi perdido. Está em NEAR Intents sob a sua chave Phantom. Conclua em [near.com](https://near.com): inicie sessão com a mesma wallet Phantom, abra **Mover ativos antigos**, toque em **Levantar** na linha ZEC (não em **Mover**), defina a rede como **Zcash** e cole o mesmo `u1`. Phantom pedir-lhe-á para **Assinar mensagem**. Confirme apenas se o pedido vier de `near.com` e a mensagem mencionar `"verifying_contract": "intents.near"`. Os ecrãs completos para essa solução alternativa estão em [Tem ZEC na Solana? Transfira-o para Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **Próximos Passos**
Assim que o ZEC nativo estiver na sua carteira Zcash, mantenha-o protegido com [Utilizar ZEC de forma privada](/guides/using-zec-privately).

Um token ZEC comprado com o botão Swap da Phantom não pode ser protegido a partir de Phantom. Esse token é o ativo OmniBridge na Solana. Transfira-o com [Tem ZEC na Solana? Transfira-o para Zcash protegidos](/using-zcash/solana-zec-to-shielded).
