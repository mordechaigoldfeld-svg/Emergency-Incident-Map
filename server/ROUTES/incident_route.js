import express from 'express'
import { createIncidentCntrl, deleteIncidentCntrl, getIncidentAllCntrl, getIncidentByIdCntrl, updateIncidentcntrl } from '../CONTROLER/incident_cntrl.js'
import { validCreateIncidentFields, validUpdateIncidentFields,validQuerytFields } from '../MIDDLEWARE/incident_middle.js'



const router = express.Router()

export default router


router.get('/',validQuerytFields, getIncidentAllCntrl)

router.get('/:id', getIncidentByIdCntrl)

router.post('/',validCreateIncidentFields,createIncidentCntrl)

router.patch('/:incidentId',validUpdateIncidentFields,updateIncidentcntrl)


router.delete('/:incidentId',deleteIncidentCntrl)
