import { Router } from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { courseValidationSchema } from './course.validation'
import { CourseControllers } from './course.controller'

const router = Router()

router.post(
  '/create-course',
  ValidateRequest(courseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)
router.patch(
  '/:id',
  ValidateRequest(courseValidationSchema.updateCourseUpdateValidationSchema),
  CourseControllers.updateCourse,
)

// router.put(
//   '/:courseId/assign-faculties',
//   ValidateRequest(courseValidationSchema.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// )

// router.delete(
//   '/:courseId/remove-faculties',
//   ValidateRequest(courseValidationSchema.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// )

export const CourseRoutes = router
