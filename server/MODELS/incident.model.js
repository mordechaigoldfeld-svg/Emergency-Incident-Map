
export function createIncidentModel({ title, description, category, status = 'open', location, }) {

    return {
        title,
        description,
        category,
        status,
        location,
        createdAt: new Date().toISOString(),
        updatedAt: null,

    }
}



