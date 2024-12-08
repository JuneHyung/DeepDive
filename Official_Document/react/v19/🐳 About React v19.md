# 🐳 React 19

~~[공식 홈페이지 - React 19 Beta](https://react.dev/blog/2024/04/25/react-19)~~

~~❗ App Developer는 18.3.0으로 업그레이드하고 React19가 안정될 때 까지 기다려야함.~~

[공식 홈페이지 - React 19](https://react.dev/blog/2024/12/05/react-19)

2024.12.05 React19가 안정화 됨.

**4월 글 이후로 추가된 내용**

* **Pre-warming for suspended trees**: see [Improvements to Suspense](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#improvements-to-suspense).
* **React DOM static APIs**

<br/><br/>

# 🐳 What's new in React 19

## 🌏 Actions

### 👉 useTransition

React 앱의 일반적인 사용 사례는 데이터 변형을 수행한 다음 이에 대한 응답으로 상태를 업데이트 한다. 예를 들어 사용자가 이름을 변경하기 위해 양식을 제출하면, API요청을 한 다음 응답을 처리 합니다. 과거에는 `pending state`, `errors`, `optimistic updates`, `sequnetial request`를 수동으로 처리해야 했습니다.

```tsx
// Before Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    } 
    redirect("/path");
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

React19에서는 `pending state`, `errors`, `forms`, `optimistic updates`를 자동으로 처리하기 위해 transition에서 비동기 함수를 사용하는 지원을 추가함.

```tsx
// Using pending state from Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      } 
      redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

* `isPending`상태를 true로 설정하고, 비동기 요청을 만들고, 모든 transition후에 isPending을 false로 전환함.
* 데이터가 변경되는 동안 현재 UI의 반응성과 대화형을 유지할 수 있다.

<br/>

### 👉 useOptimistc & useActionState

optimistic update를 관리하기 위한 `useOptimisc`과 Action의 일반적인 사례를 처리하기 위한 `React.useActionState`를 도입. react-dom에서는 양식을 자동으로 관리하기 위한 `<form>` Actions를 추가하고 양식의 Actions에 대한 일반적인 사례를 지원하기 위해 `useFormStatus`를 추가하고 있음.

```tsx
// Using <form> Actions and useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

<br/>

## 🌏 More Detail

### 👉 [New Hook ] - `useActionState`

Actions의 일반적인 사례를 더 쉽게 만들기 위해 `useActionState`라는 새로운 hook 추가

```tsx
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName);
    if (error) {
      // You can return any result of the action.
      // Here, we return only the error.
      return error;
    }

    // handle success
    return null;
  },
  null,
);
```

`useActionState`는 `함수("Action")`를 허용하고 호출할 래핑된 Action을 반환함.

래핑된 Action이 호출되면 `useActionState`는 Action의 마지막 결과를 데이터로 반환하고, Action의 pending state를 pending으로 반환함.

> `React.useActionState`는 이전에 Canary 릴리즈에서 `ReactDOM.useFormState`라고 불렸지만 이름을 바꾸고 `useFormState`를 더이상 사용하지 않습니다.
>
> 📘 참고
>
> *  [#28491](https://github.com/facebook/react/pull/28491)
> * [`useActionState`](https://react.dev/reference/react/useActionState).

<br/>

### 👉 [Actions] - ReactDOM: `<form> ` Actions

Actions는 React19의 새로운 React-dom용 `<form>`기능과도 통합되었습니다. Actions와 함께 양식을 자동으로 제출하기 위해 `<form>`, `<input>`및 `<button>`요소의 action및 formAction props로 함수를 전달하는 지원을 추가.

```tsx
<form action={actionFunction}>
```

`<form>`Action이 성공하면 React는 제어되지 않는 컴포넌트의 양식을 자동으로 재설정합니다.<br/>`<form>`을 수동으로 재설정 해야하는 경우 새로운 requestFormReset React DOM API를 호출할 수 있습니다.

<br/>

### 👉 [New hook] - ReactDOM: `useFormStatus`

Design시스템에서는 props를 컴포넌트로 드릴다운하지 않고, 자신이 속한 `<form>`에 대한 정보에 액세스 해야 하는 디자인 구성요소를 작성하는 것이 일반적.

이는 Context를 통해 수행할 수 있지만 일반적인 경우를 더 쉽게 만들기 위해 새로운 hook `useFormStatus`를 추가.

```tsx
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```

`useFormStatus`는 마치 form이 Context Provider인것 처럼 상위 `<form>`의 상태를 읽음.

<br/>

### 👉 [New hook] - `useOptimistc`

데이터 변형을 수행할 때 또 다른 일반적인 UI패턴은 **비동기 요청이 진행되는 동안 최종 상태를 optimistically로 표시**하는 것. (성공했다 생각하고 먼저 표시하는 optimistc update를 말함.)

React19에서는 이를 더 쉽게 만들기 위해 useOptimistc이라는 새로운 hook을 추가

```tsx
function ChangeName({currentName, onUpdateName}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  );
}
```

`useOptimistc`hook은 `updateName`요청이 진행되는 동안 즉시 optimiscName을 렌더링함.

업데이트가 완료되거나 오류가 발생하면 React는 자동으로 currentName값으로 다시 전환함.

<br/>

### 👉 [New API] - `use`

React 19에서는 render중에 리소스를 읽는 새로운 API를 도입함.

예를 들어, Promise를 사용하여 읽을 수 있으며 React는 Promise가 해결될 때 까지 일시 중단됨.

```tsx
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use` will suspend until the promise resolves.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // When `use` suspends in Comments,
  // this Suspense boundary will be shown.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

> ❗ Note
>
> `use`는 렌더링 시 생성된 Promise를 지원하지 않습니다.
>
> 렌더링에서 생성된 Promise를 사용하도록 전달하려고 하면 React는 경고합니다.<br/>`A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.`
>
> 문제를 해결하려면 Promise 캐싱을 지원하는 Suspense기반 라이브러리 또는 Framework에서 약속을 전달해야 함. 앞으로 렌더링 시 Promise를 더 쉽게 캐시할 수 있는 기능을 출시할 계획.

또한 사용 시 컨텍스트틀 읽을 수 있으므로 조기 반환 이후와 같이 조건부로 컨텍스트를 읽을 수 있음.

```tsx
import {use} from 'react';
import ThemeContext from './ThemeContext'

