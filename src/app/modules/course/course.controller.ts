import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { courseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'

/**
 * Create a new course
 */
const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is  Created SuccessFully',
    data: result,
  })
})

/**
 * Get all courses
 */
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const courses = await courseServices.getAllCoursesFromDB(req.query)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Courses retrieved successfully',
    data: courses,
  })
})

/**
 * Get a single course by ID
 */
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const course = await courseServices.getSingleCourseFromDB(id)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course retrieved successfully',
    data: course,
  })
})

/**
 * Update a course by ID
 */
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedCourse = await courseServices.updateCourseIntoDB(id, req.body)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course updated successfully',
    data: updatedCourse,
  })
})

/**
 * Delete a course by ID
 */
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const deletedCourse = await courseServices.deleteCourseFromDB(id)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course deleted successfully',
    data: deletedCourse,
  })
})

export const CourseControllers = {
  deleteCourse,
  updateCourse,
  getSingleCourse,
  getAllCourses,
  createCourse,
}
