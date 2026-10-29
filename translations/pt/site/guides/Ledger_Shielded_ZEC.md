# Guia do usuário do Ledger Shielded ZEC

Em 23 de setembro de 2026, a Ledger adicionou ZEC blindado nativo ao Ledger Wallet Desktop. Uma conta do Zcash agora tem um saldo transparente e um saldo privado no pool Ironwood do Zcash. Suas chaves privadas permanecem no seu Ledger, e todas as transações são revisadas e assinadas no dispositivo.

**Apenas para desktop.** O anúncio da Ledger afirma que ZEC blindado está "disponível apenas no Ledger Wallet Desktop. O suporte para dispositivos móveis não está disponível neste momento, mas estará disponível em breve." O aplicativo para desktop apresenta o mesmo aviso. Verificado em 15 de outubro de 2026.

## Preparação

- Um dispositivo Ledger que execute o aplicativo Zcash: Nano S Plus, Nano X, Stax ou Flex. O aplicativo Zcash atual não foi criado para o Nano S original.
- Ledger Wallet Desktop 4.21 ou posterior, baixado apenas de [ledger.com](https://www.ledger.com). Este guia usou a versão 4.24.0.
- A versão mais recente do aplicativo Zcash no seu Ledger (3.9.4 quando este guia foi escrito).
- Uma pequena quantidade de ZEC para testar. Todos os passos abaixo foram realizados na mainnet com 0,001 ZEC. Cada transação tem uma pequena taxa de rede (0,00015 ZEC no nosso teste).
- Sua frase de recuperação de 24 palavras deve permanecer no papel. Nunca a digite em um computador nem a compartilhe.

## Guia passo a passo (Ledger Wallet Desktop)

**1. Instalar ou atualizar o aplicativo Zcash**
- Abra o Ledger Wallet, conecte e desbloqueie seu Ledger e abra **Meu Ledger**. Autorize a conexão no dispositivo.
- Procure **Zcash** no catálogo de aplicativos e clique em **Instalar**, ou em **Atualizar** se já estiver instalado.
- Abra o aplicativo Zcash no seu Ledger. A tela apresenta "O aplicativo Zcash está pronto". Deslize para a direita até **Informações do aplicativo** para verificar a versão.

**2. Adicionar uma conta Zcash**
- No Ledger Wallet, escolha **Adicionar conta**. Em **Selecionar ativo**, procure Zcash e escolha **Zcash (ZEC)**, não um token wrapped como Binance-Peg Zcash Token.
- Com o aplicativo Zcash aberto no seu Ledger, o Ledger Wallet encontra sua conta. Marque-a em **Selecionar as contas que você deseja adicionar** e clique em **Confirmar**.
- A página da conta apresenta **Saldo disponível**, **Saldo transparente** e **Saldo privado**, além de um botão **Ativar blindado**.

![Conta Zcash no Ledger Wallet Desktop mostrando o aviso exclusivo para desktop, os saldos transparente e privado e o botão "Enable shielded"](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Ativar o saldo privado**
- Clique em **Ativar blindado**. A janela **Ativar saldo privado do Zcash** tem quatro passos: Data de nascimento, UFVK, Dispositivo e Confirmação.
- **Data de nascimento:** para uma conta nova, mantenha a altura de nascimento na data de hoje. Marque "Esta conta recebeu ZEC blindado no passado" apenas se souber que isso aconteceu, pois a análise desde o bloco 0 pode demorar muito tempo.
- **UFVK e Dispositivo:** o Ledger Wallet solicita que seu Ledger exporte sua Full Viewing Key unificada (UFVK). Leia as telas no dispositivo e aprove. Se aparecer "Conexão com o dispositivo perdida", certifique-se de que o aplicativo Zcash está aberto, aprove rapidamente e clique em **Tentar novamente**.
- Quando vir **UFVK importada com sucesso**, clique em **Iniciar sincronização**. Quando a sincronização terminar, o botão muda para **Atualizar saldo** com um horário de "Última sincronização".
- A chave de visualização permanece no seu computador. Ela pode encontrar seus fundos blindados, mas não pode gastá-los.

![Janela Enable Zcash private balance mostrando a UFVK importada com sucesso e o botão Start sync](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Receber ZEC e verificar ambos os endereços no seu Ledger**
- Clique em **Receber** e escolha sua conta Zcash. O Ledger Wallet apresenta um **Endereço para Zcash 1** (transparente, começando por t1) e um **Endereço privado para Zcash 1** (começando por u1). Os endereços anteriores continuam válidos.
- Seu Ledger apresenta "Verificar endereços Zcash", o **Endereço privado** em duas páginas e depois o **Endereço público**. Compare todos os caracteres com a tela antes de compartilhar qualquer um dos endereços e confirme no dispositivo.
- Prefira o endereço privado; use o transparente apenas quando o remetente não oferecer outra opção.

![Janela Receber da Ledger Wallet mostrando o endereço transparente e o endereço privado do Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Telas do dispositivo Ledger: Verify Zcash addresses, Private address em duas páginas e, em seguida, Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Mover ZEC transparente para seu saldo privado**
- Clique em **Enviar**. Em **Transferência própria**, escolha **Enviar para saldo privado**.
- Digite um valor ou use 25%, 50%, 75% ou **Máximo**. Verifique a taxa de rede e clique em **Revisar**.
- No seu Ledger, avance pelas etapas: "Revisar transação para enviar ZEC", "Transferir do endereço público para o privado", o valor, o endereço de saída em duas páginas, a taxa e a altura de expiração. Verifique se o endereço de saída corresponde ao seu endereço privado do passo 4 e, em seguida, pressione ambos os botões em **Assinar transação**.
- O Ledger Wallet apresenta **Transação enviada**. Nos detalhes da transação, o tipo indica **Privada (Ironwood)**.
- O Ledger Wallet informa que uma transferência própria associa seus fundos blindados ao seu endereço público. Receber diretamente no seu endereço privado mantém esses fundos desvinculados.

![Janela Send ZEC na Ledger Wallet com a opção de transferência própria Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Telas de revisão do dispositivo Ledger para mover ZEC do saldo transparente para o endereço privado, terminando com Sign transaction e Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Após a confirmação da transação, o saldo transparente diminui e o saldo privado aumenta. Os novos fundos blindados aparecem como "em maturação" até terem confirmações suficientes para serem gastos.

![Conta Zcash após a blindagem: saldo transparente reduzido, saldo privado aumentado e exibido como em maturação](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Enviar ZEC do seu saldo privado**
- Quando o saldo privado estiver disponível para uso, clique em **Enviar** e defina **Transferir de** como **Saldo privado**.
- Cole o endereço do destinatário e digite o valor. Você pode adicionar um **Memorando (opcional)** criptografado de até 512 bytes, que somente o destinatário pode ler.
- Verifique o destinatário, o valor e a taxa no seu Ledger e, em seguida, pressione ambos os botões em **Assinar transação**.

![Detalhes da transação enviada do saldo privado na Ledger Wallet](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Informações úteis

- ZEC blindado no Ledger está disponível apenas para desktop por enquanto (verificado em 15 de outubro de 2026).
- O saldo privado do Ledger Wallet usa o pool Ironwood.
- A Ledger diz que você pode compartilhar acesso somente de leitura ao seu histórico de transações com um consultor fiscal. Qualquer pessoa com sua chave de visualização pode ver seu histórico blindado, portanto compartilhe-a apenas intencionalmente.
- As telas do dispositivo neste guia foram capturadas com o emulador Speculos da Ledger (Nano S Plus) executando o aplicativo Zcash 3.9.4, conectado ao Ledger Wallet Desktop 4.24.0 na mainnet do Zcash. Um Ledger físico executa o mesmo aplicativo e apresenta as mesmas telas.

## Ajuda adicional

- [New in Ledger Wallet: Native Shielded Zcash Support](https://www.ledger.com/blog-native-shielded-zcash-support) (anúncio da Ledger)
- [Central de ajuda da Ledger](https://support.ledger.com)
- [Página de carteiras da ZecHub](/using-zcash/wallets)
- [Pools blindados](/using-zcash/shielded-pools) e [Chaves de visualização](/zcash-tech/viewing-keys) na ZecHub
- Outra opção de carteira de hardware: o [Guia do usuário do Keystone Zashi](/guides/keystone-zashi)
