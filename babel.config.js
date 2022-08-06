module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          Component: './src/component',
          Container: './src/container',
          DB: './src/db',
          Hook: './src/hook',
          Store: './src/store',
          Util: './src/util',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['react-native-reanimated/plugin', { relativeSourceLocation: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
};
