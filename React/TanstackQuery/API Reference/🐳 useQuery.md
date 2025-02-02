# 🐳 useQuery

```tsx
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    subscribed,
    throwOnError,
  },
  queryClient,
)
```



## 🌏 Parameter 1 - Options

- `queryKey: unknown[]`
  - ❗ **필수**
  - 이 쿼리에 사용할 쿼리 키
  - 쿼리 키는 안정적인 해시로 변환된다.
  - 키가 변경되면 (`enabled`가 `false`로 설정되지 않은 경우) 쿼리가 자동으로 업데이트 한다.
- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - ❗ **필수,(기본 쿼리 함수가 정의 되지 않은 경우에만 필요.)** See [Default Query Function](https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function) for more information.
  - 쿼리가 데이터를 요청할 때 사용할 함수
  - [QueryFunctionContext](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions#queryfunctioncontext)를 인자로 받음
  - 데이터를 반환하거나 오류를 발생시키는 프로미스를 반환해야 한다. 반한된 데이터는 `undefined`일 수 있다
- `enabled: boolean | (query: Query) => boolean`
  - 이 값을 false로 설정하면 쿼리가 자동으로 실행되지 않음.
  - [Dependent Queries](https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries).에서 사용 가능
- `networkMode: 'online' | 'always' | 'offlineFirst`
  - 선택
  - 기본값은 `online`
  - see [Network Mode](https://tanstack.com/query/latest/docs/framework/react/guides/network-mode) for more information.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean`
  - `false`로 설정하면 실패한 쿼리는 기본적으로 재시도하지 않음.
  - `true`로 설정하면 실패한 쿼리가 무한히 재시도됨.
  - 숫자로 설정하면, 실패한 쿼리가 해당 횟수만큼 재시도됨.
  - 기본값은 클라이언트에서 3, 서버에서 0
- `retryOnMount: boolean`
  - `false`로 설정하면, 쿼리에 오류가 포함된 경우 마운트 시 재시도되지 않음. 기본값은 `true`
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - 이 함수는 `retryAttemp` 정수(재시도 횟수)와 실제 `Error`객체를 인자로 받아 다음 재시도까지 대기할 시간을 밀리초 단위로 변환함.
  - 예를 들어 `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)`함수는 지수 백오프를 적용함
  - `attempt => attempt * 1000 `는 선형 백오프를 적용
- `staleTime: number | ((query: Query) => number)`
  - 선택
  - Default는 0
  - 데이터를 몇 밀리초 후에 **오래된(stale)**것으로 간주할지를 정의. 이 값은 해당 훅에만 적용됨.
  - `Infinity`로 설정하면 데이터가 절대 오래된 것으로 간주되지 않음.
  - 함수로 설정하면, 해당 함수가 쿼리를 인자로 받아 `staleTime`을 계산하여 반환함.
- `gcTime: number | Infinity`
  - 기본값은 `5 * 60 * 1000 (5 minutes)` 이며, SSR시에는 `Infinity`가 기본값
  - 사용되지 않거나 비활성화된 캐시 데이터가 메모리에 남아 있는 시간을 밀리초 단위로 설정함. 
  - 쿼리의 캐시가 비활성화 되면, 해당 시간이 지나면 **가비지 컬렉션(삭제)** 된다. 여러개의 가비지 컬렉션 시간이 지정된 경우, 가장 긴 시간이 적용됨.
  - 참고 : 최대 허용 시간은 약 24일.
  - `Infinity`로 설정하면 **가비지 컬렉션이 비활성** 된다.
- `queryKeyHashFn: (queryKey: QueryKey) => string`
  - 선택
  - 지정된 경우 이 함수는 `queryKey를 문자여롤 해싱하는데 사용됨.
- `refetchInterval: number | false | ((query: Query) => number | false | undefined)`
  - 선택
  - 숫자로 설정하면, 모든 쿼리는 해당 밀리초(ms) 간격으로 지속적으로 다시 가져온다.(**refetch**)
  - 함수로 설정하면, 해당 함수가 쿼리를 인자로 받아 **재요청 주기(frequency)**를 계산하여 반환함.
- `refetchIntervalInBackground: boolean`
  - 선택
  - `true`로 설정하면, `refetchInterval`로 지속적으로 재요청되는 쿼리는 탭/창이 백그라운드에 있어도 계속 재요청된다.
- `refetchOnMount: boolean | "always" | ((query: Query) => boolean | "always")`
  - 선택
  - 기본값은 `true`
  - `true`로 설정하면, 데이터가 오래된 경우 쿼리가 마운트 시 재요청된다.
  - `false`로 설정하면, 마운트 시 쿼리가 재요청되지 않음.
  - `"always"`로 설정하면, 마운트 시 항상 쿼리가 재요청됨.
  - 함수로 설정하면, 해당 함수가 쿼리를 인자로 받아 값을 계산하여 반환함.
- `refetchOnWindowFocus: boolean | "always" | ((query: Query) => boolean | "always")`
  - 선택
  - 기본값은 `true`
  - `true`로 설정하면, 데이터가 오래된 경우 창에 포커스가 갈 때 쿼리가 재요청됨.
  - `false`로 설정하면, 창에 포커스가 갈 때 쿼리가 재요청되지 않음.
  - `"always"`로 설정하면, 창에 포커스가 갈 때 항상 쿼리가 재요청 됨.
  - 함수로 설정하면, 해당 함수가 쿼리를 인자로 받아 값을 계산하여 반환함.
- refetchOnReconnect: boolean | "always" | ((query: Query) => boolean | "always")
  - 선택
  - 기본값은 `true`
  - `true`로 설정하면, 데이터가 오래된 경우 재연결 시 쿼리가 재요청됨
  - `false`로 설정하면, 재연결 시 쿼리가 재요청되지 않음.
  - `"always"`로 설정하면, 재연결 시 항상 쿼리가 재요청됨.
  - 함수로 설정하면, 해당 함수가 쿼리를 인자로 받아 값을 계산하여 반환함.
- `notifyOnChangeProps: string[] | "all" | (() => string[] | "all" | undefined)`
  - 선택
  - 설정하면 나열된 속성 중 하나가 변경될 때만 컴포넌트가 다시 렌더링됨.
  - 예를들어 `['data', 'error']` 로 설정하면, 데이터나 오류 속성이 변경될 때만 컴포넌트가 다시 렌더링됨.
  - `"all"`로 설정하면, 스마트 추적을 제외하고 쿼리가 업데이트될 때마다 컴포넌트가 다시 렌더링됨.
  - 함수로 설정하면, 해당 함수가 실행되어 속성 목록을 계산하여 반환함.
  - 기본적으로 속성에 대한 접근이 추적되며, 추적된 속성 중 하나가 변경될 때만 컴포넌트가 다시 렌더링됨.
- `select: (data: TData) => unknown`
  - 선택
  - 쿼리 함수에서 반환된 데이터의 일부를 변환하거나 선택하는 데 사용할 수 있다.
  - 반환된 데이터 값에만 영향을 미치며, 쿼리 캐시에 저장되는 데이터에는 영향을 미치지 않음.
  - `select`함수는 데이터가 변경되거나 `select`함수 자체의 참조가 변경될 때만 실행됨. 최적화를 위해 함수를 `useCallback`으로 감싸는것이 좋다.
- `initialData: TData | () => TData`
  - 선택
  - 설정하면, 이 값은 쿼리 캐시의 초기 데이터로 사용됨. (단, 쿼리가 아직 생성되거나 캐시되지 않은 경우)
  - 함수로 설정하면 함수는 **한 번** 공유/루트 쿼리 초기화 중에 호출되어 동기적으로 초기 데이터를 반환해야 한다. 초기 데이터는 기본적으로 오래도니 데이터로 간주됨. (staleTime이 설저오디지 않은 경우)
  - `initialData`는 **캐시에 저장**됨
- `initialDataUpdatedAt: number | (() => number | undefined)`
  - 선택
  - 설정하면, 이 값은 초기 데이터가 마지막으로 업데이트된 시간을 밀리초 단위로 나타내는 값으로 사용됨.
- `placeholderData: TData | (previousValue: TData | undefined; previousQuery: Query | undefined,) => TData`
  - 선택
  - 설정하면 이 값은 쿼리가 여전히 대기상태 일때 특정 쿼리 옵저버의 placeholder 데이터로 사용됨.
  - `placeholderData`는 **캐시에 저장되지 않음**.
  - `placeholderData`에 함수가 제공되면, 첫 번쨰 인자로 이전에 감시된 쿼리 데이터가 제공되고, 두 번째 인자로는 전체 이전 쿼리 인스턴스가 제공됨.
- `structuralSharing: boolean | (oldData: unknown | undefined, newData: unknown) => unknown)`
  - 선택 
  - 기본값은 true
  - `false`로 설정하면, 쿼리 결과 간의 구조적 공유가 비활성화됨.
  - 함수로 설정하면 이전 데이터와 새 데이터 값이 해당 함수로 전될되며, 이 함수는 두 데이터를 결합해 쿼리의 해결된 데이터를 반환해야함. 이렇게 하면, 이전 데이터의 참조를 유지하여 성능을 기선할 수 있다. 비직렬화 가능한 값이 포함되있어도 성능에 도움이 된다.
- `subscribed: boolean`
  - 선택
  - 기본값은 true
  - `false`로 설정하면, 이 `useQuery`인스턴스는 캐시에 구독되지 않음. 즉, 쿼리함수(`queryFn`)가 자동으로 실해오디지 않으며, 데이터가 다른 방식으로 캐시에 들어오더라도 업데이트를 받지 않음.
- `throwOnError: undefined | boolean | (error: TError, query: Query) => boolean`
  - 기본값은 전역 쿼리 구성의 `throwOnError`값이며, 이는 `undefined`
  - `true`로 설정하면, 오류가 렌더링 단게에서 발생하고 가장 가까운 오류 경계로 전달됨.
  - `false`로 설정하면, 서스펜스의 기본 동작이 비화성화되어 오류가 오류 경꼐로 전달되지 않음.
  - 함수로 설정하면, 오류와 쿼리가 함수에 전달되며, 이 함수는 오류를 오류경계에 표시할지(참)또는 상태로 반환할지(거짓)을 결정하는 불리언 값을 반환해야함.
- meta: Record<string, unknown>
  - 선택
  - 설정하면, 쿼리 캐시 항목에 필요한 추가 정보를 저장할 수 있다. 이 정보는 쿼리가 사용 가능한 곳에서 접근할 수 잇으며, 쿼리함수(`queryFn`)에 제공되는 `QueryFunctionContext`의 일부로도 사용됨.

<br/><br/>

## 🌏 Parameter2 - QueryClient

- `queryClient?: QueryClient`
  - 이 값을 이용해 **커스텀 QueryClient**를 사용할 수 있다.
  - 사용하지 않으면, 가장 가까운 컨텍스트에서 제공되는 `QueryClient`가 사용됨.

<br/><br/>

## 🌏 Return

- `status: QueryStatus`
  - 쿼리의 상태를 나타냄
    - `pending` : 캐시된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 상태.
    - `error` :  쿼리 시도가 오류를 일으킨 경우, 해당 오류 정보는 `error`속성에서 확인할 수 있음.
    - `success` : 쿼리가 오류 없이 응답을 받고 데이터를 표시할 준비가 된 상태. <br/>이 경우 `data`속성에는 성공적으로 가져온 데이터가 포함됨.
- `isPending: boolean`
- `status`에서 파생된 값으로 상태가 `pending`인 경우 `true`를 반환
- `isSuccess: boolean`
- `status`에서 파생된 값으로 상태가 `success`인 경우 `true`를 반환
- `isError: boolean`
- `status`에서 파생된 값으로 상태가 `error`인 경우 `true`를 반환
- `isLoadingError: boolean`
- 쿼리가 처음으로 데이터를 가져오는 중 오류가 발생한 경우 `true`를 반환
- `isRefetchError: boolean`
- 쿼리가 리패치 중 오류가 발생한 경우 `true`를 반환
- `data: TData`
  - 기본값은 `undefined`
  - 쿼리가 마지막으로 성공적으로 해결된 데이터를 포함함.
- `dataUpdatedAt: number`
- 쿼리가 마지막으로 `success`상태를 반환한 타임스탬프
- `error: null | TError`
  - 기본값은 `null`
  - 쿼리에서 오류가 발생했을 경우, 해당 오류 객체를 포함함.
- `errorUpdatedAt: number`
- 쿼리가 마지막으로 `error`상태를 반환한 타임스탬프
- `isStale: boolean`
- 데이터가 캐시에서 무효화되었거나 `staleTime`보다 오래된 경우 `true`를 반환함.
- `isPlaceholderData: boolean`
- 표시된 데이터가 `placeholderData`인 경우 `true`를 반환함
- `isFetched: boolean`
- 쿼리가 이미 한 번 이상 fetch되었는제 여부를 나타냄
- `isFetchedAfterMount: boolean`
- 컴포넌트가 마운트된 후 쿼리가 fetch되었는지 여부를 나타냄. 이 속성은 이전에 캐시된 데이터를 표시하지 않도록 할 수 있음.
- `fetchStatus: FetchStatus`
  - `fetching`: 쿼리 함수가 실행 중인 상태로, 초기 대기 상태 및 백그라운드 리페치를 포함함.
  - `paused`: 쿼리가 페치하려 했지만 일시 중지된 상태
  - `idle`: 쿼리가 페지 중이 아닌 상태
- `isFetching: boolean`
- `fetchStatus`에서 파생된 값으로 `fetching` 일 때 `true`를 반환.
- `isPaused: boolean`
- `fetchStatus`에서 파생된 값으로 `fetching`일 때 `true`를 반환
- `isRefetching: boolean`
  - 백그라운드 리페치가 진행중인 경우 `true`를 반환함. 초기 대기 상태는 포함되지 않음.
  - `isFetching && !isPending`과 동일
- `isLoading: boolean`
  - 쿼리가 처음 페치되는 중일 때 `true`를 반환함.
  - `isFetching && isPending`와 동일
- `failureCount: number`
  - 쿼리 실패 횟수
  - 실패할 때 마다 증가하고 쿼리가 성공하면 0으로 리셋됨
- `failureReason: null | TError`
  - 쿼리 재시도의 실패 이유.
  - 쿼리가 성공하면 null로 리턴됨
- `errorUpdateCount: number`
- 모든 오류의 합계
- `refetch: (options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`
  - 쿼리를 수동으로 다시 요청하는 함수
  - `throwOnError: true`로 설정하면 오류가 발생할 때 오류를 던짐
  - `cancelRefetch`: 현재 진행중인 요청이 있을 경우 새 요청을 만들기 전에 이를 취소할지 여부를 결정함.
  - 기본값은 `true`
- `promise: Promise<TData>`
  - 쿼리 데이터로 해결되는 안정적인 Promise
  - `experimental_prefetchInRender` 기능 플래그가 활성화되어야 사용할 수 있다.
