// import { authMiddleware } from '@clerk/nextjs'

// export default authMiddleware({
// 	publicRoutes: ['/']
// })

// export const config = {
// 	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)']
// }

import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: ['/', '/api/public/(.*)']
})

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/(api|trpc)/(.*)']
}