function Heading({children}) {
  if (children == null) {
    return null;
  }
  
  // This would not work with useContext
  // because of the early return.
  const theme = use(ThemeContext);
  return (
    <h1 style={{color: theme.color}}>
      {children}
    </h1>
  );
}
```

`use`API는 hook와 유사하게 렌더링에서만 호출할 수 있습니다. 

hook와 달리 `use`는 조건부로 호출할 수 있습니다.<br/>앞으로는 렌더링 시 리소스를 소비하는 더 많은 방법을 지원할 계획.

<br/><br/>

## 🌏 New React DOM Static APIs

정적 사이트 생성을 위해 `react-dom/static`에 2가지 새로운 API를 추가했습니다.

* [**prerender**](https://react.dev/reference/react-dom/static/prerender)
* [**prerenderToNodeSteram**](https://react.dev/reference/react-dom/static/prerenderToNodeStream)

이 새로운 API들은 정적 HTML생성을 위해 데이터가 로드 되기를 기다리는 방식으로 `renderToString`을 개선합니다.  Node.js Stream 및 Web Stream 환경에서 작동하도록 설계되었습니다.

예를 들어 Web Stream환경에서 prerender를 사용해 React 트리를 정적 HTML로 미리 렌더링할 수 있습니다.

```jsx
import { prerender } from 'react-dom/static';

