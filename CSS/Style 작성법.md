# 🐳 Style 작성법

* css-in-js (styled component, emotion)
* css-module
* scss(sass)

<br/>

## 🌏 CSS-in-JS

자바스크립트 파일 안에서 CSS를 작성할 수 있는 방법.

자바스크립트의 상태값을 공유해 동적으로 스타일링 하기 위해 등장한 패러다임.

<br/>

### 👉 Example

**props로 서로 다른 스타일 부여**

```jsx
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Box bgColor="tomato" />
    </Father>
  );
}
```

**컴포넌트 스타일 확장**

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;
```

<br/>

### 👉 장점

* JS파일에서 CSS코드를 작성해 CSS의 변수와 함수를 그대로 사용할 수 있다.
* Class명이 해시값으로 치환되기 때문에 클래스 이름의 중복 및 작명의 격정을 덜 수 있다.
* 컴포넌트와 스타일을 하나의 파일에서 작성해 모듈화가 수월해 진다.

### 👉 단점

* React DevTools를 어지럽힌다.<br/>각 요소에 대해 Emotion은 `<EmotionCssProInternal>`및 `<Insertion>`컴포넌트를 렌더링함.

![css_in_js단점](./images/css_in_js단점.jpg)

### 📘 참고 

* [Medium - 우리가 CSS-in-JS와 헤어지는 이유]([(번역) 우리가 CSS-in-JS와 헤어지는 이유](https://junghan92.medium.com/번역-우리가-css-in-js와-헤어지는-이유-a2e726d6ace6))

<br/><br/>

## 🌏 CSS Module

2개의 CSS파일에 동일한 이름의 CSS클래스가 정의되잇다면, 해당 클래스가 적용된 React Element는 2스타일이 모두 한꺼번에 적용된다.

⇒ 이런 문제점 해결을 위해 CSS Module을 사용할 수 있다.

`[모듈명].module.css`

```jsx
import styles from "파일 경로";
//...
<div className="{styles.[클래스명]}">...</div>
```

React컴포넌트에서 해당 CSS파일을 불러올 떄 선언된 CSS클래스명은 모두 고유한 이름으로 자동변환됨.

고유한 클래스명은 파일경로, 이름, 클래스명, 해시값등을 사용해 자동생성된다.

→ 즉, CSS Module을 사용하면 CSS파일마다 고유한 네임스페이스를 자동으로 부여해주어 각 컴포넌트는 완전히 분리된 스타일을 보장받게된다.

```css
// FirstModule.css
.wrapper {
  color: white;
  background-color: blue;
  text-align: left;
}
```

```css
// SecondModule.css
.wrapper {
  color: yellow;
  background-color: black;
  text-align: center;
}
```

```js
import "./FirstModule.css";

const FirstModule = () => {
  return (
    <div className="wrapper">
      <h1>Hello, React!</h1>
    </div>
  );
};


export default SecondModule;
```

```js
import "./SecondModule.css";

const SecondModule = () => {
  return (
    <div className="wrapper">
      <h1>Hello, React!</h1>
    </div>
  );
};

export default SecondModule;
```

같은 스타일이 적용됨.



```js
import styles from "./FirstModule.module.css";

const FirstModule = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Hello, React!</h1>
    </div>
  );
};

export default FirstModule;
```

```js
import styles from "./SecondModule.module.css";

const SecondModule = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Hello, React!</h1>
    </div>
  );
};

export default SecondModule;
```

`[파일명]_[클래스명]__[해시값]`

### 👉 장점

- 동일한 클래스명의 재정의로 인한 스타일의 전역 오염을 미연에 방지할 수 있습니다.
- 자동으로 고유한 클래스명으로 변환해주기 때문에 클래스명을 짓기 위한 개발자의 고민을 줄여줄 수 있습니다.
- 컴포넌트 단위로 스타일을 관리할 수 있어서 스타일의 유지보수가 편해집니다.

### 👉 단점

- 다만 CSS Module은 모듈마다 별도의 CSS 파일을 작성해야 하기 때문에 별도로 많은 CSS 파일을 만들어 관리해야 한다는 단점
- 클래스를 동적으로 추가할 경우 최종 렌더링된 결과물에서 자동 변환된 클래스명이 코드의 가독성을 어지럽히는 경우가 종종 발생

가독성 문제 해결을 위해 `classnames`라는 라이브러리를 활용.

### 📘 참고

* [TCPSchool - CSS Module](https://www.tcpschool.com/react/react_styling_cssmodule)

<br/><br/>

## 🌏 SASS

Syntatically Awesome Style Sheet : 구문적으로 멋진 스타일 시트

CSS의 단점을 보완하기 위해 만든 CSS 전처리기 -> 단순 반복등의 불편함을 해소.

<br/>

확장자는 sass와 scss 2가지가 있다.

쉽게 비교하자면, Sass는 중괄호가 없고, SCSS는 중괄호가 있어 처음 보는사람도 직관적으로 이해하기 쉽다.

sass는 들여쓰기랑 줄바꿈에 의존하는 문법이지만, scss는 중괄호가 있어 컴파일에러 확률이 적어 더 선호된다.

```css
ul {
    list-style:none;
    width:1000px;
    margin:0 auto
    }
ul li {
    float:left;
    }
ul li a {
     color:black;
     padding:20px;
     display:block;
    }
```

```scss
ul {
    list-style:none;
    width:1000px;
    margin:0 auto;
    li {
        float:left;
        a {
            color:black;
            padding:20px;
            display:block;
        }
    }
}
```

**장점**

- CSS를 구조화 하여 표현.
- Mixin
- 변수, 조건문, 반복문

sass-loader : 빌드 중 sass파일을 만나면, css로 변환해주는 역할. 
-> SASS자체는 개발자용 언어라 웹브라우저가 읽을 수 없어, 중간에 컴파일러를 거쳐 CSS로 변환해 HTML에 연결한다.