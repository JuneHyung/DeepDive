# 🐳 React v16.0.0

## 🌏 새로운 JS 환경 요구 사항

* React16은 `Map`, `Set`과 `requestAnimationFrame`에 따라 달라진다. IE11 이하버전의 경우 폴리필 포함 가능
* `window.requestAnimationFrame()`은 애니메이션을 수행하고 싶다고 브라우저에 알리고, 다시 그리기 전에 사용자 제공 콜백 함수를 호출해 브라우저에 요청한다. <br/>일반적으로 디스플레이 새로 고침 빈도와 일치함.

<br/>

## 🌏 새로운 기능

* 이제 Component는 `render`에서 배열과 문자열을 반환할 수 있습니다
* `error boundaries`를 도입해 에러 처리 개선
* `ReactDOM.createPortal()`을 사용해 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링 가능
* 서버측 렌더링을 위한 스트리밍 모드는 `ReactDOMServer.renderToNodeStream()` 및 `ReactDOMServer.renderToStaticNodeStream()`을 통해 활성화.

> error boundaries
>
> 하위 컴포넌트 트리의 어디서나 javascript 오류를 포차갛고, 해당 오류를 기록해 충돌이 발생한 구성 요소 트리 대신 대체 UI를 표시하는 React 컴포넌트

## 🌏 주요 변경사항

* 생명주기 방법의 동작에 몇 가지 변경사항
  * `ReactDOM.render()` 및 `ReactDOM.unstable_renderIntoContainer()`는 이제 생명 주기 메서드 내에서 호출되는 경우 null 리턴
    * `새 portal API`나 `refs`를 사용해 해결.
  * ❗ `setState`에 대한 작은 변경
    * null로 setState를 호출해도 더 이상 업데이트가 트리거되지 않는다. 이를 통해 다시 렌더링 하려는 경우 업데이트 기능에서 결정 가능.
    * 렌더링 시 setState를 직접 호출하면 **항상 업데이트가 발생**함.
    * `setState callback`(두번쨰 파라미터)는 이제 모든 구성 요소가 렌더링 된 후가 아니라 `componentDidMount` / `componentDidUpdate` 직후에 실행됨.
  * ❗ `<A />`를 `<B />`로 바꾸면 이제 `B.componentWillMount`가 항상 `A.componentWillUnmount`보다 먼저 발생.<br/>(어떤 경우는 A.componentWillUnmount가 먼저 실행될 수 있었다.)
  * 이전에 ref를 컴포넌트로 변경하면 해당 구성 요소의 렌더링이 호출되기 전에 항상 ref가 분리되었지만, 이제 나중에 DOM에 변경 사항을 적용할 때 참조를 변경한다.
  * React가 아닌 다른 것으로 수정된 컨테이너로 다시 렌더링 하는 것은 안전하지 않다.<br/>-> 이 경우, 경고 표시됨. [예제 참고 링크](https://github.com/facebook/react/issues/10294#issuecomment-318820987)
  * ❗ `componentDidUpdate`생명 주기는 더 이상 prevContext 매개 변수를 수신하지 않는다.
  * 고유하지 않은 키로 인해 하위 항목이 중복되거나 생략될 수 있다. (이전에 고유하지 않은 키를 ㄹ사용하는 것은 지원되지도, 지원된적 도 없지만 오류였다.)
  * DOM참조를 사용할 수 없기 때문에 `Shallow renderer`는 더 이상 `componentDidUpdate`를 호출 하지 않는다.
  * `Shallow renderer`는 더 이상 `unstable_batchedUpdates()`를 구현하지 않습니다.
* 개발 빌드와 프로덕션 차이점을 강조하기 위해 단일 파일 브라우저 빌드의 이름과 경로가 변경됨.
  * `react/dist/react.js` → `react/umd/react.development.js`
  * `react/dist/react.min.js` → `react/umd/react.production.min.js`
* `Serve Renderer`가 일부 개선되어 완전히 다시 작성됨.
  * 더 이상 마크업 유효성 검사를 사용하지 않고, 대신 기존 DOM에 연결하려고 최선을 다해 불일치에 대해 경고함.
  * 더 이상 각 노드에서 빈 구성요소 및 데이터 반응 속성에 대한 주석을 사용하지 않음.
  * 서버렌더링 HTML을 되살리려면 `ReactDOM.render`대신 `ReactDOM.hydrate`사용. <br/>(클라이언트측 렌더링만 수행하는 경우 `ReactDOM.render`사용)
* DOM컴포넌트에 `unknown`이 전달되면, 유효한 값에 대해 React는 이제 DOM에서 렌더링함.
* 렌더링 및 생명 주기 메서드의 오류들은 기본적으로 컴포넌트 트리를 unmount한다.<br/>이를 방지하기 위해서는 `error boundaries`를 추가.

## 🌏 제거된 지원 중단

* `react-with-addons.js`가 더 이상 빌드 되지 않음.<br/>() 호환되는 모든 addons들은 npm에 게시.)
* core pacakge에서도 소개된 지원중단 내용들이 제거됨.
  * create-react-class -> `React.createClass` 
  * `prop-types` -> `React.PropTypes`
  * `React-dom-factories` -> `React.DOM`
  * `React-dom/test-utils` -> `React-addons-test-utils`
  * `react-test-renderer/shallow.` -> `shallow renderer`

<br/><br/>

# 🐳 React v16.0.1

## 🌏 React Dom Server

*  공격자가 속성이름을 제어할 때 발생할 수 있는 잠재적인 XSS 취약점 수정

