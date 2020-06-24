export const Errors = {
  REQUIRED: 'Please set',
  NOT_FOUND: 'No such file',
  UNSUPPORTED: 'Unsupported format',
}

export class ReporterError extends Error {
  public code: keyof typeof Errors;
  public value: string;

  constructor(code: keyof typeof Errors, value: string) {
    super(`[${code}]: ${Errors[code]} ${value}`);
    this.code = code;
    this.value = value;
  }
}
