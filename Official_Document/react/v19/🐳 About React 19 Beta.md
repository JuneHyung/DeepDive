# 🐳 About React 19 Beta

[공식 홈페이지 - React 19 Beta](https://react.dev/blog/2024/04/25/react-19)

❗ App Developer는 18.3.0으로 업그레이드하고 React19가 안정될 때 까지 기다려야함.

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