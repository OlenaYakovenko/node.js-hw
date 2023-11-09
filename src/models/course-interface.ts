export interface Course {
  id: number;
  name: string;
  description: string;
  authors: Author[];
  duration: number;
}

interface Author {
  id: number;
  name: string;
}
