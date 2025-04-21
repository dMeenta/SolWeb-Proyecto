export default interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
