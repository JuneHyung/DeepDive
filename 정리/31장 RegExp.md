# 31장 RegExp

## 31.1 정규 표현식이란?

정규 표현식(regular expression)은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 **형식 언어**다.

정규 표현식은 문자열을 대상으로 **패턴 매칭 기능**을 제공.

```javascript
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';
const regExp = /^\d{3}-\d{4}-\d{4}$/;
regExp.test(tel); // false
```

 

## 31.2 정규 표현식의 생성

`정규 표현식 리터럴`과 `RegExp생성자 함수`를 사용해 생성할 수 있다.

일반적으로 `정규 표현식 리터럴`을 이용한다

정규 표현식 리터럴은 패턴과 플래그로 구성된다.

> **/regexp/i**
>
> / / :  시작과 종료 기호.
>
> regexp : 패턴
>
> i : 플래그

```javascript
const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true
```



RegExp 생성자 함수를 사용하여 RegExp객체를 생성할 수도 있다.

```javascript
/**
* pattern : 정규 표현식의 패턴
* flags : 정규 표현식의 플래그(g, i, m, u, y)
*/
new RegExp(pattern[, flags])
```

``` javascript
const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');

regexp.test(target); // -> true
```



RegExp생성자 함수를 사용하면 변수를 사용해 동적으로 RegExp객체를 생성할 수 있다.

```javascript
const count = (str, char) => (str.match(new RegExp(char, 'gi')) ?? []).length;

count('Is this all there is?', 'is'); // -> 3
count('Is this all there is?', 'xx'); // -> 0
```



## 31.3 RegExp 메서드

**정규 표현식을 사용하는 메서드**

* RegExp.prototype.exec
* RegExp.prototype.test
* String.prototype.match
* String.prototype.replace
* String.prototype.search
* String.prototype.split

...



### 31.3.1 RegExp.prototype.exec

인수로 받은 문자열에 대해 정규 표현식의 패턴을 검색해 매칭 결과를 배열로 반환한다.

없다면 null을 반환

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target); 
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

❗ exec는 g플래그를 지정해도 **첫 번째 매칭 결과만 반환하므로 주의**



### 31.3.2 RegExp.prototype.test

인수로 받은 문자열에 대해 정규 표현식의 패턴을 검색해 매칭 결과를 불리언 값으로 반환함.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // -> true
```



### 31.3.3 String.prototpye.match

대상 문자열과 인수로 받은 정규표현식과의 매칭 결과를 배열로 반환함.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp); 
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

❗ match는 g플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/g;

target.match(regExp); // -> ["is", "is"]
```





## 31.4 플래그

플래그는 옵션이므로 선택적으로 사용가능하며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수 있다.

어떤 플래그도 사용않는다면 대소문자를 구별해 패턴을 검색한다.

| 플래그 | 의미        | 설명                                                       |
| ------ | ----------- | ---------------------------------------------------------- |
| i      | Ignore case | 대소문자를 구분 않고 패턴을 검색                           |
| g      | Global      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색 |
| m      | Multi line  | 문자열의 행이 바뀌어도 패턴 검색을 계속함.                 |





## 31.5 패턴

패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며, 정규 표현식의 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용함.

/로 열고 닫으며 문자열의 따옴표는 생략한다.

패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.



### 31.5.1 문자열 검색

정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.

정규 표현식을 생성하는 것만으로 검색이 수행되지는 않는다.

RegExp 메서드를 사용하여 검색 대상 문자열과 정규 표현식의 매칭 결과를 구하면 검색이 수행된다.

```javascript
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

```javascript
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴.
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/ig;

target.match(regExp); // -> ["Is", "is", "is"]
```



### 31.5.2 임의의 문자열 검색

`.`은 임의의 문자 한 개를 나타낸다.

문자  내용은 상관이 없다.

```javascript
const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```



### 31.5.3 반복 검색

{m, n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.

콤마뒤에 공백이 있으면 정상 동작하지 않으니 주의.

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]
```

`{n}`은 앞선 패턴이 n번 반복되는 문자열을 의미.

`{n,}`는 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미.

{n} = {n, n}

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]
```



`+`는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미.

`+` = {1, }

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp = /A+/g;

target.match(regExp); // -> ["A", "AA", "A", "AAA"]
```



`?`는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미.

```javascript
const target = 'color colour';

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
const regExp = /colou?r/g;

target.match(regExp); // -> ["color", "colour"]
```



### 31.5.4 OR검색

`|`는 OR의 의미를 가짐.

```javascript
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;

target.match(regExp); // -> ["A", "A", "A", "B", "B", "B", "A", "B"]
```



`+`를 같이 사용하여 분해되지 않은 단어 레벨로 검색

`[]`를 통해 앞선 패턴을 한 번 이상 반복한다.

범위를 지정하려면 `[]`내에 `-`를 사용

