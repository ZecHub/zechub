<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Por que a privacidade importa

## Resumo

- **Tor** encaminha seu tráfego por três retransmissores e funciona tanto para a web normal quanto para serviços onion — hoje é a opção prática padrão para anonimizar conexões de carteiras e a navegação
- **I2P** é uma rede de sobreposição peer-to-peer totalmente criptografada, projetada para seus próprios serviços internos; **nenhum nó Zcash atual se comunica com I2P de forma nativa**
- **Em dispositivos móveis:** encaminhe uma carteira Zcash pelo Tor com alguns toques usando o Orbot ("Apps habilitados para Tor")
- **No momento, não é possível executar um nó Zcash pelo Tor:** o suporte ao `zcashd` terminou em 18 de julho de 2026, e o recurso de Tor do Zebra continua desativado upstream
- Tor oculta *onde você está*, não *o que você faz on-chain* — transações transparentes continuam públicas

Na era digital, proteger sua [privacidade](https://www.privacyguides.org/en/) tornou-se cada vez mais essencial. Embora algumas pessoas possam ver a privacidade como uma causa perdida, não é. Sua privacidade está em risco e deve ser uma preocupação. A privacidade tem um valor significativo, pois está relacionada ao poder, e garantir que esse poder seja exercido de forma responsável é crucial.

## Tecnologias Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) é uma ferramenta de proxy que utiliza a rede Tor para estabelecer conexões para aplicativos. O Tor faz isso encaminhando o tráfego deles pelo Tor, melhorando assim a [privacidade e o anonimato](https://www.torproject.org/) desses aplicativos.

## Rede I2P

A rede I2P, também conhecida como [Invisible Internet Project](https://geti2p.net/en/about/intro), é uma rede de sobreposição peer-to-peer totalmente criptografada. Ela garante que o conteúdo, a origem e o destino das mensagens fiquem ocultos dos observadores. Em outras palavras, ninguém consegue ver a origem ou o destino do tráfego, nem o conteúdo real das mensagens transmitidas. A criptografia usada no I2P garante um alto nível de privacidade e anonimato para seus usuários.

### Instalar o I2P

Existem duas implementações. O [Java I2P](https://geti2p.net/en/download) original funciona no Windows, macOS, Linux e Android. O [i2pd](https://i2pd.website/), escrito em C++, é mais leve e é a escolha habitual em um servidor ou em uma máquina de baixa potência.

Depois de estar em execução, o I2P disponibiliza um console local em `127.0.0.1:7657` e proxies em `127.0.0.1:4444` (HTTP) e `127.0.0.1:4447` (SOCKS). É normal levar vários minutos na primeira inicialização: o I2P precisa construir túneis pela rede antes de qualquer coisa funcionar e fica mais rápido quanto mais tempo permanece online.

### Usar I2P com o Zcash

Tenha em mente que **nenhum nó Zcash atual se comunica com I2P de forma nativa.** O Zebra não tem suporte para I2P, e o zcashd também não tinha. Se você encontrar um guia que afirme executar um nó Zcash pelo I2P, ele está descrevendo algo que o software não faz.

O I2P é realmente útil aqui para tudo ao redor da carteira: acessar um site, fórum ou serviço sem revelar seu endereço. Para anonimizar a própria conexão da carteira, o Tor é hoje a opção prática, e as seções abaixo abordam isso.

## Tor e I2P compartilham recursos comuns, mas também têm diferenças significativas. 

Tanto o Tor quanto o I2P são redes peer-to-peer descentralizadas e anônimas, mas o I2P oferece níveis mais altos de segurança em comparação com o Tor. No entanto, o I2P foi projetado principalmente para acessar serviços como e-mail, chat e torrenting dentro de sua rede e não pode ser usado para acessar a internet comum. Por outro lado, o Tor permite que os usuários acessem a deep web, assim como o I2P, mas também funciona como um navegador comum para acessar sites na web superficial.

*Nota: Para mais informações sobre as semelhanças e diferenças entre Tor e I2P, visite [aqui](https://geti2p.net/en/comparison/tor)*

## Encaminhar uma carteira móvel pelo Tor com o Orbot

O Orbot é uma rede privada virtual (VPN) gratuita projetada para smartphones que direciona o tráfego de todos os aplicativos do seu dispositivo pela rede Tor.

Siga estas instruções para encaminhar uma carteira Zcash pelo Tor. Observe que a YWallet, usada por versões anteriores deste guia, não recebe mais manutenção e não acompanhará a rede após Ironwood, portanto escolha uma carteira mantida na página [Carteiras](/using-zcash/wallets).

1.  Baixe e instale o *Orbot* na loja de aplicativos.

2.  Após a instalação, aparecerá uma mensagem de boas-vindas. Continue para a página inicial do *Orbot* e clique em *'Apps habilitados para Tor'.*              

3. Isso abrirá uma página na tela mostrando os aplicativos compatíveis com Tor. Encontre sua carteira Zcash na lista e certifique-se de que ela esteja selecionada.

4. Aparecerá uma solicitação de conexão para configurar uma VPN, o que permitirá que o *Orbot* monitore o tráfego de rede. O *Orbot* será inicializado assim que essa permissão for aprovada. 

5. Verifique a barra de tarefas ou a página inicial do Orbot para confirmar que o Tor está em execução; isso será confirmado quando você vir 'Conectado à rede Tor'.

*Nota: Se o Tor estiver bloqueado pela sua rede móvel, você pode usar um servidor de ponte como forma alternativa de conexão.*


## Instalar o Tor em um PC ou computador de mesa

* O navegador Tor pode ser baixado no site oficial; você pode acessar o link [aqui](https://download.torproject.org/).

 A forma mais conveniente de instalar o Tor é por meio do Tor Browser Bundle. Se você preferir instalações headless, pode optar por instalar o daemon do Tor separadamente. 

*Nota: Por padrão, o pacote Tor Browser disponibiliza uma escuta SOCKS em tcp/9150, e o daemon do Tor disponibiliza a escuta SOCKS em tcp/9050.*

* Consulte as [instruções](https://support.torproject.org/little-t-tor/getting-started/installing/) de instalação específicas para seu sistema operacional, fornecidas pelo Tor Project.

## Executar um nó pelo Tor

Esta é a parte que mais mudou, e a resposta honesta é que atualmente é mais difícil do que era.

**O zcashd acabou.** Ele chegou ao fim do suporte e parou em 18 de julho de 2026 no bloco 3,417,100. Não será reiniciado, sua página de download retorna um 404, e o repositório apt não é mais disponibilizado. Qualquer instrução que diga para você executar `zcashd -proxy=127.0.0.1:9050` não se aplica mais a nada.

**O Zebra também ainda não consegue fazer isso.** O Zebra é o nó mantido, e seu crate de rede contém código de conexão isolada para Tor, mas o recurso está comentado em `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

A documentação do crate diz a mesma coisa claramente: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* A função `connect_isolated_tor` está comentada junto com ele. Portanto, atualmente não há uma forma suportada de executar um nó Zcash pelo Tor.

Se você precisa de anonimato no nível do nó agora, a abordagem viável é colocar toda a máquina atrás do Tor ou de uma VPN no nível do sistema operacional, em vez de configurar o próprio nó. Isso protege a localização da sua rede sem depender de recursos do nó que não foram implementados.

### O que você ainda pode fazer hoje

- **Encaminhe sua carteira pelo Tor** com o Orbot no celular, conforme descrito acima. Esta é a opção prática para a maioria das pessoas e oculta seu IP do servidor lightwalletd com o qual sua carteira se comunica
- **Use o Tor Browser** para exploradores de blocos, fóruns e qualquer outra coisa em que você prefira não ser associado pelo endereço
- **Lembre-se do que o Tor não oculta.** Ele anonimiza a localização da sua rede, não sua atividade on-chain. Enviar de um endereço transparente continua sendo público, e o valor que cruza entre pools blindados continua publicando o valor. Veja [Pools blindados](/using-zcash/shielded-pools) para saber o que continua visível

## Páginas relacionadas

- [VPN e DVPN](VPN_and_DVPN.md) — alternativas à VPN e como elas se comparam
- [Navegadores web](Web_Browsers.md) — fortalecimento da segurança do navegador para a privacidade cotidiana
- [Mensageiros seguros](Secure_Messengers.md) — ferramentas de comunicação privada
- [O que um explorador de blocos pode ver](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) — o que sua privacidade no nível do nó protege e o que não protege
- [Pools blindados](/using-zcash/shielded-pools) — o que permanece visível on-chain mesmo com anonimato na camada de rede
