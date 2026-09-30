import { useNavigate } from 'react-router'
import { useAuthStore } from '../../store/authStore'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import './Map.css'
import IncidentForm from '../../components/incidentForm/IncidentForm'
import { useEffect, useState } from 'react'
import { deleteIncidentApi, getAllOrByCategoryApi } from '../../api/incidentApi'
import { type createdIncident } from '../../types/incidentTypes'
import IncidentMarker from '../../components/incidentForm/incidentMarker/IncidentMarker'
import { socket } from '../../socket.ts'


function MapClickHandler({ onSelectLocation }: { onSelectLocation: (coords: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onSelectLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}




export default function Map() {

  const user: any = useAuthStore(s => s.user?.email)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [createdIncidents, setCreatedIncidents] = useState<createdIncident[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [editingIncident, setEditingIncident] = useState<createdIncident | null>(null)

  const logoutHandler = () => {

    logout()
    navigate('/login')

  }

  const deleteHandle = async (incidentId: string) => {

    try {

      const res = await deleteIncidentApi(incidentId)
      loadData()

    } catch (error: any) {
      setError(error.response?.data || `error please check your email or password: ${error}`)
      console.log('login failed', error);
    }

  }



  const editHandle = (incident: createdIncident) => {

    setEditingIncident(incident);
    setSelectedCoords(null)

  }

  const loadData = async () => {

    try {
      setLoading(true)
      setError(null)

      const incidents = await getAllOrByCategoryApi({})
      setCreatedIncidents(incidents)

    } catch (error: any) {
      setError(error.response?.data || `error please check your email or password: ${error}`)
      console.log('login failed', error);

    } finally {
      setLoading(false)
    }

  }

  
  
  useEffect(() => {
    
    loadData()
    socket.on('incident:created', () => loadData())
    socket.on('incident:updated', () => loadData())
    socket.on('incident:deleted', () => loadData())
  }, [])



  const initial: [number, number] = [32.0853, 34.7818]

  const displayedIncidents = filter === 'all' ? createdIncidents : createdIncidents.filter((i) => i.category === filter)

  return (
    <div className='map-grid'>
      <div className='nav'>
        <div>welcome {user}</div>
        <div>
          <button onClick={() => { logoutHandler() }}>logout </button>
        </div>
        <div>
          <label>קטגוריה:</label>
          <select value={filter} onChange={(e: any) => setFilter(e.target.value)}>
            <option value="all">הכל</option>
            <option value="accident">תאונה</option>
            <option value="fire">שריפה</option>
            <option value="flood">הצפה</option>
            <option value="medical">אירוע רפואי</option>
            <option value="other">אחר</option>
          </select>
        </div>
      </div>
      <div className='main'>
        <MapContainer
          center={initial}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onSelectLocation={(coords) => setSelectedCoords(coords)} />
          {selectedCoords && (
            <Marker position={[selectedCoords.lat, selectedCoords.lng]} />
          )}
          {displayedIncidents.map((i) => (

            <IncidentMarker key={i._id} incident={i} onEdit={editHandle} onDelete={deleteHandle} />
          ))}
        </MapContainer>
        {(selectedCoords || editingIncident) && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '320px',
            maxHeight: '90%',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '16px',
            zIndex: 1000,
            overflowY: 'auto'
          }}>
            <IncidentForm
              location={selectedCoords}
              initialData={editingIncident}
              onClose={() => {
                setSelectedCoords(null)
                setEditingIncident(null)
              }}
              onSuccess={() => {
                setSelectedCoords(null)
                setEditingIncident(null)
                loadData()

              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
