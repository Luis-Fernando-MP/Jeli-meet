import { SignOutButton, UserButton } from '@clerk/nextjs'
import { type JSX, type ReactNode } from 'react'
import Link from 'next/link'

type TLayout = {
	children?: Readonly<ReactNode[]> | null
}

function Layout({ children }: TLayout): JSX.Element {
	return (
		<section style={{ display: 'grid', placeContent: 'center', height: '100vh' }}>
			<section
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 10
				}}
			>
				<nav>
					<Link href="/dashboard">Home</Link> |{' '}
					<Link href="/dashboard/rooms/create">Crear Sala</Link> |{' '}
					<Link href="/dashboard/rooms">Salas</Link>
				</nav>
				<div style={{ display: 'flex', gap: 10 }}>
					<SignOutButton />
					<UserButton />
				</div>
			</section>
			<article style={{ width: '50vw' }}>{children}</article>
		</section>
	)
}

export default Layout
