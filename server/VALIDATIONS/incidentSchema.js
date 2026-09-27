import {z} from 'zod'



export const createIncidentSchema =z.object({
    title:z.string('invalid title'),
    description:z.string().min(5,'enter a description'),
    category:z.enum(['fire','flood','accident','medical','other']),
    status:z.enum(['open','in_progress','closed']).default('open'),
    location:z.object({lat:z.number.min(-90).max(90),lng:z.number.min(-180).max(180)}),
    
})