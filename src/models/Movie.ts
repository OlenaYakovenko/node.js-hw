import mongoose from 'mongoose';

interface IMovie {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: {
    type: String,
    required: [true, 'Please, add a movie title'],
    trim: true,
  },
  description: {
    type: String,
    requred: [true, 'Please, add a movie description'],
    minlength: 30,
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please, add the release date'],
  },
  genre: {
    type: [String],
    required: [true, 'Please, define the movie genre'],
  },
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export { IMovie, Movie };
