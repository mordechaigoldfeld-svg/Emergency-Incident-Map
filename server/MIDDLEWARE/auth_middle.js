import { createError } from "../UTILS/createError.js";
import { tokenValidation } from "../UTILS/token_config.js";




function getToken(authorization) {

    if (!authorization) throw createError(401, 'miss required headers');
    const token = authorization.split('Bearer')[1];
    if (!token) throw createError(401, 'token error');
    return token

}



export async function tokenValidator(req, res, next) {

    const { authorization } = req.headers

    try {

        const token = getToken(authorization)
        const payload = tokenValidation(token)  
        req.user = payload
        next()

    } catch (error) {
        if (error.message) {
            res.status(error.status || 500).json(error.message)
        }
        res.status(500).json(`server error ${error}`)
    }

}