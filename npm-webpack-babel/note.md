## npm init
```
npm init -y
```

## Babel
```
npm install -D @babel/core
npm install -D @babel/cli
npm install -D @babel/preset-env
npm install -D @babel/polyfill

npm install -D @babel/preset-flow
npm install -D @babel/preset-react
npm install -D @babel/preset-typescript
```

```javascript
// babel.config.js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "87",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

## Webpack
```
npm install -D webpack
npm install -D webpack-cli
npm install -D webpack-dev-server
```

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/js/main.js", "./src/css/main.css"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3.6.4',
                    targets: {
                      chrome:  '87',
                    }
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader',
                options: {
                    minimize: true,
                }
            }
        ]
      }
    ]
  },
  // devtool: "inline-source-map",
  devtool: "source-map",
};
```
## loader 설치
```
npm install -D css-loader
npm install -D style-loader

npm install -D babel-loader

npm install -D html-loader
```

## plugin 설치
```
npm install -D html-webpack-plugin
```

## 파일 생성

### 디렉토리 생성
```
mkdir -p src/js
mkdir -p src/css
```

### js 파일 생성
- src/js/main.js
    ```javascript
    const pow = require("./lib.js");

    const a = 3;
    const powedA = pow(a);

    console.log(powedA);
    ```
- src/js/lib.js
    ```javascript
    const pow = function (a) {
    const result = a * a;
    return result;
    };

    module.exports = pow;
    ```

### css 파일 생성
- src/css/main.css
    ```css
    @import url("./background.css");
    @import url("./font.css");
    ```
- src/css/background.css
    ```css
    body {
        background-color: darkslateblue;
    }
    ```
- src/css/font.css
    ```css
    h1 {
        color: yellow;
    }
    ```

## webpack 실행
```
npx webpack
```

## babel 실행
```
./node_modules/.bin/babel src --out-dir lib
```
