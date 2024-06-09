# 🐳 Vue v3.3.0 Rurouni Kenshin

날짜 : 2023-05-11

- 새로운 기능에 대한 자세한 내용은 해당 주소에서 확인. [release blog post](https://blog.vuejs.org/posts/vue-3-3).
- 여기 나열된 Features와 Deprecation은 beta및 alpa release에서 집계되었습니다. 전체 연대순 기록, 버그 수정 및 기타 사소한 기능을 보려면 3.3 beta및 alpha 로그를 참조.

## 🌏 Features

* **sfc:** SFC 매크로에서 가져온 유형 지원 ([#8083](https://github.com/vuejs/core/pull/8083))
* **types/slots:** `defineSlots` macro 및 `slots` 옵션을 통해 slot presence/props type 검사 지원([#7982](https://github.com/vuejs/core/issues/7982)) ([5a2f5d5](https://github.com/vuejs/core/commit/5a2f5d59cffa36a99e6f2feab6b3ba7958b7362f))
* **sfc:** 보다 ergnomic한 defineEmits tpye 구문 지원 ([#7992](https://github.com/vuejs/core/issues/7992)) ([8876dcc](https://github.com/vuejs/core/commit/8876dccf42a7f05375d97cb18c1afdfd0fc51c94))
* **sfc:** `defineModel`매크로와 `useModel`  helper를 소개 ([#8018](https://github.com/vuejs/core/issues/8018)) ([14f3d74](https://github.com/vuejs/core/commit/14f3d747a34d45415b0036b274517d70a27ec0d3))
* **reactivity:** 반응성 API에서 getter사용 지원 ([#7997](https://github.com/vuejs/core/issues/7997)) ([59e8284](https://github.com/vuejs/core/commit/59e828448e7f37643cd0eaea924a764e9d314448))
* **compiler-sfc:** `defineOptions` 매크로 추가 ([#5738](https://github.com/vuejs/core/issues/5738)) ([bcf5841](https://github.com/vuejs/core/commit/bcf5841ddecc64d0bdbd56ce1463eb8ebf01bb9d))
* **types/jsx:** jsxImportSource 지원, global JSX 충돌 방지 ([#7958](https://github.com/vuejs/core/issues/7958)) ([d0b7ef3](https://github.com/vuejs/core/commit/d0b7ef3b61d5f83e35e5854b3c2c874e23463102))
* **dx:** props에 대해 표시된 type의 가독성 향상 ([4c9bfd2](https://github.com/vuejs/core/commit/4c9bfd2b999ce472f7481aae4f9dc5bb9f76628e))
* **app:** app.runWithContext() ([#7451](https://github.com/vuejs/core/issues/7451)) ([869f3fb](https://github.com/vuejs/core/commit/869f3fb93e61400be4fd925e0850c2b1564749e2))
* hasInjectionContext() for libraries ([#8111](https://github.com/vuejs/core/issues/8111)) ([5510ce3](https://github.com/vuejs/core/commit/5510ce385abfa151c07a5253cccf4abccabdd01d))
* template에서 콘솔 액세스 허용 ([#6508](https://github.com/vuejs/core/issues/6508)) ([fe76224](https://github.com/vuejs/core/commit/fe762247f8035d28d543bc5602ad01b0c258f6d6)), closes [#7939](https://github.com/vuejs/core/issues/7939)
* **suspense:** `<Suspense>`에 대한 일시 중지 옵션 도입 ([#6736](https://github.com/vuejs/core/issues/6736)) ([cb37d0b](https://github.com/vuejs/core/commit/cb37d0b9ffb5d4bb81a0367d84295dec8dd4448c)), closes [#5513](https://github.com/vuejs/core/issues/5513)
* **compiler-dom:** treat inert를 boolean속성으로 처리 ([#8209](https://github.com/vuejs/core/issues/8209)) ([918ec8a](https://github.com/vuejs/core/commit/918ec8a5cbc825a3947cd35fe966671c245af087)), closes [#8208](https://github.com/vuejs/core/issues/8208)
* **types:** built-in 컴포넌트에 대한 slot type추가 ([#6033](https://github.com/vuejs/core/issues/6033)) ([3cb4dc9](https://github.com/vuejs/core/commit/3cb4dc9e5538e1c2bde9fa691b001615a848c546))
* **types:** ExtractPublicPropTypes utility type 제공 ([bff63c5](https://github.com/vuejs/core/commit/bff63c5498f5fa098689c18defe48ae08d47eadb)), closes [#5272](https://github.com/vuejs/core/issues/5272) [#8168](https://github.com/vuejs/core/issues/8168)
* **compiler-sfc:** expose parseCache ([4576548](https://github.com/vuejs/core/commit/45765488d498d94f8760c9e82f1177070057b17c)), closes [#8202](https://github.com/vuejs/core/issues/8202)

## 🌏 Deprecations

* **deprecation:** `vue:`접두사를 선호하여 [@vnode](https://github.com/vnode) hooks를 더 이상 사용하지 않음([5f0394a](https://github.com/vuejs/core/commit/5f0394a5ab88c82c74e240161499721f63d5462e))
* **deprecation:** v-is 지시어 사용 중단 ([bbd8301](https://github.com/vuejs/core/commit/bbd8301a1344b02de635ea16d4822db1c343bd12))
* **deprecation:** 기본적으로 Options API에서 삽입된 ref들을 풀고, app.config.unwrapInjectedRefs를 더 이상 사용하지 않음. ([526fa3b](https://github.com/vuejs/core/commit/526fa3b2ccf038375e76f8af2f1ddf79a7388878))

<br/><br/>

# 🐳 Vue v3.3.1

날짜 : 2023-05-11

## 🌏 Bug Fixes

* **suspense:** hydration을 위한 중첩된 동기화 suspense 처리 ([a3f5485](https://github.com/vuejs/core/commit/a3f54857858c8ca0e6b9f12618d151ab255fb040))

<br/><br/>

# 🐳 Vue v3.3.2

날짜 : 2023-05-12

## 🌏 Bug Fixes

* **compiler-core:** 부동 소수점 숫자를 상수로 처리 ([8dc8cf8](https://github.com/vuejs/core/commit/8dc8cf852bf8057aa5c4b5670f09e8c28a168b73)), closes [#8295](https://github.com/vuejs/core/issues/8295)
* **compiler-dom:** side effect tag에 대한 production을 중단하지 마십시오. ([c454b9d](https://github.com/vuejs/core/commit/c454b9d7f431d57abedb7184d1e4059914c4463f)), closes [#8287](https://github.com/vuejs/core/issues/8287) [#8292](https://github.com/vuejs/core/issues/8292)
* **compiler-sfc:** transform이 활성화되지 않은 경우 props 구조 분해에 대한 회귀 수정 ([f25bd37](https://github.com/vuejs/core/commit/f25bd37c6707fde19d164d90a38de41168941f4b)), closes [#8289](https://github.com/vuejs/core/issues/8289)
* **compiler-sfc:** escape가 필요한 prop key handle ([#7803](https://github.com/vuejs/core/issues/7803)) ([690ef29](https://github.com/vuejs/core/commit/690ef296357c7fc09f66ba9408df548e117f686f)), closes [#8291](https://github.com/vuejs/core/issues/8291)
* **compiler-sfc:** types를 확인할 때 d.ts파일을 올바르게 파싱합니다. ([aa1e77d](https://github.com/vuejs/core/commit/aa1e77d532b951ea5d3a5e26214a8b0c9c02fb6f)), closes [#8285](https://github.com/vuejs/core/issues/8285)
* **compiler-sfc:** extend 실패에 대한 특정 경고를 발생시키고 extend 무시를 허용 ([8235072](https://github.com/vuejs/core/commit/82350721a408e1f552c613c05971439d6c218d87)), closes [#8286](https://github.com/vuejs/core/issues/8286)

<br/><br/>

# 🐳 Vue v3.3.3

날짜 : 2023-05-18

## 🌏 Bug Fixes

* 오래된 브라우저에서는 정규식 플래그 사용X ([91f1c62](https://github.com/vuejs/core/commit/91f1c62e6384a8b09f90e7e43b8d347901e529a0)), closes [#8316](https://github.com/vuejs/core/issues/8316)
* **build:** esm-builder 빌드에서 dev플래그 교체 수정 ([#8314](https://github.com/vuejs/core/issues/8314)) ([003836f](https://github.com/vuejs/core/commit/003836f90e1f00ebd04b77ec07ccfa4e649a2ff4)), closes [#8312](https://github.com/vuejs/core/issues/8312)
* **compiler-sfc:** regexp 리터럴을 hoist 하지 마세오. ([#8300](https://github.com/vuejs/core/issues/8300)) ([8ec73a3](https://github.com/vuejs/core/commit/8ec73a3aea7a52e9479f107ae5737761166ddae6))
* **compiler-sfc:** 해결되지 않은 type으로 검사하는 default value type을 파괴하는 prop수정 ([#8340](https://github.com/vuejs/core/issues/8340)) ([f69dbab](https://github.com/vuejs/core/commit/f69dbabf8794426c3e9ed33ae77dd8ce655eafd2)), closes [#8326](https://github.com/vuejs/core/issues/8326)
* **compiler-sfc:** 경로 별칭이 있는 vue파일에서 type import 수정 ([fab9c72](https://github.com/vuejs/core/commit/fab9c727805c6186c490f99023e8cf5401b0b5a9)), closes [#8348](https://github.com/vuejs/core/issues/8348)
* **compiler-sfc:** .js 확장자를 사용하여 상대 가져오기로 ts파일을 처리합니다. ([b36addd](https://github.com/vuejs/core/commit/b36addd3bde07467e9ff5641bd1c2bdc3085944c)), closes [#8339](https://github.com/vuejs/core/issues/8339)
* **compiler-sfc:** inline mode가 꺼져있으면 올바르게 parse됨. ([#8337](https://github.com/vuejs/core/issues/8337)) ([ecbd42a](https://github.com/vuejs/core/commit/ecbd42a1444e3c599e464dec002e43d548d99669)), closes [#6088](https://github.com/vuejs/core/issues/6088)
* **compiler-sfc:** unions를 사용하여 defineEmits type 참조 지원 ([#8299](https://github.com/vuejs/core/issues/8299)) ([b133e0f](https://github.com/vuejs/core/commit/b133e0fd97b0b4fabbb43151c19031b8fb47c05b)), closes [#7943](https://github.com/vuejs/core/issues/7943)
* **types:** withDefaults + defineProps를 사용한 일반 사용법 지원 ([#8335](https://github.com/vuejs/core/issues/8335)) ([216f269](https://github.com/vuejs/core/commit/216f26995b63c2df26ca0f39f390fe8d59cdabfa)), closes [#8310](https://github.com/vuejs/core/issues/8310) [#8331](https://github.com/vuejs/core/issues/8331) [#8325](https://github.com/vuejs/core/issues/8325)

<br/><br/>

# 🐳 Vue v3.3.4

날짜 : 2023-05-18

## 🌏 Bug Fixes

* **build:** node esm에 대한 올바른 입력을 확인. ([d621d4c](https://github.com/vuejs/core/commit/d621d4c646b2d7b190fbd44ad1fd04512b3de300))
* **build:** **DEV** flag 교체 edge case 수정 ([8b7c04b](https://github.com/vuejs/core/commit/8b7c04b18f73aad9a08dd57eba90101b5b2aef28)), closes [#8353](https://github.com/vuejs/core/issues/8353)
* **compiler-sfc:** default exports에서 import한 type을 처리 ([5aec717](https://github.com/vuejs/core/commit/5aec717a2402652306085f58432ba3ab91848a74)), closes [#8355](https://github.com/vuejs/core/issues/8355)

<br/><br/>

# 🐳 Vue v3.3.5

날짜 : 2023-10-20

## 🌏 Bug Fixes

* isGloballyWhitelisted를 다시 추가했지만 더 이상 사용되지 않음. ([#8556](https://github.com/vuejs/core/issues/8556)) ([63dfe8e](https://github.com/vuejs/core/commit/63dfe8eab499979bcc2f7829e82464e13899c895)), closes [#8416](https://github.com/vuejs/core/issues/8416)
* **build:** esbuild에서 useDefineForClassFields를 비활성화 ([#9252](https://github.com/vuejs/core/issues/9252)) ([6d14fa8](https://github.com/vuejs/core/commit/6d14fa88e85d4c9e264be394ddb37a54ca6738a8))
* **compat:** vue compat set()의 return 값 관련 ([#9377](https://github.com/vuejs/core/issues/9377)) ([e3c2d69](https://github.com/vuejs/core/commit/e3c2d699f694d9500ddee78571172a24f0e3b17a))
* **compiler-sfc:** props and emit hoist하지마세오.([#8535](https://github.com/vuejs/core/issues/8535)) ([24db951](https://github.com/vuejs/core/commit/24db9516d8b4857182ec1a3af86cb7346691679b)), closes [#7805](https://github.com/vuejs/core/issues/7805) [#7812](https://github.com/vuejs/core/issues/7812)
* **compiler-sfc:** 브라우저용 번들링 시 TS를 등록하지 마세요. ([#8582](https://github.com/vuejs/core/issues/8582)) ([6f45f76](https://github.com/vuejs/core/commit/6f45f76df2c43796b35067ef8f8b9a7bca454040))
* **compiler-sfc:** 개발 중에 가져온 ref를 template ref로 사용하는 문제 수정 ([#7593](https://github.com/vuejs/core/issues/7593)) ([776ebf2](https://github.com/vuejs/core/commit/776ebf25b2e7570e78ac1c148fc45c823c21a542)), closes [#7567](https://github.com/vuejs/core/issues/7567)
* **compiler-sfc:** template 사용 확인에서 동적 지시문 인수 처리 ([#8538](https://github.com/vuejs/core/issues/8538)) ([e404a69](https://github.com/vuejs/core/commit/e404a699f48ae5c5a5da947f42679343192158c7)), closes [#8537](https://github.com/vuejs/core/issues/8537)
* **compiler-sfc:** 이중 slash 주석에서 v-bind style을 무시 ([#5409](https://github.com/vuejs/core/issues/5409)) ([381b497](https://github.com/vuejs/core/commit/381b4977af25ba5392704f72ec6b3f2394d87ae7))
* **compiler-sfc:** 옵션을 stylus에 직접 전달 ([#3848](https://github.com/vuejs/core/issues/3848)) ([d6446a6](https://github.com/vuejs/core/commit/d6446a6d40774b79045a9ddba7b5fd5201d51450))
* **compiler-sfc:** 여러 re-export /w 동일한 소스 type 이름 해결 지원 ([#8365](https://github.com/vuejs/core/issues/8365)) ([4fa8da8](https://github.com/vuejs/core/commit/4fa8da8576717c619e1e8c04d19038488c75fbea)), closes [#8364](https://github.com/vuejs/core/issues/8364)
* **compiler-sfc:** 실험적 feature 경고의 오타 ([#8513](https://github.com/vuejs/core/issues/8513)) ([fd1a3f9](https://github.com/vuejs/core/commit/fd1a3f95990d7c372fa1c0c40c55caca761a33a4))
* **deps:** dependency monaco-editor를 ^0.44.0로 업데이트 ([#9237](https://github.com/vuejs/core/issues/9237)) ([8611874](https://github.com/vuejs/core/commit/8611874e09a827b6491173836c8942284d5de22c))
* **deps:** update playground ([#9154](https://github.com/vuejs/core/issues/9154)) ([c8566a2](https://github.com/vuejs/core/commit/c8566a22b7cf37e6aefab7bad7b97ce2db9fae4c))
* **playground:** fix github button style ([#7722](https://github.com/vuejs/core/issues/7722)) ([5ee992c](https://github.com/vuejs/core/commit/5ee992cfeabc6c4b871980c6057d0ac7140ad2fa))
* **runtime-core:** swap client/server debug labels ([#9089](https://github.com/vuejs/core/issues/9089)) ([8f311c6](https://github.com/vuejs/core/commit/8f311c6f823f6776ca1c49bfbbbf8c7d9dea9cf1))
* **ssr:** v-model을 사용해 선택을 위한 올바른 초기 선택 상태 렌더링 관련 ([#7432](https://github.com/vuejs/core/issues/7432)) ([201c46d](https://github.com/vuejs/core/commit/201c46df07a38f3c2b73f384e8e6846dc62f224e)), closes [#7392](https://github.com/vuejs/core/issues/7392)
* **ssr:** 옵션 컴포넌트 오류 설정 시 현재 인스턴스 재설정([#7743](https://github.com/vuejs/core/issues/7743)) ([020851e](https://github.com/vuejs/core/commit/020851e57d9a9f727c6ea07e9c1575430af02b73)), closes [#7733](https://github.com/vuejs/core/issues/7733)
* **teleport:** 비활성화된 동안 대상 변경 처리 ([#7837](https://github.com/vuejs/core/issues/7837)) ([140a89b](https://github.com/vuejs/core/commit/140a89b833bceed60838182b875d2953c70af114)), closes [#7835](https://github.com/vuejs/core/issues/7835)
* **transition:** transition/animation기간에 대해 가능한 자동 값을 처리 ([96c76fa](https://github.com/vuejs/core/commit/96c76facb7de37fc241ccd55e121fd60a49a1452)), closes [#8409](https://github.com/vuejs/core/issues/8409)
* **types/jsx:** `hidden`속성을 추가하고 `hidden`값 누락 ([#8090](https://github.com/vuejs/core/issues/8090)) ([ceb0732](https://github.com/vuejs/core/commit/ceb0732e0b1bb4c8c505d80e97ff6fc89035fa90))
* **types/jsx:** img요소에 누락된 로딩 속성을 추가 ([#6160](https://github.com/vuejs/core/issues/6160)) ([68d6b43](https://github.com/vuejs/core/commit/68d6b43f7e29b76aab2c6c1882885380a43fa3e3))
* **types:** 정의되지 않은 기본값이 있는 부울 속성에 대한 올바른 withDefaults 반환type ([#8602](https://github.com/vuejs/core/issues/8602)) ([f07cb18](https://github.com/vuejs/core/commit/f07cb18fedf9a446545aadf76bcdfb957c7ebcbd))
* **types:** nextTick return type이 올바른 Promise값을 반영하는지 확인 ([#8406](https://github.com/vuejs/core/issues/8406)) ([6a22b1f](https://github.com/vuejs/core/commit/6a22b1f6c287b60eda385df8a514335af8e040ea))
* **types:** svg element의 스타일에 대한 올바른 type지원 ([#6322](https://github.com/vuejs/core/issues/6322)) ([364dc53](https://github.com/vuejs/core/commit/364dc53c7cc6f97d812ad175199c698faa92538e))

## 🌏 Performance Improvements

- **compiler-sfc:** lazy require typescript ([d2c3d8b](https://github.com/vuejs/core/commit/d2c3d8b70b2df6e16f053a7ac58e6b04e7b2078f))
- **custom-element:** 연결이 끊어지면 `MutationObserver`리스너를 취소 ([#8666](https://github.com/vuejs/core/issues/8666)) ([24d98f0](https://github.com/vuejs/core/commit/24d98f03276de5b0fbced5a4c9d61b24e7d9d084))
- `defineComponent`를 side-effect없는 것으로 표시 ([#8512](https://github.com/vuejs/core/issues/8512)) ([438027c](https://github.com/vuejs/core/commit/438027cf9ecb63260f59d3027e0b188717694795))

<br/><br/>

# 🐳 Vue v3.3.6

날짜 : 2023-10-20

## 🌏 Bug Fixes

* **compiler-sfc:** model name 충돌 수정([#8798](https://github.com/vuejs/core/issues/8798)) ([df81da8](https://github.com/vuejs/core/commit/df81da8be97c8a1366563c7e3e01076ef02eb8f7))
* **compiler-sfc:** 공백이 포함된 aseet path 지원 ([#8752](https://github.com/vuejs/core/issues/8752)) ([36c99a9](https://github.com/vuejs/core/commit/36c99a9c6bb6bc306be054c3c8a85ff8ce50605a))
* **compiler-ssr:** 서버에서 렌더링된 TransitionGroup에서 누락된 scopeId 수정 ([#7557](https://github.com/vuejs/core/issues/7557)) ([61c1357](https://github.com/vuejs/core/commit/61c135742795aa5e3189a79c7dec6afa21bbc8d9)), closes [#7554](https://github.com/vuejs/core/issues/7554)
* **compiler-ssr:** 옵션이 아닌 하위 항목이 있는 선택에 대한 ssr 컴파일 오류 수정 ([#9442](https://github.com/vuejs/core/issues/9442)) ([cdb2e72](https://github.com/vuejs/core/commit/cdb2e725e7ea297f1f4180fb04889a3b757bc84e)), closes [#9440](https://github.com/vuejs/core/issues/9440)
* **runtime-core:** 존재하지만 정의되지 않은 오래된 slot 삭제 ([#6484](https://github.com/vuejs/core/issues/6484)) ([75b8722](https://github.com/vuejs/core/commit/75b872213574cb37e2c9e8a15f65613f867ca9a6)), closes [#9109](https://github.com/vuejs/core/issues/9109)
* **runtime-core:** teleport가 비활성화된 CSSvar를 사용할 때 발생하는 오류 수정 ([#7341](https://github.com/vuejs/core/issues/7341)) ([8f0472c](https://github.com/vuejs/core/commit/8f0472c9abedb337dc256143b69d8ab8759dbf5c)), closes [#7342](https://github.com/vuejs/core/issues/7342)
* **teleport:** 하위 컴포넌트가 올바르게 마운트 해제되는지 확인 ([#6529](https://github.com/vuejs/core/issues/6529)) ([4162311](https://github.com/vuejs/core/commit/4162311efdb0db5ca458542e1604b19efa2fae0e)), closes [#6347](https://github.com/vuejs/core/issues/6347)
* **types:** support contenteditable="plaintext-only" ([#8796](https://github.com/vuejs/core/issues/8796)) ([26ca89e](https://github.com/vuejs/core/commit/26ca89e5cf734fbef81e182050d2a215ec8a437b))

## 🌏 Performance Improvements

- Map/Set 을 WeakMap/WeakSet로 교체 ([#8549](https://github.com/vuejs/core/issues/8549)) ([712f96d](https://github.com/vuejs/core/commit/712f96d6ac4d3d984732cba448cb84624daba850))

<br/><br/>

# 🐳 Vue v3.3.7

날짜 : 2023-10-24

## 🌏 Bug Fixes

* **compiler-sfc:** SSR을 타게팅할 때 gen useCssVars를 피하기 ([#6979](https://github.com/vuejs/core/issues/6979)) ([c568778](https://github.com/vuejs/core/commit/c568778ea3265d8e57f788b00864c9509bf88a4e)), closes [#6926](https://github.com/vuejs/core/issues/6926)
* **compiler-ssr:** ssr vnode 슬롯 fallback에 대한 적절한 scope분석 ([#7184](https://github.com/vuejs/core/issues/7184)) ([e09c26b](https://github.com/vuejs/core/commit/e09c26bc9bc4394c2c2d928806d382515c2676f3)), closes [#7095](https://github.com/vuejs/core/issues/7095)
* Windows의 상대 경로에서 type을 올바르게 해석함. ([#9446](https://github.com/vuejs/core/issues/9446)) ([089d36d](https://github.com/vuejs/core/commit/089d36d167dc7834065b03ca689f9b6a44eead8a)), closes [#8671](https://github.com/vuejs/core/issues/8671)
* **hmr:** v-for에서 hoist한 child 배열에 대한 HMR 오류 수정 ([7334376](https://github.com/vuejs/core/commit/733437691f70ebca8dd6cc3bc8356f5b57d4d5d8)), closes [#6978](https://github.com/vuejs/core/issues/6978) [#7114](https://github.com/vuejs/core/issues/7114)
* **reactivity:** symbol 속성을 observing하면서 array.length할당 ([#7568](https://github.com/vuejs/core/issues/7568)) ([e9e2778](https://github.com/vuejs/core/commit/e9e2778e9ec5cca07c1df5f0c9b7b3595a1a3244))
* **scheduler:** 작업 순서가 올바른지 확인 ([#7748](https://github.com/vuejs/core/issues/7748)) ([a8f6638](https://github.com/vuejs/core/commit/a8f663867b8cd2736b82204bc58756ef02441276)), closes [#7576](https://github.com/vuejs/core/issues/7576)
* **ssr:** 컴포트 루트에서 비활성화된 순간 이동에 대한 hytdration 불일치 수정 ([#9399](https://github.com/vuejs/core/issues/9399)) ([d8990fc](https://github.com/vuejs/core/commit/d8990fc6182d1c2cf0a8eab7b35a9d04df668507)), closes [#6152](https://github.com/vuejs/core/issues/6152)
* **Suspense:** 전환이 완료되기 전에 hook 호출 ([#9388](https://github.com/vuejs/core/issues/9388)) ([00de3e6](https://github.com/vuejs/core/commit/00de3e61ed7a55e7d6c2e1987551d66ad0f909ff)), closes [#5844](https://github.com/vuejs/core/issues/5844) [#5952](https://github.com/vuejs/core/issues/5952)
* **transition/ssr:** 전환을 SSR과 함께 작동하도록 표시 ([#8859](https://github.com/vuejs/core/issues/8859)) ([5ea8a8a](https://github.com/vuejs/core/commit/5ea8a8a4fab4e19a71e123e4d27d051f5e927172)), closes [#6951](https://github.com/vuejs/core/issues/6951)
* **types:** ComponentCustomProps 확대 수정([#9468](https://github.com/vuejs/core/issues/9468)) ([7374e93](https://github.com/vuejs/core/commit/7374e93f0281f273b90ab5a6724cc47332a01d6c)), closes [#8376](https://github.com/vuejs/core/issues/8376)
* **types:** 문자열과 컴포넌트의 union을 지원하도록 `h`오버로드를 개선([#5432](https://github.com/vuejs/core/issues/5432)) ([16ecb44](https://github.com/vuejs/core/commit/16ecb44c89cd8299a3b8de33cccc2e2cc36f065b)), closes [#5431](https://github.com/vuejs/core/issues/5431)

<br/><br/>

# 🐳 Vue v3.3.8

날짜 : 2023-11-06

## 🌏 Bug Fixes

* **compile-sfc:** support `Error` type in `defineProps` ([#5955](https://github.com/vuejs/core/issues/5955)) ([a989345](https://github.com/vuejs/core/commit/a9893458ec519aae442e1b99e64e6d74685cd22c))
* **compiler-core:** 식(expression) 재작성 시 알려진 전역 변수는 지역 변수로 가려져야 함 ([#9492](https://github.com/vuejs/core/issues/9492)) ([a75d1c5](https://github.com/vuejs/core/commit/a75d1c5c6242e91a73cc5ba01e6da620dea0b3d9)), closes [#9482](https://github.com/vuejs/core/issues/9482)
* **compiler-sfc:** slot에 대한 동적 지시어 인수 사용 확인 문제 수정 ([#9495](https://github.com/vuejs/core/issues/9495)) ([b39fa1f](https://github.com/vuejs/core/commit/b39fa1f8157647859331ce439c42ae016a49b415)), closes [#9493](https://github.com/vuejs/core/issues/9493)
* **deps:** dependency @vue/repl를 ^2.6.2로 업데이트 ([#9536](https://github.com/vuejs/core/issues/9536)) ([5cef325](https://github.com/vuejs/core/commit/5cef325f41e3b38657c72fa1a38dedeee1c7a60a))
* **deps:** dependency @vue/repl를 ^2.6.3로 업데이트 ([#9540](https://github.com/vuejs/core/issues/9540)) ([176d590](https://github.com/vuejs/core/commit/176d59058c9aecffe9da4d4311e98496684f06d4))
* **hydration:** comment/text node hydration mismatch시 tagName 액세스 오류 수정 ([dd8a0cf](https://github.com/vuejs/core/commit/dd8a0cf5dcde13d2cbd899262a0e07f16e14e489)), closes [#9531](https://github.com/vuejs/core/issues/9531)
* **types:** 생성된 dts에 Iru-cachetype이 노출 되지 않도록 하기 ([462aeb3](https://github.com/vuejs/core/commit/462aeb3b600765e219ded2ee9a0ed1e74df61de0)), closes [#9521](https://github.com/vuejs/core/issues/9521)
* **warn:** Suspense를 사용하여 빈 children에 대한 경고 방지 ([#3962](https://github.com/vuejs/core/issues/3962)) ([405f345](https://github.com/vuejs/core/commit/405f34587a63a5f1e3d147b9848219ea98acc22d))

<br/><br/>

# 🐳 Vue v3.3.9

날짜 : 2023-11-25

## 🌏 Bug Fixes

* **compiler-core:** inline for 루프에서 범위 변수를 다시 작성하지 마세요. ([#7245](https://github.com/vuejs/core/issues/7245)) ([a2d810e](https://github.com/vuejs/core/commit/a2d810eb40cef631f61991ca68b426ee9546aba0)), closes [#7238](https://github.com/vuejs/core/issues/7238)
* **compiler-core:** resolveParserPlugins` decorators 검사 수정([#9566](https://github.com/vuejs/core/issues/9566)) ([9d0eba9](https://github.com/vuejs/core/commit/9d0eba916f3bf6fb5c03222400edae1a2db7444f)), closes [#9560](https://github.com/vuejs/core/issues/9560)
* **compiler-sfc:** 지속적으로 type-only prop 이름을 escape함. ([#8654](https://github.com/vuejs/core/issues/8654)) ([3e08d24](https://github.com/vuejs/core/commit/3e08d246dfd8523c54fb8e7a4a6fd5506ffb1bcc)), closes [#8635](https://github.com/vuejs/core/issues/8635) [#8910](https://github.com/vuejs/core/issues/8910) [vitejs/vite-plugin-vue#184](https://github.com/vitejs/vite-plugin-vue/issues/184)
* **compiler-sfc:** path.posix.join()을 사용하는 Windows의 잘못된 파일 이름 수정 ([#9478](https://github.com/vuejs/core/issues/9478)) ([f18a174](https://github.com/vuejs/core/commit/f18a174979626b3429db93c5d5b7ae5448917c70)), closes [#8671](https://github.com/vuejs/core/issues/8671) [#9583](https://github.com/vuejs/core/issues/9583) [#9446](https://github.com/vuejs/core/issues/9446) [#9473](https://github.com/vuejs/core/issues/9473)
* **compiler-sfc:** 범위가 지정된 css 재작성에서 `:is` and `:where` selector를 지원([#8929](https://github.com/vuejs/core/issues/8929)) ([3227e50](https://github.com/vuejs/core/commit/3227e50b32105f8893f7dff2f29278c5b3a9f621))
* **compiler-sfc:** support는 defineEmits에 대한 확장 인터페이스를 해결 ([#8470](https://github.com/vuejs/core/issues/8470)) ([9e1b74b](https://github.com/vuejs/core/commit/9e1b74bcd5fa4151f5d1bc02c69fbbfa4762f577)), closes [#8465](https://github.com/vuejs/core/issues/8465)
* **hmr/transition:** hmr이후 사라지는 transition 내부의 kept-alive컴포넌트 수정([#7126](https://github.com/vuejs/core/issues/7126)) ([d11e978](https://github.com/vuejs/core/commit/d11e978fc98dcc83526c167e603b8308f317f786)), closes [#7121](https://github.com/vuejs/core/issues/7121)
* **hydration:** .prop수정자를 사용하여 v-bind에 대한 강제 hydration ([364f319](https://github.com/vuejs/core/commit/364f319d214226770d97c98d8fcada80c9e8dde3)), closes [#7490](https://github.com/vuejs/core/issues/7490)
* **hydration:** 불확실한 prop을 적절하게 hydrate ([34b5a5d](https://github.com/vuejs/core/commit/34b5a5da4ae9c9faccac237acd7acc8e7e017571)), closes [#7476](https://github.com/vuejs/core/issues/7476)
* **reactivity:** 읽기 전용 컬렉션의 clear method는 undefined값을 반환해야함. ([#7316](https://github.com/vuejs/core/issues/7316)) ([657476d](https://github.com/vuejs/core/commit/657476dcdb964be4fbb1277c215c073f3275728e))
* **reactivity:** onCleanup도 청소해야 함. ([#8655](https://github.com/vuejs/core/issues/8655)) ([73fd810](https://github.com/vuejs/core/commit/73fd810eebdd383a2b4629f67736c4db1f428abd)), closes [#5151](https://github.com/vuejs/core/issues/5151) [#7695](https://github.com/vuejs/core/issues/7695)
* **ssr:** devtools에 수화 `__vnode`가 누락되어 있다. ([#9328](https://github.com/vuejs/core/issues/9328)) ([5156ac5](https://github.com/vuejs/core/commit/5156ac5b38cfa80d3db26f2c9bf40cb22a7521cb))
* **types:** `StyleValue`에 falsy value type을 허용함. ([#7954](https://github.com/vuejs/core/issues/7954)) ([17aa92b](https://github.com/vuejs/core/commit/17aa92b79b31d8bb8b5873ddc599420cb9806db8)), closes [#7955](https://github.com/vuejs/core/issues/7955)
* **types:** emit와 함께 defineComponent return type을 사용하는 defineCustomElement ([#7937](https://github.com/vuejs/core/issues/7937)) ([5d932a8](https://github.com/vuejs/core/commit/5d932a8e6d14343c9d7fc7c2ecb58ac618b2f938)), closes [#7782](https://github.com/vuejs/core/issues/7782)
* **types:** input union type에 computedRef가 포함된 경우 `unref`및 `toValue`를 수정 ([#8748](https://github.com/vuejs/core/issues/8748)) ([176d476](https://github.com/vuejs/core/commit/176d47671271b1abc21b1508e9a493c7efca6451)), closes [#8747](https://github.com/vuejs/core/issues/8747) [#8857](https://github.com/vuejs/core/issues/8857)
* **types:** prop type이 setup returned type과 호환되지 않는 경우 인스턴스 type 수정 ([#7338](https://github.com/vuejs/core/issues/7338)) ([0e1e8f9](https://github.com/vuejs/core/commit/0e1e8f919e5a74cdaadf9c80ee135088b25e7fa3)), closes [#5885](https://github.com/vuejs/core/issues/5885)
* **types:** union value type으로 shallowRef return type 수정 ([#7853](https://github.com/vuejs/core/issues/7853)) ([7c44800](https://github.com/vuejs/core/commit/7c448000b0def910c2cfabfdf7ff20a3d6bc844f)), closes [#7852](https://github.com/vuejs/core/issues/7852)
* **types:** class 바인딩에 대한 보다 정확한 type ([#8012](https://github.com/vuejs/core/issues/8012)) ([46e3374](https://github.com/vuejs/core/commit/46e33744c890bd49482c5e5c5cdea44e00ec84d5))
* **types:** defineProps return type에서 선택적 속성을 제거 ([#6421](https://github.com/vuejs/core/issues/6421)) ([94c049d](https://github.com/vuejs/core/commit/94c049d930d922069e38ea8700d7ff0970f71e61)), closes [#6420](https://github.com/vuejs/core/issues/6420)
* **types:** withDefaults의 반환 type은 읽기 전용이어야 함. ([#8601](https://github.com/vuejs/core/issues/8601)) ([f15debc](https://github.com/vuejs/core/commit/f15debc01acb22d23f5acee97e6f02db88cef11a))
* **types:** class type 제한 되돌리기 ([5d077c8](https://github.com/vuejs/core/commit/5d077c8754cc14f85d2d6d386df70cf8c0d93842)), closes [#8012](https://github.com/vuejs/core/issues/8012)
* **types:** jsx type 정의 업데이트([#8607](https://github.com/vuejs/core/issues/8607)) ([58e2a94](https://github.com/vuejs/core/commit/58e2a94871ae06a909c5f8bad07fb401193e6a38))
* **types:** widen ClassValue type ([2424013](https://github.com/vuejs/core/commit/242401305944422d0c361b16101a4d18908927af))
* **v-model:** 동일한 값으로 숫자 입력을 덮어쓰지 마시오. ([#7004](https://github.com/vuejs/core/issues/7004)) ([40f4b77](https://github.com/vuejs/core/commit/40f4b77bb570868cb6e47791078767797e465989)), closes [#7003](https://github.com/vuejs/core/issues/7003)
* **v-model:** 불필요한 값 바인딩 오류는 정적 바인딩 대신 동적 바인딩에 적용되어야 함. ([2859b65](https://github.com/vuejs/core/commit/2859b653c9a22460e60233cac10fe139e359b046)), closes [#3596](https://github.com/vuejs/core/issues/3596)

<br/><br/>

# 🐳 Vue v3.3.10

날짜 : 2023-12-04

## 🌏 Bug Fixes

* **app:** 옵션이 다른 앱 간에 템플릿이 캐시되지 않도록 방지 ([#9724](https://github.com/vuejs/core/issues/9724)) ([ec71585](https://github.com/vuejs/core/commit/ec715854ca12520b2afc9e9b3981cbae05ae5206)), closes [#9618](https://github.com/vuejs/core/issues/9618)
* **compiler-sfc:** forEach 인덱스를 genMap으로 전달하지 마세요. ([f12db7f](https://github.com/vuejs/core/commit/f12db7fb564a534cef2e5805cc9f54afe5d72fbf))
* **compiler-sfc:** 확실한 pug/jade template ([6345197](https://github.com/vuejs/core/commit/634519720a21fb5a6871454e1cadad7053a568b8)), closes [#3231](https://github.com/vuejs/core/issues/3231) [#3842](https://github.com/vuejs/core/issues/3842) [#7723](https://github.com/vuejs/core/issues/7723)
* **compiler-sfc:** 여러 selector가 있는 scoped mode의 `:where`및 `:is` selector 수정 ([#9735](https://github.com/vuejs/core/issues/9735)) ([c3e2c55](https://github.com/vuejs/core/commit/c3e2c556b532656b50b8ab5cd2d9eabc26622d63)), closes [#9707](https://github.com/vuejs/core/issues/9707)
* **compiler-sfc:** 더 많은 트리쉐이킹 친화적인 코드 생성 ([#9507](https://github.com/vuejs/core/issues/9507)) ([8d74ca0](https://github.com/vuejs/core/commit/8d74ca0e6fa2738ca6854b7e879ff59419f948c7)), closes [#9500](https://github.com/vuejs/core/issues/9500)
* **compiler-sfc:** generic types 추론 지원([#8511](https://github.com/vuejs/core/issues/8511)) ([eb5e307](https://github.com/vuejs/core/commit/eb5e307c0be62002e62c4c800d0dfacb39b0d4ca)), closes [#8482](https://github.com/vuejs/core/issues/8482)
* **compiler-sfc:** props에서 컴포넌트 resolving 지원 ([#8785](https://github.com/vuejs/core/issues/8785)) ([7cbcee3](https://github.com/vuejs/core/commit/7cbcee3d831241a8bd3588ae92d3f27e3641e25f))
* **compiler-sfc:** type확인 중에 TS를 로드하지 못하면 오류가 발생 ([#8883](https://github.com/vuejs/core/issues/8883)) ([4936d2e](https://github.com/vuejs/core/commit/4936d2e11a8d0ca3704bfe408548cb26bb3fd5e9))
* **cssVars:** ssr에 대한 코드를 생성할 때 cssVar 이름은 이중 이스케이프되어야 한다. ([#8824](https://github.com/vuejs/core/issues/8824)) ([5199a12](https://github.com/vuejs/core/commit/5199a12f8855cd06f24bf355708b5a2134f63176)), closes [#7823](https://github.com/vuejs/core/issues/7823)
* **deps:** compiler를 ^7.23.4로 업데이트([#9681](https://github.com/vuejs/core/issues/9681)) ([31f6ebc](https://github.com/vuejs/core/commit/31f6ebc4df84490ed29fb75e7bf4259200eb51f0))
* **runtime-core:** Suspense는 Transition에서 적절하게 anchor를 얻음 ([#9309](https://github.com/vuejs/core/issues/9309)) ([65f3fe2](https://github.com/vuejs/core/commit/65f3fe273127a8b68e1222fbb306d28d85f01757)), closes [#8105](https://github.com/vuejs/core/issues/8105)
* **runtime-dom:** 단위를 속성으로 사용하여 width/height 설정 ([#8781](https://github.com/vuejs/core/issues/8781)) ([bfc1838](https://github.com/vuejs/core/commit/bfc1838f31199de3f189198a3c234fa7bae91386))
* **ssr:** 서버 렌더링 전에 계산이 실수로 캐시되는 것을 방지 ([#9688](https://github.com/vuejs/core/issues/9688)) ([30d5d93](https://github.com/vuejs/core/commit/30d5d93a92b2154406ec04f8aca6b217fa01177c)), closes [#5300](https://github.com/vuejs/core/issues/5300)
* **types:** functional component의 props로 emits를 노출함. ([#9234](https://github.com/vuejs/core/issues/9234)) ([887e54c](https://github.com/vuejs/core/commit/887e54c347ea9eac4c721b5e2288f054873d1d30))
* **types:** reactive collection types를 수정 ([#8960](https://github.com/vuejs/core/issues/8960)) ([ad27473](https://github.com/vuejs/core/commit/ad274737015c36906d76f3189203093fa3a2e4e7)), closes [#8904](https://github.com/vuejs/core/issues/8904)
* **types:** withKeys및 withModifiers return type개선 ([#9734](https://github.com/vuejs/core/issues/9734)) ([43c3cfd](https://github.com/vuejs/core/commit/43c3cfdec5ae5d70fa2a21e857abc2d73f1a0d07))

## 🌏 Performance Improvements

* on* prop 검사 최적화([38aaa8c](https://github.com/vuejs/core/commit/38aaa8c88648c54fe2616ad9c0961288092fcb44))
* **runtime-dom:** 캐시 수정자 wrapper 함수([da4a4fb](https://github.com/vuejs/core/commit/da4a4fb5e8eee3c6d31f24ebd79a9d0feca56cb2)), closes [#8882](https://github.com/vuejs/core/issues/8882)
* **v-on:** 수정자가 있는 상수 핸들러는 동적 핸들러로 처리되어서는 안된다. ([4d94ebf](https://github.com/vuejs/core/commit/4d94ebfe75174b340d2b794e699cad1add3600a9))

<br/><br/>

# 🐳 Vue v3.3.11

날짜 : 2023-12-08

## 🌏 Bug Fixes

* **custom-element:** prod에서 숫자 유형 props를 올바르게 처리함. ([#8989](https://github.com/vuejs/core/issues/8989)) ([d74d364](https://github.com/vuejs/core/commit/d74d364d62db8e48881af6b5a75ce4fb5f36cc35))
* **reactivity:** reactive Array의 사용자 프록시에 대한 mutation 수정 ([6ecbd5c](https://github.com/vuejs/core/commit/6ecbd5ce2a7f59314a8326a1d193874b87f4d8c8)), closes [#9742](https://github.com/vuejs/core/issues/9742) [#9751](https://github.com/vuejs/core/issues/9751) [#9750](https://github.com/vuejs/core/issues/9750)
* **runtime-dom:** width와 height props 확인 조건 수정 ([5b00286](https://github.com/vuejs/core/commit/5b002869c533220706f9788b496b8ca8d8e98609)), closes [#9762](https://github.com/vuejs/core/issues/9762)
* **shared:** toDisplayString의 symbol key를 사용하여 Map을 처리 ([#9731](https://github.com/vuejs/core/issues/9731)) ([364821d](https://github.com/vuejs/core/commit/364821d6bdb1775e2f55a69bcfb9f40f7acf1506)), closes [#9727](https://github.com/vuejs/core/issues/9727)
* **shared:** toDisplayString에서 더 많은 symbol case처리 ([983d45d](https://github.com/vuejs/core/commit/983d45d4f8eb766b5a16b7ea93b86d3c51618fa6))
* **Suspense:** fallback vnode를 마운트 할 때 올바르게 anchor를 얻음.([#9770](https://github.com/vuejs/core/issues/9770)) ([b700328](https://github.com/vuejs/core/commit/b700328342e17dc16b19316c2e134a26107139d2)), closes [#9769](https://github.com/vuejs/core/issues/9769)
* **types:** ref() return type은 초기 값이 any인 경우 any가 아니어야 함. ([#9768](https://github.com/vuejs/core/issues/9768)) ([cdac121](https://github.com/vuejs/core/commit/cdac12161ec27b45ded48854c3d749664b6d4a6d))
* **watch:** 하위 컴포넌트 마운트 해제 시 사전 watcher를 실행하면 안된다. ([#7181](https://github.com/vuejs/core/issues/7181)) ([6784f0b](https://github.com/vuejs/core/commit/6784f0b1f8501746ea70d87d18ed63a62cf6b76d)), closes [#7030](https://github.com/vuejs/core/issues/7030)

<br/><br/>

# 🐳 Vue v3.3.12

날짜 : 2023-12-16

## 🌏 Bug Fixes

* **hydration:** patch prop이전에 appear transition 처리 ([#9837](https://github.com/vuejs/core/issues/9837)) ([e70f4c4](https://github.com/vuejs/core/commit/e70f4c47c553b6e16d8fad70743271ca23802fe7)), closes [#9832](https://github.com/vuejs/core/issues/9832)
* **sfc/cssVars:** 문자열 값으로 인라인 스타일을 설정할 때 CSS v-bind 변수 손실 수정 ([#9824](https://github.com/vuejs/core/issues/9824)) ([0a387df](https://github.com/vuejs/core/commit/0a387dfb1d04afb6eae4296b6da76dfdaca77af4)), closes [#9821](https://github.com/vuejs/core/issues/9821)
* **ssr:** fallback content의 suspense hydration 수정 ([#7188](https://github.com/vuejs/core/issues/7188)) ([60415b5](https://github.com/vuejs/core/commit/60415b5d67df55f1fd6b176615299c08640fa142))
* **types:** add `xmlns:xlink` to `SVGAttributes` ([#9300](https://github.com/vuejs/core/issues/9300)) ([0d61b42](https://github.com/vuejs/core/commit/0d61b429ecf63591d31e09702058fa4c7132e1a7)), closes [#9299](https://github.com/vuejs/core/issues/9299)
* **types:** fix `shallowRef` type error ([#9839](https://github.com/vuejs/core/issues/9839)) ([9a57158](https://github.com/vuejs/core/commit/9a571582b53220270e498d8712ea59312c0bef3a))
* **types:** support for generic keyof slots ([#8374](https://github.com/vuejs/core/issues/8374)) ([213eba4](https://github.com/vuejs/core/commit/213eba479ce080efc1053fe636f6be4a4c889b44))

<br/><br/>

# 🐳 Vue v3.3.13

날짜 : 2023-12-19

## 🌏 Bug Fixes

* **compiler-core:** undefined의 인라인 표현식에서 modifier를 사용하여 v-on을 수정([#9866](https://github.com/vuejs/core/issues/9866)) ([bae79dd](https://github.com/vuejs/core/commit/bae79ddf8564a2da4a5365cfeb8d811990f42335)), closes [#9865](https://github.com/vuejs/core/issues/9865)
* **runtime-dom:** key/modifiers별 캐시 이벤트 핸들러 ([#9851](https://github.com/vuejs/core/issues/9851)) ([04d2c05](https://github.com/vuejs/core/commit/04d2c05054c26b02fbc1d84839b0ed5cd36455b6)), closes [#9849](https://github.com/vuejs/core/issues/9849)
* **types:** 확장 컬렉션에서 속성 추출 ([#9854](https://github.com/vuejs/core/issues/9854)) ([24b1c1d](https://github.com/vuejs/core/commit/24b1c1dd57fd55d998aa231a147500e010b10219)), closes [#9852](https://github.com/vuejs/core/issues/9852)

<br/><br/>