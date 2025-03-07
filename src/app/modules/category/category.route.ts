import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import {
  CreateCategoryValidationSchema,
  UpdateCategoryValidationSchema,
} from './category.validation'
import { CategoryController } from './category.controller'

const router = express.Router()

router.post(
  '/create-category',
  ValidateRequest(CreateCategoryValidationSchema),
  CategoryController.createCategory,
)
router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.getSingleCategory)
router.patch(
  '/:id',
  ValidateRequest(UpdateCategoryValidationSchema),
  CategoryController.updateCategory,
)
router.delete('/:id', CategoryController.deleteCategory)

export const CategoryRoutes = router
