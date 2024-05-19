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

# 🐳 Vue v3.4.9

날짜 : 2024-01-11

## 🌏 Bug Fixes

* **build:** root scope에서 **FEATURE_PROD_DEVTOOLS** 플래그에 액세스하지 마시오. ([dfd9654](https://github.com/vuejs/core/commit/dfd9654665890d1bc7129f6e3c2faaa5b1f28f72))
* **hydration:** object값이 있는 바인딩에 대해 경고하지 않음. ([dcc68ef](https://github.com/vuejs/core/commit/dcc68ef7d48973abd8dd3178b46e50e3b0785ea4))
* **runtime-dom:** v-show + style 디스플레이 바인딩에 대한 동작 통합 ([#10075](https://github.com/vuejs/core/issues/10075)) ([cd419ae](https://github.com/vuejs/core/commit/cd419aec3cb615eaea8b2324356f38f4c0ff1fcc)), closes [#10074](https://github.com/vuejs/core/issues/10074)
* **suspense:** 상위 서스펜스가 해결되지 않은 경우 중첩된 서스펜스를 이중 patch하지 마세요. ([#10055](https://github.com/vuejs/core/issues/10055)) ([bcda96b](https://github.com/vuejs/core/commit/bcda96b525801eb7a1d397300fb3f2f9b827ddfb)), closes [#8678](https://github.com/vuejs/core/issues/8678)<br/>

# 🐳 Vue v3.4.10

날짜 : 2024-01-11

## 🌏 Bug Fixes

* **hydration:** non-property key의 허위 바인딩에 대해 경고하면 안됨. ([3907c87](https://github.com/vuejs/core/commit/3907c87ce23cc6ef4a739b5a66ddb553e8723114))

<br/><br/>

# 🐳 Vue v3.4.11

날짜 : 2024-01-12

## 🌏 Bug Fixes

* **hydration:** 클라이언트 값이 null이거나 undefined인 경우 mismatch 개선 ([#10086](https://github.com/vuejs/core/issues/10086)) ([08b60f5](https://github.com/vuejs/core/commit/08b60f5d0d5b57fcf3347ef66cbeab472c475a88))
* **reactivity:** 렌더링 function에서 dirty assign을 수정 ([#10091](https://github.com/vuejs/core/issues/10091)) ([8d04205](https://github.com/vuejs/core/commit/8d042050411fdf04d9d1d6c153287164b12e0255)), closes [#10082](https://github.com/vuejs/core/issues/10082)
* **runtime-core:** 중첩된 DEV_ROOT_FRAGMENT에 대한 단일 루트 필터링([#8593](https://github.com/vuejs/core/issues/8593)) ([d35b877](https://github.com/vuejs/core/commit/d35b87725ab3e2bdc86fb5781ab34939f7ec1029)), closes [#5203](https://github.com/vuejs/core/issues/5203) [#8581](https://github.com/vuejs/core/issues/8581) [#10087](https://github.com/vuejs/core/issues/10087)

<br/><br/>

# 🐳 Vue v3.4.12

날짜 : 2024-01-13

## 🌏 Reverts

* fix(reactivity): 렌더링 기능에서 dirty assign을 수정. ([#10091](https://github.com/vuejs/core/issues/10091)) ([8b18481](https://github.com/vuejs/core/commit/8b1848173b0bc8fd84ce1da1af8d373c044bf073)), closes [#10098](https://github.com/vuejs/core/issues/10098) [#10100](https://github.com/vuejs/core/issues/10100)

<br/><br/>

# 🐳 Vue v3.4.13

날짜 : 2024-01-13

## 🌏 Bug Fixes

* **reactivity:** 재귀 효과에 대한 dirtyLevel 검사 수정 ([#10101](https://github.com/vuejs/core/issues/10101)) ([e45a8d2](https://github.com/vuejs/core/commit/e45a8d24b46c174deb46ed952bdaf54c81ad5a85)), closes [#10082](https://github.com/vuejs/core/issues/10082)

<br/><br/>

# 🐳 Vue v3.4.14

날짜 : 2024-01-15

## 🌏 Bug Fixes

* **compiler-sfc:** 소비된 AST를 재분석할 때 기본적으로 prefixIdentifiers를 활성화함. ([#10105](https://github.com/vuejs/core/issues/10105)) ([48bf8e4](https://github.com/vuejs/core/commit/48bf8e4c708ec620e4852d71c8713394457108ee))
* **deps:** postcss 종속성을 ^8.4.33으로 업데이트 ([#10110](https://github.com/vuejs/core/issues/10110)) ([a557006](https://github.com/vuejs/core/commit/a557006f8e7f110c6f322de38931dceaab8e9cbb))
* **reactivity:** mutation로 computed된 회귀 문제 수정 ([#10119](https://github.com/vuejs/core/issues/10119)) ([20f62af](https://github.com/vuejs/core/commit/20f62afaafd422e42b99dde9c16f9a4ebfb9c5f7)), closes [#10114](https://github.com/vuejs/core/issues/10114)

<br/><br/>

# 🐳 Vue v3.4.15

날짜 : 2024-01-18

## 🌏 Bug Fixes

* **compiler-sfc:** pnpm을 사용하여 심볼릭 링크된 node_modules구조에 대한 유형 해결 수정 ([75e866b](https://github.com/vuejs/core/commit/75e866bd4ef368b4e037a4933dbaf188920dc683)), closes [#10121](https://github.com/vuejs/core/issues/10121)
* 생산 오류 참조 링크의 올바른 URL ([c3087ff](https://github.com/vuejs/core/commit/c3087ff2cce7d96c60a870f8233441311ab4dfb4))
* **hydration:** 문자열이 아닌 값과 내부 텍스트가 있는 옵션에 대한 잘못된 불일치 경고 수정 ([d16a213](https://github.com/vuejs/core/commit/d16a2138a33b106b9e1499bbb9e1c67790370c97))
* **reactivity:** re-fix [#10114](https://github.com/vuejs/core/issues/10114) ([#10123](https://github.com/vuejs/core/issues/10123)) ([c2b274a](https://github.com/vuejs/core/commit/c2b274a887f61deb7e0185d1bef3b77d31e991cc))
* **runtime-core:** setup에서 다른 앱을 마운트할 때 렌더링되지 않은 슬롯 fn 사용에 대해 경고하면 안됨. ([#10125](https://github.com/vuejs/core/issues/10125)) ([6fa33e6](https://github.com/vuejs/core/commit/6fa33e67ec42af140a86fbdb86939032c3a1f345)), closes [#10124](https://github.com/vuejs/core/issues/10124)

## 🌏 Performance Improvements

- **templateRef:** v-for에서 템플릿 참조를 사용할 때 이중 렌더링 방지 ([de4d2e2](https://github.com/vuejs/core/commit/de4d2e2143ea8397cebeb1c7a57a60007b283c9f)), closes [#9908](https://github.com/vuejs/core/issues/9908)
- **v-model:** 큰 목록을 사용하여 v-model 다중 선택 최적화 ([2ffb956](https://github.com/vuejs/core/commit/2ffb956efe692da059f4895669084c5278871351)), closes [#10014](

<br/><br/>

# 🐳 Vue v3.4.16

날짜 : 2024-02-08

## 🌏 Bug Fixes

* **compiler-core:** in-DOM 템플릿에 대한 동일한 이름의 단축 엣지 케이스 처리 ([cb87b62](https://github.com/vuejs/core/commit/cb87b6213d7b003fa7280712c285c7c9d9f291ca)), closes [#10280](https://github.com/vuejs/core/issues/10280)
* **compiler-core:** 동적 slot이름에 대한 v-bind 단축 구문 지원([#10218](https://github.com/vuejs/core/issues/10218)) ([91f058a](https://github.com/vuejs/core/commit/91f058a90cd603492649633d153b120977c4df6b)), closes [#10213](https://github.com/vuejs/core/issues/10213)
* **deps:** update compiler ([#10269](https://github.com/vuejs/core/issues/10269)) ([336bb65](https://github.com/vuejs/core/commit/336bb65820243006efdf990e6ea3610696467508))
* **hydration:** SFC 스타일 v-bind hydration mismatch 경고 수정 ([#10250](https://github.com/vuejs/core/issues/10250)) ([f0b5f7e](https://github.com/vuejs/core/commit/f0b5f7ed8ddf74f9f5ba47cb65e8300370875291)), closes [#10215](https://github.com/vuejs/core/issues/10215)
* **reactivity:** computed getter의 부작용으로 인한 무한 재귀 방지 ([#10232](https://github.com/vuejs/core/issues/10232)) ([0bced13](https://github.com/vuejs/core/commit/0bced13ee5c53a02d5f10e5db76fe38b6e131440)), closes [#10214](https://github.com/vuejs/core/issues/10214)
* **reactivity:** handle `MaybeDirty` recurse ([#10187](https://github.com/vuejs/core/issues/10187)) ([6c7e0bd](https://github.com/vuejs/core/commit/6c7e0bd88f021b0b6365370e97b0c7e243d7d70b)), closes [#10185](https://github.com/vuejs/core/issues/10185)
* **reactivity:** `markRaw`를 사용할 때 확장할 수 없는 객체를 건너뜀. ([#10289](https://github.com/vuejs/core/issues/10289)) ([2312184](https://github.com/vuejs/core/commit/2312184bc335e0d32aa4c0c0b49190b6334849b4)), closes [#10288](https://github.com/vuejs/core/issues/10288)
* **runtime-core:** 인라인 isShallow를 피하시오. ([#10238](https://github.com/vuejs/core/issues/10238)) ([53eee72](https://github.com/vuejs/core/commit/53eee72c3a96420db35236b5e8e4d9308a56e1b4))
* **runtime-core:** runWithContext에 대한 중첩 호출 지원 ([#10261](https://github.com/vuejs/core/issues/10261)) ([75e02b5](https://github.com/vuejs/core/commit/75e02b5099a08166bdf407127916734c48209ee9)), closes [#10260](https://github.com/vuejs/core/issues/10260)
* **runtime-dom:** v-show가 v-bind를 통해 설정된 표시 값을 준수하는지 확인. ([#10161](https://github.com/vuejs/core/issues/10161)) ([9b19f09](https://github.com/vuejs/core/commit/9b19f0912104bfccb10c8cf5beab02b21a648935)), closes [#10151](https://github.com/vuejs/core/issues/10151)
* **runtime-dom:** update 옵션 선택 업데이트 실패 ([#10200](https://github.com/vuejs/core/issues/10200)) ([f31d782](https://github.com/vuejs/core/commit/f31d782e4668050a188ac0f11ba8d5b861b913ca)), closes [#10194](https://github.com/vuejs/core/issues/10194) [#10267](https://github.com/vuejs/core/issues/10267)

## 🌏 Reverts

- perf(templateRef): v-for에서 템플릿 참조를 사용할 때 이중 렌더링 방지 ([eb1b911](https://github.com/vuejs/core/commit/eb1b9116d7cd4a5747e8dadcdc5ba921df011f64)), closes [#9908](https://github.com/vuejs/core/issues/9908) [#10210](https://github.com/vuejs/core/issues/10210) [#10234](https://github.com/vuejs/core/issues/10234)

<br/><br/>

# 🐳 Vue v3.4.17

날짜 : 2024-02-09

## 🌏 Reverts

* fix(runtime-dom): v-show가 v-bind를 통해 설정된 표시 값을 준수하는지 확인. ([#10161](https://github.com/vuejs/core/issues/10161)) ([2cd5b05](https://github.com/vuejs/core/commit/2cd5b05c3bf171be5c0b473c084c01704a058ffa)), closes [#10294](https://github.com/vuejs/core/issues/10294) [#10151](https://github.com/vuejs/core/issues/10151)

<br/><br/>

# 🐳 Vue v3.4.18

날짜 : 2024-02-09

## 🌏 Bug Fixes

* **dx:** prop name으로 예약된 키에 대한 경고 ([77a804b](https://github.com/vuejs/core/commit/77a804b1d0d6a3f12fb3674cdceb85ebd6481e02)), closes [#10281](https://github.com/vuejs/core/issues/10281)
* **runtime-dom:** v-show가 v-bind를 통해 설정된 표시 값을 준수하는지 확인 ([#10297](https://github.com/vuejs/core/issues/10297)) ([c224897](https://github.com/vuejs/core/commit/c224897dd4e189a10ec601a97fe08cb638ebee19)), closes [#10151](https://github.com/vuejs/core/issues/10151)

<br/><br/>

# 🐳 Vue v3.4.19

날짜 : 2024-02-13

## 🌏 Bug Fixes

* **deps:** 해싱 오류를 방지하려면 Iru-cache를 고정. ([b8be990](https://github.com/vuejs/core/commit/b8be99018ceae92d1732dfb414df12b36b90b31f)), closes [#10300](https://github.com/vuejs/core/issues/10300)
* **hydration:** 루트가 아닌 node에서 CSS vars hydration mismatch false positive 수정 ([995d2fd](https://github.com/vuejs/core/commit/995d2fdcca485c24849c99f498c1edc163722e04)), closes [#10317](https://github.com/vuejs/core/issues/10317) [#10325](https://github.com/vuejs/core/issues/10325)
* **runtime-dom:** v-show값이 거짓인 경우 transition을 트리거해서 안 됨. ([#10311](https://github.com/vuejs/core/issues/10311)) ([e509639](https://github.com/vuejs/core/commit/e50963903d93a7f24003b6e2c03647fdf7454b1e))

## 🌏 Features

> Note: 이 경고는 기능으로 분류되어 있지만 공개API는 영향을 주지 않기 때문에 패치로 출시됨.

- **dx:** 계산이 자체적으로 트리거되면 사용자에게 경고함. ([#10299](https://github.com/vuejs/core/issues/10299)) ([f7ba97f](https://github.com/vuejs/core/commit/f7ba97f9754a9882c1f6b1c07ca1a4040479dd13))

## 🌏 Performance Improvements

* **runtime:** `getType()` GC 및 속도 개선 ([#10327](https://github.com/vuejs/core/issues/10327)) ([603a1e1](https://github.com/vuejs/core/commit/603a1e1f5ad587c077f0d974c1bbe856be22ebe9))

<br/><br/>

# 🐳 Vue v3.4.20

날짜 : 2024-02-26

## 🌏 Bug Fixes

* **parser:** 대문자 구성요소를 특수 태그로 처리하면 안됨. ([e0e0253](https://github.com/vuejs/core/commit/e0e02535cdea1aeb1cfaff0d61d4b2555e555c36)), closes [#10395](https://github.com/vuejs/core/issues/10395)
* **runtime-dom:** 항상 null 옵션 값을 재설정하지 마시오. ([ff130c4](https://github.com/vuejs/core/commit/ff130c470204086edaa093fb8fdc1247c69cba69)), closes [#10396](https://github.com/vuejs/core/issues/10396)
* **runtime-dom:** 중첩된 v-show 우선순위 회귀 수정 ([364f890](https://github.com/vuejs/core/commit/364f8902c8657faec7c3a4d70a5b2c856567e92d)), closes [#10338](https://github.com/vuejs/core/issues/10338)
* **runtime-dom:** v-bind 스타일은 이전 CSS 문자열 값을 지워야 함. ([#10373](https://github.com/vuejs/core/issues/10373)) ([e2d3235](https://github.com/vuejs/core/commit/e2d323538e71d404e729148fd19a08bbc2e3da9b)), closes [#10352](https://github.com/vuejs/core/issues/10352)
* **suspense:** 중첩된 Suspense를 사용하여 Suspense전환 처리 ([#10184](https://github.com/vuejs/core/issues/10184)) ([0f3da05](https://github.com/vuejs/core/commit/0f3da05ea201761529bb95594df1e2cee20b7107)), closes [#10098](https://github.com/vuejs/core/issues/10098)
* **types:** defineComponent의 직접 설정 서명을 위한 더 나은 타이핑 ([#10357](https://github.com/vuejs/core/issues/10357)) ([eadce5b](https://github.com/vuejs/core/commit/eadce5b75356656fd2209ebdb406d34823c961b7)), closes [#8604](https://github.com/vuejs/core/issues/8604) [#8855](https://github.com/vuejs/core/issues/8855)

<br/><br/>

# 🐳 Vue v3.4.21

날짜 : 2024-02-28

## 🌏 Bug Fixes

* **runtime-dom:** 설정되지 않은 옵션 값을 피하세요 ([#10416](https://github.com/vuejs/core/issues/10416)) ([b3f8b5a](https://github.com/vuejs/core/commit/b3f8b5a4e700d4c47a146b6040882287d180f6cb)), closes [#10412](https://github.com/vuejs/core/issues/10412) [#10396](https://github.com/vuejs/core/issues/10396)
* **suspense:** fallback상태인 경우 중첩된 Susepense patch를 보장함. ([#10417](https://github.com/vuejs/core/issues/10417)) ([7c97778](https://github.com/vuejs/core/commit/7c97778aec1e3513035e5df265e1b8a7801f6106)), closes [#10415](https://github.com/vuejs/core/issues/10415)
* **warning:** warn handler에서 args를 문자열화 함. ([#10414](https://github.com/vuejs/core/issues/10414)) ([bc37258](https://github.com/vuejs/core/commit/bc37258caa2f6f67f4554ab8587aca3798d92124)), closes [#10409](https://github.com/vuejs/core/issues/10409)

<br/><br/>

# 🐳 Vue v3.4.22

날짜 : 2024-04-15

## 🌏 Bug Fixes

* **compat:** $options mutation 수정 + 비공개 API 초기화 조정  ([d58d133](https://github.com/vuejs/core/commit/d58d133b1cde5085cc5ab0012d544cafd62a6ee6)), closes [#10626](https://github.com/vuejs/core/issues/10626) [#10636](https://github.com/vuejs/core/issues/10636)
* **compile-sfc:** template에서 v-bind 단축 사용을 분석 ([#10518](https://github.com/vuejs/core/issues/10518)) ([e5919d4](https://github.com/vuejs/core/commit/e5919d4658cfe0bb18c76611dd3c3432c57f94ab)), closes [#10515](https://github.com/vuejs/core/issues/10515)
* **compiler-core:** `>`앞에 공백이 있는 종료 태그에 대한 loc.source를 수정함. ([16174da](https://github.com/vuejs/core/commit/16174da21d6c8ac0aae027dd964fc35e221ded0a)), closes [#10694](https://github.com/vuejs/core/issues/10694) [#10695](https://github.com/vuejs/core/issues/10695)
* **compiler-core:** 컴포넌트에 대한 v-bind약어 수정 :is ([04af950](https://github.com/vuejs/core/commit/04af9504a720c8e6de26c04b1282cf14fa1bcee3)), closes [#10469](https://github.com/vuejs/core/issues/10469) [#10471](https://github.com/vuejs/core/issues/10471)
* **compiler-sfc:** compund selectors의 :is() 및 :where()  ([#10522](https://github.com/vuejs/core/issues/10522)) ([660cadc](https://github.com/vuejs/core/commit/660cadc7aadb909ef33a6055c4374902a82607a4)), closes [#10511](https://github.com/vuejs/core/issues/10511)
* **compiler-sfc:** type import의 확장자가 생략된 경우 `.tsx`도 검색 ([#10637](https://github.com/vuejs/core/issues/10637)) ([34106bc](https://github.com/vuejs/core/commit/34106bc9c715247211273bb9c64712f04bd4879d)), closes [#10635](https://github.com/vuejs/core/issues/10635)
* **compiler-sfc:** boolean + string union type에 대한 defineModel 강제 수정([#9603](https://github.com/vuejs/core/issues/9603)) ([0cef65c](https://github.com/vuejs/core/commit/0cef65cee411356e721bbc90d731fc52fc8fce94)), closes [#9587](https://github.com/vuejs/core/issues/9587) [#10676](https://github.com/vuejs/core/issues/10676)
* **compiler-sfc:** 범용 selector scope 수정 ([#10551](https://github.com/vuejs/core/issues/10551)) ([54a6afa](https://github.com/vuejs/core/commit/54a6afa75a546078e901ce0882da53b97420fe94)), closes [#10548](https://github.com/vuejs/core/issues/10548)
* **compiler-sfc:** option이 RuntimeModuleName옵션을 제공하는 경우 option module name을 사용. ([#10457](https://github.com/vuejs/core/issues/10457)) ([e76d743](https://github.com/vuejs/core/commit/e76d7430aa7470342f3fe263145a0fa92f5898ca)), closes [#10454](https://github.com/vuejs/core/issues/10454)
* **custom-element:** attr이 제거된 경우 null로 설정하지 마세요. ([#9012](https://github.com/vuejs/core/issues/9012)) ([b49306a](https://github.com/vuejs/core/commit/b49306adff4572d90a42ccd231387f16eb966bbe)), closes [#9006](https://github.com/vuejs/core/issues/9006) [#10324](https://github.com/vuejs/core/issues/10324)
* **hydration:** hydrate node 중 최적화 모드를 올바르게 처리 ([#10638](https://github.com/vuejs/core/issues/10638)) ([2ec06fd](https://github.com/vuejs/core/commit/2ec06fd6c8383e11cdf4efcab1707f973bd6a54c)), closes [#10607](https://github.com/vuejs/core/issues/10607)
* **reactivity:** computed 값은 isProxy에 의해 true로 감지되어서는 안됨. ([#10401](https://github.com/vuejs/core/issues/10401)) ([9da34d7](https://github.com/vuejs/core/commit/9da34d7af81607fddd1f32f21b3b4002402ff1cc))
* **reactivity:** hasOwnProperty key 강제 edge case 수정 ([969c5fb](https://github.com/vuejs/core/commit/969c5fb30f4c725757c7385abfc74772514eae4b))
* **reactivity:** 문자열이 아닌 값으로 hasOwnProperty가 호출될 때 추적 문제를 수정함. ([c3c5dc9](https://github.com/vuejs/core/commit/c3c5dc93fbccc196771458f0b43cd5b7ad1863f4)), closes [#10455](https://github.com/vuejs/core/issues/10455) [#10464](https://github.com/vuejs/core/issues/10464)
* **runtime-core:** errorHandler가 실행 중에 무한 루프를 일으키는 문제 수정 ([#9575](https://github.com/vuejs/core/issues/9575)) ([ab59bed](https://github.com/vuejs/core/commit/ab59bedae4e5e40b28804d88a51305b236d4a873))
* **runtime-core:** callWithAsyncErrorHandling에서 잘못된 값 처리 ([53d15d3](https://github.com/vuejs/core/commit/53d15d3f76184eed67a18d35e43d9a2062f8e121))
* **runtime-core:** **PROD_HYDRATION_MISMATCH_DETAILS**가 설정된 경우 수정되지 않은 mismatch에 대한 hydration mismatch detail도 표시함.  ([#10599](https://github.com/vuejs/core/issues/10599)) ([0dea7f9](https://github.com/vuejs/core/commit/0dea7f9a260d93eb6c39aabac8c94c2c9b2042dd))
* **runtime-dom:** 다중 선택 옵션에 대한 `v-model` string/number 강제 변환([#10576](https://github.com/vuejs/core/issues/10576)) ([db374e5](https://github.com/vuejs/core/commit/db374e54c9f5e07324728b85c74eca84e28dd352))
* **runtime-dom:** suspense된 컴포넌트에 대한 CSS v-bind수정 ([#8523](https://github.com/vuejs/core/issues/8523)) ([67722ba](https://github.com/vuejs/core/commit/67722ba23b7c36ab8f3fa2d2b4df08e4ddc322e1)), closes [#8520](https://github.com/vuejs/core/issues/8520)
* **runtime-dom:** 선행 0을 사용하여 v-model 번호를 강제 업데이트 함. ([#10506](https://github.com/vuejs/core/issues/10506)) ([15ffe8f](https://github.com/vuejs/core/commit/15ffe8f2c954359770c57e4d9e589b0b622e4a60)), closes [#10503](https://github.com/vuejs/core/issues/10503) [#10615](https://github.com/vuejs/core/issues/10615)
* **runtime-dom:** 잘못 전달된 문자열 값을 이벤트 핸들러로 삭제 ([#8953](https://github.com/vuejs/core/issues/8953)) ([7ccd453](https://github.com/vuejs/core/commit/7ccd453dd004076cad49ec9f56cd5fe97b7b6ed8)), closes [#8818](https://github.com/vuejs/core/issues/8818)
* **ssr:** TransitionGroup에서 v-if주석을 렌더링하지 마세요. ([#6732](https://github.com/vuejs/core/issues/6732)) ([5a96267](https://github.com/vuejs/core/commit/5a9626708e970c6fc0b6f786e3c80c22273d126f)), closes [#6715](https://github.com/vuejs/core/issues/6715)
* **Transition:** KeepAlive children이 out-in모드로 마운트 해제 되었는지 확인하세요. ([#10632](https://github.com/vuejs/core/issues/10632)) ([fc99e4d](https://github.com/vuejs/core/commit/fc99e4d3f01b190ef9fd3c218a668ba9124a32bc)), closes [#10620](https://github.com/vuejs/core/issues/10620)
* **TransitionGroup:** comment node 및 text node에 대한 전환 후크 설정을 피하십시오. ([#9421](https://github.com/vuejs/core/issues/9421)) ([140a768](https://github.com/vuejs/core/commit/140a7681cc3bba22f55d97fd85a5eafe97a1230f)), closes [#4621](https://github.com/vuejs/core/issues/4621) [#4622](https://github.com/vuejs/core/issues/4622) [#5153](https://github.com/vuejs/core/issues/5153) [#5168](https://github.com/vuejs/core/issues/5168) [#7898](https://github.com/vuejs/core/issues/7898) [#9067](https://github.com/vuejs/core/issues/9067)
* **types:** withDefaults를 사용할 때 객체 통합 유형 병합을 피하세요. ([#10596](https://github.com/vuejs/core/issues/10596)) ([37ba93c](https://github.com/vuejs/core/commit/37ba93c213a81f99a68a99ef5d4065d61b150ba3)), closes [#10594](https://github.com/vuejs/core/issues/10594)

## 🌏 Performance Improvements

* add `__NO_SIDE_EFFECTS__` comments ([#9053](https://github.com/vuejs/core/issues/9053)) ([d46df6b](https://github.com/vuejs/core/commit/d46df6bdb14b0509eb2134b3f85297a306821c61))
* 컴포넌트 props/slot 내부 객체 검사 최적화 ([6af733d](https://github.com/vuejs/core/commit/6af733d68eb400a3d2c5ef5f465fff32b72a324e))
* **ssr:** 컴포넌트 instance proxy에서 markRaw 호출을 피하세요. ([4bc9f39](https://github.com/vuejs/core/commit/4bc9f39f028af7313e5cf24c16915a1985d27bf8))
* **ssr:** v8에서 ssr에 대한 설정 컨텍스트 생성 최적화 ([ca84316](https://github.com/vuejs/core/commit/ca84316bfb3410efe21333670a6ad5cd21857396))

<br/><br/>

# 🐳 Vue v3.4.23

날짜 : 2024-04-16

## 🌏 Bug Fixes

* **runtime-core:** slot에서 $attrs 추적에 대한 회귀 수정. ([6930e60](https://github.com/vuejs/core/commit/6930e60787e4905a50417190263ae7dd46cf5409)), closes [#10710](https://github.com/vuejs/core/issues/10710)
* **runtime-core:** slot에 동일한 내부 object 메커니즘을 사용함. ([6df53d8](https://github.com/vuejs/core/commit/6df53d85a207986128159d88565e6e7045db2add)), closes [#10709](https://github.com/vuejs/core/issues/10709)

<br/><br/>

# 🐳 Vue v3.4.24

날짜 : 2024-04-22

## 🌏 Bug Fixes

* **compiler-core:** v-for의 v-bind객체를 통해 바인딩된 템플릿 참조를 처리 ([#10706](https://github.com/vuejs/core/issues/10706)) ([da7adef](https://github.com/vuejs/core/commit/da7adefa844265eecc9c336abfc727bc05b4f16e)), closes [#10696](https://github.com/vuejs/core/issues/10696)
* **compiler-core:** 극단적인 경우에 식을 올바르게 parse함 ([b92c25f](https://github.com/vuejs/core/commit/b92c25f53dff0fc1687f57ca4033d0ac25218940)), closes [#10754](https://github.com/vuejs/core/issues/10754)
* **compiler-sfc:** 읽기 전용 연산자 및 ReadonlyArray/Map/Set 타입 처리 ([5cef52a](https://github.com/vuejs/core/commit/5cef52a5c23ba8ba3239e6def03b8ff008d3cc72)), closes [#10726](https://github.com/vuejs/core/issues/10726)
* **compiler-ssr:** 전환 중인 조건부 slot에 대한 hydration misamtch 수정 ([f12c81e](https://github.com/vuejs/core/commit/f12c81efca3fcf9a7ce478af2261ad6ab9b0bfd7)), closes [#10743](https://github.com/vuejs/core/issues/10743)
* **compiler-ssr:** null값에 대한 v-html SSR 수정 ([1ff4076](https://github.com/vuejs/core/commit/1ff407676f9495883b459779a9b0370d7588b51f)), closes [#10725](https://github.com/vuejs/core/issues/10725)
* **deps:** update compiler ([#10760](https://github.com/vuejs/core/issues/10760)) ([15df5c1](https://github.com/vuejs/core/commit/15df5c1b261b9b471eb811fd47ab7b3cfc41cf83))
* **runtime-core:** slot children이 있는 전환 내부의 KeepAlive의 edge case 수정 ([#10719](https://github.com/vuejs/core/issues/10719)) ([e51ca61](https://github.com/vuejs/core/commit/e51ca61ca060b2772e967d169548fc2f58fce6d1)), closes [#10708](https://github.com/vuejs/core/issues/10708)
* **runtime-core:** 추가 수정 slot _ctx 확인 ([cde7f05](https://github.com/vuejs/core/commit/cde7f05787d16dbb93d9419ef5331adf992816fd)), closes [#10724](https://github.com/vuejs/core/issues/10724)
* **runtime-core:** props는 직접 템플릿 액세스를 통해 읽기 전용이어야 함. ([b93f264](https://github.com/vuejs/core/commit/b93f26464785de227b88c51a88328ae80e80d804)), closes [#8216](https://github.com/vuejs/core/issues/8216) [#10736](https://github.com/vuejs/core/issues/10736)
* **transition:** 입력이 취소되면 transition이 꺠지거나 깜빡임(breaking/flickering) ([#10688](https://github.com/vuejs/core/issues/10688)) ([65109a7](https://github.com/vuejs/core/commit/65109a70f187473edae8cf4df11af3c33345e6f6))

<br/><br/>

# 🐳 Vue v3.4.25

날짜 : 2024-04-24

## 🌏 Bug Fixes

* **defineModel:** prod모드 런타임 type generation을 defineProps와 정렬 ([4253a57](https://github.com/vuejs/core/commit/4253a57f1703a7f1ac701d77e0a235689203461d)), closes [#10769](https://github.com/vuejs/core/issues/10769)
* **runtime-core:** keepAlive child를 올바르게 가져옴. ([#10772](https://github.com/vuejs/core/issues/10772)) ([3724693](https://github.com/vuejs/core/commit/3724693a25c3f2dd13d70a8a1af760b03a4fb783)), closes [#10771](https://github.com/vuejs/core/issues/10771)
* **runtime-core:** attrs와 slot에 대한 내부 프로토타입으로 일반 객체를 사용.([064e82f](https://github.com/vuejs/core/commit/064e82f5855f30fe0b77fe9b5e4dd22700fd634d)), closes [/github.com/vuejs/core/commit/6df53d85a207986128159d88565e6e7045db2add#r141304923](https://github.com//github.com/vuejs/core/commit/6df53d85a207986128159d88565e6e7045db2add/issues/r141304923)

<br/><br/>

# 🐳 Vue v3.4.26

날짜 : 2024-04-29

## 🌏 Bug Fixes

* **compiler-core:** global에 대한 bail 상수 수정([fefce06](https://github.com/vuejs/core/commit/fefce06b41e3b75de3d748dc6399628ec5056e78))
* **compiler-core:** 불필요한 constant bail check 제거 ([09b4df8](https://github.com/vuejs/core/commit/09b4df809e59ef5f4bc91acfc56dc8f82a8e243a)), closes [#10807](https://github.com/vuejs/core/issues/10807)
* **runtime-core:** 속성은 functional component에서 읽기 전용이어야 함. ([#10767](https://github.com/vuejs/core/issues/10767)) ([e8fd644](https://github.com/vuejs/core/commit/e8fd6446d14a6899e5e8ab1ee394d90088e01844))
* **runtime-core:** slot compiler marker 쓰기 가능 여부 확인 ([#10825](https://github.com/vuejs/core/issues/10825)) ([9c2de62](https://github.com/vuejs/core/commit/9c2de6244cd44bc5fbfd82b5850c710ce725044f)), closes [#10818](https://github.com/vuejs/core/issues/10818)
* **runtime-core:** VNode 복제 중 inherit transition을 올바르게 처리. ([#10809](https://github.com/vuejs/core/issues/10809)) ([638a79f](https://github.com/vuejs/core/commit/638a79f64a7e184f2a2c65e21d764703f4bda561)), closes [#3716](https://github.com/vuejs/core/issues/3716) [#10497](https://github.com/vuejs/core/issues/10497) [#4091](https://github.com/vuejs/core/issues/4091)
* **Transition:** re-fix [#10620](https://github.com/vuejs/core/issues/10620) ([#10832](https://github.com/vuejs/core/issues/10832)) ([accf839](https://github.com/vuejs/core/commit/accf8396ae1c9dd49759ba0546483f1d2c70c9bc)), closes [#10632](https://github.com/vuejs/core/issues/10632) [#10827](https://github.com/vuejs/core/issues/10827)

<br/><br/>

# 🐳 Vue v3.4.27

날짜 : 2024-05-06

## 🌏 Bug Fixes

* **compat:** 기존 범위 슬롯 포함 ([#10868](https://github.com/vuejs/core/issues/10868)) ([8366126](https://github.com/vuejs/core/commit/83661264a4ced3cb2ff6800904a86dd9e82bbfe2)), closes [#8869](https://github.com/vuejs/core/issues/8869)
* **compiler-core:** 괄호가 없는 화살표 비동기 function에 대한 지원 추가 ([#5789](https://github.com/vuejs/core/issues/5789)) ([ca7d421](https://github.com/vuejs/core/commit/ca7d421e8775f6813f8943d32ab485e0c542f98b)), closes [#5788](https://github.com/vuejs/core/issues/5788)
* **compiler-dom:** option element로 createStaticVNode 사용을 제한함. ([#10846](https://github.com/vuejs/core/issues/10846)) ([0e3d617](https://github.com/vuejs/core/commit/0e3d6178b02d0386d779720ae2cc4eac1d1ec990)), closes [#6568](https://github.com/vuejs/core/issues/6568) [#7434](https://github.com/vuejs/core/issues/7434)
* **compiler-sfc:** handle keyof operator ([#10874](https://github.com/vuejs/core/issues/10874)) ([10d34a5](https://github.com/vuejs/core/commit/10d34a5624775f20437ccad074a97270ef74c3fb)), closes [#10871](https://github.com/vuejs/core/issues/10871)
* **hydration:** style 속성 없이 style mismatch의 edge case를 처리 ([f2c1412](https://github.com/vuejs/core/commit/f2c1412e46a8fad3e13403bfa78335c4f704f21c)), closes [#10786](https://github.com/vuejs/core/issues/10786)

<br/><br/>
