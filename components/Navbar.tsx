import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import MobileVersion from './MobileVersion'
import { SignedIn, UserButton } from '@clerk/nextjs'

function navbar() {
  return (
    <nav className='flex-between fixed z-50 w-full bg-slate-900 px-6 py-4 lg:px-10'>
       <Link href="/" className='flex item-center gap-1'>
          <Image
            src='/icons/logo.svg'
            alt='logo'
            width={32}
            height={32}
            className='max-sm:size-10'
          />
          <p className='text-[26px] font-extrabold text-white max-sm:hidden'>MEET BUDDY</p>
       </Link>
       <div className='flex-between gap-5'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
            <MobileVersion/>
       </div>
    </nav>
  )
}

export default navbar