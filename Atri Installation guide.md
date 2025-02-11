![Tor logo](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: The Next-Generation Tor Client in Rust**
![Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png?width=48)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- A **new RPC interface** for enhanced interaction.
- Preparatory work for **relay support**.
- Improvements in **service-side onion service denial-of-service resistance**.

This release continues the Tor Project's efforts to offer better security, performance, and modularity for Tor users and developers.


---


## **Installation of the Arti Client**

Follow these steps to install and run **Arti** as a SOCKS proxy on your system.

---

### **Step 1: Set Up a Rust Development Environment**

Before you can build Arti from source, you need to have the latest stable version of **Rust** installed.

#### To Install Rust:

1. Visit the official [Rust website](https://www.rust-lang.org/).
2. Follow the installation instructions for your operating system.
3. Verify the installation by running:
   ```sh
   rustc --version
   ```

This will confirm that you have the latest stable version of Rust installed on your system.

#### **Note for Windows Users**:
- Rust can be installed on Windows via [**Rustup**](https://rustup.rs/), a toolchain installer. Ensure that you’ve also set up a compatible build environment (you may need **Visual Studio Build Tools** on Windows).
  
---

### **Step 2: Clone the Arti Repository**

To get the latest version of the Arti client, you’ll need to clone the repository from [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Steps:
1. Open your terminal (Command Prompt, PowerShell, or Git Bash on Windows).
2. Run the following command to clone the repository:
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
3. Navigate to the newly created `arti` directory:
   ```sh
   cd arti
   ```

This will pull the source code of Arti to your local machine.

---

### **Step 3: Build the Arti Binary**

Once you’ve cloned the repository, you need to build Arti using **Cargo**, which is Rust’s package manager and build tool.

#### To Build Arti:
1. In the terminal, run the following command:
   ```sh
   cargo build --release
   ```

This command compiles the Arti code and optimizes it for production (the `--release` flag). The binary will be created in the `target/release` directory.

#### Location of the Compiled Binary:
- After building, the Arti binary will be located at:  
  ```sh
  target/release/arti
  ```

You can run this binary directly from the terminal.

---

### **Step 4: Run the Arti SOCKS Proxy**

To use Arti as a SOCKS proxy (which will route your internet traffic through the Tor network), you need to start the proxy.

#### To Start the SOCKS Proxy:
1. Run the following command:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

This command starts Arti as a **SOCKS5 proxy** on **port 9150**, which is the default port used by Tor for SOCKS traffic.

---

### **Step 5: Configure Applications to Use Arti**

Once Arti is running as a SOCKS proxy, you need to configure your applications to use it for routing traffic through the Tor network.

#### Steps:
1. In your application settings (e.g., web browser, terminal application), look for the **proxy settings**.
2. Set the **SOCKS5 proxy** to `localhost:9150`.

This will route all traffic from your applications through the **Tor network** using Arti as the intermediary.

---

## **Arti Integration with the Tor Network**

Here’s a simplified diagram to illustrate how Arti works in conjunction with the Tor network:

```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- The **Application** connects to **Arti SOCKS Proxy** using the **SOCKS5** protocol.
- Arti then communicates with the **Tor network**, ensuring that your traffic is anonymized as it passes through the network.

---

## **GitLab Repository and Contribution**

If you're interested in contributing to the development of **Arti**, you can explore the code and contribute through **GitLab**.

- **Repository Link**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Clone the Repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forking and Contributing**:
1. **Fork** the repository on GitLab (requires a GitLab account).
2. Link your forked repository to your local setup:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Replace `_name_` with your GitLab username.

3. **Push changes** to your fork:
   ```sh
   git push _name_ main
   ```

4. **Create a Merge Request (MR)** on GitLab:
   Navigate to the Merge Request section in your GitLab fork:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request Guidelines**:
- **Do not rebase and squash commits during review**.
- If necessary, use `fixup!` or `squash!` for auto-squashing commits.
- Aim to **add new commits** instead of squashing during the review cycle.

---

### **Additional Notes**:

- **Pre-built Binaries**: As of now, **Arti** does not provide official pre-built binaries. You must build the client from source as described above.
- **Rust Knowledge**: If you are contributing to Arti, note that the codebase is still evolving, and there may be changes or refactoring as new features are added.

---



If you’re interested in contributing to the project, feel free to check out the code, fork the repository, and submit a Merge Request. For more information, updates, and troubleshooting, refer to the [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Enjoy your experience with **Arti** and happy hacking! 🚀

--- 