export interface MovieTestData {
  movieName: string;
  description: string;
}

export const movieTestData: MovieTestData[] = [
  {
    movieName: 'Interstellar',
    description: 'standard movie name',
  },
  {
    movieName: 'Spider-Man: No Way Home',
    description: 'movie name containing punctuation',
  },
  {
    movieName: '12 Angry Men',
    description: 'movie name containing numbers',
  },
];