# 🐳 Query Options

`queryKey`와 `queryFunction`을 여러 곳에서 공유하면서도 가까운 위치에 유지하는 가장 좋은 방법중 하나는 `queryOptions`헬퍼를 사용하는 것이다. 런타임에서는 이 헬퍼가 전달한 값을 그대로 반환하지만, Typescript와 함께 사용할 때 많은 장점이 있다.

`queryOptions`를 사용하면 쿼리의 모든 가능한 옵션을 한 곳에서 정의할 수 있고, 타입추론과 타입 안정성을 모든 옶연에 대해 제공받을 수 있다.

```tsx
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

<br/>

`Infinite Queries`에는 별도의 `infinieQueryOptions`헤렆가 제공된다. 이를 통해 무한스크롤 같은 시나리오에서 여러 페이지의 데이터를 처리할 때 유용하게 사용할 수 있다.

일부 옵션은 컴포넌트 수준에서 오버라이드할 수 있다. 가장 일반적이고 유용한 패턴은 **각 컴포넌트에 맞는 `select`함수를 생성하는 것**이다.<br/>( `select`함수는 쿼리에서 반환된 데이터를 가공하거나 필터링하여 컴포넌트에서 사용할 수 있는 형태로 변환하는데 사용된다. )

```tsx
// Type inference still works, so query.data will be the return type of select instead of queryFn

const query = useQuery({
  ...groupOptions(1),
  select: (data) => data.groupName,
})
```

