<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Publicar um site no IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Introdução ao IPFS

IPFS (InterPlanetary File System) é um protocolo e uma rede peer-to-peer projetados para criar um método descentralizado de armazenar e compartilhar arquivos.

Ao contrário do modelo tradicional cliente-servidor da internet, o IPFS permite que os usuários compartilhem arquivos diretamente entre si, em vez de depender de um servidor centralizado para armazenar e distribuir conteúdo.

Os arquivos no IPFS são endereçados usando *content-addressing*, o que significa que cada arquivo recebe um hash único ou CONTENT IDENTIFIER (CID) com base em seu conteúdo, e esse hash é usado para recuperar o arquivo da rede.

Quando um usuário adiciona um arquivo ao IPFS, o arquivo é dividido em pequenas partes chamadas blocos, e cada bloco recebe um CID. Esses blocos são então armazenados em diferentes nós da rede, para que o arquivo possa ser recuperado facilmente a partir de múltiplas fontes.

Isso garante redundância e tolerância a falhas, ao mesmo tempo que dificulta que qualquer nó se torne um ponto único de falha ou controle.

**Leia: [Uma introdução ao IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Criar seu site

Para este exemplo, vamos criar um site simples.

[Site de exemplo](https://squirrel.surf/)

**Passo 1:** Se você não estiver familiarizado com web design, escreva o conteúdo principal do seu site, incluindo título, corpo principal do texto, com links para outras páginas/sites e rodapés.

**Passo 2:** Use um [template HTML!](https://nicepage.com/html-templates) Cole o texto que você escreveu de acordo com a estrutura. Opcionalmente, você também pode criar uma folha de estilos .CSS para o seu site.

**Passo 3:** Salve seu diretório. Todas as páginas .html + imagens devem estar na mesma pasta.

## Configurar um nó

Baixe e instale o IPFS a partir do [site oficial](https://docs.ipfs.tech/install/ipfs-desktop/).

### Inicializar o IPFS:

Se estiver usando o aplicativo para desktop, você não precisará inicializar.

Usando um terminal ou prompt de comando, execute o comando: ipfs init

### **Adicionar a pasta do site ao IPFS**:

Selecione a pasta com os arquivos do seu site e navegue até a opção Add Folder.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Se estiver usando o terminal, execute o comando: ipfs add -r folder_name para adicionar a pasta inteira recursivamente ao IPFS.

### Fixar o site no IPFS:

Assim que os arquivos do seu site forem adicionados ao IPFS, você precisa **fixá-los** para garantir que permaneçam disponíveis na rede.

–

Se estiver usando o terminal, execute o comando: ipfs pin add **hash**

**hash** = CID da pasta que você adicionou no passo anterior.

Como alternativa, você também pode fixar diretórios usando serviços como [Pinata](https://pinata.cloud/) ou [Dolpin](https://dolpin.io/)

Isso economiza muito tempo!

–

### Acessar seu site no IPFS:

Seu site agora está publicado no IPFS e pode ser acessado usando o hash da pasta. Para acessar seu site, você pode visitar https://ipfs.io/ipfs/**hash**

**hash** = CID da pasta.

No nosso caso, o CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

O Interplanetary Naming System (IPNS) permite que você atualize os CIDs do IPFS associados ao seu site e ainda assim mantenha um link estático. Ele é fornecido como uma chave.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


No menu de configurações da pasta do seu site no aplicativo IPFS Desktop, selecione Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Chave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ela também pode ser usada para visualizar nosso site por meio de um gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Link DNS

O site foi criado, agora precisamos de uma forma de apontar uma URL para o conteúdo.

Se você já possui um endereço web, pode adicionar um novo registro usando o registro TXT _dnslink(your domain). Dependendo do provedor, ele pode ser preenchido automaticamente.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Levará algum tempo para se propagar pela rede antes que você possa visualizá-lo.

*Parabéns! Agora você tem um site resistente à censura.*

____

**Recursos**

[Documentação do IPFS](https://docs.ipfs.tech/)

[Documentação do IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentação do link DNS](https://dnslink.io/#introduction)
