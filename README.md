在 iOS 与 Android 上实现 React Native 应用的尝试链接

我们生活在一个万物兼可分享的年代，而分享的过程，几乎最终都会分享某一个链接，那么，作为开发者，最常遇到的问题中应该包括如何通过一个URL地址快速的打开App，并导航至特定的页面。

## 什么是深度链接（Deep Link）

深度链接是一项可以让一个App通过一个URL地址打开，之后导航至特定页面或者资源，或者展示特定UI的技术，Deep 的意思是指被打开的页面或者资源并不是App的首页，最常使用到的地方包括但远远不限于 Push Notification、邮件、网页链接等。

其实这个技术在很久很久以前就已经存在了，鼠标点击一下 [mailto:pantao@parcmg.com](mailto:pantao@parcmg.com) 这样的链接，系统会打开默认的邮件软件，然后将 `pantao@parcmg.com` 这个邮箱填写至收件人输入栏里，这就是深度链接。

本文将从零开始创建一个应用，让它支持通过一个如 `deep-linking://articles/{ID}` 这样的 URL 打开 **文章详情** 页面，同时加载 `{ID}` 指定的文章，比如：`deep-linking://articles/4` 将打开 `ID` 为 `4` 的文章详情页面。

## 深度链接解决了什么问题？

网页链接是无法打开原生应用的，如果一个用户访问你的网页中的某一个资源，他的手机上面也已经安装了你的应用，那么，我们要如何让系统自动的打开应用，然后在应用中展示用户所访问的那一个页面中的资源？这就是深度链接需要解决的问题。

## 实现深度链接的不同方式

有两种方式可以实现深度链接：

- URL scheme
- Universal links

前端是最常见的方式，后者是 iOS 新提供的方式，可以一个普通的网页地址链接至App的特定资源。

本文将创建一个名为 `DeepLinkingExample` 的应用，使得用户可以通过打开 `deep-linking://home` 以及 `deep-linking://articles/4` 分别打开 App 的首页以及 App 中 ID 为 `4` 的文章详情页面。

```sh
react-native init DeepLinkingExample
cd DeepLinkingExample
```

## 安装必要的库

紧跟 TypeScript 大潮流，我们的 App 写将使用 TypeScript 开发。

```sh
yarn add react-navigation react-native-gesture-handler
react-native link react-native-gesture-handler
```

我们将使用 **react-navigation** 模块作为 App 的导航库。

添加 TypeScript 相关的开发依赖：

```sh
yarn add typescript tslint tslint-react tslint-config-airbnb tslint-config-prettier ts-jest react-native-typescript-transformer -D
yarn add @types/jest @types/node @types/react @types/react-native @types/react-navigation @types/react-test-renderer
```

添加 `tsconfig.json`：

```js
{
  "compilerOptions": {
    "target": "es2017",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "es2015",                       /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": [                                  /* Specify library files to be included in the compilation:  */
      "es2017",
      "dom"
    ],
    "resolveJsonModule": true,
    "allowJs": false,                         /* Allow javascript files to be compiled. */
    "skipLibCheck": true,                     /* Skip type checking of all declaration files. */
    "jsx": "react-native",                    /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                      /* Generates corresponding '.d.ts' file. */
    "sourceMap": true,                        /* Generates corresponding '.map' file. */
    "outDir": "./lib",                        /* Redirect output structure to the directory. */
    "removeComments": true,                   /* Do not emit comments to output. */
    "noEmit": true,                           /* Do not emit outputs. */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                    /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,                 /* Enable strict null checks. */
    "strictFunctionTypes": true,              /* Enable strict checking of function types. */
    "noImplicitThis": true,                   /* Raise error on 'this' expressions with an implied 'any' type. */
    "alwaysStrict": true,                     /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    "noUnusedLocals": true,                   /* Report errors on unused locals. */
    "noUnusedParameters": true,               /* Report errors on unused parameters. */
    "noImplicitReturns": true,                /* Report error when not all code paths in function return a value. */
    "noFallthroughCasesInSwitch": true,       /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    "moduleResolution": "node",               /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                          /* Base directory to resolve non-absolute module names. */
    "paths": {                                /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
      "*": [
        "*.android",
        "*.ios",
        "*.native",
        "*.web",
        "*"
      ]
    },
    "typeRoots": [                            /* List of folders to include type definitions from. */
      "@types",
      "../../@types"
    ],
    // "types": [],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,     /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Experimental Options */
    "experimentalDecorators": true,           /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true             /* Enables experimental support for emitting type metadata for decorators. */
  },
  "exclude": [
    "node_modules",
    "web"
  ]
}
```

