'use client'

import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
	useAuth
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	const { isSignedIn, sessionId, userId } = useAuth()

	const isLoggedIn = isSignedIn

	return (
		<header>
			<div>
				<Link href="/">
					<Image
						src="/logo.svg"
						width="20"
						height="20"
						alt="the application icon of a magnifying glass"
					/>
					JELI meet&apos;s
				</Link>
				<nav>
					<Link href="/browse">Home</Link>
					<Link href="/your-rooms">About</Link>
					<ClerkLoading>
						<Loader />
					</ClerkLoading>
					<ClerkLoaded>
						<SignedIn>
							<UserButton afterSignOutUrl="/" />
						</SignedIn>
						<SignedOut>
							<SignInButton mode="modal">
								<button>Ingresar</button>
							</SignInButton>
							<SignUpButton mode="modal">
								<button>Registrarse</button>
							</SignUpButton>
						</SignedOut>
					</ClerkLoaded>
				</nav>
			</div>
		</header>
	)
}
