import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { client, recommendProfiles } from '../api'

const Home: NextPage = () => {
  const fetchProfiles = async () => {
    const response = await client.query(recommendProfiles).toPromise()
    console.log('response: ', response)
  }

  useEffect(() => {
    try {
      fetchProfiles()
    } catch (err) {
      console.log('error ', err)
    }
  }, [])

  return <div className="flex justify-center">hello world</div>
}

export default Home
