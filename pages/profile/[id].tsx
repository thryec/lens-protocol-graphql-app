import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfiles, getPublications } from '../../api'
import Image from 'next/image'
import { ethers } from 'ethers'
import ABI from '../../abi.json'

const address = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

const Profile = () => {
  const [profile, setProfile] = useState<any>()
  const [pubs, setPubs] = useState([])
  const router = useRouter()
  const { id } = router.query

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfiles, { id: id }).toPromise()
      // console.log('profile: ', response.data.profiles.items[0])
      setProfile(response.data.profiles.items[0])

      const publicationData = await client
        .query(getPublications, { id: id })
        .toPromise()

      // console.log('pub data: ', publicationData.data.publications.items)
      setPubs(publicationData.data.publications.items)
    } catch (err) {
      console.log('err', err)
    }
  }

  const followUser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, ABI, signer)

    try {
      const tx = await contract.follow([id], [0x0])
      const txn = await tx.wait()
      console.log('followed user successfully: ', txn)
    } catch (err) {
      console.log('error following user: ', err)
    }
  }

  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    console.log('accounts: ', accounts)
  }

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])

  if (!profile) return null

  return (
    <div>
      <button onClick={connect} className="bg-blue-200">
        Connect Wallet
      </button>
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
      <button onClick={followUser} className="bg-blue-200">
        Follow User
      </button>
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
