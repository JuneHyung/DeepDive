# 🐳 React v16.6.0

날짜 : 2018.10.23

## 🌏 React

* 함수용 `PureCompnoent`대신 `React.memo()`를 추가
* 코드 스플리팅 컴포넌트들을 위해 `React.lazy()`추가
* `React.StrictMode` 는 이제 legacy context API에 대해 경고함.
* `React.StrictMode` 는 이제 `findDOMNode`에 대해 경고함.
* `unstable_AsyncMode`를 `unstable_ConcurrentMode`로 Rename
* `unstable_Placeholder `를 `Suspense`로 Rename. <br/>그리고 `delayMs`를 `maxDuration`으로 Rename

## 🌏 React DOM

* class에서 context를 구독하는 보다 ergonomic한 방법으로 `contextType`을 추가.
  
* 향후 비동기 server-side renderer에서 오류를 포착하기 위한 `getDerivedStateFromError` 생명주기 메서드를 추가
  
* `<Context.Consumer>`대신 `<Context>`사용시 경고
  
* iOS Safari에서 회색 overlay를 수정
  
* development에서 `window.event`를 덮어쓰면서 발생하는 버그를 수정
  

## 🌏 React DOM Server

* `React.memo()`에 대한 지원을 추가
* `contextType`에대한 지원을 추가

## 🌏 Schedule (Experimental)

* `scheduler`로 패키지이름 재명명
* priority levels, continuations, wrapped callbacks 지원
* DOM이 아닌 환경에서 fallback메커니즘 개선
* requestAnimationFrame을 더 빨리 Schedule함.
* DOM감지를 더욱 철저하게 수정
* 상호작용 추적으로 버그 수정
* 패키지에 `envify` 변환을 추가

<br/><br/>

# 🐳 React v16.6.1

날짜 : 2018.11.06

## 🌏 React DOM

* Promise가 해결될때 마다 Fallback을 다시 마운트 하지 않음.
* 모든 항목의 로드가 완료된 후에도 `Suspense`가 계속 fallback을 보여주는 버그 수정
* IE11에서 `Suspense`로드가 완료됐을 떄 충돌 문제를 수정
* lazy컴포넌트의 라이프사이클 메서드들에서 해결되지않는 기본 props문제를 수정
* 완료단계에서 발생한 오류를 복구할 때 발생하는 버그 수정

## 🌏 Schedule (Expermimental)

* `deatline object`에서`shouldYield`API로 전환

<br/><br/>

# 🐳 React v16.6.2

날짜 : 2018.11.12

* 이 릴리스는 손상된 상태로 게시되었으므로 skip함.

<br/><br/>

# 🐳 React v16.6.3

날짜 : 2018.11.12

## 🌏 React DOM

* `Suspense`와 `lazy`에서 버그를 수정
* `React DevTools`에서 `React.memo`업데이트 강조 표시를 수정
* `Suspense`와 `React Profiler`상호작용 수정
* `Suspense`를 사용할 때 잘못된 psoitive 경고 수정

## 🌏React DOM Server

* `renderToNodeStream()`호출 사이의 `context state`의 잘못된 상태공유를 수정
* context API의 잘못된 사용에 대한 경고 추가
