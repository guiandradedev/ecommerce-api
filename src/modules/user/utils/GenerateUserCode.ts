type GenerateActivateCodeRequest = {
    type: 'string' | 'number',
    size: number,
    expiresIn?: Date
}

export class GenerateUserCode {
    execute({ type, size, expiresIn }: GenerateActivateCodeRequest): {code: string, expiresIn: Date} {
        let code = ""
        switch (type) {
            case 'string': {
                for(let i=0; i<size; i++) {
                    code += String.fromCharCode(65+Math.floor(Math.random() * 26));
                }
                break;
            }
            case 'number': {
                for(let i=0; i<size; i++) {
                    code += Math.floor(Math.random() * 9);
                }
                break;
            }
            default: {
                code = Math.random().toString(36).substring(-size).toUpperCase();
                break;
            }
        }
        const date = new Date();
        date.setHours(date.getHours() + 3);
        return {
            code,
            expiresIn: expiresIn ?? date
        }
    }
}