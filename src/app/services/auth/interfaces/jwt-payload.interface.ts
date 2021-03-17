export interface IJWTPayload {
  email: string,
  sessionId: number,
  iat: number
  exp: number
}