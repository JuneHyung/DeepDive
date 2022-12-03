# 30장 Date

표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.

UTC(협정 세계시), KST(한국 표준시)

**UTC**

국제 표준시. GMT(그리니치 평균시)라고도 불림.

**KST**

UTC에 9시간을 더한 시간.

현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시게에 의해 결정된다.



## 30.1 Date 생성자 함수

Date는 생성자 함수다.

Date생성자 함수로 생성한 Date객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다.

이 값은 1970년 1월 1일 00:00:00(UTC)를 기점으로 Date객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다.

ex) 1970 1월 2일 00:00:00(UTC)

24h * 60m * 60s * 1000ms = 86,400,000을 갖는다.



Date 생성자 함수로 생성한 Date객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가진다.

Date생성자 함수로 객체를 생성하는 방법은 4가지가 있다.

* new Date()
* new Date(ms)
* new Date(dateString)
* new Date(year, month[, day, hour, minute, second, millisecond])

### 30.1.1 new Date()

인수 없이 Date생성자 함수를 호출하면 현재 날짜와 시간을 가지는 Date객체를 반환한다.

Date객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만, Date객체를 콘솔로 출력하면 `날짜와 시간정보를 출력`한다.

new없이 호출하면 객체가아닌 날짜와 시간 정보를 나타내는 `문자열`을 반환한다.

같은정보지만 다른 타입임에 주의!

```javascript
new Date(); // Sat Dec 03 2022 17:37:20 GMT+0900 (한국 표준시)
typeof new Date(); // object

Date(); // 'Sat Dec 03 2022 17:37:20 GMT+0900 (한국 표준시)'
typeof Date(); // string
```



### 30.1.2 new Date(milliseconds)

밀리초를 인수로 전달하면 `1970년 1월 1일 00:00:00(UTC)`를 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date객체를 반환한다.

```javascript
new Date(0)
Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)

new Date(86400000)
Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```



### 30.1.3 new Date(dateString)

Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date객체를 반환한다.

인수로 전달한 문자열은 `Date.parse메서드`(30.2.2에서 자세히)에 의해 해석 가능해야함

```javascript
new Date('May 26, 2020 10:00:00');
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date('2020/03/26/10:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```



### 30.1.4 new Date(year, month[, day, hour, minute, second, millisecond])

지정된 날짜와 시간을 나타내는 Date객체를 나타낸다.

연, 월을 지정하지 않으면 `1970년 1월 1일 00:00:00(UTC)`를 나타내는 Date객체를 반환한다.

```javascript
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

// 다음처럼 표현하면 가독성이 훨씬 좋다.
new Date('2020/3/26/10:00:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```





## 30.2 Date메서드

### 30.2.1 Date.now

`1970년 1월 1일 00:00:00(UTC)`를 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환함.

```javascript
const now = Date.now(); // -> 1593971539112

// Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을
// 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.
// (30.1.2절 "new Date(milliseconds)" 참고)
new Date(now); // -> Mon Jul 06 2020 02:52:19 GMT+0900 (대한민국 표준시)
```



### 30.2.2 Date.parse

`1970년 1월 1일 00:00:00(UTC)`를 기점으로 인수로 전달된 지정 시간(`new Date(dateString)`)의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환함.

```javascript
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // -> 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00'); // -> 86400000

// KST
Date.parse('1970/01/02/09:00:00');  // -> 86400000
```



### 30.2.3 Date.UTC

`1970년 1월 1일 00:00:00(UTC)`를 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환.

`new Date(year, month[, day, hour, minute, second, millisecond])`와 같은 형식의 인수를 사용

로컬타임(KST)가 아니라 UTC로 인식됨.

month는 0부터 시작되니 주의

```javascript
Date.UTC(1970, 0, 2); // -> 86400000
Date.UTC('1970/1/2'); // -> NaN
```



### 30.2.4 Date.prototype.getFullYear / setFullYear

**getFullYear / setFullYear**

Date객체의 연도를 나타내는 정수를 반환 / 설정

```javascript
new Date('2020/07/24').getFullYear(); // -> 2020

const today = new Date();

// 년도 지정
today.setFullYear(2000);
today.getFullYear(); // -> 2000

// 년도/월/일 지정
today.setFullYear(1900, 0, 1);
today.getFullYear(); // -> 1900
```



### 30.2.5 Date.prototype.getMonth / setMonth

**getMonth() / setMonth()**

Date객체의 월을 나타내는 정수를 반환 / 설정(0~11 => 1월은 0)

```javascript
new Date('2020/07/24').getMonth(); // -> 6

const today = new Date();

// 월 지정
today.setMonth(0); // 1월
today.getMonth(); // -> 0

// 월/일 지정
today.setMonth(11, 1); // 12월 1일
today.getMonth(); // -> 11
```



### 30.2.6 Date.prototype.getDate / setDate

**getDate() / setDate()**

Date객체의 날짜(1~31)을 나타내는 정수를 반환 / 설정 (1~31)

```javascript
new Date('2020/07/24').getDate(); // -> 24

const today = new Date();

// 날짜 지정
today.setDate(1);
today.getDate(); // -> 1
```



### 30.2.7 Date.prototype.getDay

Date객체의 `요일`을 나타내는 정수를 반환 / 설정 (일 -> 토까지 0 ~ 6)

