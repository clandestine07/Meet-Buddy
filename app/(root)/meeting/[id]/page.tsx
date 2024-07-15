'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { usegetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import * as React from 'react'
import { useState } from 'react'

const Meeting = ({ params: {id} }: { params: { id: string } }) => {
  const {user, isLoaded }= useUser()
  const [issetupComplete, setIssetupComplete] = useState(false)
  const {call, isCallLoading} = usegetCallById(id)
  if(isCallLoading || !isLoaded) return <Loader/>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
        {!issetupComplete ? (
              <MeetingSetup setIssetupComplete={setIssetupComplete}/>
            ):(
              <MeetingRoom/>  
            ) }

        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting