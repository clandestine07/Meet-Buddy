import React from 'react'

interface MeetingCardProps {
    title?: string;
    link?: string;
    icon?: string;
    date?: string;
    buttonText?: string;
    buttonIcon1?: string;
    isPreviousMeeting?: boolean;
    handleClick?: () => void;
}
  
const MeetingCard = (
    {title, link, icon, date, buttonText, buttonIcon1, isPreviousMeeting, handleClick}: MeetingCardProps
) => {
  return (
    <section className='flex flex-col justify-between min-h[258px] w-full rounded-md bg-dark-1 px-4 py-6 xl:max-w-[500px]'>
        {title}
    </section>
  )
}

export default MeetingCard