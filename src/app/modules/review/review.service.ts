import { TReview } from './review.interface'
import { Review } from './review.model'

/**
 * Create a new review
 */
const createReviewIntoDB = async (payload: TReview) => {
  const newReview = await Review.create(payload)
  return newReview
}

/**
 * Get all reviews
 */
const getAllReviewsFromDB = async () => {
  const reviews = await Review.find().populate('courseId')
  return reviews
}

/**
 * Get a single review by ID
 */
const getSingleReviewFromDB = async (id: string) => {
  const review = await Review.findById(id).populate('courseId')
  return review
}

/**
 * Update a review
 */
const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  const updatedReview = await Review.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return updatedReview
}

/**
 * Delete a review
 */
const deleteReviewFromDB = async (id: string) => {
  await Review.findByIdAndDelete(id)
}

export const reviewsService = {
  deleteReviewFromDB,
  updateReviewIntoDB,
  getSingleReviewFromDB,
  getAllReviewsFromDB,
  createReviewIntoDB,
}
