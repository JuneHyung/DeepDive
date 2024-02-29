# 🐳 React v17.0.0

날짜 : 2020.10.20

## 🌏 React

* [새로운 JSX 변환](https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154-https-githubcom-babel-babel-pull-11154)을 위해 `react/jsx-runtime`과 `react/jsx-dev-runtime`을 추가.
* native 오류 프레임에서 컴포넌트 스택 빌드 ([issue](https://github.com/facebook/react/pull/18561))
* 향상된 스택을 위해 컨텍스트에서 **displayName을 지정**할 수 있다.
* UMD 번들에서 `use strict`가 누출되는 것을 방지
* 리디렉션에 `fb.me`사용 중지.

## 🌏 React DOM

* 

## 🌏 React DOM Server

* 서버 렌더러를 위한 `useMemo`와 일치하는 `useCallback behavior` 를 만듬. 
* 함수 컴포넌트가 throw될 때 상태 누출을 수정.

## 🌏React Test Renderer

* `findByType` 오류메세지 개선

## 🌏 Concurrent Mode (동시모드, Experimental)

* 

<br/><br/>

# 🐳 React v17.0.1

날짜 : 2020.10.22

## 🌏 React DOM

*  IE11과 충돌되던 부분 수정. ([issue](https://github.com/facebook/react/pull/20071))
   *  폴리필 없이 IE11에서 지원되지 않는 `Array.fill()`로 인한 문제.


<br/><br/>

# 🐳 React v17.0.2

날짜 : 2021.03.22

## 🌏 React DOM

*  `SharedArrayBuffer` **cross-origin isolation** 경고 해결을 위해 **사용하지 않는 Dependecy삭제**

> Cross-Origin Isolation
>
> 페이지들 사이에서 자원과 데이터를 공유하는 것을 제한하는 기능으로<br/> 웹 애플리케이션의 보안을 강화하고 공격자들이 악용할 수 없도록 하는데 목적
>
> 출처 간 격리된 페이지에서만 사용 가능한 것은, 해당 페이지와 관련된 자원과 데이터만 페이지 안에서 사용 가능하며, 다른 출처에서 온 자원과 데이터는 사용할 수 없도록 하는 것을 의미

> SharedArrayBuffer
>
> SharedArrayBuffer객체는 제네릭, 고정된 길이의 원시 바이너리 데이터 버퍼를 표현하는데 사용된다.<br/>ArrayBuffer객체와 유사하지만, 공유된 메모리상의 뷰를 생성하는데 사용될 수 있고, 분리될 수 없다.
>
>  여러 개의 워커에서 공유하는 메모리 공간을 제공한다. 이를 사용하면 다중 코어 프로세서를 활용하는 멀티 스레딩 프로그램을 구현할 수 있습니다.

### 참고

* [Velog - SharedArrayBuffer](https://velog.io/@tnrud4685/에러노트CORS-오류-해결2...feat.-SharedArrayBuffer)

<br/><br/>
