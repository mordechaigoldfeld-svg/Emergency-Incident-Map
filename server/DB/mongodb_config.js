import { MongoClient } from "mongodb";
import 'dotenv/config'



const MONGODB_URI = process.env.MONGODB_URI


const client = new MongoClient(MONGODB_URI)

try {

    await client.connect()
    console.log('mongodb succesfully connected...');

} catch (error) {
    console.log("error", error);
    process.exit(1)

}

const db = client.db('emergency-incident')

export default db