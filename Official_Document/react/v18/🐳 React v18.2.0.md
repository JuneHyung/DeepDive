# 🐳 React v18.2.0

날짜 : 2022.06.14

## 🌏 React DOM

* `onRecoverableError`에 대한 두 번쨰 인수로 컴포넌트 스택을 제공 ([@gnoff](https://github.com/gnoff) in [#24591](https://github.com/facebook/react/pull/24591))
* Fix
  * 불일치 시 빈 페이지가 발생하는 `document`에 hydrating 되는 문제를 수정. ([@gnoff](https://github.com/gnoff) in [#24523](https://github.com/facebook/react/pull/24523))
  * Suspense로 잘못된 false positive hydration 오류 수정 ([@gnoff](https://github.com/gnoff) in [#24480](https://github.com/facebook/react/pull/24480) and [@acdlite](https://github.com/acdlite) in [#24532](https://github.com/facebook/react/pull/24532))
  * iframe을 추가할 때 Safari에서 무시되는 `setState`수정. ([@gaearon](https://github.com/gaearon) in [#24459](https://github.com/facebook/react/pull/24459))


## 🌏 React DOM Server

* 서버 오류에 대한 정보를 클라이언트에 전달. ([@salazarm](https://github.com/salazarm) and [@gnoff](https://github.com/gnoff) in [#24551](https://github.com/facebook/react/pull/24551) and [#24591](https://github.com/facebook/react/pull/24591))
* HTML스트림을 중단할 때 이유를 제공하도록 허용 ([@gnoff](https://github.com/gnoff) in [#24680](https://github.com/facebook/react/pull/24680))
* 가능한 경우 HTML에서 불필요한 텍스트 구분 기호를 제거 ([@gnoff](https://github.com/gnoff) in [#24630](https://github.com/facebook/react/pull/24630))
* 브라우저 제약조건과 일치하도록 `<title>`요소 내의 복잡한 하위 항목을 허용하지 않음. ([@gnoff](https://github.com/gnoff) in [#24679](https://github.com/facebook/react/pull/24679))
* `highWaterMark`를 `0`으로 명시적으로 설정하여 일부 작업자 환경에서 버퍼링을 수정 ([@jplhomer](https://github.com/jplhomer) in [#24641](https://github.com/facebook/react/pull/24641))

## 🌏Server Components (Experimental)

* 서버컴포넌트 내에 `useId()`에 대한 지원을 추가 ([@gnoff](https://github.com/gnoff) in [#24172](https://github.com/facebook/react/pull/24172))

