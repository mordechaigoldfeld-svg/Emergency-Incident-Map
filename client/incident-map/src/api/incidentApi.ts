import { instance } from "../utils/axios_config.ts";
import type { createIncidentType, updateIncidentType } from "../types/incidentTypes.ts";





export async function createIncidentApi(body: createIncidentType) {

    const create = await instance.post('/incidents', {

        title: body.title,
        description: body.description,
        category: body.category,
        location: body.location
    }
    )

    return create.data

}


export async function updateIncidentApi(body: updateIncidentType, incidentId: string) {

    const update = await instance.patch(`/incidents/${incidentId}`, body)
    return update.data

}

// console.log(await updateIncidentApi({category:'fire'},'6abba1753e345aa02c3ae260'));

export async function deleteIncidentApi(id: string) {

    const deleted = await instance.delete(`/incidents/${id}`)
    return deleted.data

}

export async function getIncidentIdApi(id: string) {

    const incident = await instance.get(`/incidents/${id}`)
    return incident.data

}

export async function getAllOrByCategoryApi(params: object) {

    const incidents = await instance.get('/incidents', {
        params
    })
    return incidents.data

}


// console.log(await getAllOrByCategoryApi({category:'medical'}));
// console.log(await getAllOrByCategoryApi());

















// export async function createIncidentApi(body: createIncidentType, token: string) {

//     const create = await instance.post('/incidents', {

//         title: body.title,
//         description: body.description,
//         category: body.category,
//         location: body.location
//     },
//         {
//             headers: {
//                 authorization: `Bearer${token}`
//             }
//         }
//     )

//     return create.data

// }


// console.log(await createIncidentApi({ "title": "pcr", "description": "חוסר הכרה", "category": "medical", "location": { "lat": 90, "lng": 180 }, "status": "open" }));
