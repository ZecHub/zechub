<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sirva um repositório GitHub com IPFS

## Introdução

Neste guia, você vai aprender a criar uma URL clonável via git para o seu repositório GitHub, servido usando um CID do IPFS. 

Isso é útil para garantir a disponibilidade do conteúdo independentemente da região geográfica, para resistir à censura e como backup permanente de informações valiosas!

Observação: os dados enviados ao IPFS ficam disponíveis para todos os usuários da rede. Talvez você queira aplicar criptografia localmente aos dados pessoais/sensíveis.

## Instale o IPFS Kubo

Siga as instruções de instalação disponíveis [aqui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Neste exemplo usamos Linux. Há versões para outros sistemas operacionais.

Verifique se a instalação foi bem-sucedida usando   ipfs –version

## Clone o repositório

Para começar, escolha um repositório Git que você quer hospedar e clone-o:

Execute o comando: "git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Agora, prepare-o para ser clonado via IPFS.

cd zechub git update-server-info

Descompacte os objetos do Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Isso permite que o IPFS elimine objetos duplicados se você atualizar o repositório Git mais tarde.

## Adicione ao IPFS

Feito isso, o repositório está pronto para ser servido. Só falta adicioná-lo ao IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

O CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Excelente! Agora o seu repositório foi enviado para a rede.

## Clone usando o IPFS

Agora você deve conseguir obter o repositório GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

Como alternativa, você pode buscar e obter o repositório usando o seu nó IPFS local.

Observação final: a pasta do repositório no IPFS não recebe as atualizações feitas no repositório do GitHub. Recomendamos enviar a pasta novamente em intervalos regulares.
