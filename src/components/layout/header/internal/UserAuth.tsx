'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { useIsLogged } from '~/atoms/hooks'
import { MotionButtonBase } from '~/components/ui/button'
import { useIsDark } from '~/hooks/common/use-is-dark'
import { useAggregationSelector } from '~/providers/root/aggregation-data-provider'

const SignedIn = dynamic(() =>
  import('@clerk/nextjs').then((mod) => mod.SignedIn),
)

const UserAuthFromIcon = dynamic(() =>
  import('./UserAuthFromIcon').then((mod) => mod.UserAuthFromIcon),
)
const SignedOut = dynamic(() =>
  import('@clerk/nextjs').then((mod) => mod.SignedOut),
)
const UserButton = dynamic(() =>
  import('@clerk/nextjs').then((mod) => mod.UserButton),
)
const SignInButton = dynamic(() =>
  import('@clerk/nextjs').then((mod) => mod.SignInButton),
)

const OwnerAvatar = () => {
  const ownerAvatar = useAggregationSelector((s) => s.user.avatar)!

  return (
    <MotionButtonBase
      onClick={() => {
        window.open('/dashboard', '_blank')
      }}
      className="pointer-events-auto relative flex items-center justify-center"
    >
      <span className="sr-only">Go to dashboard</span>
      <Image
        className="rounded-full"
        height={36}
        width={36}
        src={ownerAvatar}
        alt="site owner"
      />
      <UserAuthFromIcon className="absolute -bottom-1 -right-1" />
    </MotionButtonBase>
  )
}

export function UserAuth() {
  const pathname = usePathname()
  const isLogged = useIsLogged()

  const isDark = useIsDark()

  if (isLogged) {
    return <OwnerAvatar />
  }

  return <AnimatePresence></AnimatePresence>
}
