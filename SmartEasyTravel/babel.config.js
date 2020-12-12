module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['module-resolver', {
      "alias": {
        "shared": "./src/shared",
        "pages": "./src/pages",
        "core": "./src/core",
        "assets":"./src/assets"
      }
    }]
  ]
};
