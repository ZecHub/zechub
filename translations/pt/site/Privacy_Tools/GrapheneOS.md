<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Graphene OS

## TL;DR

- **GrapheneOS** é um sistema operacional móvel sem fins lucrativos e de código aberto, focado em privacidade e segurança, com total compatibilidade com aplicativos Android do dia a dia
- Pontos fortes principais: sandbox de aplicativos reforçado, código seguro para memória e mitigações contra exploits, inicialização verificada com suporte de hardware, permissões granulares e proteção da porta USB-C quando o dispositivo está bloqueado
- A instalação é feita por meio do **instalador oficial WebUSB** (recomendado para a maioria dos usuários) ou do **processo de linha de comando** para usuários técnicos
- Para um usuário do Zcash, é uma base sólida para autocustódia móvel: combine-o com uma carteira blindada mantida e práticas padrão de higiene OPSEC

GrapheneOS é um projeto sem fins lucrativos e de código aberto dedicado a melhorar a privacidade e a segurança em dispositivos móveis, mantendo simultaneamente a compatibilidade com aplicativos Android. Este sistema operacional dá grande ênfase ao avanço das tecnologias de privacidade e segurança, com foco especial no reforço do isolamento em sandbox, nas mitigações contra exploits e no aperfeiçoamento do modelo de permissões. Nascido em 2014 sob o nome **CopperheadOS**, evoluiu desde então para o formidável guardião da sua privacidade e segurança digitais.

O principal objetivo do GrapheneOS é reforçar os limites de segurança, como o sandbox de aplicativos, sem afetar negativamente a experiência do usuário.

O GrapheneOS pode introduzir várias opções de alternância para recursos específicos, como permissões de rede, permissões de sensores ou restrições quando o dispositivo está bloqueado (abrangendo aspectos como periféricos USB, acesso à câmera e botões de acesso rápido). Além disso, recursos de privacidade e segurança mais complexos voltados ao usuário são cuidadosamente projetados para manter uma experiência amigável, cada um com seus próprios aprimoramentos de interface.

## **Recursos do GrapheneOS**

**Reforço de segurança** O GrapheneOS inclui extensos aprimoramentos de segurança, como linguagens de programação seguras para memória e recursos de segurança baseados no compilador para reduzir vulnerabilidades comuns.

**Sandboxing** Ele reforça o sandboxing de aplicativos para isolar os apps uns dos outros, limitando possíveis vetores de ataque.

**Inicialização verificada** O GrapheneOS usa chaves com suporte de hardware e um processo de inicialização verificável para garantir a integridade do sistema operacional.

**Permissões aprimoradas** Ele oferece melhor controle sobre as permissões dos aplicativos, permitindo que os usuários ajustem com precisão e gerenciem quais dados os apps podem acessar.

**Painel de privacidade** Os usuários podem monitorar e controlar o comportamento dos aplicativos por meio de um painel de privacidade, oferecendo transparência sobre o uso de dados.

**Atualizações de segurança integradas** O GrapheneOS oferece atualizações de segurança em tempo hábil, garantindo que os usuários tenham a proteção mais recente contra vulnerabilidades.

**Criptografia forte** Ele emprega criptografia de disco completo por padrão, protegendo os dados armazenados no dispositivo.

**Segurança aprimorada no navegador** O navegador padrão é configurado para segurança reforçada, incluindo proteção contra rastreamento.

**Poucos aplicativos pré-instalados** O GrapheneOS vem com poucos aplicativos pré-instalados, reduzindo possíveis riscos de segurança e privacidade.

**Proteção contra portas USB hostis** Ele oferece proteção contra acesso não autorizado ao dispositivo por meio de portas USB quando o dispositivo está bloqueado.

**Proteções antimalware** O GrapheneOS inclui recursos para detectar e prevenir malwares conhecidos.

**Foco em privacidade** O sistema operacional é projetado com forte ênfase na privacidade do usuário, minimizando a coleta e a exposição de dados.

**Código aberto** É um projeto de código aberto, permitindo transparência e contribuições da comunidade para melhorar a segurança.

**Políticas de segurança personalizáveis** Os usuários têm a capacidade de personalizar várias políticas de segurança para atender às suas preferências.

**Compatibilidade** O GrapheneOS busca manter compatibilidade com aplicativos Android, para que os usuários possam continuar usando seus aplicativos favoritos enquanto se beneficiam de recursos aprimorados de segurança e privacidade.

## **Instalando o GrapheneOS**

Como declarado na seção de melhores práticas, recomenda-se utilizar o guia oficial de instalação recomendado. Há dois métodos para instalar o GrapheneOS: usando o [instalador baseado em WebUSB](https://grapheneos.org/install/web) ou utilizando o [guia de instalação por linha de comando](https://grapheneos.org/install/cli)

**Instalação baseada em WebUSB** Para instalar o GrapheneOS usando o método do instalador Web, normalmente você precisará dos seguintes materiais e recursos:

- 2GB de memória livre e 32GB de espaço de armazenamento livre.
- Cabo USB (A ou C)
- Sistema operacional compatível: Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 e 23.04), ChromeOS, GrapheneOS, Google Android (Pixel OS padrão)
- Navegadores compatíveis: Chromium (não compatível com Ubuntu), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Brave Browser.

