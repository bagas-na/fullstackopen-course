const app = require('./app')
const {PORT, NODE_ENV } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} environment`)
})