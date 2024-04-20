# 🐳 Vue v3.4.0 Slam Dunk

❗ Read [this blog post](https://blog.vuejs.org/posts/vue-3-4) for an overview of the release highlights.

날짜 : 2023-12-29

## 🌏 Potential Action Needed

1. 3.4의 새로운 기능을 최대한 활용하려면 3.4로 업그레이드 할 떄 다음 종속성도 업데이트 하는 것이 좋습니다.:
   - Volar / vue-tsc@^1.8.27 (**required**)
   - @vitejs/plugin-vue@^5.0.0 (if using Vite)
   - nuxt@^3.9.0 (if using Nuxt)
   - vue-loader@^17.4.0 (if using webpack or vue-cli)
2. Vue에서 TSX를 사용하는 경우, [Removed: Global JSX Namespace](https://blog.vuejs.org/posts/vue-3-4#global-jsx-namespace) 에서 필요한 조치를 확인.
3. 더 이상 사용되지 않는 기능을 사용하지 않는지 확인하세요.(사용하는 경우 콘솔에 경고 메세지가 포함되야함.)<br/>[removed in 3.4](https://blog.vuejs.org/posts/vue-3-4#other-removed-features).

## 🌏 Features

* **general:** MathML 지원([#7836](https://github.com/vuejs/core/issues/7836)) ([d42b6ba](https://github.com/vuejs/core/commit/d42b6ba3f530746eb1221eb7a4be0f44eb56f7d3)), closes [#7820](https://github.com/vuejs/core/issues/7820)
* **reactivity:** 보다 효율적인 reactivity system ([#5912](https://github.com/vuejs/core/issues/5912)) ([16e06ca](https://github.com/vuejs/core/commit/16e06ca08f5a1e2af3fc7fb35de153dbe0c3087d)), closes [#311](https://github.com/vuejs/core/issues/311) [#1811](https://github.com/vuejs/core/issues/1811) [#6018](https://github.com/vuejs/core/issues/6018) [#7160](https://github.com/vuejs/core/issues/7160) [#8714](https://github.com/vuejs/core/issues/8714) [#9149](https://github.com/vuejs/core/issues/9149) [#9419](https://github.com/vuejs/core/issues/9419) [#9464](https://github.com/vuejs/core/issues/9464)
* **reactivity:** computed getter에 대한 마지막 결과 expose ([#9497](https://github.com/vuejs/core/issues/9497)) ([48b47a1](https://github.com/vuejs/core/commit/48b47a1ab63577e2dbd91947eea544e3ef185b85))
* **runtime-core / dx:** prod build의 문서에 오류 링크 ([#9165](https://github.com/vuejs/core/issues/9165)) ([9f8ba98](https://github.com/vuejs/core/commit/9f8ba9821fe166f77e63fa940e9e7e13ec3344fa))
* **runtime-core:** watch에 `once`옵션 추가 ([#9034](https://github.com/vuejs/core/issues/9034)) ([a645e7a](https://github.com/vuejs/core/commit/a645e7aa51006516ba668b3a4365d296eb92ee7d))
* **runtime-core:** props validator function에 전체 props 제공 ([#3258](https://github.com/vuejs/core/issues/3258)) ([8e27692](https://github.com/vuejs/core/commit/8e27692029a4645cd54287f776c0420f2b82740b))
* **compiler-core:** export error message ([#8729](https://github.com/vuejs/core/issues/8729)) ([f7e80ee](https://github.com/vuejs/core/commit/f7e80ee4a065a9eaba98720abf415d9e87756cbd))
* **compiler-core:** 파싱할 때 루트 네임스페이스 지정 지원 ([40f72d5](https://github.com/vuejs/core/commit/40f72d5e50b389cb11b7ca13461aa2a75ddacdb4))
* **compiler-core:** 동일한 이름을 가진 키와 값에 대한 v-bind 단축형 지원 ([#9451](https://github.com/vuejs/core/issues/9451)) ([26399aa](https://github.com/vuejs/core/commit/26399aa6fac1596b294ffeba06bb498d86f5508c))
* **compiler-core:** 언어 도구(language-tools)에 대한 파싱 허용 오차 개선 ([41ff68e](https://github.com/vuejs/core/commit/41ff68ea579d933333392146625560359acb728a))
* **compiler-core:** template 표현식에서 전역으로 Error에 액세스하는 것을 지원 ([#7018](https://github.com/vuejs/core/issues/7018)) ([bcca475](https://github.com/vuejs/core/commit/bcca475dbc58d76434cd8120b94929758cee2825))
* **compiler-core:** vnode hook 사용 중단 경고를 오류로 해제 ([8abc754](https://github.com/vuejs/core/commit/8abc754d5d86d9dfd5a7927b846f1a743f352364))
* **compiler-core:** runtime 오류 문자열 export ([#9301](https://github.com/vuejs/core/issues/9301)) ([feb2f2e](https://github.com/vuejs/core/commit/feb2f2edce2d91218a5e9a52c81e322e4033296b))
* **compiler-core:** TransformContext에 현재 파일 이름 추가 ([#8950](https://github.com/vuejs/core/issues/8950)) ([638f1ab](https://github.com/vuejs/core/commit/638f1abbb632000553e2b7d75e87c95d8ca192d6))
* **compiler-sfc:** AST를 통해 템플릿의 import 사용량 분석 ([#9729](https://github.com/vuejs/core/issues/9729)) ([e8bbc94](https://github.com/vuejs/core/commit/e8bbc946cba6bf74c9da56f938b67d2a04c340ba)), closes [#8897](https://github.com/vuejs/core/issues/8897) [nuxt/nuxt#22416](https://github.com/nuxt/nuxt/issues/22416)
* **compiler-sfc:** expose resolve type-based props and emits ([#8874](https://github.com/vuejs/core/issues/8874)) ([9e77580](https://github.com/vuejs/core/commit/9e77580c0c2f0d977bd0031a1d43cc334769d433))
* **compiler-sfc:** postcss 모듈을 v6로 변경 ([2a507e3](https://github.com/vuejs/core/commit/2a507e32f0e2ef73813705a568b8633f68bda7a9))
* **compiler-sfc:** defineModel stable 승격 ([#9598](https://github.com/vuejs/core/issues/9598)) ([ef688ba](https://github.com/vuejs/core/commit/ef688ba92bfccbc8b7ea3997eb297665d13e5249))
* **compiler-sfc:** import 속성 및 `using`구문 지원 ([#8786](https://github.com/vuejs/core/issues/8786)) ([5b2bd1d](https://github.com/vuejs/core/commit/5b2bd1df78e8ff524c3a184adaa284681aba6574))
* **compiler-sfc:** `defineModel`은 기본적으로 로컬 변형을 지원하고 로컬 옵션을 제거함 ([f74785b](https://github.com/vuejs/core/commit/f74785bc4ad351102dde17fdfd2c7276b823111f)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)
* **ssr:** `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` feature flag 추가([#9550](https://github.com/vuejs/core/issues/9550)) ([bc7698d](https://github.com/vuejs/core/commit/bc7698dbfed9b5327a93565f9df336ae5a94d605))
* **ssr:** ssr hydration 불일치 검사 개선 ([#5953](https://github.com/vuejs/core/issues/5953)) ([2ffc1e8](https://github.com/vuejs/core/commit/2ffc1e8cfdc6ec9c45c4a4dd8e3081b2aa138f1e)), closes [#5063](https://github.com/vuejs/core/issues/5063)
* **types:** const enum을 대체하려면 enum을 사용 ([#9261](https://github.com/vuejs/core/issues/9261)) ([fff7b86](https://github.com/vuejs/core/commit/fff7b864f4292d0430ba2bda7098ad43876b0210)), closes [#1228](https://github.com/vuejs/core/issues/1228)
* **types:** `FunctionalComponent`에 emits와 slots타입을 추가 ([#8644](https://github.com/vuejs/core/issues/8644)) ([927ab17](https://github.com/vuejs/core/commit/927ab17cfc645e82d061fdf227c34689491268e1))
* **types:** export `AriaAttributes` type ([#8909](https://github.com/vuejs/core/issues/8909)) ([fd0b6ba](https://github.com/vuejs/core/commit/fd0b6ba01660499fa07b0cf360eefaac8cca8287))
* **types:** export `ObjectPlugin` and `FunctionPlugin` types ([#8946](https://github.com/vuejs/core/issues/8946)) ([fa4969e](https://github.com/vuejs/core/commit/fa4969e7a3aefa6863203f9294fc5e769ddf6d8f)), closes [#8577](https://github.com/vuejs/core/issues/8577)
* **types:** expose `DefineProps` type ([096ba81](https://github.com/vuejs/core/commit/096ba81817b7da15f61bc55fc1a93f72ac9586e0))
* **types:** expose `PublicProps` type ([#2403](https://github.com/vuejs/core/issues/2403)) ([44135dc](https://github.com/vuejs/core/commit/44135dc95fb8fea26b84d1433839d28b8c21f708))
* **types:** 기본 요소(native element)와 함꼐 `h`를 사용할 떄 이벤트 type추론을 개선 ([#9756](https://github.com/vuejs/core/issues/9756)) ([a625376](https://github.com/vuejs/core/commit/a625376ac8901eea81bf3c66cb531f2157f073ef))
* **types:** provide `ComponentInstance` type ([#5408](https://github.com/vuejs/core/issues/5408)) ([bfb8565](https://github.com/vuejs/core/commit/bfb856565d3105db4b18991ae9e404e7cc989b25))
* **types:** 전역 지시문을 등록할 떄 제네릭 전달 지원 ([#9660](https://github.com/vuejs/core/issues/9660)) ([a41409e](https://github.com/vuejs/core/commit/a41409ed02a8c7220e637f56caf6813edeb077f8))

## 🌏 Performance Improvements

* **compiler-sfc:** sfc소스 맵 불필요한 직렬화 및 파싱 방지 ([f15d2f6](https://github.com/vuejs/core/commit/f15d2f6cf69c0c39f8dfb5c33122790c68bf92e2))
* **compiler-sfc:** 스크립트에서 magic-string trim제거 ([e8e3ec6](https://github.com/vuejs/core/commit/e8e3ec6ca7392e43975c75b56eaaa711d5ea9410))
* **compiler-sfc:** 더 빠른 sourcemap addMappging 사용  ([50cde7c](https://github.com/vuejs/core/commit/50cde7cfbcc49022ba88f5f69fa9b930b483c282))
* **compiler-core:** isBuiltInType 제거 최적화 ([66c0ed0](https://github.com/vuejs/core/commit/66c0ed0a3c1c6f37dafc6b1c52b75c6bf60e3136))
* **compiler-core:** position cloning 최적화([2073236](https://github.com/vuejs/core/commit/20732366b9b3530d33b842cf1fc985919afb9317))
* **codegen:** codegen 중 line / column 계산 최적화 ([3be53d9](https://github.com/vuejs/core/commit/3be53d9b974dae1a10eb795cade71ae765e17574))
* **codegen:** source map generation 최적화([c11002f](https://github.com/vuejs/core/commit/c11002f16afd243a2b15b546816e73882eea9e4d))
* **shared:** makeMap 최적화([ae6fba9](https://github.com/vuejs/core/commit/ae6fba94954bac6430902f77b0d1113a98a75b18))

## 🌏 Breaking Changes

* #### Global JSX Registration Removed

  3.4부터 Vue는 더 이상 기본적으로 전역`JSX`네임스페이스를 등록하지 않습니다. 이는 두 libs의 TSX가 동일한 프로젝트에 공존할 수 있도록 React와의 전역 네임스페이스 충돌을 피하는데 필요합니다.<br/>이는 최신 버전의 Volar를 사용하는 SFC 전용 사용자에게 영향을 미치지 않습니다.

  TSX를 사용한다면, 두가지 옵션이 있습니다:

  1. 3.4로 업그레이드 하기 전에 `tsconfig.json`에서 [jsxImportSource](https://www.typescriptlang.org/tsconfig#jsxImportSource)를 `vue`로 명시적으로 설정하세요. 파일 상단에 `/* @jsxImportSourcevue */` 주석을 추가하여 파일별로 선택할 수도 있습니다.
  2. 
     전역 `JSX`네임스페이스의 존재 여부에 따라 달라지는 코드가 있는 경우, 예를들어 `JSX.Element`등과 같은 유형을 사용하면 전역 `JSX`네임스페이스를 등록하는 `vue/jsx`를 명시적으로 참조하여 정확한 3.4 이전 전역 동작을 유지할 수 있습니다.

  이는 [release policy](https://vuejs.org/about/releases.html#semantic-versioning-edge-cases) 을 준수하는 minor release의 타입 전용 주요 변경 사항입니다..

* #### Deprecated Features Removed (더 이상 사용되지 않는 기능 제거)

  - [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) 은 3.3에서 더 이상 사용되지 않는 것으로 표시되었으며 이제 3.4에 제거되었습니다. 이 변경사항에는 기능이 실험적이므로 전공이 필요하지 않습니다. 이 기능을 계속 사용하려는 사용자는 [Vue Macros plugin](https://vue-macros.dev/features/reactivity-transform.html)을 통해 사용할 수 있습니다.
  - `app.config.unwrapInjectedRef` 가 제거되었습니다. 3.3에서는 더 이상 사용되지 않으며 기본적으로 활성화 되었습니다. 3.4에서는 더 이상 이 동작을 비활성화 할 수 없습니다.
  - template의 `@vnodeXXX` 이벤트 리스너는 이제 지원 중단 경고 대신 컴파일러 오류 입니다. `@vue:XXX` listeners 를 사용하세요.
  - `v-is` 지시문이 제거되었습니다. 3.3에서는 더 이상 사용되지 않습니다. 대신 [vue:`접두사가 있는 `is` 속성](https://vuejs.org/api/built-in-special-attributes.html#is)을 사용하세요.

<br/><br/>





