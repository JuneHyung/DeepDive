# 🐳 React v18.1.0

날짜 : 2022.04.26

## 🌏 React DOM

* Fix
  * UMD번들 사용 시 `react-dom/client`에 대한 false positive warning 수정. ([@alireza-molaee](https://github.com/alireza-molaee) in [#24274](https://github.com/facebook/react/pull/24274))
  * 프로덕션에서도 작동하도록 `suppressHydrationWarning`수정. ([@gaearon](https://github.com/gaearon) in [#24271](https://github.com/facebook/react/pull/24271))
  * Suspense내에서 `comComponentWillUnmount`가 두 번 실행되는 문제를 수정 ([@acdlite](https://github.com/acdlite) in [#24308](https://github.com/facebook/react/pull/24308))
  * 일부 전환 업데이트가 무시되는 문제를 수정. ([@acdlite](https://github.com/acdlite) in [#24353](https://github.com/facebook/react/pull/24353))
  * 메모되지 않은 값이 전달될 때 무한루프를 일으키는 `useEferredValue`수정. ([@acdlite](https://github.com/acdlite) in [#24247](https://github.com/facebook/react/pull/24247))
  * Suspense fallbacks 공개 제한 문제를 해결 ([@sunderls](https://github.com/sunderls) in [#24253](https://github.com/facebook/react/pull/24253))
  * 렌더링 간에 props개체가 동일한지 여부에 대한 불일치를 수정 ([@Andarist](https://github.com/Andarist) and [@acdlite](https://github.com/acdlite) in [#24421](https://github.com/facebook/react/pull/24421))
  * `useEffect`의 `setState` 루프에 대한 누락된 경고를 수정([@gaearon](https://github.com/gaearon) in [#24298](https://github.com/facebook/react/pull/24298))
  * 가짜 hydration error 수정 ([@gnoff](https://github.com/gnoff) in [#24404](https://github.com/facebook/react/pull/24404))

* `useInsertionEffect`에서 `setState`를 호출할 때 경고 ([@gaearon](https://github.com/gaearon) in [#24295](https://github.com/facebook/react/pull/24295))
* hydration오류의 원인이 항상 표시되는지 확인 ([@gaearon](https://github.com/gaearon) in [#24276](https://github.com/facebook/react/pull/24276))

## 🌏 React DOM Server

* `bootstrapScriptContent` contents의 escape문제를 수정. ([@gnoff](https://github.com/gnoff) in [#24385](https://github.com/facebook/react/pull/24385))
* `renderToPipeableStream`의 성능이 크게 향상됨 ([@gnoff](https://github.com/gnoff) in [#24291](https://github.com/facebook/react/pull/24291))

## 🌏ESLint Plugin: React Hooks

* 다수의 분기로 인한 false positive error들을 수정 ([@scyron6](https://github.com/scyron6) in [#24287](https://github.com/facebook/react/pull/24287))
* 변수를 재할당할 때 알려진 종속성을 안정적인지 고려하지 마시오. ([@afzalsayed96](https://github.com/afzalsayed96) in [#24343](https://github.com/facebook/react/pull/24343))

## 🌏 Use Subscription

* Replace the implementation with the `use-sync-external-store` shim. ([@gaearon](https://github.com/gaearon) in [#24289](https://github.com/facebook/react/pull/24289))

> sh8im
>
> 일반적으로 문제를 해결하는 새 API를 추가하여, 이미 존재하는 코드의 동작을 바로잡는데 사용되는 코드 모음.<br/>기본 브라우저에서 지원되지 않는 새로운 API를 구현하는 폴리필과 다름