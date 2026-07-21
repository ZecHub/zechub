# Guia do Usuário do Keystone Zashi

Guia no Twitter:  => [Guia no Twitter da Integração da Hardware Wallet Zashi x Keystone](https://x.com/zashi_app/status/1869793574880973144) 

Esta integração representa uma evolução significativa na usabilidade do Zcash ao permitir o armazenamento a frio de ZEC protegidos. A comunidade Zcash enfrentou contratempos com outras plataformas de hardware wallet no passado, mas a Keystone surgiu como uma parceira colaborativa disposta a ultrapassar limites e inovar ao lado da Electric Coin Company. A equipe da Keystone recebeu uma bolsa da ZCG para impulsionar sua parte do trabalho.

## Tutorial Keystone X Zashi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial Keystone X Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparação
[Peça e receba sua Keystone 3 Pro ou Keystone 3](https://keyst.one) 

Nível da bateria: Certifique-se de que seu dispositivo Keystone esteja com o nível da bateria acima de 20%.

Cabo USB ou cartão SD:

- Cabo USB para atualização de firmware (incluído).
- Cartão Micro SD (abaixo de 1 TB) para upgrades (comprado separadamente).

Acesso ao site oficial da Keystone para verificação e atualização de firmware.

Configuração do aplicativo Zashi no seu dispositivo móvel.

## [Guia passo a passo (dispositivo Keystone)](https://keyst.one/get-started) 


**Escolha seu idioma**
-Verificação do dispositivo (via QR): A verificação do dispositivo é crucial para detectar possível contaminação durante o transporte, prevenir ataques à cadeia de suprimentos e garantir a segurança do firmware instalado.
  - Visite a página de verificação do dispositivo no site da Keystone.
  - Clique em Scan QR Code no site oficial.
  - Use a câmera da sua Keystone para escanear o código QR exibido no site.
  - Um código de verificação aparecerá na tela da sua Keystone.
  - Insira esse código no site para concluir o processo de verificação.

- **Atualização de firmware:**
  - Atualizar via cartão MicroSD
    - Certifique-se de que sua wallet Keystone tenha pelo menos 20% de carga na bateria.
    - Insira o cartão SD no seu computador e formate-o em FAT32.
    - Baixe a versão mais recente do firmware Cypherpunk na [página de atualização de firmware da Keystone](https://keyst.one/firmware) e salve o arquivo keystone3.bin na raiz do seu cartão MicroSD.
    - Coloque o cartão SD com o firmware na sua wallet Keystone.
    - Acesse a opção "Upgrade" na sua wallet Keystone e siga as instruções na tela para iniciar o processo de atualização.
  - **Atualizar via cabo USB**
    - Se a sua versão de firmware for inferior a 1.0.4, você precisará realizar a atualização inicial usando um cartão MicroSD antes de poder prosseguir com atualizações via USB.
    - Certifique-se de que sua wallet Keystone tenha pelo menos 20% de carga na bateria.
    - Toque em via USB e use o cabo USB para conectar sua wallet Keystone ao computador. Toque em [Approve] para conceder acesso USB à sua wallet Keystone, pois, caso contrário, ela poderá permitir apenas carregamento.
    - Abra o navegador do seu computador e acesse a [página de atualização de firmware da Keystone](https://keyst.one/firmware)
    - Na página de atualização, clique no botão Install Update e siga as instruções fornecidas para instalar o firmware mais recente.
- **Criar wallet:**
    - Senha segura: Escolha um PIN ou senha forte para proteger sua wallet.
    - Dê um nome à sua wallet (opcional): Opcionalmente, dê um nome à sua wallet para fácil identificação ou pule esta etapa.
    - Selecione Create New Wallet se estiver configurando uma wallet pela primeira vez.
    - Seu dispositivo irá gerar uma frase-semente de 24 palavras.
    - Anote essa frase-semente e guarde-a em segurança.
    - Confirme a frase-semente verificando as palavras na ordem correta, conforme exibido na tela.
- **Conectar a wallet Zashi + Keystone:**
    - No dispositivo Keystone: Toque em … na página principal
    - Toque em Connect Software Wallet e escolha Zashi. O código QR para conexão com o Zashi aparecerá.
    - No aplicativo Zashi: Toque no menu suspenso do zashi (canto superior esquerdo da tela)
    - Toque em Connect Hardware Wallet
    - Toque em Ready to Scan
    - Escaneie o QR exibido no dispositivo Keystone
    - No aplicativo Zashi: Confirme a conta da wallet Keystone tocando na conta exibida
    - Toque em Connect na parte inferior da tela


## Ajuda extra

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Conectar Hardware Wallet Keystone ao Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Assinar uma transação de saída com a Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
