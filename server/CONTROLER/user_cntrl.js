import { loginUser, registerUser } from "../SERVICE/userService.js";









export async function loginUserCntrl(req, res) {

    const { email, password } = req.body

    try {

        const result = await loginUser(password, email)
        res.status(200).json(result)

    } catch (error) {
        if (error.message) {
            res.status(error.status).json(error.message)
        }
        res.status(500).json(`server error ${error}`)
    }

}


export async function registerUserCntrl(req, res) {

    const { email, password, role, adminPass } = req.body

    try {

        const result = await registerUser(password, email, role, adminPass)
        res.status(201).json(result)

    } catch (error) {
        if (error.message) {
            res.status(error.status).json(error.message)
        }
        res.status(500).json(`server error ${error}`)
    }

}