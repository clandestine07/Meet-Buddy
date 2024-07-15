'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import * as  React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const EndCallButton = () => {
    const call = useCall()
    const router = useRouter()
    const { useParticipants, useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    
    const isMeetingOwner = React.useMemo(() => {
        return localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id
    }, [localParticipant, call?.state.createdBy])


    if(!isMeetingOwner) return null;
  return (
    <div>
        <Button onClick={async () => {
            await call?.endCall()
            router.push('/')
        }} className='bg-red-700'>
            End Call
        </Button>
    </div>
  )
}

export default EndCallButton