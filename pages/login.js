import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import Link from "next/link"

export default function Login() {

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/api/login', {
                username, password
            })
            localStorage.setItem('gistersToken', res.data)
            setLoading(false)
            router.push('/')
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <form
            className="h-screen w-full flex items-center justify-center flex-col gap-[0.5rem]"
            onSubmit={loginUser}
        >
            <input
                className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required

            />
            <button
                className="p-2 px-4 green text-white rounded-full disabled:bg-zinc-500"
                disabled={loading}
            >
                Login
            </button>
            <Link href='/register' className="text-blue-500 text-sm underline">Regsiter?</Link>

            {error && <p className="text-red-600 h-8">{error}</p>}
        </form>
    )
}
