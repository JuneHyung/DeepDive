# 🐳 React v16.14.0

날짜 : 2020.10.14

## 🌏 React 

* 새로운 JSX 변환에 대한 지원 추가

> new Transform
>
> React17릴리스와 함께 JSX변환을 몇가지 개선. -> JSX변환의 새로운 재작성 버전을 제공하기위해 Babel과 협력<br/>새로운 변환으로 업그레이드하는 것은 선택사항임.
>
> **이점**
>
> * React를 가져오지 않고도 JSX사용 가능
> * bundle 크기가 약간 향상 될 수 있다.
> * React를 배우는 데 필요한 개념의 수를 줄이는 향후 개선을 가능하게 함.
>
> 이전 호출 방법
>
> ```jsx
> import React from 'react';
> 
> function App() {
>   return <h1>Hello World</h1>;
> }
> ```
>
> 이전 호출 변환
>
> ```jsx
> import React from 'react';
> 
> function App() {
>   return React.createElement('h1', null, 'Hello world');
> }
> ```
>
> <br/>
>
> 새로운 호출 방법 (**import 구문이 없어짐!**)
>
> ```jsx
> function App(){
>   return <h1>Hello World</h1>
> }
> ```
>
> 새로운 변환
>
> ```jsx
> // Inserted by a compiler (don't import it yourself!)
> import {jsx as _jsx} from 'react/jsx-runtime';
> 
> function App() {
>   return _jsx('h1', { children: 'Hello world' });
> }
> ```
>
> <BR/>
>
> 📘 [공식문서 - new jsx transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
