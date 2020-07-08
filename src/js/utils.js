const standardHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public; max-age=14400'
}

export const isDev = process.env.NODE_ENV === 'development'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = isDev ? 0 : 1

export function createJsonResponse(data) {
  return {
      headers: {
          ...standardHeaders,
          'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: JSON.stringify(data)
  }
}

export function createXdrResponse(xdr) {
  return {
      headers: {
          ...standardHeaders,
          'Content-Type': 'text/plain'
      },
      statusCode: 200,
      body: xdr
  }
}

export function parseError(err) {
  const error =
  typeof err === 'string'
  ? { message: err }
  : err.response && err.response.data
  ? err.response.data
  : err.response
  ? err.response
  : err.message
  ? { message: err.message }
  : err

  console.error(err)
  console.error(error)

  return {
    statusCode: error.status || err.status || error.statusCode || err.statusCode || 400,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(error)
  }
}