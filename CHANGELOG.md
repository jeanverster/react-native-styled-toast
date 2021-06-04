## [1.3.1](https://github.com/jeanverster/react-native-styled-toast/compare/v1.3.0...v1.3.1) (2021-06-04)


### Bug Fixes

* add useCallback hook to toast method ([ff0c604](https://github.com/jeanverster/react-native-styled-toast/commit/ff0c60488d20c24507a01b947e689be70ac99eca))

# [1.3.0](https://github.com/jeanverster/react-native-styled-toast/compare/v1.2.0...v1.3.0) (2021-03-13)


### Features

* add opacity fn to toastStyles ([8927044](https://github.com/jeanverster/react-native-styled-toast/commit/89270441cd9037ebd4f6f6975cb975ec5547271b))

# [1.2.0](https://github.com/jeanverster/react-native-styled-toast/compare/v1.1.2...v1.2.0) (2021-03-13)


### Features

* add animation type options ([804add2](https://github.com/jeanverster/react-native-styled-toast/commit/804add2516c97cac43ec9b62bca4bf0e15b29069))

## [1.1.2](https://github.com/jeanverster/react-native-styled-toast/compare/v1.1.1...v1.1.2) (2021-03-13)


### Bug Fixes

* remove required on relevant props ([9dcb03e](https://github.com/jeanverster/react-native-styled-toast/commit/9dcb03ea5487e76ed143bd820197d53c76e5526d))

## [1.1.1](https://github.com/jeanverster/react-native-styled-toast/compare/v1.1.0...v1.1.1) (2020-11-24)


### Bug Fixes

* revert close button change to avoid TS errors ([06982b9](https://github.com/jeanverster/react-native-styled-toast/commit/06982b9df08621a387de5910a5d847d62375f475))

# [1.1.0](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.25...v1.1.0) (2020-11-24)


### Features

* add `maxToasts` prop to limit number of toasts on screen - [#39](https://github.com/jeanverster/react-native-styled-toast/issues/39) ([2fc84c0](https://github.com/jeanverster/react-native-styled-toast/commit/2fc84c0b7f372f57c06c3d280485461e397f407b)), closes [#34](https://github.com/jeanverster/react-native-styled-toast/issues/34) [#36](https://github.com/jeanverster/react-native-styled-toast/issues/36) [#40](https://github.com/jeanverster/react-native-styled-toast/issues/40)

## [1.0.25](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.24...v1.0.25) (2020-10-06)


### Bug Fixes

* remove `react-native-safe-area-context` dependency as was causing duplicate dependency problems ([0a32f1a](https://github.com/jeanverster/react-native-styled-toast/commit/0a32f1a46286200ecfce2490ac15c0299b46cee8))

## [1.0.24](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.23...v1.0.24) (2020-10-06)


### Bug Fixes

* remove yarn command and run npm publish directly ([90f32a4](https://github.com/jeanverster/react-native-styled-toast/commit/90f32a44c4a7c5ec6cd25fe5b06003994fcc0242))

## [1.0.23](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.22...v1.0.23) (2020-10-06)


### Bug Fixes

* remove Partial type annotation and provide default value for `toast` to avoid null checking ([99f9cb3](https://github.com/jeanverster/react-native-styled-toast/commit/99f9cb33a7c67665ec1da1b1818dc90f01138aeb))

## [1.0.22](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.21...v1.0.22) (2020-09-14)


### Bug Fixes

* use npm registry as default ([e3323c3](https://github.com/jeanverster/react-native-styled-toast/commit/e3323c38cb381ad772e69bedf8ed0aeb6ee30063))

## [1.0.21](https://github.com/jeanverster/react-native-styled-toast/compare/v1.0.20...v1.0.21) (2020-09-14)


### Bug Fixes

* manual version bump; chore: update release job name ([c14f2a8](https://github.com/jeanverster/react-native-styled-toast/commit/c14f2a8bbe49307ed690d822b189effb126f4f72))

# 1.0.0 (2020-09-14)


### Bug Fixes

* add borderWidth to StyledToast ([e11a760](https://github.com/jeanverster/react-native-styled-toast/commit/e11a7607e884bbb1eea8da6964ba96383277012d))
* add checkout step to version workflow ([11cfab9](https://github.com/jeanverster/react-native-styled-toast/commit/11cfab9c7fce78876d75e2952e64934a9e29cf11))
* add explicit px value ([f54288c](https://github.com/jeanverster/react-native-styled-toast/commit/f54288cff3ae9a68356992280ba68f9fc4d8974d))
* fix bottom position logic ([a62feaa](https://github.com/jeanverster/react-native-styled-toast/commit/a62feaa76d0ee373c00a90705eef3bbe02ca7d9b))
* fix fade out animation bug ([7836722](https://github.com/jeanverster/react-native-styled-toast/commit/78367225445faaed7785c296aa367a87014fb84c))
* ignore ts checks in Icon component ([b72aa87](https://github.com/jeanverster/react-native-styled-toast/commit/b72aa87d83c9929c8d3b0096b03485040a28b37f))
* pass position prop to Toast component ([b352d7f](https://github.com/jeanverster/react-native-styled-toast/commit/b352d7fa8e6ca246788d46d6062f4c319e8f08cf))
* remove opacity transition to prevent buggy android layoutanimation ([739cb15](https://github.com/jeanverster/react-native-styled-toast/commit/739cb1546ab1394eee355c61351ea5be3a64ad49))
* resolve duplicate dependency issues ([7effd6e](https://github.com/jeanverster/react-native-styled-toast/commit/7effd6eb5bc2a6abe2860ff314fc54e1ad572841))
* update font weight property ([78c14f3](https://github.com/jeanverster/react-native-styled-toast/commit/78c14f3f8049980908644f5661a43a178fb059dc))


### Features

* add ability to toggle icon visibility ([b869dae](https://github.com/jeanverster/react-native-styled-toast/commit/b869dae9bd8003fd83ae5be90ed06111cbc2ce9d))
* add ability to toggle position ([2804761](https://github.com/jeanverster/react-native-styled-toast/commit/28047611ee053ca2d1fe47a2a5629fd5ce887e31))
* configure CI; chore: remove incorrect padding value ([facb5db](https://github.com/jeanverster/react-native-styled-toast/commit/facb5db09b74d2fb2d0665cea024d571223b9998))
