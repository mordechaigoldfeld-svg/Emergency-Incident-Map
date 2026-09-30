import { Marker, Popup } from "react-leaflet"
import type { createdIncident } from "../../../types/incidentTypes"







interface markerProps {

    incident: createdIncident

}




export default function IncidentMarker({ incident }: markerProps) {

    const position: [number, number] = [incident.location.lat, incident.location.lng]

    return (

        <Marker position={position}>
            <Popup>
                <h1>{incident.title}</h1>
                <h3>{incident.category}</h3>
                <p>{incident.description}</p>
                <p>status: {incident.status}</p>
                <p>created at: {new Date(incident.createdAt).toLocaleString()}</p>
            </Popup>
        </Marker>
    )
}
