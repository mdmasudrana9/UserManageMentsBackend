import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { reviewsService } from './review.service'
import sendResponse from '../../utils/sendResponse'

/**
 * Create a new review.
 */

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.createReviewIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

/**
 * Get all reviews.
 */
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.getAllReviewsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  })
})

/**
 * Get a single review by ID.
 */
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.getSingleReviewFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  })
})

/**
 * Update a review.
 */
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.updateReviewIntoDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  })
})

/**
 * Delete a review.
 */
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await reviewsService.deleteReviewFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
  })
})

export const reviewController = {
  deleteReview,
  updateReview,
  getSingleReview,
  getAllReviews,
  createReview,
}
