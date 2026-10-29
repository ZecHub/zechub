<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Publicar um site no IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Introdução ao IPFS 

IPFS (InterPlanetary File System) é um protocolo e rede peer-to-peer projetado para criar um método descentralizado de armazenar e compartilhar arquivos. 

Ao contrário do modelo tradicional cliente-servidor da internet, o IPFS permite que os usuários compartilhem arquivos diretamente entre si, em vez de depender de um servidor centralizado para armazenar e distribuir conteúdo. 

Os arquivos no IPFS são endereçados usando *content-addressing*, o que significa que cada arquivo recebe um hash único ou IDENTIFICADOR DE CONTEÚDO (CID) com base em seu conteúdo, e esse hash é usado para recuperar o arquivo da rede.

Quando um usuário adiciona um arquivo ao IPFS, o arquivo é dividido em pequenas partes chamadas blocos, e cada bloco recebe um CID. Esses blocos são então armazenados em diferentes nós da rede, para que o arquivo possa ser facilmente recuperado de várias fontes. 

Isso garante redundância e tolerância a falhas, ao mesmo tempo em que dificulta que qualquer nó se torne um ponto único de falha ou controle. 

Leia [Uma introdução ao IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Criando seu site 

Para este exemplo, estamos criando um site simples. 

[Site de exemplo](https://squirrel.surf)


**Passo 1:** Se você não estiver familiarizado com web design, escreva o conteúdo principal do seu site, incluindo título, corpo principal do texto, links para outras páginas do site e rodapés.

**Passo 2:** Use um [modelo HTML!](https://nicepage.com/html-templates) Cole o texto que você escreveu de acordo com o modelo. Também é opcional criar uma folha de estilo .CSS para o seu site. 

**Passo 3:** Salve sua pasta. Todas as páginas .html + imagens devem estar na mesma pasta. 



## Configurando um nó

Baixe e instale o IPFS a partir do [site oficial](https://docs.ipfs.tech/install/ipfs-desktop/).



### Inicializar o IPFS: 

Se você estiver usando o aplicativo para desktop, não precisará inicializar. 

Usando um terminal ou prompt de comando, execute o comando: <mark>ipfs init </mark>. 



**Adicionar a pasta do site ao IPFS**: 

Selecione a pasta com os arquivos do seu site e navegue até a opção Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Se estiver usando o terminal, execute o comando: <mark>ipfs add -r "folder_name"</mark> para adicionar toda a pasta recursivamente ao IPFS.


### Fixar o site no IPFS: 

Assim que os arquivos do seu site forem adicionados ao IPFS, você precisa **fixá-los** para garantir que permaneçam disponíveis na rede.

--

Se estiver usando o terminal, execute o comando: Se estiver usando o terminal, execute o comando: <mark>ipfs pin add "hash"</mark> 

"hash" = CID da pasta que você adicionou na etapa anterior.


Como alternativa, você também pode fixar diretórios usando serviços como [Pinata](https://pinata.cloud) ou [Dolpin](https://dolpin.io)

Isso economiza muito tempo! 

--

### Acesse seu site no IPFS: 

Seu site agora está publicado no IPFS e pode ser acessado usando o hash da pasta. Para acessar seu site, você pode visitar https://ipfs.io/ipfs/"hash" 

"hash" = CID da pasta.

No nosso caso, o CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) permite que você atualize os CIDs do IPFS associados ao seu site e ainda mantenha um link estático. Ele é fornecido como uma chave. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

No menu de configurações da pasta do seu site no aplicativo desktop do IPFS, selecione Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Chave: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Ela também pode ser usada para visualizar nosso site por meio de um gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Link DNS 
 
O site foi criado, agora você precisa de uma forma de apontar uma URL para o conteúdo. 

Se você já possui um endereço na web, pode adicionar um novo registro usando o registro TXT "_dnslink(your domain)". Dependendo do provedor, ele pode ser preenchido automaticamente. 

![](/content-images/example-c2a9edb28b.webp)

Levará algum tempo para se propagar pela rede antes que você possa visualizá-lo. 

Parabéns! Você configurou um site resistente à censura. 


**Recursos**

[Documentação do IPFS](https://docs.ipfs.tech)

[Documentação do IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentação do link DNS](https://dnslink.io/#introduction)
