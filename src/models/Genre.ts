import mongoose from 'mongoose';

interface IGenre {
  name: string;
}

const genreSchema = new mongoose.Schema<IGenre>({
  name: {
    type: String,
    required: [true, 'Please, set genre name'],
  },
});

const Genre = mongoose.model<IGenre>('Genre', genreSchema);

export { IGenre, Genre };
