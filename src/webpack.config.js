const extractPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: "babel-loader"
    //     },
    //     // query: {
    //     //   cacheDirectory: true,
    //     //   presets: ['react', 'es2015']
    //     // }
    //   }
    // ]

    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loaders: ["file-loader"]
      },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
            },
          },
    ]
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader"
  //       },
  //     },
  //     {
  //       enforce: 'pre',
  //       test: /\.js?$/,
  //       exclude: [/node_modules/, /vendors/], // Don't lint MDB
  //       loader: 'eslint-loader',
  //       options: {
  //         fix: true,
  //       },
  //     },
  //     {
  //       test: /\.js?$/,
  //       exclude: [/node_modules/, /vendors/],
  //       use: [
  //         {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: ['@babel/preset-env', '@babel/preset-react'],
  //           },
  //         },
  //        ],
  //     },
  //     {
  //       test: /\.scss?$/,
  //       use: extractPlugin.extract({
  //         use: ['css-loader', 'sass-loader'],
  //       }),
  //     },
  //     {
  //       test: /\.html$/,
  //       use: ['html-loader'],
  //     },
  //     // Font-awesome 5.6.X
  //     {
  //       test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
  //       exclude: [/vendors/, /img/],
  //       loader: 'file-loader?name=fonts/[name].[ext]',
  //     },
  //     // MDB Roboto font
  //     {
  //       test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
  //       exclude: [/node_modules/, /img/],
  //       loader: 'file-loader?name=font/roboto/[name].[ext]',
  //     },
  //     {
  //       test: /\.(png|jpg|gif|svg)$/,
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[ext]',
  //         useRelativePath: true,
  //       },
  //     },
  //  ],
  }
};