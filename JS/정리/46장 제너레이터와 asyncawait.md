# 46장 제너레이터와 async/await

## 46.1 제너레이터 함수란?

ES6에서 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

일반함수와의 차이에 대해 알아보자.

1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양보할 수 있다.
2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

<br/><br/>

## 46.2 제너레이터 함수의 정의

`function*`키워드로 선언하고, **하나 이상의 yield표현식을 포함**한다. 이것을 제외하면 일반 함수를 정의하는 것과 동일하다.

```js
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```

애스터리스크(*)의 위치는 function키워드와 함수 이름 사이라면 어디든지 상관 없지만, funciton바로 뒤에 붙이는걸 권장한다.

```js
function* genFunc() { yield 1; }

function * genFunc() { yield 1; }

function *genFunc() { yield 1; }

function*genFunc() { yield 1; }
```

❗ 제너레이터 함수는 화살표함수나 new연산자와 함께 생성자 함수로 호출할 수 없다.

<br/><br/>

## 46.3 제너레이터 객체

제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 **제너레이터 객체를 생성해 반환**한다.

이는 **이터러블 이면서 동시에 이터레이터**다.

`Symbol.iterator`메서드를 상속받는 이터러블이면서 value, done프로퍼티를 갖는 이터레이터 리절트 객체 를 반환하는 next메서드를 소유하는 이터레이터다.

```js
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true
```

<br/>

제너레이터 객체는 next메서드를 가지는 이터레이터지만 이터레이터에 없는 return, throw 메서드를 갖는다.

* next메서드를 호출하면 제너레이터 함수의 yield표현식까지  코드 블록을 실행하고, yield된 값을 value프로퍼티 값으로, false를 done프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

* return메서드를 호출하면 인수로 전달받은 값을 value프로퍼티 값으로, true를 done프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.<br/>

  ```js
  function* genFunc() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } catch (e) {
      console.error(e);
    }
  }
  
  const generator = genFunc();
  
  console.log(generator.next()); // {value: 1, done: false}
  console.log(generator.return('End!')); // {value: "End!", done: true}
  ```

* throw메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value프로퍼티 값으로, true를 done프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.<br/>

  ```js
  function* genFunc() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } catch (e) {
      console.error(e);
    }
  }
  
  const generator = genFunc();
  
  console.log(generator.next()); // {value: 1, done: false}
  console.log(generator.throw('Error!')); // {value: undefined, done: true}
  ```

<br/><br/>

## 46.4 제너레이터의 일시 중지와 재개

제너레이터는 `yield`와 `next`메서드를 통해 실행을 일시 중지했다가 필요 시점에 다시 재개할 수 있다.

제너레이터 객체의 next메서드를 호출하면, 제너레이터 함수의 코드 블록을 실행한다. 단, 일반 함수처럼 한 번에 코드 블록의 모든 코드를 일괄 실행하는것이 아니라 yield까지만 실행한다.

**yield키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.**

```js
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
const generator = genFunc();

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 표현식에서 yield된 값 1이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 1, done: false}

// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 두 번째 yield 표현식에서 yield된 값 2가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 2, done: false}

// 다시 next 메서드를 호출하면 세 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 세 번째 yield 표현식에서 yield된 값 3이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 3, done: false}

// 다시 next 메서드를 호출하면 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 제너레이터 함수의 반환값 undefined가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
console.log(generator.next()); // {value: undefined, done: true}
```

제너레이터 객체의 next메서드를 호출하면 yield표현식까지 실행되고 일시 중지된다. 이때 함수의 제어권이 호출자로 양도(yield)되고, 필요한 시점에 호출자가 또다시 next를 호출해 재개한 후 다시 yield까지 실행되고 또 일시 중지한다.

이때 제너레이터 객체의 enxt메서드는 value, done프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. enxt메서드가 반환한 이터레이터 리절트 객체의 value프로퍼티에는 yield표현식에서 yield된 값(yield키워드 뒤의 값)이 할당되고 done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당된다.

```text
generator.next() -> yield -> generator.next() -> yield -> ...generator.next() -> return
```

제너레이터객체의 next메서드에 전달한 인수는 제너레이터 함수의 yield표현식을 할당받는 변수에 할당된다. <br/>(yield표현식을 할당받는 변수에 yield표현식의 평가 결과가 할당되지 않는 것에 주의)

제너레이터의 특성을 활용하면 비동기 처리를 동기 처럼 구현할 수 있다.

<br/><br/>

## 46.5 제너레이터 의 활용

### 46.5.1 이터러블 구현

무한 피보나치 수열을 생성하는 예제로 비교해보자.

```js
// 무한 이터러블을 생성하는 함수
const infiniteFibonacci = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this; },
    next() {
      [pre, cur] = [cur, pre + cur];
      // 무한 이터러블이므로 done 프로퍼티를 생략한다.
      return { value: cur };
    }
  };
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...2584 4181 6765
}
```

