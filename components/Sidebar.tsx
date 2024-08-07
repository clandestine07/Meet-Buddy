'use client'
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

function Sidebar() {
    const pathname = usePathname()
  return (
    <section className='
                sticky 
                left-0 
                top-0 
                flex 
                h-screen 
                w-fit 
                flex-col
                justify-between
                bg-slate-900
                p-6
                pt-28
                text-white
                max-sm:hidden
                lg:w-[264px]
                '>
                    <div className='
                            flex 
                            flex-col
                            flex-1
                            gap-6
                    '>
                        {sideBarLinks.map((link) => {
                            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                            return (
                                <Link
                                    key={link.label}
                                    href={link.route}
                                    className={cn('flex items-center gap-6 rounded-lg p-4 justify-start', {
                                        'bg-blue-1': isActive
                                    })}
                                >
                                    <Image
                                        src={link.imgUrl}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />
                                    <p className='tetx-lg font-semibold max-lg:hidden'>{link.label}</p>
                                </Link>
                            )
                        })}

                    </div>
        
     </section>
  )
}

export default Sidebar