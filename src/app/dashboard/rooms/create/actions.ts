'use server'

import { Room, room } from '@/db/schemas'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'

export async function createRoomAction(roomData: Omit<Room, 'id'>) {
	const isCreated = await db.insert(room).values({ ...roomData })
	console.log(isCreated)

	revalidatePath('/dashboard/rooms')

	// return room
}