async function handler(request) {
  const {prelude} = await prerender(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(prelude, {
    headers: { 'content-type': 'text/html' },
  });
}
```

prerender API는 정적 HTML 스트림을 반환하기 전에 모든 데이터가 로드될 때까지 기다립니다.

Stream은 문자열로 변환되거나 스트리밍 응답과 함께 전송될 수 있습니다.

[기존 ReactDOM 서버 렌더링 API](https://react.dev/reference/react-dom/server)에서 지원하는 스트리밍 콘텐츠를 로드할 때 지원하지 않습니다

📘 더 자세한 내용은 여기서! : [React DOM Static APIs](https://react.dev/reference/react-dom/static).

> renderToString
>
> React에서 SSR을 수행할 때, React트리를 HTML 문자열로 렌더링할 때 사용.<br/>이를 이용해 React컴포넌트를 서버에서 미리 렌더링한 뒤 클라이언트로 전송할 수 있다.
>
> [공식문서 - renderToString](https://react.dev/reference/react-dom/server/renderToString)



## 🌏 React Server Components

### 👉 Server Components

`Server Component`는 클라이언트 응용 프로그램 또는 SSR 서버와 별도의 환경에서 번들로 묶기 전에 ㅋ컴포넌트를 미리 렌더링할 수 있는 새로운 옵션 입니다.

이 별도의 환경은 React Server Components의 "server"입니다 `Server Component`는 CI서버에서 빌드 시 한 번 실행되거나 웹 서버를 사용하여 각 요청에 대해 실행될 수 있음.

React 19에는 Canary 채널에 포함된 모든 React Server Component기능이 포함되어 있습니다. <br/>❓ 이는 Server Component와 함께 제공되는 라이브러리가 이제 전체 스택 React 아키텍처를 지원하는 프레임워크에서 사용하기 위해 react-server export 조건을 사용하여 peer dependency로 React19를 대상으로 할 수 있음을 의미.

> ❗ 어떻게 서버 컴포넌트 build를 지원하는가?
>
> React19의 React 서버 컴포넌트는 안정적이고 주요 버전 간에 중단되지 않지만, React 서버 컴포넌트 번들러 또는 프레임워크를 구현하는 데 사용되는 기본 API는 semver를 따르지 않으며, React 19.x에서 부 버전간에 중단될 수 있다.
>
> React 서버 컴포넌트를 번들러 또는 프레임워크로 지원하려면 특정 React 버전에 고정하거나 Cananry 릴리즈를 사용하는것이 좋습니다. 앞으로 React 서버 컴포넌트를 구현하는 데 사용되는 API를 안정화하기 위해 번들러 및 프레임워크와 계속 협력할 것입니다.

<br/>

### 👉 Server Actions

Server Action을 사용하면 클라이언트 컴포넌트가 서버에서 실행되는 비동기(async) function을 호출할 수 있음.

Server Action이 `"use server"`지시어로 정의되면 프렝미워크는 자동으로 서버 기능에 대한 참조를 생성하고 해당 참조를 클라이언트 컴포넌트에 전달함. 

해당 함수가 클라이언트에서 호출되면 React는 서버에 함수 실행 요청을 보내고 결과를 반환함.

❗ Server Actions는 서버 컴포넌트에서 생성되어 클라이언트 컴포넌트에 props로 전달되거나 클라이언트 컴포넌트에서 가져와 사용할 수 있음.

<br/><br/>

# 🐳 Improvements in React 19

## 🌏 `ref` as a prop

함수 컴포넌트에 대한 props로 `ref`에 액세스 가능

```tsx
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}

//...
<MyInput ref={ref} />
```

새로운 함수 컴포넌트에는 더 이상 `forwardRef`가 필요하지 않으며, 새로운 `ref` prop을 사용하도록 컴포넌트를 자동으로 업데이트하는 codemod를 게시할 예정.<br/>❗ `forwardRef`는 향후 없어질 예정

❗ 클래스에 전달된 ref는 컴포넌트 인스턴스를 참조하므로 prop으로 전달되지 않음.

<br/><br/>

## 🌏 hydration 에러에 대한 차이점

react-dom의 hydration error에 대한 오류 보고를 개선함.<br/>예를들어 mismatch에 대한 정보 없이 DEV에 여러 오류를 기록하는 대신에

```console
Warning: Text content did not match. Server: “Server” Client: “Client”
  at span
  at App
