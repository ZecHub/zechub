<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Servir repositório Github com IPFS

## Introdução

Neste guia, aprenderemos como criar uma URL clonável por git para o seu repositório Github servido usando um CID do IPFS. Isso é útil para garantir a disponibilidade do conteúdo independentemente da região geográfica, resistência à censura e como um backup persistente de informações valiosas!

Observação: Os dados enviados ao IPFS ficam disponíveis para *todos* os usuários da rede. Você pode querer criptografar localmente dados pessoais/sensíveis.


## Instalar IPFS Kubo

Siga as instruções de instalação fornecidas [aqui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Neste exemplo usamos Linux, outras versões para outros sistemas operacionais estão disponíveis.

Verifique se a instalação foi bem-sucedida usando "ipfs --version"


## Clonar repositório

Para começar, selecione um repositório Git que você deseja hospedar e clone-o:

Executar comando: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Agora, para deixá-lo pronto para ser clonado via IPFS.

cd zechub
git update-server-info


Descompacte os objetos do Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Fazer isso permitirá que o IPFS desduplique objetos se você atualizar o repositório Git mais tarde.


## Adicionar ao IPFS

Depois de fazer isso, o repositório estará pronto para ser servido. Tudo o que resta fazer é adicioná-lo ao IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

O CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Excelente! Agora seu repositório foi enviado para a rede.


## Clonar usando IPFS

Agora você deve ser capaz de recuperar o repositório github usando:

git clone http://ipfs.io/ipfs/"yourCID"

Como alternativa, você pode pesquisar e recuperar usando o seu nó IPFS local.

Observação final: A pasta do repositório no IPFS não recebe atualizações junto com o repositório github real. Recomenda-se reenviar a pasta em intervalos regulares.
