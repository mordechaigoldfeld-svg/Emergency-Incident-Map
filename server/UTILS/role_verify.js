import 'dotenv/config'


const ADMIN_PASS = process.env.ADMIN_PASS

export function isValidAdmin(role, adminPass) {

    if (role === 'admin') {
        return adminPass === ADMIN_PASS
    }
    else return true

}



