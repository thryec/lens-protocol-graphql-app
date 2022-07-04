import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { client, recommendProfiles } from '../api'

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState([])

  const fetchProfiles = async () => {
    try {
      const response = await client.query(recommendProfiles).toPromise()
      console.log({ response })
      setProfiles(response.data.recommendProfiles)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return <div className="flex justify-center">hello world</div>
}

export default Home
