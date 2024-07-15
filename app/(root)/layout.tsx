import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import * as React from 'react'

export const metadata: Metadata = {
  title: "MEET BUDY",
  description: "Solution for all your meetings",
  icons: {
    icon: '/icons/logo.svg'
  }
};
 
const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default layout