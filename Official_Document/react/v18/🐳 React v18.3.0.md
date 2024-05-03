# 🐳 React v18.3.0

날짜 : 2024.04.25

❗ 이 릴리즈는 18.2와 동일하지만 더 이상 사용되지 않는 API에 대한 경고와 React 19에 필요한 기타 변경 사항을 추가함.<br/>자세한 내용은 [React 19 업그레이드 가이드](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)를 읽으세요!

## 🌏 React

* string ref codemod를 지원하려면 `this.refs`에 writting을 허용[909071](https://github.com/facebook/react/commit/9090712fd3ca4e1099e1f92e67933c2cb4f32552)
* StrictMode외부에서 더 이상 사용되지 않는 `findDOMNode`에 대해 경고함. [c3b283](https://github.com/facebook/react/commit/c3b283964108b0e8dbcf1f9eb2e7e67815e39dfb)
* 더 이상 사용되지 않는 `test-utils`방법에 대해 경고 [d4ea75](https://github.com/facebook/react/commit/d4ea75dc4258095593b6ac764289f42bddeb835c)
* StrictMode 외부에서 더 이상 사용되지 않는 레거시 컨텍스트에 대해 경고 [415ee0](https://github.com/facebook/react/commit/415ee0e6ea0fe3e288e65868df2e3241143d5f7f)
* StrictMode 외부에서 더 이상 사용되지 않는 문자열 참조에 대해 경고 [#25383](https://github.com/facebook/react/pull/25383)
* 함수 컴포넌트에 대해 더 이상 사용되지 않는 `defaultProps`에 대해 경고 [#25699](https://github.com/facebook/react/pull/25699)
* `key`를 spreading할 때 경고 [#25697](https://github.com/facebook/react/pull/25697)
* `test-utils`에서 `act`를 사용할 떄 경고 [d4ea75](https://github.com/facebook/react/commit/d4ea75dc4258095593b6ac764289f42bddeb835c)


## 🌏 React DOM

* 더 이상 사용되지 않는 `unmountComponentAtNode`에 대해 경고 [8a015b](https://github.com/facebook/react/commit/8a015b68cc060079878e426610e64e86fb328f8d)
* 더 이상 사용되지 않는 `renderToStaticNodeStream`에 대해 경고 [#28874](https://github.com/facebook/react/pull/28874)

<br/><br/>

# 🐳 React v18.3.1

날짜 : 2024.04.26

* `react`에서 `act` export