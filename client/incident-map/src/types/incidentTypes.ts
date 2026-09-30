





export type createIncidentType = {

    title: string,
    description: string,
    category: string,
    location: {
        lat: number;
        lng: number;
    },
    status: string


}

export type updateIncidentType = {
    title?: string,
    description?: string,
    category?: string,
    location?: {
        lat: number;
        lng: number;
    },
    status?: string
}

export type createdIncident = {

    title: string;
    description: string;
    category: string;
    location: {
        lat: number;
        lng: number;
    };
    status: string;
    _id: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string | null

}