# 🐳 Sass

`Syntactically Awesome Style Sheets`로 구문적으로 멋진 스타일 시트.

기존 CSS의 단점을 보완하여 더욱 효율적으로 작성할 수 있게 도와준다.

## 🌏 Sass ? SCSS? 

Sass에서 지원하는 확장자는 Sass와 SCSS 2가지가 있으며, 거의 동일한 문법을 사용한다.

큰 차이로는 Sass에서는 중괄호와 세미콜론이 없고, SCSS는 CSS와 거의 동일한 문법을 사용한다.

<br/>

### 👉 Sass

```sass
$primary-color: #0f0
$secondary-color: #f00

=button-styles
  background-color: $primary-color
  color: #fff
  padding: 10px 20px

button
  +button-styles

a
  color: $secondary-color
```

### 👉 SCSS

```css
$primary-color: #0f0;
$secondary-color: #f00;

@mixin button-styles {
  background-color: $primary-color;
  color: #fff;
  padding: 10px 20px;
}

button {
  @include button-styles;
}

a {
  color: $secondary-color;
}
```

<br/><br/>

## 🌏 Sass에 대해서

Sass는 CSS전처리기로서 개발자용 언어이기 때문에 브라우저가 이해를 하지 못한다. 그렇기 때문에 CSS파일로 컴파일하여 브라우저가 이해할 수 있는 CSS파일로 변환해야하며, 이를 자동으로 해주는 것이 sass-loader이다.

<br/><br/>

## 🌏 Overview

- [`@use`](https://sass-lang.com/documentation/at-rules/use)다른 Sass 스타일시트에서 믹스인, 함수, 변수를 로드하고, 여러 스타일시트의 CSS를 결합한다.
- [`@forward`](https://sass-lang.com/documentation/at-rules/forward)Sass 스타일시트를 로드하고 스타일시트가  `@use`규칙과 함께 로드될 때 해당 스타일시트의 믹스인, 함수, 변수를 사용할 수 있도록 만든다.
- [`@import`](https://sass-lang.com/documentation/at-rules/import)는 CSS at-rule을 확장하여 다른 스타일시트에서 스타일, 믹스인, 함수 및 변수를 로드한다.
- [`@mixin` and `@include`](https://sass-lang.com/documentation/at-rules/mixin)를 활용하여 여러 스타일을 쉽게 재사용할 수 있다
- [`@function`](https://sass-lang.com/documentation/at-rules/function)[SassScript 표현식](https://sass-lang.com/documentation/syntax/structure#expressions) 에서 사용할 수 있는 사용자 정의 함수를 정의한다.
- [`@extend`](https://sass-lang.com/documentation/at-rules/extend)를 사용해 선택자가 서로 스타일을 상속 받을 수 있다.
- [`@at-root`](https://sass-lang.com/documentation/at-rules/at-root)CSS 문서의 루트에 스타일을 적용한다.
- [`@error`](https://sass-lang.com/documentation/at-rules/error)오류 메세지와 함께 컴파일이 실패한다.
- [`@warn`](https://sass-lang.com/documentation/at-rules/warn)컴파일을 완전히 중단하지 않고 경고를 출력한다.
- [`@debug`](https://sass-lang.com/documentation/at-rules/debug)디버깅 목적으로 메시지를 인쇄합니다 .
- [`@if`](https://sass-lang.com/documentation/at-rules/control/if), [`@each`](https://sass-lang.com/documentation/at-rules/control/each), [`@for`](https://sass-lang.com/documentation/at-rules/control/for) 및 [`@while`](https://sass-lang.com/documentation/at-rules/control/while)과 같은 흐름제어 규칙은 스타일을 내보낼지 여부와 횟수를 제어한다.<br/>(해당 키워드를 이용해 조건문, 반복문이 가능하다.)

<br/><br/>

## 🌏 특징

### 👉 Variables

`$`를 사용해 변수를 선언할 수 있다.

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css
/* CSS OUTPUT */
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

sass가 처리되면 변수를 사용해 css에 변수 값이 배치된 일반 css가 출력된다.

<br/>

### 👉 Nesting

중첩된 계층 구조로 작성이 가능하다.

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

<br/>

### 👉Partials

다른 Sass파일에 포함할 수 있는 작은 CSS조각이 포함된 부분 Sass파일을 만들 수 있다. <br/>-> CSS를 모듀로하하고 유지 관리를 더 쉽게 유지하는 데 도움이 된다.

앞에 밑줄이 붙은 이름의 Sass파일로, `_partial.css`처럼 지정할 수 있다. `@use`와 함께 사용됨.

<br/>

### 👉 Modules

모든 Sass를 단일 파일에 작성할 필요 없이 `@use`규칙을 사용해 원하는 대로 분리할 수 있다.<br/>다른 Sass파일을 모듈로 로드하여, 파일이름을 기반으로 하는 네임스페이스를 사용해 Sass파일의 변수, 믹스인 및 함수를 참조할 수 있다.

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

<br/>

### 👉 Mixins

많은 vendor prefix의 경우 작성하기 번거롭다. 이를 믹스인을 사용하면 사이트 전체에서 재사용할 CSS 선언 그룹을 만들 수 있다.

`@mixin`을 사용하고 이름을 지정하여 선언할 수 있다.

```css
/* scss */
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

```css
/* css */
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

<br/>

### 👉 Extends/Inheritance

`@extend`를 사용하면 한 selector에서 다른 selector로 **CSS속성세트를 공유**할 수 있다.

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

각 클래스가 `message-shared`내용을 가지게 되어 HTML에 여러 클래스를 적지 않아도 된다.

사용되지 않는 `%equal-heights`의 경우 생성되지 않는다.

<br/>

### 👉 Operators

몇 가지 표준 수학 연산자가 있다.

아래는 960px를 기반으로 간단한 유동 그리드를 만드는 예제이다. Sass를 이용해 큰 번거로움 없이 백분율로 변환하는 등의 작업을 수행할 수 있다.

```scss
@use "sass:math"

.container
  display: flex

article[role="main"]
  width: math.div(600px, 960px) * 100% // 62.5%

aside[role="complementary"]
  width: math.div(300px, 960px) * 100% // 31.25%
  margin-left: auto
```



❗ 이 외에도 반복문, 조건문, 함수등을 사용할 수 있는데 자세한 내용은 공식문서를 참고.

<br/>

## 📘 참고

* [공식문서 - Sass](https://sass-lang.com/)