'use server'

import { auth } from '@clerk/nextjs'
import { StreamChat } from 'stream-chat'

export async function generateTokenAction() {
	const { userId } = auth()
	console.log(userId)

	if (!userId) {
		throw new Error('No session found')
	}

	const api_key = process.env.NEXT_API_GET_STREAM!
	const api_secret = process.env.NEXT_SECRET_GET_STREAM!
	const serverClient = StreamChat.getInstance(api_key, api_secret)
	const token = serverClient.createToken(userId)
	console.log('token', token)
	return token
}
