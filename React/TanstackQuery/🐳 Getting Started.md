# 🐳 Getting Started

## 🌏 Overview

**Tanstack Query**( 이전의 React Query )는 웹 애플리케이션에서 **서버 상태를 페칭, 캐싱, 동기화, 업데이트하는 작업을 아주 쉽게 해줌.**

<br/>

## 🌏 Motivation

대부분 프레임워크는 데이터를 가져오거나 업데이트하는 독단적인 방법을 제공 하지 않음. <br/>컴포넌트 기반 State와 side-effect를 조합하거나 상태 관리 라이브러리를 활용해 앱 전체에서 비동기 데이터를 저장하고 제공하고 있음.

대부분 기존 상태 관리 라이브러리들은 Client State에 좋지만, **비동기 또는 Server State**에는 좋지 않음.

`Tanstack Query`는 서버 상태를 관리하기 위한 라이브러리 중 하나이다.

<br/><br/>

## 🌏 Installation

React v18+와 호환되며 ReactDOM 및 React Native와 호환됨.

```shell
npm i @tanstack/react-query
pnpm add @tanstack/react-query
yarn add @tanstack/react-query
bun add @tanstack/react-query
```

<br/>

### 👉 Requirements

```
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
Opera >= 77
```

<br/>

### 👉 Recommendations

```shell
npm i -D @tanstack/react-query
pnpm add -D @tanstack/react-query
yarn add -D @tanstack/react-query
bun add -D @tanstack/react-query
```

<br/>

### 👉 Devtools

```shell
npm i @tanstack/react-query-devtools
pnpm add @tanstack/react-query-devtools
yarn add @tanstack/react-query-devtools
bun add @tanstack/react-query-devtools
```

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

<br/><br/>

## 🌏 Quick Start Example

[Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries) / [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) / [Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)이 3가지 핵심 요소 이다.

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

<br/><br/>

## 🌏 Typescript

Typescript는 **v4.7이상**을 사용!

### 👉 타입추론 예시

```sx
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

```tsx
const { data } = useQuery({
  //      ^? const data: string | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
})
```

```tsx
const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Group[] | undefined
```

<br/>

### 👉 Error Filed

error의 타입은 `Error`이다.

```tsx
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error
```

`Error`가 아닌 다른 타입을 설정할 수는 있지만, 좋지않은 방법이며 useQuery의 다른 모든 제네릭에 대한 유형 추론이 더 이상 작동하지 않는다.<br/>` AxiosError`와 같은 하위 클래스가 있는 경우 유형 축소를 사용하여 오류 필드를 보다 구체적으로 만들 수 있습니다

```tsx
import axios from 'axios'

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error | null

if (axios.isAxiosError(error)) {
  error
  // ^? const error: AxiosError
}
```

<br/>

### 👉 Global Error

Tanstack Query v5부터는 `Register` 인터페이스를 수정해 호출측에서 제네릭을 지정할 필요 없이 모든 것에 대해 전역 오류 유형을 설정할 수 있다. 추론은 계속 작동하지만 오류필드는 지정한 유형이 된다.

```tsx
import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: AxiosError | null
```

<br/>

### 👉 Typing meta

`Global Error`와 유사하게 `Global Meta`타입을 등록할 수 있다.<br/>`queries`및 `mutations`에 대해 optional meta 필드가 일관되게 유지되고, 타입이 안전해 진다. 

```tsx
import '@tanstack/react-query'

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
```

<br/>

### 👉 Typing Query and Mutation keys

`QueryKey`및 `MutationKey`타입을 등록할 수도 있다. 이를 통해 애플리케이션의 계층 구조와 일치하는 Key들에 더 많은 구조를 제공하고 라이브러리의 전체 표면에 키를 입력할 수 있습니다. (?)

등록된 타입은 Array Type을 확장해야 키가 Array로 유지된다.

```tsx
import '@tanstack/react-query'

type QueryKey = ['dashboard' | 'marketing', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
```

<br/>

### 👉 Typing Query Options

`useQuery`안에 쿼리 옵션을 적으면 자동 타입 추론이 이루어 진다. 

`useQuery`와 `prefetchQuery`간에 옵션을 공유하기 위해 쿼리 옵션을 별도의 함수로 추출하여 사용할 수 있다.<br/>❗ 이때, 타입 추론이 되지 않으며, 타입 추론을 하기 위해서 `queryOptions Helper`를 이용하여 해결할 수 있다.

```tsx
import { queryOptions } from '@tanstack/react-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
queryClient.prefetchQuery(groupOptions())
```

또한, `queryOptions`에서 반환된 `querykey`는 해당 `queryFn`과 연결된 정보를 알고 있으며 이를 활용해 `queryClient.getQueryData`같은 함수에서도 해당 타입 정보를 인식할 수 있다.

```tsx
function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

const data = queryClient.getQueryData(groupOptions().queryKey)
//     ^? const data: Group[] | undefined
```

<br/>

`queryOptions`를 사용하지 않으면, 제네릭을 직접 전달하지 않는 한 `data`의 타입은 `unknown`이 된다. 

```tsx
const data = queryClient.getQueryData<Group[]>(['groups'])
```

<br/>

### 👉 Typesafe disabling of queries using skipToken

`Typescript`를 사용하고 있다면, `skipToken`을 사용해 쿼리를 비활성화 할 수 있다.

특정 조건에 따라 쿼리를 비활성화 하면서도, 여전히 타입 안정성을 유지하고 싶을때 사용한다.

📘 [Disabling-queries](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries)

<br/><br/>

## 📘 참고

* [Tanstack Query 공식문서 - Getting Started부분](https://tanstack.com/query/latest/docs/framework/react/overview)

 