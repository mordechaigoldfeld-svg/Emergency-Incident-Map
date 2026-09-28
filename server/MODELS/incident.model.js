
export function createIncidentModel({ title, description, category, status = 'open', location,createdBy }) {

    return {
        title,
        description,
        category,
        status,
        location,
        createdBy,
        createdAt: new Date().toISOString(),
        updatedAt: null,

    }
}



