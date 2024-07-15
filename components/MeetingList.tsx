'use client'
import * as React from 'react'
import {fetchAllCalls} from '@/hooks/fetchAllCalls'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import Meeting from '@/app/(root)/meeting/[id]/page'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
const MeetingList = ({type} : {type: 'upcoming' | 'recordings' | 'ended'}) => {

  const {upcomingCalls, endedCalls, callRecordings, loading} = fetchAllCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const router = useRouter()

  const TypeOfCall = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls
      case "ended":
        return endedCalls
      case "recordings":
        return recordings
      default:
        return []
    }
  }

  const noCallExist = () => {
    switch (type) {
      case "upcoming":
        return 'No recordings found'
      case "ended":
        return 'No previous call found'
      case "recordings":
        return 'No recordings found'
      default:
        return []
    }
  }
  useEffect(() => {
    const fetchRecordings = async () => {
      const getCallData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = getCallData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);
      setRecordings(recordings);
      if (type === 'recordings') {
        fetchRecordings();
      }
    };

  }, [type, callRecordings]);
  if (loading) return <Loader />;



  const calls = TypeOfCall()
  const Nocalls = noCallExist()
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <h1 className="text-2xl font-bold text-white">COMING SOON...</h1>
      </div>
    )
  }

export default MeetingList
