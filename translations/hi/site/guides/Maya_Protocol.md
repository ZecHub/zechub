# Maya विकेन्द्रीकृत एक्सचेंज

---

## ट्यूटोरियल


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="LeoDex पर Ethereum को Zcash में कैसे Swap करें"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocol क्या है?

Maya एक [विकेन्द्रीकृत एक्सचेंज](https://nym.com/blog/what-is-dex) (DEX) सिस्टम है जो अलग-अलग blockchains के बीच cryptocurrencies की trading को सक्षम बनाता है। उदाहरण के लिए, आप Bitcoin blockchain पर Bitcoin (BTC) को Ethereum blockchain पर Ethereum (ETH) के साथ आसानी से swap कर सकते हैं, बिना assets को custody में रखे और बिना किसी centralized authority या Know Your Customer (KYC) प्रक्रियाओं को शामिल किए।

Maya Protocol को Cosmos Software Development Kit (Cosmos SDK) का उपयोग करके विकसित किया गया था और यह Proof of Bond (PoB) consensus mechanism पर काम करता है। इस protocol को "Node Operators" बनाए रखते हैं, जो system में capital stake करते हैं और अपने योगदान व प्रयासों के बदले reward के रूप में returns कमाते हैं। मूल रूप से, nodes वे computers हैं जो ऐसा software चलाते हैं जो user swaps को validate करता है और अलग-अलग blockchains पर निर्दिष्ट addresses में assets की निगरानी करता है।

किसी swap को पूरा करने के लिए, समर्थित cryptocurrency को Maya के किसी address में प्राप्त होना चाहिए, जिसे किसी user द्वारा भेजा गया हो, और फिर उतनी ही समतुल्य राशि Maya के किसी दूसरे address से किसी दूसरी blockchain पर भेजी जाती है। इस प्रक्रिया का प्रबंधन और अनुमोदन कम-से-कम दो-तिहाई nodes द्वारा किया जाता है, खासकर यह सुनिश्चित करने के लिए कि funds सही तरह से प्राप्त हुए हैं।

इस तरह, users एक blockchain पर एक प्रकार का token भेज सकते हैं और दूसरी blockchain पर एक अलग प्रकार का token प्राप्त कर सकते हैं, वह भी native रूप में और wrapped tokens का उपयोग किए बिना।

## Proof of Bond क्या है?

Proof of Bond (PoB) एक consensus mechanism है जिसमें node operators को network में भाग लेने के लिए एक bond (आमतौर पर network के native token के रूप में) commit करना होता है। यह bond आर्थिक सुरक्षा के एक रूप की तरह काम करता है, जिससे यह सुनिश्चित होता है कि nodes ईमानदारी से काम करें और network की integrity बनाए रखें2। यदि कोई node दुर्भावनापूर्ण ढंग से काम करने की कोशिश करता है या अपने कर्तव्यों का पालन करने में विफल रहता है, तो उसका bond slashed किया जा सकता है, यानी दंड के रूप में उसका एक हिस्सा ले लिया जाता है।

Maya Protocol में, यह mechanism node operators के staked resources से आर्थिक मूल्य उत्पन्न करने में मदद करता है, जिससे capital efficiency बढ़ती है। इसी तरह, Thorchain में node operators network को secure करने और participants के बीच सहयोग सुनिश्चित करने के लिए RUNE (native token) bond करते हैं।

## Maya और THORChain के बीच अंतर

Maya, THORChain का एक fork है, लेकिन इसमें कुछ नई features और functionality जोड़ी गई हैं, जो इसे एक बेहतरीन alternative बनाती हैं। इनमें सबसे महत्वपूर्ण हैं

### Liquidity Nodes

Pure Bond Model का पालन करने के बजाय, Maya Liquidity Nodes model की ओर बदलाव पर विचार कर रहा है। इस system में, nodes को सीधे liquidity contribute करने की अनुमति होती है, जिसे वे network के साथ bond करते हैं। इस approach का मतलब है कि node operators एक महत्वपूर्ण जोखिम का सामना करते हैं: यदि वे funds का दुरुपयोग करते हैं, तो उन्हें नुकसान उठाना पड़ता है, जो एक शक्तिशाली deterrent की तरह काम करता है। परिणामस्वरूप, node operators Liquidity Pools से Liquidity Units का उपयोग करते हैं, जो एक साथ liquidity भी प्रदान करते हैं और network security को भी मजबूत करते हैं।

### Impermanent Loss Protection

एक ऐसा system जो liquidity providers को उस अस्थायी नुकसान (LPs) से बचाता है, जिसका वे liquidity प्रदान करते समय अनुभव कर सकते हैं, क्योंकि crypto assets की कीमतों में लगातार उतार-चढ़ाव होता रहता है।
ILP, $CACAO supply का 10% (10 million $CACAO) अपने पास रखता है और protocol fees के 10% से लगातार replenish होता रहता है। ILP liquidity deposit के 50 दिन बाद सक्रिय होता है, और इसकी coverage 100% पर capped रहती है।

ILP coverage की अवधि ASSET और $CACAO के performance पर निर्भर करती है। यदि ASSET बेहतर प्रदर्शन करता है, तो 150 दिनों के बाद full coverage प्राप्त होती है, और यदि $CACAO बेहतर प्रदर्शन करता है, तो 450 दिनों के बाद। पूर्ण withdrawal होने पर ILP का payout भी होता है और reset भी, लेकिन partial withdrawals से यह प्रभावित नहीं होता। top-ups के लिए, ILP reset हो जाता है लेकिन payout नहीं होता।

### allocation का एक अलग model

Liquidity Auction एक 21-दिवसीय event था, जिसे participants के बीच $CACAO tokens वितरित करने के लिए बनाया गया था। इस event के दौरान, users ने supported assets को एक specific address पर deposit किया। auction के अंत में, $CACAO tokens का 90% हिस्सा participants को उनके liquidity contributions के अनुपात में allocated किया गया, जबकि शेष 10% ILP reserve को allocated किया गया। participants liquidity providers बन गए, और उनके deposited assets तथा $CACAO tokens को Maya के pools में रखा गया, जिससे वे उत्पन्न fees में हिस्सा कमा सके।

### reserves को संभालने का एक अलग तरीका

Maya Protocol की genesis के समय, उपलब्ध CACAO reserves कुल supply का केवल 10% थे, जबकि THORChain में यह 44% थे, और उनका मुख्य उद्देश्य Impermanent Loss Protection (ILP) था। Maya में block emissions नहीं हैं; और यदि Protocol Owned Liquidity तथा Lending को लागू किया जाता है, तो उनका design अलग होगा, क्योंकि THORChain में ये पहलू Reserves के साथ काफ़ी निकटता से जुड़े हुए हैं।

फिर भी, अपने अंतर होने के बावजूद, Maya THORChain के लिए एक पूरक समाधान के रूप में भी काम करता है, जो redundancy, extension और validation प्रदान करता है, और ऐसे नए networks को integrate करता है जो वर्तमान THORChain implementation में मौजूद नहीं हैं।

इसके अलावा, Maya का लक्ष्य अन्य services के लिए एक *backend* बनना है, ताकि उसके ऊपर बहुत सारे नए *frontends* या Maya की infraestructure पर बने DEX services विकसित हो सकें।

## Maya protocol wallet integration

एक *backend* के रूप में काम करते हुए, Maya को उपयोग में लाने के लिए अलग-अलग UI's और wallets द्वारा support किया जाना आवश्यक है। 
यहाँ कुछ ऐसी services की सूची है जो पहले से Maya को support करती हैं:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet, और Rabby.

[XDEFI](https://www.xdefi.io/): 30+ native blockchains, और सभी EVM तथा Cosmos chains के support वाला एक multi-ecosystem self-custody wallet, जिसमें Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, और अन्य शामिल हैं।

[KeepKey ](https://keepkey.com/): digital assets को सुरक्षित रूप से store करने के लिए एक hardware wallet।
