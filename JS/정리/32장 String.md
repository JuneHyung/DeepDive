# 32장 String

원시타입인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다.

## 32.1 String 생성자 함수

String객체는 함수 객체다.

new와 함께 호출해 String인스턴스를 생성할 수 있다.

String생성자 함수에 인수를 전달하지 않고 new와 함께 호출하면 `[[StringData]]`내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성함.



❗ 개발자도구에서 실행하면 `[[PrimitiveValue]]`라는 접근할 수 없는 프로퍼티로 보이는데 `[[StringData]]`를 가리킨다.

new연산자와 함께 문자열을 전달하면서 호출하면 문자열을 할당한 String 래퍼객체를 생성함.

```javascript
const strObj = new String();
console.log(strObj); // String {length: 0, [[PrimitiveValue]]: ""}

const strObj = new String('Lee');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length: 3, [[PrimitiveValue]]: "Lee"}
```



String래퍼 객체는 배열과 마찬가지로 length프로퍼티와 인덱스를 나타내느 ㄴ숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 `유사 배열객체`이면서 `이터러블`임.<br/>

즉, 배열처럼 인덱스로 문자에 접근이 가능하다.

❗ 단, 문자열은 원시값으로 변겅할 수 없다. (**이때 에러가 발생하지 않음.**)

```javascript
const strObj = new String('Lee');

console.log(strObj[0]); // L

// 문자열은 원시값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
strObj[0] = 'S';
console.log(strObj); // 'Lee'
```



String 생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제 변환한 후, `[[StringData]]`내부 슬롯에 변환된 문자열을 할당한 String 래퍼 객체를 생성함.

```javascript
let strObj = new String(123);
console.log(strObj);
// String {0: "1", 1: "2", 2: "3", length: 3, [[PrimitiveValue]]: "123"}

strObj = new String(null);
console.log(strObj);
// String {0: "n", 1: "u", 2: "l", : "l", length: 4, [[PrimitiveValue]]: "null"}
```

명시적 타입 변환(9.3절)에서 보았듯이 new를 사용않고 String 생성자 함수를 호출하면 String인스턴스가 아니라 문자열을 반환한다.

```javascript
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"

// 불리언 타입 => 문자열 타입
String(true);  // -> "true"
String(false); // -> "false"
```





## 32.2 length 프로퍼티

문자열의 문자 개수를 반환한다.

```javascript
'Hello'.length;    // -> 5
'안녕하세요!'.length; // -> 6
```

인덱스를 나타내는 숫자를 프로퍼티 키로, 각 문자를 값으로 가지기 때문에 **유사 배열 객체**이다.





## 32.3 String 메서드

배열에는 원본 배열(배열 메서드를 호출한 배열)을 `직접 변경하는 메서드`와 `직접 변경하지 않고, 새로운 배열을 생성해 반환하는 메서드`가 있다.



String객체는 원본 String 래퍼 객체(String메서드를 호출한 String 래퍼 객체)를 **직접 변경하는 메서드가 존재하지 않는다.**

**❗ 즉, String객체의 메서드는 언제나 새로운 문자열을 반환한다.**

문자열은 변경 불가능한 원시 값이기 때문에 **String 래퍼 객체도 읽기 전용 객체로 제공**된다.

**만약 읽기 전용 객체가 아니라면 변경된 String 래퍼 객체를 문자열로 되돌릴 때 문자열이 변경된다.**

따라서 String 객체의 모든 메서드는 String래퍼 객체를 직접 변경할 수 없고, 객체의 메서드는 언제나 새로운 문자열을 생성해 반환한다.

```javascript
const strObj = new String('Lee');

console.log(Object.getOwnPropertyDescriptors(strObj));
/* String 래퍼 객체는 읽기 전용 객체다. 즉, writable 프로퍼티 어트리뷰트 값이 false다.
{
  '0': { value: 'L', writable: false, enumerable: true, configurable: false },
  '1': { value: 'e', writable: false, enumerable: true, configurable: false },
  '2': { value: 'e', writable: false, enumerable: true, configurable: false },
  length: { value: 3, writable: false, enumerable: false, configurable: false }
}
*/
```





### 32.3.1 String.prototype.indexOf

