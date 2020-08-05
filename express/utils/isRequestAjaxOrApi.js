function isRequestAjaxOrApi (req) {
  // Si el request no acepta html (es un api que espera un json) o request es xhr
  return !req.accepts('html') || req.xhr
}

module.exports = isRequestAjaxOrApi
