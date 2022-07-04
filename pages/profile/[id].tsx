import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfiles } from '../../api'
import Image from 'next/image'
import { profile } from 'console'

const Profile = () => {
  const [profile, setProfile] = useState<any>()
  const router = useRouter()
  const { id } = router.query

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfiles, { id: id }).toPromise()
      console.log('res: ', response)
      setProfile(response.data.profiles.items[0])
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])

  return (
    <div>
      {profile.picture ? (
        <Image
          src={profile.picture.original.url}
          width="60px"
          height="60px"
          alt={profile.name}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Profile
