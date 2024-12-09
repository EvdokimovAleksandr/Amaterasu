const path = require('path')

module.exports = {
  // Настройки алиасов
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      Utils: path.resolve(__dirname, 'src/Utils/'),
      Pages: path.resolve(__dirname, 'src/Pages/'),
      UI: path.resolve(__dirname, 'src/UI/'),
      Icons: path.resolve(__dirname, 'src/Icons/'),
      Redux: path.resolve(__dirname, 'src/Redux/'),
    },
  },
}
