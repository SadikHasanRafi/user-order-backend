export const errorMessageForServer = (
  success: boolean,
  message: string,
  code: number,
  description: string,
) => {
  return {
    success: success,
    message: message,
    error: {
      code: code,
      description: description,
    },
  };
};
