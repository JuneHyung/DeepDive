# 🐳 React v16.8.0

날짜 : 2019.02.06

## 🌏 React

* [Hooks](https://legacy.reactjs.org/docs/hooks-intro.html)추가 - class를 작성하지 않고도 상태 및 기타 React기능을 사용하는 방법 ex) useState()
* `useReducer` Hook 지연 초기화 API를 개선

## 🌏 React DOM

* `useState`및 `useReducer` Hooks에 대해 동일한 값으로 렌더링하는 것을 방지
* `useState`및 `useReducer`값을 비교하기 위해 Object.is 알고리즘 사용
* `useEffect` / `useMemo` / `useCallback` Hooks에 전달된 첫 번째 인수를 비교하지 않음
* `React.lazy()`에 전달된 동기식 thenable지원
* 클래스 동작과 일치하도록 엄격모드(DEV전용)에서 hook들이 있는 컴포넌트를 두 번 렌더링함.
* 개발 중인 Hook 순서 불일치에 대해 경고
* Effect clean-up함수는 `undefined` 또는 함수를 리턴해야함. null을 포함한 다른 모든 값은 허용되지 않는다.

> Thenable
>
> then객체를 갖는 객체.<br/>체이닝이나 awiat같은 promise패턴을 가진 구문에서 사용 가능.
>
> 모든 Promise객체는 thenable객체지만 역으로는 성립X

## 🌏 React Test Renderer and Test Utils

* shallow Renderer에서 hook를 지원
* shallow Renderer에 대한 `getDerivedStateFromProps`가 있는 경우 `shouldComponentUpdate`의 잘못된 상태를 수정
* test가 실제 동작과 더밀접하게 일치하도록 일괄 업데이트를 위해 `ReactTestRenderer.act()`및 `ReactTestUtils.act()`를 추가.

## 🌏 ESLint Plugin: React Hooks

* 초기 release
* loop가 발생한 후 report 수정
* throwing이 규칙 위반이라고 여기지 않음.

<br/><br/>

# 🐳 React v16.8.1

날짜 : 2019.02.06

## 🌏 React DOM and React Test Renderer

* 이전 버전의 React와 함께 사용할 때 발생하는 충돌 수정

## 🌏 React Test Utils

* Node환경에서 충돌 수정

<br/><br/>

# 🐳 React v16.8.2

날짜 : 2019.02.14

## 🌏 React DOM

* Fix
  * `useEffect`내에서 `ReactDOM.render`가 무시되는 문제 수정
  * 빈 포털을 unmount할 때 발생하는 충돌문제 수정
  * deps가 지정되지 않은 경우, `useImperativeHandle`이 옮바르게 작동하도록 수정
  * SVG이미지 요소에서 작동하도록 crossOrigin속성을 수정
  * Hooks와 함께 `Suspense`를 사용할 때 잘못된 positive경고를 수정

## 🌏 React TestUtils and React Test Renderer

* `act()`경고에 컴포넌트 스택을 포함함.

<br/><br/>

# 🐳 React v16.8.3

날짜 : 2019.02.21

## 🌏 React DOM

* UMD빌드에서 입력이 잘못 작동하는 버그 수정
* 렌더링 단계 업데이트가 삭제되는 버그 수정

## 🌏 React DOM Server

* 후속 렌더링 중 잘못된 값을 방지하기 위해 스트림이 완료되지 않고 소멸될 때 context 스택을 해제

## 🌏 ESLint Plugin for React Hooks

* 새로운 `exhuastive-deps`권장 규칙 추가.

<br/><br/>

# 🐳 React v16.8.4

날짜 : 2019.03.05

## 🌏 React DOM and other renderers

* `useContext`  hook를 사용한 컴포넌트를 검사할 때 DevTools가 런타임 오류를 일으키는 버그 수정

<br/><br/>

# 🐳 React v16.8.5

날짜 : 2019.03.22

## 🌏 React DOM

* size 속성이 있는 option태그에서 첫 번째 option을 선택한 대로 설정X.
* `useEffect(async()=>...)`의 경고메세지 개선
* React 중복으로 인해 가끔 발생하는 오류 메세지 개선

## 🌏 React DOM Server

* 서버 렌더링 시 `useLayoutEffect`경고 메세지 개선

## 🌏 React Shallow Renderer

* Hooks와 작동하도록 `shallow Renderer`의 `setState`를 수정
* `shallow Renderer`가 `React.memo`를 지원하도록 수정
* `shallow Renderer`가 `forwardRef`내에서 Hooks를 지원하도록 수정.

<br/><br/>

# 🐳 React v16.8.6

날짜 : 2019.03.27

## 🌏 React DOM

* `useReducer()`에서 잘못된 구제 조치( bailout )를 수정
* Safari DevTools에서 iframe 경고 수정
* `contextType`이 `Context `대신 `Context.Consumer`로 설정된 경우 경고.
* `contextType`이 잘못된 값으로 설정된 경우 경고

<br/><br/>
