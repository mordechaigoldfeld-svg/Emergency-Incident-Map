import { ObjectId } from 'mongodb'
import db from '../DB/mongodb_config.js'
import { createIncidentModel } from '../MODELS/incident.model.js'


const incidents = db.collection('incidents')





export async function getIncidentAll() {

    return await incidents.find().toArray()

}


// console.log(await getIncidentAll());



export async function getIncidentById(id) {

    return await incidents.findOne({ _id: new ObjectId(id) })
}






export async function insertIncident(incident) {

    const result = {...createIncidentModel(incident)}
    const { insertedId } = await incidents.insertOne(result)
    result._id = insertedId
    return result

}






export async function updateIncident(id, updateFields) {

    updateFields.updatedAt = new Date().toISOString()
    const updated = await incidents.updateOne({ _id: new ObjectId(id) }, { $set: updateFields })

    return updated

}


// console.log(await updateIncident('6aba82974af5a9da64f47cb9',{"testi":"24"}));


export async function deleteIncident(id) {

    await incidents.deleteOne({ _id: new ObjectId(id) })

    return {"succes deleted":id}

}



