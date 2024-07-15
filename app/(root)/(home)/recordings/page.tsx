import MeetingList from '@/components/MeetingList'
import * as React from 'react'

const Recordings = () => {
  return (
        <section className='
        flex
        size-full
        flex-col
        text-white
        gap-10
    '>
      <h1 className='text-3xl font-bold'>
        Recordings
      </h1>
      <MeetingList type='recordings'/>
    </section>
  )
}

export default Recordings