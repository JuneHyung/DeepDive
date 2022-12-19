# 39장 DOM

DOM(Documnet Object Model)은 HTML문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.



## 39.1 노드

### 39.1.1 HTML요소와 노드 객체

HTML요소 (HTML Element)는 HTML문서를 구성하는 개별적 요소를 의미한다.

HTML요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.<BR/>(HTML요소의 어트리뷰트는 어트리뷰트 노드로, 텍스트 콘텐츠는 텍스트노드로 변환)

HTML문서는 HTML요소들의 집합으로 이뤄지며 HTML요소는 `중첩 관계`를 갖는다.

HTML요소의 콘텐츠 영역에는 텍스트 뿐만 아니라 다른 HTML요소가 포함될 수 있고, 이런 중첩관계로 `계층적인 부자관계`가 형성된다.



**트리 자료구조**

트리 자료구조는 노드들의 계층 구조로 이뤄진다.

부모 노드와 자식 노드로 구성되어 계층적 구조를 표현하는 비선형 자료구조.

**❗ 노드 객체들로 구성된 트리 자료구조를 DOM이라 한다.**



### 39.1.2 노드 객체의 타입

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

> 공백 텍스트 노드
>
> HTML 요소 사이의 개행이나 공백은 텍스트 노드가 된다.

DOM은 노드 객체의 계층적인 구조로 구성된다.

노드 객체는 종류가 있고 상속 구조를 갖는다.

노드는 총 12종류의 노드타입이 있고 주유 노드타입은 4가지가있다.



**문서 노드(document node)**

DOM트리의 최상위에 존재하는 루트 노드로서 `document 객체`를 가리킨다.

`document 객체`는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로서 전역 객체 window의 documenet 프로퍼티에 바인딩되있다.

모든 자바스크립트 코드는 script 태그에 의해 분리되어 있어도 하나의 전역 객체 `window`를 공유함.

모든 자바스크립트 코드는 전역 객체 window의 documnet 프로퍼티에 바인딩 되있는 하나의 documnet객체를 바라본다.

❗ 즉, HTML문서당 document객체는 유일하다.

요소, 어트리뷰트 , 텍스트 노드에 접근하려면 문서 노드를 통해야 한다.



**요소 노드(document node)**

`HTML요소를 가리키는 객체`

요소 노드는 HTML간의 중첩에 의해 부자 관계를 가지며, 부자 관계를 통해 정보를 구조화 함.

즉, **요소 노드는 문서의 구조를 표현**한다고 할 수 있다.



**어트리뷰트 노드(document node)**

HTML요소의 `어트리뷰트를 가리키는 객체`

어트리뷰트가 지정된 HTML요소의 요소 노드와 연결되있다.

어트리뷰트 노드는 부모 노드에 연결되있지 않다. => 형제 노드가 아니다.

어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경하려면 먼저 요소 노드에 접근해야 한다.



**텍스트 노드(document node)**

`HTML요소의 텍스트를 가리키는 객체`

**문서의 정보를 표현** 한다.

텍스트 노드는 `요소 노드의 자식 노드`이며, 자식 노드를 가질 수 없는 리프 노드.

❗ 즉, DOM트리의 최종단이다.

텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 한다.



**그 외**

* 주석을 위한 Commnet  노드
* DOCTYPE을 위한 DocumnetType 노드
* 복수의 노드를 생성해 추가할 때 사용하는 DocumnetFragment 노드
* 등등



### 39.1.3 노드 객체의 상속 구조

DOM은 HTMl문서의 계층적 구조와 정보를 표현하며, 이를 제어할 수 있는 API를 제공하는 트리 자료구조.

DOM API를 통해 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있으며 자신으 ㅣ어트리뷰트와 텍스트를 조작할 수도 있다.

DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체다.

❗ 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.

![노드 객체의 상속 구조](./readme_images/39-05.노드 객체의 상속 구조.png)

❗ 모든 노드 객체는 Object, EventTarget, Node인터페이스를 상속받는다.

`문서 노드는 Document, HTMLDocumnent 인터페이스`를, `어트리뷰트 노드는 Attr, 텍스트 노드는 CharacterData인터페이스`를 상속받는다.

`요소 노드는 Element 인터페이스`를 상속받는다.



프로토타입 체인 관점에서 살펴보자.

input요소 노드 객체는 HTMLInputElement, HTMLElement, Element, Node, EventTarget, Object의 prototype에 바인딩 되있는 프로토타입 객체를 상속 받는다.

**즉, input 요소 노드 객체는 프로토 타입 체인에 있는 모든 프로토타입의 프로퍼티나 메서드를 상속받아 사용할 수 있다.**

![input요소 노드 객체의 프로토타입 체인](./readme_images/39-06.input 요소 노드 객체의 프로토타입 체인.png)

```html
<!DOCTYPE html>
<html>
<body>
  <input type="text">
  <script>
    // input 요소 노드 객체를 선택
    const $input = document.querySelector('input');

    // input 요소 노드 객체의 프로토타입 체인
    console.log(
      Object.getPrototypeOf($input) === HTMLInputElement.prototype,
      Object.getPrototypeOf(HTMLInputElement.prototype) === HTMLElement.prototype,
      Object.getPrototypeOf(HTMLElement.prototype) === Element.prototype,
      Object.getPrototypeOf(Element.prototype) === Node.prototype,
      Object.getPrototypeOf(Node.prototype) === EventTarget.prototype,
      Object.getPrototypeOf(EventTarget.prototype) === Object.prototype
    ); // 모두 true
  </script>
</body>
</html>
```

배열이 객체인 동시에 배열인 것 처럼 input요소 노드 객체도 다음같이 다양한 특성을 갖는 객체이며,

이런 특성을 나타내느 ㄴ기능들을 상속을 통해 제공 받는다.

| input 요소 노드 객체의 특성                                  | 프로토타입을 제공하는 객체 |
| ------------------------------------------------------------ | -------------------------- |
| 객체                                                         | Object                     |
| 이벤트를 발생시키는 객체                                     | EventTarget                |
| 트리 자료구조의 노드 객체                                    | Node                       |
| 브라우저가 렌더링할 수 있는 웹 문서의 요소(HTML, XML, SVG)를 표현하는 객체 | Element                    |
| 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체              | HTMLElement                |
| HTML 요소 중에서 input 요소를 표현하는 객체                  | HTMLInputElement           |

❗ 노드 객체의 상속 구조는 `개발자도구 - Elements패널 - 우측의 Properties패널`에서 확인 가능.



`노드 객체`에는 노드 객체의 종류(노드의 타입)에 상관없이 모든 노드 객체가 공통으로 갖는 기능도 있고, 노드 타입에 따라 고유한 기능도 있다.

예를 들어 모든 노드 객체는 이벤트를 발생시킬 수 있고, 공통적으로 트리 탐색기능, 노드 정보 제공기능 등이 필요하다.

`요소 노드 객체`는 HTML요소의 종류에 따라 고유한 기능도 있다.

예를 들어 input 요소 노드 객체는 value프로퍼티가 필요하지만, div 요소 노드 객체는 value프로퍼티가 필요하지 않다.



이처럼 `노드 객체`는 공통된 기능일수록 프로토타입 체인의 상위에 개별적인 고유기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축하여 노드 객체에 필요한 기능, 즉 프로퍼티와 메서드를 제공하는 상속 구조를 갖는다.



정리해보자.

DOM은 HTML문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드 집합인 DOM API로 제공한다.

DOM API를 통해 HTML구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.





