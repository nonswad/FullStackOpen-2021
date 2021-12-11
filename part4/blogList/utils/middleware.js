const { response } = require("express")

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if(decodedToken.id) {
            request.user = await User.findById(decodedToken.id)
        } else{
            response.status(401).json({ error: 'token missing or invalid' }) 
        }
    }  
    next()
}

const errorHandler = (error, request, response, next) => {
if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
} else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
} else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
       error: 'invalid token'
    })
} else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
       error: 'token expired'
    })
} 

next(error)
}

module.exports = {
unknownEndpoint,
tokenExtractor,
errorHandler
}