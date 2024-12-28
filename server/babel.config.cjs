// Ayuda a hacer los testeos con module.js (jest pide common.js)
module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  };
  