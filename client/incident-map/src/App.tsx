import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/login/Login'
import Protected from './pages/protected_page/Protected'
import Register from './pages/register/Register'
import Map from './pages/map/Map'
import NotFound from './pages/not_found/NotFound'


function App() {


  return (
    <>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Protected />}>
          <Route path='/' element={<Map />} />
        </Route>
        <Route path='*' element={<NotFound />} />

      </Routes>

    </>
  )
}

export default App
