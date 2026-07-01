<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Publicar um Site no IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## Introdução ao IPFS

IPFS (InterPlanetary File System) é um protocolo e rede peer-to-peer concebido para criar um método descentralizado de armazenar e partilhar ficheiros.

Ao contrário do modelo tradicional cliente-servidor da internet, o IPFS permite que os utilizadores partilhem ficheiros diretamente entre si, em vez de dependerem de um servidor centralizado para armazenar e distribuir conteúdo.

Os ficheiros no IPFS são endereçados usando *content-addressing*, o que significa que a cada ficheiro é atribuído um hash único ou CONTENT IDENTIFIER (CID) com base no seu conteúdo, e esse hash é utilizado para recuperar o ficheiro da rede.

Quando um utilizador adiciona um ficheiro ao IPFS, o ficheiro é dividido em pequenas partes chamadas blocos, e a cada bloco é atribuído um CID. Esses blocos são então armazenados em diferentes nós da rede, para que o ficheiro possa ser recuperado facilmente a partir de múltiplas fontes.

Isto garante redundância e tolerância a falhas, ao mesmo tempo que dificulta que qualquer nó se torne um ponto único de falha ou de controlo.

**Leia: [Uma Introdução ao IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Criar o seu Site

Para este exemplo vamos criar um website simples.

[Site de Exemplo](https://squirrel.surf/)

**Passo 1:** Se não estiver familiarizado com web design, escreva o conteúdo principal do seu website, incluindo Título, Corpo principal do texto, com links para outras páginas/site e rodapés.

**Passo 2:** Use um [template HTML!](https://nicepage.com/html-templates) Cole o texto que escreveu de acordo com a estrutura. Opcionalmente, também pode criar uma folha de estilos .CSS para o seu website.

**Passo 3:** Guarde o seu diretório. Todas as páginas .html + imagens devem estar na mesma pasta.

## Configurar um Nó

Descarregue e instale o IPFS a partir do [site oficial](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inicializar o IPFS:

Se estiver a usar a aplicação para desktop, não terá de inicializar.

Usando um Terminal ou prompt de comandos, execute o comando: ipfs init

### **Adicionar a Pasta do Site ao IPFS**:

Selecione a pasta com os ficheiros do seu website e navegue até à opção Add Folder.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Se estiver a usar o Terminal, execute o comando: ipfs add -r folder_name para adicionar a pasta inteira recursivamente ao IPFS.

### Fixar o Site no IPFS:

Assim que os ficheiros do seu website forem adicionados ao IPFS, precisa de os **fixar** para garantir que permanecem disponíveis na rede.

–

Se estiver a usar o Terminal, execute o comando: If using Terminal, Run command: ipfs pin add **hash**

**hash** = CID da pasta que adicionou no passo anterior.

Em alternativa, também pode fixar diretórios usando serviços como [Pinata](https://pinata.cloud/) ou [Dolpin](https://dolpin.io/)

Poupa muito tempo!

–

### Aceder ao seu website no IPFS:

O seu website está agora publicado no IPFS e pode ser acedido usando o hash da pasta. Para aceder ao seu website, pode visitar https://ipfs.io/ipfs/**hash**

**hash** = CID da pasta.

No nosso caso, o CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

O Interplanetary Naming System (IPNS) permite-lhe atualizar os CIDs do IPFS associados ao seu website e ainda assim servir um link estático. É fornecido como uma chave.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


No menu de definições da pasta do seu site na aplicação IPFS Desktop, selecione Publish to IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Chave: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Também pode ser usada para ver o nosso site através de um gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

O site foi criado, agora precisamos de uma forma de apontar um URL para o conteúdo.

Se já possuir um endereço web, pode adicionar um novo registo usando o registo TXT _dnslink(your domain). Dependendo do fornecedor, pode ser preenchido automaticamente.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Levará algum tempo a propagar-se pela rede antes de o poder visualizar.

*Parabéns! Agora tem um website resistente à censura.*

____

**Recursos**

[Documentação do IPFS](https://docs.ipfs.tech/)

[Documentação do IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentação do DNS link](https://dnslink.io/#introduction)
