import mongoose from 'mongoose';

export interface IAuthor {
  name: string;
}
export interface ICourse {
  name: string;
  description: string;
  authors: IAuthor[];
  duration: number;
}

const authorSchema = new mongoose.Schema<IAuthor>({
  name: {
    type: String,
    required: true,
    minlength: 10,
  },
});

export const Author = mongoose.model('Author', authorSchema);

const courseSchema = new mongoose.Schema<ICourse>({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: {
    type: String,
    required: true,
    minlength: 30,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  authors: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Author' }],
});

export const Course = mongoose.model('Course', courseSchema);
