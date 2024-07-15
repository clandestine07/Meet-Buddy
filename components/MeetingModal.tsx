import * as React from 'react'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  
interface MeetingModalProps{
    isOpen: boolean
    onClose: () => void
    title: string
    className?: string
    buttonText?: string
    children?: React.ReactNode
    handleClick?: () => void
    image?: string
    buttonIcon?: string
}
function MeetingModal({isOpen, handleClick, onClose, title, className, buttonText, children, image, buttonIcon}: MeetingModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='
                        flex 
                        flex-col
                        w-full 
                        max-w-[520px]
                        gap-6
                        px-6
                        py-9
                        text-white
                        border-none
                        bg-dark-2
                        '>
                        <div className='flex flex-col gap-6'>
                            {image && (
                                <div className='flex justify-center'>
                                    <Image
                                        src={image}
                                        alt={title}
                                        width={72}
                                        height={72}
                                    />
                                </div>
                            )}
                            <h1 className={cn('text-2xl font-semibold leading-[42px]', className)}>{title}</h1>
                            {children}
                            <Button className='bg-blue-1' onClick={handleClick}>
                                {buttonIcon && (
                                    <Image
                                        src={buttonIcon}
                                        alt='buton icon'
                                        width={13}
                                        height={13}
                                    />
                                )} &nbsp;
                                {buttonText || 'Schedule meeting'}
                            </Button>
                        </div>
        </DialogContent>
</Dialog>

  )
}

export default MeetingModal