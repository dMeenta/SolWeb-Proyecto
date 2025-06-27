export default interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página actual
  size: number; // tamaño de página
  last: boolean;
}
