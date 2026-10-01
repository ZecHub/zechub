<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Página de Edihttps://github.com/ZecHub/zechub/pull/2238t"/>
</a>

# Encaminhar o Tráfego da Carteira Zcash pela Mixnet Nym

> Última verificação: 29 de setembro de 2026

As transações blindadas Zcash protegem os dados das transações on-chain, mas as carteiras continuam a comunicar pela internet. Observadores da rede podem potencialmente saber metadados como o seu endereço IP, quando a sua carteira se liga e que infraestrutura contacta.

A Nym acrescenta uma camada separada de privacidade de rede. Em setembro de 2026, a melhor abordagem depende da carteira:

1. **Prefira a integração Nym nativa de uma carteira, quando ela existir.**
2. Caso contrário, utilize o **modo Mixnet NymVPN ao nível do sistema** para que o tráfego de rede da carteira seja encaminhado pela Nym sem depender de suporte de proxy específico da carteira.

Para informações gerais sobre VPN e dVPN, consulte [VPN e dVPN](./VPN_and_DVPN.md).

## O que a Nym acrescenta — e o que não acrescenta

Um pagamento blindado Zcash e uma ferramenta de privacidade de rede resolvem problemas diferentes:

- Os **pools blindados Zcash** protegem os detalhes das transações on-chain.
- O **encaminhamento pela mixnet Nym** foi concebido para reduzir a capacidade de associar a sua identidade real de rede ao serviço que recebe o tráfego da carteira.
- Um destino contactado através de um túnel NymVPN ao nível do sistema deve ver uma saída Nym em vez do seu IP doméstico/móvel.

A mixnet da Nym utiliza vários saltos, mistura de pacotes, atrasos aleatórios, tráfego de cobertura e encriptação onion para reduzir a fuga de metadados de rede.

A Nym **não** protege contra um dispositivo comprometido, software de carteira malicioso, frases de recuperação expostas, identidade revelada através de contas de exchanges ou perda de privacidade causada por atividade transparente Zcash.

## Suporte Nym nativo: utilize-o primeiro quando estiver disponível

A Nym anunciou, em 24 de setembro de 2026, que o seu trabalho de Community Grant Zcash está concluído e que o suporte nativo à mixnet está a ser disponibilizado em carteiras Zcash reais.

### Carteira Zingo!

A Zingo PC inclui um transporte Nym nativo. A Zingo Mobile também disponibiliza o Modo Mixnet em iOS e Android, utilizando um proxy Nym integrado na aplicação.

Comportamento atual documentado por Zingo:

- O controlo Nym encontra-se em **Definições → Nym Mixnet**.
- O envio de um pagamento é encaminhado pela mixnet.
- As transmissões de migração Ironwood seguem o mesmo percurso de envio protegido.
- Os pedidos de preço ZEC também são encaminhados pela mixnet.
- O envio falha de forma fechada enquanto a Nym está ativada: se o transporte da mixnet não estiver disponível, o pagamento não é enviado silenciosamente pela clearnet.
- **A sincronização da cadeia não é atualmente encaminhada pela mixnet** em Zingo PC. Blocos compactos, consultas de anuladores, obtenções de transações, tráfego do mempool e verificações do estado do servidor continuam a utilizar a ligação normal ao servidor.

Esta distinção é importante: a integração nativa da Zingo protege o percurso de difusão com maior possibilidade de associação, mas ainda não é um túnel de rede para todo o dispositivo.

Se o seu modelo de ameaça também exigir ocultar o tráfego de sincronização do servidor, utilize um túnel de privacidade ao nível do sistema, como NymVPN, compreendendo também a latência e complexidade adicionais que isso introduz.

Fontes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

A Nym informa que a **Zkool** suporta agora a ligação à infraestrutura RPC Zcash pela mixnet Nym através de uma opção nativa.

A Zkool é a sucessora ativamente mantida da YWallet. O seu projeto também suporta proxy Tor e serviços onion para ligações ao servidor Zcash.

Prefira a opção Nym nativa da Zkool a tentar forçar uma versão mais antiga da YWallet através de um percurso de proxy não documentado.

Fontes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

A NozyWallet também possui percursos de transporte compatíveis com a Nym. A sua implementação atual suporta o encaminhamento do envio de transações de saída pela mixnet Nym e um percurso dVPN Nym separado para a sincronização de blocos compactos. Trate estas como proteções distintas, em vez de assumir que todos os pedidos da carteira utilizam automaticamente a mixnet.

Fontes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

A Zodl tem atualmente **Tor Protection** integrada, não a mesma integração Nym nativa descrita acima para Zingo, Zkool e Nozy.

A funcionalidade Tor da Zodl pode encaminhar o envio de transações, a obtenção de dados de transações, pedidos de taxas de câmbio e chamadas a API de terceiros através do Tor. A Nym declarou, em 24 de setembro de 2026, que ainda está em conversação ativa com a equipa da Zodl sobre uma integração mais ampla da mixnet.

Para a Zodl atualmente, utilize uma das seguintes opções:

- A Tor Protection documentada da Zodl, ou
- NymVPN ao nível do sistema, se o seu objetivo for encaminhar o tráfego geral do dispositivo da carteira através da Nym.

Não assuma que Tor e Nym são transportes intercambiáveis dentro da carteira apenas porque ambos são redes de privacidade.

Definições Tor da Zodl:

**Mais → Funcionalidades avançadas → Beta: Tor Protection → Ativar → Guardar alterações**

