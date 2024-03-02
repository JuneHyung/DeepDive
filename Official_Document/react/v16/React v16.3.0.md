# 🐳 React v16.3.0

날짜 : 2018.03.29

## 🌏 React

* 새롭게 공식적으로 지원되는 **context API** 추가
* callback ref들에 대한 인체공학적 대안(ergonomic alternative)으로 새로운 `React.createRef()` API 추가.
* 컴포넌트가 해당 참조를 하위 항목에 전달할 수 있도록 새로운 `React.forwardRef()`API를 추가
* `React.Fragment`를 사용할 떄 IE11에서 잘못된 positive 경고를 수정
* `React.unstable_AsyncComponent`를 `React.unstableAsyncMode`로 교체
* unmount된 컴포넌트에서 `setState()`를 호출할 떄 발생하는 오류 메세지 개선.

## 🌏 React DOM

* legacy 생명주기에 대해 새 `getDerviedStateFromProps()` 생명주기 및 UNSAFE_ alias를 추가.
* 새 `getSnapshotBeforeUpdate()` 생명주기를 추가.
* 비동기 렌더링을 위해 app을 준비하는 데 도움되는 새 `<React.StrictMode>` wrapper를 추가.
* `<link>`태그에 `onLoad`및 `onError`이벤트에 대한 지원을 추가.
* `<script>`태그에 `noModule` 불린 속성에 대한 지원을 추가.
* 더 많은 브라우저에서 onKeyPress의 `Ctrl + Enter`를 올바르게 감지.
* Fix
  * IE 및 Safari의 작은 DOM input 버그 수정
  * SSR 마크업 불일치에 초점을 맞춤 포함 요소를 수정
  * Symbol값을 무시하도록 `value` 및 `defaultValue`를 수정
  * 속성이 제거될 때 정리되지 않는 클래스 컴포넌트들에 대한 참조를 수정
  * 입력을 다른 창으로 렌더링할 때 `IE/Edge`문제 수정
* jsdom이 삭제된 후 컴포넌트가 실행되면, 의미 있는 메시지와 함께 발생
* null값을 갖는 `opera`라는 전역변수가 있는 경우 충돌이 발생하지 않게함.
* 이전 버전의 Opera를 체크하지 않음
* `<option selected>`에 대한 경고 메세지 중복 제거
* invalid callback에 대한 경고 메세지 중복 제거
* `ReactDOM.craetePortal()`대신 `ReactDOM.unstable_createPortal()`을 더 이상 지원하지 않음
* context type에 대한 User Timing entries를 emit하지 않음
* context consumer child가 함수가 아닌 경우, error 메세지를 개선
* 함수형 컴포넌트에 ref를 추가할 때 발생하는 error 메세지를 개선

## 🌏 React DOM Server

* SSR을 사용하여 포털을 렌더링하려고 할 떄 무한루프 방지
* class 컴포넌트에서 `React.Component`를 확장하지 않으면 경고.
* 다양한 컴포넌트의 `this.state`가 뒤섞이는 문제를 수정
* 컴포넌트 타입이 정의되지 않은 경우 더 나은 메세지 제공

## 🌏 React Test Renderer

*  `toTree()`에 있는 framents의 handling 수정
* Shallow Renderer는 상태를 설정하지않은 컴포넌트에 대해 상태를 null로 할당해야 함.
* Shallow Renderer는 `contextTypes`에 따라 레거시 컨텍스트를 필터링 해야함.
* 비동기 렌더링 테스트를 위한 unstable API를 추가.

## 🌏 React Is (New)

* 라이브러리가 다양한 React 노드 타입을 감지하는데 사용할 수 있는 [new package](https://github.com/facebook/react/tree/main/packages/react-is)의 첫 번째 릴리스

## 🌏 React Lifecycles Compat (New)

* 라이브러리 개발자가 여러 버전의 React를 대상으로 하는데 도움을 주는 [new package](https://github.com/reactjs/react-lifecycles-compat)의 첫 번째 릴리스
* 상위 컴포넌트가 input을 검증할 수 있도록 `ReactIs.isValidElementType()`을 추가.

## 🌏 Create Subscription (New)

* 비동기 렌더링을 위해 외부데이터 소스를 안전하게 구독하기 위한 new package의 첫 번째 릴리스

## 🌏 React Reconciler

* 영구 데이터 구조를 사용하는 렌더러를 구축하기 위해 `react-reconciler/perpersist`를 expose
* `finalizeInitialChildren()`에 host context 전달
* host config에서 `useSyncScheduling` 삭제

## 🌏React Call Return (Experimental)

* 업데이트에서 충돌 수정.

<br/><br/>

# 🐳 React v16.3.1

날짜 : 2018.04.16

## 🌏 React

* Fix
  * `Fragment`를 사용할 때 IE11에서 잘못된 positive warning 수정
* Prefix a private API
* constructor에서 `setState()`호출 시 경고 개선

## 🌏 React DOM

* Fix
  * 몇몇 케이스에서 `getDrivedStateFromProps()`가 적용되지 않는 문제 해결 ([#12528](https://github.com/facebook/react/pull/12528))
  * 개발모드에서 성능회귀(performance regression) 수정
  * 개발모드에서 error handling 버그를 수정
* profiling을 위한 user timing API 메세지를 개선

## 🌏  Create Subscription

* React 릴리스들과 동기화되도럭 패키지 버전 설정
* React 16.3버전 이상에 peer 종속성 추가

<br/><br/>

# 🐳 React v16.3.2

날짜 : 2018.04.16

## 🌏 React 

* `React.cloneElement`에서 `null` 또는 `undefined`를 전달할 때 발생하는 오류 메세지 개선

## 🌏 React  DOM

* Fix
  * `<StrictMode>`를 사용 시 개발 중 IE 충돌이 발생하는 문제 수정
  * 새로운 컴포넌트 타입들에 대한 User Timing의 라벨 수정
* 잘못된 컴포넌트 타입 케이스에 대한 경고 개선
* 개발모드의 일반적인 성능 향상
* nesting을 통해 실험적인 `unstable_observedBits`API의 성능을 향상.

> nesting
>
> 컴포넌트를 다른 컴포넌트 내에 중첩시키는 것
>
> 컴포넌트의 재사용성과 유지보수성을 향상시키는 데 도움을 주는 개념. 컴포넌트를 작은 단위로 나누고, 이를 중첩시켜 사용함으로써 코드의 가독성과 구조를 개선.

## 🌏 React  Test Renderer

* UMD Build를 추가

<br/><br/>

# 🐳 React v16.3.3

날짜 : 2018.08.01

## 🌏 React DOM Server

* 공격자가 속성이름을 control할 때 잠재적인 XSS취약점을 수정.
* 
