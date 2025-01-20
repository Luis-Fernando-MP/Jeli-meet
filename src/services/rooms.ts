import { db } from '@/db'
import { Room, room } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export const getRooms = async () => {
	try {
		const rooms = await db.query.room.findMany()
		return rooms
	} catch (error) {
		console.log(error)
	}
	return []
}

export const getRoom = async (roomId: string): Promise<Room | null> => {
	try {
		const currentRoom = await db.query.room.findFirst({
			where: eq(room.id, roomId)
		})
		return currentRoom ?? null
	} catch (error) {
		console.log(error)
	}
	return null
}
