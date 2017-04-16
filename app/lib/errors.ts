export class RequestError extends Error {
  static fromResponse(response: Response): RequestError {
    return new this(response.status, response.statusText)
  }

  constructor(
    public status: number,
    statusText: string
  ) {
    super(statusText)
    Error.captureStackTrace(this)
  }
}
