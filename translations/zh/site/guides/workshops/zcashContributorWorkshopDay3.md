# 工作坊 第 3 天



## 数据分析

* 使用专门的系统、工具和技术分析原始数据，以识别模式、趋势和洞察的科学


它涉及：
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* 加密电子现金。首个为私密点对点支付开发零知识加密技术的加密货币。

注意：如果你想要自己 TRUST 的准确数据，建议运行你自己的完整节点 [zebrad]。如果你想要一个完整且稳健的解决方案，可以搭建
z3 基础设施 [ zebrad + zainod/lightwalletd + "wallet of choice here" ]。你可以通过 RPC（远程过程调用）访问
这些数据

想快速演示其工作原理，请观看这个视频：


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## 工作坊演示

本次工作坊将重点介绍如何从钱包层级收集和转换数据。这个层级是大多数人访问
Zcash 区块链的地方。


### 用例（在 Zkool 中为指定账户创建一个包含所有交易的 .csv 文件）

这是一个常见场景，人们需要在这种情况下整理并优化自己的*数字*个人财务。

#### 第 1 步

打开 Zkool 并选择你想使用的账户

注意：本次演示我们将使用一个测试网钱包。

注意2：这里我们选择 Zkool，但任何具有导出功能的钱包都可以使用！

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### 第 2 步


前往右上角菜单并选择“导出交易”

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### 第 3 步

下载我们将用来转换数据的 bash 脚本。对于正在观看的开发者，我将使用 bash，
它是大多数 Linux 发行版中的标准工具，不过你也可以使用你选择的任意语言。 

对于非开发者或刚开始入门的学生来说，可以使用 AI！ 

以下是一些可以帮助你开始的示例提示词：

"我如何使用 "bash/rust/python/ ... etc." 来转换 CSV 文件"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

注意：你仍然需要理解基础知识，但举办这些工作坊正是帮助你理解整个流程是如何运作的。

注意2：AI 通常并不具备隐私性，所以作为学生使用时一定要格外小心！

#### 第 4 步

设置脚本并运行

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### 第 5 步 使用数据

在 libreOffice 或任何 CSV 查看器中打开并使用！



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
