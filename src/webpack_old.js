module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
          // query: {
          //   cacheDirectory: true,
          //   presets: ['react', 'es2015']
          // }
        }
      ]
    }
  };