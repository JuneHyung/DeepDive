# 🐳 15장 let, const 키워드와 블록 레벨 스코프

## 🌏 15.1 var 키워드로 선언한 변수의 문제점

ES5까지는 var로만 변수를 선언했었다.

중요하니 주의하지 않으면 심각한 문제를 일으킬 수 있다.

### 👉 15.1.1 변수 중복 선언 허용

var키워드는 중복 선언이 가능하다.

```javascript
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

위 예제에서 x와 y는 중복 선언 되었다.

결과를 보면 알 수 있겠지만, 초기화문의 유무에 따라 다르게 동작한다.

**❗ 만약  동일한 이름의 변수가 있는 지 모르고, 변수를 중복 선언하면서 값까지 할당해버리면 의도치 않게 먼저 선언된 변수 값이 변경되버리는 부작용이 발생함.**



### 👉 15.1.2 함수 레벨 스코프

var키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역스코프로 인정한다.

❗ **외부에서 var로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가된다.**

```javascript
// if문
var x = 1;

if (true) {
  // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10
// ------------------------------------------------------------------------------------
// for문
var i = 10;

// for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// 의도치 않게 i 변수의 값이 변경되었다.
console.log(i); // 5
```

함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다.

이로 인해 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.



### 👉 15.1.3 변수 호이스팅

var로 변수 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것 처럼 동작한다.

❗ **var로 선언한 변수는 변수 선언문 이전에 참조 할수 있다. 할당문 이전에 변수를 참조하면 언제나 undefined를 반환한다.**

```javascript
// 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
// 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

변수 호이스팅에 의해 에러는 발생하지 않지만 흐름상 맞지도 않고, 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남김.



## 🌏 15.2 let 키워드

var과 let의 차이점 중심으로 알아보자.

### 👉 15.2.1 변수 중복 선언 금지

**let은 중복 선언하면 문법에러(Syntax Error)가 발생한다.**

```javascript
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```



### 👉 15.2.2 블록 레벨 스코프

var은 함수의 코드 블록만을 지역 스코프로 인정하였다.(함수 레벨 스코프)

let은 모든 코드블록(함수, if, for, while, try/catch, ...)을 지역 스코프로 인정하는 **블록 레벨 스코프**를 따른다.

 ```javascript
 let foo = 1; // 전역 변수
 
 {
   let foo = 2; // 지역 변수
   let bar = 3; // 지역 변수
 }
 
 console.log(foo); // 1
 console.log(bar); // ReferenceError: bar is not defined
 ```

위 예제의 코드 블록 내의 foo와 bar는 지역 변수다.

전역의 foo와 코드블록의 foo는 별개의 다른 변수다.



함수도 코드블록이므로 스코프를 만든다. 이때 함수 내 코드 블록은 함수 레벨 스코프에 중첩된다.

```javascript
let i = 10; // global scope

function foo(){
    let i = 100; // function level scope
    for(let i=1; i<3; i++){ // block level scope
        console.log(i); // 1 2
    }
    console.log(i); // 100
}

foo();
console.log(i) // 10
```



### 👉 15.2.3 변수 호이스팅 ✔

let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작함.

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

var의 경우 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 "선언단계"와 "초기화 단계"가 한번 진행된다.

즉, 선언단계에서 스코프(실행컨텍스트의 렉시컬환경)에 변수 식별자를 등록해 자바스크립트 엔진에 변수의 존재를 알린다.

그리고 즉시 초기화 단계에서 undefined로 변수를 초기화 시킨다.

변수 선언문 이전에 접근해ㅗㄷ 스코프에 변수가 존재하므로 에러가 발생하지 않지만, undefined를 리턴함



let은?

**let으로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행됨.**

런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만, **초기화 단계는 변수 선언문에 도달 했을 때 실행된다**

그렇기 때문에 먼저 접근하려하면 참조에러가 발생한다.

❗ **스코프의 시작지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 `일시적 사각지대(Temporal Dead Zone: TDZ)`라 부른다.**

```javascript
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```



let은 변수 호이스팅이 발생하지 않은 것 처럼 보이지만, 그렇지 않다.

```javascript
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2; // 지역 변수
}
```

변수 호이스팅이 일어나지 않았다면, 전역 변수 foo값이 출력되야하지만 호이스팅이 발생해서 참조에러가 발생한다.



자바스크립트는 let, const를 포함해 모든 선언(var, let, const, function, function*, class등)을 호이스팅 한다.

단, ES6에 도입된 let, const, class는 호이스팅이 발생하지 않는 것처럼 동작한다.



### 👉 15.2.4 전역객체와 let

var로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 **암묵적 전역은 전역 객체 window의 프로퍼티가 된다.**

전역 객체의 프로퍼티를 참조할 떄 window 생략 가능

```javascript
// 이 예제는 브라우저 환경에서 실행해야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

let키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.

window.foo처럼 접근 X

let 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재한다.

(25장에서 자세히

```javascript
// 이 예제는 브라우저 환경에서 실행해야 한다.
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
```



## 🌏 15.3 const 키워드

const는 상수를 선언하기 위해 사용한다.

반드시 상수만을 위한건 아니다.

특징은 let과 대부분 동일하므로 let과 다른점을 중심으로 살펴보자.

### 👉 15.3.1 선언과 초기화

❗ **const로 선언한 변수는 반드시 선언과 동시에 초기화 해야한다.**

그렇지 않으면 문법 에러가 발생한다.

```javascript
const foo; // SyntaxError: Missing initializer in const declaration
```



let과 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작함.

```javascript
{
  // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```



### 👉 15.3.2 재할당 금지

var과 let은 재할당이 자유로우나 **const는 재할당이 금지된다.**

```javascript
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```



### 👉 15.3.3 상수

원시 값은 변경 불가능한 값이므로 재할당 없이 값을 변경할 수 있는 방법이 없기 때문이다.

이런 특징을 이용해 const 키워드를 상수로 표현하는데 사용하기도 한다.

**상수는 재할당이 금지된 변수를 말한다.**

상수도 값을 저장하기 위한 메모리 공간이 필요하니 변수라고 할 수 있지만 값의 재할당이 금지도니다.

**상수는 상태 유지와 가독성, 유지보수의 편의를 위해 적극 사용해야한다.**

```javascript
// 세전 가격
let preTaxPrice = 100;

// 세후 가격
// 0.1의 의미를 명확히 알기 어렵기 때문에 가독성이 좋지 않다.
let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);

console.log(afterTaxPrice); // 110
```

위 예제에서 0.1의 의미가 명확하지 않아 가독성이 떨어진다.

이때 세율(0.1)을 const 상수로 정의하면 쉽게 파악이 가능하다.



 const 키워드로 선언된 변수에 원시 값을 할당한 경우 

원시 값은 변경할수 없는 값이고, const 키워드에 의해 재할당이 금지되니 할당된 값을 변경할 수 있는 방법은 없다.

**일반적으로 상수는 대문자로 선언해 상수임을 명확히 나타낸다.**

**여러 단어인 경우 언더 스코어(_)로 구분하여 스네이크 케이스로 표현하는 것이 일반적**

```javascript
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

console.log(afterTaxPrice); // 110
```



### 👉 15.3.4 const 키워드와 객체

**const로 선언된 변수에 객체를 할당한 겨웅 값을 변경할 수 있다.**

변경 가능한 값인 객체는 재할당 없이 직접 변경이 가능하기 때문.

```javascript
const person = {
  name: 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

❗ **const 키워드는 재할당을 금지할 뿐 `불변`을 뜻하지는 않는다**

객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않는다.



## 🌏 15.4 var vs. let vs. const

변수 선언은 기본적으로 const를 사용

let은 재할당이 필요한 경우 한정해 사용하는 것이 좋다.

아래와 같이 사용하는 것을 권장함.

* ES6사용 시 var은 사용X
* **재할당이 필요한 경우 let을 사용**하는데 이때 **변수 스코프를 최대한 좁게 만듬**
* 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 키워드를 사용.<br/>const가 재할당을 금지하기 때문에 var이나 let보다 안전함.

