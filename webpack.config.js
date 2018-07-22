const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

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
	     { test: /\.g4/, loader: 'antlr4-webpack-loader' },
	     {
	        test: /\.(scss)$/,
	        use: [
	          {
	            // Adds CSS to the DOM by injecting a `<style>` tag
	            loader: 'style-loader'
	          },
	          {
	            // Interprets `@import` and `url()` like `import/require()` and will resolve them
	            loader: 'css-loader'
	          },
	          {
	            // Loader for webpack to process CSS with PostCSS
	            loader: 'postcss-loader',
	            options: {
	              plugins: function () {
	                return [
	                  require('autoprefixer')
	                ];
	              }
	            }
	          },
	          {
	            // Loads a SASS/SCSS file and compiles it to CSS
	            loader: 'sass-loader'
	          }
	        ]
	      }	
	   ]
  },
  node:{
  	net: "empty", fs: "empty"
  },
  entry: './src/index.js',
  output: {
  	path: path.join(__dirname,'dist/'),
  	publicPath:'dist/',
    filename: 'bundle.js',
    //path: path.resolve(__dirname, 'dist')
  },
  plugins: [
	  new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery'",
	      "window.$": "jquery",
	      Popper: ['popper.js', 'default']
	  })
	]
  
};