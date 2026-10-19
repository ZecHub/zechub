<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Encaminhe o Tráfego da Carteira Zcash pela Mixnet Nym

> Última verificação: 29 de setembro de 2026

As transações blindadas Zcash protegem os dados das transações on-chain, mas as carteiras continuam a comunicar pela internet. Os observadores de rede podem potencialmente saber metadados, como o seu endereço IP, quando a sua carteira se liga e que infraestrutura contacta.

Nym adiciona uma camada separada de privacidade de rede. Em setembro de 2026, a melhor abordagem depende da carteira:

1. **Prefira a integração nativa de Nym de uma carteira quando existir.**
2. Caso contrário, use o **modo Mixnet NymVPN a nível do sistema** para que o tráfego de rede da carteira seja encaminhado através de Nym sem depender de suporte de proxy específico da carteira.

Para informações gerais sobre VPN e dVPN, consulte [VPN & dVPN](./VPN_and_DVPN.md).

## O que Nym acrescenta — e o que não acrescenta

Um pagamento blindado Zcash e uma ferramenta de privacidade de rede resolvem problemas diferentes:

- As **pools blindadas Zcash** protegem os detalhes das transações on-chain.
- O **encaminhamento pela mixnet Nym** foi concebido para reduzir a possibilidade de associação entre a sua identidade de rede real e o serviço que recebe o tráfego da carteira.
- Um destino contactado através de um túnel NymVPN a nível do sistema deverá ver uma saída Nym em vez do seu IP doméstico/móvel.

A mixnet de Nym utiliza múltiplos saltos, mistura de pacotes, atrasos aleatorizados, tráfego de cobertura e encriptação onion para reduzir a fuga de metadados de rede.

Nym **não** protege contra um dispositivo comprometido, software de carteira malicioso, frases de recuperação expostas, identidade revelada através de contas de exchange ou perda de privacidade causada por atividade Zcash transparente.

## Suporte nativo de Nym: utilize primeiro esta opção quando disponível

Nym anunciou a 24 de setembro de 2026 que o seu trabalho de Community Grant Zcash está concluído e que o suporte nativo de mixnet está a ser disponibilizado em carteiras Zcash reais.

### Carteira Zingo!

Zingo PC inclui um transporte nativo Nym. Zingo Mobile também disponibiliza o Modo Mixnet em iOS e Android através de um proxy Nym integrado na aplicação.

Comportamento atual documentado por Zingo:

- O controlo Nym encontra-se em **Definições → Mixnet Nym**.
- O envio de um pagamento é encaminhado pela mixnet.
- As transmissões de migração Ironwood seguem o mesmo percurso de envio protegido.
- Os pedidos de preço ZEC também são encaminhados pela mixnet.
- O envio falha de forma fechada enquanto Nym estiver ativado: se o transporte da mixnet estiver indisponível, o pagamento não é enviado silenciosamente pela clearnet.
- **A sincronização da chain não é atualmente encaminhada pela mixnet** em Zingo PC. Os blocos compactos, consultas de nullifiers, obtenções de transações, tráfego de mempool e verificações de estado do servidor continuam a usar a ligação normal ao servidor.

Esta distinção é importante: a integração nativa de Zingo protege o percurso de difusão com maior potencial de associação, mas ainda não é um túnel de rede para todo o dispositivo.

Se o seu modelo de ameaça também exigir ocultar o tráfego de sincronização do servidor, use um túnel de privacidade a nível do sistema, como NymVPN, além de compreender a latência e complexidade adicionais que isso introduz.

Fontes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym informa que **Zkool** suporta agora a ligação à infraestrutura RPC Zcash através da mixnet Nym usando uma opção nativa.

Zkool é o sucessor mantido ativamente de YWallet. O seu projeto também suporta proxy Tor e serviços onion para ligações ao servidor Zcash.

Prefira a opção nativa Nym de Zkool em vez de tentar forçar uma versão mais antiga de YWallet através de um caminho de proxy não documentado.

Fontes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet também tem percursos de transporte compatíveis com Nym. A implementação atual suporta o encaminhamento do envio de transações de saída através da mixnet Nym e um percurso dVPN Nym separado para a sincronização de blocos compactos. Considere estas proteções distintas, em vez de presumir que todos os pedidos da carteira usam automaticamente a mixnet.

Fontes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl tem atualmente **Proteção Tor** integrada, que não é a mesma integração nativa Nym descrita acima para Zingo, Zkool e Nozy.

A funcionalidade Tor de Zodl pode encaminhar o envio de transações, a obtenção de dados de transações, pedidos de taxas de câmbio e chamadas de API de terceiros através de Tor. Nym declarou a 24 de setembro de 2026 que continua em conversação ativa com a equipa Zodl sobre uma integração mais ampla da mixnet.

Para Zodl atualmente, utilize uma destas opções:

- a Proteção Tor documentada de Zodl, ou
- NymVPN a nível do sistema, se o seu objetivo for encaminhar o tráfego geral da carteira no dispositivo através de Nym.

Não presuma que Tor e Nym são transportes intercambiáveis dentro da carteira apenas porque ambos são redes de privacidade.

Definições Zodl de Tor:

**Mais → Funcionalidades avançadas → Beta: Proteção Tor → Ativar → Guardar alterações**

Fontes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a nível do sistema

