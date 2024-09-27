# 🐳 Emotion

Javascript로 CSS스타일을 작성하도록 설계된 라이브러리.

## 🌏 @emotion/react

```shel
npm install --save @emotion/react
```

```jsx
import { css } from '@emotion/css'

const color = 'white'

render(
 <div
   className={css`
     padding: 32px;
     background-color: hotpink;
     font-size: 24px;
     border-radius: 4px;
     &:hover {
       color: ${color};
     }
   `}
 >
   Hover to change color.
 </div>
)
```

* style속성과 유사하지만, 벤더프리픽스와 미디어쿼리를 지원함.
* css속성은 theme와 함께 호출되는 인수를 허용해ㅓㅅ 개발자가 공통 및 사용자 정의 가능한 값에 쉽게 접근 가능.

<br/><br/>

### 👉  CSS함수

* css함수는 스타일 선언 내용을 인자로 받는데 `객체형`과 `문자형`으로 넘길 수 있다.

#### 🔸 객체형

```jsx
import { css } from "@emotion/react";

function MyComponent() {
  return (
    <div
      css={css({
        color: "green",
      })}
    >
      객체형
    </div>
  );
}
```

#### 🔸 문자형

```jsx
import { css } from "@emotion/react";

function MyComponent() {
  return (
    <div
      css={css`
        color: blue;
      `}
    >
      문자형
    </div>
  );
}
```

<br/><br/>

## 🌏 @emotion/styled 패키지

리액트를 사용하면 `@emotion/react`, 아니면 `@emotion/css`

```shell
npm i @emoiton/styled @emotion/react
```

<br/>

### 👉 CSS props

요소의 스타일링은 `css props`를 사용

```jsx
import styled from '@emotion/styled'

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

render(<Button>This my button component.</Button>)
```

<br/>

## 🌏 스타일 우선순위

className속성의 이모션 스타일을 포함하는 className이 css속성 스타일을 재정의한다.

이모션 외의 소스에서 가져온 클래스 이름은 무시되고 계산된 이모션 클래스 이름에 추가됨.

부모로 부터 전달된 className porp을 통해 css prop에 정의된 스타일을 가진 구성요소를 커스텀할 수 있다.

```jsx
const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'Sans-Serif',
      color: 'black'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- props contains the `className` prop
  />
)
```

ArticleText요소가 p를 재정의함으로 써 중복된 css가 덮어씌워진다.<br/>fontSize, fontFamiliy, color는 ArticleText에 정의된 것이 우선한다.

<br/>

## 🌏 Composition

CSS에서 반환된 값을 다른 스타일블록에 보간하여 스타일을 함꼐 구성할 수 있다.

```jsx
import { css } from '@emotion/react'

const base = css`
  color: hotpink;
`

render(
  <div
    css={css`
      ${base};
      background-color: #eee;
    `}
  >
    This is hotpink.
  </div>
)
```

일반적으로 css 는 여러 클래스를 사용하여 스타일을 함께 구성할 수 있지만, 정의된 순서에 따라 나중에 정의된 것이 우선된다.

그런데 Emotion 을 사용하면 스타일을 만들고 결합할 수 있다.
이모션의 Compositon 을 사용하면 스타일이 사용 순서대로 병합되므로 스타일이 생성된 순서를 생각할 필요가 없다.

```jsx
import { css } from '@emotion/react'

const danger = css`
  color: red;
`

const base = css`
  background-color: yellow;
  color: turquoise;
`

render(
  <div>
    <div css={base}>This will be turquoise</div>
    <div css={[danger, base]}>
      This will be also be turquoise since the base styles overwrite the danger
      styles.
    </div>
    <div css={[base, danger]}>This will be red</div>
  </div>
)
```

![이모션](https://velog.io/@favorcho/Emotion-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)