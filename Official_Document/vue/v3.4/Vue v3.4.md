# 🐳 Vue v3.4.1

날짜 : 2023-12-30

## 🌏 Bug Fixes

* **compat:** COMPILER_FILTERS기능의 올바른 enum value ([#9875](https://github.com/vuejs/core/issues/9875)) ([77d33e2](https://github.com/vuejs/core/commit/77d33e263cf19983caf4e5c53a0eb0bee374843c))
* **defineModel:** 항상 빈 객체에 대한 기본 수정자 ([9bc3c7e](https://github.com/vuejs/core/commit/9bc3c7e29cf15f5ca96703542d10cfd786a3fc55)), closes [#9945](https://github.com/vuejs/core/issues/9945)
* **defineModel:** prop만 있고 리스너가 전달되지 않은 경우 local mutation을 지원 ([97ce041](https://github.com/vuejs/core/commit/97ce041910b6ca4bef10f939493d6b5a06ea5b07))
* **types:** defineModel watch type error 수정 ([#9942](https://github.com/vuejs/core/issues/9942)) ([4af8583](https://github.com/vuejs/core/commit/4af85835f7e593a7dffa7dc7e99f14877eb70fd1)), closes [#9939](https://github.com/vuejs/core/issues/9939)

## 🌏 Features

* **compiler-sfc:** sfc를 구문 분석할 때 템플릿 파싱 옵션 전달 지원 ([6fab855](https://github.com/vuejs/core/commit/6fab8551e4aeef4610987640de8b435b1ae321bb)) (necessary to fix [vitejs/vite-plugin-vue#322](https://github.com/vitejs/vite-plugin-vue/issues/322))

<br/><br/>

# 🐳 Vue v3.4.2

날짜 : 2023-12-30

## 🌏 Bug Fixes

* **compiler-sfc:** dot / namespace 컴포넌트 사용에 대한 개발 회귀(dev regression) 수정([dce99c1](https://github.com/vuejs/core/commit/dce99c12df981ca45a4d848c37ba8b16496025f0)), closes [#9947](https://github.com/vuejs/core/issues/9947)
* **runtime-core:** support deep: watch가 반응할 때 false ([#9928](https://github.com/vuejs/core/issues/9928)) ([4f703d1](https://github.com/vuejs/core/commit/4f703d120d76d711084346f73ea295c73e6ef6b6)), closes [#9916](https://github.com/vuejs/core/issues/9916)
* **ssr:** transition-group내부 slot outlet에 대한 hydration 오류 수정 ([#9937](https://github.com/vuejs/core/issues/9937)) ([6cb00ed](https://github.com/vuejs/core/commit/6cb00ed0f9b64428ec18fada0f68467d6a813fde)), closes [#9933](https://github.com/vuejs/core/issues/9933)<br/>(원문 : fix hydration error for "slot outlet" inside transition-group )

<br/><br/>

# 🐳 Vue v3.4.3

날짜 : 2023-12-30

## 🌏 Bug Fixes

* **compiler-sfc:** 캐시 키의 SFC 구문 분석 옵션을 존중함. ([b8d58ec](https://github.com/vuejs/core/commit/b8d58ec4f42cbeb9443bf06138add46158db9af0))

<br/><br/>

# 🐳 Vue v3.4.4

날짜 : 2024-01-03

## 🌏 Bug Fixes

* **compiler-sfc:** scss 소스맵 회귀 수정 ([71d3121](https://github.com/vuejs/core/commit/71d3121b72c449351e718ee1539bdfa35b68bb32)), closes [#9970](https://github.com/vuejs/core/issues/9970) [#9969](https://github.com/vuejs/core/issues/9969)
* **compiler-sfc:** 소비된(consumed) AST를 re-parsing할 때 compielrOptions을 사용 ([d94d8d4](https://github.com/vuejs/core/commit/d94d8d4bffd1daf171a655b292745ffc3e63052d))
* **defineModel:** kebab-case/camelCase 불일치를 지원([#9950](https://github.com/vuejs/core/issues/9950)) ([10ccb9b](https://github.com/vuejs/core/commit/10ccb9bfa0f5f3016207fc32b9611bab98e6f090))
* **runtime-core:** default id와의 충돌을 방지하려면 susepnseId를 올바르게 할당하세요. ([#9966](https://github.com/vuejs/core/issues/9966)) ([0648804](https://github.com/vuejs/core/commit/06488047c184dae3070d0008379716690edceb46)), closes [#9944](https://github.com/vuejs/core/issues/9944)
* **ssr:** transition-group slot content를 fragment로 렌더링하지 마세요. ([#9961](https://github.com/vuejs/core/issues/9961)) ([0160264](https://github.com/vuejs/core/commit/0160264d677478ee928e8e851f39a9e94f97e337)), closes [#9933](https://github.com/vuejs/core/issues/9933)
* **watch:** `watchEffect`의 getter에서 인스턴스가 마운트되지 않은 단락을 제거([#9948](https://github.com/vuejs/core/issues/9948)) ([f300a40](https://github.com/vuejs/core/commit/f300a4001ec40cadef2520267eb5841ab48cf005))
* **watch:** shallow reactive object를 관찰할 때 watch 동작을 되돌림. ([a9f781a](https://github.com/vuejs/core/commit/a9f781a92cbc7de7b25c9e3d5b1295ca99eb6d86)), closes [#9965](https://github.com/vuejs/core/issues/9965)

## 🌏 Performance Improvements

* **watch:** reactive source에 대한 이중 통과(traverse) 방지([24d77c2](https://github.com/vuejs/core/commit/24d77c25ce5d5356adb5367beef1d23e6e340b35))

<br/><br/>

# 🐳 Vue v3.4.5

날짜 : 2024-01-04

## 🌏 Bug Fixes

* **compiler-sfc:**  defineModel변환 옵션 및 props 구조 해제의 공동 사용 수정([b20350d](https://github.com/vuejs/core/commit/b20350ded562d27e5901f308d0bc13344f840c4a)), closes [#9972](https://github.com/vuejs/core/issues/9972)
* **compiler-sfc:** 클래스 인스턴스화에 대한 SFC 템플릿 unref 재작성을 수정 ([ae60a91](https://github.com/vuejs/core/commit/ae60a91cc23424493071ad9088782763eb1e8ff7)), closes [#6483](https://github.com/vuejs/core/issues/6483) [#6491](https://github.com/vuejs/core/issues/6491)
* **compiler-ssr:** AST 재사용으로 인한 노드 복제 edge case 수정 ([#9983](https://github.com/vuejs/core/issues/9983)) ([7dbdb3e](https://github.com/vuejs/core/commit/7dbdb3edf0ab648965331ca42f069387c97a1c8a)), closes [#9981](https://github.com/vuejs/core/issues/9981)
* **watch:** 수동으로 중지할 떄 범위에서 watcher effect 정리(cleanup) ([#9978](https://github.com/vuejs/core/issues/9978)) ([d2d8955](https://github.com/vuejs/core/commit/d2d89551bb06dc05cb7ae0496b8f345ae0de78ed))

<br/><br/>

# 🐳 Vue v3.4.6

날짜 : 2024-01-08

## 🌏 Bug Fixes

* **build:** revert "build: add production/development export conditions ([#9977](https://github.com/vuejs/core/issues/9977))" ([7bd4e90](https://github.com/vuejs/core/commit/7bd4e90506547c42234165776b01793abd37b148)), closes [#10012](https://github.com/vuejs/core/issues/10012) [#10020](https://github.com/vuejs/core/issues/10020)
* 중첩된 앱 마운트에서 Post Watcher 실행 타이밍 수정 ([3c3561e](https://github.com/vuejs/core/commit/3c3561e7203091f49d57f1da6d822c91e462bc46)), closes [#10005](https://github.com/vuejs/core/issues/10005)
* **hydration:** 순서가 다른 스타일에 대한 hydration 불일치 경고 방지 ([#10011](https://github.com/vuejs/core/issues/10011)) ([2701355](https://github.com/vuejs/core/commit/2701355e8eb07ab664e398d9fc05d6c4e2e9b20e)), closes [#10000](https://github.com/vuejs/core/issues/10000) [#10006](https://github.com/vuejs/core/issues/10006)
* **runtime-core:** null children이 있는 fragment 처리 ([#10010](https://github.com/vuejs/core/issues/10010)) ([3bf34b7](https://github.com/vuejs/core/commit/3bf34b767e4dd3cf6a974301ecf0363ae4dda4ec)), closes [#10007](https://github.com/vuejs/core/issues/10007)
* **scheduler:** 중첩된 postFlushCbs정렬 ([d9162df](https://github.com/vuejs/core/commit/d9162dfc2ee0c3a369fb9bf32ff413e74761bee6)), closes [#10003](https://github.com/vuejs/core/issues/10003)
* **suspense:** out-in전환으로 Suspense를 위한 anchor 수정 ([#9999](https://github.com/vuejs/core/issues/9999)) ([a3fbf21](https://github.com/vuejs/core/commit/a3fbf2132b0cd3655e969e290548c8fabc08fd33)), closes [#9996](https://github.com/vuejs/core/issues/9996)
* **types:** text area값에 `null`type 허용  ([#9997](https://github.com/vuejs/core/issues/9997)) ([c379bc2](https://github.com/vuejs/core/commit/c379bc29efc70d6ac5840de10c357ee3dad998c0)), closes [#9904](https://github.com/vuejs/core/issues/9904)

<br/><br/>

# 🐳 Vue v3.4.7

날짜 : 2024-01-09

## 🌏 Bug Fixes

* **parser:** SFC root `<template>`태그에 대한 호환모드 확인 건너뛰기 ([#10034](https://github.com/vuejs/core/issues/10034)) ([923d560](https://github.com/vuejs/core/commit/923d560d0b6713144671809b6dfeb1e2da503b1f))
* **types:** `h`에 대한 functional 컴포넌트 수정 ([#9991](https://github.com/vuejs/core/issues/9991)) ([438a74a](https://github.com/vuejs/core/commit/438a74aad840183286fbdb488178510f37218a73))

## 🌏 Reverts

* "dx(computed): computed 안에 getCurrentInstance의 잘못된 사용을 경고." ([2fd3905](https://github.com/vuejs/core/commit/2fd39057386644c8bfee426c60a51f2b07a79b09))

<br/><br/>

# 🐳 Vue v3.4.8

날짜 : 2024-01-10

## 🌏 Bug Fixes

* **hydration:** class 및 style hytdration 불일치 메세지 수정 ([5af3987](https://github.com/vuejs/core/commit/5af398729168481c3bee741b4f36fa4f375e0f4a)), closes [#10067](https://github.com/vuejs/core/issues/10067)
* **hydration:** boolean 속성에 대한 속성 hydration 불일치 검사 개선 ([972face](https://github.com/vuejs/core/commit/972facee0d892a1b6d9d4ad1da5da9306ed45c3f)), closes [#10057](https://github.com/vuejs/core/issues/10057) [#10060](https://github.com/vuejs/core/issues/10060)
* **suspense:** edge케이스를 해결하기 전에 더 많은 Suspense패치 수정 ([70ad4ca](https://github.com/vuejs/core/commit/70ad4caad7d19938f8ccf1ede3228a81254dd4bf)), closes [#10017](https://github.com/vuejs/core/issues/10017)

<br/><br/>







