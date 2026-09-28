import { getIncidentAll } from "../DAL/incident_dal.js";
import { createIncidentService, getIncidentByIdService } from "../SERVICE/incidentService.js";







export async function getIncidentAllCntrl(req, res) {

    try {

        const incidents = await getIncidentAll()

        res.status(200).json(incidents)

    } catch (error) {
        if (error.message) {
            res.status(error.status).json(error.message)
        }
        res.status(500).json({ "error": error })

    }

}


export async function getIncidentByIdCntrl(req, res) {

    const { id } = req.params



    try {

        const incident = await getIncidentByIdService(id)
        res.status(200).json(incident)

    } catch (error) {
        if (error.message) {
            res.status(error.status).json(error.message)
        }
        res.status(500).json({ "error": error })
    }

}

export async function createIncidentCntrl(req, res) {

    const { title, description, category, location, status } = req.body
    const {userId} = req.user

    try {

        const incident = await createIncidentService({ title, description, category, location, status,createdBy:userId })
            res.status(200).json(incident)

    } catch (error) {
        if (error.message) {
            res.status(error.status).json(error.message)
        }
        res.status(500).json({ "error": error })
    }

}

