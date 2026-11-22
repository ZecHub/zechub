<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Roteie o tráfego da carteira Zcash pela Mixnet do Nym

> Última verificação: 29 de setembro de 2026

As transações blindadas do Zcash protegem os dados das transações on-chain, mas as carteiras ainda se comunicam pela internet. Observadores da rede podem potencialmente descobrir metadados como o seu endereço IP, quando a sua carteira se conecta e qual infraestrutura ela contata.

O Nym adiciona uma camada separada de privacidade de rede. Em setembro de 2026, a melhor abordagem depende da carteira:

1. **Prefira a integração nativa com o Nym da carteira, quando ela existir.**
2. Caso contrário, use o **modo Mixnet do NymVPN em nível de sistema**, para que o tráfego de rede da carteira seja roteado pelo Nym sem depender de suporte a proxy específico da carteira.

Para informações gerais sobre VPN e dVPN, consulte [VPN e dVPN](../Privacy_Tools/VPN_and_DVPN.md).

## O que o Nym adiciona e o que ele não faz

Um pagamento blindado no Zcash e uma ferramenta de privacidade de rede resolvem problemas diferentes:

- **As pools blindadas do Zcash** protegem os detalhes das transações on-chain.
- **O roteamento pela mixnet do Nym** foi projetado para reduzir a possibilidade de vincular a sua identidade real de rede ao serviço que recebe o tráfego da carteira.
- Um destino contatado por meio de um túnel NymVPN em nível de sistema deve ver uma saída do Nym em vez do IP da sua casa ou do seu celular.

A mixnet do Nym usa múltiplos saltos, mistura de pacotes, atrasos aleatórios, tráfego de cobertura e criptografia em camadas (onion) para reduzir o vazamento de metadados de rede.

O Nym **não** protege contra um dispositivo comprometido, software de carteira malicioso, frases de recuperação expostas, identidade que você revela por meio de contas em corretoras ou perda de privacidade causada por atividade transparente no Zcash.

## Suporte nativo ao Nym: use primeiro quando disponível

A Nym anunciou em 24 de setembro de 2026 que o seu trabalho financiado pelo Community Grant do Zcash foi concluído e que o suporte nativo à mixnet já está sendo entregue em carteiras Zcash reais.

### Carteira Zingo!

O Zingo PC inclui um transporte nativo do Nym. O Zingo Mobile também oferece o Modo Mixnet no iOS e no Android, usando um proxy Nym dentro do app.

Comportamento atual documentado pelo Zingo:

- O controle do Nym fica em **Configurações → Mixnet do Nym**.
- O envio de um pagamento é roteado pela mixnet.
- As transmissões de migração para Ironwood seguem o mesmo caminho de envio protegido.
- As solicitações de preço do ZEC também são roteadas pela mixnet.
- O envio falha de forma segura enquanto o Nym estiver ativado: se o transporte da mixnet não estiver disponível, o pagamento não é enviado silenciosamente pela clearnet.
- **A sincronização da chain atualmente não é roteada pela mixnet** no Zingo PC. Blocos compactos, consultas de nulificadores, buscas de transações, tráfego da mempool e verificações de integridade do servidor ainda usam a conexão normal com o servidor.

Essa distinção é importante: a integração nativa do Zingo protege o caminho de transmissão com maior risco de vinculação, mas ainda não é um túnel de rede para o dispositivo inteiro.

Se o seu modelo de ameaça também exigir ocultar o tráfego de sincronização do servidor, use um túnel de privacidade em nível de sistema, como o NymVPN, levando em conta a latência e a complexidade adicionais que isso introduz.

Fontes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

A Nym informa que o **Zkool** agora permite conectar-se à infraestrutura RPC do Zcash pela mixnet do Nym usando uma opção nativa.

O Zkool é o sucessor ativamente mantido do YWallet. O projeto também oferece suporte a proxy Tor e a serviços onion para conexões com servidores Zcash.

Prefira a opção nativa do Nym no Zkool em vez de tentar forçar uma versão mais antiga do YWallet por um caminho de proxy não documentado.

Fontes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

O NozyWallet também tem caminhos de transporte compatíveis com o Nym. A sua implementação atual permite rotear o envio de transações pela mixnet do Nym e um caminho separado de dVPN do Nym para a sincronização de blocos compactos. Trate essas proteções como distintas, em vez de presumir que toda solicitação da carteira usa automaticamente a mixnet.

Fontes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

O Zodl atualmente tem a **Proteção Tor** integrada, e não a mesma integração nativa com o Nym descrita acima para o Zingo, o Zkool e o Nozy.

O recurso Tor do Zodl pode rotear pelo Tor o envio de transações, a obtenção de dados de transações, as solicitações de taxas de câmbio e as chamadas a APIs de terceiros. O Nym declarou em 24 de setembro de 2026 que ainda está em conversas ativas com a equipe do Zodl sobre uma integração mais ampla com a mixnet.

Hoje, para o Zodl, use:

- a Proteção Tor documentada do Zodl, ou
- o NymVPN em nível de sistema, se o seu objetivo for rotear pelo Nym o tráfego geral do dispositivo da carteira.

Não presuma que o Tor e o Nym são transportes intercambiáveis dentro da carteira só porque ambos são redes de privacidade.

Configurações do Tor no Zodl:

**Mais → Recursos avançados → Beta: Proteção Tor → Ativar → Salvar alterações**

Fontes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN em nível de sistema

