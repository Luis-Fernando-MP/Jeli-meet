import { db } from '@/db'
import { slugify } from '@/lib/format'
import { getRooms } from '@/services/rooms'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

async function Rooms(): Promise<JSX.Element> {
	const rooms = await getRooms()
	return (
		<article>
			{rooms.map((room) => {
				const { description, githubRepo, name, tags, id } = room
				return (
					<div key={id} style={{ padding: 10, border: '1px solid' }}>
						<span>{tags}</span>
						<h3>{name}</h3>
						<p>{description}</p>
						<Link href={`rooms/${id}`}>
							<ArrowUpRight />
							Ir a la sala
						</Link>
						<Link href={githubRepo ?? name}>
							<Github />
							Repo github
						</Link>
					</div>
				)
			})}
		</article>
	)
}

export default Rooms
