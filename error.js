class AuthorizationError extends Error {
    statusCode = 401
}

class NotFoundError extends Error {
    statusCode = 404
}

class InvalidInputError extends Error {
    statusCode = 400
}

class IntegrityError extends Error {
    statusCode = 409
}

module.exports = {
    AuthorizationError,
    NotFoundError,
    InvalidInputError,
    IntegrityError
}