Confira o guia de instalação pelo link abaixo e siga o processo de instalação

[Guia do instalador Web do GrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Instalação por linha de comando** A instalação por linha de comando não é recomendada para usuários sem perfil técnico, e as ferramentas e recursos abaixo são necessários para a instalação por linha de comando;

- Você deve ter pelo menos 2GB de memória livre disponível e 32GB de espaço de armazenamento livre
- Cabo USB (A ou C)
- Sistema operacional compatível Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Instalador Web a partir de Android, ChromeOS ou GrapheneOS

Confira o guia de instalação pelo link abaixo e siga o processo de instalação

[Instalação por linha de comando](https://grapheneos.org/install/cli#prerequisites)

## **Melhores práticas**

**Mantenha o sistema operacional atualizado** Atualize regularmente o GrapheneOS para garantir que você tenha os patches e aprimoramentos de segurança mais recentes.

**Use senhas fortes** Defina senhas fortes e exclusivas para a criptografia do dispositivo e logins de aplicativos para evitar acesso não autorizado.

**Permissões de aplicativos** Revise e gerencie cuidadosamente as permissões dos aplicativos, concedendo apenas o que for necessário para cada app funcionar.

**Backups regulares** Faça backups regulares dos seus dados em caso de perda do dispositivo ou corrupção de dados.

**Criptografe o armazenamento** Se não estiver habilitado por padrão, criptografe o armazenamento do seu dispositivo para proteger seus dados caso o dispositivo seja perdido ou roubado.

**Tela de bloqueio segura** Use uma tela de bloqueio segura, como PIN, senha ou autenticação biométrica, para evitar acesso não autorizado.

**Evite fazer root no seu dispositivo Android** Evite fazer root ou desbloquear o bootloader, pois isso pode enfraquecer a segurança do dispositivo.

**Verifique as fontes dos aplicativos** Verifique a autenticidade dos aplicativos e de suas fontes para evitar a instalação de software malicioso.

**Instale um navegador com foco em privacidade** Considere usar um navegador com foco em privacidade, como Brave browser, Firefox ou Bromite, para uma navegação segura.

**Audite os aplicativos regularmente** Revise periodicamente e desinstale aplicativos que você não usa mais ou nos quais não confia, para reduzir a superfície de ataque.

**Ative a autenticação de dois fatores (2FA)** Ative o 2FA para suas contas online para adicionar uma camada extra de segurança.

**Evite Wi-Fi público** Tenha cuidado ao se conectar a redes Wi-Fi públicas, pois elas podem ser menos seguras. Use uma VPN quando necessário.

**Tenha cuidado com dados de localização** Limite o rastreamento de localização dos aplicativos e considere usar uma ferramenta de falsificação de localização se você valoriza a privacidade.

**Evite links e anexos desconhecidos** Desconfie de links não solicitados e anexos de e-mail, pois podem ser tentativas de phishing ou malware.

**Revise as configurações padrão** Revise cuidadosamente e ajuste as configurações padrão para alinhá-las às suas preferências de privacidade.

**Suporte da comunidade** Participe da comunidade e dos fóruns do GrapheneOS para obter dicas, atualizações e orientações de segurança. Você pode entrar em contato com a equipe e se manter atualizado clicando [aqui](https://grapheneos.org/contact) para explorar mais contatos.

**Use o método oficial de instalação** O GrapheneOS oferece dois métodos de instalação oficialmente suportados. Os usuários podem optar pelo instalador baseado em WebUSB, que é recomendado para a maioria das pessoas, ou podem seguir o guia de instalação por linha de comando, voltado para usuários com maior inclinação técnica.

## **Conclusão**

Em essência, o GrapheneOS trata de fornecer um sistema operacional móvel alternativo que prioriza a privacidade e a segurança de seus usuários, dando a eles maior controle sobre suas vidas digitais, ao mesmo tempo em que oferece compatibilidade com os aplicativos dos quais dependem. É um projeto que busca estabelecer um alto padrão de segurança e privacidade para dispositivos móveis em uma era em que essas preocupações são fundamentais.

## Páginas relacionadas

- [Mensageiros seguros](Secure_Messengers.md) — comunicação privada em um dispositivo reforçado
- [Criptografia PGP](PGP_Encryption.md) — e-mail criptografado e troca de arquivos
- [VPN e DVPN](VPN_and_DVPN.md) — privacidade na camada de rede em dispositivos móveis
- [Navegadores web](Web_Browsers.md) — escolhendo e reforçando um navegador móvel
