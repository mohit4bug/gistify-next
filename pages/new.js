import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import langs from '../assets/langs'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Create() {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [gistData, setGistData] = useState({
        desc: '',
        filename: '',
        lang: 'Javascript',
        code: '',
    })
    const [userId, setUserId] = useState('')

    const handleChange = e => {
        setGistData({
            ...gistData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('gistersToken')
        const verifyUser = async () => {
            try {
                const res = await axios.post('/api/verify', {
                    token: token
                })
                setLoading(false)
                setUserId(res.data)
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


    const createGist = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/gist/create', { ...gistData, userId: userId.id })
            router.push('/')
        } catch (error) {
            setError(error.response.data)
        }
    }


    return (
        <Layout>
            <form
                className="h-[calc(100vh-3.5rem)] flex flex-col gap-2 p-2 overflow-auto scrollbar-hide"
                onSubmit={createGist}
            >

                <input
                    className="h-8 border border-zinc-700 more-dark-blue text-white text-sm p-2 outline-none rounded-md"
                    placeholder="Gist description"
                    onChange={handleChange}
                    name="desc"
                    autoComplete="off"
                    required
                />

                <input
                    className="h-8 w-full border border-zinc-700 less-dark-blue text-white text-sm p-2 outline-none rounded-md"
                    placeholder="Filename including extension"
                    onChange={handleChange}
                    name="filename"
                    autoComplete="off"
                    required
                />


                <select
                    className="h-10 w-full  border border-zinc-700 less-dark-blue text-white text-sm outline-none rounded-md"
                    placeholder="Language"
                    name="lang"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                >
                    {
                        langs.map((lang) => {
                            return <option key={lang} value={lang}>{lang}</option>
                        })
                    }
                </select>

                <textarea
                    className="less-dark-blue border border-zinc-700 rounded-md outline-none text-white p-2 scrollbar-hide text-sm h-full resize-none"
                    placeholder='Paste your code here.'
                    onChange={handleChange}
                    name="code"
                />

                <button
                    className="w-fit p-[0.4rem] px-4 text-[0.8rem] text-white rounded-md bg-blue-500 disabled:bg-zinc-500">
                    Create gist
                </button>

            </form>
        </Layout>
    )
}
