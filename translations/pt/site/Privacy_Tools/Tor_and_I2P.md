<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Porque a Privacidade Importa

Na era digital, proteger a sua [privacidade](https://www.privacyguides.org/en/) tornou-se cada vez mais vital. Embora alguns possam ver a privacidade como uma causa perdida, não o é. A sua privacidade está em risco e deve ser uma preocupação. A privacidade tem um valor significativo, pois está relacionada com poder, e garantir que esse poder é exercido de forma responsável é crucial.

## Tecnologias Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) é uma ferramenta de proxy que utiliza a rede Tor para estabelecer ligações para aplicações. O Torbot consegue isto ao encaminhar o seu tráfego através do Tor, aumentando assim a [privacidade e o anonimato](https://www.torproject.org/) dessas aplicações.

## Rede I2P

A rede I2P, também conhecida como [Invisible Internet Project](https://geti2p.net/en/about/intro), é uma rede overlay peer-to-peer totalmente encriptada. Garante que o conteúdo, a origem e o destino das mensagens ficam ocultos aos observadores. Por outras palavras, ninguém consegue ver a origem ou o destino do tráfego nem o conteúdo real das mensagens transmitidas. A encriptação usada no I2P garante um elevado nível de privacidade e anonimato para os seus utilizadores.

### Instalar o I2P

Existem duas implementações. O [Java I2P](https://geti2p.net/en/download) original funciona em Windows, macOS, Linux e Android. O [i2pd](https://i2pd.website/), escrito em C++, é mais leve e é a escolha habitual num servidor ou numa máquina de baixa potência.

Depois de estar em execução, o I2P disponibiliza uma consola local em `127.0.0.1:7657` e proxies em `127.0.0.1:4444` (HTTP) e `127.0.0.1:4447` (SOCKS). É normal que demore vários minutos no primeiro arranque: o I2P tem de construir túneis através da rede antes de qualquer coisa funcionar, e fica mais rápido quanto mais tempo permanecer online.

### Usar I2P com Zcash

Tenha em conta que **nenhum nó Zcash atual comunica com I2P de forma nativa.** O Zebra não tem suporte para I2P, e o zcashd também não tinha. Se encontrar um guia que afirme executar um nó Zcash sobre I2P, está a descrever algo que o software não faz.

Aquilo para que o I2P é genuinamente útil aqui é tudo o que envolve a wallet: aceder a um site, fórum ou serviço sem revelar o seu endereço. Para anonimizar a própria ligação da wallet, o Tor é hoje a opção prática, e as secções abaixo explicam isso.

## Tor e I2P partilham características comuns, mas também têm diferenças significativas. 

Tanto o Tor como o I2P são redes peer-to-peer descentralizadas e anónimas, mas o I2P oferece níveis de segurança mais elevados em comparação com o Tor. No entanto, o I2P foi concebido principalmente para aceder a serviços como email, chat e torrenting dentro da sua rede e não pode ser usado para aceder à internet normal. Por outro lado, o Tor permite aos utilizadores aceder à deep web, tal como o I2P, mas também funciona como um browser comum para aceder a websites na web de superfície.

*Nota: Para mais informações sobre as semelhanças e diferenças entre o Tor e o I2P visite [aqui](https://geti2p.net/en/comparison/tor)*

## Encaminhar uma wallet móvel através do Tor com o Orbot

O Orbot é uma rede privada virtual (VPN) gratuita concebida para smartphones que direciona o tráfego de todas as aplicações do seu dispositivo através da rede Tor.

Siga estas instruções para encaminhar uma wallet Zcash através do Tor. Note que a Ywallet, que versões anteriores deste guia usavam, já não é mantida e não acompanhará a rede após Ironwood, por isso escolha uma wallet mantida na página [Wallets](/using-zcash/wallets).

1.  Descarregue e instale o *Orbot* a partir da loja de aplicações.

2.  Após a instalação, aparecerá uma mensagem de boas-vindas. Continue para a página inicial do *Orbot* e clique em *'Tor Enabled Apps'.*              

3. Isto fará surgir uma página no ecrã com as aplicações compatíveis com Tor. Encontre a sua wallet Zcash na lista e certifique-se de que está selecionada.

4. Aparecerá um pedido de ligação para configurar uma VPN, o que permitirá ao *Orbot* monitorizar o tráfego de rede. O *Orbot* será inicializado assim que esta permissão for aprovada. 

5. Verifique a barra de tarefas ou a página inicial do Orbot para confirmar que o Tor está em execução; isso é confirmado quando vir 'Connected to the Tor network'.

*Nota: Se o Tor estiver bloqueado pela sua rede móvel, pode usar um Bridge Server como forma alternativa de ligação.*


## Instalar o Tor no PC ou computador de secretária

* O browser Tor pode ser descarregado a partir do website oficial, pode aceder à ligação [aqui](https://www.torproject.org/download/).

 A forma mais conveniente de instalar o Tor é através do Tor Browser Bundle. Se preferir instalações headless, pode optar por instalar o daemon Tor separadamente. 

*Nota: Por predefinição, o pacote Tor Browser disponibiliza um listener SOCKS em tcp/9150 e o daemon Tor disponibiliza o listener SOCKS em tcp/9050.*

* Consulte as [instruções](https://support.torproject.org/apt/) de instalação específicas para o seu sistema operativo, conforme disponibilizadas pelo Tor Project.

## Executar um nó sobre Tor

Esta é a parte que mais mudou, e a resposta honesta é que atualmente é mais difícil do que era.

**zcashd já não existe.** Chegou ao fim do suporte e parou a 18 de julho de 2026 no bloco 3,417,100. Não voltará a arrancar, a sua página de download devolve um 404 e o repositório apt já não é servido. Quaisquer instruções que lhe digam para executar `zcashd -proxy=127.0.0.1:9050` já não se aplicam a nada.

**O Zebra também ainda não o consegue fazer.** O Zebra é o nó mantido, e o seu crate de rede contém código de ligação isolada para Tor, mas a funcionalidade está comentada em `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

A documentação do crate diz a mesma coisa de forma clara: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* A função `connect_isolated_tor` está comentada juntamente com isso. Portanto, atualmente não existe uma forma suportada de executar um nó Zcash sobre Tor.

Se precisa de anonimato ao nível do nó agora, a abordagem viável é colocar toda a máquina atrás do Tor ou de uma VPN ao nível do sistema operativo, em vez de configurar o próprio nó. Isso protege a localização da sua rede sem depender de funcionalidades do nó que não estão implementadas.

### O que ainda pode fazer hoje

- **Encaminhar a sua wallet através do Tor** com o Orbot no telemóvel, conforme descrito acima. Esta é a opção prática para a maioria das pessoas e oculta o seu IP do servidor lightwalletd com o qual a sua wallet comunica
- **Usar o Tor Browser** para exploradores de blocos, fóruns e qualquer outra coisa em que prefira não ser associado pelo endereço
- **Lembre-se do que o Tor não oculta.** Anonimiza a localização da sua rede, não a sua atividade on-chain. Enviar a partir de um endereço transparente continua a ser público, e o valor que atravessa entre pools shielded continua a publicar o montante. Veja [Shielded Pools](/using-zcash/shielded-pools) para perceber o que continua visível
