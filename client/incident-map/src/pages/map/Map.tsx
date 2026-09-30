import { useNavigate } from 'react-router'
import { useAuthStore } from '../../store/authStore'
import { MapContainer,TileLayer } from 'react-leaflet'
import './Map.css'

export default function Map() {

  const user: any = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const logoutHandler = () => {

    logout()
    navigate('/login')
   
  }

  const initial: [number, number] = [32.0853, 34.7818]

  return (
    <div className='map-grid'>
      <div className='nav'>
        <div>welcome {user}</div>
        <div>
          <button onClick={() => { logoutHandler() }}>logout </button>
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
        </MapContainer>
      </div>
    </div>
  )
}
