import MeetingType from '@/components/MeetingType'
import * as React from 'react'

function Home() {
  const now = new Date()
  const curTime = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  })
  const date = (new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full'
  })).format(now)
  return (
    <section className='
        flex
        size-full
        flex-col
        text-white
        gap-10
    '>
      {/* banner */}
      <div className='h-[300px] w-full rounded-lg bg-hero opacity-80 '>
          <div className='flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11 mt-44'>
            <div className='flex flex-col gap-2 md:pl-3'>
                <h1 className='text-4xl font-extrabold lg:text-7xl'>
                    {curTime}
                </h1>
                <p className='text-lg font-medium lg:text-2xl'>
                   {date}
                </p>
            </div>
          </div>
      </div>
      <MeetingType/>
    </section>
  )
}

export default Home