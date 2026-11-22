<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


#  Visualizando a rede Zcash

Este é um guia sobre como executar o Ziggurat 3.0 Crawler para Zcash, além dos programas associados Crunchy e P2P-Viz, no Ubuntu 22.04, para coletar e visualizar informações da rede Zcash.  
O vídeo abaixo segue o mesmo processo.

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
## Requisitos de instalação: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Opcional:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(para exibir informações em json no terminal)

curl -> [https://everything.curl.dev/install/linux.html](https://everything.curl.dev/install/linux.html)
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

## Crawler da rede Zcash

O Crawler do Zcash fica dentro de uma pasta chamada 'zcash', então pode ser aconselhável criar um novo diretório antes de clonar o crawler (repositório runziggurat/zcash).


>  A partir do diretório /Home, execute os seguintes comandos:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

No navegador, acesse 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ou abra o readme em 
'/runziggurat/zcash/src/tools/crawler/README.md'

Essa página contém informações sobre usos específicos. 

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

`--seed-addrs` \ `--dns-seed` é o único argumento obrigatório e precisa de pelo menos um endereço especificado para ser executado.



----------------

O comando 'cargo run --release --features crawler --bin crawler -- --help' é o comando de execução literal e vai exibir o menu de ajuda mostrado.


>  Execute o comando
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Isso vai compilar o programa e garantir que tudo esteja funcionando corretamente.

Para executar o Crawler, é necessário adicionar a flag '--seed-addrs' ao comando de inicialização, contendo pelo menos um endereço IP válido de um nó Zcash. O crawler deve ficar rodando por um tempo razoável para obter um resultado preciso. Alguns endereços IP de nós de exemplo podem ser encontrados em  [https://mainnet.zcashexplorer.app/nodes](https://mainnet.zcashexplorer.app/nodes).

Para obter informações do Crawler enquanto ele está rodando, é necessário adicionar a flag '--rpc-addr' ao comando de inicialização. Ela não é necessária apenas para executar o crawler em si, mas, sem ela, será preciso parar o crawler (ctrl+c ou SIGKILL) para exibir qualquer informação.


>  Execute o comando
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

O crawler vai começar a se comunicar com a rede (por padrão, a cada 20 segundos) e a coletar dados da rede. 
As informações do Crawler podem ser exibidas usando curl para consultar o nó (isso requer jq para exibir essas informações). 
O endereço RPC do Crawler neste exemplo está definido como '127.0.0.1:54321'


>  Em outro terminal, execute o comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Isso vai exibir os dados de '.protocol_version' coletados até o momento, contidos no campo '.result'. O campo '.result' é muito grande, então é útil consultar partes específicas dele. Outros tipos de dados úteis são '.num_known_nodes', '.num_good_nodes', '.user_agents' etc. Veja a seção de métricas [aqui](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Para executar o Crunchy e o P2P-Viz, é necessário redirecionar o '.result' para um arquivo .json. 


>  Execute o comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Isso vai criar um arquivo 'latest.json' no diretório atual. Esse arquivo 'latest.json' será usado com o Crunchy. 

Neste ponto, o Crawler pode ser parado com 'ctrl+c' se não forem necessários mais dados. O Crawler vai exibir no terminal um relatório com informações úteis.


----------------

## Crunchy

O Crunchy é necessário para agregar o arquivo json de saída para uso com o P2P-Viz.


Para compilar o Crunchy, navegue até a sua pasta '/runziggurat' 

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

Isso vai criar um arquivo 'state.json' filtrado por nós Zcash na pasta 'crunchy/testdata/', para ser usado com o P2P-Viz.

----------------

## P2P-Viz

Para compilar o P2P-Viz, é necessário ter o npm. 


>  Para instalar o npm com nvm, execute os seguintes comandos:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Feche e reinicie o terminal.


>  Execute o comando:
```bash
nvm install --lts
```

Navegue até a sua pasta '/runziggurat'


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

O mapa-múndi do explorador de nós será preenchido com os dados do arquivo. Veja o readme [aqui](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) para mais detalhes sobre opções de uso e configurações.


----------------
DICAS! 

Você pode configurar o Crawler para uma varredura com tempo definido simplesmente usando o comando 'timeout', que envia um comando de encerramento específico após um período definido. Execute 'timeout --help' para mais informações.
O comando a seguir vai iniciar o crawler e também pará-lo automaticamente após 50 minutos.

>  Execute o comando
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
DICAS! 

O 'latest.json' pode ser consultado e gravado diretamente em '/testdata', assim você não precisa copiá-lo e colá-lo manualmente.

----------------
DICAS! 

As informações de endereços IP podem ser coletadas da saída e depois usadas para alimentar novamente o Crawler na inicialização (--seed-addrs). Isso vai reduzir o tempo necessário para fazer uma varredura completa!
