import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { CourseRoutes } from '../modules/course/course.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { ReviewsRoute } from '../modules/review/review.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoute,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)

export default router
