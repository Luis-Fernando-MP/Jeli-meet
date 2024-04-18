import { db } from '@/db'
import Link from 'next/link'
import type { JSX } from 'react'

async function Rooms(): Promise<JSX.Element> {
	const rooms = await db.query.room.findMany()
	return (
		<article>
			{rooms.map((room) => {
				const { description, githubRepo, name, tags, id } = room
				return (
					<div key={id} style={{ padding: 10, border: '1px solid' }}>
						<span>{tags}</span>
						<h3>{name}</h3>
						<p>{description}</p>
						<Link href={githubRepo ?? name}>Repo github</Link>
					</div>
				)
			})}
		</article>
	)
}

export default Rooms
