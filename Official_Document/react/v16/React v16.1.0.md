# 🐳 React v16.1.0

날짜 : 2017.11,09

## 🌏 Bower 릴리스 중단

* 16.1.0부터 Bower 지원 중단
* 이전 릴리스에 대해 Bower를 계속사용하거나 npm 릴리스를 미러링하고, 계속 업데이트되는 unpkg에서 호스팅되는 React UMD 빌드에 Bower Config를 지정할 수 있다.

> Bower
>
> FE 패키지 관리도구다. -> (현재는 yarn이나 vite로 마이그레이션 하라고 추천해준다.)
>
> HTML, CSS, Javascript, 글꼴 또는 이미지 파일까지 포함하는 구성 요소를 관리한다. 필요한 패키지와 해당 종속성의 올바른 버전을 설치하면 된다.

> unpkg
>
> npm에 있는 모든 JS에 대해 CDN을 제공하고자 하는 사이트.

## 🌏 All Packages

* UMD빌드에서 실수로 추가된 전역 변수를 수정.

## 🌏 React

* `React.Children 유틸리티`에서 portal에 대한 지원을 추가.
* Class에서 render 메서드가 있지만, 알려진 기본 클래스를 확장하지 않을 떄 경고.
* 생성자에서 객체를 반환할 때 경고를 개선.

## 🌏 React DOM

* AMP의 custom속성으로 on을 허용
* Fix
  * 잘못된 요소에서 onMouseEnter 및 onMouseLeave가 실행되는 문제 수정
  * 컴포넌트 스택 대신 **경고에 null이 표시되는 문제** 수정
  * 개발모드에서 IE11와 충돌문제 수정
  * tabIndex가 SVG요소에 적용되지 않는 문제 수정
  * IE의 `dangerouslySetInnerHTML`에서 SVG 하위 항목이 정리되지 않는 문제 수정
  * `개행 정규화`로 인한 false positive 텍스트 불일치 경고를 수정
  * 제어되지 않는 `<select>`에서 `defaultValue`를 존중하도록 `form.reset()`을 수정
  * IE11에서 렌더링되지 않는 `<textarea>`의 placeholder 수정
  * shadow root에 대한 crash 렌더링을 수정
  * Fix false positive warning about hydrating mixed case SVG tags.

* `<dialog>`요소에 대한 new unknown tag 경고를 막음.
* 존재하지 않는 `componentDidReceiveProps`메소드를 정의할 때 경고
* 하위 function에 대해 한 번만 경고
* 중첩된 업데이트에 대해 한 번만 경고
* 업데이트에 대한 다른 경고들을 중복 제거함.
* `contentEditable`과 `children`에 대한 경고를 컴포넌트 스택에 추가.
* 이벤트 핸들러에 전달된 boolean에 대한 경고를 개선.
* multiple `select`가 null 값을 얻을 때 경고를 개선
* redirect를 방지하려면 경고메세지에서 링크 이동.
* React DevTools설치 prompt를 표시하지않는 방법 추가.
* 사용않는 코드 삭제

## 🌏 React DOM Server

* 의도적인 client/server 텍스트 불일치에 대한 새로운 `suppressHydration"경고 속성을 추가.
* 컴포넌트가 string을 반환할 때 markup generation 수정
* 잘못된 스타일 값을 전달할 때 발생하는 모호한 오류 메세지 수정
* SSR마크업에 autoFocus속성을 포함.
* 추가 경고에 구성 요소 스택을 포함.

## 🌏 React Test Renderer & Test Utils

* shallow renderer의 `componentWillMount()`에서 여러(multiple) setState()호출을 수정
* shallow renderer에서 `forceUpdate()`이후 `shouldCompoentUpdate()`를 무시하도록 수정
* `forceUpdate()`및 `React.PureComponent`를 올바르게 Handle함.
* production모드에서 실행되도록 `back support`를 추가
* 누락된 `package.json`종속성 추가

## 🌏 React ART

* 누락된 `package.json`종속성 추가
* `react-art/Circle`, `react-art/Rectangle`, `react-art/Wedge`를 expose

## 🌏 React Reconciler (Experimental)

* **custom 렌더러를 생성**하기 위한 새로운 실험 패키지의 첫 릴리즈
* `React DevTools`에 대한 지원 추가

## 🌏 React Call Return (Experimental)

* **parent와 child사이 communication**을 위한 새로운 실험 패키지의 첫 릴리즈

<br/><br/>

# 🐳 React v16.1.1

날짜 : 2017.11.13

## 🌏 React

* 정의되지 않은 컴포넌트 유형에 대한 경고 개선

## 🌏 React DOM

* `capture`속성에 대한 문자열값 지원

## 🌏 React DOM Server

* `ReactDOMServer public API`를 freeze하지 마세요.
* server에서 `autofocus={false}`속성을 emit하지 마세요.

## 🌏 React Reconciler 

* 더 나은 Flow typing(흐름에 따른 타이핑을 말하는거 같음)을 위해 hydration API를 변경.

<br/><br/>

# 🐳 React v16.1.2

날짜 : 2018.08.01

## 🌏 React DOM Server

* 공격자가 속성이름을 control할 때 잠재적인 XSS취약점을 수정.

