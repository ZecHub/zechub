<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Encaminhe o tráfego da carteira Zcash pela mixnet da Nym

> Última verificação: 29 de setembro de 2026

As transações blindadas do Zcash protegem os dados das transações on-chain, mas as carteiras continuam se comunicando pela internet. Observadores da rede podem potencialmente descobrir metadados, como seu endereço IP, quando sua carteira se conecta e qual infraestrutura ela contata.

A Nym adiciona uma camada separada de privacidade de rede. Em setembro de 2026, a melhor abordagem depende da carteira:

1. **Prefira a integração nativa com a Nym da carteira, quando ela existir.**
2. Caso contrário, use o **modo Mixnet do NymVPN no nível do sistema** para que o tráfego de rede da carteira seja encaminhado pela Nym sem depender de suporte a proxy específico da carteira.

Para informações gerais sobre VPN e dVPN, consulte [VPN & dVPN](./VPN_and_DVPN.md).

## O que a Nym adiciona — e o que ela não adiciona

Um pagamento blindado do Zcash e uma ferramenta de privacidade de rede resolvem problemas diferentes:

- Os **pools blindados do Zcash** protegem os detalhes das transações on-chain.
- O **encaminhamento pela mixnet da Nym** foi projetado para reduzir a possibilidade de associação entre sua identidade de rede real e o serviço que recebe o tráfego da carteira.
- Um destino contatado por meio de um túnel do NymVPN no nível do sistema deve ver uma saída da Nym em vez do seu IP residencial ou móvel.

A mixnet da Nym usa múltiplos saltos, mistura de pacotes, atrasos aleatorizados, tráfego de cobertura e criptografia onion para reduzir o vazamento de metadados de rede.

A Nym **não** protege contra um dispositivo comprometido, software malicioso de carteira, frases de recuperação expostas, identidade revelada por meio de contas em corretoras ou perda de privacidade causada por atividade transparente do Zcash.

## Suporte nativo da Nym: use esta opção primeiro quando disponível

A Nym anunciou em 24 de setembro de 2026 que seu trabalho de subsídio da Zcash Community Grants está concluído e que o suporte nativo à mixnet está sendo disponibilizado em carteiras reais do Zcash.

### Carteira Zingo!

O Zingo PC inclui um transporte nativo da Nym. O Zingo Mobile também disponibiliza o modo Mixnet no iOS e Android usando um proxy da Nym integrado ao app.

Comportamento atual documentado pela Zingo:

- O controle da Nym fica em **Configurações → Mixnet da Nym**.
- O envio de um pagamento é encaminhado pela mixnet.
- As transmissões de migração do Ironwood seguem o mesmo caminho de envio protegido.
- As solicitações de preço do ZEC também são encaminhadas pela mixnet.
- O envio falha de forma fechada enquanto a Nym estiver ativada: se o transporte da mixnet estiver indisponível, o pagamento não será enviado silenciosamente pela clearnet.
- **A sincronização da chain atualmente não é encaminhada pela mixnet** no Zingo PC. Os blocos compactos, consultas de nulificadores, obtenções de transações, tráfego de mempool e verificações de integridade do servidor continuam usando a conexão normal com o servidor.

Essa distinção é importante: a integração nativa da Zingo protege o caminho de transmissão com maior potencial de associação, mas ainda não é um túnel de rede para todo o dispositivo.

Se seu modelo de ameaça também exigir ocultar o tráfego de sincronização do servidor, use um túnel de privacidade no nível do sistema, como o NymVPN, além de compreender a latência e a complexidade adicionais que isso introduz.

Fontes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

A Nym informa que o **Zkool** agora permite conectar-se à infraestrutura RPC do Zcash pela mixnet da Nym usando uma opção nativa.

O Zkool é o sucessor do YWallet mantido ativamente. Seu projeto também oferece suporte a proxy Tor e serviços onion para conexões com servidores do Zcash.

Prefira a opção nativa da Nym no Zkool em vez de tentar forçar uma versão mais antiga do YWallet por um caminho de proxy não documentado.

Fontes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

O NozyWallet também tem caminhos de transporte compatíveis com a Nym. A implementação atual oferece suporte ao encaminhamento do envio de transações de saída pela mixnet da Nym e a um caminho dVPN separado da Nym para a sincronização de blocos compactos. Considere essas proteções distintas, em vez de presumir que todas as solicitações da carteira usam automaticamente a mixnet.

Fontes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

O Zodl atualmente tem a **Proteção Tor** integrada, que não é a mesma integração nativa da Nym descrita acima para Zingo, Zkool e Nozy.

O recurso Tor do Zodl pode encaminhar o envio de transações, a obtenção de dados de transações, solicitações de taxa de câmbio e chamadas de API de terceiros pelo Tor. A Nym declarou em 24 de setembro de 2026 que ainda está em conversa ativa com a equipe do Zodl sobre uma integração mais ampla com a mixnet.

Para o Zodl atualmente, use uma destas opções:

- a Proteção Tor documentada do Zodl, ou
- o NymVPN no nível do sistema, se seu objetivo for encaminhar o tráfego geral da carteira no dispositivo pela Nym.

Não presuma que Tor e Nym são transportes intercambiáveis dentro da carteira apenas porque ambos são redes de privacidade.

Configurações do Tor no Zodl:

**Mais → Recursos avançados → Beta: Proteção Tor → Ativar → Salvar alterações**

Fontes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN no nível do sistema

