const pageGenerator = require('./plop/page/prompt')
// const componentGenerator = require('./plop/component/prompt')

module.exports = function (plop) {
  plop.setGenerator('page', pageGenerator)
  // plop.setGenerator('component', componentGenerator)
}
