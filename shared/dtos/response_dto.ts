export default class ResponseDTO {
  status: number
  message: string
  data: any

  constructor(status: number, message: string, data: any = null) {
    this.status = status
    this.message = message
    this.data = data
  }

  static success(message: string, data: any = null) {
    return new ResponseDTO(200, message, data)
  }

  static created(message: string, data: any = null) {
    return new ResponseDTO(201, message, data)
  }

  static error(message: string, data: any = null) {
    return new ResponseDTO(400, message, data)
  }

  static notFound(message: string, data: any = null) {
    return new ResponseDTO(404, message, data)
  }

  static unauthorized(message: string, data: any = null) {
    return new ResponseDTO(401, message, data)
  }

  static forbidden(message: string, data: any = null) {
    return new ResponseDTO(403, message, data)
  }
}
