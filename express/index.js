const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const alimentoRouter = require('./routes/alimentoRouter')
const nutrienteRouter = require('./routes/nutrienteRouter')
const categoriaRouter = require('./routes/categoriaRouter')
const unidadRouter = require('./routes/unidadRouter')
const authRouter = require('./routes/authRouter')
const {
  logErrors,
  errorHandler,
  clientErrorHandler,
  wrapErrors
} = require('./utils/middlewares/errorsHandlers')

const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.json())

// Rutas
alimentoRouter(app)
nutrienteRouter(app)
categoriaRouter(app)
unidadRouter(app)
app.use('/auth', authRouter)
app.get('/', function (req, res, next) {
  res.send({ hello: 'world' })
})

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

module.exports = app
