<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- ये एक पक्ष को **यह साबित करने** की अनुमति देते हैं कि वह कुछ जानता है, बिना स्वयं उस जानकारी को उजागर किए
- Zcash, ZK-SNARKs का उपयोग यह साबित करने के लिए करता है कि कोई transaction वैध है (सही amounts, unspent inputs) **बिना sender, receiver, या amount को उजागर किए**
- "Succinct" का अर्थ है कि proof बहुत छोटा होता है और जटिल statements के लिए भी उसे verify करना तेज़ होता है
- Orchard pool Halo 2 का उपयोग करता है, जो एक ZK-SNARK system है जिसमें **trusted setup की आवश्यकता नहीं होती**

---

## Proof क्या है?

Proofs सभी गणित की आधारशिला हैं। एक proof वह claim या theorem है जिसे आप सिद्ध करना चाहते हैं, तथा derivations का वह क्रम है जिसके आधार पर यह घोषित किया जाता है कि theorem सिद्ध हो चुका है। उदाहरण के लिए, यह कि किसी triangle के सभी angles का कुल 180° होता है, इसे कोई भी व्यक्ति स्वतंत्र रूप से जाँच सकता है (verifier)।

**Proofs** 

Prover ---> Claim करता है ---> Verifier चुनता है ---> Accept/Reject 

(प्रोवर और verifier दोनों algorithms हैं)

Computer science में efficiently verifiable proofs के लिए प्रयुक्त शब्द NP proofs है। इन छोटे proofs को polynomial time में verify किया जा सकता है। इसका व्यापक विचार यह है: "किसी theorem का एक solution मौजूद है और उसे verifier के पास जाँच के लिए भेजा जाता है"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


किसी NP-language में = दो शर्तें पूरी होनी चाहिए: 

Completeness: सच्चे claims verifier द्वारा स्वीकार किए जाएंगे (जिससे ईमानदार provers verification तक पहुँच सकें)

Soundness: झूठे claims के लिए कोई proof नहीं होगा (किसी भी cheating prover strategy के लिए वे गलत claim की correctness सिद्ध नहीं कर पाएंगे)।


### Interactive & Probabalistic Proofs

**Interaction**: केवल proof पढ़ने के बजाय, verifier कई message rounds में prover के साथ आगे-पीछे संवाद करता है।

**Randomness**: verifier की prover से की गई requests randomized होती हैं और prover को प्रत्येक का सही उत्तर देने में सक्षम होना चाहिए। 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Interaction और randomness को साथ उपयोग करके, किसी blind verifier को Probabilistic Polynomial Time (PPT) में कोई claim सिद्ध किया जा सकता है। 

क्या Interactive Proofs, NP proofs से अधिक को efficiently verify कर सकते हैं?

NP Proofs बनाम IP proofs:

|  Statement   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  yes      |  yes   |
|    CO-NP     |  no       |  yes   |
|    #P        |  no       |  yes   |
|    PSPACE    |  no       |  yes   |


NP - किसी statement के लिए एक solution मौजूद है

CO-NP - यह सिद्ध करना कि किसी statement का कोई solution नहीं है

#P - यह गिनना कि किसी statement के कितने solutions मौजूद हैं

PSPACE  - विभिन्न statements के alternation को सिद्ध करना

### Zero Knowledge क्या है?

किसी interaction के बाद verifier जो compute कर सकता है, वह उसी के समान होता है जो वह पहले से सिद्ध कर सकता था। prover और verifier के बीच कई rounds में हुआ interaction, verifier की computational power को नहीं बढ़ाता।

**The Simulation Paradigm**

यह प्रयोग cryptography में व्यापक रूप से मिलता है। यह एक "Real View" और "Simulated View" प्रस्तुत करता है। 

Real View: Prover और Verifier (P,V) के बीच interactions की सभी संभावित histories

Simulated View: verifier, Prover और Verifier के बीच सभी संभावित interactions को simulate करता है 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

एक polynomial-time distinguisher यह निर्धारित करने का प्रयास करता है कि वह real view देख रहा है या simulated view, और वह दोनों से बार-बार sample माँगता है।

इन दोनों views को "computationally indistinguishable" कहा जाता है यदि सभी distinguisher algorithms/strategies के लिए, real या simulated से polynomial संख्या में samples प्राप्त करने के बाद भी, probability >1/2 हो। 

**Zero-Knowledge Arguments of Knowledge**

