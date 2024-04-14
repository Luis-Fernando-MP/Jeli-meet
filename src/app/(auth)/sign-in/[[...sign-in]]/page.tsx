import { SignIn } from '@clerk/nextjs'

export default function Page() {
	return (
		<SignIn
			appearance={{
				layout: {
					logoImageUrl:
						'https://cdn.hashnode.com/res/hashnode/image/upload/v1643737600667/mNxbCBZ5F.png?w=1000&h=250&fit=crop&crop=entropy&auto=compress,format&format=webp'
				},
				variables: {
					colorPrimary: '#f66666'
				}
			}}
		/>
	)
}
