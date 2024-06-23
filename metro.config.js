const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

// Retrieve the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Define a custom configuration to handle .ttf font files
const customConfig = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'ttf', 'svg'],
    extraNodeModules: {
      'react-native-vector-icons': path.resolve(
        __dirname,
        'node_modules/react-native-vector-icons',
      ),
    },
  },
};

// Merge the custom configuration with the default configuration
const config = mergeConfig(defaultConfig, customConfig);

module.exports = config;
