export function createUserModel({email,passwordHash,role='user'}){

    return{
        email,
        passwordHash,
        role,
        createdAt:new Date().toISOString()
    }
}



export function returnUserWithoutPass(user) {

    const newUsers = { id: user._id.toString(),email: user.email,createdAt:user.createdAt,role:user.role }
        
    return newUsers
}