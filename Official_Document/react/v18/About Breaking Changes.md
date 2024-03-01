# 🐳 React - 주요 변경 사항

## 🌏 React

### 👉 Automatic batching

더 많은 일괄 처리를 자동으로 수행하기 위해 React 일괄 업데이트 방식이 변경되는 성능 개선 사항이 도입됨.<br/>자세한 내용은 해당 링크 참조 [더 적은 수의 렌더링에 대한 자동 배치](https://github.com/reactwg/react-18/discussions/21)<br/>생략해야 하는 드문 경우에는 상태 업데이트를 `flushSync`로 래핑.

### 👉 Stricter Strict Mode

향후 React는 `unmount들`사이에 컴포넌트의 상태를 유지할 수 있는 기능을 제공할 예정.

**React18**은 `strict mode`에 **새로운 개발 전용 체크를 도입**함.<br/>React는 컴포넌트가 처음 장착될 떄마다 모든 컴포넌트를 자동으로 마운트 해제하고 remount하여 두 번째 마운트에서 이전 상태를 복원한다.

App이 고장나면 기존 상태로 리마운트 할 수 있도록 컴포넌트를 수정할 수 있을 때 까지 strict mode를 제거하는 것을 고려하기.

### 👉 Consistent useEffect Timing

이제 React는 Click 또는 Keydown 이벤트와 같은 개별 사용자 입력 이벤트 중에 업데이트가 트리거된 경우 항상 효과 기능을 **동기식**으로 flush함.<br/>이전에는 동작이 항상 예측 가능하거나 일관되지 않았다.

### 👉 Sttricter hydration errors

누락되거나 추가된 텍스트 콘텐츠로 인한 `hydration`불일치가 이제 경고가 아닌 오류처럼 처리됨.

React는 더 이상 서버 마크업과 일치시키기 위해 클라이언트에 노드를 삽입하거나 삭제하여 개별 노드를 "패치" 하려고 시도하지 않으며 트리에서 가장 가까운 `Suspense`경계까지 클라이언트 렌더링으로 되돌아간다.

이렇게 하면 `Hydration` 트리의 일관성이 보장되고 `Hydration`불일치로 인해 발생할 수 있는 잠재적인 개인정보 보호 및 보안 허점이 방지됨.

### 👉 Suspense trees are always consistent

컴포넌트가 트리에 완전히 추가되기 전에 일시 중지되면, React는 해당 컴포넌트를 불완전한 상태로 트리에 추가하거나 효과를 실행하지 않는다. <br/>❗ 대신 React는 새 트리를 완전히 버리고 비동기 작업이 완료될때 까지 기다린 다음 처음부터 다시 렌더링을 시도.

React는 브라우저를 차단하지 않고 재시도를 동시에 렌더링함.

### 👉 Layout Effects with Susepnse

트리가 다시 일시중지되고, fallback으로 되돌아가면, React는 이제 layout effect를 정리한 다음 boundary내부의 콘텐츠가 다시 표시될 떄 다시 생성함.

이는 Suspense와 함께 사용할 때 컴포넌트 라이브러리가 레이아웃을 올바르게 측정하지 못하게 하는 문제를 해결함.

### 👉 New JS Environment Requirements

이제 React는 `Promise`, `Symbol` 및 `Object.sign`을 포함한 최신 브라우저기능에 의존한다.

최신 브라우저 기능을 제공하지 않거나 호환되지 않는 구현이 있는 IE같은 이전 브라우저 및 장치를 지원하는 경우 번들 애플리케이션에 전역 폴리필을 포함하는 것을 고려할 것!



## 🌏 Scheduler (Experimental)

* 불안정한 `scheduler/tracing` API 삭제
