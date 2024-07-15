'use client'
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { usegetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import * as React from 'react'
function DisplayInfo({title, description} : {title: string; description: string}) {
  return (
    <div className='flex flex-col items-start gap-2 xl:flex-row'>
      <h1 className='font-medium text-white lg:text-xl xl:min-w-32'>{title}</h1>
      <h1 className='truncate font-bold text-md max-sm:max-w-[330px] lg:text-xl'>{description}</h1>
    </div>
  );
}
function PersonalRoom() {
  const {user} = useUser()
  const meetingId = user?.id ?? '';
const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const {call} = usegetCallById(meetingId!)
  const client = useStreamVideoClient()
  const router = useRouter()
  const startNewMeeting = async() => {
    if(!client || !user) return
    const newCall = client.call('default', meetingId!)
    if(!call){
        await newCall.getOrCreate({
          data: {
              starts_at: new Date().toISOString(),
          }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }
    return (
      <section className='
          flex
          size-full
          flex-col
          text-white
          gap-10
      '>
        <h1 className='text-3xl font-bold'>
          Personal Room
        </h1>
        <div className='flex flex-col gap-10 text-white size-full'>
          <DisplayInfo
            title='Topic:' description={`${user?.username}'s personal room`}
          />
          <DisplayInfo
            title='Meeting ID' description={meetingId}
          />
          <DisplayInfo
            title='Invite Link' description={meetingLink}
          />
        </div>
        <div className='flex gap-8'>
          <Button
          className='bg-blue-600'onClick={startNewMeeting}
          >
            Start Room
          </Button>
          <Button className='bg-dark-1' onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({
              title: 'Link copied'
            })
          }}>
            copy invitation link
          </Button>
        </div>
    </section>
  )
}

export default PersonalRoom