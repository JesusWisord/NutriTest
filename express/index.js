const express = require('express')
const bodyParser = require('body-parser')
const foodRouter = require('./routes/foodRouter')
const authRouter = require('./routes/authRouter')
const {
  logErrors,
  errorHandler,
  clientErrorHandler,
  wrapErrors
} = require('./utils/middlewares/errorsHandlers')

const app = express()

// middlewares
app.use(bodyParser.json())

// Rutas
foodRouter(app)
app.use('/auth', authRouter)
app.get('/', function (req, res, next) {
  res.send({ hello: 'world' })
})

// Cuando se intentan todas las rutas se busca el 404. Si es api se lanza error de boom
// app.use(function (req, res, next) {
//   if (isRequestAjaxOrApi(req)) {
//     const {
//       output: { statusCode, payload }
//     } = boom.notFound()

//     res.status(statusCode).json(payload)
//   }

//   res.status(404).render("404")
// })

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// Server
const server = app.listen(8001, function () {
  console.log(`Listening http://localhost:${server.address().port}`)
})
