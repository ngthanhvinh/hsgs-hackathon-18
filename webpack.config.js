const path = require("path");

[].some;

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  const cssRule = defaultConfig.module.rules
    .find(
      v =>
        v.use instanceof Array &&
        v.use.some(
          item =>
            typeof item === "string" &&
            item.endsWith(path.join("node_modules", "style-loader", "index.js"))
        )
    )
    .use.find(
      v =>
        typeof v.loader === "string" &&
        v.loader.endsWith(path.join("node_modules", "css-loader", "index.js"))
    );
  // cssRule.options.modules = true;
  // console.log("Patched CSS Loader to use import modules");
  defaultConfig.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: "style-loader" // creates style nodes from JS strings
      },
      {
        loader: "css-loader" // translates CSS into CommonJS
      },
      {
        loader: "less-loader" // compiles Less to CSS
      }
    ]
  });
  console.log("Injected LESS Loader");

  return defaultConfig;
};
