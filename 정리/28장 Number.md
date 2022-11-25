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





## 28.3 Number 메서드

### 28.3.1. Number.isFinite

ES6에서 도입되었으며 인수로 전달된 숫자값이 정상적인 유한수, 즉 Infinity 또는 -Infinity인지 검사해 boolean으로 반환한다.

**NaN이면 언제나 false를 리턴함**

```javascript
// 인수가 정상적인 유한수이면 true를 반환한다.
Number.isFinite(0);                // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity);  // -> false
Number.isFinite(-Infinity); // -> false

Number.isFinite(NaN); // -> false
```



Number.isFinite와 빌트인 전역 함수 isFinite와 차이가 있다.

빌트인 전역 함수 isFinite는 전달 받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행하지만, Number.isFinite는 그렇지 않다.

Number.isFinite는 숫자가 아니면 언제나 false다.

```javascript
// Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isFinite(null); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. null은 0으로 암묵적 타입 변환된다.
isFinite(null); // -> true
```



### 28.3.2 Numer.isInteger

인수로 전달된 값이 정수인지 검사하여 그 결과를 불리언 값으로 반환한다.

검사하기전 숫자로 암묵적 타입 변환하지 않는다.

```javascript
// 인수가 정수이면 true를 반환한다.
Number.isInteger(0)     // -> true
Number.isInteger(123)   // -> true
Number.isInteger(-123)  // -> true

// 0.5는 정수가 아니다.
Number.isInteger(0.5)   // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger('123') // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger(false) // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isInteger(Infinity)  // -> false
Number.isInteger(-Infinity) // -> false
```



### 28.3.3 Number.isNaN

전달된 인수가 NaN인지 검사하여 boolean값을 리턴한다.

Number.isNaN은 전달 받은 인수를 암묵적 타입변환 하지 않는다.

```javascript
// Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isNaN(undefined); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. undefined는 NaN으로 암묵적 타입 변환된다.
isNaN(undefined); // -> true
```



### ## 28.3.4 Number.isSafeInteger

ES6에 도입되었으며 안전한 정수인지 검사해 그 결과를 boolean으로 반환한다.

인수를 암묵적 타입변환하지 않는다.

```javascript
// 0은 안전한 정수이다.
Number.isSafeInteger(0); // -> true
// 1000000000000000은 안전한 정수이다.
Number.isSafeInteger(1000000000000000); // -> true

// 10000000000000001은 안전하지 않다.
Number.isSafeInteger(10000000000000001); // -> false
// 0.5은 정수가 아니다.
Number.isSafeInteger(0.5); // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger('123'); // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger(false); // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isSafeInteger(Infinity); // -> false
```



### 28.3.5 Number.prototype.toExponential

toExponential 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다.

지수 표기법이란 매우 크거나 작은 숫자를 표기할 떄 주로 사용하며 e(Exponent)앞 숫자에 10의 n승을 곱하는 형식으로 수행하는 ㅂ아식.

인수로 소수점 이하로 표현할 자릿수를 전달할 수 있다.

```javascript
(77.1234).toExponential();  // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"
```

숫자 리터럴과 함께 Number 프로토타입 메서드를 사용할 경우 에러가 발생함.

```javascript
77.toExponential(); // -> SyntaxError: Invalid or unexpected token

77.1234.toExponential(); // -> "7.71234e+1" => 혼란오니 그룹연산자 사용
(77).toExponential(); // -> "7.71234e+1"
```

숫자 뒤의 .은 의미가 모호하다.

자바스크립트 엔진은 숫자 뒤 .을 부동 소수점 숫자의 소수 구분 기호로 해석한다.

하지만 77.toExponential()에서 77은 래퍼 객체다.

따라서 77뒤의 . 을 소수구분 기호로 해ㅅㄱ하면 뒤에 이어가는 toExponential을 프로퍼티로 해석할 수 없어 에러가 발생한다.



### 28.3.6 Number.prototype.toFixed

숫자를 반올림하여 문자열로 반환하며, 소수점 이하 자릿수를 나타내는 0~20사이 정수값을 인수로 전달할 수 있다.

인수를 생략하면 기본값이 0이 지정된다.

```javascript
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // -> "12346"
// 소수점 이하 1자리수 유효, 나머지 반올림
(12345.6789).toFixed(1); // -> "12345.7"
// 소수점 이하 2자리수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> "12345.68"
// 소수점 이하 3자리수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> "12345.679"
```



### 28.3.7 Number.prototype.toPrecision

toPrecision은 전달받은 전체 자릿수 까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다.

인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환한다.

```javascript
// 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"
```



### 28.3.8 Number.prototype.toSTring

숫자를 문자열로 변환하여 반환함.

2~36사이 정수값을 인수로 전달할 수 있다.

```javascript
// 인수를 생략하면 10진수 문자열을 반환한다.
(10).toString(); // -> "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // -> "10000"
// 8진수 문자열을 반환한다.
(16).toString(8); // -> "20"
// 16진수 문자열을 반환한다.
(16).toString(16); // -> "10"
```

