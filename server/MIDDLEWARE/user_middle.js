import { createUserSchema, loginUserSchema } from "../VALIDATIONS/userSchema.js";






export function validCreateFields(req, res, next) {


    const { email, password, role, adminPass } = req.body
    const isValid = createUserSchema.safeParse({ email, password, role, adminPass })
    if (isValid.success === false) {
        return res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()

}
export function validLoginFields(req, res, next) {


    const { email, password } = req.body
    const isValid = loginUserSchema.safeParse({ email, password })
    if (isValid.success === false) {
        return res.status(400).json(isValid.error.issues[0]?.message)
    }
    next()

}