# 🐳 DeepLink 란?

웹에서 **딥링크(DeepLink)**는 웹사이트 홈페이지가 아니라 웹사이트의 특정 웹 콘텐츠로 연결되는 하이퍼링크를 사용하는 것을 의미함.

**사용자를 특정 앱으로 이동시켜서 원하는 화면을 보여주거나 사용자 액션을 유도**한다.<br/>(예를들어 결제 시 토스페이를 선택하면, 토스 앱의 결제 페이지로 이동하는 경우.)

<br/><br/>

## 🌏 딥링크 유형

### 👉 커스텀 스킴(Custom Scheme)

커스텀 스킴은 가장 오래되고, 너릴 사용되는 딥링크 유형이다. (앱 링크, URI 스킴으로도 불린다.)

```
{SCHEME}:// {HOST}/{PATH1}/{PATH2}?{PARAM1}=1&{PARAM2}=2
```

`앱 스킴`, `호스트`, `패스(Path)`, `파라미터`로 구성되어 있다.

* 앱 스킴 : 이동하고 싶은 앱을 특정
* 패스 : 앱에서 들어가고 싶은 페이지

ex) 토스앱의 스킴은 `supertoss`  → 토스앱의 결제페이지로 이동하는 링크는 `supertoss://toss/pay`가 된다.

#### 🔸 문제점

커스텀 스킴에는 서로 다른 앱에서 같은 스킴을 사용할 수 있다는 문제가 있다.

**앱이 스킴을 등록할 때 이미 있는 스킴인지 아닌지 확인할 수가 없기 때문**<br/>→ 안드로이드의 경우, 같은 싐을 가진 앱이 2개라면 어떤 앱을 열지 선택하는 UI가 뜨지만, iOS는 그렇지 않다.

<br/>

### 👉 App Link와 Universal Link

2015년 iOS에서는 [Universal Link](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/), Android에서는 [App Link](https://developer.android.com/studio/write/app-link-indexing?hl=ko)를 출시함.

이 2가지는 **표준 웹링크 형태**<br/>ex) 웹에서 `www.my-service.com`에 운영되고 있으면, 이 링크를 그대로 앱의 딥링크로 사용하는 것. 폰에 앱이 없으면 폰 브라우저에서 웹페이지가 그대로 열림.

#### 🔸 문제점

사용자의 액션으로만 동작하기 때문에, 스크립트로 클릭을 유발하면 그대로 웹 브라우저에서 링크가 열린다.

→ 그래서 커스텀 스킴URL과 함께 사용된다.

<br/>

### 👉 Intent 스킴

Android에서는 커스텀 스킴, App Link와 사용되는 또다른 딥링크 [Intent 스킴](https://developer.chrome.com/docs/multidevice/android/intents)이 있다. (iOS에서는 오류발생)

```
intent:
    HOST/URI-path // Optional host
    #Intent;
        package=\[string\];
        action=\[string\];
        category=\[string\];
        component=\[string\];
        scheme=\[string\];
    end;
```

앱의 스킴, 패키지 등 많은 정보를 담고 있다. <br/>복잡하지만 개발자 입장에서는 Intent 스킴에서 제공하는 정보를 가공해서 다양한 방식으로 앱을 열 수 있다.

ex) 앱이 설치되지 않았거나 invalid한 상태인 것을 확인하고 앱 패키지 정보로 플레이 스토어를 열 수 있다.

### 👉 정리

| 딥링크 유형    | Android | iOS  | 특징                                                         | 예시                                  |
| -------------- | ------- | ---- | ------------------------------------------------------------ | ------------------------------------- |
| 커스텀 스킴    | O       | O    | 널리 사용되지만 다른 앱에서 같은 스킴을 사용할 수 있음       | `my-app://host/path`                  |
| App Link       | O       | X    | Google에서 출시한 Android 전용 딥링크                        | `https://host/path`                   |
| Universal Link | X       | O    | Apple에서 출시한 iOS 전용 딥링크이며 macOS, watchOS에서도 사용함 | `https://host/path`                   |
| Intent 스킴    | O       | X    | 스킴, 패키지 등 많은 정보를 담고 있음                        | `intent://path#intent;scheme;package` |

<br/><br/>

## 📘 참고

* [위키 - 딥 링크](https://en.wikipedia.org/wiki/Deep_linking)
* [토스 개발자센터 - 딥링크(Deep Link)](https://docs.tosspayments.com/resources/glossary/deep-link)
* [웹뷰(Web View)에서 딥링크 열기](https://docs.tosspayments.com/guides/v2/webview)