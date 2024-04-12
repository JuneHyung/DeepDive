# 🐳 React v16.10.0

날짜 : 2019.09.27

## 🌏 React DOM

* hook update가 memorize되지 않는 경우를 수정.
* 업데이트 중에 hydrate가 잘못 공급되지 않도록 언제 hydrate를 하는지 판단하기 위한 경험적인 방법을 수정
* 메모리를 절야갛기 위해 마운트 해제 중에 추가 fiber필드를 지움.
* Firefox의 필수 텍스트 필드 관련 버그를 수정
* 가능한 경우 인라인 폴리필 대신 `Object.is`를 선호함.
* `Suspense`와 오류 처리를 혼합할 때 발생하는 버그 수정

## 🌏 Scheduler (Experimental)

* 내부 데이터 구조를 최소 바이러니 힙으로 전환하여 대기열 성능을 향상시킴.
* `requestAnimationFrame`을 사용하여 프레임 경계에 정렬하려고 시도하는 대신 짧은 간격으로 postMessage 루프를 사용

## 🌏 useSubscription

* mutation이 발생하고 이전 업데이트가 아직 진행 중일 때 tearing issue를 피함.

<br/><br/>

# 🐳 React v16.10.1

날짜 : 2019.09.28

## 🌏 React DOM

* hydration중에 Suspense불일치가 자동으로 진행되도록 허용하여 Next.js 앱의 회귀 문제를 수정

<br/><br/>

# 🐳 React v16.10.2

날짜 : 2019.10.03

## 🌏 React DOM

* 이벤트 플러그인 extractor에서 인수 순서를 복원하여 반응 네이티브 웹의 회귀문제를 수정.

<br/><br/>

