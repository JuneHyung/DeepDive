# 🐳 Query Functions

**Query Function**은 말 그대로 Promise를 반환하는 어떤 함수도 될 수 있다. 반환된 Promise는 데이터를 해결(resolve)하거나 오류를 발생(throw)시켜야 한다.

```tsx
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

<br/><br/>

## 🌏 Handling and Throwing Errors

**TanStack Query**가 쿼리가 오류가 발생했다고 판단하려면, 쿼리 함수가 **오류를 던지거나 reject된 Promise를 반환**해야한다.

쿼리 함수 내에서 발생한 모든 오류는 쿼리의 `error`상태에 저장된다. 이는 쿼리가 오류를 처리할 수 있게 하며, UI에서 오류 상태를 적절히 표시할 수 있게 한다.

```tsx
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```

<br/><br/>

## 🌏 기본적으로 throw되지 않는 fetch와 다른 clients 사용

`axios`나 `graphql-request`같은 대부분의 유틸리티들은 HTTP 호출이 실패하면 자동으로 오류를 던지지만, `fetch`같은 일부 유틸리티는 기본적으로 오류를 던지지 않는다. → 이 경우 수동으로 던져야 한다.

```tsx
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})
```

<br/><br/>

## 🌏 Query Function Variables

Query Key는 데이터를 고유하게 식별하는 용도만 있는 것이 아니라, **쿼리 함수로 전달되는 `QueryFunctionContext`의 일부로 자동으로 전달**된다. 이는 쿼리 함수가 쿼리 키와 관련된 정보를 쉽게 사용할 수 있게 해주며, 쿼리 함수가 필요할 때 독립적으로 추출할 수 있게 만든다.

```tsx
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

<br/><br/>

## 🌏 QueryFunctionContext

**QueryFunctionContext**는 각 쿼리 함수에 전달되는 object입니다. 다음으로 구성됨:

- `queryKey: QueryKey`: [Query Keys](https://tanstack.com/query/v5/docs/framework/react/guides/query-keys)
- `client: QueryClient`: [QueryClient](https://tanstack.com/query/v5/docs/reference/QueryClient)
- `signal?: AbortSignal`
  - [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 는 TanStack Query에서 제공됨
  - [Query Cancellation](https://tanstack.com/query/v5/docs/framework/react/guides/query-cancellation)에 사용할 수 있음.
- `meta: Record<string, unknown> | undefined`
  - 쿼리에 대한 추가 정보를 입력할 수 있는 선택 필드

또한, [Infinite Queries](https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries) 는 다음 옵션이 전달됨

- `pageParam: TPageParam`
  - 현재 페이지를 가져오는데 사용되는 페이지 매개변수
- `direction: 'forward' | 'backward'`
  - **deprecated**
  - ~~현재 페이지를 가져오는 방향~~
  - ~~현재 페이지 가져오기 방향에 액세스하려면 `getNextPageParam` 및 `getPreviousPageParam`에서 `pageParam`에 방향을 추가하세요.~~