Esta é a opção Nym mais amplamente compatível porque não exige que a carteira compreenda definições de proxy específicas de Nym.

### 1. Instale NymVPN

Descarregue NymVPN apenas do site oficial de Nym ou de uma loja oficial da plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN suporta Android, iOS, Linux, Windows e macOS.

### 2. Selecione o modo Mixnet

NymVPN disponibiliza o **modo rápido**, um percurso dVPN de 2 saltos otimizado para menor latência, e o **modo Mixnet**, um percurso de mixnet de 5 saltos otimizado para uma proteção mais forte dos metadados de rede. Para atividade sensível da carteira, selecione o modo Mixnet e aguarde até o cliente indicar que a ligação foi estabelecida antes de abrir ou atualizar a carteira.

### 3. Mantenha a carteira nas definições normais de rede

Quando o sistema operativo já está a encaminhar o tráfego por NymVPN, a maioria das carteiras não necessita de definições de proxy personalizadas.

Abra a carteira normalmente e permita que sincronize.

Se NymVPN disponibilizar split tunneling na sua plataforma, confirme que a carteira está **incluída no túnel protegido**, e não colocada numa lista de contorno ou exclusão.

### 4. Verifique o túnel antes de utilizar a carteira

Uma verificação simples a nível do sistema:

1. Desligue NymVPN.
2. Visite um serviço público de verificação de IP ou, no computador, execute:

   ```bash
   curl https://api.ipify.org
   ```

3. Registe o IP visível.
4. Ligue NymVPN no modo Mixnet.
5. Repita a verificação.

O IP público visível deverá mudar.

Isto confirma o túnel do sistema. **Não** prova que todos os pedidos feitos por uma determinada carteira seguem o mesmo percurso se a aplicação ou o sistema operativo tiver regras especiais de encaminhamento.

Para maior segurança no computador:

- inspecione o processo da carteira com o monitor de rede do sistema operativo,
- verifique se não existe uma exclusão de split tunnel,
- confirme que o comportamento esperado da carteira muda se NymVPN for desligado.

Não publique capturas de ecrã que contenham endereços de carteira, saldos, IDs de transações, endereços IP ou material de recuperação durante a resolução de problemas.

## Modo proxy de dApp / carteira NymVPN

NymVPN também disponibiliza um modo proxy para aplicações e carteiras que usa encaminhamento SOCKS5 / RPC através da mixnet.

A documentação pública de configuração de Nym demonstra-o sobretudo com configuração RPC ao estilo Ethereum. É útil para software que suporta explicitamente um percurso genérico compatível de proxy/RPC, mas **não** se deve assumir que funciona com todas as carteiras Zcash.

Utilize este percurso apenas quando a documentação da própria carteira confirmar suporte compatível de proxy ou RPC.

Caso contrário, prefira:

- a integração nativa Nym da carteira, ou
- NymVPN a nível do sistema.

## Compromissos de desempenho e timeouts

As mixnets trocam intencionalmente velocidade por uma proteção mais forte dos metadados.

Espere um possível impacto em:

- sincronização inicial da carteira,
- sincronizações extensas de atualização,
- consultas ao histórico de transações,
- timeouts de RPC,
- chamadas de API de terceiros.

Orientação prática:

- Comece com as definições predefinidas de Nym.
- Espere que a primeira sincronização ou uma sincronização extensa de atualização demore mais tempo.
- Tente novamente após um timeout antes de enfraquecer as definições de privacidade.
- Evite mudar repetidamente os modos de privacidade imediatamente antes de uma transação sensível.
- Se utilizar um percurso mais rápido para sincronização em massa, compreenda que a infraestrutura contactada pode observar a sua identidade de rede real durante esse período.
- Especificamente para Zingo PC, lembre-se de que o seu transporte nativo Nym protege atualmente os envios e a consulta de preços, enquanto a sincronização permanece direta.

## Considerações para dispositivos móveis

Em Android e iOS, a interface VPN do sistema operativo é normalmente a forma mais simples de encaminhar o tráfego geral da carteira através de NymVPN: ligue primeiro NymVPN e, depois, abra a carteira.

Se outra VPN, firewall ou bloqueador de publicidade baseado numa VPN local já estiver a ocupar a interface VPN do sistema, os dois produtos podem não conseguir funcionar simultaneamente. Confirme o estado da VPN no sistema operativo antes de presumir que a carteira está protegida.

## Lista de verificação do modelo de ameaça

Antes de depender desta configuração, pergunte:

- Estou a usar endereços Zcash blindados quando apropriado?
- A minha carteira tem suporte nativo de Nym?
- Em caso afirmativo, que tráfego protege exatamente essa integração nativa?
- Se precisar de cobertura mais ampla, NymVPN está ligado antes de a carteira iniciar atividade de rede?
- A carteira está excluída por uma regra de split tunneling?
- Estou a depender de um modo proxy que a carteira realmente documenta?
- Estou a expor a minha identidade através de uma exchange, sessão do navegador, API de terceiros ou endereço transparente?
- Estou preparado para uma sincronização mais lenta e timeouts ocasionais?

## Fontes

- Nym: mixnet Nym agora disponível em carteiras Zcash, 24 de setembro de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento de Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte Nym do Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositório Zkool: https://github.com/hhanh00/zkool2
- Trabalho de transporte Nym de NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Proteção Tor de Zodl: https://support.zodl.com/article/17-enabling-tor-protection