```javascript
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /A+|B+/g;

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
// const regExp = /[AB]+/g;

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ... ~ 또는 'Z', 'ZZ', 'ZZZ', ...
// const regExp = /[A-Z]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```



| 약어     | 의미                                                         |
| -------- | ------------------------------------------------------------ |
| \d \| \D | 숫자임을 의미. `[0-9]` | 숫자가 아님을 의미 `[^0-9]`         |
| \w \| \W | 알파벳, 숫자, 언더스코어를 의미. `[A-Za-z0-9_]` | 반대를 의미  `[^A-Za-z0-9_]` |

```javascript
const target = 'AA BB 12,345';

// '0' ~ '9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\d,]+/g;

target.match(regExp); // -> ["12,345"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

target.match(regExp); // -> ["AA BB ", ","]
```



```javascript
const target = 'Aa Bb 12,345 _$%&';

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

target.match(regExp); // -> ["Aa", "Bb", "12,345", "_"]

// 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\W,]+/g;

target.match(regExp); // -> [" ", " ", ",", " $%&"]
```



### 31.5.5 NOT 검색

`[...]`내의 `^`은 not을 의미.

`[^0-9]`는 숫자를 제외한 문자를 의미.

```javascript
const target = 'AA BB 12 Aa Bb';

// 숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^0-9]+/g;

target.match(regExp); // -> ["AA BB ", " Aa Bb"]
```



### 31.5.6 시작위치로 검색

`[...]`**밖**의 ^은 문자열의 시작을 의미.

❗ `[...]`**내**의 ^는 not의 의미이니 주의

```javascript
const target = 'https://poiemaweb.com';

// 'https'로 시작하는지 검사한다.
const regExp = /^https/;

regExp.test(target); // -> true
```



### 31.5.7 마지막 위치로 검색

$는 문자열의 마지막을 의미.

```javascript
const target = 'https://poiemaweb.com';

// 'com'으로 끝나는지 검사한다.
const regExp = /com$/;

regExp.test(target); // -> true
```





## 31.6 자주 사용하는 정규 표현식

### 31.6.1 특정 단어로 시작하는지 검사

문자열이 `http://`또는 `https://`로 시작하는지 검사

?는 앞선 패턴(아래의 경우 `s`)이 최대 한 번(0번 포함)이상 반복되는지를 의미.

검색대상 문자열에 앞선 패턴(`s`)이 있어도 없어도 매치됨.

```javascript
const url = 'https://example.com';
/^http?:\/\//.test(url);

// 위와 동일.
/^(http|https):\/\//.test(url)
```



### 31.6.2 특정 단어로 끝나는지 검사

문자열이 html로 끝나는지 검사.

```javascript
const fileName = 'index.html';
/html$/.test(fileName);
```



### 31.6.3 숫자로만 이루어진 문자열인지 검사

`^`와 `$`는 문자열의 시작과 끝

`\d`는 숫자인지.

`+`는 한 번이상 반복되었는지.

즉, 처음과 끝이 숫자이고 최소 한 번 이상 반복되는 문자열과 매치.

```javascript
const target = '12345';

/^\d+$/.test(target); // true
```



### 31.6.4 하나 이상의 공백으로 시작하는지 검사

`\s`는 여러가지 공백 문자(space, tab)을 의미함.

`\s = [\t\r\n\v\f]`

```javascript
const target = ' Hi!';

// 하나 이상의 공백으로 시작하는지 검사한다.
/^[\s]+/.test(target); // -> true
```



### 31.6.5 아이디로 사용 가능한지 검사

알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사.

`{4, 10}`는 앞선 패턴이 최소 4~ 최대 10번 반복되는 문자열을 의미.

즉, 대소문자 또는 숫자로 이루어진 4~10자리 문자.

```javascript
const id = 'abc123';

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/.test(id); // -> true
```



### 31.6.6 메일 주소 형식에 맞는지 검사

메일 주소 형식이 맞는지 검사.

```javascript
const email = 'ungmo2@gmail.com';

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email); // -> true
```

> 인터넷 메시지 형식 규약인 RFC 5322에 맞는 정교한 패턴 매칭이 필요하다면 다음처럼 복잡한 패턴을 사용할 필요가 있다.
>
> ```javascript
> (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
> ```



### 31.6.7 핸드폰 번호 형식에 맞는지 검사

시작이 숫자 3개, 끝이 숫자 4개

패턴의 형태는 숫자3 - 숫자4 - 숫자3

```javascript
const cellphone = '010-1234-5678';

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // -> true
```



### 31.6.8 특수 문자 포함 여부 검사

 특수문자가 포함되어있는지 검사

```javascript
const target = 'abc#123';

// A-Za-z0-9 이외의 문자가 있는지 검사한다.
(/[^A-Za-z0-9]/gi).test(target); // -> true
```

```javascript
// 선택적으로 검사할 수 있다.
(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi).test(target); // -> true
```

제거 시 replace메서드를 사용.

