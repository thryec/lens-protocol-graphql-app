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
      console.log('res: ', response.data.profiles.items[0])
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

  if (!profile) return null

  return (
    <div>
      {profile.picture ? (
        <Image
          src={profile.picture.original.url}
          width="200px"
          height="200px"
          alt={profile.name}
        />
      ) : (
        <div className="w-200 h-200"></div>
      )}
      <div className="space-y-4">
        <h4>{profile.handle}</h4>
        <p>{profile.bio}</p>
        <p>Followers: {profile.stats.totalFollowers}</p>
        <p>Following: {profile.stats.totalFollowing}</p>
      </div>
    </div>
  )
}

export default Profile
