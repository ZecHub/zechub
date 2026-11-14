<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Publicar um site no IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Introdução ao IPFS 

IPFS (InterPlanetary File System) é um protocolo e rede peer-to-peer projetado para criar um método descentralizado de armazenar e compartilhar arquivos. 

Ao contrário do modelo tradicional cliente-servidor da internet, o IPFS permite que os usuários compartilhem arquivos diretamente entre si, em vez de depender de um servidor centralizado para armazenar e distribuir conteúdo. 

Os arquivos no IPFS são endereçados usando *content-addressing*, o que significa que cada arquivo recebe um hash único ou IDENTIFICADOR DE CONTEÚDO (CID) com base em seu conteúdo, e esse hash é usado para recuperar o arquivo da rede.

O IPFS armazena conteúdo como blocos identificados por CIDs. Adicionar um arquivo o armazena no seu nó, mas não o copia automaticamente para outros nós. Mantenha uma cópia acessível online, ou providencie um *pinning* remoto, para que outros leitores possam recuperá-lo. Consulte [persistência do IPFS](https://docs.ipfs.tech/concepts/persistence/).

Leia [Uma introdução ao IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Criando seu site 

Para este exemplo, estamos criando um site simples. 

[Site de exemplo](https://squirrel.surf)


**Passo 1:** Se você não estiver familiarizado com web design, escreva o conteúdo principal do seu site, incluindo título, corpo principal do texto, links para outras páginas do site e rodapés.

**Passo 2:** Use um [modelo HTML!](https://nicepage.com/html-templates) Cole o texto que você escreveu de acordo com o modelo. Também é opcional criar uma folha de estilo .CSS para o seu site. 

**Passo 3:** Coloque sua página inicial em `index.html` na raiz da pasta do site. Inclua as imagens e o CSS dela, usando caminhos relativos como `style.css`, para que funcionem também em uma URL de gateway IPFS.

## Configurando um nó

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gerencia o nó para você. Mantenha-o em execução enquanto estiver compartilhando seu site.

Para a [opção via linha de comando](https://docs.ipfs.tech/how-to/command-line-quick-start/), inicialize um novo repositório uma única vez:

```sh
ipfs init
```

Em seguida, inicie o nó e deixe este terminal aberto:

```sh
ipfs daemon
```

Execute os comandos restantes em um segundo terminal. Não inicie um segundo daemon se o IPFS Desktop já estiver gerenciando este repositório.

**Adicionar a pasta do site ao IPFS**: 

No IPFS Desktop, selecione a pasta com os arquivos do seu site usando a opção Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Para usar a CLI, execute este comando a partir do diretório pai da pasta do seu site:

```sh
ipfs add -r folder_name
```

Substitua `folder_name` pelo nome da sua pasta (coloque entre aspas os nomes que contêm espaços). Salve o CID da última linha `added ... folder_name`: ele identifica o diretório inteiro, não apenas `index.html`.

### Fixar o site no IPFS: 

O comando `ipfs add` da CLI fixa localmente o conteúdo importado por padrão. Verifique a fixação da pasta com:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Substitua `YOUR_FOLDER_CID` pelo CID da etapa anterior; a saída deve mostrar `recursive`. O pinning protege a cópia deste nó contra a coleta de lixo, mas não mantém online um computador desligado. Para garantir a disponibilidade enquanto seu nó estiver offline, configure o [pinning remoto](https://docs.ipfs.tech/how-to/work-with-pinning-services/) e confirme que o serviço remoto concluiu o pinning.

### Acesse seu site no IPFS: 

Primeiro, verifique seu site pelo gateway local em `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (use a porta do gateway exibida pelo seu daemon, se for diferente). A barra no final permite que os links relativos sejam resolvidos dentro do diretório.

Um gateway público como `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` pode servi-lo assim que conseguir recuperar o conteúdo de um nó acessível. Uma pré-visualização local bem-sucedida não comprova a disponibilidade pública.

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

Para `example.com`, adicione este registro DNS, substituindo `YOUR_FOLDER_CID` pelo CID do seu diretório:

| Tipo | Nome | Valor |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Alguns provedores de DNS adicionam a zona automaticamente; nesse caso, insira apenas `_dnslink`. Se você estiver usando o nome IPNS acima, o valor pode ser `dnslink=/ipns/YOUR_IPNS_NAME`. Veja [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Após a propagação do DNS, tente `https://ipfs.io/ipns/example.com/`. Servir o site diretamente em `https://example.com/` também exige um gateway compatível com DNSLink e a configuração de HTTPS; o registro TXT sozinho não configura essas coisas. Siga o [guia de domínio personalizado](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Parabéns! Você configurou um site resistente à censura. 


**Recursos**

[Documentação do IPFS](https://docs.ipfs.tech)

[Documentação do IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentação do link DNS](https://dnslink.io/#introduction)
