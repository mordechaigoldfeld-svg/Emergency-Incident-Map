import { createIncidentSchema, queryCategory, updateIncidentSchema } from "../VALIDATIONS/incidentSchema.js";





export async function validCreateIncidentFields(req, res, next) {

    const { title, description, category, location, status } = req.body


    const isValid = createIncidentSchema.safeParse({ title, description, category, location, status })
    if (isValid.success === false) {
        return res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()


}

export async function validUpdateIncidentFields(req, res, next) {

    const { title, description, category, location, status } = req.body


    const isValid = updateIncidentSchema.safeParse({ title, description, category, location, status })
    if (isValid.success === false) {
        return res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()


}


export async function validQuerytFields(req, res, next) {

    const category  = req.query


    const isValid = queryCategory.safeParse(category)
    if (isValid.success === false) {
        return res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()


}