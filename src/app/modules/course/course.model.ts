import { Schema, model } from 'mongoose'
import { TCourse } from './course.interface'

const TagSchema = new Schema({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
})

const DetailsSchema = new Schema({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  description: { type: String, required: true },
})

const CourseSchema = new Schema<TCourse>(
  {
    title: { type: String, unique: true, trim: true, required: true },
    instructor: { type: String, trim: true, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: { type: Number, required: true },
    tags: [TagSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: DetailsSchema,
  },
  { timestamps: true },
)

export const Course = model<TCourse>('Course', CourseSchema)
