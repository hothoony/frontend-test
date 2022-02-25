> # npm
- ### npm 프로젝트 생성
    ```shell
    ## npm 프로젝트 생성
    $ npm init

    ## package.json 이 생성됨
    $ ls
    package.json
    ```

> # Webpack
- ### 개요
    - module bundler
    - a.js, b.js => bundle.js

- ### webpack 설치
    ```shell
    $ npm install webpack --save-dev
    ## $ npm install -D webpack-cli

    $ ls
    node_modules    package-lock.json    package.json
    ```

- ### webpack.config.js 파일 생성
    ```javascript
    $ vi webpack.config.js
    var path = require('path');

    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{

            }]
        }
    }
    ```

- ### index.js 파일 생성
    ```shell
    $ vi src/index.js
    console.log('index.js run ok');
    ```

- ### script build 추가 | package.json
    - package.json 수정
    ```shell
    $ vi package.json
    "scripts": {
        "build": "webpack"
    }
    ```

- ### webpack 실행
    ```bash
    $ npm run build
    ```

- ### index.html 신규 생성
    ```html
    $ vi index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src='./dist/bundle.js'></script>
    </head>
    <body>
        index.html
    </body>
    </html>
    ```

- ### index.html 브라우저에서 확인

> # Babel
- ### 개요
    - transpiler
    - ES6 의 문법을 지원하지 않는 구형 브라우저에서 동작할 수 있도록 ES5 이하 코드로 변환해 준다

- ### 설치
    - Babel CLI 설치
    ```bash
    $ npm install babel-loader --save-dev
    ```

- ### script build 추가 | package.json
    ```json
    $ vi package.json
    {
        "scripts": {
            "build": "babel src/js -w -d dist/js"
        },
        "devDependencies": {
            "@babel/cli": "^7.7.0",
            "@babel/core": "^7.7.2",
            "@babel/preset-env": "^7.7.1",
        }
    }
    ```

- ### babel-present-env 설치
    ```bash
    $ sudo npm install babel-preset-env --save-dev
    ```

- ### webpack.config.js 수정
    ```javascript
    modules: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            'targets': {
                                'browsers': ['last 2 versions']
                            },
                            'debug': true
                        }]
                    ]
                }
            }
        }]
    }
    ```

- ### 실행
    ```bash
    $ npm run build
    ```

- ### webpack-dev-server 설치
    ```bash
    $ sudo npm install webpack-dev-server --save-dev
    ```

- ### scripts devserver 추가 | package.json
    ```
    $ vi package.json
    "scripts": {
        "devserver": "webpack-dev-server"
    }
    ```

- ### dev-server 실행
    ```
    $ npm run devserver
    ```

- ### dev-server 접속
    - http://localhost:8080/
    ```
    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:8080/
    ````