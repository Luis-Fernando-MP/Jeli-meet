'use client'

import { useAuth } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	const { isSignedIn, sessionId, userId } = useAuth()

	const isLoggedIn = isSignedIn

	return (
		<header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="flex gap-2 items-center text-xl hover:underline">
					<Image
						src="/icon.png"
						width="60"
						height="60"
						alt="the application icon of a magnifying glass"
					/>
					DevFinder
				</Link>

				<nav className="flex gap-8">
					{isLoggedIn && (
						<>
							<Link className="hover:underline" href="/browse">
								Browse
							</Link>

							<Link className="hover:underline" href="/your-rooms">
								Your Rooms
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}
