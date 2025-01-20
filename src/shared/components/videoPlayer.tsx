'use client'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import {
	Call,
	CallControls,
	CallParticipantsList,
	SpeakerLayout,
	StreamCall,
	StreamTheme,
	StreamVideo,
	StreamVideoClient
} from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Room } from '@/db/schemas'
import { generateTokenAction } from './actions'

const apiKey = process.env.NEXT_API_GET_STREAM!

function VideoPlayer({ room }: { room: Room }) {
	const { isSignedIn, user } = useUser()

	const [client, setClient] = useState<StreamVideoClient | null>(null)
	const [call, setCall] = useState<Call | null>(null)
	const router = useRouter()

	useEffect(() => {
		if (!room) return
		if (!isSignedIn) {
			return
		}
		const client = new StreamVideoClient({
			apiKey,
			user: {
				id: user.id,
				name: user.username ?? undefined,
				image: user.imageUrl ?? undefined
			},
			tokenProvider: () => generateTokenAction()
		})
		const call = client.call('default', room.id)
		call.join({ create: true })
		setClient(client)
		setCall(call)

		return () => {
			call
				.leave()
				.then(() => client.disconnectUser())
				.catch(console.error)
		}
	}, [isSignedIn, room, user])

	return (
		client &&
		call && (
			<StreamVideo client={client}>
				<StreamTheme>
					<StreamCall call={call}>
						<SpeakerLayout />
						<CallControls
							onLeave={() => {
								router.push('/dashboard')
							}}
						/>
						<CallParticipantsList onClose={() => undefined} />
					</StreamCall>
				</StreamTheme>
			</StreamVideo>
		)
	)
}

export default VideoPlayer
