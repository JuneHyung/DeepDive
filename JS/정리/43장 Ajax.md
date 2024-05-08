# 43장 Ajax

## 43.1 Ajax란?

**Ajax (Async JavaScript and XML)**란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.

Ajax는 브라우저에서 제공하는 Web API인 XMLHttpRequest객체를 기반으로 동작하며, HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

이전의 웹 페이지는 html태그로 시작해 html태그로 끝나는 완전한 HTML을 서버로부터 전송받아 우베페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했다. <br/>화면이 전환되면 서버로부터 새로운 HTML을 전송받아 웹페이지 전체를 처음 부터 다시 렌더링했다.

**단점**

1. 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 다시 전송받아 불필요한 데이터 통신이 발생
2. 변경할 필요가 없는 부분까지 다시 렌더링한다. 이로 인해 화면 전환이 일어나면 화면이 순간적으로 깜박이는 현상이 발생
3. 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹된다.

Ajax가 등장하고서는 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경할 필요가 있는 부분만 한정적으로 렌더링하는 방식이 가능해졌다.

**Ajax 장점**

1. 변경할 부분을 갱신하는데 필요한 데이터만 서버로부터 전송받기 땜누에 불필요한 데이터 통신이 발생 X.
2. 변경할 필요가 없는 부분은 다시 렌더링하지않음. 따라서 화면이 순간적으로 깜박이는 현상이 발생하지 않는다.
3. 클라이언트 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹 발생 X.

<br/><br/>

## 43.2 JSON

JSON(Javascript Object Notation)은 클라이언트와 서버 간의 HTTP통신을 위한 텍스트 데이터 포맷이다. JS에 종속되지 않는 언어 독립형 데이터 포맷으로 대부분의 프로그래밍 언어에서 사용할 수 있다.

### 43.2.1 JSON 표기 방식

JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트다.

```json
{
  "key": value,
  "key": value,
  ...
}
```

키는 반드시 큰 따옴표로 묶어야 하고, 값은 객체 리터럴과 같은 표기법을 그대로 사용할 수 있다. (문자열은 반드시 큰따옴표 사용)

### 43.2.2  JSON.stringify

객체를 JSON포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하기위해 문자열화 해야하는데 이를 `직렬화`라고 한다.

`JSON.stringify`는 객체 뿐만아니라 배열도 JSON포맷의 문자열로 변환한다.

### 43.2.3 JSON.parse

JSON포맷의 문자열을 객체로 변환하는 메서드다. 이를 `역질렬화`라고 한다.

배열이 JSON포맷의 문자열로 변환되어 있는 경우 JSON.parse는 문자열을 배열 객체로 변환한다. 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환한다.

<br/><br/>

## 43.3 XMLHttpRequest

### 43.3.1 XMLHttpRequest객체 생성

XMLHttpRequest객체는 XMLHttpRequest 생성자 함수를 호출하여 생성한다.

```js
const xhr = XMLHttpRequest();
```

### 43.3.2 XMLHttpRequest객체의 프로퍼티와 메서드

대표적인 프로퍼티와 메서드를 알아보자.

#### XMLHttpRequest 객체의 프로토타입 프로퍼티

| 프로토타입 프로퍼티 | 설명                                                         |
| ------------------- | ------------------------------------------------------------ |
| **readyState**      | HTTP요청의 현재 상태를 나타내는 정수, 다음과 같은 XMLHttpRequest의 정적 프로퍼티를 값으로 갖는다.<br/>UNSET : 0<br/>OPENED : 1<br/>HEADERS_RECEIVED : 2<br/>LOADING : 3<br/>DONE : 4 |
| **status**          | HTTP요청에 대한 응답 상태 - HTTP 상태 코드                   |
| **statusText**      | HTTP요청에 대한 응답 메세지                                  |
| **responseType**    | HTTP 응답 타입<br/>ex) document, json, text, blob, arraybuffer |
| **response**        | HTTP요청에 대한 응답 몸체(response body). responseType에 따라 타입이다르다. |
| responseText        | 서버가 전송한 HTTP 요청에 대한 응답 문자열                   |

<br/>

#### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

