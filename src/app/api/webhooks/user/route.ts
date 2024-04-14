import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { TUserClerk } from './userClerk.type'
import { db } from '@/db'
import { users } from '@/db/schemas'
import { eq } from 'drizzle-orm'

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*'

type Event = {
	data: TUserClerk
	object: 'event'
	type: EventType
}

const webhookSecret = process.env.CLERK_SECRET_WEBHOOK!

async function handler(request: Request) {
	const payload = await request.json()
	const headersList = headers()
	const heads = {
		'svix-id': headersList.get('svix-id'),
		'svix-timestamp': headersList.get('svix-timestamp'),
		'svix-signature': headersList.get('svix-signature')
	}
	const wh = new Webhook(webhookSecret)
	let evt: Event | null = null

	try {
		evt = wh.verify(
			JSON.stringify(payload),
			heads as IncomingHttpHeaders & WebhookRequiredHeaders
		) as Event
	} catch (err) {
		console.error((err as Error).message)
		return NextResponse.json({}, { status: 400 })
	}

	const eventType: EventType = evt.type
	try {
		const { id, first_name, email_addresses, image_url } = evt.data
		if (eventType === 'user.created' || eventType === 'user.updated') {
			await db
				.insert(users)
				.values({ id, email: email_addresses[0].email_address, image: image_url, name: first_name })
				.onConflictDoUpdate({
					target: users.id,
					set: { email: email_addresses[0].email_address, image: image_url, name: first_name }
				})
		}
		if (eventType == 'user.deleted') {
			await db.delete(users).where(eq(users.id, id))
		}
		return NextResponse.json({ ok: 'ok' })
	} catch (error) {
		console.error((error as Error).message)
		return NextResponse.json({}, { status: 400 })
	}
}

export const GET = handler
export const POST = handler
export const PUT = handler
