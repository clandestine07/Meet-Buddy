import { SignUp } from '@clerk/nextjs'
import * as React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex-center h-screen w-full'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage