# 🐳 Vue v3.0.0-alpha.0

날짜 : 2019-12-20

이번 릴리스까지 2.x와 3.0간의 변경 사항은 병합된 RFC를 참조. [here](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3A3.x).

<br/><br/>

# 🐳 Vue v3.0.0-alpha.1

날짜 : 2020-01-02

## 🌏 Bug Fixes

* **runtime-core** : plugins에 options 전달
* **sfc** :  custom 블록 콘텐츠를 원시 텍스트로 처리
* 새로운 children 마운팅
* **core** : patch에 mount된 hoisted vnode를 clone 
* **fragment** : fragment 제거 시 직접 제거 수행

## 🌏 Features

* **hmr** : root instance 리로드

## 🌏 Performance Improvements

* **compiler-core** : `advancePositionWithMutation` 단순화

<br/><br/>

# 🐳 Vue v3.0.0-alpha.2

날짜 : 2020-01-13

## 🌏 Bug Fixes

* **compiler/v-on** : v-on 핸들러에서 여러 명령문 처리
* **compiler/v-slot** : 명명된 슬롯과 혼합된 암시적 기본 슬롯을 처리
* **reactivity** : observe value값을 삭제
* **runtime-core** : class가 plugin으로 전달되도록 허용해야함
* **runtime-core** :  component에 선언된 props가 없는 경우 props casing을 유지해야함
* **runtime-core/renderer** : 블록 내부의 v-if toggle 수정
* **runtime-core/vnode** : vnode 하위 항목에 boolean값을 렌더링하면 안됨.
* **types** : 컴포넌트 옵션은 `defineComponent`로 정의된 컴포넌트를 허용해야함.
* **watch** : 수동 정지 시 기록된 효과 제거

<br/><br/>

# 🐳 Vue v3.0.0-alpha.3

날짜 : 2020-01-22

## 🌏 Bug Fixes

* Suspense는 동적 children에 포함되어야 함.
* **compiler-core:** branch key를 주입할 때 사용자 키 override를 피함.
* **compiler-core:** 올바른 런타임 isSVG를 위해 `<svg>`를 block으로 강제 적용
* **compiler-sfc:** 관련 자산 URL만 변환
* **dom:** `<svg>` 및 `<foreignObject>` mount와 updates 수정
* **runtime-core:** 상위 노드 확인 조건은 다른 노드이어야 함.
* **runtime-core:** isSVG검사는 patch branch에도 적용되어야 한다.
* **runtime-core:** setup context를 통해 액세스할 때 사용되지 않는 속성을 경고해서는 안됨.
* **transition:** 여러 transition classs 처리

## 🌏 Features

* **runtime-core:** emit은 이제 트리거된 모든 핸들러의 반환값 배열을 반환.
* **runtime-core:** `app.unmount(container)`를 지원.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.4

날짜 : 2020-01-27

## 🌏 Bug Fixes