Warning: An error occurred during hydration. The server HTML was replaced with client content in <div>.
Warning: Text content did not match. Server: “Server” Client: “Client”
  at span
  at App
Warning: An error occurred during hydration. The server HTML was replaced with client content in <div>.
Uncaught Error: Text content does not match server-rendered HTML.
  at checkForUnmatchedText
```

mismatch가 포함된 단일 메세지를 기록함.

```console
Uncaught Error: Hydration failed because the server rendered HTML didn’t match the client. As a result this tree will be regenerated on the client. This can happen if an SSR-ed Client Component used:

- A server/client branch if (typeof window !== 'undefined').
- Variable input such as Date.now() or Math.random() which changes each time it’s called.
- Date formatting in a user’s locale which doesn’t match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch 

  <App>
    <span>
+    Client
-    Server

  at throwOnHydrationMismatch
  …
```

<br/><br/>

## 🌏 `<Context>` as a provider

React19에서는 `<Context.Provider>`대신에 `<Context>`를 Provider로 렌더링 할 수 있습니다.

```tsx
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}
```

새로운 Context provider는 `<Context>`를 사용할 수 있으며 기존 공급자를 변환하기 위해 codemod를 게시할 예정.

❗ 향후 버전에서는 `<Context.Provider>`가 없어질 예정

<br/><br/>

## 🌏 Cleanup functions for refs

ref callbacks에서 cleanup function반환을 지원함.

```tsx
<input
  ref={(ref) => {
    // ref created

    // NEW: return a cleanup function to reset
    // the ref when element is removed from DOM.
    return () => {
      // ref cleanup
    };
  }}
