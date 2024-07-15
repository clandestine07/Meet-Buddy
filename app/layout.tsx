import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEET BUDY",
  description: "Solution of all your meetings",
  icons: {
    icon: '/icons/logo.svg'
  }
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout: {
          logoImageUrl: '/icons/yoom-logo.svg',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: 'black'
        },
        elements: {
          logoBox: "flex items-center justify-center",
        },
        
      }}>
        <body className={`${inter.className} bg-slate-900`}>
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
