import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../../store/authStore"
import { useState } from "react"
import { registerApi } from "../../api/userApi"



export default function Register() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [adminPass, setAdminPass] = useState('')
  const [data, setData] = useState(null)


  const navigate = useNavigate()

  const handlleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      setLoading(true)
      setError(null)

      const res = await registerApi({ email, password, role, ...(role === 'admin' && { adminPass }) })

      setData(res.message)
      setTimeout(() => {
        navigate('/login')
      }, 2000)


    } catch (error: any) {
      setError(error.response?.data || `error: ${error}`)
      console.log('login failed', error);
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      {loading && (<div ><p>loading...</p></div>)}
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
      {data && (<p>{data}</p>)}
      <form onSubmit={handlleSubmit}>
        <input type="email" value={email} required placeholder="test@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} required placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value)
            if (e.target.value !== 'admin') {
              setAdminPass('')
            }
          }
          }>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        {role === 'admin' && (
          <input
            type="password"
            value={adminPass}
            required
            placeholder="enter admin secret key"
            onChange={(e) => setAdminPass(e.target.value)}
          />
        )}
        <button type="submit" disabled={loading}>Register</button>
      </form>
      <p >
        do you have an account? <Link to="/login">login</Link>
      </p>
    </div>
  )
}
