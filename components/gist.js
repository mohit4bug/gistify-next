import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import moment from 'moment'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Gist({ gist }) {

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
        <div className="h-auto p-2 flex flex-col gap-2">

            <div className="flex flex-col gap-2">

                <div className='flex text-sm items-center gap-[0.2rem]'>


                    <p className='text-blue-400'>{username}</p>

                    <p className='text-white'>/</p>

                    <p className='text-blue-400 font-semibold cursor-pointer hover:underline'>{gist.filename}</p>
                </div>

                <p className='text-[0.8rem] text-zinc-400 first-letter:uppercase'>{moment(gist.createdAt).fromNow()}</p>

                <p className='text-[0.8rem] text-zinc-400'>{gist?.desc}</p>
            </div>

            <div className='border border-zinc-700 rounded-md text-sm text-white'>

                <SyntaxHighlighter language={gist?.lang.toLowerCase()} style={coldarkDark} customStyle={{ backgroundColor: 'transparent' }}>
                    {gist?.code}
                </SyntaxHighlighter>

            </div>
        </div>
    )
}
