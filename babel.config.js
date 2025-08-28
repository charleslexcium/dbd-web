module.exports = function(api) {
  var env = api.cache(() => process.env.NODE_ENV);

  return {
    plugins: [
      'macros',
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-runtime'
    ]
  }
}