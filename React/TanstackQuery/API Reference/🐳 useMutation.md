# 🐳 useMutation

```tsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

**Parameter1 (Options)**

- `mutationFn: (variables: TVariables) => Promise<TData>`
  - **필수이지만, 기본 뮤테이션 함수가 정의되지 않은 경우에만 해당됨.**
  - 비동기 작업을 수행하고 Promise를 반환하는 함수
  - `variables`는 `mutate`가 `mutationFn`에 전달하는 객체
- `gcTime: number | Infinity`
  - 사용되지 않거나 비활성화된 캐시 데이터가 메모리에 유지되는 시간(밀리초 단위) 으로 특정 시간이 지나면 해당 캐시 데이터는 가비지 컬렉션이 된다.<br/>여러개의 캐시 시간이 지정된 경우 가장 긴 시간이 적용된다.
  - `Infinity`로 설정하면 가비지 컬렉션은 비활성화된다.
  - 참고 : 최대 허용 시간은 약 24일
- `mutationKey: unknown[]`
  - 선택 사항
  - `queryClient.setMutationDefaults`에서 설정된 기본값을 상속할 수 있는 키
- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - 선택 사항 
  - default는 `online`
  - see [Network Mode](https://tanstack.com/query/latest/docs/framework/react/guides/network-mode) for more information.
- `onMutate: (variables: TVariables) => Promise<TContext | void> | TContext | void`
  - 선택 사항
  - 뮤테이션 함수 실행 전에 호출되며, `mutationFn`과 동일한 변수를 받음.
  - `Optimistic Update`를 수행할때 유용함
  - 반환된 값은 `onError`또는 `onSettled`에서 롤백할 때 사용할 수 있다.
- `onSuccess: (data: TData, variables: TVariables, context: TContext) => Promise<unknown> | unknown`
  - 선택 사항
  - mutation이 성공하면 실행
  - 프로미스를 반환하면 해당 프로미스가 완료될 때까지 대기함.
- `onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - 선택 사항
  - mutation이 실패했을 때 실행
  - 프로미스를 반환하면 해당 프로미스가 완료될 때까지 대기함.
- `onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - 선택 사항
  - mutation이 성공 또는 실패한 후 실행됨.
  - 프로미스를 반환하면 해당 프로미스가 완료될 때까지 대기함.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean`
  - 기본값은 0
  - `false`면 실패한 뮤테이션을 재시도하지 않음
  - `true`면 무한정 재시도함.
  - 숫자로 설정하면 해당 횟수만큼 재시도함.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - 재시도 전 대기 시간을 설정하는 함수
  - `지수적 백오프 적용` : `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)` 
  - `선형 백오프 적용` : attempt => attempt * 1000`
- `scope: { id: string }`
  - 선택 사항
  - 기본값은 unique ID
  - 동일한 scope id를 가진 뮤테이션은 순차적으로 실행됨.
- `throwOnError: undefined | boolean | (error: TError) => boolean`
  - 기본 값은 글로벌 설정값
  - `true` -> 오류를 렌더링 단계에서 throw하여 가장 가까운 `Error Boundary`로 전달
  - `false` -> Error Boundary를 사용하지 않고 상태로 처리
  - 함수로 설정하면 오류 발생 시 반환값에 따라 처리 방식 결정
- `meta: Record<string, unknown>`
  - 선택 사항
  - 뮤테이션 캐시 항목에 추가 정보를 저장할 수 있음.

**Parameter2 (QueryClient)**

- `queryClient?: QueryClient`
- 선택 사항
  - 사용자 지정 `QueryClient`를 사용할 때 지정함.
- 지정하지 안흐면 가장 가까운 컨텍스트의 `QueryClient`가 사용됨.

**Returns**

- `mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void`
  - 뮤테이션을 실행하는 함수
  - `variables: TVariables`
    - 선택사항
    - `mutationFn`에 전달할 변수 객체
  - `onSuccess: (data: TData, variables: TVariables, context: TContext) => void`
    - 선택  사항
    - 성공 시 실행
  - `onError: (err: TError, variables: TVariables, context: TContext | undefined) => void`
    - 선택 사항
    - 실패 시 실행
  - `onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void`
    - 선택 사항
    - 성공/실패 여부와 관계없이 실행
  - 여러 번 호출한 경우, `onSuccess`는 **마지막 요청이 완료된 후** 실행됨
- `mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
  - `mutate`와 유사하지만, **프로미스를 반환**하여 `await`사용할 수 있음.
- `status: string`
  - Will be:
    - `idle` : 초기 상태
    - `pending` : 실행 중
    - `error` : 마지막 시도가 실패
    - `success` : 마지막 시도가 성공
- `isIdle`, `isPending`, `isSuccess`, `isError`: status값을 기반으로 한 boolean값
- `isPaused: boolean`
  - mutation이 일시 중지된 경우 `true`
  - see [Network Mode](https://tanstack.com/query/latest/docs/framework/react/guides/network-mode) for more information.
- `data: undefined | unknown`
  - 기본값은 `undefined`
  - 마지막으로 성공한 뮤테이션의 결과 데이터
- `error: null | TError`
  - 오류 발생 시 해당 오류 객체
- `reset: () => void`
  - 내부 상태를 초기화 하는 함수
- `failureCount: number`
  - 뮤테이션이 실패한 횟수
  - 성공 시 0으로 리셋됨
- `failureReason: null | TError`
  - 마지막으로 실패 원인
  - 성공 시 `null`로 리셋
- `submittedAt: number`
  - 기본값은 0
  - 뮤테이션이 실행된 타임스탬프
- `variables: undefined | TVariables`
  - 기본값은 `undefined`
  - `mutationFn`에 전달된 변수 객체