添加 `tslint.json` 文件

```js
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint:recommended", 
    "tslint-react",
    "tslint-config-airbnb",
    "tslint-config-prettier"
  ],
  "jsRules": {},
  "rules": {
    "curly": false,
    "function-name": false,
    "import-name": false,
    "interface-name": false,
    "jsx-boolean-value": false,
    "jsx-no-multiline-js": false,
    "member-access": false,
    "no-console": [true, "debug", "dir", "log", "trace", "warn"],
    "no-empty-interface": false,
    "object-literal-sort-keys": false,
    "object-shorthand-properties-first": false,
    "semicolon": false,
    "strict-boolean-expressions": false,
    "ter-arrow-parens": false,
    "ter-indent": false,
    "variable-name": [
      true,
      "allow-leading-underscore",
      "allow-pascal-case",
      "ban-keywords",
      "check-format"
    ],
    "quotemark": false
  },
  "rulesDirectory": []
}
```

添加 `.prettierrc` 文件：

```js
{
  "parser": "typescript",
  "printWidth": 100,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

## 编写我们的应用

在项目根目录下创建一个 `src` 目录，这个将是项目原代码的目录。

### 添加 `src/App.tsx` 文件

```ts

```

### 添加 `src/screens/Home.tsx` 文件

```ts
import React from 'react';

```

### 添加 `src/screens/Article.tsx`

```ts

```

## 配置 iOS

打开 `ios/DeepLinkingExample.xcodeproj`：

```sh
open ios/DeepLinkingExample.xcodeproj
```

点击 `Info` Tab 页，找到 `URL Types` 配置，添加一项：

- identifier：`deep-linking`
- URL Schemes：`deep-linking`
- 其它两项留空

打开项目跟目录下的 `AppDelegate.m` 文件，添加一个新的 `import`：

```objective-c
#import "React/RCTLinkingManager.h"
```

然后在 `@end` 前面，添加以下代码：

```objective-c
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}
```

至此，我们已经完成了 iOS 的配置，运行并测试是否成功。

```sh
react-native run-ios
```

打开 `simulator` 之后，打开 `Safari` 浏览器，在地址栏中输入：`deep-linking://article/4` ，你的应用将会自动打开，并同时进入到 `Article` 页面。

同样的，你还可以在命令行工具中执行以下命令：

```sh
xcrun simctl openurl booted deep-linking://article/4
```

## 配置 Android

要为Android应用也创建 External Linking，需要创建一个新的 `intent`，打开 `android/app/src/main/AndroidManifest.xml`，然后在 `MainActivity` 节点添加一个新的 `intent-filter`：

```xml
<application ...>
  <activity android:name=".MainActivity" ...>
    ...
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="deep-linking" />
    </intent-filter>
    ...
  </activity>
</application>
```

Android 只需要完成上面的配置即可。

执行：

```sh
react-native run-android
```

打开系统浏览器，输入：

```txt
deep-linking://article/4
```

系统会自动打开你的应用，并进入 Article 页面

也可以在命令行工具中使用以下命令打开：

```sh
adb shell am start -W -a android.intent.action.VIEW -d "deep-linking://article/3" com.deeplinkingexample;
```

## 附录

点击以下链接即可：

- [HOME](deep-linking://home)
- [Article](deep-linking://article/4)
