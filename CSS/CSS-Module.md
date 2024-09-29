# 🐳 CSS-Module

## 🌏 css-module?

`.moudle.css`확장자를 가진 CSS파일.

```text
[모듈명].module.css
```

기존의 외부 CSS파일을 참조하는 방식은 애플리케이션 규모가 커질수록 여러 컴포넌트에서 사용된 CSS클래스명이 중복될 가능성이 높아진다. ( 다른 2개의 css파일에 동일한 이름의 css class가 정의되면, 2가지 스타일이 모두 적용됨 )

이러한 문제점을 해결하기 위해 도입된 방식으로 CSS클래스를 불러와 사용할 때 **클래스명을 고유한 이름으로 자동 변환**해주어 CSS 클래스명이 서로 **중첩되는 현상을 미연에 방지**해고, 각 컴포넌트에 **캡슐화된 스타일을 적용**할 수 있다.

<br/><br/>

## 🌏 Use

style객체를 활용해 객체의 프로퍼티 형식으로 참조할 수 있다.

```jsx
import styles from "파일 경로";
//...
<div className="{styles.[클래스명]}">...</div>
```

❗ CSS파일을 불러올 때 선언된 CSS클래스명은 모두 `파일 경로`, `파일 이름`, `클래스명`, `해쉬값`등을 이용해 고유한 이름으로 자동 변환된다.

즉, CSS Module을 사용하면 CSS파일마다 고유한 네임스페이스를 자동으로 부여해 주기 때문에 React 컴포넌트는 완전히 분리된 스타일을 보장받는다.

<br/>

### 👉 Example

**FirstModule.css**

```css
.wrapper {
  color: yellow;
  background-color: black;
  text-align: center;
}
```

**SecondModule.css**

```css
.wrapper {
  color: white;
  background-color: blue;
  text-align: left;
}
```

**FirstModule.js**

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

**SecondModule.js**

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

개발자 도구를 살펴보면, 클래스명이 우리가 작성한 wrapper가아니라 다른 형태로 변경된걸 볼 수 있다.

```text
[파일명]_[클래스명]__[해시값]
```

<br/><br/>

## 🌏 여러 개의 클래스 적용하기

CSS Module이 적용도니 파일로 부터 여러개의 CSS 클래스를 불러와 적용하고 싶다면, join으로 하나의 문자열로 만들거나, ES6의 템플릿 리터럴을 사용해 여러개 클래스명을 하나의 문자열로 합하여 적용할 수 있다.

<br/>

### 👉 Example

```css
.wrapper {
  color: yellow;
  background-color: black;
  text-align: center;
}

.h1 {
  text-decoration: underline;
  text-shadow: 5px 2px gray;
}
```

```js
import styles from "./FirstModule.module.css";

const FirstModule = () => {
  return (
    <div className={`${styles.wrapper} ${styles.h1}`}>
      <h1>Hello, React!</h1>
    </div>
  );
};

export default FirstModule;
```

<br/><br/>

## 🌏 CSS Module 장점 단점

### 👉 장점

* 동일한 클래스명의 재정의로 인한 스타일의 전역 오염을 미연에 방지
* 자도응로 고유한 클래스명으로 변환해주기 때문에 클래스명을 짓기 위한 개발자 고민을 줄여줌
* 컴포넌트 단위로 스타일을 관리할 수 있어 스타일 유지보수가 편해짐

<br/>

### 👉 단점

* 모듈마다 별도의 CSS파일을 작성해야 하여, 많은 CSS파일을 만들어 관리해야한다.
* 클래스를 동적으로 추가하는 경우 최종 렌더링된 결과물에서 자동 변환된 클래스명이 가독성을 어지럽힌다.

<br/><br/>

## 🌏 classnames

`classnames`라는 라이브러리를 활용해 CSS Module에서 여러 개의 클래스를 동시에 적용할 때 매우 편리하게 사용할 수 있다.

```shell
npm i classnames
```

### 👉 사용법

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// 불리언 값인 false로 평가되는 값들은 모두 무시됩니다.
classNames(null, false, 'foo', undefined, 0, 1, { bar: null }, ''); // => 'foo 1'
```

여러 타입의 값들을 다양하게 조합하여 클래스명을 작성할 수 있기 때문에 CSS클래스를 동적으로 설정할 때 편리함.

또한, `bind()`메서드는 매번 `styles.[클래스명]`형태로 호출하지 않아도, 바인드한 이름을 사용해 여러 클래스를 한 번에 불러올 수 있다.

<br/><br/>

## 📘 참고

* [TCPScholl - CSS Module](https://www.tcpschool.com/react/react_styling_cssmodule)
* [NPM - classnames](https://www.npmjs.com/package/classnames)