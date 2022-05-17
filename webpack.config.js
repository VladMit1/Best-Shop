const path = require("path");
const entryPath = "src";

module.exports = {
   entry: `./${entryPath}/js/app.js`,
   output: {
      filename: "out.js",
      path: path.resolve(__dirname, `${entryPath}/build`)
   },
   devServer: {
      contentBase: path.join(__dirname, `${entryPath}`),
      publicPath: "/build/",
      compress: true,
      port: 3001
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.(jpe?g|gif|png|svg)$/,
            loader: "file-loader",
            options: {
               name: "[name].[ext]",
               publicPath: "/assets/",
               outputPath: "/images/"
            }
         }

      ]
   }
};