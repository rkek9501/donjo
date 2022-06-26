module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin', { relativeSourceLocation: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'babel-plugin-transform-typescript-metadata',
  ],
};
