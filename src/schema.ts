import { ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  courses?: { courseId: number, dateJoined: string; }[];
}
export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  leassons: number;
  status: number;
  created_at: string;
}
