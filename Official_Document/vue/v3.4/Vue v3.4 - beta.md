# 🐳 Vue v3.4.0-beta.1

날짜 : 2023-12-13

## 🌏 Bug Fixes

* **compiler-core:** 모든 컴파일 단계에 동일한 해결 옵션을 사용 ([#9760](https://github.com/vuejs/core/issues/9760)) ([0dc875d](https://github.com/vuejs/core/commit/0dc875d53e5d869b44d0c1a70736ec859337b58f))
* **hydration:** nullish prop에 대한 불일치를 경고해선 안됨 ([33159a5](https://github.com/vuejs/core/commit/33159a5916bf7686fe53517befa59b450b34e974))
* **hydration:** hydration 불일치 경고에 대해 클라이언트/서버 라벨 교체 ([f41fd86](https://github.com/vuejs/core/commit/f41fd86d5f26bd0009b4ca285ddc3cefaafa9f7c)), closes [#9098](https://github.com/vuejs/core/issues/9098) [#5953](https://github.com/vuejs/core/issues/5953)
* **runtime-core:** 해결되지 않은 async setup 컴포넌트를 패치할 때 서스펜스 충돌 수정 ([#7290](https://github.com/vuejs/core/issues/7290)) ([bb0c889](https://github.com/vuejs/core/commit/bb0c8899cadd03af22e23c0383aaab363635c5b4)), closes [#5993](https://github.com/vuejs/core/issues/5993) [#6463](https://github.com/vuejs/core/issues/6463) [#6949](https://github.com/vuejs/core/issues/6949) [#6095](https://github.com/vuejs/core/issues/6095) [#8121](https://github.com/vuejs/core/issues/8121)
* **runtime-core:** async setup으로 컴포넌트를 마운트할 때 경고 컨텍스트를 올바르게 표시 ([69a2acc](https://github.com/vuejs/core/commit/69a2acc6ea159da8300a68ecc8953f19932c251b))
* **ssr:** ([#7188](https://github.com/vuejs/core/issues/7188)) fallback 콘텐츠의 suspense hydration문제 수정([60415b5](https://github.com/vuejs/core/commit/60415b5d67df55f1fd6b176615299c08640fa142))
* **ssr:** `isInSSRComponentSetup`상태를 Vue 복사본 전체에서 공유 가능하게 만듬.([e04d821](https://github.com/vuejs/core/commit/e04d821422102446704e223c03e50d26cbb1fe69))
* **Suspense:** 해결하기 전에 kept-alive컴포넌트에서 전환을 처리. ([aa0c13f](https://github.com/vuejs/core/commit/aa0c13f637df7eb27faa2545ee731f543c0813ec)), closes [#6416](https://github.com/vuejs/core/issues/6416) [#6467](https://github.com/vuejs/core/issues/6467)
* **Suspense:** 제대로 수정 [#6416](https://github.com/vuejs/core/issues/6416) ([0db336f](https://github.com/vuejs/core/commit/0db336ff6c640fb9d3e48943c69f4c1737412be4))
* **types:** `SVGAttributes`에 `xmlns:xlink`를 추가 ([#9300](https://github.com/vuejs/core/issues/9300)) ([0d61b42](https://github.com/vuejs/core/commit/0d61b429ecf63591d31e09702058fa4c7132e1a7)), closes [#9299](https://github.com/vuejs/core/issues/9299)
* **types:** support for generic keyof slots ([#8374](https://github.com/vuejs/core/issues/8374)) ([213eba4](https://github.com/vuejs/core/commit/213eba479ce080efc1053fe636f6be4a4c889b44))

## 🌏 Features

* **compiler-core:** TransformContext에 현재 파일 이름 추가 ([#8950](https://github.com/vuejs/core/issues/8950)) ([638f1ab](https://github.com/vuejs/core/commit/638f1abbb632000553e2b7d75e87c95d8ca192d6))
* **compiler-sfc:** defineModel stable 승격([#9598](https://github.com/vuejs/core/issues/9598)) ([ef688ba](https://github.com/vuejs/core/commit/ef688ba92bfccbc8b7ea3997eb297665d13e5249))
* **compiler-sfc:** 속성 및 `using` syntax import 지원 ([#8786](https://github.com/vuejs/core/issues/8786)) ([5b2bd1d](https://github.com/vuejs/core/commit/5b2bd1df78e8ff524c3a184adaa284681aba6574))
* **defineModel:** 기본적으로 로컬 mutation을 지원하고 로컬 옵션을 제거 ([f74785b](https://github.com/vuejs/core/commit/f74785bc4ad351102dde17fdfd2c7276b823111f)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)
* MathML support ([#7836](https://github.com/vuejs/core/issues/7836)) ([d42b6ba](https://github.com/vuejs/core/commit/d42b6ba3f530746eb1221eb7a4be0f44eb56f7d3)), closes [#7820](https://github.com/vuejs/core/issues/7820)
* **runtime-core:** props validator function에 전체 props를 제공 ([#3258](https://github.com/vuejs/core/issues/3258)) ([8e27692](https://github.com/vuejs/core/commit/8e27692029a4645cd54287f776c0420f2b82740b))
* **ssr:** `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` feature flag를 추가 ([#9550](https://github.com/vuejs/core/issues/9550)) ([bc7698d](https://github.com/vuejs/core/commit/bc7698dbfed9b5327a93565f9df336ae5a94d605))
* **ssr:** ssr hydration 불일치 검사 개선 ([#5953](https://github.com/vuejs/core/issues/5953)) ([2ffc1e8](https://github.com/vuejs/core/commit/2ffc1e8cfdc6ec9c45c4a4dd8e3081b2aa138f1e)), closes [#5063](https://github.com/vuejs/core/issues/5063)
* **types:** `FunctionalComponent`에 emits와 slot type을 추가 ([#8644](https://github.com/vuejs/core/issues/8644)) ([927ab17](https://github.com/vuejs/core/commit/927ab17cfc645e82d061fdf227c34689491268e1))
* **types:** export AriaAttributes type ([#8909](https://github.com/vuejs/core/issues/8909)) ([fd0b6ba](https://github.com/vuejs/core/commit/fd0b6ba01660499fa07b0cf360eefaac8cca8287))
* **types:** export ObjectPlugin and FunctionPlugin types ([#8946](https://github.com/vuejs/core/issues/8946)) ([fa4969e](https://github.com/vuejs/core/commit/fa4969e7a3aefa6863203f9294fc5e769ddf6d8f)), closes [#8577](https://github.com/vuejs/core/issues/8577)
* **types:** expose `DefineProps` type ([096ba81](https://github.com/vuejs/core/commit/096ba81817b7da15f61bc55fc1a93f72ac9586e0))
* **types:** expose `PublicProps` type ([#2403](https://github.com/vuejs/core/issues/2403)) ([44135dc](https://github.com/vuejs/core/commit/44135dc95fb8fea26b84d1433839d28b8c21f708))
* **types:** 기본 요소와 함께 `h`를 사용할 때 이벤트 타입 추론을 개선 ([#9756](https://github.com/vuejs/core/issues/9756)) ([a625376](https://github.com/vuejs/core/commit/a625376ac8901eea81bf3c66cb531f2157f073ef))
* **types:** ComponentInstance type 제공 ([#5408](https://github.com/vuejs/core/issues/5408)) ([bfb8565](https://github.com/vuejs/core/commit/bfb856565d3105db4b18991ae9e404e7cc989b25))
* **types:** 전역 지시문을 등록할 때 제네릭 전달 지원 ([#9660](https://github.com/vuejs/core/issues/9660)) ([a41409e](https://github.com/vuejs/core/commit/a41409ed02a8c7220e637f56caf6813edeb077f8))

## 🌏 Performance Imporvements

* defineModel local mode에 동기화 watcher 사용 ([7e60d10](https://github.com/vuejs/core/commit/7e60d1058ff06e3d37c8608f3449453321220edc)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)

<br/><br/>

# 🐳 Vue v3.4.0-beta.2

날짜 : 2023-12-14

## 🌏 Features

* **types:** 기본 jsx 전역 등록 제거 ([92b8d9c](https://github.com/vuejs/core/commit/92b8d9cef69146540db2bf7f2a5632ab5d38f672))

## 🌏 Breaking Changes

* **types:** Vue는 더 이상 기본적으로 전역 `JSX` namespace를 등록하지 않음.

<br/><br/>

# 🐳 Vue v3.4.0-beta.3

날짜 : 2023-12-13

## 🌏 Bug Fixes

* **compiler-core:** vnode hook 오류 메세지 ([#9842](https://github.com/vuejs/core/issues/9842)) ([7bc3c9e](https://github.com/vuejs/core/commit/7bc3c9e205c5158230772d9fcd25bf300809342e))
* **defineModel:** prop 변경 시 트리거 effect 보장 ([#9841](https://github.com/vuejs/core/issues/9841)) ([eb12f21](https://github.com/vuejs/core/commit/eb12f211b8e312fd64d91ef1a58b2c2db618bdee)), closes [#9838](https://github.com/vuejs/core/issues/9838)
* **mathml:** 알려진 mathML tags 업데이트 ([#9829](https://github.com/vuejs/core/issues/9829)) ([ebd78d2](https://github.com/vuejs/core/commit/ebd78d2c99d9587307e444e6b7baa7bc920d42e7))
* **Suspense:** async HOC child가 remount중에 Suspense가 패치되는 edge case 수정 ([f0f6f7c](https://github.com/vuejs/core/commit/f0f6f7cea6e16650181e71dcfccbee405a1db503))

<br/><br/>

# 🐳 Vue v3.4.0-beta.4

날짜 : 2023-12-13

## 🌏 Bug Fixes

* **compile-sfc:**재사용된 AST로 인해 발생하는 식별자 접두사 edge case 수정 ([#9867](https://github.com/vuejs/core/issues/9867)) ([eb51b23](https://github.com/vuejs/core/commit/eb51b23d8512f15665d6f8bcdfd51582e0cd8ce8)), closes [#9853](https://github.com/vuejs/core/issues/9853) [#9863](https://github.com/vuejs/core/issues/9863)
* **ssr:** SVG요소의 클래스에 대한 hdration prop 불일치 확인 수정 ([e8448b0](https://github.com/vuejs/core/commit/e8448b018d9f837c08eace90cab404a27f68e31a))

## 🌏 Features

* **runtime-core:** 개발 중에 스케줄러가 무한루프를 감지하면 실제 오류가 발생([#7447](https://github.com/vuejs/core/issues/7447)) ([1d79b64](https://github.com/vuejs/core/commit/1d79b64ebce884d97136d71aa722347470b13e35)), closes [#7437](https://github.com/vuejs/core/issues/7437)
