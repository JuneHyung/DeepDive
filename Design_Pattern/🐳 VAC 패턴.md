# 🐳 VAC 패턴

## 🌏 개요

React에서는 컴포넌트 개발 시 JSX로 렌더링 처리하는 방식을 주로 사용하기 때문에 JS와 마크업이 혼합된 형태로 개발이된다.

이를 효율적으로 관리하기 위해 `비즈니스 로직`과 `View`의 관심사를 분리하는 방법에 대한 고민이 많았다.

* Custom Hook 활용
* Presentational과 Container 컴포넌트 패턴
* BLoC 패턴

대부분은 비즈니스 로직의 관점에서 관심사를 분리해 View설계에 도움이 되지만, 역할 분담에 따른 협업에서 발생하는 문제를 해결하는데 있어서는 개발자 경험에 따른 차이가 발생한다.

VAC패턴은 UI개발자와 FE개발자 협업 문제를 해결하기 위해 View컴포넌트에서 JSX영역을 분리하는 VAC패턴에 대해 알아보자.

<br/><br/>

## 🌏 VAC Pattern

`VAC`는 **View Asset Component**의 약자로 **렌더링에 필요한 JSX와 스타일을 관리하는 컴포넌트를 의미**한다.

View컴포넌트에서 JSX영역을 Props Object로 추상화하고, JSX를 VAC로 분리해서 설계하는 방법으로 **비즈니스 로직 뿐만 아니라 UI기능 같은 View로직에서도 렌더링 관심사를 분리하는데 목적**이 있다.



### 👉 특징

* 반복이나 조건부 노출, 스타일 제어와 같은 **렌더링과 관련된 처리만 수행**
* 오직 props를 통해서만 제어되며 스스로의 상태를 관리하거나 변경하지 않는 **stateless 컴포넌트**
* 이벤트에 함수를 바인딩 할 때 어떤 추가처리도 하지 않는다.

VAC는 state를 가질 수 없지만 state를 가진 자식 컴포넌트를 가질 수는 있다. 이때 부모 컴포넌트와 자식 컴포넌트 중간에서 개입하지 않고 단순히 props를 전달하는 역할만 한다.

<br/><br/>

## 🌏 Example

 ```jsx
 // +, -를 클릭하면, 1씩 증가 또는 감소하는 UI기능을 가짐
 const SpinBox = () => {
   const [value, setValue] = useState(0);
 
   return (
     <div>
       <button onClick={() => setValue(value - 1)}>-</button>
       <span>{value}</span>
       <button onClick={() => setValue(value + 1)}>+</button>
     </div>
   );
 };
 ```

<br/>

### 👉 Props Object 정의

View컴포넌트에서 JSX를 **추상화한 Props Object를 생성**하고 JSX에서 **사용할 상태정보나 이벤트 핸들러를 정의**

```jsx
const SpinBox = () => {
  const [value, setValue] = useState(0);

  // JSX를 추상화한 Props Object
  const props = {
    value,
    onDecrease: () => setValue(value - 1),
    onIncrease: () => setValue(value + 1),
  };

  // JSX의 유무는 중요하지 않음
  return <div></div>;
};
```

<br/>

### 👉 JSX를 VAC로 분리

JSX영역을 분리하여 VAC로 만듬. 이때 View 컴포넌트에 생성한 **Props Object 속성을 참고해 VAC Props를 정의**

```jsx
// VAC
const SpinBoxView = ({ value, onIncrease, onDecrease }) => (
  <div>
    <button onClick={onDecrease}>-</button>
    <span>{value}</span>
    <button onClick={onIncrease}>+</button>
  </div>
);
```

```jsx
// View Component
const SpinBox = () => {
  const [value, setValue] = useState(0);

  const props = {
    value,
    onDecrease: () => setValue(value - 1),
    onIncrease: () => setValue(value + 1),
  };

  // JSX를 VAC로 교체
  return <SpinBoxView {...props} />;
};
```

<br/><br/>

## 🌏 Props Object를 쓰는 이유

직접 변수를 선언해 JSX 영역에서 UI 기능의 의존성을 줄일 수 있지만, **UI기능이 복잡해서 변수나 hook이 많을 때 어떤 것을 JSX에서 사용하느닞 한눈에 파악이 어렵고, 디버깅이 번거롭다.** 또 간단한 처리는 무의식중에 JSX에서 바로 처리할 가능성도 높다.

```jsx
// View Component
const SpinBox = () => {
  const [value, setValue] = useState(0);

  // JSX에서 사용할 값을 미리 선언하여 JSX에 적용
  const onDecrease = () => setValue(value - 1);
  const onIncrease = () => setValue(value + 1);

  return (
    <div>
      <button onClick={onDecrease}>-</button>
      <span>{value}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
};
```

<br/><br/>

## 🌏 잘못된 VAC 예시

### 👉 View 컴포넌트의 기능이나 상태 제어에 VAC가  관여해서는 안된다.

