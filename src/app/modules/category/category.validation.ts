import { z } from 'zod'

export const CreateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Category name is required'),
  }),
})
export const UpdateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Category name is required').optional(),
  }),
})
