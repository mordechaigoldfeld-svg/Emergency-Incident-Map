import { Marker, Popup } from "react-leaflet"
import type { createdIncident } from "../../../types/incidentTypes"
import { useAuthStore } from "../../../store/authStore";







interface markerProps {

    incident: createdIncident;
    onEdit: (incident: createdIncident) => void;
    onDelete: (incidentId: string) => void

}




export default function IncidentMarker({ incident, onEdit, onDelete }: markerProps) {

    const position: [number, number] = [incident.location.lat, incident.location.lng]
    const user: any = useAuthStore(s => s.user)

    const canModify = user.role === 'admin' || user.userId === incident.createdBy


    return (

        <Marker position={position}>
            <Popup>
                <h1>{incident.title}</h1>
                <h3>{incident.category}</h3>
                <p>{incident.description}</p>
                <p>status: {incident.status}</p>
                <p>created at: {new Date(incident.createdAt).toLocaleString()}</p>
                <p>updated at:{incident.updatedAt ? new Date(incident.updatedAt).toLocaleString() : 'not updated'}</p>
                {canModify &&

                    <div>
                        <button onClick={() => onEdit(incident)}>update</button>
                        <button onClick={() => {if (window.confirm('do you want to delete?')) {onDelete(incident._id)}}}> delete</button>
                    </div>
                }
            </Popup>
        </Marker>
    )
}
