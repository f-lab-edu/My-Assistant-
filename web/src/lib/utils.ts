import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createRandomKeys = (length: number = 9) =>
  Array.from({ length }, () => Math.random().toString(36).substring(2, 9));
