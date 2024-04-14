import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: ['/', '/api/public/(.*)', '/api/webhooks/(.*)']
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
