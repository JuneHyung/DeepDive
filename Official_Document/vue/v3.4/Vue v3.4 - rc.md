❗ rc는 preview release로 마지막 제품이 될 가능성이 있는 시험판(beta)로, 상당한 버그가 나타나지 않으면 출시될 준비가 되었음을 의미.

# 🐳 Vue v3.4.0-rc.1

날짜 : 2023-12-25

## 🌏 Bug Fixes

* **compiler-core:** >를 사용하여 `<script setup>` 제네릭 파싱을 수정 ([7aa3f25](https://github.com/vuejs/core/commit/7aa3f250f26d58ee2db82af907de8b9105e6e418)), closes [#9890](https://github.com/vuejs/core/issues/9890)
* **compiler-sfc:**다른 일반 매개변수가 있는 공유 유형에 대한 유형 해결 수정 ([a8d0b1b](https://github.com/vuejs/core/commit/a8d0b1b38b092ec2d10b32bedcee2eea33b77657)), closes [#9871](https://github.com/vuejs/core/issues/9871)
* **ssr:** 순서가 다른 클래스에 대한 hydration 불일치 경고 방지([e585b0d](https://github.com/vuejs/core/commit/e585b0db43150c8b8b3d78f71e12efccc018a38d))

<br/><br/>

# 🐳 Vue v3.4.0-rc.2

날짜 : 2023-12-26

## 🌏 Bug Fixes

* **deps:**  종속성 `@vue/repl`을 ^3.1.0으로 업데이트 ([#9911](https://github.com/vuejs/core/issues/9911)) ([f96c413](https://github.com/vuejs/core/commit/f96c413e8ef2f24cacda5bb499492922f62c6e8b))
* **types:** setup 바인딩을 풀 때 union types의 분포(distribute)를 수정 ([#9909](https://github.com/vuejs/core/issues/9909)) ([0695c69](https://github.com/vuejs/core/commit/0695c69e0dfaf99882a623fe75b433c9618ea648)), closes [#9903](https://github.com/vuejs/core/issues/9903)
* **warning:** prod hydration 경고가 실제로 작동하는지 확인 ([b4ebe7a](https://github.com/vuejs/core/commit/b4ebe7ae8b904f28cdda33caf87bc05718d3a08a))

## 🌏 Features

* **compiler-sfc:** compiler-core와 compiler-dom에 대해 집계된 오류 메세지 export ([25c726e](https://github.com/vuejs/core/commit/25c726eca81fc384b41fafbeba5e8dfcda1f030f))

<br/><br/>

# 🐳 Vue v3.4.0-rc.3

날짜 : 2023-12-13

## 🌏 Bug Fixes

* 모든 cjs 빌드에서 런타임 오류 문자열을 내보냄 ([38706e4](https://github.com/vuejs/core/commit/38706e4a1e5e5380e7df910b2a784d0a9bc9db29))

## 🌏 Features

* **defineModel:** modifiers and transformers 지원 ([a772031](https://github.com/vuejs/core/commit/a772031ea8431bd732ffeaeaac09bd76a0daec9b))