제너레이터 활용

```js
// 무한 이터러블을 생성하는 제너레이터 함수
const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

// infiniteFibonacci는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...2584 4181 6765
}
```

<br/>

### 46.5.2 비동기 처리

제너레이터 함수는enxt와 yield표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. 이런 특성을 활용해 **비동기 처리를 동기 처리처럼 구현**해보자.

then/catch/finally없이 비동기 처리 결과를 반환하도록 구현할 수 있다. (예제이기 때문에 완벽하지 않다.)

```js
// node-fetch는 node.js 환경에서 window.fetch 함수를 사용하기 위한 패키지다.
// 브라우저 환경에서 이 예제를 실행한다면 아래 코드는 필요 없다.
// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch');

// 제너레이터 실행기
const async = generatorFunc => {
  const generator = generatorFunc(); // ②

  const onResolved = arg => {
    const result = generator.next(arg); // ⑤

    return result.done
      ? result.value // ⑨
      : result.value.then(res => onResolved(res)); // ⑦
  };

  return onResolved; // ③
};

(async(function* fetchTodo() { // ①
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url); // ⑥
  const todo = yield response.json(); // ⑧
  console.log(todo);
  // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
})()); // ④
```

만ㅇ갸 제너레이터 실행기가 필요하다면, co라이브러리를 활용하는 것이 좋다.

```js
const fetch = require('node-fetch');
// https://github.com/tj/co
const co = require('co');

co(function* fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo);
  // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
});
```

<br/><br/>

## 46.6 async/await

ES8에서는 제너레이터보다 간단하고, 가독성 좋게 빋동기처리를 동기처리처럼 구현할 수 있는 `async/await`가 도입되었다.

`async/await`는 **프로미스를 기반으로 동작**한다. `then/catch/finally`필요없이 동기 처리 처럼 프로미스를 사용할 수 있다.

```js
const fetch = require('node-fetch');

async function fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo);
  // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();
```

<br/>

### 46.6.1 async

await 키워드는 반드시 async함수 내부에서 사용해야 한다. async함수는 언제나 프로미스를 반환하며, 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

```js
// async 함수 선언문
async function foo(n) { return n; }
foo(1).then(v => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) { return n; };
bar(2).then(v => console.log(v)); // 2

// async 화살표 함수
const baz = async n => n;
baz(3).then(v => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) { return n; }
};
obj.foo(4).then(v => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
  async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v)); // 5
```

❗ 클래스의 constructor메서드는 async메서드가 될 수 없다. 클래스의 constructor메서드는 인스턴스를 반환해야 하지만 async함수는 언제나 프로미스를 반환해야 한다.

<br/>

### 46.6.2 await 

await는 프로미스가 settled상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.

```js
const fetch = require('node-fetch');

const getGithubUserName = async id => {
  const res = await fetch(`https://api.github.com/users/${id}`); // ①
  const { name } = await res.json(); // ②
  console.log(name); // Ungmo Lee
};

getGithubUserName('ungmo2');
```

HTTP요청 시 요청에 대한 fetch함수가 반환한 프로미스가 **settled상태가 될 때까지 대기한 후 프로미스가 settled상태가 되면 resolve한 처리 결과가 res에 할당**된다.

```js
async function foo() {
  const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
  const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
  const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // [1, 2, 3]
}

foo(); // 약 6초 소요된다.
```

❗ 모든 프로미스에 await를 사용하는 것은 주의한다.

위 예제의 경우, 순차 처리 될 필요가 없기 때문에 아래 처럼 처리하는 것이 좋다.

```js
async function foo() {
  const res = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
  ]);

  console.log(res); // [1, 2, 3]
}

foo(); // 약 3초 소요된다.
```

단, 순차처리가 되야한다면, 하나하나 await거는 수밖에 없다.

<br/>

### 46.6.3 에러 처리

에러는 호출자 방향으로 전파된다. 즉, 콜스택의 아래방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다.

하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 `try...catch`를 사용해 에러를 캐치할 수 없다.

```js
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

<br/>

`async/await`는 `try...catch`문으로 에러를 캐치할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```js
const fetch = require('node-fetch');

const foo = async () => {
  try {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: Failed to fetch
  }
};

foo();
```

HTTP에러 뿐만 아니라 try블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.

❗ **async함수는 catch문을 사용해서 에러 처리하지 않으면 async함수는 발생한 에러를 reject하는 프로미스를 반환한다.**따라서 async함수를 호출하고, `Promise.prototype.catch`후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

```js
const fetch = require('node-fetch');

const foo = async () => {
  const wrongUrl = 'https://wrong.url';

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo()
  .then(console.log)
  .catch(console.error); // TypeError: Failed to fetch
```

