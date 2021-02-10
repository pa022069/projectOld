var webpack = require('webpack');
var path = require('path')

module.exports = {
    entry: {
        App: './src/js/App.js'
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
        ]
      },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
};