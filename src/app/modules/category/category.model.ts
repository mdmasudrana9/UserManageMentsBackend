import { Schema, model } from 'mongoose'
import { TCategory } from './category.interface'

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, unique: true, required: true, trim: true },
  },
  {
    timestamps: true,
  },
)

export const Category = model<TCategory>('Category', CategorySchema)
