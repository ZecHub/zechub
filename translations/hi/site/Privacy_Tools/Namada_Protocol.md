[![पृष्ठ संपादित करें](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada लोगो](https://i.ibb.co/BZcZHS1/logo.png)


## Namada क्या है?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Namada-Zcash Strategic Alliance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol proof-of-stake consensus पर आधारित एक Layer 1 प्लेटफ़ॉर्म है, जिसे interchain asset-agnostic privacy प्रदान करने के लिए डिज़ाइन किया गया है। Inter-Blockchain Communication (IBC) protocol के माध्यम से, Namada fast-finality chains के साथ सहज रूप से एकीकृत होता है, जिससे smooth interoperability संभव होती है। इसके अतिरिक्त, Namada Ethereum के साथ एक trustless two-way bridge स्थापित करता है, जो दोनों networks के बीच सुरक्षित और विश्वसनीय संचार को सक्षम बनाता है।

Namada, Multi-Asset Shielded Pool (MASP) circuit के एक उन्नत संस्करण को लागू करके privacy को प्राथमिकता देता है। यह upgraded version सभी प्रकार की assets, जिनमें fungible और non-fungible tokens दोनों शामिल हैं, को ठीक Zcash की तरह एक shared shielded set का उपयोग करने में सक्षम बनाता है। परिणामस्वरूप, Namada पर समर्थित assets का transfer अलग प्रकार से निजी हो जाता है, क्योंकि इसमें शामिल उच्च स्तर की privacy के कारण उसकी पहचान करना कठिन हो जाता है। साथ ही, Multi Asset Shielded Pool circuit के नवीनतम अपडेट ने shielded set rewards को सक्षम किया है, जो एक groundbreaking feature या incentive है, जो privacy को एक public good के रूप में बढ़ावा देने के लिए संसाधन आवंटित करता है।

## Ethereum Bridge + IBC Compatible

Ethereum bridge का Namada में एकीकरण किसी अलग protocol की आवश्यकता को समाप्त कर देता है, क्योंकि यह Namada ecosystem का अभिन्न हिस्सा बन जाता है। Namada के भीतर validators को core Namada protocol के साथ-साथ bridge चलाने की ज़िम्मेदारी सौंपी जाती है। ये validators assets को Namada में transfer करने के समय relayers के रूप में भी काम करते हैं, जिससे अतिरिक्त actors की आवश्यकता नहीं रहती। दूसरी ओर, जब assets को Ethereum में transfer किया जाता है, तब बाहरी पक्ष (जिन्हें relayers कहा जाता है) शामिल होते हैं, हालांकि bridge के validation या security की ज़िम्मेदारी उनकी नहीं होती।

![Ethereum Bridge आरेख](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol में किसी भी fast-finality chain से सहज रूप से जुड़ने की क्षमता भी है, जो Inter-Blockchain Communication (IBC) protocol को support करती हो। जब Ethereum के साथ interoperability की बात आती है, तो Namada एक विशेष और सुरक्षित Ethereum bridge लागू करता है, जो trustless तरीके से काम करता है। यह bridge सुरक्षा को प्राथमिकता देने के लिए सावधानीपूर्वक डिज़ाइन किया गया है; यह सभी bridge connections के लिए flow controls लागू करता है और किसी भी faulty Ethereum transfer को एक गंभीर उल्लंघन मानता है, जिसके परिणामस्वरूप slashing penalties लग सकती हैं।

## Shielded Set Rewards

[Namada Protocol](https://blog.namada.net/what-is-namada/) के नवीनतम अपडेट में, shielded assets रखने वाले users को shared shielded set में सक्रिय रूप से भाग लेने के लिए प्रोत्साहित किया जाता है। यह updated MASP circuit के integration के माध्यम से संभव हुआ है, जिसमें अब innovative Convert Circuit शामिल है। इस नई feature का उपयोग करके, Namada users को shielded assets रखकर shared shielded set में योगदान देने के लिए प्रोत्साहित करता है।

Namada में, shielded set को एक non-exclusive और anti-rivalrous public good माना जाता है। इसका अर्थ है कि जैसे-जैसे अधिक लोग shielded transfers का उपयोग करते हैं, प्रत्येक participant के लिए privacy guarantees का स्तर बेहतर होता जाता है। Protocol इस बात को मान्यता देता है कि सभी users के लिए privacy को बढ़ाने में सामूहिक adoption और participation का बहुत महत्व है। इसलिए, users को shielded assets रखने और shared shielded set में योगदान देने के लिए प्रोत्साहित करके, Namada एक अधिक मज़बूत और सुदृढ़ privacy ecosystem को बढ़ावा देता है।

## Shielded Assets Transaction

जब shielded transfers की बात आती है, चाहे उसमें Ethereum non-fungible token (NFT), ATOM, या NAM शामिल हो, वे एक-दूसरे से अलग पहचान में नहीं आते। इसका अर्थ है कि MASP (Modified Accumulator Sapling Protocol) द्वारा प्रदान की गई privacy-preserving features, जो Zcash Sapling circuit का एक उन्नत संस्करण है, सभी प्रकार की assets पर समान रूप से लागू होती हैं। MASP circuit Namada ecosystem के भीतर सभी assets को एक ही shielded set साझा करने में सक्षम बनाता है। यह दृष्टिकोण सुनिश्चित करता है कि privacy guarantees अलग-अलग assets के बीच बिखरी हुई न रहें। किसी विशेष asset से जुड़े transaction volume की परवाह किए बिना, privacy protection एकसमान और स्वतंत्र बनी रहती है।

![Shielded Assets Transaction आरेख](https://i.ibb.co/7CDmWk6/image-1.png)

विभिन्न assets के बीच shielded set को एकीकृत करके, Namada यह सुनिश्चित करता है कि shielded transfer में शामिल specific asset type चाहे कोई भी हो, privacy समान रूप से बनी रहे। यह दृष्टिकोण protocol के भीतर एक cohesive privacy framework को बढ़ावा देता है और Ethereum NFTs, ATOM, NAM, तथा अन्य समर्थित assets से जुड़े transactions की गोपनीयता को बेहतर बनाता है। Namada नवीन zk-SNARKs का उपयोग करके fungible और non-fungible tokens के private transfer को भी सक्षम बनाता है, जिससे native और non-native tokens के लिए गोपनीयता सुनिश्चित होती है, ठीक वैसे ही जैसे Zcash पर किया जाता है।

## कम शुल्क और तेज़ Transactions

Namada तेज़ transaction speed और finality प्रदान करने के लिए दो प्रमुख तत्वों को जोड़ता है: fast-proof generation और modern Byzantine Fault Tolerant (BFT) consensus। ये दोनों विशेषताएँ Namada को Visa के तुलनीय transaction processing rate हासिल करने में सक्षम बनाती हैं, जो एक प्रसिद्ध payment network है और अपनी उच्च throughput capabilities के लिए जाना जाता है। Fast-proof generation का अर्थ है ऐसे cryptographic proofs का कुशल निर्माण, जो Blockchain पर transactions की correctness और integrity को validate करते हैं। उन्नत techniques और optimizations का उपयोग करके, Namada Protocol इन proofs को generate करने के लिए आवश्यक computational overhead को कम करता है, जिसके परिणामस्वरूप transactions का तेज़ verification और confirmation संभव होता है।

इसके अतिरिक्त, Namada modern BFT consensus algorithms का उपयोग करता है, जो पूरे network में transactions की integrity और agreement सुनिश्चित करते हैं। ये consensus mechanisms Namada को transactions के order और validity पर consensus तक पहुँचने में सक्षम बनाते हैं, जिससे finality की मज़बूत गारंटी मिलती है। Finality के साथ, transactions को irreversible माना जाता है, जिससे double-spending या transaction rollback का जोखिम कम हो जाता है। Namada, Anoma की तरह एक समान दृष्टिकोण अपनाता है, जो scalability solutions के लिए जाना जाने वाला एक अन्य protocol है। Namada fractal instances अपनाता है, जो main blockchain के भीतर nested chains के निर्माण की अनुमति देते हैं। यह fractal संरचना load को कई instances में वितरित करके horizontal scaling को सक्षम बनाती है, जिससे network की कुल capacity और performance बेहतर होती है।

## Namada और Zcash Strategic Alliance

हाल की एक publication के अनुसार, जिसे [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/) पर देखा जा सकता है, Namada Protocol के पीछे की team Namada और Zcash assets, chains, तथा communities के बीच एक strategic alliance के लिए proposal और request-for-comment (RFC) प्रस्तुत करने को लेकर उत्साहित है।

![Namada-Zcash Strategic Alliance आरेख](https://i.ibb.co/FqsmkMb/image-2.png)

प्रस्तावित alliance में तीन मुख्य तत्व शामिल हैं। पहला, एक grants pool बनाया जाएगा, जो उन projects को funding प्रदान करेगा जो Zcash और Namada दोनों के लिए लाभकारी हों। दूसरा, ZEC holders को NAM tokens का एक airdrop आवंटित किया जाएगा। अंत में, Zcash और Namada को जोड़ने वाला एक trust-minimized bridge स्थापित करने की योजना है। एक बार लागू हो जाने पर, यह bridge ZEC holders, जिन्हें Zolders कहा जाता है, को Namada पर अपने ZEC का उपयोग करने में सक्षम बनाएगा। इसके अलावा, Zolders को Namada के माध्यम से व्यापक Cosmos और Ethereum ecosystems तक पहुँचने का अवसर मिलेगा। आप इस strategic alliance के बारे में अधिक जानकारी [Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372) पर जान सकते हैं।

## संदर्भ लिंक

- [Namada Protocol का आधिकारिक वीडियो](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Protocol की आधिकारिक वेबसाइट](https://namada.net/)
- [Namada Blog](https://blog.namada.net/)
- [Namada Docs](https://docs.namada.net/)
