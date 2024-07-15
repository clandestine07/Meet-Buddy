'use client'
import Image from 'next/image'
import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Input } from './ui/input'

function MeetingType() {
    const {toast} =  useToast()
    const router = useRouter()
    const [meetingState, setMeetingState] = 
    useState<'isScheduling' | 'isJoining' | 'isInstant' | undefined>()
    const user = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '' 
    })
    const [callDetails, setCallDetails] = useState<Call>() 
    const createMeeting = async () => {
        if(!user || !client) return
        try {
            if(!values.dateTime){
                toast({
                    title: "Please select a date and time",
                  })
                return
            }
            const id = crypto.randomUUID() //generate random id
            const call = client.call('default', id)
            if(!call) throw new Error('Failed to start a new call')
            
            const startedAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting'
            await call.getOrCreate({
                data: {
                    starts_at: startedAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call)
            if(!values.description && user){
                router.push(`/meeting/${call.id}`)
                toast({
                    title: "meeting Created successfully",
                  })   
            }

        } catch (error) {
            console.log(error)
            
            toast({
                title: "something went wrong",
              })
        }
    }
    const meetinLink = `${process.env.NEXT_BASE_URL}/metting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       
        <HomeCard
            img='/icons/add-meeting.svg'
            title='New Meeting'
            description='Start a new meeting'
            handleCick={() => setMeetingState('isInstant')}
            className='bg-orange-500'
        />
        <HomeCard
            img='/icons/join-meeting.svg'
            title='Join Meeting'
            description='Plan a new meeting'
            handleCick={() => setMeetingState('isJoining')}
            className='bg-green-500'
        />
        {/* <HomeCard
            img='/icons/schedule.svg'
            title='Schedule Meeting'
            description='paln a new meeting'
            handleCick={() => setMeetingState('isScheduling')}
            className='bg-sky-500'
        /> */}
        <HomeCard
            img='/icons/recordings.svg'
            title='Recordings'
            description='meeting recordings'
            handleCick={() => router.push('/recordings')}
            className='bg-pink-500'
        />
        {/* {!callDetails ? (
            <MeetingModal
            isOpen={meetingState === 'isScheduling'}
            onClose={() => setMeetingState(undefined)}
            title='Shedule a new meeting'
            handleClick={createMeeting}
            >
                <div className='flex flex-col gap-3'>
                    <label className='text-white font-normal  leading-[22px]'>Add your Description</label>
                    <textarea className='border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) => {
                        setValues({...values, description: e.target.value})
                    }}
                    />
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <label className='text-white font-normal  leading-[22px]'>Select Date and time</label>
                    <ReactDatePicker
                        selected={values.dateTime}
                        onChange={(date) => setValues({
                            ...values, dateTime: date as Date
                        })}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        className='bg-dark-1 p-2 rounded-sm w-full'
                    />
                </div>
            </MeetingModal>
        ) : (
            <MeetingModal
            isOpen={meetingState === 'isScheduling'}
            onClose={() => setMeetingState(undefined)}
            title='meeting created'
            className='text-center'
            buttonText='Copy meeting link'
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            handleClick={() => {
                navigator.clipboard.writeText(meetinLink)
                toast({title: 'Link copied'})
            }}
        />
        )} */}

        <MeetingModal
        isOpen={meetingState === 'isJoining'}
        title="Type the link here"
        buttonText="Join Meeting"
        className="text-center"
        onClose={() => setMeetingState(undefined)}
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>


        <MeetingModal
            isOpen={meetingState === 'isInstant'}
            onClose={() => setMeetingState(undefined)}
            title='Start a new meeting'
            className='text-center'
            buttonText='Start Meeting'
            handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingType