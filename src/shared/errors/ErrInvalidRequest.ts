import { AppError } from "./AppError"

export class ErrInvalidRequest extends AppError {
    constructor(param: string) {
        super({
            message: `Missing or invalid param ${param} on request`,
            status: 422,
            title: "ErrInvalidRequest"
        })
    }
}