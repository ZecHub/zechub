<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia do Raspberry Pi 4 para executar o Zebra

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Executar o software de nó Zebra em um Raspberry Pi 4 permite que você participe da rede Zcash como um nó independente e compatível com o consenso. Este guia mostrará o passo a passo para configurar e executar o Zebra no seu Raspberry Pi 4.

## Pré-requisitos

1. Raspberry Pi 4 (recomenda-se 2GB de RAM ou mais).

2. Cartão MicroSD (recomenda-se 16GB ou mais) com o Raspberry Pi OS (Raspbian) instalado.

3. Conexão estável com a internet.

4. Teclado, mouse e monitor (para a configuração inicial).

5. Cliente SSH (opcional, para acesso remoto).

## Instalação

1. __Atualize seu sistema__
   Abra um terminal ou conecte-se via SSH ao seu Raspberry Pi e garanta que seu sistema esteja atualizado executando:

   __sudo apt update__

   __sudo apt upgrade__

2. __Instale as dependências__
   Você precisará instalar algumas dependências necessárias para compilar e executar o Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Clone o repositório do Zebra__
   Abra um terminal e clone o repositório do Zebra no seu Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Compile o Zebra__
   Para compilar o Zebra, use os seguintes comandos:

   __cargo build --release__

   Esse processo pode levar algum tempo. Certifique-se de que seu Raspberry Pi esteja adequadamente refrigerado, pois a compilação pode gerar calor.

5. __Configuração__
   Crie um arquivo de configuração para o Zebra. Você pode usar a configuração padrão como ponto de partida:

   __cp zcash.conf.example zcash.conf__

   Edite o arquivo zcash.conf para personalizar as configurações do seu nó. Você pode especificar a rede, ativar a mineração, configurar conexões com pares e muito mais.

6. __Inicie o Zebra__
   Agora você pode iniciar o Zebra com sua configuração personalizada:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Esse comando iniciará o nó Zebra, que começará a sincronizar com a blockchain do Zcash.

7. __Monitoramento__
   Você pode monitorar o progresso e o status do seu nó Zebra abrindo um navegador e acessando __http://127.0.0.1:8233/status__.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## Solução de problemas

Se você encontrar algum problema ao compilar ou executar o Zebra, consulte a [Zebra documentação](https://zebra.zfnd.org/user/troubleshooting.html) para obter dicas de solução de problemas e informações adicionais.

Mantenha seu Raspberry Pi refrigerado, pois executar um nó pode gerar calor. Talvez você queira usar uma solução de refrigeração, como um ventilador ou um dissipador de calor.

## Conclusão

Seguindo este guia, você deve ter configurado e executado com sucesso o Zebra no seu Raspberry Pi 4. Agora você está contribuindo com a rede Zcash como um nó independente, ajudando a garantir a privacidade das transações do Zcash.
