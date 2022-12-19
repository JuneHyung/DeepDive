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

