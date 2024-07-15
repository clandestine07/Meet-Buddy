import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
interface  HomeCardProps{
    img: string
    title: string
    description: string
    className: string
    handleCick: () => void
}
function HomeCard({img, title, description, className, handleCick}: HomeCardProps) {
  return (
    <div className={cn(className,'flex flex-col justify-between px-5 py-6 w-full xl:max-w-[280px] min-h-[230px] rounded-2xl cursor-pointer')}
    onClick={handleCick}
>
    <div className='flex-center glassmorphism size-12 rounded-xl'>
        <Image
            src={img}
            alt={title}
            width={27}
            height={27}
        />
    </div>
    <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='font-normal'>{description}</p>
    </div>
</div>
  )
}

export default HomeCard