import { z } from 'zod'

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
    instructor: z.string().trim().min(1, 'Instructor name is required'),
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid categoryId'),
    price: z.number().positive('Price must be a positive number'),
    tags: z.array(
      z.object({
        name: z.string().trim().min(1, 'Tag name is required'),
        isDeleted: z.boolean().optional(),
      }),
    ),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    language: z.string().trim().min(1, 'Language is required'),
    provider: z.string().trim().min(1, 'Provider name is required'),
    durationInWeeks: z
      .number()
      .int()
      .positive('Duration must be a positive integer')
      .optional(),
    details: z.object({
      level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
        message: 'Invalid level',
      }),
      description: z.string().trim().min(1, 'Description is required'),
    }),
  }),
})

const updateCourseUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required').optional(),
    instructor: z
      .string()
      .trim()
      .min(1, 'Instructor name is required')
      .optional(),
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid categoryId')
      .optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    tags: z
      .array(
        z.object({
          name: z.string().trim().min(1, 'Tag name is required'),
          isDeleted: z.boolean().optional(),
        }),
      )
      .optional(),
    startDate: z.string().min(1, 'Start date is required').optional(),
    endDate: z.string().min(1, 'End date is required').optional(),
    language: z.string().trim().min(1, 'Language is required').optional(),
    provider: z.string().trim().min(1, 'Provider name is required').optional(),
    durationInWeeks: z
      .number()
      .int()
      .positive('Duration must be a positive integer')
      .optional(),
    details: z
      .object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
          message: 'Invalid level',
        }),
        description: z.string().trim().min(1, 'Description is required'),
      })
      .partial() // Makes nested object fields optional
      .optional(),
  }),
})

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseUpdateValidationSchema,
}
