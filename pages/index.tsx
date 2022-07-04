import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { client, recommendProfiles } from '../api'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState([])

  const fetchProfiles = async () => {
    try {
      const response = await client.query(recommendProfiles).toPromise()
      console.log('response:', response.data)
      setProfiles(response.data.recommendedProfiles)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <div className="">
      {profiles &&
        profiles.map((profile: any, index) => (
          <Link href={`/profile/${profile.id}`} key={index} passHref>
            <div className="my-4">
              {profile.picture ? (
                <Image
                  src={profile.picture.original.url}
                  width="60px"
                  height="60px"
                  alt={profile.name}
                />
              ) : (
                <div className="w-60 h-60 bg-black"></div>
              )}
              <h4 className="font-semibold">{profile.handle}</h4>
              <p>{profile.bio}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Home
