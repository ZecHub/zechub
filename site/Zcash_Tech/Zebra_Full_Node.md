<a href="https://github.com/henryquincy/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Introduction to Zebra Node

Introducing Zebra: Revolutionizing Zcash Node Infrastructure with Rust

Meet Zebra, a groundbreaking achievement as the inaugural Zcash node crafted entirely in Rust. Seamlessly integrated into the Zcash peer-to-peer network, Zebra serves as a pivotal tool fortifying the network's resilience. Through its core functions of validating and broadcasting transactions, and meticulously maintaining the Zcash blockchain state, Zebra contributes to a more decentralized network infrastructure.

## Advantages over Zcashd Node Implementation
In contrast to the original Zcash node, zcashd, which traces its lineage back to Bitcoin's foundational codebase and is developed by the Electric Coin Company, our implementation stands as an autonomous entity. Developed from scratch with a focus on security and efficiency, Zebra harnesses the power of the memory-safe Rust language.

Despite their distinct origins, both zcashd and Zebra adhere to the same protocol, facilitating seamless communication and interoperability between them. This innovation not only expands the Zcash ecosystem but also sets a new standard for blockchain node development.

## Instructions for Zebra Launcher

You can run Zebra using our Docker image or you can build it manually. Please see the System Requirements section.

### Docker Usage:

To effortlessly run our latest release and synchronize it to the tip, execute the following command:

```

docker run zfnd/zebra:latest

```

For more comprehensive instructions and detailed insights, please refer to our [Docker documentation](https://zebra.zfnd.org/user/docker.html).

### Building Zebra:

Building Zebra mandates Rust, libclang, and a C++ compiler.

- Ensure you have the latest stable Rust version installed, as Zebra is exclusively tested with it.
- Necessary build dependencies include:
  - libclang (also known as libclang-dev or llvm-dev)
  - clang or another C++ compiler (such as g++ for all platforms or Xcode for macOS)
  - protoc (Protocol Buffers compiler) with the `--experimental_allow_proto3_optional` flag, introduced in Protocol Buffers v3.12.0 (released on May 16, 2020).



### Dependencies on Arch:

After ensuring the dependencies are met, proceed with building and installing Zebra using the following command:

```

cargo install --locked zebrad

```

Initiate Zebra by executing:

```
zebrad start

```


## Optional Configurations & Features:


### - Initializing Configuration File:

  - Generate a configuration file using the command:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - The generated `zebrad.toml` will be placed in the default preferences directory of Linux. For alternative OS default locations, refer to our documentation.



### - Configuring Progress Bars:

  - Configure `tracing.progress_bar` in your `zebrad.toml` to display crucial metrics in the terminal using progress bars. Note: A known issue exists where progress bar estimates can become exceedingly large.



### - Configuring Mining:

  - Zebra can be tailored for mining by specifying a `MINER_ADDRESS` and port mapping in Docker. Further details can be found in our [Mining support documentation](https://zebra.zfnd.org/user/mining-docker.html).


### - Custom Build Features:

  - Extend Zebra's functionality with additional Cargo features such as Prometheus metrics, Sentry monitoring, experimental Elasticsearch support, and more.

  - Combine multiple features by listing them as parameters of the `--features` flag during installation.


### Note: Some debugging and monitoring features are disabled in release builds to optimize performance.

For a comprehensive list of experimental and developer features, please consult our [API documentation](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# System Requirements and Network Configuration for Zebra

To ensure optimal performance and reliability, we recommend the following system requirements for compiling and running zebrad, the revolutionary Zcash node built entirely in Rust:

### System Requirements:
- CPU: 4 CPU cores
- RAM: 16 GB
- Disk Space: 300 GB available disk space for compiling binaries and storing cached chain state
- Network: 100 Mbps network connection with a minimum of 300 GB uploads and downloads per month


Please note that Zebra's test suite may take over an hour to complete depending on your machine specifications. While slower systems may be able to compile and run Zebra, we have yet to establish precise performance boundaries through testing.


### Disk Requirements:
- Zebra utilizes approximately 300 GB for cached Mainnet data and 10 GB for cached Testnet data. Expect disk usage to increase over time.
- The database is regularly cleaned up, especially during shutdowns or restarts, ensuring data integrity. Incomplete changes due to forced terminations or panics are rolled back upon restarting Zebra.


### Network Requirements and Ports:
- Zebra employs the following TCP ports for inbound and outbound connections:
  - 8233 for Mainnet
  - 18233 for Testnet
- Configuring Zebra with a specific listen_addr enables advertising this address for inbound connections. While outbound connections are essential for synchronization, inbound connections are optional.
- Access to Zcash DNS seeders is necessary via the OS DNS resolver (typically port 53).
- While Zebra can establish outbound connections on any port, zcashd prefers peers on default ports to mitigate DDoS attacks on other networks.


### Typical Mainnet Network Usage:
- Initial Sync: A 300 GB download is required for the initial synchronization, with anticipated growth in subsequent downloads.
- Ongoing Updates: Expect daily uploads and downloads ranging from 10 MB to 10 GB, contingent on user transaction sizes and peer requests.
- Zebra initiates an initial sync with every internal database version change, potentially necessitating full chain downloads during version upgrades.
- Peers with a round-trip latency of 2 seconds or less are preferred. If latency exceeds this threshold, please submit a ticket for assistance.


By adhering to these recommendations and configurations, you can maximize the efficiency and effectiveness of Zebra within the Zcash network. Should you encounter any issues or require further assistance, our support team is readily available to provide guidance.


Here is the link to the Zebra Node Installation guide:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 
