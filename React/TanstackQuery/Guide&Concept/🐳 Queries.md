# 🐳 Queries

## 🌏 Query Basics

쿼리는 unique key에 연결된 비동기 데이터 소스에 대한 선언적 종속성(dependency이다. <br/>서버에서 데이터를 가져오기 위해 **Promise기반 메서드 (GET 및 POST포함)**와 함께 쿼리를 사용할 수 있다. 서버의 데이터를 수정할 때는 `Mutation`을 사용하는 것을 추천한다.

컴포넌트 또는 custom hooks에서 쿼리를 구독하려면 `useQuery`를 호출할 때 다음을 제공해야 한다.

* 쿼리를 위한 unique key
* Promise를 반환하는 함수.
  * 이 함수는 데이터를 반환(resolve)하거나 오류를 발생(throw)해야 한다.

```tsx
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

❗ 제공하는 unique key는 애플리케이션 전체에서 쿼리를 `refetching`, `caching`, `sharing`하는데 내부적으로 사용된다.

`useQuery`에 의해 반환된 쿼리 결과에는 템플릿 작성 및 기타 데이터 사용에 필요한 모든 정보가 포함되어있다.

```tsx
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

<br/>

쿼리 결과 객체에는 **반드시 알아야 하는 중요한 상태(state)**가 포함되있다.

❗ 쿼리는 특정 순간에 다음 상태 중 하나만 가질 수 있다.

* `isPending` 또는 `status ===' pending'` → 쿼리가 아직 데이터를 가져오지 않은 상태
* `isError` 또는 `status === 'error'` → 쿼리 실행 중 오류가 발생한 상태
* `isSuccess`또는 `status === 'success'` → 쿼리가 성공적으로 실행되었으며, 데이터가 사용 가능한 상태

<br/>

❗ 기본 상태 외에도 쿼리 상태에 따라 더 많은 정보를 확인할 수 있다.

* `error` - 쿼리가 `isError`상태인 경우, 오류는 `error`속성을 통해 확인할 수 있다.
* `data` - 쿼리가 `isSuccess`상태인 경우, 데이터는 `data`속성을 통해 확인할 수 있다.
* `isFetching` - 쿼리가 데이터를 가져오는 중일 때 `isFetching`값은 **true**이다.

❗ 대부분 쿼리에서 보통 `isPending`상태를 먼저 확인하고, 그 다음에 `isError`상태를 확인한 후 `isSuccess`상태로 데이터를 렌더링하는 방식으로 진행한다.

```tsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

`bool`말고 `status`를 이용할 수도 있다.

```tsx
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

<br/><br/>

## 🌏 FetchStatus

`status`필드 외에도 다음 옵션을 사용해 추가 `fetchStatus`속성도 얻을 수 있다.

* `fetchStatus === 'fetching'` - 쿼리가 현재 fetching 중이다.
* `fetchStatus === 'paused''` - 쿼리를 가져오려 했지만 일시 중지되었다. (자세한건 네트워크 모드 가이드를 참고)
* `fetchStatus === 'idle'` - 쿼리가 현재 아무 작업도 수행하지 않는다.

<br/><br/>

## 🌏 왜 2개의 다른 상태를 가지는가?

`Background refetch`와 `stale-while-revalidate 로직`때문에 `Status`와 `fetchStatus`에 대한 모든 조합이 가능해 졌기 때문이다.

### 👉 Example

* **성공(`success`)상태인 쿼리**는 일반적으로 `idle`상태의 `fetchStatus`를 가지지만, 배경에서 다시 가져오는 경우 `fetching`일 수 있다.
* **데이터가 없는 상태에서 마운트된 쿼리**는 보통 `pending`상태와 `fetching`상태의 `fetchStatus`를 가지지만, 네트워크 연결이 없으면 `paused`상태일 수 있다.

❗ 따라서 쿼리가 **`pending`상태에 있을 수 있지만 실제로 데이터를 가져오지 않고 있을 수도 있다**는 점을 기억해야 한다.

기본적인 규칙은 아래와 같다.

* `status`는 데이터에 대한 정보를 제공한다. → 데이터를 가지고 있나요? 없나요?
* `fetchStatus`는 `queryFn`에 대한 정보를 제공한다. → 실행 중 인가요? 아닌가요?