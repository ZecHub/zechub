![Tor 标志](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti：下一代 Rust Tor 客户端**
![Atri 标志](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** 是 Tor Project 发起的一项计划，旨在使用 **Rust** 编程语言构建下一代 **Tor** 客户端。Arti 被设计为模块化、可嵌入且可用于生产环境，提供对 **Tor** 匿名协议更安全、更高效的实现。随着 **Arti version 1.4.0** 的发布，引入了若干重要更新：

- 用于增强交互的**新 RPC 接口**。
- 为**中继支持**所做的前期准备工作。
- 提升了**服务端 onion service 抗拒绝服务攻击能力**。

这一版本延续了 Tor Project 为 Tor 用户和开发者提供更好安全性、性能和模块化能力的努力。


---


## **安装 Arti 客户端**

按照以下步骤在你的系统上安装并运行 **Arti** 作为 SOCKS 代理。

---

### **步骤 1：搭建 Rust 开发环境**

在你从源码构建 Arti 之前，需要先安装最新稳定版的 **Rust**。

#### 安装 Rust：

1. 访问官方 [Rust 网站](https://www.rust-lang.org/)。
2. 按照适用于你操作系统的安装说明进行操作。
3. 运行以下命令验证安装：
   
   ```sh
   rustc --version
   ```

这将确认你的系统中已安装最新稳定版 Rust。

#### **Windows 用户注意**：
- Rust 可以通过 [**Rustup**](https://rustup.rs/) 在 Windows 上安装，它是一个工具链安装器。请确保你还配置了兼容的构建环境（在 Windows 上你可能还需要 **Visual Studio Build Tools**）。
  
---

### **步骤 2：克隆 Arti 仓库**

要获取最新版本的 Arti 客户端，你需要从 [**GitLab**](https://gitlab.torproject.org/tpo/core/arti) 克隆该仓库。

#### 步骤：
1. 打开你的终端（Windows 上可使用 Command Prompt、PowerShell 或 Git Bash）。
2. 运行以下命令克隆仓库：
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. 进入新创建的 *arti* 目录：
   
   ```sh
   cd arti
   ```

这样会将 Arti 的源代码拉取到你的本地机器上。

---

### **步骤 3：构建 Arti 二进制文件**

克隆仓库后，你需要使用 **Cargo** 构建 Arti，Cargo 是 Rust 的包管理器和构建工具。

#### 构建 Arti：
1. 在终端中运行以下命令：
   ```sh
   cargo build --release
   ```

该命令会编译 Arti 代码并针对生产环境进行优化（使用 *--release* 标志）。生成的二进制文件将位于 *target/release* 目录中。

#### 已编译二进制文件的位置：
- 构建完成后，Arti 二进制文件将位于：  
  ```sh
  target/release/arti
  ```

你可以直接在终端中运行这个二进制文件。

---

### **步骤 4：运行 Arti SOCKS 代理**

要将 Arti 用作 SOCKS 代理（它会通过 Tor 网络转发你的互联网流量），你需要启动该代理。

#### 启动 SOCKS 代理：
1. 运行以下命令：
   ```sh
   ./target/release/arti proxy -p 9150
   ```

该命令会在 **port 9150** 上启动 Arti 作为 **SOCKS5 代理**，这是 Tor 用于 SOCKS 流量的默认端口。

---

### **步骤 5：配置应用程序使用 Arti**

当 Arti 作为 SOCKS 代理运行后，你需要配置你的应用程序使用它，以便通过 Tor 网络转发流量。

#### 步骤：
1. 在你的应用程序设置中（例如网页浏览器、终端应用），找到**代理设置**。
2. 将 **SOCKS5 代理**设置为 *localhost:9150*。

这样，你的应用程序发出的所有流量都会通过 **Tor network**，并由 Arti 作为中间层进行转发。

---

## **Arti 与 Tor 网络的集成**

下面是一个简化示意图，用于说明 Arti 如何与 Tor 网络协同工作：


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application** 通过 **SOCKS5** 协议连接到 **Arti SOCKS Proxy**。
- 随后，Arti 会与 **Tor network** 通信，确保你的流量在通过该网络时实现匿名化。

---

## **GitLab 仓库与贡献方式**

如果你有兴趣参与 **Arti** 的开发，可以通过 **GitLab** 浏览代码并参与贡献。

- **仓库链接**：[Arti GitLab 仓库](https://gitlab.torproject.org/tpo/core/arti)
- **克隆仓库**：
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork 与贡献**：
1. 在 GitLab 上 **Fork** 该仓库（需要 GitLab 账户）。
2. 将你 Fork 后的仓库关联到本地环境：
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   将 *_name_* 替换为你的 GitLab 用户名。

3. 将**更改推送**到你的 Fork：
   ```sh
   git push _name_ main
   ```

4. 在 GitLab 上**创建 Merge Request (MR)**：
   前往你 GitLab Fork 中的 Merge Request 页面：
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request 指南**：
- **不要在评审期间执行 rebase 和 squash commits**。
- 如有必要，可使用 *fixup!* 或 *squash!* 来进行自动 squash 提交。
- 在评审周期内，尽量**添加新的提交**，而不是进行 squash。

---

### **附加说明**：

- **预编译二进制文件**：截至目前，**Arti** 尚未提供官方预编译二进制文件。你必须按上述说明从源码构建该客户端。
- **Rust 知识**：如果你要为 Arti 做贡献，请注意该代码库仍在持续演进，随着新功能加入，可能会有变更或重构。

---



如果你有兴趣为该项目做贡献，欢迎查看代码、Fork 仓库并提交 Merge Request。有关更多信息、更新和故障排查，请参阅 [Arti GitLab 仓库](https://gitlab.torproject.org/tpo/core/arti)。 

祝你使用 **Arti** 愉快，hacking 愉快！

---
