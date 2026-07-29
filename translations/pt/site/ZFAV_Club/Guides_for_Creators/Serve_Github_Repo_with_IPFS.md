<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Servir Repositório GitHub com IPFS

## Introdução

Neste guia, aprendemos como criar uma URL clonável por git para o seu repositório GitHub servido usando um CID do IPFS. 

Isto é útil para garantir a disponibilidade do conteúdo independentemente da região geográfica, resistência à censura e como um backup persistente de informações valiosas!

Nota: Os dados enviados para o IPFS ficam disponíveis para todos os utilizadores da rede. Pode ser desejável encriptar localmente dados pessoais/sensíveis.

## Instalar IPFS Kubo

Siga as instruções de instalação fornecidas [aqui](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Neste exemplo usamos Linux, outras versões de SO estão disponíveis.

Verifique se a instalação foi bem-sucedida usando   ipfs –version

## Clonar Repositório

Para começar, selecione um repositório Git que pretende hospedar e clone-o:

Executar comando: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Agora, para prepará-lo para ser clonado via IPFS.

cd zechub git update-server-info

Descompacte os objetos do Git:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Fazer isto permitirá que o IPFS desduplique objetos se atualizar o repositório Git posteriormente.

## Adicionar ao IPFS

Depois de fazer isso, esse repositório está pronto para ser servido. Tudo o que falta fazer é adicioná-lo ao IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

O CID resultante: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Excelente! Agora o seu repositório foi carregado para a rede.

## Clonar usando IPFS

Agora já deverá conseguir obter o repositório GitHub usando:

git clone http://ipfs.io/ipfs/yourCID

Em alternativa, pode pesquisar e obter usando o seu nó IPFS local.

Nota final: A pasta do repositório no IPFS não recebe atualizações juntamente com o repositório github real. Recomenda-se reenviar a pasta em intervalos regulares.
