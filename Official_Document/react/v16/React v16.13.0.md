# 🐳 React v16.13.0

날짜 : 2020.02.26

## 🌏 React 

* 문자열 참조가 향후 codemod에 적합하지 않은 방식으로 사용될 때 경고.
* `React.createFactory` 지원 중단

## 🌏 React DOM

* style변경으로 인해 예상치 못한 충돌이 발생할 수 있는 경우 경고.
* 다른 컴포넌트의 렌더링 단계 중에 함수형 컴포넌트가 업데이트되면 경고
* `unstable_createPortal` 지원 중단
* 비활성화된 버튼에서 `onMouseEnter`가 실행되는 문제 수정
* `StrictMode`에서 개발할 때 `shouldComponentupdate`를 두 번 호출함.
* `ReactDOM`에 버전 속성 추가
* `dangerouslySetInnerHTML`의 `toString()`을 호출하지 않음
* 추가 경고에 컴포넌트 스택 표시

## 🌏 Concurrent Mode (Experimental)

* `ReactDOM.createRoot()`의 문제 있는 사용에 대해 경고
* `ReactDOM.createRoot()` 콜백 매개변수를 제거하고 사용에 대한 경고를 추가함.
* Idle/Offscreen 작업을 다른 작업과 그룹화 하지 않음.
* `SuspenseList` CPU bound 휴리스틱 조정
* 누락된 이벤트 플러그인 우선순위 추가
* 입력 이벤트 내부에서 전환할 때만 `isPending`이 true가 되는 문제 수정
* 더 높은 우선순위 업데이트로 인해 중단될 때 업데이트가 삭제되는 `React.memo` 컴포넌트 수정
* 잘못된 우선 순위로 일시중단할 때 경고하지 않음
* rebase update관련 버그 수정

> codemod
>
> 많은 양의 코드를 변환하기 위해 사용됨.
>
> 코드를 바꾸기 위해 디자인된 코드의 종류로 코드 변환을 자동화 시키는 도구.

<br/><br/>

# 🐳 React v16.13.1

날짜 : 2020.02.26

## 🌏 React  DOM

* Effect 정리 기능이 실행되지 않는 레거시 모드 Suspense의 버그를 수정.<br/>이는 기술적으로 지원되지 않는 레거시 모드에서 데이터를 가져오기를 위해 Susepnse를 사용하는 사용자에게만 영향을 미침.
* Class render lifecycle내에서 발생하는 컴포넌트 간 업데이트에 대한 경고를 되돌림. <br/>(componentWillReceiveProps, shouldComponentUpdate 등)

<br/><br/>
