import { z } from 'zod'


export const createUserSchema = z.object({

    email: z.email('invalid email'),
    password: z.string().min(8, 'password must to be minimum 8 charters'),
    role: z.enum(['admin', 'user']).default('admin')

})