<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Guia do usuário Keystone Zodl (antigo Zashi)

> Mantenha ZEC blindados em armazenamento a frio: pareie uma carteira de hardware Keystone com o app Zodl (antigo Zashi, renomeado em fevereiro de 2026) e assine transações por QR code.

## Resumo

* O Keystone 3 Pro (ou Keystone 3) com o firmware Cypherpunk funciona como um assinador isolado da rede para o Zodl, permitindo que os ZEC blindados fiquem em armazenamento a frio.
* Antes de começar: bateria acima de 20%, o cabo USB (ou um cartão MicroSD FAT32) para atualizações de firmware e o app Zodl no seu celular.
* Primeiro, verifique o dispositivo no site da Keystone. Isso confirma que ele não foi adulterado durante o transporte.
* Crie a carteira no Keystone e anote a frase semente de 24 palavras offline. Ela nunca vai para o Zodl.
* Conecte: no Keystone, toque em "..." > Connect Software Wallet > Zodl; depois, no Zodl, toque em Connect Hardware Wallet e escaneie o QR.
* O Zodl monta cada transação; você aprova e assina a transação na tela do Keystone, escaneando QR codes de um lado para o outro.

## Explicação principal

Uma carteira de hardware mantém suas chaves de gastos em um dispositivo separado que nunca se conecta à internet. O Keystone é isolado da rede: ele se comunica com o seu celular apenas por QR codes, sem Bluetooth nem USB.

Nesta configuração, o Zodl é o lado de "observação". Ele sincroniza com a rede Zcash, mostra seu saldo blindado e prepara as transações. O Keystone guarda a frase semente e assina. Um celular comprometido pode ver seu saldo, mas não consegue movimentar fundos sem aprovação no Keystone.

Os passos abaixo cobrem a preparação do dispositivo, a verificação, a atualização do firmware, a criação da carteira e a conexão com o Zodl.

## Visão geral

Guia Twitter:  => [Guia Twitter de integração da carteira de hardware Zodl (antigo Zashi) x Keystone](https://x.com/zashi_app/status/1869793574880973144) 

Essa integração marca uma evolução significativa na usabilidade do Zcash, ao permitir o armazenamento a frio de ZEC blindados. A comunidade Zcash enfrentou contratempos com outras plataformas de carteiras de hardware no passado, mas a Keystone surgiu como uma parceira colaborativa, disposta a ultrapassar limites e inovar junto com o Electric Coin Company. A equipe da Keystone recebeu um subsídio da ZCG para financiar sua parte do trabalho.

## Tutorial Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial Keystone X Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparação
[Encomende e receba seu Keystone 3 Pro ou Keystone 3](https://keyst.one) 

Nível de bateria: certifique-se de que seu dispositivo Keystone tem bateria acima de 20%.

Cabo USB ou cartão SD:

- Cabo USB para atualização de firmware (incluído).
- Cartão Micro SD (menor que 1 TB) para atualizações (vendido separadamente).

Acesso ao site oficial da Keystone para verificação e atualização de firmware.

App Zodl configurado no seu celular.

## [Guia passo a passo (dispositivo Keystone)](https://keyst.one/get-started) 


**Escolha seu idioma**

- **Verificação do dispositivo (via QR):** A verificação do dispositivo é essencial para detectar possíveis adulterações durante o transporte, evitar ataques à cadeia de suprimentos e garantir a segurança do firmware instalado.
  - Acesse a página de verificação de dispositivo no site da Keystone.
  - Clique em Scan QR Code no site oficial.
  - Use a câmera do seu Keystone para escanear o QR code exibido no site.
  - Um código de verificação aparecerá na tela do seu Keystone.
  - Digite esse código no site para concluir o processo de verificação.

- **Atualização de firmware:**
  - Atualização via cartão MicroSD
    - Certifique-se de que sua carteira Keystone tem pelo menos 20% de bateria.
    - Insira o cartão SD no seu computador e formate-o como FAT32.
    - Baixe a versão mais recente do firmware Cypherpunk na [Keystonepágina de atualização de firmware](https://keyst.one/firmware) e salve o arquivo keystone3.bin na raiz do seu cartão MicroSD.
    - Coloque o cartão SD com o firmware na sua carteira Keystone.
    - Acesse a opção "Upgrade" na sua carteira Keystone e siga as instruções na tela para iniciar o processo de atualização.
  - **Atualização via cabo USB**
    - Se a versão do seu firmware for anterior à 1.0.4, você precisará fazer a primeira atualização usando um cartão MicroSD antes de poder seguir com as atualizações via USB.
    - Certifique-se de que sua carteira Keystone tem pelo menos 20% de bateria.
    - Toque em via USB e use o cabo USB para conectar sua carteira Keystone ao computador. Toque em [Approve] para dar à sua carteira Keystone acesso USB, pois, caso contrário, ela pode permitir apenas o carregamento.
    - Abra o navegador do seu computador e acesse a [Keystonepágina de atualização de firmware](https://keyst.one/firmware)
    - Na página de atualização, clique no botão Install Update e siga as instruções fornecidas para instalar o firmware mais recente.
- **Criar carteira:**
    - Senha segura: escolha um PIN ou uma senha forte para proteger sua carteira.
    - Dê um nome à sua carteira (opcional): se quiser, dê um nome à sua carteira para identificá-la facilmente, ou pule esta etapa.
    - Selecione Create New Wallet se estiver configurando uma carteira pela primeira vez.
    - Seu dispositivo vai gerar uma frase semente de 24 palavras.
    - Anote essa frase semente e guarde-a em um lugar seguro.
    - Confirme a frase semente verificando as palavras na ordem correta, conforme exibido na tela.
- **Conectar Zodl + carteira Keystone:**
    - No dispositivo Keystone: toque em … na página principal
    - Toque em Connect Software Wallet e escolha Zodl. O QR code para conexão com o Zodl vai aparecer.
    - No app Zodl: toque no menu suspenso Zodl (no canto superior esquerdo da tela)
    - Toque em Connect Hardware Wallet
    - Toque em Ready to Scan
    - Escaneie o QR exibido no dispositivo Keystone
    - No app Zodl: confirme a conta da carteira Keystone tocando na conta exibida
    - Toque em Connect na parte inferior da tela


## Ajuda extra

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Conectar a carteira de hardware Keystone ao Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Assinar uma transação de saída com o Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
