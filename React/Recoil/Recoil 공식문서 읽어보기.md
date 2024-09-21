## 🌏 동기

* React에서 컴포넌트의 상태는 공통된 상위 요소까지 끌어올려야지만 공유될 수 있고, 이 과정에서 거대한 트리가 다시 렌더링 되는 효과를 야기하기도 한다.
* Context는 단일 값만 저장할 수 있고, 자체 consumer를 가지는 여러 값의 집합을 담을 수 없다.
* 이 특성들이 코드 분할을 어렵게한다.

❗ API와 의미 및 동작을 가능한 React답게 유지하면서 이것을 개선하고자 한다.

* 공유 상태(shared state)도 React의 내부상태처럼 **간단한 get/set 인터페이스로 사용**할 수 있도록 boilerplate-free API를 제공.
* 상태를 사용하는 컴포넌트를 수정하지 않고도 상태를 파생된 데이터로 대체할 수 있다.
* 전체 애플리케이션 상태를 하위호환되는 방식으로 유지하기가 쉬워, 유지된 상태는 애플리케이션 변경에도 살아남을 수 있다.



## 🌏 주요 개념

### 👉 Atoms

* 상태의 단위, 업데이트 구독이 가능.
* 각 구독된 컴포넌트는 새로운 값을 반영해 다시 렌더링 된다.
* 로컬 컴포넌트의 상태 대신 사용 가능.
* 동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다.

```js
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

* 2개의 atom이 같은 키를 갖는 것은 오류이기 때문에 전역적으로 고유하도록 해야한다.
* atom을 읽고쓰려면 `useRecoilState`라는 hook을 사용. (useState와 비슷하지만, 컴포넌트간 공유된다는점이 다르다)

```js
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```

```js
function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}
```

<br/>

### 👉 Selector

* atoms나 다른 selectors를 입력으로 받아들이는 순수 함수.
* 상위의 atoms 또는 selectors가 업데이트 되면 하위의 selectorㅎ마수도 다시 실행된다.
* **상태를 기반으로 하는 파생 데이터를 계산하는데 사용**된다.
* 최소한의 상태집합만 atoms에 저장하고, 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태를 보존을 방지한다.

```js
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```

* `useRecoilValue()`를 사용해 읽을 수 있다.
* 위에서 만든 함수는 writeable하지 않아 useRecoilState를 사용하지 않는다.

```js
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```



## 🌏 Install

```shell
npm i recoil
```

### 👉 ESLint

**Before**

```json
// 이전의 .eslint 설정
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**After**

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "useRecoilCallback"
      }
    ]
  }
}
```

* `useRecoilCallback`을 additionalHooks에 추가하는 것이 좋다.
* ESLint는 `useRecoilCallback()`을 사용하기 위해 전달된 종속성이 잘못 지정되었을 때 경고를 표시하고 해결 방안을 제시함.
* additionalHooks의 형식은 정규식 문자열이다.

<br/><br/>

## 🌏 Start

### 👉 RecoilRoot

* recoil상태를 사용하는 컴포넌트는 부모 트리 어딘가에 `RecoilRoot`를 만들어 주어야 한다.

```jsx
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

<br/>

### 👉 Atom

* **Atom**은 **상태(state)**의 일부로, 어떠 컴포넌트에서나 읽고 쓸 수 있다.
* atom의 값을 읽는 컴포넌트들은 **암묵적으로 atom을 구독**해하여 atom에 어떤 **변화가 있으면 그 atom을 구독하는 모든 컴포넌트가 재렌더링** 된다.
* 읽고 쓰게 하기 위해서 `useRecoilState()`를 아래처럼 사용.

```jsx
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

<br/>

### 👉 Selector

* 파생된 상태(derived state)의 일부를 나타낸다. 파생된 상태는 상태의 변화이다.

```js
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
```

charCountState는 `useRecoilValue`를 이용해 읽을 수 있다.



## 📘 참고

* [공식문서 - Recoil](https://recoiljs.org/ko/)