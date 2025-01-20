import { getRoom } from '@/services/rooms'
import VideoPlayer from '@/shared/components/videoPlayer'
import { Github } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

async function Room({ params }: { params: { room_id: string } }): Promise<JSX.Element> {
	const { room_id } = params
	const currentRoom = await getRoom(room_id)
	if (!currentRoom) {
		return <section>Ups!! la sala con el id {room_id} no existe</section>
	}
	const { description, githubRepo, name, tags } = currentRoom
	const badges = tags.split(',')
	return (
		<section>
			<div>
				<h2>Video en vivo</h2>
				<VideoPlayer room={currentRoom} />
			</div>
			<div style={{ padding: 10, border: '1px solid' }}>
				<h3>{name}</h3>
				<p>{description}</p>
				<div style={{ display: 'flex', gap: 5, margin: '10px 0' }}>
					{badges.map((badge) => (
						<span
							key={Date.now() + badge.trim()}
							style={{ background: 'black', color: 'white', padding: '5px 10px', borderRadius: 5 }}
						>
							{badge.trim()}
						</span>
					))}
				</div>
				<div>
					<Link href={githubRepo ?? name}>
						<Github />
						Repo github
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Room
