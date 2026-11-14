<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## TL;DR

- O **GrapheneOS** é um sistema operacional móvel de código aberto e sem fins lucrativos, focado em privacidade e segurança, com total compatibilidade com os apps Android do dia a dia
- Principais pontos fortes: sandbox de apps reforçado, código com segurança de memória e mitigações de exploits, inicialização verificada apoiada por hardware, permissões detalhadas e proteção da porta USB-C quando o dispositivo está bloqueado
- A instalação é feita pelo **instalador WebUSB** oficial (recomendado para a maioria dos usuários) ou pelo **fluxo de linha de comando** para usuários técnicos
- Para um usuário de Zcash, é uma base sólida para a autocustódia no celular: combine-o com uma carteira blindada mantida ativamente e com as práticas padrão de OPSEC

O GrapheneOS é um projeto de código aberto e sem fins lucrativos dedicado a aprimorar a privacidade e a segurança em dispositivos móveis, mantendo a compatibilidade com os apps Android. Este sistema operacional dá grande ênfase ao avanço das tecnologias de privacidade e segurança, com foco especial no reforço do sandboxing, nas mitigações de exploits e no aprimoramento do modelo de permissões. Nascido em 2014 sob o nome **CopperheadOS**, ele desde então evoluiu para se tornar um formidável guardião da sua privacidade e segurança digital.

O principal objetivo do GrapheneOS é reforçar as barreiras de segurança, como o sandbox de apps, sem prejudicar a experiência do usuário. 

O GrapheneOS pode introduzir diversas opções de ativação para recursos específicos, como permissões de rede, permissões de sensores ou restrições quando o dispositivo está bloqueado (abrangendo aspectos como periféricos USB, acesso à câmera e blocos de configuração rápida). Além disso, recursos de privacidade e segurança mais complexos voltados ao usuário são cuidadosamente projetados para manter uma experiência amigável, cada um com suas próprias melhorias de interface.

## **Recursos do GrapheneOS**

**Reforço de segurança** O GrapheneOS inclui amplas melhorias de segurança, como linguagens de programação com segurança de memória e recursos de segurança baseados no compilador para reduzir vulnerabilidades comuns.

**Sandboxing** Ele fortalece o sandboxing de apps para isolá-los uns dos outros, limitando possíveis vetores de ataque.

**Inicialização verificada** O GrapheneOS usa chaves apoiadas por hardware e um processo de inicialização verificável para garantir a integridade do sistema operacional.

**Permissões aprimoradas** Ele oferece um controle melhor sobre as permissões dos apps, permitindo que os usuários ajustem e gerenciem quais dados os apps podem acessar.

**Painel de privacidade** Os usuários podem monitorar e controlar o comportamento dos apps por meio de um painel de privacidade, que oferece transparência sobre o uso de dados.

**Atualizações de segurança integradas** O GrapheneOS oferece atualizações de segurança em tempo hábil, garantindo que os usuários tenham a proteção mais recente contra vulnerabilidades.

**Criptografia forte** Ele utiliza criptografia de disco completo por padrão, protegendo os dados armazenados no dispositivo.

**Segurança aprimorada do navegador** O navegador padrão é configurado para oferecer mais segurança, incluindo proteção contra rastreamento.

**Mínimo de apps pré-instalados** O GrapheneOS vem com um mínimo de apps pré-instalados, reduzindo possíveis riscos de segurança e privacidade.

**Proteção contra portas USB hostis** Ele oferece proteção contra acesso não autorizado ao dispositivo pelas portas USB quando o dispositivo está bloqueado.

**Proteções contra malware** O GrapheneOS inclui recursos para detectar e impedir malwares conhecidos.

**Foco em privacidade** O sistema operacional foi projetado com grande ênfase na privacidade do usuário, minimizando a coleta e a exposição de dados.

**Código aberto** É um projeto de código aberto, o que permite transparência e contribuições da comunidade para melhorar a segurança.

**Políticas de segurança personalizáveis** Os usuários podem personalizar várias políticas de segurança de acordo com suas preferências.

**Compatibilidade** O GrapheneOS busca manter a compatibilidade com os apps Android, para que os usuários possam continuar usando seus aplicativos favoritos enquanto aproveitam os recursos aprimorados de segurança e privacidade.

## **Instalando o GrapheneOS**

