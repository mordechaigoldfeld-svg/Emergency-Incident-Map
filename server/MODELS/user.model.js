export function createUserModel({email,passwordHash,role='admin'}){

    return{
        email,
        passwordHash,
        role,
        createdAt:new Date().toISOString()
    }
}