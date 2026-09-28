import { createIncidentSchema,updateIncidentSchema } from "../VALIDATIONS/incidentSchema.js";





export async function validCreateIncidentFields(req, res, next) {

    const { title, description, category, location, status } = req.body


    const isValid = createIncidentSchema.safeParse({ title, description, category, location, status })
    if (isValid.success === false) {
        res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()


}

export async function validUpdateIncidentFields(req, res, next) {

    const { title, description, category, location, status } = req.body


    const isValid = updateIncidentSchema.safeParse({ title, description, category, location, status })
    if (isValid.success === false) {
        res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()


}