// utils/errorHandler.ts
// import { AxiosError } from 'axios';

import axios from "axios";

export interface NormalizedError {
  message: string;
  code: string;
  httpStatus?: number;
  serverTotal?: number;
  extra?: any; // для любых дополнительных данных сервера
}


export const normalizeError = (
  error: unknown
): NormalizedError => {
  console.log("normalize error:", error)

  // Для AxiosError
  if (axios.isAxiosError(error)) {
    const response = error.response
    return {
      message: response?.data?.message || error.message || 'Network error',
      code: response?.data?.code || String(response?.status) || 'NETWORK_ERROR',
      httpStatus: response?.status,
      serverTotal: response?.data?.serverTotal,
      extra: response?.data
    }
  }

  // Для обычных Error
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'JS_ERROR'
    }
  }

  // Для всего остального
  return {
    message: 'Unknown error occurred',
    code: 'UNKNOWN_ERROR'
  }
}
// import { AxiosError } from 'axios';

// export interface NormalizedError {
//   message: string;
//   code: string;
//   httpStatus?: number;
//   serverTotal?: number;
//   extra?: any; // для любых дополнительных данных сервера
// }

// export interface ServerErrorData {
//   message?: string;
//   code?: string;
//   serverTotal?: number;
//   [key: string]: any;
// }

// export const normalizeError = <T extends ServerErrorData = ServerErrorData>(
//   error: unknown
// ): NormalizedError => {
//   // 1. Определяем общий источник данных и статус
//   let data: T | string | undefined;
//   let status: number | undefined;
//   let message = 'Unknown error occurred';
//   let code = 'UNEXPECTED';
//   let serverTotal: number | undefined;
//   let extra: any;
// console.log("normalize", error);
//   // AxiosError
//   if ((error as AxiosError<T>)?.isAxiosError) {
//     const axiosError = error as AxiosError<T>;
//     data = axiosError.response?.data;
//     status = axiosError.response?.status;
//   }
//   // Любые объекты с data/status (fetch, custom errors)
//   else if (typeof error === 'object' && error !== null) {
//     const err = error as { data?: T | string; status?: number; message?: string; code?: string; serverTotal?: number };
//     data = err.data;
//     status = err.status;
//     if (err.message) message = err.message;
//     if (err.code) code = err.code;
//     if (err.serverTotal) serverTotal = err.serverTotal;
//   }
//   // JS Error
//   else if (error instanceof Error) {
//     message = error.message;
//     code = 'JS_ERROR';
//   }

//   // 2. Обработка данных сервера
//   if (data) {
//     if (typeof data === 'string') {
//       message = data;
//     } else {
//       message = data.message || message;
//       code = data.code || code || status?.toString() || 'SERVER_ERROR';
//       serverTotal = data.serverTotal;
//       extra = { ...data }; 
//     }
//   } else if (status && code === 'UNEXPECTED') {
//     code = status.toString();
//   }
//   console.log("code", code);

//   return {
//     message,
//     code,
//     httpStatus: status,
//     serverTotal,
//     extra,
//   };
// };

