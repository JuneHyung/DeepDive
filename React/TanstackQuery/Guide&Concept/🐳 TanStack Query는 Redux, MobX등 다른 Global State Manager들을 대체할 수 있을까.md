# 🐳 TanStack Query는 Redux, MobX등 다른 Global State Manager들을 대체할 수 있을까

* `Tanstack Query`는 **server-state** 라이브러리로, 서버와 클라이언트 간의 비동기 작업 관리를 담당
* `Redux`, `MobX`, `Zustand`등은 **client-state**라이브러리로, 비동기 데이터를 저장하는 데 사용할 수 있지만 `Tanstack Query`와 비교하면 비효율적이다.

이러한 점을 염두에 두고, 간단히 말하자면 Tanstack Query는 client-state에서 캐시 데이터를 관리하는 데 사용되는 보일러플레이트 코드와 관련된 작업을 대체하며, 몇 줄의 코드로 이를 처리할 수 있게 해준다.

대부분 애플리케이션에서 비동기 코드를 TanStack Query로 마이그레이션한 후 남는 글로벌 접근이 가능한 client-state는 거의 없다.

하지만, 시각적 디자인 도구나 음악 제작 애플리케이션 같이 애플리케이션에 동기 클라이언트 전용 상태가 엄청나게 많을 수 있는 상황에서는 여전히 client-state manager가 필요할 수 있다.

❗ 이 경우에는 `Tanstack Query`는 local/client state 관리의 대체제가 아니라는 점을 염두에 두어야 한다.<br/>그렇지만 `Tanstack Query`는 대부분의 client-state manager와 같이 사용해도 문제가 없다.

> **보일러플레이트 코드**
>
> **여러 가지 상황에서 거의 또는 전혀 변경하지 않고 재사용할 수 있는 코드**

<br/><br/>

## 🌏 Contrived Example

```tsx
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

위와 같은 global state가 있다고 했을 때, 현재는 `projects`, `teams`, `tasks`, `users` 4가지 state가 캐싱되고 있다. 이를 `Tanstack Query`로 이동시킨다면 남는 global state는 아래와 같다.

```tsx
const globalState = {
  themeMode,
  sidebarStatus,
}
```

<br/>

`useQuery`와 `useMutation`훅 호출 몇번으로 server-state를 관리하는 데 사용되었던 모든 **보일러플레이트 코드(Connectors, Action Creators, Middlewares, Reducers, Loading/Error/Result state, Contexts)**를 제거 할 수 있다는 뜻이다.

이것들을 제거한 후에 작은 globalState를 관리하기 위해 client-state manager를 계속 사용하는 것이 가치있을까? 라는 생각이 들 수 있는데 그것은 사용자 선택에 따라 달렸다.

하지만 `Tanstack Query`의 역할은 명확하다.<br/>비동기 처리와 보일러플레이트를 애플리케이션에서 제거하고 몇줄의 코드로 대채하는 것이다.

<br/><br/>

## 📘 참고

* [Tanstack Query 공식문서 - Does TanStack Query replace Redux, MobX or other global state managers?](https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state)

 