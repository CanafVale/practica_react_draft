import { isAxiosError } from "axios";

type ErrorCode =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "API_CLIENT_ERROR";

export class ApiClientError extends Error {
  code: ErrorCode = "API_CLIENT_ERROR";

  constructor(error: unknown) {
    super("Api Client Error");
    if (error instanceof Error) {
      this.normalizeError(error);
    }
  }

  private normalizeError(error: Error) {
    // Error instance
    this.message = error.message;

    if (isAxiosError<{ message: string; statusCode: number }>(error)) {
      // AxiosError instance
      this.message =
        error.response?.data.message ??
        error.response?.statusText ??
        this.message;
      const errorCode = error.code;
      const errorStatus =
        error.response?.data.statusCode ??
        error.response?.status ??
        error.status;

      if (errorCode === "ERR_NETWORK") {
        this.code = "NETWORK_ERROR";
      }
      if (typeof errorStatus === "number") {
        if (errorStatus === 401) {
          this.code = "UNAUTHORIZED";
        } else if (errorStatus === 403) {
          this.code = "FORBIDDEN";
        } else if (errorStatus === 404) {
          this.code = "NOT_FOUND";
        } else if (errorStatus >= 500) {
          this.code = "SERVER_ERROR";
        }
      }
    }
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}
