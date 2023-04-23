import AddRoundedIcon from '@mui/icons-material/AddRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('gistersToken')
        const verifyUser = async () => {
            try {
                const res = await axios.post('/api/verify', {
                    token: token
                })
                setUsername(res.data.username)
                setLoading(false)
            }
            catch (error) {
                router.push('/login')
            }

        }
        verifyUser()
    }, [])

    if (loading) {
        return <p className="text-white text-sm">redirecting...</p>
    }

    return (
        <div className="h-14 less-dark-blue w-full flex items-center px-4 text-white justify-between sticky top-0 shadow-sm">

            <Link href='/' className="text-xl font-semibold">Gistify</Link>

            <div className='flex items-center gap-2'>

                <Link href='/new'>
                    <AddRoundedIcon fontSize='small' />
                </Link>

                <p className='text-sm cursor-pointer'>{username}</p>

                <Link href='/login' onClick={() => localStorage.removeItem('gistersTokens')}>
                    <LogoutRoundedIcon fontSize='small' />
                </Link>
            </div>
        </div>
    )
}
