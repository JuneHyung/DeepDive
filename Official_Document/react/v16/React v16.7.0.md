# 🐳 React v16.7.0

날짜 : 2018.12.19

## 🌏 React DOM

* 지연로드된 많은 컴포넌트에 대한 `React.lazy`의 성능을 수정
* 메모리 누수를 방지하기위해 마운트 해제 시 필드를 clear
* `react-dom/server@16.6`과 `react@<16.6`을 mixing할때 SSR 및 context관련 버그를 수정
* profiling mode의 성능 회귀를 수정

## 🌏 Schedule (Experimental)

* window대신 MessageChannel에 게시.
* 직렬화 오버헤드를 줄임.
* 테스트환경에서 `setTimeout`에 대한 대체를 수정
* 디버깅을 위한 메서드를 추가

<br/><br/>
