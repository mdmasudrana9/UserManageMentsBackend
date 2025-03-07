import httpStatus from 'http-status'
import { TCategory } from './category.interface'
import { Category } from './category.model'
import AppError from '../../errors/AppError'

/**
 * Create a new category in the database.
 */
const createCategoryIntoDB = async (payload: TCategory): Promise<TCategory> => {
  const existingCategory = await Category.findOne({ name: payload.name })
  if (existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category name must be unique')
  }

  const newCategory = new Category(payload)
  return await newCategory.save()
}

/**
 * Get all categories from the database.
 */
const getAllCategoriesFromDB = async (): Promise<TCategory[]> => {
  return await Category.find()
}

/**
 * Get a single category by ID.
 */
const getSingleCategoryFromDB = async (
  id: string,
): Promise<TCategory | null> => {
  return await Category.findById(id)
}

/**
 * Update an existing category.
 */
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
): Promise<TCategory | null> => {
  return await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
}

/**
 * Delete a category.
 */
const deleteCategoryFromDB = async (id: string): Promise<TCategory | null> => {
  return await Category.findByIdAndDelete(id)
}

export const categoryService = {
  deleteCategoryFromDB,
  updateCategoryIntoDB,
  getSingleCategoryFromDB,
  getAllCategoriesFromDB,
  createCategoryIntoDB,
}