एक interactive protocol (P,V) zero-knowledge होता है यदि कोई simulator (algorithm) मौजूद हो ताकि प्रत्येक probabilty polynomial-time verifier के लिए (जब theorem सही हो), real view और simulated view में अंतर निर्धारित करने वाली probability distributions computationaly indistinguishable हों। 

Interactive Protocols तब उपयोगी होते हैं जब केवल एक verifier हो। इसका एक उदाहरण zero-knowledge 'proof of taxes' application में tax auditor हो सकता है।

## SNARK क्या है?

**Succinct Non-Interactive Argument of Knowledge**

व्यापक परिभाषा - ऐसा succinct proof कि कोई statement सत्य है। proof छोटा होना चाहिए और verify करने में तेज़ होना चाहिए। SNARKS में Prover से Verifier को एक single message भेजा जाता है। verifier फिर उसे accept या reject कर सकता है। 

उदाहरण statement: "मैं एक message (m) जानता हूँ ऐसा कि SHA256(m)=0"

एक zk-SNARK में proof, message (m) के बारे में कुछ भी प्रकट नहीं करता।

**Polynomials**: ऐसे पदों के योग जिनमें एक constant (जैसे 1,2,3), variables (जैसे x,y,z), और variables के exponents (जैसे x², y³) शामिल होते हैं। 

उदाहरण: "3x² + 8x + 17"

**Arithmetic Circuit**: polynomials को compute करने का एक model। अधिक सामान्य रूप से, इसे Directed Acyclic Graph के रूप में परिभाषित किया जा सकता है, जिसमें graph के प्रत्येक node पर एक arithmetic operation किया जाता है। circuit में addition gates, multiplication gates और कुछ constant gates होते हैं। जिस प्रकार Boolean circuits wires में bits ले जाते हैं, उसी प्रकार Arithmetic circuits integers ले जाते हैं।


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

इस उदाहरण में, prover verifier को यह विश्वास दिलाना चाहता है कि वह arithmetic circuit का एक solution जानता है।  

**Commitments**: ऐसा करने के लिए, prover circuit से संबद्ध सभी values (private और public) को एक commitment में रखेगा। Commitments अपने inputs को ऐसी function का उपयोग करके छिपाते हैं जिसका output irreversible होता है।

Sha256 एक hashing function का उदाहरण है जिसका उपयोग commitment scheme में किया जा सकता है।

जब prover values के लिए commitment कर देता है, तो commitments verifier को भेजे जाते हैं (यह विश्वास रखते हुए कि वे मूल values में से किसी को भी उजागर नहीं कर पाएंगे)। इसके बाद prover, verifier को graph के nodes पर प्रत्येक value के ज्ञान का प्रदर्शन कर सकता है। 

**Fiat-Shamir Transform**

Protocol को *non-interactive* बनाने के लिए prover, verifier की ओर से randomness generate करता है (जो hidden challenge के लिए उपयोग होती है) और इसके लिए एक cryptographic hash function का उपयोग करता है। इसे random oracle कहा जाता है। इसके बाद prover verifier को एक single message भेज सकता है, जिसे verifier सही होने पर जाँच सकता है। 

ऐसा SNARK बनाने के लिए जिसे general circuits के लिए उपयोग किया जा सके, दो elements आवश्यक हैं:

Functional commitment scheme: committer को एक polynomial के लिए एक short string के साथ commitment करने देती है, जिसका उपयोग verifier committed polynomial के claimed evaluations की पुष्टि के लिए कर सकता है।

Polynomial interactive oracle: Verifier, prover (algorithm) से polynomial commitment scheme का उपयोग करके अपनी पसंद के विभिन्न points पर सभी commitments को open करने के लिए कहता है और जाँचता है कि उनके बीच identity सही है।

**Setup**

Setup procedures verifier की सहायता करती हैं, circuit का सार प्रस्तुत करके और public parameters output करके। 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Pre-processing setup के प्रकार**:

Trusted Setup per circuit - प्रत्येक circuit के लिए एक बार चलाया जाता है। यह circuit-specific होता है और secret randomness (Common Reference String) को गोपनीय रखा जाना चाहिए तथा नष्ट कर देना चाहिए। 

इस method में compromised setup का अर्थ है कि कोई dishonest prover false statements को सिद्ध कर सकता है। 

Trusted but Universal Setup - trusted setup केवल एक बार चलाना होता है और उसके बाद deterministically कई circuits का preprocess किया जा सकता है। 

Transparent Setup (No Trusted Setup)- preprocessing algorithm किसी भी secret randomness का उपयोग नहीं करता। 


