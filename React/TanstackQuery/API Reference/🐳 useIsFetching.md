# 🐳 useIsFetching

`useIsFetching`은 애플리케이션에서 로딩 중이거나 백그라운드에서 데이터를 가져오는 쿼리의 수를 반환하는 선택적 훅. 이는 전체 애플리케이션의 로딩 인디케이터를 관리하는 데 유용함.

```tsx
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

<br/><br/>

## 🌏 Options

- `filters?: QueryFilters`: [Query Filters](https://tanstack.com/query/latest/docs/framework/react/guides/filters#query-filters)

- `queryClient?: QueryClient`
- 사용자 정의 `QueryClient`를 사용하려면 이 욥션을 설정함. 설정하지 않으면 가장 가까운 컨텍스트에서 제공되는 `QueryClient`가 사용됨.

<br/><br/>

## 🌏 Returns

- `isFetching: number`
  - 현재 애플리케이션에서 백그라운드에서 로딩 중이거나 데이터를 가져오는 쿼리의 수를 반환함.
