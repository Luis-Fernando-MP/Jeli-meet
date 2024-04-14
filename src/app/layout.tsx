import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import { Roboto } from 'next/font/google'
import type { JSX, ReactNode } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/shared/components/Header'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['900', '700', '500', '400', '300']
})

export const metadata: Metadata = {
	title: 'JELI MEET',
	description: 'Sistema web, servidor de inteligencias artificiales',
	icons: '/logo.png'
}

type TRootLayout = {
	children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

function RootLayout({ children }: TRootLayout): JSX.Element {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={roboto.className}>
					{/* <Header /> */}
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
