/**
 * Central error handler — always returns a friendly, non-technical message
 * to the client while logging the real error server-side.
 */
function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  const status = err.status || 500;
  const friendlyMessages = {
    400: 'Something about that request looks incomplete. Please check your input and try again.',
    401: 'Please log in to continue.',
    413: 'That file is too large. Please upload something smaller.',
    415: 'That file type isn\u2019t supported yet.',
    500: 'Something went wrong while processing your translation. Please try again.',
  };
  res.status(status).json({ error: friendlyMessages[status] || friendlyMessages[500] });
}

module.exports = errorHandler;