| 이벤트 핸들러 프로퍼티 | 설명                                                         |
| ---------------------- | ------------------------------------------------------------ |
| **onreadystatechange** | readyState 프로퍼티 값이 변경되는 경우                       |
| onloadstart            | HTTP 요청에 대한 응답을 받기 시작한 경우                     |
| onprogress             | HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생            |
| onabort                | abort메서드에 의해 HTTP요청이 중단된 경우                    |
| **onerror**            | HTTP 요청에 에러가 발생한 경우                               |
| **onload**             | HTTP 요청이 성공적으로 완료한 경우                           |
| ontimeout              | HTTP 요청 시간이 초과한 경우                                 |
| onloadend              | HTTP 요청이 완료한 경우, HTTP 요청이 성공 또는 실패하면 발생 |

<br/>

#### XMLHttpRequest 객체의 메서드

| 메서드               | 설명                                     |
| -------------------- | ---------------------------------------- |
| **open**             | HTTP 요청 초기화                         |
| **send**             | HTTP 요청 전송                           |
| **abort**            | 이미 전송된 HTTP 요청 중단               |
| **setRequestHeader** | 특정 HTTP 요청 헤더의 값을 설정          |
| getResponseHeader    | 특정 HTTP 요청 헤더의 값을 문자열로 변경 |

<BR/>

#### XMLHttpRequest 객체의 정적 프로퍼티

| 정적 프로퍼티    | 값   | 설명                                  |
| ---------------- | ---- | ------------------------------------- |
| UUNSENT          | 0    | open 메서드 호출 이전                 |
| OPENED           | 1    | open 메서드 호출 이후                 |
| HEADERS_RECEIVED | 2    | send 메서드 호출 이후                 |
| LOADING          | 3    | 서버 응답 중(응답 데이터 미완성 상태) |
| **DONE**         | 4    | 서버 응답 완료                        |

<br/>

### 43.3.3 HTTP 요청 전송

HTTP요청을 전송하는 경우 다음 순서를 따른다.

1. XMLHttpRequest.prototype.open 메서드로 HTTP요청을 초기화한다.
2. 필요에 따라 XMLHttpReqeust.prototype.setRequestHeader메서드로 특정 HTTP요청의 헤더 값을 설정한다.
3. XMLHttpRequest.prototype.send메서드로 HTTP요청을 전송한다.

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

#### XMLHttpRequest.prototype.open

open메서드는 서버에 전송할 HTTP 요청을 초기화한다.

```js
xhr.open(method, url[, async])
```

* **method**
  * HTTP요청 메서드 (GET, POST, PUT, DELETE)
* **url**
  * HTTP요청을 전송할 URL
* async
  * 비동기 요청 여부, 기본값은 true이며, 비동기 방식으로 동작함.

#### XMLHttpRequest.prototype.send

send메서드는 open메서드로 초기화된 HTTP 요청을 서버에 전송한다. 기본적으로 서버로 전송하는 데이터는 HET, POST 요청 메서드에 따라 전송 방식에 차이가 있다.

* GET 요청 메서드의 경우 데이터를 URL의 일부분인 쿼리 문자여롤 서버에 전송한다.
* POST 요청 메서드의 경우 데이터(페이로드)를 요청 몸체에 담아 전송한다.

페이로드가 객체인 경우 반드시 `JSON.stringify`로 반드시 직렬화를 한 후에 전달해야한다.

**❗ HTTP요청 메서드가 GET인 경우 send메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.**

#### XMLHttpRequest.prototype.setRequestHeader

HTTP요청의 헤더값을 설정하며, 반드시 open메서드를 호출한 이후에 호출해야한다.

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('POST', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));
```

accept 헤더를 설정하지 않으면 send메서드가 호출 될떄 Accept 헤더가 */*로 전송된다.

<br/>

### 43.3.4 HTTP 응답 처리

서버가 전송한 응답을 처리하려면 `XMLHttpRequest객체`가 발생시키는 이벤트를캐치해야 한다. 

`XMLHttpRequest객체`는 `onreadystatechange`, `onload`, `onerror`같은 이벤트 핸들러 프로퍼티를 갖는다. 이벤트 핸들러 프로퍼티 중에서 HTTP요청의 현재 상태를 나타내는 readySTate프로퍼티 값이 변경된 경우 발생하는 readystatechange이벤트를 캐치하여 다음 과같이 HTTP응답을 처리할 수 있다.

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될 때마다 발생한다.
xhr.onreadystatechange = () => {
  // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
  // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 상태다.
  // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

readystatechange대신 laod이벤트를 캐치해도 된다. load는 HTTP요청이 성공적으로 완ㅅ료된 경우 발생하기 때문에 `xhr.readyState`가 `XMLHttpReqeust.DONE`인지 확인할 필요가 없다.

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다.
xhr.onload = () => {
  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