/>
```

컴포넌트가 마운트 해제되면 React는 ref콜백에서 반환된 cleanup 함수를 호출함. 이는 DOM refs, 클래스 컴포넌트에 대한 refs 및 `useImperattiveHandle`에 대해 작동함.

> ❗ Note
>
> 이전에는 React가 컴포넌트를 unmount할 때 null을 사용하여 ref함수를 호출했습니다.<br/>만약 `ref`가 cleanup function을 반환하면 React는 이제 이 단계를 건너뜁니다.
>
> 향후 버전에서는 컴포넌트를 unmount할 때 null을 사용하여 ref호출을 더이상 사용하지 않을 것입니다.

<br/>

ref cleanup function의 도입으로 인해 ref콜백에서 다른 항목을 반환하는 것은 이제 Typescirpt에서 거부됩니다.<br/>수정 방법은 일반적으로 암시적 반환 사용을 중지하는 것입니다.

```tsx
- <div ref={current => (instance = current)} />
+ <div ref={current => {instance = current}} />
```

원래 코드는 HTMLDivElement의 인스턴스를 반환했으며, Typescript는 이것이 cleanup인지 또는 cleanup함수를 반환하고 싶지 않은지 알 수 없습니다.

[`no-implicit-ref-callback-return`](https://github.com/eps1lon/types-react-codemod/#no-implicit-ref-callback-return)을 사용 하여, 해당 패턴을 코드 수정할 수 있습니다.

<br/><br/>

## 🌏 `useDeferredValue` initial value

`useDeferredValue`에 `initialValue`를  추가할 수 있다.

```tsx
function Search({deferredValue}) {
  // On initial render the value is ''.
  // Then a re-render is scheduled with the deferredValue.
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
```

initialValue가 제공되면 useDeferredValue는 이를 컴포넌트의 초기 렌더링에 대한 값으로 반환하고 반환된 deferredValue를 사용하여 백그라운드에서 다시 렌더링을 예약합니다.

📘 [공식문서 - useDeferredValue](https://react.dev/reference/react/useDeferredValue)

<br/><br/>

## 🌏 Support for Document Metadata

HTML에서 `<title>`, `<link>` 및 `<meta>`와 같은 문서 메타데이터 태그는 문서의 `<head>`섹션에 배치되도록 예약되어 있습니다. 과거 effect에 수동으로 삽입하거나 `react-helmet`같은 라이브러리를 삽입해야 했으며 서버에서 React 애플리케이션을 렌더링할 떄 신중한 처리가 필요했습니다.

React19에서는 기본적으로 컴포넌트의 문서 메타데이터 태그 렌더링에 대한 지원을 추가.

```tsx
function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}
```

렌더링 시에 태그를 확인하고 자동으로 문서의 `<head>` 섹션에 끌어올립니다. 이런 메타데이터 태그를 기본적으로 지원함으로써 클라이언트 전용 앱, 스트리밍 SSR 및 서버 컴포넌트와 함께 작동하도록 할 수 있다.

> ❗ 여전히 메타데이터 라이브러리가 필요할 수 있다.
>
> 간단한 예로, Document Metadata를 태그로 렌더링하는 것이 적합할 수 있지만 라이브러리는 현재 경로를 기반으로 일반 메타데이터를 특정 메타데이터로 재정의하는 것과 같은 보다 강력한 기능을 제공할 수 있습니다. 이런 기능을 사용하면 `react-helmet`같은 프레임워크 및 라이브러리가 메타데이터 태그를 대체하는 대신 더 쉽게 지원할 수 있습니다.

<br/><br/>

## 🌏 Support for stylesheets

컴포넌트 내에서 구성 가능성을 허용하는 스타일시트 기능을 구축하는 것은 어렵기 때문에 사용자는 종속될 수 있는 컴포넌트에서 멀리 떨어진 곳에 모든 스타일을 로드하거나 이런 복잡성을 캡슐화하는 스타일 라이브러리를 사용하는 경우가 많습니다.

React19에서는 이러한 복잡성을 해결하고 스타일시트에 대한 기본 지원을 통해 클라이언트의 동시 렌더링 및 서버의 스트리밍 렌더링에 대한 더욱 심층적인 통합을 제공함. React에 스타일 시트의 우선순위를 알려주면 DOM에서 스타일 시트의 삽입 순서를 관리하고 해당 스타일 규칙에 의존하는 콘텐츠를 제공하기전에 스타일 시트(외부인 경우)가 로드되었는지 확인함.

```tsx
function ComponentOne() {
  return (
    <Suspense fallback="loading...">
      <link rel="stylesheet" href="foo" precedence="default" />
      <link rel="stylesheet" href="bar" precedence="high" />
      <article class="foo-class bar-class">
        {...}
      </article>
    </Suspense>
  )
}

