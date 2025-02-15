# 🐳 useInfiniteQuery

```tsx
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

**Options**

`useQuery`의 옵션과 동일하며, 아래 옵션들이 추가됨.

- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - 필수 (단, 기본 쿼리 함수가 정의되지 않은 경우에만 필수)
  - 쿼리가 ㅔ이터를 요청하는데 사용할 함수
  - `QueryFunctionContext`를 인자로 받음
  - 데이터를 반환하거나 오류를 발생시키는 Promise를 반환해야함.
- `initialPageParam: TPageParam`
  - **필수**
  - 첫 페이지를 가져올 때 사용할 기본 페이지 매개변수
- `getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null`
  - **필수**
  - 새 데이터를 받을 때 마지막 페이지 및 전체 페이지 배열과 페이지 매개변수 정보를 받음.
  - 반환된 ㄱ밧은 쿼리 함수의 마지막 매개변수로 전달됨.
  - `undefined`또는 `null`을 반환하면 다음 페이지가 없음을 의미함.
- `getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => TPageParam | undefined | null`
  - 새 데이터를 받을 때 첫 번째 페이지 및 전체 페이지 배여로가 페이지 매개변수 정보를 받음
  - 반환된 값은 쿼리 함수의 마지막 매개변수로 전달됨
  - `undefined`또는 `null`을 반환하면 이전 페이지가 없음을 의미
- `maxPages: number | undefined`
  - 저장할 최대 페이지 수를 설정함
  - 최대 페이지 수에 도달하면 새로운 페이지를 가져올 때 첫 번째 또는 마지막 페이지가 제거됨
  - 기본값은 `undefined`
  - `maxPages`값이 0보다 큰 경우, `getNextPageparam`및 `getPreviousPageParam`이 적절히 정의되있어야 함.

**Returns**

반환 속성도 `useQuery`와 동일하지만, 아래 속성이 추가되거나 변경됨.ㅁㅁㅁㅁㅁㅁㅁㅁ

- `data.pages: TData[]`
  - 모든 페이지를 포함하는 배열
- `data.pageParams: unknown[]`
  - 모든 페이지 매개변수를 포함하는 배열
- `isFetchingNextPage: boolean`
  - `fetchNextpage`를 호출하여 다음 페이지를 가져오는 동안 `true`가 됨.
- `isFetchingPreviousPage: boolean`
  - `fetchPreviousPage`를 호출해 이전 페이지를 가져오는 동안 `true`가 됨
- `fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>`
  - 다음 페이지의 결과를 가져오는 함수
  - `options.cancelRefetch`: `true`로 설정하면 `fetchNextPage`를 여러 번 호출해도 이전 요청이 완료되지 않은 경우 기존 요청을 무시하고 새 요청을 수행함. <br/>false로 설정하면 이전 요청이 완료될 때 까지 새 요청을 실행하지 않고, 기본값은 `true`
- `fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<UseInfiniteQueryResult>`
  - 이전 페이지의 결과를 가져오는 함수
  - `options.cancelRefetch`: `fetchNextpage`와 동일한 동작함
- `hasNextPage: boolean`
  - `getNextPageParam`에 의해 다음 페이지가 있을 경우 `true`
- `hasPreviousPage: boolean`
  - `getPreviousPageParam`에 의해 이전 페이지가 있을 경우 `true`
- `isFetchNextPageError: boolean`
  - 다음 페이지를 가져오는 동안 쿼리에 실패하면 `true`
- `isFetchPreviousPageError: boolean`
  - 이전 페이지를 가져오는 동안 쿼리에 실패하면 `true`
- `isRefetching: boolean`
  - 백그라운드에서 다시 가져오는 동안 `true`가 됨.
  - 초기 로딩 및 `fetchNextPage`, `fetchPreviousPage`와는 별개
  - `isFetching && !isPending && !isFetchingNextpage && !isFetchingPreviousPage`와 동일한 동작
- `isRefetchError: boolean`
  - 다시 가져오는 동안 쿼리에 실패하면 `true`
- `promise: Promise<TData>`
  - 쿼리 결과를 반환하는 안정적인 Promise
  - React.use()와 함께 사용할 수 있음.
  - `experimental_prefetchInRender`기능 플래그가 활성화된 경우에만 사용가능

사용자 동작과 관련이 없는 경우, `fetchNextPage`와 같은 함수를 임의로 호출하면 기본적인 refetch동작을 방해할 수 있으며, 오래된 데이터를 불러올 위험이 있음.

이러한 함수를 호출 할 때는 `hasNextPage && !isFetching`같은 조건을 추가하는 것이 좋음
