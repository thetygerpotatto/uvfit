const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 👇 Add `.wasm` so Metro can resolve it
config.resolver.assetExts.push('wasm');

module.exports = config;

