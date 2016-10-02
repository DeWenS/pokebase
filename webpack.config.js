var path = require('path')

module.exports = {
  entry: './client',
  target: 'web',
  cache: false,
  context: __dirname,
  output: {
    path: path.resolve('./public/js'),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: {
    loaders: [
      {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
      {include: /\.jsx$/, loaders: ['babel'], exclude: /(node_modules)/},
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
  }
}