Fontes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN ao nível do sistema

Esta é a opção Nym mais amplamente compatível porque não exige que a carteira compreenda definições de proxy específicas da Nym.

### 1. Instalar NymVPN

Transfira NymVPN apenas do website oficial da Nym ou de uma loja oficial da plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

A NymVPN suporta Android, iOS, Linux, Windows e macOS.

### 2. Selecionar o modo Mixnet

A NymVPN disponibiliza o **modo Rápido**, um percurso dVPN de 2 saltos otimizado para menor latência, e o **modo Mixnet**, um percurso de mixnet de 5 saltos otimizado para maior proteção dos metadados de rede. Para atividade sensível da carteira, selecione o modo Mixnet e aguarde até o cliente indicar que a ligação foi estabelecida antes de abrir ou atualizar a carteira.

### 3. Manter a carteira nas definições normais de rede

Quando o sistema operativo já está a encaminhar o tráfego através de NymVPN, a maioria das carteiras não necessita de definições de proxy personalizadas.

Abra a carteira normalmente e permita que sincronize.

Se a NymVPN disponibilizar túnel dividido na sua plataforma, confirme que a carteira está **incluída no túnel protegido**, e não numa lista de ignorados ou exclusões.

### 4. Verificar o túnel antes de utilizar a carteira

Uma verificação simples ao nível do sistema:

1. Desligue a NymVPN.
2. Visite um serviço público de verificação de IP ou, no computador, execute:

   ```bash
   curl https://api.ipify.org
   ```

3. Registe o IP visível.
4. Ligue a NymVPN no modo Mixnet.
5. Repita a verificação.

O IP público visível deve mudar.

Isto confirma o túnel do sistema. **Não** prova que todos os pedidos feitos por uma determinada carteira seguem o mesmo percurso se a aplicação ou o sistema operativo tiver regras especiais de encaminhamento.

Para maior garantia no computador:

- inspecione o processo da carteira com o monitor de rede do sistema operativo;
- verifique se não existe uma exclusão de túnel dividido;
- confirme que o comportamento esperado da carteira muda se a NymVPN for desligada.

Não publique capturas de ecrã que contenham endereços de carteira, saldos, IDs de transações, endereços IP ou material de recuperação durante a resolução de problemas.

## Modo proxy dApp / carteira NymVPN

A NymVPN também disponibiliza um modo proxy para aplicações e carteiras que utiliza encaminhamento SOCKS5 / RPC através da mixnet.

A documentação pública de configuração da Nym demonstra isto sobretudo com configuração RPC ao estilo Ethereum. É útil para software que suporta explicitamente um percurso genérico compatível de proxy/RPC, mas **não** se deve assumir que funciona com todas as carteiras Zcash.

Utilize este percurso apenas quando a documentação da própria carteira confirmar suporte compatível de proxy ou RPC.

Caso contrário, prefira:

- a integração Nym nativa da carteira; ou
- NymVPN ao nível do sistema.

## Compromissos de desempenho e tempos limite

As mixnets trocam intencionalmente velocidade por maior proteção dos metadados.

Espere possíveis impactos em:

- sincronização inicial da carteira;
- sincronizações longas de recuperação;
- consultas do histórico de transações;
- tempos limite de RPC;
- chamadas a API de terceiros.

Orientação prática:

- Comece com as definições Nym predefinidas.
- Espere que a primeira sincronização ou uma sincronização longa de recuperação demore mais tempo.
- Tente novamente após um tempo limite antes de reduzir as definições de privacidade.
- Evite mudar repetidamente de modos de privacidade imediatamente antes de uma transação sensível.
- Se utilizar um percurso mais rápido para sincronização em massa, compreenda que a infraestrutura contactada pode observar a sua identidade real de rede durante esse período.
- Especificamente para a Zingo PC, lembre-se de que o seu transporte Nym nativo protege atualmente envios e consultas de preços, enquanto a sincronização permanece direta.

## Considerações para dispositivos móveis

Em Android e iOS, a interface VPN do sistema operativo é normalmente a forma mais simples de encaminhar o tráfego geral da carteira através de NymVPN: ligue primeiro a NymVPN e depois abra a carteira.

Se outra VPN, firewall ou bloqueador de publicidade baseado em VPN local já estiver a ocupar a interface VPN do sistema, os dois produtos poderão não conseguir funcionar em simultâneo. Confirme o estado da VPN do sistema operativo antes de assumir que a carteira está protegida.

## Lista de verificação do modelo de ameaça

Antes de confiar nesta configuração, pergunte:

- Estou a utilizar endereços blindados Zcash quando apropriado?
- A minha carteira tem suporte Nym nativo?
- Em caso afirmativo, que tráfego protege exatamente essa integração nativa?
- Se precisar de cobertura mais ampla, a NymVPN está ligada antes de a carteira iniciar atividade de rede?
- A carteira está excluída por uma regra de túnel dividido?
- Estou a depender de um modo proxy que a carteira efetivamente documenta?
- Estou a expor a minha identidade através de uma exchange, sessão do navegador, API de terceiros ou endereço transparente?
- Estou preparado para sincronização mais lenta e tempos limite ocasionais?

## Fontes

- Nym: mixnet Nym agora ativa em carteiras Zcash, 24 de setembro de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento Nym da Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte Nym da Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositório da Zkool: https://github.com/hhanh00/zkool2
- Trabalho de transporte Nym da NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
