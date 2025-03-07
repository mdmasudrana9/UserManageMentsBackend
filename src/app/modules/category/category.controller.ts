import catchAsync from '../../utils/catchAsync'

import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { categoryService } from './category.service'
import { Request, Response } from 'express'

/**
 * Create a new category.
 */
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategoryIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

/**
 * Get all categories.
 */
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoriesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

/**
 * Get a single category by ID.
 */
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getSingleCategoryFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  })
})

/**
 * Update a category.
 */
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.updateCategoryIntoDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

/**
 * Delete a category.
 */
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await categoryService.deleteCategoryFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
  })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}
