# 🐳 22장 this 🔴

## 🌏 21.1 this 키워드

객체는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 메서드를 하나의 논리적 단위로 묶은 복합적 구조다.

메서드는 자신의 프로퍼티를 참조하고 변경할 수 있어야하는데, 프로퍼티를 참조하려면 먼저 **자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야한다.**

```javascript
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    // 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면
    // 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

getDiameter()에서 식별자 circle을 참조하고 있는데 메서드가 호출되어 함수 몸체가 실해오디는 시점에 평가된다.

객체 리터럴은 circle변수에 할당되기 직전에 평갇된다.

getDiameter()가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생서오디어쏙 circle 식별자에 생성된 객체가 할당된 이후기 때문에 메서드 내부에서 circle을 참조할 수 있다.<br/>(자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직하지 않다.)



```javascript
function Circle(radius) {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * ????.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5);
```

위 예제는 생성자함수 생성 방식으로 인스턴스를 생성한 경우다.

생성자 함수로 인스턴스를 생성하려면 머넞 생성자 함수가 존재해야한다.

생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

**❗  자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요한데 이를 this라 한다.**

**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.<br/>this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**



this는 자바스크립트 엔진에 의해 암묵적으로 생ㅅ어되고, 어디서든 참조할 수 있다.

단, this가 가리키는값(**this 바인딩**)은 함수 호출 방식에 의해 **동적으로 결정**된다.

객체 리터럴과 생성자 함수예제를 this사용해 수정하면 아래와 같다.

```javascript
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this는 메서드를 호출한 객체를 가리킨다.
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10
// ---------------------------------------------------------------
// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

* 객체 리터럴의 메서드 내부의 this는 메서드를 호출한 객체를 가리킨다.
* 생성자 함수 내부의 this는 생서앚 함수가 생성할 인스턴스를 가리킨다.



Java나 C++같은 클래스 기반 언어에서 this는 언제나 클래스가 생성하는 인스턴스를 가리킨다.

**❗ 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this바인디잉 동적으로 결정된다.<br/>(strict mode도 this바인딩에 영향을 준다.)**



this객체는 어디서든 참조할 수 있지만, 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 **객체 메서드 내부 또는 생성자 함수 내부에서만 의미**가 있다.

**strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩**된다.<br/>일반함수 내부에서는 this를 사용할 필요가 없기 때문.





## 🌏 22.2 함수 호출방식과 this 바인딩

this바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

> 렉시컬스코프와 this 바인딩은 결정 시기가 다르다.
>
> 함수의 사우이 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.
>
> **하지만 this바인딩은 함수 호출 시점에 결정된다.**

동일한 함수도 다양한 방식으로 호출할 수 있다.

* 일반 함수 호출
* 메서드 호출
* 생성자 함수 호출
* Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```javascript
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
  console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo(); // window

// 2. 메서드 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: 'bar' };

foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```



### 👉 22.2.1 일반 함수 호출

**❗ 기본적으로 this에는 전역객체가 바인딩된다.**

```javascript
function foo() {
    console.log(`foo : ${this}`); // window
    function bar() {
        console.log(`bar : ${this}`); // window
    }
    bar();
}
foo();
```

중첩함수를 일반함수로 호출하면 함수 내부 this에는 전역객체가 바인딩된다.



```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  }
};

obj.foo();
```

콜백 함수가 일반함수로 호출되면, 콜백 함수 내부의 this도 전역객체가 바인딩된다.

어떤 함수라도 일반함수로 호출되면 this에 전역 객체가 바인딩된다.

**❗ 이처럼 일반 함수로 호출된 모든 함수(중첩, 콜백)내부의 this에는 전역 객체가 바인딩된다.**

메서드 내의 중첩 함수 또는 콜백함수의 this가 전역 객체를 바인딩하는건 문제가 있다.

아래는 메서드 내부의 중첩 함수나 콜백 함수의 this바인딩을 메서드의 this바인딩과 일치시키기 위한 방법은 아래와 같다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```

이 외에도 this를 명시적으로 바인딩할 수 있는 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind`메서드가 있다.

또는 화살표 함수를 사용할 수 있다.



### 👉 22.2.2 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체가 바인딩된다.

메서드 내부 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다는 것에 주의!

```javascript
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

getName은 person객체의 메서드로 정의 되있다.

getName이 가리키는 함수 객체는 person객체에 포함된게 아니라 독립적으로 존재하는 별도의 객체다.

getName메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될수도 있고 일반 변수에 할당해 일반 함수로 호출될 수도 있다.

따라서 메서드 내부this는 프로퍼티로 메서드를 가리키고 있는 객체와 관계가 없고 메서드를 호출한 객체에 바인딩된다.

프로토타입 메서드 내부에서 사용된 this도 일반 메서드처럼 해당 메서드를 호출한 객체에 바인딩 된다.



### 👉 22.2.3 생성자 함수 호출

생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

일반함수와 동일한 방법으로 생성자 함수를 정의하고, new 연ㅅ나자와 함꼐 호출하면 해당함수는 생성자 함수로 동작한다.

new와 함께 생성자 함수를 호출하지 않으면 일반함수로 동작한다.

```javascript
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킨다.
console.log(radius); // 15
```



### 👉 22.2.4 Function.prototype.apply / call / bind 메서드에 의한 간접 호출

apply, call, bind는 모든 함수가 상속받아 사용할 수 있다.

apply와 call은 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

```javascript
/**
* 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
* @param thisArg - this로 사용할 객체
* @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
* @returns 호출된 함수의 반환값
*/
Function.prototype.apply(thisArg[, argsArray])

/**
* 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
* @param thisArg - this로 사용할 객체
* @param arg1, arg2, ... 함수에게 전달할 인수 리스트
* @returns 호출된 함수의 반환값
*/
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```



```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

apply와 call메서드의 본질적인 기능은 함수를 호출하는 것이다.

apply와 call메서드는 함수를 호출하면 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

위 예제에서 getThisBinding은 전달하는 인수가 없다.

```javascript
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

apply메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.

call은 쉼표로 구분한 리스트 형식으로 전달한다.

appy와 call은 호출할 함수에 인수를 전달하는 방식만 다르지 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다.



 Function.prototype.bind는 함수를 호출하지 않지만, 첫번째 인수로 전달한 값으로 this바인딩이 교체된 함수를 새로 생성해 반환한다.

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

bind메서드는 메서드의 this와 메서드 내부 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```javascript
const person = {
  name: 'Lee',
  foo(callback) {
    // ①
    setTimeout(callback, 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is .
  // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  // 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
  // Node.js 환경에서 this.name은 undefined다.
});
```

①의 시점에서 this는 foo메서드를 호출한 person객체를 가리킨다.

②의 시점에서 this는 전역객체 window를 가리킨다.

person.foo의 콜백 함수 내부에서 this.name은 window.name과 같다

person.foo콜백함수는 외부함수 person.foo를 돕는 헬퍼함수역할을 하기 때문에 외부 함수 person.foo내부의 this와 콜백 함수 내부 this가 상이하면 문맥상 문제가 발생한다.

따라서 bind를 이용해 일치 시켜야한다.

```javascript
const person = {
  name: 'Lee',
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
});
```

