# 🐳 React v18.0.0

날짜 : 2022.03.29

❗ 다음은 모든 새로운 기능(new features), API, deprecations, 주요 변경사항(breaking changes) 목록.<br/>자세한 내용은 [React 18 릴리스 게시물](https://reactjs.org/blog/2022/03/29/react-v18.html)과  [React Upgrade Guide](https://reactjs.org/blog/2022/03/29/react-v18.html)를 읽어보세요.

# 🐳 New Features

## 🌏 React

- `useId`는 클라이언트와 서버 모두에서 고유한 ID를 생성하는 동시에 hydration불일치를 방지하기 위한 새로운 hook.<br/>고유한 ID가 필요한 접근성 API와 통합되는 컴포넌트 라이브러리에 주로 유용함. React17이하에 이미 존재하는 문제를 해결하지만, 새로운 스트리밍 서버 렌더러가 HTML을 잘못된 순서로 전달되는 방식 때문에 React18에서는 더욱 중요.
- `startTransition`및 `useTransition`을 사용하면 일부 상태 업데이트를 긴급하지 않은 것으로 표시할 수 있습니다.<br/>기타 상태 업데이트는 기본적으로 긴급 업데이트로 간주됩니다. React는 긴급하지 않은 상태 업데이트 (ex-검색 결과 목록 렌더링)를 중단하기 위해 긴급 상태 업데이트 (ex - 텍스트 입력 업데이트)를 허용함.
- `useDeferredValue`를 사용하면 트리에서 긴급하지 않은 부분의 re-rendering을 연기할 수 있습니다. 디바운싱과 유사하지만 이에 비해 몇가지 장점이 있습니다.<br/>고정된 시간 지연이 없으므로 React는 첫 번째 렌더링이 화면에 반영된 직후 지연된 렌더링을 시도합니다. 지연된 렌더링은 중단 가능하며 사용자 입력을 차단하지 않습니다.
- `useSyncExternalStore`는 저장소에 대한 업데이트를 동기식으로 강제하여 외부 저장소가 동시 읽기를 지원할 수 있도록 하는 새로운 hook입니다. 외부 데이터 소스에 대한 구독을 구현할 때 `useEffect`가 필요하지 않으며 React외부 상태와 통합되는 모든 라이브러리에 권장됩니다.
- `useInsertionEffect`는 CSS-in-JS라이브러리가 렌더링에 스타일을 삽입하는 성능 문제를 해결할 수 있게 해주는 새로운 hook이다. CSS-in-JS라이브러리를 이미 구축하지 않은 이상 이 라이브러리를 사용하지 않을 것으로 예상됨.<br/>이 hook은 DOM이 변경된 후에 실행되지만 레이아웃 effect전에 새 레이아웃을 읽습니다. 이는 React 17이하에 이미 존재하는 문제를 해결하지만, Reat가 동시 렌더링 중에 브라우저에 양보하여 레이아웃을 다시 계산할 수 있는 기회를 제공하기 때문에 React18에서 더욱 중요함.

## 🌏 React DOM Client

이제 새로운 API는 `react-dom/client`에서 내보내집니다.

- `createRoot`: `render`또는 `unmount`를 위해 루트를 생성하는 새로운 방법. `ReactDOM.render`대신 사용. React18이 있어야 동작함.
- `hydrateRoot`: 서버 렌더링 애플리케이션을 hydrate하는 새로운 방법.<br/>새로운 React DOM Server API와 함께 `ReactDOM.hydrate`대신 이를 사용. React18이 있어야만 동작함.

React가 렌더링 중 오류를 복구하거나 로깅을 위해 hydration할 때 알림을 받으려는 경우 `createRoot` 및 `hydrateRoot`모두 `onRecoverableError`라는 새 옵션을 허용함. 기본적으로 React는 이전 브라우저에서  [`reportError`](https://developer.mozilla.org/en-US/docs/Web/API/reportError)또는 `console.error`를 사용함.

## 🌏 React DOM Server

이 새로운 API는 이제 `react-dom/server`에서 내보내지며 서버에서 Suspense 스트리밍을 완벽하게 지원함.

- `renderToPipeableStream`: Node환경에서의 스트리밍용
- `renderToReadableStream`: Deno 및 Cloudflare작업자와 같은 최신 edge 런타임 환경에 적합

기존 `renderToString`메서드는 계속 작동하지만 권장되지 않음.

<br/><br/>

# 🐳 Deprecations

## 🌏 react-dom

* `ReactDOM.render`, `ReactDOM.hydrate` : 더 이상 사용되지 않음. React 17부터는 경고가 표시됨.
* `ReactDOM.unmountComponentAtNode`, `ReactDOM.renderSubtreeIntoContainer` : 더 이상 사용되지 않음.

## 🌏 react-dom/server

* `ReactDOMServer.renderToNodeStream` : 더 이상 사용되지 않음.

<br/><br/>

# 🐳 Breaking Changes

## 🌏 React

### 👉 Automatic batching

더 많은 일괄 처리를 자동으로 수행하기 위해 React 일괄 업데이트 방식이 변경되는 성능 개선 사항이 도입됨.
자세한 내용은 해당 링크 참조 [더 적은 수의 렌더링에 대한 자동 배치](https://github.com/reactwg/react-18/discussions/21)
생략해야 하는 드문 경우에는 상태 업데이트를 `flushSync`로 래핑.

### 👉 Stricter Strict Mode

향후 React는 `unmount들`사이에 컴포넌트의 상태를 유지할 수 있는 기능을 제공할 예정.

**React18**은 `strict mode`에 **새로운 개발 전용 체크를 도입**함.
React는 컴포넌트가 처음 장착될 떄마다 모든 컴포넌트를 자동으로 마운트 해제하고 remount하여 두 번째 마운트에서 이전 상태를 복원한다.

App이 고장나면 기존 상태로 리마운트 할 수 있도록 컴포넌트를 수정할 수 있을 때 까지 strict mode를 제거하는 것을 고려하기.

### 👉 Consistent useEffect Timing

이제 React는 Click 또는 Keydown 이벤트와 같은 개별 사용자 입력 이벤트 중에 업데이트가 트리거된 경우 항상 효과 기능을 **동기식**으로 flush함.
이전에는 동작이 항상 예측 가능하거나 일관되지 않았다.

### 👉 Sttricter hydration errors

누락되거나 추가된 텍스트 콘텐츠로 인한 `hydration`불일치가 이제 경고가 아닌 오류처럼 처리됨.

React는 더 이상 서버 마크업과 일치시키기 위해 클라이언트에 노드를 삽입하거나 삭제하여 개별 노드를 "패치" 하려고 시도하지 않으며 트리에서 가장 가까운 `Suspense`경계까지 클라이언트 렌더링으로 되돌아간다.

이렇게 하면 `Hydration` 트리의 일관성이 보장되고 `Hydration`불일치로 인해 발생할 수 있는 잠재적인 개인정보 보호 및 보안 허점이 방지됨.

### 👉 Suspense trees are always consistent

컴포넌트가 트리에 완전히 추가되기 전에 일시 중지되면, React는 해당 컴포넌트를 불완전한 상태로 트리에 추가하거나 효과를 실행하지 않는다.
❗ 대신 React는 새 트리를 완전히 버리고 비동기 작업이 완료될때 까지 기다린 다음 처음부터 다시 렌더링을 시도.

React는 브라우저를 차단하지 않고 재시도를 동시에 렌더링함.

### 👉 Layout Effects with Susepnse

트리가 다시 일시중지되고, fallback으로 되돌아가면, React는 이제 layout effect를 정리한 다음 boundary내부의 콘텐츠가 다시 표시될 떄 다시 생성함.

이는 Suspense와 함께 사용할 때 컴포넌트 라이브러리가 레이아웃을 올바르게 측정하지 못하게 하는 문제를 해결함.

### 👉 New JS Environment Requirements

이제 React는 `Promise`, `Symbol` 및 `Object.sign`을 포함한 최신 브라우저기능에 의존한다.

최신 브라우저 기능을 제공하지 않거나 호환되지 않는 구현이 있는 IE같은 이전 브라우저 및 장치를 지원하는 경우 번들 애플리케이션에 전역 폴리필을 포함하는 것을 고려할 것!

## 🌏 Scheduler (Experimental)

- 불안정한 `scheduler/tracing` API 삭제

<br/><br/>

# 🐳Notable Changes

## 🌏 React

### 👉 **Components can now render `undefined`**

React는 더 이상 컴포넌트에서 `undefined`을 반환하면  throw시키지 않는다.

이렇게 하면 허용되는 컴포넌트 반환 값이 컴포넌트 트리 중간에 허용되는 값과 일치하게 된다. JSX이전에 return문을 잊어버리는 것과 같은 실수를 방지하려면 linter를 사용하는 것이 좋다.

### 👉 **In tests, `act` warnings are now opt-in**

`end-to-end`테스트를 실행하는 경우, `act`경고는 필요하지 않다.<br/>유용하고 유익한 단위 테스트에만 활성화할 수 있도록 [opt-in](https://github.com/reactwg/react-18/discussions/102)메커니즘을 도입했다.

### 👉 **No warning about `setState` on unmounted components**

이전에는 React가 unmount된 컴포넌트에서 setSTate를 호출할 떄 메모리 누수에 대해 경고했었다.

이 경고는 subscriptions에 추가되었지만, 사람들은 주로 설정 상태가 양호하고 해결방법이 코드를 악화되는 시나리오에서 이  경고를 경험한다. => 이 경고는 제거되었다.

### 👉 **No suppression of console logs**

Strict 모드를 사용하면, React는 예상치 못한 부작용을 찾는데 도움이 되도록 각 컴포넌트를 두 번 렌더링함.

React 17에서는 로그를 더 쉽게 읽을 수 있도록 두 렌더링 중 하나에 대한 console.log를 억제했었다. 

이것이 혼란스럽다는 [커뮤니티의 피드백](https://github.com/facebook/react/issues/21783)에 따라 막았던 기능을 제거했다.

대신, React DevTools가 설치되어 있는 경우 두번째 로그의 렌더링이 회색으로 표시되며 이를 완전히 억제할 수 있는 옵션이 있다. (default는 꺼져있음)

### 👉 **Improved memory usage**

이제 React는 unmount시에 더 많은 내부 필드를 정리하여 애플리케이션 코드에 존재할 수 있는 정해지지 않은 메모리 누수로 인한 영향을 덜 심각하게 만듬.

## 🌏 React DOM Server

### 👉 rebnderToString

서버를 일시 중단할 때 더 이상 오류가 발생하지 않는다. 대신, `<Suspense>` boundary에 대한 대체 HTML을 내보낸 다음 클라이언트에서 동일한 콘텐츠 렌더링을 다시 시도함.

대신 `renderToPipeableStream`또는 `renderToReadableStream`과 같은 스트리밍 API로 전환하는 것이 좋다.

### 👉 renderToStaticMarkup

서버를 일시 중단할 때 더 이상 오류가 발생하지 않는다. 대신 가장 가까운 <Suspense> boundary에 대한 대체 HTML을 내보낸 다음 클라이언트에서 렌더링을 다시 시도함.
