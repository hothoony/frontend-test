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
                    },
                    debug: true,
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
      }
    ]
  },
  // devtool: "inline-source-map",
  devtool: "source-map",
};
