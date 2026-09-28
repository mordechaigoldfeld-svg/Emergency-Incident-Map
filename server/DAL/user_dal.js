import { ObjectId } from 'mongodb'
import db from '../DB/mongodb_config.js'
import { createUserModel, returnUserWithoutPass} from '../MODELS/user.model.js'


const users = db.collection('users')


export async function createUser({email,passwordHash,role}) {
    
    const user = {...createUserModel({email,passwordHash,role})}

    const {insertedId} = await users.insertOne(user)

    user._id = insertedId

    return user

}
 

// console.log(await createUser({email:'test3',passwordHash:'1234',}));




export async function findByEmail(email) {

    const lowerEmail = email.toLowerCase()

    const user = await users.findOne({email:lowerEmail})
    
    return user

}





export async function findById(id) {


    const user = await users.findOne({_id:new ObjectId(id)})
    
    return user

}



