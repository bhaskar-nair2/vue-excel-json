module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./src/index.js'],
  output: {
    library: 'VueAccessX',
    libraryTarget: 'umd',
    filename: 'access.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
