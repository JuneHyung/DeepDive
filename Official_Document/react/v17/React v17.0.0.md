# 🐳 React v17.0.0

날짜 : 2020.10.20

## 🌏 React

* [새로운 JSX 변환](https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154-https-githubcom-babel-babel-pull-11154)을 위해 `react/jsx-runtime`과 `react/jsx-dev-runtime`을 추가.
* native 오류 프레임에서 컴포넌트 스택 빌드 ([issue](https://github.com/facebook/react/pull/18561))
* 향상된 스택을 위해 컨텍스트에서 **displayName을 지정**할 수 있다.
* UMD 번들에서 `use strict`가 누출되는 것을 방지
* 리디렉션에 `fb.me`사용 중지.

## 🌏 React DOM

* document대신에 root에 이벤트를 위임.
* 다른 next effect들의 실행하기 전에 모든 효과를 정리(Clean up).
* `useEffect의 celanup function들`을 **비동기식**으로 실행
* `onFocus`및 `onBlur`를 위해 브라우저의 `focusin`과 `focusout`을 사용.
* 모든 `Caputre`이벤트들이 브라우저의 캡쳐단계를 사용.
* `onScroll`이벤트의 버블링을 emulate 하지 않음.
* `memo` 또는 `forwardRef` component가 정의되지 않은 경우 **undefined를 리턴**.
* 이벤트 풀링 제거
* React Native Web에 필요하지 않은 내부 노출을 중지
* Root 마운트 시 알려진 모든 이벤트 리스너를 연결
* dev모드 이중 렌더링의 2번째 렌더링 패스에서 console을 비활성화함.
* 문서화되지 않고 오해의 소지가 있는 `ReactTestUtils.SimulateNative API`지원 중단
* 내부에 사용되는 비공개 필드 이름을 변경
* 개발 중 User Timing API를 호출 X.
* Strict 모드에서 반복된 렌더링 중 console 비활성화.
* Strict 모드에서 hook가 없는 double-render 컴포넌트도 렌더링 중 콘솔 비활성화.
*  생명주기 메서드 중 `ReactDOM.flushSync`호출을 허용. (하지만 Warn)
* 키보드 이벤트 객체에 `code`속성을 추가.
* `video`요소를 위한 `disableRemotePlayback`속성을 추가.
* `input`요소를 위한 `enterKeyHint`속성을 추가.
* `<Context.Provider>`에 값이 제공되지 않으면, 경고.
* `memo`또는 `forwardRef` 컴포넌트가 undefined를 리턴할 때 경고.
* 잘못된 업데이트들에 대해 오류 메세지를 개선
* 스택 프레임에서 `FowardRef`및 `memo`를 제외.
* 제어된 입력과 제어되지 않은 입력사이의 전환 시 오류메세지 개선.
* `onTouchStart`, `onTouchMove`및 `onWheel`을 수동적으로 유지.
* Fix
  * closed된 `iframe`에서 개발중에 `setState`가 중단되는 문제를 해결
  * `defaultProps`를 사용해 lazy 컴포넌트에 대한 rendering bailout을 수정.
  * `dangerouslySetInnerHTML`이 정의되지 않은 경우 잘못된 positive 경고를 수정
  * 비표준 요구 구현으로 `Test Utils`를 수정
  * 잘못된 `event.type`을 보고하는 `onBeforeInput`수정
  * Firefox에서 정의되지 않은 것으로 보고된 `event.relatedTarget`을 수정
  * IE11에서 `unspecified error`를 수정
  * shadow root에서 렌더링을 수정
  * `capture events`와 함께 `movementX/Y`폴리필을 수정

* `onSubmit`및 `onReset`이벤트에 위임을 사용.
* 메모리 사용량 개선

> rendering bailout
>
> 컴포넌트가 렌더링을 중지하거나 건너뛰는 것을 의미.<br/>React가 성능을 최적화하고 불필요한 렌더링을 방지하기 위한 메커니즘 중 하나로, 이전 렌더링 결과와 현재 렌더링 결과를 비교하여, 변경이 감지되지 않으면, 렌더링을 중지하고 이전에 생성된 VirtualDOM 트리를 재사용하는 것을 말함.

## 🌏 React DOM Server

* 서버 렌더러를 위한 `useMemo`와 일치하는 `useCallback behavior` 를 만듬. 
* 함수 컴포넌트가 throw될 때 상태 누출을 수정.

## 🌏React Test Renderer

* `findByType` 오류메세지 개선

## 🌏 Concurrent Mode (동시모드, Experimental)

* 우선순위 일괄처리 휴리스틱 개선
* 실험적인 API들 앞에 `stable_`접두사를 추가
* `unsatble_discreteUpdates` 및 `unstable_flushDiscreteUpdates`삭제
* `timeoutMs` argument를 제거
* 향후 다른 API를 위해 `<div hidden />`사전 렌더링을 비활성화
* `CPU-bound 트리`의 `Suspense`에 `unstable_expectedLoadTime`을 추가
* 실험적인 `unstable_useOpaqueldentifier` hook을 추가
* 실험적인`unstable_startTransition` API를 추가
* 테스트렌더러에서 `act`를 사요하면 더 이상 `Suspense` fallback이 flush되지 않음.
* CPU Suspense를 위해 `global render timeout`을 사용.
* 마운트 하기전에 기존 root content를 Clear함.
* Fix
  * `error boundaries`에 있는 버그 수정 (["Captured" updates on legacy queue](https://github.com/facebook/react/pull/18265))
  * 일시 중지된 트리에서 업데이트가 삭제되는 버그 수정
  * 렌더링 단계 업데이트가 중단되는 버그 수정
  * SuspenseList에서 버그 수정
  * Suspense fallback이 너무 일찍 표시되도록 하는 버그 수정
  * SuspenseList내부의 class컴포넌트 관련 버그 수정
  * 업데이트가 삭제될 수 있는 input관련 버그 수정
  * Suspense fallback이 멈추는 버그 수정
  * `hydrating`인 경우 SuspenseList의 tail을 자르지 마시오.
  * `getSnapshot`이 변경될 때 발생할 수 있는 `useMutableSource`의 버그 수정
  * `useMutableSource`의 `tearing bug` 수정

* 렌더링 외부에서 커밋전에 `setState`를 호출 시 경고

> tearing bug
>
> 주로 그래픽 처리에 관련된 문제로, 화면의 일부가 다른 부분과 동기화되지 않아 화면에 수평적인 끊김이나 선이 나타나는 문제를 가리키는 용어<br/>
>
> 주로 화면의 리프레시 속도와 그래픽 카드의 출력 속도 차이로 발생
>
> 모니터의 리프레시 속도는 초당 화면이 몇 번 새로 고쳐지는지를 나타내며, 그래픽 카드는 이를 처리하고 화면에 그림을 그립니다. 그러나 그래픽 카드의 출력이나 프레임 속도가 모니터의 리프레시 속도와 일치하지 않으면 tearing 문제가 발생

<br/><br/>

# 🐳 React v17.0.1

날짜 : 2020.10.22

## 🌏 React DOM

*  IE11과 충돌되던 부분 수정. ([issue](https://github.com/facebook/react/pull/20071))
   *  폴리필 없이 IE11에서 지원되지 않는 `Array.fill()`로 인한 문제.


<br/><br/>

# 🐳 React v17.0.2

날짜 : 2021.03.22

## 🌏 React DOM

*  `SharedArrayBuffer` **cross-origin isolation** 경고 해결을 위해 **사용하지 않는 Dependecy삭제**

> Cross-Origin Isolation
>
> 페이지들 사이에서 자원과 데이터를 공유하는 것을 제한하는 기능으로<br/> 웹 애플리케이션의 보안을 강화하고 공격자들이 악용할 수 없도록 하는데 목적
>
> 출처 간 격리된 페이지에서만 사용 가능한 것은, 해당 페이지와 관련된 자원과 데이터만 페이지 안에서 사용 가능하며, 다른 출처에서 온 자원과 데이터는 사용할 수 없도록 하는 것을 의미

> SharedArrayBuffer
>
> SharedArrayBuffer객체는 제네릭, 고정된 길이의 원시 바이너리 데이터 버퍼를 표현하는데 사용된다.<br/>ArrayBuffer객체와 유사하지만, 공유된 메모리상의 뷰를 생성하는데 사용될 수 있고, 분리될 수 없다.
>
>  여러 개의 워커에서 공유하는 메모리 공간을 제공한다. 이를 사용하면 다중 코어 프로세서를 활용하는 멀티 스레딩 프로그램을 구현할 수 있습니다.

### 참고

* [Velog - SharedArrayBuffer](https://velog.io/@tnrud4685/에러노트CORS-오류-해결2...feat.-SharedArrayBuffer)

<br/><br/>
