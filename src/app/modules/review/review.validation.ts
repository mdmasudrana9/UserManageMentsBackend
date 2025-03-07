import { z } from 'zod'

export const CreateReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid courseId'),
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5'),
    review: z.string().trim().min(1, 'Review text is required'),
  }),
})
export const UpdateReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid courseId'),
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5'),
    review: z.string().trim().min(1, 'Review text is required'),
  }),
})
