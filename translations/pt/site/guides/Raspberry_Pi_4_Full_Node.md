# Execute um nó integral em um Raspberry Pi 4 (Zebra + Zallet)

*Migrado do guia original baseado em zcashd. O zcashd atingiu sua interrupção automática de fim de suporte em 18 de julho de 2026, por isso este guia agora usa o **Zebra** (o nó integral atual, mantido pela Zcash Foundation) e a **Zallet** (a carteira criada para substituir a carteira integrada do zcashd).*

## O que você aprenderá
- Como gravar e configurar o Ubuntu Server 22.04+ (64-bit) em um Raspberry Pi 4 para uso headless
- Como instalar e executar o Zebra, seja via Docker ou por meio de um binário pré-compilado
- Como instalar, configurar e inicializar a Zallet, incluindo a configuração da criptografia da carteira
- Como migrar opcionalmente uma configuração/carteira existente do zcashd para a Zallet

## O que mudou em relação ao guia antigo
A versão anterior deste guia explicava como compilar o **zcashd** nativamente em um Pi 4 — uma compilação single-threaded que demorava 3–4 horas porque o Pi 4 não tem memória suficiente para uma compilação paralela (`-j$(nproc)`). Tanto o Zebra quanto a Zallet agora disponibilizam **binários oficiais ARM64 pré-compilados e imagens Docker**, por isso, na maioria dos casos, você não precisa mais compilar nada a partir do código-fonte no próprio Pi.

## Pré-requisitos
- Um Raspberry Pi 4 (recomendado 4 GB de RAM ou mais)
- Um cartão microSD (32 GB+) para o sistema operacional
- Um SSD/HDD externo com suporte a USB 3.0 — o **Zebra precisa de cerca de 300 GB para os dados da Mainnet em cache**, e esse valor cresce com o tempo, por isso não tente executar isso apenas a partir do cartão microSD
- Um computador com slot para cartão microSD (para gravar a imagem do sistema operacional)
- Uma conexão Ethernet com fio ou Wi-Fi
- Conhecimentos básicos de linha de comando via SSH

## Passo 1: Grave o Ubuntu Server 22.04+ (64-bit)
Os binários pré-compilados e as imagens Docker do Zebra e da Zallet exigem **glibc 2.34+**, o que significa **Ubuntu Server 22.04 ou mais recente (64-bit/aarch64)**.

1. Instale o Raspberry Pi Imager no seu computador principal.
2. Insira seu cartão microSD.
3. Escolha **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ou mais recente).
4. Use as opções avançadas do Imager (ícone de engrenagem) para pré-configurar o hostname, ativar o SSH e definir as credenciais de Wi-Fi, se necessário, para uma primeira inicialização headless.
5. Grave a imagem, insira o cartão e ligue o Pi.
6. Conecte-se por SSH: `ssh <username>@<pi-hostname-or-ip>`

## Passo 2: Conecte e monte o armazenamento externo
1. Conecte seu SSD/HDD externo via USB 3.0.
2. Identifique o dispositivo: `lsblk`
3. Formate-o (se for novo) e monte-o, por exemplo, em `/mnt/zcash-data`, com uma configuração padrão de `mkfs`/`fstab` para que seja montado automaticamente ao reiniciar.

## Passo 3: Atualize o sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Passo 4: Instale e execute o Zebra
### Opção A — Docker (recomendado)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Verifique o progresso: `docker logs -f zebra`

### Opção B — Binário pré-compilado via cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Isso instala um binário `aarch64` pré-compilado — não é necessário compilar.

**Sobre o tempo de sincronização:** espere que isso leve algum tempo — os valores frequentemente citados para a primeira sincronização (cerca de 2 horas) vêm de hardware de referência mais potente do que a CPU de um Pi 4, por isso seu tempo real de sincronização em um Pi 4 provavelmente será maior.

## Passo 5: Instale a Zallet
A Zallet está atualmente em **alpha** — espere mudanças incompatíveis e ainda não a trate como uma solução de custódia pronta para produção para fundos significativos.

### Opção A — Docker (recomendado)
```bash
docker pull zodlinc/zallet:latest
```
Esta imagem oferece suporte a ARM64 (por meio de uma build baseada em Nix) e é executada a partir de um sistema de arquivos mínimo, sem shell — passe explicitamente os caminhos de configuração e dados por meio de `--datadir` e mounts de volume (consulte o Passo 6).

### Opção B — Compile a partir do código-fonte
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Os crates da Zallet ainda não estão publicados no crates.io durante a fase alpha, por isso a instalação diretamente a partir do repositório git é o método sem Docker compatível.

## Passo 6: Configure a Zallet
Crie `zallet.toml` no diretório de dados escolhido (por exemplo, `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Ajuste `validator_address` se o Zebra estiver sendo executado em outro host/porta e configure `validator_cookie_auth`/`validator_user`/`validator_password` em `[indexer]` para corresponder à configuração de autenticação RPC do seu Zebra.

**Migrando do zcashd?** Se você ainda tiver um `zcash.conf` antigo:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Passo 7: Configure a criptografia da carteira
A Zallet criptografa todo o material de chaves usando `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Isso mostra uma chave pública e uma passphrase gerada automaticamente — **guarde a passphrase; você não poderá recuperar o arquivo de identidade sem ela.**

## Passo 8: Inicialize e inicie a carteira
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Execute `generate-mnemonic` apenas uma vez** a menos que você queira deliberadamente várias raízes de gasto independentes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Passo 9: Migre uma carteira existente do zcashd (opcional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Isso exige o utilitário `db_dump` (compilado com Berkeley DB 6.2.23) — de uma instalação do sistema ou de uma compilação local do código-fonte do zcashd. Se você não tiver mais o zcashd instalado, este é o único passo da migração que ainda não é totalmente autônomo na Zallet.

## Passo 10: Verifique se tudo funciona
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirme que a carteira responde e, assim que o Zebra terminar a sincronização, que os saldos/endereços correspondem ao esperado.

## Solução de problemas
- **Problemas de build/runtime do Zebra em ARM:** se estiver compilando a partir do código-fonte, instale a toolchain ARM do Rust — executar ferramentas de build x86_64 em hardware ARM será visivelmente mais lento, conforme a própria documentação do Zebra.
- **Armazenamento enchendo:** a ocupação de ~300 GB do Zebra continua crescendo — planeje espaço adicional.
- **Erros de permissões do Docker:** encerre a sessão e entre novamente depois de adicionar seu usuário ao grupo `docker`, ou use `sudo` enquanto isso.
- **O contêiner da Zallet não tem shell:** a imagem oficial `zodlinc/zallet` é from-scratch por definição — sempre passe `--datadir` explicitamente e monte seu diretório de dados como volume.

## Notas sobre o hardware em relação ao antigo guia do zcashd
O Zebra e a Zallet geralmente exigem menos CPU durante a configuração do que compilar o zcashd exigia, pois você está executando binários/contêineres pré-compilados. 4 GB de RAM é um ponto de partida razoável; monitore com `htop` e considere a variante Pi 4 de 8 GB se perceber uso intenso de swap.

## Recursos adicionais
- [Livro do Zebra](https://zebra.zfnd.org) — documentação oficial do Zebra
- [Livro da Zallet](https://zcash.github.io/zallet/) — documentação oficial da Zallet
- [Aviso de fim de suporte do zcashd](https://z.cash/support/zcashd-deprecation)

---

*Se este guia foi útil para você, considere apoiar a ZecHub: [insira o endereço blindado atual de doação da ZecHub em zechub.wiki/donation — não incluído aqui porque não consegui verificar se ainda está atual].*
