<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Por que a privacidade importa

## TL;DR

- O **Tor** encaminha seu tráfego por três relays e funciona tanto para a web comum quanto para serviços onion. Hoje ele é a opção padrão na prática para anonimizar conexões de carteiras e a navegação
- O **I2P** é uma rede overlay peer-to-peer totalmente criptografada, projetada para seus próprios serviços internos; **nenhum nó atual do Zcash se comunica nativamente via I2P**
- **No celular:** encaminhe uma carteira Zcash pelo Tor com poucos toques usando o Orbot ("Tor Enabled Apps")
- **No momento, não é possível rodar um nó do Zcash via Tor:** o `zcashd` chegou ao fim do suporte em 18 de julho de 2026, e o recurso Tor do Zebra ainda está desativado upstream
- O Tor esconde *onde você está*, não *o que você faz on-chain*. As transações transparentes continuam públicas

Na era digital, proteger sua [privacidade](https://www.privacyguides.org/en/) se tornou cada vez mais essencial. Embora algumas pessoas vejam a privacidade como uma causa perdida, ela não é. Sua privacidade está em jogo e deve ser uma preocupação. A privacidade tem um valor significativo porque está ligada ao poder, e é crucial garantir que esse poder seja exercido com responsabilidade.

## Tecnologias Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) é uma ferramenta de proxy que usa a rede Tor para estabelecer conexões para aplicativos. O Tor faz isso encaminhando o tráfego deles pelo Tor, aumentando assim a [privacidade e o anonimato](https://www.torproject.org/) desses aplicativos.

## Rede I2P

A rede I2P, também conhecida como [Invisible Internet Project](https://geti2p.net/en/about/intro), é uma rede overlay peer-to-peer totalmente criptografada. Ela garante que o conteúdo, a origem e o destino das mensagens fiquem ocultos para observadores. Em outras palavras, ninguém consegue ver a origem ou o destino do tráfego nem o conteúdo real das mensagens transmitidas. A criptografia usada no I2P garante um alto nível de privacidade e anonimato para os usuários.

### Instalando o I2P

Existem duas implementações. O [Java I2P](https://geti2p.net/en/download) original roda em Windows, macOS, Linux e Android. O [i2pd](https://i2pd.website/), escrito em C++, é mais leve e costuma ser a escolha em um servidor ou em uma máquina de baixo desempenho.

Depois que estiver rodando, o I2P disponibiliza um console local em `127.0.0.1:7657` e proxies em `127.0.0.1:4444` (HTTP) e `127.0.0.1:4447` (SOCKS). Espere alguns minutos na primeira inicialização: o I2P precisa construir túneis pela rede antes que qualquer coisa funcione, e ele fica mais rápido quanto mais tempo permanece online.

### Usando o I2P com o Zcash

Saiba que **nenhum nó atual do Zcash se comunica nativamente via I2P.** O Zebra não tem suporte a I2P, e o zcashd também não tinha. Se você encontrar um guia que afirma rodar um nó do Zcash via I2P, ele está descrevendo algo que o software não faz.

O I2P é realmente útil aqui para tudo o que está em volta da carteira: acessar um site, um fórum ou um serviço sem revelar seu endereço. Para anonimizar a conexão da própria carteira, o Tor é a opção prática hoje, e as seções abaixo tratam disso.

## O Tor e o I2P têm recursos em comum, mas também diferenças significativas. 

Tanto o Tor quanto o I2P são redes peer-to-peer descentralizadas e anônimas, mas o I2P oferece níveis mais altos de segurança em comparação com o Tor. No entanto, o I2P foi projetado principalmente para acessar serviços como e-mail, chat e torrent dentro da sua própria rede e não pode ser usado para acessar a internet comum. Por outro lado, o Tor permite que os usuários acessem a deep web, assim como o I2P, mas também funciona como um navegador comum para acessar sites da surface web.

*Observação: para mais informações sobre as semelhanças e diferenças entre o Tor e o I2P, acesse [aqui](https://geti2p.net/en/comparison/tor)*

## Encaminhando uma carteira de celular pelo Tor com o Orbot

O Orbot é uma rede privada virtual (VPN) gratuita, projetada para smartphones, que direciona o tráfego de todos os aplicativos do seu dispositivo pela rede Tor.

Siga estas instruções para encaminhar uma carteira Zcash pelo Tor. Observe que a YWallet, usada em versões anteriores deste guia, não recebe mais manutenção e não vai acompanhar a rede após o Ironwood. Por isso, escolha uma carteira mantida na página [Carteiras](/using-zcash/wallets).

1.  Baixe e instale o *Orbot* pela loja de aplicativos.

2.  Após a instalação, uma mensagem de boas-vindas vai aparecer. Continue até a página inicial do *Orbot* e clique em *'Tor Enabled Apps'.*              

3. Isso vai abrir uma página na tela mostrando os aplicativos compatíveis com o Tor. Encontre sua carteira Zcash na lista e verifique se ela está selecionada.

4. Vai aparecer uma solicitação de conexão para configurar uma VPN, que permitirá que o *Orbot* monitore o tráfego de rede. O *Orbot* será inicializado assim que essa permissão for aprovada. 

5. Verifique a barra de tarefas ou a página inicial do Orbot para confirmar que o Tor está rodando. Isso é confirmado quando você vê "Connected to the Tor network".

*Observação: se o Tor estiver bloqueado pela sua rede móvel, você pode usar um servidor bridge como forma alternativa de conexão.*


## Instalando o Tor no PC ou desktop

* O navegador Tor pode ser baixado no site oficial. Você pode acessar o link [aqui](https://download.torproject.org/).

 A forma mais prática de instalar o Tor é pelo Tor Browser Bundle. Se você prefere instalações headless, pode optar por instalar o daemon do Tor separadamente. 

*Observação: por padrão, o Tor Browser Bundle disponibiliza um listener SOCKS em tcp/9150, e o daemon do Tor disponibiliza o listener SOCKS em tcp/9050.*

* Consulte as [instruções](https://support.torproject.org/little-t-tor/getting-started/installing/) de instalação específicas para o seu sistema operacional, fornecidas pelo Tor Project.

## Rodando um nó via Tor

Esta é a parte que mais mudou, e a resposta honesta é que hoje isso está mais difícil do que antes.

**O zcashd acabou.** Ele chegou ao fim do suporte e parou em 18 de julho de 2026, no bloco 3.417.100. Ele não vai voltar a funcionar, sua página de download retorna 404 e o repositório apt não está mais disponível. Qualquer instrução que mande você rodar o `zcashd -proxy=127.0.0.1:9050` não se aplica mais a nada.

**O Zebra também ainda não consegue fazer isso.** O Zebra é o nó mantido, e seu crate de rede contém código de conexão isolada para o Tor, mas o recurso está comentado em `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

A documentação do crate diz o mesmo de forma clara: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* A função `connect_isolated_tor` também está comentada. Portanto, hoje não existe uma forma suportada de rodar um nó do Zcash via Tor.

Se você precisa de anonimato no nível do nó agora, a abordagem viável é colocar a máquina inteira atrás do Tor ou de uma VPN no nível do sistema operacional, em vez de configurar o próprio nó. Isso protege sua localização na rede sem depender de recursos do nó que não foram implementados.

### O que você ainda pode fazer hoje

- **Encaminhe sua carteira pelo Tor** com o Orbot no celular, como descrito acima. Essa é a opção prática para a maioria das pessoas, e ela esconde seu IP do servidor lightwalletd com o qual sua carteira se comunica
- **Use o Tor Browser** para exploradores de blocos, fóruns e qualquer outra coisa em que você prefira não ser vinculado pelo endereço
- **Lembre-se do que o Tor não esconde.** Ele anonimiza sua localização na rede, não sua atividade on-chain. Enviar a partir de um endereço transparente continua sendo público, e valores que passam entre pools blindados ainda publicam o montante. Veja [Pools blindados](/using-zcash/shielded-pools) para saber o que continua visível

## Páginas relacionadas

- [VPN e DVPN](VPN_and_DVPN.md) — alternativas de VPN e como elas se comparam
- [Navegadores web](Web_Browsers.md) — como reforçar a segurança do navegador para a privacidade no dia a dia
- [Mensageiros seguros](Secure_Messengers.md) — ferramentas de comunicação privada
- [O que um explorador de blocos pode ver](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — o que a privacidade no nível do nó protege e o que não protege
- [Pools blindados](/using-zcash/shielded-pools) — o que continua visível on-chain mesmo com anonimato na camada de rede
