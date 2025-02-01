# 🐳 Query Keys

핵심적으로 TanStack Query는 Query Key를 기반으로 쿼리 캐싱을 관리한다.

**Query Key**는 최상위 수준의 **배열**이어야 한다. 그에 따라 단순할수도 복잡할 수도 있지만, 직렬화 가능하고 쿼리 데이터에 고유하다면 이를 사용할 수 있다.

## 🌏 Simple Query Keys

가장 간단한 형태는 상수값이 포함된 배열이다.<br/>( 일반적인 목록이나 Index 리소스 또는 비계층적 리소스에 유용 )

```tsx
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

<br/><br/>

## 🌏 Array Keys with variables

쿼리에 해당 데이터를 고유하게 설명하기 위해 추가 정보가 필요한 경우 **문자열과 직렬화 가능한 object가 포함된 배열**을 사용하여 이를 설명할 수 있다.

* **계층적 또는 중첩된 리소스 항목**
  * 아이템을 고유하게 식별하기 위해 ID, Index 또는 다른 원시값을 전달하는 것이 일반적
* **추가 매개변수가 있는 쿼리**
  * 추가 옵션이 포함된 객체를 전달하는 것이 일반적

```tsx
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

<br/><br/>

## 🌏 Query keys are hashed deterministically!

즉, 객체의 키 순서에 관계없이 다음 쿼리는 동일한 것으로 간주된다.

```tsx
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

그러나 다음 쿼리키는 동일하지 않다! 배열 항목 순서가 중요하다.

```tsx
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

<br/><br/>

## 🌏 쿼리 함수가 변수에 의존하는 경우 해당 변수를 쿼리 키에 포함해라.

쿼리 키는 데이터를 고유하게 설명하므로 쿼리 함수에서 사용하는 변수가 변경될 때 이를 포함해야 한다.

```tsx
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

쿼리 키는 쿼리 기능에 대한 종속성으로 작용한다. 쿼리 키에 종속 변수를 추가하면 쿼리가 독립적으로 캐시되고 변수가 변경될 때마다 쿼리가 자동으로 다시 가져온다. (staleTime설정에 따라 다르다.)

예를 들어, 쿼리 키에 의존 변수를 추가하여 쿼리가 올바르게 리프레시되도록 할 수 있다.