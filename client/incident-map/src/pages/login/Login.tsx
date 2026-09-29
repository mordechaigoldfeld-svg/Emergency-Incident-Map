import { useState } from "react"
import { useAuthStore } from "../../store/authStore"
import { Link, useNavigate } from "react-router"
import { loginApi } from "../../api/userApi"


export default function Login() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setAuth = useAuthStore(s => s.setAuth)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      setLoading(true)
      setError(null)
      const res = await loginApi({ email, password })

      setAuth({ token: res.token, user: res.email })

      navigate('/')

    } catch (error: any) {
      setError(error.response?.data || `error please check your email or password: ${error}`)
      console.log('login failed', error);


    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && (<div ><p>loading...</p></div>)}
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" placeholder="test@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" id="password" placeholder="enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
      </form>
      <p >
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
