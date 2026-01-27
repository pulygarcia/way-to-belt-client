import * as z from 'zod'

export const fighterSchema = z.object({
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    nickname: z.string().min(1).max(30),
    nationality: z.string().min(1).max(30),

    weightClass: z.string().min(1),

    height: z.coerce.number().int().min(140).max(220),
    reach: z.coerce.number().int().min(140).max(230),
    age: z.coerce.number().int().min(18).max(50),

    wins: z.coerce.number().int().min(0),
    losses: z.coerce.number().int().min(0),
    draws: z.coerce.number().int().min(0),
    rankingPosition: z.coerce.number().int().min(0),
})

export type FighterFormData = z.infer<typeof fighterSchema>