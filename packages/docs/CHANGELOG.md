## [0.5.4-alpha.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.5.3...v0.5.4-alpha.0) (2025-01-24)


### Bug Fixes

* adjust the unocss plugin type assertion ([a5f3213](https://github.com/hacxy/vitepress-theme-mild/commit/a5f32130560f9286ab53f6dfd84e39e0162c12fd))
* handle transformerTwoslash type assertions ([0327858](https://github.com/hacxy/vitepress-theme-mild/commit/032785885119d52031a105264fd6b0b7547b1513))


### Features

* add frontmatter.publish to control whether to display the article. ([4dff7f3](https://github.com/hacxy/vitepress-theme-mild/commit/4dff7f33c27db3ad4f8a362c0bb3b9f453912909))
* add the scrollRestoration option to control whether the page returns to the last scroll position after refreshing. ([d2c7615](https://github.com/hacxy/vitepress-theme-mild/commit/d2c76153ff3ca9855418abd9a3098c0f26c400ab))
* bilibili video playback component ([85ba483](https://github.com/hacxy/vitepress-theme-mild/commit/85ba48309174146363d5226b4d02262d1b8e75a2))


### Performance Improvements

* optimize the animation effects of the document content ([774d563](https://github.com/hacxy/vitepress-theme-mild/commit/774d563edf8d8aadbd3b0f4d6df248de471f0f87))
* use Iconify for Vue ([8b14f29](https://github.com/hacxy/vitepress-theme-mild/commit/8b14f29b242c1961225d2118b94206430f8b3343))



## [0.5.3](https://github.com/hacxy/vitepress-theme-mild/compare/v0.5.2...v0.5.3) (2025-01-20)


### Bug Fixes

* fixed the issue where the sidebar status was not synchronized when the config file was modified. ([8b1b346](https://github.com/hacxy/vitepress-theme-mild/commit/8b1b34659b45b8ec515fe55061985b8ca1490c20))



## [0.5.2](https://github.com/hacxy/vitepress-theme-mild/compare/v0.5.2-alpha.0...v0.5.2) (2025-01-18)



## [0.5.2-alpha.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.5.1...v0.5.2-alpha.0) (2025-01-18)


### Bug Fixes

* fix the issue of the mobile menu not being able to open. ([a304c37](https://github.com/hacxy/vitepress-theme-mild/commit/a304c3741ba200bd1e9121b33df8eb3c853f04dc))



## [0.5.1](https://github.com/hacxy/vitepress-theme-mild/compare/v0.5.0...v0.5.1) (2025-01-17)


### Bug Fixes

* fix the error caused by the incorrect call to window.close resulting in abnormal window closure ([2f25375](https://github.com/hacxy/vitepress-theme-mild/commit/2f25375c33dfd6b885983e15ee659eb07943fd55))



# [0.5.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.4.1-alpha.3...v0.5.0) (2025-01-17)



## [0.4.1-alpha.3](https://github.com/hacxy/vitepress-theme-mild/compare/v0.4.1-alpha.2...v0.4.1-alpha.3) (2025-01-17)


### Bug Fixes

* remove pinia global state management and use provide and inject instead. ([551df09](https://github.com/hacxy/vitepress-theme-mild/commit/551df09018b0ee707afd12d500f6344bf3474b25))



## [0.4.1-alpha.2](https://github.com/hacxy/vitepress-theme-mild/compare/v0.4.1-alpha.1...v0.4.1-alpha.2) (2025-01-17)


### Bug Fixes

* adjust the call timing of useBaseStore ([0907873](https://github.com/hacxy/vitepress-theme-mild/commit/09078732df3771e02ab00ef13df280958e681714))



## [0.4.1-alpha.1](https://github.com/hacxy/vitepress-theme-mild/compare/v0.4.1-alpha.0...v0.4.1-alpha.1) (2025-01-17)


### Bug Fixes

* fix the issue where the pinia store is called before the instance is created. ([3e07cf5](https://github.com/hacxy/vitepress-theme-mild/commit/3e07cf58581df6af1b09b26c63394344115d8cef))



## [0.4.1-alpha.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.4.0...v0.4.1-alpha.0) (2025-01-17)


### Bug Fixes

* fix the sidebar status not updated causing the page display error ([4ee2c74](https://github.com/hacxy/vitepress-theme-mild/commit/4ee2c7485caa3a44f00646d1a6d92dbde1929871))


### Features

* sidebar frontmatter add collapsed. ([dcbe73b](https://github.com/hacxy/vitepress-theme-mild/commit/dcbe73b4a1105f3f584d636bda58b7a7ec121967))


### Performance Improvements

* optimize the auto sidebar calculation method ([315d57b](https://github.com/hacxy/vitepress-theme-mild/commit/315d57bcf6f6ff8be615caac3a335ea7f099a497))
* optimize the issue of hot update memory leak causing browser crash during article editing. ([5dd0f1d](https://github.com/hacxy/vitepress-theme-mild/commit/5dd0f1d0a1005d129020ccec6a8c58de28deaa40))



# [0.4.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.3.1-alpha.1...v0.4.0) (2025-01-10)



## [0.3.1-alpha.1](https://github.com/hacxy/vitepress-theme-mild/compare/v0.3.1-alpha.0...v0.3.1-alpha.1) (2025-01-10)


### Bug Fixes

* fix error when taking value when undefined comment is repaired. ([bf343b1](https://github.com/hacxy/vitepress-theme-mild/commit/bf343b10e72e3b2c7111db67805d7ec2c61bdebb))



## [0.3.1-alpha.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.3.0...v0.3.1-alpha.0) (2025-01-10)


### Bug Fixes

* rss plugins are not loaded when not defined ([b78c996](https://github.com/hacxy/vitepress-theme-mild/commit/b78c996119b8ce78796fb72d1265c896bde5fc6e))
* the progress bar provides configuration options. ([a91988a](https://github.com/hacxy/vitepress-theme-mild/commit/a91988ab5fd8b7ccad8f2c81c29dc3062cf02b2c))


### Features

* add comment component and config ([58e8a9c](https://github.com/hacxy/vitepress-theme-mild/commit/58e8a9cfc61984f2c443d471f96af8337099fcac))
* support RSS subscription ([32e042f](https://github.com/hacxy/vitepress-theme-mild/commit/32e042fc22898974a0905e300a3f02abf3b68656))


### Performance Improvements

* comment component distinguishes between dark theme and light theme ([8b86455](https://github.com/hacxy/vitepress-theme-mild/commit/8b864559d7e63ae27df6734ee4271a273b5d2bfc))
* remove transition animation within markdown ([c43912a](https://github.com/hacxy/vitepress-theme-mild/commit/c43912aaa85d691cc047e9a787bba68a0dcb6d25))



# [0.3.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.2.1-alpha.0...v0.3.0) (2025-01-08)


### Performance Improvements

* adjust the default page size to 5 ([4484366](https://github.com/hacxy/vitepress-theme-mild/commit/44843664880f3bdbad4f5c89527ae0979b7c6d93))



## [0.2.1-alpha.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.2.0...v0.2.1-alpha.0) (2025-01-08)


### Bug Fixes

* fix the initial page number value as NAN causing page anomalies ([302bff2](https://github.com/hacxy/vitepress-theme-mild/commit/302bff24ead74c1c81fcf02c25d37a1f65d3bcd8))



# [0.2.0](https://github.com/hacxy/vitepress-theme-mild/compare/v0.2.0-beta.6...v0.2.0) (2025-01-08)


### Bug Fixes

* fixed the initial page number error on the article list page ([5879af3](https://github.com/hacxy/vitepress-theme-mild/commit/5879af32a9f2c3000bd411ea67206941d49c2106))
* optimize the progress bar display effect ([2bcf03f](https://github.com/hacxy/vitepress-theme-mild/commit/2bcf03f154fa5358664ea22736a45c721da228b7))


### Performance Improvements

* handle not found nprogress ([70cff1b](https://github.com/hacxy/vitepress-theme-mild/commit/70cff1ba8dee1082aa7238a16759f81edf048e8b))



