# 🐳 React Fiber

## 🌏 DOM과 브라우저 렌더링

가상 DOM에 대해 다루기 앞서 **DOM(Document Object Model)**을 알아보자.

`DOM`은 웹페이지에 대한 인터페이스로 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고 있다.

> 브라우저 렌더링 과정
>
> 1. 요청한 주소의 HTML파일을 다운로드
> 2. HTMl을 파싱해 DOM노드로 구성된 트리 만들고, CSS 있다면 다운로드
> 3. CSSOM 구축.
> 4. DOM노드를 순회하는데, 모든 노드가 아니라 **사용자 눈에 보이는 노드만 방문**
>    `display:none`같은 요소는 작업 x
> 5. 눈에 보이는 노드들을 대상으로 CSSOM에서 정보를 찾고, CSS를 적용.
>    - 레이아웃(layout, reflow) : 각 노드가 브라우저 화면의 어느 좌표에 정확히 나타나야 하는지 계산하는 과정.
>    - 페인팅(painting) : 레이아웃 단계를 거친 노드에 색과 같은 실제 모습을 그리는 과정

<br/>

## 🌏 가상DOM의 탄생 배경

브라우저가 웹페이지를 렌더링하는 과정은 매우 복잡하고 많은 비용이 든다. 대다수 앱은 렌더링 후 정보를 보여주는데 끝나지 않고, 사용자의 인터랙션을 통해 다양한 정보를 노출한다.

렌더링 이후 추가 렌더링 작업은 하나의 페이지에서 모든 작업이 일어나는 `SPA`에서 더욱 많아진다.
**페이지 변경** 시 다른 페이지로 가서 처음부터 HTML을 새로 받아 다시금 렌더링 과정을 시작하는 일반 웹페이지와 다르게 **하나의 페이지에서 계속 요소의 위치를 재계산**한다. **라우팅이 변경되는 경우** 특정요소를 제외하고 대부분의 요소가 삭제되고 삽입하고, 위치를 계산하는 등의 작업을 수행해야 하므로 이런 과정이 두드러진다.

그만큼 **DOM을 관리하는 과정에서 부담할 비용이 크다**. 이런 문제점을 해결하기 위해 탄생한 것이 **가상 DOM**이다.

`가상 DOM`은 실제 브라우저 DOM이 아닌 리액트가 관리하는 가상의 DOM을 의미한다. 웹페이지가 표시해야 할 DOM을 일단 메모리에 저장하고 리액트가 실제 변경에 대한 준비가 완료됐을 때 실제 브라우저의 DOM에 반영한다.
DOM계산을 브라우저가 아닌 메모리에서 계산하는 과정을 한 번 거치게 된다면 실제로 여러 번 발생했을 렌더링 과정을 최소화할 수 있고 브라우저와 개발자의 부담을 덜 수 있다.

<br/><br/>

## 🌏 가상 DOM을 위한 아키텍처, 리액트 파이버

가상 DOM과 렌더링 과정 최적화를 가능하게 해주는 것이 **리액트 파이버** 이다.

### 👉  리액트 파이버란?

리액트에서 관리하는 평범한 자바스크립트 객체다. 파이버는 파이버 재조정자(fiber reconciler)가 관리하는데,
**가상DOM과 실제DOM을 비교해 변경 사항을 수집**하며, 둘 사이 차이가 있으면 변경에 관련된 정보를 가지고 있는 **파이버를 기준으로 화면에 렌더링을 요청하는 역할.**

**파이버가 하는일**

- 작업을 작은 단위로 분할하고 쪼갠 다음 우선순위를 매김
- 작업을 일시 중지하고 나중에 다시 시작할 수 있음
- 이전 작업을 다시 재사용하거나 필요하지 않은 경우 폐기할 수 있다.

❗ 모든 과정은 비동기로 일어난다.
과거 리액트의 조정 알고리즘은 `스택`으로 이뤄져 있었다. 스택에서 유추할 수 있듯 과거에는 하나의 스택에 렌더링에 필요한 작업들이 쌓이면 이 스택이 빌때까지 동기적으로 이루어졌는데 하나의 작업이 완료되기전에 중단될 수 없어 **비효율성으로 이어졌다.**

이런 비효율성을 타파하기 위해 스택 조정자 대신 **파이버**를 탄생시켰다.

<br/>

**어떻게 구현돼 있을까?**

하나의 작업 단위로 구성돼 있다. 리액트는 이런 **작업 단위를 하나씩 처리**하고 `finishedWorked()`라는 작업으로 마무리한다. 이 **작업을 커밋**해 실제 브라우저 DOM에 가시적인 변경사항을 만들어낸다.