`indexOf`는 대상 문자열(메서드를 호출한 문자열)에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환함.

* 실패시 -1을 리턴함.

* 2번째 인수로 검색을 시작할 인덱스를 전달 가능
* 특정 문자열이 있는지 검사할 때 유용

ES6의 `String.prototype.includes`메서드를 사용하면 가독성이 더 좋다.

```javascript
const str = 'Hello World';

// 문자열 str에서 'l'을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf('l'); // -> 2


// 문자열 str에서 'or'을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf('or'); // -> 7

// 문자열 str에서 'x'를 검색하여 첫 번째 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.
str.indexOf('x'); // -> -1

// 문자열 str의 인덱스 3부터 'l'을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf('l', 3); // -> 3

if (str.indexOf('Hello') !== -1) {
  // 문자열 str에 'Hello'가 포함되어 있는 경우에 처리할 내용
}
// ------------------------------------------------------------------------
if (str.includes('Hello')) {
  // 문자열 str에 'Hello'가 포함되어 있는 경우에 처리할 내용
}
```



### 32.3.2 String.prototype.search

`search`는 대상 문자열에서 인수로 받은 정규표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환함. 실패시 -1 리턴.

```javascript
const str = 'Hello world';

// 문자열 str에서 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.
str.search(/o/); // -> 4
str.search(/x/); // -> -1
```



### 32.3.3 String.prototype.includes

`includes`는 ES6에 도입되었으며, **문자열이 포함되어 있는지 확인**하여 그 결과를 **true/false**로 반환함.

2번째 인수로 `검색을 시작할 인덱스`를 전달할 수 있다.

```javascript
const str = 'Hello world';

str.includes('Hello'); // -> true
str.includes('');      // -> true
str.includes('x');     // -> false
str.includes();        // -> false

// 문자열 str의 인덱스 3부터 'l'이 포함되어 있는지 확인
str.includes('l', 3); // -> true
str.includes('H', 3); // -> false
```



### 32.3.4 String.prototype.startsWith

`startsWith`는 ES6에서 도입되었으며 대상 문자열이 인수로 전달받은 **문자열로 시작하는지 확인**해 결과를 **true/false**로 반환함.

2번째 인수로 `검색을 시작할 인덱스`를 전달할 수 있다.

```javascript
const str = 'Hello world';

// 문자열 str이 'He'로 시작하는지 확인
str.startsWith('He'); // -> true
// 문자열 str이 'x'로 시작하는지 확인
str.startsWith('x'); // -> false

// 문자열 str의 인덱스 5부터 시작하는 문자열이 ' '로 시작하는지 확인
str.startsWith(' ', 5); // -> true
```



### 32.3.5 String.prototype.endsWith

`endsWith`는 ES6에서 도입되었으며 대상 문자열이 인수로 전달받은 **문자열로 끝나는지 확인**해 결과를 **true/false**로 반환함.

2번째 인수로 `검색할 문자열의 길이`를 전달.

```javascript
const str = 'Hello world';

// 문자열 str이 'ld'로 끝나는지 확인
str.endsWith('ld'); // -> true
// 문자열 str이 'x'로 끝나는지 확인
str.endsWith('x'); // -> false

// 문자열 str의 처음부터 5자리까지('Hello')가 'lo'로 끝나는지 확인
str.endsWith('lo', 5); // -> true
```



### 32.3.6 String.prototype.charAt

`charAt`은 대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색해 반환함.

인덱스는 문자열의 범위안의 정수이어야 하며, 범위를 벗어나는 경우 빈 문자열을 반환한다.

`String.prototype.charCodeAt`과 `String.prototype.codePonintAt`과 유사하다.

```javascript
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
// 인덱스가 문자열의 범위(0 ~ str.length-1)를 벗어난 경우 빈문자열을 반환한다.
str.charAt(5); // -> ''
```



### 32.3.7 String.prototype.substring

대상 문자열에서 **첫 번째 인수로 받은 인덱스에 위치하는 문자부터 두번째 인수의 인덱스 위치문자 `이전 문자`까지**의 부분 문자열을 반환한다.

두 번째 인수는 생략할 수 있으며, 이 때 첫 번째 인수부터 끝까지의 부분 문자열을 반환함.

