'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createRoomAction } from './actions'
import { useUser } from '@clerk/nextjs'

const formSchema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(250),
	githubRepo: z.string().min(1).max(50),
	tags: z.string().min(1).max(50)
})

export function CreateRoomForm() {
	const router = useRouter()
	const { user } = useUser()

	const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			githubRepo: '',
			tags: ''
		}
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const room = await createRoomAction({ userId: user?.id ?? '', ...values })

		toast.success('Tu sala fue creada')
		// router.push(`/rooms/${room.id}`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input placeholder="Nombre de la sala" {...register('name')} />
			<input placeholder="Descripción de la sala" {...register('description')} />
			<input placeholder="repositorio" {...register('githubRepo')} />
			<input placeholder="Tecnologías typescript..." {...register('tags')} />

			<button type="submit">Submit</button>
		</form>
	)
}
