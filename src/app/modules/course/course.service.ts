// Create a new course in the database
import mongoose from 'mongoose'
import { TCourse } from './course.interface'
import { Course } from './course.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { courseDurationInWeeks } from './course.utils'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constant'

const createCourseIntoDB = async (payload: TCourse): Promise<TCourse> => {
  // Add duration to the payload
  payload.durationInWeeks = courseDurationInWeeks(
    payload.startDate,
    payload.endDate,
  )

  const newCourse = await Course.create(payload)
  return newCourse
}

// Get all courses with optional filters, sorting, and pagination

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const coursesQuery = new QueryBuilder(
    Course.find(query).populate('categoryId'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await coursesQuery.modelQuery
  return result
}

//Get a single course by its ID

const getSingleCourseFromDB = async (id: string): Promise<TCourse | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Course ID')
  }
  const course = await Course.findById(id)
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
  }
  return course
}

/**
 * Update a course by ID
 */
const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
): Promise<TCourse | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Course ID')
  }

  // Start a session to use transactions
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Step 1: Update basic course information
    const { tags, ...courseRemainingData } = payload

    // Update the course with the new data (excluding tags)
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
    }

    // Step 2: If there are tags to update
    if (tags && tags.length > 0) {
      // Filter out deleted tags
      const deletedTags = tags.filter((el) => el.isDeleted).map((el) => el.name)

      // Remove deleted tags from the course
      const removedTags = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { _id: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!removedTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to remove tags')
      }

      // Add new tags (non-deleted tags)
      const newTags = tags.filter((el) => !el.isDeleted)

      const addedTags = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!addedTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add tags')
      }
    }

    // Commit the transaction if all updates are successful
    await session.commitTransaction()
    await session.endSession()

    // Return the updated course with populated tags (if needed)
    const result = await Course.findById(id)
    return result
  } catch (err) {
    // Rollback the transaction if an error occurs
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}

/**
 * Delete a course by ID (soft delete by setting isDeleted = true)
 */
const deleteCourseFromDB = async (id: string): Promise<TCourse | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Course ID')
  }

  const deletedCourse = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  if (!deletedCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
  }

  return deletedCourse
}

export const courseServices = {
  createCourseIntoDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
}
