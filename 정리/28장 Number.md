# 28장 Number

표준 빌트인 객체인 Number는 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공함.

## 28.1. Number 생성자 함수

Number객체는 생성자 함수 객체다.

new연산자와 함께 호출하여 Number인스턴스를 생성할 수 있다.

인수 없이 넘기면 `[[NumberData]]` 내부 슬롯에 0을 할당한 Number래퍼 객체를 생성한다.

숫자가 아닌값을 넘기면 숫자로 강제 변환한 후`[[NumberData]]`에 변환된 숫자를 할당한 Number 래퍼 객체를 생성한다.  변환이 안된다면 NaN을 할당.

```javascript
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}

const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

let numObj = new Number('10');
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number('Hello');
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```

❗ ES5에서는 [[NumberData]]를  [[PrimitiveValue]]라 불렀다.



new 연산자를 사용않고 Number 생성자 함수를 호출하면 Number인스턴스가 아닌 숫자를 반환한다.

이를 이용해 명시적으로 타입을 변환하기도 한다.

```javascript
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1
Number('10.53'); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true);  // -> 1
Number(false); // -> 0
```





## 28.2 Number 프로퍼티

### 28.2.1 Number.EPSILON

ES6에서 도입된 `Number.EPSILON`은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.

`Number.EPSILON`은 약 2.2204460492503130808472633361816E-16 (MDN에 기재되있음)



부동소수점을 표현하기위해 가장 널리 쓰이는 표준인 IEEE754는 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 생길 수 밖에 없는 구조적 한계가 있다.

`Number.EPSILON`은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

```javascript
function isEqual(a, b){
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // -> true
```



### 28.2.2 Number.MAX_VALUE

자바스크립트에서 표현할 수 있는 가장 큰 양수 값.

이보다 큰 숫자는 Infinity.

### 28.2.3 Number.MIN_VALUE

자바스크립트에서 표현할 수 있는 가장 작은 양수 값.

이보다 작은 숫자는 0.

### 28.2.4 Number.MAX_SAFE_INTEGER

자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값

### 28.2.5 Number.MIN_SAFE_INTIGER

자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값

### 28.2.6 Number.POSITIVE_INFINITY

INFINITY와 동일.

### 28.2.7 Number.NEGATIVE_INFINITY

-INFINITY와 동일

### 28.2.8 Number.NaN

숫자가 아님을 나타내는 숫자값.

window.NaN과 동일