```javascript
new Date('2022/12/03').getDay(); // -> 6
```



### 30.2.8 Date.prototype.getHours /setHours

**getHours() / setHours()**

Date객체의 `시간`을 나타내는 정수를 반환 / 설정 (0 ~ 23)

```javascript
new Date('2020/07/24/12:00').getHours(); // -> 12

const today = new Date();

// 시간 지정
today.setHours(7);
today.getHours(); // -> 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00
today.getHours(); // -> 0
```



### 30.2.9 Date.prototype.getMinutes / setMinutes

**getMinutes() / setMinutes()**

Date객체의 분을 나타내는 정수를 반환 / 설정(0 ~ 59)

```javascript
new Date('2020/07/24/12:30').getMinutes(); // -> 30

const today = new Date();

// 분 지정
today.setMinutes(50);
today.getMinutes(); // -> 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999
today.getMinutes(); // -> 5
```



### 30.2.10 Date.prototype.getSeconds / setSeconds

**getSeconds() / setSeconds()**

Date객체의 초를 나타내는 정수를 반환 / 설정 (0 ~ 59)

```javascript
new Date('2020/07/24/12:30:10').getSeconds(); // -> 10

const today = new Date();

// 초 지정
today.setSeconds(30);
today.getSeconds(); // -> 30

// 초/밀리초 지정
today.setSeconds(10, 0); // HH:MM:10:000
today.getSeconds(); // -> 10
```



### 30.2.11 Date.prototype.getMilliseconds / setMilliseconds

**getMilliseconds() / setMilliseconds()**

Date객체의 밀리초를 나타내는 정수를 반환 / 설정 (0 ~ 999)

```javascript
new Date('2020/07/24/12:30:10:150').getMilliseconds(); // -> 150

const today = new Date();

// 밀리초 지정
today.setMilliseconds(123);
today.getMilliseconds(); // -> 123
```



### 30.2.12 Date.prototype.getTime / setTime

**getTime() / setTime()**

`1970년 1월 1일 00:00:00(UTC)`를 기점으로 Date객체 시간까지 경과된 밀리초를 반환 / 설정.

```javascript
new Date('2020/07/24/12:30').getTime(); // -> 1595561400000
const today = new Date();

// 1970년 1월 1일 00:00:00(UTC)를 기점으로 경과된 밀리초 설정
today.setTime(86400000); // 86400000는 1day를 나타낸다.
console.log(today); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```



### 30.2.13 Date.prototype.getTimezoneOffset

UTC와 Date객체에 지정된 locale시간과의 차이를 분단위로 반환함.

KST는 UTC에 9시간을 더한 시간이다.

```javascript
const today = new Date(); // today의 지정 로캘은 KST다.

//UTC와 today의 지정 로캘 KST와의 차이는 -9시간이다.
today.getTimezoneOffset() / 60; // -9
```



### 30.2.14 Date.prototype.toDateString

사람이 읽을 수 있는 형식의 문자열로 Date객체의 날짜를 반환함.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toDateString(); // -> Fri Jul 24 2020
```



### 30.2.15 Date.prototype.toTimeString

사람이 읽을 수 있는 형식의 Date객체의 시간을 표현한 문자열을 반환함.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toTimeString(); // -> 12:30:00 GMT+0900 (대한민국 표준시)
```



### 30.2.16 Date.prototype.toISOString

`ISO 8601`형식으로 Date객체의 날짜와 시간을 표현한 문자열을 반환함.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();    // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toISOString(); // -> 2020-07-24T03:30:00.000Z

today.toISOString().slice(0, 10); // -> 2020-07-24
today.toISOString().slice(0, 10).replace(/-/g, ''); // -> 20200724
```



### 30.2.17 Date.prototype.toLocaleString

인수로 전달한 locale을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환함.

생략한 경우 시스템 locale을 적용함.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // -> 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // -> 2020/7/24 12:30:00
```



### 30.2.18 Date.prototype.toLocaleTimeString

인수로 전달한 locale을 기준으로 Date 객체의 시간을 표현한 문자열을 반환함.

생략한 경우 시스템 locale을 적용함.

```javas
const today = new Date('2020/7/24/12:30');

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleTimeString(); // -> 오후 12:30:00
today.toLocaleTimeString('ko-KR'); // -> 오후 12:30:00
today.toLocaleTimeString('en-US'); // -> 12:30:00 PM
today.toLocaleTimeString('ja-JP'); // -> 12:30:00
```





## 30.3 Date를 활용한 시계 예제

현재 날짜와 시간을 초 단위로 반복 출력한다.

```javascript
(function printNow() {
  const today = new Date();

  const dayNames = [
    '(일요일)',
    '(월요일)',
    '(화요일)',
    '(수요일)',
    '(목요일)',
    '(금요일)',
    '(토요일)'
  ];
  // getDay 메서드는 해당 요일(0 ~ 6)을 나타내는 정수를 반환한다.
  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12; // hour가 0이면 12를 재할당

  // 10미만인 분과 초를 2자리로 변경
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  // 1초마다 printNow 함수를 재귀 호출한다. 41.2.1절 "setTimeout / clearTimeout" 참고
  setTimeout(printNow, 1000);
}());
```

