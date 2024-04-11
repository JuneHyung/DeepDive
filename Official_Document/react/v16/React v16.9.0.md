# 🐳 React v16.9.0

날짜 : 2019.08.08

## 🌏 React

* 프로그래밍 방식으로 성능 측정값을 수집하기 위한 `<React.Profiler>` API 추가
* `unstable_createRoot`대신 `unstable_ConcurrentMode`를 제거

## 🌏 React DOM

* `UNSAFE_*` 생명주기 메서드의 이전 이름 지원 중단
* `javascript: `URL들을 일반적인 공격 표면으로 사용하지 않음
* 일반적이지 않은 "모듈 패턴"(factory) 컴포넌트를 더 이상 사용하지 않음.
* Add
  * `<video>`에 `disablePictureInPicture` 속성에 대한 지원 추가
  * `<embed>`에 대한 onLoad 이벤트 지원을 추가
  * DevTools에서 `useState`상태 편집에 대한 지원을 추가
  * DevTools에서 `Suspense`를 전환하기 위한 지원을 추가

* `useEffect`에서 `setState`가 호출되면 경고하여 루프를 생성
* Fix
  * 메모리 누수 수정
  * `<Suspense>`로 래핑된 구성 요소에 대한 `findDOMNode`내부 충돌을 수정
  * pending effect가 너무 늦게 플러시되는 문제를 수정
  * 경고 메세지에서 잘못된 인수 순서를 수정
  * `!important`스타일이 있을 때 `Suspense`fallback 노드를 숨기는 문제를 수정

* `hydration performance`를 약간 향상.

## 🌏 React DOM Server

* 카멜케이스 사용자정의 CSS속성 이름에 대한 잚솟된 출력을 수정

## 🌏 React Test Utilities and Test Renderer

* 비동기 상태 업데이트 테스트를 위해 `act(async()=>...)`추가
* 다양한 렌더러의 중첩작업에 대한 지원 추가
* 효과가 `act()`호출 외부에서 예약된 경우 Strict Mode에서 경고함.
* 잘못된 렌더러부터 act를 사용할떄 경고

## 🌏 ESLint Plugin: React Hooks

* 최상위 수준에서 Hook호출을 위반으로 Report



<br/><br/>