```javascript
const str = 'Hello World';

// 인덱스 1부터 인덱스 4 이전까지의 부분 문자열을 반환한다.
str.substring(1, 4); // -> ell

// 인덱스 1부터 마지막 문자까지 부분 문자열을 반환한다.
str.substring(1); // -> 'ello World'
```



범위안의 정수를 보내야하지만 다음과 같은 경우도 정상 동작한다.

* `첫 번째인수 > 두 번째 인수`인 경우 **두 인수는 교환**됨.
* 인수 < 0 또는 NaN인 경우 0으로 취급
* 인수 > 문자열의 길이(str.length)인 경우 인수는 문자열의 길이(str.length)로 취급됨.

```javascript
const str = 'Hello World'; // str.length == 11

// 첫 번째 인수 > 두 번째 인수인 경우 두 인수는 교환된다.
str.substring(4, 1); // -> 'ell'

// 인수 < 0 또는 NaN인 경우 0으로 취급된다.
str.substring(-2); // -> 'Hello World'

// 인수 > 문자열의 길이(str.length)인 경우 인수는 문자열의 길이(str.length)으로 취급된다.
str.substring(1, 100); // -> 'ello World'
str.substring(20); // -> ''
```

indexOf와 함께 사용하면 특정 문자열을 기준으로 앞뒤에 위치한 부분 문자열을 취득할 수 있다.

```javascript
const str = 'Hello World';

// 스페이스를 기준으로 앞에 있는 부분 문자열 취득
str.substring(0, str.indexOf(' ')); // -> 'Hello'

// 스페이스를 기준으로 뒤에 있는 부분 문자열 취득
str.substring(str.indexOf(' ') + 1, str.length); // -> 'World'
```



### 32.3.8 String.prototype.slice

`slice`는 substring과 동일하게 동작한다.

단, slice는  음수인 인수를 전달 하면 대상 문자열으 ㅣ가장 뒤에서 부터 시작해 문자열을 잘라 반환한다.

```javascript
const str = 'hello world';

// substring과 slice 메서드는 동일하게 동작한다.
// 0번째부터 5번째 이전 문자까지 잘라내어 반환
str.substring(0, 5); // -> 'hello'
str.slice(0, 5); // -> 'hello'

// 인덱스가 2인 문자부터 마지막 문자까지 잘라내어 반환
str.substring(2); // -> 'llo world'
str.slice(2); // -> 'llo world'

// 인수 < 0 또는 NaN인 경우 0으로 취급된다.
str.substring(-5); // -> 'hello world'
// slice 메서드는 음수인 인수를 전달할 수 있다. 뒤에서 5자리를 잘라내어 반환한다.
str.slice(-5); // ⟶ 'world'
```



### 32.3.9 String.prototype.toUpperCase / toLowerCase

`toUpperCase`는 대상 문자열을 전부 대문자로, `toLowerCase`는 소문자로 변경한 문자열을 반환함.

```javascript
const str = 'Hello World!';

str.toUpperCase(); // -> 'HELLO WORLD!'
str.toLowerCase(); // -> 'hello world!'
```

### 32.3.10 String.prototype.trim

`trim` 메서드는 대상 문자열 `앞뒤`에 공백 문자가 있는 경우 이를 제거한 문자열을 반환함.

```javascript
const str = '   foo  ';

str.trim(); // -> 'foo'
```

> trinStart, trimEnd
>
> 2021년 1월 stage4에 제안되있는 String.prototype.trimStart, trimEnd를 사용하면 대상 문자열 앞 또는 뒤에 공백 문자가 있는 경우 이를 제거한 문자열을 반환함.
>
> ```javascript
> const str = '   foo  ';
> 
> // String.prototype.{trimStart,trimEnd} : Proposal stage 4
> str.trimStart(); // -> 'foo  '
> str.trimEnd();   // -> '   foo'
> ```



### 32.3.11 String.prototype.repeat

`repeat`메서드는 ES6에서 도입된 대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환함.

인수로 받은 정수가 0이면 빈 문자열을, 음수면 RangeError를 반환.

인수를 생략하면 기본값 0이 설정됨.

