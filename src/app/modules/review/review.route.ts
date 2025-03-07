import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import {
  CreateReviewValidationSchema,
  UpdateReviewValidationSchema,
} from './review.validation'
import { reviewController } from './review.controller'

const router = express.Router()

router.post(
  '/create-review',
  ValidateRequest(CreateReviewValidationSchema),
  reviewController.createReview,
)
router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getSingleReview)
router.patch(
  '/:id',
  ValidateRequest(UpdateReviewValidationSchema),
  reviewController.updateReview,
)
router.delete('/:id', reviewController.deleteReview)

export const ReviewsRoute = router
