const Sentry = require('@sentry/node')
const boom = require('@hapi/boom')
const { config } = require('../../../config')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')

Sentry.init({ dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}` });

// Es un error middleware por los 4 parámetros
function withErrorStack (err, stack) {
  if (config.dev) {
    return { ...err, stack }
  }
}

function logErrors (err, req, res, next) {
  if (config.dev === 'production') {
    Sentry.captureException(err)
  }
  console.error(err.stack)
  next(err) // Llama al siguiente middleware
}

function wrapErrors (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next()
}

function clientErrorHandler (err, req, res, next) {
  // Si la llamada fue con un header especial xhtml http request
  const {
    output: { statusCode, payload }
  } = err

  // catch errors for AJAX request or if an error corrs while streaming
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode)
  // Aquí puede hacerse un render del error
  // Busca una página en views llamada error para mandar los datos
  // res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
  withErrorStack,
  wrapErrors
}
