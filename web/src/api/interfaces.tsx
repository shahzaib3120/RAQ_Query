// src/api/interfaces.tsx

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  thumbnail: string;
  genre: string;
  published_year: number;
  description: string;
  average_rating: number;
  num_pages: number;
  ratings_count: number;
  authors: string[];
}

export interface GetBooksResponse {
  message: string;
  books: Book[];
  limit: number;
  offset: number;
}

export interface GetBookByIdResponse {
  message: string;
  book: Book;
}

export interface ChatResponse {
  message: string;
  response: string;
}


export interface RegisterUserData {
  email: string;
  fname: string;    
  lname: string;   
  username: string;
  password: string;
  role: number;     
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface BookGalleryProps {
  books: Book[];
  searchMessage?: string;
}