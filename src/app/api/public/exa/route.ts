import { NextResponse } from 'next/server'

export const GET = async (req: Request, res: Response) => {
	try {
		return NextResponse.json({ message: 'hola' })
	} catch (error) {
		return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
	}
}
