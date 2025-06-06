import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid Environment! ❌', _env.error.format())
  throw new Error('Invalid Environment! ❌')
}

export const env = _env.data
