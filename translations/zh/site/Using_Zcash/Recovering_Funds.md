[![编辑页面](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Zcash 钱包资金恢复

**为什么要保留你的私钥？** 

私钥是你数字资产安全的核心。妥善保管私钥并且绝不与第三方分享，这一点至关重要。 

> 在此语境中，**助记词**可以被视为等同于私钥。

只要你始终掌控自己的私钥，就始终可以进行恢复。Zcash 有 2 种私钥（透明和屏蔽），你可以轻松将它们导入你的钱包，无论是使用 Sweep Funds 功能，还是将其作为新账户导入。通过持续掌控你的私钥，你就能完全掌控自己的资产，确保所有权、安全性以及安心。

# 安全与责任

用户必须理解处理私钥所涉及的风险，并保护这些密钥不被未经授权者访问，这一点至关重要。资金的安全取决于用户是否有责任妥善保护自己的私钥。

## 使用 Ywallet 恢复资金

YWallet 被公认为恢复无法访问资金的最佳选择之一，无论是仅有*透明*私钥，还是屏蔽私钥。

### 1) 导入私钥 

1. 下载 Ywallet[](https://ywallet.app)

2. 打开后，点击右下角的“More”

3. 选择“Accounts”

4. 点击右上角的加号 

![加号按钮](https://i.postimg.cc/xJbVz7gB/plus.png)

5. 打开“Restore an account”开关 

6. 输入助记词或私钥

> **注意**：如果你的资金存放在不支持屏蔽地址的钱包中（Trust、Coinomi、Guarda 等），你将必须使用 “Sweep Funds” 功能。

### 2) Sweep Funds

1. 下载 Ywallet[](https://ywallet.app)

2. 打开后，点击右下角的“More”

3. 向下滚动到 Tools 部分，点击“Sweep”

4. 输入你的助记词（Gap limit 会扫描由该助记词生成的其他地址）

![Sweep Funds 界面](https://i.postimg.cc/3055CBcN/sweep.png)

5. 输入你希望使用的目标地址所属的 Value Pool（交易所使用 Transparent）

6. 输入你希望存入资金的目标地址。 

## Zkool

请查看详细的 Zkool 文档，了解另一种资金恢复方式：

- [Zkool 文档](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator 是一款可恢复（挖掘！）可能丢失的 ZEC 的工具：

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
