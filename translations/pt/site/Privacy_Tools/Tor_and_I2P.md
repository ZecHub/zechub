<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Por que a Privacidade Importa

Na era digital, proteger a sua [privacidade](https://www.privacyguides.org/en/) tornou-se cada vez mais vital. Embora alguns possam ver a privacidade como uma causa perdida, não é. A sua privacidade está em risco e deve ser uma preocupação. A privacidade tem um valor significativo, pois está relacionada ao poder, e garantir que esse poder seja exercido de forma responsável é crucial.

## Tecnologias Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) é uma ferramenta de proxy que utiliza a rede Tor para estabelecer conexões para aplicações. O Torbot consegue isso roteando o tráfego delas através do Tor, aumentando assim a [privacidade e o anonimato](https://www.torproject.org/) dessas aplicações.

## Rede I2P

A rede I2P, também conhecida como [Invisible Internet Project](https://geti2p.net/en/about/intro), é uma rede de sobreposição ponto a ponto totalmente criptografada. Ela garante que o conteúdo, a origem e o destino das mensagens fiquem ocultos para observadores. Em outras palavras, ninguém pode ver a origem ou o destino do tráfego nem o conteúdo real das mensagens que estão sendo transmitidas. A criptografia usada no I2P garante um alto nível de privacidade e anonimato para seus usuários.

## Tor e I2P compartilham características em comum, mas também têm diferenças significativas. 

Tanto Tor quanto I2P são redes ponto a ponto descentralizadas e anônimas, mas o I2P oferece níveis mais altos de segurança em comparação com o Tor. No entanto, o I2P é projetado principalmente para acessar serviços como e-mail, chat e torrent dentro de sua própria rede e não pode ser usado para acessar a internet comum. Por outro lado, o Tor permite que os usuários acessem a deep web, assim como o I2P, mas também funciona como um navegador comum para acessar sites na surface web.

*Nota: Para mais informações sobre as semelhanças e diferenças entre Tor & I2P, visite [aqui](https://geti2p.net/en/comparison/tor)*

## Integrando o Tor com Ywallet no Smartphone

O Orbot é uma rede privada virtual (VPN) gratuita projetada para smartphones que direciona o tráfego de todas as aplicações no seu dispositivo através da rede Tor.

Siga as instruções abaixo para conectar o Tor à carteira Zcash *(Ywallet)*:

1.  Baixe e instale o *Orbot* na loja de aplicativos.

2.  Após a instalação, uma mensagem de boas-vindas aparecerá. Continue para a página inicial do *Orbot* e clique em *'Tor Enabled Apps'.*              

3. Isso exibirá uma página na tela mostrando as aplicações compatíveis com Tor. Procure pelo aplicativo *Ywallet* e certifique-se de que ele esteja selecionado.

4. Aparecerá uma solicitação de conexão para configurar uma VPN, o que permitirá ao *Orbot* monitorar o tráfego da rede. O *Orbot* será inicializado assim que essa permissão for aprovada. 

5. Verifique a barra de tarefas ou a página inicial do Orbot para confirmar que o Tor está em execução; isso é confirmado quando você vir 'Connected to the Tor network'.

* Para assistir ao tutorial em vídeo, veja [aqui](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Nota: Se o Tor estiver bloqueado pela sua rede móvel, você pode usar um Bridge Server como forma alternativa de conexão.*


## Como configurar uma carteira Zcash com Torbot no PC/Desktop

## Suporte a Tor no Zcash?

* O navegador Tor pode ser baixado no site oficial, você pode acessar o link [aqui](https://www.torproject.org/download/).

 A forma mais conveniente de instalar o Tor é através do Tor Browser Bundle. Se você preferir instalações headless, pode optar por instalar o daemon Tor separadamente. 

*Nota: Por padrão, o pacote Tor Browser expõe um listener SOCKS em tcp/9150 e o daemon Tor expõe o listener SOCKS em tcp/9050.*

* Consulte as [instruções](https://support.torproject.org/apt/) de instalação específicas para o seu sistema operacional, conforme fornecidas pelo Tor Project.

## Instalar a carteira Zcashd

Zcashd é a carteira oficial de nó completo baseada em linux, atualizada e mantida pelos desenvolvedores principais da Electric Coin Company. Ela é destinada a usuários que queiram minerar e validar transações de zcash, bem como enviar e receber Zcash.

* O site oficial para baixar a carteira Zcashd pode ser encontrado [aqui](https://electriccoin.co/zcashd/) 

* Instalar carteira: link para o vídeo tutorial [aqui](https://www.youtube.com/watch?v=hTKL0jPu7X0) fornecido pelos desenvolvedores da carteira Zcash.

##  Executar o Zcashd através do Tor 

* Para configurar o Zcashd para usar o proxy SOCKS do Tor, você pode acrescentar o argumento de linha de comando `-proxy` ao comando do daemon.

 Por exemplo:

  $ zcashd -proxy=127.0.0.1:9050
      
Alternativamente, adicione a seguinte linha ao arquivo zcash.conf:

  proxy=127.0.0.1:9050

Para que as alterações de configuração tenham efeito, é recomendável reiniciar o zcashd.

Observe que isso pressupõe que o daemon Tor esteja sendo usado. Caso o Tor Browser Bundle esteja sendo usado, substitua 9050 por 9150.

Além disso, você pode acrescentar o argumento de linha de comando `-listenonion` para fazer com que o daemon gere um endereço .onion no qual o seu nó possa ser alcançado.
