const allowedorigins = require('./allowedOrigin')

const corsOptions = {
    origin: (origin,callback) => {
        if(allowedorigins.indexOf(origin) !== -1 || !origin)
        {
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'),false)
        }},
        credientials: true,
        optionsSuccessStatus: 200
    }

    module.exports = corsOptions