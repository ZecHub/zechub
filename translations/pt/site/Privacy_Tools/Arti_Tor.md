![Tor logo](/content-images/_unavailable.svg)

# **Arti: o cliente Tor de próxima geração em Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** é a iniciativa do Tor Project para criar um cliente **Tor** de próxima geração usando a linguagem de programação **Rust**. O Arti foi projetado para ser modular, incorporável e pronto para produção, oferecendo uma implementação mais segura e eficiente dos protocolos de anonimato do **Tor**. Com a **versão 1.4.0 do Arti**, várias atualizações importantes foram introduzidas:

- Uma **nova interface RPC** para uma interação aprimorada.
- Trabalho preparatório para o **suporte a relays**.
- Melhorias na **resistência a ataques de negação de serviço em serviços onion, do lado do serviço**.

Esta versão dá continuidade aos esforços do Tor Project para oferecer mais segurança, desempenho e modularidade aos usuários e desenvolvedores do Tor.


---


## **Instalação do cliente Arti**

Siga estas etapas para instalar e executar o **Arti** como proxy SOCKS no seu sistema.

---

### **Etapa 1: configure um ambiente de desenvolvimento Rust**

Antes de compilar o Arti a partir do código-fonte, você precisa ter a versão estável mais recente do **Rust** instalada.

#### Para instalar o Rust:

1. Acesse o [Rust site oficial](https://www.rust-lang.org/).
2. Siga as instruções de instalação para o seu sistema operacional.
3. Verifique a instalação executando:
   
   ```sh
   rustc --version
   ```

Isso confirmará que você tem a versão estável mais recente do Rust instalada no seu sistema.

#### **Observação para usuários do Windows**:
- O Rust pode ser instalado no Windows por meio do [**rustup**](https://rustup.rs/), um instalador de toolchain. Certifique-se de também configurar um ambiente de compilação compatível (talvez você precise do **Visual Studio Build Tools** no Windows).
  
---

### **Etapa 2: clone o repositório do Arti**

Para obter a versão mais recente do cliente Arti, você precisará clonar o repositório do [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Etapas:
1. Abra o seu terminal (Prompt de Comando, PowerShell ou Git Bash no Windows).
2. Execute o seguinte comando para clonar o repositório:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Navegue até o diretório *arti* recém-criado:
   
   ```sh
   cd arti
   ```

Isso baixará o código-fonte do Arti para a sua máquina local.

---

### **Etapa 3: compile o binário do Arti**

Depois de clonar o repositório, você precisa compilar o Arti usando o **Cargo**, que é o gerenciador de pacotes e a ferramenta de compilação do Rust.

#### Para compilar o Arti:
1. No terminal, execute o seguinte comando:
   ```sh
   cargo build --release
   ```

Este comando compila o código do Arti e o otimiza para produção (a flag *--release*). O binário será criado no diretório *target/release*.

#### Localização do binário compilado:
- Após a compilação, o binário do Arti estará localizado em:  
  ```sh
  target/release/arti
  ```

Você pode executar esse binário diretamente pelo terminal.

---

### **Etapa 4: execute o proxy SOCKS do Arti**

Para usar o Arti como proxy SOCKS (que direcionará o seu tráfego de internet pela rede Tor), você precisa iniciar o proxy.

#### Para iniciar o proxy SOCKS:
1. Execute o seguinte comando:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Este comando inicia o Arti como um **proxy SOCKS5** na **porta 9150**, que é a porta padrão usada pelo Tor para o tráfego SOCKS.

---

### **Etapa 5: configure os aplicativos para usar o Arti**

Com o Arti em execução como proxy SOCKS, você precisa configurar os seus aplicativos para usá-lo e direcionar o tráfego pela rede Tor.

#### Etapas:
1. Nas configurações do seu aplicativo (por exemplo, navegador web, aplicativo de terminal), procure as **configurações de proxy**.
2. Defina o **proxy SOCKS5** como *localhost:9150*.

Isso direcionará todo o tráfego dos seus aplicativos pela **rede Tor**, usando o Arti como intermediário.

---

## **Integração do Arti com a rede Tor**

Veja um diagrama simplificado que ilustra como o Arti funciona em conjunto com a rede Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- O **aplicativo** se conecta ao **proxy SOCKS do Arti** usando o protocolo **SOCKS5**.
- Em seguida, o Arti se comunica com a **rede Tor**, garantindo que o seu tráfego seja anonimizado enquanto passa pela rede.

---

## **Repositório no GitLab e contribuição**

Se você tem interesse em contribuir com o desenvolvimento do **Arti**, pode explorar o código e contribuir pelo **GitLab**.

- **Link do repositório**: [Repositório do Arti no GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Clone o repositório**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork e contribuição**:
1. Faça um **fork** do repositório no GitLab (é necessária uma conta no GitLab).
2. Vincule o seu repositório fork à sua configuração local:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Substitua *_name_* pelo seu nome de usuário do GitLab.

3. **Envie as alterações** para o seu fork:
   ```sh
   git push _name_ main
   ```

4. **Crie um Merge Request (MR)** no GitLab:
   Navegue até a seção de Merge Request no seu fork do GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Diretrizes para Merge Requests**:
- **Não faça rebase nem squash de commits durante a revisão**.
- Se necessário, use *fixup!* ou *squash!* para o auto-squash de commits.
- Procure **adicionar novos commits** em vez de fazer squash durante o ciclo de revisão.

---

### **Observações adicionais**:

- **Binários pré-compilados**: no momento, o **Arti** não oferece binários pré-compilados oficiais. Você deve compilar o cliente a partir do código-fonte, conforme descrito acima.
- **Conhecimento de Rust**: se você está contribuindo com o Arti, observe que a base de código ainda está evoluindo e pode haver alterações ou refatorações à medida que novos recursos forem adicionados.

---



Se você tem interesse em contribuir com o projeto, fique à vontade para conferir o código, fazer um fork do repositório e enviar um Merge Request. Para mais informações, atualizações e solução de problemas, consulte o [Repositório do Arti no GitLab](https://gitlab.torproject.org/tpo/core/arti). 

Aproveite a sua experiência com o **Arti** e bom hacking!

---
