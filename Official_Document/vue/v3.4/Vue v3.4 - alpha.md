# 🐳 Vue v3.4.0-alpha.1

날짜 : 2023-10-28

## 🌏 Features

* **compiler-core:** 에러메세지 export ([#8729](https://github.com/vuejs/core/issues/8729)) ([f7e80ee](https://github.com/vuejs/core/commit/f7e80ee4a065a9eaba98720abf415d9e87756cbd))
* **compiler-sfc:** expose resolve type-based props and emits ([#8874](https://github.com/vuejs/core/issues/8874)) ([9e77580](https://github.com/vuejs/core/commit/9e77580c0c2f0d977bd0031a1d43cc334769d433))
* 런타임 오류 문자열 export ([#9301](https://github.com/vuejs/core/issues/9301)) ([feb2f2e](https://github.com/vuejs/core/commit/feb2f2edce2d91218a5e9a52c81e322e4033296b))
* **reactivity:** 보다 효율적인 reactivity system ([#5912](https://github.com/vuejs/core/issues/5912)) ([16e06ca](https://github.com/vuejs/core/commit/16e06ca08f5a1e2af3fc7fb35de153dbe0c3087d)), closes [#311](https://github.com/vuejs/core/issues/311) [#1811](https://github.com/vuejs/core/issues/1811) [#6018](https://github.com/vuejs/core/issues/6018) [#7160](https://github.com/vuejs/core/issues/7160) [#8714](https://github.com/vuejs/core/issues/8714) [#9149](https://github.com/vuejs/core/issues/9149) [#9419](https://github.com/vuejs/core/issues/9419) [#9464](https://github.com/vuejs/core/issues/9464)
* **runtime-core:** add `once` option to watch ([#9034](https://github.com/vuejs/core/issues/9034)) ([a645e7a](https://github.com/vuejs/core/commit/a645e7aa51006516ba668b3a4365d296eb92ee7d))

<br/><br/>

# 🐳 Vue v3.4.0-alpha.2

날짜 : 2020-01-02

## 🌏 Bug Fixes

* @vitejs/plugin-vue에서 혼란스러운 파손(breakage)를 피하세오. ([ceec69c](https://github.com/vuejs/core/commit/ceec69c8ccb96c433a4a506ad2e85e276998bade))
* **compiler-core:** fast fowarding할 때 line/column 추적 수정 ([2e65ea4](https://github.com/vuejs/core/commit/2e65ea481f74db8649df8110a031cbdc98f98c84))
* **compiler-sfc:** ssr에 대한 ast 재사용 수정 ([fb619cf](https://github.com/vuejs/core/commit/fb619cf9a440239f0ba88e327d10001a6a3c8171))
* **compiler-sfc:** 범위가 지정된 css재작성에서 `:is`와 `:where` selector를 지원 ([#8929](https://github.com/vuejs/core/issues/8929)) ([c6083dc](https://github.com/vuejs/core/commit/c6083dcad31f3e9292c687fada9e32f287e2317f))
* **compiler-sfc:** ssr모드에서 re-parsing할 때 올바른 컴파일러 사용 ([678378a](https://github.com/vuejs/core/commit/678378afd559481badb486b243722b6287862e09))
* feat!: reactivity transform 제거 (#9321) ([79b8a09](https://github.com/vuejs/core/commit/79b8a0905bf363bf82edd2096fef10c3db6d9c3c)), closes [#9321](https://github.com/vuejs/core/issues/9321)

> AST 
>
> Abstract Syntax Tree로 추상 구문 구조의 트리를 의미.

## 🌏 Features

* **compiler-core:** 파싱 시 root namespace지정 지원 ([40f72d5](https://github.com/vuejs/core/commit/40f72d5e50b389cb11b7ca13461aa2a75ddacdb4))
* **compiler-core:** 동일한 이름을 가진 키와 값에 대한 v-bind 단축형 지원 ([#9451](https://github.com/vuejs/core/issues/9451)) ([26399aa](https://github.com/vuejs/core/commit/26399aa6fac1596b294ffeba06bb498d86f5508c))
* **compiler:** 언어 도구에 대한 파싱 허용 오차 개선([41ff68e](https://github.com/vuejs/core/commit/41ff68ea579d933333392146625560359acb728a))
* **reactivity:** computed getter에 대한 마지막 결과 expose ([#9497](https://github.com/vuejs/core/issues/9497)) ([48b47a1](https://github.com/vuejs/core/commit/48b47a1ab63577e2dbd91947eea544e3ef185b85))

## 🌏 Performance Improvements

* sfc 소스맵 불필요한 직렬화 및 파싱 방지 ([f15d2f6](https://github.com/vuejs/core/commit/f15d2f6cf69c0c39f8dfb5c33122790c68bf92e2))
* **codegen:** codegen 중에 line/column 계산 최적화([3be53d9](https://github.com/vuejs/core/commit/3be53d9b974dae1a10eb795cade71ae765e17574))
* **codegen:** 소스맵 생성 최적화 ([c11002f](https://github.com/vuejs/core/commit/c11002f16afd243a2b15b546816e73882eea9e4d))
* **compiler-sfc:** script에서 magic-string trim 제거 ([e8e3ec6](https://github.com/vuejs/core/commit/e8e3ec6ca7392e43975c75b56eaaa711d5ea9410))<br/>(magic-string 라이브러리의 trim사용하던걸 제거한거 같음.)
* **compiler-sfc:** 더 빠른 소스맵 addMapping 사용 ([50cde7c](https://github.com/vuejs/core/commit/50cde7cfbcc49022ba88f5f69fa9b930b483c282))
* isBuiltInType 제거 최적화 ([66c0ed0](https://github.com/vuejs/core/commit/66c0ed0a3c1c6f37dafc6b1c52b75c6bf60e3136))
* makeMap 최적화([ae6fba9](https://github.com/vuejs/core/commit/ae6fba94954bac6430902f77b0d1113a98a75b18))
* position cloning 최적화([2073236](https://github.com/vuejs/core/commit/20732366b9b3530d33b842cf1fc985919afb9317))

## 🌏 Breaking changes

* eactivity Transform은 3.3에서 더 이상 사용하지 않는 것으로 표시되었으며 이제 3.4에서 제거됨.이 변경은 실험적인 기능으로 인해 major로 필요하지 않습니다. 이 기능을 계속 사용하려는 사용자는 외부 플러그인을 통해 사용할 수 있습니다. at https://vue-macros.dev/features/reactivity-transform.html

<br/><br/>

# 🐳 Vue v3.4.0-alpha.3

날짜 : 2023-11-28

## 🌏 Bug Fixes

* **deps:** 컴파일러를 ^7.23.4로 업데이트 ([#9681](https://github.com/vuejs/core/issues/9681)) ([31f6ebc](https://github.com/vuejs/core/commit/31f6ebc4df84490ed29fb75e7bf4259200eb51f0))
* **parser:** arg지시어는 arg가 없는 단축어에서는 정의되지 않아야 함. ([e49dffc](https://github.com/vuejs/core/commit/e49dffc9ece86bddf094b9ad4ad15eb4856d6277))

## 🌏 Features

* **dx:** prod빌드의 문서에 에러 링크

<br/><br/>

# 🐳 Vue v3.4.0-alpha.4

날짜 : 2023-12-04

## 🌏 Bug Fixes

* **compiler-core:** 참조 오타 수정 ([#9708](https://github.com/vuejs/core/issues/9708)) ([3071de4](https://github.com/vuejs/core/commit/3071de44bc4bf669ab6b48fd8db8d728c30fdb0c))
* **parser:** v-pre의 보간 구문 분석 수정 ([53aaa1e](https://github.com/vuejs/core/commit/53aaa1eb2876baf9de16b2f2c77b2c5fd5173900))
* **parser:** root ns를 기반으로 초기 inXML상태를 올바르게 설정 ([47ea285](https://github.com/vuejs/core/commit/47ea285be3dcb66a83a593346995b5900d6c5478))
* **parser:** inRCDATA state를 재설정해야함. ([ef97e8b](https://github.com/vuejs/core/commit/ef97e8b07d8350106c940f23679444b698832067))

## 🌏 Features

* **compiler-core:** 템플릿 표현식에서 전역으로 Error에 액세스하는 것을 지원 ([#7018](https://github.com/vuejs/core/issues/7018)) ([bcca475](https://github.com/vuejs/core/commit/bcca475dbc58d76434cd8120b94929758cee2825))
* **compiler-sfc:** AST를 통해 템플릿의 import 사용량 분석([#9729](https://github.com/vuejs/core/issues/9729)) ([e8bbc94](https://github.com/vuejs/core/commit/e8bbc946cba6bf74c9da56f938b67d2a04c340ba)), closes [#8897](https://github.com/vuejs/core/issues/8897) [nuxt/nuxt#22416](https://github.com/nuxt/nuxt/issues/22416)
* **compiler-sfc:** postcss모듈을 v6로 변경 ([2a507e3](https://github.com/vuejs/core/commit/2a507e32f0e2ef73813705a568b8633f68bda7a9))
* **compiler:** vnode hook 사용 중단 경고를 오류로 해제 ([8abc754](https://github.com/vuejs/core/commit/8abc754d5d86d9dfd5a7927b846f1a743f352364))
* const enum을 대체하려면 enum 사용 ([#9261](https://github.com/vuejs/core/issues/9261)) ([fff7b86](https://github.com/vuejs/core/commit/fff7b864f4292d0430ba2bda7098ad43876b0210)), closes [#1228](https://github.com/vuejs/core/issues/1228)

<br/><br/>
