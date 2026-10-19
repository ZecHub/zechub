# Ledger Shielded ZEC Guia do Utilizador

A 23 de setembro de 2026, Ledger adicionou ZEC shielded nativo à Wallet Desktop da Ledger. Uma conta Zcash passa agora a ter um saldo transparente e um saldo privado no pool Ironwood da Zcash. As suas chaves privadas permanecem no seu Ledger, e todas as transações são revistas e assinadas no dispositivo.

**Apenas desktop.** O anúncio da Ledger afirma que ZEC shielded está "disponível apenas na Wallet Desktop da Ledger. O suporte móvel não está disponível neste momento, mas estará disponível em breve." A aplicação para desktop apresenta o mesmo aviso. Verificado em 15 de outubro de 2026.

## Preparação

- Um dispositivo Ledger que execute a aplicação Zcash: Nano S Plus, Nano X, Stax ou Flex. A atual aplicação Zcash não foi criada para o Nano S original.
- Wallet Desktop da Ledger 4.21 ou posterior, transferida apenas de [ledger.com](https://www.ledger.com). Este guia utilizou a versão 4.24.0.
- A versão mais recente da aplicação Zcash no seu Ledger (3.9.4 quando este guia foi escrito).
- Uma pequena quantidade de ZEC para testar. Todos os passos abaixo foram realizados na mainnet com 0.001 ZEC. Cada transação tem uma pequena taxa de rede (0.00015 ZEC no nosso teste).
- A sua frase de recuperação de 24 palavras deve permanecer em papel. Nunca a introduza num computador nem a partilhe.

## Guia Passo a Passo (Wallet Desktop da Ledger)

**1. Instalar ou atualizar a aplicação Zcash**
- Abra a Wallet da Ledger, ligue e desbloqueie o seu Ledger e abra **Os meus Ledger**. Autorize a ligação no dispositivo.
- Procure **Zcash** no catálogo de aplicações e clique em **Instalar**, ou em **Atualizar** se já estiver instalada.
- Abra a aplicação Zcash no seu Ledger. O ecrã apresenta "A aplicação Zcash está pronta". Desloque-se para a direita até **Informações da aplicação** para verificar a versão.

**2. Adicionar uma conta Zcash**
- Na Wallet da Ledger, escolha **Adicionar conta**. Em **Selecionar ativo**, procure Zcash e escolha **Zcash (ZEC)**, não um token wrapped como Binance-Peg Zcash Token.
- Com a aplicação Zcash aberta no seu Ledger, a Wallet da Ledger encontra a sua conta. Assinale-a em **Selecionar as contas que pretende adicionar** e clique em **Confirmar**.
- A página da conta apresenta **Saldo disponível**, **Saldo transparente** e **Saldo privado**, além de um botão **Ativar shielded**.

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Ativar o saldo privado**
- Clique em **Ativar shielded**. A janela **Ativar saldo privado de Zcash** tem quatro passos: Data de nascimento, UFVK, Dispositivo e Confirmação.
- **Data de nascimento:** para uma conta nova, mantenha a altura de nascimento na data de hoje. Assinale "Esta conta recebeu ZEC shielded no passado" apenas se souber que isso aconteceu, pois a análise desde o bloco 0 pode demorar muito tempo.
- **UFVK e Dispositivo:** a Wallet da Ledger pede ao seu Ledger para exportar a sua Unified Full Viewing Key (UFVK). Leia os ecrãs no dispositivo e aprove. Se aparecer "Ligação ao dispositivo perdida", certifique-se de que a aplicação Zcash está aberta, aprove prontamente e clique em **Tentar novamente**.
- Quando vir **UFVK importada com sucesso**, clique em **Iniciar sincronização**. Quando a sincronização terminar, o botão muda para **Atualizar saldo** com uma hora de "Última sincronização".
- A chave de visualização permanece no seu computador. Pode encontrar os seus fundos shielded, mas não pode gastá-los.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Receber ZEC e verificar ambos os endereços no seu Ledger**
- Clique em **Receber** e escolha a sua conta Zcash. A Wallet da Ledger apresenta um **Endereço para Zcash 1** (transparente, começando por t1) e um **Endereço privado para Zcash 1** (começando por u1). Os endereços anteriores continuam válidos.
- O seu Ledger apresenta "Verificar endereços Zcash", o **Endereço privado** em duas páginas e depois o **Endereço público**. Compare todos os caracteres com o ecrã antes de partilhar qualquer um dos endereços e confirme no dispositivo.
- Prefira o endereço privado; utilize o transparente apenas quando o remetente não suportar outra opção.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Mover ZEC transparente para o seu saldo privado**
- Clique em **Enviar**. Em **Transferência própria**, escolha **Enviar para saldo privado**.
- Introduza um montante ou utilize 25%, 50%, 75% ou **Máximo**. Verifique a taxa de rede e clique em **Rever**.
- No seu Ledger, avance pelas etapas: "Rever transação para enviar ZEC", "Transferir do endereço público para o privado", o montante, o endereço de saída em duas páginas, a taxa e a altura de expiração. Verifique se o endereço de saída corresponde ao seu endereço privado do passo 4 e, em seguida, prima ambos os botões em **Assinar transação**.
- A Wallet da Ledger apresenta **Transação enviada**. Nos detalhes da transação, o tipo indica **Privada (Ironwood)**.
- A Wallet da Ledger assinala que uma transferência própria associa os seus fundos shielded ao seu endereço público. Receber diretamente no seu endereço privado mantém-nos sem associação.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Depois de a transação ser confirmada, o saldo transparente diminui e o saldo privado aumenta. Os novos fundos shielded aparecem como "em maturação" até terem confirmações suficientes para serem gastos.

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Enviar ZEC a partir do seu saldo privado**
- Quando o saldo privado puder ser gasto, clique em **Enviar** e defina **Transferir de** como **Saldo privado**.
- Cole o endereço do destinatário e introduza o montante. Pode adicionar uma **Memo (opcional)** encriptada de até 512 bytes, que apenas o destinatário pode ler.
- Reveja o destinatário, o montante e a taxa no seu Ledger e, em seguida, prima ambos os botões em **Assinar transação**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Informação Útil

- ZEC shielded no Ledger está disponível apenas para desktop por enquanto (verificado em 15 de outubro de 2026).
- O saldo privado da Wallet da Ledger utiliza o pool Ironwood.
- A Ledger diz que pode partilhar acesso apenas de leitura ao seu histórico de transações com um consultor fiscal. Qualquer pessoa com a sua chave de visualização pode ver o seu histórico shielded, por isso partilhe-a apenas intencionalmente.
- Os ecrãs do dispositivo neste guia foram capturados com o emulador Speculos da Ledger (Nano S Plus) a executar a aplicação Zcash 3.9.4, ligado à Wallet Desktop da Ledger 4.24.0 na mainnet Zcash. Um Ledger físico executa a mesma aplicação e apresenta os mesmos ecrãs.

## Ajuda Adicional

- [Novidade na Wallet da Ledger: suporte nativo para Zcash Shielded](https://www.ledger.com/blog-native-shielded-zcash-support) (anúncio da Ledger)
- [Ledger Centro de Ajuda](https://support.ledger.com)
- [Página de Wallets da ZecHub](/using-zcash/wallets)
- [Pools Shielded](/using-zcash/shielded-pools) e [Chaves de Visualização](/zcash-tech/viewing-keys) na ZecHub
- Outra opção de hardware wallet: o [Keystone Guia do Utilizador Zashi](/guides/keystone-zashi)
