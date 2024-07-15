import layout from '@/app/(root)/layout'
import { SignIn } from '@clerk/nextjs'
import * as React from 'react'

const SignInPage = () => {
  return (
    <main className='flex-center h-screen w-full'>
        <SignIn/>
    </main>
  )
}

export default SignInPage