이러한 단계는 아래처럼 2단계로 나눌 수 있다.

1. 렌더 단계에서 리액트는 사용자에게 노출되지 않는 모든 비동기작업을 수행한다. 그리고 이 단계에서 앞서 언급한 **파이버 작업**, 우선순위를 지정하거나 중지시키거나 버리는 등의 작업이 일어난다.
2. 커밋 단계에서는 앞서 언급한 것처럼 DOM에 실제 변경사항을 반영하기 위한 작업, `commitWork()`가 실행되는데 이 과정은 앞서와 다르게 동기식으로 일어나고 중단될 수 있다.

```js
function FiberNode(
  this: $FlowFixMe,
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
	...
  }
```

이처럼 단순히 자바스크립트 객체 형태인 것을 볼 수 있다.

리액트 요소와 비슷하다고 느낄 수 있는데, 한 가지 주요한 차이는 `리액트 요소`는 **렌더링이 발생할 때마다 새로 생성**되지만, `파이버`는 **가급적이면 재사용**된다.

```js
function createFiber(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
): Fiber {
  // $FlowFixMe[invalid-constructor]: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
}
...
export function createFiberFromFragment(
  elements: ReactFragment,
  mode: TypeOfMode,
  lanes: Lanes,
  key: null | string,
): Fiber {
  const fiber = createFiber(Fragment, elements, key, mode);
  fiber.lanes = lanes;
  return fiber;
}
...
```

함수명에서 알 수 있듯 앞서 언급한 1:1관계를 확인해 볼 수 있다.

**주요 속성**

- tag : 파이버는 하나의 element에 하나가 생성되는 1:1관계를 가지고 있다. 여기서 1:1로 매칭된 정보(컴포넌트, DOM노드, ...)를 가지는 것이 tag다.
- stateNode : 파이버 자체에 대한 참조 정보를 가지고 있으며, 이 참조를 바탕으로 리액트는 파이버와 관련된 상태에 접근한다.
- child, sibling, return : 파이버 간의 관계 개념을 나타내는 속성. 트리 형식을 구성하는데 필요한 정보가 이 속성 내부에 정의된다.
  한 가지 다른 점은 children이 아닌 child로 하나만 존재한다.
- index : 여러 형제들(sibling)사이에서 자신의 위치 인덱스다.
- pendingProps: 아직 작업을 미처 처리하지 못한 props
- memoizedProps: pendingProps를 기준으로 렌더링 완료 후 pendingProps를 memoizedProps로 저장해 관리함.
- updateQueue : 상태 업데이트, 콜백함수, DOM 업데이트 등 필요한 작업을 담아두는 큐.
- memoizedState : 함수형 컴포넌트의 훅 목록이 저장된다. 단순히 useState뿐만 아니라 모든 훅 리스트가 저장된다.
- alternate : 파이버 트리와 이어질 개념으로 파이버 트리를 가리킨다.

`파이버`는 **state가 변경**되거나 **생명주기 메서드가 실행**되거나 **DOM의 변경이 필요한 시점** 등에 실행된다.
그리고 중요한 것은 리액트가 파이버를 처리할 때 마다 이런 작업을 직접 바로 처리하기도 하고 스케줄링 하기도 한다는 것이다.

이런 작업들을 작은 단위로 나눠 처리할 수도, 애니메이션과 같이 우선순위가 높은 작업은 가능한 빠르게 처리하나 낮은 작업을 연기시키는 등 좀 더 유연하게 처리된다.

❗ 변수에 UI관련 값을 보관하고, 리액트의 자바스크립트 코드 흐름에 따라 이를 관리하고, 표현하는 것이 바로 리액트다.

<br/>

### 👉 리액트 파이버 트리

파이버 트리는 리액트 내부에서 두개가 존재한다.
하나는 **현재 모습을 담은 `파이버 트리`**, 하나는 **작업 중인 상태를 나타내는 `workInProgress 트리`**이다.

리액트에서도 미처 다 그리지 못한 모습을 노출시키지 않기 위해 `더블 버퍼링` 기법을 사용하는데 이런 더블 버퍼링을 위해 트리가 2개 존재한다. (커밋 단계에서 수행된다.)

1. current를 기준으로 모든 작업 시작
2. 업데이트 발생 시 파이버는 리액트에서 새로 받은 데이터로 새로운 workInProgress트리를 빌드 시작.
3. 끝나면 다음 렌더링에 이트리를 사용.
4. workInProgress트리가 UI에 최종적으로 렌더링되어 반영 완료되면, current가 이 workInProgress로 변경됨.

