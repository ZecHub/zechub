<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Guia do Raspberry Pi 4 para Executar Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Executar o software de nó Zebra em um Raspberry Pi 4 permite que você participe da rede Zcash como um nó independente, compatível com consenso. Este guia vai orientá-lo pelas etapas para configurar e executar Zebra no seu Raspberry Pi 4.

## Pré-requisitos

1. Raspberry Pi 4 (recomenda-se 2GB de RAM ou mais).

2. Cartão MicroSD (recomenda-se 16GB ou mais) com Raspberry Pi OS (Raspbian) instalado.

3. Conexão de internet estável.

4. Teclado, mouse e monitor (para a configuração inicial).

5. Cliente SSH (opcional, para acesso remoto).

## Instalação

1. __Atualize Seu Sistema__
   Abra um terminal ou acesse seu Raspberry Pi via SSH e certifique-se de que seu sistema está atualizado executando:

   __sudo apt update__

   __sudo apt upgrade__

2. __Instale as Dependências__
   Você precisará instalar algumas dependências necessárias para compilar e executar Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Clone o Repositório do Zebra__
   Abra um terminal e clone o repositório do Zebra no seu Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Compile o Zebra__
   Para compilar o Zebra, use os seguintes comandos:

   __cargo build --release__

   Este processo pode levar algum tempo. Certifique-se de que seu Raspberry Pi esteja adequadamente resfriado, pois a compilação pode gerar calor.

5. __Configuração__
   Crie um arquivo de configuração para o Zebra. Você pode usar a configuração padrão como ponto de partida:

   __cp zcash.conf.example zcash.conf__

   Edite o arquivo zcash.conf para personalizar as configurações do seu nó. Você pode especificar a rede, habilitar mineração, configurar conexões com peers e muito mais.

6. __Inicie o Zebra__
   Agora você pode iniciar o Zebra com sua configuração personalizada:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Este comando iniciará o nó Zebra, e ele começará a sincronizar com a blockchain da Zcash.

7. __Monitoramento__
   Você pode monitorar o progresso e o status do seu nó Zebra abrindo um navegador web e acessando __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="logo do zebra" width="200" height="200"/>

## Solução de Problemas

Se você encontrar qualquer problema ao compilar ou executar o Zebra, consulte a [documentação do Zebra](https://doc.zebra.zfnd.org/docs/intro.html) para dicas de solução de problemas e informações adicionais.

Certifique-se de manter seu Raspberry Pi resfriado, pois executar um nó pode gerar calor. Você pode querer usar uma solução de resfriamento, como uma ventoinha ou um dissipador de calor.

## Conclusão

Seguindo este guia, você deverá ter configurado e executado com sucesso o Zebra no seu Raspberry Pi 4. Agora você está contribuindo para a rede Zcash como um nó independente, ajudando a proteger a privacidade das transações de Zcash.
