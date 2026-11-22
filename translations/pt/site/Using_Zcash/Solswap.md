# **Como fazer uma conversão para ZEC na carteira Phantom**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Já tem ZEC na Solana (por exemplo, de um token que paga os detentores em ZEC)? Não faça a conversão. Mova esse token para uma carteira Zcash blindada com [Tem ZEC na Solana? Mova para Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **ZEC nativo ou um token ZEC?**

"ZEC" na Phantom pode significar dois ativos diferentes, então saiba qual deles você está comprando.

- **O botão de conversão integrado da Phantom** dá a você uma representação em token de ZEC na Solana (ou em outra rede compatível com a Phantom). Não é ZEC nativo. Ele fica no seu endereço Phantom, não tem nenhuma funcionalidade blindada do Zcash, e uma carteira Zcash não consegue vê-lo nem blindá-lo.
- **ZEC nativo** só existe na blockchain do Zcash e é enviado para um endereço Zcash. Para obtê-lo, você precisa de um serviço que peça o seu endereço Zcash, como uma conversão dentro de [ZODL](https://zodl.com), uma das opções da [página de DEX](/dex), ou o solswap.org seguido de um saque para a sua carteira Zcash (Passo 8).

### Verifique antes de pagar

- **Rede:** o ZEC que você recebe deve estar na rede **Zcash**. Se aparecer Solana, Ethereum ou Base, é um token.
- **Ativo:** o ZEC nativo não tem contrato de token nem endereço de mint. Se o seu mostra um, é um token. Também existem muitos tokens "ZEC" parecidos na Solana, então não se guie apenas pelo nome. O token OmniBridge na Solana é `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; ainda assim é um token, não ZEC nativo.
- **Endereço:** o ZEC nativo vai para um endereço Zcash, que começa com `t1`, `u1` ou `zs`. Se o ZEC estiver sendo enviado para o seu endereço Phantom, você está recebendo um token.

---

##  **Passo 1: Abra a interface de conversão**
Abra o **app Phantom** e acesse **[solswap.org](https://solswap.org/)** pelo navegador da Phantom. Digite o endereço você mesmo. O site funciona com NEAR Intents e pode enviar ZEC para um endereço Zcash.

O próprio botão **Swap** da Phantom também lista ZEC, mas isso dá a você o token descrito acima, não ZEC nativo.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Passo 2: Selecione as redes e os tokens para o depósito**
- Escolha a sua **rede de origem** (por exemplo, *Ethereum* ou *Solana*) e depois faça o depósito para a conversão.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Selecione um token base como **SOL, USDT ou USDC**.
- Escolha **ZEC** como o seu **token de destino**.
- Verifique se Zcash está disponível na interface de conversão.

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Passo 3: Insira o valor e revise a cotação**
- Insira o valor que você deseja converter.
- Use o valor a receber mostrado no **solswap.org**. Essa é a cotação que se aplica nesta rota.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passo 4: Verifique o gas e as taxas**
- Mantenha na Phantom uma quantidade suficiente do token de gas da chain de origem para aprovar o depósito (*SOL* na Solana, *ETH* na Ethereum).
- Leia a linha de taxas na cotação do solswap antes de confirmar. A conversão integrada da Phantom usa sua própria tabela de taxas (historicamente uma taxa de 0,85% da Phantom mais o gas da rede e uma taxa de bridge). Esses números não se aplicam a um depósito no solswap.org.

---

##  **Passo 5: Ajuste as configurações (opcional)**
No solswap.org, revise o slippage e o valor mínimo a receber cotado nessa tela antes de fazer o depósito.

Se, em vez disso, você estiver vendo a tela **Swap** da própria Phantom, você está na rota do token descrita no início desta página. Feche-a e abra o `solswap.org` no navegador da Phantom.

---

##  **Passo 6: Confirme a conversão**
- Revise todos os detalhes da conversão no solswap.org.
- Confirme o depósito na Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passo 7: Acompanhe o status**
- Acompanhe o depósito na atividade do solswap.org até que apareça **Completed**.
- O ID da transação Solana ou da chain de origem está nessa linha de atividade e no explorador da chain dessa rede.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passo 8: Saque o ZEC nativo para a sua carteira Zcash**
Após a conversão, o seu ZEC aparece no saldo da sua **Account** no solswap.org. Ele ainda não está na rede Zcash e também não está na Phantom.

1. Abra uma carteira Zcash que o [diretório](/wallets) marca como **Ironwood: Ready**. Copie um `u1` que a sua carteira identifica como blindado. Um `t1` também funciona, mas esse depósito fica público até que você o blinde.
2. No solswap.org, vá em **Account** e toque em **Withdraw**. Escolha **ZEC**, defina a rede como **Zcash**, cole o endereço e confira os primeiros e os últimos caracteres antes de confirmar.
3. Se **Received amount** e **Fee** continuarem em "–" e o botão não fizer nada, o saldo não foi perdido. Ele está no NEAR Intents sob a sua chave Phantom. Conclua em [near.com](https://near.com): entre com a mesma carteira Phantom, abra **Move legacy assets**, toque em **Withdraw** na linha de ZEC (não em **Move**), defina a rede como **Zcash** e cole o mesmo `u1`. A Phantom vai pedir que você clique em **Sign Message**. Confirme somente se a solicitação vier de `near.com` e a mensagem mencionar `"verifying_contract": "intents.near"`. As telas completas dessa solução alternativa estão em [Tem ZEC na Solana? Mova para Zcash blindado](/using-zcash/solana-zec-to-shielded).

---

## **Próximos passos**
Quando o ZEC nativo estiver na sua carteira Zcash, mantenha-o blindado com [Usando ZEC com privacidade](/guides/using-zec-privately).

Um token ZEC comprado com o botão Swap da Phantom não pode ser blindado a partir da Phantom. Esse token é o ativo OmniBridge na Solana. Mova-o com [Tem ZEC na Solana? Mova para Zcash blindado](/using-zcash/solana-zec-to-shielded).
