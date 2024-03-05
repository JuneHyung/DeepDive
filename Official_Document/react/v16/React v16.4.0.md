# 🐳 React v16.4.0

날짜 : 2018.05.23

## 🌏 React

* 새로운 실험적인 `React.unstable_Profiler`컴포넌트를 성능 측정을 위해 추가.

## 🌏 React DOM

* Pointer Event사양에 대한 지원 추가
* 리렌더링하는 이유에 상관 없이 `getDerivedStateFromProps()`를 올바르게 호출
* Fix
  * 경우에 따라 context 전파를 방해하는 버그 수정
  * 더 깊은 `setState()`에서 `forwardRef()`를 사용해 구성요소를 다시 렌더링하는 문제를 수정.
  * `custom element node`에서 일부 속성이 잘못 제거되는 문제를 수정
  * 위에 레거시 context provider가 있는 경우 context provider가 children을 bail out하지 않도록 수정
  * `<StrictMode>`에서 `React-lifecylces-compat`사용 시 잘못된 positive 경고 수정
* context provider 컴포넌트에 `propTypes`를 지정하는 기능 추가
* `ForwadRef()`렌더링 함수에 `propTypes`또는 `defaultProps`가 있는 경우 경고
* `forwardRef()`및 context consumers가 컴포넌트 스택에 표시되는 방식을 개선
* 내부 이벤트 이름을 변경.

## 🌏 React Test Renderer

*  Fix
   *  새로운 React DOM동작과 일치하도록 `getDerivedStateFromProps()`지원을 수정
   *  부모가 fragment거나 또다른 특수한 node인 경우 `testInstance.paret`충돌을 수정

*  test renderer 순회 메서드를 통해 `forwardRef()`컴포넌트들을 검색할 수 있음.
*  shallow renderer는 이제 `nul`l또는` undefined`값을 반환하는 `setState()` 업데이터를 무시.

## 🌏 React Art

* React DOM에서 관리하는 트리에서 제공되는 읽기 컨텍스트를 수정

## 🌏 React Reconciler

* 새로운 호스트 구성 모양은 단순하며 중첩된 개체를 사용하지 않는다.

## 🌏React Call Return (Experimental)

* 이 실험은 번들 크기에 영향을 미치고 API가 충분하지 않아 삭제됨. 추후 다른 형태로 다시 나타날 수도 있음.

<br/><br/>

# 🐳 React v16.4.1

날짜 : 2018.06.13

## 🌏 React

* 이제 `React.ForwardRef`에서 반환된 구성요소에 propTypes 할당 가능.

## 🌏 React DOM

* Fix
  * 입력 유형이 다른 유형에서 text로 변경될 때 발생하는 충돌 수정
  * SVG element에 포커스를 복원할 때 IE11에서 충돌이 발생하는 문제 수정
  * 경우에 따라 range 입력이 업데이트되지 않는 문제 수정
  * Firefox에서 불필요하게 입력 유효성 검사가 실행되는 문제 수정
  * IE9에서 onChange Event에 대한 잘못된 event.target값을 수정.
  * 컴포넌트에서 빈 `<React.Fragment />`를 반환할 때 발생하는 잘못된 positive 오류를 수정.

## 🌏 React DOM Server

* 새로운 컨텍스트 API에서 제공되는 잘못된 값 수정.

## 🌏 React Test Renderer

* 테스트 렌더러 순회 API에서 여러 루트 하위 항목 허용
* pending상태를 삭제하지 않도록 shallow renderer의 `getDerivedStateFromProps()`를 수정

<br/><br/>

# 🐳 React v16.4.2

날짜 : 2018.08.01

## 🌏 React  DOM Server

* 공격자가 속성이름을 제어할 때 발생할 수 있는 XSS취약점을 수정.
* 속성이 `hasownProperty`라 불릴 때 서버렌더러의 충돌을 수정. (이 수정사항은 React-dom@16.4.2에서만 사용가능)
