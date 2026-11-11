<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Servir repositório do GitHub com IPFS

## Introdução

Neste guia, você aprenderá a criar uma URL clonável com Git para o seu repositório do GitHub, disponibilizado usando um CID do IPFS. Isso é útil para garantir a disponibilidade do conteúdo independentemente da região geográfica, oferecer resistência à censura e manter um backup persistente de informações valiosas!

Observação: Os dados enviados ao IPFS ficam disponíveis para *todos* os usuários da rede. Talvez você queira criptografar localmente dados pessoais/sensíveis.


## Instalar IPFS Kubo

Siga as instruções de instalação fornecidas [aqui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Neste exemplo, usamos Linux; outras versões para outros sistemas operacionais estão disponíveis.

Verifique se a instalação foi bem-sucedida usando "ipfs --version"


## Clonar repositório

Para começar, selecione um repositório Git que você deseja hospedar e clone-o:

Execute o comando: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Agora, deixe-o pronto para ser clonado via IPFS.

cd zechub
git update-server-info


Descompacte os objetos do Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Fazer isso permitirá que o IPFS deduplique objetos se você atualizar o repositório Git mais tarde.


## Adicionar ao IPFS

Depois de fazer isso, o repositório estará pronto para ser disponibilizado. Tudo o que resta fazer é adicioná-lo ao IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

O CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Excelente! Agora seu repositório foi enviado para a rede.


## Clonar usando IPFS

Agora você já deve conseguir recuperar o repositório do GitHub usando:

git clone http://ipfs.io/ipfs/"yourCID"

Como alternativa, você pode pesquisar e recuperar usando o nó local do IPFS.

Observação final: A pasta do repositório no IPFS não recebe atualizações junto com o repositório real do GitHub. É recomendável que você reenvie a pasta em intervalos regulares.
