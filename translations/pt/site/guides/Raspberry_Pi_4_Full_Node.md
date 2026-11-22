# Execute um nó integral em um Raspberry Pi 4 (Zebra + Zallet)

*Migrado do guia original baseado no zcashd. O zcashd atingiu sua parada automática de fim de suporte em 18 de julho de 2026, então este guia agora usa o **Zebra** (o nó integral atual, mantido pela Zcash Foundation) e a **Zallet** (a carteira criada para substituir a carteira integrada do zcashd).*

## O que você vai aprender
- Como gravar e configurar o Ubuntu Server 22.04+ (64 bits) em um Raspberry Pi 4 para uso sem monitor
- Como instalar e executar o Zebra, via Docker ou com um binário pré-compilado
- Como instalar, configurar e inicializar a Zallet, incluindo a configuração da criptografia da carteira
- Como migrar opcionalmente uma configuração/carteira existente do zcashd para a Zallet

## O que mudou em relação ao guia antigo
A versão anterior deste guia ensinava a compilar o **zcashd** nativamente em um Pi 4: uma compilação em uma única thread que levava de 3 a 4 horas, porque o Pi 4 não tem memória suficiente para um build paralelo (`-j$(nproc)`). O Zebra e a Zallet agora distribuem **binários ARM64 pré-compilados oficiais e imagens Docker**, então na maioria dos casos você não precisa mais compilar nada a partir do código-fonte no próprio Pi.

## Pré-requisitos
- Um Raspberry Pi 4 (recomenda-se 4 GB de RAM ou mais)
- Um cartão microSD (32 GB+) para o sistema operacional
- Um SSD/HDD externo com suporte a USB 3.0. **O Zebra precisa de aproximadamente 300 GB para os dados da Mainnet em cache**, e esse volume cresce com o tempo, então não tente rodar isso apenas no cartão microSD
- Um computador com slot para cartão microSD (para gravar a imagem do sistema operacional)
- Uma conexão Ethernet cabeada ou Wi-Fi
- Familiaridade básica com a linha de comando via SSH

## Passo 1: Grave o Ubuntu Server 22.04+ (64 bits)
Os binários pré-compilados e as imagens Docker do Zebra e da Zallet exigem **glibc 2.34+**, o que significa **Ubuntu Server 22.04 ou mais recente (64 bits/aarch64)**.

1. Instale o Raspberry Pi Imager no seu computador principal.
2. Insira o seu cartão microSD.
3. Escolha **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ou mais recente).
4. Use as opções avançadas do Imager (ícone de engrenagem) para pré-configurar o hostname, ativar o SSH e definir as credenciais de Wi-Fi, se necessário, para uma primeira inicialização sem monitor.
5. Grave a imagem, insira o cartão e ligue o Pi.
6. Conecte-se via SSH: `ssh <username>@<pi-hostname-or-ip>`

## Passo 2: Conecte e monte o armazenamento externo
1. Conecte o seu SSD/HDD externo via USB 3.0.
2. Identifique o dispositivo: `lsblk`
3. Formate-o (se for novo) e monte-o, por exemplo em `/mnt/zcash-data`, com uma configuração padrão de `mkfs`/`fstab` para que ele seja montado automaticamente ao reiniciar.

## Passo 3: Atualize o sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Passo 4: Instale e execute o Zebra
### Opção A: Docker (recomendado)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Acompanhe o progresso: `docker logs -f zebra`

### Opção B: Binário pré-compilado via cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Isso instala um binário `aarch64` pré-compilado, sem necessidade de compilação.

**Sobre o tempo de sincronização:** espere que isso demore. Os tempos de primeira sincronização mais citados (cerca de 2 horas) vêm de hardware de referência mais potente que a CPU de um Pi 4, então o tempo real de sincronização em um Pi 4 provavelmente será maior.

## Passo 5: Instale a Zallet
A Zallet está atualmente em **alfa**: espere mudanças incompatíveis e não a trate ainda como uma solução de custódia pronta para produção para quantias significativas.

### Opção A: Docker (recomendado)
```bash
docker pull zodlinc/zallet:latest
```
Esta imagem suporta ARM64 (por meio de um build baseado em Nix) e roda a partir de um sistema de arquivos mínimo e sem shell. Passe a configuração e os caminhos de dados explicitamente via `--datadir` e montagens de volume (veja o Passo 6).

### Opção B: Compile a partir do código-fonte
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Os crates da Zallet ainda não são publicados no crates.io durante a fase alfa, então instalar diretamente a partir do repositório git é o método suportado que não usa Docker.

## Passo 6: Configure a Zallet
Crie `zallet.toml` no datadir escolhido (por exemplo, `/mnt/zcash-data/zallet`):
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
Ajuste `validator_address` se o Zebra rodar em outro host/porta e configure `validator_cookie_auth`/`validator_user`/`validator_password` em `[indexer]` de acordo com a sua configuração de autenticação RPC do Zebra.

**Migrando do zcashd?** Se você ainda tem um `zcash.conf` antigo:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Passo 7: Configure a criptografia da carteira
A Zallet criptografa todo o material de chaves usando `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Isso exibe uma chave pública e uma senha gerada automaticamente. **Guarde a senha: você não conseguirá recuperar o arquivo de identidade sem ela.**

## Passo 8: Inicialize e inicie a carteira
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Execute `generate-mnemonic` apenas uma vez**, a menos que você queira deliberadamente várias raízes de gasto independentes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Passo 9: Migre uma carteira existente do zcashd (opcional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Isso requer o utilitário `db_dump` (compilado com o Berkeley DB 6.2.23), obtido de uma instalação no sistema ou de um build local a partir do código-fonte do zcashd. Se você não tem mais o zcashd instalado, esta é a única etapa da migração que ainda não é totalmente independente na Zallet.

## Passo 10: Verifique se tudo funciona
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirme que a carteira responde e, quando o Zebra terminar de sincronizar, que os saldos/endereços correspondem ao esperado.

## Solução de problemas
- **Problemas de build/execução com Zebra no ARM:** se estiver compilando a partir do código-fonte, instale o toolchain ARM do Rust. Executar ferramentas de build x86_64 em hardware ARM será visivelmente mais lento, segundo a própria documentação de Zebra.
- **Armazenamento enchendo:** o espaço de ~300 GB ocupado pelo Zebra continua crescendo, então planeje uma margem.
- **Erros de permissão do Docker:** saia e entre novamente na sessão depois de adicionar o seu usuário ao grupo `docker`, ou use `sudo` enquanto isso.
- **O contêiner da Zallet não tem shell:** a imagem oficial da `zodlinc/zallet` é criada do zero de propósito. Sempre passe `--datadir` explicitamente e monte o seu diretório de dados como um volume.

## Notas de hardware em comparação com o guia antigo do zcashd
O Zebra e a Zallet geralmente exigem menos da CPU durante a configuração do que compilar o zcashd, já que você está executando binários/contêineres pré-compilados. 4 GB de RAM são um ponto de partida razoável. Monitore com `htop` e considere a versão de 8 GB do Pi 4 se notar uso intenso de swap.

## Recursos adicionais
- [Zebra Book](https://zebra.zfnd.org): documentação oficial do Zebra
- [Zallet Book](https://zcash.github.io/zallet/): documentação oficial da Zallet
- [Aviso de fim de suporte do zcashd](https://z.cash/support/zcashd-deprecation)

---

*Se este guia foi útil para você, considere apoiar o ZecHub: [insira o endereço blindado de doação ZecHub atual disponível em zechub.wiki/donation. Ele não foi incluído aqui porque não consegui verificar se ainda está atualizado].*