Como mencionado na seção de boas práticas, recomenda-se usar o guia oficial de instalação recomendado. Há dois métodos para instalar o GrapheneOS: usar o [instalador baseado em WebUSB](https://grapheneos.org/install/web) ou seguir o [guia de instalação por linha de comando](https://grapheneos.org/install/cli)

**Instalação baseada em Web USB** Para instalar o GrapheneOS usando o método do instalador web, normalmente você precisará dos seguintes materiais e recursos:

- 2 GB de memória livre e 32 GB de espaço de armazenamento livre.
- Cabo USB (A ou C)
- Use um sistema operacional host compatível e um navegador com suporte funcional a WebUSB. Confira os [pré-requisitos oficiais do WebUSB](https://grapheneos.org/install/web#prerequisites) atuais para ver as versões compatíveis e as restrições de empacotamento dos navegadores; sistemas antigos que chegaram ao fim da vida útil não são oficialmente compatíveis.
- O instalador web também pode ser executado a partir de um dispositivo Android, ChromeOS ou GrapheneOS compatível. Siga as observações específicas de cada navegador no guia oficial, em vez de presumir que todo pacote do Chromium é compatível com WebUSB.

Confira o guia de instalação no link abaixo e siga o processo de instalação

[Guia do instalador web do GrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Instalação por linha de comando** A instalação por linha de comando não é recomendada para usuários sem perfil técnico, e as ferramentas e recursos abaixo são necessários para a instalação por linha de comando:

- Você deve ter pelo menos 2 GB de memória livre disponível e 32 GB de espaço de armazenamento livre
- Cabo USB (A ou C)
- Use um sistema operacional host compatível com os [pré-requisitos atuais da linha de comando](https://grapheneos.org/install/cli#prerequisites) e siga esse guia para obter as ferramentas necessárias.
- Hosts Android, ChromeOS e GrapheneOS devem usar o instalador web; eles não estão listados como hosts compatíveis para a instalação por linha de comando.

Confira o guia de instalação no link abaixo e siga o processo de instalação 

[Instalação por linha de comando](https://grapheneos.org/install/cli#prerequisites)

## **Boas práticas**

**Mantenha o sistema operacional atualizado** Atualize o GrapheneOS regularmente para garantir que você tenha os patches de segurança e as melhorias mais recentes.

**Use senhas fortes** Defina senhas fortes e exclusivas para a criptografia do dispositivo e para o login nos apps, a fim de impedir acessos não autorizados.

**Permissões dos apps** Revise e gerencie as permissões dos apps com cuidado, concedendo apenas o necessário para que cada app funcione.

**Backups regulares** Faça backups regulares dos seus dados para o caso de perda do dispositivo ou corrupção de dados.

**Criptografe o armazenamento** Se não estiver ativada por padrão, criptografe o armazenamento do dispositivo para proteger seus dados caso ele seja perdido ou roubado.

**Tela de bloqueio segura** Use uma tela de bloqueio segura, como PIN, senha ou autenticação biométrica, para impedir acessos não autorizados.

**Bloqueie novamente o bootloader após a instalação** O processo oficial de instalação exige [desbloquear temporariamente o bootloader](https://grapheneos.org/install/web#unlocking-the-bootloader) para gravar o GrapheneOS e, em seguida, [bloqueá-lo novamente antes do uso](https://grapheneos.org/install/web#locking-the-bootloader) para ativar a inicialização verificada completa. Tanto o desbloqueio quanto o novo bloqueio apagam todos os dados do usuário, então faça um backup antes e siga as etapas oficiais na ordem. Não faça root no sistema operacional instalado.

**Verifique as fontes dos apps** Verifique a autenticidade dos apps e de suas fontes para evitar a instalação de software malicioso.

**Instale um navegador focado em privacidade** Considere usar um navegador focado em privacidade, como o navegador Brave, o Firefox ou o Bromite, para navegar com segurança.

**Audite os apps regularmente** Revise periodicamente e desinstale os apps que você não usa mais ou nos quais não confia, para reduzir a superfície de ataque.

**Ative a autenticação de dois fatores (2FA)** Ative a 2FA nas suas contas online para adicionar uma camada extra de segurança.

**Evite Wi-Fi público** Tenha cuidado ao se conectar a redes Wi-Fi públicas, pois elas podem ser menos seguras. Use uma VPN quando necessário.

**Cuidado com os dados de localização** Limite o rastreamento de localização pelos apps e considere usar uma ferramenta de falsificação de localização se você valoriza a privacidade.

**Evite links e anexos desconhecidos** Desconfie de links e anexos de e-mail não solicitados, pois podem ser tentativas de phishing ou malware.

**Revise as configurações padrão** Revise com atenção e ajuste as configurações padrão para alinhá-las às suas preferências de privacidade.

**Suporte da comunidade** Participe da comunidade e dos fóruns do GrapheneOS para obter dicas, atualizações e conselhos de segurança. Você pode entrar em contato com a equipe e se manter atualizado clicando [aqui](https://grapheneos.org/contact) para conhecer mais contatos.

**Use o método oficial de instalação** O GrapheneOS oferece dois métodos de instalação com suporte oficial. Os usuários podem optar pelo instalador baseado em WebUSB, recomendado para a maioria das pessoas, ou seguir o guia de instalação por linha de comando, voltado a usuários com mais perfil técnico.

## **Conclusão**

Em essência, o GrapheneOS tem como propósito oferecer um sistema operacional móvel alternativo que prioriza a privacidade e a segurança de seus usuários, dando a eles mais controle sobre sua vida digital e oferecendo compatibilidade com os apps de que dependem. É um projeto que busca estabelecer um padrão elevado de segurança e privacidade para dispositivos móveis em uma época em que essas preocupações são fundamentais.

## Páginas relacionadas

- [Mensageiros seguros](Secure_Messengers.md) — comunicação privada em um dispositivo reforçado
- [Criptografia PGP](PGP_Encryption.md) — troca de e-mails e arquivos criptografados
- [VPN e DVPN](VPN_and_DVPN.md) — privacidade na camada de rede no celular
- [Navegadores web](Web_Browsers.md) — como escolher e reforçar um navegador para celular