function ComponentTwo() {
  return (
    <div>
      <p>{...}</p>
      <link rel="stylesheet" href="baz" precedence="default" />  <-- will be inserted between foo & bar
    </div>
  )
}
```

서버 측 렌더링 중 React는 `<head>`에 스타일시트를 포함하여 브라우저가 로드될 때 까지 페인트하지 않도록함.

이미 스트리밍을 시작한 후에 스타일시트가 늦게 발견되면 React는 해당 스타일시트에 의존하는 Susepense boundary의 내용을 공개하기 전에 스타일시트가 `<head>`에 삽입되었는지 확인함.

클라이언트 측 렌더링 중 React는 렌더링을 커밋하기 전에 새로 렌더링된 스타일 시트가 로드될 때까지 기다림. 애플리케이션 내 여러 위치에서 이 컴포넌트를 렌더링하는 경우 React는 문서에 스타일 시트를 한 번만 포함함.

```tsx
function App() {
  return <>
    <ComponentOne />
    ...
    <ComponentOne /> // won't lead to a duplicate stylesheet link in the DOM
  </>
}
```

스타일 시트를 수동으로 로드하는데 익숙한 사용자의 경우 이는 해당 스타일시트를 의존하는 컴포넌트와 함께 찾을 수 있는 기회로, 더 나은 로컬 추론(local reasoning)을 가능하게 하고 실제로 의존하는 스타일 시트만 로드하도록 보장하는 더 쉬운 시간을 제공합니다.

스타일 라이브러리 및 번들러와의 스타일 통합도 이 새로운 기능을 채택할 수 있으므로 자신의 스타일시트를 직접 렌더링 하지 않더라도 이 기능을 사용하도록 도구를 업그레이드 하면 여전히 이점을 누릴 수 있습니다.

자세한 내용은 여기서 : [공식문서 - link](https://react.dev/reference/react-dom/components/link) & [공식문서 - `<style>`](https://react.dev/reference/react-dom/components/style)

<br/><br/>

## 🌏 Support for async scripts

HTML에서 일반 스크립트 및 지연된 스크립트가 문서 순서대로 로드되어 이러한 ㅈ오류의 스크립트가 컴포넌트내에서 렌더링된다. 그러나 비동기 스크립트는 임의의 순서로 로드됩니다.

React19에는 스크립트 인스턴스 재배치 및 중복 제거를 관리할 필요 없이 스크립트에 실제로 의존하는 컴포넌트 내부, 컴포넌트 트리의 어느 곳 에서나 렌더링할 수 있도록 하여 비동기 스크립트에 대한 더 나은 지원이 포함되있음.'

```tsx
function MyComponent() {
  return (
    <div>
      <script async={true} src="..." />
      Hello World
    </div>
  )
}

function App() {
  <html>
    <body>
      <MyComponent>
      ...
      <MyComponent> // won't lead to duplicate script in the DOM
    </body>
  </html>
}
```

모든 렌더링 환경에서 비동기 스크립트는 중복 제거되므로 React는 여러 다른 컴포넌트에 의해 렌더링 되더라도 스크립트를 한 번만 로드하고 실행함.

SSR에서 비동기 스크립트는 `<head>`에 포함되며 스타일시트, 글꼴 및 이미지 사전로드와 같은 페인트를 차단하는 보다 중요한 리소스 뒤에 우선순위가 지정됨.

<br/><br/>

## 🌏 Support for preloading resources

초기 문서 로드 및 클라이언트 측 업데이트 중에 가능한 한 빨리 로드해야 할 리소스에 대해 브라우저에 알리면 페이지 성능에 큰 영향을 미칠 수 있습니다.

React19에는 브라우저 리소스를 로드하고 미리 로드하기위한 여러 새로운 API가 포함되어 있어 비효율적인 리소스 로드로 인해 방해받지 않는 훌륭한 경험을 최대한 쉽게 구축할 수 있다.

```tsx
import { prefetchDNS, preconnect, preload, preinit } from 'react-dom'
function MyComponent() {
  preinit('https://.../path/to/some/script.js', {as: 'script' }) // loads and executes this script eagerly
  preload('https://.../path/to/font.woff', { as: 'font' }) // preloads this font
  preload('https://.../path/to/stylesheet.css', { as: 'style' }) // preloads this stylesheet
  prefetchDNS('https://...') // when you may not actually request anything from this host
  preconnect('https://...') // when you will request something but aren't sure what
}
```

```html
<!-- the above would result in the following DOM/HTML -->
<html>
  <head>
    <!-- links/scripts are prioritized by their utility to early loading, not call order -->
    <link rel="prefetch-dns" href="https://...">
    <link rel="preconnect" href="https://...">
    <link rel="preload" as="font" href="https://.../path/to/font.woff">
    <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">
    <script async="" src="https://.../path/to/some/script.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

