export const required = (message = "This field is required") => ({
  required: { value: true, message },
});

export const maxLength = (length: number, message?: string) => ({
  maxLength: { value: length, message: message || `Max length is ${length}` },
});