> **더블 버퍼링**
>
> 리액트 파이버의 작업이 끝나면 리액트는 단순히 포인터만 변경해 workInProgress트리를 현재 트리로 바꿔버린다
>
> 그래픽을 통해 화면에 표시되는 것을 그리기 위해서 내부적으로 처리를 거쳐야 하는데, 이런 처리를 거치면 사용자에게 미처 다 그리지 못한 모습을 보는 경우가 발생한다. (한 번에 모든 작업을 마무리해서 다 그릴 수 없기 때문)
>
> 이러 상황을 방지하기 위해 보이지 않는 곳에서 그다음으로 그려야 할 그림을 미리 그린다음, 완성되면 현재 상태를 새로운 그림으로 바꾸는 기법을 의미한다.

<br/>

### 👉 파이버의 작업 순서

1. react는 `beginWork()`함수를 실행해 파이버 작업 수행.
   더이상 자식이 없는 파이버를 만날때 까지 트리 형식으로 시작.
2. 1번이 끝나면 `completeWork()`를 실행해 파이버 작업 완료
3. 형제가 있다면 형제로 넘어감
4. 2, 3이 모두 끝나면 return으로 돌아가 자신의 작업이 완료됨을 알림.

아래 코드로 생각해보기.

```jsx
<A1>
	<B1>안녕하세요.</B1>
  <B2>
  	<C1>
    	<D1 />
      <D2 />
    </C1>
  </B2>
</A1>
```

1. A의 `beginWork()` 수행
2. A1의 자식이 있으니 B1으로가 `beginWork()`수행
3. B1은 자식이 없으니 `completeWork()`를 수행. 이후 형제 B2로 이동
4. B2의 `beginWork()`수행. 이후 자식 C1으로 이동
5. C1의 `beginWork()`수행. 이후 자식 D1으로 이동.
6. D1의 `beginWork()`수행
7. D1은 자식이 없으니 `completeWork()`수행. 이후 형제 D2로 이동.
8. D2는 자식이 없으니 `completeWork()`수행.
9. 이후  C1, B2순으로 올라가며 `completeWork()`수행
10. B2는 형제 B3로 이동해 `beginWork()`수행.
11. B3의 `completeWork()`가 수행되면 상위로 이동.
12. A1의 `completeWork()` 수행.
13. 루트 노드가 완성되는 순간 최종적으로 `commitWork()`가 수행되고, 변경사항을 비교해 업데이트가 필요한 변경 사항이 DOM에 반영된다.

<br/>

여기서 setState가 변경되면, 앞서 만든 current트리가 존재하고, setState로 업데이트 요청을 받아 **workInProgress트리를 다시 빌드하기 시작**한다.
최초 렌더링시에는 모든 파이버를 새로 만들어야 했지만, 이제는 파이버가 존재하므로 새로 생성 않고 **기존 파이버에서 업데이트된 props를 받아 파이버 내부에서 처리**한다.

일반적인 리액트 애플리케이션에서는 이런 변경작업이 시도 때도 없이 일어나기 때문에 매번 새롭게 객체를 만드는 것은 리소스 낭비이다. 또, 과거 동기식으로 처리했다는 부분이 이부분인데 이 트리 업데이트 과정, 재귀적으로 하나의 트리를 순회해 새로운 트리를 만드는 작업은 동기식이고 중단될 수 없었다.

그러나 현재는 우선순위가 높은 다른 업데이트가 오면 현재 업데이트 작업을 중단하거나 새롭게 만들거나 폐기할 수도 있다.

❗ 리액트는 이러한 작업을 파이버 단위로 나눠서 수행한다.

<br/><br/>

## 🌏 파이버와 가상 DOM

리액트 컴포넌트에 대한 정보를 1:1로 가지고 있는 것이 `파이버`이며, `파이버`는 리액트 아키택쳐 내부에서 비동기로 이뤄진다.

이런 비동기 작업과 달리 DOM에 반영하는 것은 동기적으로 일어나야하고, 작업이 많아 불완전하게 화면에 표시될 가능성이 늪으므로 이런 작업을 가상에서 먼저 수행해 최종 결과물만 실제 DOM에 적용한다.

❗ 가상 DOM과 리액트의 핵심은 브라우저의 DOM을 더욱 빠르게 그리고 반영하는 것이 아니라 바로 **값으로 UI를 표현하는 것**이다.
화면에 표시되는 UI를 자바스크립트의 문자열, 배열등과 마찬가지로 값으로 관리하고 이런 흐름을 효율적으로 관리하기 위한 메커니즘이 바로 리액트의 핵심이다.

<br/><br/>

## 📘 참고

- [Git - React Fiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js)
- [React Fiber Tree모습](https://www.velotio.com/engineering-blog/react-fiber-algorithm)