**SNARK proof constructions के प्रकार**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Trusted Setup की आवश्यकता होती है लेकिन proofs बहुत छोटे होते हैं और उन्हें तेज़ी से verify किया जा सकता है।

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universally Trusted Setup.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Trusted Setup नहीं होता लेकिन proofs थोड़े लंबे हो सकते हैं या prover को चलने में अधिक समय लग सकता है। 

SNARKS तब उपयोगी होते हैं जब कई verifiers की आवश्यकता हो, जैसे Zcash जैसी blockchain में या [Aztec](https://docs.aztec.network) जैसे zk-Rollup में, ताकि कई validating nodes को प्रत्येक proof के लिए कई rounds में interact न करना पड़े। 

## Zcash में zk-SNARK's कैसे implement किए गए हैं?

सामान्यतः zero-knowledge proofs ऐसे tools हैं जिनका उपयोग protocols में बिना कोई जानकारी उजागर किए ईमानदार व्यवहार लागू करने के लिए किया जाता है। 

Zcash एक public blockchain है जो private transactions को संभव बनाती है। zk-SNARK's का उपयोग यह सिद्ध करने के लिए किया जाता है कि कोई private transaction network consensus rules के भीतर वैध है, बिना transaction के किसी अन्य विवरण को उजागर किए। 

[Video Explainer](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - इस lecture में Ariel Gabizon, Zcash Note Commitment Tree, Blind Polynomial Evaluation और Homomorphically Hidden Challenges का विवरण देते हैं तथा बताते हैं कि इन्हें network पर कैसे implement किया जाता है। 

अधिक जानकारी के लिए [Halo2 book](https://zcash.github.io/halo2/index.html) पढ़ें।

## अन्य Zero-Knowledge Applications 

zk-SNARKS विभिन्न प्रकार के applications में कई लाभ प्रदान करते हैं। आइए कुछ उदाहरणों पर नज़र डालें।

**Scalability**: यह 'Outsourcing Computation' द्वारा प्राप्त की जाती है। किसी L1 chain को off-chain service के काम को verify करने के लिए zero-knowledge की सख्त आवश्यकता नहीं होती। zk-EVM पर transactions अनिवार्य रूप से private नहीं होते।

Proof आधारित Rollup (zk-Rollup) service का लाभ यह है कि यह सैकड़ों/हज़ारों transactions के batch को process कर सकती है और L1 यह verify कर सकता है कि सभी transactions सही ढंग से process किए गए, इसके लिए केवल एक succinct proof की आवश्यकता होती है, जिससे network की transaction throughput 100 या 1000 गुना तक बढ़ सकती है।

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperability**: यह zk-Bridge पर source chain पर assets को 'lock' करके और target chain को यह सिद्ध करके प्राप्त की जाती है कि assets lock किए जा चुके हैं (proof of consensus)।

**Compliance**: [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) जैसे projects यह सिद्ध कर सकते हैं कि कोई private transaction स्थानीय banking laws के अनुरूप है, बिना transaction के विवरण उजागर किए। 

**Fighting Disinformation**: blockchain और cryptocurrency के बाहर के कई उदाहरणों में, news और media outlets द्वारा process की गई images पर proof generation का उपयोग, ताकि दर्शक स्वतंत्र रूप से image के source और उस पर किए गए सभी operations को verify कर सकें। https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


आगे सीखें: 

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[Hanh Huynh Huu के साथ zkSNARK's](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Dystopia labs पर Sean Bowe](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Avi Wigderson के साथ Zero knowledge Proofs - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink लेख](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lecture 1: Introduction and History of ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Arithmetic Circuits की सरल व्याख्या - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good for?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## संबंधित पृष्ठ

- [Shielded Pools](/using-zcash/shielded-pools) — Zcash value pools में ZK-SNARKs का उपयोग कैसे किया जाता है
- [Halo](/zcash-tech/halo) — Zcash का ZK-SNARK system जो trusted setups को समाप्त करता है
- [Zcash में Post-Quantum Security](/zcash-tech/post-quantum-security) - भविष्य के quantum risks का Zcash cryptography से क्या संबंध है
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZK-SNARK technology पर निर्मित ZSAs
- [ZEC और Zcash क्या हैं](/start-here/what-is-zec-and-zcash) — Zcash और उसके privacy model का परिचय
- [एक मूल सिद्धांत के रूप में Privacy](/privacy/privacy-as-a-core-principle) — वित्तीय privacy क्यों महत्वपूर्ण है
