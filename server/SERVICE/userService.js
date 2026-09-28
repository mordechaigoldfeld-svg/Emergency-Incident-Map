import { createUser, findByEmail } from "../DAL/user_dal.js";
import { createError } from "../UTILS/createError.js";
import { comparePassHash, createHash } from "../UTILS/password_config.js";
import { isValidAdmin } from "../UTILS/role_verify.js";
import { tokenGenerate } from "../UTILS/token_config.js";




export async function registerUser(password, email, role, adminPass) {

    const exists = await findByEmail(email)
    if (exists) throw createError(400, 'user alrredy exist');
    const validRole = isValidAdmin(role, adminPass)
    if (!validRole) throw createError(403, 'unathorized to be an admin')
    const hashPass = await createHash(password)
    await createUser({ email, passwordHash: hashPass, role })
    return {
        message: "User registered successfully"
    }

}



export async function loginUser(password, email) {

    const exists = await findByEmail(email)
    if (!exists) throw createError(404, 'user not found');
    const auth = await comparePassHash(password, exists.passwordHash)
    if (!auth) throw createError(401, 'invalid validation please check your password');
    const token = tokenGenerate(exists._id)
    return {
        email, token, role: exists.role
    }

}

// console.log(await loginUser('12345','test3'));




export async function getUser(params) {

}

