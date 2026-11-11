![Tor logo](/content-images/_unavailable.svg)

# **Arti：Tor 在 Rust 中的下一代客户端**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** 是 Tor 项目为使用 **Rust** 编程语言构建下一代 **Tor** 客户端而发起的计划。Arti 旨在实现模块化、可嵌入和生产就绪，为 **Tor** 匿名协议（anonymity protocols）提供更安全、更高效的实现。随着 **Arti 版本 1.4.0** 的发布，引入了多项重要更新：

- 新增了一个 **RPC 接口**，以增强交互体验。
- 为 **中继支持** 做好了准备工作。
- 改进了 **服务端 onion service 的拒绝服务攻击防护能力**。

此版本延续了 Tor 项目为 Tor 用户和开发者提供更优安全性、性能和模块化能力的努力。


---


## **安装 Arti 客户端**

按照以下步骤在系统上安装并将 **Arti** 作为 SOCKS 代理运行。

---

### **第 1 步：搭建 Rust 开发环境**

在从源代码构建 Arti 之前，您需要安装最新稳定版本的 **Rust**。

#### 安装 Rust：

1. 访问官方 [Rust 网站](https://www.rust-lang.org/)。
2. 按照适用于您操作系统的安装说明操作。
3. 运行以下命令验证安装：
   
   ```sh
   rustc --version
   ```

这将确认您的系统已安装最新稳定版本的 Rust。

#### **面向 Windows 用户的 note**：
- 可通过 [**rustup**](https://rustup.rs/)（一个工具链安装程序）在 Windows 上安装 Rust。请确保您还配置了兼容的构建环境（在 Windows 上，您可能需要安装 **Visual Studio Build Tools**）。
  
---

### **第 2 步：克隆 Arti 仓库**

要获取最新版本的 Arti 客户端，您需要从 [**GitLab**](https://gitlab.torproject.org/tpo/core/arti) 克隆仓库。

#### 步骤：
1. 打开终端（在 Windows 上可使用命令提示符、PowerShell 或 Git Bash）。
2. 运行以下命令克隆仓库：
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. 进入新创建的 *arti* 目录：
   
   ```sh
   cd arti
   ```

这将把 Arti 的源代码拉取到您的本地计算机。

---

### **第 3 步：构建 Arti 二进制文件**

克隆仓库后，您需要使用 **Cargo** 构建 Arti；Cargo 是 Rust 的包管理器和构建工具。

#### 构建 Arti：
1. 在终端中运行以下命令：
   ```sh
   cargo build --release
   ```

此命令会编译 Arti 代码，并针对生产环境进行优化（使用 *--release* 标志）。二进制文件将创建在 *target/release* 目录中。

#### 已编译二进制文件的位置：
- 构建完成后，Arti 二进制文件位于：  
  ```sh
  target/release/arti
  ```

您可以直接在终端中运行该二进制文件。

---

### **第 4 步：运行 Arti SOCKS 代理**

要将 Arti 用作 SOCKS 代理（它会通过 Tor 网络路由您的互联网流量），您需要启动该代理。

#### 启动 SOCKS 代理：
1. 运行以下命令：
   ```sh
   ./target/release/arti proxy -p 9150
   ```

此命令会在 **端口 9150** 上将 Arti 启动为 **SOCKS5 代理**，这是 Tor 用于 SOCKS 流量的默认端口。

---

### **第 5 步：配置应用程序使用 Arti**

当 Arti 作为 SOCKS 代理运行后，您需要配置应用程序，通过它将流量路由至 Tor 网络。

#### 步骤：
1. 在应用程序设置中（例如网页浏览器或终端应用程序），查找 **代理设置**。
2. 将 **SOCKS5 代理** 设为 *localhost:9150*。

这将通过作为中介的 Arti，将您的应用程序的所有流量路由至 **Tor 网络**。

---

## **Arti 与 Tor 网络的集成**

以下简图说明 Arti 如何与 Tor 网络协同工作：


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **应用程序** 使用 **SOCKS5** 协议连接到 **Arti SOCKS 代理**。
- 随后，Arti 与 **Tor 网络** 通信，确保您的流量在通过网络时保持匿名。

---

## **GitLab 仓库与贡献**

如果您有兴趣为 **Arti** 的开发作出贡献，可以通过 **GitLab** 浏览代码并参与贡献。

- **仓库链接**：[Arti GitLab 仓库](https://gitlab.torproject.org/tpo/core/arti)
- **克隆仓库**：
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork 与贡献**：
1. 在 GitLab 上 **Fork** 该仓库（需要 GitLab 账户）。
2. 将您 Fork 的仓库关联到本地环境：
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   将 *_name_* 替换为您的 GitLab 用户名。

3. 将更改 **推送** 到您的 Fork：
   ```sh
   git push _name_ main
   ```

4. 在 GitLab 上 **创建合并请求（MR）**：
   前往您的 GitLab Fork 中的合并请求部分：
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **合并请求指南**：
- **请勿在审查期间对提交执行 rebase 和 squash 操作**。
- 如有必要，请使用 *fixup!* 或 *squash!* 自动压缩提交。
- 在审查周期内，应尽量**添加新提交**，而不是压缩提交。

---

### **附加 note**：

- **预构建二进制文件**：目前，**Arti** 不提供官方预构建二进制文件。您必须按照上述说明从源代码构建客户端。
- **Rust 知识**：如果您正在为 Arti 作出贡献，请注意代码库仍在不断演进，随着新功能的添加，可能会发生更改或重构。

---



如果您有兴趣为该项目作出贡献，欢迎查看代码、Fork 仓库并提交合并请求。有关更多信息、更新和故障排除，请参阅 [Arti GitLab 仓库](https://gitlab.torproject.org/tpo/core/arti)。 

祝您使用 **Arti** 愉快，编码顺利！

---
