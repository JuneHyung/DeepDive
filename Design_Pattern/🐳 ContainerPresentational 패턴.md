# 🐳 Container/Presentational Pattern

관심사 분리를 강제하는 1가지 방법으로 뷰를 애플리케이션 로직에서 분리할 수 있다.

## 🌏 Example

6개의 강아지 사진을 다운받아 렌더링하는 앱을 만든다고 가정해보자.

이상적으로는 아래 2가지로 분리하여 관심사 분리를 강제하고 싶다.

1. `Presentational Components`: 데이터가 **어떻게 사용자에게 보여질 지에 대해서만 다루는** 컴포넌트. 예제에서는 강아지 사진의 목록을 렌더링하는 부분이다.
2. `Container Components`: **어떤 데이터가 보여질 지에 대해 다루는** 컴포넌트. 예제에서는 강아지 사진들을 다운로드한다.

`Container Component`가 비즈니스 로직, `Presentational Component`가 뷰의 역할

<br/><br/>

## 🌏 Presentational Component

`Presentational 컴포넌트`는 props를 통해 데이터를 받아 **데이터를 화면에 표현하는 것이 주된 기능**이다. 데이터는 건드리지 않는다.

```jsx
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}

```

DogImages는 단순히 이미지를 props로 받아 화면에 뿌리는 `Presentational 컴포넌트다.` UI변경 이외의 상태를 갖지 않고, prop을 통해 받은 데이터는 `Preseetational 컴포넌트`에 의해 수정되지 않는다.

데이터는 Container컴포넌트로 부터 데이터를 받는다.

<br/><br/>

## 🌏 Container 컴포넌트

`Container 컴포넌트`의 주요 기능은 `Presetational 컴포넌트`에 **데이터를 전달하는 것이 주된 기능**이다. 

Container자체는 화면에 아무것도 렌더링 하지 않고, 그렇기에 스타일시트도 포함하지 않는다.

```jsx
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

<br/><br/>

## 🌏 Hooks

대개 Container/Presetational 패턴은 React Hook으로 대체가 가능하다.<br/>**❗ Hook을 이용해 stateless컴포넌트를 쉽게 만들 수 있다.**

```jsx
export default function useDogImages() {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/labrador/images/random/6')
      .then(res => res.json())
      .then(({ message }) => setDogs(message))
  }, [])

  return dogs
}
```

위 훅을 사용해 데이터를 받아오면 `DogImagesContainer`컴포넌트를 사용할 필요가 없다. 대신 `Presentational 컴포넌트`에서 훅을 직접 호출해 사용하면 된다.

```jsx
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

정리하자면, `훅`을 이용해 `Container/Presetational 패턴`처럼 비즈니스 로직과 뷰를 분리할 수 있고, 불필요한 Container 래핑을 줄일 수 있다.

<br/><br/>

## 🌏 장단점

### 👉 장점

* 자연스럽게 관심사 분리를 구현할 수 있다.<br/>`Presentational 컴포넌트`는 UI를 담당하는 순수함수, `Container 컴포넌트`는 상태와 기타 데이터를 책임진다.
* `Presentational 컴포넌트`는 데이터 변경 없이 화면에 출력할 수 이어 여러 곳에서 다양한 목적으로 재사용할 수 있다.
* `Presentational 컴포넌트`는 비즈니스 로직을 수정하지 않기 때문에 코드베이스에 대한 이해가 깊지 않아도 쉽게 수정할 수 있다.
* `Presentational 컴포넌트`는 테스트 도 쉽다.

<br/>

### 👉 단점

* `Container/Presentational패턴`은 비즈니스 로직과 렌더링 로직을 쉽게 분리할 수 있지만 hook을 이용하면, 클래스형컴포넌트를 사용하지 않고도 이 패턴을 따르지 않고 같은 효과를 볼 수 있다.
* hook을 사용하더라도 이 패턴을 사용할 수 있지만 너무 작은 규모의 앱에서는 오버엔지니어링일 수 있다.

<br/><br/>

## 📘 참고

* [patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/)