module.exports = {
  "entry": {
      "app": "./src/limiter.js"
    }
  , "output": {
      "path": __dirname+"/dist/",
      "filename": "limiter.js",
      "library": "limiter",
      "libraryTarget": "umd",
      "umdNamedDefine": true
    }
  , "module": {
    "loaders": [
      {
          "test": /.js$/
          , "loader": "babel-loader"
          , "exclude": /node_modules/
          , "query": {
            "presets": ["es2015"]
          }
        }
    ]
  }
};