```jsx
// View Component
const SpinBox = () => {
  const [value, setValue] = useState(0);

  const props = {
    value,
    step: 1,
    handleClick: (n) => setValue(n),
  };

  // VAC에서 value를 제어하는 행위에 관여
  return <SpinBoxView {...props} />;
};
```

```jsx
// 잘못된 VAC
const SpinBoxView = ({ value, step, handleClick }) => (
  <div>
    <button onClick={() => handleClick(value - step)}>-</button>
    <span>{value}</span>
    <button onClick={() => handleClick(value + step)}>+</button>
  </div>
);
```

<br/>

올바른 VAC는 핸들러를 이벤트에 바인딩만 할 뿐, 무엇을 하는지에 대해서는 관여하지 않는다.

```jsx
// VAC
const SpinBoxView = ({ value, onIncrease, onDecrease }) => (
  <div>
    <button onClick={onDecrease}>-</button>
    <span>{value}</span>
    <button onClick={onIncrease}>+</button>
  </div>
);
```

<br/><br/>

## 🌏 실제로 어떻게 쓰일까? - 가정

UI개발자와 FE개발자가 같이 수정한다고 가정.

### 👉 FE개발자

아래와 같이 작성했다고 가정.

```jsx
const SpinBox = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <button onClick={() => setValue(Math.max(value - 1, 0))}>-</button>
      <span>{value}</span>
      <button onClick={() => setValue(value + 1)}>+</button>
    </div>
  );
};
```

<br/>

### 👉 UI 개발자

로컬에서 style을 적용할 곳에 className을 추가 할것이다.

```jsx
const SpinBox = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <button className="round" onClick={() => setValue(value - 1)}>
        -
      </button>
      <span>{value}</span>
      <button className="round" onClick={() => setValue(value + 1)}>
        +
      </button>
    </div>
  );
};
```

<br/>

### 👉 푸시 결과 - 실패

푸시하게 되면 충돌이 발생할 것 이다.

```jsx
// FE 수정
<button onClick={() => setValue(Math.max(value - 1, 0))}>-</button>

// UI 수정
<button className="round" onClick={() => setValue(value - 1)}>-</button>
```

<br/><br/>

## 🌏 실제로 어떻게 쓰일까? - VAC 적용

### 👉 onDecrease 수정

```jsx
// VAC Debugger
import VAC from "react-vac";

const SpinBox = () => {
  const [value, setValue] = useState(0);

  const props = {
    value,
    onDecrease: () => setValue(Math.max(value - 1, 0)),
    onIncrease: () => setValue(value + 1),
  };

  // VAC Debugger로 Props Object 테스트
  return <VAC name="SpinBox" data={props} />;
};
```

<br/>

### 👉 style 수정

```jsx
// VAC
const SpinBoxView = ({ value, onIncrease, onDecrease }) => (
  <div>
    <button className="round" onClick={onDecrease}>
      -
    </button>
    <span>{value}</span>
    <button className="round" onClick={onIncrease}>
      +
    </button>
  </div>
);
```

❗ 충돌이 발생하지 않을 것이다.

<br/><br/>

## 🌏 직관적인 상태 관리

0~10까지 범위만 사용하도록 하고, 증가 감소 버튼의 disabled상태를 처리한다고 하자.

```jsx
// View Component
const SpinBox = () => {
  const [value, setValue] = useState(0);

  const props = {
    value,
    disabledDecrease: value < 1,
    disabledIncrease: value > 9,
    onDecrease: () => setValue(value - 1),
    onIncrease: () => setValue(value + 1),
  };

  // JSX를 VAC로 교체
  return <SpinBoxView {...props} />;
};
```

```jsx
// VAC
const SpinBoxView = ({ value, disabledDecrease, disabledIncrease, onIncrease, onDecrease }) => (
  <div>
    <button disabled={disabledDecrease} onClick={onDecrease}>
      -
    </button>
    <span>{value}</span>
    <button disabled={disabledIncrease} onClick={onIncrease}>
      +
    </button>
  </div>
);
```

❗ 이처럼 VAC는 JSX에 어떻게 상태가 적용되는 지 전혀 신경 쓸 필요가 없고, 어떤 조건에서 활성/비활성 되는지 파악할 필요가 없다.

> ❗ VAC를 사용할 때
>
> VAC의 props 네이밍은 데이터 친화적인 형태 보다 **렌더링에 직관적인 형태로 사용하는 것**이 좋다. <br/>`isMax`, `isMin`보다는 `disabledDecrease`, `disabledIncrease`가 어떤 역할을 하는지 유추하기 쉽다.
>
> 여러 정보를 사용하는 경우 **개별로 전달하기 보다는 조합된 결과만 전달하는 것**이 좋다.<br/>로그인 한 상태에서 본인이면 수정버튼을 노출한다고 했을 때 `isLogin`, `isOwner`를 받아서 VAC내에서 `isLogin` && `isOwner`형태 보다는 `showEditButton: isLogin && isOwner`

