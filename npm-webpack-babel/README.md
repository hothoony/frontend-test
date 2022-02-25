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
    $ npm install webpack-cli -D

    or

    $ npm install webpack webpack-cli --save-dev
    ```

- ### webpack 설치 확인
    ```shell
    $ ls
    node_modules    package-lock.json    package.json

    $ npm list
    example01@1.0.0 ~/example01
    ├── webpack-cli@4.9.2
    └── webpack@5.69.1

    $ vi package.json
    {
        "name": "example01",
        ...
        "devDependencies": {
            "webpack": "^5.69.1",
            "webpack-cli": "^4.9.2"
        }
    }
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
    $ mkdir src

    $ vi src/index.js
    console.log('index.js run ok');
    ```

- ### scripts build 추가
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

- ### babel 설치
    ```bash
    $ npm install babel-loader --save-dev
    $ npm install babel-preset-env --save-dev
    ```

- ### scripts build 추가
    ```javascript
    $ vi package.json
    "scripts": {
        "build": "babel src/js -w -d dist/js"
    }
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

## webpack-dev-server
- ### webpack-dev-server 설치
    ```bash
    $ sudo npm install webpack-dev-server --save-dev
    ```

- ### scripts devserver 추가
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
