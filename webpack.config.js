const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
		uglifyOptions: {
			output: {
				ascii_only: true
			}
		}
	  })
    ]
  }, 
  module: {
	   rules: [
	     { test: /\.g4/, loader: 'antlr4-webpack-loader' }
	   ]
  },
  node:{
  	net: "empty", fs: "empty"
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
  
};