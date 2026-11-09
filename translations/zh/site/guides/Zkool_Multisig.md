# Zkool 多重签名 [Multisig] 指南

本指南逐步讲解如何使用 Zkool 执行多重签名交易 [multisig transactions]。内容包括创建账户、发送或接收资金，以及为多重签名设置分布式密钥生成 [Distributed Key Generation (DKG)]。每个主要步骤均附有截图。

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


1. 打开 **Zkool 应用程序 [app]**，然后前往 **新建账户 [New Account]**。


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. 输入 **账户名称 [Account Name]**（例如 Anabelle）。  
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. 如有需要，可选择启用 **使用内部找零 [Use Internal Change]** 或 **恢复账户 [Restore Account]**。


5. 创建后，该账户将显示在你的 **账户列表 [Account List]** 中。  


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. 接收资金

每个账户都会生成多种地址类型：

**统一地址 [Unified Address]**

**Orchard 专用地址**

**Sapling 地址**
  
**透明地址 [Transparent Address]**


选择你想使用的类型并分享该地址，以接收资金。  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. 发送资金

1. 前往 **收款人 [Recipient]** 部分。  


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. 输入 **收款人地址 [recipients address]**。  

4. 指定 **金额 [amount]** 和可选的 **备忘录 [memo]**。  

5. 检查交易详情并 **确认 [confirm]**。  


完成后，余额会在你的账户列表中更新。  


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. 执行多重签名交易：设置分布式密钥生成（多重签名）

Zkool 中的多重签名使用 **分布式密钥生成（DKG）[Distributed Key Generation (DKG)]**，确保多个参与者共同控制一个共享账户。



### 步骤 1：发起 DKG
为共享钱包 [shared wallet] 选择一个 **名称 [Name]**（例如 Anabelle）。

设置 **参与者数量 [Number of Participants]**。
  
选择你的 **参与者 ID [Participant ID]**。
  
定义 **所需签名者数量（阈值）[Number of Signers Required (Threshold)]**。
    
选择 **资金账户 [Funding Account]**。
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### 步骤 2：添加参与者地址
- 输入每位参与者的 **统一地址 [Unified Address]**（推荐）。


**注意 [Note]：**如果你使用 Orchard 专用或 Sapling 专用地址，多重签名将仅限于该 pool（Orchard 或 Sapling）。  
这意味着共享钱包无法接收来自其他 pool 的资金。  
为了获得最大的兼容性和灵活性，请始终使用 **统一地址 [Unified Addresses]**。  


### 步骤 3：运行 DKG 轮次
等待所有参与者交换 **第 1 轮 [round 1]** 和 **第 2 轮 [round 2]** 数据包。  


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### 步骤 4：完成共享地址
完成后，将生成一个 **共享地址 [shared address]**。  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## 结论

使用 Zkool，你可以：创建账户、发送和接收资金，以及使用分布式密钥生成设置 **多重签名钱包 [multisig wallet]**。这可确保 **增强的安全性 [enhanced security]** 以及 **协作式且私密的资金管理 [collaborative and private fund management]**。
