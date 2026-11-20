<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# استخدام ZEC بخصوصية

#### المحمي أو الخاص، مقابل الشفاف

في الوضع الحالي، يوجد نوعان من العناوين (addresses) والمعاملات (transactions) في Zcash: المحمي (shielded) والشفاف (transparent). والفرق بين ZEC المحمي والشفاف بسيط جدًا. فـ ZEC المحمي يحافظ على خصوصية أموالك ومعاملاتك، في حين أن ZEC الشفاف يعمل مثل Bitcoin، أي بشفافية تامة. وهذا يعني أن أي شخص يمكنه الاطلاع على رصيدك وجميع معاملاتك إذا كان يعرف عنوانك.

عندما يبدأ الناس باستخدام ZEC لأول مرة، قد لا يدركون نوع العنوان الذي يستخدمونه. ويعود ذلك إلى أن ليست كل منصات التداول (exchange) تدعم ZEC المحمي و/أو عمليات سحب ZEC المحمية.

فعلى سبيل المثال، إذا استخدم شخص ما Coinbase واشترى ZEC، فسيشتري ZEC شفافاً، ولن يتمكن من سحب ZEC هذا إلا إلى عنوان شفاف في محفظة (wallet). ويمكن لمحافظ مثل [Zodl](https://zodl.com/) حماية الأموال المرسلة إلى عنوان شفاف لحل هذه المشكلة، لكن ليس الجميع على علم بذلك. وببساطة، يستخدم كثير من الناس ZEC بالطريقة التي تسمح لهم بها منصة التداول أو المحفظة الرئيسية الخاصة بهم.

#### التأكد من أن ZEC الخاص بك محمي

نوصي بأن يحتفظ الجميع بـ ZEC الخاص بهم في حفظ ذاتي. أي انقل ZEC الخاص بك من منصة التداول إلى محفظة. وأفضل طريقة لمعرفة ما إذا كنت تستخدم ZEC محمياً، أي خاصاً، هي النظر إلى العنوان الذي يوجد فيه الرصيد. فإذا كان العنوان يبدأ بـ «z» أو «u1»، فإن رصيدك محمي. وإذا كان العنوان يبدأ بـ «t»، فإن الرصيد شفاف.

هناك عموماً طريقان للحصول على ZEC محمي.

من منصة تداول تدعم عمليات السحب **المحمية**:

  1. اشترِ ZEC من منصة تداول
  2. ابدأ عملية السحب في منصة التداول
  3. افتح محفظة ZEC المحمية الخاصة بك وتأكد من أن عنوان الاستلام يبدأ بـ «u1» أو «z»
  4. نفّذ عملية السحب من منصة التداول الخاصة بك

من منصة تداول تدعم عمليات السحب **الشفافة**:


  1. اشترِ ZEC من منصة تداول
  2. ابدأ عملية السحب في منصة التداول
  3. افتح محفظة ZEC ذات الحماية التلقائية الخاصة بك واستخدم عنوان الاستلام الشفاف
  4. نفّذ عملية السحب من منصة التداول الخاصة بك
  5. انتظر عشرة تأكيدات، ثم قم بحماية ZEC بنقله من عنوانك الشفاف إلى العنوان المحمي


إليك شرحاً لكيفية سحب ZEC من منصة تداول. لاحظ أن هذه عملية سحب محمية.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
إليك شرحاً لكيفية حماية ZEC الخاص بك بنقله من عنوان شفاف إلى عنوان محمي.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
إليك شرحاً لكيفية شراء ZEC على Coinbase وإرساله إلى Zodl.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### المعاملات

بعد التأكد من أن ZEC الخاص بك موجود في محفظة محمية تدعم العناوين المحمية، يمكنك الآن أن تقرر ما إذا كنت ترغب في إجراء معاملات بـ ZEC هذا. وإجراء المعاملات بـ ZEC سهل للغاية. إذ يمكنك إرسال ZEC إلى عناوين محمية أو شفافة حسب تفضيل الشخص الآخر. وكما هو الحال في أي معاملة مالية، هناك احتمالات ضئيلة لتسرّب البيانات. ويُعد ZEC الأفضل في مكافحة تسرّب البيانات، لكن هذا لا يعني أن تستخدمه دون حذر. إليك بعض الأمور التي عليك تجنبها عند إجراء المعاملات بـ ZEC.

- الكشف عن عنوانك المحمي
- استخدام عنوان محمي كممر للعناوين الشفافة (t-addresses)، أو ما يُعرف بـ «الخلط»
- إجراء عدد كبير من المعاملات من المحمي إلى الشفاف، والكشف عن أنك تجريها
- إخبار الناس بانتظام بالأماكن التي تنفق فيها ZEC المحمي


باختصار، أفضل ما يمكنك فعله بـ ZEC الخاص بك هو الاحتفاظ به في محفظة محمية، وإجراء المعاملات بين العناوين المحمية، والحذر في طريقة استخدامك لـ ZEC في الأماكن العامة (مثل المقهى). فضمان الخصوصية (privacy) يأتي مع قدر من المسؤولية.

#### المصادر

[معاملات Zcash](https://zechub.wiki/using-zcash/transactions)
