# 29장 Math

수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공함.

Math는 생성자 함수가 아니라 정적 프로퍼티와 정적 메서드만 제공한다.



## 29.1 Math프로퍼티

### 29.1.1 Math.PI

원주율  PI값을 반환함.



## 29.2 Math 메서드

### 29.2.1 Math.abs

인수로 전달한 숫자의 절대값을 반환함.

반드시 0 또는 양수이어야 한다.

```javascript
Math.abs(-1);        // -> 1
Math.abs('-1');      // -> 1
Math.abs('');        // -> 0
Math.abs([]);        // -> 0
Math.abs(null);      // -> 0
Math.abs(undefined); // -> NaN
Math.abs({});        // -> NaN
Math.abs('string');  // -> NaN
Math.abs();          // -> NaN
```



### 29.2.2 Math.round

인수로 전달된 숫자의 소수점 이하를 `반올림`한 정수를 반환

```javascript
Math.round(1.4);  // -> 1
Math.round(1.6);  // -> 2
Math.round(-1.4); // -> -1
Math.round(-1.6); // -> -2
Math.round(1);    // -> 1
Math.round();     // -> NaN
```



### 29.2.3 Math.ceil

인수로 전달된 숫자의 소수점 이하를 `올림`한 정수를 반환함.

ex) 1.1 -> 2 / -1.4 -> -1

```javascript
Math.ceil(1.4);  // -> 2
Math.ceil(1.6);  // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil(1);    // -> 1
Math.ceil();     // -> NaN
```



### 29.2.4 Math.floor

인수로 전달된 숫자의 소수점 이하를 `내림`한 정수를 반환함.

ex) 1.9 -> 1 / -1.9 -> -2

```javascript
Math.floor(1.9);  // -> 1
Math.floor(9.1);  // -> 9
Math.floor(-1.9); // -> -2
Math.floor(-9.1); // -> -10
Math.floor(1);    // -> 1
Math.floor();     // -> NaN
```



### 29.2.5 Math.sqrt

인수로 전달된 숫자의 `제곱근`을 반환

```javascript
Math.sqrt(9);  // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2);  // -> 1.414213562373095
Math.sqrt(1);  // -> 1
Math.sqrt(0);  // -> 0
Math.sqrt();   // -> NaN
```



### 29.2.6 Math.random

임의의 난수(랜덤 숫자)를 반환함.

난수는 0 ~ 1미만의 실수다. => 0은 포함되지만, 1은 아님

```javascript
Math.random(); // 0에서 1 미만의 랜덤 실수(0.8208720231391746)

/*
1에서 10 범위의 랜덤 정수 취득
1) Math.random으로 0에서 1 미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10 미만의
랜덤 실수를 구한다.
2) 0에서 10 미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
*/
const random = Math.floor((Math.random() * 10) + 1);
console.log(random); // 1에서 10 범위의 정수
```



### 29.2.7 Math.pow

첫 번째 인수를 밑으로, 두번째 인수를 지수로 `거듭제곱`한 결과를 반환함.

Math.pow대신 ES7의 지수 연산자를 사용하면 가독성이 더 좋다.

```javascript
Math.pow(2, 8);  // -> 256
Math.pow(2, -1); // -> 0.5
Math.pow(2);     // -> NaN


// ES7 지수 연산자
2 ** 2 ** 2; // -> 16
Math.pow(Math.pow(2, 2), 2); // -> 16
```



### 29.2.8 Math.max

전달받은 인수 중 `가장 큰 수`를 반환

인수가 전달되지 않으면 -Infinity를 반환함

```javascript
// 배열 요소 중에서 최대값 취득
Math.max.apply(null, [1, 2, 3]); // -> 3

// ES6 스프레드 문법
Math.max(...[1, 2, 3]); // -> 3
```



배열을 인수로 받아 배열 요소 중 최대값을 구하려면 `Function.prototype.apply()`  또는 `스프레드 문법`을 사용

```javascript
// 배열 요소 중에서 최대값 취득
Math.max.apply(null, [1, 2, 3]); // -> 3

// ES6 스프레드 문법
Math.max(...[1, 2, 3]); // -> 3
```



### 29.2.9 Math.min

전달받은 인수 중 `가장 작은 수`를 반환

인수가 전달되지 않으면 Infinity를 반환함

```javascript
Math.min(1); // -> 1
Math.min(1, 2); // -> 1
Math.min(1, 2, 3); // -> 1
Math.min(); // -> Infinity
```



배열을 인수로 받아 배열 요소 중 최대값을 구하려면 `Function.prototype.apply()`  또는 `스프레드 문법`을 사용

```javascript
// 배열 요소 중에서 최소값 취득
Math.min.apply(null, [1, 2, 3]); // -> 1

// ES6 스프레드 문법
Math.min(...[1, 2, 3]); // -> 1
```