* **reactivity:** ID에 의존하는 배열 메서드는 원시값과 함꼐 동작해야함. ([aefb7d2](https://github.com/vuejs/core/commit/aefb7d282ed716923ca1a288a63a83a94af87ebc))
* **runtime-core:** instance는 선언되지않은 prop을 노출해서는 안됨. ([2884831](https://github.com/vuejs/core/commit/2884831065e16ccf5bd3ae1ee95116803ee3b18c))
* **runtime-dom:** 브라우저가 아닌 환경의 문서에 액세스하면 안됨 ([48152bc](https://github.com/vuejs/core/commit/48152bc88ea817ae23e2987dce99d64b426366c1)), closes [#657](https://github.com/vuejs/core/issues/657)
* **v-model/emit:**  update : camelCase이벤트는 케밥 케이스와 동등하게 트리거 되야함([2837ce8](https://github.com/vuejs/core/commit/2837ce842856d51dfbb55e3fa4a36a352446fb54)), closes [#656](https://github.com/vuejs/core/issues/656)

## 🌏 Code Refactoring

* `createApp`관련 API signatures 조정 ([c07751f](https://github.com/vuejs/core/commit/c07751fd3605f301dc0f02fd2a48acc7ba7a0397))
* renderContext에서 암시적 reactive() 호출을 제거 ([6b10f0c](https://github.com/vuejs/core/commit/6b10f0cd1da942c1d96746672b5f595df7d125b5))

## 🌏 Performance Improvements

* **ssr:** 불필요한 비동기 오버헤드 방지

## 🌏 Breaking Chnages

- `setup()`에서 반환된 객체는 더 이상 암시적으로 `reactive()`에 전달되지 않음.

  `renderContext`는 `setup()`에 의해 반환된 객체이다.(또는 setup이 없으면 새 객체). 

  이 변경 전에는 ref unwrapping을 위해 `reactive()`에 암시적으로 전달되었다. 그러나 이는 반응형으로 만들어서는 안되는 속성에 대한 불필요한 깊은 반응형 변환의 부작용이 있으며 성능 문제를 일으 킬 수 있다.<br/>(속성 ex - computed return values와 주입된(inject된) non-reactive object)

  이 변경으로 인해 `reactive()`호출이 제거되고 대신 render proxy level에서 얕은 참조(ref) unwrapping이 수행된다.

  문제가 되는 부분은 사용자가 `setup()`에서 일반 속성을 가진 객체를 반환하는 경우이다. ( `return {count: 0}` )<br/>이 속성은 템플릿 내 이벤트 핸들러에 의해 변경될 떄 더 이상 업데이트를 트리거 하지 않습니다. 대신 명시적인 참조가 필요.

  이는 `setup()`에서 명시적으로 reactive로 만들지 않은 모든 객체가 non-reactive상태로 유지된다는 의미. 이는 `this`에 무거운 외부 상태 저장 객체를 노출(expose)할 때 바람직 할 수 있다.

- `createApp` API가 조정됨.

  - `createApp()`: 이제 root 컴포넌트를 허용하고 선택적으로 root 컴포넌트에 전달할 props객체를 허용함.
  - `app.mount()`: 이제 단일  argument(root container)를 허용
  - `app.unmount()`: 더 이상 argument가 필요하지 않음.

  New behavior looks like the following:

  ```vue
  const app = createApp(RootComponent)
  app.mount('#app')
  app.unmount()
  ```

<br/><br/>

# 🐳 Vue v3.0.0-alpha.5

## 🌏 Bug Fixes

- **compiler:**  `v-for` fragment openBlock argument 수정 ([12fcf9a](https://github.com/vuejs/core/commit/12fcf9ab953acdbb8706b549c7e63f69482a495a))
- **compiler-core:** template에서 사용할 때 `keep-alive` 수정([ade07c6](https://github.com/vuejs/core/commit/ade07c64a1f98c0958e80db0458c699c21998f64)), closes [#715](https://github.com/vuejs/core/issues/715)
- **compiler-core:** `<component>`에 대한 확인만 prop이다? ([78c4f32](https://github.com/vuejs/core/commit/78c4f321cd0902a117c599ac705dda294fa198ed))
  - 원문 : only check is prop on `<component>` 
- **compiler-core:** unknown entitiy들에 대한 오류 완화 ([730d329](https://github.com/vuejs/core/commit/730d329f794caf1ea2cc47628f8d74ef2d07f96e)), closes [#663](https://github.com/vuejs/core/issues/663)
- **compiler-core:** if분기에 텍스트 변환을 적용해야함. ([e0f3c6b](https://github.com/vuejs/core/commit/e0f3c6b352ab35adcad779ef0ac9670acf3d7b37)), closes [#725](https://github.com/vuejs/core/issues/725)
- **compiler-core:** 캐쉬된 + 병합된 이벤트 핸들러가 있는 element를 hoist하면 안됨 ([5455e8e](https://github.com/vuejs/core/commit/5455e8e69a59cd1ff72330b1aed9c8e6aedc4b36))
- **compiler-dom:** 중첩된 transform 수정 ([9e51297](https://github.com/vuejs/core/commit/9e51297702f975ced1cfebad9a46afc46f0593bb))
- **compiler-sfc:** src속성으로 빈 노드 처리 ([#695](https://github.com/vuejs/core/issues/695)) ([2d56dfd](https://github.com/vuejs/core/commit/2d56dfdc4fcf824bba4c0166ca5471258c4f883b))
- **compiler-ssr:** 올바른 패키지에서 helper import([8f6b669](https://github.com/vuejs/core/commit/8f6b6690a2011846446804267ec49073996c3800))
- **computed:** computed 옵션에 대한 arrow function사용 지원 ([2fb7a63](https://github.com/vuejs/core/commit/2fb7a63943d9d995248cb6d2d4fb5f22ff2ac000)), closes [#733](https://github.com/vuejs/core/issues/733)
- **reactivity:** setup()에서 컴포넌트간 종속성 누출을 방지 ([d9d63f2](https://github.com/vuejs/core/commit/d9d63f21b1e6f99f2fb63d736501095b131e5ad9))
- **reactivity:** effect는 자기 의존성 mutation들을 처리해야함 ([e8e6772](https://github.com/vuejs/core/commit/e8e67729cb7649d736be233b2a5e00768dd6f4ba))
- **reactivity:** `Map.set`에서 반복효과 트리거 ([e1c9153](https://github.com/vuejs/core/commit/e1c9153b9ed71f9b2e1ad4f9018c51d239e7dcd0)), closes [#709](https://github.com/vuejs/core/issues/709)
- **runtime-core:** `renderCache`가 항상 존재하는지 확인 ([8383e54](https://github.com/vuejs/core/commit/8383e5450e4f9679ac8a284f1c3960e3ee5b5211))
- **runtime-core:** keep-alive tree-shaking 수정 ([5b43764](https://github.com/vuejs/core/commit/5b43764eacb59ff6ebba3195a55af4ac0cf253bb))
- **runtime-core:** ShapeFlags tree shaking 수정([0f67aa7](https://github.com/vuejs/core/commit/0f67aa7da50d6ffc543754a42f1e677af11f9173))
- **runtime-core:** class/style bindings만으로 componet update처리 ([35d91f4](https://github.com/vuejs/core/commit/35d91f4e18ccb72cbf39a86fe8f39060f0bf075e))
- **runtime-core:** 렌더 컨텍스트 set은 reactive값을 풀어서는 안됨. ([27fbfbd](https://github.com/vuejs/core/commit/27fbfbdb8beffc96134c931425f33178c23a72db))
- **runtime-core:** vnode hook 처리 재작업 ([cfadb98](https://github.com/vuejs/core/commit/cfadb98011e188114bb822ee6f678cd09ddac7e3)), closes [#684](https://github.com/vuejs/core/issues/684)
- **runtime-core:** text patchFlag에서 일찍 반환하면 안됨([778f3a5](https://github.com/vuejs/core/commit/778f3a5e886a1a1136bc8b00b849370d7c4041be))
- **runtime-core/scheduler:** child 컴포넌트의 중복 업데이트 방지 ([8a87074](https://github.com/vuejs/core/commit/8a87074df013fdbb0e88f34074c2605e4af2937c))
- **runtime-core/scheduler:** 작업 무효화([#717](https://github.com/vuejs/core/issues/717)) ([fe9da2d](https://github.com/vuejs/core/commit/fe9da2d0e4f9b338252b1b62941ee9ead71f0346))
- **runtime-core/watch:** 초기값이 정의되지 않은 트리거 watcher ([#687](https://github.com/vuejs/core/issues/687)) ([5742a0b](https://github.com/vuejs/core/commit/5742a0b826fe77d2310acb530667adb758822f66)), closes [#683](https://github.com/vuejs/core/issues/683)
- **runtime-dom/ssr:** xlink및 boolean 속성을 올바르게 처리([e6e2c58](https://github.com/vuejs/core/commit/e6e2c58234cab46fa530c383c0f7ae1cb3494da3))
- **ssr:** cjs빌드에서 하드코딩된 ssr 검사를 피하시오.([bc07e95](https://github.com/vuejs/core/commit/bc07e95ca84686bfa43798a444a3220581b183d8))
- **ssr:** fix class/style rendering + ssrRenderComponent export name ([688ad92](https://github.com/vuejs/core/commit/688ad9239105625f7b63ac43181dfb2e9d1d4720))
- **ssr:** setup에서 render function을 반환하는 렌더링 컴포넌트 ([#720](https://github.com/vuejs/core/issues/720)) ([4669215](https://github.com/vuejs/core/commit/4669215ca2f82d90a1bd730613259f3167e199cd))
- **transition-group:** 여러 move-classes handle ([#679](https://github.com/vuejs/core/issues/679)) ([5495c70](https://github.com/vuejs/core/commit/5495c70c4a3f740ef4ac575ffee5466ca747cca1)), closes [#678](https://github.com/vuejs/core/issues/678)
- **types:** app.component는 defineComponent 반환 타입을 허용해야함([57ee5df](https://github.com/vuejs/core/commit/57ee5df364f03816e548f4f3bf05edc7a089c362)), closes [#730](https://github.com/vuejs/core/issues/730)
- **types:** lazy option을 기반으로 올바른 oldValue 타이핑을 확인하세오. ([c6a9787](https://github.com/vuejs/core/commit/c6a9787941ca99877d268182a5bb57fcf8b80b75)), closes [#719](https://github.com/vuejs/core/issues/719)
- **v-on:** click.right와 click.middle 수정자를 변환 ([028f748](https://github.com/vuejs/core/commit/028f748c32f80842be39897fdacc37f6700f00a7)), closes [#735](https://github.com/vuejs/core/issues/735)
- public API에서 effect 제거 ([4bc4cb9](https://github.com/vuejs/core/commit/4bc4cb970f7a65177948c5d817bb43ecb0324636)), closes [#712](https://github.com/vuejs/core/issues/712)
- **v-model:** input에서 동적 v-bind를 사용할 때 동적 지시문을 사용해야함. ([1f2de9e](https://github.com/vuejs/core/commit/1f2de9e232409b09c97b67d0824d1450beed6eb1))

## 🌏 Code Refactoring

- **watch:** watch API 동작 조정([9571ede](https://github.com/vuejs/core/commit/9571ede84bb6949e13c25807cc8f016ace29dc8a))

## 🌏 Features

- **compiler:** patchFlag를 사용하여 hoisted된 tree 표시 ([175f8aa](https://github.com/vuejs/core/commit/175f8aae8d009e044e3674f7647bf1397f3a794a))
- **compiler:** 유효하지않은 children에서 tranistion 및 keep-alive 경고([4cc39e1](https://github.com/vuejs/core/commit/4cc39e14a297f42230f5aac5ec08e3c98902b98d))
- **compiler-core:** codegen에서 cjs모드 지원([04da2a8](https://github.com/vuejs/core/commit/04da2a82e8fbde2b60b2392bc4bdcc5e61113202))
- **compiler-core/v-on:**  vnode hook에 대한 [@vnode-xxx](https://github.com/vnode-xxx) 사용 지원 ([571ed42](https://github.com/vuejs/core/commit/571ed4226be618dcc9f95e4c2da8d82d7d2f7750))
- **compiler-dom:** 정적 콘텐츠를 문자열화 할 때 상수표현식 처리 ([8b7c162](https://github.com/vuejs/core/commit/8b7c162125cb72068727a76ede8afa2896251db0))
- **compiler-dom/runtime-dom:** 적합한 정적 트리를 문자열화함([27913e6](https://github.com/vuejs/core/commit/27913e661ac551f580bd5fd42b49fe55cbe8dbb8))
- **reactivity:** add shallowReactive function ([#689](https://github.com/vuejs/core/issues/689)) ([7f38c1e](https://github.com/vuejs/core/commit/7f38c1e0ff5a7591f67ed21aa3a2944db2e72a27))
- **runtime-core/reactivity:** expose shallowReactive ([#711](https://github.com/vuejs/core/issues/711)) ([21944c4](https://github.com/vuejs/core/commit/21944c4a42a65f20245794fa5f07add579b7121f))
- **server-renderer:** 즉각적인 template 컴파일 지원 ([#707](https://github.com/vuejs/core/issues/707)) ([6d10a6c](https://github.com/vuejs/core/commit/6d10a6c77242aec98103f15d6cb672ba63c18abf))
- **ssr:** render portals ([#714](https://github.com/vuejs/core/issues/714)) ([e495fa4](https://github.com/vuejs/core/commit/e495fa4a1872d03ed59252e7ed5dd2b708adb7ae))
- **ssr:** portal hydration 지원([70dc3e3](https://github.com/vuejs/core/commit/70dc3e3ae74f08d53243e6f078794c16f359e272))
- **ssr:** useSSRContext ([fd03149](https://github.com/vuejs/core/commit/fd031490fb89b7c0d1d478b586151a24324101a3))

## 🌏 Performance Improvements

- ㄹrenderer hot function들이 minifiers에 의해 인라인되는 것을 방지([629ee75](https://github.com/vuejs/core/commit/629ee75588fc2ca4ab2b3786046f788d3547b6bc))
- **reactivity:** computed 추적 개선([#710](https://github.com/vuejs/core/issues/710)) ([8874b21](https://github.com/vuejs/core/commit/8874b21a7e2383a8bb6c15a7095c1853aa5ae705))

## 🌏 BREAKING CHANGES

- **watch:** `watch` 동작이 조정됨.

  - `watch(source, callback, options?)` signature 사용할 때, callback은 이제 기본적으로 느리게 실행됨.(2.x동작과 일치)

    종속성을 수집하려면 `effect`를 즉시 호출해야 하기 때문에 `watch(effect, options?)` signature은 여전히 열망적(eager)이다.

  - `lazy` 옵션은 반대의 `immediate`옵션으로 대체되었으며 기본값은 `fase`

  - 위의 변경으로 인해 option API의 `watch`옵션은 이제 2.x와 정확히 동일하게 동작함.

  - effect signature 또는 `{immediate: true}`를 사용할 때 이제 초기 실행은 컴포넌트가 마운트될 때 까지 지연되는 대신 동기식으로 수행됨. 이는 `async setup()`및 Susepense가 제대로 작동하는 특정 사용사례에 필요함.

    이에 대한 side effect는 즉각적인 watcher invocation이 더 이상 마운트된 DOM에 액세스할 수 없게 된다는 것.<br/>그러나 이전 동작을 유지하기 위해 `onMounted`내에서 watcher를 시작할 수 있다.
