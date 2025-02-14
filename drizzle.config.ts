import { Config, defineConfig } from 'drizzle-kit'
export default defineConfig({
	schema: './src/db/schemas.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	},
	verbose: true,
	strict: true
} satisfies Config)
