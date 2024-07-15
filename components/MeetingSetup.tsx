'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import * as  React from 'react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIssetupComplete} : {setIssetupComplete : (value: boolean) => void}) => {
    const [isMicCamEnabled, setIsMicCamEnabled] = useState(false)
    const call = useCall()
    if(!call){
        throw new Error ('use call must be within call component')
    }
    useEffect(() => {
        const initializeCall = async () => {
          try {
            if (isMicCamEnabled) {
              await call.camera.enable();
              await call.microphone.enable();
            } else {
              await call.camera.disable();
              await call.microphone.disable();
            }
          } catch (error) {
            console.error("Error initializing devices:", error);
          }
        };
      
        initializeCall();
      }, [isMicCamEnabled, call]);
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-semibold'>Set Up</h1>
        <VideoPreview/>
        <div className='flex-center h-16 gap-3'>
            <label className="flex-center gap-2 font-medium">
                <input
                    type='checkbox'
                    checked={isMicCamEnabled}
                    onChange={(e) => setIsMicCamEnabled(e.target.checked)}
                />
                Join with microphone and camera off
            </label>
            <DeviceSettings/>
            <Button className='rounded-md bg-sky-500 px'
            onClick={() => {
                call.join()
                setIssetupComplete(true)
            }}
            >
                Start Meeting
            </Button>
        </div>
        
    </div>
  )
}

export default MeetingSetup