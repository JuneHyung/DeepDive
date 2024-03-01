# 🐳 React - 주목할만한 변화

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
