import { hash, compare } from 'bcrypt'





export async function createHash(password) {
    return hash(password, 10)
}





export async function comparePassHash(password,hashPassword){
    return compare(password,hashPassword)
}


