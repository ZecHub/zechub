# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="Journalist icon"/> 使用 Zcash 运行私密社区金库 [Community Treasury]

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中级 - 7 分钟
</span>

## TL;DR

- 使用屏蔽 [shielded] 地址 [addresses] 持有共享资金
- 限制余额和交易 [transactions] 的可见性
- 将运营角色与公开身份分离
- 使用备忘录 [memos] 实现内部问责

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- DAO 和社区
- 拨款 [Grant] 项目
- 开源团队
- 加密货币集体
  

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题

公共 blockchain 会暴露社区资金的：
- 金库 [treasury] 总余额
- 支出历史
- 贡献者身份

这会带来风险：
- 资金成为攻击目标
- 因透明 [transparency] 压力而产生内部冲突
- 丧失战略隐私 [privacy]

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 为什么选择 Zcash？

Zcash 让社区能够：
- 私密持有资金
- 执行交易而不暴露细节
- 在不公开暴露的情况下维持内部问责

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 你需要什么

- 一个 Zcash 钱包 [wallet]（或多个钱包以分离角色）
- 管理资金的清晰内部流程
- 可选：用于追踪的共享文档

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 分步指南

### 第 1 步：创建屏蔽金库地址

- 为金库生成一个 **z-address**
- 这将成为主要持有账户


### 第 2 步：定义角色

分离职责：
- 财务主管（控制资金）
- 贡献者（请求支出）
- 审核者（内部批准）

避免将这些角色与公开身份关联。



### 第 3 步：私密接收资金

- 通过屏蔽地址接受贡献
- 鼓励贡献者从屏蔽钱包发送资金



### 第 4 步：内部追踪交易

使用：
- 钱包备忘录
- 链下日志（例如共享文档）

备忘录示例： 
 - 拨款 #12 - 开发者 [Developer] 支付 [Payment]



### 第 5 步：私密执行支付

- 通过屏蔽交易发送资金（z → z）
- 避免公开暴露收款人身份

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 应避免的常见错误

- 将透明 [transparent] 地址用于金库  
- 公开发布钱包余额  
- 未在内部追踪交易  
- 将金库地址与可识别的个人关联  


<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 结果

你的社区可以：
- 安全地管理资金
- 保护贡献者和收款人
- 在不暴露财务战略的情况下运营


<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [谁能查看你的 Zcash 支付](/start-here/who-can-see-your-zcash-payment)
- [无需关联身份即可汇款](/zcash-use-cases/send-money-without-linking-identity)
 

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 进度

**第 5 步，共 6 步**

你已了解如何私密地管理共享资金。

 <br/>

## 下一步

- [记者隐私设置](/zcash-use-cases/journalist-privacy-setup)
