# 🐳 React v16.2.0

날짜 : 2017.11,28

## 🌏 React

* React에서 `Fragment`를 export에 추가.
* `React.Children`유틸리티들에서 실험적인 Call/Return 타입 지원

## 🌏 React DOM

* Fix
  * radios의 다중 목록을 사용할 때 여러 라디오버튼들이 체크되지 않는 문제 수정
  * 경우에 따라 라디오버튼이 `onChange`  Event를 수신하지 못하는 문제 수정

## 🌏 React Test Renderer

* `componentWillMount`에서 호출될 때 `setState()`콜백이 너무 일찍 실행되는 문제 수정

## 🌏 React Reconciler

* custom renderer에 유용한 유틸리티들을 사용해 `react-reconciler/reflection`을 expose

## 🌏Internal Changes

* 공개 API에 대해 많은 테스트가 다시 작성됨. 

<br/><br/>

# 🐳 React v16.2.1

날짜 : 2018.08.01

16.1.2와 동일한 변경.

## 🌏 React DOM Server

* 공격자가 속성이름을 control할 때 잠재적인 XSS취약점을 수정.
