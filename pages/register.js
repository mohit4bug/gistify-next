import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import Link from "next/link"

export default function Register() {

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/register', {
                name, username, password
            })
            router.push('/login')
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <form
            className="h-screen w-full flex items-center justify-center flex-col gap-[0.5rem]"
            onSubmit={registerUser}
        >
            <input
                className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                required

            />
            <input
                className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                placeholder="Choose username"
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                placeholder="Choose password"
                onChange={(e) => setPassword(e.target.value)}
                required

            />
            <button
                className="p-2 px-4 green text-white rounded-full"
            >
                Register
            </button>
            <Link href='/login' className="text-blue-500 text-sm underline">Login?</Link>
            {error && <p className="text-red-600 h-8">{error}</p>}
        </form>
    )
}
