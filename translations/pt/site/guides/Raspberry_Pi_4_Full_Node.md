---
# Executar um Nó Completo num Raspberry Pi 4 (Zebra + Zallet)

*Migrado do guia original baseado em zcashd. O zcashd atingiu a sua paragem automática de Fim de Suporte em 18 de julho de 2026, por isso este guia utiliza agora o **Zebra** (o nó completo atual, mantido pela Zcash Foundation) e o **Zallet** (a wallet criada para substituir a wallet integrada do zcashd).*

## O que vai aprender
- Como gravar e configurar o Ubuntu Server 22.04+ (64-bit) num Raspberry Pi 4 para utilização headless
- Como instalar e executar o Zebra, quer via Docker quer através de um binário pré-compilado
- Como instalar, configurar e inicializar o Zallet, incluindo a configuração da encriptação da wallet
- Como migrar opcionalmente uma configuração/wallet existente do zcashd para o Zallet

## O que mudou em relação ao guia antigo
A versão anterior deste guia explicava como compilar o **zcashd** nativamente num Pi 4 — uma compilação single-threaded que demorava 3–4 horas porque o Pi 4 não tem memória suficiente para uma compilação paralela (`-j$(nproc)`). Tanto o Zebra como o Zallet disponibilizam agora **binários oficiais ARM64 pré-compilados e imagens Docker**, por isso, na maioria dos casos, já não precisa de compilar nada a partir do código-fonte no próprio Pi.

## Pré-requisitos
- Um Raspberry Pi 4 (recomendados 4 GB de RAM ou mais)
- Um cartão microSD (32 GB+) para o sistema operativo
- Um SSD/HDD externo com suporte USB 3.0 — o **Zebra precisa de cerca de 300 GB para os dados de Mainnet em cache**, e esse valor cresce com o tempo, por isso não tente executar isto apenas a partir do cartão microSD
- Um computador com ranhura para cartão microSD (para gravar a imagem do sistema operativo)
- Uma ligação Ethernet com fios ou Wi-Fi
- Conhecimentos básicos da linha de comandos via SSH

## Passo 1: Gravar o Ubuntu Server 22.04+ (64-bit)
Os binários pré-compilados e as imagens Docker do Zebra e do Zallet requerem **glibc 2.34+**, o que significa **Ubuntu Server 22.04 ou mais recente (64-bit/aarch64)**.

1. Instale o Raspberry Pi Imager no seu computador principal.
2. Insira o seu cartão microSD.
3. Escolha **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ou mais recente).
4. Utilize as opções avançadas do Imager (ícone de engrenagem) para pré-configurar o hostname, ativar o SSH e definir as credenciais Wi-Fi, se necessário, para um primeiro arranque headless.
5. Grave a imagem, insira o cartão e ligue o Pi.
6. Ligue-se por SSH: `ssh <username>@<pi-hostname-or-ip>`

## Passo 2: Ligar e montar armazenamento externo
1. Ligue o seu SSD/HDD externo via USB 3.0.
2. Identifique o dispositivo: `lsblk`
3. Formate-o (se for novo) e monte-o, por exemplo em `/mnt/zcash-data`, com uma configuração padrão de `mkfs`/`fstab` para que seja montado automaticamente ao reiniciar.

## Passo 3: Atualizar o sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Passo 4: Instalar e executar o Zebra
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
Isto instala um binário `aarch64` pré-compilado — não é necessária compilação.

**Sobre o tempo de sincronização:** conte com algum tempo — os valores frequentemente citados para a primeira sincronização (cerca de 2 horas) vêm de hardware de referência mais potente do que o CPU de um Pi 4, por isso o seu tempo real de sincronização em hardware Pi 4 deverá provavelmente ser superior.

## Passo 5: Instalar o Zallet
O Zallet está atualmente em **alpha** — espere alterações incompatíveis, e ainda não o trate como uma solução de custódia pronta para produção para fundos significativos.

### Opção A — Docker (recomendado)
```bash
docker pull zodlinc/zallet:latest
```
Esta imagem suporta ARM64 (através de uma build baseada em Nix) e é executada a partir de um sistema de ficheiros mínimo, sem shell — passe explicitamente a configuração e os caminhos de dados através de `--datadir` e mounts de volume (ver Passo 6).

### Opção B — Compilar a partir do código-fonte
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Os crates do Zallet ainda não estão publicados no crates.io durante a fase alpha, por isso a instalação diretamente a partir do repositório git é o método suportado sem Docker.

## Passo 6: Configurar o Zallet
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
Ajuste `validator_address` se o Zebra estiver a ser executado noutro host/porta e configure `validator_cookie_auth`/`validator_user`/`validator_password` em `[indexer]` para corresponder à configuração de autenticação RPC do seu Zebra.

**Migrar a partir do zcashd?** Se ainda tiver um `zcash.conf` antigo:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Passo 7: Configurar a encriptação da wallet
O Zallet encripta todo o material de chaves com `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Isto mostra uma chave pública e uma passphrase gerada automaticamente — **guarde a passphrase; não conseguirá recuperar o ficheiro de identidade sem ela.**

## Passo 8: Inicializar e arrancar a wallet
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Execute `generate-mnemonic` apenas uma vez** a menos que queira deliberadamente várias raízes de gasto independentes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Passo 9: Migrar uma wallet existente do zcashd (opcional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Isto requer o utilitário `db_dump` (compilado com Berkeley DB 6.2.23) — a partir de uma instalação do sistema ou de uma compilação local do código-fonte do zcashd. Se já não tiver o zcashd instalado, este é o único passo da migração que ainda não é totalmente autónomo dentro do Zallet.

## Passo 10: Verificar que tudo funciona
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirme que a wallet responde e, assim que o Zebra terminar a sincronização, que os saldos/endereços correspondem ao esperado.

## Resolução de problemas
- **Problemas de build/runtime do Zebra em ARM:** se estiver a compilar a partir do código-fonte, instale a toolchain ARM do Rust — executar ferramentas de build x86_64 em hardware ARM será visivelmente mais lento, conforme a própria documentação do Zebra.
- **Armazenamento a encher:** a pegada de ~300 GB do Zebra continua a crescer — planeie margem adicional.
- **Erros de permissões do Docker:** termine a sessão e volte a entrar depois de adicionar o seu utilizador ao grupo `docker`, ou utilize `sudo` entretanto.
- **O contentor do Zallet não tem shell:** a imagem oficial `zodlinc/zallet` é from-scratch por conceção — passe sempre `--datadir` explicitamente e monte o seu diretório de dados como volume.

## Notas sobre o hardware face ao antigo guia do zcashd
O Zebra e o Zallet são geralmente mais leves em CPU durante a configuração do que era compilar o zcashd, uma vez que está a executar binários/contentores pré-compilados. 4 GB de RAM é um ponto de partida razoável; monitorize com `htop` e considere a variante Pi 4 de 8 GB se verificar uso intensivo de swap.

## Recursos adicionais
- [Livro do Zebra](https://zebra.zfnd.org) — documentação oficial do Zebra
- [Livro do Zallet](https://zcash.github.io/wallet) — documentação oficial do Zallet
- [Aviso de Fim de Suporte do zcashd](https://z.cash/support/zcashd-deprecation)

---

*Se este guia lhe foi útil, considere apoiar a ZecHub: [insira o endereço blindado atual de donativos da ZecHub de zechub.wiki/donation — não incluído aqui porque não consegui verificar se continua atual].*
