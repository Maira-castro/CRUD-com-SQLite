import z from "zod"

export const CreateProduct = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    stock: z.number().positive(),
    description: z.string().optional()
})

export const UpdateProduct = z.object({
    name: z.string().min(3).optional(),
    price: z.number().positive().optional(),
    stock: z.number().positive().optional(),
    description: z.string().optional()
})