Esta é a opção da Nym mais amplamente compatível porque não exige que a carteira compreenda configurações de proxy específicas da Nym.

### 1. Instale o NymVPN

Baixe o NymVPN apenas do site oficial da Nym ou de uma loja oficial da plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

O NymVPN oferece suporte a Android, iOS, Linux, Windows e macOS.

### 2. Selecione o modo Mixnet

O NymVPN oferece o **modo rápido**, um caminho dVPN de 2 saltos otimizado para menor latência, e o **modo Mixnet**, um caminho de mixnet de 5 saltos otimizado para uma proteção mais forte dos metadados de rede. Para atividade sensível da carteira, selecione o modo Mixnet e aguarde até que o cliente informe que a conexão foi estabelecida antes de abrir ou atualizar a carteira.

### 3. Mantenha a carteira nas configurações normais de rede

Quando o sistema operacional já está encaminhando o tráfego pelo NymVPN, a maioria das carteiras não precisa de configurações personalizadas de proxy.

Abra a carteira normalmente e permita que ela sincronize.

Se o NymVPN oferecer split tunneling na sua plataforma, confirme que a carteira está **incluída no túnel protegido**, e não em uma lista de bypass ou exclusão.

### 4. Verifique o túnel antes de usar a carteira

Uma verificação simples no nível do sistema:

1. Desconecte o NymVPN.
2. Visite um serviço público de verificação de IP ou, no computador, execute:

   ```bash
   curl https://api.ipify.org
   ```

3. Anote o IP visível.
4. Conecte o NymVPN no modo Mixnet.
5. Repita a verificação.

O IP público visível deve mudar.

Isso confirma o túnel do sistema. **Não** prova que todas as solicitações feitas por uma determinada carteira seguem o mesmo caminho se o app ou o sistema operacional tiver regras especiais de roteamento.

Para maior segurança no computador:

- inspecione o processo da carteira com o monitor de rede do sistema operacional,
- verifique se não há uma exclusão de split tunnel,
- confirme que o comportamento esperado da carteira muda se o NymVPN for desconectado.

Não publique capturas de tela que contenham endereços de carteira, saldos, IDs de transações, endereços IP ou material de recuperação durante a solução de problemas.

## Modo de proxy para dApp / carteira do NymVPN

O NymVPN também oferece um modo de proxy para apps e carteiras que usa roteamento SOCKS5 / RPC pela mixnet.

A documentação pública de configuração da Nym demonstra isso principalmente com configuração RPC no estilo Ethereum. É útil para software que oferece suporte explícito a um caminho genérico compatível de proxy/RPC, mas **não** se deve presumir que funciona com todas as carteiras do Zcash.

Use esse caminho apenas quando a documentação da própria carteira confirmar suporte compatível a proxy ou RPC.

Caso contrário, prefira:

- a integração nativa da Nym na carteira, ou
- o NymVPN no nível do sistema.

## Compromissos entre desempenho e timeouts

As mixnets trocam intencionalmente velocidade por uma proteção mais forte dos metadados.

Espere possível impacto em:

- sincronização inicial da carteira,
- sincronizações extensas de atualização,
- consultas ao histórico de transações,
- timeouts de RPC,
- chamadas de API de terceiros.

Orientação prática:

- Comece com as configurações padrão da Nym.
- Espere que a primeira sincronização ou uma sincronização extensa de atualização demore mais.
- Tente novamente após um timeout antes de enfraquecer as configurações de privacidade.
- Evite mudar repetidamente os modos de privacidade imediatamente antes de uma transação sensível.
- Se você usar um caminho mais rápido para sincronização em massa, entenda que a infraestrutura contatada pode observar sua identidade de rede real durante esse período.
- Especificamente para o Zingo PC, lembre-se de que seu transporte nativo Nym atualmente protege os envios e a consulta de preços, enquanto a sincronização permanece direta.

## Considerações para dispositivos móveis

No Android e no iOS, a interface VPN do sistema operacional geralmente é a forma mais simples de encaminhar o tráfego geral da carteira pelo NymVPN: conecte-se primeiro ao NymVPN e depois abra a carteira.

Se outra VPN, firewall ou bloqueador de anúncios baseado em uma VPN local já estiver ocupando a interface VPN do sistema, os dois produtos poderão não conseguir funcionar simultaneamente. Confirme o status da VPN no sistema operacional antes de presumir que a carteira está protegida.

## Lista de verificação do modelo de ameaça

Antes de depender desta configuração, pergunte-se:

- Estou usando endereços Zcash blindados quando apropriado?
- Minha carteira tem suporte nativo ao Nym?
- Em caso afirmativo, qual tráfego exatamente essa integração nativa protege?
- Se precisar de cobertura mais ampla, o NymVPN está conectado antes de a carteira iniciar a atividade de rede?
- A carteira está excluída por uma regra de split tunneling?
- Estou dependendo de um modo proxy que a carteira realmente documenta?
- Estou vazando minha identidade por meio de uma corretora, sessão do navegador, API de terceiros ou endereço transparente?
- Estou preparado para uma sincronização mais lenta e timeouts ocasionais?

## Fontes

- Nym: Nym mixnet now live in Zcash wallets, September 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento do Nym no Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte Nym do Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositório Zkool: https://github.com/hhanh00/zkool2
- Trabalho de transporte Nym da NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Proteção Tor do Zodl: https://support.zodl.com/article/17-enabling-tor-protection
