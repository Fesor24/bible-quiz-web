export interface IApiResponse<TResult = any, TErrorResult = any, TWarningResult = any>{
  errorMessage: string;
  successful: boolean;
  result: TResult;
  warningResult: TErrorResult;
  errorResult: TWarningResult;
}