Esta é a opção Nym mais amplamente compatível, porque não exige que a carteira entenda configurações de proxy específicas do Nym.

### 1. Instale o NymVPN

Baixe o NymVPN somente do site oficial da Nym ou de uma loja oficial da plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

O NymVPN é compatível com Android, iOS, Linux, Windows e macOS.

### 2. Selecione o modo Mixnet

O NymVPN oferece o **modo Rápido**, um caminho de dVPN de 2 saltos otimizado para menor latência, e o **modo Mixnet**, um caminho de mixnet de 5 saltos otimizado para uma proteção mais forte de metadados de rede. Para atividades sensíveis na carteira, selecione o modo Mixnet e aguarde até que o cliente informe que a conexão foi estabelecida antes de abrir ou atualizar a carteira.

### 3. Deixe a carteira com as configurações de rede normais

Quando o sistema operacional já está tunelando o tráfego pelo NymVPN, a maioria das carteiras não precisa de configurações de proxy personalizadas.

Abra a carteira normalmente e deixe-a sincronizar.

Se o NymVPN oferecer tunelamento dividido na sua plataforma, confirme que a carteira está **incluída no túnel protegido**, e não colocada em uma lista de desvio ou exclusão.

### 4. Verifique o túnel antes de usar a carteira

Uma verificação simples em nível de sistema:

1. Desconecte o NymVPN.
2. Acesse um serviço público de verificação de IP ou, no desktop, execute:

   ```bash
   curl https://api.ipify.org
   ```

3. Anote o IP visível.
4. Conecte o NymVPN no modo Mixnet.
5. Repita a verificação.

O IP público visível deve mudar.

Isso confirma o túnel do sistema. Isso **não** prova que todas as solicitações feitas por uma determinada carteira seguem o mesmo caminho, caso o app ou o sistema operacional tenha regras de roteamento especiais.

Para ter mais garantia no desktop:

- inspecione o processo da carteira com o monitor de rede do sistema operacional,
- verifique se não há exclusão de tunelamento dividido,
- confirme que o comportamento esperado da carteira muda se o NymVPN for desconectado.

Não publique capturas de tela contendo endereços de carteira, saldos, IDs de transações, endereços IP ou material de recuperação durante a solução de problemas.

## Modo proxy de dApp / carteira do NymVPN

O NymVPN também oferece um modo proxy para apps e carteiras, usando roteamento SOCKS5 / RPC pela mixnet.

A documentação pública de configuração do Nym demonstra isso principalmente com configurações de RPC no estilo Ethereum. Ele é útil para softwares que oferecem suporte explícito a um caminho genérico de proxy/RPC compatível, mas **não** se deve presumir que funcione com todas as carteiras Zcash.

Use este caminho somente quando a própria documentação da carteira confirmar suporte compatível a proxy ou RPC.

Caso contrário, prefira:

- a integração nativa da carteira com o Nym, ou
- o NymVPN em nível de sistema.

## Compromissos entre desempenho e tempo limite

As mixnets sacrificam intencionalmente a velocidade em troca de uma proteção mais forte dos metadados.

Espere um possível impacto em:

- sincronização inicial da carteira,
- grandes sincronizações de atualização,
- consultas ao histórico de transações,
- tempos limite de RPC,
- chamadas a APIs de terceiros.

Orientações práticas:

- Comece com as configurações padrão do Nym.
- Espere que a primeira sincronização ou uma longa sincronização de atualização demore mais.
- Tente novamente após um tempo limite antes de enfraquecer as configurações de privacidade.
- Evite alternar repetidamente os modos de privacidade imediatamente antes de uma transação sensível.
- Se você usar um caminho mais rápido para a sincronização em massa, saiba que a infraestrutura contatada pode observar a sua identidade real de rede durante esse período.
- Especificamente no Zingo PC, lembre-se de que o seu transporte nativo do Nym atualmente protege os envios e a consulta de preços, enquanto a sincronização continua direta.

## Considerações para celulares

No Android e no iOS, o slot de VPN do sistema operacional costuma ser a forma mais simples de rotear o tráfego geral da carteira pelo NymVPN: conecte primeiro o NymVPN e depois abra a carteira.

Se outra VPN, firewall ou bloqueador de anúncios local baseado em VPN já ocupar a interface de VPN do sistema, os dois produtos talvez não consigam funcionar ao mesmo tempo. Confirme o status da VPN no sistema operacional antes de presumir que a carteira está protegida.

## Checklist do modelo de ameaça

Antes de confiar na configuração, pergunte-se:

- Estou usando endereços blindados do Zcash quando apropriado?
- A minha carteira tem suporte nativo ao Nym?
- Se tiver, exatamente qual tráfego essa integração nativa protege?
- Se eu precisar de uma cobertura mais ampla, o NymVPN está conectado antes de a carteira iniciar atividade de rede?
- A carteira está excluída por uma regra de tunelamento dividido?
- Estou confiando em um modo proxy que a carteira realmente documenta?
- Estou vazando a minha identidade por meio de uma corretora, sessão do navegador, API de terceiros ou endereço transparente?
- Estou preparado para uma sincronização mais lenta e tempos limite ocasionais?

## Fontes

- Nym: mixnet do Nym agora disponível em carteiras Zcash, 24 de setembro de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento do Nym no Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte Nym do Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositório do Zkool: https://github.com/hhanh00/zkool2
- Trabalho de transporte Nym do NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Proteção Tor do Zodl: https://support.zodl.com/article/17-enabling-tor-protection
