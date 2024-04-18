import Link from 'next/link'
import { type JSX, type ReactNode } from 'react'

type TLayout = {
	children?: Readonly<ReactNode[]> | null
}

function Layout({ children }: TLayout): JSX.Element {
	return (
		<section style={{ display: 'grid', placeContent: 'center', height: '100vh' }}>
			<nav>
				<Link href="/dashboard">Home</Link> | <Link href="/dashboard/rooms/create">Crear Sala</Link>{' '}
				| <Link href="/dashboard/rooms">Salas</Link>
			</nav>
			<article style={{ width: '50vw' }}>{children}</article>
		</section>
	)
}

export default Layout
