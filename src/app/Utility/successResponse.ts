export const successResponseForOperation = (
  success: boolean,
  message: string,
  data: object | object[] | null,
) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};
