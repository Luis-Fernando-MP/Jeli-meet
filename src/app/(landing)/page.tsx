import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import type { JSX } from 'react'

function Home(): JSX.Element {
	return (
		<main>
			Hello, we will be testing Clerk latest update and Drizzle ORM.
			<div className="flex flex-col">
				<ClerkLoading>
					<Loader className="text-muted-foreground h-5 w-5" />
				</ClerkLoading>

				<ClerkLoaded>
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
							<button className="w-fit rounded-lg bg-blue-500 p-4 text-white">Sign In</button>
						</SignInButton>
					</SignedOut>
				</ClerkLoaded>
			</div>
		</main>
	)
}

export default Home
