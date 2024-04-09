# 🐳 React v16.5.0

날짜 : 2018.09.05

## 🌏 React

* `React.forwardRef`렌더링 함수가 정확히 2개의 인수를 취하지 않는경우 경고 추가.
* 실수로 `createElement`에 요소를 전달할 때 발생하는 오류 메시지 개선
* mutation가 발생할 때 까지 `onRender`프로파일러를 호출하지 않음.?

## 🌏 React DOM

* Add
  * React DevTools Profiler에 대한 지원 추가
  * production환경에서 프로파일링을 위한 `react-dom/profiling` 진입점 alias 추가
  * `auxClick`을 지원하는 브라우저에 `onAuxClick`이벤트 추가
  * 마우스 이벤트에 `movementX`및 `movementY`필드 추가
  * 포인터 이벤트에 `tangentialPressure`과 `twist`필드를 추가

* 선택 이벤트 처리에서 `iframe(중첩된 browsing context)`을 최소한으로 지원
* 포커스 가능한 SVG속성에 부울 전달 지원
* hydrating시 클라이언트에서 `<noscript>` 무시
* Fix
  * 단위 없는 CSS속성으로 처리되도록 `GridArea`를 수정
  * IE11에서 한국어 입력 시 `compositionend`이벤트의 잘못된 데이터 수정
  * `<option>`태그에서 동적 하위 항목을 사용할 때 발생하는 충돌 수정
  * input에서 초기에 설정되지 않은 `checked`속성을 수정
  * `__html`이 문자열이 아닌 경우 `dangerouslySetInnerHTML`의 hydration문제를 수정
  * 잘못된 값에서도 실행되도록 제어된 `onChange`누락에 대한 경고를 수정
  * `submit`과 `reset`버튼에 빈 라벨이 표시되는 문제 수정
  * drag & drop후에 `onSelect`이벤트가 트리거되지 않는 문제 수정
  * iOS의 포털 내부에서 작동하지 않는 onClick이벤트 수정
  * 수천개의 루트가 다시 렌더링될 때의 성능 문제 수정
  * 몇몇 케이스에 따라 `onChange`가 실행되지 않는 성능 회귀를 수정 <br/>(성능회귀는 전에 작동한 기능이 멈추는 버그를 말하는 듯함.)

* 더 많은 극단적인 경우의 오류를 적절히 처리
* development에서 **SyntheticEvent**에 프록시를 사용하지 않음.
* bollean DOM prop의 값이 `"false"`거나 `"true"`인 경우 경고
* `this.state`가 props로 초기화될 때 경고 추가
* 잘못된 경고(noisy false positives)때문에 IE에서 hydration 중 `스타일`을 비교하지 않음.
* compionent stack에 StrictMode를 포함함.
* IE에서 `window.event`를 덮어씌우지 않음
* `folder/index.js`명명규칙을 위한 컴포넌트 스택 개선
* 초기화된 state없이 `getDerivedStateFromProps`를 사용할 때 경고 개선
* 잘못된 textarea사용에 대한 경고 개선
* 유효하지 않은 Symbol과 function값을 보다 일관되게 처리.
* 경고없이 Electron `<webview`태그 허용
* `e.preventDefault()`가 호출된 경우 잡히지 않은 오류 설명을 표시하지 않음.
* rendering Generators에 대해 경고.
* 경고에서 레거시 메서드에 대한 관련없는 제안을 제거
* `schedule`에서 `unstable_scheduleWork`를 위해 `unstable_deferredUpdates`를 제거.
* 업데이트 시간이 너무 오래 걸릴 때 불필요한 작업을 수행하지 못하도록 불안정한 비동기 모드를 수정

> Synthetic Event
>
> 브라우저간 규격차이로 인해 발생하는 **크로스 브라우징 이슈**를 해결하기 위해 제공
>
> `SyntheticEvent`는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 Wrapper 객체
>
> 📘[공식문서 - SyntheticEvent](https://legacy.reactjs.org/docs/events.html)

## 🌏 React DOM Server

* 선택된 `<option>`에서 `dangerouslySetInnerHtml`을 사용할 때 nullish children과 관련된 충돌 수정
* setTimeout이 누락되었을 때 충돌 수정

## 🌏 React Test Renderer and Test Utils

*  shallow renderer가 undefined가 되지 않도록 함수형컴포넌트의 `this`를 수정
   
*  Jset관련 `ReactTestUtils.mockComponent()`helper 지원중단
   
*  test renderer 내 `ReactDOM.createPortal`사용에 대해 경고
   
*  혼란스러운 오류 메세지 개선
   

## 🌏 React Art

* DevTools에 대한 지원 추가

## 🌏 Schedule (Experimental)

* 브라우저 환경에서 협력적으로 작업을 예약하기 위한 새로운 패키지.<br/>React내부적으로 사용되지만 public API는아직 완성되지 않음.

<br/><br/>

# 🐳 React v16.5.1

날짜 : 2018.09.13

## 🌏 React

* `React.forwardRef`가 예상치 못한 개수의 인수를 수신할 때 경고를 개선

## 🌏 React DOM

* `React Native Web`에서 사용되는 불안정한 export의 회귀문제를 수정
* 컴포넌트가 `isReactComponent`라는 메서드를 정의할 때 충돌 해결
* 경고를 보여줄 때 IE9의 development모드에서 발생하는 충돌을 수정
* `schedule/tracking`을 사용하여 `react-dom/profiling`을 실행할 때 더 나은 오류 메시지를 제공
* `ForwardRef`컴포넌트가 displayName을 정의하는 경우 경고 메세지 출력

## 🌏 Schedule (Expermimental)

* `schedule/tracking-profiling`에 별도의 profiling 진입점(entry point)를 추가

<br/><br/>

# 🐳 React v16.5.2

날짜 : 2018.09.18

## 🌏 React

* 최근 `<iframe>`회귀(regression)문제를 해결
* data가 변경되지 ㅇ낳은 경우 `<textarea>`가 더 이상 다시 렌더링되지 않도록 `updateWrapper`를 수정

## 🌏Schedule(Experimental)

* `tracking`APi의 이름을 `tracing`으로 재작명
* UMD production + 프로파일링 진입점 추가 
* 일부 `React-isms`를 제거하고 지연된 업데이트 시간 초과시 성능을 개선하기 위해 `schedule`을 리팩토링.
