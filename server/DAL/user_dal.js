import db from '../DB/mongodb_config.js'
import { createUserModel } from '../MODELS/user.model.js'


const users = db.collection('users')


export async function createUser({email,passwordHash,role}) {
    
    const user = {...createUserModel({email,passwordHash,role})}

    const {insertedId} = await users.insertOne(user)

    user._id = insertedId

    return user

}
 

// console.log(await createUser({email:'test',passwordHash:'1234',}));
