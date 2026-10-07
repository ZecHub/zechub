<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_in_DeFi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# استخدام Zcash في DeFi


## Near Intents 

تم دمج Zcash و NEAR Intents، مما يتيح للمستخدمين مبادلة Zcash ‏(ZEC) مع عملات بديلة رائدة أخرى، بما في ذلك Bitcoin وSolana وNEAR وXRP، من دون دفع أي رسوم. ويُعد هذا الدمج جزءًا من جهود NEAR Protocol لإنشاء بنية تحتية من روبوتات الذكاء الاصطناعي المستقلة والقابلة للتحقق، وهو ما يجلب أيضًا فوائد إلى Zcash عبر تمكين مسارات دفع مدعومة بالذكاء الاصطناعي. وبات مستخدمو Zcash الآن قادرين على الوصول إلى العقود الذكية وتطبيقات [DeFi](https://nym.com/blog/what-is-defi) الأوسع مع الحفاظ على خصوصيتهم عبر [Near Intents](https://app.near-intents.org).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/mKVvXY4yjjA"
    title="مبادلات عبر السلاسل باستخدام Zcash x NEAR Intents"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Maya Protocol 

قامت Maya Protocol بدمج Zcash لتعزيز اللامركزية والسيولة وخصوصية المعاملات لديها. يتيح هذا الدمج لمستخدمي Zcash الاستفادة من المبادلات اللامركزية، مما يمنحهم مرونة وسيولة أكبر مع الحفاظ على الخصوصية. اعرف المزيد: [https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="كيفية مبادلة Ethereum إلى Zcash على LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


**ملاحظة**: من الممكن أيضًا ربط أي ETH لديك بالفعل إلى مخزن خاص على هيئة Shielded Zcash باستخدام علامة التبويب "Release" وإدخال عنوانك الشفاف. بعد ذلك يمكنك استخدام `Autoshield` في محفظتك على الهاتف المحمول أو سطح المكتب. ولكي يظل هذا التطبيق خاصًا، يُوصى بعدم المبادلة من ZEC > ETH ثم العودة من ETH > ZEC.

---

## الابتكار حول Zcash DeFi 

**حل الطبقة الأولى**

يجري حاليًا استكشاف خيارات لتمكين تطبيقات DeFi داخل منظومة Zcash باستخدام الطبقة الأولى الحالية. وقد يصبح ذلك ممكنًا من خلال تنفيذ معظم عمليات العقود خارج السلسلة باستخدام مُسلسِل، مع إجراء التحقق من تلك الإجراءات على السلسلة. وقد أُنشئت نسخة من هذا بالتعاون مع JP Morgan على البلوكشين المؤسسي الخاص بهم. واعتبارًا من NU5، توجد آلية (TZE) لإضافة هذا النوع من الامتدادات إلى Zcash.

**zkEVM**

من شأن هذا أن يجلب قابلية برمجة أصلية إلى Zcash عبر آلة افتراضية متوافقة مع EVM تدعم الحوسبة بإثباتات المعرفة الصفرية. وهذا من شأنه أن يتيح لـ Zcash تحقيق النمو من خلال مجتمع مطورين أكثر تنوعًا، وتعزيز منظومة من التطبيقات والرموز التي تحافظ على الخصوصية. كما سيجعلها قابلة للمقارنة مع حلول الخصوصية الأخرى الموجودة حاليًا في الطبقة الثانية.

تقود ECC الأبحاث المستمرة حول Proof-of-Stake وبروتوكول Cosmos Interblockchain Communication. ويجري تقييم الخطوات التالية بالتوازي مع نجاح انتقال Ethereum إلى PoS وأي مشكلات قد تنشأ.

**ZSA/UDA's**

يجري تطوير Zcash Shielded Assets / User Defined Assets بمساعدة فريق مخصص. وبعد ترقية بروتوكول NU5 أصبحت هذه الأصول أقرب بكثير إلى التحقق الفعلي. وتعمل حاليًا آليات للربط عبر السلاسل لهذه الأصول بصورة خاصة ومن دون حاجة إلى الثقة، بما يتيح قابلية التشغيل البيني. ويوجد أدناه رابط إلى عرض Zcon3 التقديمي حول هذا الموضوع.


### الموارد:

[عمليات نقل خاصة عبر السلاسل في Zcon3](https://youtu.be/vCvMk2-CJN8)

[عرض QEDIT حول Defi في Zcon3](https://youtu.be/EGjcYhovty0) / [لوحة الرسم](https://miro.com/app/board/uXjVOhuveHo=/)

[Ian Miers حول ZSA's والعملات المستقرة](https://www.youtube.com/watch?v=hJMWE3zLIcs)

[أبحاث Proof-of-Stake](https://electriccoin.co/blog/proof-of-stake-research-overview-1/)

__

الميزة الحاسمة التي تتمتع بها Zcash مقارنةً بمنصات العقود الذكية الأخرى الموجودة حاليًا هي أنها طبقة أولى خاصة أصلًا. وهذا يزيل تمامًا أي احتمال لتسرب المعلومات أثناء استخدام أي تطبيقات من الطبقة الثانية. مما يتيح طبقة تطبيقات أبسط وأكثر أمانًا على نحو جوهري، ويمكنها منح إذن الوصول إلى المعلومات بسهولة أكبر بكثير.
