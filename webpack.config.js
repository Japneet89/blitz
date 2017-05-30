module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
    { test: /\.(ttf|eot)$/, loader: 'file' }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
    devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  }
};