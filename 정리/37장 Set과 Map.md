# 37장 Set과 Map

## 37.1 Set

Set은 중복되지 않는 유일한 값들의 집합

배열과 유사하지만 다르다.

* 동일한 값을 중복하여 포함할 수 없다.
* 요소 순서에 의미가 없다.
* 인덱스로 요소에 접근이 불가하다.

Set은 수학적 집합을 구현하기 위한 자료구조로 Set을 통해, 교집합, 여집합, 차집합, 합집합등을 구현할 수 있다.



### 37.1.1 Set객체 생성

Set생성자 함수로 생성.

Set생성자 함수는 이터러블을 인수로 받아 Set객체를 생성한다.

**이터러블의 중복된 값은 Set객체 요소로 저장 되지 않는다.**

```javascript
const set = new Set();
console.log(set); // Set(0) {}
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```



Set을 통해 배열의 중복 요소 제거

```javascript
// 배열의 중복 요소 제거
const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]

// Set을 사용한 배열의 중복 요소 제거
const uniq = array => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```



### 37.1.2 요소 개수 확인

`Set.prototype.size` 프로퍼티를 사용.

size프로퍼티는 getter만 존재하는 접근자 프로퍼티로, size의 값을 변경할 수 없다.

```javascript
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
//---------------------------------------------------------------------------
const set = new Set([1, 2, 3]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: ƒ}

set.size = 10; // 무시된다.
console.log(set.size); // 3
```



### 37.1.3 요소 추가

`Set.prototype.add` 메서드를 사용

add는 추가된 새로운 Set을 반환한다. add호출 후 `연속적으로 호출(method chaining)`이 가능하다.

추가되는 요소가 중복이라면, 중복된 요소는 에러를 발생않고 무시한다.

```javascript
const set = new Set();

set.add(1).add(2);
console.log(set); // Set(2) {1, 2}
```



일차비교연산자 === 을 사용하면 NaN과 NaN을 다르다고 평가한다.

Set은 두개가 같다고 평가하여 중복추가를 허용않는다.

+0과 -0도 마찬가지.

```javascript
const set = new Set();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

// NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
set.add(NaN).add(NaN);
console.log(set); // Set(1) {NaN}

// +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
set.add(0).add(-0);
console.log(set); // Set(2) {NaN, 0}
```



Set은 객체나 배열같이 자바스크립트의 모든 값을 요소로 저장할 수 있다.

```javascript
const set = new Set();

set
  .add(1)
  .add('a')
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([]);

console.log(set); // Set(7) {1, "a", true, undefined, null, {}, []}
```



### 37.1.4 요소 존재 여부 확인

`Set.prototype.has`를 사용

존재 여부를 boolean으로 반환한다.

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```



### 37.1.5 요소 삭제

`Set.prototype.delete`메서드 사용

삭제 성공여부를 boolean으로 반환한다.

인수로 **요소값**을 전달해야한다.

만약 존재하지 않는 값이면 에러없이 무시된다.

boolean으로 반환하기 때문에 add처럼 연속사용은 불가능하다.

```javascript
const set = new Set([1, 2, 3]);

// 요소 2를 삭제한다.
set.delete(2);
console.log(set); // Set(2) {1, 3}

// 요소 1을 삭제한다.
set.delete(1);
console.log(set); // Set(1) {3}

// delete는 불리언 값을 반환한다.
set.delete(1).delete(2); // TypeError: set.delete(...).delete is not a function
```



### 37.1.6 요소 일괄 삭제

`Set.prototype.clear`메서드를 사용

언제나 `undefined`를 반환한다.

```javascript
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```



### 37.1.7 요소 순회

`Set.prototype.forEach`를 사용

Array의 forEach와 유사하게 콜백함수와 forEach메서드의 콜백함수 내부에서 this로 사용될 객체(옵션)을 인수로 전달한다.

3가지 인수를 전달받는다.

* 첫 번째 : 현재 순회중인 요소값
* 두 번째 : 현재 순회 중인 요소값
* 세 번째 :  현재 순회중인 Set객체 자체

`Array.prototype.forEach`와 다른 점은 두 번째가 Array는 인덱스지만, Set은 index가 없기 때문에 요소 값을 받는다.

```javascript
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```



Set객체는 이터러블이기 때문에 for...of로 순회가 가능하고, 스프레드문법, 배열 디스트럭처링의 대상이 될 수 있다.

```javascript
const set = new Set([1, 2, 3]);

// Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in set); // true

// 이터러블인 Set 객체는 for...of 문으로 순회할 수 있다.
for (const value of set) {
  console.log(value); // 1 2 3
}

// 이터러블인 Set 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set]); // [1, 2, 3]

// 이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, ...rest] = [...set];
console.log(a, rest); // 1, [2, 3]
```



### 37.1.8 집합 연산

집합 연산을 수행하는 프로토타입 메서드를 구해보자.



**교집합**

A와 B의 공통 요소

```javascript
// 방법 1
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다.
    if (this.has(value)) result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}

// ------------------------------------------------------------------

// 방법2
Set.prototype.intersection = function (set) {
  return new Set([...this].filter(v => set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}
```



**합집합**

A와 B의 중복 없는 모든 요소

```javascript
// 방법 1
Set.prototype.union = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    // 합집합은 2개의 Set 객체의 모든 요소로 구성된 집합이다. 중복된 요소는 포함되지 않는다.
    result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 합집합
console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}

// ------------------------------------------------------------------


// 방법 2
Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 합집합
console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
```



**차집합**

A에는 존재하지만 B에는 존재하지 않는 요소

```javascript
// 방법 1
Set.prototype.difference = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    // 차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된 집합이다.
    result.delete(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) {1, 3}
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set(0) {}

// ------------------------------------------------------------------


// 방법 2
Set.prototype.difference = function (set) {
  return new Set([...this].filter(v => !set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) {1, 3}
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set(0) {}
```



**부분집합과 상위 집합**

A가 B에 포함되는 경우, 집합 A는 B의 부분집합 이며, B는 A의 상위집합이다.

```javascript
// 방법 1
// this가 subset의 상위 집합인지 확인한다.
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    // superset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
    if (!this.has(value)) return false;
  }

  return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false

// ------------------------------------------------------------------


// 방법 2
Set.prototype.isSuperset = function (subset) {
  const supersetArr = [...this];
  return [...subset].every(v => supersetArr.includes(v));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false
```

