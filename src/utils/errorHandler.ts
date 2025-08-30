// utils/errorHandler.ts
import { AxiosError } from 'axios';

export interface NormalizedError {
  message: string;
  code: string;
  httpStatus?: number;
  serverTotal?: number;
}

export const normalizeError = (error: unknown): NormalizedError => {

  if ((error as AxiosError)?.isAxiosError) {
    const axiosError = error as AxiosError<{ message?: string; code?: string; serverTotal?: number }>;
    const data = axiosError.response?.data;

    return {
      message: data?.message || 'Server error',
      code: data?.code || axiosError.response?.status?.toString() || 'UNKNOWN',
      httpStatus: axiosError.response?.status,
      serverTotal: data?.serverTotal,
    };
  }

 
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const err = error as { message: string; code?: string; serverTotal?: number; response?: { status?: number } };
    return {
      message: err.message,
      code: err.code || 'CUSTOM',
      httpStatus: err.response?.status,
      serverTotal: err.serverTotal,
    };
  }

 
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'JS_ERROR',
    };
  }

  
  return {
    message: 'Unknown error occurred',
    code: 'UNEXPECTED',
  };
};
