<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 支付请求 URI

## 动态二维码概述

URI 是 Universal Resource Identifier（统一资源标识符）的缩写。它们是一种二维码，可在 Zcash 钱包中预填交易信息。能够识别这种格式的钱包，可以通过点击网页上的链接或扫描二维码来构建交易。比如你经营一家线上咖啡店，顾客就可以使用他们的 Zcash 钱包扫描这些二维码完成购买，其中价格和订单号都已预先填好。

## 支付请求的使用场景


- 在线购物。                    结账支付请求由客户在在线购买过程中发起。
- 酒店和住宿预订。   各类预订平台利用支付请求 URL 进行酒店预订。
- 在线账单支付。               公用事业公司使用支付请求 URL，使客户能够顺畅地支付账单。 
- 活动门票购买。             跨境活动组织者使用这种机制，让购票更加便捷。
- P2P 支付。                       个人可以通过消息应用轻松向家人和朋友发送支付请求，消息中可嵌入支付链接。


## 详细信息

[ZIP 321](https://zips.z.cash/zip-0321) 定义了如何构建你自己的自定义支付 URI。 

如何使用 Zcash 创建支付请求： 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="如何使用 Zcash 创建支付请求"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### 代码示例

向你的网站添加 Zcash 捐赠组件： 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="向你的网站添加 Zcash 捐赠组件"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
