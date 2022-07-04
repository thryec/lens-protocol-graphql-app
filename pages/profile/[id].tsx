import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfiles, getPublications } from '../../api'
import Image from 'next/image'
import { profile } from 'console'

const Profile = () => {
  const [profile, setProfile] = useState<any>()
  const [pubs, setPubs] = useState([])
  const router = useRouter()
  const { id } = router.query

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfiles, { id: id }).toPromise()
      console.log('profile: ', response.data.profiles.items[0])
      setProfile(response.data.profiles.items[0])

      const publicationData = await client
        .query(getPublications, { id: id })
        .toPromise()

      console.log('pub data: ', publicationData.data.publications.items)
      setPubs(publicationData.data.publications.items)
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
      <div>
        {pubs.map((pub: any, index) => (
          <div key={index} className="p-10 border-t-2">
            {pub.metadata.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
