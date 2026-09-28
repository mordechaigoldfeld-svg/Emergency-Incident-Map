import express from 'express'
import { createIncidentCntrl, getIncidentAllCntrl, getIncidentByIdCntrl, updateIncidentcntrl } from '../CONTROLER/incident_cntrl.js'
import { validCreateIncidentFields, validUpdateIncidentFields } from '../MIDDLEWARE/incident_middle.js'



const router = express.Router()

export default router


router.get('/', getIncidentAllCntrl)

router.get('/:id', getIncidentByIdCntrl)

router.post('/',validCreateIncidentFields,createIncidentCntrl)

router.patch('/:incidentId',validUpdateIncidentFields,updateIncidentcntrl)
