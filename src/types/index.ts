export type ErrorType = {
  message: string
  name: string
  statusCode: number
  body: {
    path: string
    error: string
  }
}

export type StatType = Promise<{
  statusCode: number
  body: {
    downloads: number
    start: Date
    end: Date
    package: string
  }
}>

export type DetailType = Promise<{
  statusCode: number
  body: object
}>