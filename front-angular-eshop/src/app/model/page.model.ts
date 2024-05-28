export interface Page<T> {
  content: T[]; // Array of items on the current page
  totalPages: number; // Total number of pages
  totalElements: number; // Total number of items across all pages
  size: number; // Number of items per page
  number: number; // Current page number
  empty: boolean; // Whether the current page is empty
}
