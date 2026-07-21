# Zcash Devtool

[Zcash-Devtool이란 무엇인가요?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file)

Zcash Devtool은 Zcash에서 개발을 진행하는 플랫폼입니다. 이 도구는 개발자들이 사용하기 위해 만들어졌으며, 새로운 Zcash 기능의 테스트 및 개발에 사용됩니다. 그러나 이 도구는 생산 환경에서 사용할 수 있는 상태가 아니며, 제공되는 명령줄 API는 언제든지 예고 없이 변경될 수 있습니다. zcash-devtool 내장 지갑을 관리하는 데 중요한 자금을 투입하지 마세요.

### Zcash Devtool 동영상 튜토리얼:
Kris Nuttycombe(@nuttycom)가 ZconVI에서 이 도구를 발표했습니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

이 도구를 사용하는 방법에 대한 단계별 가이드는 [여기](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)에서 확인할 수 있습니다. 이 문서는 zcash devtool 도구의 설정 및 사용 방법을 전체적으로 설명합니다. 이 가이드는 도구를 설정하는 방법과 도구에 자체 기능을 추가하는 방법을 안내하기 위해 제공됩니다.

**보안 경고:**
생산 환경에서 절대 사용하지 마세요!!!
이 앱은 보안을 고려하여 작성되지 않았습니다. 그러나 지문 암호의 암호화와 같은 기능을 포함하고 있어, 개인적인 실험에 사용할 수는 있지만, 이로 인한 손해는 본인 책임입니다.

### 고급 (librustzcash 튜토리얼)

[동영상 보기](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
