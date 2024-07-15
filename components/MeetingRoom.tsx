'use client'
import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import * as React from 'react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from '@/components/EndCallButton'
import { useRouter } from 'next/navigation'

type callLayoutType = 'grid' | 'speaker-left' | 'speaker-right'
function MeetingRoom() {
  const SearchParams = useSearchParams()
  const isPersonalRoom = !!SearchParams.get('personal')
  const [layout, setLayout] = useState('speaker-left')
  const [participants, setShowParticipants] = useState(false)
  const router = useRouter()

  const callLayout = () => {
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout/>

      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'right'}/>

      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'}/>
       
      default:
        return <SpeakerLayout participantsBarPosition={'right'}/>
    }
  }
  return (
    <section className='
              relative
              h-screen
              w-full
              overflow-hidden
              pt-4
              text-white
          '>
            <div className='relative flex-center size-full'>
              <div className='flex size-full max-w-[1000px] items-center'>
                  {callLayout()}
              </div>
              {/* participants */}
              <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block' : participants})}>
                <CallParticipantsList onClose={() => setShowParticipants(false)}/>
              </div>
            </div>

            {/* call layout */}
            <div className='fixed bottom-0 flex-center w-full flex-wrap gap-2'>
                  <CallControls onLeave={() => router.push('/')}/>
                  <DropdownMenu>
                    <div className='flex item-center'>
                      <DropdownMenuTrigger>
                        <LayoutList
                          className='text-white cursor-pointer rounded-md ml-6 text-2xl hover:bg-dark-1'
                          size={24}
                        />
                      </DropdownMenuTrigger>
                    </div>
                      <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                        {['grid', 'speaker-left' ,'speaker-right'].map((item, index) => (
                          <div key={index}>
                            <DropdownMenuItem className='cursor-pointer'
                              onClick={() => setLayout(item.toLowerCase() as callLayoutType)}
                            >
                              {item}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='border-dark-1'/>
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <CallStatsButton/>
                    <button onClick={() => setShowParticipants((prev) => !prev)}>
                        <div className='text-white px-4 py-2 cursor-pointer rounded-md ml-6 text-2xl hover:bg-dark-1'>
                            <User size={22} className='text-white'/>
                        </div>
                    </button>
                      {!isPersonalRoom && <EndCallButton/>}
            </div>
            
    </section>

  )
}

export default MeetingRoom