#  49장. Babel과 Webpack을 이용한 ES6+/ES.NEXT개발환경 구축

ES6가 대부분의 브라우저에서 사용이 가능하지만, IE는 안될 수도 있다.

ES6+와 ES.NEXT의 최신 ECMAScript 사양을 사용해 프로젝트를 진행하려면 최신 사양으로 작성된 코드를 경우에 따라 IE를 포함한 구형 브라우저에서 무넺 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다.

또한 대부분의 프로젝트가 모듈을 사용하므로 모듈 로더도 필요하다. ES6모듈은 대부분의 모던 브라우저에서 사용할 수 있지만, 아직 별도의 모듈 로더를 사용하는 것이 일반적이다.

* IE를 포함한 구형 브라우저는 ESM을 지원하지 않는다.
* ESM을 사용하더라도 트랜스파일링이나 번들링이 필요한 것은 변함이 없다.
* ESM이 아직 지원하지 않는 기능(bare import  등)이 있고, 점차 해결되고는 있지만 아직 몇 가지 이슈가 존재한다.

이번 장에서는 트랜스 파일러인 Babel과 모듈 번들러인 Webpack을 이용하여 ES6+/ES.NEXT개발환경을 구축해볼 것이다. Webpack과 Babel을 로드해 ES5사양의 소스코드로 트랜스파일링하는 방법도 알아보자.

* Node.js : 14.3.0
* npm : 6.14.5
* Babel
  * @babel/cli : 7.10.3
  * @babel/core : 7.10.3
* Babel 프리셋
  * @babel/preset-env : 7.10.3
* Babel 플러그인
  * @babel/plugin-proposal-class-properties : 7.10.1
  * @babel/polyfill : 7.10.1
* Webpack
  * webpack : 4.43.0
  * webpack-cli : 3.3.12
* Webpack 플러그인
  * baebl-loader : 8.1.0

<br/>

## 49.1 Babel

```js
[1, 2, 3].map(n => n**n);
```

ES6의 화살표 함수와 ES7의 지수 연산자를 사용하고 있다. 아래 코드처럼 바꿀 수 있다.

```js
"use strict";
[1, 2, 3].map(function(n){
  return Math.pow(n,n);
})
```

이처럼 `Babel`은 ES5사양의 소스코드로 변환할 수 있다.

### 49.1.1 Babel 설치

```shell
npm init -y
npm i --save-dev @babel/core@7.10.3 @babel/cli@7.10.3
```

뒤에 버전을 따로 붙이지 않으면 항상 최신 버전이 설치되므로 버전도 명시해준다.

<br/>

### 49.1.2  Babel 프리셋 설치와 babel.config.json 설정 파일 작성

Babel을 사용하려면 @babel/preset-env를 설치해야 한다. 이는 함께 사용되어야 하는 Babel플러그인을 모아둔 것으로 Babel프리셋이라 부른다.

* @babel/preset-env
* @babel/preset-flow
* @babel/preset-react
* @babel/preset-typescript

프로젝트 지원환경에 맞춰 동적으로 결정해주며, `.browserslistrc`파일에 프로젝트 지원 환경을 설정할 수 있다.

```shell
npm i --save-dev @babel/preset-env
```

설치 후에는 babel.config.json설정 파일을 생성 후 preset값을 설정해준다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

<br/>

### 49.1.3 트랜스파일링

먼저 명령어를 package.json에 등록.

```js
{
  ...
	"scripts": {
    "build": "babel src/js -w -d dist/js"
  }
}
```

해당 명령어는 src/js폴더에 있는 모든 js파일들을 트랜스파일링한 후 그 결과물을 dist/js폴더에 저장한다.

* -w : 타깃 폴더에 있는 모든 자바스크립트 파일들의 변경을 감지하여 자도응로 트랜스파일한다. (--watch옵션의 축약형)
* -d : 트랜스파일링된 결괌루이 저장될 폴더를 지정한다. 만약 지정된 폴더가 존재하지 않으면 자동 생성한다. (--out-dir 옵션의 축약형)

`npm run build`를 수행하면 에러가 발생한다. => 2021년 1월 TC39프로세스의 stage3(candidate)단계에 있는 private 필드 정의 제안에서 에러가 발생했다는 것이다.

`@babel/preset-env`가 현제 제안 단계에 있는 사양에 대한 플러그인을 지원하지 않기 때문에 발생한 것이다. 이를 위해 별도 플러그인을 설치해야 한다.

<br/>

### 49.1.4 Babel 플러그인 설치

Babel홈페이지에서 필요한 플러그인을 검색할 수 있다.<br/>(클래스 필드 정의 제안 플러그인을 위해 class field를 검색해볼 수 있다.)

```shell
npm i --save-dev @babel/plugin-proposal-class-properties
```

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

트랜스파일링에 성공하면, 프로젝트 루트 폴더에 dist/js폴더가 생성되고, 트랜스파일리된 파일이 저장된 것을 볼 수 있다.

<br/>

### 49.1.5 브라우저에서 모듈 로딩 테스트

앞의 트랜스파일링 후 실행해보면, class필드 정의나 import, export도 정상 동작하는 것을 볼 수 있다.

이는 Node.js환경에서 동작한 것이고 Babel이 모듈을 트랜스파일링한 것도 Node.js가 기본 지원하는 CommonJS방식의 모듈 로딩 시스템에 따른 것이다.

src/js/main.js가 Babel로 트랜스파일링된 결과를 보면, require가 있는 것을 볼 수 있다.

브라우저는 CommonJS방식의 require함수를 지원하지 않기 때문에 이파일을 그대로 브라우저에서 실행하면 에러가 ㅂ라생한다. 이 문제는 **WebPack**을 활용해 해결할 수 있따.

<br/><br/>

## 49.2 Webpack

**Wenpack**은 의존 관계에 있는 JS, CSS, 이미지 드으이 리소스들을 하나 또는 여러개의 파일로 번들링하는 **모듈 번들러**이다.

Webpack을 사용하면, 의존 모듈이 하나의 파일로 번들링되므로 별도 모듈 로더가 필요없고, HTML파일에서 여러개의 js파일을 로드해야하는 번거로움도 사라진다.

### 49.2.1  Webpack 설치

```shell
npm i --save-dev webpack webpack-cli
```

<br/>

### 49.2.2 babel-loader 설치

Webpack이 모듈을 번들링할 때 Babel을 사용해 ES5사양의 소스코드로 트랜스파일링 하도록 `babel-loader`를 설치.

```shell
npm i --save-dev babel-loader
```

npm scripts를 변경.

```json
{
  ...
	"scripts": {
    "build": "webpack -w"
  }
}
```

<br/>

### 49.2.3 webpack.config.js 설정 파일 작성

`webpack.config.js`는 Webpack이 실행될 떄 참조하는 설정 파일이다.

```js
const path = require('path');

module.exports = {
  // entry file
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: './src/js/main.js',
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputfilename
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/configuration/mode
  mode: 'development'
};
```

Webpack을 실행한 결과 dist/js폴더에 bundle.js가 생성되었다. 이는 main.js, lib.js모듈이 하나로 번들링된 결과물이다.

```html
<!DOCTYPE html>
<html>
<body>
  <script src="./dist/js/bundle.js"></script>
</body>
</html>
```

<br/>

### 49.2.4 babel-polyfill 설치

트랜스파일링을 진행해도 브라우저에 지원ㄷ하지 않는 코드가 남아있을 수 있다.

ex) Promise, Object.assign, Array.from등

이러한 객체나 메서드를 사용하기 위해서는 `@babel/polyfill`이 필요하다.

```shell
npm i @babel/polyfill
```

`@babel/polyfill`는 개발환경 뿐만 아니라 실제 운영에서도 사용되야 하므로 dev옵션을 넣지 않는다.

그리고 import 시 가장 먼저 import하도록 한다.

```js
// src/js/main.js
import "@babel/polyfill";
import { pi, power, Foo } from './lib';
...
```

<br/>

Webpack을 사용한다면, webpack.config.js에 entry배열에 폴리필을 추가한ㄷ.

```js
const path = require('path');

module.exports = {
  // entry file
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: ['@babel/polyfill', './src/js/main.js'],
...
```

