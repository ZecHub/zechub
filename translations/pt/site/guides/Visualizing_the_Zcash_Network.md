<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


#  Visualizando a Rede Zcash

A seguir está um guia sobre como executar o Crawler Ziggurat 3.0 para Zcash, bem como os programas associados Crunchy e P2P-Viz no Ubuntu 22.04 para coletar e visualizar informações da rede Zcash.  
O vídeo vinculado abaixo segue o mesmo processo.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Instalar Requisitos: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Opcional:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(para exibir informações json no terminal)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(para consultar o RPC do crawler)

npm (com nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(para exibir o P2P-Viz no navegador)

----------------


----------------
Repositório do Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Repositório do Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Repositório do Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Repositório do P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Comece aplicando as atualizações normais.

>  Execute os seguintes comandos:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler da Rede Zcash

O Crawler de Zcash fica dentro de uma pasta chamada 'zcash', então pode ser aconselhável criar um novo diretório antes de clonar o crawler (repositório runziggurat/zcash).


>  A partir do diretório /Home, execute os seguintes comandos:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navegue no navegador até 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ou abra o readme em 
'/runziggurat/zcash/src/tools/crawler/README.md'

Esta página contém informações sobre o uso específico. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` é o único argumento obrigatório e precisa de pelo menos um endereço especificado para funcionar.



----------------

O comando 'cargo run --release --features crawler --bin crawler -- --help' é o comando literal de execução e imprimirá o menu de ajuda mostrado.


>  Execute o comando
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Isso irá compilar o programa e garantir que tudo esteja funcionando corretamente.

Para executar o Crawler, é necessário adicionar uma flag '--seed-addrs' ao comando de inicialização, contendo pelo menos um endereço IP válido de nó Zcash. O crawler deve poder rodar por um período razoável de tempo para obter um resultado preciso. Alguns exemplos de endereços IP de nós podem ser encontrados em [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Para obter informações do Crawler enquanto ele estiver em execução, é necessário adicionar a flag '--rpc-addr' ao comando de inicialização. Isso não é necessário apenas para executar o crawler em si, mas caso contrário será preciso parar o crawler (ctrl+c ou SIGKILL) para exibir qualquer informação.


>  Execute o comando
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

O crawler começará a se comunicar com a rede (por padrão a cada 20 segundos) e a coletar dados da rede. 
As informações do Crawler podem ser exibidas usando curl para consultar o nó (isso requer jq para exibir essas informações). 
O endereço RPC do Crawler neste exemplo está definido como '127.0.0.1:54321'


>  Em outro terminal, execute o comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Isso exibirá os dados atuais coletados de '.protocol_version' contidos no campo '.result'. O campo '.result' é muito grande, então é útil chamar partes específicas dele em vez disso. Outros tipos de dados úteis são '.num_known_nodes', '.num_good_nodes', '.user_agents' etc. Veja a seção de métricas [Aqui](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Para executar o Crunchy e o P2P-Viz, é necessário direcionar o '.result' para um arquivo .json. 


>  Execute o comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Isso criará um arquivo 'latest.json' no diretório atual. Esse arquivo 'latest.json' será usado com o Crunchy. 

Neste ponto, o Crawler pode ser interrompido com 'ctrl+c' se não forem necessários mais dados. O Crawler exibirá um relatório no terminal com informações úteis.


----------------

## Crunchy

O Crunchy é necessário para agregar o arquivo json de saída para uso com o P2P-Viz.


Para compilar o Crunchy, navegue até sua pasta '/runziggurat' 

>  Para clonar o repositório do Crunchy, execute os seguintes comandos
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copie e cole o arquivo 'latest.json' na pasta 'crunchy/testdata/'.

>  Execute os seguintes comandos 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Isso criará um arquivo 'state.json' filtrado para nós Zcash na pasta 'crunchy/testdata/' para ser usado com o P2P-Viz.

----------------

## P2P-Viz

Para compilar o P2P-Viz, é necessário ter npm. 


>  Para instalar npm com nvm, execute os seguintes comandos:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Feche e reinicie o terminal.


>  Execute o comando:
```bash
nvm install --lts
```

navegue até sua pasta '/runziggurat'


>  Para clonar o repositório do P2P-Viz e iniciá-lo, execute os seguintes comandos
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Abra um navegador em [http://localhost:3000](http://localhost:3000). 

Selecione 'Geolocation' e depois selecione 'Choose state file'.

Na janela pop-up do explorador de arquivos, selecione o arquivo 'state.json'. 

O mapa-múndi do explorador de nós será preenchido com os dados do arquivo. Veja o readme [Aqui](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) para mais detalhes sobre opções de uso e configurações.


----------------
DICAS! 

Você pode definir o Crawler para uma varredura temporizada simplesmente com o comando 'timeout', que emitirá um comando de encerramento específico após um período definido. Execute 'timeout --help' para mais informações.
O comando a seguir iniciará e também interromperá automaticamente o crawler após 50 min.

>  Execute o comando
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
DICAS! 

O 'latest.json' pode ser chamado e gravado em '/testdata' para que você não precise copiá-lo e colá-lo manualmente.

----------------
DICAS! 

As informações de endereço IP podem ser coletadas da saída e depois usadas para reabastecer o Crawler na inicialização (--seed-addrs). Isso reduzirá o tempo necessário para realizar uma varredura completa!
