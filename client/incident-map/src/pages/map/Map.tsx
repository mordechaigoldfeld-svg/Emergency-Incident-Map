import { useNavigate } from 'react-router'
import { useAuthStore } from '../../store/authStore'
import './Map.css'

export default function Map() {

  const user: any = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()
  const logoutHandler = () => {

    logout()
    navigate('/login')
   
  }

  return (
    <div className='map-grid'>
      <div className='nav'>
        <div>welcome {user}</div>
        <div>
          <button onClick={() => { logoutHandler() }}>logout </button>
        </div>
      </div>
      <div className='main'>main</div>
    </div>
  )
}
