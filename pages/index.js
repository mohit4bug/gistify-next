import Gist from "@/components/gist"
import Layout from "@/components/layout"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Home() {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [gists, setGists] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('gistersToken')
    const verifyUser = async () => {
      try {
        const res = await axios.post('/api/verify', {
          token: token
        })
        setLoading(false)
        const resNext = await axios.get('/api/gist/fetchall?id=' + res.data.id)
        setGists(resNext.data.gists)
      }
      catch (error) {
        router.push('/login')
      }

    }
    verifyUser()
  }, [])

  if (loading) {
    return <p className="text-white text-sm m-2">redirecting...</p>
  }


  return (
    <Layout>
      <div className="p-2">
        {gists.length < 1 ?
          <p className="text-white text-sm">No gists yet!{' '}
            <Link href='/new' className="text-blue-500 hover:underline">Create one?</Link>
          </p> :
          !loading
          && <div className=" h-screen w-full flex flex-col p-2">

            {
              gists?.map((gist) => (
                <Gist gist={gist} key={gist._id} />

              ))
            }
          </div>}
      </div>
    </Layout>
  )
}
