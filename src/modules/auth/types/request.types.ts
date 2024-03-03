import { Request } from "express"
import { UserType } from "./user.types"

export interface ExtendedRequest extends Request {
 user?: UserType
}