```javscript
const str = 'abc';

str.repeat();    // -> ''
str.repeat(0);   // -> ''
str.repeat(1);   // -> 'abc'
str.repeat(2);   // -> 'abcabc'
str.repeat(2.5); // -> 'abcabc' (2.5 → 2)
str.repeat(-1);  // -> RangeError: Invalid count value
```



### 32.3.12 String.prototype.replace

`replace`메서드는 대상 문자열에서 첫 번째 인수로 받은 문자열 또는 정규표현식을 검색해 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환함.

검색된 문자열이 여러개면 첫 번째로 검색된 문자열만 치환한다.

```javascript
const str = 'Hello world';
// str에서 첫 번째 인수 'world'를 검색하여 두 번째 인수 'Lee'로 치환한다.
str.replace('world', 'Lee'); // -> 'Hello Lee'

const str = 'Hello world world';
str.replace('world', 'Lee'); // -> 'Hello Lee world'
```



**특수한 교체 패턴**을 사용할 수 있다.

ex) $&는 검색된 문자열을 의미.

```javascript
const str = 'Hello world';

// 특수한 교체 패턴을 사용할 수 있다. ($& => 검색된 문자열)
str.replace('world', '<strong>$&</strong>');
```



정규 표현식을 사용할 수 있으며, **replace의 두 번째 인수로 치환 함수를 전달할 수 있다.**

두 번째 인수로 전달한 치환 함수의 인수로 전달하면서 호출하고 치환 함수가 반환한 결과와 매치 결과를 치환함.

```javascript
// 카멜 케이스를 스네이크 케이스로 변환하는 함수
function camelToSnake(camelCase) {
  // /.[A-Z]/g는 임의의 한 문자와 대문자로 이루어진 문자열에 매치한다.
  // 치환 함수의 인수로 매치 결과가 전달되고, 치환 함수가 반환한 결과와 매치 결과를 치환한다.
  return camelCase.replace(/.[A-Z]/g, match => {
    console.log(match); // 'oW'
    return match[0] + '_' + match[1].toLowerCase();
  });
}

const camelCase = 'helloWorld';
camelToSnake(camelCase); // -> 'hello_world'

// 스네이크 케이스를 카멜 케이스로 변환하는 함수
function snakeToCamel(snakeCase) {
  // /_[a-z]/g는 _와 소문자로 이루어진 문자열에 매치한다.
  // 치환 함수의 인수로 매치 결과가 전달되고, 치환 함수가 반환한 결과와 매치 결과를 치환한다.
  return snakeCase.replace(/_[a-z]]/g, match => {
    console.log(match); // '_w'
    return match[1].toUpperCase();
  });
}

const snakeCase = 'hello_world';
snakeToCamel(snakeCase); // -> 'helloWorld'
```



### 32.3.13 String.prototype.split

대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색해 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환함.

인수로 빈 문자열을 전달하면 각 문자를 모두 분리 하고, 인수를 생략하면 대상 문자열 전체를 단일 요소로 하는 배열을 반환함.

```javascript
const str = 'How are you doing?';

// 공백으로 구분(단어로 구분)하여 배열로 반환한다.
str.split(' '); // -> ["How", "are", "you", "doing?"]

// \s는 여러 가지 공백 문자(스페이스, 탭 등)를 의미한다. 즉, [\t\r\n\v\f]와 같은 의미다.
str.split(/\s/); // -> ["How", "are", "you", "doing?"]

// 인수로 빈 문자열을 전달하면 각 문자를 모두 분리한다.
str.split(''); // -> ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", "?"]

// 인수를 생략하면 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.
str.split(); // -> ["How are you doing?"]
```



두 번쨰 인수로 배열의 길이를 지정할 수 있다.

```javascript
// 공백으로 구분하여 배열로 반환한다. 단, 배열의 길이는 3이다
str.split(' ', 3); // -> ["How", "are", "you"]
```



split메서드는 배열을 반환한다.

`Array.prototype.reverse`, `Array.prototype.join`과 같이 응용이 가능.

```javascript
// 인수로 전달받은 문자열을 역순으로 뒤집는다.
function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString('Hello world!'); // -> '!dlrow olleH'
```

