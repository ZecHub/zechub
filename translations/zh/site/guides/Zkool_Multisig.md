# Zkool 多重签名指南

本指南提供了使用 Zkool 执行多重签名交易的分步演练。内容包括创建账户、发送或接收资金，以及为多重签名设置分布式密钥生成（DKG）。每个主要步骤都附有截图。

## 教程

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool 演示 | Ywallet 的继任者"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. 创建账户


1. 打开 **Zkool app** 并进入 **New Account**。


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. 输入一个 **Account Name**（例如 Anabelle）。  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. 如有需要，可选择切换 **Use Internal Change** 或 **Restore Account**。


5. 创建完成后，该账户会显示在你的 **Account List** 中。  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. 接收资金

每个账户会生成多种地址类型：

**Unified Address**

**仅 Orchard 地址**

**Sapling 地址**
  
**Transparent 地址**


选择你想使用的类型并分享该地址，以接收资金。  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. 发送资金

1. 前往 **Recipient** 部分。  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. 输入**收款人地址**。  

4. 指定**金额**和可选的**memo**。  

5. 检查交易详情并**确认**。  


完成后，余额会在你的账户列表中更新。  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. 执行多重签名交易：设置分布式密钥生成（Multisig）

Zkool 中的多重签名使用**分布式密钥生成（DKG）**，以确保多个参与者共同控制一个共享账户。



### 第 1 步：发起 DKG
为共享钱包选择一个**名称**（例如 Anabelle）。

设置**参与者数量**。
  
选择你的**参与者 ID**。
  
定义**所需签名人数（阈值）**。
    
选择**资金账户**。
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### 第 2 步：添加参与者地址
- 输入每位参与者的 **Unified Address**（推荐）。


**注意：** 如果你使用仅 Orchard 或仅 Sapling 地址，多重签名将仅限于对应的资金池（Orchard 或 Sapling）。  
这意味着共享钱包无法接收来自其他池的资金。  
为了获得最大的兼容性和灵活性，请始终使用 **Unified Addresses**。  


### 第 3 步：运行 DKG 轮次
等待所有参与者交换 **round 1** 和 **round 2** 数据包。  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### 第 4 步：完成共享地址
完成后，将生成一个**共享地址**。  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## 结论

使用 Zkool，你可以：创建账户、发送和接收资金，并使用分布式密钥生成设置一个**多重签名钱包**。这可确保**更高的安全性**以及**协作式且私密的资金管理**。
