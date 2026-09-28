import { getIncidentById, insertIncident } from "../DAL/incident_dal.js";
import { createError } from "../UTILS/createError.js";





export async function getIncidentByIdService(id) {


    const exists = await getIncidentById(id);
    if (!exists) throw createError(404, 'incident not found');
    return exists

}



export async function createIncidentService(body) {

    const incident = await insertIncident(body)
    return incident

}