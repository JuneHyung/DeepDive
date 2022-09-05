# 20장 strict mode

## 20.1 strict mode란?

```javascript
function foo() {
    x=10;
}
console.log(x);
```

자바스크립트 엔진은 스코프체인을 통해 x가 어디서 선언 되었는지 검색하기 시작. <br/>-> 그 후 foo함수의 스코프에서 x변수의 선언을 검색 <br/>-> x변수 선언이 없으므로 검색에 실패하고, 상위 스코프(전역)에서 x검색을 선언<br/>-> 전역에도 x가 선언되지 않아 ReferenceError를 발생 (x)<br/>-> 자바스크립트 엔진이 암묵적으로 전역 객체에 x프로퍼티를 동적 생성 (o)

이런 현상을 **암묵적 전역(implicit global)** 이라 한다.

좀 더 안정적인 코드를 위해 ES5부터 **strict mode(엄격모드)**가 추가됨.

오류 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

**ESLint같은 린트 도구를 권장.**

린트 도구는 정적 분석 기능을 통해 소스코드 실행 전에 소스코드를 스캔하여 문법적 오류, 잠재적오류까지 찾아내 리포팅해준다.



## 20.2 strict mode의 적용

전역의 선두 또는 함수 몸체 선두에 **`'use strict';`**를 추가.

선두에 두지 않으면 제대로 동작하지 않음

```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용된다.

```javascript
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```



## 20.3 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```

외부 라이브러리 사용하는 경우 non-strict mode인 경우도 잇기 때문에 전역에 strict mode를 쓰기 보다는 즉시 실행 함수로 스크립트 전체를 감싸 스코프를 구분하고 즉시 실행 함수의 선두에 strict모드를 사용.

```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```



## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자.

함수단위로 함수마다 사용하는것은 번거롭기도 하며, **strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제**가 될 수 있다.

❗ **그렇기 때문에 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.**

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```



## 20.5 strict mode가 발생시키는 에러

* **암묵적 전역**
* **변수, 함수, 매개변수의 삭제**
* **매개변수 이름의 중복**
* **with문 사용**

### 20.5.1 암묵적 전역

선언하지 않은 변수 참조하면 ReferenceError발생.

```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```



### 20.5.2 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제 시 SyntaxError발생

```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```



### 20.5.3 매개변수 이름의 중복

중복된 매개변수 이름 사용시 SyntaxError

```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```



### 20.5.4 with문의 사용.

with문 사용 시 SyntaxError.

>  with문은 전달된 객체를 스코프 체인에 추가한다.
>
> with문은 동일한 객체 프로퍼티를 반복해서 사용할 때 객체 이름을 사용할 수 있어서 코드가 간단해지지만, 성능과 가독성이 떨어진다.
>
> 사용하지 않는 것이 좋다.





## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

`strict mode`에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩됨.

생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문 (Error 발생 X)

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```



### 20.6.2 arguments 객체

`strict mode`에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments객체에 반영되지 않는다.

```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```