이러한 API를 사용하면 스타일시트 로드에서 글꼴과 같은 추가 리소스 검색을 이동하여 **초기 페이지 로드를 최적화** 할 수 있다. 또한, 예상 탐색에 사용되는 리소스 목록을 미리 가져온 다음 클릭하거나 마우스를 가져갈 때 해당 리소스를 미리 로드하여 클라이언트 업데이트를 더 빠르게 수행할 수 있습니다.

📘 [공식문서 - Resource Preloading APIs](https://react.dev/reference/react-dom#resource-preloading-apis)

<br/><br/>

## 🌏 third-party scripts and extensions 호환성

third-party script 및 브라우저 확장 기능을 고려해 hydration기능을 개선함.

hydrate할 때 클라이언트에서 렌더링하는 요소가 서버의 HTML에서 찾은 요소와 일치하지 않으면, React는 클라이언트를 강제로 다시 렌더링하여 콘텐츠를 수정함. 이전에는 요소가 third-party script나 브라우저 확장 프로그램에 의해 삽입되면 불일치 오류가 발생하고 클라이언트 렌더링이 발생했음.

React19에서는 `<head>`및 `<body>`의 예상치 못한 태그를 건너뛰어 불일치 오류를 방지함. React가 관련없는 hydration 불일치로 인해 전체 문서를 다시 렌더링해야 하는 경우 third-party script및 브라우저 확장 프로그램에 의해 삽입된 스타일시트를 그대로 둡니다.

<br/><br/>

## 🌏 Better error Reporting

중복을 제거하고 포착된 오류와 포착되지 않은 오류를 처리하기 위한 옵션을 제공하기 위해 React19의 오류 처리를 개선함.

Error Boundary에 의해 포착된 렌더링에 오류가 있는 경우 이전에는 React가 오류를 두 번 발생시킨 후 오류가 발생한 위치에 대한 정보와 함꼐 `console.error`를 호출하였습니다. (원래 오류에 대해 한 번, 자동 복구에 실패한 후 다시 한 번)

기존

```console
Uncaught Error: hit
  at Throws
  at renderWithHooks
  …
Uncaught Error: hit    <-- Duplicate
  at Throws
  at renderWithHooks
  …
The above error occurred in the Throws component:
  at Throws
  at ErrorBoundary
  at App

React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
```

React19에서는 모든 오류 정보가 포함된 단일 오류를 기록함.

```console
Error: hit
  at Throws
  at renderWithHooks
  …

The above error occurred in the Throws component:
  at Throws
  at ErrorBoundary
  at App

React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
  at ErrorBoundary
  at App
```

<br/>

또한 `onRecoverableError`를 보완하기 위해 2가지 새로운 루트 옵션을 추가.

- `onCaughtError`: called when React catches an error in an Error Boundary.
- `onUncaughtError`: called when an error is thrown and not caught by an Error Boundary.
- `onRecoverableError`: called when an error is thrown and automatically recovered.

<br/><br/>

## 🌏 Support for Custom Elements

React19는 Custom Element에 대한 완전한 지원을 추가하고, [Custom Elemetnts EveryWhere](https://custom-elements-everywhere.com/)에 대한 모든 테스트를 통과합니다.

이전 버전에서는 React에서 인식할 수 없는 prop을 속성이 아닌 속성으로 처리했기 때문에 React에서 Custom Elements를 사용하는 것이 어려웠음. React19에서는 다음 전략을 사용해 client및 SSR중에 작동하는 속성에 대한 지원을 추가함.

- **Server Side Rendering**: custom element에 전달된 prop는 해당 유형이 `string`, `number`와 같은 기본 값이거나 값이 `true`인 경우 속성으로 렌더링됨. `object`, `symbol`, `function`또는 값 `false`와 같은 기본 유형이 아닌 prop은 생략됨.
- **Client Side Rendering**: Custom Element 인스턴스의 속성과 일치하는 props는 속성으로 할당되고 그렇지 않으면 속서응로 할당됨.

<br/><br/>

# 🐳 How to Upgrade

[공식문서 - React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)