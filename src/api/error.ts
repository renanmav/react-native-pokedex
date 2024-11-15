export class ApiError extends Error {
  public url: string
  public status: number

  constructor(message: string, url: string, status: number) {
    super(message)
    this.url = url
    this.status = status
  }
}
