import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.js'


export default function(app) {
  const config = Object.assign(webpackConfig, {
    devtool: 'inline-source-map',
    entry:   [
      'webpack-hot-middleware/client',
      './client'
    ],
    module: {
      loaders: [
        {include: /\.json$/, loaders: ['json']},
        {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
        {include: /\.jsx$/, loaders: ['react-hot', 'babel']},
        {include: /\.css$/, loaders: ['style', 'css']}
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    lazy: false,
    quiet: false,
    noInfo: true,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  }));
  app.use(webpackHotMiddleware(compiler));
}
