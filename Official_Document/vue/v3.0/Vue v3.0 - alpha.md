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

날짜 : 2020-02-18

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

<br/><br/>

# 🐳 Vue v3.0.0-alpha.6

날짜 : 2020-02-22

## 🌏 Bug Fixes

- **compiler-core:** helperString의 별칭이름을 사용해야 함 ([#743](https://github.com/vuejs/core/issues/743)) ([7b987d9](https://github.com/vuejs/core/commit/7b987d9450fc7befcd0946a0d53991d27ed299ec)), closes [#740](https://github.com/vuejs/core/issues/740)
- **compiler-dom:** 정적 문자열을 hoisting할 때 class/style 바인딩을 적절하게 문자열화 함.([1b9b235](https://github.com/vuejs/core/commit/1b9b235663b75db040172d2ffbee1dd40b4db032))
- **reactivity:** 배열 길이가 변경되면 모든 effect들을 트리거해야함. ([#754](https://github.com/vuejs/core/issues/754)) ([5fac655](https://github.com/vuejs/core/commit/5fac65589b4455b98fd4e2f9eb3754f0acde97bb))
- **sfc:** child root에서 ㅅparent 범위 ID를 상속받음. ([#756](https://github.com/vuejs/core/issues/756)) ([9547c2b](https://github.com/vuejs/core/commit/9547c2b93d6d8f469314cfe055960746a3e3acbe))
- **types:** ref 입력 개선, close [#759](https://github.com/vuejs/core/issues/759) ([627b9df](https://github.com/vuejs/core/commit/627b9df4a293ae18071009d9cac7a5e995d40716))
- **types:** 6b10f0c에 대한 setup 바인딩 unwrap types update ([a840e7d](https://github.com/vuejs/core/commit/a840e7ddf0b470b5da27b7b2b8b5fcf39a7197a2)), closes [#738](https://github.com/vuejs/core/issues/738)

## 🌏 Code Refactoring

- reactive 배열에 ref 보존 ([775a7c2](https://github.com/vuejs/core/commit/775a7c2b414ca44d4684badb29e8e80ff6b5d3dd)), closes [#737](https://github.com/vuejs/core/issues/737)

## 🌏 Features

- **reactivity:** unref and shallowRef expose ([e9024bf](https://github.com/vuejs/core/commit/e9024bf1b7456b9cf9b913c239502593364bc773))
- **runtime-core:** watchEffect API 추가 ([99a2e18](https://github.com/vuejs/core/commit/99a2e18c9711d3d1f79f8c9c59212880efd058b9))

## 🌏 Performance Improvements

- **effect:** 배열 길이 mutation에 대한 effect trigger 최적화 ([#761](https://github.com/vuejs/core/issues/761)) ([76c7f54](https://github.com/vuejs/core/commit/76c7f5426919f9d29a303263bc54a1e42a66e94b))
- **reactivity:** 새 길이가 이전 길이보다 짧은 경우에만 배열 길이 mutation에 대한 모든 effect를 트리거 ([33622d6](https://github.com/vuejs/core/commit/33622d63600ba0f18ba4dae97bda882c918b5f7d))

## 🌏 BREAKING CHANGES

- **runtime-core:** `watch(fn, options?)`를 `watchEffect`로 교체

  `watch(fn, options?)` signature은 사용법과 동작이 동일한 새로운 `watchEffect API`로 대체되었습니다. `watch` now 는 이제 `watch(source, cb, options?)` signature만 지원.

- **reactivity:** reactive 배열은 더 이상 포함된 ref를 풀지 않음.

  reactive 배열에 ref, 특히 ref와 일반 값이 혼합된 경우 배열 프로토타입 메서드가 제대로 작동하지않음. sort()또는 reverse()는 참조 값을 이동하는 대신 덮어씀. (#737 참조)

  ref unwrapping동작을 유지하면서 가능한 모든 Array 메소드에 대한 올바른 동작을 보장하는 것은 매우 복잡함. 또한 Vue가 내장 메소드를 내부적으로 처리하더라도 사용자가 참조가 퐇마된 반응 배열에서 타사 Utility 함수(ex-lodash)를 사용하려 하면 여전히 중단됨.

  이 커밋 후에는 Map및 Set과 같은 다른 컬렉션 유형과 유사하게 배열이 더 이상 포함된 참조를 자동으로 풀지 않음.

  실제로 배열에서 혼합 참조와 일반 값을 사용하는 경우는 거의 없다. 이것이 필요한 경우 사용자는 언래핑을 수행하는 computed 속성을 생성할 수 있다.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.7

날짜 : 2020-02-26

## 🌏 Bug Fixes

- **renderSlot:** 슬롯 렌더링을 STABLE_FRAGMENT로 설정 ([#776](https://github.com/vuejs/core/issues/776)) ([8cb0b83](https://github.com/vuejs/core/commit/8cb0b8308801159177ec16ab5a3e23672c4c1d00)), closes [#766](https://github.com/vuejs/core/issues/766)
- **runtime-core:** slot fallback + slots typing 수정 ([4a5b91b](https://github.com/vuejs/core/commit/4a5b91bd1faec76bbaa0522b095f4a07ca88a9e5)), closes [#773](https://github.com/vuejs/core/issues/773)
- **runtime-core:** watchEffect가 deep option을 무시하도록 설정 ([#765](https://github.com/vuejs/core/issues/765)) ([19a799c](https://github.com/vuejs/core/commit/19a799c28b149b14e85d9e2081fa65ed58d108ba))
- **runtime-core:** appContext.provides를 Objet.create(null)로 설정([#781](https://github.com/vuejs/core/issues/781)) ([04f83fa](https://github.com/vuejs/core/commit/04f83fa6810e07915e98b94c954ff0c1859aaa49))
- **template-explorer:** rename watch -> watchEffect ([#780](https://github.com/vuejs/core/issues/780)) ([59393dd](https://github.com/vuejs/core/commit/59393dd75766720330cb69e22086c97a392dbbe4))
- **template-ref:** slot내부의 문자열 템플릿 ref 수정([3eab143](https://github.com/vuejs/core/commit/3eab1438432a3bab15ccf2f6092fc3e4355f3cdd))
- **types:** ref값 type 래핑 해제는 생성 시 발생해야함. ([d4c6957](https://github.com/vuejs/core/commit/d4c6957e2d8ac7920a649f3a3576689cd5e1099f))
- **types:** shallowRef는 value type을 풀어서는 안됨. ([3206e5d](https://github.com/vuejs/core/commit/3206e5dfe58fd0e93644d13929558d71c5171888))

## 🌏 Code Refactoring

- **directives:** remove binding.instance ([52cc7e8](https://github.com/vuejs/core/commit/52cc7e823148289b3dcdcb6b521984ab815fce79))

## 🌏 BREAKING CHANGES

- **directives:** custom 지시문 바인딩은 더이상 인스턴스를 노출하지 않음.

  이것은 올바른 인스턴스를 가리키는지 확인하는 데 추가적인 복잡성을 야기하는 거의 사용되지 않는 속성임. 디자인 관점에서 볼 때 사용자 지정 지시문은 바인딩된 요소와 데이터로 범위가 지정되어야 하며, 애초에 전체 인스턴스에 액세스 할 수 없어야 한다.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.8

날짜 : 2020-03-06

## 🌏 Bug Fixes

- **directives:** 잘못된 지시어 hook을 무시([7971b04](https://github.com/vuejs/core/commit/7971b0468c81483dd7026204518f7c03187d13c4)), closes [#795](https://github.com/vuejs/core/issues/795)
- **portal:** portal placeholder text 수정([4397528](https://github.com/vuejs/core/commit/439752822c175c737e58896e0f365f2b02bab577))
- **reactivity:** track없는 실행 컨텍스트 내에서 effect 트리거를 허용 ([274f81c](https://github.com/vuejs/core/commit/274f81c5db83f0f77e1aba3240b2134a2474a72f)), closes [#804](https://github.com/vuejs/core/issues/804)
- **reactivity:** Map/Set ID 방법은 원시 값에 반응 항목이 포함된 경우에도 작동해야함. ([cc69fd7](https://github.com/vuejs/core/commit/cc69fd72e3f9ef3572d2be40af71d22232e1b9af)), closes [#799](https://github.com/vuejs/core/issues/799)
- **reactivity:** 배열 삭제 시 length 종속성을 트리거해서는 안됨.([a306658](https://github.com/vuejs/core/commit/a3066581f3014aae31f2d96b96428100f1674166)), closes [#774](https://github.com/vuejs/core/issues/774)
- **runtime-core:** 최적화된 child root에서 상속된 속성 업데이트를 보장 ([6810d14](https://github.com/vuejs/core/commit/6810d1402e214a12fa274ff5fb7475bad002d1b1)), closes [#677](https://github.com/vuejs/core/issues/677) [#784](https://github.com/vuejs/core/issues/784)
- **slots:** 조건부 slot 수정 ([3357ff4](https://github.com/vuejs/core/commit/3357ff438c6ff0d4fea67923724dd3cb99ff2756)), closes [#787](https://github.com/vuejs/core/issues/787)
- **ssr:** ssr 즉석 컴파일 수정 + slot fallback branch helper 삽입([3be3785](https://github.com/vuejs/core/commit/3be3785f945253918469da456a14a2d9381bcbd0))

## 🌏 Code Refactoring

- **runtime-core:** 속성 fallthrough 동작 조정 ([e1660f4](https://github.com/vuejs/core/commit/e1660f4338fbf4d2a434e13193a58e00f844379b)), closes [#749](https://github.com/vuejs/core/issues/749)
- **runtime-core:** setup() 결과 reactive conversion 되돌리기 ([e67f655](https://github.com/vuejs/core/commit/e67f655b2687042fcc74dc0993581405abed56de))

## 🌏 Features

- **compiler-core:** 표현식 파싱을 위해 `@babel/parser`로 전환([8449a97](https://github.com/vuejs/core/commit/8449a9727c942b6049c9e577c7c15b43fdca2867))
- **compiler-ssr:** compile portal ([#775](https://github.com/vuejs/core/issues/775)) ([d8ed0e7](https://github.com/vuejs/core/commit/d8ed0e7fbf9bbe734667eb94e809235e79e431eb))
- **ssr:** hydration 불일치 handling ([91269da](https://github.com/vuejs/core/commit/91269da52c30abf6c50312555b715f5360224bb0))

## 🌏 BREAKING CHANGES

- **runtime-core:** 속성 fallthrough behavior 조정

  보류 중인 RFC에 따라 업데이트됨. [vuejs/rfcs#137](https://github.com/vuejs/rfcs/pull/137)

  - 기본적으로 암시적 fallthrough라는 속성(class, style, event listenr, a11y속성 및 데이터 속성)의 화이트리스트에만 적용됨.
  - 컴포넌트의 유무에 관계없이 Fallthrough가 적용됨.

- **runtime-core:** setup() 결과 reactive conversion 되돌리기

  Revert 6b10f0c & a840e7d. 원래 변경의 동기는 불필요한 deep conversion을 피하는 것이었지만,  `markNonReactive`를 통해 비반응형 값을 명시적으로 표시하면 이를 달성할 수 있다.

  reactive conversion동작을 제거하면 `setup()`에서 중첩된 속성으로 노출될 떄 참조(대부분의 구성 함수가 반환되는 것)가 포함된 일반 개체가 템플릿의 참조를 풀지 않는다는 점에서 유용성 문제가 발생.<br/>이는 `템풀릿에 .value가 없음`이라는 직관에 어긋나며 유일한 해결방법은 사용자가 `reactive()`를 사용하여 수동으로 다시 래핑하는 것.

  따라서 이 커밋에서는 `setup()`에서 반환된 객체가 깊은 참조 언래핑을 위해 암시적으로 `reactie()`로 래핑되는 이전동작으로 되돌아감.
  
  

> Fallthrough
>
> fallthrough attribute는 컴포넌트에 전달되는 props와 emit을 제외한 속성 또는 v-on을 통해 전달되는 이벤트 리스너들을 말함.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.9

날짜 : 2020-03-16

## 🌏 Bug Fixes

- **build:** **RUNTIME_COMPILE** flag 제거 ([206640a](https://github.com/vuejs/core/commit/206640a2d859a9ce9c19f22e201692f15a8d1da3)), closes [#817](https://github.com/vuejs/core/issues/817)
- **compiler-core:** 속성 shorthand 감지 수정([586e5bb](https://github.com/vuejs/core/commit/586e5bb8003916ba6be9b3394087df80328657f4)), closes [#845](https://github.com/vuejs/core/issues/845)
- **compiler-ssr:** fix input w/ v-bind="obj" codegen ([3b40fc5](https://github.com/vuejs/core/commit/3b40fc56dba56a5c1085582d11f3287e9317a151))
- **compiler-ssr:** 동적 v-bind에 필요한 태그 이름을 전달해야함.([a46f3b3](https://github.com/vuejs/core/commit/a46f3b354d451a857df750a318bd0536338008cd))
- **runtime-core:** 항상 잘못된 vnode type을 설정 ([#820](https://github.com/vuejs/core/issues/820)) ([28a9bee](https://github.com/vuejs/core/commit/28a9beed1624de9812e0f4ce9b63f7f3ed2c6db8))
- **runtime-core:** 빈 boolean props ([#844](https://github.com/vuejs/core/issues/844)) ([c7ae269](https://github.com/vuejs/core/commit/c7ae2699724bd5206ce7d2db73b86c1ef5947641)), closes [#843](https://github.com/vuejs/core/issues/843)
- **runtime-core:** instance proxy를 data()인수로 전달 ([#828](https://github.com/vuejs/core/issues/828)) ([d9dd1d8](https://github.com/vuejs/core/commit/d9dd1d8a0ac81d7d463e0788bb2e75b2d4866db6))
- **runtime-dom:** xlink 속성 패치 ([#842](https://github.com/vuejs/core/issues/842)) ([d318576](https://github.com/vuejs/core/commit/d318576d74f8756e471942ff44d2af2a4661d775))
- withCtx에서 올바른 ctx를 단순화하고 사용 ([4dc8ffc](https://github.com/vuejs/core/commit/4dc8ffc3788c38aff3e4c0f271d0ca111f723140))
- **runtime-core:** 이전 값을 hostPatchProp에 전달 ([#809](https://github.com/vuejs/core/issues/809)) ([cd34603](https://github.com/vuejs/core/commit/cd34603864142d5468486ec3f379679b22014a1b)), closes [#808](https://github.com/vuejs/core/issues/808)
- **runtime-core:** 빈 문자열과 0을 유효한 vnode키로 허용해야함. ([#807](https://github.com/vuejs/core/issues/807)) ([54a0e93](https://github.com/vuejs/core/commit/54a0e93c276f95a35b3bd6510a7f52d967fd3b7f))
- **types:** app.component는 defineComponent 반환 타입을 허용해야함.([#822](https://github.com/vuejs/core/issues/822)) ([1e9d131](https://github.com/vuejs/core/commit/1e9d1319c3f66a0a7430a4f6ac7b508486894b6b)), closes [#730](https://github.com/vuejs/core/issues/730)

## 🌏 Code Refactoring

- **runtime-core:** patchProp값 인수 순서 조정 ([ca5f39e](https://github.com/vuejs/core/commit/ca5f39ee3501a1d9cacdb74108318c15ee7c0abb))

## 🌏 Features

- **compiler-core:**  render context로 slot 함수 래핑 ([ecd7ce6](https://github.com/vuejs/core/commit/ecd7ce60d5234a7a0dbc11add6a690c3f9ff0617))
- **compiler-sfc:** ssr option 추가([3b2d236](https://github.com/vuejs/core/commit/3b2d23671409f8ac358252311bf5212882fa985a))
- **runtime-core:** class 컴포넌트 옵션을 얻기 위해 특수 속성 추가([#821](https://github.com/vuejs/core/issues/821)) ([dd17fa1](https://github.com/vuejs/core/commit/dd17fa1c9071b9685c379e1b12102214b757cf35))
- **runtime-core:** RFC-0020 구현([bb7fa3d](https://github.com/vuejs/core/commit/bb7fa3dabce73de63d016c75f1477e7d8bed8858))
- **runtime-core:** 수동 slot 함수에 대한 context도 설정 ([8a58dce](https://github.com/vuejs/core/commit/8a58dce6034944b18c2e507b5d9ab8177f60e269))
- **server-renderer:** vnode 모드에서 suspense 렌더링 ([#727](https://github.com/vuejs/core/issues/727)) ([589aeb4](https://github.com/vuejs/core/commit/589aeb402c58f463cc32d5e7728b56614bc9bf33))
- **ssr:** Suspense에 대한 컴파일러-ssr 지원 ([80c625d](https://github.com/vuejs/core/commit/80c625dce33610e53c953e9fb8fde26e3e10e358))
- **ssr:** dev mode에서 hydration하는 동안 댓글 anchor숨기기 ([cad5bcc](https://github.com/vuejs/core/commit/cad5bcce40b9f2aaa520ccbd377cd5419650e55f))
- **ssr:** 조각 불일치 처리 개선 ([60ed4e7](https://github.com/vuejs/core/commit/60ed4e7e0821a2932660b87fbf8d5ca953e0e073))
- **ssr:** vnode지시문에 대한 getSSRProps 지원 ([c450ede](https://github.com/vuejs/core/commit/c450ede12d1a93a70271a2fe7fcb6f8efcf1cd4c))
- **ssr/suspense:** suspense hydration ([a3cc970](https://github.com/vuejs/core/commit/a3cc970030579f2c55d893d6e83bbc05324adad4))
- **types:** export `ErrorTypes` ([#840](https://github.com/vuejs/core/issues/840)) ([760c3e0](https://github.com/vuejs/core/commit/760c3e0fd67f6360995cdbb125f9eae4e024f3af))

## 🌏 Reverts

- Revert "refactor(directives): remove binding.instance" ([2370166](https://github.com/vuejs/core/commit/23701666cb487e55d05b74d66990361051715ba4))

## 🌏 BREAKING CHANGES

- **runtime-core:** data는 더 이상 객체 형식을 지원하지 않음(RFC-0020에 따라)

- **runtime-core:** `RendererOptions.patchProp` 인수 순서가 변경됨.

  `prevValue` and `nextValue` 위치는 렌더러 구현의 다른 기능과 일관성을 유지하기 위해 교체됨. 이는 `createRenderer`API를 사용하는 사용자 정으 ㅣ렌더러에만 영향을 미침.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.10

날짜 : 2020-03-24

## 🌏 Bug Fixes

- 옵션 병합시 global mixin존재 확인 수정 ([10ad965](https://github.com/vuejs/core/commit/10ad965100a88e28cb528690f2e09070fefc8872))
- **compiler-core:** template v-if fragment에 patchFlag 할당 ([a1da9c2](https://github.com/vuejs/core/commit/a1da9c28a0a7030124b1deb9369685760c67be47)), closes [#850](https://github.com/vuejs/core/issues/850)
- **compiler-core:** RCDATA mode에서 보간 지원 (e.g. textarea) ([0831b98](https://github.com/vuejs/core/commit/0831b98eac344d9bdfd6f6e922902adb91ea180a))
- **keep-alive:** 최신 props로 다시 활성화된 컴포넌트를 업데이트 해야함 ([1237387](https://github.com/vuejs/core/commit/123738727a0af54fd632bf838dc3aa024722ee41))
- **reactivity:** frozen object들을 observe해서는 안 된다. ([1b2149d](https://github.com/vuejs/core/commit/1b2149dbb2dd224d01e90c1a9332bfe67aa465ce)), closes [#867](https://github.com/vuejs/core/issues/867)
- **reactivity:** key가 변경되지 않은 경우 map key반복을 트리거 하면 안된다. ([45ba06a](https://github.com/vuejs/core/commit/45ba06ac5f49876b4f05e5996f595b2c4a761f47)), closes [#877](https://github.com/vuejs/core/issues/877)
- **runtime-core:** boolean props validation 수정 ([3b282e7](https://github.com/vuejs/core/commit/3b282e7e3c96786af0a5ff61822882d1ed3f4db3))
- **runtime-dom:** 잘못된 lineGradient svg tag ([#863](https://github.com/vuejs/core/issues/863)) ([d425818](https://github.com/vuejs/core/commit/d425818901428ff919a0179fc910410cbcfa119b)), closes [#862](https://github.com/vuejs/core/issues/862)
- **TransitionGroup:** 경고 시 주석 노드 무시(fix[#869](https://github.com/vuejs/core/issues/869)) ([#875](https://github.com/vuejs/core/issues/875)) ([0dba5d4](https://github.com/vuejs/core/commit/0dba5d44e60d33b909f4e4d05663c7ddf746a1f2))
- 전역 빌드에서 SFC런타임 동작 코드를 삭제하지 마시오. ([4c1a193](https://github.com/vuejs/core/commit/4c1a193617bee8ace6fad289b78e9d2557cb081e)), closes [#873](https://github.com/vuejs/core/issues/873)
- 동적 컴포넌트를 기본 요소로 대체 ([f529dbd](https://github.com/vuejs/core/commit/f529dbde236e9eaedbded78e926951a189234f9c)), closes [#870](https://github.com/vuejs/core/issues/870)
- **runtime-core:** 컴포넌트 proxy props 존재여부 확인 수정 ([b3890a9](https://github.com/vuejs/core/commit/b3890a93e39342fd16e5fd72c59f361fc211309c)), closes [#864](https://github.com/vuejs/core/issues/864)
- **suspense:** suspense 해결에 대한 effets clear ([ebc1ca8](https://github.com/vuejs/core/commit/ebc1ca8eff82789987c09a9f6a934898b00153ff))
- **transition:** 지속 시간 prop 유효성 검사 수정 ([0dc2478](https://github.com/vuejs/core/commit/0dc24785699101fa24d2a68786feaaac8a887520)), closes [#868](https://github.com/vuejs/core/issues/868)

## 🌏 Features

- **asyncComponent:** async 컴포넌트에 대한 SSR/hydration 지원 ([cba2f1a](https://github.com/vuejs/core/commit/cba2f1aadbd0d4ae246040ecd5a91d8dd4e8fd1a))
- **runtime-core:** async component support ([c3bb316](https://github.com/vuejs/core/commit/c3bb3169f497fc834654d8ae700f18b1a6613127))
- **runtime-core:** support `config.optionMergeStrategies` ([528621b](https://github.com/vuejs/core/commit/528621ba41b1d7113940077574217d01d182b35f))
- h's arguments를 변환하기 위한 hook를 추가([#851](https://github.com/vuejs/core/issues/851)) ([b7d1e0f](https://github.com/vuejs/core/commit/b7d1e0fa2ffe4561a589580eca6e92171c311347))

## 🌏 Performance Improvements

- **transform-vif:** 컴포넌트에 대해 createBlock을 만들 필요가 없다. ([#853](https://github.com/vuejs/core/issues/853)) ([a3601e9](https://github.com/vuejs/core/commit/a3601e9fa73d10f524ed3bdf3ae44df8847c1230))

<br/><br/>

# 🐳 Vue v3.0.0-alpha.11

날짜 : 2020-04-04

## 🌏 Bug Fixes

- **compiler:** pre tag 공백 처리 수정 ([7f30cb5](https://github.com/vuejs/core/commit/7f30cb577257ad5765261bbffa3cae862259fcab)), closes [#908](https://github.com/vuejs/core/issues/908)
- **compiler-core/slots:** 컴넌트에 명명된 slot을 지원해야 함. ([a022b63](https://github.com/vuejs/core/commit/a022b63605820c97923413ee457ba1fb69a5221e))
- **compiler-sfc:** template 블록 소스 맵에는 항상 offset을 사용해야함. ([#911](https://github.com/vuejs/core/issues/911)) ([db50009](https://github.com/vuejs/core/commit/db5000935306214b31e33865cd57935e80e27d41))
- **inject:** 기본값을 `undefined`로 허용 ([#894](https://github.com/vuejs/core/issues/894)) ([94562da](https://github.com/vuejs/core/commit/94562daea70fde33a340bb7b57746523c3660a8e)), closes [#892](https://github.com/vuejs/core/issues/892)
- **portal:** portal은 mount해제될 때 항상 children을 제거해야함. ([16cd8ee](https://github.com/vuejs/core/commit/16cd8eee7839cc4613f17642bf37b39f7bdf1fce))
- **reactivity:** 중지되면 예약된 효과가 실행되지 않아야 함. ([0764c33](https://github.com/vuejs/core/commit/0764c33d3da8c06d472893a4e451e33394726a42)), closes [#910](https://github.com/vuejs/core/issues/910)
- **runtime-core:** root수준 주석을 사용하여 하위 속성 병합을 지원 ([e42cb54](https://github.com/vuejs/core/commit/e42cb543947d4286115b6adae6e8a5741d909f14)), closes [#904](https://github.com/vuejs/core/issues/904)
- **runtime-dom:** 루트 요소에서 컴파일한 후 v-cloak을 제거해야함.([#893](https://github.com/vuejs/core/issues/893)) ([0ed147d](https://github.com/vuejs/core/commit/0ed147d33610b86af72cbadcc4b32e6069bcaf08)), closes [#890](https://github.com/vuejs/core/issues/890)
- **runtime-dom:** 맞춤형 내장 요소 생성을 올바르게 지원함. ([b1d0b04](https://github.com/vuejs/core/commit/b1d0b046afb1e8f4640d8d80b6eeaf9f89e892f7))
- **transition:** render된 child항목이 둘 이상인 경우에만 경고 ([#903](https://github.com/vuejs/core/issues/903)) ([37b1dc8](https://github.com/vuejs/core/commit/37b1dc8242608b072d14fd2a5e52f5d40829ea52))
- **types:** 함수와 함께 PropType 사용 허용 ([#915](https://github.com/vuejs/core/issues/915)) ([026eb72](https://github.com/vuejs/core/commit/026eb729f3d1566e95f2f4253d76c20e86d1ec9b)), closes [#748](https://github.com/vuejs/core/issues/748)
- **types:** runtime-core에서 누락된 유형 내보내기 ([#889](https://github.com/vuejs/core/issues/889)) ([412ec86](https://github.com/vuejs/core/commit/412ec86128fa33fa41ce435c493fd8275a785fea))
- **types/reactivity:** markNonReactive에 대한 일반 제약 조건 추가 ([f3b6559](https://github.com/vuejs/core/commit/f3b6559408fb42ff6dc0c67001c9c67093f2b059)), closes [#917](https://github.com/vuejs/core/issues/917)

## 🌏 Code Refactoring

* **runtime-core:** 속서 fallthrough behavior 조정 ([21bcdec](https://github.com/vuejs/core/commit/21bcdec9435700cac98868a36716b49a7766c48d))
* rename `<portal>` to `<teleport>` ([eee5095](https://github.com/vuejs/core/commit/eee50956924d7d2c916cdb8b99043da616e53af5))
* **runtime-core:** rename `createAsyncComponent` to `defineAsyncComponent` ([#888](https://github.com/vuejs/core/issues/888)) ([ebc5873](https://github.com/vuejs/core/commit/ebc587376ca1fb4bb8a20d4137332740605753c8))

## 🌏 Features

- **asyncComponent:** retry support ([c01930e](https://github.com/vuejs/core/commit/c01930e60b4abf481900cdfcc2ba422890c41656))
- **compiler-core:** export `transformElement` from compiler-core ([#907](https://github.com/vuejs/core/issues/907)) ([20f4965](https://github.com/vuejs/core/commit/20f4965b45d410a2fe95310ecf7293b2b7f46f36))
- **compiler-core:** v-is 지원 ([b8ffbff](https://github.com/vuejs/core/commit/b8ffbffaf771c259848743cf4eb1a5ea31795aaa))
- **portal:** portal disabled mode에 대한 hydration 지원 ([b74bab2](https://github.com/vuejs/core/commit/b74bab216c3be68ab046451cf5e5b5bec5f19483))
- **portal:** 멀티 protal 공유 대상에 대한 SSR 지원 ([e866434](https://github.com/vuejs/core/commit/e866434f0c54498dd0fc47d48287a1d0ada36388))
- **portal:** portal 비활성화 prop에 대한 SSR 지원([9ed9bf3](https://github.com/vuejs/core/commit/9ed9bf3687a770aebc265839065832761e6bafa1))
- **portal:** disabled prop 지원([8ce3da0](https://github.com/vuejs/core/commit/8ce3da0104db9bdd89929724c6d841ac3dfb7336))
- **portal:** 동일한 대상에 여러 포털 추가 지원 ([aafb880](https://github.com/vuejs/core/commit/aafb880a0a9e023b62cf8fb3ae269b31f22ac84e))
- **reactivity:** public api에 effect 추가([#909](https://github.com/vuejs/core/issues/909)) ([6fba241](https://github.com/vuejs/core/commit/6fba2418507d9c65891e8d14bd63736adb377556))
- **runtime-core:** config.performance 추적 지원 ([e93e426](https://github.com/vuejs/core/commit/e93e426bfad13f40c8f1d80b8f45ac5d0926c2fc))
- **runtime-core:** 검증 및 경고를 내보냄 ([c7c3a6a](https://github.com/vuejs/core/commit/c7c3a6a3bef6275be8f9f8873358421017bb5386))
- **runtime-core:** 실한 컴포넌트 해결은 기본 요소로 대체되어야 함. ([cb31eb4](https://github.com/vuejs/core/commit/cb31eb4d0a0afdd2abf9e3897d9aac447dd0264b))
- **runtime-core:** app.config.globalProperties 지원([27873db](https://github.com/vuejs/core/commit/27873dbe1c09ac6a058d815949a4e13831513fd0))
- **runtime-core:** emit option에 대한 type과 attr fallthrough지원 ([bf473a6](https://github.com/vuejs/core/commit/bf473a64eacab21d734d556c66cc190aa4ff902d))
- **templateRef:** 직접 reactive 속성과 함께 작동해야함. ([449ab03](https://github.com/vuejs/core/commit/449ab039feb10df7179898b13ecc45028a043002)), closes [#901](https://github.com/vuejs/core/issues/901)
- **templateRef:** 모든 vnode type에 대한 template ref 지원 ([55b364d](https://github.com/vuejs/core/commit/55b364decc903a6c7fccd1cdcdcfc79948c848a2))

## 🌏 Breaking Changes

- **runtime-core:** [vuejs/rfcs#154](https://github.com/vuejs/rfcs/pull/154)에 따라 attr fallthrough 동작이 조정됨.

- `<portal>` 이 `<teleport>`로 재명명 됨.

  `target` prop 또한 `to`로 잼여명됨. 

  새로운 사용방법 :

  ```
  <Teleport to="#modal-layer" :disabled="isMobile">
    <div class="modal">hello</div>
  </Teleport>
  ```

  

  이름을 바꾼 주된 이유는 [native portals](https://wicg.github.io/portals/)과의 잠재적인 이름 충돌을 피하기 위한 것.

- **asyncComponent:** 비동기 컴포넌트 `error`및 `loading`옵션의 이름이 각각 `errorComponent`및 `loadingComponent`로 변경됨.

- **runtime-core:** `createAsyncComponent`는 `defineComponent`와의 일관성을 위해 `defineAsyncComponent`로 이름이 변경됨.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.12

날짜 : 2020-04-08

## 🌏 Bug Fixes

- **compiler:** condense되서는 안된다. ` ` ([8c17535](https://github.com/vuejs/core/commit/8c17535a470501f7f4ec3747cd3de25d9169c505)), closes [#945](https://github.com/vuejs/core/issues/945)
- **compiler:** pre tag에서 직접 개행 문자만 제거해야함. ([be666eb](https://github.com/vuejs/core/commit/be666ebd59027eb2fc96595c1a6054ecf62832e8))
- **compiler:** 브라우저 빌드에서 전체 범위의 엔티티 디코딩을 지원([1f6e72b](https://github.com/vuejs/core/commit/1f6e72b11051561abe270fa233cf52d5aba01d6b))
- **compiler-core:** 동적키가 있는 요소는 강제로 블록으로 만들어야함. ([d531686](https://github.com/vuejs/core/commit/d531686f9154c2ef7f1d877c275df62a8d8da2a5)), closes [#916](https://github.com/vuejs/core/issues/916)
- **reactivity:** 원시 컬렉션 타입의 반응 키 추적 ([5dcc645](https://github.com/vuejs/core/commit/5dcc645fc068f9a467fa31ba2d3c2a59e68a9fd7)), closes [#919](https://github.com/vuejs/core/issues/919)
- **runtime-core:** instance render proxy에서 globalProperties확인 문제 수정 ([c28a919](https://github.com/vuejs/core/commit/c28a9196b2165e8ce274b2708d6d772024c2933a))
- **runtime-core:** fragment root 설정 하위 항목도 dynamicChildren을 업데이트해야 합니다. ([#944](https://github.com/vuejs/core/issues/944)) ([a27e9ee](https://github.com/vuejs/core/commit/a27e9ee9aea3487ef3ef0c8a5df53227fc172886)), closes [#943](https://github.com/vuejs/core/issues/943)
- **runtime-dom:** vModelCheckbox에서 getModelAssigner순서 수정 ([#926](https://github.com/vuejs/core/issues/926)) ([da1fb7a](https://github.com/vuejs/core/commit/da1fb7afef75470826501fe6e9d81e5af296fea7))
- **runtime-dom:** 기본 onxxx핸들러 지원 ([2302dea](https://github.com/vuejs/core/commit/2302dea1624d4b964fed71e30089426212091c11)), closes [#927](https://github.com/vuejs/core/issues/927)
- **slots:** 컴파일된 동적 슬롯을 업데이트 해야한다. ([8444078](https://github.com/vuejs/core/commit/84440780f9e45aa5b060180078b769f27757c7bd))
- **transition:** 중첩된 HOC의 동적 전환 업데이트 수정 ([b8da8b2](https://github.com/vuejs/core/commit/b8da8b2dfac96558df1d038aac3bbe63bd42a8ce))
- **transition:** production환경에서 porp선언을 배송해야 함. ([4227831](https://github.com/vuejs/core/commit/42278317e15a202e4e1c8f7084eafa7bb13f1ade))
- **types:** h()에서 일반 컴포넌트 type을 허용 ([c1d5928](https://github.com/vuejs/core/commit/c1d5928f3b240a4a69bcd8d88494e4fe8d2e625b)), closes [#922](https://github.com/vuejs/core/issues/922)
- **v-model:** 동적 할당자 및 배열 할당자를 처리함([f42d11e](https://github.com/vuejs/core/commit/f42d11e8e19f7356f4e1629cd07c774c9af39288)), closes [#923](https://github.com/vuejs/core/issues/923)

## 🌏 Features

- **asyncComponent:** defineAsyncComponent에 `onError` option을 추가([e804463](https://github.com/vuejs/core/commit/e80446349215159c002223a41baeb5a8bc0f444c))
- **runtime-core:** 컴포넌트 공개 인스턴스 프록시 검사 개선 ([899287a](https://github.com/vuejs/core/commit/899287ad35d8b74e76a71f39772a92f261dfa4f8))

## 🌏 Breaking Changes

- compiler: compiler options 조정됨.
  - 새 옵션 `decodeEntities` 추가.
  - `namedCharacterReferences` option은 삭제됨
  - `maxCRNameLength` option은 삭제됨
- **asyncComponent:** `defineAsyncComponent`에 대한 `retryWhen`및 `maxRetries`옵션이 [vuejs/rfcs#148](https://github.com/vuejs/rfcs/pull/148)에 따라 보다 유연한 `onError`옵션으로 대체됨.

<br/><br/>

# 🐳 Vue v3.0.0-alpha.13

날짜 : 2020-04-15

## 🌏 Bug Fixes

- **compiler-core:** 컴포넌트에 CLASS/STYLE 패치 플래그를 생성하면 안됨. ([a6e2b10](https://github.com/vuejs/core/commit/a6e2b1052a4d461767147a6c13854fcb4f9509d2)), closes [#677](https://github.com/vuejs/core/issues/677)
- **runtime-core:** kebob case props의 업데이트를 수정 ([7cbf684](https://github.com/vuejs/core/commit/7cbf68461118ced0c7c6eb79a395ae2b148e3737)), closes [#955](https://github.com/vuejs/core/issues/955)
- **runtime-core:** 옵션이 있는 동적 속성에 대해 삭제 대신 값을 확인해야함. ([c80b857](https://github.com/vuejs/core/commit/c80b857eb5b19f48f498147479a779af9953be32))
- **runtime-dom:** `on`으로 시작하는 속성에 대한 패치 수정 ([6eb3399](https://github.com/vuejs/core/commit/6eb339931185a57cc36ddb6e12314a5283948169)), closes [#949](https://github.com/vuejs/core/issues/949)
- **runtime-dom:** svg innerHtml을 패치해야함 ([#956](https://github.com/vuejs/core/issues/956)) ([27b5c71](https://github.com/vuejs/core/commit/27b5c71944637bc04d715382851cc63ca7efc47a))
- **runtime-dom/v-on:** 여러 리스너에서 event.stopImmediate Propagation 지원 ([d45e475](https://github.com/vuejs/core/commit/d45e47569d366b932c0e3461afc6478b45a4602d)), closes [#916](https://github.com/vuejs/core/issues/916)
- **scheduler:** flush하기 전 작업 정렬 ([78977c3](https://github.com/vuejs/core/commit/78977c399734da7c4f8d58f2ccd650533e89249f)), closes [#910](https://github.com/vuejs/core/issues/910) [/github.com/vuejs/core/issues/910#issuecomment-613097539](https://github.com//github.com/vuejs/core/issues/910/issues/issuecomment-613097539)
- **types:** UnwrapRef는 DOM요소 type을 피해야함. ([#952](https://github.com/vuejs/core/issues/952)) ([33ccfc0](https://github.com/vuejs/core/commit/33ccfc0a8b69de13065c4b995f88722dd72a1ae9)), closes [#951](https://github.com/vuejs/core/issues/951)

## 🌏 Code Refactoring

- **reactivity:** 오래된 API `markReadonly`제거 ([e8a866e](https://github.com/vuejs/core/commit/e8a866ec9945ec0464035be4c4c58d6212080a50))
- **runtime-core:** emit return value 삭제([55566e8](https://github.com/vuejs/core/commit/55566e8f520eee8a07b85221174989c47c443c35))https://github.com/vuejs/core/issues/961)

## 🌏 Features

- **reactivity:** `customRef` API 지원 추가 ([b83c580](https://github.com/vuejs/core/commit/b83c5801315e5e28ac51ecff743206e665f4d868))
- **reactivity:** `toRef` API 지원 추가 ([486dc18](https://github.com/vuejs/core/commit/486dc188fe1593448d2bfb0c3c4c3c02b2d78ea4))
- **runtime-core:** 반응하는 컴포넌트를 감지하고 경고함. ([2e06f5b](https://github.com/vuejs/core/commit/2e06f5bbe84155588dea82d90822a41dc93d0688)), closes [#962](https://github.com/vuejs/core/issues/962)
- **runtime-core:** warn async data() ([3e7bb7d](https://github.com/vuejs/core/commit/3e7bb7d110818d7b90ca4acc47afc30508f465b7))

## 🌏 Reverts

- Revert "feat(reactivity): add effect to public api (#909)" (#961) ([9e9d264](https://github.com/vuejs/core/commit/9e9d2644127a17f770f325d1f1c88b12a34c8789)), closes [#909](https://github.com/vuejs/core/issues/909) [#961](https://github.com/vuejs/core/issues/961)

## 🌏 Breaking Changes

- **reactivity:** `markReadonly` 가 삭제되었습니다.

- **runtime-dom:** `on`으로 시작하고 뒤에 대문자 또는 글자가 아닌 문자가 오는 prop만 event listener로 간주됨.

- **runtime-core:** this.$emit() 및 setupContext.emit()은 더 이상 값을 반환하지 않습니다.리스너의 반환값에 의존하는 로직의 경우 리스너를 `onXXX`  prop으로 선언하고 직접 호출해야 합니다. `v-on:foo`가 내부적으로 `onFoo`로 컴파일되기 때문에 여전히 상위 컴포넌트가 `v-on`을 사용하여 핸들러를 전달할 수 있습니다.

  ```
  ref: https://github.com/vuejs/rfcs/pull/16
  ```

<br/><br/>

