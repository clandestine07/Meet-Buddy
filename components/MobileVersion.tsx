'use client'
import * as React from "react";
import Image from "next/image";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function MobileVersion() {
  const pathname = usePathname()
  return (
    <section className="w-full max-w-[264px] text-white"> 
      <Sheet>
        <SheetTrigger asChild>
            <Image
                src='/icons/hamburger.svg'
                width={36}
                height={36}
                alt="hamburger"
                className="cursor-pointer sm:hidden"
            />
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-dark-1">
          <Link href="/" className='flex item-center gap-1'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={28}
              height={28}
              className='max-sm:size-10'
            />
            <p className='text-[26px] font-extrabold text-white'>MEET BUDDY</p>
        </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16 text-white">
                  {sideBarLinks.map((link) => {
                                const isActive = pathname === link.route
                                return (
                                  <SheetClose asChild key={link.route}>
                                    <Link
                                        key={link.label}
                                        href={link.route}
                                        className={cn('flex items-center gap-6 rounded-lg p-4 w-full max-w-60', {
                                            'bg-blue-1': isActive
                                        })}
                                    >
                                        <Image
                                            src={link.imgUrl}
                                            alt={link.label}
                                            width={20}
                                            height={20}
                                        />
                                        <p className='font-semibold'>{link.label}</p>
                                    </Link>
                                    </SheetClose>
                                )
                            })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileVersion;