<br/><br/>

## 🌏 Presentational 컴포넌트와 VAC

VAC패턴은 Container 컴포넌트에 로직을 위임하는 설계방식을 따르기 때문에 `Presentational과 Container컴포넌트 패턴`의 한 종류라고 볼 수 있다.

두 컴포넌트는 비슷할 수 있으나 **컴포넌트가 View로직(UI 기능, 상태 관리)을 가질 수 있는지 여부의 차이**가 있다.

`Presentational 컴포넌트`는 상황에 따라 View와 관련된 state를 가지고 상태를 제어하는 것을 허용하지만, `VAC`는 stateless컴포넌트로 스스로의 상태를 제어하지 않고 항상 부모 컴포넌트에서 Props Object를 통해 관리한다.

❗ 즉, VAC가 더 구체적인 기준을 제시하여 JSX를 처리하는 컴포넌트 관점에서 일관성 있는 설계를 하는데 도움을 준다.

<br/><br/>

## 🌏Q&A

### 👉Q1

**Q.** 

`View Component에서 로직을 VAC의 props로 전달해준다`고 이해했는데 그렇다면 하나의 VAC마다 View Component를 두는 건지 궁금하다.<br/>기존에 atomic패턴으로 개발했는데, 여러 atom이 모여 큰 component를 이루는 것처럼, VAC도 하나의 View component에 여러 VAC를 두고, logic을 전달해도 문제가 없는건지 궁금하다.

### A.

해당 질문을 View컴포넌트와 VAC가 항상 쌍으로 존재해야되는지로 이해.

VAC의 목적은 JSX에서 로직을 분리해 렌더링에 집중하기 위함이며, VAC외부 상황이 어떤지는 중요하지 않다. 여기서 외부는 단순히 부모 뿐만아니라 자식도 포함이 된다.

즉, 로직이 있는 컴포넌트를 자식으로 가지더라도 VAC가 그 로직에 관여하지 않는다면 문제가 없다. 

<br/>

### 👉Q2

**Q.** 

FE개발자와 UI개발자의 충돌 가능성이 줄어든다고 하였습니다. 예시에서는 기존 존재하는 이벤트 핸들러에 대해 수정을 시도했기 때문에 View컴포넌트와 asset컴포넌트의 각각 작업이 가능하지만, 만약 새로운 이벤트를 바인딩하는 상황이라면 작업 공간의 분리 측면에서는 맞지만, 일반적인 작성 방식과 동일하게 충돌이 날 것이라고 예상이 됩니다. <br/>오히려 파일이 많아지고 복잡도가 증가한다는 측면에선 어떻게 생각하는가?

### A.

주어진 상황 처럼 100% 완전히 격리된 상태로 진행할 수는 없다. 

그리고 모든 컴포넌트를 VAC로 분리해야할 필요는 없으며, 대체로 기본 UI컴포넌트의 경우 단순하기도 하고 한번 만들면 거의 수정이 없기 때문에 기본 컴포넌트 같은 것들은 VAC로 분리하지 않고,  수정이 좀 더 빈번할 수 있는 컴포넌트를 조합해서 사용하는 영역에서 VAC를 적용할 수도 있다.

그래서 이런 상황이 발생했을 때 어떻게 할 지 협업하는 분들과 사전에 커뮤니케이션이 필요하다.

<br/>

### 👉 Q3

**Q**

VAC구조를 사용할 때 CSS처리는 어떻게 하는가? className기반의 CSS가 익숙한 퍼블리셔들이 CSS-in-JS나 JSX컴포넌트에 대한 이해도 필수로 동반되어야 하는가?

**A.**

VAC에서 CSS처리는 상황에 맞게 편한대로 사용하면 된다.

VAC가 View로직과 JSX를 분리해서 관리하기 때문에 JSX개발에 대한 롤을 가진 쪽에서 관리하기 좋은 방식으로 선택할 수 있다.

View로직과 JSX개발 롤이 따로 분리가 되어 있지 않다면, Styled Component같이 CSS-in-JS방식이 직관적이고 간편할 수 있지만, 역할이 나눠진 환경이라면 작업이 중첩될 수록 후속관리에 어려움이 있었다.

어떤 방식이던지 정답은 아니므로 상황에 맞게 적용.

<br/><br/>

## 📘 참고

* [Blog - React에서 View의 렌더링 관심사 분리를 위한 VAC 패턴 소개](https://wit.nts-corp.com/2021/08/11/6461)
* [Blog - 리액트 VAC패턴 적용 후기 및 장단점](https://all-dev-kang.tistory.com/entry/리액트-VAC-패턴-적용-후기-및-장단점)
* [Blog - 리액트 디자인 패턴 알아보기](https://haruluka.tistory.com/45)
* [Blog - VAC패턴](https://nicehyun12.tistory.com/132)