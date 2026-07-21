![logotipo do Tor](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: O Cliente Tor de Próxima Geração em Rust**
![Logotipo do Atri](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** é a iniciativa do Tor Project para construir um cliente **Tor** de próxima geração usando a linguagem de programação **Rust**. O Arti foi projetado para ser modular, incorporável e pronto para produção, oferecendo uma implementação mais segura e eficiente dos protocolos de anonimato do **Tor**. Com a **versão 1.4.0 do Arti**, várias atualizações significativas foram introduzidas:

- Uma **nova interface RPC** para interação aprimorada.
- Trabalho preparatório para **suporte a relay**.
- Melhorias na **resistência a negação de serviço de onion service no lado do serviço**.

Esta versão dá continuidade aos esforços do Tor Project para oferecer melhor segurança, desempenho e modularidade para usuários e desenvolvedores do Tor.


---


## **Instalação do Cliente Arti**

Siga estas etapas para instalar e executar o **Arti** como um proxy SOCKS no seu sistema.

---

### **Etapa 1: Configurar um Ambiente de Desenvolvimento Rust**

Antes de compilar o Arti a partir do código-fonte, você precisa ter instalada a versão estável mais recente do **Rust**.

#### Para instalar o Rust:

1. Visite o [site oficial do Rust](https://www.rust-lang.org/).
2. Siga as instruções de instalação para o seu sistema operacional.
3. Verifique a instalação executando:
   
   ```sh
   rustc --version
   ```

Isso confirmará que você tem a versão estável mais recente do Rust instalada no seu sistema.

#### **Nota para Usuários do Windows**:
- O Rust pode ser instalado no Windows via [**Rustup**](https://rustup.rs/), um instalador de toolchains. Certifique-se de também configurar um ambiente de compilação compatível (você pode precisar do **Visual Studio Build Tools** no Windows).
  
---

### **Etapa 2: Clonar o Repositório do Arti**

Para obter a versão mais recente do cliente Arti, você precisará clonar o repositório do [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Etapas:
1. Abra seu terminal (Prompt de Comando, PowerShell ou Git Bash no Windows).
2. Execute o seguinte comando para clonar o repositório:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Navegue até o diretório *arti* recém-criado:
   
   ```sh
   cd arti
   ```

Isso fará o download do código-fonte do Arti para a sua máquina local.

---

### **Etapa 3: Compilar o Binário do Arti**

Depois de clonar o repositório, você precisa compilar o Arti usando o **Cargo**, que é o gerenciador de pacotes e ferramenta de compilação do Rust.

#### Para compilar o Arti:
1. No terminal, execute o seguinte comando:
   ```sh
   cargo build --release
   ```

Este comando compila o código do Arti e o otimiza para produção (a flag *--release*). O binário será criado no diretório *target/release*.

#### Localização do Binário Compilado:
- Após a compilação, o binário do Arti estará localizado em:  
  ```sh
  target/release/arti
  ```

Você pode executar esse binário diretamente no terminal.

---

### **Etapa 4: Executar o Proxy SOCKS do Arti**

Para usar o Arti como um proxy SOCKS (que encaminhará seu tráfego de internet pela rede Tor), você precisa iniciar o proxy.

#### Para iniciar o Proxy SOCKS:
1. Execute o seguinte comando:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Este comando inicia o Arti como um **proxy SOCKS5** na **porta 9150**, que é a porta padrão usada pelo Tor para tráfego SOCKS.

---

### **Etapa 5: Configurar Aplicações para Usar o Arti**

Depois que o Arti estiver em execução como um proxy SOCKS, você precisará configurar suas aplicações para usá-lo no roteamento do tráfego pela rede Tor.

#### Etapas:
1. Nas configurações da sua aplicação (por exemplo, navegador web, aplicação de terminal), procure as **configurações de proxy**.
2. Defina o **proxy SOCKS5** como *localhost:9150*.

Isso encaminhará todo o tráfego das suas aplicações pela **rede Tor** usando o Arti como intermediário.

---

## **Integração do Arti com a Rede Tor**

Aqui está um diagrama simplificado para ilustrar como o Arti funciona em conjunto com a rede Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- A **Application** se conecta ao **Arti SOCKS Proxy** usando o protocolo **SOCKS5**.
- O Arti então se comunica com a **rede Tor**, garantindo que seu tráfego seja anonimizado à medida que passa pela rede.

---

## **Repositório no GitLab e Contribuição**

Se você tiver interesse em contribuir para o desenvolvimento do **Arti**, pode explorar o código e contribuir por meio do **GitLab**.

- **Link do Repositório**: [Repositório Arti no GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Clonar o Repositório**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fazendo Fork e Contribuindo**:
1. Faça **fork** do repositório no GitLab (requer uma conta no GitLab).
2. Vincule o repositório do seu fork à sua configuração local:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Substitua *_name_* pelo seu nome de usuário no GitLab.

3. **Envie as alterações** para o seu fork:
   ```sh
   git push _name_ main
   ```

4. **Crie um Merge Request (MR)** no GitLab:
   Navegue até a seção de Merge Request no seu fork do GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Diretrizes para Merge Request**:
- **Não faça rebase nem squash dos commits durante a revisão**.
- Se necessário, use *fixup!* ou *squash!* para squash automático dos commits.
- Procure **adicionar novos commits** em vez de fazer squash durante o ciclo de revisão.

---

### **Notas Adicionais**:

- **Binários Pré-compilados**: Até o momento, o **Arti** não fornece binários oficiais pré-compilados. Você deve compilar o cliente a partir do código-fonte, conforme descrito acima.
- **Conhecimento de Rust**: Se você estiver contribuindo com o Arti, observe que a base de código ainda está evoluindo, e pode haver mudanças ou refatorações à medida que novos recursos forem adicionados.

---



Se você tiver interesse em contribuir com o projeto, fique à vontade para explorar o código, fazer fork do repositório e enviar um Merge Request. Para mais informações, atualizações e solução de problemas, consulte o [Repositório Arti no GitLab](https://gitlab.torproject.org/tpo/core/arti). 

Aproveite sua experiência com o **Arti** e bom hacking!

---
