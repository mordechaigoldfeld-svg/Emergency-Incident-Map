import { z } from 'zod'


export const createUserSchema = z.object({

    email: z.string().email('invalid email'),
    password: z.string().min(8, 'password must to be minimum 8 charters'),
    role: z.enum(['admin', 'user']).default('user'),
    adminPass: z.string().optional()

})
export const loginUserSchema = z.object({

    email: z.string().email('invalid email'),
    password: z.string().min(8, 'password must to be minimum 8 charters'),

})