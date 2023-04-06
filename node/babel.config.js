module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@src": "./src"
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
  ]
};
