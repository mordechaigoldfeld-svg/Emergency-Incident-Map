import { getIncidentById, insertIncident, updateIncident } from "../DAL/incident_dal.js";
import { findById } from "../DAL/user_dal.js";
import { createError } from "../UTILS/createError.js";
import { isOwner } from "../UTILS/role_verify.js";





export async function getIncidentByIdService(id) {


    const exists = await getIncidentById(id);
    if (!exists) throw createError(404, 'incident not found');
    return exists

}



export async function createIncidentService(body) {

    const incident = await insertIncident(body)
    return incident

}



export async function updateIncidentService(incidentId, userId, body) {


    const user = await findById(userId)
    if (!user) throw createError(404, 'user not found');

    const exists = await getIncidentById(incidentId)
    if (!exists) throw createError(404, 'incident not found');

    const isValidOwner = isOwner(user, exists)
    if (!isValidOwner) throw createError(403, 'frobiden to update!!');

    await updateIncident(incidentId, body)

    return await getIncidentById(incidentId)


}




